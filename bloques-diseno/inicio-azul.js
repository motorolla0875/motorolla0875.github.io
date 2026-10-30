'use strict';
// ═════════ INICIO: los botones azules iguales a "Entrar" y "Crear mundo nuevo" (azul fuerte, sin transparencia) ═════════
// Jugar y Tienda: el mismo botón, con el centro amarillo. Misma letra, sin íconos, sin marco alrededor.
{ const st = document.createElement('style'); st.textContent = `
  #inicio .btn:not(#bJugar):not(#bTiendaHome) { border: none !important; border-radius: 10px !important; color: #fff !important; text-shadow: 0 2px 0 rgba(0,10,40,.5) !important; filter: none !important;
    background: linear-gradient(180deg, #3d9bff, #1667e6) !important;
    box-shadow: inset 0 2px 0 rgba(200,230,255,.55), inset 0 -3px 0 rgba(0,20,80,.35), 0 0 0 2px #2a7df0, 0 6px 16px rgba(30,110,255,.35) !important; }
  #inicio #bJugar, #inicio #bTiendaHome { border: none !important; border-radius: 10px !important; color: #3a1a08 !important; text-shadow: 0 1px 0 rgba(255,255,255,.45) !important; filter: none !important;
    background: linear-gradient(180deg, #ffe14a, #f5a62a) !important;
    box-shadow: inset 0 2px 0 rgba(255,250,215,.7), inset 0 -3px 0 rgba(120,60,0,.3), 0 0 0 2px #2a7df0, 0 6px 16px rgba(30,110,255,.35) !important; }
`; document.head.appendChild(st); }
