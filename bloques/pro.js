'use strict';
// ═════════ VOXELIUM PRO: lo que gana quien es Pro ═════════
// - Sin anuncios y sin el cartel de "conéctate" (eso está en anuncios.js)
// - Toda la Tienda desbloqueada, sin mirar anuncios
// - Pestaña Pro en la Tienda: Dragón Aurora, Zorro de luz, Búho mensajero, texturas Mármol y oro / Bosque encantado,
//   piezas de personaje (capa dorada, alas Aurora, corona de gemas, estela de chispas, búho en el hombro) y un pack de 3 personajes
// - En línea: nombre dorado con corona
// - Regalo del día doble
// - Mapas: subir sin esperar y marca "Creador Pro"
// Todos los diseños son propios.

Object.assign(TX.es, { tPro: 'Pro', proSolo: 'Solo Pro', proHazte: 'Hazte Pro', proTiendaAyuda: 'Con Voxelium Pro tienes todo esto y además toda la Tienda desbloqueada, sin anuncios.',
  dragonAurora: 'Dragón Aurora', zorroLuz: 'Zorro de luz', buho: 'Búho mensajero', texMarmol: 'Mármol y oro', texBosque: 'Bosque encantado',
  pzCapaOro: 'Capa dorada', pzAlasAurora: 'Alas Aurora', pzGemas: 'Corona de gemas', pzEstela: 'Estela de chispas', pzBuhoHombro: 'Búho en el hombro', packPro: 'Pack Pro',
  dDragonPro: 'Un dragón con los colores de la aurora', dMascotaPro: 'Una mascota que nadie más tiene', dTexPro: 'Texturas exclusivas', dPiezaPro: 'Para tus personajes', dPackPro: '3 personajes exclusivos',
  piezasPro: 'Piezas Pro', sGemas: 'Gemas', si2: 'Sí', proLlega: '¡LLEGÓ TU {n}!', proRegaloDoble: 'Eres Pro: hoy recibes el doble', creadorPro: 'CREADOR PRO',
  proB2: 'Toda la Tienda desbloqueada', proB3: 'Dragón, mascotas y texturas Pro', proB4: 'Piezas de personaje exclusivas', proB5: 'Regalo del día doble', proB6: 'Corona dorada al jugar en línea', proB7: 'Mapas: subir sin esperar y marca Creador Pro' });
Object.assign(TX.en, { tPro: 'Pro', proSolo: 'Pro only', proHazte: 'Go Pro', proTiendaAyuda: 'With Voxelium Pro you get all of this, plus the whole Shop unlocked, with no ads.',
  dragonAurora: 'Aurora Dragon', zorroLuz: 'Light Fox', buho: 'Messenger Owl', texMarmol: 'Marble and gold', texBosque: 'Enchanted forest',
  pzCapaOro: 'Golden cape', pzAlasAurora: 'Aurora wings', pzGemas: 'Gem crown', pzEstela: 'Sparkle trail', pzBuhoHombro: 'Owl on your shoulder', packPro: 'Pro Pack',
  dDragonPro: 'A dragon with the colors of the aurora', dMascotaPro: 'A pet nobody else has', dTexPro: 'Exclusive textures', dPiezaPro: 'For your characters', dPackPro: '3 exclusive characters',
  piezasPro: 'Pro pieces', sGemas: 'Gems', si2: 'Yes', proLlega: 'YOUR {n} IS HERE!', proRegaloDoble: "You're Pro: today you get double", creadorPro: 'PRO CREATOR',
  proB2: 'The whole Shop unlocked', proB3: 'Pro dragon, pets and textures', proB4: 'Exclusive character pieces', proB5: 'Double daily gift', proB6: 'Golden crown when playing online', proB7: 'Maps: upload without waiting and Pro Creator badge' });
Object.assign(TX.pt, { tPro: 'Pro', proSolo: 'Só Pro', proHazte: 'Seja Pro', proTiendaAyuda: 'Com o Voxelium Pro você tem tudo isso e ainda a Loja inteira desbloqueada, sem anúncios.',
  dragonAurora: 'Dragão Aurora', zorroLuz: 'Raposa de luz', buho: 'Coruja mensageira', texMarmol: 'Mármore e ouro', texBosque: 'Floresta encantada',
  pzCapaOro: 'Capa dourada', pzAlasAurora: 'Asas Aurora', pzGemas: 'Coroa de gemas', pzEstela: 'Rastro de faíscas', pzBuhoHombro: 'Coruja no ombro', packPro: 'Pacote Pro',
  dDragonPro: 'Um dragão com as cores da aurora', dMascotaPro: 'Um bichinho que ninguém mais tem', dTexPro: 'Texturas exclusivas', dPiezaPro: 'Para seus personagens', dPackPro: '3 personagens exclusivos',
  piezasPro: 'Peças Pro', sGemas: 'Gemas', si2: 'Sim', proLlega: 'CHEGOU SEU {n}!', proRegaloDoble: 'Você é Pro: hoje recebe o dobro', creadorPro: 'CRIADOR PRO',
  proB2: 'A Loja inteira desbloqueada', proB3: 'Dragão, bichinhos e texturas Pro', proB4: 'Peças de personagem exclusivas', proB5: 'Presente do dia em dobro', proB6: 'Coroa dourada ao jogar online', proB7: 'Mapas: enviar sem esperar e selo Criador Pro' });
try { NOM_CRIA.es.dragon5 = 'Dragón Aurora'; NOM_CRIA.en.dragon5 = 'Aurora Dragon'; NOM_CRIA.pt.dragon5 = 'Dragão Aurora';
  NOM_CRIA.es.zorroLuz = 'Zorro de luz'; NOM_CRIA.en.zorroLuz = 'Light Fox'; NOM_CRIA.pt.zorroLuz = 'Raposa de luz';
  NOM_CRIA.es.buho = 'Búho mensajero'; NOM_CRIA.en.buho = 'Messenger Owl'; NOM_CRIA.pt.buho = 'Coruja mensageira'; } catch (e) {}

const AURORA = ['#6cffb0', '#3ad0ff', '#8a7bff', '#ff7ad8'];
const matBrillo = c => new THREE.MeshBasicMaterial({ color: parseInt(c.slice(1), 16) });

// ═════════ 1) TODA LA TIENDA DESBLOQUEADA ═════════
const PRO_TEX = ['texMarmol', 'texBosque'];
{ const d0 = desbloqueado; desbloqueado = function (id) { return esPro() || d0(id); }; }

// ═════════ 2) CRIATURAS PRO ═════════
// Dragón Aurora: cuerpo verde agua, panza lila, cuernos rosados; alas con franjas de aurora que brillan de noche
const RAZA_AURORA = ['#2fb8a8', '#c9b8ff', '#ff7ad8'];   // no se agrega a RAZAS: el Dragón de Tormenta usa el último de esa lista
TIPOS.dragon5 = Object.assign({}, TIPOS.dragon0, { color: '#2fb8a8',
  armar: g => { RAZAS.push(RAZA_AURORA); let p; try { p = armarDragon(g, RAZAS.length - 1); } finally { RAZAS.pop(); }
    for (const q of g.alas || []) { const s = q.position.x > 0 ? 1 : -1; AURORA.forEach((c, i) => caja(q, 1.04, .08, .17, s * .58, 0, .22 - i * .19, matBrillo(c))); }
    caja(g, .1, .1, .1, 0, 2.16, .92, matBrillo('#ff7ad8')); return p; },
  guiar: (a, dt) => { const r = TIPOS.dragon0.guiar(a, dt); estelaDe(a, dt, 1.4); return r; } });
// Zorro de luz: un zorro celeste y blanco con la punta de la cola y las orejas que brillan
TIPOS.zorroLuz = Object.assign({}, TIPOS.zorro, { color: '#8fe0ff',
  armar: g => { const p = armarCuadrupedo(g, 'zorro');
    g.traverse(o => { if (!o.isMesh || !o.material || !o.material.color) return; const h = o.material.color.getHex();
      if (h === 0xff8a2e) { o.material = o.material.clone(); o.material.color.setHex(0x8fe0ff); } else if (h === 0x2a1a10) { o.material = o.material.clone(); o.material.color.setHex(0x2a4a9a); } });
    const h = g.children[0]; caja(h, .14, .14, .1, 0, .62, -.98, matBrillo('#ffffff')); for (const s of [-1, 1]) caja(h, .05, .06, .03, s * .13, 1.1, .45, matBrillo('#bff4ff')); return p; },
  guiar: (a, dt) => { const r = TIPOS.zorro.guiar(a, dt); estelaDe(a, dt, .5, ['#bff4ff', '#ffffff']); return r; } });
// Búho mensajero: marrón con pecho claro, ojos grandes amarillos y plumitas en las orejas
function armarBuho(g, esc = 1) {
  const h = new THREE.Group(); h.scale.setScalar(esc); g.add(h);
  const ma = matA(0x8a5a34), cl = matA(0xe8d2a8), os = matA(0x5a3418), am = matBrillo('#ffd23a'), ne = new THREE.MeshLambertMaterial({ color: 0x14142a }), pi = matA(0xf5a62a);
  caja(h, .34, .4, .3, 0, .42, 0, ma); caja(h, .24, .26, .04, 0, .4, .15, cl);
  caja(h, .36, .26, .3, 0, .74, 0, ma); caja(h, .3, .18, .04, 0, .74, .15, cl);
  for (const s of [-1, 1]) { caja(h, .1, .1, .03, s * .08, .76, .17, am); caja(h, .05, .05, .03, s * .08, .76, .185, ne); caja(h, .07, .1, .07, s * .13, .92, -.02, os); caja(h, .06, .3, .22, s * .19, .44, -.02, os); }
  caja(h, .06, .06, .06, 0, .7, .19, pi);
  return [-1, 1].map(s => pata(h, .06, .14, .08, s * .08, .22, .04, pi));
}
TIPOS.buho = { vida: 8, an: .22, al: .7, vel: 1.6, peso: .2, color: '#8a5a34', voz: 'loro', mascota: true, cuello: .62, cuelloZ: 0,
  armar: g => armarBuho(g), suelta: () => [], cargar: a => ponerCollar(a),
  guiar: (a, dt) => { const r = seguir(a, dt); if (a.userData.suelo && Math.random() < dt * 1.2) a.userData.vy = 5; return r; } };
// chispitas de colores detrás de lo que se mueve
const estelaT = new WeakMap();
function estelaDe(o, dt, cada = 1, colores = AURORA) {
  const p = o.position, u = o.userData || {}, ult = estelaT.get(o) || { x: p.x, y: p.y, z: p.z, t: 0 };
  const mov = Math.hypot(p.x - ult.x, p.y - ult.y, p.z - ult.z); ult.t += dt; ult.x = p.x; ult.y = p.y; ult.z = p.z; estelaT.set(o, ult);
  if (mov > .01 && ult.t > .09 / cada) { ult.t = 0; polvo(p.x, p.y + (u.al || 1) * .35, p.z, colores[Math.floor(Math.random() * colores.length)], 2); }
}

// ═════════ 3) TEXTURAS PRO ═════════
{ const p0 = paqueteTexturas; paqueteTexturas = function (id) {
    if (!PRO_TEX.includes(id)) return p0(id);
    const out = {};
    for (const n of BISEL.concat(['hojas', 'agua'])) { const t = TL[n]; if (t == null) continue; const pix = leerTile(t);
      out[n] = pix.map((c, k) => { if (!c) return null; const [r, g, b] = aRGB(c), x = k % 16, y = k >> 4, gris = (r + g + b) / 3, borde = x === 0 || y === 0 || x === 15 || y === 15;
        if (id === 'texMarmol') {
          if (/hoja|pasto(?!C)/i.test(n) && !/Costado/.test(n)) return aHex(r * .7 + 40, g * .8 + 30, b * .6 + 20);
          if (/agua/.test(n)) return aHex(r * .6 + 60, g * .7 + 70, b * .8 + 60);
          if (borde) return (x + y) % 3 ? '#d8a82a' : '#f5d36a';                      // marco dorado
          const vena = (Math.sin((x * 1.7 + y * .9 + (k % 7)) * .8) > .93) || ((x * 3 + y * 5) % 23 === 0);
          return vena ? aHex(150 + gris * .1, 150 + gris * .1, 160 + gris * .1) : aHex(232 + gris * .08, 230 + gris * .08, 226 + gris * .1);
        }
        // bosque encantado: verdes profundos, madera violeta y puntitos que brillan
        const brillo = (x * 7 + y * 13 + n.length * 5) % 37 === 0;
        if (/hoja/i.test(n)) return brillo ? ((x + y) % 2 ? '#bff4ff' : '#ff9ae8') : aHex(r * .35 + 10, g * .7 + 20, b * .5 + 60);
        if (/pastoArriba/.test(n)) return brillo ? '#e8ff8a' : aHex(r * .4 + 10, g * .75 + 25, b * .5 + 55);
        if (/tronco|madera/i.test(n)) return aHex(r * .55 + 50, g * .35 + 20, b * .5 + 70);
        if (/agua/.test(n)) return aHex(r * .4 + 40, g * .5 + 60, b * .7 + 70);
        return aHex(r * .7 + gris * .1, g * .75 + gris * .1 + 6, b * .8 + gris * .1 + 18);
      }); }
    return out; }; }
function sincronizarTexturasPro() {
  try {
    if (esPro()) { for (const id of PRO_TEX) if (!leerMods().some(m => m.id === 'tp_' + id)) guardarModLib({ id: 'tp_' + id, nombre: TR(id), ver: 1, bloques: [], texturas: paqueteTexturas(id), reglas: {}, criaturas: [] }); }
    else { const l = leerMods(), f = l.filter(m => !PRO_TEX.some(id => m.id === 'tp_' + id)); if (f.length !== l.length) localStorage.setItem('bloxMods', JSON.stringify(f)); }
  } catch (e) {}
}

// ═════════ 4) PIEZAS DE PERSONAJE PRO ═════════
const CAMPOS_PRO = ['capaOro', 'alasAurora', 'estela', 'hombro'];
const tienePro = P => !!P && (P.capaOro || P.alasAurora || P.estela || P.hombro || P.sombrero === 'gemas');
let armandoRemoto = false, armandoFoto = false;
{ const a0 = armarPersonaje; armarPersonaje = function (P) {
    const ok = P && (armandoRemoto || armandoFoto || esPro());
    let Q = P;
    if (P && tienePro(P)) {
      Q = Object.assign({}, P);
      if (!ok) { for (const k of CAMPOS_PRO) delete Q[k]; if (Q.sombrero === 'gemas') Q.sombrero = null; }
      else { if (Q.capaOro && !Q.capa) Q.capa = '#e8b020'; if (Q.alasAurora && !Q.alas) Q.alas = '#c8f4ff'; if (Q.sombrero === 'gemas') Q.sombrero = null; }
    }
    const g = a0(Q);
    if (!P || !ok) return g;
    const u = g.userData, Y = -.9;
    if (P.capaOro && u.capa) { const o = colM('#b8860b'); caja(u.capa, .52, .06, .05, 0, -.72, 0, o); caja(u.capa, .04, .74, .05, -.25, -.37, 0, o); caja(u.capa, .04, .74, .05, .25, -.37, 0, o); caja(u.capa, .14, .14, .05, 0, -.2, -.01, matBrillo('#ffe14a')); }
    if (P.alasAurora && u.alas) for (const q of u.alas) { const s = q.position.x > 0 ? 1 : -1; AURORA.forEach((c, i) => caja(q, .68, .1, .06, s * .38, .2 - i * .12, -.04, matBrillo(c))); }
    if (P.sombrero === 'gemas') { const o = colM('#ffd23a'), cab = u.cab; caja(cab, .66, .12, .6, 0, 1.6 + Y, 0, o);
      const gem = ['#e03a5a', '#3ad0ff', '#36c95a', '#c58cf5', '#e03a5a', '#3ad0ff'];
      [[-.28, -.25], [.28, -.25], [-.28, .25], [.28, .25], [0, .25], [0, -.25]].forEach(([x, z], i) => { caja(cab, .1, .18, .1, x, 1.74 + Y, z, o); caja(cab, .08, .08, .08, x, 1.86 + Y, z, matBrillo(gem[i])); });
      caja(cab, .14, .12, .04, 0, 1.6 + Y, .31, matBrillo('#e03a5a')); }
    if (P.hombro === 'buho') { const q = new THREE.Group(); q.position.set(.42, .82, -.02); q.rotation.y = .25; armarBuho(q, .55); g.add(q); u.hombro = q; }
    u.estela = !!P.estela;
    return g; }; }
// estela del jugador: chispitas al caminar o volar
{ let ult = null, t = 0; setInterval(() => { try {
    if (!jugando || pausado || !jugador || !jugador.userData.estela) { ult = null; return; }
    const p = { x: J.x, y: J.y, z: J.z }; if (ult && Math.hypot(p.x - ult.x, p.y - ult.y, p.z - ult.z) > .08) polvo(p.x, p.y + .25, p.z, AURORA[(t++) % AURORA.length], 2); ult = p;
  } catch (e) {} }, 110); }
// pack Pro: 3 personajes exclusivos
PACKS.packPro = [
  { id: 'p_aurora', base: 'sk_aurora', piel: '#f2c9a0', pelo: '#8a7bff', remera: '#2fb8a8', pantalon: '#3a2a6a', zapatos: '#ffffff', peinado: 'largo', alasAurora: 1, estela: 1, mejillas: 1 },
  { id: 'p_reyoro', base: 'sk_reyoro', piel: '#e0ac80', pelo: '#2a1a10', remera: '#7a1414', pantalon: '#1d1d21', zapatos: '#b8860b', peinado: 'corto', sombrero: 'gemas', capaOro: 1, armadura: 'oro' },
  { id: 'p_guardabosque', base: 'sk_guardabosque', piel: '#c98a5a', pelo: '#5a3418', remera: '#2f6f22', pantalon: '#6b4a26', zapatos: '#3a2a20', peinado: 'cola', hombro: 'buho', sombrero: 'gorra', sombreroC: '#2f6f22' }];
Object.assign(TX.es, { sk_aurora: 'Aurora', sk_reyoro: 'Rey de oro', sk_guardabosque: 'Guardabosque' });
Object.assign(TX.en, { sk_aurora: 'Aurora', sk_reyoro: 'Golden King', sk_guardabosque: 'Ranger' });
Object.assign(TX.pt, { sk_aurora: 'Aurora', sk_reyoro: 'Rei de ouro', sk_guardabosque: 'Guarda-florestal' });
{ const s0 = skinsTienda; skinsTienda = function () { const l = s0(); return esPro() ? l : l.filter(k => !PACKS.packPro.includes(k)); }; }

// en el editor de personaje: sección "Piezas Pro"
const CORONA_MINI = '<svg viewBox="0 0 32 24" style="width:20px;height:15px;vertical-align:-2px"><path d="M3 20h26l2-15-8 6-7-9-7 9-8-6z" fill="#ffd23a" stroke="#c8841a" stroke-width="2.4" stroke-linejoin="round"/></svg>';
{ const p0 = pintarSkins; pintarSkins = function () {
    const r = p0.apply(this, arguments);
    const k = skinDe(skinVer); if (k.base) return r;
    const pro = esPro();
    const op = (campo, v, l) => `<div data-v='${JSON.stringify(v)}' class="${JSON.stringify(k[campo] ?? null) === JSON.stringify(v) ? 'on' : ''}">${TR(l)}</div>`;
    const fila = (t, campo, v) => `<div style="font-size:13px;margin:6px 0 2px">${TR(t)}${pro ? '' : ' ' + CANDADO}</div>` + (pro ? `<div class="opcG" data-op="${campo}">${op(campo, null, 'no')}${op(campo, v, 'si2')}</div>` : `<div class="opcG"><div data-hazpro="1" style="background:#f5b82a">${TR('proHazte')}</div></div>`);
    let h = `<h4>${CORONA_MINI} ${TR('piezasPro')}</h4>`;
    h += fila('pzCapaOro', 'capaOro', 1) + fila('pzAlasAurora', 'alasAurora', 1) + fila('pzEstela', 'estela', 1) + fila('pzBuhoHombro', 'hombro', 'buho');
    h += `<div style="font-size:13px;margin:6px 0 2px">${TR('pzGemas')}${pro ? '' : ' ' + CANDADO}</div>` + (pro ? `<div class="opcG" data-op="sombrero">${op('sombrero', null, 'ninguno')}${op('sombrero', 'gemas', 'sGemas')}</div>` : `<div class="opcG"><div data-hazpro="1" style="background:#f5b82a">${TR('proHazte')}</div></div>`);
    const sec = document.createElement('div'); sec.className = 'secPro'; sec.innerHTML = h; $('skinCuerpo').appendChild(sec);
    return r; }; }
$('skinCuerpo').addEventListener('click', e => { if (e.target.closest('[data-hazpro]')) { e.stopPropagation(); cerrar('skinCapa'); abrirPro(); proVolver = 'skinCapa'; } }, true);
{ const st = document.createElement('style'); st.textContent = `.secPro { margin-top: 10px; padding: 4px 10px 10px; border-radius: 12px; background: linear-gradient(#fff6d8, #ffe9a8); border: 2px solid #ffb21a; } .secPro h4 { margin-top: 6px; }`; document.head.appendChild(st); }

// ═════════ 5) PESTAÑA PRO EN LA TIENDA ═════════
const PRO_CAT = [
  { id: 'dragonAurora', desc: 'dDragonPro', tipo: 'dragon5', alto: 2.2 },
  { id: 'zorroLuz', desc: 'dMascotaPro', tipo: 'zorroLuz', alto: 1.1 }, { id: 'buho', desc: 'dMascotaPro', tipo: 'buho', alto: 1 },
  { id: 'texMarmol', desc: 'dTexPro', tex: 1 }, { id: 'texBosque', desc: 'dTexPro', tex: 1 },
  { id: 'pzCapaOro', desc: 'dPiezaPro', P: { capaOro: 1 }, rot: 2.8 }, { id: 'pzAlasAurora', desc: 'dPiezaPro', P: { alasAurora: 1 }, rot: 2.6 },
  { id: 'pzGemas', desc: 'dPiezaPro', P: { sombrero: 'gemas' } }, { id: 'pzEstela', desc: 'dPiezaPro', P: { estela: 1, aura: '#8a7bff' } },
  { id: 'pzBuhoHombro', desc: 'dPiezaPro', P: { hombro: 'buho' } }, { id: 'packPro', desc: 'dPackPro', P: PACKS.packPro[0] }];
const fotosPro = {};
function fotoPro(c) {
  if (fotosPro[c.id]) return fotosPro[c.id];
  if (c.tex) return fotosPro[c.id] = fotoItem({ id: c.id, tab: 'tTexturas' });
  fotoItem(CATALOGO.find(x => x.tab === 'tMascotas'));   // crea el renderer de fotos si todavía no existe
  let g, alto = c.alto || 1.8;
  if (c.tipo) { g = new THREE.Group(); TIPOS[c.tipo].armar(g); g.rotation.y = .6; }
  else { armandoFoto = true; try { g = armarPersonaje(Object.assign({ piel: '#f2c9a0', pelo: '#5a3418', remera: '#3a5ad8', pantalon: '#1d1d21', zapatos: '#3a2a20', peinado: 'corto' }, c.P)); } finally { armandoFoto = false; }
    g.rotation.y = c.rot || .5; if (g.userData.alas) { g.userData.alas[0].rotation.y = -.6; g.userData.alas[1].rotation.y = .6; } }
  fotoR.e.add(g); fotoR.c.position.set(0, alto * .6, alto * 2.1 + 1); fotoR.c.lookAt(0, alto * .48, 0); fotoR.r.render(fotoR.e, fotoR.c); const url = fotoR.r.domElement.toDataURL(); fotoR.e.remove(g);
  return fotosPro[c.id] = url;
}
{ const st = document.createElement('style'); st.textContent = `
  #tiendaTabs .tab.proTab { background: linear-gradient(#ffe14a, #f5a62a); color: #1b2a6b; } #tiendaTabs .tab.proTab.on { box-shadow: 0 0 0 3px rgba(255,178,26,.5); }
  .tCard.pro { border-color: #ffb21a; background: linear-gradient(#fffdf2, #fff3cc); position: relative; } .tCard .solo { position: absolute; top: 6px; left: 6px; font-size: 10px; font-weight: 800; color: #1b2a6b; background: #ffd23a; border: 2px solid #c8841a; border-radius: 7px; padding: 0 5px; }
  .tCard .mb.oro { background: #c8841a; } #tiendaProAyuda { font-size: 12px; margin-bottom: 6px; font-weight: 700; color: #6b5a2a; }
`; document.head.appendChild(st); }
{ const p0 = pintarTienda; pintarTienda = function () {
    const r = p0.apply(this, arguments);
    const tab = document.createElement('div'); tab.className = 'tab proTab' + (tiendaTab === 'tPro' ? ' on' : ''); tab.dataset.tab = 'tPro'; tab.innerHTML = CORONA_MINI + ' ' + TR('tPro');
    $('tiendaTabs').insertBefore(tab, $('tiendaCerrar'));
    const ayuda = $('tiendaCapa').querySelector('[data-i="tiendaAyuda"]');
    if (tiendaTab !== 'tPro') { if (ayuda) ayuda.textContent = esPro() ? '' : TR('tiendaAyuda'); return r; }
    if (ayuda) ayuda.textContent = TR('proTiendaAyuda');
    const pro = esPro();
    $('tiendaGrid').innerHTML = PRO_CAT.map(c => {
      const accion = !pro ? `<div class="mb oro" data-hazpro="1">${TR('proHazte')}</div>` : c.tipo ? `<div class="mb" data-prollamar="${c.id}">${TR('llamar')}</div>` : c.tex ? botonTextura(c.id) : `<div class="mb" data-personaje="1">${TR('usar')}</div>`;
      return `<div class="tCard pro"><span class="solo">${TR('proSolo')}</span><img src="${fotoPro(c)}" alt=""><b>${TR(c.id)}</b><small>${TR(c.desc)}</small>${accion}</div>`; }).join('');
    return r; }; }
let proVolver = null;
$('tiendaCapa').addEventListener('click', e => {
  const q = s => e.target.closest(s); let d;
  if (q('[data-hazpro]')) { e.stopPropagation(); proVolver = 'tiendaCapa'; cerrar('tiendaCapa'); abrirPro(); return; }
  if (d = q('[data-prollamar]')) { e.stopPropagation(); if (!jugando) return aviso(TR('entraMundo'), 1400);
    const c = PRO_CAT.find(x => x.id === d.dataset.prollamar), x = J.x + Math.sin(J.yaw + Math.PI) * 2.5, z = J.z + Math.cos(J.yaw + Math.PI) * 2.5;
    let a; if (c.tipo === 'dragon5') { a = nuevoDragon(5, x, J.y + .2, z); ex(a).crece = 1; crecerDragon(a); corazones(a, 6); } else a = nuevaMascota(c.tipo, x, J.y + .2, z);
    voz(TIPOS[c.tipo].voz, 0); sucio = true; aviso(TR('proLlega', { n: TR(c.id).toUpperCase() }), 1600); cerrar('tiendaCapa'); if (tiendaVolver) abrir(tiendaVolver); }
}, true);
// al cerrar la pantalla Pro, volver a donde estaba
{ const c0 = $('proCerrar').onclick; $('proCerrar').onclick = () => { c0(); if (proVolver && $('adCapa').hidden) { const v = proVolver; proVolver = null; if (v === 'tiendaCapa') { pintarTienda(); abrir(v); } else if (v === 'skinCapa') { abrir(v); pintarSkins(); vistaSkin(); } } }; }

// ═════════ 6) EN LÍNEA: nombre dorado con corona ═════════
// se avisa a los demás que eres Pro dentro de los datos del personaje; si no eres Pro, no se mandan piezas Pro
{ const s0 = WebSocket.prototype.send; WebSocket.prototype.send = function (data) {
    try { if (typeof data === 'string' && data.indexOf('"skin"') > 0) { const m = JSON.parse(data);
      if ((m.t === 'hola' || m.t === 'skin') && m.skin && typeof m.skin === 'object') { if (esPro()) m.skin.vip = 1; else { delete m.skin.vip; for (const k of CAMPOS_PRO) delete m.skin[k]; if (m.skin.sombrero === 'gemas') m.skin.sombrero = null; } data = JSON.stringify(m); } } } catch (e) {}
    return s0.call(this, data); }; }
function cartelPro(texto) {
  const c = document.createElement('canvas'), g = c.getContext('2d'); c.width = 512; c.height = 96;
  g.font = '800 54px "Baloo 2", sans-serif'; const w = Math.min(500, g.measureText(texto).width + 96), x0 = (512 - w) / 2;
  const gr = g.createLinearGradient(0, 8, 0, 88); gr.addColorStop(0, '#ffe14a'); gr.addColorStop(1, '#f5a62a');
  g.fillStyle = gr; g.strokeStyle = '#8a5a0a'; g.lineWidth = 5; g.beginPath(); if (g.roundRect) g.roundRect(x0, 10, w, 76, 22); else g.rect(x0, 10, w, 76); g.fill(); g.stroke();
  // corona
  const cx = x0 + 38; g.fillStyle = '#ffffff'; g.strokeStyle = '#8a5a0a'; g.lineWidth = 3; g.beginPath(); g.moveTo(cx - 20, 64); g.lineTo(cx + 20, 64); g.lineTo(cx + 24, 32); g.lineTo(cx + 10, 44); g.lineTo(cx, 26); g.lineTo(cx - 10, 44); g.lineTo(cx - 24, 32); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#1b2a6b'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(texto, x0 + 58 + (w - 58) / 2 - 8, 50);
  const t = new THREE.CanvasTexture(c); t.minFilter = THREE.LinearFilter;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, fog: false })); s.scale.set(2.4, .45, 1); s.renderOrder = 998; return s;
}
{ const r0 = rearmarAvatar; rearmarAvatar = function (j) {
    armandoRemoto = !!(j && j.skin && j.skin.vip); let r; try { r = r0.apply(this, arguments); } finally { armandoRemoto = false; }
    if (j && j.skin && j.skin.vip && j.g && j.cartelN) { const n = cartelPro(j.nombre); n.position.copy(j.cartelN.position); j.g.remove(j.cartelN); j.g.add(n); j.cartelN = n; }
    return r; }; }

// ═════════ 7) REGALO DEL DÍA DOBLE ═════════
{ const o = $('diaRecibir').onclick; $('diaRecibir').onclick = function () {
    if (!esPro()) return o.apply(this, arguments);
    const d0 = darItem; darItem = (id, n = 1, s) => d0(id, n * 2, s); try { return o.apply(this, arguments); } finally { darItem = d0; } }; }
new MutationObserver(() => { const d = $('diaCapa'); if (d && !d.hidden && esPro() && $('diaSub') && !$('diaSub').dataset.pro) { $('diaSub').dataset.pro = 1; $('diaSub').innerHTML = `<b style="color:#c8841a">${CORONA_MINI} ${TR('proRegaloDoble')}</b>`; } else if (d && d.hidden && $('diaSub')) delete $('diaSub').dataset.pro; })
  .observe($('diaCapa'), { attributes: true, attributeFilter: ['hidden'] });

// ═════════ 8) MAPAS: subir sin esperar y marca "Creador Pro" ═════════
{ const f0 = window.fetch; window.fetch = function (u, o) {
    try { if (typeof u === 'string' && /\/mapas\/subir$/.test(u) && o && typeof o.body === 'string' && esPro()) { const d = JSON.parse(o.body); d.pro = true; o = Object.assign({}, o, { body: JSON.stringify(d) }); } } catch (e) {}
    return f0.call(this, u, o); }; }
{ const st = document.createElement('style'); st.textContent = `.creadorPro { display: inline-block; background: linear-gradient(#fff6d8, #ffd23a); color: #6b4a0a; border: 2px solid #c8841a; border-radius: 7px; font-size: 10px; font-weight: 800; padding: 0 5px; margin-right: 4px; } .mapaT .creadorPro { position: absolute; top: 6px; right: 6px; font-size: 10px; }`; document.head.appendChild(st); }
{ const c0 = cargarLista; cargarLista = async function () { const r = await c0.apply(this, arguments);
    try { for (const el of document.querySelectorAll('#mapasGrilla .mapaT')) { const m = MAPAS.lista.find(x => x.id === el.dataset.id); if (m && m.pro && !m.oficial && !el.querySelector('.creadorPro')) el.insertAdjacentHTML('afterbegin', `<span class="creadorPro">${TR('creadorPro')}</span>`); } } catch (e) {}
    return r; }; }

// ═════════ al volverse Pro (o al abrir el juego) ═════════
function alCambiarPro() { sincronizarTexturasPro(); if (esPro()) for (const c of CATALOGO) try { alActivar(c.id); } catch (e) {} try { if (jugando) rearmarJugador(); } catch (e) {} }
window.alCambiarPro = alCambiarPro;
alCambiarPro();

// ═════════ 9) MAPAS OFICIALES SOLO PRO ═════════
// Los mapas oficiales con "soloPro" se ven en la lista con la marca PRO; si no eres Pro, "Jugar" abre la pantalla de Voxelium Pro.
Object.assign(TX.es, { proJugarMapa: 'Hazte Pro para jugar', mapaSoloPro: 'Este mapa es solo para jugadores Pro' });
Object.assign(TX.en, { proJugarMapa: 'Go Pro to play', mapaSoloPro: 'This map is for Pro players only' });
Object.assign(TX.pt, { proJugarMapa: 'Seja Pro para jogar', mapaSoloPro: 'Este mapa é só para jogadores Pro' });
{ const st = document.createElement('style'); st.textContent = `.soloPro { display: inline-block; background: linear-gradient(#ffe14a, #f5a62a); color: #1b2a6b; border: 2px solid #8a5a0a; border-radius: 7px; font-size: 10px; font-weight: 800; padding: 0 5px; margin-right: 4px; letter-spacing: .5px; }
  .mapaT .soloPro { position: absolute; top: 6px; right: 6px; font-size: 11px; box-shadow: 0 2px 0 rgba(0,0,0,.25); } #bJugarMapa.hazPro { background: linear-gradient(#ffd23a, #c8841a); }`; document.head.appendChild(st); }
{ const c0 = cargarLista; cargarLista = async function () { const r = await c0.apply(this, arguments);
    try { for (const el of document.querySelectorAll('#mapasGrilla .mapaT')) { const m = MAPAS.lista.find(x => x.id === el.dataset.id); if (m && m.soloPro && !el.querySelector('.soloPro')) el.insertAdjacentHTML('afterbegin', `<span class="soloPro">PRO</span>`); } } catch (e) {}
    return r; }; }
// la ficha del mapa: marca PRO y botón dorado si no eres Pro
$('mapasGrilla').addEventListener('click', e => { const d = e.target.closest('[data-id]'); if (!d) return; const m = MAPAS.lista.find(x => x.id === d.dataset.id); if (!m || !m.soloPro) return;
  const sm = $('mapaDet').querySelector('small'); if (sm && !sm.querySelector('.soloPro')) sm.insertAdjacentHTML('afterbegin', '<span class="soloPro">PRO</span>');
  const bt = $('bJugarMapa'); if (bt && !esPro()) { bt.textContent = TR('proJugarMapa'); bt.classList.add('hazPro'); } });
{ const d0 = descargarMapa; descargarMapa = function (m) { if (m && m.soloPro && !esPro()) { aviso(TR('mapaSoloPro'), 1600); abrirPro(); return; } return d0.apply(this, arguments); }; }
