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
    s.onload = async () => { try { await window.CrazyGames.SDK.init(); sdk = window.CrazyGames.SDK; try { sdk.game.loadingStop(); } catch (e) {} listoSDK(); } catch (e) { sdk = null; } };
    let silencio = false;
    function listoSDK() {
      // CrazyGames puede silenciar el juego desde su página
      const mute = () => { try { silencio = !!(sdk.game.settings && sdk.game.settings.muteAudio); sonido(!silencio); } catch (e) {} };
      mute(); try { sdk.game.addSettingsChangeListener(mute); } catch (e) {}
      // jugar con amigos: si entró desde una invitación, se une a esa sala; si es "multijugador al instante", abre una
      let sala = null, instant = false;
      try { sala = sdk.game.getInviteParam('roomId'); } catch (e) {}
      try { instant = !!sdk.game.isInstantMultiplayer; } catch (e) {}
      if (sala || instant) {
        const t = setInterval(() => {
          if (typeof window.__mp !== 'object' || $('cargando') && !$('cargando').hidden) return;
          if (sala) { clearInterval(t); try { window.__mp.unirse(String(sala)); } catch (e) {} return; }
          try { if (!jugando) { $('inicio').hidden = true; crearMundo('creativo'); return; } } catch (e) {}
          clearInterval(t); setTimeout(() => { try { window.__mp.abrirSala(false); } catch (e) {} }, 1500);
        }, 1000);
      }
    }
    // al abrir una sala aparece el botón de invitar de CrazyGames; al cerrarla se esconde
    { const r0 = recibir; recibir = function (m) { const r = r0.apply(this, arguments);
        if (m && m.t === 'creada' && sdk) try { sdk.game.showInviteButton({ roomId: m.codigo }); } catch (e) {}
        return r; }; }
    { const t0 = terminarSala; terminarSala = function () { const r = t0.apply(this, arguments); if (sdk) try { sdk.game.hideInviteButton(); } catch (e) {} return r; }; }
    document.head.appendChild(s);
    window.__adsWeb = true;   // anuncios.js cuenta el tiempo como en la app
    const sonido = on => { try { const c = audio(); if (c) (on && !silencio) ? c.resume() : c.suspend(); } catch (e) {} };
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
