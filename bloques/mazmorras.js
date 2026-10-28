'use strict';
// ═════════ MAZMORRAS (mundos nuevos, generación 6) ═════════
// En cada mundo nuevo hay hasta 3 mazmorras bajo tierra: Cripta olvidada (bosques y praderas), Templo de las arenas
// (desierto y cañón) y Caverna de cristal (nieve). Se entra por una casita con una escalera que baja.
// Adentro: sala de entrada, salas con enemigos, sala de trampas (pinchos o lava), sala de palancas que abre una reja,
// cofres y al final un mini jefe. Todo es diseño propio. Los mundos de antes no cambian.

{
const TXT = {
  es: { mz_cripta: 'Cripta olvidada', mz_templo: 'Templo de las arenas', mz_hielo: 'Caverna de cristal', mzEntrada: '{n}<small>una mazmorra: baja si te animas</small>', mzReja: '¡SE ABRIÓ LA REJA!', mzPalanca: 'PALANCAS: {a} DE {b}',
    mzFin: '¡MAZMORRA COMPLETADA!<small>{n}</small>', mzCartel: '{n}. Activa las 3 palancas para abrir la reja. Al final te espera su guardián.', mzPinchos: '¡PINCHOS!' },
  en: { mz_cripta: 'Forgotten Crypt', mz_templo: 'Temple of the Sands', mz_hielo: 'Crystal Cavern', mzEntrada: '{n}<small>a dungeon: go down if you dare</small>', mzReja: 'THE GATE IS OPEN!', mzPalanca: 'LEVERS: {a} OF {b}',
    mzFin: 'DUNGEON CLEARED!<small>{n}</small>', mzCartel: '{n}. Pull the 3 levers to open the gate. Its guardian waits at the end.', mzPinchos: 'SPIKES!' },
  pt: { mz_cripta: 'Cripta esquecida', mz_templo: 'Templo das areias', mz_hielo: 'Caverna de cristal', mzEntrada: '{n}<small>uma masmorra: desça se tiver coragem</small>', mzReja: 'O PORTÃO ABRIU!', mzPalanca: 'ALAVANCAS: {a} DE {b}',
    mzFin: 'MASMORRA CONCLUÍDA!<small>{n}</small>', mzCartel: '{n}. Ative as 3 alavancas para abrir o portão. No fim o guardião espera.', mzPinchos: 'ESPINHOS!' } };
for (const l in TXT) Object.assign(TX[l], TXT[l]);

// ─── bloques: pinchos, palanca (apagada y prendida) y reja ───
const LIB = []; for (let t = 205; t < 256; t++) if (TILES[t] == null) LIB.push(t); for (let t = 397; t < 448; t++) if (TILES[t] == null) LIB.push(t);
const tileM = (n, f, bisel) => { const k = LIB.shift(); if (k == null) return TL.piedra; TILES[k] = n; TL[n] = k; dibujarTile(k, f); if (bisel) biselar(k); return k; };
const NM = {}; const bloqM = (id, clave, es, en, pt, tiles, o) => { B[clave] = id; NM[es] = { en, pt }; def(id, es, tiles, o); return id; };
bloqM(1350, 'PINCHOS', 'Pinchos', 'Spikes', 'Espinhos', [tileM('pinchos', (x, y) => { const c = x % 5, alto = 14 - Math.abs(c - 2) * 5; return y >= alto && c < 5 && Math.abs(c - 2) <= 2 - (15 - y) * 0 ? (y > 12 ? '#5a5e66' : c === 2 ? '#e8eef6' : '#a8b0c0') : null; })], { dur: 1.5, req: 1, trans: true, solido: false, planta: true, color: '#a8b0c0', cat: 'catMec' });
const palancaT = on => (x, y) => { if (y >= 12 && y <= 14 && x >= 4 && x <= 11) return y === 12 ? '#7a7e86' : '#5a5e66'; if (y < 2 || y > 11) return null; const t = (12 - y) / 9, hx = 7.5 + (on ? 1 : -1) * t * 4.2; if (Math.abs(x - hx) < 1.2) return y <= 4 ? (on ? '#3ae05a' : '#e0402a') : '#8a5a2e'; return null; };
bloqM(1351, 'PALANCA_M', 'Palanca antigua', 'Old lever', 'Alavanca antiga', [tileM('palancaM0', palancaT(false))], { dur: -1, trans: true, solido: false, planta: true, color: '#8a5a2e' });
bloqM(1352, 'PALANCA_M_ON', 'Palanca antigua', 'Old lever', 'Alavanca antiga', [tileM('palancaM1', palancaT(true))], { dur: -1, trans: true, solido: false, planta: true, color: '#8a5a2e' });
bloqM(1353, 'REJA', 'Reja', 'Iron gate', 'Grade', [tileM('reja', (x, y) => (x % 4 === 1 || y === 1 || y === 14) ? (x % 4 === 1 && y % 5 === 0 ? '#c8d0e0' : '#6a7080') : null)], { dur: -1, trans: true, color: '#6a7080' });
try { atlasTex.needsUpdate = true; } catch (e) {}
for (const es in NM) for (const l of ['en', 'pt']) { NOMBRES[l] = NOMBRES[l] || {}; NOMBRES[l][es] = NM[es][l]; }
if (!TODOS.includes(B.PINCHOS)) TODOS.push(B.PINCHOS);

// ─── temas ───
const TEMA = {
  cripta: { pared: [B.LADR_PIEDRA, B.LADR_MUSGO, B.ADOQ_MUSGO], piso: B.PIEDRA_P || B.ADOQUIN, techo: B.LADR_PIEDRA, marco: B.LADR_MUSGO, mons: ['zombi', 'arquero', 'arana'], jefe: 'guardianCripta', trampa: 'pinchos' },
  templo: { pared: [B.ARENISCA, B.ARENISCA_T, B.ARENISCA_R], piso: B.ARENISCA_T, techo: B.ARENISCA, marco: B.ARENISCA_R, mons: ['arana', 'bombin', 'arquero'], jefe: 'escorpion', trampa: 'lava' },
  hielo: { pared: [B.LADR_HIELO, B.HIELO_C, B.HIELO_AZUL], piso: B.HIELO_C, techo: B.LADR_NIEVE, marco: B.HIELO_AZUL, mons: ['loboHielo', 'espirituEscarcha', 'arquero'], jefe: 'golemCristal', trampa: 'pinchos' } };

// ═════════ GENERACIÓN ═════════
let MZ = [];
const cofresMZ = new Map();
crearMundo = function (modo, ejemplo = false) {   // los mundos nuevos nacen con generación 6 (biomas + mazmorras)
  const lista = leerLista(), id = Date.now().toString(36), n = lista.length + 1;
  lista.unshift({ id, nombre: 'Mundo ' + n, num: n, modo, ejemplo, tam: ejemplo ? 160 : (window.tamNuevo || 160), semilla: ejemplo ? SEMILLA_EJEMPLO : (Math.random() * 2147483647) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0, gen: ejemplo ? 2 : 6 });
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  pantallaCompleta(); entrarMundo(id);
};
{ const p0 = prepararMundo; prepararMundo = function (S, ej) { MZ = []; cofresMZ.clear(); const r = p0.apply(this, arguments);
    if ((window.genVersion || 1) >= 6 && !window.mundoTipo && !ej) { try { generarMazmorras(S); } catch (e) { console.error(e); } }
    return r; }; }
function generarMazmorras(S) {
  const at = (x, y, z) => dentro(x, y, z) ? mundo[idx(x, y, z)] : 0, put = (x, y, z, t) => { if (dentro(x, y, z) && mundo[idx(x, y, z)] !== B.ROCA) mundo[idx(x, y, z)] = t; };
  const R = (a, b, c) => h3(a, b, c, S + 6100);
  const NOS = new Set(); for (const k in DEF) { const d = DEF[k]; if (d.planta || /^(Hojas|Tronco)/.test(d.nombre || '')) NOS.add(+k); }
  const suelo = (x, z) => { for (let y = SY - 1; y > 0; y--) { const t = at(x, y, z); if (t && !NOS.has(t)) return t === B.AGUA ? -1 : y; } return -1; };
  const evitar = [{ x: spawn.x, z: spawn.z, r: 30 }];
  for (const a of aldeas || []) evitar.push({ x: a.x, z: a.z, r: 20 });
  try { for (const e of window.__est.EST.lista) evitar.push({ x: e.x, z: e.z, r: (e.r || 8) + 4 }); } catch (e) {}
  try { for (const z of window.__biomas.zonas()) if (z.k === 'volcan' || z.k === 'arrecife') evitar.push({ x: z.x, z: z.z, r: z.r + 4 }); } catch (e) {}
  const bio = (x, z) => (typeof biomaDe === 'function' && biomaDe) ? biomaDe(x, z) : 0;
  const zonaDe = (x, z) => { try { const Z = window.__biomas.zonas().find(q => Math.hypot(x - q.x, z - q.z) < q.r); return Z ? Z.k : null; } catch (e) { return null; } };
  const temaDe = (x, z) => { const b = bio(x, z), zk = zonaDe(x, z); return b === 1 || zk === 'canon' ? 'templo' : b === 2 ? 'hielo' : 'cripta'; };
  const P = 16, DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const quiero = ['cripta', 'templo', 'hielo'];
  for (const [n, tq] of quiero.entries()) {
    let elegido = null;
    for (let g = 0; g < 1500 && !elegido; g++) {
      const x = 14 + Math.floor(R(g, 1, n) * (SX - 28)), z = 14 + Math.floor(R(g, 2, n) * (SZ - 28)), h = suelo(x, z);
      if (h <= SEA + 1 || evitar.some(e => Math.hypot(x - e.x, z - e.z) < e.r + 6)) continue;
      if (g < 1100 && temaDe(x, z) !== tq) continue;   // primero se busca el bioma justo; si no hay, cualquier lugar
      // camino de salas
      const camino = [[x, z]], usados = new Set([x + ',' + z]);
      for (let k = 1; k < 6; k++) { const [px, pz] = camino[camino.length - 1]; const ops = DIRS.map(d => [px + d[0] * P, pz + d[1] * P]).filter(([a, b]) => a > 12 && b > 12 && a < SX - 12 && b < SZ - 12 && !usados.has(a + ',' + b) && !MZ.some(m => m.salas.some(s => Math.hypot(a - s.cx, b - s.cz) < P + 2)));
        if (!ops.length) break; const el = ops[Math.floor(R(g, 10 + k, n) * ops.length)]; camino.push(el); usados.add(el[0] + ',' + el[1]); }
      if (camino.length < 5) continue;
      elegido = { x, z, h, camino, tema: g < 1100 ? tq : temaDe(x, z) };
    }
    if (!elegido) continue;
    const T = TEMA[elegido.tema], id = 'mz' + n;
    let minH = 99; for (const [a, b] of elegido.camino) minH = Math.min(minH, Math.abs(suelo(a, b)) || SEA);
    const y0 = Math.max(3, Math.min(minH, SEA) - 12);
    const pared = (x, y, z) => { const r = R(x * 7 + y, z, 3); return T.pared[r < .7 ? 0 : r < .9 ? 1 : 2]; };
    const tipos = ['inicio', 'enemigos', 'trampas', 'palancas', 'enemigos', 'jefe'].slice(0, elegido.camino.length); tipos[tipos.length - 1] = 'jefe';
    const mz = { id, tema: elegido.tema, entrada: { x: elegido.x, z: elegido.z, y: elegido.h }, y0, salas: [], reja: [], palancas: [] };
    // salas
    elegido.camino.forEach(([cx, cz], k) => { const r = tipos[k] === 'jefe' ? 6 : 4, s = { tipo: tipos[k], cx, cz, x0: cx - r, x1: cx + r, z0: cz - r, z1: cz + r, y0, y1: y0 + (tipos[k] === 'jefe' ? 7 : 5) };
      for (let x = s.x0 - 1; x <= s.x1 + 1; x++) for (let z = s.z0 - 1; z <= s.z1 + 1; z++) for (let y = y0 - 1; y <= s.y1 + 1; y++) {
        const borde = x < s.x0 || x > s.x1 || z < s.z0 || z > s.z1;
        put(x, y, z, y === y0 - 1 ? B.PIEDRA : y === y0 ? (borde ? pared(x, y, z) : T.piso) : y === s.y1 + 1 ? T.techo : borde ? pared(x, y, z) : B.AIRE); }
      for (const [a, b] of [[s.x0, s.z0], [s.x1, s.z0], [s.x0, s.z1], [s.x1, s.z1]]) put(a, y0 + 1, b, B.ANTORCHA);
      mz.salas.push(s); });
    // pasillos
    for (let k = 1; k < mz.salas.length; k++) { const a = mz.salas[k - 1], b = mz.salas[k], dx = Math.sign(b.cx - a.cx), dz = Math.sign(b.cz - a.cz);
      const ini = dx ? (dx > 0 ? a.x1 : a.x0) : (dz > 0 ? a.z1 : a.z0), fin = dx ? (dx > 0 ? b.x0 : b.x1) : (dz > 0 ? b.z0 : b.z1);
      for (let t = ini; dx ? (dx > 0 ? t <= fin : t >= fin) : (dz > 0 ? t <= fin : t >= fin); t += dx || dz) for (let w = -2; w <= 2; w++) for (let y = y0 - 1; y <= y0 + 4; y++) {
        const x = dx ? t : a.cx + w, z = dz ? t : a.cz + w, borde = Math.abs(w) === 2;
        const dentroSala = mz.salas.some(s => x >= s.x0 && x <= s.x1 && z >= s.z0 && z <= s.z1); if (dentroSala) continue;
        put(x, y, z, y === y0 - 1 ? B.PIEDRA : y === y0 ? (borde ? pared(x, y, z) : T.piso) : y === y0 + 4 ? T.techo : borde ? pared(x, y, z) : B.AIRE);
        if (!borde && y === y0 + 1 && Math.abs(w) === 1 && Math.abs(t - ini) % 5 === 2) put(x, y, z, B.ANTORCHA); }
      // la reja después de la sala de palancas
      if (a.tipo === 'palancas') { const t = dx ? (dx > 0 ? a.x1 + 1 : a.x0 - 1) : (dz > 0 ? a.z1 + 1 : a.z0 - 1);
        for (let w = -1; w <= 1; w++) for (let y = y0 + 1; y <= y0 + 3; y++) { const x = dx ? t : a.cx + w, z = dz ? t : a.cz + w; put(x, y, z, B.REJA); mz.reja.push(idx(x, y, z)); } } }
    // contenido de cada sala
    for (const s of mz.salas) {
      if (s.tipo === 'inicio') { put(s.cx + 2, y0 + 1, s.cz + 2, B.CARTEL); try { carteles[idx(s.cx + 2, y0 + 1, s.cz + 2)] = TR('mzCartel', { n: TR('mz_' + mz.tema) }); } catch (e) {} }
      if (s.tipo === 'trampas') {
        if (T.trampa === 'lava') { for (let x = s.x0; x <= s.x1; x++) for (let z = s.z0; z <= s.z1; z++) { const piedra = ((x - s.x0) % 3 === 1 && (z - s.z0) % 2 === 0) || x === s.x0 || x === s.x1 && (z - s.z0) % 4 === 0;
            if (Math.abs(x - s.cx) + Math.abs(z - s.cz) > 0 && !piedra) { put(x, y0, z, B.LAVA); put(x, y0 - 1, z, B.PIEDRA); } } }
        else for (let x = s.x0; x <= s.x1; x++) for (let z = s.z0; z <= s.z1; z++) { const fila = (x - s.x0) + (z - s.z0); if ((fila % 3 === 0 || R(x, z, 77) < .18) && (x + z) % 5 !== 0) put(x, y0 + 1, z, B.PINCHOS); }
        put(s.x1 - 1, y0 + 1, s.z1 - 1, B.COFRE); cofresMZ.set(idx(s.x1 - 1, y0 + 1, s.z1 - 1), 'medio'); }
      if (s.tipo === 'palancas') { const ps = [[s.x0, s.cz], [s.cx, s.z0], [s.x1, s.z1]]; for (const [x, z] of ps) { put(x, y0 + 1, z, B.PALANCA_M); mz.palancas.push(idx(x, y0 + 1, z)); } }
      if (s.tipo === 'enemigos' && mz.salas.indexOf(s) > 2) { put(s.cx, y0 + 1, s.z0, B.COFRE); cofresMZ.set(idx(s.cx, y0 + 1, s.z0), 'medio'); }
      if (s.tipo === 'jefe') { for (const [a, b] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) for (let y = y0 + 1; y <= s.y1; y++) put(s.cx + a, y, s.cz + b, T.marco);
        for (const w of [-1, 1]) { put(s.cx + w * 2, y0 + 1, s.z1, B.COFRE); cofresMZ.set(idx(s.cx + w * 2, y0 + 1, s.z1), 'jefe'); } }
    }
    // entrada: casita en la superficie y escalera hasta la primera sala
    const s0 = mz.salas[0], ex = s0.cx, ez = s0.cz, eh = Math.max(elegido.h, SEA + 1);
    for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) { const borde = Math.abs(a) === 2 || Math.abs(b) === 2;
      for (let y = eh + 1; y <= eh + 4; y++) put(ex + a, y, ez + b, y === eh + 4 ? T.techo : borde && !(b === 2 && Math.abs(a) < 1 && y < eh + 3) ? pared(ex + a, y, ez + b) : B.AIRE);
      put(ex + a, eh, ez + b, T.piso); }
    put(ex - 2, eh + 5, ez - 2, T.marco); put(ex + 2, eh + 5, ez - 2, T.marco); put(ex - 2, eh + 5, ez + 2, T.marco); put(ex + 2, eh + 5, ez + 2, T.marco);
    put(ex - 1, eh + 1, ez + 3, B.ANTORCHA); put(ex + 1, eh + 1, ez + 3, B.ANTORCHA);
    for (let y = y0 + 1; y <= eh; y++) { put(ex, y, ez, B.ESCALERA); if (y > y0 + 6) for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) if (a || b) put(ex + a, y, ez + b, pared(ex + a, y, ez + b)); }
    put(ex, eh + 1, ez, B.ESCALERA);
    mz.entrada = { x: ex + .5, y: eh + 1, z: ez + .5 };
    MZ.push(mz);
  }
}
// loot de los cofres de las mazmorras
{ const l0 = lootCofre; lootCofre = function (i) {
    const t = !window.mundoTipo && cofresMZ.get(i); if (!t) return l0.apply(this, arguments);
    const r = k => h3(i, k, 13, semilla + 6200), c = {};
    c[I.ORO] = 2 + Math.floor(r(1) * 5); c[I.HIERRO] = 2 + Math.floor(r(2) * 4); if (r(3) < .5) c[I.CRISTAL] = 1 + Math.floor(r(4) * 2); c[I.PAN] = 2;
    if (I.SEMILLA_DORADA && r(5) < .5) c[I.SEMILLA_DORADA] = 1; if (I.PERLA && r(6) < .4) c[I.PERLA] = 1 + Math.floor(r(7) * 2);
    if (t === 'jefe') { const armas = [I.LANZA_H, I.HACHA_GUERRA, I.ESCUDO, I.ESP4, I.ARCO].filter(Boolean); c[armas[Math.floor(r(8) * armas.length)]] = 1; c[I.ORO] += 4; c[I.CRISTAL] = (c[I.CRISTAL] || 0) + 2; if (I.POCION != null) c[I.POCION + Math.floor(r(9) * 4)] = 2; }
    return c; }; }

// ═════════ PALANCAS Y REJA ═════════
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) {
    const h = apuntar(dir);
    if (h && (h.b === B.PALANCA_M || h.b === B.PALANCA_M_ON)) { const on = h.b === B.PALANCA_M; ponerBloque(h.x, h.y, h.z, on ? B.PALANCA_M_ON : B.PALANCA_M); swing = 1; son(on ? 300 : 220, .12, 'square', .08); son(on ? 600 : 180, .1, 'triangle', .06);
      const i = idx(h.x, h.y, h.z), mz = MZ.find(m => m.palancas.includes(i));
      if (mz) { const n = mz.palancas.filter(q => mundo[q] === B.PALANCA_M_ON).length; aviso(TR('mzPalanca', { a: n, b: mz.palancas.length }), 1200);
        if (n === mz.palancas.length && mz.reja.some(q => mundo[q] === B.REJA)) setTimeout(() => { accion(() => { for (const q of mz.reja) if (mundo[q] === B.REJA) { const y = Math.floor(q / (SX * SZ)), r = q % (SX * SZ); ponerBloque(r % SX, y, Math.floor(r / SX), B.AIRE); } });
          aviso(TR('mzReja'), 2200); son(120, .8, 'sawtooth', .1); ruido(.6, .2, 800); vibrar(150); }, 500); }
      return true; }
    return t0(dir); }; }

// ═════════ MINI JEFES ═════════
const Mc = c => matA(parseInt(c.slice(1), 16)), Mb = c => new THREE.MeshBasicMaterial({ color: parseInt(c.slice(1), 16) });
const azM = (a, b) => a + Math.random() * (b - a);
TIPOS.guardianCripta = { vida: 170, an: .7, al: 3.2, vel: 1, peso: .8, color: '#e8e4d4', voz: 'hueso', hostil: true, ia: true, jefe: true, noNatural: true, dano: 5,
  armar(g) { const hu = Mc('#ebe6d2'), so = Mc('#9a9484'), ar = Mc('#6a7080'), ne = Mc('#1d1d21'), oj = Mb('#5ae8ff'), ca = Mc('#3a4a8a');
    caja(g, .9, 1.0, .5, 0, 1.9, 0, ar); caja(g, .8, .2, .52, 0, 1.4, 0, so); caja(g, .9, .1, .9, 0, 2.45, 0, ar); caja(g, .7, .7, .66, 0, 2.8, 0, hu);
    for (const s of [-1, 1]) { caja(g, .14, .12, .03, s * .15, 2.85, .34, oj); const b = caja(g, .2, .9, .2, s * .6, 1.95, .1, hu); b.rotation.x = -.2; caja(g, .34, .24, .34, s * .58, 2.4, 0, ar); }
    caja(g, .8, .14, .4, 0, 3.2, -.05, ca); caja(g, .1, 1.6, .1, .62, 1.6, .55, Mc('#c8d0e0')); caja(g, .4, .08, .08, .62, 1.0, .55, Mc('#ffd23a'));
    return [-1, 1].map(s => pata(g, .22, 1.3, .22, s * .22, 1.35, 0, hu)); },
  guiar(a, dt) { if (!atacan(a)) return deambular(); const u = a.userData, h = haciaJ(a); u.ayuda2 = u.ayuda2 ?? 0;
    if (u.vida < 110 && u.ayuda2 < 1 || u.vida < 55 && u.ayuda2 < 2) { u.ayuda2++; for (let k = 0; k < 2; k++) { const e = crearAnimal('arquero', a.position.x + azM(-3, 3), a.position.y + .2, a.position.z + azM(-3, 3)); ex(e).f = 1; } }
    u.salto = (u.salto ?? 5) - dt; if (u.salto <= 0 && u.suelo && h.d < 7) { u.salto = azM(4, 6); u.vy = 7; u.golpe = true; }
    if (u.golpe && u.suelo && u.vy <= 0) { u.golpe = false; polvo(a.position.x, a.position.y + .2, a.position.z, '#9a9484', 20); son(60, .5, 'sawtooth', .15); if (h.d < 4) lastimar(4, h.dx / h.d * 2, h.dz / h.d * 2); }
    morder(a, h, 5, 2, dt); return { dir: h.dir, vel: h.d > 1.5 ? u.vel * 1.3 : 0 }; },
  suelta: () => [[I.ORO, 6], [I.HUESO, 6], [I.CRISTAL, 2]] };
TIPOS.escorpion = { vida: 160, an: 1, al: 1.4, vel: 1.3, peso: .7, color: '#c8803a', voz: 'arana', hostil: true, ia: true, jefe: true, noNatural: true, dano: 4,
  armar(g) { const m = Mc('#c8803a'), m2 = Mc('#9a5a20'), ne = Mc('#1d1d21'), pu = Mb('#7aff5a');
    caja(g, 1.2, .5, 1.6, 0, .55, 0, m); caja(g, 1.0, .3, 1.4, 0, .85, 0, m2); for (const s of [-1, 1]) { caja(g, .1, .1, .03, s * .2, .75, .81, ne); const p = caja(g, .3, .25, .7, s * .7, .55, 1.1, m); p.rotation.y = s * -.3; caja(g, .36, .3, .3, s * .85, .6, 1.5, m2); }
    const c = new THREE.Group(); c.position.set(0, .9, -.8); g.add(c); [[0, .3, -.2], [0, .7, -.3], [0, 1.1, -.1], [0, 1.35, .25]].forEach(([x, y, z], k) => caja(c, .3 - k * .03, .34, .34, x, y, z, k % 2 ? m2 : m)); caja(c, .14, .3, .14, 0, 1.5, .5, pu); g._cola = c;
    return [-1, 1].flatMap(s => [.5, 0, -.5].map(z => { const q = pata(g, .12, .45, .12, s * .7, .45, z, m2); q.rotation.z = s * .5; return q; })); },
  guiar(a, dt) { if (!atacan(a)) return deambular(); const u = a.userData, h = haciaJ(a); if (a._cola) a._cola.rotation.x = Math.sin(u.t * 3) * .2;
    u.tiro = (u.tiro ?? 2.5) - dt; if (u.tiro <= 0 && h.d > 3 && h.d < 14) { u.tiro = azM(2, 3); const p = a.position; disparar('escupida', p.x, p.y + 2.4, p.z, J.x, J.y + 1, J.z); }
    if (u.vida < 80 && !u.furia) { u.furia = true; u.vel *= 1.4; aviso('¡!', 600); }
    morder(a, h, 4, 2.2, dt); return { dir: h.dir, vel: h.d > 1.8 ? u.vel * 1.5 : 0 }; },
  suelta: () => [[I.ORO, 8], [B.ARENISCA_R, 8], [I.CRISTAL, 2]] };
TIPOS.golemCristal = { vida: 190, an: .8, al: 3, vel: .8, peso: 1, color: '#9ae4ff', voz: 'golpe', hostil: true, ia: true, jefe: true, noNatural: true, dano: 5,
  armar(g) { const m = Mt2('#9ae4ff'), m2 = Mt2('#ffffff'), oj = Mb('#1a6aa0'), pi = Mc('#c8d0e0');
    caja(g, 1.2, 1.2, .8, 0, 1.6, 0, m); caja(g, .7, .6, .6, 0, 2.5, .05, m2); for (const s of [-1, 1]) { caja(g, .14, .1, .03, s * .15, 2.55, .36, oj); caja(g, .4, 1.1, .4, s * .85, 1.5, 0, m); caja(g, .3, .5, .3, s * .3, 3.0, 0, m2); }
    caja(g, .3, .7, .3, 0, 3.1, -.1, m); return [-1, 1].map(s => pata(g, .45, 1.0, .45, s * .3, 1.0, 0, pi)); },
  guiar(a, dt) { if (!atacan(a)) return deambular(); const u = a.userData, h = haciaJ(a);
    u.tiro = (u.tiro ?? 2) - dt; if (u.tiro <= 0 && h.d < 16) { u.tiro = azM(1.8, 2.6); const p = a.position; for (const d of [-1, 0, 1]) disparar('hielo', p.x, p.y + 2.5, p.z, J.x + d * 1.2, J.y + 1, J.z + d * 1.2); }
    if (u.vida < 95 && !u.ayuda) { u.ayuda = true; for (let k = 0; k < 2; k++) { const e = crearAnimal('espirituEscarcha', a.position.x + azM(-3, 3), a.position.y + 2, a.position.z + azM(-3, 3)); ex(e).f = 1; } }
    morder(a, h, 5, 2.2, dt); return { dir: h.dir, vel: h.d > 2 ? u.vel : 0 }; },
  suelta: () => [[I.ORO, 6], [B.HIELO_AZUL, 12], [I.CRISTAL, 4]] };
function Mt2(c) { return new THREE.MeshLambertMaterial({ color: parseInt(c.slice(1), 16), transparent: true, opacity: .82 }); }
try { Object.assign(NOM_CRIA.es, { guardianCripta: 'Guardián de la cripta', escorpion: 'Escorpión gigante', golemCristal: 'Gólem de cristal' }); Object.assign(NOM_CRIA.en, { guardianCripta: 'Crypt Guardian', escorpion: 'Giant scorpion', golemCristal: 'Crystal golem' }); Object.assign(NOM_CRIA.pt, { guardianCripta: 'Guardião da cripta', escorpion: 'Escorpião gigante', golemCristal: 'Golem de cristal' });
  GRUPOS_CRIA.find(g => g[0] === 'criaJefes')[1].push('guardianCripta', 'escorpion', 'golemCristal'); } catch (e) {}

// ═════════ CADA CUADRO: avisos, enemigos al entrar, pinchos, jefes ═════════
let mzT = 0, pinchoT = 0, avisada = null;
function salaDe(x, y, z) { for (const m of MZ) for (const [k, s] of m.salas.entries()) if (x >= s.x0 && x <= s.x1 + 1 && z >= s.z0 && z <= s.z1 + 1 && y >= s.y0 && y <= s.y1 + 1) return { m, s, k }; return null; }
function frameMZ(dt) {
  if (!jugando || pausado || window.mundoTipo || !MZ.length) return;
  // pinchos (también fuera de las mazmorras)
  pinchoT -= dt; const pie = get(Math.floor(J.x), Math.floor(J.y + .1), Math.floor(J.z));
  if (pie === B.PINCHOS && pinchoT <= 0 && !creativo()) { pinchoT = .7; lastimar(2, 0, 0, false); aviso(TR('mzPinchos'), 500); }
  mzT -= dt; if (mzT > 0) return; mzT = .4;
  // cartel al acercarse a la entrada
  const cerca = MZ.find(m => Math.hypot(J.x - m.entrada.x, J.z - m.entrada.z) < 9 && Math.abs(J.y - m.entrada.y) < 6);
  if (cerca && avisada !== cerca.id) { avisada = cerca.id; aviso(TR('mzEntrada', { n: TR('mz_' + cerca.tema).toUpperCase() }), 3200); } if (!cerca && avisada && !salaDe(J.x, J.y, J.z)) avisada = null;
  if (creativo() || (window.__mp && __mp.MP.invitado)) return;
  const q = salaDe(J.x, J.y, J.z); if (!q) return;
  mapa.mz = mapa.mz || {}; const clave = q.m.id + '_' + q.k, T = TEMA[q.m.tema];
  if (q.s.tipo === 'enemigos' && !mapa.mz[clave]) { mapa.mz[clave] = 1; sucio = true;
    for (let k = 0; k < 3 + (q.k > 2 ? 1 : 0); k++) { const t = T.mons[k % T.mons.length], x = q.s.cx + azM(-3, 3), z = q.s.cz + azM(-3, 3); const e = crearAnimal(t, x, q.s.y0 + (TIPOS[t] && TIPOS[t].vuela ? 2.5 : 1.05), z); ex(e).f = 1; } }
  if (q.s.tipo === 'jefe' && !mapa.mz[q.m.id + '_jefe'] && !animales.some(a => a.userData.animal === T.jefe)) {
    const e = crearAnimal(T.jefe, q.s.cx + .5, q.s.y0 + 1.05, q.s.cz - 3); ex(e).f = 1; ex(e).mz = q.m.id; aviso(TR('jefeLlega', { n: nomCria(T.jefe).toUpperCase() }), 2600); try { voz('rugidoJefe', 0); } catch (e2) {} }
}
{ const m0 = matarAnimal; matarAnimal = function (a) { const e = a.userData.extra; if (e && e.mz && jugando && !creativo()) { mapa.mz = mapa.mz || {}; mapa.mz[e.mz + '_jefe'] = 1; sucio = true; const m = MZ.find(q => q.id === e.mz); stats.mazmorras = (stats.mazmorras || 0) + 1; setTimeout(() => aviso(TR('mzFin', { n: m ? TR('mz_' + m.tema) : '' }), 3500), 1200); } return m0.apply(this, arguments); }; }
{ const p0 = pjFrame; pjFrame = function (dt) { const r = p0.apply(this, arguments); try { frameMZ(dt); } catch (e) { console.warn('mz', e && e.message); } return r; }; }
// logro
try { const k = LOGROS.findIndex(l => l[0] === 'todos'); LOGROS.splice(k < 0 ? LOGROS.length : k, 0, ['mazmorra', B.REJA, () => (stats.mazmorras || 0) >= 1, 'Explorador de mazmorras', 'Completa una mazmorra', 'Dungeon Crawler', 'Clear a dungeon', 'Explorador de masmorras', 'Complete uma masmorra']); } catch (e) {}

window.__mz = { lista: () => MZ, salaDe };
}
