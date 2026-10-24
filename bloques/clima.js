'use strict';
// ═════════ CLIMA (lluvia, nieve, tormentas con rayos), FUEGOS ARTIFICIALES, TOCADISCOS Y FECHAS ESPECIALES ═════════

Object.assign(TX.es, { llueve: 'EMPIEZA A LLOVER', tormenta: '¡TORMENTA!', escampa: 'SALIÓ EL SOL', navidad: '¡FELIZ NAVIDAD!<small>mira la nieve y busca tu regalo</small>', regalo: '¡TE DEJARON UN REGALO!<small>está en el cofre de al lado</small>', anioNuevo: '¡FELIZ AÑO NUEVO!', discoPide: 'PON UN DISCO EN EL TOCADISCOS<small>los discos se encuentran en cofres de minas y barcos hundidos</small>', suena: 'SUENA: {n}' });
Object.assign(TX.en, { llueve: 'IT STARTS TO RAIN', tormenta: 'THUNDERSTORM!', escampa: 'THE SUN IS OUT', navidad: 'MERRY CHRISTMAS!<small>enjoy the snow and find your gift</small>', regalo: 'SOMEONE LEFT YOU A GIFT!<small>it is in the chest next to you</small>', anioNuevo: 'HAPPY NEW YEAR!', discoPide: 'PUT A DISC IN THE JUKEBOX<small>discs are found in mine and shipwreck chests</small>', suena: 'NOW PLAYING: {n}' });
Object.assign(TX.pt, { llueve: 'COMEÇA A CHOVER', tormenta: 'TEMPESTADE!', escampa: 'O SOL APARECEU', navidad: 'FELIZ NATAL!<small>curta a neve e procure seu presente</small>', regalo: 'DEIXARAM UM PRESENTE PARA VOCÊ!<small>está no baú ao lado</small>', anioNuevo: 'FELIZ ANO NOVO!', discoPide: 'COLOQUE UM DISCO NO TOCA-DISCOS<small>os discos ficam em baús de minas e naufrágios</small>', suena: 'TOCANDO: {n}' });

const hoy = new Date(), mesH = hoy.getMonth(), diaH = hoy.getDate();
const esNavidad = () => (mesH === 11 && diaH >= 15) || (mesH === 0 && diaH <= 6);
const esAnioNuevo = () => (mesH === 11 && diaH === 31) || (mesH === 0 && diaH === 1);

// ═════════ CLIMA ═════════
let clima = 'sol', climaT = 200 + Math.random() * 200, luzObj = 1;
window.climaLuz = 1; window.climaTipo = 'sol';
const hayClima = () => jugando && !window.mundoTipo && modoJuego !== 'aventura';
function cambiarClima(nuevo, avisar = true) {
  if (nuevo === clima) return; clima = nuevo; window.climaTipo = nuevo;
  climaT = nuevo === 'sol' ? 240 + Math.random() * 300 : nuevo === 'lluvia' ? 90 + Math.random() * 120 : 60 + Math.random() * 80;
  if (typeof mapa !== 'undefined') { mapa.clima = clima; mapa.climaT = climaT; }
  if (avisar && jugando) aviso(TR(nuevo === 'sol' ? 'escampa' : nuevo === 'lluvia' ? 'llueve' : 'tormenta'), 1600);
}
{ const e0 = entrarMundo; entrarMundo = function (id) { const r = e0(id); try { clima = 'sol'; window.climaTipo = 'sol'; if (mapa.clima && hayClima()) { clima = mapa.clima; window.climaTipo = clima; climaT = mapa.climaT || 120; } else climaT = 200 + Math.random() * 200; } catch (e) {} return r; }; }

// gotas de lluvia y copos de nieve alrededor de la cámara
const NG = 900, geoLl = new THREE.BufferGeometry(), posLl = new Float32Array(NG * 6); geoLl.setAttribute('position', new THREE.BufferAttribute(posLl, 3));
const lluvia = new THREE.LineSegments(geoLl, new THREE.LineBasicMaterial({ color: 0xaac4ff, transparent: true, opacity: .55, fog: false })); lluvia.frustumCulled = false; lluvia.visible = false; escena.add(lluvia);
const NN = 700, geoNi = new THREE.BufferGeometry(), posNi = new Float32Array(NN * 3); geoNi.setAttribute('position', new THREE.BufferAttribute(posNi, 3));
const nieve = new THREE.Points(geoNi, new THREE.PointsMaterial({ color: 0xffffff, size: .08, transparent: true, opacity: .85, fog: false })); nieve.frustumCulled = false; nieve.visible = false; escena.add(nieve);
const gotas = Array.from({ length: NG }, () => ({ x: 0, y: -999, z: 0, v: 16 + Math.random() * 6 })), copos = Array.from({ length: NN }, () => ({ x: 0, y: -999, z: 0, f: Math.random() * 6 }));
const techo = (x, z) => { const xi = Math.floor(x), zi = Math.floor(z); if (xi < 0 || zi < 0 || xi >= SX || zi >= SZ) return 0; return alt[xi + SX * zi] + 1; };
function moverPrecipitacion(dt, llueve, nieva) {
  const c = cam.position;
  lluvia.visible = llueve; nieve.visible = nieva;
  if (llueve) { let k = 0; for (const g of gotas) {
      g.y -= g.v * dt; if (g.y < c.y - 10 || g.y < techo(g.x, g.z) || Math.abs(g.x - c.x) > 14 || Math.abs(g.z - c.z) > 14) { g.x = c.x + (Math.random() - .5) * 28; g.z = c.z + (Math.random() - .5) * 28; g.y = c.y + 6 + Math.random() * 10; }
      const vis = g.y >= techo(g.x, g.z); posLl[k++] = g.x; posLl[k++] = vis ? g.y : -999; posLl[k++] = g.z; posLl[k++] = g.x + .03; posLl[k++] = vis ? g.y + .45 : -999; posLl[k++] = g.z; }
    geoLl.attributes.position.needsUpdate = true; }
  if (nieva) { let k = 0; for (const s of copos) {
      s.y -= 1.6 * dt; s.f += dt; s.x += Math.sin(s.f) * dt * .5;
      if (s.y < c.y - 8 || s.y < techo(s.x, s.z) || Math.abs(s.x - c.x) > 13 || Math.abs(s.z - c.z) > 13) { s.x = c.x + (Math.random() - .5) * 26; s.z = c.z + (Math.random() - .5) * 26; s.y = c.y + 4 + Math.random() * 10; }
      posNi[k++] = s.x; posNi[k++] = s.y >= techo(s.x, s.z) ? s.y : -999; posNi[k++] = s.z; }
    geoNi.attributes.position.needsUpdate = true; }
}
// sonido de la lluvia
let lluviaSon = null;
function sonidoLluvia(vol) {
  const c = AU.ctx; if (!c) return;
  if (!lluviaSon && vol > 0) { const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const s = c.createBufferSource(); s.buffer = b; s.loop = true; const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400; const g = c.createGain(); g.gain.value = 0; s.connect(f).connect(g).connect(AU.sfx); s.start(); lluviaSon = { s, g }; }
  if (lluviaSon) lluviaSon.g.gain.setTargetAtTime(vol, c.currentTime, .5);
}
// rayos
const rayoGeo = new THREE.BufferGeometry(), rayoPos = new Float32Array(16 * 3); rayoGeo.setAttribute('position', new THREE.BufferAttribute(rayoPos, 3));
const rayo = new THREE.Line(rayoGeo, new THREE.LineBasicMaterial({ color: 0xffffff, fog: false })); rayo.frustumCulled = false; rayo.visible = false; escena.add(rayo);
let rayoT = 6, rayoVis = 0;
function caerRayo() {
  const a = Math.random() * 6.283, d = 12 + Math.random() * 40, x = J.x + Math.cos(a) * d, z = J.z + Math.sin(a) * d, suelo = techo(x, z);
  let px = x, pz = z; for (let k = 0; k < 16; k++) { const y = suelo + (15 - k) / 15 * (SY + 30 - suelo); rayoPos[k * 3] = px; rayoPos[k * 3 + 1] = y; rayoPos[k * 3 + 2] = pz; px = x + (Math.random() - .5) * 3 * (1 - k / 15); pz = z + (Math.random() - .5) * 3 * (1 - k / 15); }
  rayoGeo.attributes.position.needsUpdate = true; rayo.visible = true; rayoVis = .25;
  const fl = $('flash'); fl.style.transition = 'none'; fl.style.opacity = .55; requestAnimationFrame(() => { fl.style.transition = 'opacity .5s'; fl.style.opacity = 0; });
  setTimeout(() => { ruido(1.6, .4, 180); son(55, 1.2, 'sawtooth', .08); }, Math.min(2500, d * 30));
}
function climaFrame(dt) {
  const enLineaInv = typeof MP !== 'undefined' && MP.invitado;
  if (!hayClima() && !enLineaInv) { if (clima !== 'sol') cambiarClima('sol', false); }
  else if (!enLineaInv && !pausado) { climaT -= dt; if (climaT <= 0) cambiarClima(clima === 'sol' ? (Math.random() < .3 ? 'tormenta' : 'lluvia') : 'sol'); }
  if (enLineaInv && window.climaRemoto && window.climaRemoto !== clima) { clima = window.climaRemoto; window.climaTipo = clima; }
  luzObj = clima === 'tormenta' ? .5 : clima === 'lluvia' ? .74 : 1;
  window.climaLuz += (luzObj - window.climaLuz) * Math.min(1, dt * .6);
  const c = cam.position, frio = typeof biomaDe === 'function' && biomaDe && biomaDe(Math.floor(c.x), Math.floor(c.z)) === 2;
  const cae = jugando && clima !== 'sol', nieva = jugando && ((cae && frio) || esNavidad()), llueve = cae && !frio;
  moverPrecipitacion(dt, llueve, nieva);
  const bajoTecho = techo(c.x, c.z) > c.y + 1;
  sonidoLluvia(llueve ? (bajoTecho ? .05 : (clima === 'tormenta' ? .16 : .1)) * (AJ.sonidos > 0 ? 1 : 0) : 0);
  if (clima === 'tormenta' && jugando && !pausado) { rayoT -= dt; if (rayoT <= 0) { rayoT = 5 + Math.random() * 10; caerRayo(); } }
  if (rayoVis > 0) { rayoVis -= dt; if (rayoVis <= 0) rayo.visible = false; }
}

// ═════════ FUEGOS ARTIFICIALES ═════════
const cohetes = [], chispas = [];
const COLORES_FA = [0xff4a5f, 0xffd23a, 0x3fb4f5, 0x7ae05a, 0xff7ae0, 0xffffff, 0xff9a2e];
function lanzarCohete(x, y, z) {
  const g = new THREE.Mesh(new THREE.BoxGeometry(.12, .4, .12), new THREE.MeshBasicMaterial({ color: 0xff4a5f })); g.position.set(x, y, z); escena.add(g);
  cohetes.push({ g, vy: 13, t: 1.1 + Math.random() * .4, col: [COLORES_FA[Math.floor(Math.random() * COLORES_FA.length)], COLORES_FA[Math.floor(Math.random() * COLORES_FA.length)]] });
  ruido(.5, .08, 2500);
}
function explotarCohete(c) {
  const N = 140, pos = new Float32Array(N * 3), vel = [], col = new Float32Array(N * 3), p = c.g.position;
  for (let i = 0; i < N; i++) { const u = Math.random() * 2 - 1, a = Math.random() * 6.283, s = Math.sqrt(1 - u * u), sp = 6 + Math.random() * 2; vel.push([Math.cos(a) * s * sp, u * sp, Math.sin(a) * s * sp]);
    pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z; const cc = new THREE.Color(c.col[i % 2]); col[i * 3] = cc.r; col[i * 3 + 1] = cc.g; col[i * 3 + 2] = cc.b; }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: .35, vertexColors: true, transparent: true, opacity: 1, fog: false, depthWrite: false, blending: THREE.AdditiveBlending })); pts.frustumCulled = false; escena.add(pts);
  chispas.push({ pts, vel, t: 0 }); const d = Math.hypot(p.x - J.x, p.z - J.z); setTimeout(() => { ruido(.6, Math.max(.05, .35 - d / 120), 400); son(70, .4, 'sawtooth', .06); }, Math.min(1500, d * 25));
}
function moverFuegos(dt) {
  for (const c of cohetes.slice()) { c.t -= dt; c.g.position.y += c.vy * dt; if (Math.random() < .6) polvo(c.g.position.x, c.g.position.y - .2, c.g.position.z, '#ffd23a', 1);
    if (c.t <= 0) { explotarCohete(c); escena.remove(c.g); cohetes.splice(cohetes.indexOf(c), 1); } }
  for (const s of chispas.slice()) { s.t += dt; const a = s.pts.geometry.attributes.position.array;
    for (let i = 0; i < s.vel.length; i++) { const v = s.vel[i]; v[1] -= 5 * dt; v[0] *= .98; v[2] *= .98; a[i * 3] += v[0] * dt; a[i * 3 + 1] += v[1] * dt; a[i * 3 + 2] += v[2] * dt; }
    s.pts.geometry.attributes.position.needsUpdate = true; s.pts.material.opacity = Math.max(0, 1 - s.t / 1.8);
    if (s.t > 1.8) { escena.remove(s.pts); s.pts.geometry.dispose(); chispas.splice(chispas.indexOf(s), 1); } }
}

// ═════════ TOCADISCOS ═════════
const NOMBRE_DISCO = k => nom(I.DISCO + k).split(': ')[1] || nom(I.DISCO + k);
const sonando = new Map(); // idx -> { disco, prox, paso, g }
const CANCIONES = [
  { escala: [0, 2, 4, 7, 9], base: 60, tempo: .28, forma: 'triangle', bajo: [0, 5, 7, 5] },
  { escala: [0, 3, 5, 7, 10], base: 57, tempo: .34, forma: 'sine', bajo: [0, 7, 3, 5] },
  { escala: [0, 2, 3, 7, 8], base: 52, tempo: .4, forma: 'square', bajo: [0, 0, 3, 7] },
];
const mf = m => 440 * Math.pow(2, (m - 69) / 12);
function notaDisco(s, f, t, d, v, forma) {
  const c = AU.ctx, o = c.createOscillator(), g = c.createGain(); o.type = forma; o.frequency.value = f;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g).connect(s.g); o.start(t); o.stop(t + d + .05);
}
function tocarDisco(i, k) {
  const c = audio(); if (!c) return; pararDisco(i);
  const g = c.createGain(); g.gain.value = 0; g.connect(AU.mus);
  sonando.set(i, { disco: k, prox: c.currentTime + .1, paso: 0, g, sem: 7 + k * 31, grado: 2 });
  if (typeof mapa !== 'undefined') { mapa.discos = mapa.discos || {}; mapa.discos[i] = k; sucio = true; }
  aviso(TR('suena', { n: NOMBRE_DISCO(k) }), 1600);
}
function pararDisco(i) { const s = sonando.get(i); if (s) { try { s.g.gain.setTargetAtTime(0, AU.ctx.currentTime, .1); setTimeout(() => s.g.disconnect(), 600); } catch (e) {} sonando.delete(i); } if (typeof mapa !== 'undefined' && mapa.discos) { delete mapa.discos[i]; sucio = true; } }
function programarMusica(dt) {
  const c = AU.ctx; if (!c) return;
  for (const [i, s] of sonando) {
    if (mundo[i] !== B.TOCADISCOS) { pararDisco(i); continue; }
    const [x, y, z] = xyz(i), d = Math.hypot(x + .5 - J.x, y - J.y, z + .5 - J.z), v = jugando && !pausado ? Math.max(0, 1 - d / 26) : 0; s.g.gain.setTargetAtTime(v * .9, c.currentTime, .2);
    const C = CANCIONES[s.disco];
    while (s.prox < c.currentTime + .6) { const t = s.prox, n = s.paso;
      s.sem = (s.sem * 1103515245 + 12345) & 0x7fffffff; const r = (s.sem % 1000) / 1000;
      if (r < .8) { s.grado = Math.max(0, Math.min(9, s.grado + Math.floor(r * 5) - 2)); notaDisco(s, mf(C.base + 12 * Math.floor(s.grado / 5) + C.escala[s.grado % 5]), t, C.tempo * 1.6, .12, C.forma); }
      if (n % 4 === 0) notaDisco(s, mf(C.base - 12 + C.bajo[(n / 4 | 0) % 4]), t, C.tempo * 3.5, .14, 'sine');
      s.paso++; s.prox += C.tempo; }
    s.notaT = (s.notaT || 0) - dt; if (s.notaT <= 0 && v > 0) { s.notaT = .6; polvo(x + .5, y + 1.2, z + .5, ['#ff4a5f', '#3fb4f5', '#ffd23a', '#7ae05a'][Math.floor(Math.random() * 4)], 2); }
  }
}
{ const e0 = entrarMundo; entrarMundo = function (id) { for (const i of [...sonando.keys()]) { const s = sonando.get(i); try { s.g.disconnect(); } catch (e) {} } sonando.clear(); const r = e0(id);
    try { for (const i in (mapa.discos || {})) if (mundo[+i] === B.TOCADISCOS) setTimeout(() => { if (audio()) { const k = mapa.discos[i]; const c = AU.ctx, g = c.createGain(); g.gain.value = 0; g.connect(AU.mus); sonando.set(+i, { disco: k, prox: c.currentTime + .1, paso: 0, g, sem: 7 + k * 31, grado: 2 }); } }, 500); } catch (e) {}
    return r; }; }
{ const s0 = salirAlMenu; salirAlMenu = function () { for (const s of sonando.values()) try { s.g.disconnect(); } catch (e) {} sonando.clear(); sonidoLluvia(0); return s0(); }; }

// ─── tocar: cohetes y tocadiscos ───
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) {
    const id = barra[sel] || 0, h = apuntar(dir);
    if (id === I.COHETE) { const o = h ? new THREE.Vector3(h.x + .5 + h.cara[0] * .6, h.y + .5 + h.cara[1] * .6, h.z + .5 + h.cara[2] * .6) : new THREE.Vector3(J.x - Math.sin(J.yaw) * 2, J.y + 1, J.z - Math.cos(J.yaw) * 2);
      lanzarCohete(o.x, o.y, o.z); if (!creativo()) quitarItem(I.COHETE, 1); swing = 1; return true; }
    if (h && h.b === B.TOCADISCOS && !aventura()) { const i = idx(h.x, h.y, h.z);
      if (sonando.has(i)) { const k = sonando.get(i).disco; pararDisco(i); darItem(I.DISCO + k, 1); swing = 1; return true; }
      if (id >= I.DISCO && id <= I.DISCO + 2) { if (!creativo()) quitarItem(id, 1); tocarDisco(i, id - I.DISCO); swing = 1; return true; }
      aviso(TR('discoPide'), 2200); return true; }
    return t0(dir); }; }

// ═════════ NAVIDAD Y AÑO NUEVO ═════════
let anioT = 3;
{ const e0 = entrarMundo; entrarMundo = function (id) { const r = e0(id);
    if (esNavidad() && jugando && !window.mundoTipo && !(typeof MP !== 'undefined' && MP.invitado)) {
      if (!entrarMundo.yaNav) { entrarMundo.yaNav = true; setTimeout(() => aviso(TR('navidad'), 3200), 3600); }
      const hoyS = hoy.toDateString(); if (mapa.regalo !== hoyS) { mapa.regalo = hoyS; setTimeout(() => ponerRegalo(), 7500); }
    }
    return r; }; }
function ponerRegalo() {
  if (!jugando) return;
  for (const [a, b] of [[2, 0], [-2, 0], [0, 2], [0, -2], [2, 2], [-2, -2]]) { const x = Math.floor(J.x) + a, z = Math.floor(J.z) + b, y = Math.floor(J.y);
    if (get(x, y, z) === B.AIRE && solidoMov(get(x, y - 1, z))) { sinGrupo(() => ponerBloque(x, y, z, B.COFRE)); cofres[idx(x, y, z)] = { [I.COHETE]: 6, [I.MIEL]: 2, [I.PAN]: 3, [I.DISCO + Math.floor(Math.random() * 3)]: 1, [I.ORO]: 3 }; polvo(x + .5, y + 1, z + .5, '#ffd23a', 14); aviso(TR('regalo'), 2600); sucio = true; return; } }
}

// ═════════ CADA CUADRO ═════════
function extrasFrame(dt) {
  try { climaFrame(dt); } catch (e) { console.error(e); }
  moverFuegos(dt); programarMusica(dt);
  if (esAnioNuevo() && jugando && !pausado && oscuridad() > .5) { anioT -= dt; if (anioT <= 0) { anioT = 2 + Math.random() * 3; const a = Math.random() * 6.283, d = 10 + Math.random() * 20; lanzarCohete(J.x + Math.cos(a) * d, J.y + 2, J.z + Math.sin(a) * d); if (!extrasFrame.dicho) { extrasFrame.dicho = true; aviso(TR('anioNuevo'), 3000); } } }
}
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; extrasFrame(dt); }; requestAnimationFrame(tick); }
// ═════════ LOGROS NUEVOS ═════════
if (typeof LOGROS !== 'undefined') {
  const c = k => (LG.c[k] || 0) >= 1, nuevos = [
    ['marinero', I.BOTE, () => c('bote'), 'Marinero', 'Navega en un bote', 'Sailor', 'Ride a boat', 'Marinheiro', 'Navegue em um barco'],
    ['vagon', I.VAGONETA, () => c('vagon'), 'Montaña rusa', 'Viaja en vagoneta por los rieles', 'Roller Coaster', 'Ride a minecart on rails', 'Montanha-russa', 'Ande de carrinho nos trilhos'],
    ['jinete', I.MONTURA, () => c('caballo'), 'A galope', 'Monta un caballo', 'Giddy Up', 'Ride a horse', 'A galope', 'Monte um cavalo'],
    ['miel', I.MIEL, () => c('miel'), 'Apicultor', 'Saca miel de una colmena', 'Beekeeper', 'Get honey from a beehive', 'Apicultor', 'Pegue mel de uma colmeia'],
    ['horno', B.HORNO, () => c('horno'), 'Cocinero', 'Cocina algo en el horno', 'Chef', 'Cook something in a furnace', 'Cozinheiro', 'Cozinhe algo na fornalha'],
    ['delfin', I.PEZ_T, () => (J.nado || 1) > 1, 'Amigo del delfín', 'Nada junto a un delfín', 'Dolphin Friend', 'Swim with a dolphin', 'Amigo do golfinho', 'Nade com um golfinho'],
    ['guardian', B.CRISTAL_M, () => c('guardian'), 'Cazador del mar', 'Vence a un guardián', 'Sea Hunter', 'Defeat a guardian', 'Caçador do mar', 'Derrote um guardião'],
    ['tortuga', B.HUEVO_TORTUGA, () => c('tortuga'), 'Tortuguitas', 'Mira nacer una tortuga', 'Little Turtles', 'Watch a turtle hatch', 'Tartaruguinhas', 'Veja uma tartaruga nascer'],
    ['dj', B.TOCADISCOS, () => c('disco'), 'Que suene la música', 'Pon un disco en el tocadiscos', 'Drop the Beat', 'Play a disc in a jukebox', 'Solta o som', 'Toque um disco no toca-discos'],
    ['cohete', I.COHETE, () => c('cohete'), '¡Fiesta!', 'Lanza fuegos artificiales', 'Party Time!', 'Launch fireworks', 'Festa!', 'Lance fogos de artifício'],
    ['tormenta', I.CRISTAL, () => clima === 'tormenta' && jugando, 'Bajo la tormenta', 'Vive una tormenta con rayos', 'Into the Storm', 'Live through a thunderstorm', 'Na tempestade', 'Viva uma tempestade com raios'],
    ['naufragio', I.ORO, () => c('barco'), 'Tesoro hundido', 'Abre el cofre de un barco hundido', 'Sunken Treasure', 'Open a shipwreck chest', 'Tesouro afundado', 'Abra o baú de um naufrágio'],
    ['mina', B.RIEL, () => c('mina'), 'Mina abandonada', 'Encuentra el cofre de una mina', 'Abandoned Mine', 'Find a mine chest', 'Mina abandonada', 'Ache o baú de uma mina'],
  ];
  LOGROS.splice(LOGROS.findIndex(l => l[0] === 'todos'), 0, ...nuevos);
  const sm = k => { if (typeof __lg !== 'undefined') __lg.sumar(k); };
  { const f = subirVehiculo; subirVehiculo = function (v) { sm(v.t === 'bote' ? 'bote' : 'vagon'); return f(v); }; }
  { const f = montarCaballo; montarCaballo = function (a) { sm('caballo'); return f(a); }; }
  { const f = tocarColmena; tocarColmena = function (h) { const n = inv[I.MIEL] || 0; f(h); if ((inv[I.MIEL] || 0) > n) sm('miel'); }; }
  { const f = usarHorno; usarHorno = function (h) { const id = barra[sel]; f(h); setTimeout(() => { if (COCINA[id]) sm('horno'); }, 900); }; }
  { const f = tocarDisco; tocarDisco = function (i, k) { sm('disco'); return f(i, k); }; }
  { const f = lanzarCohete; lanzarCohete = function (x, y, z) { if (jugando && !esAnioNuevo()) sm('cohete'); return f(x, y, z); }; }
  { const f = abrirCofre; abrirCofre = function (i) { const t = cofresTesoro.get(i); if (t === 'barco') sm('barco'); if (t === 'mina') sm('mina'); return f(i); }; }
}
window.__cl = { cambiarClima, clima: () => clima, lanzarCohete, tocarDisco, pararDisco, sonando, ponerRegalo, esNavidad, caerRayo };
