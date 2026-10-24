'use strict';
// ═════════ MODOS NUEVOS: SKYBLOCK Y PARKOUR DE LAVA ═════════

Object.assign(TX.es, {
  skyBtn: 'SkyBlock<small>sobrevive en una isla en el cielo</small>', parkourBtn: 'Parkour de lava<small>salta antes de que suba la lava</small>',
  skyInicio: 'SKYBLOCK<small>abre el cofre: ahí está todo lo que tienes</small>', parkourInicio: 'PARKOUR DE LAVA<small>salta de bloque en bloque hasta la meta de arriba</small>',
  alVacio: 'CAÍSTE AL VACÍO', lavaTe: '¡TE ALCANZÓ LA LAVA!<small>vuelves al último punto de control</small>', lavaSube: 'LA LAVA EMPIEZA A SUBIR', brotePega: 'EL BROTE VA EN PASTO O TIERRA', creceArbol: '¡CRECIÓ UN ÁRBOL!',
  tipoSky: 'SkyBlock', tipoParkour: 'Parkour'
});
Object.assign(TX.en, {
  skyBtn: 'SkyBlock<small>survive on an island in the sky</small>', parkourBtn: 'Lava Parkour<small>jump before the lava rises</small>',
  skyInicio: 'SKYBLOCK<small>open the chest: that is all you have</small>', parkourInicio: 'LAVA PARKOUR<small>jump block to block up to the finish</small>',
  alVacio: 'YOU FELL INTO THE VOID', lavaTe: 'THE LAVA GOT YOU!<small>back to the last checkpoint</small>', lavaSube: 'THE LAVA STARTS RISING', brotePega: 'SAPLINGS GO ON GRASS OR DIRT', creceArbol: 'A TREE GREW!',
  tipoSky: 'SkyBlock', tipoParkour: 'Parkour'
});
Object.assign(TX.pt, {
  skyBtn: 'SkyBlock<small>sobreviva numa ilha no céu</small>', parkourBtn: 'Parkour de lava<small>pule antes que a lava suba</small>',
  skyInicio: 'SKYBLOCK<small>abra o baú: é tudo o que você tem</small>', parkourInicio: 'PARKOUR DE LAVA<small>pule de bloco em bloco até a chegada lá em cima</small>',
  alVacio: 'VOCÊ CAIU NO VAZIO', lavaTe: 'A LAVA TE PEGOU!<small>volta ao último ponto de controle</small>', lavaSube: 'A LAVA COMEÇA A SUBIR', brotePega: 'A MUDA VAI NA GRAMA OU TERRA', creceArbol: 'UMA ÁRVORE CRESCEU!',
  tipoSky: 'SkyBlock', tipoParkour: 'Parkour'
});
Object.assign(NOMBRES.en, { 'Brote de árbol': 'Sapling', 'Generador de piedra': 'Stone generator' });
Object.assign(NOMBRES.pt, { 'Brote de árbol': 'Muda de árvore', 'Generador de piedra': 'Gerador de pedra' });
RECETAS.push([[B.GENERADOR, 1], [[B.ADOQUIN, 8], [I.HIERRO, 1]]]);

// botones en la pantalla de mundo nuevo
{ const f = document.createElement('div'); f.className = 'filaBtn';
  const a = document.createElement('div'); a.className = 'btn'; a.id = 'bSky'; a.dataset.ih = 'skyBtn'; a.style.background = 'linear-gradient(#5fd0ff,#2a8ad0)';
  const b = document.createElement('div'); b.className = 'btn'; b.id = 'bParkour'; b.dataset.ih = 'parkourBtn'; b.style.background = 'linear-gradient(#ff7a4a,#c8341a)';
  f.append(a, b); $('nuevo').insertBefore(f, $('bEjemplo')); aplicarIdioma(); }
function crearMundoTipo(modo, tipo) {
  const lista = leerLista(), id = Date.now().toString(36), n = lista.length + 1;
  lista.unshift({ id, nombre: 'Mundo ' + n, num: n, modo, tipo, tam: 160, semilla: (Math.random() * 2147483647) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0 });
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  pantallaCompleta(); entrarMundo(id);
}
$('bSky').onclick = () => crearMundoTipo('supervivencia', 'skyblock');
$('bParkour').onclick = () => crearMundoTipo('aventura', 'parkour');

// ═════════ GENERADORES DEL VACÍO ═════════
const vacio = () => window.mundoTipo === 'skyblock' || window.mundoTipo === 'parkour';
let skyCofre = -1, pkMeta = -1, pkInicio = null, pkLista = [];
function mundoVacio(S) {
  semilla = S; mundo = new Uint8Array(N); ruinas = []; aldeas = []; ejemploFaro = null; animalesIniciales = []; biomaDe = () => 0;
  return (x, y, z, t) => { if (dentro(x, y, z)) mundo[idx(x, y, z)] = t; };
}
function arbolEn(put, x, y, z, alto) {
  for (let k = 1; k <= alto; k++) put(x, y + k, z, B.TRONCO);
  for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) for (let c = alto - 1; c <= alto + 1; c++)
    if (Math.abs(a) + Math.abs(b) + Math.max(0, c - alto) * 2 < 4 && !(a === 0 && b === 0 && c <= alto)) put(x + a, y + c, z + b, B.HOJAS);
  put(x, y + alto + 1, z, B.HOJAS);
}
function generarSky(S) {
  const put = mundoVacio(S), cx = SX / 2, cz = SZ / 2, y0 = 30;
  // isla en forma de L: 3 capas, pasto arriba
  for (let x = -3; x <= 2; x++) for (let z = -3; z <= 2; z++) { if (x > -1 && z > -1) continue;
    put(cx + x, y0 - 2, cz + z, B.TIERRA); put(cx + x, y0 - 1, cz + z, B.TIERRA); put(cx + x, y0, cz + z, B.PASTO); }
  arbolEn(put, cx - 3, y0, cz - 3, 4);
  skyCofre = idx(cx + 2, y0 + 1, cz - 3); put(cx + 2, y0 + 1, cz - 3, B.COFRE);
  // islita de arena con un cactus, a lo lejos
  const ax = cx + 17, az = cz - 6;
  for (let x = -1; x <= 1; x++) for (let z = -1; z <= 1; z++) { put(ax + x, y0 - 1, az + z, B.ARENA); put(ax + x, y0, az + z, B.ARENA); }
  put(ax, y0 + 1, az, B.CACTUS); put(ax, y0 + 2, az, B.CACTUS);
  spawn = { x: cx - .5, y: y0 + 1, z: cz - 1.5, yaw: Math.PI * .75 };
}
const LOOT_SKY = () => ({ [B.GENERADOR]: 1, [I.PAN]: 4, [I.SEMILLAS]: 3, [I.ZANAHORIA_I]: 1, [I.PAPA_I]: 1, [B.HIELO]: 2, [B.ANTORCHA]: 6, [I.HUESO]: 3 });

function generarParkour(S) {
  const put = mundoVacio(S), cx = SX / 2, cz = SZ / 2, R = 15;
  let sem = S >>> 0; const rnd = () => { sem = (Math.imul(sem, 1664525) + 1013904223) >>> 0; return sem / 4294967296; };
  const losa = (x, y, z, s, t) => { const h = Math.floor(s / 2); for (let a = -h; a <= s - 1 - h; a++) for (let b = -h; b <= s - 1 - h; b++) put(x + a, y, z + b, t); };
  // plataforma de salida
  let th = 0, y = 7, prev = { x: Math.round(cx + R), z: Math.round(cz), s: 5 };
  losa(prev.x, y, prev.z, 5, B.LADRILLO_P); pkLista = [Object.assign({ y }, prev)];
  pkInicio = { x: prev.x + .5, y: y + 1, z: prev.z + .5, yaw: 0 };
  let k = 0, color = 0;
  while (y < SY - 9) {
    k++; const control = k % 12 === 0, sube = control || rnd() < .62;
    const dif = Math.min(1, k / 40), s = control ? 3 : (rnd() < .25 + dif * .5 ? 1 : (rnd() < .5 ? 2 : 3));
    const gMin = sube ? .9 : 1.3, gMax = sube ? 1.6 + dif * .4 : 2 + dif * .5;
    let p = null;
    for (let n = 0; n < 400; n++) { th += .01; const x = Math.round(cx + Math.cos(th) * R), z = Math.round(cz + Math.sin(th) * R);
      const lim = (prev.s + s) / 2, gx = Math.max(0, Math.abs(x - prev.x) - lim), gz = Math.max(0, Math.abs(z - prev.z) - lim), g = Math.hypot(gx, gz);
      if (g >= gMin) { p = { x, z, s }; if (g > gMax) p = null; if (p || g > gMax) break; } }
    if (!p) { th -= .05; continue; }
    if (sube) y++;
    if (control) { losa(p.x, y, p.z, 3, B.LADRILLO_P); put(p.x, y, p.z, B.CONTROL); }
    else losa(p.x, y, p.z, s, B.TELA + 1 + (color++ % 8));
    prev = p; pkLista.push(Object.assign({ y, sube }, p));
  }
  { const q = pkLista[1] || pkLista[0]; pkInicio.yaw = Math.atan2(-(q.x + .5 - pkInicio.x), -(q.z + .5 - pkInicio.z)); }
  // meta arriba de todo
  y++; th += .35; const mx = Math.round(cx + Math.cos(th) * R), mz = Math.round(cz + Math.sin(th) * R);
  losa(mx, y, mz, 5, B.ORO_M); put(mx, y + 1, mz, B.META); pkMeta = idx(mx, y + 1, mz);
  for (const [a, b] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) { put(mx + a, y + 1, mz + b, B.VALLA); put(mx + a, y + 2, mz + b, B.FAROL); }
  spawn = Object.assign({}, pkInicio);
}
{ const p0 = prepararMundo; prepararMundo = function (S, ej) {
  if (window.mundoTipo === 'skyblock') generarSky(S); else if (window.mundoTipo === 'parkour') generarParkour(S); else return p0(S, ej);
  diffs = new Map(); spawnPropio = false;
  if (window.mundoTipo === 'parkour') diffs.set(pkMeta, B.META);
}; }
{ const e0 = entrarMundo; entrarMundo = function (id) {
  e0(id); if (!jugando || !vacio()) return;
  if (window.mundoTipo === 'skyblock' && !mapa.skyIni) { mapa.skyIni = true; cofres[skyCofre] = LOOT_SKY(); sucio = true; setTimeout(() => aviso(TR('skyInicio'), 3500), 3200); }
  if (window.mundoTipo === 'parkour') { if (!mapa.inicio) { mapa.inicio = Object.assign({}, pkInicio); mapa.nombre = TR('parkourBtn').split('<')[0]; mapa.modoJugar = 'aventura'; sucio = true; setTimeout(() => aviso(TR('parkourInicio'), 3500), 3200); } reiniciarLava(); }
  if (window.mundoTipo === 'parkour') REG.caida = 0;
  lavaMesh.visible = window.mundoTipo === 'parkour';
}; }

// ═════════ LAVA QUE SUBE ═════════
const lavaMesh = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  for (let x = 0; x < 64; x++) for (let y = 0; y < 64; y++) { const v = Math.sin(x * .45 + Math.sin(y * .3) * 2) + Math.cos(y * .4 - x * .15); g.fillStyle = v > 1.1 ? '#ffe14a' : v > .3 ? '#ff8a1a' : v > -.6 ? '#e8501a' : '#b83214'; g.fillRect(x, y, 1, 1); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(60, 60); t.magFilter = THREE.NearestFilter;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(480, 480), new THREE.MeshBasicMaterial({ map: t, fog: false }));
  m.rotation.x = -Math.PI / 2; m.visible = false; escena.add(m); return m;
})();
let lavaY = 0, lavaEspera = 6, lavaFin = false;
const LAVA_VEL = .17;
function reiniciarLava() { lavaY = Math.max(0, spawn.y - 9); lavaEspera = 6; lavaFin = false; lavaMesh.position.set(SX / 2, lavaY, SZ / 2); }
{ const v0 = volverAlInicio; volverAlInicio = function () { v0(); if (window.mundoTipo === 'parkour') reiniciarLava(); }; }
{ const l0 = llegarMeta; llegarMeta = function () { lavaFin = true; l0(); }; }

// ═════════ BROTES Y GENERADORES ═════════
let revT = 0, brotes = new Map(), gens = new Map();
function revisarBloques() {
  const b2 = new Map(), g2 = new Map();
  for (const [i, t] of diffs) { if (t === B.BROTE) b2.set(i, brotes.get(i) ?? 40 + Math.random() * 50); else if (t === B.GENERADOR) g2.set(i, gens.get(i) ?? 3); }
  brotes = b2; gens = g2;
}
function crecerArbol(i) {
  const [x, y, z] = xyz(i), suelo = get(x, y - 1, z);
  if (suelo !== B.PASTO && suelo !== B.TIERRA) return false;
  for (let k = 1; k <= 6; k++) if (get(x, y + k, z) !== B.AIRE) return false;
  const L = [], alto = 4 + Math.floor(Math.random() * 2);
  arbolEn((a, b, c, t) => { if (get(a, b, c) === B.AIRE || (a === x && c === z && b === y)) L.push([a, b, c, t]); }, x, y - 1, z, alto);
  ponerMuchos(L); polvo(x + .5, y + .5, z + .5, '#3fae3a', 10); return true;
}
function tocarModos(dir) {
  const id = barra[sel] || 0, h = apuntar(dir);
  if (!h || aventura()) return false;
  if (id === I.HUESO && h.b === B.BROTE) { if (!creativo()) quitarItem(I.HUESO, 1); swing = 1; polvo(h.x + .5, h.y + .5, h.z + .5, '#ffffff', 6); if (Math.random() < .45 || creativo()) { if (crecerArbol(idx(h.x, h.y, h.z))) aviso(TR('creceArbol'), 1200); } return true; }
  if (id === B.BROTE && !(h.cara[1] === 1 && (h.b === B.PASTO || h.b === B.TIERRA))) { aviso(TR('brotePega'), 1200); return true; }
  return false;
}
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) { return tocarModos(dir) || t0(dir); }; }

// ═════════ CADA CUADRO ═════════
let limpiaT = 0;
function modosFrame(dt) {
  if (!jugando) return;
  if (pausado) return;
  revT -= dt; if (revT <= 0) { revT = 2; revisarBloques(); }
  for (const [i, t] of brotes) { const n = t - dt; if (n > 0) { brotes.set(i, n); continue; } brotes.delete(i); if (!crecerArbol(i)) brotes.set(i, 30); }
  for (const [i, t] of gens) { const n = t - dt; if (n > 0) { gens.set(i, n); continue; } gens.set(i, 3.5);
    const [x, y, z] = xyz(i); if (get(x, y + 1, z) !== B.AIRE) continue;
    const r = Math.random(), t2 = r < .02 ? B.ORO_M : r < .065 ? B.HIERRO_M : r < .15 ? B.CARBON_M : r < .155 ? B.CRISTAL_M : B.ADOQUIN;
    ponerBloque(x, y + 1, z, t2); if (Math.hypot(x - J.x, z - J.z) < 12) son(220, .05, 'square', .03); }
  if (!vacio()) return;
  // limpiar bichos que cayeron al vacío
  limpiaT -= dt; if (limpiaT <= 0) { limpiaT = 1;
    for (const m of monstruos.slice()) if (m.position.y < 4) quitarMonstruo(m, false);
    for (const a of animales.slice()) if (a.position.y < 4) quitarAnimal(a); }
  if (window.mundoTipo === 'skyblock') {
    if (J.y < 4) { if (creativo()) Object.assign(J, { x: spawn.x, y: spawn.y + 1, z: spawn.z, vx: 0, vy: 0, vz: 0 }); else { aviso(TR('alVacio'), 1600); lastimar(vida + 1, 0, 0, false); } }
    return;
  }
  // parkour: la lava sube
  if (!lavaFin && !creativo() && cronoOn) { if (lavaEspera > 0) { lavaEspera -= dt; if (lavaEspera <= 0) aviso(TR('lavaSube'), 1400); } else lavaY += LAVA_VEL * dt; }
  lavaMesh.position.y = lavaY + .1; lavaMesh.material.map.offset.x += dt * .02; lavaMesh.material.map.offset.y += dt * .013;
  if ((J.y < lavaY + .3 || J.y < 2) && !creativo()) {
    polvo(J.x, J.y + .5, J.z, '#ff7a1a', 8); vibrar(120); son(120, .3, 'sawtooth', .12); aviso(TR('lavaTe'), 1800);
    Object.assign(J, { x: spawn.x, y: spawn.y, z: spawn.z, vx: 0, vy: 0, vz: 0, yaw: spawn.yaw ?? J.yaw });
    lavaY = Math.max(0, spawn.y - 9); lavaEspera = 3;
  }
}
window.__m = { generarParkour, generarSky, crecerArbol, lava: () => lavaY, brotes: () => brotes, gens: () => gens, pkLista: () => pkLista, skyCofre: () => skyCofre };
