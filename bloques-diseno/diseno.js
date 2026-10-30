'use strict';
// ═════════ DISEÑO NUEVO DE PRUEBA — "aventura premium" ═════════
// Marcos dorados con brillo, letras grabadas (Cinzel), rareza por color, inicio de cine.
// Se carga SOLO en /bloques-diseno/ encima del estilo actual. El juego de /bloques/ no cambia.

const DZ_TX = {
  es: { dzBolsaT: 'Bolsa del aventurero', dzFabT: 'Mesa del artesano', dzCofreT: 'Cofre', dzPuede: 'Se puede fabricar', dzFalta: 'Te faltan materiales', dzMats: 'Materiales necesarios', dzCant: 'Cantidad', dzTienes: 'Tienes', dzTipo: 'Tipo', dzNivel: 'Nivel',
    dzHerr: 'Herramienta', dzArma: 'Arma', dzComida: 'Comida', dzBloque: 'Bloque', dzObjeto: 'Objeto', dzArmad: 'Armadura', dzPocion: 'Poción', dzHacer: 'Fabricar', dzHacer5: 'Fabricar 5', dzVida: 'Vida', dzOro: 'Oro', dzCrist: 'Cristales', dzDia: 'Día',
    dzCasco: 'Casco', dzPechera: 'Pechera', dzGrebas: 'Grebas', dzBotas: 'Botas', dzArmaS: 'Arma', dzEscudo: 'Escudo', dzHerrS: 'Herramienta', dzAlas: 'Alas', dzBarra: 'A la barra', dzEquipar: 'Equipar', dzComer: 'Comer',
    dzR0: 'Común', dzR1: 'Poco común', dzR2: 'Raro', dzR3: 'Épico', dzR4: 'Legendario', dzVacia: 'Tu bolsa está vacía. Rompe bloques para juntar materiales.', dzElige: 'Toca un objeto para ver qué es' },
  en: { dzBolsaT: "Adventurer's bag", dzFabT: "Crafter's table", dzCofreT: 'Chest', dzPuede: 'Ready to craft', dzFalta: 'Missing materials', dzMats: 'Required materials', dzCant: 'Amount', dzTienes: 'You have', dzTipo: 'Type', dzNivel: 'Level',
    dzHerr: 'Tool', dzArma: 'Weapon', dzComida: 'Food', dzBloque: 'Block', dzObjeto: 'Item', dzArmad: 'Armor', dzPocion: 'Potion', dzHacer: 'Craft', dzHacer5: 'Craft 5', dzVida: 'Health', dzOro: 'Gold', dzCrist: 'Crystals', dzDia: 'Day',
    dzCasco: 'Helmet', dzPechera: 'Chest', dzGrebas: 'Leggings', dzBotas: 'Boots', dzArmaS: 'Weapon', dzEscudo: 'Shield', dzHerrS: 'Tool', dzAlas: 'Wings', dzBarra: 'To hotbar', dzEquipar: 'Equip', dzComer: 'Eat',
    dzR0: 'Common', dzR1: 'Uncommon', dzR2: 'Rare', dzR3: 'Epic', dzR4: 'Legendary', dzVacia: 'Your bag is empty. Break blocks to gather materials.', dzElige: 'Tap an item to see what it is' },
  pt: { dzBolsaT: 'Bolsa do aventureiro', dzFabT: 'Mesa do artesão', dzCofreT: 'Baú', dzPuede: 'Pode fabricar', dzFalta: 'Faltam materiais', dzMats: 'Materiais necessários', dzCant: 'Quantidade', dzTienes: 'Você tem', dzTipo: 'Tipo', dzNivel: 'Nível',
    dzHerr: 'Ferramenta', dzArma: 'Arma', dzComida: 'Comida', dzBloque: 'Bloco', dzObjeto: 'Objeto', dzArmad: 'Armadura', dzPocion: 'Poção', dzHacer: 'Fabricar', dzHacer5: 'Fabricar 5', dzVida: 'Vida', dzOro: 'Ouro', dzCrist: 'Cristais', dzDia: 'Dia',
    dzCasco: 'Capacete', dzPechera: 'Peitoral', dzGrebas: 'Calças', dzBotas: 'Botas', dzArmaS: 'Arma', dzEscudo: 'Escudo', dzHerrS: 'Ferramenta', dzAlas: 'Asas', dzBarra: 'Para a barra', dzEquipar: 'Equipar', dzComer: 'Comer',
    dzR0: 'Comum', dzR1: 'Incomum', dzR2: 'Raro', dzR3: 'Épico', dzR4: 'Lendário', dzVacia: 'Sua bolsa está vazia. Quebre blocos para juntar materiais.', dzElige: 'Toque num objeto para ver o que é' } };
for (const l in DZ_TX) Object.assign(TX[l], DZ_TX[l]);

// símbolos propios de cubitos para las franjas que brillan (no son runas reales)
const DZ_GLIFOS = (() => { let s = ''; let r = 7; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let k = 0; k < 12; k++) { s += `<g transform="translate(0 ${k * 22})">`; for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) if (rnd() < .5) s += `<rect x="${3 + x * 5}" y="${3 + y * 5}" width="4" height="4"/>`; s += '</g>'; }
  return 'url("data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="264" fill="#52d6ff">${s}</svg>`) + '")'; })();

{ const st = document.createElement('style'); st.textContent = `
  @font-face { font-family: 'Cinzel'; font-weight: 700; font-display: swap; src: url(../bloques-diseno/fonts/cinzel-latin-700-normal.woff2) format('woff2'); unicode-range: U+0000-00FF,U+2000-206F; }
  @font-face { font-family: 'Cinzel'; font-weight: 700; font-display: swap; src: url(../bloques-diseno/fonts/cinzel-latin-ext-700-normal.woff2) format('woff2'); unicode-range: U+0100-02BA,U+1E00-1EFF; }
  @font-face { font-family: 'Cinzel'; font-weight: 900; font-display: swap; src: url(../bloques-diseno/fonts/cinzel-latin-900-normal.woff2) format('woff2'); unicode-range: U+0000-00FF,U+2000-206F; }
  @font-face { font-family: 'Cinzel'; font-weight: 900; font-display: swap; src: url(../bloques-diseno/fonts/cinzel-latin-ext-900-normal.woff2) format('woff2'); unicode-range: U+0100-02BA,U+1E00-1EFF; }
  :root { --dzOro: linear-gradient(135deg, #ffe6a8, #c98a3a 30%, #7a4a22 50%, #e0a85a 72%, #fff0c4); --dzFondo: radial-gradient(ellipse at 50% 0%, #3a2a36, #1f1822 55%, #151119);
    --dzBrillo: 0 0 26px rgba(255,140,50,.45), 0 0 46px rgba(70,210,255,.3), 0 24px 50px rgba(0,0,0,.7); }

  /* ─── fondo de todas las pantallas: el mundo desenfocado ─── */
  body.enMenu .capa:not(#grabando):not(#precarga):not(#inicio) { background: radial-gradient(ellipse at 50% 45%, rgba(10,8,16,.35), rgba(5,4,10,.86)) !important; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
  .capa.trans:not(#inicio) { background: radial-gradient(ellipse at 50% 45%, rgba(10,8,16,.35), rgba(5,4,10,.86)) !important; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); }
  .titulo:not(.logoTitulo) { font-family: 'Cinzel', serif !important; font-style: normal !important; font-weight: 900 !important; letter-spacing: 2px !important; text-transform: uppercase;
    background: linear-gradient(180deg, #fff2c4, #ffcf6a 50%, #c9861f); -webkit-background-clip: text; background-clip: text; color: transparent !important; text-shadow: none !important; filter: drop-shadow(0 3px 0 #3a1608) drop-shadow(0 0 12px rgba(255,190,90,.5)); }
  .lema, .sub, .texto { text-shadow: 0 2px 6px rgba(0,0,0,.8) !important; }

  /* ─── botones: placa con puntas, letra grabada ─── */
  .btn { font-family: 'Cinzel', serif !important; font-weight: 900 !important; letter-spacing: 1px; border: none !important; border-radius: 0 !important; color: #fff !important;
    background: linear-gradient(180deg, #3d8bff, #1c4fb4) !important; box-shadow: inset 0 3px 0 rgba(190,220,255,.7), inset 0 -4px 0 rgba(0,0,30,.35) !important;
    clip-path: polygon(16px 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 16px 100%, 0 50%); text-shadow: 0 2px 0 rgba(0,0,40,.6) !important; }
  .btn small { font-family: 'Baloo 2', sans-serif !important; font-weight: 600 !important; letter-spacing: 0; color: #d7e6ff !important; text-transform: none; }
  #bJugar, #bTiendaHome, #bTiendaPausa, #bSeguir, #bNuevo, .btn.dzPri { background: linear-gradient(180deg, #ffb24a, #d9641a) !important; box-shadow: inset 0 3px 0 #ffe0a0, inset 0 -4px 0 rgba(90,30,0,.35) !important; }
  #bSalir, #bVolverInicio, #bVolverMundos, .btn.rojo { background: linear-gradient(180deg, #4a4058, #2a2334) !important; box-shadow: inset 0 3px 0 rgba(255,255,255,.18) !important; color: #e8dcff !important; }
  .btn:active { transform: translateY(2px); filter: brightness(1.15); } @media (hover: hover) { .btn:hover { filter: brightness(1.15); } }
  #bMapas { background: linear-gradient(180deg, #a06bff, #5a2fc0) !important; }
  #listaMundos { background: linear-gradient(180deg, #241c28, #17121a) !important; border: none !important; border-radius: 14px !important; box-shadow: 0 0 0 2px #6b4a2a, 0 0 0 4px #1a1316, var(--dzBrillo) !important; }
  .mundoFila .info small { color: #c9b8a0 !important; }

  /* ─── INICIO como película: logo a la izquierda, menú de texto, la cámara recorre el mundo ─── */
  #inicio { align-items: flex-start !important; justify-content: center !important; padding-left: max(5vw, env(safe-area-inset-left)) !important; gap: 0 !important;
    background: linear-gradient(90deg, rgba(4,6,14,.82) 0%, rgba(4,6,14,.55) 28%, rgba(4,6,14,0) 55%), radial-gradient(ellipse at 85% 0%, rgba(255,230,170,.28), rgba(255,230,170,0) 45%) !important; }
  #inicio .logoTitulo { align-self: flex-start; margin: 0 0 -6px -2vw; width: min(46vw, 560px) !important; font-size: 0 !important; transform: none; transform-origin: left center; filter: drop-shadow(0 8px 18px rgba(0,0,0,.6)); }
  #inicio .logoTitulo .logoSvg { height: clamp(60px, 15vh, 130px) !important; margin: 0 !important; }
  #inicio .lema { align-self: flex-start; text-align: left; margin: -4px 0 0 2px; font-family: 'Cinzel', serif; letter-spacing: 6px; font-size: clamp(14px, 2vw, 20px); color: #ffe6a8; }
  #inicio .sub { align-self: flex-start; text-align: left; margin: 4px 0 26px 2px; color: #d9d2c6; }
  #inicio .filaBtn { display: contents !important; }
  #inicio .btn { background: none !important; clip-path: none !important; box-shadow: none !important; border: none !important; filter: none; box-sizing: border-box; position: relative; display: block; cursor: pointer; width: auto !important; margin: 3px 0 !important; padding: 4px 18px 4px 22px !important;
    font: 700 clamp(17px, 2.3vw, 24px) 'Cinzel', serif !important; letter-spacing: 1.5px; color: #f2ebe0 !important; text-shadow: 0 2px 8px rgba(0,0,0,.9) !important; transition: color .2s, transform .2s, letter-spacing .2s; }
  #inicio .btn::before { content: ''; position: absolute; left: 0; top: 50%; width: 10px; height: 10px; transform: translate(-6px, -50%) rotate(45deg) scale(0); background: #ffb24a; box-shadow: 0 0 10px #ffb24a; transition: transform .2s; }
  #inicio #bJugar { font-size: clamp(26px, 3.6vw, 40px) !important; font-weight: 900 !important; margin-bottom: 10px !important; background: linear-gradient(180deg, #fff2c4, #ffcf6a 50%, #e08a26) !important; -webkit-background-clip: text !important; background-clip: text !important; color: transparent !important; text-shadow: none !important; filter: drop-shadow(0 3px 6px rgba(0,0,0,.8)); }
  #inicio .btn:hover, #inicio .btn:active { color: #ffcf6a !important; transform: translateX(10px); } #inicio .btn:hover::before, #inicio .btn:active::before { transform: translate(-6px, -50%) rotate(45deg) scale(1); }
  #inicio .btn small { display: none; }

  /* ─── ventanas con marco dorado, brillo y franjas de símbolos ─── */
  .ventana, .mVentana { position: relative; background: var(--dzFondo) !important; border: none !important; border-radius: 18px !important; color: #ece3d2 !important; overflow: visible !important;
    box-shadow: 0 0 0 3px #c98a3a, 0 0 0 5px #3a2416, 0 0 0 8px #e6a85a, var(--dzBrillo) !important; }
  .ventana::before, .ventana::after { content: ''; position: absolute; top: 40px; bottom: 30px; width: 22px; background: ${DZ_GLIFOS} repeat-y; background-size: 22px auto; opacity: .85; filter: drop-shadow(0 0 4px #3ad1ff); pointer-events: none; }
  .ventana::before { left: 4px; } .ventana::after { right: 4px; }
  .ventana .vCuerpo, .ventana .vPie, .ventana .vCab { margin: 0 24px; }
  .ventana h4, .mVentana h4 { color: #ffcf6a; font-family: 'Cinzel', serif; letter-spacing: 1px; }
  .vCab .tab { font-family: 'Cinzel', serif !important; font-weight: 900 !important; border: none !important; border-radius: 10px 10px 0 0 !important; background: linear-gradient(180deg, #232838, #161a26) !important; color: #8e93a8 !important; box-shadow: inset 0 0 0 2px #2e3448; padding: 6px 18px !important; text-shadow: none !important; letter-spacing: 1px; }
  .vCab .tab.on { background: linear-gradient(180deg, #6a2e22, #3a1a14) !important; color: #fff1d0 !important; box-shadow: inset 0 0 0 2px #c98a5a, 0 6px 14px rgba(255,140,60,.3); }
  .vCab .cerrar, .dzX { position: absolute; right: -18px; top: -18px; width: 44px !important; height: 44px !important; border-radius: 50% !important; border: none !important; z-index: 3; cursor: pointer;
    background: radial-gradient(circle at 35% 30%, #ff7a6a, #b0201c 70%) !important; box-shadow: 0 0 0 3px #5a3a26, 0 0 0 5px #e6a85a, 0 6px 12px rgba(0,0,0,.5) !important; font: 900 20px 'Cinzel', serif !important; color: #fff !important; }
  .mVentana .vCab .cerrar { position: static; }
  .ventana .slot, .mVentana .slot { border-radius: 10px !important; border: none !important; background-color: #1b2230 !important; box-shadow: inset 0 0 0 2px #59627a; }
  .vPie { border-top: 2px solid #3a2c2a !important; } .vPie small { color: #b9ab98; }
  .vPie .grilla .slot.sel { box-shadow: inset 0 0 0 3px #ffb43a, 0 0 14px rgba(255,180,58,.6) !important; }
  .receta, .fila, .plano { border-bottom: 2px solid #3a2c2a !important; } .receta .nom small, .fila .nom small, .plano .nom small { color: #b9ab98 !important; }
  .receta .hacer, .mb, #guia .gb, #planBar .gb { border: none !important; border-radius: 8px !important; background: linear-gradient(180deg, #3d8bff, #1c4fb4) !important; }
  .receta .hacer, .mb.verde, #guia .gb, #planBar .gb { background: linear-gradient(180deg, #5fd36a, #238a3a) !important; }
  .mb.rojo, #guia .gb.rojo, #planBar .gb.rojo { background: linear-gradient(180deg, #ff6a5a, #b0201c) !important; }
  .catTabs .ct { background: #232838 !important; border-color: #2e3448 !important; color: #c9cde0 !important; } .catTabs .ct.on { background: #6a2e22 !important; border-color: #c98a5a !important; color: #fff1d0 !important; }
  #pCuerpo .elegido { color: #ffcf6a !important; }
  .opcG div, .ajOpc div { border: none !important; border-radius: 8px !important; background: #2a2334 !important; }
  .opcG div.on, .ajOpc div.on { background: linear-gradient(180deg, #ffb24a, #d9641a) !important; }
  .ajFila { background: linear-gradient(180deg, rgba(36,28,40,.92), rgba(23,18,26,.92)) !important; border: none !important; border-radius: 12px !important; box-shadow: 0 0 0 2px #5a3e26 !important; }
  .ajFila input { accent-color: #ffb24a !important; }

  /* ─── juego ─── */
  #barra { background: linear-gradient(180deg, rgba(36,28,40,.88), rgba(20,16,24,.88)) !important; border: none !important; border-radius: 12px !important; box-shadow: 0 0 0 2px #8a5a2a, 0 0 18px rgba(255,140,50,.25) !important; }
  .slot { border-radius: 8px !important; border: none !important; box-shadow: inset 0 0 0 2px rgba(150,160,190,.5); background-color: rgba(20,26,40,.6) !important; }
  #barra .slot.sel { box-shadow: inset 0 0 0 3px #ffb43a, 0 0 12px rgba(255,180,58,.7) !important; background-color: rgba(255,180,58,.18) !important; }
  .boton, .bChico { border-radius: 12px !important; background: linear-gradient(180deg, rgba(36,28,40,.8), rgba(20,16,24,.8)) !important; border: none !important; box-shadow: 0 0 0 2px #8a5a2a; }
  .boton.on, .bChico.on { background: linear-gradient(180deg, #ffb24a, #d9641a) !important; }
  .barraHud, #mision, #dia, #guia, #planBar, #crono, #mecBar { background: linear-gradient(180deg, rgba(36,28,40,.85), rgba(20,16,24,.85)) !important; border-radius: 10px !important; box-shadow: 0 0 0 2px rgba(138,90,42,.8); }
  #mision small { color: #ffcf6a !important; }
  #aviso { font-family: 'Cinzel', serif !important; font-weight: 900 !important; color: #ffcf6a !important; text-shadow: 0 3px 0 #2a1208, 0 0 18px rgba(0,0,0,.8) !important; letter-spacing: 1px; }
  #aviso small { font-family: 'Baloo 2', sans-serif; letter-spacing: 0; }
  #logroToast { background: var(--dzFondo) !important; border: none !important; border-radius: 12px !important; color: #ece3d2 !important; box-shadow: 0 0 0 2px #c98a3a, 0 0 18px rgba(255,140,50,.4) !important; }
  #logroToast small { color: #ffcf6a !important; font-family: 'Cinzel', serif; }
  #calChip { background: rgba(20,16,24,.82) !important; border: none !important; border-radius: 30px !important; box-shadow: 0 0 0 2px #8a5a2a !important; }
  #calChip b { color: #ffcf6a !important; }

  /* ─── cartel con el título arriba de la bolsa ─── */
  .dzCartel { position: absolute; left: 50%; top: -34px; transform: translateX(-50%); z-index: 3; padding: 8px 64px; white-space: nowrap; pointer-events: none;
    background: linear-gradient(180deg, #6a2b2e, #3d1719); clip-path: polygon(26px 0, calc(100% - 26px) 0, 100% 50%, calc(100% - 26px) 100%, 26px 100%, 0 50%); box-shadow: inset 0 0 0 3px #c9935a; }
  .dzCartel span { font: 900 clamp(18px, 2.4vw, 30px) 'Cinzel', serif; letter-spacing: 2px; background: linear-gradient(180deg, #fff2c4, #ffcf6a 50%, #c9861f); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 2px 0 #3a1608); text-transform: uppercase; }
  .dzCartel::before, .dzCartel::after { content: ''; position: absolute; top: 50%; width: 14px; height: 14px; transform: translateY(-50%) rotate(45deg); background: linear-gradient(135deg, #bff6ff, #2aa8e0); box-shadow: 0 0 10px #3ad1ff; }
  .dzCartel::before { left: 6px; } .dzCartel::after { right: 6px; }
  .ventana.dzGrande { padding-top: 20px; }

  /* ─── teclas dibujadas (solo con mouse y teclado) ─── */
  .dzK { display: none; align-items: center; justify-content: center; min-width: 24px; height: 24px; padding: 0 6px; border-radius: 5px; background: #f3ead8; color: #1c2a3a; font: 800 13px 'Baloo 2', sans-serif; box-shadow: 0 3px 0 #9c8d70; flex: none; text-shadow: none; letter-spacing: 0; }
  @media (hover: hover) and (pointer: fine) { .dzK { display: inline-flex; } }

  /* ─── rareza ─── */
  .dzR0 { box-shadow: inset 0 0 0 3px #7b8494 !important; background: radial-gradient(circle at 50% 35%, rgba(255,255,255,.08), rgba(0,0,0,.25)), #1b2230 !important; }
  .dzR1 { box-shadow: inset 0 0 0 3px #3fd36a, 0 0 12px rgba(63,211,106,.3) !important; background: radial-gradient(circle at 50% 35%, rgba(63,211,106,.22), rgba(0,0,0,.3)), #16261c !important; }
  .dzR2 { box-shadow: inset 0 0 0 3px #3aa6ff, 0 0 12px rgba(58,166,255,.35) !important; background: radial-gradient(circle at 50% 35%, rgba(58,166,255,.25), rgba(0,0,0,.3)), #142030 !important; }
  .dzR3 { box-shadow: inset 0 0 0 3px #b05cff, 0 0 14px rgba(176,92,255,.4) !important; background: radial-gradient(circle at 50% 35%, rgba(176,92,255,.25), rgba(0,0,0,.3)), #1e1630 !important; }
  .dzR4 { box-shadow: inset 0 0 0 3px #ffb43a, 0 0 16px rgba(255,180,58,.5) !important; background: radial-gradient(circle at 50% 35%, rgba(255,180,58,.3), rgba(0,0,0,.3)), #2a1e12 !important; }
  .dzTR0 { color: #b8c0cc; } .dzTR1 { color: #6be38a; } .dzTR2 { color: #6cc0ff; } .dzTR3 { color: #c99aff; } .dzTR4 { color: #ffcf6a; }

  /* ═══ BOLSA (supervivencia): fichas arriba · personaje con equipo · grilla con rareza · ficha del objeto ═══ */
  .ventana.dzAncha { max-height: none !important; max-width: none !important; }
  .ventana.dzAncha .vCuerpo { overflow: hidden !important; padding: 4px 0 10px !important; }
  .ventana.dzAncha .vPie { display: none; }
  .dzChips { display: flex; gap: 12px; justify-content: center; margin: 6px 0 10px; }
  .dzChip { display: flex; align-items: center; gap: 8px; padding: 4px 16px 4px 6px; border-radius: 12px; background: linear-gradient(180deg, #2a2028, #1a1418); box-shadow: inset 0 0 0 2px #4a3a30; font-weight: 800; font-size: 17px; }
  .dzChip i { width: 30px; height: 30px; background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; filter: drop-shadow(0 3px 2px rgba(0,0,0,.6)); }
  .dzChip svg { width: 28px; height: 28px; filter: drop-shadow(0 0 6px rgba(255,74,95,.6)); }
  .dzChip.v { color: #ff8a8a; } .dzChip.o { color: #ffd77a; } .dzChip.c { color: #9fe8ff; } .dzChip.d { color: #d9c6ff; }
  .dzBolsa { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.5fr) minmax(0, .85fr); gap: 14px; height: calc(100% - 56px); }
  .dzPj { position: relative; grid-template-columns: 62px 1fr 62px !important; border-radius: 14px; background: radial-gradient(ellipse at 50% 42%, rgba(255,140,60,.2), rgba(0,0,0,0) 60%), linear-gradient(180deg, #221a20, #17121a); box-shadow: inset 0 0 0 2px #4a3a30; display: grid; grid-template-columns: auto 1fr auto; padding: 10px; gap: 4px; min-height: 0; }
  .dzPj .col { display: flex; flex-direction: column; justify-content: space-around; gap: 4px; }
  .dzPj .sil { align-self: center; justify-self: center; width: 78%; max-height: 92%; filter: drop-shadow(0 0 26px rgba(255,140,60,.35)); }
  .dzEq { display: flex; flex-direction: column; align-items: center; gap: 1px; cursor: pointer; } .dzEq span { font-size: 11px; color: #bdb0a0; font-weight: 600; }
  .dzEqB, .dzCel { position: relative; border-radius: 10px; }
  .dzEqB { width: 54px; height: 54px; }
  .dzEqB i, .dzCel i { position: absolute; inset: 16%; background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; filter: drop-shadow(0 5px 3px rgba(0,0,0,.6)); }
  .dzEqB.vacio { box-shadow: inset 0 0 0 2px #3a3a4a !important; background: #15141c !important; } .dzEqB.vacio i { opacity: .18; filter: grayscale(1) brightness(2); }
  .dzGrid { border-radius: 14px; background: linear-gradient(180deg, #221a20, #17121a); box-shadow: inset 0 0 0 2px #4a3a30; padding: 12px; display: grid; grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)); grid-auto-rows: 64px; gap: 9px; overflow-y: auto; align-content: start; scrollbar-width: thin; scrollbar-color: #8a5a2a #17121a; }
  .dzCel { cursor: pointer; } .dzCel b { position: absolute; right: 6px; bottom: 1px; font-size: 15px; color: #fff; text-shadow: 0 2px 0 #000, 0 0 5px #000; }
  .dzCel.sel { outline: 3px solid #fff; outline-offset: 2px; }
  .dzVacia { grid-column: 1 / -1; color: #b9ab98; font-size: 14px; padding: 10px; }
  .dzInfo { position: relative; border-radius: 14px; background: linear-gradient(180deg, #2e2230, #1a1420); box-shadow: inset 0 0 0 2px #4a3a30; padding: 14px; display: flex; flex-direction: column; gap: 8px; min-height: 0; }
  .dzInfo .rz { font-size: 13px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
  .dzInfo h3 { margin: 0; font: 900 22px 'Cinzel', serif; line-height: 1.15; }
  .dzInfo .big { width: 92px; height: 92px; align-self: center; border-radius: 16px; position: relative; } .dzInfo .big i { position: absolute; inset: 14%; background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; filter: drop-shadow(0 6px 4px rgba(0,0,0,.6)); }
  .dzInfo .dato { display: flex; justify-content: space-between; font-size: 14px; color: #c9bfae; border-bottom: 1px solid rgba(255,255,255,.07); padding: 2px 0; } .dzInfo .dato b { color: #fff; }
  .dzInfo .acc { margin-top: auto; display: flex; flex-direction: column; gap: 8px; }
  .dzB { display: flex; align-items: center; justify-content: center; gap: 10px; height: 46px; padding: 0 22px; font: 900 18px 'Cinzel', serif; letter-spacing: 1px; color: #fff; cursor: pointer; text-shadow: 0 2px 0 rgba(0,0,40,.5);
    background: linear-gradient(180deg, #3d8bff, #1c4fb4); box-shadow: inset 0 3px 0 rgba(190,220,255,.7); clip-path: polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0 50%); }
  .dzB.ve { background: linear-gradient(180deg, #5fd36a, #238a3a); box-shadow: inset 0 3px 0 #b8ffb0; }
  .dzB.na { background: linear-gradient(180deg, #ffb24a, #d9641a); box-shadow: inset 0 3px 0 #ffe0a0; }
  .dzB.off { filter: grayscale(.85) brightness(.6); cursor: default; } .dzB:active { transform: translateY(2px); }

  /* ═══ FABRICAR: lista | pergamino | ficha ═══ */
  .dzFab { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr) minmax(0, .9fr); gap: 14px; height: 100%; }
  .dzLista { overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding: 2px 6px 2px 2px; scrollbar-width: thin; scrollbar-color: #8a5a2a #17121a; }
  .dzIt { position: relative; flex: none; min-height: 62px; padding: 8px 64px 24px 14px; cursor: pointer; border-radius: 10px; background: linear-gradient(180deg, #2a2a3a, #1c1c28); box-shadow: inset 0 0 0 2px #3e4258; }
  .dzIt .n { font: 900 16px 'Cinzel', serif; color: #f2ebe0; line-height: 1.1; }
  .dzIt .ic { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 8px; }
  .dzIt .ic i { position: absolute; inset: 12%; background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; }
  .dzIt .tg { position: absolute; left: 0; bottom: 0; padding: 2px 22px 2px 12px; font-size: 11px; font-weight: 800; color: #fff; background: #2f7fd0; border-radius: 0 0 0 10px; clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%); }
  .dzIt.no { opacity: .78; } .dzIt.no .tg { background: #b0402a; }
  .dzIt.sel { background: linear-gradient(180deg, #6a2e22, #3a1a14); box-shadow: inset 0 0 0 2px #e6a85a, 0 0 16px rgba(255,140,60,.4); }
  .dzCentro { display: flex; flex-direction: column; gap: 10px; min-height: 0; }
  .dzPapel { position: relative; flex: 1; min-height: 0; margin: 14px 8px 4px; background: linear-gradient(180deg, #f6ead0, #ead7b0); border-radius: 4px; box-shadow: 0 14px 28px rgba(0,0,0,.5), inset 0 0 50px rgba(150,110,60,.35); transform: rotate(-1.2deg); }
  .dzPapel::before, .dzPapel::after { content: ''; position: absolute; left: -10px; right: -10px; height: 24px; border-radius: 14px; background: linear-gradient(180deg, #e4cfa4, #c9ae7c); box-shadow: 0 4px 8px rgba(0,0,0,.25); }
  .dzPapel::before { top: -13px; } .dzPapel::after { bottom: -13px; }
  .dzPapel svg { position: absolute; inset: 8% 6%; width: 88%; height: 84%; }
  .dzPapel .dib { position: absolute; left: 50%; top: 48%; width: 46%; aspect-ratio: 1; transform: translate(-50%, -50%) rotate(-8deg); background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; filter: sepia(1) saturate(2.2) hue-rotate(185deg) brightness(.75) contrast(1.3); opacity: .82; mix-blend-mode: multiply; }
  .dzMats { border-radius: 12px; background: rgba(10,8,14,.6); box-shadow: inset 0 0 0 2px #3a2c2a; padding: 8px 10px 10px; text-align: center; }
  .dzMats h5 { margin: 0 0 4px; font: 900 15px 'Cinzel', serif; color: #ffcf6a; }
  .dzMats .fila2 { display: flex; justify-content: center; gap: 18px; flex-wrap: wrap; }
  .dzMat .c { font-size: 16px; font-weight: 800; color: #ff8f7a; } .dzMat .c.ok { color: #9be58a; }
  .dzMat .ic { width: 40px; height: 40px; margin: 2px auto; background-size: 30px; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; border-radius: 50%; background-color: rgba(255,200,120,.12); }
  .dzMat .nm { font-size: 12px; color: #cfc4b2; }
  .dzFicha .dzMats { display: none; }
  /* teléfono acostado: sin la columna del medio */
  @media (max-height: 560px) {
    .dzBolsa { grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); height: calc(100% - 44px); } .dzPj { display: none; }
    .dzChips { margin: 2px 0 6px; gap: 6px; } .dzChip { font-size: 13px; padding: 2px 10px 2px 4px; } .dzChip i, .dzChip svg { width: 22px; height: 22px; }
    .dzGrid { grid-template-columns: repeat(auto-fill, minmax(50px, 1fr)); grid-auto-rows: 50px; gap: 7px; padding: 8px; }
    .dzInfo { padding: 10px; gap: 4px; } .dzInfo h3 { font-size: 17px; } .dzInfo .big { width: 60px; height: 60px; } .dzB { height: 38px; font-size: 15px; } .dzInfo .acc { flex-direction: row; } .dzInfo .acc .dzB { flex: 1; padding: 0 8px; }
    .dzFab { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 10px; } .dzCentro { display: none; } .dzFicha .dzMats { display: block; }
    .dzIt { min-height: 50px; padding: 6px 56px 20px 10px; } .dzIt .n { font-size: 14px; } .dzIt .ic { width: 36px; height: 36px; }
    .dzCartel { top: -26px; padding: 5px 44px; }
    .ventana::before, .ventana::after { display: none; } .ventana .vCuerpo, .ventana .vPie, .ventana .vCab { margin: 0 10px; }
  }
`; document.head.appendChild(st); }

// ─── rareza de cada cosa (por su nombre y material) ───
const dzRareza = id => { const k = (Object.keys(I).find(x => I[x] === id) || '') + ' ' + nom(id).toLowerCase();
  if (/_E\b|encantad|corona|cetro|estelar|lanza de luz|cuerno|n[uú]cleo|oro\b|dorad|ORO/.test(k)) return 4;
  if (/cristal|poci[oó]n|POCION|CRISTAL|rub[ií]|perla|ballesta|tridente|alas|llave/.test(k)) return 3;
  if (/hierro|HIERRO|arco|escudo|hacha|jade|cobre|diamante|br[uú]jula|mapa/.test(k)) return 2;
  if (typeof esComida === 'function' && esComida(id)) return 1;
  if (/semilla|trigo|zanahoria|papa|manzana|pescado|miel/.test(k)) return 1;
  return 0; };
const dzBg = id => `background-image:url(${icono(id)})`;
const dzTipo = id => { const it = ITEM[id] || {}; if (it.pico) return TR('dzHerr'); if (it.espada) return TR('dzArma'); if (it.armadura !== undefined) return TR('dzArmad'); if (/poci/i.test(nom(id))) return TR('dzPocion'); if (typeof esComida === 'function' && esComida(id)) return TR('dzComida'); if (typeof esBloque === 'function' && esBloque(id)) return TR('dzBloque'); return TR('dzObjeto'); };
const DZ_CORAZON = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 5.3 3.2 1.7-1.9 3.1-3.2 5.3-3.2 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill="#ff4a5f"/></svg>';
const DZ_SIL = '<svg class="sil" viewBox="0 0 160 300"><defs><linearGradient id="dzSg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e3248"/><stop offset="1" stop-color="#18121e"/></linearGradient></defs><g fill="url(#dzSg)"><rect x="50" y="10" width="60" height="60" rx="4"/><rect x="40" y="76" width="80" height="96" rx="4"/><rect x="12" y="78" width="26" height="90" rx="4"/><rect x="122" y="78" width="26" height="90" rx="4"/><rect x="42" y="176" width="36" height="110" rx="4"/><rect x="82" y="176" width="36" height="110" rx="4"/></g></svg>';

let dzSelB = 0, dzSel = -1;
function dzEquipo() {
  const a = (typeof armaduraDe === 'function') ? armaduraDe() : [0, 0, 0, 0];
  const mejor = (ids) => ids.filter(id => (inv[id] || 0) > 0).pop() || 0;
  const arma = mejor([I.ESP1, I.ESP2, I.ESP3, I.ESP4, I.ESP_E].filter(Boolean)), herr = mejor([I.PICO1, I.PICO2, I.PICO3, I.PICO4, I.PICO_E].filter(Boolean));
  const escudo = (inv[2115] || 0) > 0 ? 2115 : 0, alas = I.ALAS && (inv[I.ALAS] || 0) > 0 ? I.ALAS : 0;
  const ph = [I.CASCO_H || 304, 305, 306, 307];
  return { izq: [[a[0], 'dzCasco', 304], [a[1], 'dzPechera', 305], [a[2], 'dzGrebas', 306], [a[3], 'dzBotas', 307]], der: [[arma, 'dzArmaS', I.ESP3], [escudo, 'dzEscudo', 2115], [herr, 'dzHerrS', I.PICO3], [alas, 'dzAlas', I.ALAS || 374]] };
}
const dzEqHTML = ([id, k, ph]) => `<div class="dzEq"><div class="dzEqB ${id ? 'dzR' + dzRareza(id) : 'vacio'}"${id ? ` data-dzb="${id}"` : ''}><i style="${dzBg(id || ph)}"></i></div><span>${TR(k)}</span></div>`;
function dzBolsaHTML() {
  const ids = Object.keys(inv).map(Number).filter(id => inv[id] > 0).sort((x, y) => dzRareza(y) - dzRareza(x) || x - y);
  if (!ids.includes(dzSelB)) dzSelB = ids[0] || 0;
  const eq = dzEquipo(), dia = typeof diaN === 'number' ? diaN : Math.floor((typeof tiempo === 'number' ? tiempo : 0) / (typeof CICLO === 'number' ? CICLO : 300)) + 1;
  const chips = `<div class="dzChips"><div class="dzChip v">${DZ_CORAZON}${Math.ceil(typeof vida === 'number' ? vida : 20)} / 20 ${TR('dzVida')}</div><div class="dzChip o"><i style="${dzBg(I.ORO)}"></i>${inv[I.ORO] || 0} ${TR('dzOro')}</div><div class="dzChip c"><i style="${dzBg(I.CRISTAL)}"></i>${inv[I.CRISTAL] || 0} ${TR('dzCrist')}</div><div class="dzChip d"><i style="${dzBg(I.ALAS || I.CRISTAL)}"></i>${TR('dzDia')} ${dia}</div></div>`;
  const grid = ids.length ? ids.map(id => `<div class="dzCel dzR${dzRareza(id)}${id === dzSelB ? ' sel' : ''}" data-dzb="${id}"><i style="${dzBg(id)}"></i>${inv[id] > 1 ? `<b>${inv[id]}</b>` : ''}</div>`).join('') : `<div class="dzVacia">${TR('dzVacia')}</div>`;
  let info = `<div class="dzInfo"><div class="rz" style="color:#b9ab98">${TR('dzElige')}</div></div>`;
  if (dzSelB) { const id = dzSelB, r = dzRareza(id), it = ITEM[id] || {}, poner = esBloque(id) || esComida(id) || id === I.SEMILLAS || id === I.TRIGO_I || (it && !it.pico && !it.espada && it.armadura === undefined);
    info = `<div class="dzInfo"><div class="rz dzTR${r}">${TR('dzR' + r)}</div><h3 class="dzTR${r}">${esc(nom(id))}</h3><div class="big dzR${r}"><i style="${dzBg(id)}"></i></div>
      <div class="dato">${TR('dzTipo')}<b>${dzTipo(id)}</b></div><div class="dato">${TR('dzTienes')}<b>${inv[id]}</b></div>${it.pico || it.espada ? `<div class="dato">${TR('dzNivel')}<b>${it.pico || it.espada} / 5</b></div>` : ''}
      <div class="acc">${it.armadura !== undefined ? `<div class="dzB ve" data-dzequipar="${id}"><span class="dzK">Enter</span>${TR('dzEquipar')}</div>` : ''}${esComida(id) ? `<div class="dzB ve" data-dzcomer="${id}"><span class="dzK">Enter</span>${TR('dzComer')}</div>` : ''}${poner ? `<div class="dzB" data-poner="${id}"><span class="dzK">B</span>${TR('dzBarra')}</div>` : ''}</div></div>`; }
  return chips + `<div class="dzBolsa"><div class="dzPj"><div class="col">${eq.izq.map(dzEqHTML).join('')}</div>${DZ_SIL}<div class="col">${eq.der.map(dzEqHTML).join('')}</div></div><div class="dzGrid" id="dzGrid">${grid}</div>${info}</div>`;
}
const dzCuantas = r => Math.min(...r[1].map(([id, n]) => Math.floor((inv[id] || 0) / n)));
function dzFabricarHTML() {
  const rs = RECETAS.slice().sort((a, b) => puedeHacer(b) - puedeHacer(a));
  if (dzSel < 0 || !RECETAS[dzSel]) dzSel = RECETAS.indexOf(rs[0]);
  const r = RECETAS[dzSel], id = r[0][0], ok = puedeHacer(r), cu = dzCuantas(r), it = ITEM[id] || {}, rz = dzRareza(id);
  const lista = rs.map(x => { const k = RECETAS.indexOf(x), p = puedeHacer(x); return `<div class="dzIt${p ? '' : ' no'}${k === dzSel ? ' sel' : ''}" data-fsel="${k}"><div class="n">${esc(nom(x[0][0]))}${x[0][1] > 1 ? ' ×' + x[0][1] : ''}</div><div class="ic dzR${dzRareza(x[0][0])}"><i style="${dzBg(x[0][0])}"></i></div><div class="tg">${TR(p ? 'dzPuede' : 'dzFalta')}</div></div>`; }).join('');
  const mats = `<div class="dzMats"><h5>${TR('dzMats')}</h5><div class="fila2">${r[1].map(([m, n]) => `<div class="dzMat"><div class="c${(inv[m] || 0) >= n ? ' ok' : ''}">${inv[m] || 0}/${n}</div><div class="ic" style="${dzBg(m)}"></div><div class="nm">${esc(nom(m))}</div></div>`).join('')}</div></div>`;
  return `<div class="dzFab"><div class="dzLista" id="dzLista">${lista}</div>
    <div class="dzCentro"><div class="dzPapel"><svg viewBox="0 0 410 520" fill="none" stroke="#3b3a8c" stroke-width="2" opacity=".5"><circle cx="205" cy="250" r="160" stroke-dasharray="6 8"/><rect x="70" y="115" width="270" height="270"/><line x1="205" y1="50" x2="205" y2="470"/><line x1="20" y1="250" x2="390" y2="250"/><path d="M40 480 h120 M40 495 h90 M250 480 h120 M260 495 h100 M30 40 h110 M30 55 h80 M280 40 h100 M300 55 h70"/><circle cx="330" cy="135" r="20"/><path d="M321 135 l7 7 l13 -16"/></svg><div class="dib" style="${dzBg(id)}"></div></div>${mats}</div>
    <div class="dzInfo dzFicha"><div class="rz dzTR${rz}">${TR('dzR' + rz)}</div><h3 class="dzTR${rz}">${esc(nom(id))}</h3><div class="big dzR${rz}"><i style="${dzBg(id)}"></i></div>
      <div class="dato">${TR('dzCant')}<b>${r[0][1]}</b></div><div class="dato">${TR('dzTipo')}<b>${dzTipo(id)}</b></div><div class="dato">${TR('dzTienes')}<b>${inv[id] || 0}</b></div>${it.pico || it.espada ? `<div class="dato">${TR('dzNivel')}<b>${it.pico || it.espada} / 5</b></div>` : ''}
      ${mats}
      <div class="acc"><div class="dzB na${ok ? '' : ' off'}" data-dzhacer="1"><span class="dzK">Enter</span>${TR('dzHacer')}</div><div class="dzB${cu >= 2 ? '' : ' off'}" data-dzhacer="5"><span class="dzK">F</span>${TR('dzHacer5')}</div></div></div></div>`;
}
{ const p0 = pintarPanel; pintarPanel = function () {
    const res = p0.apply(this, arguments);
    const v = document.querySelector('#panel .ventana'); if (!v) return res;
    const bolsaSup = panelTab === 'bolsa' && cofreAbierto === null && !creativo(), fab = panelTab === 'fabricar' && cofreAbierto === null, ancha = bolsaSup || fab;
    v.classList.add('dzGrande'); v.classList.toggle('dzAncha', ancha);
    // la ventana grande va sin el zoom general (así entra más) y ocupa casi toda la pantalla
    if (ancha) { v.style.zoom = innerHeight < 560 ? '.86' : '1'; const z = parseFloat(v.style.zoom); v.style.setProperty('width', Math.min(1240, innerWidth * .95) / z + 'px', 'important'); v.style.setProperty('height', (Math.min(780, innerHeight * .9 - 20)) / z + 'px', 'important'); }
    else { v.style.width = ''; v.style.height = ''; v.style.zoom = ''; }
    let c = v.querySelector('.dzCartel'); if (!c) { c = document.createElement('div'); c.className = 'dzCartel'; c.innerHTML = '<span></span>'; v.appendChild(c); }
    c.firstChild.textContent = TR(cofreAbierto !== null ? 'dzCofreT' : panelTab === 'fabricar' ? 'dzFabT' : 'dzBolsaT');
    const cab = $('pCab'); if (cab && !cab.querySelector('.dzK')) cab.insertAdjacentHTML('afterbegin', '<span class="dzK">Q</span>');
    if (fab) { const l = $('dzLista'), t = l ? l.scrollTop : 0; $('pCuerpo').innerHTML = dzFabricarHTML(); const l2 = $('dzLista'); if (l2) l2.scrollTop = t; }
    else if (bolsaSup) { const g = $('dzGrid'), t = g ? g.scrollTop : 0; $('pCuerpo').innerHTML = dzBolsaHTML(); const g2 = $('dzGrid'); if (g2) g2.scrollTop = t; }
    return res; }; }
const dzHacer = n => { const r = RECETAS[dzSel]; if (!r) return; let k = 0; while (k < n && puedeHacer(r)) { fabricar(r); k++; } pintarPanel(); };
$('panel').addEventListener('pointerdown', e => {
  let d;
  if (d = e.target.closest('[data-fsel]')) { e.stopPropagation(); dzSel = +d.dataset.fsel; pintarPanel(); return; }
  if (d = e.target.closest('[data-dzhacer]')) { e.stopPropagation(); if (!d.classList.contains('off')) dzHacer(+d.dataset.dzhacer); return; }
  if (d = e.target.closest('[data-dzb]')) { e.stopPropagation(); dzSelB = +d.dataset.dzb; pintarPanel(); return; }
  if (d = e.target.closest('[data-dzequipar]')) { e.stopPropagation(); if (typeof vestir === 'function') vestir(+d.dataset.dzequipar); pintarPanel(); return; }
  if (d = e.target.closest('[data-dzcomer]')) { e.stopPropagation(); if (typeof comer === 'function') comer(+d.dataset.dzcomer); pintarPanel(); return; }
}, true);
addEventListener('keydown', e => {
  if ($('panel').hidden) return;
  if (e.code === 'Escape') { cerrarPanel(); return; }
  if (e.code === 'KeyQ') { const t = [...document.querySelectorAll('#pCab .tab')]; if (t.length > 1) { const i = t.findIndex(x => x.classList.contains('on')); panelTab = t[(i + 1) % t.length].dataset.tab; pintarPanel(); } return; }
  const flechas = { ArrowDown: 1, ArrowUp: -1, ArrowRight: 1, ArrowLeft: -1 };
  if (panelTab === 'fabricar') {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') { e.preventDefault(); dzHacer(1); }
    else if (e.code === 'KeyF') { e.preventDefault(); dzHacer(5); }
    else if (e.code === 'ArrowDown' || e.code === 'ArrowUp') { e.preventDefault(); const it = [...document.querySelectorAll('.dzIt')], i = it.findIndex(x => x.classList.contains('sel')), j = Math.max(0, Math.min(it.length - 1, i + flechas[e.code])); if (it[j]) { dzSel = +it[j].dataset.fsel; pintarPanel(); const n = document.querySelector('.dzIt.sel'); if (n) n.scrollIntoView({ block: 'nearest' }); } }
  } else if (panelTab === 'bolsa' && !creativo()) {
    if (flechas[e.code]) { e.preventDefault(); const c = [...document.querySelectorAll('.dzCel')], i = c.findIndex(x => x.classList.contains('sel')), cols = Math.max(1, Math.round(($('dzGrid') || {}).clientWidth / 73) || 6), j = Math.max(0, Math.min(c.length - 1, i + (e.code.includes('Down') || e.code.includes('Up') ? cols : 1) * flechas[e.code])); if (c[j]) { dzSelB = +c[j].dataset.dzb; pintarPanel(); } }
    else if (e.code === 'Enter') { const b = document.querySelector('[data-dzequipar],[data-dzcomer]'); if (b) b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); }
    else if (e.code === 'KeyB') { const b = document.querySelector('.dzInfo [data-poner]'); if (b) b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); }
  }
});

// ═════════ CÁMARA DE CINE EN EL MENÚ ═════════
// En lugar de girar sobre sí misma, la cámara da una vuelta lenta alrededor del lugar, un poco más alta, mirando al centro,
// con un leve acercarse y alejarse. Solo mientras no estás jugando.
{ let cen = null, t0 = 0, ult = performance.now();
  const piso = (x, z) => { for (let y = 70; y > 0; y--) if (__b.get(Math.floor(x), y, Math.floor(z))) return y + 1; return 30; };
  const cuadro = ahora => { requestAnimationFrame(cuadro); const dt = Math.min(.05, (ahora - ult) / 1000); ult = ahora;
    if (typeof jugando === 'undefined' || jugando || !window.__b) { cen = null; return; }
    const J = __b.J;
    if (!cen) { const fx = J.x - Math.sin(J.yaw) * 18, fz = J.z - Math.cos(J.yaw) * 18; cen = { x: fx, z: fz, y: piso(fx, fz) }; t0 = 0; }
    t0 += dt; const ang = t0 * .045, r = 24 + Math.sin(t0 * .13) * 5, alto = 11 + Math.sin(t0 * .21) * 2.5;
    const x = cen.x + Math.sin(ang) * r, z = cen.z + Math.cos(ang) * r, y = Math.max(cen.y + alto, piso(x, z) + 3);
    J.x = x; J.z = z; J.y = y - (typeof OJOS === 'number' ? OJOS : 1.6);
    J.yaw = Math.atan2(x - cen.x, z - cen.z); J.pitch = -Math.atan2(y - (cen.y + 2), r) * .9; };
  requestAnimationFrame(cuadro); }
