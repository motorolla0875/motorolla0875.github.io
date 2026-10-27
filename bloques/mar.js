'use strict';
// ═════════ EL MAR: peces, calamares, delfines, tortugas, guardianes, corales, algas, barcos hundidos y aire bajo el agua ═════════
// También: minas abandonadas en las cuevas y colmenas en los árboles (todo en mundos nuevos: meta.gen >= 2).

Object.assign(TX.es, { sinAire: '¡TE QUEDAS SIN AIRE!<small>sube a la superficie</small>', gracia: 'GRACIA DEL DELFÍN<small>nadas mucho más rápido</small>', guardian: '¡CUIDADO, UN GUARDIÁN!', nacioTortuga: '¡NACIÓ UNA TORTUGUITA!' });
Object.assign(TX.en, { sinAire: 'YOU ARE RUNNING OUT OF AIR!<small>swim up to the surface</small>', gracia: 'DOLPHIN\'S GRACE<small>you swim much faster</small>', guardian: 'WATCH OUT, A GUARDIAN!', nacioTortuga: 'A BABY TURTLE HATCHED!' });
Object.assign(TX.pt, { sinAire: 'VOCÊ ESTÁ FICANDO SEM AR!<small>suba para a superfície</small>', gracia: 'GRAÇA DO GOLFINHO<small>você nada muito mais rápido</small>', guardian: 'CUIDADO, UM GUARDIÃO!', nacioTortuga: 'NASCEU UMA TARTARUGUINHA!' });
Object.assign(NOMBRES.en, { 'Coral rosa': 'Pink coral', 'Coral amarillo': 'Yellow coral', 'Coral violeta': 'Purple coral', 'Horno': 'Furnace', 'Colmena': 'Beehive', 'Riel': 'Rail', 'Tocadiscos': 'Jukebox', 'Huevos de tortuga': 'Turtle eggs',
  'Tinta de calamar': 'Squid ink', 'Frasco de miel': 'Honey bottle', 'Bote': 'Boat', 'Vagoneta': 'Minecart', 'Fuegos artificiales': 'Fireworks', 'Disco: Pradera': 'Disc: Meadow', 'Disco: Océano': 'Disc: Ocean', 'Disco: Cuevas': 'Disc: Caves',
  'Chuleta cruda': 'Raw porkchop', 'Chuleta asada': 'Cooked porkchop', 'Pescado cocido': 'Cooked fish', 'Pez tropical': 'Tropical fish' });
Object.assign(NOMBRES.pt, { 'Coral rosa': 'Coral rosa', 'Coral amarillo': 'Coral amarelo', 'Coral violeta': 'Coral violeta', 'Horno': 'Fornalha', 'Colmena': 'Colmeia', 'Riel': 'Trilho', 'Tocadiscos': 'Toca-discos', 'Huevos de tortuga': 'Ovos de tartaruga',
  'Tinta de calamar': 'Tinta de lula', 'Frasco de miel': 'Pote de mel', 'Bote': 'Barco', 'Vagoneta': 'Carrinho de mina', 'Fuegos artificiales': 'Fogos de artifício', 'Disco: Pradera': 'Disco: Pradaria', 'Disco: Océano': 'Disco: Oceano', 'Disco: Cuevas': 'Disco: Cavernas',
  'Chuleta cruda': 'Costeleta crua', 'Chuleta asada': 'Costeleta assada', 'Pescado cocido': 'Peixe cozido', 'Pez tropical': 'Peixe tropical' });

// ═════════ GENERACIÓN (solo mundos nuevos) ═════════
let decor = [], ruinasMar = [], colmenasGen = [], huevosGen = [], cofresTesoro = new Map();
const nuevoGen = () => (window.genVersion || 1) >= 2 && !window.mundoTipo;
function generarMar(S) {
  decor = []; ruinasMar = []; colmenasGen = []; huevosGen = []; cofresTesoro = new Map();
  const put = (x, y, z, t) => { if (dentro(x, y, z)) mundo[idx(x, y, z)] = t; };
  const piso = (x, z) => { let y = SEA; while (y > 0 && mundo[idx(x, y, z)] === B.AGUA) y--; return y; };
  const F2 = (SX / 160) ** 2;
  // corales, algas y pasto marino
  for (let x = 1; x < SX - 1; x++) for (let z = 1; z < SZ - 1; z++) {
    if (mundo[idx(x, SEA, z)] !== B.AGUA) continue;
    const y0 = piso(x, z), prof = SEA - y0; if (prof < 1 || y0 < 1) continue;
    const suelo = mundo[idx(x, y0, z)]; if (suelo !== B.ARENA && suelo !== B.TIERRA && suelo !== B.PIEDRA && suelo !== B.ADOQUIN) continue;
    const r = h3(x, 77, z, S + 300), arrecife = vn2(x / 16, z / 16, S + 301) > .68 && prof >= 2 && prof <= 9;
    if (arrecife && r < .4) { const c = B.CORAL + Math.floor(h3(x, 78, z, S + 302) * 3); put(x, y0, z, c);
      if (prof >= 5 && r < .06) { const alto = 1 + Math.floor(h3(x, 79, z, S + 303) * Math.min(2, prof - 4)); for (let k = 1; k <= alto; k++) put(x, y0 + k, z, c); continue; }
      if (r < .34) decor.push([x, y0 + 1, z, 'abanico' + Math.floor(h3(x, 80, z, S + 304) * 3), 1]); continue; }
    if (prof >= 4 && r < .07) decor.push([x, y0 + 1, z, 'alga', Math.max(1, Math.min(prof - 1, 2 + Math.floor(h3(x, 81, z, S + 305) * (prof - 2))))]);
    else if (r < .2) decor.push([x, y0 + 1, z, 'pastoMarino', 1]);
  }
  // barcos hundidos con cofre de tesoro
  let barcos = 0;
  for (let n = 0; n < 4000 && barcos < Math.max(1, Math.round(2 * F2)); n++) {
    const x = 6 + Math.floor(h3(n, 1, 90, S + 310) * (SX - 16)), z = 6 + Math.floor(h3(n, 2, 91, S + 311) * (SZ - 12));
    let ok = true, ymin = SEA; for (let a = 0; a < 10 && ok; a++) for (let b = 0; b < 5 && ok; b++) { if (mundo[idx(x + a, SEA, z + b)] !== B.AGUA) ok = false; else ymin = Math.min(ymin, piso(x + a, z + b)); }
    if (!ok || SEA - ymin < 6) continue;
    const y = ymin + 1, roto = (a, b, c) => h3(x + a, y + c, z + b, S + 312) < .18;
    for (let a = 0; a < 10; a++) { const w = a === 0 || a === 9 ? 1 : a === 1 || a === 8 ? 2 : 3, b0 = 2 - Math.floor(w / 2) - (w === 3 ? 0 : 0);
      for (let b = 0; b < 5; b++) { const dentroCasco = Math.abs(b - 2) <= Math.floor(w / 2);
        if (!dentroCasco) continue; put(x + a, y, z + b, B.MADERA_O);
        if (Math.abs(b - 2) === Math.floor(w / 2) || a === 0 || a === 9) for (let c = 1; c <= 2; c++) if (!roto(a, b, c)) put(x + a, y + c, z + b, B.MADERA_O); } }
    for (let c = 1; c <= Math.min(5, SEA - y - 1); c++) put(x + 4, y + c, z + 2, B.TRONCO);
    const ci = idx(x + 6, y + 1, z + 2); put(x + 6, y + 1, z + 2, B.COFRE); cofresTesoro.set(ci, 'barco');
    barcos++;
  }
  // ruinas submarinas (ahí viven los guardianes)
  let ruinas = 0;
  for (let n = 0; n < 4000 && ruinas < Math.max(1, Math.round(1.5 * F2)); n++) {
    const x = 5 + Math.floor(h3(n, 3, 92, S + 320) * (SX - 12)), z = 5 + Math.floor(h3(n, 4, 93, S + 321) * (SZ - 12));
    let ok = true, ymin = SEA; for (let a = 0; a < 7 && ok; a++) for (let b = 0; b < 7 && ok; b++) { if (mundo[idx(x + a, SEA, z + b)] !== B.AGUA) ok = false; else ymin = Math.min(ymin, piso(x + a, z + b)); }
    if (!ok || SEA - ymin < 7) continue;
    const y = ymin + 1;
    for (let a = 0; a < 7; a++) for (let b = 0; b < 7; b++) { put(x + a, y, z + b, (a + b) % 3 ? B.LADRILLO_P : B.MARMOL);
      if ((a === 0 || a === 6 || b === 0 || b === 6) && h3(x + a, y, z + b, S + 322) > .3) for (let c = 1; c <= 1 + Math.floor(h3(a, b, x, S + 323) * 3); c++) if (y + c < SEA - 1) put(x + a, y + c, z + b, B.LADRILLO_P); }
    put(x + 3, y + 1, z + 3, B.CRISTAL_M); const ci = idx(x + 1, y + 1, z + 1); put(x + 1, y + 1, z + 1, B.COFRE); cofresTesoro.set(ci, 'ruina');
    ruinasMar.push({ x: x + 3.5, y: y + 2, z: z + 3.5 }); ruinas++;
  }
  // huevos de tortuga en las playas
  for (let n = 0; n < 3000; n++) {
    if (huevosGen.length >= Math.round(5 * F2)) break;
    const x = 2 + Math.floor(h3(n, 5, 94, S + 330) * (SX - 4)), z = 2 + Math.floor(h3(n, 6, 95, S + 331) * (SZ - 4));
    let y = SY - 2; while (y > 0 && !mundo[idx(x, y, z)]) y--;
    if (mundo[idx(x, y, z)] !== B.ARENA || y !== SEA && y !== SEA + 1) continue;
    if (![[1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [0, 2]].some(([a, b]) => get(x + a, SEA, z + b) === B.AGUA && !get(x + a, SEA + 1, z + b))) continue;
    put(x, y + 1, z, B.HUEVO_TORTUGA); huevosGen.push(idx(x, y + 1, z));
  }
  // colmenas colgando de los árboles
  for (let n = 0; n < 6000; n++) {
    if (colmenasGen.length >= Math.round(6 * F2)) break;
    const x = 2 + Math.floor(h3(n, 7, 96, S + 340) * (SX - 4)), z = 2 + Math.floor(h3(n, 8, 97, S + 341) * (SZ - 4));
    let y = SY - 2; while (y > 0 && mundo[idx(x, y, z)] !== B.HOJAS) { if (mundo[idx(x, y, z)] && mundo[idx(x, y, z)] !== B.HOJAS) { y = 0; break; } y--; }
    if (y < 3) continue; let yy = y; while (yy > 0 && mundo[idx(x, yy, z)] === B.HOJAS) yy--;
    if (mundo[idx(x, yy, z)] !== B.AIRE || mundo[idx(x, yy - 1, z)] !== B.AIRE) continue;
    put(x, yy, z, B.COLMENA); colmenasGen.push(idx(x, yy, z));
  }
  // minas abandonadas: túneles con vigas de madera, rieles, telarañas y cofres
  const H = (x, z) => { let y = SY - 2; while (y > 0 && (!mundo[idx(x, y, z)] || mundo[idx(x, y, z)] === B.AGUA || DEF[mundo[idx(x, y, z)]].planta)) y--; return y; };
  const minas = Math.max(1, Math.round(2 * F2));
  for (let m = 0; m < minas; m++) {
    let x = 20 + Math.floor(h3(m, 9, 98, S + 350) * (SX - 40)), z = 20 + Math.floor(h3(m, 10, 99, S + 351) * (SZ - 40)); const y = 4 + Math.floor(h3(m, 11, 100, S + 352) * 4);
    let dir = Math.floor(h3(m, 12, 101, S + 353) * 4), pasos = 0, cofres = 0;
    for (let tramo = 0; tramo < 14; tramo++) {
      const [dx, dz] = [[1, 0], [0, 1], [-1, 0], [0, -1]][dir], largo = 6 + Math.floor(h3(m, tramo, 102, S + 354) * 10);
      for (let k = 0; k < largo; k++) {
        if (x < 3 || z < 3 || x >= SX - 3 || z >= SZ - 3) break;
        if (H(x, z) < y + 5 || get(x, SEA, z) === B.AGUA && H(x, z) < y + 7) { x -= dx; z -= dz; break; }
        for (let a = -1; a <= 1; a++) for (let c = 0; c < 3; c++) { const px = x + (dz ? a : 0), pz = z + (dx ? a : 0); if (mundo[idx(px, y + c, pz)] !== B.ROCA) put(px, y + c, pz, B.AIRE); }
        put(x, y - 1, z, mundo[idx(x, y - 1, z)] === B.AIRE ? B.MADERA : mundo[idx(x, y - 1, z)]);
        if (h3(x, y, z, S + 355) < .8) put(x, y, z, dx ? B.RIEL_X : B.RIEL);
        if (pasos % 5 === 0) { for (const a of [-1, 1]) { const px = x + (dz ? a : 0), pz = z + (dx ? a : 0); put(px, y, pz, B.VALLA); put(px, y + 1, pz, B.VALLA); put(px, y + 2, pz, B.MADERA); } put(x, y + 2, z, B.MADERA);
          if (h3(x, 5, z, S + 356) < .4) { const px = x + (dz ? 1 : 0), pz = z + (dx ? 1 : 0); put(px, y + 1, pz, B.ANTORCHA); } }
        else if (h3(x, 6, z, S + 357) < .12) { const a = h3(x, 7, z, S + 358) < .5 ? -1 : 1, px = x + (dz ? a : 0), pz = z + (dx ? a : 0); put(px, y + 2, pz, B.TELARANA); }
        if (pasos % 13 === 7 && cofres < 3) { const a = h3(x, 8, z, S + 359) < .5 ? -1 : 1, px = x + (dz ? a : 0), pz = z + (dx ? a : 0); put(px, y, pz, B.COFRE); cofresTesoro.set(idx(px, y, pz), 'mina'); cofres++; }
        x += dx; z += dz; pasos++;
      }
      dir = (dir + (h3(m, tramo, 103, S + 360) < .5 ? 1 : 3)) % 4;
    }
  }
}
{ const g0 = generarExtra; generarExtra = function (S, ej) { const r = g0(S, ej); if (nuevoGen() && !ej) generarMar(S); else { decor = []; ruinasMar = []; colmenasGen = []; huevosGen = []; cofresTesoro = new Map(); } return r; }; }
// cofres con tesoro: barcos hundidos, ruinas y minas
{ const l0 = lootCofre; lootCofre = function (i) {
  const t = cofresTesoro.get(i); if (!t) return l0(i);
  const r = k => h3(i, k, 7, semilla + 400), c = {};
  if (t === 'barco') { c[I.ORO] = 3 + Math.floor(r(1) * 6); c[I.CRISTAL] = 1 + Math.floor(r(2) * 3); c[I.PEZ_T] = 2 + Math.floor(r(3) * 4); if (r(4) < .5) c[I.DISCO + 1] = 1; if (r(5) < .4) c[I.BOTE] = 1; c[I.HIERRO] = 2 + Math.floor(r(6) * 4); }
  else if (t === 'ruina') { c[I.CRISTAL] = 3 + Math.floor(r(1) * 4); c[I.ORO] = 2 + Math.floor(r(2) * 4); if (r(3) < .5) c[I.PICO_E] = 1; else c[I.POCION + Math.floor(r(4) * 4)] = 1; }
  else { c[B.RIEL] = 8 + Math.floor(r(1) * 12); c[I.CARBON] = 3 + Math.floor(r(2) * 6); c[I.HIERRO] = 2 + Math.floor(r(3) * 4); if (r(4) < .6) c[I.DISCO + (r(5) < .5 ? 0 : 2)] = 1; if (r(6) < .5) c[I.VAGONETA] = 1; c[I.PAN] = 1 + Math.floor(r(7) * 3); }
  return c; }; }

// ═════════ DECORACIÓN BAJO EL AGUA (algas, pasto marino, abanicos de coral) ═════════
let decorMesh = null, decorSucio = false;
function construirDecor() {
  if (decorMesh) { escena.remove(decorMesh); decorMesh.geometry.dispose(); decorMesh = null; }
  if (!decor.length) return;
  const P = [], UV = [], L = [], Ix = []; let n = 0; const e = .0006;
  for (const d of decor) {
    const [x, y, z, tile, alto] = d; if (d[5]) continue;
    const tn = TL[tile], tx = tn % 8, ty = Math.floor(tn / 8), u0 = (tx + e) / 8, u1 = (tx + 1 - e) / 8, w0 = 1 - (ty + 1 - e) / ATLAS_F, w1 = 1 - (ty + e) / ATLAS_F;
    for (let k = 0; k < alto; k++) { const yy = y + k; if (get(x, yy, z) !== B.AGUA) break; const [cs, ct] = luzCelda(x, yy, z);
      for (const [a0, b0, a1, b1] of [[.15, .15, .85, .85], [.15, .85, .85, .15]]) for (const lado of [0, 1]) { const p = lado ? [[a1, b1], [a0, b0]] : [[a0, b0], [a1, b1]];
        P.push(x + p[0][0], yy, z + p[0][1], x + p[1][0], yy, z + p[1][1], x + p[1][0], yy + 1, z + p[1][1], x + p[0][0], yy + 1, z + p[0][1]);
        UV.push(...(lado ? [u1, w0, u0, w0, u0, w1, u1, w1] : [u0, w0, u1, w0, u1, w1, u0, w1])); for (let q = 0; q < 4; q++) L.push(.85, cs, ct);
        Ix.push(n, n + 1, n + 2, n, n + 2, n + 3); n += 4; } }
  }
  if (!n) return;
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(UV, 2)); g.setAttribute('luz', new THREE.Float32BufferAttribute(L, 3)); g.setIndex(Ix);
  decorMesh = new THREE.Mesh(g, matOp); escena.add(decorMesh);
}
// si cambia un bloque donde hay decoración (o justo abajo), se rearma
function tocaDecor(x, y, z) { for (const d of decor) if (!d[5] && d[0] === x && d[2] === z && y >= d[1] - 1 && y < d[1] + d[4]) { if (y === d[1] - 1 || get(x, d[1], z) !== B.AGUA) d[5] = 1; decorSucio = true; } }
{ const p0 = ponerBloque; ponerBloque = function (x, y, z, t) { const r = p0(x, y, z, t); if (decor.length) tocaDecor(x, y, z); return r; }; }
{ const p0 = ponerMuchos; ponerMuchos = function (L) { const r = p0(L); if (decor.length) for (const [x, y, z] of L) tocaDecor(x, y, z); return r; }; }
{ const t0 = terminarCarga; terminarCarga = function (g) { const r = t0(g); for (const d of decor) if (diffs.has(idx(d[0], d[1] - 1, d[2])) || get(d[0], d[1], d[2]) !== B.AGUA) d[5] = 1; construirDecor(); nadadores.splice(0).forEach(n => escena.remove(n.g)); return r; }; }

// ═════════ CRIATURAS QUE NADAN ═════════
const nadadores = [];
const COLOR_PEZ = [['#ff8a2e', '#ffffff'], ['#ffd23a', '#3a7aff'], ['#ff4a8a', '#ffe14a'], ['#4ad0ff', '#ffd23a'], ['#7ae05a', '#ff4a5f']];
const MAR = {
  pez: { vida: 2, an: .2, al: .3, vel: 2.3, prof: 2, max: 18, suelta: () => [[Math.random() < .65 ? I.PEZ_T : I.PESCADO, 1]],
    armar(g, v) { const [c1, c2] = COLOR_PEZ[v % COLOR_PEZ.length]; cajaC(g, .16, .26, .42, 0, 0, 0, c1); cajaC(g, .17, .27, .08, 0, 0, .02, c2); cajaC(g, .04, .22, .16, 0, 0, -.27, c2); cajaC(g, .17, .06, .06, 0, .06, .16, '#1d1d21'); return []; } },
  calamar: { vida: 8, an: .4, al: .9, vel: 1, prof: 4, max: 4, suelta: () => [[I.TINTA, 1 + Math.floor(Math.random() * 2)]],
    armar(g) { cajaC(g, .6, .7, .6, 0, .35, 0, '#3a4a7a'); cajaC(g, .62, .14, .1, 0, .22, .3, '#e8e8f0'); for (const s of [-1, 1]) cajaC(g, .1, .1, .04, s * .15, .22, .32, '#1d1d21');
      const t = []; for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283; t.push(pata(g, .1, .7, .1, Math.cos(a) * .22, 0, Math.sin(a) * .22, matA(0x34446e))); } return t; } },
  delfin: { vida: 10, an: .45, al: .6, vel: 4.2, prof: 3, max: 3, suelta: () => [[I.PESCADO, 1 + Math.floor(Math.random() * 2)]],
    armar(g) { cajaC(g, .5, .5, 1.3, 0, 0, 0, '#6f8fb8'); cajaC(g, .44, .2, 1.1, 0, -.18, .05, '#dfe8f4'); cajaC(g, .26, .2, .4, 0, -.08, .82, '#6f8fb8'); cajaC(g, .1, .32, .3, 0, .38, -.05, '#5a7aa0');
      cajaC(g, .7, .08, .26, 0, -.05, -.78, '#5a7aa0'); for (const s of [-1, 1]) { cajaC(g, .3, .06, .2, s * .32, -.2, .2, '#5a7aa0'); cajaC(g, .04, .08, .08, s * .25, .08, .5, '#1d1d21'); } return []; } },
  guardian: { vida: 20, an: .5, al: .9, vel: 1.8, prof: 5, max: 3, hostil: true, suelta: () => [[I.CRISTAL, 1], [I.PESCADO, 1]],
    armar(g) { cajaC(g, .9, .9, .9, 0, .45, 0, '#4aa89a'); cajaC(g, .6, .6, .06, 0, .45, .46, '#e8f0e0'); cajaC(g, .3, .3, .08, 0, .45, .48, '#ff8a2e'); cajaC(g, .12, .12, .1, 0, .45, .5, '#1d1d21');
      for (const [x, y, z] of [[.5, .8, .2], [-.5, .8, -.2], [.5, .1, -.3], [-.5, .1, .3], [.2, .95, -.4], [-.2, -.05, .4], [0, .95, .3], [0, -.05, -.3]]) cajaC(g, .1, .1, .1, x, y, z, '#ffb02e');
      cajaC(g, .3, .3, .7, 0, .45, -.75, '#3a8a7e'); cajaC(g, .5, .1, .2, 0, .45, -1.15, '#ffb02e'); return []; } },
};
const esAgua = (x, y, z) => get(Math.floor(x), Math.floor(y), Math.floor(z)) === B.AGUA;
const profEn = (x, z) => { let y = SEA, n = 0; while (y > 0 && get(x, y, z) === B.AGUA) { y--; n++; } return n; };
function crearNadador(tipo, x, y, z, variante = 0) {
  const T = MAR[tipo], g = new THREE.Group(), cuerpo = new THREE.Group(); g.add(cuerpo); const patas = T.armar(cuerpo, variante);
  const mats = []; g.traverse(o => { if (o.material && !mats.includes(o.material)) mats.push(o.material); });
  g.position.set(x, y, z); escena.add(g);
  const n = { tipo, g, cuerpo, patas, mats, vida: T.vida, vx: 0, vy: 0, vz: 0, obj: null, objT: 0, t: Math.random() * 9, rojo: 0, var: variante, carga: 0, salto: 0 };
  nadadores.push(n); return n;
}
function quitarNadador(n) { escena.remove(n.g); const k = nadadores.indexOf(n); if (k >= 0) nadadores.splice(k, 1); }
let mrSpawnT = 0;
function aparecerNadadores() {
  if (!jugando || window.mundoTipo) return;
  const cuenta = t => nadadores.filter(n => n.tipo === t).length, cerca = (x, z) => Math.hypot(x - J.x, z - J.z);
  for (let intento = 0; intento < 6; intento++) {
    const a = Math.random() * 6.283, d = 14 + Math.random() * 28, x = Math.floor(J.x + Math.cos(a) * d), z = Math.floor(J.z + Math.sin(a) * d);
    if (x < 2 || z < 2 || x >= SX - 2 || z >= SZ - 2 || get(x, SEA, z) !== B.AGUA) continue;
    const prof = profEn(x, z), y = SEA - Math.floor(Math.random() * Math.max(1, prof - 1)) + .3;
    const r = Math.random();
    if (r < .55 && cuenta('pez') < MAR.pez.max && prof >= 2) { const v = Math.floor(Math.random() * COLOR_PEZ.length), lider = crearNadador('pez', x + .5, y, z + .5, v); for (let k = 0; k < 3; k++) { const p = crearNadador('pez', x + .5 + Math.random(), y + (Math.random() - .5) * .6, z + .5 + Math.random(), v); p.lider = lider; } }
    else if (r < .72 && cuenta('calamar') < MAR.calamar.max && prof >= 4) crearNadador('calamar', x + .5, SEA - prof + 1.5, z + .5);
    else if (r < .88 && cuenta('delfin') < MAR.delfin.max && prof >= 3) crearNadador('delfin', x + .5, SEA - .2, z + .5);
    else if (cuenta('guardian') < MAR.guardian.max && ruinasMar.length && !creativo()) { const ru = ruinasMar.find(q => cerca(q.x, q.z) < 40); if (ru) crearNadador('guardian', ru.x + (Math.random() - .5) * 4, ru.y + 1, ru.z + (Math.random() - .5) * 4); }
  }
}
function elegirObjetivo(n, T) {
  const p = n.g.position;
  for (let k = 0; k < 8; k++) { const x = p.x + (Math.random() - .5) * 12, z = p.z + (Math.random() - .5) * 12, y = Math.min(SEA + .5, Math.max(1, p.y + (Math.random() - .5) * 3));
    if (esAgua(x, y, z) && esAgua(x, Math.min(SEA, y), z)) { n.obj = { x, y, z }; n.objT = 3 + Math.random() * 4; return; } }
  n.obj = null; n.objT = 1;
}
const rayoMar = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 1, 6), new THREE.MeshBasicMaterial({ color: 0xff9a4a, transparent: true, opacity: .8, fog: false })); rayoMar.visible = false; escena.add(rayoMar);
let gracia = 0, avisoGracia = false;
function moverNadadores(dt) {
  if (!jugando) return;
  mrSpawnT -= dt; if (mrSpawnT <= 0) { mrSpawnT = 2.5; aparecerNadadores(); }
  rayoMar.visible = false;
  const cabeza = J.y + OJOS, jEnAgua = esAgua(J.x, J.y + .3, J.z) || esAgua(J.x, cabeza, J.z);
  for (const n of nadadores.slice()) {
    const T = MAR[n.tipo], p = n.g.position, dJ = Math.hypot(J.x - p.x, J.z - p.z, (J.y + 1) - p.y); n.t += dt;
    if (dJ > 70) { quitarNadador(n); continue; }
    let ax = 0, ay = 0, az = 0, vel = T.vel;
    if (n.tipo === 'pez' && n.lider && nadadores.includes(n.lider)) { const q = n.lider.g.position; n.obj = { x: q.x + Math.sin(n.t + n.var) * .8, y: q.y + Math.cos(n.t * .7) * .3, z: q.z + Math.cos(n.t + n.var) * .8 }; }
    else { n.objT -= dt; if (!n.obj || n.objT <= 0) elegirObjetivo(n, T); }
    // los peces y calamares escapan si te acercas; el delfín te acompaña; el guardián te ataca
    if ((n.tipo === 'pez' || n.tipo === 'calamar') && dJ < 3 && jEnAgua) n.obj = { x: p.x + (p.x - J.x) * 3, y: p.y, z: p.z + (p.z - J.z) * 3 };
    if (n.tipo === 'delfin' && jEnAgua && dJ < 16) { n.obj = { x: J.x + Math.sin(n.t) * 2, y: Math.min(SEA + .2, J.y + 1), z: J.z + Math.cos(n.t) * 2 }; vel = 5; if (dJ < 5) { gracia = 4; } }
    if (n.tipo === 'guardian' && !creativo() && dJ < 14 && jEnAgua) {
      n.obj = { x: J.x, y: J.y + 1, z: J.z }; vel = dJ < 5 ? 0 : 1.8;
      n.carga += dt; if (n.carga > .3) { // rayo que se va cargando
        rayoMar.visible = true; const a = new THREE.Vector3(p.x, p.y + .45, p.z), b = new THREE.Vector3(J.x, J.y + 1.1, J.z), m = a.clone().add(b).multiplyScalar(.5);
        rayoMar.position.copy(m); rayoMar.scale.set(1, a.distanceTo(b), 1); rayoMar.lookAt(b); rayoMar.rotateX(Math.PI / 2); rayoMar.material.opacity = Math.min(1, n.carga / 2.5);
        rayoMar.material.color.setHex(n.carga > 2 ? 0xffe14a : 0xff9a4a); }
      if (n.carga > 2.5) { n.carga = -1.5; lastimar(4, (J.x - p.x) / (dJ || 1), (J.z - p.z) / (dJ || 1), false); }
      if (!n.avisado) { n.avisado = true; aviso(TR('guardian'), 1500); }
    } else if (n.tipo === 'guardian') n.carga = Math.max(0, n.carga - dt);
    if (n.obj) { const dx = n.obj.x - p.x, dy = n.obj.y - p.y, dz = n.obj.z - p.z, d = Math.hypot(dx, dy, dz) || 1; ax = dx / d * vel; ay = dy / d * vel * .6; az = dz / d * vel; if (d < .5) n.obj = null; }
    const k = Math.min(1, dt * 2); n.vx += (ax - n.vx) * k; n.vy += (ay - n.vy) * k; n.vz += (az - n.vz) * k;
    // el delfín salta cuando llega a la superficie
    if (n.tipo === 'delfin') { if (n.salto > 0) { n.salto -= dt; n.vy -= 14 * dt; } else if (p.y > SEA - .3 && Math.random() < dt * .4) { n.salto = 1; n.vy = 6; } }
    let nx = p.x + n.vx * dt, ny = p.y + n.vy * dt, nz = p.z + n.vz * dt;
    const aire = n.salto > 0 && ny > SEA; // en el aire solo durante el salto
    if (!aire && !esAgua(nx, ny, nz)) { if (esAgua(p.x, ny, p.z)) { nx = p.x; nz = p.z; } else if (esAgua(nx, p.y, nz)) ny = p.y; else { nx = p.x; ny = p.y; nz = p.z; } n.vx *= -.5; n.vz *= -.5; n.obj = null; }
    if (!aire && ny > SEA + .45) ny = SEA + .45;
    if (n.salto <= 0 && !esAgua(nx, ny, nz) && n.tipo !== 'delfin') { ny = p.y - dt * 2; }
    p.set(nx, ny, nz);
    const sp = Math.hypot(n.vx, n.vz); if (sp > .1) { const r = Math.atan2(n.vx, n.vz); let d = r - n.g.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); n.g.rotation.y += d * Math.min(1, dt * 6); }
    n.cuerpo.rotation.x = Math.max(-.6, Math.min(.6, -n.vy * .25));
    if (n.tipo === 'pez') n.cuerpo.rotation.z = Math.sin(n.t * 12) * .15;
    n.patas.forEach((t, i) => t.rotation.x = Math.sin(n.t * 3 + i) * .4);
    n.rojo -= dt; for (const m of n.mats) if (m.emissive) m.emissive.setHex(n.rojo > 0 ? 0x990000 : 0);
    // si el agua desapareció (alguien la rompió o tapó), el bicho se va
    if (!esAgua(p.x, p.y, p.z) && n.salto <= 0) { n.fuera = (n.fuera || 0) + dt; if (n.fuera > 3) quitarNadador(n); } else n.fuera = 0;
  }
  // gracia del delfín
  if (gracia > 0 && jEnAgua) { gracia -= dt; J.nado = 1.9; if (!avisoGracia) { avisoGracia = true; aviso(TR('gracia'), 1800); } } else { J.nado = 1; if (gracia > 0) gracia -= dt; }
}
// pegarle a un bicho del mar
{ const t0 = tocar; tocar = function (dir) {
    if (nadadores.length) {
      const o = new THREE.Vector3(J.x, J.y + OJOS, J.z), r = new THREE.Ray(o, dir), v = new THREE.Vector3(); let mejor = null;
      for (const n of nadadores) { const p = n.g.position, T = MAR[n.tipo], an = T.an + .15, al = T.al + .1;
        if (r.intersectBox(new THREE.Box3(new THREE.Vector3(p.x - an, p.y - .25, p.z - an), new THREE.Vector3(p.x + an, p.y + al, p.z + an)), v)) { const d = v.distanceTo(o); if (d < 4.5 && (!mejor || d < mejor.d)) mejor = { n, d }; } }
      const h = apuntar(dir);
      if (mejor && (!h || mejor.d < h.t)) { const n = mejor.n, dano = [2, 3, 4, 6, 8, 11][nivelEspada()] * (J.fuerza || 1);
        n.vida -= dano; n.rojo = .25; n.vx += dir.x * 5; n.vz += dir.z * 5; swing = 1; sonar('golpe', .7) || son(220, .1, 'sawtooth', .12);
        if (n.tipo === 'calamar') polvo(n.g.position.x, n.g.position.y + .3, n.g.position.z, '#1d1d2a', 14);
        if (n.vida <= 0) { polvo(n.g.position.x, n.g.position.y, n.g.position.z, '#9fe0ff', 8); if (!creativo()) for (const [id, c] of MAR[n.tipo].suelta()) darItem(id, c); if (n.tipo === 'guardian' && typeof __lg !== 'undefined') { __lg.sumar('mata'); __lg.sumar('guardian'); } quitarNadador(n); }
        return; }
    }
    return t0(dir); }; }

// ═════════ AIRE BAJO EL AGUA ═════════
let aire = 10, ahogoT = 0, avisoAire = false;
{ const st = document.createElement('style'); st.textContent = `#aireHud { display: flex; gap: 2px; padding: 1px 4px; background: rgba(13,21,61,.5); border-radius: 8px; } #aireHud svg { width: 12px; height: 12px; }`; document.head.appendChild(st);
  const d = document.createElement('div'); d.id = 'aireHud'; d.hidden = true; const g = document.querySelector('#barrasHud .grupo:last-child') || $('hud'); g.insertBefore(d, g.firstChild); }
const BURBUJA = '<svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="4.6" fill="#9fe0ff" stroke="#0d153d" stroke-width="1.6"/><circle cx="4.6" cy="4.4" r="1.3" fill="#fff"/></svg>';
let airePintado = -1;
function pintarAire() { const n = Math.ceil(aire); if (n === airePintado) return; airePintado = n; $('aireHud').hidden = n >= 10; $('aireHud').innerHTML = BURBUJA.repeat(Math.max(0, n)); }
function respirar(dt) {
  if (!jugando || pausado) return;
  const bajo = esAgua(J.x, J.y + OJOS, J.z) && !creativo();
  if (bajo) { aire = Math.max(0, aire - dt / 1.5); if (aire < 4 && !avisoAire) { avisoAire = true; aviso(TR('sinAire'), 1600); }
    if (aire <= 0) { ahogoT += dt; if (ahogoT > 1) { ahogoT = 0; lastimar(2, 0, 0, false); } } }
  else { aire = Math.min(10, aire + dt * 5); ahogoT = 0; if (aire > 6) avisoAire = false; }
  pintarAire();
}

// ═════════ TORTUGAS ═════════
TIPOS.tortuga = { vida: 10, an: .4, al: .5, vel: .6, peso: .3, color: '#5a9a3a', voz: 'tortuga',
  armar(g) { cajaC(g, .9, .3, 1, 0, .35, 0, '#4a8a3a'); cajaC(g, .7, .1, .8, 0, .52, 0, '#6aa84f'); cajaC(g, .92, .12, 1.02, 0, .24, 0, '#d8c88a'); cajaC(g, .3, .26, .32, 0, .34, .62, '#8ac06a');
    for (const s of [-1, 1]) cajaC(g, .05, .06, .02, s * .08, .4, .78, '#1d1d21');
    return [[.38, .32], [-.38, -.32], [-.38, .32], [.38, -.32]].map(([x, z]) => pata(g, .2, .2, .26, x, .24, z, matA(0x8ac06a))); },
  suelta: () => [[I.PESCADO, Math.random() < .3 ? 1 : 0]].filter(x => x[1]) };
// los huevos nacen si estás cerca un rato
let huevoT = new Map(), huevoRevT = 0;
function cuidarHuevos(dt) {
  if (!jugando || pausado || (typeof MP !== 'undefined' && MP.invitado)) return;
  huevoRevT -= dt; if (huevoRevT <= 0) { huevoRevT = 2;
    const lista = new Set(huevosGen.filter(i => mundo[i] === B.HUEVO_TORTUGA)); for (const [i, t] of diffs) if (t === B.HUEVO_TORTUGA) lista.add(i);
    for (const i of lista) { const [x, y, z] = xyz(i); if (Math.hypot(x - J.x, z - J.z) > 24) continue; const v = (huevoT.get(i) || 0) + 2; huevoT.set(i, v);
      if (v > 150) { huevoT.delete(i); sinGrupo(() => ponerBloque(x, y, z, B.AIRE)); for (let k = 0; k < 2; k++) { const a = crearAnimal('tortuga', x + .5 + (Math.random() - .5) * .4, y + .1, z + .5); a.userData.bebe = 180; a.scale.setScalar(.5); } aviso(TR('nacioTortuga'), 1600); if (typeof __lg !== 'undefined') __lg.sumar('tortuga'); son(880, .15, 'triangle', .1); } } }
}

// ═════════ CADA CUADRO ═════════
function marFrame(dt) {
  if (decorSucio) { decorSucio = false; construirDecor(); }
  if (!jugando) { rayoMar.visible = false; return; }
  respirar(dt); if (pausado) return;
  moverNadadores(dt); cuidarHuevos(dt);
}
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; try { marFrame(dt); } catch (e) { console.error(e); } }; requestAnimationFrame(tick); }
{ const s0 = salirAlMenu; salirAlMenu = function () { nadadores.splice(0).forEach(n => escena.remove(n.g)); rayoMar.visible = false; return s0(); }; }
window.__mar = { nadadores, crearNadador, decor: () => decor, ruinas: () => ruinasMar, colmenas: () => colmenasGen, huevos: () => huevosGen, tesoros: () => cofresTesoro, aire: () => aire, generarMar };
