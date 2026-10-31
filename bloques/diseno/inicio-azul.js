'use strict';
// ═════════ INICIO: botones lisos como los de la sección Personaje ═════════
// Color pleno sin degradé ni brillo, borde azul oscuro fino, esquinas redondeadas, letra blanca en negrita.
// Los azules en azul liso; Jugar y Tienda en amarillo liso. Misma letra, sin íconos, sin marco alrededor.
{ const st = document.createElement('style'); st.textContent = `
  #inicio .btn { border: 3px solid #0d153d !important; border-radius: 12px !important; filter: none !important; text-shadow: 0 2px 0 rgba(13,21,61,.55) !important;
    color: #fff !important; background: #3a86e8 !important; box-shadow: none !important; }
  #inicio #bJugar, #inicio #bTiendaHome { background: #ffc531 !important; color: #3a1a08 !important; text-shadow: none !important; }
  #inicio .btn:active { transform: translateY(2px); filter: brightness(.92) !important; }
`; document.head.appendChild(st); }
