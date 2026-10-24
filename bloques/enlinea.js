'use strict';
// ═════════ JUGAR EN LÍNEA · ETAPA 2 ═════════
// · los monstruos y zombis persiguen y lastiman al jugador más cercano (también a los invitados)
// · cofres compartidos (el dueño guarda lo que hay adentro)
// · la TNT que prende un invitado explota para todos
// · botes y vagonetas compartidos: todos los ven moverse
// No hace falta tocar el servidor: los pedidos del invitado viajan como 'g' (van al dueño)
// y los avisos del dueño como 'm' (van a todos) o 'uno' (a uno solo).

const EL = { espera: null, cofreUlt: null, remoto: false, explotando: false, vidSig: 1, vehT: 0, vehUlt: '', vehUltT: 0 };

// lo que cada jugador manda junto con su posición
window.mpExtraE = () => {
  const o = { vi: Math.max(0, Math.round(vida)) }, v = window.__tr ? __tr.en() : null;
  if (MP.invitado && v && v.vid) { const p = v.g.position; o.vh = [v.vid, +p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2), +v.g.rotation.y.toFixed(2)]; }
  return o;
};
{ const e0 = estadoJugador; estadoJugador = function (m) {
    e0(m); const j = MP.jug.get(m.id); if (!j) return;
    if (m.vi != null) j.vida = +m.vi;
    if (MP.dueno && Array.isArray(m.vh)) { const [vid, x, y, z, r] = m.vh, v = vehiculos.find(o => o.vid === vid);
      if (v && v.jinete === m.id && [x, y, z].every(Number.isFinite)) { v.g.position.set(x, y, z); v.g.rotation.y = +r || 0; } }
  }; }
const evento = e => { if (MP.dueno && MP.jug.size) mpEnviar({ t: 'm', ev: [e] }); };

// ═════════ MONSTRUOS PARA TODOS (lo calcula el dueño) ═════════
const vivosEnLinea = () => [...MP.jug.values()].filter(j => j.obj && (j.vida ?? 20) > 0);
// corre fn como si el invitado fuera el jugador: su posición, su vida, y el daño le llega a él
function comoJugador(j, fn) {
  const sx = J.x, sy = J.y, sz = J.z, sv = vida, sl = lastimar;
  J.x = j.obj.x; J.y = j.obj.y; J.z = j.obj.z; vida = j.vida ?? 20;
  lastimar = (n, kx = 0, kz = 0, salto = true) => mpEnviar({ t: 'uno', para: j.id, tipo: 'dano', n, kx: +(+kx).toFixed(2), kz: +(+kz).toFixed(2), salto });
  try { fn(); } finally { J.x = sx; J.y = sy; J.z = sz; vida = sv; lastimar = sl; }
}
// reparte los bichos malos según quién está más cerca
function repartir(lista, esMalo) {
  const casa = [], grupos = new Map(), otros = vivosEnLinea();
  for (const o of lista) {
    if (!otros.length || !esMalo(o)) { casa.push(o); continue; }
    const p = o.position; let mejor = null, dm = vida > 0 ? Math.hypot(J.x - p.x, J.z - p.z) + Math.abs(J.y - p.y) * .5 : Infinity;
    for (const j of otros) { const d = Math.hypot(j.obj.x - p.x, j.obj.z - p.z) + Math.abs(j.obj.y - p.y) * .5; if (d < dm) { dm = d; mejor = j; } }
    if (!mejor) casa.push(o); else { if (!grupos.has(mejor)) grupos.set(mejor, []); grupos.get(mejor).push(o); }
  }
  return { casa, grupos };
}
// corre la IA por grupos: los que van al dueño y los que van a cada invitado
function porGrupos(leer, poner, esMalo, correr, antes, despues) {
  const todos = leer(), { casa, grupos } = repartir(todos, esMalo); if (!grupos.size) return correr();
  let ok = false;
  try { poner(casa); correr(); let fin = leer();
    for (const [j, l] of grupos) { poner(l); antes && antes(); try { comoJugador(j, correr); } finally { despues && despues(); } fin = fin.concat(leer()); }
    poner(fin); ok = true; }
  finally { if (!ok) poner(todos); }
}
{ const m0 = moverMonstruos; moverMonstruos = function (dt, noche) {
    if (!MP.dueno || !MP.jug.size) return m0(dt, noche);
    porGrupos(() => monstruos, l => { monstruos = l; }, () => true, () => m0(dt, noche));
  }; }
{ const a0 = moverAnimales; moverAnimales = function (dt) {
    if (!MP.dueno || !MP.jug.size) return a0(dt);
    let t = 0;
    porGrupos(() => animales, l => { animales = l; }, a => { const T = TIPOS[a.userData.animal]; return !!(T && T.hostil); }, () => a0(dt),
      () => { t = animalT; animalT = 99; }, () => { animalT = t; });
  }; }
// de noche también aparecen monstruos cerca de los invitados (por turnos)
let turnoSpawn = 0;
{ const a0 = aparecerMonstruos; aparecerMonstruos = function (dt) {
    if (!MP.dueno || !MP.jug.size) return a0(dt);
    const otros = vivosEnLinea(); turnoSpawn = (turnoSpawn + 1) % (otros.length + 1);
    if (!turnoSpawn) return a0(dt);
    comoJugador(otros[turnoSpawn - 1], () => a0(dt));
  }; }

// ═════════ COFRES COMPARTIDOS ═════════
function limpiarCofre(c) {
  const o = {}; let n = 0; if (!c || typeof c !== 'object') return o;
  for (const k in c) { const id = +k, q = Math.floor(+c[k]); if (id > 0 && id < 4096 && q > 0 && q <= 9999 && n++ < 80) o[id] = q; }
  return o;
}
const abrirCofre0 = abrirCofre;
abrirCofre = function (i) {
  if (!MP.invitado) { const r = abrirCofre0(i); EL.cofreUlt = JSON.stringify(cofres[i] || {}); return r; }
  // el invitado le pide al dueño lo que hay adentro
  EL.espera = i; mpEnviar({ t: 'g', k: 'cofre', i }); son(300, .12, 'triangle', .08);
  setTimeout(() => { if (EL.espera === i) { EL.espera = null; aviso(TR('sinConexion'), 1500); } }, 5000);
};
function cofreLlego(m) {
  if (EL.espera !== m.i || !jugando) return; EL.espera = null;
  cofres[m.i] = limpiarCofre(m.c);
  if (m.nuevo) { stats.cofres++; aviso(TR('cofreEncontrado'), 1200); }
  abrirCofre0(m.i); EL.cofreUlt = JSON.stringify(cofres[m.i]);
}

// ═════════ TNT ═════════
{ const e0 = encender; encender = function (x, y, z, mecha) {
    if (MP.invitado && !EL.remoto) { if (!EL.explotando) mpEnviar({ t: 'g', k: 'tnt', x, y, z }); return; }
    const t = get(x, y, z), r = e0(x, y, z, mecha);
    if (MP.dueno && (t === B.TNT || t === B.TNT_G)) { const k = tnts[tnts.length - 1]; evento(['tnt', x, y, z, t, k ? +k.t.toFixed(2) : 3]); }
    return r;
  }; }
{ const x0 = explotar; explotar = function (...a) { EL.explotando = true; try { return x0(...a); } finally { EL.explotando = false; } }; }
function tntDelDueno(x, y, z, t, mecha) {
  if (!dentro(x, y, z) || (t !== B.TNT && t !== B.TNT_G)) return;
  MP.remoto = true; EL.remoto = true;
  try { if (get(x, y, z) !== t) ponerBloque(x, y, z, t); encender(x, y, z, mecha); } finally { MP.remoto = false; EL.remoto = false; }
}

// ═════════ BOTES Y VAGONETAS COMPARTIDOS ═════════
{ const c0 = crearVehiculo; crearVehiculo = function (...a) { const v = c0(...a); if (!MP.invitado) v.vid = EL.vidSig++; return v; }; }
const quitarVeh = v => { escena.remove(v.g); const k = vehiculos.indexOf(v); if (k >= 0) vehiculos.splice(k, 1); };
{ const t0 = tocar; tocar = function (dir) {
    if (!MP.sala || __tr.en()) return t0(dir);
    const ap = vehiculoApuntado(dir), h = apuntar(dir), aVeh = ap && (!h || ap.d < h.t);
    // uno que está manejando otro no se puede agarrar ni subir
    if (aVeh && ap.ve.jinete && ap.ve.jinete !== MP.id) return;
    if (!MP.invitado) return t0(dir);
    const antes = new Set(vehiculos), r = t0(dir);
    for (const v of vehiculos.slice()) if (!antes.has(v)) { // puso uno: lo crea el dueño para todos
      const p = v.g.position; mpEnviar({ t: 'g', k: 'vPon', tv: v.t, x: +p.x.toFixed(2), y: +p.y.toFixed(2), z: +p.z.toFixed(2), r: +v.g.rotation.y.toFixed(2) }); quitarVeh(v); }
    for (const v of antes) if (!vehiculos.includes(v) && v.vid) mpEnviar({ t: 'g', k: 'vQuita', vid: v.vid });
    const mio = __tr.en(); if (mio && mio.vid) mpEnviar({ t: 'g', k: 'vSube', vid: mio.vid });
    return r;
  }; }
{ const b0 = bajarVehiculo; bajarVehiculo = function () {
    const v = __tr.en(), r = b0();
    if (MP.invitado && v && v.vid) { const p = v.g.position; mpEnviar({ t: 'g', k: 'vBaja', vid: v.vid, x: +p.x.toFixed(2), y: +p.y.toFixed(2), z: +p.z.toFixed(2), r: +v.g.rotation.y.toFixed(2) }); }
    return r;
  }; }
function listaVehiculos() {
  const mio = __tr.en();
  return vehiculos.filter(v => v.vid).map(v => { const p = v.g.position; return [v.vid, v.t, +p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2), +v.g.rotation.y.toFixed(2), v === mio ? MP.id : (v.jinete || 0)]; });
}
function vehiculosDelDueno(l) {
  if (!MP.invitado || !jugando) return;
  const mio = __tr.en(), vistos = new Set();
  for (const [vid, t, x, y, z, r, jin] of l) {
    if (t !== 'bote' && t !== 'vagon') continue; vistos.add(vid); if (mio && mio.vid === vid) continue;
    let v = vehiculos.find(o => o.vid === vid);
    if (!v) { v = crearVehiculo(t, x, y, z, r); v.vid = vid; }
    v.obj = [x, y, z, r]; v.jinete = jin;
  }
  for (const v of vehiculos.slice()) if (v !== mio && (!v.vid || !vistos.has(v.vid))) quitarVeh(v);
}

// ═════════ PEDIDOS QUE LE LLEGAN AL DUEÑO ═════════
function pedidoDeInvitado(m) {
  if (!jugando) return;
  const veh = () => vehiculos.find(o => o.vid === m.vid);
  switch (m.k) {
    case 'tnt': { const x = m.x | 0, y = m.y | 0, z = m.z | 0; if (!MP.permiso || !dentro(x, y, z)) return; const t = get(x, y, z); if (t === B.TNT || t === B.TNT_G) encender(x, y, z); return; }
    case 'cofre': { const i = m.i | 0; if (i < 0 || i >= N || mundo[i] !== B.COFRE) return; let nuevo = false;
      if (!cofres[i]) { nuevo = !diffs.has(i); cofres[i] = nuevo ? lootCofre(i) : {}; sucio = true; }
      mpEnviar({ t: 'uno', para: m.id, tipo: 'cofre', i, c: cofres[i], nuevo }); return; }
    case 'cofreSet': { const i = m.i | 0; if (i < 0 || i >= N || mundo[i] !== B.COFRE) return;
      cofres[i] = limpiarCofre(m.c); sucio = true; evento(['cofre', i, cofres[i], m.id]);
      if (cofreAbierto === i) { EL.cofreUlt = JSON.stringify(cofres[i]); pintarPanel(); } return; }
    case 'vPon': { if ((m.tv !== 'bote' && m.tv !== 'vagon') || vehiculos.length > 60 || ![m.x, m.y, m.z].every(Number.isFinite)) return;
      crearVehiculo(m.tv, m.x, m.y, m.z, +m.r || 0); guardarVehiculos(); EL.vehUlt = ''; return; }
    case 'vQuita': { const v = veh(); if (!v || v === __tr.en() || (v.jinete && v.jinete !== m.id)) return; quitarVeh(v); guardarVehiculos(); EL.vehUlt = ''; return; }
    case 'vSube': { const v = veh(); if (v && !v.jinete && v !== __tr.en()) v.jinete = m.id; return; }
    case 'vBaja': { const v = veh(); if (v && v.jinete === m.id) { v.jinete = 0; if ([m.x, m.y, m.z].every(Number.isFinite)) { v.g.position.set(m.x, m.y, m.z); v.g.rotation.y = +m.r || 0; } guardarVehiculos(); } return; }
  }
}

// ═════════ MENSAJES ═════════
{ const r0 = recibir; recibir = function (m) {
    if (!m) return;
    if (m.t === 'g' && m.k) { if (MP.dueno) pedidoDeInvitado(m); return; }
    if (m.t === 'uno' && m.tipo === 'dano') { if (MP.invitado && jugando && !creativo() && vida > 0) lastimar(Math.min(20, Math.max(1, +m.n || 1)), +m.kx || 0, +m.kz || 0, m.salto !== false); return; }
    if (m.t === 'uno' && m.tipo === 'cofre') { if (MP.invitado) cofreLlego(m); return; }
    if (m.t === 'm' && !m.l) { if (MP.invitado) avisosDelDueno(m); return; }
    if (m.t === 'sale' && MP.dueno) for (const v of vehiculos) if (v.jinete === m.id) { v.jinete = 0; guardarVehiculos(); }
    return r0(m);
  }; }
function avisosDelDueno(m) {
  if (!jugando) return;
  if (Array.isArray(m.v)) vehiculosDelDueno(m.v);
  for (const e of Array.isArray(m.ev) ? m.ev : []) {
    if (e[0] === 'tnt') tntDelDueno(e[1] | 0, e[2] | 0, e[3] | 0, e[4] | 0, Math.min(5, Math.max(.1, +e[5] || 3)));
    else if (e[0] === 'cofre') { const i = e[1] | 0; if (e[3] === MP.id) continue; cofres[i] = limpiarCofre(e[2]); if (cofreAbierto === i) { EL.cofreUlt = JSON.stringify(cofres[i]); pintarPanel(); } }
  }
}

// ═════════ CADA CUADRO ═════════
function elFrame(dt) {
  if (!MP.sala || !jugando) return;
  // si cambió lo que hay en el cofre abierto, se avisa
  if (cofreAbierto !== null) { const s = JSON.stringify(cofres[cofreAbierto] || {});
    if (s !== EL.cofreUlt) { EL.cofreUlt = s; if (MP.invitado) mpEnviar({ t: 'g', k: 'cofreSet', i: cofreAbierto, c: cofres[cofreAbierto] || {} }); else evento(['cofre', cofreAbierto, cofres[cofreAbierto] || {}, MP.id]); } }
  // el dueño reparte dónde están los botes y vagonetas
  if (MP.dueno && MP.jug.size) { EL.vehT -= dt; EL.vehUltT -= dt;
    if (EL.vehT <= 0) { EL.vehT = .15; const l = listaVehiculos(), s = JSON.stringify(l); if (s !== EL.vehUlt || EL.vehUltT <= 0) { EL.vehUlt = s; EL.vehUltT = 3; mpEnviar({ t: 'm', v: l }); } } }
  // el invitado mueve suave los vehículos de los demás
  if (MP.invitado) { const k = Math.min(1, dt * 10), mio = __tr.en();
    for (const v of vehiculos) { if (v === mio || !v.obj) continue; const p = v.g.position, [x, y, z, r] = v.obj;
      if (Math.hypot(x - p.x, z - p.z) > 8) p.set(x, y, z); else { p.x += (x - p.x) * k; p.y += (y - p.y) * k; p.z += (z - p.z) * k; }
      let d = r - v.g.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); v.g.rotation.y += d * k; } }
}
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; try { elFrame(dt); } catch (e) { console.error(e); } }; requestAnimationFrame(tick); }
// al terminar la sala, los vehículos que vinieron del dueño se van
{ const s0 = terminarSala; terminarSala = function (f) { const eraInv = MP.invitado; const r = s0(f); if (eraInv) for (const v of vehiculos.slice()) if (v.vid) quitarVeh(v); EL.espera = null; return r; }; }

window.__el = { EL, repartir, pedidoDeInvitado, listaVehiculos, limpiarCofre };
