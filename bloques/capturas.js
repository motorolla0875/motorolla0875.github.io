'use strict';
// TEMPORAL, para sacar capturas: en la versión web todo queda desbloqueado como Pro (mapas solo Pro incluidos).
// En la app no hace nada. Para sacarlo: borrar este archivo y su línea en index.html.
if (!(window.Capacitor && Capacitor.isNativePlatform && Capacitor.isNativePlatform())) esPro = () => true;
