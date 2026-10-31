'use strict';
// ═════════ Botones lisos (como los de Personaje y el inicio) también en Mis mundos y Mundo nuevo ═════════
// Solo cambian los botones: color pleno, borde azul oscuro, sin degradé ni brillo. Paneles y tarjetas quedan igual.
{ const AZ = '#3a86e8', BORDE = '3px solid #0d153d';
  const st = document.createElement('style'); st.textContent = `
  /* Mis mundos: cuadros de arriba, Entrar, ⋮ y flechas */
  #mundos .azTiles .btn, #mundos #listaMundos .azEntrar, #mundos .azMas, #mundos #mundosPag .pg,
  #nuevo #nvPie #bVolverMundos, #nuevo .nvCrear, #nuevo #nvPag .fl {
    background: ${AZ} !important; border: ${BORDE} !important; box-shadow: none !important; filter: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
    color: #fff !important; text-shadow: 0 2px 0 rgba(13,21,61,.55) !important; }
  #mundos .azTiles .btn { border-radius: 12px !important; }
  #mundos .azTiles .btn svg, #nuevo #nvPie #bVolverMundos svg { color: #fff !important; filter: none !important; }
  #mundos .azTiles .btn small { color: #e3efff !important; }
  #mundos .azTiles #bNuevo { background: ${AZ} !important; border: ${BORDE} !important; box-shadow: none !important; }
  #mundos .azTiles #bMapas { background: #8a4ad0 !important; border: ${BORDE} !important; box-shadow: none !important; }
  #mundos .azTiles #bMapas small { color: #f0e6ff !important; }
  #mundos .azMas { color: #fff !important; }
  #mundos .azMenu .btn { background: #c8323e !important; border: ${BORDE} !important; box-shadow: none !important; color: #fff !important; }
  #mundos #mundosPag .pg.off, #nuevo #nvPag .fl.off { opacity: .35; }
  /* Mundo nuevo: opciones de arriba (como los de Personaje: gris azulado y el elegido en azul) */
  #nvOpts .ajOpc > div { background: #7c86ad !important; border: 2px solid #0d153d !important; box-shadow: none !important; color: #fff !important; }
  #nvOpts .ajOpc > div.on { background: ${AZ} !important; border: 2px solid #0d153d !important; box-shadow: none !important; color: #fff !important; }
  #mundos .btn:active, #nuevo .nvCrear:active, #nuevo #nvPag .fl:active { transform: translateY(2px); }
`; document.head.appendChild(st); }

// ═════════ Arreglos: menú de Borrar en Mis mundos y pestañas de Récords ═════════
{ const st = document.createElement('style'); st.textContent = `
  /* el botón Borrar aparece al costado del ⋮, dentro de la misma fila (ya no queda tapado ni cortado) */
  #mundos .azMenu { top: 50% !important; right: calc(100% + 6px) !important; transform: translateY(-50%); z-index: 20 !important; }
  #mundos .mundoFila.azFila:has(.azMas.abierto) { position: relative; z-index: 15; }
  #mundos .azMenu .btn { padding: 8px 18px !important; font-size: 14px !important; }
  /* Récords: pestañas con los mismos botones lisos */
  #recTabs .mb { background: #7c86ad !important; border: 3px solid #0d153d !important; border-radius: 12px !important; color: #fff !important; text-shadow: 0 2px 0 rgba(13,21,61,.55) !important; filter: none !important; box-shadow: none !important; }
  #recTabs .mb.on { background: #3a86e8 !important; }
  @media (max-height: 500px) { #recTabs .mb { padding: 4px 4px !important; font-size: 12px !important; } }
`; document.head.appendChild(st); }
// Mapas (Nuevas / Populares, Subir a Mapas) y las categorías de la bolsa en creativo: mismos botones lisos
{ const st = document.createElement('style'); st.textContent = `
  #mapasTabs .mb, #subirCapa .mb, .catTabs .ct { background: #7c86ad !important; border: 3px solid #0d153d !important; border-radius: 12px !important; color: #fff !important; text-shadow: 0 2px 0 rgba(13,21,61,.55) !important; filter: none !important; box-shadow: none !important; }
  #mapasTabs .mb.on, #subirCapa .mb.on, .catTabs .ct.on { background: #3a86e8 !important; }
  #subirCapa .mb.verde { background: #2fb65a !important; }
`; document.head.appendChild(st); }
