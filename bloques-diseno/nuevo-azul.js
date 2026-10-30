'use strict';
// ═════════ MUNDO NUEVO con el mismo panel que Mis mundos ═════════
// Todo en una sola pantalla: arriba Tamaño, Dificultad y Mundo; abajo los modos de a dos (Creativo y Supervivencia primero),
// cada uno con su foto y su botón, y flechas para ver los demás modos.

Object.assign(TX.es, { nvSub: 'Elegí cómo jugar', nvModos: 'Modos de juego', nvCrear: 'Crear', nvPag: (a, b) => a + ' de ' + b });
Object.assign(TX.en, { nvSub: 'Choose how to play', nvModos: 'Game modes', nvCrear: 'Create', nvPag: (a, b) => a + ' of ' + b });
Object.assign(TX.pt, { nvSub: 'Escolha como jogar', nvModos: 'Modos de jogo', nvCrear: 'Criar', nvPag: (a, b) => a + ' de ' + b });
const nvT = (k, a, b) => { const s = (TX[LANG] && TX[LANG][k]) ?? TX.es[k]; return typeof s === 'function' ? s(a, b) : s; };

const NV_FOTOS = { bCreativo: '../bloques-diseno/modos/creativo.jpg', bSuper: '../bloques-diseno/modos/super.jpg', bExtremo: '../bloques-diseno/modos/extremo.jpg',
  bCaceria: '../bloques-diseno/modos/caceria.jpg', bGuerra: '../bloques-diseno/modos/guerra.jpg', bZombis: 'mapas-locales/zombis.jpg', bCasa: 'mapas-locales/casa.jpg',
  bSky: 'mapas-locales/sky.jpg', bParkour: 'mapas-locales/parkour.jpg', bEjemplo: 'mapas-locales/faro.jpg' };
const NV_ETI = { bCreativo: 'cre', bSuper: 'sup', bExtremo: 'ext', bCaceria: 'vio', bGuerra: 'roj' };
const NV_FLECHA = d => `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${d < 0 ? 'M15 4L7 12l8 8z' : 'M9 4l8 8-8 8z'}"/></svg>`;
const NV_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12-7.5z"/></svg>';
const NV_VOLVER = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 5L3 11l7 6v-4c5 0 8 1.5 11 6-1-6-4-10-11-10z"/></svg>';
const NV_CUBO = '<svg viewBox="0 0 24 24"><path d="M12 2l9 5-9 5-9-5z" fill="#7fd0ff"/><path d="M3 7l9 5v10l-9-5z" fill="#2f8cff"/><path d="M21 7l-9 5v10l9-5z" fill="#1659c8"/></svg>';

{ const st = document.createElement('style'); st.textContent = `
  #nuevo.nvListo { justify-content: center !important; overflow: hidden !important; }
  #nvPanel { position: relative; width: min(980px, calc(90vw / var(--uM, 1))); display: flex; flex-direction: column; padding: 16px 20px 12px; color: #fff;
    background: linear-gradient(180deg, rgba(14,32,70,.62), rgba(8,20,46,.64)); border-radius: 18px;
    box-shadow: inset 0 0 0 2px #2f6fd6, 0 0 0 1px rgba(110,180,255,.25), 0 0 24px rgba(40,120,255,.25), 0 20px 50px rgba(0,0,0,.55);
    backdrop-filter: blur(10px) saturate(1.15); -webkit-backdrop-filter: blur(10px) saturate(1.15); }
  @media (min-width: 900px) and (min-height: 560px) { #nvPanel { zoom: 1 !important; width: min(980px, 92vw); } }
  #nvPanel > .titulo { margin: 0 !important; text-align: center; font-size: clamp(30px, 4.6vw, 52px) !important; line-height: 1.05; }
  #nvPanel .nvSub { font-weight: 800; font-size: clamp(11px, 1.4vw, 15px); letter-spacing: 5px; text-transform: uppercase; color: #9fc4ff; text-align: center; margin: 2px 0 12px; }
  /* opciones arriba, en tres columnas */
  #nvOpts { display: grid; grid-template-columns: 1fr 1.35fr 1fr; gap: 10px; margin-bottom: 12px; }
  #nvOpts .ajFila { display: flex !important; flex-direction: column; align-items: stretch; gap: 6px; margin: 0 !important; padding: 8px 10px !important; width: auto !important; max-width: none !important;
    border: none !important; border-radius: 12px !important; background: linear-gradient(180deg, rgba(26,52,104,.6), rgba(16,34,72,.62)) !important; box-shadow: inset 0 0 0 2px #2a4f94 !important; }
  #nvOpts .ajFila > span { font-weight: 800; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #9fc4ff; text-align: left; }
  #nvOpts .ajOpc { display: flex !important; gap: 5px; flex-wrap: nowrap; margin: 0 !important; }
  #nvOpts .ajOpc > div { flex: 1; min-width: 0; text-align: center; padding: 6px 4px !important; margin: 0 !important; border-radius: 8px !important; border: none !important; font-weight: 800; font-size: clamp(10px, 1.1vw, 13px) !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    color: #cfe3ff !important; background: rgba(10,24,56,.55) !important; box-shadow: inset 0 0 0 2px #3a6fc4 !important; cursor: pointer; }
  #nvOpts .ajOpc > div.on { color: #fff !important; background: linear-gradient(180deg, #3d9bff, #1667e6) !important; box-shadow: inset 0 2px 0 rgba(200,230,255,.5), 0 0 0 2px #2a7df0, 0 0 12px rgba(30,110,255,.4) !important; }
  /* modos */
  #nvPanel .nvSec { display: flex; align-items: center; gap: 10px; font-weight: 900; font-size: clamp(15px, 1.8vw, 22px); text-transform: uppercase; margin: 0 0 8px; }
  #nvPanel .nvSec svg { width: 22px; height: 22px; } #nvPanel .nvSec::after { content: ''; flex: 1; height: 2px; background: linear-gradient(90deg, #2f6fd6, rgba(47,111,214,0)); }
  #nvLista { display: flex; flex-direction: column; gap: 8px; }
  .nvCarta { display: flex; align-items: center; gap: 14px; padding: 8px 10px; border-radius: 14px; cursor: pointer;
    background: linear-gradient(180deg, rgba(26,52,104,.6), rgba(16,34,72,.62)); box-shadow: inset 0 0 0 2px #2a4f94; }
  .nvCarta:hover { box-shadow: inset 0 0 0 2px #5aa0ff, 0 0 14px rgba(47,140,255,.3); }
  .nvFoto { width: clamp(110px, 14vw, 170px); aspect-ratio: 16 / 9; border-radius: 10px; flex: none; background: #1a3a6a center / cover no-repeat; box-shadow: inset 0 0 0 2px rgba(127,208,255,.25); }
  .nvDatos { flex: 1; min-width: 0; }
  .nvDatos .nm { font-weight: 900; font-size: clamp(16px, 2vw, 26px); text-shadow: 0 2px 0 #061433; line-height: 1.1; }
  .nvDatos .ds { font-weight: 700; font-size: clamp(11px, 1.2vw, 15px); color: #cfe3ff; margin-top: 4px; line-height: 1.25; }
  .nvEti { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 8px; vertical-align: 2px; background: #3d9bff; }
  .nvEti.sup { background: #1f9a4a; } .nvEti.cre { background: #2f7fe0; } .nvEti.ext { background: #c8323e; } .nvEti.vio { background: #8a4ad0; } .nvEti.roj { background: linear-gradient(90deg, #2f7fe0 50%, #e0403a 50%); }
  .nvCrear { display: flex; align-items: center; gap: 10px; flex: none; padding: 10px clamp(16px, 2.6vw, 40px); border-radius: 10px; font-weight: 900; font-size: clamp(14px, 1.7vw, 20px); text-transform: uppercase; color: #fff;
    background: linear-gradient(180deg, #3d9bff, #1667e6); box-shadow: inset 0 2px 0 rgba(200,230,255,.55), inset 0 -3px 0 rgba(0,20,80,.35), 0 0 0 2px #2a7df0, 0 6px 16px rgba(30,110,255,.35); text-shadow: 0 2px 0 rgba(0,10,40,.5); }
  .nvCrear svg { width: 20px; height: 20px; }
  /* pie: volver, páginas */
  #nvPie { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 10px; }
  #nvPie #bVolverMundos { display: flex !important; align-items: center; gap: 8px; width: auto !important; margin: 0 !important; padding: 8px 18px !important; border: none !important; border-radius: 10px !important; font-size: 15px !important; text-transform: uppercase;
    color: #fff !important; background: linear-gradient(180deg, rgba(26,52,104,.6), rgba(16,34,72,.62)) !important; box-shadow: inset 0 0 0 2px #3a6fc4 !important; }
  #nvPie #bVolverMundos svg { width: 18px; height: 18px; color: #7fd0ff; }
  #nvPag { display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 15px; color: #fff; }
  #nvPag .fl { width: 40px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff;
    background: linear-gradient(180deg, #3d9bff, #1667e6); box-shadow: inset 0 2px 0 rgba(200,230,255,.5), 0 0 0 2px #2a7df0; }
  #nvPag .fl svg { width: 20px; height: 20px; } #nvPag .fl.off { opacity: .3; pointer-events: none; }
  #nvPie .hueco { width: 120px; }
  #nvOcultos { display: none !important; }
  @media (max-height: 560px) { #nvPanel { padding: 8px 12px 6px; } #nvPanel .nvSub { display: none; } }
  @media (max-height: 500px) {
    #nvPanel { width: min(980px, calc(86vw / var(--uM, 1))); padding: 6px 12px 6px; border-radius: 16px; }
    #nvPanel > .titulo { font-size: 24px !important; margin-bottom: 4px !important; }
    #nvOpts { gap: 6px; margin-bottom: 6px; } #nvOpts .ajFila { padding: 4px 6px !important; gap: 3px; } #nvOpts .ajFila > span { font-size: 9px; letter-spacing: 1px; }
    #nvOpts .ajOpc > div { padding: 3px 2px !important; font-size: 10px !important; }
    #nvPanel .nvSec { font-size: 12px; margin: 0 0 4px; } #nvPanel .nvSec svg { width: 14px; height: 14px; }
    #nvLista { gap: 5px; } .nvCarta { padding: 4px 8px; gap: 10px; } .nvFoto { width: 84px; }
    .nvDatos .nm { font-size: 15px; } .nvDatos .ds { font-size: 10px; margin-top: 2px; }
    .nvCrear { padding: 6px 14px; font-size: 12px; } .nvCrear svg { width: 14px; height: 14px; }
    #nvPie { margin-top: 5px; } #nvPie #bVolverMundos { padding: 4px 12px !important; font-size: 12px !important; } #nvPag { font-size: 12px; gap: 8px; } #nvPag .fl { width: 32px; height: 26px; } #nvPie .hueco { width: 90px; }
  }
`; document.head.appendChild(st); }

let nvPagina = 0;
const NV_POR = 2;
function nvArmar() {
  const N = $('nuevo'); if (!N) return;
  if (!$('nvPanel')) {
    N.classList.add('nvListo');
    const P = document.createElement('div'); P.id = 'nvPanel';
    P.innerHTML = `<div class="nvSub"></div><div id="nvOpts"></div><div class="nvSec">${NV_CUBO}<span></span></div><div id="nvLista"></div>
      <div id="nvPie"><div class="hueco"></div><div id="nvPag"><div class="fl" data-nv="-1">${NV_FLECHA(-1)}</div><span class="num"></span><div class="fl" data-nv="1">${NV_FLECHA(1)}</div></div><div class="hueco"></div></div>`;
    const oc = document.createElement('div'); oc.id = 'nvOcultos';
    N.appendChild(P); N.appendChild(oc);
    const tit = N.querySelector(':scope > .titulo'); if (tit) P.insertBefore(tit, P.firstChild);
    $('nvPag').addEventListener('click', e => { const f = e.target.closest('[data-nv]'); if (!f) return; nvPagina += +f.dataset.nv; nvPintar(); });
    $('nvLista').addEventListener('click', e => { const c = e.target.closest('[data-nvb]'); if (!c) return; const b = $(c.dataset.nvb); if (b) b.click(); });
  }
  const P = $('nvPanel'), oc = $('nvOcultos');
  // opciones de arriba y botones de modo que estén sueltos (algunos módulos los agregan después)
  for (const f of [...N.querySelectorAll(':scope > .ajFila')]) $('nvOpts').appendChild(f);
  for (const el of [...N.children]) { if (el === P || el === oc || el.classList.contains('titulo')) continue; if (el.classList.contains('btn') || el.classList.contains('filaBtn')) oc.appendChild(el); }
  const vo = $('bVolverMundos'); if (vo && vo.parentNode !== $('nvPie')) { $('nvPie').replaceChild(vo, $('nvPie').firstChild); }
  if (vo && !vo.querySelector('svg')) vo.insertAdjacentHTML('afterbegin', NV_VOLVER);
}
function nvModos() {
  const oc = $('nvOcultos'); if (!oc) return [];
  const bs = [...oc.querySelectorAll('.btn')].filter(b => b.id && b.id !== 'bVolverMundos' && b.style.display !== 'none');
  const orden = ['bCreativo', 'bSuper']; bs.sort((a, b) => { const ia = orden.indexOf(a.id), ib = orden.indexOf(b.id); return (ia < 0 ? 9 : ia) - (ib < 0 ? 9 : ib); });
  return bs;
}
function nvPintar() {
  nvArmar(); const P = $('nvPanel'); if (!P) return;
  P.querySelector('.nvSub').textContent = nvT('nvSub'); P.querySelector('.nvSec span').textContent = nvT('nvModos');
  const bs = nvModos(), tot = Math.max(1, Math.ceil(bs.length / NV_POR));
  nvPagina = Math.min(Math.max(0, nvPagina), tot - 1);
  const esc2 = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  $('nvLista').innerHTML = bs.slice(nvPagina * NV_POR, nvPagina * NV_POR + NV_POR).map(b => {
    const sm = b.querySelector('small'), ds = sm ? sm.textContent : '';
    const nm = [...b.childNodes].filter(n => n.nodeType === 3 || (n.nodeType === 1 && n.tagName !== 'SMALL' && n.tagName !== 'svg')).map(n => n.textContent).join(' ').trim();
    const foto = NV_FOTOS[b.id], eti = NV_ETI[b.id];
    return `<div class="nvCarta" data-nvb="${b.id}"><div class="nvFoto"${foto ? ` style="background-image:url('${foto}')"` : ''}></div>
      <div class="nvDatos"><div class="nm">${eti ? `<span class="nvEti ${eti}"></span>` : ''}${esc2(nm)}</div><div class="ds">${esc2(ds)}</div></div>
      <div class="nvCrear">${NV_PLAY}${nvT('nvCrear')}</div></div>`;
  }).join('');
  $('nvPag').querySelector('.num').textContent = nvT('nvPag', nvPagina + 1, tot);
  $('nvPag').querySelector('[data-nv="-1"]').classList.toggle('off', nvPagina === 0);
  $('nvPag').querySelector('[data-nv="1"]').classList.toggle('off', nvPagina >= tot - 1);
}
// cada vez que se abre la pantalla vuelve a la primera página (Creativo y Supervivencia)
{ const N = $('nuevo'); let antes = N ? N.hidden : true;
  if (N) new MutationObserver(() => { if (antes && !N.hidden) { nvPagina = 0; nvPintar(); } antes = N.hidden; }).observe(N, { attributes: true, attributeFilter: ['hidden'] }); }
if (typeof aplicarIdioma === 'function') { const a0 = aplicarIdioma; aplicarIdioma = function () { const r = a0.apply(this, arguments); try { if ($('nvPanel')) nvPintar(); } catch (e) {} return r; }; }
setTimeout(() => { try { nvPintar(); } catch (e) { console.log('nv', e); } }, 400);
setTimeout(() => { try { nvPintar(); } catch (e) {} }, 2500);
