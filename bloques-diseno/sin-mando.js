'use strict';
// ═════════ Sin control de consola (PlayStation / Xbox) ═════════
// El juego deja de detectar mandos: no aparece el aviso "Control conectado", ni el recuadro amarillo
// que marca los botones, y los controles táctiles quedan siempre visibles.
try { Object.defineProperty(navigator, 'getGamepads', { value: () => [], configurable: true }); } catch (e) {}
for (const ev of ['gamepadconnected', 'gamepaddisconnected']) addEventListener(ev, e => { e.stopImmediatePropagation(); }, true);
{ const st = document.createElement('style'); st.textContent = `.padFoco { outline: none !important; box-shadow: none !important; }`; document.head.appendChild(st);
  setInterval(() => { document.body.classList.remove('conControl'); for (const el of document.querySelectorAll('.padFoco')) el.classList.remove('padFoco'); }, 1000); }
