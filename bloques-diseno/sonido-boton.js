'use strict';
// ═════════ Sonido "soltar pieza" al presionar cualquier botón del juego ═════════
// Usa el volumen de "Sonidos" de Ajustes. Si el sonido no cargó, no suena nada.
{ let buf = null, crudo = null;
  fetch('../bloques-diseno/sonidos/soltar_pieza.mp3').then(r => r.ok ? r.arrayBuffer() : null).then(ab => { crudo = ab; }).catch(() => {});
  const preparar = () => { if (buf || !crudo || !AU.ctx) return; const ab = crudo; crudo = null; AU.ctx.decodeAudioData(ab, b => { buf = b; }, () => {}); };
  const SEL = '.btn, .tab, .cerrar, .fbB, .fbIt, .nvCarta, .azMas, .pg, .fl, .ajOpc > div, .dzB, .mb, [data-tab], [data-pag], [data-nv]';
  let ult = 0;
  document.addEventListener('pointerdown', e => {
    const c = (typeof audio === 'function') ? audio() : null; if (!c) return; preparar();
    const b = e.target.closest(SEL); if (!b || b.classList.contains('off') || !buf) return;
    const ahora = performance.now(); if (ahora - ult < 60) return; ult = ahora;
    try { const s = c.createBufferSource(), g = c.createGain(); s.buffer = buf; s.playbackRate.value = .97 + Math.random() * .06; g.gain.value = .9; s.connect(g); g.connect(AU.sfx || c.destination); s.start(); } catch (err) {}
  }, true);
  const espera = setInterval(() => { if (buf) clearInterval(espera); else if (AU.ctx) preparar(); }, 500); }
