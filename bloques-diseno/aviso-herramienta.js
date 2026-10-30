'use strict';
// ═════════ Aviso la primera vez que fabricas un pico o una espada: se usan solos, no hace falta ponerlos en la barra ═════════
Object.assign(TX.es, { ahPico: '¡LISTO! YA PUEDES ROMPER PIEDRA<small>el pico se usa solo, no hace falta ponerlo en la barra</small>', ahEspada: '¡ESPADA LISTA!<small>se usa sola: pegas más fuerte solo por tenerla</small>' });
Object.assign(TX.en, { ahPico: 'DONE! NOW YOU CAN BREAK STONE<small>the pickaxe works on its own, no need to put it in the hotbar</small>', ahEspada: 'SWORD READY!<small>it works on its own: you hit harder just by having it</small>' });
Object.assign(TX.pt, { ahPico: 'PRONTO! JÁ PODE QUEBRAR PEDRA<small>a picareta funciona sozinha, não precisa colocá-la na barra</small>', ahEspada: 'ESPADA PRONTA!<small>funciona sozinha: você bate mais forte só de tê-la</small>' });
{ const f0 = fabricar; fabricar = function (r) { const res = f0.apply(this, arguments);
    try { const id = r && r[0] && r[0][0], it = ITEM[id] || {}; const k = it.pico ? 'ahPico' : it.espada ? 'ahEspada' : null;
      if (k && !creativo()) { let ya = null; try { ya = localStorage.getItem('voxAviso_' + k); } catch (e) {} if (!ya) { try { localStorage.setItem('voxAviso_' + k, '1'); } catch (e) {} setTimeout(() => aviso(TR(k), 4200), 700); } } } catch (e) {}
    return res; }; }
