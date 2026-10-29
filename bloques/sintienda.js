'use strict';
// ═════════ VERSIÓN SIN COMPRAS (Huawei AppGallery) ═════════
// La app de Huawei se compila sin el plugin de compras (los celulares Huawei no tienen Google Play).
// Si estamos en la app y no hay plugin de compras: solo anuncios, sin botones de Pro ni de "Quitar anuncios",
// y "Votar" abre AppGallery. Para probarlo en la web: ?sinTienda

{ const C = window.Capacitor;
  const enApp = !!(C && C.isNativePlatform && C.isNativePlatform());
  const sinTienda = (enApp && !(C.Plugins && C.Plugins.Purchases)) || /[?&]sinTienda/.test(location.search) || !!window.VOX_PORTAL;
  if (sinTienda) {
    window.__sinTienda = true;
    document.documentElement.classList.add('sinTienda');
    const st = document.createElement('style'); st.textContent = `
      .sinTienda .adPro, .sinTienda #bQuitarAnuncios, .sinTienda #tiendaTabs .tab.proTab, .sinTienda [data-hazpro] { display: none !important; }`;
    document.head.appendChild(st);
    // la ventana de Pro no se abre
    abrirPro = window.abrirPro = function () {};
    // el texto de "sin conexión" no menciona Pro
    for (const l of Object.keys(TX)) { const t = TX[l] && TX[l].adSinRed; if (typeof t === 'string') TX[l].adSinRed = t.split(/(?<=[.!?。])\s/)[0]; }
    // "Votar" abre la ficha en AppGallery
    if (enApp) abrirTienda = function () { location.href = 'appmarket://details?id=com.dmithbuilds.voxelium'; };
  }
}
