'use strict';
// ═════════ BIOMAS NUEVOS + BLOQUES Y CRIATURAS PARA LOS MUNDOS DE VIAJE ═════════
// Biomas (solo en mundos nuevos, generación 5): Cañón rojo, Bosque de cerezos, Bosque de hongos gigantes, Sabana,
// Volcán y Arrecife grande. Los mundos de antes no cambian.
// IDs fijos (el mundo los guarda): bloques 1300–1399. Dibujos: casilleros libres del atlas. Todo es diseño propio.

{
const N5 = {};   // nombres traducidos
const nombre5 = (es, en, pt) => { N5[es] = { en, pt }; return es; };

// ─── casilleros libres del atlas ───
const LIBRES = []; for (let t = 205; t < 256; t++) if (TILES[t] == null) LIBRES.push(t); for (let t = 397; t < 448; t++) if (TILES[t] == null) LIBRES.push(t);
function tile5(nombre, f, bisel = true) { const n = LIBRES.shift(); if (n == null) { console.warn('biomas: sin lugar en el atlas'); return TL.piedra; } TILES[n] = nombre; TL[nombre] = n; dibujarTile(n, f); if (bisel) biselar(n); return n; }
const rui = (c, a = .08) => (x, y, r) => sombra(c, (r() - .5) * a * 2);
const mot = (base, motas, d = .22) => (x, y, r, e) => r() < d ? e(motas) : sombra(base, (r() - .5) * .1);
const ladoPasto = (arriba, tierra) => (x, y, r) => (y < 3 || (y === 3 && r() < .5)) ? sombra(arriba, (r() - .5) * .12) : sombra(tierra, (r() - .5) * .14);

const B5 = {};
function bloque5(id, clave, es, en, pt, tiles, o = {}) { B5[clave] = id; B[clave] = id; nombre5(es, en, pt); def(id, es, tiles, o); TODOS.push(id); return id; }
const PLANTA5 = { dur: .05, trans: true, solido: false, planta: true, cat: 'catNaturaleza' };

// ── naturaleza de los biomas ──
const TIERRA_M = '#a8653a';
bloque5(1300, 'PETALOS', 'Pétalos rosas', 'Pink petals', 'Pétalas rosas', [tile5('petalos', (x, y) => { const k = (x * 7 + y * 13) % 11; if (y < 9) return null; if (k < 3) return ['#ffb8d0', '#ff9ac0', '#ffd0e0'][k]; if (y > 12 && (x === 4 || x === 11)) return '#5aa83a'; return null; }, false)], Object.assign({ color: '#ffb8d0' }, PLANTA5));
bloque5(1301, 'MICELIO', 'Micelio', 'Mycelium', 'Micélio', [tile5('micelioArriba', mot('#8a7a9a', ['#b8a8c8', '#6a5a7a', '#c8c0d0'], .25)), TL.tierra, tile5('micelioLado', ladoPasto('#8a7a9a', TIERRA_M))], { dur: .7, suelta: B.TIERRA, color: '#8a7a9a', cat: 'catNaturaleza' });
bloque5(1302, 'SOMBRERO_R', 'Sombrero de hongo rojo', 'Red mushroom cap', 'Chapéu de cogumelo vermelho', [tile5('sombreroR', (x, y, r) => { const p = [[3, 3], [10, 2], [6, 8], [12, 10], [2, 12], [9, 13]].some(([a, b]) => Math.hypot(x - a, y - b) < 1.7); return p ? '#fff4ec' : sombra('#d42a2a', (r() - .5) * .14); })], { dur: .5, color: '#d42a2a', cat: 'catNaturaleza' });
bloque5(1303, 'SOMBRERO_M', 'Sombrero de hongo marrón', 'Brown mushroom cap', 'Chapéu de cogumelo marrom', [tile5('sombreroM', mot('#a8784e', ['#8a5e3a', '#c8986a'], .2))], { dur: .5, color: '#a8784e', cat: 'catNaturaleza' });
bloque5(1304, 'TALLO_HONGO', 'Tallo de hongo', 'Mushroom stem', 'Talo de cogumelo', [tile5('talloArriba', (x, y, r) => Math.hypot(x - 7.5, y - 7.5) < 5 ? sombra('#e8dcc8', (r() - .5) * .08) : '#cfc2aa'), tile5('talloArriba2', rui('#e8dcc8')), tile5('talloLado', (x, y, r) => x % 5 === 2 ? '#d8ccb4' : sombra('#efe6d6', (r() - .5) * .08))], { dur: .5, color: '#efe6d6', cat: 'catNaturaleza' });
bloque5(1305, 'HONGO_LUZ', 'Hongo luminoso', 'Glowing mushroom', 'Cogumelo luminoso', [tile5('hongoLuz', (x, y) => { if (y >= 4 && y <= 8 && Math.abs(x - 7.5) < 5.5 - (8 - y) * .8) return (x + y) % 3 === 0 ? '#c8fbff' : '#3ad8f0'; if (y > 8 && y < 15 && x >= 7 && x <= 8) return '#bfe8e0'; if (y === 10 && (x === 3 || x === 12)) return '#7af0ff'; return null; }, false)], Object.assign({ color: '#3ad8f0', luz: 10 }, PLANTA5));
bloque5(1306, 'PASTO_SECO', 'Pasto de sabana', 'Savanna grass', 'Grama de savana', [tile5('pastoSecoArriba', mot('#b8b048', ['#a8a038', '#c8c060', '#9a9234'], .3)), TL.tierra, tile5('pastoSecoLado', ladoPasto('#b8b048', TIERRA_M))], { dur: .7, suelta: B.TIERRA, color: '#b8b048', cat: 'catNaturaleza' });
bloque5(1307, 'PASTO_ALTO_SECO', 'Pasto alto seco', 'Tall dry grass', 'Grama alta seca', [tile5('pastoAltoSeco', (x, y) => { for (const [c, h] of [[3, 4], [6, 1], [9, 3], [12, 2]]) if (Math.abs(x - c - Math.sin(y * .4) * .6) < .8 && y >= h) return y < h + 3 ? '#e8d878' : '#c8b850'; return null; }, false)], Object.assign({ color: '#c8b850' }, PLANTA5));
bloque5(1308, 'ROCA_VOLC', 'Roca volcánica', 'Volcanic rock', 'Rocha vulcânica', [tile5('rocaVolc', mot('#3a3438', ['#2a2428', '#4e464c', '#5a2a1e'], .3))], { dur: 3.5, req: 1, color: '#3a3438' });
bloque5(1309, 'CENIZA', 'Ceniza', 'Ash', 'Cinzas', [tile5('ceniza', mot('#7a7880', ['#5e5c64', '#9a98a0'], .3))], { dur: .6, color: '#7a7880', cat: 'catNaturaleza' });

// ── mundos de viaje ──
bloque5(1310, 'CRISTAL_HIELO', 'Cristal de hielo', 'Ice crystal', 'Cristal de gelo', [tile5('cristalHielo', (x, y) => { for (const [c, h, w] of [[7.5, 1, 2.2], [4, 6, 1.4], [11.5, 5, 1.5]]) { if (y >= h && Math.abs(x - c) < w * (1 - (y - h) / 30) + (y - h) * .12 && y < 15) return Math.abs(x - c) < .7 ? '#ffffff' : '#9ae4ff'; } return y === 15 && x > 2 && x < 13 ? '#c8f0ff' : null; }, false)], Object.assign({ color: '#9ae4ff', luz: 9 }, PLANTA5));
bloque5(1311, 'NUBE', 'Nube', 'Cloud', 'Nuvem', [tile5('nube', (x, y, r) => sombra('#f6f8ff', (r() - .5) * .06 - (x === 0 || y === 0 || x === 15 || y === 15 ? .04 : 0)), false)], { dur: .3, color: '#f6f8ff', cat: 'catNaturaleza' });
bloque5(1312, 'PERLA_LUZ', 'Perla luminosa', 'Glowing pearl block', 'Bloco de pérola luminosa', [tile5('perlaLuz', (x, y, r) => { const d = Math.hypot(x - 7.5, y - 7.5); return d < 3 ? '#ffffff' : d < 5.5 ? '#d8f6ff' : (x + y) % 4 === 0 ? '#a8e0f0' : sombra('#c0ecf8', (r() - .5) * .08); })], { dur: 1, luz: 15, color: '#c0ecf8' });
// dulces
bloque5(1313, 'BIZCOCHO', 'Bizcocho', 'Sponge cake', 'Pão de ló', [tile5('bizcochoArriba', mot('#f8f0e0', ['#ff8ab0', '#8ad8ff', '#ffe060', '#9aff8a'], .08)), tile5('bizcochoAbajo', mot('#e8b870', ['#d8a058'], .3)), tile5('bizcochoLado', (x, y, r) => y < 4 ? (y === 3 && x % 4 === 1 ? '#f8f0e0' : '#fff8ec') : y === 9 ? '#ff7aa8' : sombra('#e8b870', (r() - .5) * .12))], { dur: .6, color: '#e8b870', cat: 'catDeco' });
bloque5(1314, 'CREMA', 'Crema', 'Frosting', 'Cobertura', [tile5('crema', (x, y, r) => (Math.sin(x * .8 + y * .5) > .8 ? '#ffd0e4' : sombra('#ffe6f0', (r() - .5) * .05)))], { dur: .4, color: '#ffe6f0', cat: 'catDeco' });
bloque5(1315, 'CHOCOLATE', 'Bloque de chocolate', 'Chocolate block', 'Bloco de chocolate', [tile5('chocolate', (x, y, r) => (x % 8 === 0 || y % 8 === 0) ? '#3a1e10' : (x % 8 === 1 || y % 8 === 1) ? '#7a4a2a' : sombra('#5a321a', (r() - .5) * .06))], { dur: 1, color: '#5a321a', cat: 'catDeco' });
bloque5(1316, 'CARAMELO_R', 'Caramelo rayado rojo', 'Red striped candy', 'Bala listrada vermelha', [tile5('carameloR', (x, y) => ((x + y) % 8 < 4) ? '#e8303a' : '#fff6f6')], { dur: .8, color: '#e8303a', cat: 'catDeco' });
bloque5(1317, 'CARAMELO_V', 'Caramelo rayado verde', 'Green striped candy', 'Bala listrada verde', [tile5('carameloV', (x, y) => ((x - y + 16) % 8 < 4) ? '#3ac85a' : '#f6fff6')], { dur: .8, color: '#3ac85a', cat: 'catDeco' });
bloque5(1318, 'GOMITA_R', 'Gomita roja', 'Red gummy', 'Goma vermelha', [tile5('gomitaR', (x, y) => (x === y + 2 || x === y + 3) && x < 12 ? '#ffb0b8' : (x === 0 || y === 0 || x === 15 || y === 15) ? '#c81a3a' : '#f0384e')], { dur: .5, trans: true, color: '#f0384e', cat: 'catDeco' });
bloque5(1319, 'GOMITA_V', 'Gomita verde', 'Green gummy', 'Goma verde', [tile5('gomitaV', (x, y) => (x === y + 2 || x === y + 3) && x < 12 ? '#c0ffb8' : (x === 0 || y === 0 || x === 15 || y === 15) ? '#1aa83a' : '#3ae05a')], { dur: .5, trans: true, color: '#3ae05a', cat: 'catDeco' });
bloque5(1320, 'GOMITA_A', 'Gomita naranja', 'Orange gummy', 'Goma laranja', [tile5('gomitaA', (x, y) => (x === y + 2 || x === y + 3) && x < 12 ? '#ffe0a8' : (x === 0 || y === 0 || x === 15 || y === 15) ? '#e0700a' : '#ffa030')], { dur: .5, trans: true, color: '#ffa030', cat: 'catDeco' });
bloque5(1321, 'ALGODON', 'Algodón de azúcar', 'Cotton candy', 'Algodão-doce', [tile5('algodon', (x, y, r) => { const v = r(); return v < .15 ? '#ffd8ec' : v < .3 ? '#f8a8d0' : '#ffc0e0'; }, false)], { dur: .2, trans: true, color: '#ffc0e0', cat: 'catDeco' });
bloque5(1322, 'ALGODON_C', 'Algodón de azúcar celeste', 'Blue cotton candy', 'Algodão-doce azul', [tile5('algodonC', (x, y, r) => { const v = r(); return v < .15 ? '#e0f4ff' : v < .3 ? '#90ccf8' : '#b8e0ff'; }, false)], { dur: .2, trans: true, color: '#b8e0ff', cat: 'catDeco' });
bloque5(1323, 'MENTA', 'Caramelo de menta', 'Mint swirl', 'Bala de menta', [tile5('menta', (x, y) => { const a = Math.atan2(y - 7.5, x - 7.5), d = Math.hypot(x - 7.5, y - 7.5); return (Math.floor((a + d * .45) / (Math.PI / 4)) + 8) % 2 ? '#ffffff' : '#3ad0a0'; })], { dur: .8, color: '#3ad0a0', cat: 'catDeco' });
bloque5(1324, 'GALLETA', 'Galleta', 'Cookie', 'Biscoito', [tile5('galleta', (x, y, r) => [[3, 4], [11, 3], [7, 9], [12, 12], [3, 12]].some(([a, b]) => Math.abs(x - a) + Math.abs(y - b) < 2) ? '#4a2a14' : sombra('#d8a060', (r() - .5) * .14))], { dur: .6, color: '#d8a060', cat: 'catDeco' });
bloque5(1325, 'PALO_DULCE', 'Palito de dulce', 'Candy stick', 'Palito de doce', [tile5('paloDulce', (x, y, r) => sombra('#fbf6ee', (r() - .5) * .04 + (x % 4 === 0 ? -.05 : 0)))], { dur: .5, color: '#fbf6ee', cat: 'catDeco' });
// luna
bloque5(1326, 'POLVO_LUNAR', 'Polvo lunar', 'Moon dust', 'Poeira lunar', [tile5('polvoLunar', mot('#b8b8bc', ['#a0a0a6', '#cacacd', '#8e8e94'], .3))], { dur: .7, color: '#b8b8bc', cat: 'catNaturaleza' });
bloque5(1327, 'ROCA_LUNAR', 'Roca lunar', 'Moon rock', 'Rocha lunar', [tile5('rocaLunar', (x, y, r) => [[4, 4], [11, 9], [5, 12]].some(([a, b]) => Math.hypot(x - a, y - b) < 2.2) ? '#6e6e76' : sombra('#8c8c94', (r() - .5) * .12))], { dur: 3, req: 1, color: '#8c8c94' });
// el portal
bloque5(1330, 'PORTAL_V', 'Portal de viaje', 'Travel portal', 'Portal de viagem', [tile5('portalV', (x, y) => { const dx = x - 7.5, dy = y - 7.5, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx); if (x === 0 || y === 0 || x === 15 || y === 15) return '#2a1a6a'; const k = Math.floor((a * 2 + d * .9) * 1.2) % 4; return d < 1.6 ? '#ffffff' : ['#7a4aff', '#b07aff', '#4ad8ff', '#ff7ae0'][(k + 4) % 4]; }, false)], { dur: 1, trans: true, solido: false, luz: 13, suelta: 0, color: '#7a4aff', cat: 'catMec' });

try { atlasTex.needsUpdate = true; } catch (e) {}
for (const es in N5) for (const l of ['en', 'pt']) { NOMBRES[l] = NOMBRES[l] || {}; NOMBRES[l][es] = N5[es][l]; }
RECETAS.push([[B.MICELIO, 1], [[B.TIERRA, 1], [B.HONGO_R, 1]]], [[B.PASTO_SECO, 1], [[B.PASTO, 1], [B.ARENA, 1]]], [[B.CHOCOLATE, 4], [[B.TIERRA, 2], [I.CARBON, 1]]], [[B.ROCA_VOLC, 4], [[B.PIEDRA, 4], [I.CARBON, 1]]]);

// ═════════ CRIATURAS NUEVAS (diseños propios) ═════════
const Mc = c => matA(parseInt(c.slice(1), 16));
// Jirafa (sabana)
TIPOS.jirafa = { vida: 16, an: .45, al: 3.1, vel: 1.1, peso: .4, color: '#f2c050',
  armar(g) { const m = Mc('#f2c050'), mc = Mc('#9a5a20'), ne = Mc('#1d1d21'), cr = Mc('#5a3a1a');
    caja(g, .62, .58, 1.0, 0, 1.55, 0, m); for (const [x, y, z] of [[.32, 1.6, .2], [-.32, 1.5, -.2], [.32, 1.45, -.3], [-.32, 1.65, .3], [0, 1.85, -.1], [0, 1.85, .3]]) caja(g, x ? .02 : .3, .16, x ? .18 : .2, x, y, z, mc);
    const cu = caja(g, .26, 1.3, .26, 0, 2.3, .52, m); caja(cu, .28, .12, .1, 0, .2, -.1, mc); caja(cu, .28, .12, .1, 0, -.25, .1, mc);
    caja(g, .32, .3, .52, 0, 3.02, .72, m); caja(g, .22, .18, .18, 0, 2.96, 1.02, Mc('#e8b040')); for (const s of [-1, 1]) { caja(g, .05, .16, .05, s * .09, 3.24, .6, cr); caja(g, .05, .06, .02, s * .14, 3.06, .92, ne); caja(g, .1, .05, .12, s * .2, 3.1, .58, m); }
    caja(g, .06, .4, .06, 0, 1.45, -.52, mc);
    return [[.2, .36], [-.2, -.36], [-.2, .36], [.2, -.36]].map(([x, z]) => pata(g, .14, 1.26, .14, x, 1.28, z, m)); },
  suelta: () => [] };
// Elefante (sabana)
TIPOS.elefante = { vida: 40, an: .75, al: 2.3, vel: .8, peso: .6, color: '#8a8c96',
  armar(g) { const m = Mc('#8a8c96'), m2 = Mc('#767882'), bl = Mc('#f4f0e4'), ne = Mc('#1d1d21'), ro = Mc('#e8a0a8');
    caja(g, 1.3, 1.2, 1.9, 0, 1.6, 0, m); caja(g, .9, .9, .7, 0, 2.0, 1.1, m);
    const tr = caja(g, .26, 1.0, .26, 0, 1.3, 1.5, m2); tr.rotation.x = .15; caja(g, .2, .2, .2, 0, .82, 1.6, m2);
    for (const s of [-1, 1]) { const o = caja(g, .1, .8, .7, s * .55, 2.0, .95, m2); o.rotation.y = s * .35; caja(g, .03, .5, .45, s * .6, 2.0, .98, ro); const c = caja(g, .1, .1, .5, s * .26, 1.5, 1.5, bl); c.rotation.x = -.4; caja(g, .08, .1, .03, s * .24, 2.15, 1.46, ne); }
    caja(g, .08, .5, .08, 0, 1.7, -.98, m2);
    return [[.42, .62], [-.42, -.62], [-.42, .62], [.42, -.62]].map(([x, z]) => pata(g, .38, 1.0, .38, x, 1.02, z, m2)); },
  suelta: () => [] };
// Hongín (bosque de hongos): un hongo chiquito que camina y salta
TIPOS.hongin = { vida: 6, an: .25, al: .8, vel: 1.2, peso: .25, color: '#d42a2a',
  armar(g) { const r = Mc('#d42a2a'), bl = Mc('#fff4ec'), cu = Mc('#efe6d6'), ne = Mc('#1d1d21'), me = Mc('#ff9aa0');
    caja(g, .34, .34, .32, 0, .42, 0, cu); caja(g, .62, .22, .62, 0, .7, 0, r); caja(g, .44, .1, .44, 0, .85, 0, r);
    for (const [x, z] of [[.18, .1], [-.16, -.12], [.05, -.22], [-.2, .18], [.22, -.2]]) caja(g, .1, .04, .1, x, .82, z, bl);
    for (const s of [-1, 1]) { caja(g, .07, .09, .02, s * .08, .46, .165, ne); caja(g, .06, .04, .02, s * .14, .38, .165, me); }
    return [[.09, 0], [-.09, 0]].map(([x, z]) => pata(g, .1, .25, .12, x, .26, z, cu)); },
  tick(a, dt) { const u = a.userData; if (u.suelo && Math.random() < dt * .6) u.vy = 4.5; },
  suelta: () => [[B.HONGO_R, 1]] };
// Pingüino (reino de hielo)
TIPOS.pinguino = { vida: 6, an: .25, al: .9, vel: .9, peso: .25, color: '#1d1d24',
  armar(g) { const ne = Mc('#1d1d24'), bl = Mc('#f6f6f6'), na = Mc('#ff9a2e'), oj = Mc('#ffffff');
    caja(g, .44, .6, .4, 0, .5, 0, ne); caja(g, .32, .48, .06, 0, .46, .2, bl); caja(g, .36, .3, .34, 0, .92, .02, ne);
    caja(g, .12, .06, .14, 0, .9, .24, na); for (const s of [-1, 1]) { caja(g, .07, .07, .02, s * .09, .98, .195, oj); caja(g, .035, .04, .02, s * .09, .975, .205, ne); const al = caja(g, .06, .4, .2, s * .25, .55, 0, ne); al.rotation.z = s * .2; }
    return [[.1, .06], [-.1, .06]].map(([x, z]) => pata(g, .12, .2, .18, x, .2, z, na)); },
  tick(a, dt) { const u = a.userData; u.bal = (u.bal || 0) + dt * (u.camina ? 9 : 2); a.rotation.z = Math.sin(u.bal) * (u.camina ? .12 : .03); },
  suelta: () => [] };
// Osito de gomita (mundo de dulces): traslúcido y de colores
TIPOS.ositoGomita = { vida: 6, an: .25, al: .8, vel: 1.1, peso: .25, color: '#f0384e',
  armar(g) { const c = ['#f0384e', '#3ae05a', '#ffa030', '#ffe040', '#b05aff'][Math.floor(Math.random() * 5)];
    const m = new THREE.MeshLambertMaterial({ color: parseInt(c.slice(1), 16), transparent: true, opacity: .78 }), ne = Mc('#3a1020');
    caja(g, .38, .4, .3, 0, .42, 0, m); caja(g, .34, .3, .3, 0, .78, .02, m); for (const s of [-1, 1]) { caja(g, .1, .1, .08, s * .13, .96, 0, m); caja(g, .05, .05, .02, s * .07, .82, .17, ne); const b = caja(g, .1, .24, .1, s * .23, .48, .06, m); b.rotation.z = s * .5; }
    caja(g, .12, .08, .06, 0, .74, .18, m);
    return [[.1, 0], [-.1, 0]].map(([x, z]) => pata(g, .12, .22, .12, x, .24, z, m)); },
  tick(a, dt) { const u = a.userData; if (u.suelo && Math.random() < dt * .5) u.vy = 5; },
  suelta: () => [] };
try {
  Object.assign(NOM_CRIA.es || {}, { jirafa: 'Jirafa', elefante: 'Elefante', hongin: 'Hongín', pinguino: 'Pingüino', ositoGomita: 'Osito de gomita' });
  Object.assign(NOM_CRIA.en || {}, { jirafa: 'Giraffe', elefante: 'Elephant', hongin: 'Shroomling', pinguino: 'Penguin', ositoGomita: 'Gummy bear' });
  Object.assign(NOM_CRIA.pt || {}, { jirafa: 'Girafa', elefante: 'Elefante', hongin: 'Cogumelinho', pinguino: 'Pinguim', ositoGomita: 'Ursinho de goma' });
  GRUPOS_CRIA[1][1].push('jirafa', 'elefante', 'hongin', 'pinguino', 'ositoGomita');
} catch (e) {}

// ═════════ TEXTOS ═════════
Object.assign(TX.es, { bio_canon: 'CAÑÓN ROJO', bio_cerezos: 'BOSQUE DE CEREZOS', bio_hongos: 'BOSQUE DE HONGOS GIGANTES', bio_sabana: 'SABANA', bio_volcan: 'VOLCÁN', bio_arrecife: 'ARRECIFE DE CORAL' });
Object.assign(TX.en, { bio_canon: 'RED CANYON', bio_cerezos: 'CHERRY GROVE', bio_hongos: 'GIANT MUSHROOM FOREST', bio_sabana: 'SAVANNA', bio_volcan: 'VOLCANO', bio_arrecife: 'CORAL REEF' });
Object.assign(TX.pt, { bio_canon: 'CÂNION VERMELHO', bio_cerezos: 'BOSQUE DE CEREJEIRAS', bio_hongos: 'FLORESTA DE COGUMELOS GIGANTES', bio_sabana: 'SAVANA', bio_volcan: 'VULCÃO', bio_arrecife: 'RECIFE DE CORAL' });

// ═════════ GENERACIÓN 5: los biomas nuevos en el mundo normal ═════════
let ZONAS = [];
const NO_SUELO = new Set(); for (const k in DEF) { const d = DEF[k], n = d.nombre || ''; if (d.planta || /^(Hojas|Tronco)/.test(n) || +k === B.CACTUS || +k === B.ENREDADERA) NO_SUELO.add(+k); }
function generarBiomas5(S) {
  ZONAS = [];
  const at = (x, y, z) => dentro(x, y, z) ? mundo[idx(x, y, z)] : 0, put = (x, y, z, t) => { if (dentro(x, y, z)) mundo[idx(x, y, z)] = t; };
  const R = (a, b, c) => h3(a, b, c, S + 5150);
  const F = SX / 160;
  // altura del suelo (sin árboles ni plantas)
  const suelo = (x, z) => { for (let y = SY - 1; y > 0; y--) { const t = at(x, y, z); if (t && !NO_SUELO.has(t) && t !== B.AGUA) return y; if (t === B.AGUA) return -y; } return 0; };
  const prof = (x, z) => { if (at(x, SEA, z) !== B.AGUA) return 0; let y = SEA; while (y > 1 && at(x, y, z) === B.AGUA) y--; return SEA - y; };
  const limpiarArriba = (x, y, z) => { for (let k = y + 1; k < SY; k++) { const t = at(x, k, z); if (!t) continue; if (NO_SUELO.has(t)) put(x, k, z, B.AIRE); } };
  // lugares que no hay que tocar: aparición, aldeas y estructuras
  const evitar = [{ x: spawn.x, z: spawn.z, r: 12 }];
  for (const a of aldeas || []) evitar.push({ x: a.x, z: a.z, r: 18 });
  for (const r of ruinas || []) evitar.push({ x: r.x, z: r.z, r: 6 });
  try { for (const e of window.__est.EST.lista) evitar.push({ x: e.x, z: e.z, r: (e.r || 8) + 3 }); } catch (e) {}
  if (typeof ejemploFaro !== 'undefined' && ejemploFaro) evitar.push({ x: ejemploFaro.x, z: ejemploFaro.z, r: 10 });
  const libreDe = (x, z, r) => evitar.every(e => Math.hypot(x - e.x, z - e.z) > r + e.r);
  // elegir el centro de cada bioma: mucha tierra (o mucho mar para el arrecife), lejos de lo demás
  const elegir = (k, r0, quiereMar, gusto) => { for (const f of [1, .8, .62]) { const z = elegir1(k, Math.max(7, Math.round(r0 * f)), quiereMar, gusto); if (z) return z; } return null; };
  const elegir1 = (k, r, quiereMar, gusto) => {
    let mejor = null, mp = -1;
    for (let n = 0; n < 900; n++) {
      const x = Math.floor(r + 3 + R(n, 1, k.length) * (SX - 2 * r - 6)), z = Math.floor(r + 3 + R(n, 2, k.length) * (SZ - 2 * r - 6));
      if (!libreDe(x, z, r)) continue;
      let bien = 0, tot = 0, extra = 0;
      for (let a = 0; a < 16; a++) for (const f of [.35, .7, 1]) { const xx = Math.round(x + Math.cos(a / 16 * 6.283) * r * f), zz = Math.round(z + Math.sin(a / 16 * 6.283) * r * f), h = suelo(xx, zz); tot++;
        if (quiereMar ? (prof(xx, zz) >= 2 && prof(xx, zz) <= 10) : h > SEA) bien++; if (gusto) extra += gusto(xx, zz) ? 1 : 0; }
      const p = bien / tot + extra / tot * .4 + R(n, 3, 9) * .05;
      if (bien / tot >= (quiereMar ? .7 : .72) && p > mp) { mp = p; mejor = { k, x, z, r }; }
    }
    if (mejor) { ZONAS.push(mejor); evitar.push({ x: mejor.x, z: mejor.z, r: mejor.r + 3 }); }
    return mejor;
  };
  const bio = (x, z) => (typeof biomaDe === 'function' && biomaDe) ? biomaDe(x, z) : 0;
  elegir('volcan', Math.round(11 * F), false, null);
  elegir('canon', Math.round(13 * F), false, (x, z) => bio(x, z) === 1);
  elegir('sabana', Math.round(13 * F), false, (x, z) => bio(x, z) === 0);
  elegir('cerezos', Math.round(12 * F), false, (x, z) => bio(x, z) === 0);
  elegir('hongos', Math.round(11 * F), false, (x, z) => bio(x, z) === 4 || bio(x, z) === 0);
  elegir('arrecife', Math.round(12 * F), true, null);
  // ¿la columna está dentro del bioma? (borde irregular)
  const dentroZ = (Z, x, z) => { const d = Math.hypot(x - Z.x, z - Z.z); return d < Z.r * (.78 + vn2(x / 6, z / 6, S + 5160 + Z.k.length) * .32); };
  const recorrer = (Z, f) => { for (let x = Math.max(1, Z.x - Z.r - 3); x < Math.min(SX - 1, Z.x + Z.r + 4); x++) for (let z = Math.max(1, Z.z - Z.r - 3); z < Math.min(SZ - 1, Z.z + Z.r + 4); z++) if (dentroZ(Z, x, z)) f(x, z); };
  const capas = [B.TERRACOTA_5, B.TERRACOTA_6, B.TERRACOTA_6, B.TERRACOTA_7, B.TERRACOTA_0, B.TERRACOTA_4, B.TERRACOTA_5, B.ARENISCA_R, B.TERRACOTA_6];

  for (const Z of ZONAS) {
    if (Z.k === 'canon') recorrer(Z, (x, z) => {
      const g = suelo(x, z); if (g <= SEA) return;
      const n = vn2(x / 9, z / 9, S + 5170), d = Math.hypot(x - Z.x, z - Z.z) / Z.r;
      let h = g; if (n > .5) h = g + Math.round((n - .5) * 2 * 9 / 3) * 3 * Math.max(0, 1 - d * .8); else if (n < .32) h = Math.max(SEA + 1, g - 2);
      h = Math.min(SY - 6, Math.round(h));
      for (let y = Math.max(1, g - 6); y <= h; y++) put(x, y, z, capas[(y + 60) % capas.length]);
      for (let y = h + 1; y < SY; y++) { const t = at(x, y, z); if (t && t !== B.AGUA) put(x, y, z, B.AIRE); }
      if (h < g + 2) put(x, h, z, B.ARENA_R);
      if (h <= g + 1 && R(x, 7, z) < .015) for (let k = 1; k <= 2; k++) put(x, h + k, z, B.CACTUS);
      if (h > g + 2 && R(x, h, z) < .04) put(x, h - 1 - Math.floor(R(x, 8, z) * 3), z, B.ORO_M);
    });
    if (Z.k === 'cerezos' || Z.k === 'hongos' || Z.k === 'sabana') recorrer(Z, (x, z) => {
      const g = suelo(x, z); if (g <= SEA) return; limpiarArriba(x, g, z);
      put(x, g, z, Z.k === 'cerezos' ? B.PASTO : Z.k === 'hongos' ? B.MICELIO : B.PASTO_SECO);
      const v = R(x, 11, z);
      if (Z.k === 'cerezos') { if (v < .22) put(x, g + 1, z, B.PETALOS); else if (v < .25) put(x, g + 1, z, B.TULIPAN_P); else if (v < .27) put(x, g + 1, z, B.FLOR_R); }
      if (Z.k === 'hongos') { if (v < .05) put(x, g + 1, z, B.HONGO_LUZ); else if (v < .09) put(x, g + 1, z, v < .07 ? B.HONGO_R : B.HONGO_M); }
      if (Z.k === 'sabana') { if (v < .2) put(x, g + 1, z, B.PASTO_ALTO_SECO); }
    });
    // árboles y hongos gigantes
    if (Z.k === 'cerezos') { let n = 0; for (let k = 0; k < 400 && n < Math.round(14 * F * F); k++) { const x = Math.round(Z.x + (R(k, 21, 1) - .5) * 2 * Z.r * .85), z = Math.round(Z.z + (R(k, 22, 1) - .5) * 2 * Z.r * .85);
      if (!dentroZ(Z, x, z)) continue; const g = suelo(x, z); if (g <= SEA || at(x, g, z) !== B.PASTO) continue; if (ZONAS.some(o => o !== Z && Math.hypot(x - o.x, z - o.z) < o.r)) continue;
      let lejos = true; for (let a = -3; a <= 3 && lejos; a++) for (let b = -3; b <= 3; b++) if (at(x + a, g + 2, z + b) === B.TRONCO_CEREZO) { lejos = false; break; } if (!lejos) continue;
      n++; const alto = 4 + Math.floor(R(x, 23, z) * 3), dx = R(x, 24, z) < .5 ? 1 : -1;
      for (let h = 1; h <= alto; h++) put(x + (h > alto - 1 ? dx : 0), g + h, z, B.TRONCO_CEREZO);
      const cx = x + dx, cy = g + alto + 1;
      for (let a = -3; a <= 3; a++) for (let b = -1; b <= 2; b++) for (let c = -3; c <= 3; c++) { const d = Math.hypot(a, b * 1.6, c); if (d < 3.2 && R(cx + a, cy + b, z + c) < .93 && !at(cx + a, cy + b, z + c)) put(cx + a, cy + b, z + c, B.HOJAS_CEREZO); }
      for (let a = -2; a <= 2; a++) for (let c = -2; c <= 2; c++) if (R(a + x, 31, c + z) < .25 && !at(cx + a, cy - 2, z + c)) put(cx + a, cy - 2, z + c, B.HOJAS_CEREZO);
    } }
    if (Z.k === 'hongos') { let n = 0; for (let k = 0; k < 400 && n < Math.round(9 * F * F); k++) { const x = Math.round(Z.x + (R(k, 41, 1) - .5) * 2 * Z.r * .8), z = Math.round(Z.z + (R(k, 42, 1) - .5) * 2 * Z.r * .8);
      if (!dentroZ(Z, x, z)) continue; const g = suelo(x, z); if (g <= SEA || at(x, g, z) !== B.MICELIO) continue;
      let lejos = true; for (let a = -4; a <= 4 && lejos; a++) for (let b = -4; b <= 4; b++) if (at(x + a, g + 2, z + b) === B.TALLO_HONGO) { lejos = false; break; } if (!lejos) continue;
      n++; const rojo = R(x, 43, z) < .55, alto = 5 + Math.floor(R(x, 44, z) * 4);
      for (let h = 1; h <= alto; h++) put(x, g + h, z, B.TALLO_HONGO);
      const top = g + alto;
      if (rojo) { for (let a = -3; a <= 3; a++) for (let b = 0; b <= 2; b++) for (let c = -3; c <= 3; c++) { const d = Math.hypot(a, c); const lim = [3.4, 2.7, 1.6][b]; if (d <= lim && (b === 2 || d > lim - 1.2 || b === 0 && d > 2.2)) put(x + a, top + b, z + c, B.SOMBRERO_R); }
        for (let a = -3; a <= 3; a++) for (let c = -3; c <= 3; c++) { const d = Math.hypot(a, c); if (d > 2.3 && d <= 3.4) put(x + a, top - 1, z + c, B.SOMBRERO_R); } }
      else { for (let a = -4; a <= 4; a++) for (let c = -4; c <= 4; c++) { const d = Math.hypot(a, c); if (d <= 4.2) put(x + a, top + 1, z + c, B.SOMBRERO_M); } }
      put(x, top + (rojo ? 0 : 0), z, B.TALLO_HONGO);
      if (R(x, 45, z) < .5) put(x + 1, g + 1, z, B.HONGO_LUZ);
    } }
    if (Z.k === 'sabana') { let n = 0; for (let k = 0; k < 400 && n < Math.round(6 * F * F); k++) { const x = Math.round(Z.x + (R(k, 61, 1) - .5) * 2 * Z.r * .8), z = Math.round(Z.z + (R(k, 62, 1) - .5) * 2 * Z.r * .8);
      if (!dentroZ(Z, x, z)) continue; const g = suelo(x, z); if (g <= SEA || at(x, g, z) !== B.PASTO_SECO) continue;
      let lejos = true; for (let a = -5; a <= 5 && lejos; a++) for (let b = -5; b <= 5; b++) if (at(x + a, g + 2, z + b) === B.TRONCO_ACACIA) { lejos = false; break; } if (!lejos) continue;
      n++; const dx = R(x, 63, z) < .5 ? 1 : -1, dz = R(x, 64, z) < .5 ? 1 : -1;
      for (let h = 1; h <= 3; h++) put(x, g + h, z, B.TRONCO_ACACIA);
      put(x + dx, g + 4, z, B.TRONCO_ACACIA); put(x + dx * 2, g + 5, z + dz, B.TRONCO_ACACIA);
      const cx = x + dx * 2, cz2 = z + dz, cy = g + 6;
      for (let a = -3; a <= 3; a++) for (let c = -3; c <= 3; c++) if (Math.abs(a) + Math.abs(c) <= 4 && !at(cx + a, cy, cz2 + c)) put(cx + a, cy, cz2 + c, B.HOJAS_ACACIA);
      for (let a = -1; a <= 1; a++) for (let c = -1; c <= 1; c++) put(cx + a, cy + 1, cz2 + c, B.HOJAS_ACACIA);
    } }
    if (Z.k === 'volcan') {
      let base = 99; recorrer(Z, (x, z) => { const g = suelo(x, z); if (g > SEA) base = Math.min(base, g); }); if (base === 99) base = SEA + 1;
      const pico = Math.min(SY - 4, base + Math.round(Z.r * 1.75));
      for (let x = Z.x - Z.r - 2; x <= Z.x + Z.r + 2; x++) for (let z = Z.z - Z.r - 2; z <= Z.z + Z.r + 2; z++) {
        if (!dentro(x, 1, z)) continue; const d = Math.hypot(x - Z.x, z - Z.z) + vn2(x / 3, z / 3, S + 5180) * 1.2; if (d > Z.r + 1) continue;
        const g = Math.abs(suelo(x, z)), t = Math.round(pico - (d / Z.r) * (pico - base) * (1 + (d / Z.r) * .25)); const top = Math.max(t, Math.min(g, t));
        if (top <= g && d > Z.r * .9) continue;
        const crater = d < 2.6;
        const hTop = crater ? pico - 3 : top;
        for (let y = 1; y <= hTop; y++) { const h = h3(x, y, z, S + 5181); put(x, y, z, y === hTop ? (crater ? B.LAVA : (d < 3.6 ? B.OBSIDIANA : h < .25 ? B.CENIZA : h < .5 ? B.BASALTO : B.ROCA_VOLC)) : y > hTop - 3 ? B.ROCA_VOLC : B.PIEDRA); }
        if (crater) put(x, hTop - 1, z, B.MAGMA);
        for (let y = hTop + 1; y < SY; y++) { const q = at(x, y, z); if (q && q !== B.AGUA) put(x, y, z, B.AIRE); }
      }
      // ríos de magma que bajan por las laderas
      for (let k = 0; k < 4; k++) { const a = R(k, 71, 3) * 6.283; for (let d = 3; d < Z.r * .9; d += .5) { const x = Math.round(Z.x + Math.cos(a + Math.sin(d * .5) * .15) * d), z = Math.round(Z.z + Math.sin(a + Math.sin(d * .5) * .15) * d); let y = SY - 1; while (y > 1 && !at(x, y, z)) y--; if (at(x, y, z) !== B.LAVA) put(x, y, z, B.MAGMA); } }
      Z.pico = pico;
    }
    if (Z.k === 'arrecife') {
      recorrer(Z, (x, z) => { let y = SEA; while (y > 1 && at(x, y, z) === B.AGUA) y--; const prof = SEA - y; if (prof < 2 || prof > 12 || at(x, SEA, z) !== B.AGUA) return;
        const v = R(x, 81, z), c = B.CORAL + Math.floor(R(x, 82, z) * 3);
        put(x, y, z, v < .55 ? c : B.ARENA);
        if (v < .12 && prof >= 4) { const alto = 1 + Math.floor(R(x, 83, z) * Math.min(4, prof - 2)); for (let k = 1; k <= alto; k++) put(x, y + k, z, c); }
        else if (v < .5 && typeof decor !== 'undefined') decor.push([x, y + 1, z, 'abanico' + Math.floor(R(x, 84, z) * 3), 1]);
        else if (v < .6 && prof >= 4 && typeof decor !== 'undefined') decor.push([x, y + 1, z, 'alga', Math.max(1, Math.min(prof - 1, 3))]);
        if (v > .985) put(x, y + 1, z, B.PERLA_LUZ); });
    }
  }
}

// los mundos nuevos nacen con generación 5
crearMundo = function (modo, ejemplo = false) {
  const lista = leerLista(), id = Date.now().toString(36), n = lista.length + 1;
  lista.unshift({ id, nombre: 'Mundo ' + n, num: n, modo, ejemplo, tam: ejemplo ? 160 : (window.tamNuevo || 160), semilla: ejemplo ? SEMILLA_EJEMPLO : (Math.random() * 2147483647) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0, gen: ejemplo ? 2 : 5 });
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  pantallaCompleta(); entrarMundo(id);
};
{ const p0 = prepararMundo; prepararMundo = function (S, ej) { ZONAS = []; const r = p0.apply(this, arguments);
    if ((window.genVersion || 1) >= 5 && !window.mundoTipo && !ej) { try { generarBiomas5(S); } catch (e) { console.error(e); } }
    return r; }; }
// animales propios de cada bioma (solo la primera vez que se entra al mundo)
{ const t0 = terminarCarga; terminarCarga = function (guardados) { const r = t0.apply(this, arguments);
    if (!guardados && ZONAS.length && !window.mundoTipo) try { ponerAnimalesZonas(); } catch (e) { console.error(e); }
    return r; }; }
function sueloEn(x, z) { for (let y = SY - 2; y > 0; y--) { const t = get(x, y, z); if (t && DEF[t] && DEF[t].solido && !NO_SUELO.has(t)) return t === B.AGUA ? -1 : y + 1; } return -1; }
function ponerAnimalesZonas() {
  const lista = { sabana: [['jirafa', 3], ['elefante', 2]], hongos: [['hongin', 5]], cerezos: [['conejo', 3]] };
  for (const Z of ZONAS) for (const [t, n] of lista[Z.k] || []) for (let k = 0, puestos = 0; k < 40 && puestos < n; k++) {
    const x = Math.floor(Z.x + (Math.random() - .5) * Z.r * 1.2), z = Math.floor(Z.z + (Math.random() - .5) * Z.r * 1.2), y = sueloEn(x, z);
    if (y < SEA + 1 || get(x, y, z) || get(x, y + 1, z)) continue; crearAnimal(t, x + .5, y, z + .5); puestos++; }
}

// ═════════ AL ENTRAR A UN BIOMA: cartelito con el nombre; el volcán echa humo ═════════
let zonaAct = null, zonaT = 0, humoT = 0;
const humoMat = new THREE.MeshBasicMaterial({ color: 0x8a8890, transparent: true, opacity: .55 });
function biomasFrame(dt) {
  if (!jugando || pausado || window.mundoTipo) { zonaAct = null; return; }
  zonaT -= dt; if (zonaT <= 0) { zonaT = .5; const Z = J.y > SEA - 3 ? ZONAS.find(Z => Math.hypot(J.x - Z.x, J.z - Z.z) < Z.r * .75) : null; const k = Z ? Z.k : null;
    if (k !== zonaAct) { zonaAct = k; if (k) aviso(TR('bio_' + k), 2200); } }
  const V = ZONAS.find(Z => Z.k === 'volcan' && Z.pico); if (!V || Math.hypot(J.x - V.x, J.z - V.z) > 90) return;
  humoT -= dt; if (humoT <= 0) { humoT = .18; const m = new THREE.Mesh(geoP, humoMat); m.scale.setScalar(2 + Math.random() * 2); m.position.set(V.x + .5 + (Math.random() - .5) * 2, V.pico + 1, V.z + .5 + (Math.random() - .5) * 2);
    m.userData = { t: 0, vy: 1.6 + Math.random(), vx: (Math.random() - .5) * .6, vz: (Math.random() - .5) * .6 }; escena.add(m); humos.push(m); }
}
const humos = [];
function moverHumo(dt) { for (let i = humos.length - 1; i >= 0; i--) { const m = humos[i], u = m.userData; u.t += dt; m.position.x += u.vx * dt; m.position.y += u.vy * dt; m.position.z += u.vz * dt; m.scale.multiplyScalar(1 + dt * .35); m.rotation.y += dt;
  if (u.t > 6 || !jugando || window.mundoTipo) { escena.remove(m); humos.splice(i, 1); } } }
{ const p0 = pjFrame; pjFrame = function (dt) { const r = p0.apply(this, arguments); try { biomasFrame(dt); moverHumo(dt); } catch (e) {} return r; }; }

window.__biomas = { zonas: () => ZONAS, B5, generarBiomas5 };
}
