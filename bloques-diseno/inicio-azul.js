'use strict';
// ═════════ INICIO: los botones azules con el estilo de Mis mundos (azul vidrio con borde celeste) ═════════
// Jugar y Tienda quedan amarillos como antes. Misma letra, sin íconos, sin marco alrededor.
{ const st = document.createElement('style'); st.textContent = `
  #inicio .btn:not(#bJugar):not(#bTiendaHome) { border: none !important; border-radius: 10px !important; color: #fff !important; text-shadow: 0 2px 0 rgba(0,10,40,.6) !important; filter: none !important;
    background: linear-gradient(180deg, rgba(26,52,104,.72), rgba(16,34,72,.76)) !important; box-shadow: inset 0 0 0 2px #3a6fc4, 0 4px 12px rgba(0,0,0,.35) !important;
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
`; document.head.appendChild(st); }
