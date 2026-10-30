'use strict';
// ═════════ INICIO: botones como los cuadros de Mis mundos (azul vidrio con borde), Jugar y Tienda en amarillo, sin marco alrededor ═════════
{ const I = {
    bJugarI: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12-7.5z"/></svg>',
    bPersonajeHome: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="8" y="2.5" width="8" height="8" rx="1.5"/><path d="M6 12h12v6h-3v4H9v-4H6z"/></svg>',
    bTiendaHome: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 8h16l-1.4 12.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8z"/><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    bModsHome: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 3h4v3a2 2 0 1 0 0 0h5v5h-2.5a2 2 0 1 0 0 4H19v6H5v-6h2.5a2 2 0 1 0 0-4H5V6h5z"/></svg>',
    bAjustes1: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.3 2h3.4l.5 2.6 2 .9 2.2-1.5 2.4 2.4-1.5 2.2.9 2 2.6.5v3.4l-2.6.5-.9 2 1.5 2.2-2.4 2.4-2.2-1.5-2 .9-.5 2.6h-3.4l-.5-2.6-2-.9-2.2 1.5-2.4-2.4 1.5-2.2-.9-2L2 13.7v-3.4l2.6-.5.9-2L4 5.6 6.4 3.2l2.2 1.5 2-.9zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg>',
    bLogrosHome: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 3h10v3h3v2a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V6h3zm-1 5a2 2 0 0 0 1 1.7V8zm12 0v1.7A2 2 0 0 0 18 8z"/></svg>',
    bRecords: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="12" width="5" height="9" rx="1"/><rect x="9.5" y="4" width="5" height="17" rx="1"/><rect x="16" y="8" width="5" height="13" rx="1"/></svg>',
    bCreditos: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg>' };
  const st = document.createElement('style'); st.textContent = `
  #inicio .btn { display: flex !important; align-items: center; justify-content: center; gap: 8px; border: none !important; border-radius: 10px !important; text-transform: uppercase; letter-spacing: .5px !important;
    color: #fff !important; text-shadow: 0 2px 0 rgba(0,10,40,.6) !important; filter: none !important;
    background: linear-gradient(180deg, rgba(26,52,104,.72), rgba(16,34,72,.76)) !important; box-shadow: inset 0 0 0 2px #3a6fc4, 0 4px 12px rgba(0,0,0,.35) !important;
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
  #inicio .btn svg.azI { width: 1.05em; height: 1.05em; flex: none; color: #7fd0ff; filter: drop-shadow(0 0 6px rgba(127,208,255,.45)); }
  #inicio #bJugar, #inicio #bTiendaHome { color: #3a1a08 !important; text-shadow: 0 1px 0 rgba(255,255,255,.45) !important;
    background: linear-gradient(180deg, #ffe46a 0%, #ffc53a 50%, #f39a1c 100%) !important; box-shadow: inset 0 2px 0 rgba(255,250,210,.8), inset 0 -3px 0 rgba(150,70,0,.35), 0 0 0 2px #ffb92e, 0 6px 16px rgba(255,170,30,.35) !important; }
  #inicio #bJugar svg.azI, #inicio #bTiendaHome svg.azI { color: #3a1a08; filter: none; }
  #inicio .btn:active { transform: translateY(2px); }
`; document.head.appendChild(st);
  const poner = () => { for (const [id, svg] of Object.entries(I)) { const b = $(id === 'bJugarI' ? 'bJugar' : id); if (b && !b.querySelector('svg.azI')) b.insertAdjacentHTML('afterbegin', svg.replace('<svg', '<svg class="azI"')); } };
  poner(); setTimeout(poner, 400); setTimeout(poner, 2000);
  { let p = 0; const ini = $('inicio'); if (ini) new MutationObserver(() => { if (p) return; p = 1; requestAnimationFrame(() => { p = 0; poner(); }); }).observe(ini, { childList: true, subtree: true }); }
}
