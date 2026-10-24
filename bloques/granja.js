'use strict';
// ═════════ GRANJA Y CAMPO: cerdo, caballo (se doma y se monta), loro (se posa en el hombro), abejas con colmena y miel, horno ═════════

Object.assign(TX.es, {
  caballoDomado: '¡CABALLO DOMADO!<small>ponle una montura para andar</small>', caballoNo: 'SE RESISTE… PRUEBA OTRA VEZ', caballoPide: 'DALE MANZANAS O TRIGO PARA DOMARLO', caballoMontura: 'MONTURA PUESTA<small>tócalo para subir</small>', aCaballo: '¡A CABALLO!<small>toca Bajar para desmontar</small>',
  loroDomado: '¡EL LORO ES TU AMIGO!<small>tócalo para que se suba a tu hombro</small>', loroPide: 'DALE SEMILLAS AL LORO', loroHombro: 'EL LORO VA EN TU HOMBRO', loroBaja: 'EL LORO SE BAJÓ',
  mielLista: '¡MIEL!<small>cuidado: las abejas se enojan</small>', mielNo: 'TODAVÍA NO HAY MIEL', abejasEnojadas: '¡LAS ABEJAS SE ENOJARON!',
  hornoPide: 'TOCA EL HORNO CON ALGO PARA COCINAR<small>carne, pescado, papas, arena, adoquín o troncos</small>', hornoSinFuego: 'EL HORNO NECESITA CARBÓN O MADERA', hornoListo: '¡LISTO! COCINASTE {n}'
});
Object.assign(TX.en, {
  caballoDomado: 'HORSE TAMED!<small>put a saddle on it to ride</small>', caballoNo: 'IT RESISTS… TRY AGAIN', caballoPide: 'FEED IT APPLES OR WHEAT TO TAME IT', caballoMontura: 'SADDLE ON<small>tap it to ride</small>', aCaballo: 'GIDDY UP!<small>tap Get off to dismount</small>',
  loroDomado: 'THE PARROT IS YOUR FRIEND!<small>tap it to put it on your shoulder</small>', loroPide: 'GIVE THE PARROT SEEDS', loroHombro: 'THE PARROT IS ON YOUR SHOULDER', loroBaja: 'THE PARROT HOPPED OFF',
  mielLista: 'HONEY!<small>careful: the bees get angry</small>', mielNo: 'NO HONEY YET', abejasEnojadas: 'THE BEES ARE ANGRY!',
  hornoPide: 'TAP THE FURNACE WITH SOMETHING TO COOK<small>meat, fish, potatoes, sand, cobblestone or logs</small>', hornoSinFuego: 'THE FURNACE NEEDS COAL OR WOOD', hornoListo: 'DONE! YOU COOKED {n}'
});
Object.assign(TX.pt, {
  caballoDomado: 'CAVALO DOMADO!<small>coloque uma sela para andar</small>', caballoNo: 'ELE RESISTE… TENTE DE NOVO', caballoPide: 'DÊ MAÇÃS OU TRIGO PARA DOMÁ-LO', caballoMontura: 'SELA COLOCADA<small>toque para subir</small>', aCaballo: 'A CAVALO!<small>toque Descer para sair</small>',
  loroDomado: 'O PAPAGAIO É SEU AMIGO!<small>toque para ele subir no seu ombro</small>', loroPide: 'DÊ SEMENTES AO PAPAGAIO', loroHombro: 'O PAPAGAIO ESTÁ NO SEU OMBRO', loroBaja: 'O PAPAGAIO DESCEU',
  mielLista: 'MEL!<small>cuidado: as abelhas ficam bravas</small>', mielNo: 'AINDA NÃO TEM MEL', abejasEnojadas: 'AS ABELHAS FICARAM BRAVAS!',
  hornoPide: 'TOQUE A FORNALHA COM ALGO PARA COZINHAR<small>carne, peixe, batatas, areia, pedregulho ou troncos</small>', hornoSinFuego: 'A FORNALHA PRECISA DE CARVÃO OU MADEIRA', hornoListo: 'PRONTO! VOCÊ COZINHOU {n}'
});

// ═════════ ANIMALES NUEVOS ═════════
TIPOS.cerdo = { vida: 10, an: .4, al: 1, vel: 1, peso: .34, color: '#f4a8b8', voz: 'cerdo',
  armar(g) { const r = matA(0xf4a8b8), r2 = matA(0xe88aa0), ne = matA(0x3a2020);
    caja(g, .7, .55, .95, 0, .62, 0, r); caja(g, .56, .5, .46, 0, .78, .62, r); caja(g, .28, .2, .08, 0, .7, .88, r2); caja(g, .05, .07, .02, .07, .7, .925, ne); caja(g, .05, .07, .02, -.07, .7, .925, ne);
    ojos(g, .13, .88, .855); caja(g, .14, .12, .06, .2, 1.06, .56, r2); caja(g, .14, .12, .06, -.2, 1.06, .56, r2);
    return [[.22, .3], [-.22, -.3], [-.22, .3], [.22, -.3]].map(([x, z]) => pata(g, .18, .36, .18, x, .36, z, r)); },
  suelta: () => [[I.CHULETA, 1 + Math.floor(Math.random() * 3)]] };
const PELAJE = [['#8a5a32', '#3a2414'], ['#e8e0d0', '#8a7a6a'], ['#3a3a42', '#1d1d21'], ['#c89a5a', '#f4ead8']];
TIPOS.caballo = { vida: 15, an: .45, al: 1.6, vel: 1.4, peso: .4, color: '#8a5a32', voz: 'caballo',
  armar(g) { return armarCaballo(g, 0); }, cargar(a) { const e = a.userData.extra || {}; if (e.c != null || e.m) vestirCaballo(a); },
  suelta: () => [[I.CARNE, 1]] };
function armarCaballo(g, c, montura) {
  const [p1, p2] = PELAJE[c % PELAJE.length], m1 = matA(parseInt(p1.slice(1), 16)), m2 = matA(parseInt(p2.slice(1), 16));
  caja(g, .62, .62, 1.3, 0, 1.05, 0, m1); caja(g, .34, .62, .34, 0, 1.45, .62, m1); caja(g, .32, .3, .62, 0, 1.75, .84, m1); caja(g, .3, .2, .2, 0, 1.68, 1.12, m2);
  caja(g, .1, .7, .3, 0, 1.6, .52, m2); caja(g, .1, .1, .2, .1, 1.95, .72, m1); caja(g, .1, .1, .2, -.1, 1.95, .72, m1); caja(g, .14, .5, .14, 0, 1.05, -.72, m2);
  ojos(g, .15, 1.8, 1.152);
  if (montura) { caja(g, .66, .1, .6, 0, 1.38, 0, matA(0x6b3a1a)); caja(g, .68, .2, .1, 0, 1.45, -.24, matA(0x6b3a1a)); for (const s of [-1, 1]) caja(g, .04, .3, .06, s * .34, 1.15, .05, matA(0x9aa3b8)); }
  return [[.2, .45], [-.2, -.45], [-.2, .45], [.2, -.45]].map(([x, z]) => pata(g, .18, .8, .18, x, .8, z, m2));
}
function vestirCaballo(a) {
  const e = a.userData.extra || {}; while (a.children.length) a.remove(a.children[0]);
  a.userData.patas = armarCaballo(a, e.c || 0, e.m); const mats = []; a.traverse(o => { if (o.material && !mats.includes(o.material)) mats.push(o.material); }); a.userData.mats = mats;
}
TIPOS.loro = { vida: 4, an: .2, al: .7, vel: 1.4, peso: .2, color: '#ff4a5f', voz: 'loro',
  armar(g) { const c = [0xff4a5f, 0x3ad06a, 0x3a9aff][Math.floor(Math.random() * 3)], m = matA(c);
    caja(g, .26, .34, .3, 0, .38, 0, m); caja(g, .24, .24, .24, 0, .64, .08, m); caja(g, .1, .12, .12, 0, .6, .24, matA(0xffd23a)); ojos(g, .08, .68, .205, .6);
    for (const s of [-1, 1]) caja(g, .06, .26, .24, s * .16, .38, -.02, matA(0xffd23a)); caja(g, .12, .06, .3, 0, .26, -.26, matA(0x3a9aff));
    return [.07, -.07].map(x => pata(g, .05, .2, .05, x, .22, 0, matA(0x6a6a6a))); },
  guiar(a, dt) { const e = a.userData.extra; if (e && e.d && !e.h && typeof seguir === 'function') return seguir(a, dt, 2); return null; },
  suelta: () => [] };
// voces de los animales nuevos
{ const v0 = voz; voz = function (tipo, dist = 0) {
    const T = TIPOS[tipo], t = T && T.voz ? T.voz : tipo;
    if (!['cerdo', 'caballo', 'loro', 'tortuga', 'abeja'].includes(t)) return v0(tipo, dist);
    const c = audio(); if (!c) return; const v = Math.max(0, 1 - dist / 20) * .2; if (v < .01 || t === 'tortuga') return; const n = c.currentTime;
    const tono = (f0, f1, d, forma, filtro, t0 = 0, vib = 0) => { const o = c.createOscillator(), g = c.createGain(), fi = c.createBiquadFilter(); o.type = forma; o.frequency.setValueAtTime(f0, n + t0); o.frequency.linearRampToValueAtTime(f1, n + t0 + d);
      if (vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = 18; lg.gain.value = vib; l.connect(lg).connect(o.frequency); l.start(n + t0); l.stop(n + t0 + d); }
      fi.type = 'lowpass'; fi.frequency.value = filtro; g.gain.setValueAtTime(0, n + t0); g.gain.linearRampToValueAtTime(v, n + t0 + .03); g.gain.linearRampToValueAtTime(0, n + t0 + d); o.connect(fi).connect(g).connect(AU.sfx); o.start(n + t0); o.stop(n + t0 + d + .02); };
    if (t === 'cerdo') { tono(240, 180, .16, 'sawtooth', 900); tono(230, 170, .14, 'sawtooth', 900, .2); }
    else if (t === 'caballo') { tono(700, 900, .2, 'sawtooth', 2000, 0, 60); tono(900, 400, .55, 'sawtooth', 1800, .2, 80); }
    else if (t === 'loro') { tono(1500, 2200, .08, 'square', 3500); tono(2200, 1400, .1, 'square', 3500, .12); }
    else if (t === 'abeja') tono(220, 230, .4, 'sawtooth', 700, 0, 10);
  }; }

// ═════════ DÓNDE APARECEN ═════════
{ const p0 = poblarAnimales; poblarAnimales = function (n, lejos) {
    const nuevos = Math.round(n * .35), viejos = n - nuevos; if (viejos > 0) p0(viejos, lejos);
    for (let k = 0, intentos = 0; k < nuevos && intentos < nuevos * 40; intentos++) {
      const x = 3 + Math.floor(Math.random() * (SX - 6)), z = 3 + Math.floor(Math.random() * (SZ - 6));
      if (lejos && Math.hypot(x - J.x, z - J.z) < 26) continue;
      let y = SY - 2; while (y > 0 && !solidoMov(get(x, y, z)) && get(x, y, z) !== B.AGUA) y--;
      const top = get(x, y, z), bio = biomaDe ? biomaDe(x, z) : 0; if (solidoMov(get(x, y + 1, z)) || solidoMov(get(x, y + 2, z))) continue;
      let tipo = null;
      if (top === B.ARENA && y <= SEA + 2 && [[2, 0], [-2, 0], [0, 2], [0, -2]].some(([a, b]) => get(x + a, SEA, z + b) === B.AGUA)) tipo = 'tortuga';
      else if (top === B.PASTO && bio === 3) tipo = Math.random() < .6 ? 'loro' : 'cerdo';
      else if (top === B.PASTO) tipo = Math.random() < .6 ? 'cerdo' : 'caballo';
      if (!tipo) continue;
      const a = crearAnimal(tipo, x + .5, y + 1, z + .5); if (tipo === 'caballo') { a.userData.extra = { c: Math.floor(Math.random() * PELAJE.length) }; vestirCaballo(a); }
      k++;
    }
  }; }

// ═════════ DOMAR Y MONTAR EL CABALLO, EL LORO EN EL HOMBRO ═════════
let caballoMontado = null;
{ const t0 = tocarAnimal; tocarAnimal = function (a, dir) {
    const u = a.userData, e = u.extra || (u.extra = {}), id = barra[sel] || 0, tiene = n => creativo() || (inv[n] > 0), gasta = n => { if (!creativo()) quitarItem(n, 1); };
    if (u.animal === 'caballo') {
      if (!e.d) { if ((id === I.MANZANA || id === I.TRIGO_I) && tiene(id)) { gasta(id); swing = 1; voz('caballo', 0);
          if (Math.random() < .35 || creativo()) { e.d = 1; corazones(a, 8); aviso(TR('caballoDomado'), 1800); sucio = true; } else { polvo(a.position.x, a.position.y + 1, a.position.z, '#888888', 6); aviso(TR('caballoNo'), 1000); } return true; }
        if (!id || ITEM[id]) { aviso(TR('caballoPide'), 1500); return true; } return false; }
      if (!e.m) { if (id === I.MONTURA && tiene(id)) { gasta(id); e.m = 1; vestirCaballo(a); aviso(TR('caballoMontura'), 1600); sucio = true; return true; } aviso(TR('necesitaMontura'), 1500); return true; }
      if (!id || ITEM[id]) { montarCaballo(a); return true; } return false;
    }
    if (u.animal === 'loro') {
      if (!e.d) { if (id === I.SEMILLAS && tiene(id)) { gasta(id); swing = 1; voz('loro', 0); if (Math.random() < .35 || creativo()) { e.d = 1; corazones(a, 6); aviso(TR('loroDomado'), 1800); sucio = true; } else aviso(TR('noQuiso'), 900); return true; }
        if (!id || ITEM[id]) { aviso(TR('loroPide'), 1200); return true; } return false; }
      e.h = e.h ? 0 : 1; u.montado = !!e.h; aviso(TR(e.h ? 'loroHombro' : 'loroBaja'), 1000); voz('loro', 0); sucio = true; if (!e.h) a.position.set(J.x + 1, J.y + .2, J.z); return true;
    }
    return t0(a, dir);
  }; }
function montarCaballo(a) {
  caballoMontado = a; a.userData.montado = true; J.velMonta = 2.1; J.x = a.position.x; J.z = a.position.z; J.y = a.position.y + .1; J.vy = 0;
  window.montando = true; $('bDesmontar').hidden = false; aviso(TR('aCaballo'), 2000); voz('caballo', 0);
}
function bajarCaballo() {
  const a = caballoMontado; if (!a) return; caballoMontado = null; a.userData.montado = false; a.userData.vy = 0; J.velMonta = 1; window.montando = false; $('bDesmontar').hidden = true;
  a.position.set(J.x, J.y, J.z); J.x += Math.cos(J.yaw) * 1.2; J.z -= Math.sin(J.yaw) * 1.2; sucio = true;
}
{ const d0 = desmontar; desmontar = function () { if (caballoMontado) return bajarCaballo(); return d0(); }; }
{ const e0 = entrarMundo; entrarMundo = function (id) { if (caballoMontado) { caballoMontado = null; J.velMonta = 1; } return e0(id); }; }

// ═════════ ABEJAS Y MIEL ═════════
const abejas = [], mielT = new Map(); let enojo = 0, colmenaRevT = 0, colmenasCerca = [];
function nuevaAbeja(cx, cy, cz) {
  const g = new THREE.Group(); cajaC(g, .22, .18, .3, 0, 0, 0, '#ffd23a'); cajaC(g, .23, .19, .06, 0, 0, -.04, '#1d1d21'); cajaC(g, .23, .19, .06, 0, 0, .08, '#1d1d21');
  const alas = [cajaC(g, .2, .02, .14, .14, .12, 0, '#e0f4ff'), cajaC(g, .2, .02, .14, -.14, .12, 0, '#e0f4ff')]; cajaC(g, .1, .1, .02, 0, .02, .16, '#1d1d21');
  g.position.set(cx + .5, cy + .5, cz + .5); escena.add(g);
  const b = { g, alas, casa: { x: cx + .5, y: cy + .5, z: cz + .5 }, obj: null, t: Math.random() * 9, vida: 3, pica: 0 }; abejas.push(b); return b;
}
function moverAbejas(dt) {
  colmenaRevT -= dt;
  if (colmenaRevT <= 0) { colmenaRevT = 3;
    const set = new Set(colmenasGen.filter(i => mundo[i] === B.COLMENA)); for (const [i, t] of diffs) if (t === B.COLMENA) set.add(i);
    colmenasCerca = [...set].filter(i => { const [x, , z] = xyz(i); return Math.hypot(x - J.x, z - J.z) < 32; });
    const dia = oscuridad() < .5;
    for (const i of colmenasCerca) { const [x, y, z] = xyz(i), suyas = abejas.filter(b => Math.hypot(b.casa.x - x - .5, b.casa.z - z - .5) < .1).length; if (dia && suyas < 3) nuevaAbeja(x, y, z); }
    for (const b of abejas.slice()) if (Math.hypot(b.g.position.x - J.x, b.g.position.z - J.z) > 48 || (!dia && enojo <= 0)) { escena.remove(b.g); abejas.splice(abejas.indexOf(b), 1); }
  }
  enojo = Math.max(0, enojo - dt);
  for (const b of abejas) {
    const p = b.g.position; b.t += dt; b.alas.forEach((a, k) => a.rotation.z = Math.sin(b.t * 60) * .6 * (k ? -1 : 1));
    let obj;
    if (enojo > 0 && Math.hypot(p.x - J.x, p.z - J.z) < 14) { obj = { x: J.x, y: J.y + 1.2, z: J.z }; b.pica -= dt;
      if (p.distanceTo(new THREE.Vector3(J.x, J.y + 1, J.z)) < 1 && b.pica <= 0 && !creativo()) { b.pica = 1.5; lastimar(1, 0, 0, false); voz('abeja', 0); } }
    else { if (!b.obj || Math.random() < dt * .4) b.obj = { x: b.casa.x + (Math.random() - .5) * 8, y: b.casa.y + (Math.random() - .3) * 3, z: b.casa.z + (Math.random() - .5) * 8 }; obj = b.obj; }
    const dx = obj.x - p.x, dy = obj.y - p.y, dz = obj.z - p.z, d = Math.hypot(dx, dy, dz) || 1, v = enojo > 0 ? 4 : 1.6;
    const nx = p.x + dx / d * v * dt, ny = p.y + dy / d * v * dt + Math.sin(b.t * 6) * .01, nz = p.z + dz / d * v * dt;
    if (!solidoMov(get(Math.floor(nx), Math.floor(ny), Math.floor(nz)))) p.set(nx, ny, nz); else b.obj = null;
    b.g.rotation.y = Math.atan2(dx, dz);
  }
}
function tocarColmena(h) {
  const i = idx(h.x, h.y, h.z), listo = mielT.get(i) || 0;
  if (performance.now() < listo) { aviso(TR('mielNo'), 1000); return; }
  mielT.set(i, performance.now() + 90000); darItem(I.MIEL, 1); aviso(TR('mielLista'), 1500); swing = 1; son(660, .1, 'triangle', .1);
  if (!creativo()) { const humo = [[0, -1, 0], [0, -2, 0], [0, -3, 0]].some(([a, b, c]) => get(h.x + a, h.y + b, h.z + c) === B.ANTORCHA || get(h.x + a, h.y + b, h.z + c) === B.FAROL);
    if (!humo) { enojo = 12; aviso(TR('abejasEnojadas'), 1400); voz('abeja', 0); } }
}
// pegarle a una abeja
{ const t0 = tocar; tocar = function (dir) {
    if (abejas.length) { const o = new THREE.Vector3(J.x, J.y + OJOS, J.z), r = new THREE.Ray(o, dir), v = new THREE.Vector3(); let mejor = null;
      for (const b of abejas) { const p = b.g.position; if (r.intersectBox(new THREE.Box3(new THREE.Vector3(p.x - .3, p.y - .25, p.z - .3), new THREE.Vector3(p.x + .3, p.y + .3, p.z + .3)), v)) { const d = v.distanceTo(o); if (d < 4 && (!mejor || d < mejor.d)) mejor = { b, d }; } }
      const h = apuntar(dir);
      if (mejor && (!h || mejor.d < h.t)) { const b = mejor.b; b.vida -= 3; swing = 1; sonar('golpe', .6) || son(220, .1, 'sawtooth', .1); if (b.vida <= 0) { polvo(b.g.position.x, b.g.position.y, b.g.position.z, '#ffd23a', 6); escena.remove(b.g); abejas.splice(abejas.indexOf(b), 1); } enojo = Math.max(enojo, 8); return; } }
    return t0(dir); }; }

// ═════════ HORNO ═════════
const COCINA = { [I.CARNE]: I.CARNE_A, [I.POLLO]: I.POLLO_A, [I.CHULETA]: I.CHULETA_A, [I.PESCADO]: I.PESCADO_A, [I.PEZ_T]: I.PESCADO_A, [I.PAPA_I]: I.PAPA_A, [B.ARENA]: B.VIDRIO, [B.ADOQUIN]: B.PIEDRA, [B.TRONCO]: I.CARBON };
function usarHorno(h) {
  const id = barra[sel] || 0, sale = COCINA[id];
  if (!sale) { aviso(TR('hornoPide'), 2200); return; }
  const n = creativo() ? 8 : (inv[id] || 0); if (!n) return;
  // combustible: 1 carbón cocina 8; si no hay, 1 madera cocina 2
  let fuego = 0;
  if (!creativo()) { const necC = Math.ceil(n / 8); if ((inv[I.CARBON] || 0) >= necC) { quitarItem(I.CARBON, necC); fuego = n; }
    else { const necM = Math.ceil(n / 2); if ((inv[B.MADERA] || 0) >= necM) { quitarItem(B.MADERA, necM); fuego = n; } } } else fuego = n;
  if (!fuego) { aviso(TR('hornoSinFuego'), 1600); return; }
  if (!creativo()) quitarItem(id, n); swing = 1; ruido(.4, .12, 600);
  for (let k = 0; k < 6; k++) setTimeout(() => polvo(h.x + .5, h.y + 1.1, h.z + .5, k % 2 ? '#ff9a2e' : '#9a9a9a', 4), k * 120);
  setTimeout(() => { darItem(sale, n); aviso(TR('hornoListo', { n: n + ' ' + nom(sale) }), 1600); son(880, .12, 'triangle', .1); }, 800);
}
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) {
    const h = apuntar(dir);
    if (h && !aventura()) {
      if (h.b === B.HORNO && (!barra[sel] || COCINA[barra[sel]] || ITEM[barra[sel]])) { usarHorno(h); return true; }
      if (h.b === B.COLMENA && (!barra[sel] || ITEM[barra[sel]])) { tocarColmena(h); return true; }
    }
    return t0(dir); }; }

// ═════════ CADA CUADRO ═════════
function granjaFrame(dt) {
  if (!jugando) return;
  // el caballo va debajo del jugador
  if (caballoMontado) { if (!animales.includes(caballoMontado)) { caballoMontado = null; J.velMonta = 1; $('bDesmontar').hidden = true; window.montando = false; }
    else { const a = caballoMontado, v = J.rapidez || 0; a.position.set(J.x - Math.sin(J.yaw) * -.15, J.y, J.z - Math.cos(J.yaw) * -.15); a.rotation.y = J.yaw + Math.PI;
      a.userData.t += dt; const paso = v > .5 ? Math.sin(a.userData.t * 14) * .6 : 0; a.userData.patas.forEach((l, k) => l.rotation.x = k % 2 ? -paso : paso);
      } }
  // loros en el hombro
  for (const a of animales) { const e = a.userData.extra; if (a.userData.animal !== 'loro' || !e || !e.h) continue;
    a.userData.montado = true; const s = Math.sin(J.yaw), c = Math.cos(J.yaw); a.position.set(J.x - c * .42, J.y + 1.38, J.z + s * .42); a.rotation.y = J.yaw + Math.PI;
    a.visible = typeof modoCam === 'undefined' || modoCam > 0; }
  if (!pausado) moverAbejas(dt);
}
// en tercera persona el jugador va sentado arriba del caballo
{ const p0 = pjFrame; pjFrame = function (dt) { const r = p0(dt); if (caballoMontado && jugador) jugador.position.y = J.y + .75; return r; }; }
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; try { granjaFrame(dt); } catch (e) { console.error(e); } }; requestAnimationFrame(tick); }
{ const s0 = salirAlMenu; salirAlMenu = function () { if (caballoMontado) bajarCaballo(); abejas.splice(0).forEach(b => escena.remove(b.g)); return s0(); }; }
window.__g = { montarCaballo, bajarCaballo, usarHorno, tocarColmena, abejas, enojo: () => enojo, caballo: () => caballoMontado, vestirCaballo };
