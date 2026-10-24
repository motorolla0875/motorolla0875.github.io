'use strict';
// ═════════ TRANSPORTE: bote para navegar y vagoneta sobre rieles (montañas rusas) ═════════

Object.assign(TX.es, { boteAyuda: 'APUNTA AL AGUA PARA PONER EL BOTE', vagonAyuda: 'PON LA VAGONETA SOBRE UN RIEL', aBordo: '¡A NAVEGAR!<small>toca Bajar para salir del bote</small>', enVagon: '¡VAMOS!<small>la vagoneta sigue los rieles · Bajar para salir</small>', vehiculoAyuda: 'TOCA CON LA MANO VACÍA PARA SUBIR<small>con algo en la mano lo guardas</small>', bajar: 'Bajar' });
Object.assign(TX.en, { boteAyuda: 'AIM AT THE WATER TO PLACE THE BOAT', vagonAyuda: 'PUT THE MINECART ON A RAIL', aBordo: 'SET SAIL!<small>tap Get off to leave the boat</small>', enVagon: 'HERE WE GO!<small>the minecart follows the rails · Get off to leave</small>', vehiculoAyuda: 'TAP WITH AN EMPTY HAND TO GET IN<small>tap holding something to pick it up</small>', bajar: 'Get off' });
Object.assign(TX.pt, { boteAyuda: 'MIRE PARA A ÁGUA PARA COLOCAR O BARCO', vagonAyuda: 'COLOQUE O CARRINHO EM UM TRILHO', aBordo: 'VAMOS NAVEGAR!<small>toque Descer para sair do barco</small>', enVagon: 'VAMOS!<small>o carrinho segue os trilhos · Descer para sair</small>', vehiculoAyuda: 'TOQUE COM A MÃO VAZIA PARA SUBIR<small>com algo na mão você guarda</small>', bajar: 'Descer' });

const esRiel = t => t === B.RIEL || t === B.RIEL_X;
const vehiculos = []; let enVehiculo = null;
function mallaBote() {
  const g = new THREE.Group(), m = '#a06a32', o = '#6b3a1a';
  cajaC(g, 1.1, .1, 1.9, 0, .05, 0, o); for (const s of [-1, 1]) { cajaC(g, .1, .4, 1.9, s * .55, .25, 0, m); cajaC(g, 1.2, .4, .1, 0, .25, s * .95, m); } cajaC(g, 1, .08, .3, 0, .3, -.2, o);
  for (const s of [-1, 1]) { cajaC(g, .06, .06, .9, s * .7, .45, .2, o); cajaC(g, .06, .4, .06, s * .7, .3, .65, o); }
  return g;
}
function mallaVagon() {
  const g = new THREE.Group(), m = '#9aa3b8', o = '#5a6278';
  cajaC(g, .9, .1, 1.1, 0, .2, 0, o); for (const s of [-1, 1]) { cajaC(g, .1, .45, 1.1, s * .45, .45, 0, m); cajaC(g, .9, .45, .1, 0, .45, s * .55, m); }
  for (const [x, z] of [[.4, .35], [-.4, .35], [.4, -.35], [-.4, -.35]]) cajaC(g, .1, .18, .18, x, .12, z, '#2a2a32');
  return g;
}
function crearVehiculo(t, x, y, z, r = 0) {
  const g = t === 'bote' ? mallaBote() : mallaVagon(); g.position.set(x, y, z); g.rotation.y = r; escena.add(g);
  const v = { t, g, desde: null, hacia: null, prog: 0, dir: [0, 1] }; vehiculos.push(v); return v;
}
function guardarVehiculos() { if (typeof mapa === 'undefined') return; mapa.vehiculos = vehiculos.map(v => [v.t, +v.g.position.x.toFixed(2), +v.g.position.y.toFixed(2), +v.g.position.z.toFixed(2), +v.g.rotation.y.toFixed(2)]); sucio = true; }
function quitarVehiculos() { if (enVehiculo) bajarVehiculo(); for (const v of vehiculos.splice(0)) escena.remove(v.g); }
{ const e0 = entrarMundo; entrarMundo = function (id) { quitarVehiculos(); const r = e0(id); try { for (const [t, x, y, z, rr] of (mapa.vehiculos || [])) crearVehiculo(t, x, y, z, rr); } catch (e) {} return r; }; }
{ const s0 = salirAlMenu; salirAlMenu = function () { quitarVehiculos(); return s0(); }; }

// superficie del agua en una columna (o null si no hay agua arriba)
function superficie(x, z) { let y = SY - 1; while (y > 0 && get(x, y, z) === B.AIRE) y--; return get(x, y, z) === B.AGUA ? y + 1 : null; }

// ─── poner, subir y guardar ───
function aguaApuntada(dir) {
  const o = new THREE.Vector3(J.x, J.y + OJOS, J.z);
  for (let t = .5; t < 7; t += .25) { const p = o.clone().addScaledVector(dir, t), x = Math.floor(p.x), y = Math.floor(p.y), z = Math.floor(p.z), b = get(x, y, z);
    if (b === B.AGUA) return get(x, y + 1, z) === B.AIRE ? { x, y, z } : null; if (b && DEF[b].solido) return null; }
  return null;
}
function vehiculoApuntado(dir) {
  const o = new THREE.Vector3(J.x, J.y + OJOS, J.z), r = new THREE.Ray(o, dir), v = new THREE.Vector3(); let mejor = null;
  for (const ve of vehiculos) { const p = ve.g.position, w = ve.t === 'bote' ? .7 : .55;
    if (r.intersectBox(new THREE.Box3(new THREE.Vector3(p.x - w, p.y - .1, p.z - w), new THREE.Vector3(p.x + w, p.y + .8, p.z + w)), v)) { const d = v.distanceTo(o); if (d < 5 && (!mejor || d < mejor.d)) mejor = { ve, d }; } }
  return mejor;
}
{ const t0 = tocar; tocar = function (dir) {
    if (enVehiculo) return; // arriba del bote o la vagoneta no se rompe ni se pone nada
    const m = vehiculoApuntado(dir), h = apuntar(dir);
    if (m && (!h || m.d < h.t)) { const id = barra[sel] || 0;
      if (!id) subirVehiculo(m.ve); else { escena.remove(m.ve.g); vehiculos.splice(vehiculos.indexOf(m.ve), 1); if (!creativo()) darItem(m.ve.t === 'bote' ? I.BOTE : I.VAGONETA, 1); guardarVehiculos(); son(330, .1, 'triangle', .1); swing = 1; }
      return; }
    const id = barra[sel] || 0;
    if (id === I.BOTE && !aventura()) { const w = aguaApuntada(dir); if (!w) return aviso(TR('boteAyuda'), 1200);
      crearVehiculo('bote', w.x + .5, w.y + 1 - .15, w.z + .5, J.yaw); if (!creativo()) quitarItem(I.BOTE, 1); guardarVehiculos(); swing = 1; aviso(TR('vehiculoAyuda'), 2200); return; }
    if (id === I.VAGONETA && !aventura()) { if (!h || !esRiel(h.b)) return aviso(TR('vagonAyuda'), 1200);
      crearVehiculo('vagon', h.x + .5, h.y + .07, h.z + .5, h.b === B.RIEL_X ? Math.PI / 2 : 0); if (!creativo()) quitarItem(I.VAGONETA, 1); guardarVehiculos(); swing = 1; aviso(TR('vehiculoAyuda'), 2200); return; }
    return t0(dir); }; }
function subirVehiculo(v) {
  enVehiculo = v; window.montando = true; $('bDesmontar').hidden = false; $('bDesmontar').textContent = TR('bajar');
  if (v.t === 'bote') { J.x = v.g.position.x; J.z = v.g.position.z; J.velMonta = 1.6; aviso(TR('aBordo'), 2000); }
  else { // la vagoneta sale para donde estás mirando
    const x = Math.floor(v.g.position.x), y = Math.floor(v.g.position.y), z = Math.floor(v.g.position.z), fx = -Math.sin(J.yaw), fz = -Math.cos(J.yaw);
    const eje = get(x, y, z) === B.RIEL_X ? 'x' : 'z'; v.dir = eje === 'x' ? [fx >= 0 ? 1 : -1, 0] : [0, fz >= 0 ? 1 : -1];
    v.desde = [x, y, z]; v.hacia = siguienteRiel(v.desde, v.dir); v.prog = 0; v.vel = 6; aviso(TR('enVagon'), 2200); }
  son(440, .1, 'triangle', .1);
}
function bajarVehiculo() {
  const v = enVehiculo; if (!v) return; enVehiculo = null; window.montando = false; $('bDesmontar').hidden = true; J.velMonta = 1;
  if (v.t === 'bote') { // bajar a la tierra más cercana si hay
    let mejor = null; for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) { const x = Math.floor(J.x) + a, z = Math.floor(J.z) + b; let y = SY - 2; while (y > 0 && !solidoMov(get(x, y, z)) && get(x, y, z) !== B.AGUA) y--; if (solidoMov(get(x, y, z)) && !solidoMov(get(x, y + 1, z)) && !solidoMov(get(x, y + 2, z))) { const d = Math.hypot(a, b); if (!mejor || d < mejor.d) mejor = { d, x: x + .5, y: y + 1, z: z + .5 }; } }
    if (mejor) Object.assign(J, { x: mejor.x, y: mejor.y, z: mejor.z }); else J.y += .6;
  } else { J.x += Math.cos(J.yaw) * 1.1; J.z -= Math.sin(J.yaw) * 1.1; J.y += .3; }
  J.vy = 0; guardarVehiculos();
}
{ const d0 = desmontar; desmontar = function () { if (enVehiculo) return bajarVehiculo(); return d0(); }; }

// ─── rieles: hacia dónde sigue ───
function siguienteRiel([x, y, z], [dx, dz]) {
  for (const dy of [0, 1, -1]) if (esRiel(get(x + dx, y + dy, z + dz))) return [x + dx, y + dy, z + dz];
  return null;
}
function girarRiel(v) {
  const [x, y, z] = v.desde, [dx, dz] = v.dir;
  for (const [a, b] of [[dz, -dx], [-dz, dx]]) { const n = siguienteRiel([x, y, z], [a, b]); if (n) { v.dir = [a, b]; return n; } }
  return null;
}
// al poner un riel, se acuesta para el lado que corresponde
{ const a0 = alTerminarAccion; alTerminarAccion = function (g) { a0(g);
    for (const [i, , t] of g) if (t === B.RIEL) { const [x, y, z] = xyz(i), vx = [-1, 1].some(d => [-1, 0, 1].some(dy => esRiel(get(x + d, y + dy, z)))), vz = [-1, 1].some(d => [-1, 0, 1].some(dy => esRiel(get(x, y + dy, z + d))));
      const enX = vx && !vz ? true : vz && !vx ? false : Math.abs(Math.sin(J.yaw)) > Math.abs(Math.cos(J.yaw));
      if (enX) sinGrupo(() => ponerBloque(x, y, z, B.RIEL_X)); } }; }

// ═════════ MOVIMIENTO (justo después de la física del jugador) ═════════
{ const f0 = fisica; fisica = function (dt) {
    const px = J.x, pz = J.z; const r = f0(dt);
    const v = enVehiculo; if (!v) return r;
    if (v.t === 'bote') {
      const s = superficie(Math.floor(J.x), Math.floor(J.z)), s0 = superficie(Math.floor(px), Math.floor(pz));
      if (s === null || (s0 !== null && Math.abs(s - s0) > 0)) { J.x = px; J.z = pz; }
      const sup = superficie(Math.floor(J.x), Math.floor(J.z)) ?? (v.g.position.y + .15);
      J.y = sup + .05; J.vy = 0; v.g.position.set(J.x, sup - .15 + Math.sin(performance.now() / 500) * .03, J.z);
      const vel = Math.hypot(J.x - px, J.z - pz); if (vel > .001) { let d = Math.atan2(J.x - px, J.z - pz) - v.g.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); v.g.rotation.y += d * Math.min(1, dt * 4); }
    } else {
      // la vagoneta avanza sola por los rieles
      J.x = px; J.z = pz;
      if (v.hacia) { v.prog += v.vel * dt; while (v.prog >= 1 && v.hacia) { v.prog -= 1; v.desde = v.hacia; v.hacia = siguienteRiel(v.desde, v.dir) || girarRiel(v); if (!esRiel(get(...v.desde))) { v.hacia = null; break; } } }
      if (!v.hacia) v.prog = 0;
      const a = v.desde, b = v.hacia || v.desde, t = v.hacia ? v.prog : 0;
      const x = a[0] + .5 + (b[0] - a[0]) * t, y = a[1] + .07 + (b[1] - a[1]) * t, z = a[2] + .5 + (b[2] - a[2]) * t;
      v.g.position.set(x, y, z); v.g.rotation.y = Math.atan2(v.dir[0], v.dir[1]);
      Object.assign(J, { x, y: y + .3, z, vx: 0, vy: 0, vz: 0 });
      v.ruidoT = (v.ruidoT || 0) - dt; if (v.hacia && v.ruidoT <= 0) { v.ruidoT = .35; ruido(.12, .05, 500); }
    }
    return r; }; }
window.__tr = { vehiculos, crearVehiculo, subirVehiculo, bajarVehiculo, en: () => enVehiculo, siguienteRiel, superficie };
