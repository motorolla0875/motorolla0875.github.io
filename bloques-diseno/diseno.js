'use strict';
// ═════════ DISEÑO NUEVO DE PRUEBA (estilo "aventura"): paneles verde azulado con esquinas cortadas,
// naranja para lo elegido y lo principal, pergamino para fabricar y teclas dibujadas en la compu.
// Se carga SOLO en /bloques-diseno/ (encima del estilo actual). El juego de /bloques/ no cambia.

Object.assign(TX.es, { dzPuede: 'Se puede fabricar', dzFalta: 'Te faltan materiales', dzMats: 'Materiales necesarios', dzCant: 'Cantidad', dzTienes: 'Tienes', dzTipo: 'Tipo', dzRompe: 'Nivel', dzHerr: 'Herramienta', dzArma: 'Arma', dzComida: 'Comida', dzBloque: 'Bloque', dzObjeto: 'Objeto', dzHacer: 'Fabricar', dzHacer5: 'Fabricar 5', dzCerrar: 'Cerrar', dzInfo: 'INFO', dzNivel: n => n });
Object.assign(TX.en, { dzPuede: 'Ready to craft', dzFalta: 'Missing materials', dzMats: 'Required materials', dzCant: 'Amount', dzTienes: 'You have', dzTipo: 'Type', dzRompe: 'Level', dzHerr: 'Tool', dzArma: 'Weapon', dzComida: 'Food', dzBloque: 'Block', dzObjeto: 'Item', dzHacer: 'Craft', dzHacer5: 'Craft 5', dzCerrar: 'Close', dzInfo: 'INFO' });
Object.assign(TX.pt, { dzPuede: 'Pode fabricar', dzFalta: 'Faltam materiais', dzMats: 'Materiais necessários', dzCant: 'Quantidade', dzTienes: 'Você tem', dzTipo: 'Tipo', dzRompe: 'Nível', dzHerr: 'Ferramenta', dzArma: 'Arma', dzComida: 'Comida', dzBloque: 'Bloco', dzObjeto: 'Objeto', dzHacer: 'Fabricar', dzHacer5: 'Fabricar 5', dzCerrar: 'Fechar', dzInfo: 'INFO' });

{ const st = document.createElement('style'); st.textContent = `
  :root { --dzT1:#2a7a80; --dzT2:#21656b; --dzT3:#14454f; --dzT4:#0f3a43; --dzT5:#0a252b; --dzL:#5fb7b0; --dzO1:#ff9a3c; --dzO2:#e8711d; --dzOL:#ffd08a; --dzC:#f3ead8; --dzR1:#d8443a; --dzR2:#b02d28; }
  .dzCorte, .btn, .ventana, .mVentana, #listaMundos, .vCab .tab, .vCab .cerrar, .ajFila, .boton, .bChico, #barra, .barraHud, #mision, #dia, #guia, #planBar, .receta .hacer, .mb, #guia .gb, #planBar .gb { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }
  .titulo { color: var(--dzC) !important; text-shadow: 3px 3px 0 var(--dzT3), 6px 6px 0 var(--dzT5) !important; }
  .lema, .sub, .texto { text-shadow: 0 2px 0 var(--dzT5) !important; }
  body.enMenu .capa:not(#grabando):not(#precarga) { background-color: rgba(6,30,36,.35) !important; background-image: radial-gradient(ellipse at 50% 40%, rgba(20,69,79,0), rgba(6,26,32,.7)) !important; }
  .capa { background-color: #0f3a43; background-image: radial-gradient(ellipse at 50% 40%, #1d5d66, #071c22); }
  .capa.trans { background: radial-gradient(ellipse at 50% 45%, rgba(20,60,70,.45), rgba(6,22,30,.86)) !important; }
  /* botones */
  .btn { border: none !important; border-radius: 0 !important; color: #f2fbf8 !important; background: linear-gradient(180deg, var(--dzT1), var(--dzT2)) !important; box-shadow: inset 0 3px 0 var(--dzL), inset 0 -4px 0 rgba(0,0,0,.25) !important; text-shadow: 0 2px 0 rgba(0,0,0,.35) !important; letter-spacing: .5px; }
  .btn small { color: #bfe3dc !important; }
  #bJugar, #bTiendaHome, #bTiendaPausa, #bSeguir, #bNuevo, .btn.dzPri { background: linear-gradient(180deg, var(--dzO1), var(--dzO2)) !important; color: #fff !important; box-shadow: inset 0 3px 0 var(--dzOL), inset 0 -4px 0 rgba(120,40,0,.3) !important; text-shadow: 0 2px 0 rgba(90,30,0,.45) !important; }
  .btn:active, #bJugar:active, #bTiendaHome:active, #bTiendaPausa:active { transform: translateY(2px); filter: brightness(1.15); }
  .btn.rojo { background: linear-gradient(180deg, var(--dzR1), var(--dzR2)) !important; box-shadow: inset 0 3px 0 #ff8a7a !important; }
  @media (hover: hover) { .btn:hover { filter: brightness(1.12); } }
  #listaMundos { background: rgba(10,37,43,.82) !important; border: none !important; border-radius: 0 !important; box-shadow: inset 0 3px 0 var(--dzL); }
  .mundoFila .info small { color: #9fcfc8 !important; }
  /* ventanas */
  .ventana, .mVentana { background: linear-gradient(180deg, var(--dzT3), var(--dzT4)) !important; border: none !important; border-radius: 0 !important; box-shadow: inset 0 3px 0 var(--dzL), 0 18px 40px rgba(0,0,0,.5) !important; color: #e6f4f1 !important; }
  .ventana h4, .mVentana h4 { color: var(--dzOL); letter-spacing: .5px; }
  .vCab .tab { border: none !important; border-radius: 0 !important; background: var(--dzT1) !important; color: #cfeae5 !important; padding: 6px 18px !important; font-size: 15px !important; letter-spacing: 1px; text-transform: uppercase; }
  .vCab .tab.on { background: linear-gradient(180deg, var(--dzO1), var(--dzO2)) !important; color: #fff !important; }
  .vCab .cerrar { border: none !important; border-radius: 0 !important; background: linear-gradient(180deg, var(--dzR1), var(--dzR2)) !important; }
  .ventana .slot, .mVentana .slot { background-color: var(--dzT5) !important; border: 2px solid #2d6b70 !important; border-radius: 6px !important; }
  .vPie { border-top: 2px solid #2d6b70 !important; } .vPie small { color: #9fcfc8; }
  .vPie .grilla .slot.sel { border: 3px solid var(--dzO1) !important; }
  .receta, .fila, .plano { border-bottom: 2px solid #22555c !important; } .receta .nom small, .fila .nom small, .plano .nom small { color: #9fcfc8 !important; }
  .receta .hacer, .mb, #guia .gb, #planBar .gb { border: none !important; border-radius: 0 !important; background: var(--dzT1) !important; }
  .receta .hacer, .mb.verde, #guia .gb, #planBar .gb { background: linear-gradient(180deg, var(--dzO1), var(--dzO2)) !important; }
  .mb.rojo, #guia .gb.rojo, #planBar .gb.rojo { background: var(--dzR1) !important; }
  .catTabs .ct { background: var(--dzT2) !important; border-color: var(--dzT1) !important; color: #e6f4f1 !important; border-radius: 0 !important; }
  .catTabs .ct.on { background: var(--dzO2) !important; border-color: var(--dzOL) !important; color: #fff !important; }
  #pCuerpo .elegido { color: var(--dzOL) !important; }
  .opcG div, .ajOpc div { border: none !important; border-radius: 0 !important; background: var(--dzT2) !important; }
  .opcG div.on, .ajOpc div.on { background: var(--dzO2) !important; }
  .ajFila { background: rgba(10,37,43,.8) !important; border: none !important; border-radius: 0 !important; box-shadow: inset 0 2px 0 #2d6b70; }
  .ajFila input { accent-color: var(--dzO1) !important; }
  /* juego */
  #barra { background: rgba(10,37,43,.78) !important; border: none !important; border-radius: 0 !important; box-shadow: inset 0 2px 0 var(--dzL); }
  .slot { border-radius: 6px !important; border-color: rgba(159,207,200,.45) !important; background-color: rgba(10,37,43,.55) !important; }
  #barra .slot.sel { border: 3px solid var(--dzO1) !important; background-color: rgba(255,154,60,.25) !important; }
  .boton, .bChico { border-radius: 0 !important; background: rgba(20,69,79,.7) !important; border: none !important; box-shadow: inset 0 2px 0 var(--dzL); }
  .boton.on, .bChico.on { background: var(--dzO2) !important; }
  .barraHud { background: rgba(10,37,43,.78) !important; border-radius: 0 !important; }
  #mision, #dia, #guia, #planBar, #crono, #mecBar { background: rgba(10,37,43,.78) !important; border-radius: 0 !important; }
  #mision small { color: var(--dzOL) !important; }
  #aviso { color: var(--dzOL) !important; text-shadow: 0 3px 0 var(--dzT5), 0 0 14px rgba(6,26,32,.7) !important; }
  #logroToast { background: linear-gradient(180deg, var(--dzT3), var(--dzT4)) !important; border: none !important; border-radius: 0 !important; color: #eaf6f2 !important; box-shadow: inset 0 3px 0 var(--dzL), 0 8px 20px rgba(0,0,0,.4) !important; clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }
  #logroToast small { color: var(--dzOL) !important; }
  #calChip { background: rgba(10,37,43,.85) !important; border: none !important; border-radius: 0 !important; box-shadow: inset 0 2px 0 var(--dzL) !important; clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); }
  #calChip b { color: var(--dzO1) !important; }
  #bMapas { background: linear-gradient(180deg, #3f8f8a, #2a6f6c) !important; }
  /* teclas dibujadas: solo con mouse y teclado */
  .dzK { display: none; align-items: center; justify-content: center; min-width: 26px; height: 26px; padding: 0 6px; border-radius: 6px; background: var(--dzC); color: #1c3a40; font-weight: 800; font-size: 14px; box-shadow: 0 3px 0 #9c8d70; flex: none; }
  @media (hover: hover) and (pointer: fine) { .dzK { display: inline-flex; } }

  /* ═══ FABRICAR: lista | pergamino | ficha ═══ */
  .ventana.dzAncha { max-height: none !important; max-width: none !important; }
  .ventana.dzAncha .vPie { display: none; }
  .ventana.dzAncha .vCuerpo { overflow: hidden !important; padding: 6px 12px 12px !important; }
  .dzFab { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr) minmax(0, .95fr); gap: 16px; height: 100%; }
  .dzLista { overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 6px; scrollbar-width: thin; scrollbar-color: var(--dzO2) var(--dzT5); }
  .dzIt { position: relative; flex: none; min-height: 64px; padding: 8px 64px 26px 14px; cursor: pointer; background: linear-gradient(180deg, var(--dzT1), var(--dzT2)); box-shadow: inset 0 3px 0 var(--dzL); clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%); }
  .dzIt .n { font-weight: 800; font-size: 17px; color: #f2fbf8; text-shadow: 0 2px 0 rgba(0,0,0,.3); line-height: 1.1; }
  .dzIt .ic { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 42px; height: 42px; background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; filter: drop-shadow(0 3px 2px rgba(0,0,0,.45)); }
  .dzIt .tg { position: absolute; left: 0; bottom: 0; padding: 2px 26px 2px 12px; font-size: 12px; font-weight: 800; color: #fff; background: #2f7fd0; clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 100%, 0 100%); }
  .dzIt.no { background: linear-gradient(180deg, #6b4a52, #57404a); box-shadow: inset 0 3px 0 #a07a80; } .dzIt.no .tg { background: #d9542b; }
  .dzIt.sel { background: linear-gradient(180deg, var(--dzO1), var(--dzO2)); box-shadow: inset 0 3px 0 var(--dzOL); }
  .dzCentro { display: flex; flex-direction: column; gap: 12px; min-height: 0; }
  .dzPapel { position: relative; flex: 1; min-height: 0; margin: 14px 8px 4px; background: linear-gradient(180deg, #f6ead0, #ead7b0); border-radius: 4px; box-shadow: 0 14px 28px rgba(0,0,0,.45), inset 0 0 50px rgba(150,110,60,.35); transform: rotate(-1.2deg); }
  .dzPapel::before, .dzPapel::after { content: ''; position: absolute; left: -10px; right: -10px; height: 26px; border-radius: 14px; background: linear-gradient(180deg, #e4cfa4, #c9ae7c); box-shadow: 0 4px 8px rgba(0,0,0,.25); }
  .dzPapel::before { top: -14px; } .dzPapel::after { bottom: -14px; }
  .dzPapel svg { position: absolute; inset: 8% 6%; width: 88%; height: 84%; }
  .dzPapel .dib { position: absolute; left: 50%; top: 48%; width: 46%; aspect-ratio: 1; transform: translate(-50%, -50%) rotate(-8deg); background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; filter: sepia(1) saturate(2.2) hue-rotate(185deg) brightness(.75) contrast(1.3); opacity: .82; mix-blend-mode: multiply; }
  .dzMats { background: rgba(6,26,32,.7); box-shadow: inset 0 3px 0 #2d6b70; padding: 8px 10px 10px; text-align: center; }
  .dzMats h5 { margin: 0 0 4px; font-size: 16px; font-weight: 800; color: #f6e3b8; }
  .dzMats .fila2 { display: flex; justify-content: center; gap: 22px; flex-wrap: wrap; }
  .dzMat .c { font-size: 16px; font-weight: 800; color: #ff8f7a; } .dzMat .c.ok { color: #9be58a; }
  .dzMat .ic { width: 38px; height: 38px; margin: 2px auto; background-size: 30px; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; border-radius: 50%; background-color: rgba(255,200,120,.12); }
  .dzMat .nm { font-size: 12px; color: #cfe8e2; }
  .dzFicha { position: relative; display: flex; flex-direction: column; background: rgba(6,26,32,.45); box-shadow: inset 0 3px 0 #2d6b70; padding: 52px 16px 14px; min-height: 0; }
  .dzCinta { position: absolute; right: -6px; top: 12px; padding: 4px 18px 4px 26px; font-size: 15px; font-weight: 800; letter-spacing: 1px; color: #ffe9d6; background: linear-gradient(180deg, var(--dzR1), var(--dzR2)); clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%); text-transform: uppercase; max-width: 92%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .dzTop { display: flex; align-items: center; gap: 14px; }
  .dzGrande { width: 96px; height: 96px; flex: none; background-size: 76px; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; filter: drop-shadow(0 6px 3px rgba(0,0,0,.5)); background-color: rgba(120,220,210,.08); border-radius: 18px; }
  .dzCant { flex: 1; text-align: center; font-weight: 800; color: #f6e3b8; font-size: 17px; } .dzCant b { display: block; font-size: 30px; color: #fff; }
  .dzDatos { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 14px; }
  .dzDatos div { background: rgba(255,255,255,.06); padding: 6px 10px; font-size: 13px; color: #cfe8e2; } .dzDatos b { display: block; font-size: 17px; color: #fff; }
  .dzBotones { margin-top: auto; display: flex; flex-direction: column; gap: 10px; padding-top: 12px; }
  .dzB { display: flex; align-items: center; justify-content: center; gap: 10px; height: 52px; font-weight: 800; font-size: 20px; color: #fff; cursor: pointer; background: linear-gradient(180deg, var(--dzT1), var(--dzT2)); box-shadow: inset 0 3px 0 var(--dzL); clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); text-shadow: 0 2px 0 rgba(0,0,0,.3); }
  .dzB.pri { background: linear-gradient(180deg, var(--dzO1), var(--dzO2)); box-shadow: inset 0 3px 0 var(--dzOL); }
  .dzB.off { filter: grayscale(.8) brightness(.7); cursor: default; }
  .dzB:active { transform: translateY(2px); }
  .vCab .dzK { margin: 0 2px; }
  /* teléfono acostado (poca altura): lista | ficha, sin pergamino grande */
  @media (max-height: 560px) {
    .dzFab { grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); gap: 10px; }
    .dzCentro { display: none; }
    .dzIt { min-height: 52px; padding: 6px 56px 22px 10px; } .dzIt .n { font-size: 15px; } .dzIt .ic { width: 34px; height: 34px; }
    .dzFicha { padding: 40px 12px 10px; } .dzGrande { width: 64px; height: 64px; background-size: 52px; }
    .dzDatos { margin-top: 8px; gap: 6px; } .dzDatos div { padding: 4px 8px; font-size: 11px; } .dzDatos b { font-size: 14px; }
    .dzFicha .dzMats { display: block !important; margin-top: 8px; padding: 6px; } .dzMats h5 { font-size: 13px; } .dzMat .ic { width: 30px; height: 30px; background-size: 24px; }
    .dzB { height: 42px; font-size: 16px; } .dzBotones { flex-direction: row; gap: 8px; } .dzBotones .dzB { flex: 1; }
  }
  .dzFicha .dzMats { display: none; }
`; document.head.appendChild(st); }

// ─── fabricar con lista, pergamino y ficha ───
let dzSel = -1;
const dzTipo = id => { const it = ITEM[id]; if (it && it.pico) return TR('dzHerr'); if (it && it.espada) return TR('dzArma'); if (typeof esComida === 'function' && esComida(id)) return TR('dzComida'); if (typeof esBloque === 'function' && esBloque(id)) return TR('dzBloque'); return TR('dzObjeto'); };
const dzCuantas = r => Math.min(...r[1].map(([id, n]) => Math.floor((inv[id] || 0) / n)));
const dzBg = id => `background-image:url(${icono(id)})`;
function dzFabricarHTML() {
  const rs = RECETAS.slice().sort((a, b) => puedeHacer(b) - puedeHacer(a));
  if (dzSel < 0 || !RECETAS[dzSel]) dzSel = RECETAS.indexOf(rs[0]);
  const r = RECETAS[dzSel], id = r[0][0], ok = puedeHacer(r), cu = dzCuantas(r), it = ITEM[id] || {};
  const lista = rs.map(x => { const k = RECETAS.indexOf(x), p = puedeHacer(x); return `<div class="dzIt${p ? '' : ' no'}${k === dzSel ? ' sel' : ''}" data-fsel="${k}"><div class="n">${esc(nom(x[0][0]))}${x[0][1] > 1 ? ' ×' + x[0][1] : ''}</div><div class="ic" style="${dzBg(x[0][0])}"></div><div class="tg">${TR(p ? 'dzPuede' : 'dzFalta')}</div></div>`; }).join('');
  const mats = `<div class="dzMats"><h5>${TR('dzMats')}</h5><div class="fila2">${r[1].map(([m, n]) => `<div class="dzMat"><div class="c${(inv[m] || 0) >= n ? ' ok' : ''}">${inv[m] || 0}/${n}</div><div class="ic" style="${dzBg(m)}"></div><div class="nm">${esc(nom(m))}</div></div>`).join('')}</div></div>`;
  const nivel = it.pico ? it.pico : it.espada ? it.espada : null;
  return `<div class="dzFab"><div class="dzLista" id="dzLista">${lista}</div>
    <div class="dzCentro"><div class="dzPapel"><svg viewBox="0 0 410 520" fill="none" stroke="#3b3a8c" stroke-width="2" opacity=".5"><circle cx="205" cy="250" r="160" stroke-dasharray="6 8"/><rect x="70" y="115" width="270" height="270"/><line x1="205" y1="50" x2="205" y2="470"/><line x1="20" y1="250" x2="390" y2="250"/><path d="M40 480 h120 M40 495 h90 M250 480 h120 M260 495 h100 M30 40 h110 M30 55 h80 M280 40 h100 M300 55 h70"/><circle cx="330" cy="135" r="20"/><path d="M321 135 l7 7 l13 -16"/></svg><div class="dib" style="${dzBg(id)}"></div></div>${mats}</div>
    <div class="dzFicha"><div class="dzCinta">${esc(nom(id))}</div>
      <div class="dzTop"><div class="dzGrande" style="${dzBg(id)}"></div><div class="dzCant">${TR('dzCant')}<b>${r[0][1]}</b></div></div>
      <div class="dzDatos"><div>${TR('dzTipo')}<b>${dzTipo(id)}</b></div><div>${TR('dzTienes')}<b>${inv[id] || 0}</b></div>${nivel ? `<div>${TR('dzRompe')}<b>${nivel} / 5</b></div>` : ''}</div>
      ${mats}
      <div class="dzBotones"><div class="dzB pri${ok ? '' : ' off'}" data-dzhacer="1"><span class="dzK">Enter</span>${TR('dzHacer')}</div><div class="dzB${cu >= 2 ? '' : ' off'}" data-dzhacer="5"><span class="dzK">F</span>${TR('dzHacer5')}</div></div>
    </div></div>`;
}
{ const p0 = pintarPanel; pintarPanel = function () {
    const r = p0.apply(this, arguments);
    const v = document.querySelector('#panel .ventana'), fab = panelTab === 'fabricar' && cofreAbierto === null;
    if (v) { v.classList.toggle('dzAncha', fab);
      // la ventana viene agrandada con zoom en pantallas grandes: el tamaño se calcula descontándolo
      if (fab) { const z = parseFloat(getComputedStyle(v).zoom) || 1; v.style.width = Math.min(1180, innerWidth * .97) / z + 'px'; v.style.height = Math.min(760, innerHeight * .94) / z + 'px'; }
      else { v.style.width = ''; v.style.height = ''; } }
    // teclas Q (cambiar pestaña) y E (cerrar) dibujadas en la cabecera
    const cab = $('pCab'); if (cab && !cab.querySelector('.dzK')) { cab.insertAdjacentHTML('afterbegin', '<span class="dzK">Q</span>'); const c = cab.querySelector('.cerrar'); if (c) c.insertAdjacentHTML('beforebegin', '<span class="dzK">E</span>'); }
    if (fab) { const lista = $('dzLista'), top = lista ? lista.scrollTop : 0; $('pCuerpo').innerHTML = dzFabricarHTML(); const l2 = $('dzLista'); if (l2) l2.scrollTop = top; }
    return r; }; }
const dzHacer = n => { const r = RECETAS[dzSel]; if (!r) return; let k = 0; while (k < n && puedeHacer(r)) { fabricar(r); k++; } pintarPanel(); };
$('panel').addEventListener('pointerdown', e => {
  const s = e.target.closest('[data-fsel]'); if (s) { e.stopPropagation(); dzSel = +s.dataset.fsel; son && son(520, .04, 'triangle', .06); pintarPanel(); return; }
  const h = e.target.closest('[data-dzhacer]'); if (h) { e.stopPropagation(); if (!h.classList.contains('off')) dzHacer(+h.dataset.dzhacer); return; }
}, true);
// teclado dentro de la ventana: flechas para elegir, Enter fabrica, F fabrica 5, Q cambia de pestaña, Esc cierra
addEventListener('keydown', e => {
  if ($('panel').hidden) return;
  if (e.code === 'Escape') { cerrarPanel(); return; }
  if (e.code === 'KeyQ') { const t = [...document.querySelectorAll('#pCab .tab')]; if (t.length > 1) { const i = t.findIndex(x => x.classList.contains('on')); panelTab = t[(i + 1) % t.length].dataset.tab; pintarPanel(); } return; }
  if (panelTab !== 'fabricar') return;
  if (e.code === 'Enter' || e.code === 'NumpadEnter') { e.preventDefault(); dzHacer(1); }
  else if (e.code === 'KeyF') { e.preventDefault(); dzHacer(5); }
  else if (e.code === 'ArrowDown' || e.code === 'ArrowUp') { e.preventDefault(); const it = [...document.querySelectorAll('.dzIt')], i = it.findIndex(x => x.classList.contains('sel')), j = Math.max(0, Math.min(it.length - 1, i + (e.code === 'ArrowDown' ? 1 : -1))); if (it[j]) { dzSel = +it[j].dataset.fsel; pintarPanel(); const n = document.querySelector('.dzIt.sel'); if (n) n.scrollIntoView({ block: 'nearest' }); } }
});
