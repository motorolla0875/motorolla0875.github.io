'use strict';
// ═════════ BALDES DE AGUA Y LAVA, LAVA EN LAS CUEVAS, OBSIDIANA, EXPERIENCIA Y NIVELES, BRÚJULA Y MAPA ═════════

Object.assign(TX.es, { palaAyuda: 'TOCA EL PASTO CON LA PALA<small>queda un camino de tierra</small>', palaYa: 'YA ES CAMINO', lavaQuema: '¡LAVA! ¡SAL RÁPIDO!', nivel: 'NIVEL {n}', subiNivel: '¡SUBISTE AL NIVEL {n}!', faltaNivel: 'NECESITAS NIVEL 5 PARA ENCANTAR<small>gana experiencia peleando y minando</small>', baldeAyuda: 'TOCA AGUA O LAVA CON EL BALDE VACÍO', haciaCasa: 'tu casa' });
Object.assign(TX.en, { palaAyuda: 'TAP THE GRASS WITH THE SHOVEL<small>it leaves a dirt path</small>', palaYa: 'ALREADY A PATH', lavaQuema: 'LAVA! GET OUT FAST!', nivel: 'LEVEL {n}', subiNivel: 'LEVEL UP! {n}', faltaNivel: 'YOU NEED LEVEL 5 TO ENCHANT<small>earn experience by fighting and mining</small>', baldeAyuda: 'TAP WATER OR LAVA WITH THE EMPTY BUCKET', haciaCasa: 'home' });
Object.assign(TX.pt, { palaAyuda: 'TOQUE A GRAMA COM A PÁ<small>fica um caminho de terra</small>', palaYa: 'JÁ É CAMINHO', lavaQuema: 'LAVA! SAIA RÁPIDO!', nivel: 'NÍVEL {n}', subiNivel: 'SUBIU PARA O NÍVEL {n}!', faltaNivel: 'VOCÊ PRECISA DO NÍVEL 5 PARA ENCANTAR<small>ganhe experiência lutando e minerando</small>', baldeAyuda: 'TOQUE ÁGUA OU LAVA COM O BALDE VAZIO', haciaCasa: 'sua casa' });
Object.assign(NOMBRES.en, { 'Lava': 'Lava', 'Obsidiana': 'Obsidian', 'Balde': 'Bucket', 'Balde de agua': 'Water bucket', 'Balde de lava': 'Lava bucket', 'Brújula': 'Compass', 'Mapa': 'Map', 'Pala': 'Shovel', 'Camino de tierra': 'Dirt path' });
Object.assign(NOMBRES.pt, { 'Lava': 'Lava', 'Obsidiana': 'Obsidiana', 'Balde': 'Balde', 'Balde de agua': 'Balde de água', 'Balde de lava': 'Balde de lava', 'Brújula': 'Bússola', 'Mapa': 'Mapa', 'Pala': 'Pá', 'Camino de tierra': 'Caminho de terra' });

// ═════════ LAVA EN LAS CUEVAS HONDAS (mundos nuevos) ═════════
{ const g0 = generarExtra; generarExtra = function (S, ej) { const r = g0(S, ej);
    if ((window.genVersion || 1) >= 2 && !window.mundoTipo && !ej) {
      const F2 = (SX / 160) ** 2; let charcos = 0;
      for (let n = 0; n < 9000 && charcos < Math.round(10 * F2); n++) {
        const x = 3 + Math.floor(h3(n, 1, 500, S + 500) * (SX - 6)), z = 3 + Math.floor(h3(n, 2, 501, S + 501) * (SZ - 6)), y = 2 + Math.floor(h3(n, 3, 502, S + 502) * 5);
        if (mundo[idx(x, y, z)] !== B.AIRE || !opaco(mundo[idx(x, y - 1, z)])) continue;
        let techo = y + 1; while (techo < SY && mundo[idx(x, techo, z)] === B.AIRE) techo++; if (techo >= SY - 1 || techo > y + 12) continue; // tiene que estar bajo tierra
        const rr = 1 + Math.floor(h3(n, 4, 503, S + 503) * 3);
        for (let a = -rr; a <= rr; a++) for (let b = -rr; b <= rr; b++) { if (a * a + b * b > rr * rr + 1) continue; const px = x + a, pz = z + b;
          if (dentro(px, y, pz) && mundo[idx(px, y, pz)] === B.AIRE && opaco(mundo[idx(px, y - 1, pz)]) && mundo[idx(px, y + 2, pz)] !== B.AGUA) mundo[idx(px, y, pz)] = B.LAVA; }
        charcos++;
      }
      // un poco de obsidiana cerca de la lava
      for (let n = 0; n < 400; n++) { const x = 3 + Math.floor(h3(n, 5, 504, S + 504) * (SX - 6)), z = 3 + Math.floor(h3(n, 6, 505, S + 505) * (SZ - 6)), y = 1 + Math.floor(h3(n, 7, 506, S + 506) * 4);
        if (mundo[idx(x, y, z)] === B.PIEDRA && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => mundo[idx(x + a, y, z + b)] === B.LAVA)) mundo[idx(x, y, z)] = B.OBSIDIANA; }
    }
    return r; }; }

// ═════════ AGUA Y LAVA QUE CORREN (las que pone el jugador con el balde) ═════════
const esFluido = t => t === B.AGUA || t === B.LAVA;
const libreFl = t => t === B.AIRE || (t > 0 && DEF[t] && DEF[t].planta && !esCultivo(t));
function derramar(x, y, z, t) {
  // devuelve las celdas que ocupa el líquido: cae hasta el piso y se estira a los costados (agua 4, lava 2)
  const max = t === B.AGUA ? 4 : 2, celdas = [], visto = new Set(), q = [[x, y, z, 0]];
  while (q.length && celdas.length < 160) {
    const [cx, cy, cz, d] = q.shift(), i = idx(cx, cy, cz); if (visto.has(i) || !dentro(cx, cy, cz)) continue; visto.add(i);
    const v = get(cx, cy, cz); if (!(libreFl(v) || (cx === x && cy === y && cz === z))) continue;
    celdas.push([cx, cy, cz]);
    if (cy > 0 && libreFl(get(cx, cy - 1, cz))) { q.push([cx, cy - 1, cz, d]); continue; }
    if (d < max) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) q.push([cx + a, cy, cz + b, d + 1]);
  }
  return celdas;
}
function ponerFluido(x, y, z, t) {
  const celdas = derramar(x, y, z, t); if (!celdas.length) return;
  const L = celdas.map(([a, b, c]) => [a, b, c, t]);
  // agua + lava: la lava se vuelve obsidiana (la fuente) o adoquín
  const toca = (a, b, c, otro) => [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].some(([dx, dy, dz]) => get(a + dx, b + dy, c + dz) === otro);
  for (const q of L) { const otro = t === B.AGUA ? B.LAVA : B.AGUA;
    if (toca(q[0], q[1], q[2], otro)) { if (t === B.LAVA) q[3] = (q[0] === x && q[1] === y && q[2] === z) ? B.OBSIDIANA : B.ADOQUIN;
      else for (const [dx, dy, dz] of [[1, 0, 0], [-1, 0, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) if (get(q[0] + dx, q[1] + dy, q[2] + dz) === B.LAVA) L.push([q[0] + dx, q[1] + dy, q[2] + dz, B.OBSIDIANA]); } }
  ponerMuchos(L);
  if (typeof mapa !== 'undefined') { mapa.fluidos = mapa.fluidos || {}; mapa.fluidos[idx(x, y, z)] = [t, celdas.map(([a, b, c]) => idx(a, b, c))]; }
  if (L.some(q => q[3] === B.OBSIDIANA || q[3] === B.ADOQUIN)) { ruido(.5, .15, 2000); polvo(x + .5, y + .8, z + .5, '#cccccc', 10); }
}
function sacarFluido(x, y, z, t) {
  let i = idx(x, y, z), f = typeof mapa !== 'undefined' && mapa.fluidos ? mapa.fluidos[i] : null;
  // si tocaste agua que corrió desde una fuente que pusiste, se saca toda
  if (!f && typeof mapa !== 'undefined' && mapa.fluidos) for (const k in mapa.fluidos) if (mapa.fluidos[k][0] === t && mapa.fluidos[k][1].includes(i)) { i = +k; f = mapa.fluidos[k]; break; }
  if (f) { const L = []; for (const j of f[1]) if (mundo[j] === f[0]) { const [a, b, c] = xyz(j); L.push([a, b, c, B.AIRE]); } ponerMuchos(L); delete mapa.fluidos[i]; return; }
  // agua del mar o un lago grande: no se acaba (como en Minecraft)
  if (t === B.AGUA && [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([a, b]) => get(x + a, y, z + b) === B.AGUA).length >= 2) return;
  ponerBloque(x, y, z, B.AIRE);
}
function fluidoApuntado(dir) {
  const o = new THREE.Vector3(J.x, J.y + OJOS, J.z);
  for (let t = .3; t < 6; t += .2) { const p = o.clone().addScaledVector(dir, t), x = Math.floor(p.x), y = Math.floor(p.y), z = Math.floor(p.z), b = get(x, y, z);
    if (esFluido(b)) return { x, y, z, b }; if (b && DEF[b].solido) return null; }
  return null;
}
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) {
    const id = barra[sel] || 0;
    if ((id === I.BALDE || id === I.BALDE_AGUA || id === I.BALDE_LAVA || id === I.PALA) && aventura()) return true;
    // la pala pela el pasto y deja un camino de tierra
    if (id === I.PALA) { const h = apuntar(dir); if (!h) return true;
      if ((h.b === B.PASTO || h.b === B.TIERRA) && reemplazable(get(h.x, h.y + 1, h.z)) && get(h.x, h.y + 1, h.z) !== B.AGUA && get(h.x, h.y + 1, h.z) !== B.LAVA) {
        accion(() => { if (get(h.x, h.y + 1, h.z)) ponerBloque(h.x, h.y + 1, h.z, B.AIRE); ponerBloque(h.x, h.y, h.z, B.CAMINO_T); });
        polvo(h.x + .5, h.y + 1, h.z + .5, '#a87e48', 6); swing = 1; son(180, .08, 'triangle', .08); }
      else if (h.b === B.CAMINO_T) aviso(TR('palaYa'), 1000); else aviso(TR('palaAyuda'), 1200);
      return true; }
    if (id === I.BALDE) { const f = fluidoApuntado(dir); if (!f) { aviso(TR('baldeAyuda'), 1200); return true; }
      sacarFluido(f.x, f.y, f.z, f.b); if (!creativo()) quitarItem(I.BALDE, 1); darItem(f.b === B.AGUA ? I.BALDE_AGUA : I.BALDE_LAVA, 1); swing = 1; son(f.b === B.AGUA ? 500 : 200, .15, 'sine', .1); return true; }
    if (id === I.BALDE_AGUA || id === I.BALDE_LAVA) { const h = apuntar(dir); if (!h) return true;
      const enPlanta = reemplazable(h.b), x = enPlanta ? h.x : h.x + h.cara[0], y = enPlanta ? h.y : h.y + h.cara[1], z = enPlanta ? h.z : h.z + h.cara[2];
      if (!dentro(x, y, z) || !reemplazable(get(x, y, z))) return true;
      ponerFluido(x, y, z, id === I.BALDE_AGUA ? B.AGUA : B.LAVA); if (!creativo()) { quitarItem(id, 1); darItem(I.BALDE, 1); } swing = 1; son(id === I.BALDE_AGUA ? 400 : 150, .2, 'sine', .1); return true; }
    return t0(dir); }; }

// ═════════ LA LAVA QUEMA ═════════
let lavaT = 0;
function quemaLava(dt) {
  if (!jugando || pausado || creativo()) return;
  const en = y => get(Math.floor(J.x), Math.floor(y), Math.floor(J.z)) === B.LAVA;
  lavaT -= dt; if ((en(J.y + .1) || en(J.y + 1)) && lavaT <= 0) { lavaT = .5; lastimar(3, 0, 0, false); polvo(J.x, J.y + .5, J.z, '#ff7a1a', 8); aviso(TR('lavaQuema'), 700); }
  if (en(J.y + .1)) { J.vx *= .6; J.vz *= .6; if (J.vy < -2) J.vy = -2; }
  // los bichos también se queman
  for (const a of animales.slice()) { const p = a.position; if (get(Math.floor(p.x), Math.floor(p.y + .1), Math.floor(p.z)) === B.LAVA) { a.userData.lavaT = (a.userData.lavaT || 0) - dt; if (a.userData.lavaT <= 0) { a.userData.lavaT = .5; herir(a, 3); } } }
}

// ═════════ EXPERIENCIA Y NIVELES ═════════
const xpPara = n => n < 16 ? 2 * n + 7 : n < 31 ? 5 * n - 38 : 9 * n - 158; // como en Minecraft
let xpOrbes = [];
const xpDatos = () => { if (!stats) return { xp: 0, nivel: 0 }; stats.xp = stats.xp || 0; stats.nivel = stats.nivel || 0; return stats; };
function sumarXp(n) {
  if (creativo() || !jugando) return; const s = xpDatos(); s.xp += n;
  while (s.xp >= xpPara(s.nivel)) { s.xp -= xpPara(s.nivel); s.nivel++; if (s.nivel % 5 === 0) aviso(TR('subiNivel', { n: s.nivel }), 1400); for (let k = 0; k < 3; k++) setTimeout(() => son(700 + k * 180, .12, 'triangle', .08), k * 80); }
  sucio = true; pintarXp();
}
const geoOrbe = new THREE.BoxGeometry(.16, .16, .16), matOrbe = new THREE.MeshBasicMaterial({ color: 0xb8ff4a, fog: false });
function soltarXp(x, y, z, n) {
  if (creativo() || !jugando || n <= 0) return;
  for (let k = 0; k < Math.min(6, n); k++) { const m = new THREE.Mesh(geoOrbe, matOrbe); m.position.set(x + (Math.random() - .5) * .6, y + .3, z + (Math.random() - .5) * .6); escena.add(m);
    xpOrbes.push({ m, v: Math.ceil(n / Math.min(6, n)), vy: 2 + Math.random() * 2, t: 0 }); }
}
function moverOrbes(dt) {
  for (const o of xpOrbes.slice()) { o.t += dt; const p = o.m.position, d = Math.hypot(J.x - p.x, J.y + .8 - p.y, J.z - p.z);
    if (d < 6 && o.t > .4) { const k = Math.min(1, dt * 6); p.x += (J.x - p.x) * k; p.y += (J.y + .8 - p.y) * k; p.z += (J.z - p.z) * k; }
    else { o.vy -= 9 * dt; p.y += o.vy * dt; if (solidoMov(get(Math.floor(p.x), Math.floor(p.y - .1), Math.floor(p.z)))) { o.vy = 0; p.y = Math.floor(p.y - .1) + 1.1; } }
    o.m.rotation.y += dt * 3; o.m.scale.setScalar(1 + Math.sin(o.t * 8) * .15);
    if (d < .8 && o.t > .4 || o.t > 60) { escena.remove(o.m); xpOrbes.splice(xpOrbes.indexOf(o), 1); if (o.t <= 60) { sumarXp(o.v); son(1200 + Math.random() * 600, .05, 'sine', .05); } } }
}
// barra verde con el número de nivel, justo arriba de la barra de objetos
{ const st = document.createElement('style'); st.textContent = `#xpHud { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(max(4px, env(safe-area-inset-bottom)) + 55px); width: 400px; height: 6px; zoom: var(--u); z-index: 3; background: rgba(13,21,61,.6); border-radius: 4px; pointer-events: none; }
  #xpHud i { display: block; height: 100%; border-radius: 4px; background: linear-gradient(#d8ff7a, #7ad02a); width: 0; transition: width .2s; }
  #xpHud b { position: absolute; left: 50%; top: -15px; transform: translateX(-50%); font-size: 13px; color: #b8ff4a; text-shadow: 0 2px 0 #0d153d, 0 0 4px #0d153d; }
  #barrasHud { bottom: calc(max(4px, env(safe-area-inset-bottom)) + 66px) !important; }`; document.head.appendChild(st);
  const d = document.createElement('div'); d.id = 'xpHud'; d.hidden = true; d.innerHTML = '<i></i><b></b>'; $('hud').appendChild(d); }
function pintarXp() { const s = xpDatos(), ok = jugando && !creativo(); $('xpHud').hidden = !ok; if (!ok) return; $('xpHud').firstChild.style.width = Math.min(100, s.xp / xpPara(s.nivel) * 100) + '%'; $('xpHud').lastChild.textContent = s.nivel || ''; }
{ const e0 = entrarMundo; entrarMundo = function (id) { for (const o of xpOrbes.splice(0)) escena.remove(o.m); const r = e0(id); pintarXp(); return r; }; }
// de dónde sale la experiencia
{ const q0 = quitarMonstruo; quitarMonstruo = function (m, humo = true) { if (humo && jugando && monstruos.includes(m) && m.userData.vida <= 0) soltarXp(m.position.x, m.position.y, m.position.z, 5); return q0(m, humo); }; }
{ const m0 = matarAnimal; matarAnimal = function (a) { const T = TIPOS[a.userData.animal] || {}; soltarXp(a.position.x, a.position.y, a.position.z, T.hostil ? 5 : 1 + Math.floor(Math.random() * 3)); return m0(a); }; }
const XP_MINERAL = { [B.CARBON_M]: 1, [B.HIERRO_M]: 2, [B.ORO_M]: 3, [B.CRISTAL_M]: 5, [B.CRISTAL_OSC_M]: 6 };
{ const a0 = alTerminarAccion; alTerminarAccion = function (g) { a0(g); for (const [i, viejo, nuevo] of g) if (!nuevo && XP_MINERAL[viejo]) { const [x, y, z] = xyz(i); soltarXp(x + .5, y + .2, z + .5, XP_MINERAL[viejo]); } }; }
{ const s0 = sacarPez; sacarPez = function () { const r = s0.apply(this, arguments); soltarXp(J.x, J.y + 1, J.z, 2); return r; }; }
// al morir se pierde la experiencia
{ const l0 = lastimar; lastimar = function (n, kx, kz, salto) { const r = l0(n, kx, kz, salto); if (vida <= 0 && stats) { const s = xpDatos(); s.xp = 0; s.nivel = Math.floor(s.nivel / 2); pintarXp(); } return r; }; }
// encantar cuesta 5 niveles (además de los cristales)
{ const e0 = encantar; encantar = function () {
    const id = barra[sel], ok = id === I.PICO4 || id === I.ESP4;
    if (ok && !creativo() && xpDatos().nivel < 5) return aviso(TR('faltaNivel'), 2200);
    const antes = barra[sel]; e0(); if (!creativo() && barra[sel] !== antes) { xpDatos().nivel -= 5; pintarXp(); }
  }; }

// ═════════ BRÚJULA Y MAPA (cuando los tienes en la mano) ═════════
{ const st = document.createElement('style'); st.textContent = `#brujulaHud { position: fixed; left: 50%; top: calc(50% + 34px); transform: translateX(-50%); zoom: var(--u); z-index: 3; pointer-events: none; text-align: center; font-size: 11px; color: #fff; }
  #brujulaHud svg { width: 54px; height: 54px; display: block; margin: 0 auto; filter: drop-shadow(0 2px 0 rgba(13,21,61,.7)); }
  #minimapa { position: fixed; left: auto; bottom: auto; right: max(10px, env(safe-area-inset-right)); top: 64px; zoom: var(--u); z-index: 3; width: 120px; height: 120px; border: 3px solid #a07a4a; border-radius: 10px; background: #e8d8a8; image-rendering: pixelated; pointer-events: none; }`; document.head.appendChild(st);
  const b = document.createElement('div'); b.id = 'brujulaHud'; b.hidden = true;
  b.innerHTML = '<svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="24" fill="#e8e0c8" stroke="#5a6278" stroke-width="4"/><g id="aguja"><polygon points="27,7 31,27 23,27" fill="#ff4a5f"/><polygon points="27,47 31,27 23,27" fill="#3a3a42"/></g><circle cx="27" cy="27" r="3" fill="#5a6278"/></svg><span class="sombra"></span>';
  $('hud').appendChild(b);
  const c = document.createElement('canvas'); c.id = 'minimapa'; c.width = 64; c.height = 64; c.hidden = true; $('hud').appendChild(c); }
let mapaT = 0;
function dibujarMinimapa() {
  const c = $('minimapa'), g = c.getContext('2d'), im = g.createImageData(64, 64), x0 = Math.floor(J.x) - 32, z0 = Math.floor(J.z) - 32;
  const rgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  for (let a = 0; a < 64; a++) for (let b = 0; b < 64; b++) { const x = x0 + a, z = z0 + b, o = (a + b * 64) * 4; let col = '#e8d8a8';
    if (x >= 0 && z >= 0 && x < SX && z < SZ) { let y = Math.min(SY - 1, alt[x + SX * z] + 1); while (y > 0 && (!mundo[idx(x, y, z)] || DEF[mundo[idx(x, y, z)]].planta)) y--; const t = mundo[idx(x, y, z)];
      col = t === B.AGUA ? '#3f8eec' : t === B.PASTO ? '#6cbb40' : t === B.HOJAS ? '#2f8a26' : DEF[t] && DEF[t].color && DEF[t].color.length === 7 ? DEF[t].color : '#888888'; }
    const [r, gg, bb] = rgb(col); im.data[o] = r; im.data[o + 1] = gg; im.data[o + 2] = bb; im.data[o + 3] = 255; }
  g.putImageData(im, 0, 0);
  g.save(); g.translate(32, 32); g.rotate(-J.yaw); g.fillStyle = '#ff3030'; g.beginPath(); g.moveTo(0, -5); g.lineTo(3.5, 4); g.lineTo(0, 2); g.lineTo(-3.5, 4); g.closePath(); g.fill(); g.restore();
}
function herramientasHud(dt) {
  const id = jugando ? (barra[sel] || 0) : 0;
  $('brujulaHud').hidden = id !== I.BRUJULA;
  if (id === I.BRUJULA) { const dx = spawn.x - J.x, dz = spawn.z - J.z, ang = Math.atan2(dx, -dz) + J.yaw; document.getElementById('aguja').setAttribute('transform', `rotate(${(ang * 180 / Math.PI).toFixed(1)} 27 27)`);
    $('brujulaHud').lastChild.textContent = TR('haciaCasa') + ' · ' + Math.round(Math.hypot(dx, dz)) + ' m'; }
  $('minimapa').hidden = id !== I.MAPA;
  if (id === I.MAPA) { mapaT -= dt; if (mapaT <= 0) { mapaT = .5; dibujarMinimapa(); } }
}

// ═════════ CADA CUADRO ═════════
let xpPintT = 0;
function fluidosFrame(dt) {
  herramientasHud(dt);
  if (!jugando) return;
  if (!pausado) { quemaLava(dt); moverOrbes(dt); }
  xpPintT -= dt; if (xpPintT <= 0) { xpPintT = 1; pintarXp(); }
}
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; try { fluidosFrame(dt); } catch (e) { console.error(e); } }; requestAnimationFrame(tick); }
window.__fl = { ponerFluido, sacarFluido, sumarXp, soltarXp, xp: () => xpDatos(), orbes: () => xpOrbes.length, derramar };
