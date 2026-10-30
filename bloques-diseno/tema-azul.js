'use strict';
// ═════════ TEMA "PANEL AZUL" (sobre diseno.js) ═════════
// Paneles azul noche translúcidos con borde celeste, títulos en letra de bloques (Pixelify Sans),
// botón principal azul brillante, mosaicos con ícono, etiquetas de color y botón de volver cuadrado.

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
  @font-face { font-family: 'Pixelify'; font-weight: 700; font-display: swap; src: url(../bloques-diseno/fonts/pixelify-sans-latin-700-normal.woff2) format('woff2'); unicode-range: U+0000-00FF,U+2000-206F; }
  @font-face { font-family: 'Pixelify'; font-weight: 700; font-display: swap; src: url(../bloques-diseno/fonts/pixelify-sans-latin-ext-700-normal.woff2) format('woff2'); unicode-range: U+0100-02BA,U+1E00-1EFF; }
  :root { --azP: linear-gradient(180deg, rgba(14,32,70,.61), rgba(8,20,46,.62)); --azB: #2f6fd6; --azGlow: 0 0 0 1px rgba(110,180,255,.25), 0 0 24px rgba(40,120,255,.25), 0 20px 50px rgba(0,0,0,.55);
    --azBtn: linear-gradient(180deg, #3d9bff, #1667e6); --azTile: linear-gradient(180deg, rgba(26,52,104,.59), rgba(16,34,72,.61)); }
  /* letras */
  .titulo:not(.logoTitulo), .dzCartel span { font-family: 'Pixelify', 'Baloo 2', sans-serif !important; font-weight: 700 !important; letter-spacing: 1px !important;
    background: none !important; -webkit-background-clip: border-box !important; background-clip: border-box !important; color: #fff !important; filter: none !important; text-shadow: 0 3px 0 #061433, 0 0 18px rgba(60,140,255,.35) !important; text-transform: uppercase; }
  .dzInfo h3, .dzIt .n, .dzMats h5 { font-family: 'Baloo 2', sans-serif !important; font-weight: 800 !important; text-transform: uppercase; color: #fff !important; background: none !important; -webkit-background-clip: border-box !important; filter: none !important; text-shadow: 0 2px 0 #061433 !important; }
  /* vidrio: los paneles azules dejan ver el juego detrás, desenfocado */
  .ventana, .mVentana, #mundosCuerpo.azPanel, .dzInfo, .dzGrid, .dzPj, .azFila, .azTiles .btn, #barra, .barraHud, #mision, .boton, .bChico, #pausa .btn:not(#bSeguir):not(#bTienda):not(#bGuardarSalir) { backdrop-filter: blur(10px) saturate(1.15); -webkit-backdrop-filter: blur(10px) saturate(1.15); }
  .azSub { font: 800 clamp(12px, 1.6vw, 17px) 'Baloo 2', sans-serif; letter-spacing: 5px; text-transform: uppercase; color: #9fc4ff; text-align: center; margin: -4px 0 10px; }
  .azCubos { display: inline-flex; gap: 2px; vertical-align: middle; margin: 0 10px; } .azCubos i { width: 9px; height: 9px; background: #2f8cff; box-shadow: 0 0 8px #2f8cff; } .azCubos i:nth-child(2) { background: #7fd0ff; transform: translate(4px, -6px); }
  .lema, .sub, .texto { text-shadow: 0 2px 6px rgba(0,0,0,.8) !important; }
  #inicio .lema { font-family: 'Baloo 2', sans-serif; letter-spacing: 6px; color: #9fc4ff; font-weight: 800; }
  #inicio .btn { font-family: 'Baloo 2', sans-serif !important; font-weight: 800 !important; letter-spacing: 2px; text-transform: uppercase; }
  #inicio > * { zoom: 1 !important; }
  #inicio .logoTitulo .logoSvg { height: clamp(54px, 14vh, 150px) !important; }
  #inicio .lema { font-size: clamp(12px, 2.2vh, 20px) !important; } #inicio .sub { font-size: clamp(12px, 2.1vh, 18px) !important; margin-bottom: 2.6vh !important; }
  #inicio .btn { font-size: clamp(15px, 3.1vh, 26px) !important; margin: .35vh 0 !important; padding: .5vh 18px .5vh 22px !important; }
  #inicio #bJugar { font-size: clamp(20px, 4.2vh, 36px) !important; letter-spacing: 4px; color: #fff !important; padding: 1.3vh 4.2vh 1.3vh 3.4vh !important; margin: 0 0 1.6vh !important; border-radius: 12px; display: flex !important; align-items: center; gap: 1.4vh;
    background: linear-gradient(180deg, #4aa6ff, #1f6fe8 55%, #1559c9) !important; box-shadow: 0 0 0 2px #7cc2ff inset, 0 6px 0 #0b3a8f, 0 0 26px rgba(47,140,255,.55) !important; text-shadow: 0 2px 0 #0b3a8f !important; }
  #inicio #bJugar::before { display: none; } #inicio #bJugar svg { width: 1em; height: 1em; flex: none; }
  #inicio #bJugar:hover, #inicio #bJugar:active { transform: translateY(2px); color: #fff !important; box-shadow: 0 0 0 2px #a6d6ff inset, 0 4px 0 #0b3a8f, 0 0 34px rgba(47,140,255,.75) !important; }
  #inicio .btn:not(#bJugar):hover, #inicio .btn:not(#bJugar):active { color: #7fd0ff !important; } #inicio .btn::before { background: #2f8cff !important; box-shadow: 0 0 10px #2f8cff !important; }
  #inicio { background: linear-gradient(90deg, rgba(4,10,26,.56) 0%, rgba(4,10,26,.55) 30%, rgba(4,10,26,0) 58%), radial-gradient(ellipse at 85% 0%, rgba(255,240,200,.22), rgba(255,240,200,0) 45%) !important; }

  /* botones: azul brillante, esquinas apenas redondeadas */
  .btn { font-family: 'Baloo 2', sans-serif !important; font-weight: 800 !important; text-transform: uppercase; letter-spacing: .5px; clip-path: none !important; border-radius: 10px !important;
    background: var(--azTile) !important; box-shadow: inset 0 0 0 2px #3a6fc4, 0 4px 10px rgba(0,0,0,.35) !important; color: #fff !important; text-shadow: 0 2px 0 rgba(0,10,40,.6) !important; }
  .btn small { color: #9fb8e0 !important; font-weight: 700 !important; text-transform: none; }
  #bJugar, #bSeguir, #bNuevo, .btn.dzPri, #bTiendaHome, #bTiendaPausa, .azEntrar { background: var(--azBtn) !important; box-shadow: inset 0 2px 0 rgba(200,230,255,.55), inset 0 -3px 0 rgba(0,20,80,.35), 0 0 0 2px #2a7df0, 0 6px 16px rgba(30,110,255,.35) !important; }
  #bTiendaHome, #bTiendaPausa { background: linear-gradient(180deg, #ffbf3a, #f08a10) !important; box-shadow: inset 0 2px 0 #ffe7a0, 0 0 0 2px #ffb02a !important; }
  #bSalir, .btn.rojo { background: linear-gradient(180deg, rgba(120,30,40,.9), rgba(80,16,24,.92)) !important; box-shadow: inset 0 0 0 2px #c44a5a !important; color: #ffd9de !important; }
  #bMapas { background: var(--azTile) !important; }
  .btn:hover { filter: brightness(1.15); }

  /* ventanas y paneles */
  .ventana, .mVentana, #listaMundos, .azPanel { background: var(--azP) !important; border-radius: 18px !important; box-shadow: inset 0 0 0 2px var(--azB), var(--azGlow) !important; color: #e8f0ff !important; }
  .ventana::before, .ventana::after { display: none !important; }
  .ventana .vCuerpo, .ventana .vPie, .ventana .vCab { margin: 0 14px !important; }
  .ventana h4, .mVentana h4 { color: #9fc4ff !important; font-family: 'Baloo 2', sans-serif !important; letter-spacing: 2px; text-transform: uppercase; }
  .vCab .tab { font-family: 'Baloo 2', sans-serif !important; font-weight: 800 !important; text-transform: uppercase; border-radius: 10px !important; background: var(--azTile) !important; color: #9fb8e0 !important; box-shadow: inset 0 0 0 2px #2a4f94 !important; }
  .vCab .tab.on { background: var(--azBtn) !important; color: #fff !important; box-shadow: inset 0 2px 0 rgba(200,230,255,.5), 0 0 0 2px #2a7df0 !important; }
  .vCab .cerrar, .dzX { border-radius: 12px !important; background: var(--azTile) !important; box-shadow: inset 0 0 0 2px #3a6fc4, 0 6px 14px rgba(0,0,0,.45) !important; font: 800 20px 'Baloo 2', sans-serif !important; color: #cfe3ff !important; }
  .ventana .slot, .mVentana .slot { background-color: rgba(10,24,56,.59) !important; box-shadow: inset 0 0 0 2px #2a4f94 !important; }
  .vPie { border-top: 2px solid rgba(60,110,200,.35) !important; } .vPie small { color: #9fb8e0 !important; }
  .receta, .fila, .plano { border-bottom: 2px solid rgba(60,110,200,.3) !important; } .receta .nom small, .fila .nom small, .plano .nom small { color: #9fb8e0 !important; }
  .receta .hacer, .mb, #guia .gb, #planBar .gb, .receta .hacer, .mb.verde { background: var(--azBtn) !important; border-radius: 8px !important; }
  .opcG div, .ajOpc div { background: rgba(26,52,104,.59) !important; box-shadow: inset 0 0 0 2px #2a4f94; border-radius: 8px !important; } .opcG div.on, .ajOpc div.on { background: var(--azBtn) !important; box-shadow: none; }
  .ajFila { background: var(--azP) !important; box-shadow: inset 0 0 0 2px #2a4f94 !important; } .ajFila input { accent-color: #3d9bff !important; }
  .catTabs .ct { background: rgba(26,52,104,.59) !important; border-color: #2a4f94 !important; color: #cfe3ff !important; } .catTabs .ct.on { background: #2f8cff !important; border-color: #7fd0ff !important; color: #fff !important; }
  body.enMenu .capa:not(#grabando):not(#precarga):not(#inicio), .capa.trans:not(#inicio) { background: radial-gradient(ellipse at 50% 45%, rgba(4,12,30,.15), rgba(2,8,22,.7)) !important; backdrop-filter: blur(2px) !important; -webkit-backdrop-filter: blur(2px) !important; }

  /* cartel del título de la bolsa: sin placa, título grande con cubitos */
  .dzCartel { background: none !important; box-shadow: none !important; clip-path: none !important; top: -8px !important; padding: 0 30px !important; }
  .dzCartel::before, .dzCartel::after { width: 10px !important; height: 10px !important; transform: translateY(-50%) !important; border-radius: 1px; background: #2f8cff !important; box-shadow: 0 0 10px #2f8cff, 6px -8px 0 -1px #7fd0ff !important; }
  .dzCartel span { font-size: clamp(20px, 2.6vw, 34px) !important; }
  .ventana.dzGrande { padding-top: 34px !important; }

  /* bolsa y fabricar */
  .dzChip, .dzPj, .dzGrid, .dzInfo, .dzMats, .dzIt { background: var(--azTile) !important; box-shadow: inset 0 0 0 2px #2a4f94 !important; }
  .dzPj { background: radial-gradient(ellipse at 50% 42%, rgba(60,140,255,.22), rgba(0,0,0,0) 60%), var(--azTile) !important; }
  .dzPj .sil { filter: drop-shadow(0 0 26px rgba(60,140,255,.4)) !important; }
  .dzInfo .dato { color: #9fb8e0 !important; } .dzEq span, .dzMat .nm, .dzVacia { color: #9fb8e0 !important; }
  .dzIt.sel { background: linear-gradient(180deg, rgba(40,110,230,.95), rgba(22,70,170,.95)) !important; box-shadow: inset 0 0 0 2px #7fd0ff, 0 0 16px rgba(60,160,255,.45) !important; }
  .dzIt .tg { background: #1f9a4a !important; } .dzIt.no .tg { background: #a8323e !important; }
  .dzCel.sel { outline-color: #7fd0ff !important; }
  .dzB { font-family: 'Baloo 2', sans-serif !important; font-weight: 800 !important; text-transform: uppercase; clip-path: none !important; border-radius: 10px !important; background: var(--azTile) !important; box-shadow: inset 0 0 0 2px #3a6fc4 !important; }
  .dzB.na, .dzB.ve { background: var(--azBtn) !important; box-shadow: inset 0 2px 0 rgba(200,230,255,.55), 0 0 0 2px #2a7df0, 0 6px 16px rgba(30,110,255,.35) !important; }
  .dzPapel { box-shadow: 0 14px 28px rgba(0,0,0,.5), inset 0 0 50px rgba(150,110,60,.35), 0 0 0 2px rgba(127,208,255,.25) !important; }

  /* juego */
  #barra { background: rgba(8,20,46,.54) !important; box-shadow: inset 0 0 0 2px #2f6fd6, 0 0 16px rgba(40,120,255,.25) !important; }
  #barra .slot.sel { box-shadow: inset 0 0 0 3px #7fd0ff, 0 0 12px rgba(127,208,255,.7) !important; background-color: rgba(60,160,255,.2) !important; }
  .boton, .bChico { background: rgba(8,20,46,.51) !important; box-shadow: inset 0 0 0 2px #2f6fd6 !important; }
  .boton.on, .bChico.on { background: var(--azBtn) !important; }
  .barraHud, #mision, #dia, #guia, #planBar, #crono, #mecBar { background: rgba(8,20,46,.54) !important; box-shadow: inset 0 0 0 2px #2f6fd6 !important; }
  #mision small { color: #7fd0ff !important; }
  #aviso { font-family: 'Pixelify', 'Baloo 2', sans-serif !important; color: #fff !important; text-shadow: 0 3px 0 #061433, 0 0 18px rgba(60,140,255,.6) !important; }
  #logroToast { background: var(--azP) !important; box-shadow: inset 0 0 0 2px #2f6fd6, 0 0 18px rgba(40,120,255,.35) !important; color: #e8f0ff !important; } #logroToast small { color: #7fd0ff !important; font-family: 'Baloo 2', sans-serif !important; }
  #calChip { background: rgba(8,20,46,.56) !important; box-shadow: inset 0 0 0 2px #2f6fd6 !important; } #calChip b { color: #7fd0ff !important; }
  .dzK { background: #dbe8ff !important; color: #0a1a38 !important; box-shadow: 0 3px 0 #6f86b0 !important; }

  /* ═══ MIS MUNDOS como la referencia ═══ */
  #mundos.azListo { justify-content: center; }
  #mundosCuerpo.azPanel { position: relative; width: min(1000px, calc(90vw / var(--uM, 1))) !important; display: flex; flex-direction: column; gap: 0 !important; padding: 18px 20px 14px; }
  @media (min-width: 900px) and (min-height: 560px) { #mundosCuerpo.azPanel { zoom: 1 !important; width: min(1000px, 92vw) !important; } }
  #mundosCuerpo > .titulo { order: -3; } #mundosCuerpo > .azSub { order: -2; } #mundosDer.azTiles { order: -1 !important; } #mundosDer .filaBtn { display: contents; }
  #listaMundos .mundoFila.azFila { border: none !important; padding: 10px 12px !important; gap: 16px !important; margin-bottom: 10px; }
  #listaMundos .vacio { color: #cfe3ff !important; }
  #mundosCuerpo > .titulo { font-size: clamp(30px, 4.6vw, 54px) !important; text-align: center; margin: 0; display: flex; align-items: center; justify-content: center; }
  .azTiles { display: grid; grid-template-columns: 1.35fr repeat(4, 1fr); gap: 12px; margin: 4px 0 14px; }
  .azTiles .btn { width: auto !important; margin: 0 !important; min-height: 92px; display: flex !important; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 8px 6px !important; font-size: clamp(12px, 1.3vw, 16px) !important; line-height: 1.1; }
  .azTiles .btn svg { width: 34px; height: 34px; color: #7fd0ff; margin-bottom: 4px; filter: drop-shadow(0 0 8px rgba(127,208,255,.45)); }
  .azTiles #bNuevo { font-size: clamp(15px, 1.7vw, 21px) !important; } .azTiles #bNuevo svg { color: #fff; width: 38px; height: 38px; }
  .azTiles .btn small { display: block; margin: 0 !important; font-size: clamp(10px, 1.05vw, 13px) !important; }
  .azSec { display: flex; align-items: center; gap: 10px; font: 700 clamp(17px, 2vw, 24px) 'Pixelify', sans-serif; color: #fff; text-transform: uppercase; margin: 2px 0 8px; }
  .azSec svg { width: 26px; height: 26px; } .azSec::after { content: ''; flex: 1; height: 2px; background: linear-gradient(90deg, #2f6fd6, rgba(47,111,214,0)); }
  #mundos #listaMundos { background: none !important; box-shadow: none !important; border-radius: 0 !important; padding: 2px 0 !important; }
  .azFila { display: flex; align-items: center; gap: 16px; padding: 10px 12px; border-radius: 14px; background: var(--azTile); box-shadow: inset 0 0 0 2px #2a4f94; }
  .azMini { width: clamp(110px, 15vw, 186px); aspect-ratio: 16 / 9; border-radius: 10px; flex: none; position: relative; overflow: hidden; box-shadow: inset 0 0 0 2px rgba(127,208,255,.25); }
  .azMini.sup { background: linear-gradient(180deg, #7ec8ff 0%, #bfe6ff 45%, #3fae4a 46%, #2a7a32 70%, #7a5232 71%, #5a3a22 100%); }
  .azMini.cre { background: linear-gradient(180deg, #8fd0ff 0%, #d6efff 50%, #e8d38a 51%, #c9a85a 70%, #3fae4a 71%, #2a7a32 100%); }
  .azMini.otr { background: linear-gradient(180deg, #2a1a4a 0%, #6a3aa0 50%, #3a3a4a 51%, #1a1a24 100%); }
  .azMini i { position: absolute; left: 50%; top: 52%; width: 44%; aspect-ratio: 1; transform: translate(-50%, -50%); background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; filter: drop-shadow(0 6px 4px rgba(0,0,0,.45)); }
  .azDatos { flex: 1; min-width: 0; } .azDatos .nm { font: 700 clamp(18px, 2.2vw, 28px) 'Pixelify', sans-serif; color: #fff; text-shadow: 0 2px 0 #061433; }
  .azBadge { display: inline-flex; align-items: center; gap: 5px; margin: 4px 6px 4px 0; padding: 2px 10px 2px 6px; border-radius: 6px; font: 800 13px 'Baloo 2', sans-serif; color: #fff; }
  .azBadge svg { width: 15px; height: 15px; } .azBadge.sup { background: #1f9a4a; } .azBadge.cre { background: #2f7fe0; } .azBadge.otr { background: #8a4ad0; } .azBadge.ext { background: #c8323e; } .azBadge.gris { background: #3a4a6a; }
  .azMeta { display: flex; gap: 18px; flex-wrap: wrap; font: 800 clamp(12px, 1.3vw, 16px) 'Baloo 2', sans-serif; color: #cfe3ff; } .azMeta span { display: inline-flex; align-items: center; gap: 6px; } .azMeta svg { width: 17px; height: 17px; color: #3d9bff; }
  .azEntrar { display: flex !important; align-items: center; gap: 10px; width: auto !important; margin: 0 !important; padding: 12px clamp(18px, 3vw, 46px) !important; font-size: clamp(15px, 1.8vw, 22px) !important; }
  .azEntrar svg { width: 22px; height: 22px; }
  .azMas { position: relative; width: 46px; height: 52px; border-radius: 10px; background: var(--azTile); box-shadow: inset 0 0 0 2px #3a6fc4; display: flex; align-items: center; justify-content: center; color: #cfe3ff; cursor: pointer; flex: none; }
  .azMas svg { width: 22px; height: 22px; }
  .azMenu { position: absolute; right: 0; top: calc(100% + 6px); z-index: 5; display: none; }
  .azMas.abierto .azMenu { display: block; } .azMenu .btn { white-space: nowrap; padding: 8px 16px !important; width: auto !important; margin: 0 !important; }
  #mundosPag .btn, #mundosPag [data-pag] { background: linear-gradient(180deg, #2a6fd6, #1b4fa8) !important; border: 1px solid #5aa0ff !important; box-shadow: 0 3px 0 #0b2f6e !important; color: #fff !important; filter: none !important; }
  #mundosPag [data-pag].off { opacity: .35; }
  .azPie { display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-top: 10px; font: 800 15px 'Baloo 2', sans-serif; color: #cfe3ff; } .azPie svg { width: 20px; height: 20px; }
  .azVolver { position: fixed; top: max(14px, env(safe-area-inset-top)); right: max(16px, env(safe-area-inset-right)); width: 62px !important; height: 62px; margin: 0 !important; padding: 0 !important; display: flex !important; align-items: center; justify-content: center; border-radius: 12px !important; z-index: 6; }
  .azVolver svg { width: 30px; height: 30px; color: #cfe3ff; } .azVolver .txt { display: none; }
  .azLogo { position: fixed; top: max(10px, env(safe-area-inset-top)); left: max(16px, env(safe-area-inset-left)); width: min(24vw, 260px); z-index: 6; pointer-events: none; filter: drop-shadow(0 6px 12px rgba(0,0,0,.5)); }
  @media (max-width: 1500px) { .azLogo { display: none; } }
  .azLogo svg { width: 100%; height: auto; display: block; }
  /* pausa */
  #pausa .titulo { font-size: clamp(32px, 5vw, 56px) !important; }
  @media (max-height: 560px) {
    #mundosCuerpo.azPanel { padding: 8px 12px 6px; } .azTiles { gap: 6px; margin-bottom: 8px; } .azTiles .btn { min-height: 62px; } .azTiles .btn svg { width: 22px; height: 22px; margin: 0; } .azTiles .btn small { display: none; }
    .azFila { padding: 6px 8px; gap: 10px; } .azSub { margin-bottom: 4px; letter-spacing: 3px; } .azLogo { display: none; } .azVolver { width: 48px !important; height: 48px; }
  }
  /* celulares acostados (iPhone ~ 393 de alto o menos): todo más compacto y con aire alrededor */
  @media (max-height: 450px) { .dzFicha .dato { display: none; } .dzFicha .big { width: 46px !important; height: 46px !important; } }
  @media (max-height: 500px) {
    #mundosCuerpo.azPanel { width: min(1000px, calc(80vw / var(--uM, 1))) !important; padding: 6px 12px 4px; border-radius: 16px; }
    #mundosCuerpo > .titulo { font-size: 22px !important; } .azSub { display: none; } .azCubos i { width: 6px; height: 6px; }
    #mundosDer.azTiles { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; gap: 5px !important; margin: 4px 0 6px !important; }
    .azTiles .btn { min-height: 0 !important; height: 40px; flex-direction: row !important; gap: 5px; font-size: 10px !important; padding: 2px 4px !important; line-height: 1.05 !important; } .azTiles .btn svg { width: 16px !important; height: 16px !important; flex: none; }
    .azSec { font-size: 13px; margin: 0 0 4px; } .azSec svg { width: 16px; height: 16px; }
    #listaMundos .mundoFila.azFila { padding: 5px 8px !important; gap: 10px !important; margin-bottom: 5px; } .azMini { width: 82px; }
    .azEntrar { padding: 6px 14px !important; font-size: 13px !important; } .azPie { margin-top: 2px; font-size: 12px; }
    .azVolver { width: 40px !important; height: 40px; top: max(8px, env(safe-area-inset-top)); right: max(10px, env(safe-area-inset-right)); }
    .dzFicha { overflow-y: auto; } .dzFicha .acc { position: sticky; bottom: 0; margin-top: auto; padding-top: 4px; background: linear-gradient(rgba(10,26,64,0), #0b1a40 35%); }
    #pausa > *, #nuevo > * { zoom: calc(var(--uM, 1) * .8) !important; }
    #inicio .btn:not(#bJugar) { font-size: 14px !important; margin: 0 !important; padding: 3px 18px 3px 22px !important; }
  }
`; document.head.appendChild(st); }

// ─── MIS MUNDOS: panel con título, mosaicos, lista con miniatura y botón Entrar ───
const azCubos = '<span class="azCubos"><i></i><i></i></span>';
function azMundos() {
  const cap = $('mundos'), cuerpo = $('mundosCuerpo'), der = $('mundosDer'), izq = $('mundosIzq');
  if (!cap || !cuerpo || !der || cap.classList.contains('azListo')) return;
  cap.classList.add('azListo'); cuerpo.classList.add('azPanel');
  const tit = cap.querySelector(':scope > .titulo');
  const sub = document.createElement('div'); sub.className = 'azSub'; sub.textContent = azT('azGestiona');
  const sec = document.createElement('div'); sec.className = 'azSec'; sec.innerHTML = AZI.cubo + '<span>' + azT('azTusMundos') + '</span>';
  const pie = document.createElement('div'); pie.className = 'azPie';
  if (tit) { cuerpo.insertBefore(tit, cuerpo.firstChild); tit.insertAdjacentHTML('afterbegin', azCubos); tit.insertAdjacentHTML('beforeend', azCubos); tit.after(sub); }
  der.classList.add('azTiles'); izq.before(sec); izq.after(pie);
  const icono = b => b.id === 'bNuevo' ? AZI.mas : /línea|online|linha/i.test(b.textContent) ? AZI.mundo : b.id === 'bMapas' ? AZI.mapa : b.id === 'bCargarArchivo' ? AZI.carpeta : /copia|backup|cópia/i.test(b.textContent) ? AZI.escudo : AZI.cubo;
  for (const b of [...der.querySelectorAll('.btn')]) {
    if (b.id === 'bVolverInicio') { b.classList.add('azVolver'); b.innerHTML = AZI.volver + '<span class="txt">' + b.textContent + '</span>'; cap.appendChild(b); continue; }
    if (!b.querySelector('svg')) b.insertAdjacentHTML('afterbegin', icono(b));
  }
  const nu = $('bNuevo'); if (nu) der.insertBefore(nu, der.firstChild);
  const lg = document.querySelector('#inicio .logoTitulo .logoSvg'); if (lg && !cap.querySelector('.azLogo')) { const d = document.createElement('div'); d.className = 'azLogo'; d.innerHTML = lg.outerHTML.replace(/id="([^"]+)"/g, 'id="az$1"').replace(/url\(#([^)]+)\)/g, 'url(#az$1)'); cap.appendChild(d); }
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
      fila.innerHTML = `<div class="azMini ${tipo}"><i style="background-image:url(${icono(ico)})"></i></div>
        <div class="azDatos"><div class="nm">${esc(nombre)}</div><span class="azBadge ${tipo}">${tipo === 'cre' ? AZI.cubo : AZI.hoja}${esc(modoTxt)}</span>${marcas}
          <div class="azMeta"><span>${AZI.cal}${azFecha(m.fecha)}</span>${m.modo !== 'creativo' ? `<span>${AZI.reloj}${TR('diaMin', { n: m.dia || 1 })}</span>` : ''}</div></div>
        <div class="btn azEntrar" data-entrar="${m.id}">${AZI.play}${azT('azEntrar')}</div>
        <div class="azMas">${AZI.puntos}<div class="azMenu"><div class="btn rojo" data-borrar="${m.id}">${azT('azBorrar')}</div></div></div>`;
    }
    const n = l.length, pie = document.querySelector('#mundos .azPie'); if (pie) pie.innerHTML = n ? AZI.cubo + azT('azMundos', n) : '';
    return r; }; }
document.addEventListener('click', e => { const m = e.target.closest('.azMas'); document.querySelectorAll('.azMas.abierto').forEach(x => { if (x !== m) x.classList.remove('abierto'); }); if (m && !e.target.closest('.azMenu')) m.classList.toggle('abierto'); });
setTimeout(() => { try { azMundos(); pintarMundos(); } catch (e) {} }, 300);

// ─── títulos de otras pantallas con la línea de abajo y cubitos ───
setTimeout(() => {
  const pon = (id, k) => { const c = $(id); if (!c) return; const t = c.querySelector('.titulo'); if (!t || t.dataset.az) return; t.dataset.az = 1; t.insertAdjacentHTML('afterbegin', azCubos); t.insertAdjacentHTML('beforeend', azCubos); t.style.display = 'flex'; t.style.alignItems = 'center'; t.style.justifyContent = 'center'; const s = document.createElement('div'); s.className = 'azSub'; s.textContent = azT(k); t.after(s); };
  pon('nuevo', 'azElige'); pon('pausa', 'azPausaSub');
}, 400);

if (typeof pintarBotonCopia === 'function') { const _pbc = pintarBotonCopia; pintarBotonCopia = function () { _pbc(); const b = $('bCopia'); if (b && !b.querySelector('svg')) b.insertAdjacentHTML('afterbegin', AZI.escudo); }; try { pintarBotonCopia(); } catch (e) {} }

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

setTimeout(() => { const j = $('bJugar'); if (j && !j.querySelector('svg')) j.insertAdjacentHTML('afterbegin', AZI.play); }, 400);
{ const st = document.createElement('style'); st.textContent = `.azVolver, #mundos .azVolver { background: linear-gradient(180deg, rgba(22,52,110,.61), rgba(10,26,64,.63)) !important; border: 2px solid #3f86f0 !important; border-radius: 12px !important; box-shadow: 0 0 18px rgba(47,140,255,.35), 0 4px 0 #061433 !important; color: #cfe3ff !important; }`; document.head.appendChild(st); }
// vidrio: dentro de las ventanas los recuadros van más claros (si no, se suman dos capas y queda oscuro)
{ const st = document.createElement('style'); st.textContent = `
  .ventana .dzChip, .ventana .dzPj, .ventana .dzGrid, .ventana .dzInfo, .ventana .dzMats, .ventana .dzIt:not(.sel), .azFila, .azTiles .btn:not(#bNuevo) { background: linear-gradient(180deg, rgba(34,72,140,.3), rgba(16,36,80,.36)) !important; }
  .ventana .dzPj { background: radial-gradient(ellipse at 50% 42%, rgba(60,140,255,.2), rgba(0,0,0,0) 60%), linear-gradient(180deg, rgba(34,72,140,.3), rgba(16,36,80,.36)) !important; }
  .ventana .slot, .mVentana .slot { background-color: rgba(10,24,56,.42) !important; }
  .ventana .dzGrid .dzS, .ventana .dzGrid > * { backdrop-filter: none; }
  body.enMenu .capa:not(#grabando):not(#precarga):not(#inicio), .capa.trans:not(#inicio) { background: radial-gradient(ellipse at 50% 45%, rgba(4,12,30,.05), rgba(2,8,22,.45)) !important; }
`; document.head.appendChild(st); }
// con los paneles transparentes, los avisos del juego se verían detrás: se ocultan mientras hay un menú abierto
{ const st = document.createElement('style'); st.textContent = `body:has(.capa:not([hidden]):not(#grabando):not(#precarga):not(#inicio)) #aviso, body:has(.ventana:not([hidden])) #aviso { opacity: 0 !important; transition: opacity .15s; }`; document.head.appendChild(st); }
// ajustes pedidos: sin cubitos/diamantes junto a los títulos, sin logo en Mis Mundos, título de ventana dentro con el mismo aire arriba y abajo, botón volver siempre dentro de la pantalla
{ const st = document.createElement('style'); st.textContent = `
  .azCubos, .dzCartel::before, .dzCartel::after { display: none !important; }
  .azLogo { display: none !important; }
  .dzCartel { top: 14px !important; padding: 0 20px !important; line-height: 1 !important; }
  .ventana.dzGrande, .ventana.dzAncha { padding-top: 58px !important; }
  .azVolver, #mundos .azVolver { zoom: 1 !important; top: max(10px, env(safe-area-inset-top)) !important; right: calc(max(10px, env(safe-area-inset-right)) + 2px) !important; left: auto !important; }
  @media (max-height: 500px) {
    .dzCartel { top: 10px !important; } .dzCartel span { font-size: 20px !important; }
    .ventana.dzGrande, .ventana.dzAncha { padding-top: 40px !important; }
    .azVolver, #mundos .azVolver { width: 40px !important; height: 40px !important; }
  }
`; document.head.appendChild(st); }
