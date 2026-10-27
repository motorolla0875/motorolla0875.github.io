'use strict';
// TEMPORAL, para sacar capturas: en la versión web todo queda desbloqueado como Pro (mapas solo Pro incluidos).
// En la app no hace nada. Para sacarlo: borrar este archivo y su línea en index.html.
if (!(window.Capacitor && Capacitor.isNativePlatform && Capacitor.isNativePlatform())) esPro = () => true;
// también se puede volar en todos los modos y mapas
if (!(window.Capacitor && Capacitor.isNativePlatform && Capacitor.isNativePlatform())) {
  const mostrarVolar = () => { if (!jugando) return; $('bVolar').hidden = false; $('bVolar').classList.toggle('on', volando); $('bBajar').hidden = !volando; };
  { const p0 = pintarVolar; pintarVolar = function () { const r = p0.apply(this, arguments); mostrarVolar(); return r; }; }
  setInterval(mostrarVolar, 300);
}
