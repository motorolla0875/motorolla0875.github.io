'use strict';
// ═════════ ESTILO PROPIO DE BLOX: botones azules redondeados, letra Baloo 2, ventanas claras y barras de vida/hambre ═════════
// (la versión con el estilo anterior quedó guardada en la rama "blox-original" del repositorio)
{ const st = document.createElement('style'); st.textContent = `
  @font-face { font-family: 'Baloo 2'; font-weight: 600; font-display: swap; src: url(fonts/baloo-2-latin-600-normal.woff2) format('woff2'); }
  @font-face { font-family: 'Baloo 2'; font-weight: 700 900; font-display: swap; src: url(fonts/baloo-2-latin-800-normal.woff2) format('woff2'); }
  html, body { font-family: 'Baloo 2', 'Trebuchet MS', sans-serif; font-weight: 700; }
  .sombra { text-shadow: 0 2px 0 rgba(13,21,61,.85); }
  .capa { background-color: #13205a; background-image: linear-gradient(#24378f, #0d153d); }
  .capa.trans { background-color: rgba(10,16,48,.62); }
  .titulo { font-weight: 800; font-style: italic; color: #ffe14a; letter-spacing: 1px; text-shadow: 3px 3px 0 #1b2a6b, 6px 6px 0 #0d153d; line-height: 1.05; }
  .sub { color: #fff; transform: none; text-shadow: 0 2px 0 #0d153d; font-size: 16px; }
  .texto { color: #e8ecff; text-shadow: 0 2px 0 #0d153d; font-size: 14px; }
  .btn { font: 800 18px 'Baloo 2', 'Trebuchet MS', sans-serif; border-radius: 12px; border: 3px solid #0d153d; background: linear-gradient(#4a7cff, #2a4fd0); box-shadow: 0 4px 0 #0d153d, inset 0 2px 0 rgba(255,255,255,.35); text-shadow: 0 2px 0 #0d153d; padding: 8px 0 6px; }
  .btn small { color: #dfe6ff; font-weight: 600; }
  .btn:active { background: linear-gradient(#ffe14a, #f5b82a); color: #1b2a6b; text-shadow: none; transform: translateY(2px); box-shadow: 0 2px 0 #0d153d; }
  .btn.rojo { background: linear-gradient(#ff6b7d, #d8384e); }
  #listaMundos { background: rgba(13,21,61,.55); border: 3px solid #0d153d; border-radius: 14px; }
  .mundoFila .info small { color: #b8c4ff; }
  #aviso { color: #ffe14a; text-shadow: 0 3px 0 #0d153d, 0 0 12px rgba(13,21,61,.6); font-weight: 800; }
  #mision, #dia, #guia, #planBar, #crono, #mecBar { border-radius: 10px; background: rgba(13,21,61,.6); }
  #mision small { color: #ffe14a; }
  #barra { border-radius: 14px; background: rgba(13,21,61,.6); border: 2px solid #0d153d; padding: 3px; gap: 3px; }
  .slot { border: 2px solid rgba(255,255,255,.45); border-radius: 9px; background-color: rgba(255,255,255,.16); }
  .slot b { text-shadow: 0 2px 0 #0d153d; }
  #barra .slot.sel { border: 3px solid #ffe14a; outline: none; background-color: rgba(255,225,74,.28); }
  .boton, .bChico { border-radius: 14px; background: rgba(13,21,61,.45); border: 2px solid rgba(255,255,255,.6); }
  .boton.on, .bChico.on { background: rgba(74,124,255,.75); }
  #joy, #joy i { border-radius: 50%; }
  .ventana, .mVentana { background: #f2f5ff; border: 3px solid #0d153d; border-radius: 16px; box-shadow: 0 6px 0 rgba(0,0,0,.35); color: #1b2a6b; overflow: hidden; }
  .vCab .tab { border-radius: 10px; border: 2px solid #0d153d; background: #4a7cff; text-shadow: 0 2px 0 #0d153d; }
  .vCab .tab.on { background: #ffe14a; color: #1b2a6b; text-shadow: none; }
  .vCab .cerrar { border-radius: 10px; border: 2px solid #0d153d; background: #e0475a; }
  .ventana .slot, .mVentana .slot { background-color: #dfe5ff; border: 2px solid #9aa8e0; }
  .vPie { border-top: 2px solid #c9d0ee; }
  .vPie .grilla .slot.sel { border: 3px solid #f5b82a; outline: none; }
  .receta, .fila, .plano { border-bottom: 2px solid #d5dbf3; }
  .receta .nom small, .fila .nom small, .plano .nom small { color: #5a6aa8; }
  .receta .hacer, .mb, #guia .gb, #planBar .gb { border-radius: 9px; border: 2px solid #0d153d; background: #4a7cff; text-shadow: 0 2px 0 #0d153d; }
  .receta .hacer, .mb.verde, #guia .gb, #planBar .gb { background: #2fb65a; }
  .receta.no .hacer { background: #9aa3c4; }
  .mb.rojo, #guia .gb.rojo, #planBar .gb.rojo { background: #e0475a; } .mb.on { background: #f5b82a; } #guia .gb.gris { background: #7c86ad; }
  .opcG div, .ajOpc div { border-radius: 8px; border: 2px solid #0d153d; background: #7c86ad; }
  .opcG div.on, .ajOpc div.on { background: #2fb65a; }
  .ajFila { border-radius: 12px; background: rgba(13,21,61,.5); border: 2px solid #0d153d; }
  .ajFila input { accent-color: #ffe14a; }
  .campo, .ventana select, .mVentana select, #cartelTxt, #mecMsg { border: 2px solid #0d153d; border-radius: 9px; }
  #verCartel .tablero { border-radius: 12px; }
  .paleta div { border-radius: 5px; }
  #mapaCv { border-radius: 12px; border-color: #0d153d; }
  /* vida y hambre: barras en lugar de corazones y muslos */
  #vida, #hambre { gap: 0; }
  .barraHud { display: flex; align-items: center; gap: 4px; background: rgba(13,21,61,.6); border-radius: 10px; padding: 2px 8px 2px 4px; }
  .barraHud svg { width: 18px; height: 18px; flex: none; }
  .barraHud .fondo { width: 110px; height: 10px; border-radius: 6px; background: rgba(255,255,255,.18); overflow: hidden; }
  .barraHud .fondo i { display: block; height: 100%; border-radius: 6px; transition: width .25s; }
  .barraHud b { font-size: 12px; min-width: 18px; text-align: right; }
`; document.head.appendChild(st); }

// barras de vida y hambre
const SVG_CORAZON = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 5.3 3.2 1.7-1.9 3.1-3.2 5.3-3.2 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill="#ff4a5f" stroke="#0d153d" stroke-width="2"/></svg>';
const SVG_MANZANA = '<svg viewBox="0 0 24 24"><path d="M12 7c-1.5-1.2-5.8-1.6-7.3 2.3-1.4 3.6.6 8.7 3.3 10.6 1.4 1 2.6.6 4 .1 1.4.5 2.6.9 4-.1 2.7-1.9 4.7-7 3.3-10.6C17.8 5.4 13.5 5.8 12 7z" fill="#ffb02e" stroke="#0d153d" stroke-width="2"/><path d="M12 7c0-2 1-3.5 3-4" fill="none" stroke="#0d153d" stroke-width="2" stroke-linecap="round"/></svg>';
const barraHud = (svg, v, color) => `<div class="barraHud sombra">${svg}<div class="fondo"><i style="width:${Math.max(0, Math.min(100, v / 20 * 100))}%;background:${color}"></i></div><b>${Math.ceil(v)}</b></div>`;
pintarVida = function () { $('vida').hidden = creativo(); if (creativo()) return; $('vida').innerHTML = barraHud(SVG_CORAZON, vida, vida > 6 ? '#ff4a5f' : '#ff2a2a'); };
pintarHambre = function () { $('hambre').hidden = creativo(); if (creativo()) return; const v = Math.ceil(hambre); if (v === hambrePintado) return; hambrePintado = v; $('hambre').innerHTML = barraHud(SVG_MANZANA, v, '#ffb02e'); };
if (document.fonts && document.fonts.load) { document.fonts.load('800 20px "Baloo 2"'); document.fonts.load('600 20px "Baloo 2"'); }
