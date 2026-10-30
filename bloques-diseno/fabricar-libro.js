'use strict';
// ═════════ FABRICAR (supervivencia) con el libro en el centro, en el estilo actual ═════════
// Izquierda: lista de cosas para fabricar. Centro: el pergamino con el dibujo y los materiales. Derecha: la ficha y los botones.
// Mismos botones lisos (borde azul oscuro), misma ventana clara y misma letra que el resto del juego.

Object.assign(TX.es, { fbPuede: 'Se puede fabricar', fbFalta: 'Te faltan materiales', fbMats: 'Materiales necesarios', fbCant: 'Cantidad', fbTienes: 'Tienes', fbTipo: 'Tipo', fbNivel: 'Nivel',
  fbHerr: 'Herramienta', fbArma: 'Arma', fbComida: 'Comida', fbBloque: 'Bloque', fbObjeto: 'Objeto', fbArmad: 'Armadura', fbPocion: 'Poción', fbHacer: 'Fabricar', fbHacer5: 'Fabricar 5', fbTit: 'Mesa del artesano' });
Object.assign(TX.en, { fbPuede: 'Ready to craft', fbFalta: 'Missing materials', fbMats: 'Required materials', fbCant: 'Amount', fbTienes: 'You have', fbTipo: 'Type', fbNivel: 'Level',
  fbHerr: 'Tool', fbArma: 'Weapon', fbComida: 'Food', fbBloque: 'Block', fbObjeto: 'Item', fbArmad: 'Armor', fbPocion: 'Potion', fbHacer: 'Craft', fbHacer5: 'Craft 5', fbTit: "Crafter's table" });
Object.assign(TX.pt, { fbPuede: 'Pode fabricar', fbFalta: 'Faltam materiais', fbMats: 'Materiais necessários', fbCant: 'Quantidade', fbTienes: 'Você tem', fbTipo: 'Tipo', fbNivel: 'Nível',
  fbHerr: 'Ferramenta', fbArma: 'Arma', fbComida: 'Comida', fbBloque: 'Bloco', fbObjeto: 'Objeto', fbArmad: 'Armadura', fbPocion: 'Poção', fbHacer: 'Fabricar', fbHacer5: 'Fabricar 5', fbTit: 'Mesa do artesão' });

{ const st = document.createElement('style'); st.textContent = `
  #panel .ventana.fbAncha { max-width: none !important; max-height: none !important; display: flex; flex-direction: column; }
  #panel .ventana.fbAncha .vCuerpo, #panel .ventana.fbAncha #pCuerpo { flex: 1; min-height: 0; overflow: hidden !important; padding: 4px 12px 12px !important; }
  #panel .ventana.fbAncha .vPie { display: none; }
  #panel .fbTit { flex: 1; text-align: center; font-weight: 900; font-size: clamp(16px, 2vw, 24px); color: #1b2a6b; text-transform: uppercase; letter-spacing: 1px; }
  .fbFab { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, .9fr); gap: 14px; height: 100%; }
  /* lista */
  .fbLista { overflow-y: auto; display: flex; flex-direction: column; gap: 7px; padding: 2px 6px 2px 2px; scrollbar-width: thin; }
  .fbIt { position: relative; flex: none; display: flex; align-items: center; gap: 10px; padding: 6px 8px; cursor: pointer; border-radius: 12px; background: #f2f5ff; border: 3px solid #0d153d; color: #1b2a6b; }
  .fbIt .ic { width: 40px; height: 40px; flex: none; border-radius: 8px; background: #dfe6fb center / 30px no-repeat; image-rendering: pixelated; border: 2px solid #0d153d; }
  .fbIt .tx { flex: 1; min-width: 0; } .fbIt .n { font-weight: 900; font-size: 14px; line-height: 1.1; }
  .fbIt .tg { display: inline-block; margin-top: 3px; padding: 1px 8px; border-radius: 6px; font-size: 10px; font-weight: 800; color: #fff; background: #2fb65a; border: 2px solid #0d153d; }
  .fbIt.no { opacity: .8; } .fbIt.no .tg { background: #d8434f; }
  .fbIt.sel { background: #3a86e8; color: #fff; } .fbIt.sel .ic { background-color: #cfe2ff; }
  /* centro: el pergamino */
  .fbCentro { display: flex; flex-direction: column; gap: 10px; min-height: 0; }
  .fbPapel { position: relative; flex: 1; min-height: 0; margin: 14px 8px 4px; background: linear-gradient(180deg, #f6ead0, #ead7b0); border-radius: 4px; box-shadow: 0 14px 28px rgba(0,0,0,.35), inset 0 0 50px rgba(150,110,60,.35); transform: rotate(-1.2deg); }
  .fbPapel::before, .fbPapel::after { content: ''; position: absolute; left: -10px; right: -10px; height: 24px; border-radius: 14px; background: linear-gradient(180deg, #e4cfa4, #c9ae7c); box-shadow: 0 4px 8px rgba(0,0,0,.25); }
  .fbPapel::before { top: -13px; } .fbPapel::after { bottom: -13px; }
  .fbPapel svg { position: absolute; inset: 8% 6%; width: 88%; height: 84%; }
  .fbPapel .dib { position: absolute; left: 50%; top: 48%; width: 46%; aspect-ratio: 1; transform: translate(-50%, -50%) rotate(-8deg); background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; filter: sepia(1) saturate(2.2) hue-rotate(185deg) brightness(.75) contrast(1.3); opacity: .82; mix-blend-mode: multiply; }
  .fbMats { border-radius: 12px; background: #f2f5ff; border: 3px solid #0d153d; padding: 6px 10px 8px; text-align: center; color: #1b2a6b; }
  .fbMats h5 { margin: 0 0 4px; font-weight: 900; font-size: 13px; text-transform: uppercase; }
  .fbMats .fila2 { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
  .fbMat .c { font-size: 14px; font-weight: 900; color: #d8434f; } .fbMat .c.ok { color: #1f9a4a; }
  .fbMat .ic { width: 38px; height: 38px; margin: 2px auto; background: #dfe6fb center / 28px no-repeat; image-rendering: pixelated; border-radius: 8px; border: 2px solid #0d153d; }
  .fbMat .nm { font-size: 11px; font-weight: 700; }
  /* derecha: la ficha */
  .fbFicha { display: flex; flex-direction: column; gap: 6px; min-height: 0; padding: 12px; border-radius: 14px; background: #f2f5ff; border: 3px solid #0d153d; color: #1b2a6b; }
  .fbFicha h3 { margin: 0; font-weight: 900; font-size: 20px; line-height: 1.15; }
  .fbFicha .big { width: 84px; height: 84px; align-self: center; border-radius: 14px; background: #dfe6fb center / 60px no-repeat; image-rendering: pixelated; border: 3px solid #0d153d; }
  .fbFicha .dato { display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; border-bottom: 1px solid rgba(13,21,61,.12); padding: 2px 0; } .fbFicha .dato b { color: #0d153d; }
  .fbFicha .fbMats { display: none; }
  .fbFicha .acc { margin-top: auto; display: flex; flex-direction: column; gap: 8px; }
  .fbB { display: flex; align-items: center; justify-content: center; height: 44px; padding: 0 16px; border-radius: 12px; border: 3px solid #0d153d; font-weight: 900; font-size: 17px; color: #fff; text-shadow: 0 2px 0 rgba(13,21,61,.55); cursor: pointer; background: #3a86e8; }
  .fbB.ve { background: #2fb65a; } .fbB.off { background: #8a93b4; opacity: .7; cursor: default; } .fbB:not(.off):active { transform: translateY(2px); }
  @media (max-height: 560px) {
    .fbFab { gap: 8px; grid-template-columns: minmax(0, 1fr) minmax(0, .85fr) minmax(0, .95fr); }
    .fbIt { padding: 4px 6px; gap: 8px; } .fbIt .ic { width: 32px; height: 32px; background-size: 24px; } .fbIt .n { font-size: 12px; } .fbIt .tg { font-size: 9px; }
    .fbCentro .fbMats { display: none; } .fbPapel { margin: 12px 6px 10px; }
    .fbFicha { padding: 8px; gap: 3px; } .fbFicha h3 { font-size: 15px; } .fbFicha .big { width: 50px; height: 50px; background-size: 36px; } .fbFicha .dato { display: none; } .fbFicha .fbMats { display: block; padding: 4px 6px; }
    .fbMat .ic { width: 28px; height: 28px; background-size: 20px; } .fbMat .c { font-size: 12px; } .fbMat .nm { display: none; } .fbMats h5 { font-size: 10px; margin-bottom: 2px; }
    .fbFicha .acc { flex-direction: row; gap: 6px; } .fbB { flex: 1; height: 34px; font-size: 13px; padding: 0 6px; }
  }
`; document.head.appendChild(st); }

let fbSel = -1;
const fbBg = id => `background-image:url(${icono(id)})`;
const fbTipo = id => { const it = ITEM[id] || {}; if (it.pico) return TR('fbHerr'); if (it.espada) return TR('fbArma'); if (it.armadura !== undefined) return TR('fbArmad'); if (/poci/i.test(nom(id))) return TR('fbPocion'); if (typeof esComida === 'function' && esComida(id)) return TR('fbComida'); if (typeof esBloque === 'function' && esBloque(id)) return TR('fbBloque'); return TR('fbObjeto'); };
const fbCuantas = r => Math.min(...r[1].map(([id, n]) => Math.floor((inv[id] || 0) / n)));
function fbHTML() {
  const rs = RECETAS.slice().sort((a, b) => puedeHacer(b) - puedeHacer(a));
  if (fbSel < 0 || !RECETAS[fbSel]) fbSel = RECETAS.indexOf(rs[0]);
  const r = RECETAS[fbSel], id = r[0][0], ok = puedeHacer(r), cu = fbCuantas(r), it = ITEM[id] || {};
  const lista = rs.map(x => { const k = RECETAS.indexOf(x), p = puedeHacer(x); return `<div class="fbIt${p ? '' : ' no'}${k === fbSel ? ' sel' : ''}" data-fbsel="${k}"><div class="ic" style="${fbBg(x[0][0])}"></div><div class="tx"><div class="n">${esc(nom(x[0][0]))}${x[0][1] > 1 ? ' ×' + x[0][1] : ''}</div><div class="tg">${TR(p ? 'fbPuede' : 'fbFalta')}</div></div></div>`; }).join('');
  const mats = `<div class="fbMats"><h5>${TR('fbMats')}</h5><div class="fila2">${r[1].map(([m, n]) => `<div class="fbMat"><div class="c${(inv[m] || 0) >= n ? ' ok' : ''}">${inv[m] || 0}/${n}</div><div class="ic" style="${fbBg(m)}"></div><div class="nm">${esc(nom(m))}</div></div>`).join('')}</div></div>`;
  return `<div class="fbFab"><div class="fbLista" id="fbLista">${lista}</div>
    <div class="fbCentro"><div class="fbPapel"><svg viewBox="0 0 410 520" fill="none" stroke="#3b3a8c" stroke-width="2" opacity=".5"><circle cx="205" cy="250" r="160" stroke-dasharray="6 8"/><rect x="70" y="115" width="270" height="270"/><line x1="205" y1="50" x2="205" y2="470"/><line x1="20" y1="250" x2="390" y2="250"/><path d="M40 480 h120 M40 495 h90 M250 480 h120 M260 495 h100 M30 40 h110 M30 55 h80 M280 40 h100 M300 55 h70"/><circle cx="330" cy="135" r="20"/><path d="M321 135 l7 7 l13 -16"/></svg><div class="dib" style="${fbBg(id)}"></div></div>${mats}</div>
    <div class="fbFicha"><h3>${esc(nom(id))}</h3><div class="big" style="${fbBg(id)}"></div>
      <div class="dato">${TR('fbCant')}<b>${r[0][1]}</b></div><div class="dato">${TR('fbTipo')}<b>${fbTipo(id)}</b></div><div class="dato">${TR('fbTienes')}<b>${inv[id] || 0}</b></div>${it.pico || it.espada ? `<div class="dato">${TR('fbNivel')}<b>${it.pico || it.espada} / 5</b></div>` : ''}
      ${mats}
      <div class="acc"><div class="fbB ve${ok ? '' : ' off'}" data-fbhacer="1">${TR('fbHacer')}</div><div class="fbB${cu >= 2 ? '' : ' off'}" data-fbhacer="5">${TR('fbHacer5')}</div></div></div></div>`;
}
{ const p0 = pintarPanel; pintarPanel = function () {
    const res = p0.apply(this, arguments);
    const v = document.querySelector('#panel .ventana'); if (!v) return res;
    const fab = panelTab === 'fabricar' && cofreAbierto === null && !creativo();
    v.classList.toggle('fbAncha', fab);
    let t = $('pCab') && $('pCab').querySelector('.fbTit');
    if (fab) {
      const chica = innerHeight < 560; v.style.zoom = innerHeight < 450 ? '.8' : chica ? '.9' : '1'; const z = parseFloat(v.style.zoom);
      v.style.setProperty('width', Math.min(1180, innerWidth * (chica ? .9 : .94)) / z + 'px', 'important');
      v.style.setProperty('height', Math.min(720, innerHeight * (chica ? .9 : .88)) / z + 'px', 'important');
      if (!t && $('pCab')) { const vt = $('pCab').querySelector('.vTit'); t = document.createElement('div'); t.className = 'fbTit'; if (vt) vt.replaceWith(t); else $('pCab').appendChild(t); }
      if (t) t.textContent = TR('fbTit');
      const l = $('fbLista'), sc = l ? l.scrollTop : 0; $('pCuerpo').innerHTML = fbHTML(); const l2 = $('fbLista'); if (l2) l2.scrollTop = sc;
    } else if (v.classList.contains('fbFue')) { v.style.width = ''; v.style.height = ''; v.style.zoom = ''; }
    v.classList.toggle('fbFue', fab);
    return res; }; }
const fbHacer = n => { const r = RECETAS[fbSel]; if (!r) return; let k = 0; while (k < n && puedeHacer(r)) { fabricar(r); k++; } pintarPanel(); };
$('panel').addEventListener('pointerdown', e => {
  let d;
  if (d = e.target.closest('[data-fbsel]')) { e.stopPropagation(); fbSel = +d.dataset.fbsel; pintarPanel(); return; }
  if (d = e.target.closest('[data-fbhacer]')) { e.stopPropagation(); if (!d.classList.contains('off')) fbHacer(+d.dataset.fbhacer); return; }
}, true);
addEventListener('keydown', e => {
  if ($('panel').hidden || panelTab !== 'fabricar' || creativo()) return;
  if (e.code === 'Enter' || e.code === 'NumpadEnter') { e.preventDefault(); fbHacer(1); }
  else if (e.code === 'KeyF') { e.preventDefault(); fbHacer(5); }
  else if (e.code === 'ArrowDown' || e.code === 'ArrowUp') { e.preventDefault(); const it = [...document.querySelectorAll('.fbIt')], i = it.findIndex(x => x.classList.contains('sel')), j = Math.max(0, Math.min(it.length - 1, i + (e.code === 'ArrowDown' ? 1 : -1))); if (it[j]) { fbSel = +it[j].dataset.fbsel; pintarPanel(); const n = document.querySelector('.fbIt.sel'); if (n) n.scrollIntoView({ block: 'nearest' }); } }
});
