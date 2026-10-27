'use strict';
// ═════════ BLOQUES NUEVOS (paquete grande) ═════════
// RANGOS DE IDS (el mundo guarda los bloques en 16 bits desde la versión con este archivo):
//   1–255      bloques de siempre (160–219 quedan para los mods, como antes)
//   100–131, 300–399   objetos (ITEM) de siempre
//   1024–1999  bloques nuevos de este archivo (losas y escalones incluidos)
//   2048–2099  objetos nuevos de este archivo (tintes y minerales)
// ATLAS (dibujos de 16×16): 0–255 los de siempre · 256–447 los de este archivo · 448–511 mods.
// Todos los dibujos son propios, hechos con píxeles por código.

{ // todo va dentro de este bloque para que los nombres de aquí no choquen con los de otros archivos
const B2 = {}, I2 = {};
let idB2 = 1024, idI2 = 2048, tileB2 = 256;
const TILE_B2_FIN = 447;
const N2 = {};   // nombres traducidos: { 'Nombre en español': { en, pt, tr, id, ar } }
function nombre2(es, en, pt, tr, id, ar) { N2[es] = { en, pt, tr, id, ar }; return es; }

// ─── dibujar en el atlas ───
const T2 = {};
function tile2(nombre, f, bisel = true) {
  if (tileB2 > TILE_B2_FIN) { console.warn('bloques2: no hay más lugar en el atlas'); return TL.piedra; }
  const n = tileB2++; TILES[n] = nombre; TL[nombre] = n; T2[nombre] = n; dibujarTile(n, f); if (bisel) biselar(n); return n;
}
const hexA = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mezcla = (a, b, k) => { const A = hexA(a), C = hexA(b); return '#' + A.map((v, i) => Math.round(v + (C[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
const ruido = (c, a = .07) => (x, y, r) => sombra(c, (r() - .5) * a * 2);
const moteado = (base, motas, d = .22) => (x, y, r, e) => r() < d ? e(motas) : sombra(base, (r() - .5) * .1);
const pulida = (base, borde) => (x, y, r) => (x === 0 || y === 0 || x === 15 || y === 15) ? borde : (x === 1 || y === 1) ? sombra(base, .08) : sombra(base, (r() - .5) * .05);
const ladrillos = (ladr, junta, alto = 4, ancho = 8) => (x, y, r) => { const fila = Math.floor(y / alto), off = fila % 2 ? ancho / 2 : 0;
  return (y % alto === alto - 1 || (x + off) % ancho === ancho - 1) ? junta : sombra(ladr, (r() - .5) * .14); };
const conMusgo = (f, musgo = ['#4f8a2e', '#5c9a34', '#3f7a26']) => (x, y, r, e) => { const c = f(x, y, r, e); const m = Math.sin(x * .9 + y * .4) + Math.cos(y * 1.3 - x * .3); return m > .9 && r() < .8 ? e(musgo) : c; };
const conGrietas = f => (x, y, r, e) => { const c = f(x, y, r, e); return ((x === 5 && y > 2 && y < 9) || (y === 9 && x > 4 && x < 11) || (x === 11 && y > 9 && y < 14)) ? sombra(c, -.35) : c; };
const tablones = (c, junta) => (x, y, r) => { const fila = Math.floor(y / 4), off = [0, 6, 3, 9][fila];
  if (y % 4 === 3) return junta; if ((x + off) % 12 === 11) return sombra(c, -.2); return sombra(c, (r() - .5) * .1 + (x % 5 === 0 ? -.04 : 0)); };
const troncoLado = (c, veta) => (x, y, r) => (x % 4 === 1 || (x % 4 === 3 && r() < .5)) ? veta : sombra(c, (r() - .5) * .14);
const troncoArriba = (anillo, centro, corteza) => (x, y) => { const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5)); return d > 6.5 ? corteza : Math.floor(d) % 2 ? anillo : centro; };
const hojas = (c, extra) => (x, y, r, e) => { const v = r(); return v < .12 ? sombra(c, -.25) : v < .2 ? sombra(c, .15) : extra && v > .96 ? extra : c; };
const plano = c => (x, y, r) => sombra(c, (r() - .5) * .05);
const terracota = c => (x, y, r) => sombra(c, (y % 5 === 0 ? -.06 : 0) + (r() - .5) * .06);
const vidrioColor = c => (x, y) => (x === 0 || y === 0 || x === 15 || y === 15) ? sombra(c, -.15) : (x === y + 3 || x === y + 4) ? sombra(c, .35) : ((x + y) % 7 === 0 ? c : null);
const mineral2 = (motas, base = '#7d86a0') => (x, y, r, e) => { const M = [[3, 4], [10, 3], [6, 9], [12, 11], [3, 12]]; return M.some(([a, b]) => Math.abs(x - a) + Math.abs(y - b) < 2) ? e(motas) : sombra(base, (r() - .5) * .12); };
const gema = (c, brillo) => (x, y, r) => (x === 0 || y === 0 || x === 15 || y === 15) ? sombra(c, -.3) : ((x + y) % 6 === 0 || (x - y + 16) % 6 === 0) ? brillo : sombra(c, (r() - .5) * .1);
// plantas (fondo transparente)
const flor = (petalo, centro, tallo = '#3f8a2e') => (x, y) => { const dx = x - 7.5, dy = y - 5.5, d = Math.hypot(dx, dy);
  if (d < 1.3) return centro; if (d < 3.6 && (Math.abs(dx) < 1.2 || Math.abs(dy) < 1.2 || d < 2.6)) return petalo;
  if ((x === 7 || x === 8) && y > 8) return tallo; if (y === 12 && x > 4 && x < 7) return tallo; if (y === 11 && x > 8 && x < 11) return tallo; return null; };
const tulipan = petalo => (x, y) => { if (y >= 2 && y <= 7 && x >= 5 && x <= 10) { if (y === 2 && (x === 7 || x === 8)) return null; if (y <= 3 && (x === 5 || x === 10)) return null; return x === 6 || y === 6 ? sombra(petalo, -.15) : petalo; }
  if ((x === 7 || x === 8) && y > 7) return '#3f8a2e'; if ((y === 11 && x === 6) || (y === 12 && x === 5) || (y === 10 && x === 9) || (y === 11 && x === 10)) return '#4f9a34'; return null; };
const hongo = (sombrero, puntos) => (x, y) => { if (y >= 5 && y <= 8 && Math.abs(x - 7.5) < 5.5 - (8 - y) * .7) return puntos && ((x + y) % 4 === 0) ? puntos : sombrero; if (y > 8 && y < 15 && x >= 6 && x <= 9) return x === 6 ? '#d8cdb8' : '#efe6d2'; return null; };
const helecho = (x, y) => { const cx = 7.5 + Math.sin(y * .5) * .8; if (Math.abs(x - cx) < .8 && y > 1) return '#2f7a26'; const h = Math.abs(x - cx); return (y > 1 && y < 15 && h < (14 - Math.abs(y - 8)) / 2.2 && (x + y) % 2 === 0) ? (y % 3 ? '#3f9a34' : '#4fae3a') : null; };
const lavanda = (x, y) => { for (const cx of [4, 8, 12]) { if (Math.abs(x - cx) < .6 && y > 6) return '#4f8a3a'; if (Math.abs(x - cx) < 1.6 && y > 1 && y < 7 && (x + y) % 2 === 0) return y % 2 ? '#9a6ae0' : '#b88af2'; } return null; };
const cana = (x, y) => { for (const cx of [3, 9]) if (x >= cx && x <= cx + 2) return y % 6 === 0 ? '#3a7a20' : x === cx ? '#5aa83a' : '#7ccc4c'; if ((x === 6 || x === 13) && y % 6 === 2) return '#5aa83a'; return null; };

// ─── definiciones ───
function bloque2(clave, es, tr6, tiles, o = {}) { const id = idB2++; B2[clave] = id; B[clave] = id; nombre2(es, ...tr6); def(id, es, tiles, o); TODOS.push(id); return id; }
function objeto2(clave, es, tr6, tile, o = {}) { const id = idI2++; I2[clave] = id; I[clave] = id; nombre2(es, ...tr6); item(id, es, tile, o); TODOS.push(id); return id; }
// losa + escalón de un bloque (usa la misma lógica que las losas y escalones de siempre)
function formas2(base, esLosa, esEsc, tr6Losa, tr6Esc) {
  const md = DEF[base], o = { dur: md.dur * .7, req: md.req, color: md.color, base, cat: 'catConstruir' };
  const losa = idB2++, losaA = idB2++, esc = idB2, escI = idB2 + 4; idB2 += 8;
  def(losa, esLosa, md.tiles.slice(), Object.assign({ forma: [[0, 0, 0, 1, .5, 1]], losaArr: losaA, icono: [[0, 0, 0, 1, .5, 1]] }, o));
  def(losaA, esLosa, md.tiles.slice(), Object.assign({ forma: [[0, .5, 0, 1, 1, 1]], suelta: losa, losaArr: losaA, losaArriba: true }, o));
  for (let d = 0; d < 4; d++) {
    def(esc + d, esEsc, md.tiles.slice(), Object.assign({ forma: [[0, 0, 0, 1, .5, 1], CAJA_ESC[d]], suelta: esc, escB: esc, escI }, o));
    def(escI + d, esEsc, md.tiles.slice(), Object.assign({ forma: [[0, .5, 0, 1, 1, 1], CAJA_ESC_INV[d]], suelta: esc, escB: esc, escI, escInv: true }, o)); }
  DEF[esc].icono = [[0, 0, 0, 1, .5, 1], CAJA_ESC[1]];
  nombre2(esLosa, ...tr6Losa); nombre2(esEsc, ...tr6Esc); TODOS.push(losa, esc);
  RECETAS.push([[losa, 6], [[base, 3]]], [[esc, 4], [[base, 6]]]);
  return { losa, esc };
}

// 1) PIEDRAS
const P_ROSA = '#c48a7a', P_MOTE = '#c8c8c4', P_VERDE = '#8a9a8a';
bloque2('P_ROSADA', 'Piedra rosada', ['Pink stone', 'Pedra rosada', 'Pembe taş', 'Batu merah muda', 'حجر وردي'], [tile2('pRosada', moteado(P_ROSA, ['#e0a898', '#8a4a40', '#f2d0c4'], .3))], { dur: 3.5, req: 1, color: P_ROSA });
bloque2('P_MOTEADA', 'Piedra moteada', ['Speckled stone', 'Pedra salpicada', 'Benekli taş', 'Batu berbintik', 'حجر منقط'], [tile2('pMoteada', moteado(P_MOTE, ['#5a5e66', '#efefef', '#3a3d44'], .25))], { dur: 3.5, req: 1, color: P_MOTE });
bloque2('P_VERDOSA', 'Piedra verdosa', ['Greenish stone', 'Pedra esverdeada', 'Yeşilimsi taş', 'Batu kehijauan', 'حجر مخضر'], [tile2('pVerdosa', moteado(P_VERDE, ['#6a7a6a', '#a8b8a4', '#5a6a5a'], .3))], { dur: 3.5, req: 1, color: P_VERDE });
bloque2('BASALTO', 'Basalto', ['Basalt', 'Basalto', 'Bazalt', 'Basal', 'بازلت'], [tile2('basaltoArriba', (x, y, r) => (Math.abs(x - 7.5) + Math.abs(y - 7.5)) % 5 < 1 ? '#2a2c32' : sombra('#4a4c54', (r() - .5) * .12)), tile2('basaltoArriba2', (x, y, r) => sombra('#44464e', (r() - .5) * .1)), tile2('basaltoLado', (x, y, r) => x % 4 === 0 ? '#2e3036' : sombra('#4c4e56', (r() - .5) * .14 + (y % 7 === 0 ? -.08 : 0)))], { dur: 3, req: 1, color: '#4a4c54' });
bloque2('PIZARRA', 'Pizarra', ['Slate', 'Ardósia', 'Arduvaz', 'Batu sabak', 'أردواز'], [tile2('pizarra', (x, y, r) => y % 3 === 0 ? '#2c3038' : sombra('#454a56', (r() - .5) * .14))], { dur: 4, req: 1, color: '#454a56' });
bloque2('PIZARRA_P', 'Pizarra pulida', ['Polished slate', 'Ardósia polida', 'Cilalı arduvaz', 'Batu sabak halus', 'أردواز مصقول'], [tile2('pizarraP', pulida('#4a4f5c', '#2c3038'))], { dur: 4, req: 1, color: '#4a4f5c' });
bloque2('PIEDRA_P', 'Piedra pulida', ['Polished stone', 'Pedra polida', 'Cilalı taş', 'Batu halus', 'حجر مصقول'], [tile2('piedraP', pulida('#9aa2b8', '#6a7290'))], { dur: 3.5, req: 1, color: '#9aa2b8' });
bloque2('ROSADA_P', 'Piedra rosada pulida', ['Polished pink stone', 'Pedra rosada polida', 'Cilalı pembe taş', 'Batu merah muda halus', 'حجر وردي مصقول'], [tile2('pRosadaP', pulida('#cc9484', '#9a5a4c'))], { dur: 3.5, req: 1, color: '#cc9484' });
bloque2('LADR_PIEDRA', 'Ladrillos de piedra', ['Stone bricks', 'Tijolos de pedra', 'Taş tuğla', 'Bata batu', 'طوب حجري'], [tile2('ladrPiedra', ladrillos('#8a93ad', '#565e78', 8, 8))], { dur: 4, req: 1, color: '#8a93ad' });
bloque2('LADR_MUSGO', 'Ladrillos de piedra con musgo', ['Mossy stone bricks', 'Tijolos de pedra com musgo', 'Yosunlu taş tuğla', 'Bata batu berlumut', 'طوب حجري بطحالب'], [tile2('ladrMusgo', conMusgo(ladrillos('#8a93ad', '#565e78', 8, 8)))], { dur: 4, req: 1, color: '#7a8a7d' });
bloque2('ADOQ_MUSGO', 'Adoquín con musgo', ['Mossy cobblestone', 'Paralelepípedo com musgo', 'Yosunlu parke taşı', 'Batu bulat berlumut', 'حصى مرصوف بطحالب'], [tile2('adoqMusgo', conMusgo((x, y, r) => (x % 8 === 0 || y % 8 === 0 || (x + y * 3) % 11 === 0) ? '#4a4e56' : sombra('#7a7e88', (r() - .5) * .18)))], { dur: 3, req: 1, color: '#6a7a68' });
bloque2('LADR_BARRO', 'Ladrillos de barro', ['Mud bricks', 'Tijolos de barro', 'Kerpiç', 'Bata lumpur', 'طوب طيني'], [tile2('ladrBarro', ladrillos('#9a7a5a', '#6a5038', 4, 8))], { dur: 2, req: 1, color: '#9a7a5a' });
const ARE = '#e8d29a';
bloque2('ARENISCA', 'Arenisca', ['Sandstone', 'Arenito', 'Kumtaşı', 'Batu pasir', 'حجر رملي'], [tile2('areniscaArriba', (x, y, r) => sombra(ARE, (r() - .5) * .08)), tile2('areniscaAbajo', (x, y, r) => sombra('#d8c08a', (r() - .5) * .1)), tile2('areniscaLado', (x, y, r) => y < 3 ? sombra(ARE, .05) : y === 3 || y === 9 ? '#c8ae78' : sombra('#dcc48c', (r() - .5) * .08))], { dur: 2, req: 1, color: ARE });
bloque2('ARENISCA_T', 'Arenisca tallada', ['Carved sandstone', 'Arenito entalhado', 'Oymalı kumtaşı', 'Batu pasir pahat', 'حجر رملي منحوت'], [TL.areniscaArriba, TL.areniscaAbajo, tile2('areniscaT', (x, y, r) => (y === 1 || y === 14) ? '#c8ae78' : (y > 4 && y < 11 && (Math.abs(x - 7.5) + Math.abs(y - 7.5) === 3.5 || Math.abs(x - 7.5) + Math.abs(y - 7.5) === 2.5)) ? '#b89a62' : sombra(ARE, (r() - .5) * .08))], { dur: 2, req: 1, color: ARE });
bloque2('ARENISCA_R', 'Arenisca roja', ['Red sandstone', 'Arenito vermelho', 'Kızıl kumtaşı', 'Batu pasir merah', 'حجر رملي أحمر'], [tile2('areniscaRArr', (x, y, r) => sombra('#c8703a', (r() - .5) * .08)), TL.areniscaRArr, tile2('areniscaRLado', (x, y, r) => y < 3 ? '#d07a40' : y === 3 || y === 9 ? '#a85a2a' : sombra('#c06a36', (r() - .5) * .08))], { dur: 2, req: 1, color: '#c8703a' });
bloque2('ARENA_R', 'Arena roja', ['Red sand', 'Areia vermelha', 'Kızıl kum', 'Pasir merah', 'رمل أحمر'], [tile2('arenaR', moteado('#d4783e', ['#b85e2a', '#e8925a'], .25))], { dur: .6, color: '#d4783e', cat: 'catNaturaleza' });
bloque2('GRAVA', 'Grava', ['Gravel', 'Cascalho', 'Çakıl', 'Kerikil', 'حصى'], [tile2('grava', (x, y, r, e) => { const k = ((x * 7 + y * 13) % 5); return k === 0 ? '#5a5e66' : k === 1 ? '#9a9ca4' : sombra('#7a7c84', (r() - .5) * .3); })], { dur: .7, color: '#7a7c84', cat: 'catNaturaleza' });
bloque2('ARCILLA', 'Arcilla', ['Clay', 'Argila', 'Kil', 'Tanah liat', 'طين'], [tile2('arcilla', (x, y, r) => sombra('#a4aabc', (r() - .5) * .08 + ((x * 3 + y) % 9 === 0 ? -.08 : 0)))], { dur: .7, color: '#a4aabc', cat: 'catNaturaleza' });
bloque2('MARMOL_N', 'Mármol negro', ['Black marble', 'Mármore preto', 'Siyah mermer', 'Marmer hitam', 'رخام أسود'], [tile2('marmolN', (x, y, r) => (Math.sin(x * .6 + y * .35) > .93 || (x * 5 + y * 3) % 23 === 0) ? '#c8c8d4' : sombra('#25262e', (r() - .5) * .14))], { dur: 4, req: 1, color: '#25262e' });
bloque2('CUARZO', 'Bloque de cuarzo', ['Quartz block', 'Bloco de quartzo', 'Kuvars bloğu', 'Balok kuarsa', 'كتلة كوارتز'], [tile2('cuarzo', pulida('#f2eee6', '#d8d0c4'))], { dur: 3, req: 1, color: '#f2eee6' });
bloque2('PILAR_CUARZO', 'Pilar de cuarzo', ['Quartz pillar', 'Pilar de quartzo', 'Kuvars sütun', 'Pilar kuarsa', 'عمود كوارتز'], [tile2('pilarArriba', (x, y) => (x === 0 || y === 0 || x === 15 || y === 15) ? '#d0c8bc' : (x + y) % 2 ? '#f2eee6' : '#ebe6dc'), TL.pilarArriba, tile2('pilarLado', (x, y, r) => (x < 2 || x > 13) ? '#d8d0c4' : (x === 4 || x === 11) ? '#e0d8cc' : sombra('#f4f0e8', (r() - .5) * .04))], { dur: 3, req: 1, color: '#f2eee6' });

// 2) MINERALES Y GEMAS
const tCobre = tile2('cobreI', (x, y) => { const d = Math.hypot(x - 7.5, y - 8); return d < 5 && (x + y) % 3 !== 0 ? (d < 2.5 ? '#f0a070' : '#c8703a') : d < 5.6 ? '#8a4a24' : null; }, false);
const tJade = tile2('jadeI', (x, y) => { const d = Math.abs(x - 7.5) + Math.abs(y - 7.5); return d < 6 ? (d < 2 ? '#c8ffd8' : x < 8 ? '#3ad08a' : '#2aa070') : null; }, false);
const tRubi = tile2('rubiI', (x, y) => { const d = Math.abs(x - 7.5) * 1.2 + Math.abs(y - 8); return d < 6.5 ? (d < 2 ? '#ffd0d8' : y < 8 ? '#f03a5a' : '#b81a3a') : null; }, false);
objeto2('COBRE', 'Cobre', ['Copper', 'Cobre', 'Bakır', 'Tembaga', 'نحاس'], tCobre);
objeto2('JADE', 'Jade', ['Jade', 'Jade', 'Yeşim', 'Giok', 'يشم'], tJade);
objeto2('RUBI', 'Rubí', ['Ruby', 'Rubi', 'Yakut', 'Rubi', 'ياقوت'], tRubi);
bloque2('MIN_COBRE', 'Mineral de cobre', ['Copper ore', 'Minério de cobre', 'Bakır cevheri', 'Bijih tembaga', 'خام النحاس'], [tile2('minCobre', mineral2(['#e08a50', '#c06a30']))], { dur: 3.5, req: 1, suelta: I.COBRE, color: '#9a8a7a', cat: 'catNaturaleza' });
bloque2('MIN_JADE', 'Mineral de jade', ['Jade ore', 'Minério de jade', 'Yeşim cevheri', 'Bijih giok', 'خام اليشم'], [tile2('minJade', mineral2(['#3ad08a', '#8af0b8']))], { dur: 4, req: 2, suelta: I.JADE, color: '#7a9a8a', cat: 'catNaturaleza' });
bloque2('MIN_RUBI', 'Mineral de rubí', ['Ruby ore', 'Minério de rubi', 'Yakut cevheri', 'Bijih rubi', 'خام الياقوت'], [tile2('minRubi', mineral2(['#f03a5a', '#ff8aa0']))], { dur: 4.5, req: 3, suelta: I.RUBI, color: '#9a7a80', cat: 'catNaturaleza' });
bloque2('B_COBRE', 'Bloque de cobre', ['Copper block', 'Bloco de cobre', 'Bakır blok', 'Balok tembaga', 'كتلة نحاس'], [tile2('bCobre', (x, y, r) => (x % 8 === 0 || y % 8 === 0) ? '#a85a2a' : sombra('#d8824a', (r() - .5) * .08))], { dur: 5, req: 1, color: '#d8824a' });
bloque2('B_JADE', 'Bloque de jade', ['Jade block', 'Bloco de jade', 'Yeşim blok', 'Balok giok', 'كتلة يشم'], [tile2('bJade', gema('#2ab07a', '#9af0c8'))], { dur: 5, req: 2, color: '#2ab07a' });
bloque2('B_RUBI', 'Bloque de rubí', ['Ruby block', 'Bloco de rubi', 'Yakut blok', 'Balok rubi', 'كتلة ياقوت'], [tile2('bRubi', gema('#c8203f', '#ff9aae'))], { dur: 5, req: 3, color: '#c8203f' });
bloque2('AMATISTA', 'Bloque de amatista', ['Amethyst block', 'Bloco de ametista', 'Ametist blok', 'Balok kecubung', 'كتلة جمشت'], [tile2('amatista', (x, y, r) => { const v = Math.abs(((x * 3 + y * 5) % 9) - 4); return v === 0 ? '#e8c8ff' : sombra('#8a5ac8', (r() - .5) * .16 + v * .02); })], { dur: 2, req: 1, luz: 5, color: '#8a5ac8', cat: 'catNaturaleza' });

// 3) MADERAS (cerezo, abedul, acacia, ébano): tronco, tablones, hojas + losa y escalón
const MADERAS2 = [
  ['CEREZO', 'cerezo', '#5a3a3a', '#3a2424', '#e8a8b0', '#c8848c', '#f2b8d0', ['Cherry', 'Cerejeira', 'Kiraz', 'Ceri', 'الكرز']],
  ['ABEDUL', 'abedul', '#ecebe4', '#2e2e2e', '#e8d8a0', '#c8b478', '#7ab84a', ['Birch', 'Bétula', 'Huş', 'Birch', 'البتولا']],
  ['ACACIA', 'acacia', '#7a6a5a', '#5a4a3a', '#d8743a', '#b05a2a', '#8aa83a', ['Acacia', 'Acácia', 'Akasya', 'Akasia', 'الأكاسيا']],
  ['EBANO', 'ébano', '#2e2420', '#1a1412', '#4a3428', '#2e2018', '#3a6a3a', ['Ebony', 'Ébano', 'Abanoz', 'Eboni', 'الأبنوس']]];
for (const [K, n, corteza, veta, tabla, junta, hoja, tr] of MADERAS2) {
  const [en, pt, trk, idn, ar] = tr;
  const lado = tile2('tronco' + K, troncoLado(corteza, veta)), arr = tile2('troncoA' + K, troncoArriba(sombra(tabla, -.08), tabla, corteza));
  bloque2('TRONCO_' + K, 'Tronco de ' + n, [en + ' log', 'Tronco de ' + pt.toLowerCase(), trk + ' kütüğü', 'Batang ' + idn.toLowerCase(), 'جذع ' + ar], [arr, arr, lado], { dur: 2.2, color: corteza, cat: 'catNaturaleza' });
  const tab = bloque2('TABLONES_' + K, 'Madera de ' + n, [en + ' planks', 'Tábuas de ' + pt.toLowerCase(), trk + ' tahta', 'Papan ' + idn.toLowerCase(), 'ألواح ' + ar], [tile2('tablones' + K, tablones(tabla, junta))], { dur: 2, color: tabla });
  bloque2('HOJAS_' + K, 'Hojas de ' + n, [en + ' leaves', 'Folhas de ' + pt.toLowerCase(), trk + ' yaprakları', 'Daun ' + idn.toLowerCase(), 'أوراق ' + ar], [tile2('hojas' + K, hojas(hoja, K === 'CEREZO' ? '#ffffff' : null), false)], { dur: .3, trans: true, suelta: 0, color: hoja, cat: 'catNaturaleza' });
  RECETAS.push([[tab, 4], [[B['TRONCO_' + K], 1]]]);
  formas2(tab, 'Losa de ' + n, 'Escalón de ' + n, [en + ' slab', 'Laje de ' + pt.toLowerCase(), trk + ' basamak yarısı', 'Lempeng ' + idn.toLowerCase(), 'بلاطة ' + ar], [en + ' stairs', 'Escada de ' + pt.toLowerCase(), trk + ' merdiven', 'Tangga ' + idn.toLowerCase(), 'درج ' + ar]);
}
formas2(B.LADR_PIEDRA, 'Losa de ladrillos de piedra', 'Escalón de ladrillos de piedra', ['Stone brick slab', 'Laje de tijolos de pedra', 'Taş tuğla yarım blok', 'Lempeng bata batu', 'بلاطة طوب حجري'], ['Stone brick stairs', 'Escada de tijolos de pedra', 'Taş tuğla merdiven', 'Tangga bata batu', 'درج طوب حجري']);
formas2(B.ARENISCA, 'Losa de arenisca', 'Escalón de arenisca', ['Sandstone slab', 'Laje de arenito', 'Kumtaşı yarım blok', 'Lempeng batu pasir', 'بلاطة حجر رملي'], ['Sandstone stairs', 'Escada de arenito', 'Kumtaşı merdiven', 'Tangga batu pasir', 'درج حجر رملي']);
formas2(B.PIEDRA_P, 'Losa de piedra pulida', 'Escalón de piedra pulida', ['Polished stone slab', 'Laje de pedra polida', 'Cilalı taş yarım blok', 'Lempeng batu halus', 'بلاطة حجر مصقول'], ['Polished stone stairs', 'Escada de pedra polida', 'Cilalı taş merdiven', 'Tangga batu halus', 'درج حجر مصقول']);

// 4) COLORES: 16 tintes, hormigón, terracota y vidrio de color
const COLORES16 = [
  ['blanco', '#ecebe6', ['White', 'Branco', 'Beyaz', 'Putih', 'أبيض']], ['gris claro', '#9d9d97', ['Light gray', 'Cinza-claro', 'Açık gri', 'Abu-abu muda', 'رمادي فاتح']],
  ['gris', '#474f52', ['Gray', 'Cinza', 'Gri', 'Abu-abu', 'رمادي']], ['negro', '#1d1d21', ['Black', 'Preto', 'Siyah', 'Hitam', 'أسود']],
  ['marrón', '#835432', ['Brown', 'Marrom', 'Kahverengi', 'Cokelat', 'بني']], ['rojo', '#b02e26', ['Red', 'Vermelho', 'Kırmızı', 'Merah', 'أحمر']],
  ['naranja', '#f9801d', ['Orange', 'Laranja', 'Turuncu', 'Oranye', 'برتقالي']], ['amarillo', '#fed83d', ['Yellow', 'Amarelo', 'Sarı', 'Kuning', 'أصفر']],
  ['lima', '#80c71f', ['Lime', 'Lima', 'Açık yeşil', 'Hijau muda', 'ليموني']], ['verde', '#5e7c16', ['Green', 'Verde', 'Yeşil', 'Hijau', 'أخضر']],
  ['cian', '#169c9c', ['Cyan', 'Ciano', 'Camgöbeği', 'Sian', 'سماوي']], ['celeste', '#3ab3da', ['Light blue', 'Azul-claro', 'Açık mavi', 'Biru muda', 'أزرق فاتح']],
  ['azul', '#3c44aa', ['Blue', 'Azul', 'Mavi', 'Biru', 'أزرق']], ['violeta', '#8932b8', ['Purple', 'Roxo', 'Mor', 'Ungu', 'بنفسجي']],
  ['magenta', '#c74ebd', ['Magenta', 'Magenta', 'Eflatun', 'Magenta', 'أرجواني']], ['rosa', '#f38baa', ['Pink', 'Rosa', 'Pembe', 'Merah muda', 'وردي']]];
const MAT_COLOR = [
  ['Hormigón', ['concrete', 'Concreto', 'beton', 'Beton', 'خرسانة'], c => plano(c), 1.8, 1],
  ['Terracota', ['terracotta', 'Terracota', 'pişmiş kil', 'Terakota', 'طين محروق'], c => terracota(mezcla(c, '#a0644a', .35)), 1.25, 1],
  ['Vidrio', ['stained glass', 'Vidro', 'vitray', 'Kaca', 'زجاج ملون'], c => vidrioColor(c), .5, 0]];
const TINTE = {}, COLOR_B = {};
const tTinte = c => (x, y) => { const d = Math.hypot(x - 7.5, y - 9); if (y < 4 && x > 5 && x < 10) return '#d8c8a8'; if (y >= 4 && y < 6 && x > 4 && x < 11) return '#efe2c4'; return d < 5.4 ? (x + y < 15 ? sombra(c, .2) : c) : null; };
COLORES16.forEach(([n, c, tr], k) => {
  const [en, pt, trk, idn, ar] = tr;
  TINTE[n] = objeto2('TINTE_' + k, 'Tinte ' + n, [en + ' dye', 'Corante ' + pt.toLowerCase(), trk + ' boya', 'Pewarna ' + idn.toLowerCase(), 'صبغة (' + ar + ')'], tile2('tinte' + k, tTinte(c), false));
  for (const [mat, trm, pinta, dur, bisel] of MAT_COLOR) {
    const es = mat + ' ' + (mat === 'Terracota' ? n.replace(/o$/, 'a').replace('marrón', 'marrón') : n);
    const t = tile2(mat + k, pinta(c), !!bisel);
    const id = bloque2(mat.toUpperCase() + '_' + k, es, [en + ' ' + trm[0], trm[1] + ' ' + pt.toLowerCase(), trk + ' ' + trm[2], trm[3] + ' ' + idn.toLowerCase(), trm[4] + ' (' + ar + ')'], [t],
      mat === 'Vidrio' ? { dur, trans: true, color: c, cat: 'catDeco' } : { dur, req: mat === 'Hormigón' ? 1 : 0, color: c, cat: 'catDeco' });
    (COLOR_B[mat] = COLOR_B[mat] || []).push(id);
  }
});

// 5) DECORACIÓN
bloque2('BARRIL', 'Barril', ['Barrel', 'Barril', 'Fıçı', 'Tong', 'برميل'], [tile2('barrilArriba', (x, y) => { const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5)); return d > 6.5 ? '#5a3a1e' : d > 5.5 ? '#8a5a2e' : (x === 7 || x === 8) && y > 4 && y < 11 ? '#5a3a1e' : (y % 4 === 1 ? '#a87444' : '#b8844e'); }), tile2('barrilAbajo', (x, y, r) => sombra('#9a6a3a', (r() - .5) * .1)), tile2('barrilLado', (x, y, r) => (y === 3 || y === 12) ? '#4a4c54' : x % 4 === 0 ? '#6a4424' : sombra('#a87444', (r() - .5) * .12))], { dur: 2, color: '#a87444', cat: 'catDeco' });
bloque2('CAJA', 'Caja de madera', ['Wooden crate', 'Caixa de madeira', 'Ahşap sandık', 'Peti kayu', 'صندوق خشبي'], [tile2('caja', (x, y, r) => (x < 2 || y < 2 || x > 13 || y > 13) ? '#6a4424' : (Math.abs(x - y) < 1.2 || Math.abs(x + y - 15) < 1.2) ? '#7a5030' : sombra('#c8955a', (r() - .5) * .12))], { dur: 1.5, color: '#c8955a', cat: 'catDeco' });
const farol2 = (c) => (x, y) => { if (y < 2 && x > 5 && x < 10) return '#3a3d44'; if (y < 3 && x > 4 && x < 11) return '#4a4e56'; if (y > 12) return x > 4 && x < 11 ? '#3a3d44' : null; if (x < 3 || x > 12) return null; if (x === 3 || x === 12 || y === 3) return sombra(c, -.35); return (x + y) % 5 === 0 ? sombra(c, .45) : sombra(c, .2); };
const FAROLES = [['rojo', '#e8443a', ['Red', 'Vermelha', 'Kırmızı', 'Merah', 'أحمر']], ['azul', '#3a7ae8', ['Blue', 'Azul', 'Mavi', 'Biru', 'أزرق']], ['verde', '#3ac85a', ['Green', 'Verde', 'Yeşil', 'Hijau', 'أخضر']], ['amarillo', '#f8c83a', ['Yellow', 'Amarela', 'Sarı', 'Kuning', 'أصفر']]];
const FAROL_B = {};
for (const [n, c, tr] of FAROLES) FAROL_B[n] = bloque2('FAROLILLO_' + n.toUpperCase(), 'Farolillo ' + n, [tr[0] + ' paper lantern', 'Lanterna ' + tr[1].toLowerCase(), tr[2] + ' fener', 'Lampion ' + tr[3].toLowerCase(), 'فانوس ' + tr[4]], [tile2('farolillo_' + n, farol2(c), false)], { dur: .3, luz: 14, trans: true, solido: true, forma: [[.25, 0, .25, .75, .75, .75]], color: c, cat: 'catDeco' });
bloque2('LINTERNA', 'Linterna de hierro', ['Iron lantern', 'Lanterna de ferro', 'Demir fener', 'Lentera besi', 'فانوس حديدي'], [tile2('linterna', (x, y) => { if (y < 3 && x > 5 && x < 10) return '#2a2c32'; if (x < 4 || x > 11 || y > 13) return null; if (x === 4 || x === 11 || y === 3 || y === 13 || x === 7 || x === 8) return '#3a3d44'; return '#ffd860'; }, false)], { dur: .8, luz: 15, trans: true, forma: [[.3, 0, .3, .7, .7, .7]], color: '#ffd860', cat: 'catDeco' });

// 6) PLANTAS
const PLANTA = { dur: .05, trans: true, solido: false, planta: true, cat: 'catNaturaleza' };
const PLANTAS2 = [
  ['TULIPAN_R', 'Tulipán rojo', ['Red tulip', 'Tulipa vermelha', 'Kırmızı lale', 'Tulip merah', 'توليب أحمر'], tulipan('#e03a3a'), '#e03a3a'],
  ['TULIPAN_N', 'Tulipán naranja', ['Orange tulip', 'Tulipa laranja', 'Turuncu lale', 'Tulip oranye', 'توليب برتقالي'], tulipan('#f8842a'), '#f8842a'],
  ['TULIPAN_P', 'Tulipán rosa', ['Pink tulip', 'Tulipa rosa', 'Pembe lale', 'Tulip merah muda', 'توليب وردي'], tulipan('#f8a0c0'), '#f8a0c0'],
  ['TULIPAN_B', 'Tulipán blanco', ['White tulip', 'Tulipa branca', 'Beyaz lale', 'Tulip putih', 'توليب أبيض'], tulipan('#f4f4ee'), '#f4f4ee'],
  ['MARGARITA', 'Margarita', ['Daisy', 'Margarida', 'Papatya', 'Aster', 'أقحوان'], flor('#ffffff', '#f8d020'), '#ffffff'],
  ['LIRIO', 'Lirio azul', ['Blue iris', 'Lírio azul', 'Mavi süsen', 'Iris biru', 'سوسن أزرق'], flor('#4a6ae8', '#f8f0a0'), '#4a6ae8'],
  ['LAVANDA', 'Lavanda', ['Lavender', 'Lavanda', 'Lavanta', 'Lavender', 'خزامى'], lavanda, '#9a6ae0'],
  ['HONGO_R', 'Hongo rojo', ['Red mushroom', 'Cogumelo vermelho', 'Kırmızı mantar', 'Jamur merah', 'فطر أحمر'], hongo('#d02a2a', '#ffffff'), '#d02a2a'],
  ['HONGO_M', 'Hongo marrón', ['Brown mushroom', 'Cogumelo marrom', 'Kahverengi mantar', 'Jamur cokelat', 'فطر بني'], hongo('#9a6a44'), '#9a6a44'],
  ['HELECHO', 'Helecho', ['Fern', 'Samambaia', 'Eğrelti otu', 'Pakis', 'سرخس'], helecho, '#3f9a34'],
  ['CANA_VERDE', 'Caña verde', ['Green cane', 'Cana verde', 'Yeşil kamış', 'Tebu hijau', 'قصب أخضر'], cana, '#5aa83a']];
for (const [K, es, tr, f, c] of PLANTAS2) bloque2(K, es, tr, [tile2('pl_' + K, f, false)], Object.assign({ color: c }, PLANTA));

// 7) HIELO Y NIEVE
bloque2('HIELO_C', 'Hielo compacto', ['Packed ice', 'Gelo compacto', 'Sıkıştırılmış buz', 'Es padat', 'جليد مضغوط'], [tile2('hieloC', (x, y, r) => ((x + y * 2) % 9 === 0) ? '#e8f6ff' : sombra('#8ec4f0', (r() - .5) * .08))], { dur: .8, color: '#8ec4f0' });
bloque2('HIELO_AZUL', 'Hielo azul', ['Blue ice', 'Gelo azul', 'Mavi buz', 'Es biru', 'جليد أزرق'], [tile2('hieloAzul', (x, y, r) => ((x * 2 + y) % 11 === 0) ? '#c8e8ff' : sombra('#5a9ae8', (r() - .5) * .08))], { dur: 1, color: '#5a9ae8' });
bloque2('LADR_NIEVE', 'Ladrillos de nieve', ['Snow bricks', 'Tijolos de neve', 'Kar tuğla', 'Bata salju', 'طوب ثلجي'], [tile2('ladrNieve', ladrillos('#f4f8fc', '#c4d4e4', 4, 8))], { dur: .6, color: '#f4f8fc' });
bloque2('LADR_HIELO', 'Ladrillos de hielo', ['Ice bricks', 'Tijolos de gelo', 'Buz tuğla', 'Bata es', 'طوب جليدي'], [tile2('ladrHielo', ladrillos('#a8d4f8', '#6a9ad0', 8, 8))], { dur: .9, color: '#a8d4f8' });

// los dibujos nuevos ya están en el atlas
try { atlasTex.needsUpdate = true; } catch (e) {}

// ─── RECETAS ───
const R2 = (id, n, ...ing) => RECETAS.push([[id, n], ing]);
R2(B.PIEDRA_P, 4, [B.PIEDRA, 4]); R2(B.ROSADA_P, 4, [B.P_ROSADA, 4]); R2(B.PIZARRA_P, 4, [B.PIZARRA, 4]);
R2(B.LADR_PIEDRA, 4, [B.PIEDRA_P, 4]); R2(B.LADR_MUSGO, 1, [B.LADR_PIEDRA, 1], [B.ENREDADERA, 1]); R2(B.ADOQ_MUSGO, 1, [B.ADOQUIN, 1], [B.ENREDADERA, 1]);
R2(B.LADR_BARRO, 4, [B.TIERRA, 2], [B.ARCILLA, 2]); R2(B.ARENISCA, 1, [B.ARENA, 4]); R2(B.ARENISCA_T, 4, [B.ARENISCA, 4]); R2(B.ARENISCA_R, 1, [B.ARENA_R, 4]);
R2(B.CUARZO, 4, [B.ARENA, 4], [I.CRISTAL, 1]); R2(B.PILAR_CUARZO, 2, [B.CUARZO, 2]); R2(B.MARMOL_N, 4, [B.MARMOL, 4], [I.CARBON, 1]);
R2(B.B_COBRE, 1, [I.COBRE, 9]); R2(I.COBRE, 9, [B.B_COBRE, 1]); R2(B.B_JADE, 1, [I.JADE, 9]); R2(I.JADE, 9, [B.B_JADE, 1]); R2(B.B_RUBI, 1, [I.RUBI, 9]); R2(I.RUBI, 9, [B.B_RUBI, 1]);
R2(B.BARRIL, 1, [B.MADERA, 6], [I.HIERRO, 1]); R2(B.CAJA, 1, [B.MADERA, 4]);
for (const [n] of FAROLES) R2(FAROL_B[n], 2, [B.ANTORCHA, 1], [B.VIDRIO, 1], [TINTE[n], 1]);
R2(B.LINTERNA, 1, [B.ANTORCHA, 1], [I.HIERRO, 2]);
R2(B.HIELO_C, 1, [B.HIELO, 9]); R2(B.HIELO_AZUL, 1, [B.HIELO_C, 9]); R2(B.LADR_NIEVE, 4, [B.NIEVE, 4]); R2(B.LADR_HIELO, 4, [B.HIELO_C, 4]);
// tintes: de flores y materiales, y mezclando
const TN = n => TINTE[n];
R2(TN('rojo'), 2, [B.FLOR_R, 1]); R2(TN('rojo'), 2, [B.TULIPAN_R, 1]); R2(TN('amarillo'), 2, [B.FLOR_A, 1]); R2(TN('naranja'), 2, [B.TULIPAN_N, 1]); R2(TN('rosa'), 2, [B.TULIPAN_P, 1]);
R2(TN('blanco'), 2, [B.TULIPAN_B, 1]); R2(TN('blanco'), 3, [I.HUESO, 1]); R2(TN('azul'), 2, [B.LIRIO, 1]); R2(TN('violeta'), 2, [B.LAVANDA, 1]); R2(TN('negro'), 2, [I.CARBON, 1]);
R2(TN('verde'), 2, [B.CACTUS, 1]); R2(TN('marrón'), 2, [B.HONGO_M, 1]); R2(TN('gris'), 2, [TN('negro'), 1], [TN('blanco'), 1]); R2(TN('gris claro'), 2, [TN('gris'), 1], [TN('blanco'), 1]);
R2(TN('celeste'), 2, [TN('azul'), 1], [TN('blanco'), 1]); R2(TN('lima'), 2, [TN('verde'), 1], [TN('blanco'), 1]); R2(TN('cian'), 2, [TN('azul'), 1], [TN('verde'), 1]); R2(TN('magenta'), 2, [TN('violeta'), 1], [TN('rosa'), 1]);
if (I.TINTA) R2(TN('negro'), 2, [I.TINTA, 1]);
COLORES16.forEach(([n], k) => {
  R2(COLOR_B['Hormigón'][k], 8, [B.ARENA, 4], [B.GRAVA, 4], [TINTE[n], 1]);
  R2(COLOR_B['Terracota'][k], 8, [B.ARCILLA, 8], [TINTE[n], 1]);
  R2(COLOR_B['Vidrio'][k], 8, [B.VIDRIO, 8], [TINTE[n], 1]);
});

// ─── NOMBRES en los otros idiomas ───
for (const es in N2) { const t = N2[es]; for (const l of ['en', 'pt', 'tr', 'id', 'ar']) { NOMBRES[l] = NOMBRES[l] || {}; if (t[l]) NOMBRES[l][es] = t[l]; } }

// ─── MUNDOS NUEVOS: generación 4 (piedras, minerales, flores y árboles nuevos). Los mundos de antes no cambian. ───
crearMundo = function (modo, ejemplo = false) {   // igual que en estructuras.js, pero los mundos nuevos nacen con gen 4
  const lista = leerLista(), id = Date.now().toString(36), n = lista.length + 1;
  lista.unshift({ id, nombre: 'Mundo ' + n, num: n, modo, ejemplo, tam: ejemplo ? 160 : (window.tamNuevo || 160), semilla: ejemplo ? SEMILLA_EJEMPLO : (Math.random() * 2147483647) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0, gen: ejemplo ? 2 : 4 });
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  pantallaCompleta(); entrarMundo(id);
};
// la generación nueva se aplica al preparar el mundo (antes de calcular la luz); como depende solo de la semilla, siempre da lo mismo
function generarNuevo2(S) {
  const at = (x, y, z) => dentro(x, y, z) ? mundo[idx(x, y, z)] : 0, put = (x, y, z, t) => { if (dentro(x, y, z)) mundo[idx(x, y, z)] = t; };
  const R = (n, k, s) => h3(n, k, s, S + 7700);
  const sup = (x, z) => { let y = SY - 2; while (y > 0 && (!mundo[idx(x, y, z)] || (DEF[mundo[idx(x, y, z)]] || {}).planta)) y--; return y; };
  const area = SX * SZ / (160 * 160);
  // manchas de piedra de colores (reemplazan piedra)
  const mancha = (n, s, t, yMin, yMax, rMin, rMax, sobre = [B.PIEDRA]) => { for (let i = 0; i < n; i++) {
      const cx = Math.floor(R(i, 1, s) * SX), cz = Math.floor(R(i, 2, s) * SZ), cy = yMin + Math.floor(R(i, 3, s) * (yMax - yMin)), rad = rMin + R(i, 4, s) * (rMax - rMin);
      for (let a = -Math.ceil(rad); a <= rad; a++) for (let b = -Math.ceil(rad); b <= rad; b++) for (let c = -Math.ceil(rad); c <= rad; c++) {
        if (a * a + b * b * 1.6 + c * c > rad * rad) continue; const x = cx + a, y = cy + b, z = cz + c; if (sobre.includes(at(x, y, z))) put(x, y, z, t); } } };
  mancha(Math.round(26 * area), 11, B.P_ROSADA, 4, 40, 2, 4.5); mancha(Math.round(26 * area), 12, B.P_MOTEADA, 4, 40, 2, 4.5); mancha(Math.round(22 * area), 13, B.P_VERDOSA, 4, 40, 2, 4.5);
  mancha(Math.round(18 * area), 14, B.PIZARRA, 2, 14, 2.5, 5); mancha(Math.round(20 * area), 15, B.GRAVA, 4, 36, 1.5, 3.5); mancha(Math.round(6 * area), 16, B.AMATISTA, 3, 16, 1, 2.2);
  mancha(Math.round(14 * area), 17, B.ARENA_R, 14, 36, 3, 6, [B.ARENA]);   // manchas de arena roja en playas y desiertos
  // minerales: vetas chicas
  const veta = (n, s, t, yMin, yMax, largo) => { for (let i = 0; i < n; i++) { let x = 0, y = 0, z = 0; for (let tr = 0; tr < 8; tr++) { x = Math.floor(R(i, 1 + tr * 3, s) * SX); z = Math.floor(R(i, 2 + tr * 3, s) * SZ); y = yMin + Math.floor(R(i, 3 + tr * 3, s) * (yMax - yMin)); if (at(x, y, z) === B.PIEDRA) break; }
      for (let k = 0; k < largo; k++) { if (at(x, y, z) === B.PIEDRA || at(x, y, z) === B.PIZARRA) put(x, y, z, t); const d = Math.floor(R(i * 31 + k, 5, s) * 6); x += [1, -1, 0, 0, 0, 0][d]; y += [0, 0, 1, -1, 0, 0][d]; z += [0, 0, 0, 0, 1, -1][d]; } } };
  veta(Math.round(55 * area), 21, B.MIN_COBRE, 6, 40, 7); veta(Math.round(14 * area), 22, B.MIN_JADE, 2, 18, 4); veta(Math.round(9 * area), 23, B.MIN_RUBI, 2, 12, 3);
  // basalto alrededor de la lava de las cuevas
  for (let i = 0; i < mundo.length; i++) if (mundo[i] === B.LAVA) { const x = i % SX, z = Math.floor(i / SX) % SZ, y = Math.floor(i / (SX * SZ)); for (const [a, b, c] of [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1], [0, -1, 0]]) if (at(x + a, y + b, z + c) === B.PIEDRA && R(i, a + 2 * c + 7, 31) < .5) put(x + a, y + b, z + c, B.BASALTO); }
  // superficie: arenisca bajo la arena, arcilla en el fondo del agua, flores, hongos, helechos y árboles nuevos
  for (let x = 1; x < SX - 1; x++) for (let z = 1; z < SZ - 1; z++) {
    const y = sup(x, z), t = at(x, y, z), n = x * 7919 + z * 104729, v = R(n, 6, 41);
    if (t === B.ARENA) { for (let d = 3; d <= 5; d++) if (at(x, y - d, z) === B.ARENA || at(x, y - d, z) === B.PIEDRA) put(x, y - d, z, B.ARENISCA); }
    if (t === B.AGUA) { let yy = y; while (yy > 0 && at(x, yy, z) === B.AGUA) yy--; if ((at(x, yy, z) === B.ARENA || at(x, yy, z) === B.TIERRA) && R(n, 7, 42) < .06) put(x, yy, z, B.ARCILLA); }
    if (t === B.PASTO && !at(x, y + 1, z)) {
      if (v < .012) put(x, y + 1, z, [B.TULIPAN_R, B.TULIPAN_N, B.TULIPAN_P, B.TULIPAN_B][Math.floor(R(n, 8, 43) * 4)]);
      else if (v < .02) put(x, y + 1, z, B.MARGARITA); else if (v < .024) put(x, y + 1, z, B.LIRIO); else if (v < .027) put(x, y + 1, z, B.LAVANDA);
      else if (v < .045) put(x, y + 1, z, B.HELECHO); else if (v < .049) put(x, y + 1, z, R(n, 9, 44) < .5 ? B.HONGO_R : B.HONGO_M);
      else if (v < .0505 && at(x + 1, y, z) === B.AGUA) put(x, y + 1, z, B.CANA_VERDE);
    }
  }
  // árboles nuevos: bosquecitos de cerezo, abedul, acacia y ébano
  const tipos = ['CEREZO', 'ABEDUL', 'ACACIA', 'EBANO'];
  let puestos = 0; const meta2 = Math.round(22 * area);
  for (let g = 0; g < 2500 && puestos < meta2; g++) {
    const x = 3 + Math.floor(R(g, 1, 51) * (SX - 6)), z = 3 + Math.floor(R(g, 2, 51) * (SZ - 6));
    const K = tipos[(Math.floor(x / 40) * 3 + Math.floor(z / 40) * 5 + Math.floor(R(g, 6, 51) * 1.4)) % 4];   // por zonas, para que se vean bosquecitos
    { if (Math.hypot(x - spawn.x, z - spawn.z) < 10) continue;
      const y = sup(x, z); if (at(x, y, z) !== B.PASTO) continue; let libre = true; for (let a = -1; a <= 1 && libre; a++) for (let b = -1; b <= 1; b++) for (let h = 1; h <= 6; h++) { const q = at(x + a, y + h, z + b); if (q && !(DEF[q] || {}).planta) { libre = false; break; } }
      if (!libre) continue; const k = g;
      const alto = 4 + Math.floor(R(g * 9 + k, 5, 52) * 3), tr = B['TRONCO_' + K], ho = B['HOJAS_' + K];
      puestos++; for (let h = 1; h <= alto; h++) put(x, y + h, z, tr);
      const top = y + alto, r = K === 'ACACIA' ? 2.6 : 2.2;
      for (let a = -3; a <= 3; a++) for (let b = -2; b <= 2; b++) for (let c = -3; c <= 3; c++) {
        const d = K === 'ACACIA' ? Math.hypot(a, b * 2.2, c) : Math.hypot(a, b * 1.2, c); if (d > r + .4 || (a === 0 && c === 0 && b < 0)) continue;
        if (!at(x + a, top + b + 1, z + c) || (DEF[at(x + a, top + b + 1, z + c)] || {}).planta) put(x + a, top + b + 1, z + c, ho); }
    }
  }
}
{ const p0 = prepararMundo; prepararMundo = function (S, ej) { const r = p0.apply(this, arguments);
    if ((window.genVersion || 1) >= 4 && !window.mundoTipo && !ej) { try { generarNuevo2(S); } catch (e) { console.error(e); } }
    return r; }; }

window.__bloques2 = { B2, I2, total: () => Object.keys(B2).length, tiles: () => tileB2 - 256 };
}
