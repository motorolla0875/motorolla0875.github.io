'use strict';
// ═════════ VERSIÓN PARA PORTALES WEB (itch.io, CrazyGames) ═════════
// El paquete de cada portal pone window.VOX_PORTAL = 'itch' | 'crazygames' en el <head>.
// Para probar en la web: ?portal=itch o ?portal=crazygames
// - En los portales no hay compras (sin Pro ni "quitar anuncios") ni botón de votar en Google Play.
// - En CrazyGames los anuncios son los de su SDK (mismo reloj y cartel que en la app); en itch.io no hay anuncios.

{ const q = (location.search.match(/[?&]portal=(\w+)/) || [])[1];
  if (q) window.VOX_PORTAL = q;
  const P = window.VOX_PORTAL;
  if (P) {
    const st = document.createElement('style');
    st.textContent = '#calChip, #ajCal2 [data-c2="votar"] { display: none !important; }';
    document.head.appendChild(st);
  }
  // itch.io: sin anuncios, lo de la Tienda se desbloquea directo (sin el anuncio de prueba)
  if (P === 'itch') {
    window.mostrarAnuncioPremiado = cb => cb(true);
    const txt = { es: 'Todo se desbloquea gratis', en: 'Everything unlocks for free', pt: 'Tudo é desbloqueado de graça' };
    for (const l of Object.keys(txt)) if (TX[l]) TX[l].tiendaAyuda = txt[l];
  }
  if (P === 'crazygames') {
    let sdk = null;
    const s = document.createElement('script'); s.src = 'https://sdk.crazygames.com/crazygames-sdk-v3.js';
    s.onload = async () => { try { await window.CrazyGames.SDK.init(); sdk = window.CrazyGames.SDK; try { sdk.game.loadingStop(); } catch (e) {} guardarConSDK(); } catch (e) { sdk = null; } };
    // progreso: lo que el juego guarda en localStorage se copia también en el Data Module de CrazyGames
    // (así no se pierde y sigue al jugador en otro dispositivo); al entrar se recupera lo que falte
    const nuestra = k => /^(bloques|blox|vox)/.test(k);
    function guardarConSDK() {
      const D = sdk && sdk.data; if (!D) return;
      let trajo = false;
      try { for (let i = 0; i < D.length; i++) { const k = D.key(i); if (k && nuestra(k) && localStorage.getItem(k) == null) { localStorage.setItem(k, D.getItem(k)); trajo = true; } } } catch (e) {}
      try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (nuestra(k) && D.getItem(k) == null) D.setItem(k, localStorage.getItem(k)); } } catch (e) {}
      const set0 = Storage.prototype.setItem, del0 = Storage.prototype.removeItem;
      Storage.prototype.setItem = function (k, v) { set0.call(this, k, v); if (this === window.localStorage && nuestra(k)) try { D.setItem(k, v); } catch (e) {} };
      Storage.prototype.removeItem = function (k) { del0.call(this, k); if (this === window.localStorage && nuestra(k)) try { D.removeItem(k); } catch (e) {} };
      if (trajo) try { if (typeof pintarMundos === 'function') pintarMundos(); } catch (e) {}
    }
    document.head.appendChild(s);
    window.__adsWeb = true;   // anuncios.js cuenta el tiempo como en la app
    const sonido = on => { try { const c = audio(); if (c) on ? c.resume() : c.suspend(); } catch (e) {} };
    window.mostrarAnuncioIntersticial = cb => {
      if (!sdk) return cb();
      let listo = false; const fin = () => { if (listo) return; listo = true; sonido(true); cb(); };
      try { sdk.ad.requestAd('midgame', { adStarted: () => sonido(false), adFinished: fin, adError: fin }); } catch (e) { fin(); }
    };
    // Tienda: desbloquear mirando un anuncio con premio
    window.mostrarAnuncioPremiado = cb => {
      if (!sdk) return cb(true);
      let listo = false; const fin = ok => { if (listo) return; listo = true; sonido(true); cb(ok); };
      try { sdk.ad.requestAd('rewarded', { adStarted: () => sonido(false), adFinished: () => fin(true), adError: () => fin(false) }); } catch (e) { fin(false); }
    };
    // avisarle a CrazyGames cuándo se está jugando de verdad
    let jugandoAntes = false;
    setInterval(() => { if (!sdk) return; let j = false; try { j = !!(jugando && !pausado && !document.hidden); } catch (e) {}
      if (j !== jugandoAntes) { jugandoAntes = j; try { j ? sdk.game.gameplayStart() : sdk.game.gameplayStop(); } catch (e) {} } }, 1000);
  }
}
