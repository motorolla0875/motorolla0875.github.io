'use strict';
// ═════════ EL ABISMO: mundo subterráneo con magma, cristales y el jefe final, el Ojón Rey ═════════

Object.assign(TX.es, {
  portalAyuda: 'PORTAL AL ABISMO<small>tócalo con la mano vacía para viajar</small>', viajando: 'VIAJANDO AL ABISMO…', volviendo: 'VOLVIENDO A TU MUNDO…', abismo: 'Abismo',
  jefe: 'OJÓN REY', jefeAparece: '¡EL OJÓN REY!<small>derrótalo para salvar el mundo</small>', jefeVencido: '¡VENCISTE AL OJÓN REY!', jefeTxt: 'El Abismo está a salvo. Te llevas su corona, cristales y oro.', seguirJugando: 'Seguir jugando', mitad: '¡LLAMA A SUS HIJOS!',
  abismoInicio: 'EL ABISMO<small>busca la arena del Ojón Rey al norte</small>', quema: '¡QUEMA!',
});
Object.assign(TX.en, {
  portalAyuda: 'ABYSS PORTAL<small>tap it with an empty hand to travel</small>', viajando: 'TRAVELING TO THE ABYSS…', volviendo: 'GOING BACK TO YOUR WORLD…', abismo: 'Abyss',
  jefe: 'BIG EYE KING', jefeAparece: 'THE BIG EYE KING!<small>defeat him to save the world</small>', jefeVencido: 'YOU DEFEATED THE BIG EYE KING!', jefeTxt: 'The Abyss is safe. You take his crown, crystals and gold.', seguirJugando: 'Keep playing', mitad: 'HE CALLS HIS CHILDREN!',
  abismoInicio: 'THE ABYSS<small>find the Big Eye King arena to the north</small>', quema: 'IT BURNS!',
});
Object.assign(TX.pt, {
  portalAyuda: 'PORTAL DO ABISMO<small>toque com a mão vazia para viajar</small>', viajando: 'VIAJANDO PARA O ABISMO…', volviendo: 'VOLTANDO PARA O SEU MUNDO…', abismo: 'Abismo',
  jefe: 'REI OLHÃO', jefeAparece: 'O REI OLHÃO!<small>derrote-o para salvar o mundo</small>', jefeVencido: 'VOCÊ DERROTOU O REI OLHÃO!', jefeTxt: 'O Abismo está a salvo. Você leva a coroa, cristais e ouro.', seguirJugando: 'Continuar jogando', mitad: 'ELE CHAMA OS FILHOS!',
  abismoInicio: 'O ABISMO<small>procure a arena do Rei Olhão ao norte</small>', quema: 'QUEIMA!',
});
{ const st = document.createElement('style'); st.textContent = `
  #jefeBar { position: fixed; top: 92px; left: 50%; transform: translateX(-50%); z-index: 4; width: min(420px, 70vw); text-align: center; pointer-events: none; font-size: 15px; color: #ffb0ff; }
  #jefeBar .fondo { height: 12px; border-radius: 6px; background: rgba(13,21,61,.7); border: 2px solid #0d153d; overflow: hidden; margin-top: 2px; } #jefeBar i { display: block; height: 100%; background: linear-gradient(90deg, #ff4adc, #8a3fd0); transition: width .2s; }
`; document.head.appendChild(st); }
{ const d = document.createElement('div'); d.id = 'jefeBar'; d.className = 'sombra'; d.hidden = true; d.innerHTML = `<div data-i="jefe"></div><div class="fondo"><i></i></div>`; $('hud').appendChild(d); }
cap('victoriaCapa', '<div class="titulo" style="font-size:clamp(24px,5vw,40px);color:#ffe14a" data-i="jefeVencido"></div><div class="texto" data-i="jefeTxt" style="font-size:16px"></div><div class="btn" id="victoriaOk" data-i="seguirJugando"></div>');
aplicarIdioma();

// ═════════ GENERACIÓN DEL ABISMO ═════════
const ARENA = { x: 80, z: 34, y: 10, r: 15 };
function generarAbismo(S) {
  semilla = S; mundo = new Uint8Array(N); ruinas = []; aldeas = []; ejemploFaro = null; animalesIniciales = null; biomaDe = () => 0;
  const put = (x, y, z, t) => { if (dentro(x, y, z)) mundo[idx(x, y, z)] = t; };
  for (let x = 0; x < SX; x++) for (let z = 0; z < SZ; z++) {
    const suelo = Math.round(8 + vn2(x / 14, z / 14, S + 1) * 6 + vn2(x / 5, z / 5, S + 2) * 2), techo = Math.round(SY - 6 - vn2(x / 11, z / 11, S + 3) * 8);
    const pilar = vn2(x / 6, z / 6, S + 4) > .8, magma = vn2(x / 9 + 30, z / 9, S + 5) > .73;
    const borde = x < 2 || z < 2 || x >= SX - 2 || z >= SZ - 2;
    for (let y = 0; y < SY; y++) { let t = 0;
      if (y === 0 || borde) t = B.ROCA;
      else if (y <= suelo || y >= techo || pilar) t = B.PIEDRA_ABISMO;
      if (t === B.PIEDRA_ABISMO && magma && y === suelo && !pilar) t = B.MAGMA;
      if (t === B.PIEDRA_ABISMO && h3(x, y, z, S + 6) < .012) t = B.CRISTAL_OSC_M;
      else if (t === B.PIEDRA_ABISMO && h3(x, y, z, S + 7) < .006) t = B.ORO_M;
      put(x, y, z, t); } }
  // arena del jefe: un círculo plano con pilares de cristal
  for (let x = ARENA.x - ARENA.r - 2; x <= ARENA.x + ARENA.r + 2; x++) for (let z = ARENA.z - ARENA.r - 2; z <= ARENA.z + ARENA.r + 2; z++) { const d = Math.hypot(x - ARENA.x, z - ARENA.z); if (d > ARENA.r + 2) continue;
    for (let y = 1; y < SY - 4; y++) put(x, y, z, y < ARENA.y ? B.PIEDRA_ABISMO : y === ARENA.y ? (d > ARENA.r ? B.MAGMA : (Math.floor(x / 3) + Math.floor(z / 3)) % 2 ? B.PIEDRA_ABISMO : B.LADRILLO_P) : B.AIRE); }
  for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283, x = Math.round(ARENA.x + Math.cos(a) * (ARENA.r - 1)), z = Math.round(ARENA.z + Math.sin(a) * (ARENA.r - 1)); for (let y = ARENA.y + 1; y < ARENA.y + 7; y++) put(x, y, z, y === ARENA.y + 6 ? B.CRISTAL_OSC_M : B.PIEDRA_ABISMO); }
  // camino desde la llegada hasta la arena
  const sx = 80, sz = 132;
  for (let z = ARENA.z + ARENA.r; z <= sz + 4; z++) for (let x = sx - 2; x <= sx + 2; x++) { for (let y = 1; y < ARENA.y; y++) put(x, y, z, B.PIEDRA_ABISMO); put(x, ARENA.y, z, Math.abs(x - sx) === 2 ? B.PIEDRA_ABISMO : B.LADRILLO_P); for (let y = ARENA.y + 1; y < ARENA.y + 6; y++) put(x, y, z, B.AIRE); if (z % 8 === 0 && Math.abs(x - sx) === 2) put(x, ARENA.y + 1, z, B.FAROL); }
  // plataforma de llegada con el portal de vuelta
  for (let x = sx - 4; x <= sx + 4; x++) for (let z = sz - 3; z <= sz + 5; z++) { put(x, ARENA.y, z, B.LADRILLO_P); for (let y = ARENA.y + 1; y < ARENA.y + 7; y++) put(x, y, z, B.AIRE); }
  put(sx, ARENA.y + 1, sz + 4, B.PORTAL); put(sx - 3, ARENA.y + 1, sz + 4, B.FAROL); put(sx + 3, ARENA.y + 1, sz + 4, B.FAROL);
  spawn = { x: sx + .5, y: ARENA.y + 1, z: sz + .5, yaw: 0 };
}

// ═════════ VIAJAR POR EL PORTAL ═════════
function viajar() {
  const lista = leerLista(), meta = lista.find(m => m.id === mundoId); if (!meta) return;
  const llevar = { inv: JSON.parse(JSON.stringify(inv)), barra: barra.slice(), sel, vida, hambre, arm: (stats.armadura || [0, 0, 0, 0]).slice() };
  guardar();
  let destino, volver = false;
  if (meta.tipo === 'abismo') { destino = meta.padre; volver = true; }
  else { meta.portal = { x: J.x, y: J.y, z: J.z };
    if (!meta.abismo || !lista.some(m => m.id === meta.abismo)) { const id = Date.now().toString(36); lista.unshift({ id, nombre: meta.nombre + ' · ' + TR('abismo'), num: meta.num, modo: meta.modo, tipo: 'abismo', importado: true, padre: meta.id, tam: 160, semilla: (meta.semilla + 777) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0 }); meta.abismo = id; }
    destino = meta.abismo; }
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  aviso(TR(volver ? 'volviendo' : 'viajando'), 1500); $('flash').style.opacity = .8;
  setTimeout(() => {
    entrarMundo(destino);
    Object.assign(window, {}); inv = llevar.inv; barra = llevar.barra; sel = llevar.sel; vida = llevar.vida; hambre = llevar.hambre; stats.armadura = llevar.arm;
    if (volver) { const p = leerLista().find(m => m.id === destino).portal; if (p) Object.assign(J, { x: p.x + 1.5, y: p.y + .2, z: p.z, vx: 0, vy: 0, vz: 0 }); }
    else { REG.hora = 'noche'; setTimeout(() => aviso(TR('abismoInicio'), 3000), 500); }
    pintarBarra(); pintarVida(); hambrePintado = -1; pintarHambre(); rearmarJugador(); guardar(); $('flash').style.opacity = 0;
  }, 350);
}
function tocarPortal(dir) {
  const h = apuntar(dir); if (!h || h.b !== B.PORTAL) return false;
  const id = barra[sel] || 0; if (id && !ITEM[id]) return false;
  viajar(); return true;
}

// ═════════ EL OJÓN REY ═════════
TIPOS.ojonRey = { vida: 400, an: 1.7, al: 3.6, vel: 1.25, peso: 1, color: '#6b3fa0', voz: 'rugido', hostil: true, dano: 6, jefe: true,
  armar(g) { const cu = matA(0x7e4ab8), pa = matA(0x45276b), bl = matA(0xf2f2f2), ne = new THREE.MeshLambertMaterial({ color: 0x1a1022 }), oro = matA(0xffd23a), ro = matA(0xe03a2a);
    caja(g, 3.4, 3.4, 3.4, 0, 2.5, 0, cu); caja(g, 2.1, 1.6, .1, 0, 2.9, 1.72, bl); caja(g, .9, .9, .12, 0, 2.85, 1.76, ne); caja(g, 3.5, .3, 3.5, 0, 4.2, 0, pa);
    caja(g, 2.6, .5, 2.6, 0, 4.5, 0, oro); for (const [x, z] of [[-1.1, -1.1], [1.1, -1.1], [-1.1, 1.1], [1.1, 1.1], [0, 1.1], [0, -1.1], [1.1, 0], [-1.1, 0]]) caja(g, .4, .6, .4, x, 5, z, oro); caja(g, .3, .3, .1, 0, 4.55, 1.32, ro);
    return [-1, 1].map(s => pata(g, .9, 1.1, .9, s * .9, 1.1, 0, pa)); },
  suelta: () => [[I.CORONA, 1], [I.CRISTAL, 10], [I.ORO, 12], [B.HUEVO + 4, 1]] };
TIPOS.ojonHijo = { vida: 8, an: .3, al: .8, vel: 1.8, peso: .3, color: '#6b3fa0', voz: 'ojon', hostil: true, dano: 2, armar: g => TIPOS.miniojon.armar(g), suelta: () => [[I.CARBON, 1]] };
let jefe = null, orbes = [], jefeT = { orbe: 3, salto: 7, hijos: 0 }, magmaT = 0;
function moverJefe(dt) {
  const enAbismo = window.mundoTipo === 'abismo'; $('jefeBar').hidden = !(jefe && animales.includes(jefe));
  if (!enAbismo) return;
  // aparece cuando entras a la arena
  if (!jefe && !mapa.jefeVencido && Math.hypot(J.x - ARENA.x, J.z - ARENA.z) < ARENA.r + 3) { jefe = animales.find(a => a.userData.animal === 'ojonRey') || crearAnimal('ojonRey', ARENA.x + .5, ARENA.y + 1, ARENA.z - 6 + .5); jefeT = { orbe: 3, salto: 7, hijos: 0 }; aviso(TR('jefeAparece'), 2600); voz('rugido', 0); temblorJefe(.6); }
  if (!jefe) return;
  if (!animales.includes(jefe)) { if (jefe.userData.vida <= 0) ganar(); jefe = null; return; }
  const u = jefe.userData, p = jefe.position, d = Math.hypot(J.x - p.x, J.z - p.z), T = TIPOS.ojonRey;
  $('jefeBar').querySelector('i').style.width = Math.max(0, u.vida / T.vida * 100) + '%';
  if (creativo() || pausado) return;
  // ataque de orbes
  jefeT.orbe -= dt; if (jefeT.orbe <= 0 && d > 3.5) { jefeT.orbe = u.vida < T.vida / 2 ? 2.2 : 3.4; for (let k = -1; k <= 1; k++) { const o = new THREE.Mesh(new THREE.BoxGeometry(.5, .5, .5), new THREE.MeshBasicMaterial({ color: 0xff4adc })), ini = new THREE.Vector3(p.x, p.y + 2.9, p.z), v = new THREE.Vector3(J.x - ini.x, J.y + 1 - ini.y, J.z - ini.z).normalize().multiplyScalar(11); v.applyAxisAngle(new THREE.Vector3(0, 1, 0), k * .25); o.position.copy(ini); escena.add(o); orbes.push({ o, v, t: 0 }); } son(300, .3, 'square', .1); }
  // salto que hace temblar el piso
  jefeT.salto -= dt; if (jefeT.salto <= 0 && u.suelo) { jefeT.salto = 6 + Math.random() * 3; u.vy = 11; u.saltando = true; }
  if (u.saltando && u.suelo && u.vy === 0) { u.saltando = false; temblorJefe(.5); polvo(p.x, p.y + .3, p.z, '#5a2a7a', 25); son(60, .6, 'sawtooth', .2); if (d < 6) lastimar(5, (J.x - p.x) / (d || 1) * 2, (J.z - p.z) / (d || 1) * 2); }
  // a la mitad y al cuarto de vida llama a sus hijos
  const fase = u.vida < T.vida / 4 ? 2 : u.vida < T.vida / 2 ? 1 : 0; if (fase > jefeT.hijos) { jefeT.hijos = fase; aviso(TR('mitad'), 1500); for (let k = 0; k < 3; k++) crearAnimal('ojonHijo', p.x + Math.cos(k * 2.1) * 3, p.y + 1, p.z + Math.sin(k * 2.1) * 3); }
}
function moverOrbes(dt) {
  for (const b of orbes.slice()) { b.t += dt; b.o.position.addScaledVector(b.v, dt); b.o.rotation.x += dt * 5; b.o.rotation.y += dt * 4; const q = b.o.position, t = get(Math.floor(q.x), Math.floor(q.y), Math.floor(q.z));
    const toca = Math.abs(q.x - J.x) < .6 && Math.abs(q.z - J.z) < .6 && q.y > J.y && q.y < J.y + 1.8;
    if (toca) lastimar(4, b.v.x / 11, b.v.z / 11);
    if (toca || b.t > 4 || (t && DEF[t].solido)) { polvo(q.x, q.y, q.z, '#ff4adc', 6); escena.remove(b.o); b.o.geometry.dispose(); orbes.splice(orbes.indexOf(b), 1); } }
}
function temblorJefe(n) { if (typeof temblor !== 'undefined') temblor = n; vibrar(150); }
function ganar() {
  mapa.jefeVencido = true; sucio = true; stats.jefe = true;
  const padre = leerLista().find(m => m.id === (leerLista().find(x => x.id === mundoId) || {}).padre); if (padre) { const l = leerLista(); l.find(m => m.id === padre.id).jefeVencido = true; localStorage.setItem('bloquesMundos', JSON.stringify(l)); }
  for (let k = 0; k < 40; k++) setTimeout(() => polvo(J.x + (Math.random() - .5) * 8, J.y + 3 + Math.random() * 4, J.z + (Math.random() - .5) * 8, ['#ffe14a', '#ff4adc', '#8fdcff', '#6cff5a'][k % 4], 8), k * 60);
  sonar('final', .9); pausado = true; soltarTodo(); setTimeout(() => abrir('victoriaCapa'), 900);
}
$('victoriaOk').onclick = () => { cerrar('victoriaCapa'); pausado = false; };

// ═════════ TOCAR Y CADA CUADRO ═════════
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) { if (tocarPortal(dir)) return true; return t0(dir); }; }
function abismoFrame(dt) {
  if (!jugando) return;
  moverOrbes(pausado ? 0 : dt); if (pausado) return; moverJefe(dt);
  // el magma quema
  magmaT -= dt; if (magmaT <= 0) { magmaT = .5; const f = y => get(Math.floor(J.x), Math.floor(y), Math.floor(J.z)) === B.MAGMA; if (!creativo() && (f(J.y - .1) || f(J.y + .2))) { lastimar(2, 0, 0, false); polvo(J.x, J.y + .3, J.z, '#ff7a1a', 6); aviso(TR('quema'), 600); } }
}
{ const e0 = entrarMundo; entrarMundo = function (id) { for (const b of orbes.splice(0)) escena.remove(b.o); jefe = null; e0(id); }; }
window.__ab = { viajar, ganar, ARENA, jefe: () => jefe };
