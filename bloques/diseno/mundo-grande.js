'use strict';
// ═════════ MUNDOS NUEVOS MÁS GRANDES Y MÁS VIVOS (generación 8, solo mundos creados desde ahora) ═════════
// · Tamaño "Gigante".
// · Llanuras grandes y planas, ríos que cruzan la isla, lagos y alguna cascada en las montañas.
// · Pueblos de pradera con pozo, caminos de tierra que los unen, y estructuras para explorar
//   (torres de vigía, pozos de los deseos, campamentos y ruinas) con cofres.
// Los mundos que ya existen no cambian: todo depende de que el mundo tenga gen 8.

const G8_TAM = 512;
Object.assign(TX.es, { tamGig: 'Gigante', g8Torre: 'TORRE DE VIGÍA', g8Pueblo: 'PUEBLO DE LA PRADERA' });
Object.assign(TX.en, { tamGig: 'Giant', g8Torre: 'WATCHTOWER', g8Pueblo: 'MEADOW VILLAGE' });
Object.assign(TX.pt, { tamGig: 'Gigante', g8Torre: 'TORRE DE VIGIA', g8Pueblo: 'VILA DA PRADARIA' });
const g8 = () => (window.genVersion || 1) >= 8 && !window.mundoTipo;

// ─── el tamaño Gigante en "Mundo nuevo" ───
{ const o = $('tamOpc'); if (o && !o.querySelector(`[data-t="${G8_TAM}"]`)) { const d = document.createElement('div'); d.dataset.t = G8_TAM; d.dataset.i = 'tamGig'; d.textContent = TR('tamGig'); o.appendChild(d);
    if (+window.tamNuevo === G8_TAM) d.classList.add('on');
    o.addEventListener('click', () => setTimeout(() => { for (const x of o.children) x.classList.toggle('on', +x.dataset.t === +window.tamNuevo); }, 0)); } }

// ─── los mundos creados desde ahora usan la generación 8 ───
{ const c0 = crearMundo; crearMundo = function () {
    const e0 = entrarMundo;
    entrarMundo = function (id) { entrarMundo = e0; try { const l = leerLista(), m = l.find(x => x.id === id); if (m && !m.ejemplo) { m.gen = Math.max(m.gen || 1, 8); localStorage.setItem('bloquesMundos', JSON.stringify(l)); } } catch (e) {} return e0.apply(this, arguments); };
    try { return c0.apply(this, arguments); } finally { if (entrarMundo !== e0) entrarMundo = e0; } }; }

// ─── terreno: llanuras, ríos y lagos (se cambia la fórmula de altura del generador base) ───
{ const src = generar.toString();
  const viejo = 'let h = Math.round(Math.min(SY - 7, SEA - 7 + isla * (9 + e * 14 + m * 3 + mont * mont * 22)));';
  if (src.includes(viejo)) {
    const nuevo = `let h;
    if ((window.genVersion || 1) >= 8 && !window.mundoTipo) {
      // más tierra firme: continentes grandes, con mar alrededor del borde del mundo
      const cont = sstep(.44, .58, vn2(x / 95 + 31, z / 95 + 17, S + 940)) * (1 - sstep(SX * .36, SX * .47, Math.hypot(x - SX / 2, z - SZ / 2)));
      isla = Math.max(isla, cont);
      const pl = sstep(.42, .6, vn2(x / 85 + 11, z / 85 + 7, S + 900));
      const alto = 9 + e * 14 + m * 3 + mont * mont * 22, plano = 10 + e * 2.2 + m * .8;
      let hh = SEA - 7 + isla * (alto * (1 - pl) + plano * pl);
      const rv = Math.abs(vn2(x / 120 + 3, z / 120 + 5, S + 920) - .5);
      if (isla > .35 && rv < .035) { const k = sstep(0, 1, (1 - rv / .035) * 1.7); hh = hh * (1 - k) + (SEA - 2) * k; }
      const lk = vn2(x / 48 + 21, z / 48 + 9, S + 930);
      if (isla > .55 && lk > .72) { const k = sstep(.72, .8, lk); hh = hh * (1 - k) + (SEA - 3) * k; }
      h = Math.round(Math.min(SY - 7, hh));
    } else h = Math.round(Math.min(SY - 7, SEA - 7 + isla * (9 + e * 14 + m * 3 + mont * mont * 22)));`;
    try { generar = (0, eval)('(' + src.replace(viejo, nuevo) + ')'); } catch (e) { console.error('g8 generar', e); }
  } else console.warn('g8: no se encontró la fórmula de altura'); }

// ─── después de todo lo demás: pueblos, caminos, estructuras, cascadas ───
let G8 = { pueblos: [], cofres: new Map(), lugares: [] };
function generarG8(S) {
  G8 = { pueblos: [], cofres: new Map(), lugares: [] }; const T0 = performance.now();
  const at = (x, y, z) => dentro(x, y, z) ? mundo[idx(x, y, z)] : 0, put = (x, y, z, t) => { if (dentro(x, y, z) && t != null) mundo[idx(x, y, z)] = t; };
  const R = (a, b, c) => h3(a, b, c, S + 8800);
  const NOS = new Set(); for (const k in DEF) { const d = DEF[k], n = d.nombre || ''; if (d.planta || /^(Hojas|Tronco)/.test(n) || +k === B.CACTUS || +k === B.ENREDADERA) NOS.add(+k); }
  const suelo = (x, z) => { for (let y = SY - 1; y > 0; y--) { const t = at(x, y, z); if (t && !NOS.has(t)) return t === B.AGUA ? -1 : y; } return -1; };
  const F = SX / 160;
  // llanuras abiertas: en el centro de cada llanura se sacan los árboles (quedan algunos sueltos en el borde)
  { const HOJ = new Set(); for (const k in DEF) if (/^(Hojas|Tronco)/.test((DEF[k] || {}).nombre || '')) HOJ.add(+k);
    for (let x = 0; x < SX; x++) for (let z = 0; z < SZ; z++) { const p = vn2(x / 85 + 11, z / 85 + 7, S + 900); if (p < .6) continue;
      for (let y = SEA; y < SY; y++) { const t = at(x, y, z); if (HOJ.has(t)) put(x, y, z, B.AIRE); }
      let y = SY - 1; while (y > 0 && !at(x, y, z)) y--; if (at(x, y, z) === B.TIERRA) put(x, y, z, B.PASTO); } }
  // lugares ocupados
  const ocup = [{ x: spawn.x, z: spawn.z, r: 10 }];
  for (const a of aldeas || []) ocup.push({ x: a.x, z: a.z, r: 16 });
  for (const r of ruinas || []) ocup.push({ x: r.x, z: r.z, r: 6 });
  try { for (const e of window.__est.EST.lista) ocup.push({ x: e.x, z: e.z, r: (e.r || 8) + 3 }); } catch (e) {}
  try { for (const Z of ((window.__biomas && __biomas.zonas()) || [])) ocup.push({ x: Z.x, z: Z.z, r: Z.r }); } catch (e) {}
  try { for (const m of (window.__mz && __mz.lista()) || []) ocup.push({ x: m.entrada.x, z: m.entrada.z, r: 8 }); } catch (e) {}
  const libre = (x, z, r) => ocup.every(o => Math.hypot(x - o.x, z - o.z) > r + o.r);
  // ¿qué tan plano es alrededor? devuelve la altura del medio o -1
  // (se permite un poquito de agua alrededor, por los ríos y lagos; el centro tiene que ser tierra)
  const plano = (x, z, r, tol, aguaMax = 0) => { const hs = []; let w = 0; if (suelo(x, z) <= SEA) return -1; for (let i = -r; i <= r; i += 2) for (let j = -r; j <= r; j += 2) { const h = suelo(x + i, z + j); if (h <= SEA) { if (++w > aguaMax) return -1; continue; } hs.push(h); } hs.sort((a, b) => a - b); const a = hs[Math.floor(hs.length * .1)], b = hs[Math.floor(hs.length * .9)]; return b - a <= tol ? hs[hs.length >> 1] : -1; };
  const aplanar = (x, y, z, r) => { for (let i = -r; i <= r; i++) for (let j = -r; j <= r; j++) { for (let h = y + 1; h < Math.min(SY, y + 14); h++) put(x + i, h, z + j, B.AIRE); for (let h = y; h > y - 5; h--) { const t = at(x + i, h, z + j); if (!t || t === B.AGUA || NOS.has(t)) put(x + i, h, z + j, h === y ? B.PASTO : B.TIERRA); } put(x + i, y, z + j, at(x + i, y, z + j) === B.ARENA ? B.ARENA : B.PASTO); } };
  const cofre = (x, y, z, tipo) => { put(x, y, z, B.COFRE); G8.cofres.set(idx(x, y, z), tipo); };
  const buscar = (k, r, tol, sep, intentos, aguaMax = 0, lejos = 0) => { for (let n = 0; n < intentos; n++) { const x = Math.floor(r + 4 + R(n, k, 1) * (SX - 2 * r - 8)), z = Math.floor(r + 4 + R(n, k, 2) * (SZ - 2 * r - 8));
      if (!libre(x, z, r + sep)) continue; if (lejos && G8.pueblos.some(P => Math.hypot(P.x - x, P.z - z) < lejos)) continue; const y = plano(x, z, r, tol, aguaMax); if (y > 0) { ocup.push({ x, z, r }); return { x, y, z }; } } return null; };

  // ── pueblos de la pradera ──
  const nPueblos = Math.max(2, Math.round(1.2 * F));
  const WALL = [B.MADERA, B.TABLONES_ABEDUL || B.MADERA, B.LADR_PIEDRA || B.ADOQUIN], TECHO = [B.LADRILLO, B.TABLONES_EBANO || B.MADERA_O || B.MADERA, B.TABLONES_ACACIA || B.MADERA];
  for (let p = 0; p < nPueblos; p++) {
    const c = buscar(100 + p, 10, 5, 4, 3000, 30, 70); if (!c) continue;
    const casas = [];
    // pozo del medio
    aplanar(c.x, c.y, c.z, 3);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { put(c.x + i, c.y, c.z + j, (i || j) ? B.ADOQUIN : B.AGUA); if (i || j) put(c.x + i, c.y + 1, c.z + j, B.ADOQUIN); }
    for (const [i, j] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { put(c.x + i, c.y + 2, c.z + j, B.VALLA || B.MADERA); put(c.x + i, c.y + 3, c.z + j, B.VALLA || B.MADERA); }
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) put(c.x + i, c.y + 4, c.z + j, B.MADERA);
    const nc = 5 + Math.floor(R(p, 7, 3) * 3);
    for (let k = 0; k < nc; k++) {
      const a = k / nc * 6.283 + R(p, k, 4) * .5, d = 9 + R(p, k, 5) * 3, x = Math.round(c.x + Math.cos(a) * d), z = Math.round(c.z + Math.sin(a) * d);
      const y = suelo(x, z); if (y <= SEA || Math.abs(y - c.y) > 4) continue;
      aplanar(x, y, z, 3);
      const pared = WALL[(p + k) % WALL.length], techo = TECHO[(p * 2 + k) % TECHO.length];
      for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) { const borde = Math.abs(i) === 2 || Math.abs(j) === 2, esq = Math.abs(i) === 2 && Math.abs(j) === 2;
        put(x + i, y, z + j, borde ? B.ADOQUIN : B.MADERA);
        for (let h = 1; h <= 3; h++) put(x + i, y + h, z + j, esq ? B.TRONCO : borde ? (h === 2 && (i === 0 || j === 0) ? B.VIDRIO : pared) : B.AIRE); }
      for (let s = 0; s <= 2; s++) for (let i = -3 + s; i <= 3 - s; i++) for (let j = -3 + s; j <= 3 - s; j++) put(x + i, y + 4 + s, z + j, techo);
      // la puerta mira al pozo
      const dx = c.x - x, dz = c.z - z, pu = Math.abs(dx) > Math.abs(dz) ? [Math.sign(dx) * 2, 0] : [0, Math.sign(dz) * 2];
      put(x + pu[0], y + 1, z + pu[1], B.AIRE); put(x + pu[0], y + 2, z + pu[1], B.AIRE);
      put(x - pu[0] / 2, y + 1, z - pu[1] / 2, B.COFRE); put(x + (pu[1] ? 1 : 0), y + 1, z + (pu[0] ? 1 : 0), B.ANTORCHA);
      put(x + pu[0] * 1.5, y + 1, z + pu[1] * 1.5, B.ANTORCHA);
      // huerta al lado de algunas casas
      if (R(p, k, 9) < .5) { const hx = x - pu[0] * 2.5, hz = z - pu[1] * 2.5; for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { const yy = suelo(hx + i, hz + j); if (Math.abs(yy - y) <= 1 && B.TRIGO) { put(hx + i, yy, hz + j, B.TIERRA); put(hx + i, yy + 1, hz + j, B.TRIGO + 2); } } }
      // camino de la casa al pozo
      camino(x + pu[0] * 1.5, z + pu[1] * 1.5, c.x, c.z, 1);
      casas.push({ x, y, z });
    }
    if (casas.length) { const P = { k: 'pradera', x: c.x, z: c.z, casas }; G8.pueblos.push(P); try { PUEBLOS.push(P); } catch (e) {} G8.lugares.push({ k: 'pueblo', x: c.x, z: c.z }); }
  }
  // ── caminos de tierra entre los pueblos (y hasta donde aparece el jugador) ──
  function camino(x0, z0, x1, z1, ancho) {
    const n = Math.ceil(Math.hypot(x1 - x0, z1 - z0)); let px = -1, pz = -1;
    // si el camino cruzaría mucho mar, no se hace (un puente corto sobre un río sí)
    { let w = 0; for (let s = 0; s <= n; s += 2) if (suelo(Math.round(x0 + (x1 - x0) * s / Math.max(1, n)), Math.round(z0 + (z1 - z0) * s / Math.max(1, n))) <= SEA) w++; if (w * 2 > 14 && w * 2 / Math.max(1, n) > .12) return; }
    for (let s = 0; s <= n; s++) { const t = s / Math.max(1, n), cur = Math.sin(t * 3.14) * (R(Math.round(x0), Math.round(z1), 31) - .5) * n * .25;
      const nx = -(z1 - z0) / Math.max(1, n), nz = (x1 - x0) / Math.max(1, n);
      const x = Math.round(x0 + (x1 - x0) * t + nx * cur), z = Math.round(z0 + (z1 - z0) * t + nz * cur); if (x === px && z === pz) continue; px = x; pz = z;
      for (let i = -ancho + 1; i < ancho; i++) for (let j = -ancho + 1; j < ancho; j++) { if (Math.abs(i) + Math.abs(j) >= ancho) continue; const xx = x + i, zz = z + j;
        const y = suelo(xx, zz);
        if (y > SEA) { const t0 = at(xx, y, zz); if (t0 === B.PASTO || t0 === B.TIERRA || t0 === B.ARENA || t0 === B.NIEVE) { put(xx, y, zz, B.CAMINO_T || B.GRAVA); const a = at(xx, y + 1, zz); if (a && NOS.has(a) && !/Tronco/.test((DEF[a] || {}).nombre || '')) put(xx, y + 1, zz, B.AIRE); } }
        else if (y === -1) { // puente sobre el agua
          if (at(xx, SEA, zz) === B.AGUA && at(xx, SEA + 1, zz) === B.AIRE) put(xx, SEA + 1, zz, B.MADERA); } } } }
  const nodos = G8.pueblos.map(P => ({ x: P.x, z: P.z }));
  for (let i = 0; i < nodos.length; i++) { let mj = -1, md = 1e9; for (let j = 0; j < nodos.length; j++) { if (j === i) continue; const d = Math.hypot(nodos[i].x - nodos[j].x, nodos[i].z - nodos[j].z); if (d < md) { md = d; mj = j; } }
    if (mj > i || (mj >= 0 && md < 200)) camino(nodos[i].x, nodos[i].z, nodos[mj].x, nodos[mj].z, 2); }
  if (nodos.length) { let mj = 0, md = 1e9; nodos.forEach((n, j) => { const d = Math.hypot(n.x - spawn.x, n.z - spawn.z); if (d < md) { md = d; mj = j; } }); if (md < 220) camino(spawn.x + 4, spawn.z + 4, nodos[mj].x, nodos[mj].z, 2); }

  // ── torres de vigía (cofre arriba) ──
  const nTorres = Math.max(2, Math.round(1.4 * F));
  for (let t = 0; t < nTorres; t++) { const c = buscar(300 + t, 4, 3, 20, 300); if (!c) continue; const { x, y, z } = c; aplanar(x, y, z, 3);
    for (let h = 0; h <= 12; h++) for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) { const borde = Math.abs(i) === 2 || Math.abs(j) === 2, esq = Math.abs(i) === 2 && Math.abs(j) === 2;
      put(x + i, y + h, z + j, h === 0 ? B.ADOQUIN : esq ? B.TRONCO : borde ? ((h % 4 === 2 && !(i && j)) ? B.AIRE : (h > 2 && (h + i + j) % 5 === 0 ? (B.ADOQ_MUSGO || B.ADOQUIN) : B.ADOQUIN)) : (h % 4 === 0 ? B.MADERA : B.AIRE)); }
    // escalera: un hueco en cada piso, en esquina distinta
    for (let h = 4; h <= 12; h += 4) { const q = [[-1, -1], [1, -1], [1, 1]][(h / 4 - 1) % 3]; put(x + q[0], y + h, z + q[1], B.AIRE); for (let s = 1; s <= 3; s++) put(x - q[0], y + h - s, z - q[1] + (s - 2), B.MADERA); }
    for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) { put(x + i, y + 13, z + j, B.MADERA); if (Math.abs(i) === 3 || Math.abs(j) === 3) put(x + i, y + 14, z + j, B.VALLA || B.MADERA); }
    put(x, y + 1, z - 2, B.AIRE); put(x, y + 2, z - 2, B.AIRE);
    put(x + 2, y + 14, z + 2, B.ANTORCHA); put(x - 2, y + 14, z - 2, B.ANTORCHA); cofre(x, y + 14, z, 'fortaleza');
    G8.lugares.push({ k: 'torre', x, z }); }
  // ── pozos de los deseos (con cofre al lado) ──
  const nPozos = Math.max(2, Math.round(1.5 * F));
  for (let w = 0; w < nPozos; w++) { const c = buscar(500 + w, 3, 2, 14, 300); if (!c) continue; const { x, y, z } = c; aplanar(x, y, z, 2);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { for (let h = y - 4; h <= y; h++) put(x + i, h, z + j, (i || j) ? (B.LADR_PIEDRA || B.ADOQUIN) : B.AGUA); if (i || j) put(x + i, y + 1, z + j, B.LADR_PIEDRA || B.ADOQUIN); }
    for (const [i, j] of [[-1, -1], [1, 1]]) for (let h = 2; h <= 3; h++) put(x + i, y + h, z + j, B.VALLA || B.MADERA);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) put(x + i, y + 4, z + j, B.LADRILLO);
    cofre(x + 2, y + 1, z, 'desierto'); put(x - 2, y + 1, z, B.FAROL || B.ANTORCHA); G8.lugares.push({ k: 'pozo', x, z }); }
  // ── campamentos (fogata, troncos para sentarse, cofre) ──
  const nCamp = Math.max(2, Math.round(1.5 * F));
  for (let q = 0; q < nCamp; q++) { const c = buscar(700 + q, 4, 2, 14, 300); if (!c) continue; const { x, y, z } = c; aplanar(x, y, z, 3);
    put(x, y, z, B.ADOQUIN); put(x, y + 1, z, B.FUEGO || B.ANTORCHA);
    for (const [i, j] of [[-2, 0], [2, 0], [0, -2]]) put(x + i, y + 1, z + j, B.TRONCO);
    // carpa
    for (let s = 0; s < 3; s++) for (let i = -1 + s; i <= 1 - s; i++) for (let j = 3; j <= 5; j++) put(x + i + 3, y + 1 + s, z + j - 1, (j === 3 && s === 0 && i === 0) ? B.AIRE : (B.LANA_R || B.LADRILLO));
    cofre(x + 3, y + 1, z + 4, 'selva'); put(x - 3, y + 1, z + 2, B.HENO || B.MADERA); G8.lugares.push({ k: 'campamento', x, z }); }
  // ── ruinas viejas (paredes rotas con musgo y un cofre medio enterrado) ──
  const nRuinas = Math.max(2, Math.round(1.5 * F));
  for (let q = 0; q < nRuinas; q++) { const c = buscar(900 + q, 5, 3, 14, 300); if (!c) continue; const { x, y, z } = c;
    for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) { if (Math.abs(i) !== 4 && Math.abs(j) !== 4) continue; const alto = Math.floor(R(x + i, z + j, q) * 4); for (let h = 1; h <= alto; h++) put(x + i, suelo(x + i, z + j) + 1, z + j, R(i, j, h + q) < .4 ? (B.LADR_MUSGO || B.ADOQUIN) : (B.LADR_PIEDRA || B.ADOQUIN)); }
    for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) if (R(i, j, q + 50) < .5) { const yy = suelo(x + i, z + j); if (yy > SEA) put(x + i, yy, z + j, B.ADOQ_MUSGO || B.ADOQUIN); }
    cofre(x, suelo(x, z), z, 'desierto'); G8.lugares.push({ k: 'ruinas', x, z }); }
  // ── flores en las llanuras ──
  const FLORES = [B.FLOR_R, B.FLOR_A, B.TULIPAN_R, B.TULIPAN_N, B.TULIPAN_P, B.TULIPAN_B].filter(Boolean);
  for (let x = 2; x < SX - 2; x++) for (let z = 2; z < SZ - 2; z++) { if (vn2(x / 85 + 11, z / 85 + 7, S + 900) < .55) continue; const r = R(x, z, 77); if (r > .035) continue;
    const y = suelo(x, z); if (y <= SEA || at(x, y, z) !== B.PASTO || at(x, y + 1, z) !== B.AIRE) continue; put(x, y + 1, z, FLORES[Math.floor(R(x, z, 78) * FLORES.length)]); }
  // ── cascadas: agua que cae desde la orilla de algunas montañas ──
  let nCasc = 0; const maxCasc = Math.round(3 * F);
  for (let n = 0; n < 4000 && nCasc < maxCasc; n++) { const x = 3 + Math.floor(R(n, 1, 61) * (SX - 6)), z = 3 + Math.floor(R(n, 2, 61) * (SZ - 6)); const y = suelo(x, z); if (y < SEA + 12) continue;
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const y2 = suelo(x + dx * 2, z + dz * 2); if (y2 > 0 && y - y2 >= 6) {
        // el agua no corre sola: se arma la caída entera (arroyito arriba, chorro y una laguna abajo)
        const fx = x + dx, fz = z + dz; let yb = suelo(fx, fz); if (yb <= 0) break;
        for (let k = 0; k <= 2; k++) put(x - dx * k, y, z - dz * k, B.AGUA);
        for (let yy = y; yy > yb; yy--) put(fx, yy, fz, B.AGUA);
        const px = fx + dx, pz = fz + dz;
        for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { const g = suelo(px + i, pz + j); if (g > 0 && Math.abs(g - yb) <= 2) { put(px + i, g, pz + j, B.AGUA); put(px + i, g - 1, pz + j, B.PIEDRA); for (let h = g + 1; h < g + 5; h++) if (NOS.has(at(px + i, h, pz + j))) put(px + i, h, pz + j, B.AIRE); } }
        put(fx, yb, fz, B.AGUA);
        nCasc++; G8.lugares.push({ k: 'cascada', x: fx, z: fz }); break; } } }
  G8.ms = Math.round(performance.now() - T0);
}
window.__g8 = { G8: () => G8 };
// cofres con premio (mismo botín que las estructuras: fortaleza, desierto, selva)
try { const E = window.__est && __est.EST; if (E) { const p0 = prepararMundo; prepararMundo = function (S, ej) { const r = p0.apply(this, arguments);
      if (g8() && !ej) { try { generarG8(S); for (const [i, t] of G8.cofres) E.cofres.set(i, t); } catch (e) { console.error('g8', e); } }
      return r; }; } else { const p0 = prepararMundo; prepararMundo = function (S, ej) { const r = p0.apply(this, arguments); if (g8() && !ej) { try { generarG8(S); } catch (e) { console.error('g8', e); } } return r; }; } } catch (e) { console.error(e); }
// animales en las llanuras (solo la primera vez que se entra al mundo)
{ const t0 = terminarCarga; terminarCarga = function (guardados) { const r = t0.apply(this, arguments);
    if (!guardados && g8()) { const at = (x, y, z) => dentro(x, y, z) ? mundo[idx(x, y, z)] : 0; const S = semilla; let n = 0;
      const tipos = ['vaca', 'oveja', 'caballo', 'cerdo', 'gallina', 'conejo'].filter(t => TIPOS[t]);
      for (let k = 0; k < 4000 && n < Math.round(14 * SX / 160); k++) { const x = 4 + Math.floor(h3(k, 1, 3, S + 8900) * (SX - 8)), z = 4 + Math.floor(h3(k, 2, 3, S + 8900) * (SZ - 8));
        if (vn2(x / 85 + 11, z / 85 + 7, S + 900) < .5) continue; let y = SY - 2; while (y > SEA && !at(x, y, z)) y--; if (at(x, y, z) !== B.PASTO) continue;
        const t = tipos[Math.floor(h3(k, 3, 3, S + 8900) * tipos.length)]; for (let c = 0; c < 3; c++) { try { crearAnimal(t, x + .5 + c, y + 1.1, z + .5); } catch (e) {} } n++; } }
    return r; }; }
