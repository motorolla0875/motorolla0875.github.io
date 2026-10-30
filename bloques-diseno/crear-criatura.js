'use strict';
// ═════════ CRIATURAS DISEÑADAS A MANO (forma "Tu diseño") ═════════
// En "Tu criatura" aparece una forma nueva: armás el cuerpo (de 4 patas o de 2), le agregás orejas, cola, alas o cuernos,
// y pintás cuadradito por cuadradito la cara, la piel y las patas. Además se pueden tener hasta 20 criaturas por mod.

Object.assign(TX.es, { f_propia: 'Tu diseño', ccDiseno: 'Tu diseño', ccCuerpo: 'Cuerpo', ccCuatro: '4 patas', ccDos: '2 patas', ccCabeza: 'Cabeza', ccChica: 'Chica', ccNormal: 'Normal', ccGrande: 'Grande',
  ccOrejas: 'Orejas', ccCola: 'Cola', ccNada: 'Nada', ccPuntas: 'En punta', ccRedondas: 'Redondas', ccLargas: 'Largas', ccCorta: 'Corta', ccLarga: 'Larga', ccPeluda: 'Peluda',
  ccExtras: 'Extras', ccAlas: 'Alas', ccCuernos: 'Cuernos', ccPintar: 'Pintar', ccCara: 'Cara', ccPiel: 'Piel', ccPatas: 'Patas', ccRellenar: 'Rellenar todo', ccBorrarP: 'Volver al original', ccToca: 'Toca o arrastra sobre los cuadraditos para pintar' });
Object.assign(TX.en, { f_propia: 'Your design', ccDiseno: 'Your design', ccCuerpo: 'Body', ccCuatro: '4 legs', ccDos: '2 legs', ccCabeza: 'Head', ccChica: 'Small', ccNormal: 'Normal', ccGrande: 'Big',
  ccOrejas: 'Ears', ccCola: 'Tail', ccNada: 'None', ccPuntas: 'Pointy', ccRedondas: 'Round', ccLargas: 'Long', ccCorta: 'Short', ccLarga: 'Long', ccPeluda: 'Fluffy',
  ccExtras: 'Extras', ccAlas: 'Wings', ccCuernos: 'Horns', ccPintar: 'Paint', ccCara: 'Face', ccPiel: 'Skin', ccPatas: 'Legs', ccRellenar: 'Fill all', ccBorrarP: 'Back to original', ccToca: 'Tap or drag over the squares to paint' });
Object.assign(TX.pt, { f_propia: 'Seu design', ccDiseno: 'Seu design', ccCuerpo: 'Corpo', ccCuatro: '4 patas', ccDos: '2 patas', ccCabeza: 'Cabeça', ccChica: 'Pequena', ccNormal: 'Normal', ccGrande: 'Grande',
  ccOrejas: 'Orelhas', ccCola: 'Rabo', ccNada: 'Nada', ccPuntas: 'Pontudas', ccRedondas: 'Redondas', ccLargas: 'Longas', ccCorta: 'Curto', ccLarga: 'Longo', ccPeluda: 'Peludo',
  ccExtras: 'Extras', ccAlas: 'Asas', ccCuernos: 'Chifres', ccPintar: 'Pintar', ccCara: 'Rosto', ccPiel: 'Pele', ccPatas: 'Patas', ccRellenar: 'Preencher tudo', ccBorrarP: 'Voltar ao original', ccToca: 'Toque ou arraste sobre os quadradinhos para pintar' });

const CC_MAX = 20, CC_N = 8;
// la forma nueva va primera en la lista
FORMA_BASE.propia = { an: .45, al: 1.5, vel: 1.1, c1: '#5fb0ff', c2: '#2a5aa8' };
{ const viejo = Object.assign({}, FORMA_TXT); for (const k in FORMA_TXT) delete FORMA_TXT[k]; FORMA_TXT.propia = 'f_propia'; Object.assign(FORMA_TXT, viejo); }

// dibujos iniciales (8×8): cara con ojos y boca, piel lisa con manchitas, patas lisas
function ccPorDefecto(c1, c2) {
  const cara = Array(64).fill(c1), piel = Array(64).fill(c1), patas = Array(64).fill(c2);
  for (const [x, y] of [[1, 2], [2, 2], [5, 2], [6, 2]]) cara[y * 8 + x] = '#ffffff';
  for (const [x, y] of [[2, 3], [5, 3]]) cara[y * 8 + x] = '#14142a'; for (const [x, y] of [[1, 3], [6, 3]]) cara[y * 8 + x] = '#ffffff';
  for (const x of [3, 4]) cara[5 * 8 + x] = '#3a1a1a'; cara[6 * 8 + 3] = cara[6 * 8 + 4] = c2;
  for (const i of [9, 13, 27, 36, 42, 53, 22]) piel[i] = c2;
  return { cuerpo: 4, cabeza: 1, orejas: 'puntas', cola: 'corta', alas: false, cuernos: false, pix: { cara, piel, patas } };
}
const ccTex = (() => { const cache = new Map(); return arr => { const k = arr.join(','); if (cache.has(k)) return cache.get(k);
  const cv = document.createElement('canvas'); cv.width = cv.height = CC_N; const g = cv.getContext('2d'); arr.forEach((c, i) => { g.fillStyle = c || '#000'; g.fillRect(i % CC_N, Math.floor(i / CC_N), 1, 1); });
  const t = new THREE.CanvasTexture(cv); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; cache.set(k, t); if (cache.size > 200) cache.delete(cache.keys().next().value); return t; }; })();
const ccMat = arr => new THREE.MeshLambertMaterial({ map: ccTex(arr) });
// arma el cuerpo y devuelve las patas (para que caminen)
function ccArmar(g, c) {
  const p = c.p || ccPorDefecto(c.c1, c.c2), piel = ccMat(p.pix.piel), cara = ccMat(p.pix.cara), patasM = ccMat(p.pix.patas), det = matA(hex(c.c2 || '#2a5aa8'));
  const cab = [.45, .55, .7][p.cabeza ?? 1], cabM = [piel, piel, piel, piel, cara, piel];
  const patas = [];
  let hy, hz, cx; // posición de la cabeza
  if (p.cuerpo === 2) {
    caja(g, .55, .62, .38, 0, .92, 0, piel); hy = 1.23 + cab / 2; hz = 0; cx = .19;
    for (const s of [-1, 1]) patas.push(pata(g, .22, .62, .24, s * .14, .62, 0, patasM));
    for (const s of [-1, 1]) caja(g, .14, .5, .16, s * .35, .96, 0, patasM);
  } else {
    caja(g, .66, .52, .98, 0, .78, 0, piel); hy = .98 + cab * .3; hz = .52 + cab * .38; cx = .33;
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) patas.push(pata(g, .2, .52, .2, sx * .2, .52, sz * .34, patasM));
  }
  caja(g, cab, cab, cab, 0, hy, hz, cabM);
  const top = hy + cab / 2;
  if (p.orejas === 'puntas') for (const s of [-1, 1]) { const o = caja(g, .12, .2, .08, s * cab * .3, top + .08, hz, det); o.rotation.z = -s * .2; }
  if (p.orejas === 'redondas') for (const s of [-1, 1]) caja(g, .2, .18, .07, s * cab * .38, top + .05, hz, det);
  if (p.orejas === 'largas') for (const s of [-1, 1]) caja(g, .11, .42, .07, s * cab * .22, top + .2, hz - .04, det);
  if (p.cuernos) for (const s of [-1, 1]) { const o = caja(g, .08, .26, .08, s * cab * .32, top + .1, hz + .05, matA(0xf4efe0)); o.rotation.z = -s * .35; }
  const atras = p.cuerpo === 2 ? -.22 : -.5, colaY = p.cuerpo === 2 ? .8 : .9;
  if (p.cola === 'corta') caja(g, .12, .12, .22, 0, colaY, atras - .1, det);
  if (p.cola === 'larga') { const t = caja(g, .09, .09, .62, 0, colaY + .1, atras - .28, det); t.rotation.x = .5; }
  if (p.cola === 'peluda') caja(g, .26, .26, .36, 0, colaY + .05, atras - .16, det);
  if (p.alas) for (const s of [-1, 1]) { const a = caja(g, .05, .42, .62, s * (cx + .04), p.cuerpo === 2 ? 1.05 : .98, -.05, det); a.rotation.z = s * .5; }
  return patas;
}
// la criatura de un mod con forma "Tu diseño"
{ const t0 = tipoCriatura; tipoCriatura = function (c, m) { const T = t0.apply(this, arguments); if (c.base !== 'propia') return T;
    const s = TAM[c.tam ?? 1], p = c.p || ccPorDefecto(c.c1, c.c2), cab = [.45, .55, .7][p.cabeza ?? 1];
    T.voz = p.cuerpo === 2 ? 'cerdo' : 'oveja'; T.an = .45 * s; T.al = (p.cuerpo === 2 ? 1.25 + cab : 1 + cab * .8) * s;
    T.armar = function (g) { const h = new THREE.Group(); h.scale.setScalar(s); g.add(h); return ccArmar(h, c); };
    return T; }; }

// ─── editor ───
let ccParte = 'cara', ccColor = '#14142a', ccPintando = false;
const ccP = () => { if (!criE.p) criE.p = ccPorDefecto(criE.c1, criE.c2); return criE.p; };
{ const st = document.createElement('style'); st.textContent = `
  #ccDis .opcG { margin-bottom: 4px; }
  #ccGrilla { display: grid; grid-template-columns: repeat(8, 1fr); width: min(100%, 248px); aspect-ratio: 1; gap: 2px; padding: 3px; border-radius: 10px; background: #0d153d; touch-action: none; user-select: none; }
  #ccGrilla > div { border-radius: 3px; cursor: crosshair; }
  #ccPint { display: flex; gap: 12px; align-items: flex-start; flex-wrap: wrap; }
  #ccPint .lado { flex: 1; min-width: 150px; display: flex; flex-direction: column; gap: 6px; }
  #ccPal { display: grid; grid-template-columns: repeat(auto-fill, 24px); gap: 4px; }
  #ccPal > div { width: 24px; height: 24px; border-radius: 6px; border: 2px solid #0d153d; cursor: pointer; } #ccPal > div.on { outline: 3px solid #fff; }
  #ccPint .ayuda { font-size: 11px; opacity: .85; }
  @media (max-height: 500px) { #ccGrilla { width: min(100%, 176px); } }
`; document.head.appendChild(st); }
function ccOpc(campo, ops) { const p = ccP(); return `<div class="opcG" data-ccp="${campo}">${ops.map(([v, l]) => `<div data-ccv='${JSON.stringify(v)}' class="${JSON.stringify(p[campo]) === JSON.stringify(v) ? 'on' : ''}">${TR(l)}</div>`).join('')}</div>`; }
function ccPintarEditor() {
  const cu = $('criCuerpo'); if (!cu) return; const viejo = $('ccDis'); if (viejo) viejo.remove();
  if (!criE || criE.base !== 'propia') return;
  const p = ccP(), arr = p.pix[ccParte];
  const cols = [...new Set([criE.c1, criE.c2, '#ffffff', '#14142a'].concat(PALETA))];
  const h = `<div id="ccDis"><h4>${TR('ccCuerpo')}</h4>${ccOpc('cuerpo', [[4, 'ccCuatro'], [2, 'ccDos']])}
    <h4>${TR('ccCabeza')}</h4>${ccOpc('cabeza', [[0, 'ccChica'], [1, 'ccNormal'], [2, 'ccGrande']])}
    <h4>${TR('ccOrejas')}</h4>${ccOpc('orejas', [['', 'ccNada'], ['puntas', 'ccPuntas'], ['redondas', 'ccRedondas'], ['largas', 'ccLargas']])}
    <h4>${TR('ccCola')}</h4>${ccOpc('cola', [['', 'ccNada'], ['corta', 'ccCorta'], ['larga', 'ccLarga'], ['peluda', 'ccPeluda']])}
    <h4>${TR('ccExtras')}</h4><div class="opcG"><div data-cctog="alas" class="${p.alas ? 'on' : ''}">${TR('ccAlas')}</div><div data-cctog="cuernos" class="${p.cuernos ? 'on' : ''}">${TR('ccCuernos')}</div></div>
    <h4>${TR('ccPintar')}</h4><div class="opcG" data-ccparte="1">${[['cara', 'ccCara'], ['piel', 'ccPiel'], ['patas', 'ccPatas']].map(([k, l]) => `<div data-cc-parte="${k}" class="${k === ccParte ? 'on' : ''}">${TR(l)}</div>`).join('')}</div>
    <div id="ccPint"><div id="ccGrilla">${arr.map((c, i) => `<div data-cci="${i}" style="background:${c}"></div>`).join('')}</div>
      <div class="lado"><div id="ccPal">${cols.map(c => `<div data-cccol="${c}" class="${c === ccColor ? 'on' : ''}" style="background:${c}"></div>`).join('')}</div>
        <input type="color" id="ccColIn" value="${/^#[0-9a-f]{6}$/i.test(ccColor) ? ccColor : '#14142a'}" style="width:48px;height:28px;padding:0;border-radius:6px">
        <div class="opcG"><div data-ccacc="rellenar">${TR('ccRellenar')}</div><div data-ccacc="original">${TR('ccBorrarP')}</div></div>
        <div class="ayuda">${TR('ccToca')}</div></div></div></div>`;
  // va justo después de la elección de forma
  const forma = cu.querySelector('[data-cc="base"]'); if (forma) forma.insertAdjacentHTML('afterend', h); else cu.insertAdjacentHTML('afterbegin', h);
}
{ const p0 = pintarCri; pintarCri = function () { const r = p0.apply(this, arguments); try { ccPintarEditor(); } catch (e) { console.error(e); } return r; }; }
let ccVistaT = 0; const ccVista = () => { clearTimeout(ccVistaT); ccVistaT = setTimeout(() => vistaCri(), 60); };
function ccPintarEn(el) { const i = +el.dataset.cci; const p = ccP(); if (p.pix[ccParte][i] === ccColor) return; p.pix[ccParte][i] = ccColor; el.style.background = ccColor; ccVista(); }
$('criCuerpo').addEventListener('pointerdown', e => { const el = e.target.closest('[data-cci]'); if (!el) return; e.preventDefault(); ccPintando = true; ccPintarEn(el); }, true);
$('criCuerpo').addEventListener('pointermove', e => { if (!ccPintando) return; const el = document.elementFromPoint(e.clientX, e.clientY); if (el && el.dataset && el.dataset.cci != null && el.closest('#ccGrilla')) ccPintarEn(el); });
addEventListener('pointerup', () => { ccPintando = false; }); addEventListener('pointercancel', () => { ccPintando = false; });
$('criCuerpo').addEventListener('click', e => {
  let d;
  if (d = e.target.closest('[data-ccp] [data-ccv]')) { e.stopPropagation(); ccP()[d.parentElement.dataset.ccp] = JSON.parse(d.dataset.ccv); pintarCri(); vistaCri(); return; }
  if (d = e.target.closest('[data-cctog]')) { e.stopPropagation(); const p = ccP(), k = d.dataset.cctog; p[k] = !p[k]; pintarCri(); vistaCri(); return; }
  if (d = e.target.closest('[data-cc-parte]')) { e.stopPropagation(); ccParte = d.dataset.ccParte; pintarCri(); return; }
  if (d = e.target.closest('[data-cccol]')) { e.stopPropagation(); ccColor = d.dataset.cccol; for (const x of document.querySelectorAll('#ccPal > div')) x.classList.toggle('on', x === d); const ci = $('ccColIn'); if (ci) ci.value = ccColor; return; }
  if (d = e.target.closest('[data-ccacc]')) { e.stopPropagation(); const p = ccP();
    if (d.dataset.ccacc === 'rellenar') p.pix[ccParte] = Array(64).fill(ccColor); else p.pix[ccParte] = ccPorDefecto(criE.c1, criE.c2).pix[ccParte];
    pintarCri(); vistaCri(); return; }
  if (e.target.closest('[data-cci]')) e.stopPropagation();
}, true);
$('criCuerpo').addEventListener('input', e => { if (e.target.id === 'ccColIn') { ccColor = e.target.value; for (const x of document.querySelectorAll('#ccPal > div')) x.classList.remove('on'); } }, true);
// al elegir "Tu diseño", el dibujo arranca con los colores de la criatura
{ const p0 = pintarCri; pintarCri = function () { if (criE && criE.base === 'propia' && !criE.p) criE.p = ccPorDefecto(criE.c1 || FORMA_BASE.propia.c1, criE.c2 || FORMA_BASE.propia.c2); return p0.apply(this, arguments); }; }

// ─── hasta 20 criaturas por mod ───
{ const p0 = pintarEditorMod; pintarEditorMod = function () { const r = p0.apply(this, arguments);
    try { if (modEd && modEd.criaturas && modEd.criaturas.length >= 6 && modEd.criaturas.length < CC_MAX && !$('bNuevaCri')) {
      const filas = [...$('modEdCuerpo').querySelectorAll('.fila')].filter(f => f.querySelector('[data-criq]') || /criatura/i.test(f.textContent)); const ult = filas[filas.length - 1];
      const html = `<div class="fila"><div class="mb verde" id="bNuevaCri">${TR('nuevaCriatura')}</div></div>`; if (ult) ult.insertAdjacentHTML('afterend', html); } } catch (e) {}
    return r; }; }
