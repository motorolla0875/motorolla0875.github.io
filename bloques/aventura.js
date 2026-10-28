'use strict';
// ═════════ AVENTURA EN LOS MUNDOS DE VIAJE (supervivencia) ═════════
// · Portales que se fabrican y llaves para abrir cada mundo (con materiales del mundo anterior).
// · Cada mundo con su clima, su noche, sus monstruos y un jefe en su guarida.
// En creativo todo sigue igual: portales libres, sin monstruos y sin clima.
// IDs fijos: objetos 2100–2119, bloques 1340–1349. Todos los diseños son propios.

{
const esViaje = () => (window.mundoTipo || '').startsWith('v_');
const mundoV = () => (window.mundoTipo || '').slice(2);
const invitado = () => !!(window.__mp && __mp.MP && __mp.MP.invitado);
const Mc = c => matA(parseInt(c.slice(1), 16)), Mb = c => new THREE.MeshBasicMaterial({ color: parseInt(c.slice(1), 16) });
const Mt = (c, o = .75) => new THREE.MeshLambertMaterial({ color: parseInt(c.slice(1), 16), transparent: true, opacity: o });
const az = (a, b) => a + Math.random() * (b - a);

// ═════════ TEXTOS ═════════
const TXT = {
  es: { pvc_ventisca: '¡TORMENTA DE NIEVE!<small>busca un techo o una antorcha</small>', pvc_tormenta: '¡TORMENTA ELÉCTRICA!', pvc_viento: '¡VIENTO FUERTE!<small>cuidado con los bordes</small>', pvc_caramelos: '¡LLUEVEN CARAMELOS!<small>júntalos: son comida</small>', pvc_chocolate: 'LLUVIA DE CHOCOLATE', pvc_meteoritos: '¡LLUVIA DE METEORITOS!<small>dejan minerales al caer</small>', pvc_fin: 'EL CIELO SE CALMA', pvFrio: '¡TIENES FRÍO!<small>busca un techo o una antorcha</small>',
    pvNuevoSup: 'NUEVO: PORTALES DE VIAJE<small>fabrica un portal y consigue llaves para viajar a otros mundos</small>',
    pvg_nieve: 'GUARIDA DEL YETI REY<small>entra si te animas</small>', pvg_submarino: 'GUARIDA DEL PULPO GIGANTE<small>entra si te animas</small>', pvg_flotantes: 'NIDO DEL HALCÓN DE TORMENTA<small>entra si te animas</small>', pvg_dulces: 'TRONO DEL REY GOMITA<small>entra si te animas</small>', pvg_luna: 'BASE DEL ROBOT GUARDIÁN<small>entra si te animas</small>' },
  en: { pvc_ventisca: 'SNOWSTORM!<small>find a roof or a torch</small>', pvc_tormenta: 'THUNDERSTORM!', pvc_viento: 'STRONG WIND!<small>careful near the edges</small>', pvc_caramelos: 'IT\'S RAINING CANDY!<small>pick it up: it\'s food</small>', pvc_chocolate: 'CHOCOLATE RAIN', pvc_meteoritos: 'METEOR SHOWER!<small>they leave ores when they land</small>', pvc_fin: 'THE SKY CALMS DOWN', pvFrio: 'YOU ARE FREEZING!<small>find a roof or a torch</small>',
    pvNuevoSup: 'NEW: TRAVEL PORTALS<small>craft a portal and get keys to travel to other worlds</small>',
    pvg_nieve: 'LAIR OF THE YETI KING<small>step in if you dare</small>', pvg_submarino: 'LAIR OF THE GIANT OCTOPUS<small>step in if you dare</small>', pvg_flotantes: 'NEST OF THE STORM HAWK<small>step in if you dare</small>', pvg_dulces: 'THRONE OF THE GUMMY KING<small>step in if you dare</small>', pvg_luna: 'BASE OF THE GUARDIAN ROBOT<small>step in if you dare</small>' },
  pt: { pvc_ventisca: 'TEMPESTADE DE NEVE!<small>procure um teto ou uma tocha</small>', pvc_tormenta: 'TEMPESTADE ELÉTRICA!', pvc_viento: 'VENTO FORTE!<small>cuidado com as bordas</small>', pvc_caramelos: 'ESTÁ CHOVENDO BALAS!<small>pegue: é comida</small>', pvc_chocolate: 'CHUVA DE CHOCOLATE', pvc_meteoritos: 'CHUVA DE METEOROS!<small>deixam minérios ao cair</small>', pvc_fin: 'O CÉU SE ACALMA', pvFrio: 'VOCÊ ESTÁ COM FRIO!<small>procure um teto ou uma tocha</small>',
    pvNuevoSup: 'NOVO: PORTAIS DE VIAGEM<small>fabrique um portal e consiga chaves para viajar a outros mundos</small>',
    pvg_nieve: 'COVIL DO REI YETI<small>entre se tiver coragem</small>', pvg_submarino: 'COVIL DO POLVO GIGANTE<small>entre se tiver coragem</small>', pvg_flotantes: 'NINHO DO FALCÃO DA TEMPESTADE<small>entre se tiver coragem</small>', pvg_dulces: 'TRONO DO REI GOMA<small>entre se tiver coragem</small>', pvg_luna: 'BASE DO ROBÔ GUARDIÃO<small>entre se tiver coragem</small>' } };
for (const l in TXT) Object.assign(TX[l], TXT[l]);

// ═════════ OBJETOS Y BLOQUES NUEVOS ═════════
const LIBRES = []; for (let t = 205; t < 256; t++) if (TILES[t] == null) LIBRES.push(t); for (let t = 397; t < 448; t++) if (TILES[t] == null) LIBRES.push(t);
function tileA(nombre, f, bisel = false) { const n = LIBRES.shift(); if (n == null) return TL.piedra; TILES[n] = nombre; TL[nombre] = n; dibujarTile(n, f); if (bisel) biselar(n); return n; }
const NA = {}; const nomA = (es, en, pt) => { NA[es] = { en, pt }; return es; };
function objA(id, clave, es, en, pt, tile, o = {}) { I[clave] = id; nomA(es, en, pt); item(id, es, tile, o); TODOS.push(id); return id; }
function bloqA(id, clave, es, en, pt, tiles, o = {}) { B[clave] = id; nomA(es, en, pt); def(id, es, tiles, o); TODOS.push(id); return id; }
const llaveT = (c, c2) => (x, y) => { const d = Math.hypot(x - 4.5, y - 4.5); if (d < 3.6 && d > 1.4) return d < 2.4 ? c2 : c; if (y >= 4 && y <= 5 && x > 6 && x < 15) return c; if (x >= 11 && x <= 12 && y > 5 && y < 9) return c; if (x >= 13 && x <= 14 && y > 5 && y < 8) return c; return null; };
objA(2100, 'SEMILLA_DORADA', 'Semilla dorada', 'Golden seed', 'Semente dourada', tileA('semillaDorada', (x, y) => { const d = Math.hypot((x - 7.5) * 1.3, y - 8); return d < 5 ? (x + y < 14 ? '#fff6a0' : d < 3 ? '#ffd23a' : '#d8a010') : (x === 8 && y < 4 && y > 0 ? '#5aa83a' : null); }));
objA(2101, 'PERLA', 'Perla', 'Pearl', 'Pérola', tileA('perla', (x, y) => { const d = Math.hypot(x - 7.5, y - 7.5); return d < 5 ? (Math.hypot(x - 6, y - 6) < 1.6 ? '#ffffff' : d < 3.5 ? '#e8f4ff' : '#b8d0e8') : null; }));
objA(2102, 'ESCARCHA', 'Fragmento de escarcha', 'Frost shard', 'Fragmento de geada', tileA('escarcha', (x, y) => { const d = Math.abs(x - 7.5) + Math.abs(y - 7.5) * .6; return d < 5 ? (x < 8 ? '#e8faff' : '#7ad0f8') : null; }));
objA(2103, 'CARAMELO_RARO', 'Caramelo raro', 'Rare candy', 'Bala rara', tileA('carameloRaro', (x, y) => { const d = Math.hypot(x - 7.5, y - 7.5); if (d < 3.6) return Math.floor(Math.atan2(y - 7.5, x - 7.5) * 1.3 + d) % 2 ? '#ff4a9a' : '#ffffff'; if (y >= 6 && y <= 9 && (x < 4 || x > 11) && Math.abs(y - 7.5) < (x < 4 ? 4 - x : x - 11) * .9 + .6) return '#ffd23a'; return null; }));
objA(2104, 'NUCLEO_FUEGO', 'Núcleo de fuego', 'Fire core', 'Núcleo de fogo', tileA('nucleoFuego', (x, y) => { const d = Math.hypot(x - 7.5, y - 7.5); return d < 5.5 ? (d < 2 ? '#fff6a0' : d < 3.6 ? '#ffb02e' : '#e0401a') : null; }));
objA(2105, 'LLAVE_NUBES', 'Llave de las nubes', 'Cloud key', 'Chave das nuvens', tileA('llaveNubes', llaveT('#e8f6ff', '#58c0e8')));
objA(2106, 'LLAVE_MAR', 'Llave del mar', 'Sea key', 'Chave do mar', tileA('llaveMar', llaveT('#3a9af0', '#e8f4ff')));
objA(2107, 'LLAVE_HIELO', 'Llave de hielo', 'Ice key', 'Chave de gelo', tileA('llaveHielo', llaveT('#9ae4ff', '#ffffff')));
objA(2108, 'LLAVE_DULCE', 'Llave de caramelo', 'Candy key', 'Chave de bala', tileA('llaveDulce', llaveT('#ff70b0', '#ffffff')));
objA(2109, 'LLAVE_LUNA', 'Llave lunar', 'Moon key', 'Chave lunar', tileA('llaveLuna', llaveT('#c8c8d4', '#ffd23a')));
objA(2110, 'DULCE', 'Caramelo', 'Candy', 'Bala', tileA('dulce', (x, y) => { if (Math.abs(x - 7.5) < 3.5 && Math.abs(y - 7.5) < 3) return (x + y) % 4 < 2 ? '#ff5a8a' : '#ffd0e0'; if (Math.abs(y - 7.5) < (x < 4 ? 4 - x : x - 11) * .8 && (x < 4 || x > 11)) return '#ff9ac0'; return null; }), { comida: 3 });
bloqA(1340, 'MIN_FUEGO', 'Mineral de fuego', 'Fire ore', 'Minério de fogo', [tileA('minFuego', (x, y, r, e) => [[3, 4], [10, 3], [6, 9], [12, 11], [3, 12]].some(([a, b]) => Math.abs(x - a) + Math.abs(y - b) < 2) ? e(['#ffb02e', '#ff6a1a', '#fff09a']) : sombra('#3a3438', (r() - .5) * .14), true)], { dur: 4, req: 2, luz: 7, suelta: I.NUCLEO_FUEGO, color: '#e0601a', cat: 'catNaturaleza' });
bloqA(1341, 'METEORITO', 'Meteorito', 'Meteorite', 'Meteorito', [tileA('meteorito', (x, y, r, e) => r() < .18 ? e(['#c8d0e0', '#9ae4ff', '#e8b060']) : sombra('#3a3644', (r() - .5) * .2), true)], { dur: 4, req: 1, luz: 4, suelta: I.HIERRO, color: '#3a3644', cat: 'catNaturaleza' });
const trofeoT = (c, c2) => (x, y) => { if (y >= 2 && y <= 7 && Math.abs(x - 7.5) < 4.5 - (y - 2) * .3) return x < 7 ? c2 : c; if ((x === 2 || x === 13) && y >= 3 && y <= 5) return c; if (y > 7 && y < 11 && x >= 7 && x <= 8) return c; if (y >= 11 && y <= 13 && x >= 4 && x <= 11) return y === 13 ? '#5a3a1e' : c2; return null; };
const PLA = { dur: .5, trans: true, solido: false, planta: true, luz: 8, cat: 'catDeco' };
const TROFEOS = [['HIELO', 'Trofeo del Yeti Rey', 'Yeti King trophy', 'Troféu do Rei Yeti', '#9ae4ff', '#e8faff'], ['MAR', 'Trofeo del Pulpo Gigante', 'Giant Octopus trophy', 'Troféu do Polvo Gigante', '#3a9af0', '#9ad0ff'], ['NUBES', 'Trofeo del Halcón de Tormenta', 'Storm Hawk trophy', 'Troféu do Falcão da Tempestade', '#ffd23a', '#fff6a0'],
  ['DULCE', 'Trofeo del Rey Gomita', 'Gummy King trophy', 'Troféu do Rei Goma', '#ff70b0', '#ffd0e4'], ['LUNA', 'Trofeo del Robot Guardián', 'Guardian Robot trophy', 'Troféu do Robô Guardião', '#c8c8d4', '#ffffff']];
TROFEOS.forEach(([k, es, en, pt, c, c2], n) => bloqA(1342 + n, 'TROFEO_' + k, es, en, pt, [tileA('trofeo' + k, trofeoT(c, c2))], Object.assign({ color: c }, PLA)));
try { atlasTex.needsUpdate = true; } catch (e) {}
for (const es in NA) for (const l of ['en', 'pt']) { NOMBRES[l] = NOMBRES[l] || {}; NOMBRES[l][es] = NA[es][l]; }
// lo que suelta cada bloque y las recetas
DEF[B.PORTAL_V].suelta = B.PORTAL_V; DEF[B.PERLA_LUZ].suelta = I.PERLA;
RECETAS.push(
  [[B.PORTAL_V, 1], [[B.OBSIDIANA, 2], [I.CRISTAL, 1], [I.ORO, 2]]],
  [[B.PORTAL_V, 1], [[B.ROCA_VOLC, 4], [I.CRISTAL, 1], [I.ORO, 2]]],
  [[I.LLAVE_NUBES, 1], [[I.SEMILLA_DORADA, 1], [B.TELA, 2], [I.ORO, 2]]],
  [[I.LLAVE_MAR, 1], [[I.PERLA, 3], [I.ORO, 1]]],
  [[I.LLAVE_HIELO, 1], [[I.ESCARCHA, 3], [I.CRISTAL, 1]]],
  [[I.LLAVE_DULCE, 1], [[I.CARAMELO_RARO, 2], [I.ORO, 1]]],
  [[I.LLAVE_LUNA, 1], [[I.NUCLEO_FUEGO, 2], [I.HIERRO, 4], [I.CRISTAL, 2]]],
  [[B.PERLA_LUZ, 1], [[I.PERLA, 3]]]);

// ═════════ LLAVES: qué mundo abre cada una ═════════
const LLAVE = { flotantes: I.LLAVE_NUBES, submarino: I.LLAVE_MAR, nieve: I.LLAVE_HIELO, dulces: I.LLAVE_DULCE, luna: I.LLAVE_LUNA };
const raizMeta = () => { const l = leerLista(), m = l.find(x => x.id === mundoId); return { l, r: m && m.padre ? l.find(x => x.id === m.padre) : m }; };
window.__aventura = {
  llave: k => LLAVE[k] || null,
  abierto(k) { if (k === 'casa') return true; const { r } = raizMeta(); if (!r) return true; if (k === 'abismo') return !!r.abismo; if (k === 'confin') return !!r.confin; return (r.pvAbiertos || []).includes(k); },
  abrir(k) { const { l, r } = raizMeta(); if (!r) return; r.pvAbiertos = (r.pvAbiertos || []).concat([k]); localStorage.setItem('bloquesMundos', JSON.stringify(l)); },
  receta(k) { const rc = RECETAS.find(x => x[0][0] === LLAVE[k]); return rc ? rc[1].map(([id, n]) => n + ' ' + nom(id)).join(', ') : ''; } };

// ═════════ COFRES ═════════
{ const l0 = lootCofre; lootCofre = function (i) {
    const r = k => h3(i, k, 7, semilla + 5300);
    if (esViaje()) { const c = {}, k = mundoV();
      if (k === 'flotantes') { c[I.ESCARCHA] = 2 + Math.floor(r(1) * 2); c[I.ORO] = 1 + Math.floor(r(2) * 3); c[I.PAN] = 2; if (r(3) < .3) c[I.ALAS] = 1; }
      else if (k === 'submarino') { c[I.PERLA] = 2 + Math.floor(r(1) * 3); c[I.ORO] = 1 + Math.floor(r(2) * 3); c[I.PESCADO_A || I.PESCADO] = 3; }
      else if (k === 'nieve') { if (r(1) < .55) c[I.CARAMELO_RARO] = 1; c[I.ESCARCHA] = 1 + Math.floor(r(2) * 2); c[B.HIELO_AZUL] = 4 + Math.floor(r(3) * 8); c[I.CARNE_A] = 3; }
      else if (k === 'dulces') { c[I.DULCE] = 3 + Math.floor(r(1) * 5); if (r(2) < .5) c[I.CARAMELO_RARO] = 1; c[B.ALGODON] = 4; }
      else if (k === 'luna') { c[I.HIERRO] = 3 + Math.floor(r(1) * 4); c[I.CRISTAL] = 1 + Math.floor(r(2) * 2); if (r(3) < .5) c[I.NUCLEO_FUEGO] = 1; c[B.ROCA_LUNAR] = 6; }
      return c; }
    const c = l0.apply(this, arguments);
    if (c && typeof c === 'object' && !window.mundoTipo) { if (r(11) < .35) c[I.SEMILLA_DORADA] = 1; if (r(12) < .25) c[I.PERLA] = 1 + Math.floor(r(13) * 2); }
    return c; }; }

// ═════════ GENERACIÓN EXTRA: guaridas, cofres, mineral de fuego ═════════
let GUAR = null;
{ const p0 = prepararMundo; prepararMundo = function (S, ej) { GUAR = null; const r = p0.apply(this, arguments);
    try { const t = window.mundoTipo || '';
      if (t.startsWith('v_')) extraViaje(t.slice(2), S);
      else if (t === 'abismo') fuegoAbismo(S);
      else if (!t && (window.genVersion || 1) >= 5 && !ej) fuegoVolcan(S);
    } catch (e) { console.error(e); }
    return r; }; }
const putA = (x, y, z, t) => { if (dentro(x, y, z)) mundo[idx(x, y, z)] = t; }, atA = (x, y, z) => dentro(x, y, z) ? mundo[idx(x, y, z)] : 0;
const supA = (x, z) => { for (let y = SY - 1; y > 0; y--) { const t = atA(x, y, z); if (t && t !== B.AGUA && !(DEF[t] && DEF[t].planta)) return y; } return 0; };
function fuegoVolcan(S) {
  const V = window.__biomas && __biomas.zonas().find(z => z.k === 'volcan'); if (!V) return;
  for (let k = 0, n = 0; k < 400 && n < 22; k++) { const a = h3(k, 1, 5, S + 5400) * 6.283, d = 2.5 + h3(k, 2, 5, S + 5400) * V.r * .55, x = Math.round(V.x + Math.cos(a) * d), z = Math.round(V.z + Math.sin(a) * d), y = supA(x, z);
    const t = atA(x, y, z); if (t === B.ROCA_VOLC || t === B.BASALTO || t === B.CENIZA || t === B.OBSIDIANA) { putA(x, y, z, B.MIN_FUEGO); n++; } }
}
function fuegoAbismo(S) {
  for (let k = 0, n = 0; k < 6000 && n < 45; k++) { const x = 3 + Math.floor(h3(k, 1, 6, S + 5500) * (SX - 6)), z = 3 + Math.floor(h3(k, 2, 6, S + 5500) * (SZ - 6)), y = 2 + Math.floor(h3(k, 3, 6, S + 5500) * 20);
    if (atA(x, y, z) === B.PIEDRA_ABISMO && (!atA(x, y + 1, z) || !atA(x + 1, y, z) || !atA(x, y, z + 1))) { putA(x, y, z, B.MIN_FUEGO); n++; } }
}
function cofresEn(k, S, n, ok) {
  for (let g = 0, p = 0; g < 900 && p < n; g++) { const x = 6 + Math.floor(h3(g, 1, 8, S + 5600) * (SX - 12)), z = 6 + Math.floor(h3(g, 2, 8, S + 5600) * (SZ - 12)), y = supA(x, z);
    if (y < 2 || atA(x, y + 1, z) || atA(x, y + 2, z) || Math.hypot(x - SX / 2, z - SZ / 2) < 12 || (ok && !ok(atA(x, y, z), y))) continue;
    putA(x, y + 1, z, B.COFRE); p++; }
}
function extraViaje(k, S) {
  const cx = Math.floor(SX / 2), cz = Math.floor(SZ / 2);
  // guarida: al norte de la llegada
  const gx = cx + Math.round((h3(1, 2, 3, S + 5700) - .5) * 30), gz = Math.max(18, cz - 50), r = 12;
  if (k === 'nieve') { let y = 0; for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) y = Math.max(y, supA(gx + a, gz + b)); y = Math.min(SY - 12, Math.max(SEA + 1, Math.round((y + SEA + 3) / 2)));
    arena(gx, y, gz, r, (x, z) => (Math.floor(x / 2) + Math.floor(z / 2)) % 2 ? B.LADR_HIELO : B.HIELO_C, B.HIELO_AZUL, B.CRISTAL_HIELO, 6); GUAR = { k, x: gx + .5, y: y + 1, z: gz + .5, r }; }
  if (k === 'dulces') { const y = Math.min(SY - 12, supA(gx, gz)); arena(gx, y, gz, r, (x, z) => (x + z) % 2 ? B.CHOCOLATE : B.GALLETA, B.CARAMELO_R, B.ALGODON, 7); GUAR = { k, x: gx + .5, y: y + 1, z: gz + .5, r }; }
  if (k === 'luna') { const y = Math.min(SY - 12, supA(gx, gz)); arena(gx, y, gz, r, (x, z) => (x % 4 === 0 || z % 4 === 0) ? (B['HORMIGÓN_2'] || B.PIEDRA) : (B['HORMIGÓN_1'] || B.PIEDRA), B['HORMIGÓN_0'] || B.PIEDRA, B.LINTERNA, 5);
    for (let a = 0; a < 40; a++) { const ang = a / 40 * 6.283; if (a % 5 === 0) continue; for (let h = 1; h <= 3; h++) if (h3(a, h, 9, S) < .7) putA(Math.round(gx + Math.cos(ang) * (r - 1)), y + h, Math.round(gz + Math.sin(ang) * (r - 1)), B.VIDRIO); }
    GUAR = { k, x: gx + .5, y: y + 1, z: gz + .5, r }; }
  if (k === 'flotantes') { const y = 32; for (let a = -r - 3; a <= r + 3; a++) for (let b = -r - 3; b <= r + 3; b++) for (let h = y - 9; h <= y + 10; h++) putA(gx + a, h, gz + b, B.AIRE);
    for (let a = -r - 1; a <= r + 1; a++) for (let b = -r - 1; b <= r + 1; b++) { const d = Math.hypot(a, b); if (d > r + 1) continue; const hondo = Math.round((r + 1 - d) * .7) + 1; for (let h = y - hondo; h <= y; h++) putA(gx + a, h, gz + b, h === y ? ((a + b) % 2 ? B.PIEDRA_P : B.LADR_PIEDRA) : B.PIEDRA); }
    for (let n = 0; n < 8; n++) { const ang = n / 8 * 6.283; const x = Math.round(gx + Math.cos(ang) * (r - 1)), z = Math.round(gz + Math.sin(ang) * (r - 1)); for (let h = 1; h <= 5; h++) putA(x, y + h, z, B.LADR_PIEDRA); putA(x, y + 6, z, B.LINTERNA); }
    GUAR = { k, x: gx + .5, y: y + 1, z: gz + .5, r }; }
  if (k === 'submarino') { const ir = 7; for (let a = -ir; a <= ir; a++) for (let b = -ir; b <= ir; b++) { const d = Math.hypot(a, b); if (d > ir) continue; let y0 = SEA; while (y0 > 1 && atA(gx + a, y0, gz + b) === B.AGUA) y0--; for (let h = y0; h <= SEA + 1; h++) putA(gx + a, h, gz + b, h === SEA + 1 ? (d > ir - 1.5 ? B.ARENA : B.PIEDRA_P) : B.ARENA); for (let h = SEA + 2; h < SEA + 8; h++) putA(gx + a, h, gz + b, B.AIRE); }
    for (let n = 0; n < 10; n++) { const ang = n / 10 * 6.283, x = Math.round(gx + Math.cos(ang) * 15), z = Math.round(gz + Math.sin(ang) * 15); let y0 = SEA; while (y0 > 1 && atA(x, y0, z) === B.AGUA) y0--; const c = B.CORAL + n % 3; for (let h = y0; h <= SEA + 2; h++) putA(x, h, z, c); putA(x, SEA + 3, z, B.PERLA_LUZ); }
    GUAR = { k, x: gx + .5, y: SEA + 2, z: gz + .5, r: 16, agua: { x: gx + .5, z: gz - 11 + .5 } }; }
  // cofres con lo que hace falta para la próxima llave
  if (k === 'flotantes') cofresEn(k, S, 8, t => t === B.PASTO);
  if (k === 'nieve') cofresEn(k, S, 5, t => t === B.NIEVE);
  if (k === 'dulces') cofresEn(k, S, 5, t => t === B.CREMA);
  if (k === 'luna') { cofresEn(k, S, 4, t => t === B.POLVO_LUNAR); for (let g = 0; g < 18; g++) { const x = 4 + Math.floor(h3(g, 3, 9, S + 5800) * (SX - 8)), z = 4 + Math.floor(h3(g, 4, 9, S + 5800) * (SZ - 8)), y = supA(x, z); if (y > 2 && Math.hypot(x - cx, z - cz) > 12) putA(x, y, z, B.METEORITO); } }
  if (k === 'submarino') cofresEn(k, S, 3, (t, y) => (t === B.ARENA || t === B.PASTO) && y > SEA);
}
function arena(x0, y, z0, r, piso, pilar, tope, alto) {
  for (let a = -r - 2; a <= r + 2; a++) for (let b = -r - 2; b <= r + 2; b++) { const d = Math.hypot(a, b); if (d > r + 1.5) continue;
    for (let h = y + 1; h < Math.min(SY, y + 14); h++) putA(x0 + a, h, z0 + b, B.AIRE);
    for (let h = y; h > Math.max(0, y - 6); h--) if (h === y || !atA(x0 + a, h, z0 + b)) putA(x0 + a, h, z0 + b, h === y ? piso(x0 + a, z0 + b) : B.PIEDRA); }
  for (let n = 0; n < 8; n++) { const ang = n / 8 * 6.283 + .2, x = Math.round(x0 + Math.cos(ang) * (r - 1)), z = Math.round(z0 + Math.sin(ang) * (r - 1)); for (let h = 1; h <= alto; h++) putA(x, y + h, z, pilar); putA(x, y + alto + 1, z, tope); }
}

// ═════════ PROYECTILES NUEVOS ═════════
Object.assign(FORMA_PROY, {
  hielo: () => { const g = new THREE.Group(); caja(g, .3, .3, .3, 0, 0, 0, Mb('#bfefff')); caja(g, .5, .1, .1, 0, 0, 0, Mb('#ffffff')); return g; },
  chispa: () => { const g = new THREE.Group(); caja(g, .22, .22, .22, 0, 0, 0, Mb('#fff6a0')); caja(g, .1, .6, .1, 0, 0, 0, Mb('#5ad0ff')); return g; },
  laser: () => { const g = new THREE.Group(); caja(g, .14, .14, .14, 0, 0, 0, Mb('#7aff5a')); caja(g, .06, .06, .5, 0, 0, 0, Mb('#c8ffb0')); return g; },
  roca: () => { const g = new THREE.Group(); caja(g, .7, .7, .7, 0, 0, 0, Mc('#e8f2ff')); caja(g, .5, .5, .78, 0, 0, 0, Mc('#c8dcf0')); return g; },
  tinta: () => { const g = new THREE.Group(); caja(g, .45, .45, .45, 0, 0, 0, Mb('#2a1a4a')); caja(g, .2, .2, .2, .15, .15, .15, Mb('#6a4ab0')); return g; } });
Object.assign(PROY, { hielo: { vel: 13, g: 0, dano: 2 }, chispa: { vel: 18, g: 0, dano: 3 }, laser: { vel: 22, g: 0, dano: 2 }, roca: { vel: 14, g: 9, dano: 4 }, tinta: { vel: 12, g: 3, dano: 3 } });

// ═════════ CRIATURAS ═════════
const persigue = (dano, mul = 1.5, lejos = 24) => function (a, dt) { if (!atacan(a)) return deambular(); const h = haciaJ(a); if (h.d > lejos) return deambular(); morder(a, h, dano, 1.1 + a.userData.an, dt); return { dir: h.dir, vel: h.d > 1 ? a.userData.vel * mul : 0 }; };
const tirador = (tipo, cada, cerca, lejos, alcance = 18) => function (a, dt) { if (!atacan(a)) return deambular(); const u = a.userData, h = haciaJ(a); if (h.d > 26) return deambular();
  u.tiro = (u.tiro ?? cada * .6) - dt; if (u.tiro <= 0 && h.d < alcance && ve(a, h)) { u.tiro = cada * az(.8, 1.2); const p = a.position; disparar(tipo, p.x + Math.sin(h.dir) * .5, p.y + u.al * .7, p.z + Math.cos(h.dir) * .5, J.x, J.y + 1.1, J.z); }
  return { dir: h.dir, vel: h.d < cerca ? -u.vel : h.d > lejos ? u.vel * 1.2 : 0 }; };
// moverse por el aire o por el agua (sin gravedad)
function moverLibre(a, tx, ty, tz, vel, dt, medio) {
  const p = a.position, u = a.userData, dx = tx - p.x, dy = ty - p.y, dz = tz - p.z, n = Math.hypot(dx, dy, dz) || 1, v = Math.min(n, vel * dt);
  const nx = p.x + dx / n * v, ny = p.y + dy / n * v, nz = p.z + dz / n * v, b = get(Math.floor(nx), Math.floor(ny + .2), Math.floor(nz));
  const ok = medio === 'agua' ? b === B.AGUA : !solidoMov(b) && !solidoMov(get(Math.floor(nx), Math.floor(ny + u.al * .8), Math.floor(nz)));
  if (ok) p.set(nx, ny, nz); else if (medio !== 'agua') p.y += 3 * dt; else u.dest = null;
  u.vy = 0; if (Math.hypot(dx, dz) > .05) a.rotation.y = Math.atan2(dx, dz); return ok;
}
const vagar = (a, medio, rango = 6) => { const u = a.userData, p = a.position; if (!u.dest || Math.random() < .01) u.dest = { x: p.x + az(-rango, rango), y: p.y + az(-2, 2), z: p.z + az(-rango, rango) }; return u.dest; };
const NOMS = {};
function cria(k, es, en, pt, o) { TIPOS[k] = Object.assign({ hostil: true, ia: true, noNatural: true, viaje: true, peso: .3 }, o); NOMS[k] = [es, en, pt]; }

// ── Reino de hielo ──
cria('loboHielo', 'Lobo de hielo', 'Ice wolf', 'Lobo de gelo', { vida: 10, an: .3, al: .9, vel: 1.4, color: '#dff2ff', voz: 'lobo', dano: 2,
  armar(g) { const m = Mc('#e8f6ff'), m2 = Mc('#9ad0f0'), oj = Mb('#5af0ff'), ne = Mc('#1d2a3a');
    caja(g, .44, .42, .8, 0, .62, 0, m); caja(g, .5, .2, .5, 0, .86, .05, m2); caja(g, .34, .34, .34, 0, .82, .5, m); caja(g, .2, .16, .2, 0, .74, .72, m2); caja(g, .08, .06, .03, 0, .78, .825, ne);
    for (const s of [-1, 1]) { caja(g, .08, .14, .06, s * .11, 1.04, .44, m2); caja(g, .07, .05, .02, s * .1, .88, .675, oj); }
    const c = caja(g, .1, .1, .42, 0, .74, -.55, m2); c.rotation.x = .5;
    return [[.14, .26], [-.14, -.26], [-.14, .26], [.14, -.26]].map(([x, z]) => pata(g, .12, .44, .12, x, .44, z, m)); },
  guiar: persigue(2, 1.9), suelta: () => Math.random() < .2 ? [[I.CARAMELO_RARO, 1]] : [] });
cria('yeti', 'Yeti', 'Yeti', 'Yeti', { vida: 34, an: .55, al: 2.4, vel: 1.0, color: '#f2f6fa', voz: 'oso', dano: 4,
  armar(g) { const m = Mc('#f4f8fc'), m2 = Mc('#d8e4ee'), ca = Mc('#7ab8e0'), ne = Mc('#14202e'), bl = Mc('#ffffff');
    caja(g, 1.0, 1.0, .7, 0, 1.3, 0, m); caja(g, .9, .4, .64, 0, .7, 0, m2); caja(g, .7, .6, .6, 0, 2.1, .05, m); caja(g, .5, .38, .06, 0, 2.06, .36, ca);
    for (const s of [-1, 1]) { caja(g, .1, .08, .03, s * .12, 2.14, .4, ne); caja(g, .06, .1, .03, s * .1, 1.92, .4, bl); caja(g, .3, .9, .3, s * .66, 1.35, .05, m); caja(g, .3, .16, .32, s * .66, .86, .08, ca); }
    caja(g, .26, .06, .03, 0, 1.96, .4, ne);
    return [-1, 1].map(s => pata(g, .34, .7, .38, s * .24, .72, 0, m2)); },
  guiar(a, dt) { const r = persigue(4, 1.3)(a, dt); const u = a.userData, h = haciaJ(a); u.bola = (u.bola ?? 3) - dt;
    if (atacan(a) && u.bola <= 0 && h.d > 5 && h.d < 14 && ve(a, h)) { u.bola = az(3, 5); const p = a.position; disparar('nieve', p.x, p.y + 2.2, p.z, J.x, J.y + 1, J.z); }
    return r; },
  suelta: () => [[I.CARAMELO_RARO, 1], [I.CARNE, 2]] });
cria('espirituEscarcha', 'Espíritu de escarcha', 'Frost spirit', 'Espírito de geada', { vida: 12, an: .3, al: 1.2, vel: 2, color: '#bfefff', voz: 'sombra', dano: 2, vuela: true,
  armar(g) { const m = Mt('#bfefff', .6), m2 = Mt('#ffffff', .8), oj = Mb('#1a6aa0');
    caja(g, .6, .6, .6, 0, .9, 0, m); caja(g, .4, .4, .4, 0, .9, 0, m2); for (const s of [-1, 1]) caja(g, .1, .14, .03, s * .14, .96, .31, oj);
    for (const [x, z] of [[-.2, .1], [.15, -.15], [.05, .2]]) caja(g, .12, .5, .12, x, .35, z, m);
    for (let k = 0; k < 4; k++) { const c = caja(g, .1, .1, .1, Math.cos(k * 1.57) * .55, 1.0, Math.sin(k * 1.57) * .55, m2); c.userData.orb = k; }
    return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) { const u = a.userData, p = a.position; u.t2 = (u.t2 || 0) + dt; a.children.forEach(c => { if (c.userData.orb != null) { const k = c.userData.orb; c.position.set(Math.cos(k * 1.57 + u.t2 * 2) * .55, 1 + Math.sin(u.t2 * 3 + k) * .1, Math.sin(k * 1.57 + u.t2 * 2) * .55); } });
    if (!atacan(a)) { const d = vagar(a, 'aire', 5); moverLibre(a, d.x, Math.max(d.y, sueloCerca(p.x, p.z) + 1.5), d.z, 1.5, dt, 'aire'); return; }
    const h = haciaJ(a); if (h.d > 30) { const d = vagar(a, 'aire'); moverLibre(a, d.x, d.y, d.z, 1.5, dt, 'aire'); return; }
    const ang = u.t2 * .6, tx = J.x - h.dx / h.d * 7 + Math.cos(ang) * 2, tz = J.z - h.dz / h.d * 7 + Math.sin(ang) * 2; moverLibre(a, tx, J.y + 3, tz, 3, dt, 'aire'); a.rotation.y = h.dir;
    u.tiro = (u.tiro ?? 2) - dt; if (u.tiro <= 0 && h.d < 18) { u.tiro = az(2, 3); disparar('hielo', p.x, p.y + 1, p.z, J.x, J.y + 1.1, J.z); } },
  suelta: () => [[I.ESCARCHA, Math.random() < .5 ? 1 : 0], [I.CARAMELO_RARO, Math.random() < .3 ? 1 : 0]].filter(x => x[1]) });
// ── Mundo submarino ──
cria('tiburon', 'Tiburón', 'Shark', 'Tubarão', { vida: 14, an: .45, al: .7, vel: 3, color: '#6a7a90', voz: 'oso', dano: 3, nada: true,
  armar(g) { const m = Mc('#6a7a90'), m2 = Mc('#e8eef4'), ne = Mc('#141820'), bl = Mc('#ffffff');
    caja(g, .6, .5, 1.6, 0, .35, 0, m); caja(g, .5, .2, 1.4, 0, .16, .05, m2); caja(g, .5, .4, .4, 0, .35, .95, m); caja(g, .4, .1, .3, 0, .18, 1.0, m2);
    for (const s of [-1, 1]) { caja(g, .04, .08, .1, s * .26, .45, 1.05, ne); const al = caja(g, .5, .05, .26, s * .45, .2, .3, m); al.rotation.z = s * -.4; }
    caja(g, .3, .04, .02, 0, .2, 1.16, bl); caja(g, .06, .5, .36, 0, .8, .1, m); const co = caja(g, .06, .6, .3, 0, .5, -1.0, m); co.rotation.x = .4; return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) { const u = a.userData, p = a.position; const enAguaJ = get(Math.floor(J.x), Math.floor(J.y + .5), Math.floor(J.z)) === B.AGUA;
    if (atacan(a) && enAguaJ && Math.hypot(J.x - p.x, J.z - p.z) < 16) { moverLibre(a, J.x, J.y + .5, J.z, 3.4, dt, 'agua'); const h = haciaJ(a); morder(a, h, 3, 1.4, dt); }
    else { const d = vagar(a, 'agua', 8); if (!moverLibre(a, d.x, Math.min(SEA - .5, d.y), d.z, 1.8, dt, 'agua')) u.dest = null; } },
  suelta: () => [[I.PESCADO, 2], [I.PERLA, Math.random() < .2 ? 1 : 0]].filter(x => x[1]) });
cria('medusa', 'Medusa', 'Jellyfish', 'Água-viva', { vida: 4, an: .3, al: .8, vel: .6, color: '#e8a0ff', voz: 'gelatina', dano: 2, nada: true,
  armar(g) { const m = Mt('#e8a0ff', .55), m2 = Mb('#ffd0ff');
    caja(g, .6, .3, .6, 0, .7, 0, m); caja(g, .4, .14, .4, 0, .9, 0, m); caja(g, .26, .12, .26, 0, .66, 0, m2);
    for (const [x, z] of [[-.2, -.2], [.2, -.2], [-.2, .2], [.2, .2], [0, 0]]) caja(g, .05, .5, .05, x, .3, z, m); return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) { const u = a.userData, p = a.position; u.t2 = (u.t2 || 0) + dt; const d = vagar(a, 'agua', 3); moverLibre(a, d.x, Math.min(SEA - .6, d.y + Math.sin(u.t2) * .5), d.z, .6, dt, 'agua'); a.scale.y = 1 + Math.sin(u.t2 * 3) * .1;
    u.pica = (u.pica || 0) - dt; if (atacan(a) && u.pica <= 0 && Math.hypot(J.x - p.x, J.z - p.z) < 1 && Math.abs(J.y + .8 - p.y - .6) < 1.2) { u.pica = 1.2; lastimar(2, 0, 0); } },
  suelta: () => Math.random() < .3 ? [[I.PERLA, 1]] : [] });
// ── Islas flotantes ──
cria('pajaroGigante', 'Pájaro gigante', 'Giant bird', 'Pássaro gigante', { vida: 14, an: .5, al: 1, vel: 4, color: '#3a5ad8', voz: 'rugido', dano: 3, vuela: true,
  armar(g) { const m = Mc('#3a5ad8'), m2 = Mc('#f2f2f2'), pi = Mc('#ffb02e'), ne = Mc('#141414');
    caja(g, .6, .5, 1.0, 0, .6, 0, m); caja(g, .5, .3, .7, 0, .46, .05, m2); caja(g, .4, .4, .4, 0, .9, .55, m); caja(g, .14, .12, .3, 0, .86, .86, pi);
    for (const s of [-1, 1]) caja(g, .05, .07, .03, s * .14, .96, .76, ne); caja(g, .5, .08, .4, 0, .6, -.62, m);
    g._alas = [-1, 1].map(s => { const q = new THREE.Group(); q.position.set(s * .3, .7, 0); g.add(q); caja(q, 1.2, .06, .6, s * .6, 0, 0, m); caja(q, .6, .05, .4, s * 1.3, 0, -.05, m2); return q; }); return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) { const u = a.userData, p = a.position; u.t2 = (u.t2 || 0) + dt; if (a._alas) a._alas.forEach((q, k) => q.rotation.z = Math.sin(u.t2 * 7) * .5 * (k ? -1 : 1));
    if (!atacan(a)) { const d = vagar(a, 'aire', 10); moverLibre(a, d.x, Math.max(d.y, sueloCerca(p.x, p.z) + 4), d.z, 3, dt, 'aire'); return; }
    const h = haciaJ(a); if (h.d > 40) { const d = vagar(a, 'aire'); moverLibre(a, d.x, d.y, d.z, 3, dt, 'aire'); return; }
    u.pique = (u.pique ?? az(4, 7)) - dt;
    if (u.pique < 0 && u.pique > -2) { moverLibre(a, J.x, J.y + 1, J.z, 11, dt, 'aire');
      if (Math.hypot(J.x - p.x, J.z - p.z) < 1.3 && Math.abs(J.y + 1 - p.y) < 1.5) { lastimar(3, h.dx / h.d * 2.5, h.dz / h.d * 2.5); J.vy = 7; J.vx += h.dx / h.d * 9; J.vz += h.dz / h.d * 9; u.pique = az(5, 8); } }
    else { if (u.pique <= -2) u.pique = az(5, 8); const ang = u.t2 * .7; moverLibre(a, J.x + Math.cos(ang) * 9, J.y + 7, J.z + Math.sin(ang) * 9, 5, dt, 'aire'); } },
  suelta: () => [[B.TELA, Math.random() < .5 ? 1 : 0]].filter(x => x[1]) });
cria('nubeTormenta', 'Nube de tormenta', 'Storm cloud', 'Nuvem de tempestade', { vida: 16, an: .8, al: 1, vel: 1.2, color: '#6a7088', voz: 'sombra', dano: 3, vuela: true,
  armar(g) { const m = Mc('#6a7088'), m2 = Mc('#8a90a8'), oj = Mb('#fff6a0');
    caja(g, 1.6, .7, 1.2, 0, .8, 0, m); caja(g, 1.0, .5, .8, .3, 1.25, 0, m2); caja(g, .8, .5, .8, -.4, 1.15, .1, m2);
    for (const s of [-1, 1]) caja(g, .16, .1, .03, s * .3, .85, .61, oj); caja(g, .3, .06, .03, 0, .65, .61, oj); return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) { const u = a.userData, p = a.position; u.t2 = (u.t2 || 0) + dt;
    if (!atacan(a)) { const d = vagar(a, 'aire', 8); moverLibre(a, d.x, Math.max(d.y, sueloCerca(p.x, p.z) + 6), d.z, 1, dt, 'aire'); return; }
    const h = haciaJ(a); moverLibre(a, J.x + Math.sin(u.t2 * .5) * 2, J.y + 7, J.z + Math.cos(u.t2 * .5) * 2, 2.6, dt, 'aire');
    u.carga = (u.carga ?? 3) - dt; u.rojo = u.carga < .8 && u.carga > 0 ? (Math.sin(u.t2 * 30) > 0 ? .1 : 0) : u.rojo;
    if (u.carga <= 0 && h.d < 6) { u.carga = az(2.5, 4); disparar('chispa', p.x, p.y + .3, p.z, J.x, J.y + .5, J.z); son(1200, .1, 'square', .05); } else if (u.carga <= 0) u.carga = .5; },
  suelta: () => [[I.ESCARCHA, 1], [I.CRISTAL, Math.random() < .2 ? 1 : 0]].filter(x => x[1]) });
// ── Mundo de dulces ──
const COL_GOM = ['#f0384e', '#3ae05a', '#ffa030', '#b05aff'];
[3, 2, 1].forEach(n => { const s = [0, .45, .75, 1.1][n];
  cria('gomitaMala' + n, 'Gomita mala', 'Angry gummy', 'Goma brava', { vida: [0, 4, 8, 14][n], an: s * .45, al: s * .95, vel: 1.2, color: COL_GOM[0], voz: 'gelatina', dano: n, divide: n > 1 ? 'gomitaMala' + (n - 1) : null,
    armar(g) { const c = COL_GOM[Math.floor(Math.random() * 4)], m = Mt(c, .78), ne = Mc('#2a0a14'), bl = Mc('#ffffff'); const h = new THREE.Group(); h.scale.setScalar(s); g.add(h);
      caja(h, .9, .7, .9, 0, .35, 0, m); caja(h, .7, .25, .7, 0, .82, 0, m); for (const x of [-1, 1]) { caja(h, .18, .14, .03, x * .2, .5, .46, bl); caja(h, .09, .09, .03, x * .2, .48, .475, ne); const c2 = caja(h, .22, .05, .03, x * .2, .62, .47, ne); c2.rotation.z = x * -.4; }
      caja(h, .3, .06, .03, 0, .3, .46, ne); for (const x of [-1, 1]) caja(h, .12, .12, .12, x * .3, 1.0, 0, m); return []; },
    guiar(a, dt) { if (!atacan(a)) return deambular(); const u = a.userData, h = haciaJ(a); if (h.d > 20) return deambular(); u.salto = (u.salto ?? 1) - dt;
      if (u.suelo && u.salto <= 0) { u.salto = az(.8, 1.4); u.vy = 5 + n; u.kx = h.dx / h.d * (2 + n); u.kz = h.dz / h.d * (2 + n); son(200 - n * 30, .08, 'sine', .06); }
      morder(a, h, n, .6 + u.an, dt); return { dir: h.dir, vel: 0 }; },
    suelta: () => n === 1 && Math.random() < .5 ? [[I.DULCE, 1]] : [] }); });
cria('galletaZombi', 'Galleta zombi', 'Zombie cookie', 'Biscoito zumbi', { vida: 14, an: .3, al: 1.6, vel: 1, color: '#c8803a', voz: 'zombi', dano: 2,
  armar(g) { const m = Mc('#c8803a'), gl = Mc('#ffffff'), bo = Mc('#e8303a'), ne = Mc('#2a1408'), oj = Mb('#7aff5a');
    caja(g, .56, .6, .26, 0, .82, 0, m); caja(g, .5, .5, .26, 0, 1.4, 0, m); for (const y of [.7, .9]) caja(g, .1, .1, .03, 0, y, .14, bo);
    caja(g, .5, .04, .03, 0, 1.2, .14, gl); caja(g, .5, .04, .03, 0, .56, .14, gl); for (const s of [-1, 1]) { caja(g, .1, .1, .03, s * .12, 1.46, .14, oj); caja(g, .14, .14, .5, s * .38, 1.0, .2, m); caja(g, .16, .04, .03, s * .38, .96, .46, gl); }
    caja(g, .2, .05, .03, 0, 1.3, .14, ne); return [-1, 1].map(s => pata(g, .18, .52, .2, s * .14, .54, 0, m)); },
  guiar: persigue(2, 1.4), suelta: () => [[I.DULCE, 1], [I.CARAMELO_RARO, Math.random() < .1 ? 1 : 0]].filter(x => x[1]) });
// ── La Luna ──
cria('alien', 'Alien', 'Alien', 'Alienígena', { vida: 10, an: .25, al: 1.1, vel: 1.4, color: '#7ae0a0', voz: 'ojon', dano: 2,
  armar(g) { const m = Mc('#7ae0a0'), m2 = Mc('#4ab070'), ne = Mc('#0a0a14'), tr = Mb('#ff5ae0'), tr2 = Mc('#c8d0e0');
    caja(g, .34, .4, .24, 0, .52, 0, tr2); caja(g, .5, .44, .44, 0, .98, 0, m); for (const s of [-1, 1]) { caja(g, .16, .2, .03, s * .12, 1.0, .225, ne); caja(g, .04, .3, .04, s * .12, 1.32, 0, m2); caja(g, .1, .1, .1, s * .12, 1.5, 0, tr); caja(g, .08, .3, .08, s * .22, .5, .04, m); }
    return [-1, 1].map(s => pata(g, .1, .32, .1, s * .08, .32, 0, m2)); },
  guiar: tirador('laser', 2, 4, 10), suelta: () => [[I.CRISTAL, Math.random() < .4 ? 1 : 0], [I.NUCLEO_FUEGO, Math.random() < .1 ? 1 : 0]].filter(x => x[1]) });
cria('robot', 'Robot', 'Robot', 'Robô', { vida: 26, an: .4, al: 1.9, vel: .85, color: '#9aa0b0', voz: 'golpe', dano: 4,
  armar(g) { const m = Mc('#9aa0b0'), m2 = Mc('#6a7080'), oj = Mb('#ff3a3a'), am = Mb('#ffd23a');
    caja(g, .7, .7, .5, 0, 1.0, 0, m); caja(g, .5, .3, .06, 0, 1.05, .26, m2); caja(g, .1, .1, .03, -.12, 1.08, .3, am); caja(g, .1, .1, .03, .12, 1.0, .3, Mb('#5ad0ff'));
    caja(g, .5, .4, .44, 0, 1.6, 0, m); caja(g, .36, .1, .03, 0, 1.62, .23, oj); caja(g, .04, .24, .04, 0, 1.92, 0, m2); caja(g, .1, .1, .1, 0, 2.06, 0, oj);
    for (const s of [-1, 1]) { caja(g, .18, .6, .18, s * .46, 1.0, 0, m2); caja(g, .22, .14, .22, s * .46, .64, .02, m); }
    return [-1, 1].map(s => pata(g, .22, .64, .26, s * .17, .66, 0, m2)); },
  guiar(a, dt) { const r = persigue(4, 1.2)(a, dt); const u = a.userData, h = haciaJ(a); u.tiro = (u.tiro ?? 4) - dt;
    if (atacan(a) && u.tiro <= 0 && h.d > 4 && h.d < 14 && ve(a, h)) { u.tiro = az(4, 6); const p = a.position; disparar('laser', p.x, p.y + 1.6, p.z, J.x, J.y + 1.1, J.z); } return r; },
  suelta: () => [[I.HIERRO, 2], [I.NUCLEO_FUEGO, Math.random() < .2 ? 1 : 0]].filter(x => x[1]) });

// ═════════ JEFES ═════════
cria('yetiRey', 'Yeti Rey', 'Yeti King', 'Rei Yeti', { vida: 320, an: 1.1, al: 4.4, vel: 1, color: '#f2f6fa', voz: 'rugidoJefe', dano: 6, jefe: true,
  armar(g) { const h = new THREE.Group(); h.scale.setScalar(1.85); g.add(h); TIPOS.yeti.armar(h); const co = Mb('#9ae4ff'); caja(h, .76, .14, .66, 0, 2.48, .05, co); for (const x of [-.28, 0, .28]) caja(h, .12, .3, .12, x, 2.66, .05, co); return []; },
  guiar(a, dt) { const u = a.userData, h = haciaJ(a); if (!atacan(a)) return { vel: 0 };
    u.tiro = (u.tiro ?? 3) - dt; u.salto = (u.salto ?? 6) - dt;
    if (u.tiro <= 0 && h.d > 4) { u.tiro = az(2.2, 3.4); const p = a.position; disparar('roca', p.x, p.y + 4, p.z, J.x, J.y + 1, J.z); }
    if (u.salto <= 0 && u.suelo) { u.salto = az(5, 7); u.vy = 9; u.golpe = true; }
    if (u.golpe && u.suelo && u.vy <= 0) { u.golpe = false; polvo(a.position.x, a.position.y + .3, a.position.z, '#ffffff', 30); son(60, .6, 'sawtooth', .2); vibrar(150); if (h.d < 6) lastimar(5, h.dx / h.d * 2, h.dz / h.d * 2); }
    if (!u.ayuda && u.vida < 160) { u.ayuda = true; for (let k = 0; k < 3; k++) { const g2 = crearAnimal('loboHielo', a.position.x + az(-3, 3), a.position.y + .5, a.position.z + az(-3, 3)); ex(g2).f = 1; } }
    morder(a, h, 6, 2.4, dt); return { dir: h.dir, vel: h.d > 2 ? u.vel * 1.3 : 0 }; },
  suelta: () => [[B.TROFEO_HIELO, 1], [I.CARAMELO_RARO, 4], [B.HIELO_AZUL, 16], [I.CRISTAL, 4]] });
cria('pulpo', 'Pulpo gigante', 'Giant octopus', 'Polvo gigante', { vida: 280, an: 1.4, al: 3, vel: 0, color: '#c84a8a', voz: 'rugidoJefe', dano: 4, jefe: true, nada: true,
  armar(g) { const m = Mc('#c84a8a'), m2 = Mc('#e87ab0'), ne = Mc('#1a0a14'), bl = Mc('#ffffff');
    caja(g, 2.2, 2.0, 2.0, 0, 2.2, 0, m); caja(g, 1.8, .6, 1.8, 0, 3.4, 0, m); for (const s of [-1, 1]) { caja(g, .5, .5, .1, s * .5, 2.4, 1.02, bl); caja(g, .26, .3, .1, s * .5, 2.36, 1.06, ne); }
    g._ten = []; for (let k = 0; k < 8; k++) { const q = new THREE.Group(), a = k / 8 * 6.283; q.position.set(Math.cos(a) * .9, 1.3, Math.sin(a) * .9); g.add(q); caja(q, .34, 1.6, .34, Math.cos(a) * .3, -.8, Math.sin(a) * .3, k % 2 ? m : m2); g._ten.push(q); } return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) { const u = a.userData, p = a.position, e = ex(a); u.vy = 0; u.t2 = (u.t2 || 0) + dt; if (e.cx == null) { e.cx = p.x; e.cz = p.z; }
    p.x = e.cx + Math.sin(u.t2 * .4) * 2; p.z = e.cz + Math.cos(u.t2 * .3) * 2; p.y = SEA - 1.6 + Math.sin(u.t2 * 1.4) * .3;
    if (a._ten) a._ten.forEach((q, k) => { q.rotation.x = Math.sin(u.t2 * 2 + k) * .4; q.rotation.z = Math.cos(u.t2 * 1.6 + k) * .4; });
    if (!atacan(a)) return; const h = haciaJ(a); a.rotation.y = h.dir;
    u.tiro = (u.tiro ?? 2) - dt; if (u.tiro <= 0 && h.d < 28) { u.tiro = u.vida < 140 ? az(1.2, 1.8) : az(2, 2.8); disparar('tinta', p.x, p.y + 3.4, p.z, J.x, J.y + 1, J.z); }
    if (!u.ayuda && u.vida < 140) { u.ayuda = true; for (let k = 0; k < 2; k++) { const g2 = crearAnimal('tiburon', p.x + az(-4, 4), SEA - 2, p.z + az(-4, 4)); ex(g2).f = 1; } }
    if (h.d < 3.2) morder(a, h, 4, 3.4, dt); },
  suelta: () => [[B.TROFEO_MAR, 1], [I.PERLA, 10], [B.PERLA_LUZ, 6], [I.ORO, 6]] });
cria('halconTormenta', 'Halcón de tormenta', 'Storm hawk', 'Falcão da tempestade', { vida: 260, an: 1.3, al: 2, vel: 0, color: '#ffd23a', voz: 'rugidoJefe', dano: 5, jefe: true, vuela: true,
  armar(g) { const h = new THREE.Group(); h.scale.setScalar(2.6); g.add(h); TIPOS.pajaroGigante.armar(h); h.traverse(o => { if (o.material && o.material.color && o.material.color.getHex() === 0x3a5ad8) o.material = Mc('#d8a020'); }); g._alas = h._alas; caja(h, .5, .1, .5, 0, 1.15, .5, Mb('#5ad0ff')); return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) { const u = a.userData, p = a.position, e = ex(a); u.t2 = (u.t2 || 0) + dt; u.vy = 0; if (e.cx == null) { e.cx = p.x; e.cz = p.z; e.cy = p.y; }
    if (a._alas) a._alas.forEach((q, k) => q.rotation.z = Math.sin(u.t2 * 4) * .5 * (k ? -1 : 1));
    const ataca = atacan(a), h = haciaJ(a); u.pique = (u.pique ?? 6) - dt; u.tiro = (u.tiro ?? 3) - dt;
    let tx, ty, tz; if (ataca && u.pique < 1.4 && u.pique > 0) { tx = J.x; ty = J.y + 1; tz = J.z; } else { const ang = u.t2 * .45; tx = e.cx + Math.cos(ang) * 13; tz = e.cz + Math.sin(ang) * 13; ty = e.cy + 9; }
    if (u.pique <= 0) u.pique = az(6, 9);
    const dx = tx - p.x, dy = ty - p.y, dz = tz - p.z, n = Math.hypot(dx, dy, dz) || 1, v = Math.min(n, (u.pique < 1.4 ? 14 : 8) * dt); p.x += dx / n * v; p.y += dy / n * v; p.z += dz / n * v; a.rotation.y = Math.atan2(dx, dz);
    if (ataca) { if (h.d < 3 && Math.abs(J.y + 1 - p.y) < 2.5 && (u.ataque || 0) <= 0) { u.ataque = 1.2; lastimar(5, h.dx / h.d * 3, h.dz / h.d * 3); J.vy = 8; } u.ataque = (u.ataque || 0) - dt;
      if (u.tiro <= 0 && h.d < 36) { u.tiro = az(2.2, 3.2); disparar('chispa', p.x, p.y + 1.5, p.z, J.x, J.y + .8, J.z); }
      if (!u.ayuda && u.vida < 130) { u.ayuda = true; for (let k = 0; k < 2; k++) { const g2 = crearAnimal('pajaroGigante', p.x + az(-3, 3), p.y, p.z + az(-3, 3)); ex(g2).f = 1; } } } },
  suelta: () => [[B.TROFEO_NUBES, 1], [I.ESCARCHA, 6], [I.ALAS, 1], [I.ORO, 6]] });
cria('reyGomita', 'Rey Gomita', 'Gummy King', 'Rei Goma', { vida: 300, an: 1.2, al: 3, vel: 0, color: '#f0384e', voz: 'rugidoJefe', dano: 5, jefe: true,
  armar(g) { const m = Mt('#f0384e', .82), ne = Mc('#2a0a14'), bl = Mc('#ffffff'), oro = Mb('#ffd23a'); const h = new THREE.Group(); h.scale.setScalar(2.6); g.add(h);
    caja(h, .9, .75, .9, 0, .38, 0, m); caja(h, .7, .25, .7, 0, .86, 0, m); for (const x of [-1, 1]) { caja(h, .18, .14, .03, x * .2, .52, .46, bl); caja(h, .09, .09, .03, x * .2, .5, .475, ne); }
    caja(h, .3, .06, .03, 0, .32, .46, ne); caja(h, .6, .12, .6, 0, 1.05, 0, oro); for (const [x, z] of [[-.22, -.22], [.22, -.22], [-.22, .22], [.22, .22]]) caja(h, .1, .2, .1, x, 1.2, z, oro); return []; },
  guiar(a, dt) { const u = a.userData, h = haciaJ(a); if (!atacan(a)) return { vel: 0 }; u.salto = (u.salto ?? 1.5) - dt;
    if (u.suelo && u.salto <= 0) { u.salto = az(1.4, 2); u.vy = 9; u.kx = h.dx / h.d * 6; u.kz = h.dz / h.d * 6; u.golpe = true; }
    if (u.golpe && u.suelo && u.vy <= 0) { u.golpe = false; polvo(a.position.x, a.position.y + .3, a.position.z, '#f0384e', 24); son(70, .5, 'sine', .2); if (h.d < 4) lastimar(5, h.dx / h.d * 2, h.dz / h.d * 2); }
    const f = u.vida < 100 ? 2 : u.vida < 200 ? 1 : 0; if (f > (u.fase || 0)) { u.fase = f; for (let k = 0; k < 2; k++) { const g2 = crearAnimal('gomitaMala3', a.position.x + az(-3, 3), a.position.y + 1, a.position.z + az(-3, 3)); ex(g2).f = 1; } }
    return { dir: h.dir, vel: 0 }; },
  suelta: () => [[B.TROFEO_DULCE, 1], [I.DULCE, 16], [I.CARAMELO_RARO, 3], [I.ORO, 6]] });
cria('robotGuardian', 'Robot guardián', 'Guardian robot', 'Robô guardião', { vida: 340, an: 1, al: 4, vel: .7, color: '#9aa0b0', voz: 'rugidoJefe', dano: 6, jefe: true,
  armar(g) { const h = new THREE.Group(); h.scale.setScalar(2.1); g.add(h); TIPOS.robot.armar(h); caja(h, .8, .1, .6, 0, 1.38, 0, Mb('#ffd23a')); return []; },
  guiar(a, dt) { const u = a.userData, h = haciaJ(a); if (!atacan(a)) return { vel: 0 }; u.tiro = (u.tiro ?? 2.5) - dt;
    if (u.tiro <= 0 && h.d < 30) { u.tiro = az(2.6, 3.6); const p = a.position; for (let k = 0; k < 3; k++) setTimeout(() => { if (animales.includes(a)) disparar('laser', p.x, p.y + 3.4, p.z, J.x + az(-.5, .5), J.y + 1, J.z + az(-.5, .5)); }, k * 220); }
    if (!u.ayuda && u.vida < 170) { u.ayuda = true; for (let k = 0; k < 2; k++) { const g2 = crearAnimal('robot', a.position.x + az(-3, 3), a.position.y + .5, a.position.z + az(-3, 3)); ex(g2).f = 1; } }
    morder(a, h, 6, 2.2, dt); return { dir: h.dir, vel: h.d > 2 ? u.vel * 1.3 : 0 }; },
  suelta: () => [[B.TROFEO_LUNA, 1], [I.NUCLEO_FUEGO, 4], [I.HIERRO, 16], [I.CRISTAL, 8]] });
// nombres de las criaturas
try { for (const k in NOMS) { NOM_CRIA.es[k] = NOMS[k][0]; NOM_CRIA.en[k] = NOMS[k][1]; NOM_CRIA.pt[k] = NOMS[k][2]; }
  GRUPOS_CRIA.find(g => g[0] === 'criaMonstruos')[1].push('loboHielo', 'yeti', 'espirituEscarcha', 'tiburon', 'medusa', 'pajaroGigante', 'nubeTormenta', 'gomitaMala3', 'galletaZombi', 'alien', 'robot');
  GRUPOS_CRIA.find(g => g[0] === 'criaJefes')[1].push('yetiRey', 'pulpo', 'halconTormenta', 'reyGomita', 'robotGuardian'); } catch (e) {}

// ═════════ DÓNDE Y CUÁNDO APARECEN ═════════
const MONS = {
  nieve: [['loboHielo', 3, 'noche', 3], ['yeti', 2, 'noche', 1], ['espirituEscarcha', 2, 'noche', 1], ['loboHielo', 1, 'ventisca', 2]],
  submarino: [['tiburon', 3, 'siempre', 1, 'agua'], ['medusa', 4, 'siempre', 2, 'agua'], ['ahogado', 2, 'noche', 1, 'agua']],
  flotantes: [['pajaroGigante', 2, 'siempre', 1], ['nubeTormenta', 2, 'noche', 1], ['nubeTormenta', 2, 'viento', 1]],
  dulces: [['gomitaMala3', 3, 'noche', 1], ['galletaZombi', 3, 'noche', 2]],
  luna: [['alien', 3, 'noche', 2], ['robot', 2, 'siempre', 1]] };
const misTipos = new Set(Object.values(MONS).flat().map(m => m[0]));
let spawnT = 0, limpiarT = 0;
function aparecer(dt) {
  if (!esViaje() || creativo() || invitado() || !REG.monstruos) return;
  spawnT -= dt; if (spawnT > 0) return; spawnT = 2;
  const noche = oscuridad() > .45, lista = MONS[mundoV()] || [], hostiles = animales.filter(a => { const T2 = TIPOS[a.userData.animal]; return T2 && T2.hostil && !T2.jefe && a.position.distanceTo(cam.position) < 50; }).length;
  if (hostiles >= (noche ? 9 : 4)) return;
  const posibles = lista.filter(([, , cuando]) => cuando === 'siempre' || (cuando === 'noche' && noche) || cuando === climaAct.tipo); if (!posibles.length) return;
  const tot = posibles.reduce((s, m) => s + m[1], 0); let r = Math.random() * tot, el = posibles[0]; for (const m of posibles) { r -= m[1]; if (r <= 0) { el = m; break; } }
  const [tipo, , , grupo, medio] = el, cuenta = animales.filter(a => a.userData.animal === tipo).length; if (cuenta >= 6) return;
  for (let k = 0; k < 20; k++) { const a = Math.random() * 6.283, d = az(14, 30), x = Math.floor(J.x + Math.cos(a) * d), z = Math.floor(J.z + Math.sin(a) * d); if (x < 2 || z < 2 || x >= SX - 2 || z >= SZ - 2) continue;
    if (GUAR && Math.hypot(x - GUAR.x, z - GUAR.z) < GUAR.r + 4) continue;
    if (medio === 'agua') { if (get(x, SEA, z) !== B.AGUA || get(x, SEA - 2, z) !== B.AGUA) continue; for (let q = 0; q < grupo; q++) crearAnimal(tipo, x + .5 + az(-1, 1), SEA - 1.5 - Math.random(), z + .5 + az(-1, 1)); return; }
    const y = sueloCerca(x, z); if (y < 2 || get(x, y - 1, z) === B.AGUA || solidoMov(get(x, y, z)) || solidoMov(get(x, y + 1, z))) continue;
    if (cieloEn(x, y + 1, z) < .5 && !TIPOS[tipo].vuela) continue;
    const vy = TIPOS[tipo].vuela ? y + 4 + Math.random() * 3 : y;
    for (let q = 0; q < grupo; q++) crearAnimal(tipo, x + .5 + az(-1, 1), vy, z + .5 + az(-1, 1)); return; }
}
function limpiar(dt) {
  limpiarT -= dt; if (limpiarT > 0) return; limpiarT = 4; const noche = oscuridad() > .45;
  for (const a of animales.slice()) { const t = a.userData.animal, T2 = TIPOS[t]; if (!T2 || !T2.viaje) continue; const d = a.position.distanceTo(cam.position);
    if (!esViaje() || creativo()) continue;
    if (T2.jefe) { if (d > 60) quitarAnimal(a); continue; }
    if (d > 64 || (!noche && d > 26 && (MONS[mundoV()] || []).every(m => m[0] !== t || m[2] === 'noche'))) quitarAnimal(a); }
}

// ═════════ GUARIDAS: el jefe aparece cuando entras ═════════
const JEFE = { nieve: 'yetiRey', submarino: 'pulpo', flotantes: 'halconTormenta', dulces: 'reyGomita', luna: 'robotGuardian' };
let guarAviso = false;
function guaridas() {
  if (!GUAR || !esViaje() || mundoV() !== GUAR.k) return;
  const d = Math.hypot(J.x - GUAR.x, J.z - GUAR.z);
  if (d < GUAR.r + 12 && !guarAviso) { guarAviso = true; aviso(TR('pvg_' + GUAR.k), 3000); }
  if (d > GUAR.r + 30) guarAviso = false;
  if (creativo() || invitado() || mapa.jefeV || d > GUAR.r - 1) return;
  const tipo = JEFE[GUAR.k]; if (animales.some(a => a.userData.animal === tipo)) return;
  let g; if (GUAR.k === 'submarino') g = crearAnimal(tipo, GUAR.agua.x, SEA - 1.6, GUAR.agua.z); else if (GUAR.k === 'flotantes') g = crearAnimal(tipo, GUAR.x, GUAR.y + 9, GUAR.z - 8); else g = crearAnimal(tipo, GUAR.x, GUAR.y + .2, GUAR.z - 6);
  ex(g).f = 1; ex(g).cx = GUAR.agua ? GUAR.agua.x : GUAR.x; ex(g).cz = GUAR.agua ? GUAR.agua.z : GUAR.z; ex(g).cy = GUAR.y; aviso(TR('jefeLlega', { n: nomCria(tipo).toUpperCase() }), 2600); try { voz('rugidoJefe', 0); } catch (e) {} vibrar(200);
}
{ const m0 = matarAnimal; matarAnimal = function (a) { const t = a.userData.animal; if (Object.values(JEFE).includes(t) && jugando && !creativo()) { mapa.jefeV = 1; sucio = true; } return m0.apply(this, arguments); }; }

// ═════════ CLIMA DE CADA MUNDO ═════════
const CLIMA = { nieve: ['ventisca'], submarino: ['tormenta'], flotantes: ['viento'], dulces: ['caramelos', 'chocolate'], luna: ['meteoritos'] };
const climaAct = { tipo: 'claro', t: 60 };
let luzObj = 1, frio = 0, frioT = 0, vientoDir = 0, rayoT = 4, meteoT = 2, caramT = 0;
const gotas = [], NG = 700, geoG = new THREE.BufferGeometry(), posG = new Float32Array(NG * 6); geoG.setAttribute('position', new THREE.BufferAttribute(posG, 3));
const lluviaV = new THREE.LineSegments(geoG, new THREE.LineBasicMaterial({ color: 0xaac4ff, transparent: true, opacity: .55, fog: false })); lluviaV.frustumCulled = false; lluviaV.visible = false; escena.add(lluviaV);
for (let i = 0; i < NG; i++) gotas.push({ x: 0, y: -999, z: 0, v: 14 + Math.random() * 6 });
const NC = 900, geoC = new THREE.BufferGeometry(), posC = new Float32Array(NC * 3); geoC.setAttribute('position', new THREE.BufferAttribute(posC, 3));
const ventisca = new THREE.Points(geoC, new THREE.PointsMaterial({ color: 0xffffff, size: .14, transparent: true, opacity: .9, fog: false })); ventisca.frustumCulled = false; ventisca.visible = false; escena.add(ventisca);
const copos = []; for (let i = 0; i < NC; i++) copos.push({ x: 0, y: -999, z: 0, f: Math.random() * 6 });
const techoEn = (x, z) => { const xi = Math.floor(x), zi = Math.floor(z); if (xi < 0 || zi < 0 || xi >= SX || zi >= SZ) return 0; return alt[xi + SX * zi] + 1; };
// escarcha en los bordes de la pantalla cuando tienes frío
{ const d = document.createElement('div'); d.id = 'pvFrio'; d.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2;opacity:0;transition:opacity .6s;box-shadow:inset 0 0 120px 40px rgba(200,235,255,.85);'; document.body.appendChild(d); }
let sonClima = null;
function sonidoClima(vol, f) { const c = AU.ctx; if (!c) return;
  if (!sonClima && vol > 0) { const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), dd = b.getChannelData(0); for (let i = 0; i < dd.length; i++) dd[i] = Math.random() * 2 - 1;
    const s = c.createBufferSource(); s.buffer = b; s.loop = true; const fi = c.createBiquadFilter(); fi.type = 'lowpass'; fi.frequency.value = f; const g = c.createGain(); g.gain.value = 0; s.connect(fi).connect(g).connect(AU.sfx); s.start(); sonClima = { s, g, fi }; }
  if (sonClima) { sonClima.g.gain.setTargetAtTime(vol, c.currentTime, .6); sonClima.fi.frequency.setTargetAtTime(f, c.currentTime, .3); } }
function cambiarClimaV(tipo) { climaAct.tipo = tipo; climaAct.t = tipo === 'claro' ? az(70, 160) : az(45, 90); aviso(TR(tipo === 'claro' ? 'pvc_fin' : 'pvc_' + tipo), 2400); vientoDir = Math.random() * 6.283; }
function climaFrameV(dt) {
  const activo = jugando && esViaje() && !creativo();
  if (!activo) { if (climaAct.tipo !== 'claro') climaAct.tipo = 'claro'; }
  else if (!pausado) { climaAct.t -= dt; if (climaAct.t <= 0) { const op = CLIMA[mundoV()] || []; cambiarClimaV(climaAct.tipo === 'claro' && op.length ? op[Math.floor(Math.random() * op.length)] : 'claro'); } }
  const t = climaAct.tipo, c = cam.position;
  luzObj = t === 'tormenta' ? .55 : t === 'ventisca' ? .72 : t === 'viento' || t === 'chocolate' ? .82 : 1;
  window.pvClimaLuz = (window.pvClimaLuz || 1) + (luzObj - (window.pvClimaLuz || 1)) * Math.min(1, dt * .6);
  window.pvNiebla = t === 'ventisca' ? 24 : 0;
  // lluvia (y chocolate)
  const llueve = t === 'tormenta' || t === 'viento' || t === 'chocolate'; lluviaV.visible = llueve;
  if (llueve) { lluviaV.material.color.setHex(t === 'chocolate' ? 0x7a4a2a : 0xaac4ff); const vx = t === 'viento' ? Math.cos(vientoDir) * 6 : 0, vz = t === 'viento' ? Math.sin(vientoDir) * 6 : 0; let k = 0;
    for (const g of gotas) { g.y -= g.v * dt; g.x += vx * dt; g.z += vz * dt; if (g.y < c.y - 10 || g.y < techoEn(g.x, g.z) || Math.abs(g.x - c.x) > 14 || Math.abs(g.z - c.z) > 14) { g.x = c.x + (Math.random() - .5) * 28; g.z = c.z + (Math.random() - .5) * 28; g.y = c.y + 6 + Math.random() * 10; }
      const vis = g.y >= techoEn(g.x, g.z); posG[k++] = g.x; posG[k++] = vis ? g.y : -999; posG[k++] = g.z; posG[k++] = g.x - vx * .03; posG[k++] = vis ? g.y + .45 : -999; posG[k++] = g.z - vz * .03; }
    geoG.attributes.position.needsUpdate = true; }
  // ventisca
  ventisca.visible = t === 'ventisca';
  if (t === 'ventisca') { const vx = Math.cos(vientoDir) * 7, vz = Math.sin(vientoDir) * 7; let k = 0;
    for (const s of copos) { s.y -= 4 * dt; s.f += dt; s.x += (vx + Math.sin(s.f * 3) * 1.5) * dt; s.z += vz * dt;
      if (s.y < c.y - 8 || s.y < techoEn(s.x, s.z) || Math.abs(s.x - c.x) > 13 || Math.abs(s.z - c.z) > 13) { s.x = c.x + (Math.random() - .5) * 26; s.z = c.z + (Math.random() - .5) * 26; s.y = c.y + 2 + Math.random() * 10; }
      posC[k++] = s.x; posC[k++] = s.y >= techoEn(s.x, s.z) ? s.y : -999; posC[k++] = s.z; }
    geoC.attributes.position.needsUpdate = true; }
  const bajoTecho = techoEn(c.x, c.z) > c.y + 1;
  sonidoClima(activo && t !== 'claro' && t !== 'meteoritos' && t !== 'caramelos' ? (bajoTecho ? .04 : t === 'tormenta' ? .15 : t === 'ventisca' ? .13 : .09) * (AJ.sonidos > 0 ? 1 : 0) : 0, t === 'ventisca' || t === 'viento' ? 600 : 1400);
  if (!activo || pausado) { $('pvFrio').style.opacity = 0; return; }
  // rayos en la tormenta
  if (t === 'tormenta') { rayoT -= dt; if (rayoT <= 0) { rayoT = az(5, 12); try { caerRayo(); } catch (e) {} } }
  // el viento empuja
  if (t === 'viento' && !volando && !window.montando) { const f = 2.4 + Math.sin(performance.now() / 900) * 1.2; J.vx += Math.cos(vientoDir) * f * dt * 9; J.vz += Math.sin(vientoDir) * f * dt * 9; }
  // frío en la ventisca: al aire libre y sin fuego cerca
  if (t === 'ventisca') { const fx = Math.floor(J.x), fy = Math.floor(J.y + 1), fz = Math.floor(J.z); frioT -= dt;
    if (frioT <= 0) { frioT = .5; let calor = cieloEn(fx, fy, fz) < .5; if (!calor) for (let a = -3; a <= 3 && !calor; a++) for (let b = -2; b <= 2 && !calor; b++) for (let d = -3; d <= 3; d++) { const q = get(fx + a, fy + b, fz + d); if (q && DEF[q] && DEF[q].luz >= 8) { calor = true; break; } }
      frio = calor ? Math.max(0, frio - 2) : frio + .5; if (frio > 10 && Math.floor(frio * 2) % 10 === 0) { lastimar(1, 0, 0, false); aviso(TR('pvFrio'), 1600); } } }
  else frio = Math.max(0, frio - dt * 2);
  $('pvFrio').style.opacity = Math.min(.9, frio / 14);
  // lluvia de caramelos: caen y se pueden juntar
  if (t === 'caramelos') { caramT -= dt; if (caramT <= 0 && caramelos.length < 40) { caramT = .35; const a = Math.random() * 6.283, d = Math.random() * 12, x = J.x + Math.cos(a) * d, z = J.z + Math.sin(a) * d; caerCaramelo(x, J.y + 12, z); } }
  // lluvia de meteoritos
  if (t === 'meteoritos') { meteoT -= dt; if (meteoT <= 0) { meteoT = az(2.5, 5); lanzarMeteorito(); } }
}
// ─── caramelos ───
const caramelos = [], COL_CAR = [0xff4a7a, 0x5ad0ff, 0xffd23a, 0x7ae05a, 0xb07aff];
function caerCaramelo(x, y, z) { const m = new THREE.Mesh(new THREE.BoxGeometry(.22, .22, .22), new THREE.MeshLambertMaterial({ color: COL_CAR[Math.floor(Math.random() * 5)] })); m.position.set(x, y, z); m.userData = { vy: 0, t: 0, quieto: false }; escena.add(m); caramelos.push(m); }
function moverCaramelos(dt) {
  for (let i = caramelos.length - 1; i >= 0; i--) { const m = caramelos[i], u = m.userData; u.t += dt; m.rotation.y += dt * 2;
    if (!u.quieto) { u.vy -= 14 * dt; const ny = m.position.y + u.vy * dt; if (solidoMov(get(Math.floor(m.position.x), Math.floor(ny - .11), Math.floor(m.position.z)))) { u.quieto = true; m.position.y = Math.floor(ny - .11) + 1.12; } else m.position.y = ny; }
    else m.position.y += Math.sin(u.t * 3) * .002;
    const d = Math.hypot(m.position.x - J.x, m.position.z - J.z);
    if (jugando && d < 1.3 && m.position.y > J.y - .5 && m.position.y < J.y + 2 && !creativo()) { darItem(I.DULCE, 1); son(900 + Math.random() * 300, .06, 'triangle', .06); escena.remove(m); caramelos.splice(i, 1); continue; }
    if (u.t > 45 || !jugando || mundoV() !== 'dulces' || m.position.y < -5) { escena.remove(m); caramelos.splice(i, 1); } }
}
// ─── meteoritos ───
const meteoros = [];
function lanzarMeteorito() {
  for (let k = 0; k < 10; k++) { const a = Math.random() * 6.283, d = az(8, 34), x = J.x + Math.cos(a) * d, z = J.z + Math.sin(a) * d; if (x < 3 || z < 3 || x > SX - 3 || z > SZ - 3) continue;
    if (Math.hypot(x - spawn.x, z - spawn.z) < 12) continue; if (GUAR && Math.hypot(x - GUAR.x, z - GUAR.z) < GUAR.r + 3) continue;
    const g = new THREE.Group(); caja(g, .9, .9, .9, 0, 0, 0, Mb('#ffb02e')); caja(g, .6, .6, 1.2, 0, 0, 0, Mb('#fff6a0'));
    const ini = new THREE.Vector3(x + az(-14, 14), SY + 26, z + az(-14, 14)); g.position.copy(ini); escena.add(g);
    meteoros.push({ g, ini, x, z, y: sueloCerca(x, z), t: 0, dur: 2.2 }); son(300, 1.6, 'sawtooth', .03); return; }
}
function moverMeteoros(dt) {
  for (let i = meteoros.length - 1; i >= 0; i--) { const m = meteoros[i]; m.t += dt; const k = Math.min(1, m.t / m.dur);
    m.g.position.set(m.ini.x + (m.x - m.ini.x) * k, m.ini.y + (m.y - m.ini.y) * k, m.ini.z + (m.z - m.ini.z) * k); m.g.rotation.x += dt * 6;
    if (Math.random() < .7) polvo(m.g.position.x, m.g.position.y, m.g.position.z, Math.random() < .5 ? '#ffb02e' : '#7a7a80', 1);
    if (k >= 1 || !jugando) { escena.remove(m.g); meteoros.splice(i, 1); if (jugando && mundoV() === 'luna') impacto(m.x, m.y, m.z); } }
}
function impacto(x, y, z) {
  const cx = Math.floor(x), cy = Math.floor(y), cz = Math.floor(z);
  accion(() => { for (let a = -2; a <= 2; a++) for (let b = -1; b <= 2; b++) for (let c = -2; c <= 2; c++) { if (Math.hypot(a, b * 1.3, c) > 2.1) continue; const t = get(cx + a, cy + b - 1, cz + c);
      if (t && t !== B.ROCA && t !== B.PORTAL_V && t !== B.COFRE && DEF[t] && DEF[t].dur >= 0) ponerBloque(cx + a, cy + b - 1, cz + c, B.AIRE); }
    ponerBloque(cx, cy - 2, cz, B.METEORITO); if (Math.random() < .5) ponerBloque(cx + 1, cy - 2, cz, B.METEORITO); });
  polvo(x, y, z, '#ffb02e', 30); polvo(x, y + .5, z, '#7a7a80', 20); ruido(1.2, .35, 300); son(50, .8, 'sawtooth', .12); vibrar(120);
  const d = Math.hypot(J.x - x, J.z - z); if (d < 3.2 && Math.abs(J.y - y) < 3 && !creativo()) lastimar(4, (J.x - x) / (d || 1) * 2, (J.z - z) / (d || 1) * 2);
}

// ═════════ CADA CUADRO ═════════
{ const p0 = pjFrame; pjFrame = function (dt) { const r = p0.apply(this, arguments);
    try { climaFrameV(dt); moverCaramelos(dt); moverMeteoros(dt); if (jugando && !pausado) { aparecer(dt); guaridas(); } limpiar(dt); } catch (e) { console.warn('aventura', e && e.message); }
    return r; }; }
{ const e0 = entrarMundo; entrarMundo = function (id) {
    for (const m of caramelos.splice(0)) escena.remove(m); for (const m of meteoros.splice(0)) escena.remove(m.g);
    climaAct.tipo = 'claro'; climaAct.t = az(40, 90); window.pvClimaLuz = 1; window.pvNiebla = 0; frio = 0; guarAviso = false;
    const r = e0.apply(this, arguments);
    try { if (!creativo() && !window.mundoTipo && !localStorage.getItem('voxPortalVistoS')) { localStorage.setItem('voxPortalVistoS', '1'); setTimeout(() => aviso(TR('pvNuevoSup'), 5000), 5000); } } catch (e) {}
    return r; }; }

// ═════════ LOGROS ═════════
try { const nuevos = [
    ['v_flotantes', I.LLAVE_NUBES, () => window.mundoTipo === 'v_flotantes', 'Sobre las nubes', 'Viaja a las Islas flotantes', 'Above the Clouds', 'Travel to the Floating Islands', 'Acima das nuvens', 'Viaje para as Ilhas flutuantes'],
    ['v_submarino', I.LLAVE_MAR, () => window.mundoTipo === 'v_submarino', 'Bajo el mar', 'Viaja al Mundo submarino', 'Under the Sea', 'Travel to the Undersea World', 'Debaixo do mar', 'Viaje para o Mundo submarino'],
    ['v_nieve', I.LLAVE_HIELO, () => window.mundoTipo === 'v_nieve', 'Frío polar', 'Viaja al Reino de hielo', 'Polar Chill', 'Travel to the Ice Kingdom', 'Frio polar', 'Viaje para o Reino do gelo'],
    ['v_dulces', I.LLAVE_DULCE, () => window.mundoTipo === 'v_dulces', 'Diente dulce', 'Viaja al Mundo de dulces', 'Sweet Tooth', 'Travel to Candy World', 'Formiguinha', 'Viaje para o Mundo dos doces'],
    ['v_luna', I.LLAVE_LUNA, () => window.mundoTipo === 'v_luna', 'Un pequeño paso', 'Viaja a la Luna', 'One Small Step', 'Travel to the Moon', 'Um pequeno passo', 'Viaje para a Lua'],
    ['jefe_yetiRey', B.TROFEO_HIELO, () => !!stats.jefe_yetiRey || lgTiene(B.TROFEO_HIELO), 'Rey del hielo', 'Vence al Yeti Rey', 'King of Ice', 'Defeat the Yeti King', 'Rei do gelo', 'Derrote o Rei Yeti'],
    ['jefe_pulpo', B.TROFEO_MAR, () => !!stats.jefe_pulpo || lgTiene(B.TROFEO_MAR), 'Ocho brazos', 'Vence al Pulpo gigante', 'Eight Arms', 'Defeat the Giant Octopus', 'Oito braços', 'Derrote o Polvo gigante'],
    ['jefe_halcon', B.TROFEO_NUBES, () => !!stats.jefe_halconTormenta || lgTiene(B.TROFEO_NUBES), 'Cazatormentas', 'Vence al Halcón de tormenta', 'Storm Chaser', 'Defeat the Storm Hawk', 'Caçador de tempestades', 'Derrote o Falcão da tempestade'],
    ['jefe_gomita', B.TROFEO_DULCE, () => !!stats.jefe_reyGomita || lgTiene(B.TROFEO_DULCE), 'Corona de goma', 'Vence al Rey Gomita', 'Gummy Crown', 'Defeat the Gummy King', 'Coroa de goma', 'Derrote o Rei Goma'],
    ['jefe_robot', B.TROFEO_LUNA, () => !!stats.jefe_robotGuardian || lgTiene(B.TROFEO_LUNA), 'Apagado', 'Vence al Robot guardián', 'Powered Down', 'Defeat the Guardian Robot', 'Desligado', 'Derrote o Robô guardião']];
  const k = LOGROS.findIndex(l => l[0] === 'todos'); LOGROS.splice(k < 0 ? LOGROS.length : k, 0, ...nuevos); } catch (e) {}

window.__aventura2 = { MONS, JEFE, caerCaramelo, frio: () => frio, caramelos: () => caramelos.length, guarida: () => GUAR, clima: climaAct, cambiarClima: cambiarClimaV, aparecer, impacto, lanzarMeteorito };
}
