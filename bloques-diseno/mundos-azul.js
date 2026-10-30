'use strict';
// ═════════ MIS MUNDOS al estilo de la captura: panel azul, mosaicos, foto de cada mundo, Entrar ═════════
// Volver va al lado de Copia de seguridad, el título queda en amarillo y Mapas en violeta.
Object.assign(TX.es, { azGestiona: 'Gestioná tus aventuras', azTusMundos: 'Tus mundos', azMundos: n => n + (n === 1 ? ' mundo' : ' mundos'), azEntrar: 'Entrar', azBorrar: 'Borrar', azSeguro: '¿Seguro?', azOnlineSub: 'Multijugador', azMapasSub: 'Descargar y explorar', azImportar: 'Importar mundo', azImportarSub: 'Mapas y mods', azCopias: 'Copias de seguridad', azCopiasSub: 'Protegé tus partidas', azElige: 'Elegí tu aventura', azPausaSub: 'Tu mundo te espera' });
Object.assign(TX.en, { azGestiona: 'Manage your adventures', azTusMundos: 'Your worlds', azMundos: n => n + (n === 1 ? ' world' : ' worlds'), azEntrar: 'Play', azBorrar: 'Delete', azSeguro: 'Sure?', azOnlineSub: 'Multiplayer', azMapasSub: 'Download and explore', azImportar: 'Import world', azImportarSub: 'Maps and mods', azCopias: 'Backups', azCopiasSub: 'Protect your saves', azElige: 'Choose your adventure', azPausaSub: 'Your world awaits' });
Object.assign(TX.pt, { azGestiona: 'Gerencie suas aventuras', azTusMundos: 'Seus mundos', azMundos: n => n + (n === 1 ? ' mundo' : ' mundos'), azEntrar: 'Entrar', azBorrar: 'Apagar', azSeguro: 'Certeza?', azOnlineSub: 'Multijogador', azMapasSub: 'Baixar e explorar', azImportar: 'Importar mundo', azImportarSub: 'Mapas e mods', azCopias: 'Cópias de segurança', azCopiasSub: 'Proteja seus jogos', azElige: 'Escolha sua aventura', azPausaSub: 'Seu mundo te espera' });
const azT = (k, v) => { const s = (TX[LANG] && TX[LANG][k]) ?? TX.es[k]; return typeof s === 'function' ? s(v) : s; };

// íconos propios (trazos simples)
const AZI = {
  mas: '<svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" fill="none"/></svg>',
  mundo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9c-3-3-4-6-4-9s1-6 4-9z"/></svg>',
  mapa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 6l6-2v14l-6 2zM10 4l5 2v14l-5-2zM16 6l5-2v14l-5 2z"/></svg>',
  carpeta: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  escudo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5z"/><path d="M9 12l2 2 4-4" stroke="#0a1a38" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12-7.5z"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm-2 5h18" /><rect x="7" y="2.5" width="2" height="4" rx="1"/><rect x="15" y="2.5" width="2" height="4" rx="1"/></svg>',
  reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg>',
  volver: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 5L3 11l7 6v-4c5 0 8 1.5 11 6-1-6-4-10-11-10z"/></svg>',
  puntos: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2.2"/><circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="19" r="2.2"/></svg>',
  cubo: '<svg viewBox="0 0 24 24"><path d="M12 2l9 5-9 5-9-5z" fill="#7fd0ff"/><path d="M3 7l9 5v10l-9-5z" fill="#2f8cff"/><path d="M21 7l-9 5v10l9-5z" fill="#1659c8"/></svg>',
  hoja: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zm0 0l8-8" stroke="#0b3a1a" stroke-width="1.6"/></svg>' };

{ const st = document.createElement('style'); st.textContent = `
  :root { --azP: linear-gradient(180deg, rgba(14,32,70,.62), rgba(8,20,46,.64)); --azBtn: linear-gradient(180deg, #3d9bff, #1667e6); --azTile: linear-gradient(180deg, rgba(26,52,104,.6), rgba(16,34,72,.62)); }
  #mundos.azListo { justify-content: center; }
  #mundosCuerpo.azPanel { position: relative; width: min(1000px, calc(90vw / var(--uM, 1))) !important; display: flex; flex-direction: column; gap: 0 !important; padding: 16px 20px 12px;
    background: var(--azP); border-radius: 18px; box-shadow: inset 0 0 0 2px #2f6fd6, 0 0 0 1px rgba(110,180,255,.25), 0 0 24px rgba(40,120,255,.25), 0 20px 50px rgba(0,0,0,.55); backdrop-filter: blur(10px) saturate(1.15); -webkit-backdrop-filter: blur(10px) saturate(1.15); }
  @media (min-width: 900px) and (min-height: 560px) { #mundosCuerpo.azPanel { zoom: 1 !important; width: min(1000px, 92vw) !important; } }
  #mundosCuerpo > .titulo { order: -3; margin: 0 !important; text-align: center; font-size: clamp(30px, 4.6vw, 52px) !important; line-height: 1.05; }
  #mundosCuerpo > .azSub { order: -2; } #mundosDer.azTiles { order: -1 !important; } #mundosDer .filaBtn { display: contents; }
  .azSub { font-weight: 800; font-size: clamp(11px, 1.4vw, 15px); letter-spacing: 5px; text-transform: uppercase; color: #9fc4ff; text-align: center; margin: 2px 0 12px; }
  #mundosDer.azTiles { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 10px !important; margin: 0 0 12px; }
  #mundos .azTiles .btn { width: auto !important; max-width: none !important; margin: 0 !important; min-height: 72px; display: flex !important; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 8px 6px !important;
    font-size: clamp(12px, 1.3vw, 16px) !important; line-height: 1.1; text-transform: uppercase; color: #fff !important; border: none !important; border-radius: 10px !important;
    background: var(--azTile) !important; box-shadow: inset 0 0 0 2px #3a6fc4, 0 4px 10px rgba(0,0,0,.3) !important; text-shadow: 0 2px 0 rgba(0,10,40,.6) !important; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
  #mundos .azTiles .btn small { display: block; margin: 0 !important; font-size: clamp(9px, .95vw, 12px) !important; color: #9fb8e0 !important; text-transform: none; font-weight: 700; }
  #mundos .azTiles .btn svg { width: 26px; height: 26px; color: #7fd0ff; margin-bottom: 2px; filter: drop-shadow(0 0 8px rgba(127,208,255,.45)); flex: none; }
  #mundos .azTiles #bNuevo { background: var(--azBtn) !important; box-shadow: inset 0 2px 0 rgba(200,230,255,.55), inset 0 -3px 0 rgba(0,20,80,.35), 0 0 0 2px #2a7df0, 0 6px 16px rgba(30,110,255,.35) !important; font-size: clamp(14px, 1.6vw, 20px) !important; }
  #mundos .azTiles #bNuevo svg { color: #fff; }
  #mundos .azTiles #bMapas { background: linear-gradient(180deg, rgba(150,90,255,.85), rgba(100,50,200,.88)) !important; box-shadow: inset 0 0 0 2px #b48cff, 0 4px 12px rgba(120,60,230,.35) !important; }
  #mundos .azTiles #bMapas small { color: #e6d8ff !important; } #mundos .azTiles #bMapas svg { color: #fff; }
  .azSec { display: flex; align-items: center; gap: 10px; font-weight: 900; font-size: clamp(15px, 1.8vw, 22px); color: #fff; text-transform: uppercase; margin: 0 0 8px; }
  .azSec svg { width: 22px; height: 22px; } .azSec::after { content: ''; flex: 1; height: 2px; background: linear-gradient(90deg, #2f6fd6, rgba(47,111,214,0)); }
  #mundos #listaMundos { background: none !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; padding: 2px 0 !important; }
  #listaMundos .vacio { color: #cfe3ff !important; }
  #listaMundos .mundoFila.azFila { display: flex; align-items: center; border: none !important; padding: 8px 10px !important; gap: 14px !important; margin-bottom: 8px; border-radius: 14px; background: var(--azTile) !important; box-shadow: inset 0 0 0 2px #2a4f94; }
  #listaMundos .azFoto, #listaMundos .mundoFila.oculta { display: none !important; }
  .azMini { width: clamp(100px, 13vw, 160px); aspect-ratio: 16 / 9; border-radius: 10px; flex: none; position: relative; overflow: hidden; box-shadow: inset 0 0 0 2px rgba(127,208,255,.25); }
  .azMini.foto { background-size: cover; background-position: center; }
  .azMini.sup { background: linear-gradient(180deg, #7ec8ff 0%, #bfe6ff 45%, #3fae4a 46%, #2a7a32 70%, #7a5232 71%, #5a3a22 100%); }
  .azMini.cre { background: linear-gradient(180deg, #8fd0ff 0%, #d6efff 50%, #e8d38a 51%, #c9a85a 70%, #3fae4a 71%, #2a7a32 100%); }
  .azMini.otr { background: linear-gradient(180deg, #2a1a4a 0%, #6a3aa0 50%, #3a3a4a 51%, #1a1a24 100%); }
  .azMini i { position: absolute; left: 50%; top: 52%; width: 44%; aspect-ratio: 1; transform: translate(-50%, -50%); background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; filter: drop-shadow(0 6px 4px rgba(0,0,0,.45)); }
  .azDatos { flex: 1; min-width: 0; } .azDatos .nm { font-weight: 900; font-size: clamp(16px, 2vw, 26px); color: #fff; text-shadow: 0 2px 0 #061433; }
  .azBadge { display: inline-flex; align-items: center; gap: 5px; margin: 3px 6px 3px 0; padding: 2px 9px 2px 6px; border-radius: 6px; font-weight: 800; font-size: 12px; color: #fff; }
  .azBadge svg { width: 14px; height: 14px; } .azBadge.sup { background: #1f9a4a; } .azBadge.cre { background: #2f7fe0; } .azBadge.otr { background: #8a4ad0; } .azBadge.ext { background: #c8323e; } .azBadge.gris { background: #3a4a6a; }
  .azMeta { display: flex; gap: 16px; flex-wrap: wrap; font-weight: 800; font-size: clamp(11px, 1.2vw, 15px); color: #cfe3ff; } .azMeta span { display: inline-flex; align-items: center; gap: 6px; } .azMeta svg { width: 16px; height: 16px; color: #3d9bff; }
  #listaMundos .azEntrar { display: flex !important; align-items: center; gap: 10px; width: auto !important; margin: 0 !important; padding: 10px clamp(16px, 2.6vw, 40px) !important; font-size: clamp(14px, 1.7vw, 20px) !important; text-transform: uppercase; color: #fff !important; border: none !important; border-radius: 10px !important;
    background: var(--azBtn) !important; box-shadow: inset 0 2px 0 rgba(200,230,255,.55), inset 0 -3px 0 rgba(0,20,80,.35), 0 0 0 2px #2a7df0, 0 6px 16px rgba(30,110,255,.35) !important; }
  .azEntrar svg { width: 20px; height: 20px; }
  .azMas { position: relative; width: 44px; height: 48px; border-radius: 10px; background: var(--azTile); box-shadow: inset 0 0 0 2px #3a6fc4; display: flex; align-items: center; justify-content: center; color: #cfe3ff; cursor: pointer; flex: none; }
  .azMas svg { width: 22px; height: 22px; }
  .azMenu { position: absolute; right: 0; top: calc(100% + 6px); z-index: 5; display: none; }
  .azMas.abierto .azMenu { display: block; } .azMenu .btn { white-space: nowrap; padding: 8px 16px !important; width: auto !important; margin: 0 !important; }
  .azPie { display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-top: 6px; font-weight: 800; font-size: 14px; color: #cfe3ff; } .azPie svg { width: 18px; height: 18px; }
  @media (max-height: 560px) {
    #mundosCuerpo.azPanel { padding: 8px 12px 6px; } #mundos .azTiles .btn { min-height: 54px; } #mundos .azTiles .btn small { display: none; }
  }
  @media (max-height: 500px) {
    #mundosCuerpo.azPanel { width: min(1000px, calc(84vw / var(--uM, 1))) !important; padding: 6px 12px 4px; border-radius: 16px; }
    #mundosCuerpo > .titulo { font-size: 24px !important; } .azSub { display: none; }
    #mundosDer.azTiles { gap: 5px !important; margin: 4px 0 6px !important; }
    #mundos .azTiles .btn { min-height: 0 !important; height: 32px; flex-direction: row !important; gap: 6px; font-size: 11px !important; padding: 2px 6px !important; line-height: 1.05 !important; }
    #mundos .azTiles #bNuevo { font-size: 12px !important; } #mundos .azTiles .btn svg { width: 15px !important; height: 15px !important; margin: 0; }
    .azSec { font-size: 13px; margin: 0 0 4px; } .azSec svg { width: 15px; height: 15px; }
    #listaMundos .mundoFila.azFila { padding: 4px 8px !important; gap: 10px !important; margin-bottom: 5px; } .azMini { width: 74px; }
    .azDatos .nm { font-size: 15px; } .azBadge { font-size: 10px; margin: 1px 5px 1px 0; } .azMeta { font-size: 10px; gap: 10px; } .azMeta svg { width: 12px; height: 12px; }
    #listaMundos .azEntrar { padding: 6px 14px !important; font-size: 12px !important; } .azMas { width: 34px; height: 34px; } .azPie { margin-top: 0; font-size: 11px; }
  }
`; document.head.appendChild(st); }

const azCubos = '<span class="azCubos"><i></i><i></i></span>';
function azMundos() {
  const cap = $('mundos'), cuerpo = $('mundosCuerpo'), der = $('mundosDer'), izq = $('mundosIzq');
  if (!cap || !cuerpo || !der || cap.classList.contains('azListo')) return;
  cap.classList.add('azListo'); cuerpo.classList.add('azPanel');
  const tit = cap.querySelector(':scope > .titulo');
  const sub = document.createElement('div'); sub.className = 'azSub'; sub.textContent = azT('azGestiona');
  const sec = document.createElement('div'); sec.className = 'azSec'; sec.innerHTML = AZI.cubo + '<span>' + azT('azTusMundos') + '</span>';
  const pie = document.createElement('div'); pie.className = 'azPie';
  if (tit) { cuerpo.insertBefore(tit, cuerpo.firstChild); tit.after(sub); }
  der.classList.add('azTiles'); izq.before(sec); izq.after(pie);
  const icono = b => b.id === 'bNuevo' ? AZI.mas : /línea|online|linha/i.test(b.textContent) ? AZI.mundo : b.id === 'bMapas' ? AZI.mapa : b.id === 'bCargarArchivo' ? AZI.carpeta : /copia|backup|cópia/i.test(b.textContent) ? AZI.escudo : AZI.cubo;
  for (const b of [...der.querySelectorAll('.btn')]) {
    if (b.id === 'bVolverInicio') { if (!b.querySelector('svg')) b.insertAdjacentHTML('afterbegin', AZI.volver); continue; }
    if (!b.querySelector('svg')) b.insertAdjacentHTML('afterbegin', icono(b));
  }
  const nu = $('bNuevo'); if (nu) der.insertBefore(nu, der.firstChild);
  const vo = $('bVolverInicio'); if (vo) der.appendChild(vo);
}
const azFecha = f => { try { return new Date(f).toLocaleDateString(LANG, { day: 'numeric', month: 'short', year: 'numeric' }) + ' · ' + new Date(f).toLocaleTimeString(LANG, { hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } };
{ const p0 = pintarMundos; pintarMundos = function () {
    const r = p0.apply(this, arguments); azMundos();
    const l = leerLista(), cont = $('listaMundos'); if (!cont) return r;
    // se arma cada fila de nuevo, pero se mantienen las marcas que agregan otros módulos (Extremo, Cacería, etc.)
    for (const fila of [...cont.querySelectorAll('.mundoFila')]) {
      const en = fila.querySelector('[data-entrar]'); const m = en && l.find(x => x.id === en.dataset.entrar);
      if (!m) continue;
      const marcas = [...fila.querySelectorAll('.marcaMundo, .czBadge, .gzBadge')].map(x => `<span class="azBadge ${x.classList.contains('ext') ? 'ext' : 'gris'}">${x.textContent}</span>`).join('');
      const tipo = m.modo === 'creativo' ? 'cre' : (m.modo === 'aventura' || m.tipo) ? 'otr' : 'sup';
      const nombre = fila.querySelector('.info').childNodes[0].textContent;
      const modoTxt = m.modo === 'creativo' ? TR('creativo') : m.modo === 'aventura' ? TR('aventuraM') : TR('supervivencia');
      const ico = tipo === 'cre' ? B.COFRE : tipo === 'sup' ? B.PASTO : (B.PORTAL || B.OBSIDIANA || B.PIEDRA);
      fila.classList.add('azFila');
      fila.innerHTML = `${(() => { let u = null; try { u = localStorage.getItem('voxFoto_' + m.id); } catch (e) {} return u ? `<div class="azMini foto" style="background-image:url(&quot;${u}&quot;)"></div>` : `<div class="azMini ${tipo}"><i style="background-image:url(${icono(ico)})"></i></div>`; })()}
        <div class="azDatos"><div class="nm">${esc(nombre)}</div><span class="azBadge ${tipo}">${tipo === 'cre' ? AZI.cubo : AZI.hoja}${esc(modoTxt)}</span>${marcas}
          <div class="azMeta"><span>${AZI.cal}${azFecha(m.fecha)}</span>${m.modo !== 'creativo' ? `<span>${AZI.reloj}${TR('diaMin', { n: m.dia || 1 })}</span>` : ''}</div></div>
        <div class="btn azEntrar" data-entrar="${m.id}">${AZI.play}${azT('azEntrar')}</div>
        <div class="azMas">${AZI.puntos}<div class="azMenu"><div class="btn rojo" data-borrar="${m.id}">${azT('azBorrar')}</div></div></div>`;
    }
    const n = l.length, pie = document.querySelector('#mundos .azPie'); if (pie) pie.innerHTML = n ? AZI.cubo + azT('azMundos', n) : '';
    return r; }; }
document.addEventListener('click', e => { const m = e.target.closest('.azMas'); document.querySelectorAll('.azMas.abierto').forEach(x => { if (x !== m) x.classList.remove('abierto'); }); if (m && !e.target.closest('.azMenu')) m.classList.toggle('abierto'); });
if (typeof pintarBotonCopia === 'function') { const _pbc = pintarBotonCopia; pintarBotonCopia = function () { _pbc(); const b = $('bCopia'); if (b && !b.querySelector('svg')) b.insertAdjacentHTML('afterbegin', AZI.escudo); }; }
// la paginación original no cuenta el subtítulo, la sección y el pie: se recorta hasta que el panel entre en la pantalla
if (typeof paginarMundos === 'function') { const _pm = paginarMundos; paginarMundos = function () {
  _pm(); const M = $('mundos'), C = $('mundosCuerpo'), pag = $('mundosPag');
  if (!M || M.hidden || !C || !C.classList.contains('azPanel')) return;
  const filas = [...document.querySelectorAll('#listaMundos .mundoFila')]; if (!filas.length) return;
  const cs = getComputedStyle(M), lim = M.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  let por = filas.filter(f => !f.classList.contains('oculta')).length || 1;
  const aplicar = () => { const total = Math.max(1, Math.ceil(filas.length / por)); mundosPagina = Math.min(Math.max(0, mundosPagina), total - 1);
    filas.forEach((f, i) => f.classList.toggle('oculta', Math.floor(i / por) !== mundosPagina)); pag.hidden = total <= 1;
    pag.querySelector('.num').textContent = TR('pagina', { a: mundosPagina + 1, b: total });
    pag.querySelector('[data-pag="-1"]').classList.toggle('off', mundosPagina === 0); pag.querySelector('[data-pag="1"]').classList.toggle('off', mundosPagina >= total - 1); };
  const pagIni = Math.floor(filas.findIndex(f => !f.classList.contains('oculta')) / por) * por;
  while (por > 1 && C.getBoundingClientRect().height > lim) { por--; mundosPagina = Math.floor(pagIni / por); aplicar(); }
}; try { paginarMundos(); } catch (e) {} }
setTimeout(() => { try { azMundos(); pintarMundos(); pintarBotonCopia && pintarBotonCopia(); } catch (e) {} }, 300);
// los textos de los botones se vuelven a escribir al cambiar de pantalla: se reponen los íconos cada vez
function azIconos() { const der = $('mundosDer'); if (!der) return;
  const icono = b => b.id === 'bNuevo' ? AZI.mas : b.id === 'bVolverInicio' ? AZI.volver : /línea|online|linha/i.test(b.textContent) ? AZI.mundo : b.id === 'bMapas' ? AZI.mapa : b.id === 'bCargarArchivo' ? AZI.carpeta : /copia|backup|cópia/i.test(b.textContent) ? AZI.escudo : AZI.cubo;
  for (const b of der.querySelectorAll('.btn')) if (!b.querySelector('svg')) b.insertAdjacentHTML('afterbegin', icono(b)); }
{ const p1 = pintarMundos; pintarMundos = function () { const r = p1.apply(this, arguments); azIconos(); return r; }; }
{ let p = 0; new MutationObserver(() => { if (p) return; p = 1; requestAnimationFrame(() => { p = 0; azIconos(); }); }).observe(document.getElementById('mundos'), { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] }); }
