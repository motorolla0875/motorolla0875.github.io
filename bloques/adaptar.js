'use strict';
// ═════════ PANTALLAS (celular y tablet), HUD QUE NO TAPA Y CALIDAD GRÁFICA ═════════

Object.assign(TX.es, { calidad: 'Calidad', calAuto: 'Auto', calBaja: 'Baja', calMedia: 'Media', calAlta: 'Alta' });
Object.assign(TX.en, { calidad: 'Quality', calAuto: 'Auto', calBaja: 'Low', calMedia: 'Medium', calAlta: 'High' });
Object.assign(TX.pt, { calidad: 'Qualidade', calAuto: 'Auto', calBaja: 'Baixa', calMedia: 'Média', calAlta: 'Alta' });

// ─── escala según el tamaño de la pantalla ───
{ const st = document.createElement('style'); st.textContent = `
  :root { --u: 1; --uM: 1; }
  #mision, #arriba, #botonesArriba, #herr, #barra, #barrasHud, .boton, #efectosHud, #guia, #planBar, #mecBar { zoom: var(--u); }
  .capa > * { zoom: var(--uM); }
  .ventana, .mVentana { max-height: calc(94vh / var(--uM)) !important; width: min(680px, calc(96vw / var(--uM))) !important; }
  .capa .btn, .capa .filaBtn, .capa .ajFila { max-width: calc(92vw / var(--uM)); }
  /* misión más chica */
  #mision { font-size: 12px; padding: 3px 8px; max-width: calc(30vw / var(--u)); line-height: 1.2; }
  #mision small { font-size: 10.5px; }
  #efectosHud { top: 52px; }
  /* arriba al centro solo el día y los contadores, todo en columna sin encimarse */
  #arriba { gap: 4px; }
  #dia { font-size: 12px; padding: 0 8px; } #dia svg { width: 12px; height: 12px; }
  #arriba #crono, #arriba #olaHud, #arriba #jefeBar { position: static; transform: none; top: auto; left: auto; }
  #arriba #jefeBar { width: min(380px, calc(60vw / var(--u))); }
  /* vida, hambre y armadura abajo, arriba de la barra de objetos (como en el juego de bloques clásico) */
  #barrasHud { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(max(4px, env(safe-area-inset-bottom)) + 56px); z-index: 3; display: flex; justify-content: space-between; align-items: flex-end; gap: 6px; pointer-events: none; width: 412px; }
  #barrasHud .grupo { display: flex; gap: 4px; align-items: center; }
  #barrasHud .barraHud { padding: 1px 6px 1px 3px; }
  #barrasHud .barraHud svg { width: 15px; height: 15px; }
  #barrasHud .barraHud .fondo { width: 92px; height: 8px; }
  #barrasHud #armHud .barraHud .fondo { width: 52px; }
  #barrasHud .barraHud b { font-size: 11px; }
  /* avisos más chicos y más arriba, lejos de la mira */
  #aviso { top: 23%; font-size: calc(21px * var(--u)); }
  #aviso small { font-size: calc(13px * var(--u)); margin-top: 3px; }
  /* pantalla de mundo nuevo en dos columnas */
  #nuevo .filaBtn, #nuevo > .btn { width: min(560px, 94vw); }
  #nuevo .ajFila { width: min(560px, 94vw); }
  #nuevo .btn { font-size: 16px; line-height: 1.15; }
  #nuevo .btn small { font-size: 11.5px; }
`; document.head.appendChild(st); }

// reacomodar: barras abajo, contadores dentro de la columna de arriba
{ const b = document.createElement('div'); b.id = 'barrasHud';
  const izq = document.createElement('div'); izq.className = 'grupo'; izq.append($('vida'), $('armHud'));
  const der = document.createElement('div'); der.className = 'grupo'; der.append($('hambre'));
  b.append(izq, der); $('hud').appendChild(b);
  for (const id of ['crono', 'olaHud', 'jefeBar']) if ($(id)) $('arriba').appendChild($(id)); }
// creativo y supervivencia en una sola fila
{ const f = document.createElement('div'); f.className = 'filaBtn'; $('nuevo').insertBefore(f, $('bCreativo')); f.append($('bCreativo'), $('bSuper'));
  const g = document.createElement('div'); g.className = 'filaBtn'; $('nuevo').insertBefore(g, $('bEjemplo')); g.append($('bEjemplo'), $('bVolverMundos')); }

function escalar() {
  const W = innerWidth, H = innerHeight, cl = (v, a, b) => Math.max(a, Math.min(b, v));
  const u = cl(Math.min(W / 844, H / 390), .78, 1.5), uM = cl(Math.min(W / 900, H / 440), .8, 1.45);
  document.documentElement.style.setProperty('--u', u.toFixed(3)); document.documentElement.style.setProperty('--uM', uM.toFixed(3));
}
addEventListener('resize', escalar); escalar();

// ═════════ CALIDAD ═════════
// auto: arranca según el aparato y baja sola si el juego anda lento
const esCel = matchMedia('(pointer: coarse)').matches;
const CAL = { baja: { pr: .75, nubes: false, part: .35 }, media: { pr: 1, nubes: true, part: .7 }, alta: { pr: 2, nubes: true, part: 1 } };
if (!AJ.calidad) AJ.calidad = 'auto';
function nivelInicial() {
  const mem = navigator.deviceMemory || 4, nuc = navigator.hardwareConcurrency || 4;
  if (!esCel) return 'alta';
  if (mem <= 3 || nuc <= 4) return 'baja';
  return 'media';
}
let calNivel = AJ.calidad === 'auto' ? (AJ.calAuto || nivelInicial()) : AJ.calidad;
function aplicarCalidad() {
  const c = CAL[calNivel] || CAL.media, dpr = devicePixelRatio || 1;
  render.setPixelRatio(Math.min(c.pr, dpr)); medir();
  if (cieloObj && cieloObj.nubes) cieloObj.nubes.visible = c.nubes;
}
{ const p0 = polvo; polvo = function (x, y, z, color, n = 10) { const k = (CAL[calNivel] || CAL.media).part; return p0(x, y, z, color, Math.max(1, Math.round(n * k))); }; }
aplicarCalidad();

// medidor: si en 'auto' el juego anda a menos de ~40 cuadros por segundo, baja la calidad un escalón
let fpsN = 0, fpsT = 0, lentoVeces = 0;
function medirFps(dt) {
  if (AJ.calidad !== 'auto' || !jugando || pausado || document.hidden) { fpsN = 0; fpsT = 0; return; }
  fpsN++; fpsT += dt; if (fpsT < 4) return;
  const fps = fpsN / fpsT; fpsN = 0; fpsT = 0;
  if (fps < 40) lentoVeces++; else lentoVeces = 0;
  if (lentoVeces >= 2) { lentoVeces = 0;
    if (calNivel === 'alta') calNivel = 'media'; else if (calNivel === 'media') calNivel = 'baja'; else if (AJ.dist > 0) { AJ.dist--; cam.far = DIST[AJ.dist][1] + 140; cam.updateProjectionMatrix(); } else return;
    AJ.calAuto = calNivel; guardarAjustes(); aplicarCalidad(); }
}
// en los menús el mundo de fondo se dibuja a la mitad de cuadros (ahorra batería)
{ const r0 = render.render.bind(render); let par = false; render.render = function (e, c) { if (!jugando && e === escena) { par = !par; if (par) return; } r0(e, c); }; }
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.25, (t - ult) / 1000); ult = t; medirFps(dt); }; requestAnimationFrame(tick); }

// fila de ajustes
{ const f = document.createElement('div'); f.className = 'ajFila'; f.innerHTML = '<span data-i="calidad"></span><div class="ajOpc" id="ajCal"><div data-c="auto" data-i="calAuto"></div><div data-c="baja" data-i="calBaja"></div><div data-c="media" data-i="calMedia"></div><div data-c="alta" data-i="calAlta"></div></div>';
  $('ajustes').insertBefore(f, $('ajDist').parentNode); aplicarIdioma(); }
function pintarCal() { for (const d of $('ajCal').children) d.classList.toggle('on', d.dataset.c === AJ.calidad); }
$('ajCal').addEventListener('click', e => { const d = e.target.closest('[data-c]'); if (!d) return; AJ.calidad = d.dataset.c; calNivel = AJ.calidad === 'auto' ? (AJ.calAuto || nivelInicial()) : AJ.calidad; guardarAjustes(); pintarCal(); aplicarCalidad(); });
{ const a0 = abrirAjustes; abrirAjustes = function (d) { a0(d); pintarCal(); }; }
window.__cal = { nivel: () => calNivel, aplicar: aplicarCalidad, escalar };
