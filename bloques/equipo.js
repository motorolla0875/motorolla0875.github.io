'use strict';
// ═════════ EQUIPO NUEVO: yunque, alas planeadoras, ballesta y tridente (+ desgaste de herramientas) ═════════
// Diseños propios. Ids: bloque 137 (yunque); objetos 370-374. Casilleros del atlas: 248-254.
// Desgaste: en supervivencia/aventura las herramientas, armas, armaduras y alas se gastan con el uso.
// stats.desgaste[id] = cuánto se gastó la unidad de arriba de ese objeto; al llegar al máximo se rompe una.

B.YUNQUE = 137;
I.BALLESTA = 370; I.BALLESTA_E = 371; I.TRIDENTE = 372; I.TRIDENTE_E = 373; I.ALAS = 374;
Object.assign(TL, { yunqueArriba: 248, yunqueCostado: 249, ballesta: 250, ballestaE: 251, tridente: 252, tridenteE: 253, alas: 254 });

// ─── textos ───
Object.assign(TX.es, { yunqueAyuda: 'Repara herramientas, armas, armaduras y alas con su material. También encanta la ballesta, el tridente, el pico y la espada de cristal.', yunqueNada: 'No tienes nada gastado para reparar.',
  reparar: 'Reparar', repararTodo: 'Todo', encantarY: 'Encantar', reparado: '¡REPARADO!<small>{n}</small>', faltaMat: 'TE FALTA: {n}', seRompio: '¡SE ROMPIÓ!<small>{n}</small>', encantarCosto: '3 cristales y 1 oro',
  encantarFaltaY: 'NECESITAS 3 CRISTALES Y 1 ORO', ballestaCargando: 'CARGANDO LA BALLESTA…', ballestaLista: 'BALLESTA LISTA<small>toca para disparar</small>', tridenteFuera: 'EL TRIDENTE ESTÁ VOLVIENDO…',
  alasPuestas: 'ALAS PUESTAS<small>salta en el aire o cae de alto para planear</small>', planeando: 'PLANEANDO<small>fuegos artificiales para impulsarte</small>', alasC: 'Alas', yunqueAquí: 'YUNQUE<small>tócalo para reparar</small>' });
Object.assign(TX.en, { yunqueAyuda: 'Repair tools, weapons, armor and wings with their material. It also enchants the crossbow, trident, and crystal pickaxe and sword.', yunqueNada: 'You have nothing worn out to repair.',
  reparar: 'Repair', repararTodo: 'All', encantarY: 'Enchant', reparado: 'REPAIRED!<small>{n}</small>', faltaMat: 'YOU NEED: {n}', seRompio: 'IT BROKE!<small>{n}</small>', encantarCosto: '3 crystals and 1 gold',
  encantarFaltaY: 'YOU NEED 3 CRYSTALS AND 1 GOLD', ballestaCargando: 'LOADING THE CROSSBOW…', ballestaLista: 'CROSSBOW READY<small>tap to shoot</small>', tridenteFuera: 'THE TRIDENT IS COMING BACK…',
  alasPuestas: 'WINGS ON<small>jump in mid-air or fall from high up to glide</small>', planeando: 'GLIDING<small>use fireworks to boost</small>', alasC: 'Wings', yunqueAquí: 'ANVIL<small>tap it to repair</small>' });
Object.assign(TX.pt, { yunqueAyuda: 'Conserte ferramentas, armas, armaduras e asas com o material delas. Também encanta a besta, o tridente e a picareta e espada de cristal.', yunqueNada: 'Você não tem nada gasto para consertar.',
  reparar: 'Consertar', repararTodo: 'Tudo', encantarY: 'Encantar', reparado: 'CONSERTADO!<small>{n}</small>', faltaMat: 'FALTA: {n}', seRompio: 'QUEBROU!<small>{n}</small>', encantarCosto: '3 cristais e 1 ouro',
  encantarFaltaY: 'PRECISA DE 3 CRISTAIS E 1 OURO', ballestaCargando: 'CARREGANDO A BESTA…', ballestaLista: 'BESTA PRONTA<small>toque para atirar</small>', tridenteFuera: 'O TRIDENTE ESTÁ VOLTANDO…',
  alasPuestas: 'ASAS COLOCADAS<small>pule no ar ou caia do alto para planar</small>', planeando: 'PLANANDO<small>use fogos de artifício para acelerar</small>', alasC: 'Asas', yunqueAquí: 'BIGORNA<small>toque para consertar</small>' });
Object.assign(TX.tr, { yunqueAyuda: 'Aletleri, silahları, zırhları ve kanatları kendi malzemeleriyle onar. Arbaleti, üç dişli mızrağı, kristal kazmayı ve kılıcı da büyüler.', yunqueNada: 'Onarılacak yıpranmış bir şeyin yok.',
  reparar: 'Onar', repararTodo: 'Hepsi', encantarY: 'Büyüle', reparado: 'ONARILDI!<small>{n}</small>', faltaMat: 'GEREKEN: {n}', seRompio: 'KIRILDI!<small>{n}</small>', encantarCosto: '3 kristal ve 1 altın',
  encantarFaltaY: '3 KRİSTAL VE 1 ALTIN GEREKİR', ballestaCargando: 'ARBALET DOLDURULUYOR…', ballestaLista: 'ARBALET HAZIR<small>ateş etmek için dokun</small>', tridenteFuera: 'MIZRAK GERİ DÖNÜYOR…',
  alasPuestas: 'KANATLAR TAKILDI<small>süzülmek için havada zıpla ya da yüksekten düş</small>', planeando: 'SÜZÜLÜYORSUN<small>hızlanmak için havai fişek kullan</small>', alasC: 'Kanatlar', yunqueAquí: 'ÖRS<small>onarmak için dokun</small>' });
Object.assign(TX.id, { yunqueAyuda: 'Perbaiki alat, senjata, baju besi, dan sayap dengan bahannya. Juga bisa memberi sihir pada busur silang, trisula, serta beliung dan pedang kristal.', yunqueNada: 'Tidak ada yang aus untuk diperbaiki.',
  reparar: 'Perbaiki', repararTodo: 'Semua', encantarY: 'Sihir', reparado: 'DIPERBAIKI!<small>{n}</small>', faltaMat: 'KURANG: {n}', seRompio: 'RUSAK!<small>{n}</small>', encantarCosto: '3 kristal dan 1 emas',
  encantarFaltaY: 'PERLU 3 KRISTAL DAN 1 EMAS', ballestaCargando: 'MENGISI BUSUR SILANG…', ballestaLista: 'BUSUR SILANG SIAP<small>ketuk untuk menembak</small>', tridenteFuera: 'TRISULA SEDANG KEMBALI…',
  alasPuestas: 'SAYAP TERPASANG<small>lompat di udara atau jatuh dari tempat tinggi untuk meluncur</small>', planeando: 'MELUNCUR<small>pakai kembang api untuk melaju</small>', alasC: 'Sayap', yunqueAquí: 'LANDASAN<small>ketuk untuk memperbaiki</small>' });
Object.assign(TX.ar, { yunqueAyuda: 'أصلح الأدوات والأسلحة والدروع والأجنحة بموادها. ويسحر أيضًا القوس والنشاب والرمح الثلاثي والمعول والسيف الكريستاليين.', yunqueNada: 'لا يوجد شيء مستهلك لإصلاحه.',
  reparar: 'إصلاح', repararTodo: 'الكل', encantarY: 'سحر', reparado: 'تم الإصلاح!<small>{n}</small>', faltaMat: 'ينقصك: {n}', seRompio: 'انكسر!<small>{n}</small>', encantarCosto: '3 كريستالات و1 ذهب',
  encantarFaltaY: 'تحتاج 3 كريستالات و1 ذهب', ballestaCargando: 'جارٍ تعبئة القوس والنشاب…', ballestaLista: 'القوس والنشاب جاهز<small>المس للإطلاق</small>', tridenteFuera: 'الرمح الثلاثي يعود…',
  alasPuestas: 'تم لبس الأجنحة<small>اقفز في الهواء أو اسقط من مكان عالٍ لتطير شراعيًا</small>', planeando: 'طيران شراعي<small>استخدم الألعاب النارية للاندفاع</small>', alasC: 'أجنحة', yunqueAquí: 'سندان<small>المسه للإصلاح</small>' });
const NOM_EQ = {
  en: { 'Yunque': 'Anvil', 'Ballesta': 'Crossbow', 'Ballesta encantada': 'Enchanted crossbow', 'Tridente': 'Trident', 'Tridente encantado': 'Enchanted trident', 'Alas planeadoras': 'Glider wings' },
  pt: { 'Yunque': 'Bigorna', 'Ballesta': 'Besta', 'Ballesta encantada': 'Besta encantada', 'Tridente': 'Tridente', 'Tridente encantado': 'Tridente encantado', 'Alas planeadoras': 'Asas planadoras' },
  tr: { 'Yunque': 'Örs', 'Ballesta': 'Arbalet', 'Ballesta encantada': 'Büyülü arbalet', 'Tridente': 'Üç dişli mızrak', 'Tridente encantado': 'Büyülü üç dişli mızrak', 'Alas planeadoras': 'Süzülme kanatları' },
  id: { 'Yunque': 'Landasan', 'Ballesta': 'Busur silang', 'Ballesta encantada': 'Busur silang ajaib', 'Tridente': 'Trisula', 'Tridente encantado': 'Trisula ajaib', 'Alas planeadoras': 'Sayap luncur' },
  ar: { 'Yunque': 'سندان', 'Ballesta': 'قوس ونشاب', 'Ballesta encantada': 'قوس ونشاب مسحور', 'Tridente': 'رمح ثلاثي', 'Tridente encantado': 'رمح ثلاثي مسحور', 'Alas planeadoras': 'أجنحة شراعية' } };
for (const l in NOM_EQ) { NOMBRES[l] = NOMBRES[l] || {}; Object.assign(NOMBRES[l], NOM_EQ[l]); }

// ─── dibujos (casilleros 248-254) ───
{
  const PIX = {
    yunqueArriba: (x, y) => { const b = x === 0 || y === 0 || x === 15 || y === 15; return b ? '#2c2f38' : (x * 7 + y * 5) % 11 === 0 ? '#6e7484' : (x + y) % 2 ? '#4c515e' : '#555b69'; },
    yunqueCostado: (x, y) => {
      if (y <= 4) return y === 0 ? '#6e7484' : (x + y) % 3 ? '#4c515e' : '#3f434e';                       // cara de trabajo
      if (y <= 9) return x >= 5 && x <= 10 ? ((x + y) % 2 ? '#454a56' : '#3c404b') : null;              // cuello
      if (y <= 11) return x >= 3 && x <= 12 ? '#4c515e' : null;
      return x >= 1 && x <= 14 ? (y === 15 ? '#2c2f38' : (x + y) % 2 ? '#454a56' : '#3c404b') : null;   // base
    },
    ballesta: (x, y, r, e, E) => {
      const arco = E ? ['#c58cf5', '#8a4fd8'] : ['#8a5a2a', '#6b4422'], metal = E ? '#ffd8ff' : '#b8c0cc';
      if (y === 3 && x >= 2 && x <= 13) return arco[(x + y) % 2];                                       // arco
      if ((y === 4 && (x === 2 || x === 13)) || (y === 5 && (x === 1 || x === 14))) return arco[1];
      if (y === 4 && x > 2 && x < 13) return '#f0f0f0';                                                  // cuerda
      if (x === 7 || x === 8) { if (y >= 2 && y <= 13) return y < 6 ? metal : (y % 3 ? '#7a4a22' : '#5a3418'); }   // caja
      if (y === 9 && (x === 6 || x === 9)) return '#3a2a20';                                             // gatillo
      if (y === 1 && (x === 7 || x === 8)) return metal;                                                 // virote
      return E && r() < .04 ? '#ff9aff' : null;
    },
    tridente: (x, y, r, e, E) => {
      const m = E ? ['#7ff0ff', '#2fb8d8'] : ['#9fe0d0', '#4a9a8a'], asta = E ? ['#2a7ab8', '#1a4a88'] : ['#4a7a6a', '#2f5a4a'];
      if (x >= 6 && x <= 9 && y >= 6 && y <= 7) return m[1];                                             // base de las puntas
      if ((x === 5 || x === 10) && y >= 2 && y <= 6) return m[y % 2];                                    // puntas de los costados
      if ((x === 7 || x === 8) && y >= 0 && y <= 5) return m[(x + y) % 2];                               // punta central
      if ((x === 7 || x === 8) && y >= 8 && y <= 15) return asta[(y + x) % 2];                           // asta
      return E && r() < .05 ? '#bff4ff' : null;
    },
    alas: (x, y) => {
      const cx = x < 8 ? 7 - x : x - 8;                                                                  // simétrico
      if (cx === 0 && y >= 4 && y <= 12) return '#5a3418';                                              // unión
      const borde = y === 2 + Math.floor(cx / 3), dentro = y > 2 + Math.floor(cx / 3) && y < 13 - Math.floor(cx * .8);
      if (borde && cx >= 1) return '#3a5ad8';
      if (dentro && cx >= 1) return cx % 3 === 0 ? '#9fd8ff' : y % 4 === 0 ? '#c8ecff' : '#e8f6ff';
      return null;
    },
  };
  dibujarTile(TL.yunqueArriba, PIX.yunqueArriba); dibujarTile(TL.yunqueCostado, PIX.yunqueCostado);
  dibujarTile(TL.ballesta, (x, y, r, e) => PIX.ballesta(x, y, r, e, false)); dibujarTile(TL.ballestaE, (x, y, r, e) => PIX.ballesta(x, y, r, e, true));
  dibujarTile(TL.tridente, (x, y, r, e) => PIX.tridente(x, y, r, e, false)); dibujarTile(TL.tridenteE, (x, y, r, e) => PIX.tridente(x, y, r, e, true));
  dibujarTile(TL.alas, PIX.alas);
  try { atlasTex.needsUpdate = true; } catch (e) {}
  for (const t of [248, 249, 250, 251, 252, 253, 254]) try { delete tileURLs[t]; } catch (e) {}
}

// ─── bloque y objetos ───
def(B.YUNQUE, 'Yunque', [TL.yunqueArriba, TL.yunqueCostado, TL.yunqueCostado], { dur: 4, req: 1, trans: true, color: '#4c515e',
  forma: [[2 / 16, 0, 2 / 16, 14 / 16, 4 / 16, 14 / 16], [5 / 16, 4 / 16, 5 / 16, 11 / 16, 10 / 16, 11 / 16], [0, 10 / 16, 3 / 16, 1, 1, 13 / 16]],
  icono: [[2 / 16, 0, 2 / 16, 14 / 16, 4 / 16, 14 / 16], [5 / 16, 4 / 16, 5 / 16, 11 / 16, 10 / 16, 11 / 16], [0, 10 / 16, 3 / 16, 1, 1, 13 / 16]] });
item(I.BALLESTA, 'Ballesta', TL.ballesta); item(I.BALLESTA_E, 'Ballesta encantada', TL.ballestaE);
item(I.TRIDENTE, 'Tridente', TL.tridente); item(I.TRIDENTE_E, 'Tridente encantado', TL.tridenteE);
item(I.ALAS, 'Alas planeadoras', TL.alas);
for (const id of [B.YUNQUE, I.BALLESTA, I.BALLESTA_E, I.TRIDENTE, I.TRIDENTE_E, I.ALAS]) if (!TODOS.includes(id)) TODOS.push(id);
RECETAS.push(
  [[B.YUNQUE, 1], [[I.HIERRO, 6], [B.ADOQUIN, 3]]],
  [[I.BALLESTA, 1], [[I.PALO, 3], [I.HIERRO, 2], [B.TELA, 1]]],
  [[I.TRIDENTE, 1], [[I.HIERRO, 3], [I.CRISTAL, 2], [I.PALO, 2]]],
  [[I.ALAS, 1], [[B.TELA, 6], [I.PALO, 4], [I.CRISTAL, 2]]]);
// en la bolsa del creativo: el yunque va con los mecanismos (mesa de encantar, horno)
setTimeout(() => { try { if (typeof categoria === 'function') { categoria(1); CAT_CACHE.mec.add(B.YUNQUE); } } catch (e) {} }, 0);

// ═════════ DESGASTE ═════════
const MATERIAL_REP = { madera: B.MADERA, piedra: B.ADOQUIN, hierro: I.HIERRO, cristal: I.CRISTAL, oro: I.ORO, tela: B.TELA, palo: I.PALO };
const DURA = {};   // id -> [máximo, material para reparar]
[[60, 'madera'], [132, 'piedra'], [250, 'hierro'], [900, 'cristal']].forEach(([m, mat], k) => { DURA[I.PICO1 + k] = [m, mat]; DURA[I.ESP1 + k] = [m, mat]; });
DURA[I.PICO_E] = [1800, 'cristal']; DURA[I.ESP_E] = [1800, 'cristal']; DURA[I.ARCO] = [380, 'palo'];
DURA[I.BALLESTA] = [460, 'hierro']; DURA[I.BALLESTA_E] = [720, 'hierro']; DURA[I.TRIDENTE] = [250, 'hierro']; DURA[I.TRIDENTE_E] = [500, 'cristal']; DURA[I.ALAS] = [300, 'tela'];
[[60, 'tela'], [170, 'hierro'], [80, 'oro'], [380, 'cristal']].forEach(([m, mat], k) => { for (let p = 0; p < 4; p++) DURA[I.ARM + k * 4 + p] = [m, mat]; });
const conDesgaste = () => !creativo();
const desg = () => (stats.desgaste = stats.desgaste || {});
// clave del gasto: el objeto en la bolsa, o 'a0'..'a3' para la armadura puesta y 'alas' para las alas puestas
function gastar(clave, id, n = 1) {
  if (!conDesgaste() || !id || !DURA[id]) return;
  const d = desg(), max = DURA[id][0]; d[clave] = (d[clave] || 0) + n;
  if (d[clave] < max) { if (barra.includes(id)) pintarBarraPronto(); return; }
  d[clave] = 0; romperEquipo(clave, id);
}
function romperEquipo(clave, id) {
  aviso(TR('seRompio', { n: nom(id) }), 1800); son(180, .3, 'square', .12); ruido(.2, .15, 900); vibrar(60); polvo(J.x, J.y + 1, J.z, '#9aa3b8', 10);
  if (typeof clave === 'string' && clave[0] === 'a' && clave !== 'alas') { const a = armaduraDe(); a[+clave[1]] = 0; pintarArm(); rearmarJugador(); }
  else if (clave === 'alas') { stats.alas = 0; planeo = null; rearmarJugador(); }
  else quitarItem(id, 1);
  sucio = true;
}
// el pico y la espada que cuentan son los mejores que tienes
const mejorPico = () => inv[I.PICO_E] > 0 ? I.PICO_E : [4, 3, 2, 1].map(k => I.PICO1 + k - 1).find(id => inv[id] > 0) || 0;
const mejorEspada = () => inv[I.ESP_E] > 0 ? I.ESP_E : [4, 3, 2, 1].map(k => I.ESP1 + k - 1).find(id => inv[id] > 0) || 0;
{ const r0 = romper; romper = function (h) {
    const t = get(h.x, h.y, h.z), d = DEF[t]; const r = r0.apply(this, arguments);
    if (t && d && (d.req > 0 || matDe(t) === 'piedra')) { const p = mejorPico(); if (p) gastar(p, p); }
    return r; }; }
{ const l0 = lastimar; lastimar = function (n) { const r = l0.apply(this, arguments);
    if (n > 0 && jugando && typeof stats !== 'undefined') { const a = armaduraDe(); a.forEach((id, k) => { if (id) gastar('a' + k, id); }); }
    return r; }; }
{ const f0 = dispararFlecha; dispararFlecha = function () { const antes = inv[I.FLECHA] || 0; const r = f0.apply(this, arguments); if (creativo() || (inv[I.FLECHA] || 0) < antes) gastar(I.ARCO, I.ARCO); return r; }; }
// la barra muestra cuánto le queda a cada herramienta
let barraPend = false;
function pintarBarraPronto() { if (barraPend) return; barraPend = true; requestAnimationFrame(() => { barraPend = false; pintarBarra(); }); }
{ const st = document.createElement('style'); st.textContent = `
  #barra .slot { position: relative; } #barra .slot i.dura { position: absolute; left: 12%; right: 12%; bottom: 5px; height: 4px; background: #1d1d21; border-radius: 2px; pointer-events: none; }
  #barra .slot i.dura s { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 2px; }
  #yunqueLista .trato { align-items: center; } #yunqueLista .dura2 { position: relative; height: 7px; background: #1d1d21; border-radius: 4px; margin-top: 3px; overflow: hidden; } #yunqueLista .dura2 s { position: absolute; left: 0; top: 0; bottom: 0; }
  #yunqueLista .mb { padding: 5px 9px; font-size: 13px; white-space: nowrap; } #yunqueLista .cost { display: inline-flex; align-items: center; gap: 3px; font-size: 11px; }
  #yunqueLista .cost .slot { width: 26px; height: 26px; } #yunqueLista h5 { margin: 8px 0 3px; font-size: 13px; }
`; document.head.appendChild(st); }
const colorDura = f => f > .5 ? '#36c95a' : f > .25 ? '#ffd23a' : '#e0475a';
const quedaDe = (clave, id) => DURA[id] ? 1 - Math.min(1, (desg()[clave] || 0) / DURA[id][0]) : 1;
{ const p0 = pintarBarra; pintarBarra = function () { const r = p0.apply(this, arguments);
    if (!jugando || !conDesgaste() || typeof stats === 'undefined') return r;
    $('barra').querySelectorAll('.slot').forEach((s, k) => { const id = barra[k]; if (!id || !DURA[id] || !(desg()[id] > 0)) return; const f = quedaDe(id, id); s.insertAdjacentHTML('beforeend', `<i class="dura"><s style="width:${Math.round(f * 100)}%;background:${colorDura(f)}"></s></i>`); });
    return r; }; }

// ═════════ YUNQUE ═════════
cap('yunqueCapa', '<div class="mVentana" style="width:min(600px,94vw)"><div class="vCab"><div class="vTit" data-i="yunqueAquí"></div><div class="cerrar" id="yunqueCerrar">X</div></div><div class="vCuerpo"><div style="font-size:12px;margin-bottom:6px" data-i="yunqueAyuda"></div><div id="yunqueLista"></div></div></div>');
aplicarIdioma();
{ const t = $('yunqueCapa').querySelector('.vTit'); t.removeAttribute('data-i'); }
const ENCANTABLE = { [I.PICO4]: I.PICO_E, [I.ESP4]: I.ESP_E, [I.BALLESTA]: I.BALLESTA_E, [I.TRIDENTE]: I.TRIDENTE_E };
function cosasGastadas() {
  const l = [], d = desg();
  for (const id in inv) { const n = +id; if (DURA[n] && inv[n] > 0 && d[n] > 0) l.push({ clave: n, id: n }); }
  armaduraDe().forEach((id, k) => { if (id && d['a' + k] > 0) l.push({ clave: 'a' + k, id }); });
  if (stats.alas && d.alas > 0) l.push({ clave: 'alas', id: I.ALAS });
  return l;
}
function pintarYunque() {
  $('yunqueCapa').querySelector('.vTit').textContent = nom(B.YUNQUE);
  const l = cosasGastadas(); let h = '';
  h += l.length ? l.map(({ clave, id }) => { const [max, mat] = DURA[id], f = quedaDe(clave, id), m = MATERIAL_REP[mat], falta = Math.ceil((desg()[clave] || 0) / (max / 4)), tengo = inv[m] || 0;
    return `<div class="trato">${slotHTML(id, 1)}<div style="flex:1;font-size:13px">${esc(nom(id))}<div class="dura2"><s style="width:${Math.round(f * 100)}%;background:${colorDura(f)}"></s></div></div>
      <span class="cost">${slotHTML(m, 1)}×1</span><div class="mb verde" data-rep="${clave}">${TR('reparar')}</div>${falta > 1 ? `<div class="mb" data-reptodo="${clave}">${TR('repararTodo')} ×${Math.min(falta, Math.max(1, tengo))}</div>` : ''}</div>`; }).join('')
    : `<div style="font-size:13px">${TR('yunqueNada')}</div>`;
  const enc = Object.keys(ENCANTABLE).map(Number).filter(id => creativo() ? barra.includes(id) : inv[id] > 0);
  if (enc.length) h += `<h5>${TR('encantarY')} · ${TR('encantarCosto')}</h5>` + enc.map(id => `<div class="trato">${slotHTML(id, 1)}<span class="flecha">&#10140;</span>${slotHTML(ENCANTABLE[id], 1)}<div style="flex:1;font-size:13px">${esc(nom(ENCANTABLE[id]))}</div><div class="mb" style="background:#c58cf5" data-enc="${id}">${TR('encantarY')}</div></div>`).join('');
  $('yunqueLista').innerHTML = h;
}
function abrirYunque() { pausado = true; soltarTodo(); pintarYunque(); abrir('yunqueCapa'); son(320, .15, 'square', .1); }
function reparar(clave, veces) {
  const id = /^\d+$/.test(String(clave)) ? +clave : clave === 'alas' ? I.ALAS : armaduraDe()[+String(clave)[1]]; if (!id || !DURA[id]) return;
  const [max, mat] = DURA[id], m = MATERIAL_REP[mat], d = desg(), k = /^\d+$/.test(String(clave)) ? +clave : clave;
  let hechas = 0;
  while (hechas < veces && d[k] > 0) { if (!creativo()) { if (!(inv[m] > 0)) break; quitarItem(m, 1); } d[k] = Math.max(0, d[k] - max / 4); hechas++; }
  if (!hechas) return aviso(TR('faltaMat', { n: nom(m) }), 1200);
  aviso(TR('reparado', { n: nom(id) }), 1200); for (let i = 0; i < 2; i++) setTimeout(() => son(900 - i * 200, .07, 'square', .1), i * 110); polvo(J.x, J.y + 1, J.z, '#ffd23a', 8);
  sucio = true; pintarBarra(); pintarYunque();
}
function encantarEnYunque(id) {
  const nuevo = ENCANTABLE[id]; if (!nuevo) return;
  if (!creativo()) { if (!(inv[I.CRISTAL] >= 3 && inv[I.ORO] >= 1)) return aviso(TR('encantarFaltaY'), 1400); quitarItem(I.CRISTAL, 3); quitarItem(I.ORO, 1); quitarItem(id, 1); darItem(nuevo, 1); }
  const k = barra.indexOf(id); if (k >= 0 && (creativo() || !(inv[id] > 0))) barra[k] = nuevo; delete desg()[id];
  pintarBarra(); aviso(TR('encantado', { n: nom(nuevo) }), 1800); for (let i = 0; i < 4; i++) setTimeout(() => son(600 + i * 200, .15, 'triangle', .1), i * 100); polvo(J.x, J.y + 1.2, J.z, '#ff8aff', 20); sucio = true; pintarYunque();
}
$('yunqueLista').addEventListener('click', e => { let d;
  if (d = e.target.closest('[data-rep]')) reparar(d.dataset.rep, 1);
  else if (d = e.target.closest('[data-reptodo]')) reparar(d.dataset.reptodo, 99);
  else if (d = e.target.closest('[data-enc]')) encantarEnYunque(+d.dataset.enc); });
$('yunqueCerrar').onclick = () => { cerrar('yunqueCapa'); pausado = false; };
// la mesa de encantar también sirve para la ballesta y el tridente
{ const e0 = encantar; encantar = function () { const id = barra[sel]; if (id === I.BALLESTA || id === I.TRIDENTE) {
      if (!creativo()) { if (!(inv[I.CRISTAL] >= 3)) return aviso(TR('faltanCristales'), 1200); quitarItem(I.CRISTAL, 3); quitarItem(id, 1); darItem(ENCANTABLE[id], 1); }
      barra[sel] = ENCANTABLE[id]; delete desg()[id]; pintarBarra(); aviso(TR('encantado', { n: nom(ENCANTABLE[id]) }), 1800); polvo(J.x, J.y + 1.2, J.z, '#ff8aff', 20); sucio = true; return; }
    return e0.apply(this, arguments); }; }

// ═════════ PROYECTILES: virotes de ballesta y tridente ═════════
const tiros = [];
const huesoX = new THREE.Vector3();
function nuevoTiro(tipo, dir, dano) {
  const g = new THREE.Group();
  if (tipo === 'virote') { cajaC(g, .05, .05, .7, 0, 0, 0, '#5a3418'); cajaC(g, .1, .1, .12, 0, 0, -.38, '#c8d0e0'); cajaC(g, .14, .02, .14, 0, 0, .32, '#3a5ad8'); }
  else { const E = barra[sel] === I.TRIDENTE_E, m = E ? '#7ff0ff' : '#9fe0d0', a = E ? '#2a7ab8' : '#4a7a6a';
    cajaC(g, .06, .06, 1.2, 0, 0, .1, a); cajaC(g, .3, .06, .06, 0, 0, -.5, m); for (const s of [-1, 0, 1]) cajaC(g, .06, .06, .26, s * .13, 0, -.64 - (s ? 0 : .06), m); }
  g.position.set(J.x + dir.x * .6, J.y + OJOS - .1 + dir.y * .6, J.z + dir.z * .6); escena.add(g);
  const t = { g, tipo, v: dir.clone().multiplyScalar(tipo === 'virote' ? 48 : 30), t: 0, quieto: false, dano, vuelve: false, golpeados: new Set() };
  tiros.push(t); return t;
}
function blancos() {
  const l = [];
  for (const m of monstruos.concat(animales)) { const u = m.userData; if (u.extra && u.extra.d) continue; if (u.animal && TIPOS[u.animal] && TIPOS[u.animal].aldeano) continue; l.push({ m, p: m.position, an: (u.an || .5) + .15, al: u.al || 1.4 }); }
  if (typeof MP !== 'undefined' && MP.invitado) for (const [nid, b] of MP.bichos) { const T = TIPOS[b.tipo] || {}; l.push({ nid, b, m: b.g, p: b.g.position, an: (T.an || .5) + .15, al: T.al || 1.45 }); }
  return l;
}
function pegarBlanco(o, dano, v) {
  if (o.nid != null) { mpEnviar({ t: 'g', n: o.nid, d: Math.round(dano), dx: +(v.x / (v.length() || 1)).toFixed(2), dz: +(v.z / (v.length() || 1)).toFixed(2) }); o.m.userData.rojo = .25; }
  else if (o.m.userData.titere && o.m.userData.animal === 'umbrak' && typeof mpEnviar === 'function') { mpEnviar({ t: 'g', k: 'umb', d: Math.round(dano), dx: 0, dz: 0 }); o.m.userData.rojo = .25; }
  else { const u = o.m.userData; herir(o.m, dano); u.kx = v.x * .2; u.kz = v.z * .2; }
  son(220, .1, 'sawtooth', .1);
}
let tridenteFuera = null;
function moverTiros(dt) {
  for (const f of tiros.slice()) {
    f.t += dt;
    if (f.tipo === 'tridente' && (f.vuelve || f.t > (f.quieto ? .6 : 1.4))) {   // vuelve a la mano
      f.vuelve = true; const p = f.g.position, to = new THREE.Vector3(J.x, J.y + 1.1, J.z), d = to.clone().sub(p), dist = d.length();
      if (dist < 1 || f.t > 8) { escena.remove(f.g); tiros.splice(tiros.indexOf(f), 1); tridenteFuera = null; son(760, .08, 'triangle', .1); continue; }
      p.addScaledVector(d.normalize(), Math.min(dist, dt * (barra[sel] === I.TRIDENTE_E ? 34 : 24))); f.g.lookAt(J.x, J.y + 1.1, J.z); f.g.rotateY(Math.PI); continue;
    }
    if (f.tipo === 'virote' && f.t > (f.quieto ? 6 : 4)) { escena.remove(f.g); tiros.splice(tiros.indexOf(f), 1); continue; }
    if (f.quieto) continue;
    const enAgua = get(Math.floor(f.g.position.x), Math.floor(f.g.position.y), Math.floor(f.g.position.z)) === B.AGUA;
    f.v.y -= (f.tipo === 'virote' ? 7 : 9) * dt; if (enAgua && f.tipo === 'virote') f.v.multiplyScalar(1 - dt * 3);   // el tridente no frena en el agua
    const p = f.g.position, pasos = Math.max(1, Math.ceil(f.v.length() * dt / .2)), h = dt / pasos; let fin = false;
    const bl = blancos();
    for (let k = 0; k < pasos && !fin; k++) { p.addScaledVector(f.v, h);
      for (const o of bl) { if (f.golpeados.has(o.m)) continue; const q = o.p;
        if (Math.abs(p.x - q.x) < o.an && Math.abs(p.z - q.z) < o.an && p.y > q.y && p.y < q.y + o.al) { f.golpeados.add(o.m); pegarBlanco(o, f.dano * (J.fuerza || 1), f.v);
          if (f.tipo === 'virote') { escena.remove(f.g); tiros.splice(tiros.indexOf(f), 1); } else f.vuelve = true; fin = true; break; } }
      if (fin) break; const t = get(Math.floor(p.x), Math.floor(p.y), Math.floor(p.z));
      if (t && DEF[t] && DEF[t].solido && t !== B.AGUA) { f.quieto = true; f.t = f.tipo === 'virote' ? 0 : f.t; son(400, .05, 'square', .06); fin = true; } }
    if (!f.vuelve) f.g.lookAt(p.x - f.v.x, p.y - f.v.y, p.z - f.v.z);
  }
}
// el invitado: sus flechas normales también les pegan a los bichos del dueño
function flechasInvitadoBichos() {
  if (typeof MP === 'undefined' || !MP.invitado || !MP.bichos.size || typeof flechas === 'undefined') return;
  for (const f of flechas.slice()) { if (f.quieta) continue; const p = f.g.position;
    for (const [nid, b] of MP.bichos) { const T = TIPOS[b.tipo] || {}, an = (T.an || .5) + .15, al = T.al || 1.45, q = b.g.position;
      if (Math.abs(p.x - q.x) < an && Math.abs(p.z - q.z) < an && p.y > q.y && p.y < q.y + al) { escena.remove(f.g); flechas.splice(flechas.indexOf(f), 1); pegarBlanco({ nid, b, m: b.g }, 7 * (J.fuerza || 1), f.v); break; } } }
}

// ─── ballesta: tocar para cargar (1 s), tocar otra vez para disparar ───
let ballesta = { cargada: false, cargando: 0, id: 0 };
function usarBallesta(dir, id) {
  if (ballesta.cargando > 0) return;
  if (!ballesta.cargada || ballesta.id !== id) {
    if (!creativo()) { if (!(inv[I.FLECHA] > 0)) return aviso(TR('sinFlechas'), 1400); }
    ballesta.cargando = 1; ballesta.hasta = performance.now() + 1000; ballesta.id = id; ballesta.cargada = false; aviso(TR('ballestaCargando'), 900); son(300, .5, 'sawtooth', .05); return;
  }
  ballesta.cargada = false;
  const E = id === I.BALLESTA_E, dirs = E ? [-.1, 0, .1] : [0];
  for (const a of dirs) { const d = dir.clone(); if (a) d.applyAxisAngle(new THREE.Vector3(0, 1, 0), a); nuevoTiro('virote', d, 11); }
  swing = 1; son(520, .15, 'square', .12); ruido(.12, .08, 1800); vibrar(25); gastar(id, id, E ? 2 : 1);
}
// ─── tridente: de cerca pega fuerte; si no hay nadie cerca, se tira y vuelve ───
function tirarTridente(dir, id) {
  if (tridenteFuera) return aviso(TR('tridenteFuera'), 800);
  tridenteFuera = nuevoTiro('tridente', dir, id === I.TRIDENTE_E ? 13 : 9); swing = 1; son(440, .15, 'triangle', .12); ruido(.1, .08, 1200); gastar(id, id);
}
const DANO_TRIDENTE = id => id === I.TRIDENTE_E ? 13 : 9;
{ const g0 = golpear; golpear = function (m) {
    const id = barra[sel];
    if (id === I.TRIDENTE || id === I.TRIDENTE_E) { const base = [2, 3, 4, 6, 8, 11][nivelEspada()], f0 = J.fuerza; J.fuerza = (f0 || 1) * DANO_TRIDENTE(id) / base;
      try { return g0.apply(this, arguments); } finally { J.fuerza = f0; gastar(id, id); } }
    const r = g0.apply(this, arguments); const e = mejorEspada(); if (e) gastar(e, e); return r; }; }

// ═════════ ALAS PLANEADORAS ═════════
let planeo = null;   // { v, impulso }
const alasPuestas = () => !!(jugando && typeof stats !== 'undefined' && stats.alas);
function ponerAlas() {
  if (stats.alas) return aviso(TR('alasPuestas'), 1400);
  if (!creativo()) quitarItem(I.ALAS, 1); stats.alas = 1; aviso(TR('alasPuestas'), 2200); sonar('agarrar', .6) || son(300, .15, 'square', .1); rearmarJugador(); sucio = true;
}
// el personaje muestra las alas puestas
let armandoJugador = false;
{ const r0 = rearmarJugador; rearmarJugador = function () { armandoJugador = alasPuestas(); try { return r0.apply(this, arguments); } finally { armandoJugador = false; } }; }
{ const a0 = armarPersonaje; armarPersonaje = function (P) { if (armandoJugador && P && !P.alas) P = Object.assign({}, P, { alas: '#d8f0ff' }); return a0.call(this, P); }; }
// en la lista de armadura aparecen las alas para sacarlas
{ const p0 = pintarListaArm; pintarListaArm = function () { p0.apply(this, arguments);
    if (alasPuestas()) { const h = `<div class="trato">${slotHTML(I.ALAS, 1)}<div style="flex:1;font-size:13px">${esc(nom(I.ALAS))}</div><div class="mb rojo" data-quitaralas="1">${TR('quitarArm')}</div></div>`;
      if ($('armLista').querySelector('.trato')) $('armLista').insertAdjacentHTML('beforeend', h); else $('armLista').innerHTML = h; } }; }
$('armLista').addEventListener('click', e => { if (!e.target.closest('[data-quitaralas]')) return; stats.alas = 0; planeo = null; if (!creativo()) darItem(I.ALAS, 1); pintarListaArm(); pintarArm(); rearmarJugador(); sucio = true; });
{ const p0 = pintarArm; pintarArm = function () { const r = p0.apply(this, arguments); if (alasPuestas() && !creativo() && $('armHud').hidden) { $('armHud').hidden = false; if (typeof barraHud === 'function') $('armHud').innerHTML = barraHud(SVG_ESCUDO, 0, '#9aa8e0'); } return r; }; }
// física del planeo
let saltabaAntes = false;
{ const f0 = fisica; fisica = function (dt) {
    const enAgua = get(Math.floor(J.x), Math.floor(J.y + .4), Math.floor(J.z)) === B.AGUA;
    // tridente en la mano: nadas mucho más rápido
    const tri = barra[sel] === I.TRIDENTE || barra[sel] === I.TRIDENTE_E, nado0 = J.nado; if (tri && enAgua) J.nado = Math.max(J.nado || 1, barra[sel] === I.TRIDENTE_E ? 2.8 : 2.2);
    const saltoNuevo = saltando && !saltabaAntes; saltabaAntes = saltando;
    if (!planeo && alasPuestas() && !volando && !J.suelo && !enAgua && !window.montando && ((saltoNuevo && J.vy < 2) || J.vy < -12)) {
      planeo = { v: Math.max(7, Math.hypot(J.vx, J.vz)), impulso: 0, t: 0 }; aviso(TR('planeando'), 1500); son(260, .3, 'sine', .06);
    }
    if (planeo && (volando || enAgua || !alasPuestas() || window.montando)) planeo = null;
    if (!planeo) { try { return f0.apply(this, arguments); } finally { if (tri) J.nado = nado0; } }
    // planeando: la cámara manda; mirar abajo acelera, mirar arriba frena
    const P = planeo; P.t += dt; if (P.impulso > 0) P.impulso -= dt;
    const pitch = J.pitch || 0, objetivo = P.impulso > 0 ? 22 : Math.max(5, 9 - pitch * 10);
    P.v += (objetivo - P.v) * Math.min(1, dt * (P.impulso > 0 ? 3 : 1));
    const s = Math.sin(J.yaw), c = Math.cos(J.yaw);
    J.vx = -s * P.v; J.vz = -c * P.v; J.vy = P.impulso > 0 ? Math.max(-1, pitch * 14) : Math.min(1.2, -2.2 + pitch * 7);
    let nx = J.x + J.vx * dt; if (!choca(nx, J.y, J.z)) J.x = nx; else { J.vx = 0; P.v *= .3; }
    let nz = J.z + J.vz * dt; if (!choca(J.x, J.y, nz)) J.z = nz; else { J.vz = 0; P.v *= .3; }
    const ny = J.y + J.vy * dt, tp = tope(J.x, ny, J.z); J.suelo = false;
    if (tp === -Infinity) J.y = ny; else { if (J.vy < 0) { J.suelo = true; J.y = Math.max(ny, Math.min(J.y, tp)); planeo = null; son(180, .1, 'square', .08); } J.vy = 0; }
    if (J.y > SY + 8) J.y = SY + 8;
    J.x = Math.max(.4, Math.min(SX - .4, J.x)); J.z = Math.max(.4, Math.min(SZ - .4, J.z)); J.rapidez = 0;
    gastoAlas += dt; if (gastoAlas >= 1) { gastoAlas -= 1; gastar('alas', I.ALAS); }
    if (jugador && jugador.userData.alas) { jugador.userData.alas[0].rotation.y = -1.1; jugador.userData.alas[1].rotation.y = 1.1; }
    if (tri) J.nado = nado0;
  }; }
let gastoAlas = 0;
function impulsoCohete() {
  if (!planeo) return false;
  if (!creativo()) { if (!(inv[I.COHETE] > 0)) return false; quitarItem(I.COHETE, 1); }
  planeo.impulso = 1.6; swing = 1; son(240, .4, 'sawtooth', .1); ruido(.4, .1, 600); for (let i = 0; i < 6; i++) setTimeout(() => polvo(J.x, J.y + .6, J.z, ['#ffd23a', '#ff4a78', '#5ab4ff'][i % 3], 3), i * 90);
  return true;
}

// ═════════ TOCAR con el equipo nuevo en la mano ═════════
{ const t0 = tocar; tocar = function (dir) {
    const id = barra[sel] || 0;
    if (id === I.COHETE && planeo && impulsoCohete()) return;
    if (id === I.ALAS) return ponerAlas();
    const h = apuntar(dir);
    if (h && h.b === B.YUNQUE) { const m = monstruoApuntado(dir); if (!m || m.t > h.t) return abrirYunque(); }
    if (id === I.BALLESTA || id === I.BALLESTA_E) { const m = monstruoApuntado(dir); if (!(m && m.t < 2.2)) return usarBallesta(dir, id); }
    if (id === I.TRIDENTE || id === I.TRIDENTE_E) {
      const m = monstruoApuntado(dir); let cerca = m && m.t < 3.5 && (!h || m.t < h.t);
      if (!cerca && typeof MP !== 'undefined' && MP.invitado) for (const b of MP.bichos.values()) if (b.g.position.distanceTo(new THREE.Vector3(J.x, J.y, J.z)) < 3.5) cerca = true;
      if (!cerca) return tirarTridente(dir, id);
      if (typeof MP !== 'undefined' && MP.invitado && MP.bichos.size) {   // invitado: el golpe de cerca con el daño del tridente
        const o = new THREE.Vector3(J.x, J.y + OJOS, J.z), r = new THREE.Ray(o, dir), v = new THREE.Vector3(); let mejor = null;
        for (const [nid, b] of MP.bichos) { const p = b.g.position, T = TIPOS[b.tipo] || {}, an = (T.an || .5) + .1, al = T.al || 1.45;
          if (r.intersectBox(new THREE.Box3(new THREE.Vector3(p.x - an, p.y, p.z - an), new THREE.Vector3(p.x + an, p.y + al, p.z + an)), v)) { const d = v.distanceTo(o); if (d < 4.5 && (!mejor || d < mejor.d)) mejor = { nid, d, b }; } }
        if (mejor && (!h || mejor.d < h.t)) { pegarBlanco({ nid: mejor.nid, b: mejor.b, m: mejor.b.g }, DANO_TRIDENTE(id) * (J.fuerza || 1), dir); swing = 1; gastar(id, id); return; } }
    }
    return t0.apply(this, arguments); }; }

// ═════════ CADA CUADRO ═════════
let ultEq = performance.now();
(function eqFrame(ya) {
  requestAnimationFrame(eqFrame);
  const dt = Math.min(.05, (ya - ultEq) / 1000); ultEq = ya;
  if (!jugando) return;
  if (ballesta.cargando > 0 && pausado) ballesta.hasta += dt * 1000;   // en pausa no carga
  if (ballesta.cargando > 0 && !pausado) { ballesta.cargando = Math.max(0, (ballesta.hasta - ya) / 1000); if (ballesta.cargando <= 0) { ballesta.cargando = 0; if (!creativo()) { if (inv[I.FLECHA] > 0) quitarItem(I.FLECHA, 1); else return aviso(TR('sinFlechas'), 1200); } ballesta.cargada = true; aviso(TR('ballestaLista'), 1000); son(700, .08, 'square', .1); } }
  if (!pausado) { moverTiros(dt); flechasInvitadoBichos(); }
  if (!planeo && jugador && jugador.userData.alas && alasPuestas() && jugador.userData.alas[0].rotation.y) { jugador.userData.alas[0].rotation.y = 0; jugador.userData.alas[1].rotation.y = 0; }
})(performance.now());
{ const e0 = entrarMundo; entrarMundo = function () { for (const f of tiros.splice(0)) escena.remove(f.g); tridenteFuera = null; planeo = null; ballesta = { cargada: false, cargando: 0, id: 0 }; return e0.apply(this, arguments); }; }

window.__eq = { DURA, gastar, desg: () => desg(), abrirYunque, reparar, planeo: () => planeo, tiros, ballesta: () => ballesta, impulsoCohete, quedaDe };
