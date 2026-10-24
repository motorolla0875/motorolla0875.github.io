'use strict';
// ═════════ DENTRO DE LA APP (Android/iPhone): compartir archivos, abrir archivos y botón "atrás" ═════════
// En la web no hace nada: todo esto solo se activa cuando el juego corre dentro de la app.
const CAP = window.Capacitor, NATIVO = !!(CAP && CAP.isNativePlatform && CAP.isNativePlatform());
if (NATIVO) {
  const P = CAP.Plugins || {};
  const aBase64 = blob => new Promise((ok, mal) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1]); r.onerror = mal; r.readAsDataURL(blob); });
  async function compartirNativo(blob, nombre, titulo) {
    try {
      const { uri } = await P.Filesystem.writeFile({ path: nombre, data: await aBase64(blob), directory: 'CACHE' });
      await P.Share.share({ title: titulo || nombre, files: [uri], dialogTitle: titulo || nombre });
    } catch (e) { if (!/cancel/i.test(String(e && e.message))) aviso(TR('noGuardar'), 1800); }
  }
  // mapas, mods, skins y copias de seguridad
  compartirArchivo = (blob, nombre) => compartirNativo(blob, nombre);
  // fotos y videos
  $('bCompartir').onclick = () => { if (fotoBlob) compartirNativo(fotoBlob, 'voxelium.jpg', TR('compartirT')); };
  { const s0 = sacarFoto; sacarFoto = function () { const r = s0.apply(this, arguments); $('bCompartir').hidden = false; return r; }; }
  if ($('bCompartirVideo')) $('bCompartirVideo').onclick = () => { if (typeof videoBlob !== 'undefined' && videoBlob) compartirNativo(videoBlob, 'voxelium.' + (videoBlob.type.includes('mp4') ? 'mp4' : 'webm'), TR('compartirT')); };
  // al elegir archivo, Android no conoce la extensión .voxel: que muestre todos
  archivoIn.accept = '';
  // pantalla completa la maneja la app
  pantallaCompleta = () => {};
  // botón "atrás" de Android: en el juego abre la pausa; en el inicio cierra la app; en otras pantallas vuelve
  if (P.App) P.App.addListener('backButton', () => {
    const vis = id => $(id) && !$(id).hidden;
    if (jugando && !pausado) { $('bPausa').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); return; }
    if (vis('inicio')) { P.App.exitApp(); return; }
    for (const [capa, boton] of [['logrosCapa', 'logrosCerrar'], ['copiaCapa', 'bCopiaVolver'], ['nuevo', 'bVolverMundos'], ['mundos', 'bVolverInicio'], ['ajustes', 'bAjListo'], ['creditos', 'bCredListo'], ['pausa', 'bSeguir']]) if (vis(capa) && $(boton)) { $(boton).click(); return; }
  });
  // al salir de la app: pausa el juego y apaga el sonido; al volver, lo prende
  if (P.App) P.App.addListener('appStateChange', ({ isActive }) => {
    try { if (!isActive) { if (jugando && !pausado) $('bPausa').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); guardar(); if (AU.ctx) AU.ctx.suspend(); } else if (AU.ctx) AU.ctx.resume(); } catch (e) {}
  });
}
window.__nativo = NATIVO;
