'use strict';
// ═════════ PANTALLAS QUE SIEMPRE ENTRAN BIEN ═════════
// 1) "Mis mundos": la lista va por páginas (flechas al estilo del juego) y los botones al costado,
//    así nunca hay que deslizar y todo entra en la pantalla del teléfono acostado.
// 2) "Mapas": el nombre de cada mapa va sobre la foto, así se lee siempre.

Object.assign(TX.es, { pagina: '{a} de {b}', jugado: 'Jugado {f}', nadaMundos: 'Todavía no tienes mundos. ¡Crea el primero!' });
Object.assign(TX.en, { pagina: '{a} of {b}', jugado: 'Played {f}', nadaMundos: "You don't have any worlds yet. Create your first one!" });
Object.assign(TX.pt, { pagina: '{a} de {b}', jugado: 'Jogado {f}', nadaMundos: 'Você ainda não tem mundos. Crie o primeiro!' });
if (TX.tr) Object.assign(TX.tr, { pagina: '{a} / {b}', jugado: 'Oynandı: {f}', nadaMundos: 'Henüz hiç dünyan yok. İlkini oluştur!' });
if (TX.id) Object.assign(TX.id, { pagina: '{a} dari {b}', jugado: 'Dimainkan {f}', nadaMundos: 'Kamu belum punya dunia. Buat yang pertama!' });
if (TX.ar) Object.assign(TX.ar, { pagina: '{a} من {b}', jugado: 'لُعب {f}', nadaMundos: 'ليس لديك عوالم بعد. أنشئ أول عالم!' });

const FLECHA = d => `<svg viewBox="0 0 10 10" shape-rendering="crispEdges" style="width:22px;height:22px${d < 0 ? ';transform:scaleX(-1)' : ''}"><path d="M3 1h2v1h1v1h1v1h1v2H7v1H6v1H5v1H3v-1H2V2h1z" fill="#0d153d"/><path d="M3 2h1v1h1v1h1v2H5v1H4v1H3z" fill="#fff"/></svg>`;

{ const st = document.createElement('style'); st.textContent = `
  #mundos { justify-content: center; padding: max(6px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(6px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left)); overflow: hidden; }
  #mundos > .titulo { margin: 0 0 4px; font-size: clamp(22px, 6vh, 40px) !important; line-height: 1; }
  #mundosCuerpo { display: flex; flex-direction: column; gap: 6px; width: min(900px, 100%); flex: 1; min-height: 0; max-height: 640px; }
  #mundosIzq { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: center; min-height: 0; }
  #mundosDer { flex: none; display: flex; gap: 6px; align-items: stretch; }
  #mundosDer .filaBtn { display: contents; }
  #mundosDer .btn { flex: 1; min-width: 0; width: auto !important; max-width: none !important; margin: 0 !important; padding: 6px 4px 5px; font-size: 14px; line-height: 1.1; display: flex; flex-direction: column; justify-content: center; }
  #mundosDer .btn small { font-size: 10px; line-height: 1.1; margin-top: 2px; }
  #mundosDer #bVolverInicio { flex: .7; }
  #listaMundos { width: 100% !important; max-height: none !important; flex: 0 1 auto; min-height: 0; overflow: hidden !important; display: flex; flex-direction: column; justify-content: flex-start; padding: 5px; gap: 4px; box-sizing: border-box; }
  #listaMundos .mundoFila { flex: none; border: 2px solid rgba(255,255,255,.14); border-radius: 10px; background: rgba(255,255,255,.06); padding: 3px 8px; gap: 8px; }
  #listaMundos .mundoFila.oculta { display: none; }
  #listaMundos .mundoFila .info { font-size: 14px; min-width: 0; line-height: 1.15; } #listaMundos .mundoFila .info small { display: block; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  #listaMundos .mundoFila .info .fecha { font-size: 11px; color: #ffd23a; font-weight: 700; white-space: nowrap; }
  #listaMundos .mundoFila .info .fecha::before { content: ' · '; color: #aab4e0; }
  #listaMundos .mundoFila .btn { padding: 4px 10px; font-size: 13px; }
  #listaMundos .vacio { padding: 18px 10px; text-align: center; font-weight: 700; color: #dfe6ff; }
  #mundosPag, #mapasPag { display: flex; align-items: center; justify-content: center; gap: 10px; }
  #mundosPag[hidden], #mapasPag[hidden] { display: none; }
  .pg { width: 40px; height: 30px; display: flex; align-items: center; justify-content: center; background: linear-gradient(#ffe14a, #f5a62a); border: 3px solid #0d153d; border-radius: 10px; box-shadow: 0 3px 0 #0d153d; cursor: pointer; box-sizing: border-box; }
  .pg:active { transform: translateY(2px); box-shadow: 0 1px 0 #0d153d; }
  .pg.off { opacity: .35; pointer-events: none; }
  #mundosPag { padding-top: 4px; }
  #mundosPag .num { font-weight: 800; color: #fff; text-shadow: 0 2px 0 #0d153d; min-width: 64px; text-align: center; font-size: 15px; }
  #mapasPag .num { font-weight: 800; color: #1b2a6b; min-width: 54px; text-align: center; font-size: 14px; }
  #mapasPag { gap: 6px; margin-inline-end: 8px; } #mapasPag .pg { width: 36px; height: 28px; }

  /* Mapas: sin el título "Mapas" (las pestañas van arriba), 9 por página (3 x 3) con flechas */
  #mapasCapa .ventana { height: min(92vh, 640px); }
  #mapasCapa .vCab > .tab[data-i="mapasTit"] { display: none; }
  #mapasCapa .vCab #mapasTabs { padding: 0; align-items: center; }
  #mapasCapa .vCab #mapasTabs[hidden] { display: none; }
  #mapasGrilla { flex: 1; min-height: 0; overflow: hidden !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; grid-template-rows: repeat(3, minmax(0, 1fr)); gap: 8px !important; padding: 8px 12px 12px !important; }
  #mapasGrilla[hidden] { display: none; }
  #mapasMsg { padding: 4px 12px !important; font-size: 13px; }
  .mapaT.oculta { display: none !important; }
  .mapaT { position: relative; min-height: 0; }
  .mapaT img { position: absolute; inset: 0; width: 100%; height: 100% !important; aspect-ratio: auto !important; object-fit: cover; }
  .mapaT .n, .mapaT .a { position: absolute; left: 0; right: 0; padding-left: 8px !important; padding-right: 8px !important; color: #fff !important; text-shadow: 0 1px 2px rgba(0,0,0,.9); pointer-events: none; z-index: 3; }
  .mapaT .n { bottom: 16px; font-size: 14px !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mapaT .a { bottom: 0; padding-bottom: 4px !important; font-size: 10.5px !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; opacity: .92; }
  .mapaT::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 65%; background: linear-gradient(transparent, rgba(8,14,40,.9)); pointer-events: none; z-index: 1; }
  .mapaT > *:not(img):not(.n):not(.a) { z-index: 2; }
  @media (max-aspect-ratio: 1/1) { #mapasGrilla { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; grid-template-rows: none; grid-auto-rows: 110px; overflow: auto !important; } }
`; document.head.appendChild(st); }

// armar el cuerpo de dos columnas moviendo los botones que ya existen (conservan lo que hacen)
{ const m = $('mundos'), tit = m.querySelector('.titulo');
  const cuerpo = document.createElement('div'); cuerpo.id = 'mundosCuerpo';
  const izq = document.createElement('div'); izq.id = 'mundosIzq';
  const der = document.createElement('div'); der.id = 'mundosDer';
  const pag = document.createElement('div'); pag.id = 'mundosPag'; pag.hidden = true;
  pag.innerHTML = `<div class="pg" data-pag="-1">${FLECHA(-1)}</div><div class="num"></div><div class="pg" data-pag="1">${FLECHA(1)}</div>`;
  const resto = [...m.children].filter(x => x !== tit && x.id !== 'listaMundos');
  izq.append($('listaMundos'), pag); der.append(...resto);
  cuerpo.append(izq, der); m.append(cuerpo);
}

let mundosPagina = 0;
const fechaCorta = t => { try { return new Date(t).toLocaleDateString(LANG === 'ar' ? 'ar' : LANG, { day: 'numeric', month: 'short', year: 'numeric' }) + ' · ' + new Date(t).toLocaleTimeString(LANG === 'ar' ? 'ar' : LANG, { hour: '2-digit', minute: '2-digit' }); } catch (e) { return new Date(t).toLocaleDateString(); } };
function paginarMundos() {
  const lista = $('listaMundos'), filas = [...lista.querySelectorAll('.mundoFila')], pag = $('mundosPag');
  if ($('mundos').hidden) return;
  if (!filas.length) { if (!lista.querySelector('.vacio')) lista.innerHTML = `<div class="vacio">${TR('nadaMundos')}</div>`; pag.hidden = true; return; }
  // columnas: 2 si hay ancho, 1 si no
  const cols = 1;
  filas.forEach(f => f.classList.remove('oculta'));
  // cuántas filas entran (se mide con la primera)
  const alto = $('mundosIzq').clientHeight - 38 - 10 + 4, h = filas[0].getBoundingClientRect().height + 4;
  const porPag = Math.min(5, Math.max(1, Math.floor(Math.max(1, alto) / Math.max(30, h))));
  const total = Math.max(1, Math.ceil(filas.length / porPag));
  mundosPagina = Math.min(Math.max(0, mundosPagina), total - 1);
  filas.forEach((f, i) => f.classList.toggle('oculta', Math.floor(i / porPag) !== mundosPagina));
  pag.hidden = total <= 1;
  pag.querySelector('.num').textContent = TR('pagina', { a: mundosPagina + 1, b: total });
  pag.querySelector('[data-pag="-1"]').classList.toggle('off', mundosPagina === 0);
  pag.querySelector('[data-pag="1"]').classList.toggle('off', mundosPagina >= total - 1);
}
{ const p0 = pintarMundos; pintarMundos = function () {
    const r = p0.apply(this, arguments);
    // fecha de la última vez que se jugó
    const l = leerLista();
    for (const fila of document.querySelectorAll('#listaMundos .mundoFila')) {
      const b = fila.querySelector('[data-entrar]'); const w = b && l.find(x => x.id === b.dataset.entrar);
      const info = fila.querySelector('.info'); if (!w || !info || info.querySelector('.fecha')) continue;
      const sm = info.querySelector('small'); if (sm) sm.innerHTML = sm.innerHTML.replace(/ · [^·<]*$/, '');
      (sm || info).insertAdjacentHTML('beforeend', `<span class="fecha">${TR('jugado', { f: fechaCorta(w.fecha || w.creado || Date.now()) })}</span>`);
    }
    requestAnimationFrame(paginarMundos);
    return r; }; }
$('mundosPag').addEventListener('click', e => { const d = e.target.closest('[data-pag]'); if (!d) return; mundosPagina += +d.dataset.pag; paginarMundos(); try { son(520, .05, 'triangle', .08); } catch (er) {} });
new MutationObserver(() => { if (!$('mundos').hidden) { mundosPagina = 0; requestAnimationFrame(paginarMundos); } }).observe($('mundos'), { attributes: true, attributeFilter: ['hidden'] });
addEventListener('resize', () => requestAnimationFrame(paginarMundos));
if (window.ResizeObserver) { let rw = 0, rh = 0; new ResizeObserver(en => { const r = en[0].contentRect; if (Math.abs(r.width - rw) > 2 || Math.abs(r.height - rh) > 2) { rw = r.width; rh = r.height; requestAnimationFrame(paginarMundos); } }).observe($('mundosIzq')); }
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => requestAnimationFrame(paginarMundos));
// al borrar un mundo se vuelve a pintar; si la página quedó vacía, paginarMundos la corrige
window.paginarMundos = paginarMundos;

// ═════════ MAPAS: pestañas arriba (sin el título) y 9 por página ═════════
let mapasPagina = 0;
{ const cab = $('mapasCapa').querySelector('.vCab'), tit = cab.querySelector('[data-i="mapasTit"]');
  cab.insertBefore($('mapasTabs'), tit);
  const pag = document.createElement('div'); pag.id = 'mapasPag'; pag.hidden = true;
  pag.innerHTML = `<div class="pg" data-pag="-1">${FLECHA(-1)}</div><div class="num"></div><div class="pg" data-pag="1">${FLECHA(1)}</div>`;
  cab.insertBefore(pag, $('mapasCerrar'));
  pag.addEventListener('click', e => { const d = e.target.closest('[data-pag]'); if (!d) return; mapasPagina += +d.dataset.pag; paginarMapas(); try { son(520, .05, 'triangle', .08); } catch (er) {} });
}
function paginarMapas() {
  const g = $('mapasGrilla'), pag = $('mapasPag'), cs = [...g.querySelectorAll('.mapaT')];
  const vert = matchMedia('(max-aspect-ratio: 1/1)').matches, por = vert ? 1e9 : 9;
  const total = Math.max(1, Math.ceil(cs.length / por));
  mapasPagina = Math.min(Math.max(0, mapasPagina), total - 1);
  cs.forEach((c, i) => c.classList.toggle('oculta', Math.floor(i / por) !== mapasPagina));
  pag.hidden = total <= 1 || g.hidden;
  pag.querySelector('.num').textContent = TR('pagina', { a: mapasPagina + 1, b: total });
  pag.querySelector('[data-pag="-1"]').classList.toggle('off', mapasPagina === 0);
  pag.querySelector('[data-pag="1"]').classList.toggle('off', mapasPagina >= total - 1);
}
{ const c0 = cargarLista; cargarLista = async function () { mapasPagina = 0; const r = await c0.apply(this, arguments); paginarMapas(); return r; }; }
new MutationObserver(() => paginarMapas()).observe($('mapasGrilla'), { childList: true, attributes: true, attributeFilter: ['hidden'] });
addEventListener('resize', () => requestAnimationFrame(paginarMapas));
window.paginarMapas = paginarMapas;
