'use strict';
// ═════════ PROGRESO DE AVENTURA ═════════
// · Mejoras del jugador: cada nivel nuevo que alcanzas da 1 punto para mejorar Fuerza, Resistencia, Recuperación o Suerte.
// · Armaduras de cada mundo (casco + pechera) con un poder especial al llevar las dos piezas.
// · Mapa de aventura: marca mazmorras, pueblos, biomas, guaridas y portales.

{
const TXT = {
  es: { mjTit: 'Mejoras', mjPuntos: 'Puntos para usar: {n}', mjAyuda: 'Ganas 1 punto por cada nivel nuevo que alcanzas (la barra verde).', mjSubir: 'Mejorar', mjMax: 'Al máximo', mjNuevo: '¡TIENES UN PUNTO DE MEJORA!<small>toca tu nivel (arriba de la barra) para usarlo</small>',
    mj_fuerza: 'Fuerza', mjd_fuerza: '+10% de daño por nivel', mj_resistencia: 'Resistencia', mjd_resistencia: '-8% de daño recibido por nivel', mj_recupera: 'Recuperación', mjd_recupera: 'Te curas más rápido', mj_suerte: 'Suerte', mjd_suerte: 'A veces los enemigos y minerales dan el doble',
    arSet: '¡PODER DE LA ARMADURA!<small>{n}</small>', ar_hielo: 'Inmune al frío de las tormentas de nieve', ar_mar: 'Respiras bajo el agua', ar_nubes: 'Caes despacio y sin daño', ar_dulce: 'Te curas de a poco', ar_lunar: 'Saltas mucho más alto',
    mpMazmorra: 'Mazmorra', mpPueblo: 'Pueblo', mpGuarida: 'Guarida', mpPortal: 'Portal' },
  en: { mjTit: 'Upgrades', mjPuntos: 'Points to spend: {n}', mjAyuda: 'You get 1 point for every new level you reach (the green bar).', mjSubir: 'Upgrade', mjMax: 'Maxed', mjNuevo: 'YOU HAVE AN UPGRADE POINT!<small>tap your level (above the hotbar) to use it</small>',
    mj_fuerza: 'Strength', mjd_fuerza: '+10% damage per level', mj_resistencia: 'Toughness', mjd_resistencia: '-8% damage taken per level', mj_recupera: 'Recovery', mjd_recupera: 'You heal faster', mj_suerte: 'Luck', mjd_suerte: 'Enemies and ores sometimes give double',
    arSet: 'ARMOR POWER!<small>{n}</small>', ar_hielo: 'Immune to snowstorm cold', ar_mar: 'You breathe underwater', ar_nubes: 'You fall slowly and safely', ar_dulce: 'You slowly heal', ar_lunar: 'You jump much higher',
    mpMazmorra: 'Dungeon', mpPueblo: 'Village', mpGuarida: 'Lair', mpPortal: 'Portal' },
  pt: { mjTit: 'Melhorias', mjPuntos: 'Pontos para usar: {n}', mjAyuda: 'Você ganha 1 ponto por cada nível novo que alcança (a barra verde).', mjSubir: 'Melhorar', mjMax: 'No máximo', mjNuevo: 'VOCÊ TEM UM PONTO DE MELHORIA!<small>toque no seu nível (acima da barra) para usar</small>',
    mj_fuerza: 'Força', mjd_fuerza: '+10% de dano por nível', mj_resistencia: 'Resistência', mjd_resistencia: '-8% de dano recebido por nível', mj_recupera: 'Recuperação', mjd_recupera: 'Você se cura mais rápido', mj_suerte: 'Sorte', mjd_suerte: 'Às vezes inimigos e minérios dão o dobro',
    arSet: 'PODER DA ARMADURA!<small>{n}</small>', ar_hielo: 'Imune ao frio das nevascas', ar_mar: 'Você respira debaixo d\'água', ar_nubes: 'Você cai devagar e sem dano', ar_dulce: 'Você se cura aos poucos', ar_lunar: 'Você pula muito mais alto',
    mpMazmorra: 'Masmorra', mpPueblo: 'Vila', mpGuarida: 'Covil', mpPortal: 'Portal' } };
for (const l in TXT) Object.assign(TX[l], TXT[l]);
const MEJ = ['fuerza', 'resistencia', 'recupera', 'suerte'], MAXR = 5;

// ═════════ MEJORAS ═════════
const mej = () => { stats.mejoras = stats.mejoras || {}; return stats.mejoras; };
const rango = k => (typeof stats !== 'undefined' && stats && stats.mejoras && stats.mejoras[k]) || 0;
const ganados = () => Math.min(MEJ.length * MAXR, (stats && stats.nivelMax) || 0);
const gastados = () => MEJ.reduce((s, k) => s + rango(k), 0);
const libres = () => Math.max(0, ganados() - gastados());
cap('mjCapa', '<div class="mVentana" style="width:min(480px,94vw)"><div class="vCab"><div class="vTit" data-i="mjTit"></div><div class="cerrar" id="mjCerrar">X</div></div><div class="vCuerpo"><div id="mjPuntos" style="font-weight:800;font-size:16px"></div><div data-i="mjAyuda" style="font-size:12px;margin:2px 0 8px"></div><div id="mjLista"></div></div></div>');
{ const st = document.createElement('style'); st.textContent = `#mjLista .mjF { display: flex; align-items: center; gap: 10px; padding: 8px 10px; margin-bottom: 6px; border-radius: 12px; background: #eef1ff; border: 2px solid #c8d0f0; }
  #mjLista .mjF b { display: block; font-size: 15px; } #mjLista .mjF small { font-size: 12px; color: #4a5680; } #mjLista .pts { display: flex; gap: 3px; margin-top: 3px; } #mjLista .pts i { width: 14px; height: 8px; border-radius: 3px; background: #c8d0e0; } #mjLista .pts i.on { background: #36c95a; }
  #mjLista .mb { margin-left: auto; padding: 6px 12px; border-radius: 10px; background: #ffd23a; border: 2px solid #c8841a; font-weight: 800; cursor: pointer; white-space: nowrap; color: #1b2a6b; } #mjLista .mb.no { opacity: .4; pointer-events: none; }
  #xpHud b { pointer-events: auto; cursor: pointer; } #xpHud.mjHay b { color: #ffe14a; animation: mjLat 1s infinite; } @keyframes mjLat { 50% { transform: translateX(-50%) scale(1.25); } }
  #xpHud { pointer-events: auto; }`; document.head.appendChild(st); }
aplicarIdioma();
function abrirMejoras() { if (creativo()) return; pausado = true; soltarTodo(); pintarMejoras(); abrir('mjCapa'); }
function pintarMejoras() { $('mjPuntos').textContent = TR('mjPuntos', { n: libres() });
  $('mjLista').innerHTML = MEJ.map(k => `<div class="mjF"><div><b>${TR('mj_' + k)}</b><small>${TR('mjd_' + k)}</small><div class="pts">${Array.from({ length: MAXR }, (_, i) => `<i class="${i < rango(k) ? 'on' : ''}"></i>`).join('')}</div></div><div class="mb${libres() && rango(k) < MAXR ? '' : ' no'}" data-mj="${k}">${rango(k) >= MAXR ? TR('mjMax') : TR('mjSubir')}</div></div>`).join(''); }
$('mjLista').addEventListener('click', e => { const d = e.target.closest('[data-mj]'); if (!d || !libres()) return; const k = d.dataset.mj; if (rango(k) >= MAXR) return; mej()[k] = rango(k) + 1; sucio = true; son(880, .1, 'triangle', .1); setTimeout(() => son(1320, .15, 'triangle', .1), 90); pintarMejoras(); });
$('mjCerrar').onclick = () => { cerrar('mjCapa'); pausado = false; };
{ const xh = $('xpHud'); if (xh) xh.addEventListener('pointerdown', e => { e.stopPropagation(); abrirMejoras(); }); }
// llevar la cuenta del nivel más alto alcanzado (los puntos no se pierden al morir)
let avisado = 0;
function revisarNivel() { if (!stats || creativo()) return; const n = stats.nivel || 0; if (n > (stats.nivelMax || 0)) { stats.nivelMax = n; sucio = true; if (libres() && avisado !== n) { avisado = n; setTimeout(() => aviso(TR('mjNuevo'), 3500), 1500); } }
  const xh = $('xpHud'); if (xh) xh.classList.toggle('mjHay', libres() > 0); }
// efectos: fuerza, resistencia, recuperación y suerte
{ const g0 = golpear; golpear = function (m) { const r = g0.apply(this, arguments); const f = rango('fuerza'); if (f && m && m.userData && m.userData.vida > 0 && !creativo()) herir(m, Math.max(1, Math.round([2, 3, 4, 6, 8, 11][nivelEspada()] * .1 * f))); return r; }; }
{ const l0 = lastimar; lastimar = function (n, ...r) { const k = rango('resistencia'); if (k && n > 0) n = Math.max(1, Math.round(n * (1 - .08 * k))); return l0.call(this, n, ...r); }; }
{ const m0 = matarAnimal; matarAnimal = function (a) { const T = TIPOS[a.userData.animal]; if (T && T.hostil && !creativo() && jugando && Math.random() < rango('suerte') * .07 && T.suelta) { try { for (const [id, n] of T.suelta()) if (n > 0) darItem(id, n); } catch (e) {} } return m0.apply(this, arguments); }; }
{ const a0 = alTerminarAccion; alTerminarAccion = function (g) { a0(g); const s = rango('suerte'); if (!s || creativo()) return; for (const [, viejo, nuevo] of g) if (!nuevo && DEF[viejo] && /^Mineral|mineral/.test(DEF[viejo].nombre || '') && Math.random() < s * .07) { const sl = DEF[viejo].suelta; if (sl) { darItem(sl, 1); aviso('×2', 500); } } }; }

// ═════════ ARMADURAS DE CADA MUNDO ═════════
const LIB = []; for (let t = 205; t < 256; t++) if (TILES[t] == null) LIB.push(t); for (let t = 397; t < 448; t++) if (TILES[t] == null) LIB.push(t);
const tileP = (n, f) => { const k = LIB.shift(); if (k == null) return TL.piedra; TILES[k] = n; TL[n] = k; dibujarTile(k, f); return k; };
const cascoT = (c, c2) => (x, y) => { if (y < 3 || y > 12 || x < 2 || x > 13) return null; if (y > 8 && x > 4 && x < 11) return null; return y === 3 || x === 2 || x === 13 ? c2 : (x + y) % 5 === 0 ? c2 : c; };
const pecheraT = (c, c2) => (x, y) => { if (y < 1 || y > 14 || x < 1 || x > 14) return null; if (y < 4 && x > 4 && x < 11) return null; if (y > 7 && (x < 3 || x > 12)) return null; return (x === 7 || x === 8) && y > 4 ? c2 : y === 1 || y === 14 ? c2 : c; };
// [clave, nombre casco, nombre pechera, colores, material visual, ingrediente 1 (casco n, pechera n), ingrediente 2]
const SETS = [
  ['hielo', ['Casco de hielo', 'Ice helmet', 'Capacete de gelo'], ['Pechera de hielo', 'Ice chestplate', 'Peitoral de gelo'], '#9ae4ff', '#e8faff', 3, B.HIELO_AZUL, I.ESCARCHA],
  ['mar', ['Casco de perlas', 'Pearl helmet', 'Capacete de pérolas'], ['Pechera de perlas', 'Pearl chestplate', 'Peitoral de pérolas'], '#3a9af0', '#e8f4ff', 1, I.PERLA, I.HIERRO],
  ['nubes', ['Casco de nubes', 'Cloud helmet', 'Capacete de nuvens'], ['Pechera de nubes', 'Cloud chestplate', 'Peitoral de nuvens'], '#f6f8ff', '#58c0e8', 0, B.NUBE, I.ESCARCHA],
  ['dulce', ['Casco de caramelo', 'Candy helmet', 'Capacete de bala'], ['Pechera de caramelo', 'Candy chestplate', 'Peitoral de bala'], '#ff70b0', '#ffffff', 2, B.ALGODON, I.CARAMELO_RARO],
  ['lunar', ['Casco lunar', 'Moon helmet', 'Capacete lunar'], ['Pechera lunar', 'Moon chestplate', 'Peitoral lunar'], '#c8c8d4', '#ffd23a', 1, B.ROCA_LUNAR, I.NUCLEO_FUEGO]];
const ARSET = {}; let idA = 2120;
for (const [k, nc, np, c, c2, mat, ing1, ing2] of SETS) {
  if (ing1 == null || ing2 == null) continue;
  const ic = idA++, ip = idA++;
  item(ic, nc[0], tileP('casco_' + k, cascoT(c, c2)), { armadura: 0, material: mat, setV: k }); item(ip, np[0], tileP('pechera_' + k, pecheraT(c, c2)), { armadura: 1, material: mat, setV: k });
  for (const [es, en, pt] of [nc, np]) { NOMBRES.en = NOMBRES.en || {}; NOMBRES.pt = NOMBRES.pt || {}; NOMBRES.en[es] = en; NOMBRES.pt[es] = pt; }
  TODOS.push(ic, ip); ARSET[k] = [ic, ip];
  RECETAS.push([[ic, 1], [[ing1, 5], [ing2, 1]]], [[ip, 1], [[ing1, 8], [ing2, 2]]]);
}
try { atlasTex.needsUpdate = true; } catch (e) {}
const setPuesto = () => { if (typeof stats === 'undefined' || !stats || !stats.armadura) return null; const a = stats.armadura; for (const k in ARSET) if (a[0] === ARSET[k][0] && a[1] === ARSET[k][1]) return k; return null; };
let setAntes = null, curaT = 0, saltoMio = false;
window.__sinFrio = () => setPuesto() === 'hielo';
function frameSet(dt) {
  const k = jugando && !creativo() ? setPuesto() : null;
  if (k !== setAntes) { setAntes = k; if (k) aviso(TR('arSet', { n: TR('ar_' + k) }), 2600); }
  if (k === 'mar') { try { aire = 10; } catch (e) {} }
  if (k === 'nubes' && !volando && J.vy < -9) J.vy = -9;
  if (k === 'dulce' && !pausado) { curaT += dt; if (curaT > 5) { curaT = 0; if (vida < 20 && vida > 0) { vida++; pintarVida(); } } }
  if (k === 'lunar') { if (!J.saltoPocion || J.saltoPocion === 1) { J.saltoPocion = 1.35; saltoMio = true; } } else if (saltoMio) { if (J.saltoPocion === 1.35) J.saltoPocion = 1; saltoMio = false; }
  // recuperación: curación extra
  const rc = rango('recupera'); if (rc && jugando && !creativo() && !pausado && vida > 0 && vida < 20 && hambre >= 8) { recT += dt; if (recT > 9 - rc * 1.2) { recT = 0; vida++; pintarVida(); } }
}
let recT = 0;

// ═════════ MAPA DE AVENTURA ═════════
{ const d0 = dibujarMapa; dibujarMapa = function () { const r = d0.apply(this, arguments); try { marcasMapa(); } catch (e) { console.warn('mapa', e && e.message); } return r; }; }
function marcasMapa() {
  const cv = $('mapaCv'), g = cv.getContext('2d'), e = cv.width / SX;
  const marca = (x, z, color, forma, texto) => { const X = x * e, Y = z * e; g.save(); g.lineWidth = 2; g.strokeStyle = '#0d153d'; g.fillStyle = color; g.beginPath();
    if (forma === 'rombo') { g.moveTo(X, Y - 8); g.lineTo(X + 8, Y); g.lineTo(X, Y + 8); g.lineTo(X - 8, Y); g.closePath(); }
    else if (forma === 'casa') { g.moveTo(X, Y - 8); g.lineTo(X + 7, Y - 1); g.lineTo(X + 7, Y + 7); g.lineTo(X - 7, Y + 7); g.lineTo(X - 7, Y - 1); g.closePath(); }
    else if (forma === 'calavera') { g.arc(X, Y - 1, 7, 0, 6.283); }
    else { g.arc(X, Y, 6, 0, 6.283); }
    g.fill(); g.stroke();
    if (forma === 'calavera') { g.fillStyle = '#0d153d'; g.fillRect(X - 4, Y - 3, 3, 3); g.fillRect(X + 1, Y - 3, 3, 3); }
    if (texto) { g.font = 'bold 12px "Baloo 2", Arial, sans-serif'; g.textAlign = 'center'; g.lineWidth = 3; g.strokeStyle = 'rgba(13,21,61,.85)'; g.strokeText(texto, X, Y - 12); g.fillStyle = '#fff'; g.fillText(texto, X, Y - 12); }
    g.restore(); };
  if (!window.mundoTipo) {
    try { for (const Z of __biomas.zonas()) { g.save(); g.font = 'bold 11px "Baloo 2", Arial'; g.textAlign = 'center'; g.lineWidth = 3; g.strokeStyle = 'rgba(13,21,61,.7)'; const t = TR('bio_' + Z.k); g.strokeText(t, Z.x * e, Z.z * e); g.fillStyle = '#ffe9a8'; g.fillText(t, Z.x * e, Z.z * e); g.restore(); } } catch (er) {}
    for (const a of aldeas || []) marca(a.x, a.z, '#e8b060', 'casa', TR('mpPueblo'));
    try { for (const P of __pj2.pueblos()) marca(P.x, P.z, '#ff9ac0', 'casa', TR('pu_' + P.k)); } catch (er) {}
    try { for (const m of __mz.lista()) { const hecha = mapa.mz && mapa.mz[m.id + '_jefe']; marca(m.entrada.x, m.entrada.z, hecha ? '#7a8090' : '#c8341a', 'calavera', TR('mz_' + m.tema)); } } catch (er) {}
  } else {
    try { const G = __aventura2.guarida(); if (G) marca(G.x, G.z, mapa.jefeV ? '#7a8090' : '#c8341a', 'calavera', TR('mpGuarida')); } catch (er) {}
  }
  for (const k in (mapa.portalesV || {})) { const i = +k, y = Math.floor(i / (SX * SZ)), r = i % (SX * SZ); marca(r % SX + .5, Math.floor(r / SX) + .5, '#7a4aff', 'rombo', TR('pv_' + mapa.portalesV[k])); }
  // el jugador arriba de todo
  g.save(); g.translate(J.x * e, J.z * e); g.rotate(-J.yaw); g.beginPath(); g.moveTo(0, -11); g.lineTo(7, 8); g.lineTo(0, 4); g.lineTo(-7, 8); g.closePath(); g.fillStyle = '#ff3030'; g.lineWidth = 2; g.strokeStyle = '#000'; g.fill(); g.stroke(); g.restore();
}

// ═════════ CADA CUADRO ═════════
let revT = 0;
{ const p0 = pjFrame; pjFrame = function (dt) { const r = p0.apply(this, arguments); try { if (jugando) { revT -= dt; if (revT <= 0) { revT = 1; revisarNivel(); } frameSet(dt); } } catch (e) { console.warn('progreso', e && e.message); } return r; }; }
window.__progreso = { abrirMejoras, libres, setPuesto, ARSET };
}
