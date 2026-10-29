'use strict';
// ═════════ VERSIÓN PARA PORTALES WEB (itch.io, CrazyGames, GameDistribution) ═════════
// El paquete de cada portal pone window.VOX_PORTAL = 'itch' | 'crazygames' | 'gamedistribution' en el <head>.
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
    // en los portales no se manda a nadie a Google Play (CrazyGames no permite enlaces a otras tiendas)
    abrirTienda = window.abrirTienda = function () {};
  }
  // CrazyGames empieza en "Basic launch", donde los anuncios están apagados: mientras tanto la Tienda
  // se desbloquea gratis (un botón de anuncio que no hace nada es motivo de rechazo).
  // Cuando pasen a "Full launch", poner CG_ANUNCIOS = true para activar los anuncios (entre partidas y con premio).
  const CG_ANUNCIOS = false;
  // itch.io (y CrazyGames en Basic launch): lo de la Tienda se desbloquea directo (sin el anuncio de prueba)
  if (P === 'itch' || (P === 'crazygames' && !CG_ANUNCIOS)) {
    window.mostrarAnuncioPremiado = cb => cb(true);
    const txt = { es: 'Todo se desbloquea gratis', en: 'Everything unlocks for free', pt: 'Tudo é desbloqueado de graça' };
    for (const l of Object.keys(txt)) if (TX[l]) TX[l].tiendaAyuda = txt[l];
  }
  // GameDistribution: anuncios con su SDK (entre partidas con el mismo reloj y cartel que en la app, y con premio en la Tienda).
  // GD_ID es el "Game ID" que da GameDistribution al crear el juego en su panel.
  if (P === 'gamedistribution') {
    const GD_ID = window.VOX_GD_ID || '';
    let premio = null, alTerminar = null;
    const sonidoGD = on => { try { const c = audio(); if (c) on ? c.resume() : c.suspend(); } catch (e) {} };
    window.GD_OPTIONS = { gameId: GD_ID, onEvent: ev => {
      switch (ev.name) {
        case 'SDK_GAME_PAUSE': sonidoGD(false); break;
        case 'SDK_GAME_START': sonidoGD(true); if (alTerminar) { const f = alTerminar; alTerminar = null; setTimeout(f, 400); } break;
        case 'SDK_REWARDED_WATCH_COMPLETE': if (premio) premio(); break;
      }
    } };
    const s = document.createElement('script'); s.id = 'gamedistribution-jssdk'; s.src = 'https://html5.api.gamedistribution.com/main.min.js';
    document.head.appendChild(s);
    const gd = () => (typeof window.gdsdk !== 'undefined' && window.gdsdk && typeof window.gdsdk.showAd === 'function') ? window.gdsdk : null;
    window.__adsWeb = true;   // anuncios.js cuenta el tiempo como en la app
    window.mostrarAnuncioIntersticial = cb => {
      const g = gd(); if (!g) return cb();
      let listo = false; const fin = () => { if (listo) return; listo = true; alTerminar = null; sonidoGD(true); cb(); };
      alTerminar = fin; setTimeout(fin, 90000);
      try { Promise.resolve(g.showAd()).then(fin, fin); } catch (e) { fin(); }
    };
    // Tienda: desbloquear mirando un anuncio con premio (si no hay anuncio disponible, se desbloquea igual)
    window.mostrarAnuncioPremiado = cb => {
      const g = gd(); if (!g) return cb(true);
      let ok = false, listo = false; premio = () => { ok = true; };
      const fin = () => { if (listo) return; listo = true; premio = null; alTerminar = null; sonidoGD(true); cb(ok); };
      alTerminar = fin; setTimeout(fin, 90000);
      try { Promise.resolve(g.showAd('rewarded')).then(() => setTimeout(fin, 400), () => { ok = true; fin(); }); } catch (e) { ok = true; fin(); }
    };
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
      // chat: si CrazyGames lo apaga (disableChat), no se pueden mandar ni ver frases
      const chat = () => { try { const no = !!(sdk.game.settings && sdk.game.settings.disableChat); document.documentElement.classList.toggle('sinChat', no); } catch (e) {} };
      chat(); try { sdk.game.addSettingsChangeListener(chat); } catch (e) {}
      // jugar con amigos: si entró desde una invitación, se une a esa sala; si es "multijugador al instante", abre una
      let sala = null, instant = false;
      try { sala = (sdk.game.inviteParams && sdk.game.inviteParams.roomId) || sdk.game.getInviteParam('roomId'); } catch (e) {}
      try { instant = !!sdk.game.isInstantMultiplayer; } catch (e) {}
      if (sala || instant) {
        const t = setInterval(() => {
          if (typeof window.__mp !== 'object' || $('cargando') && !$('cargando').hidden) return;
          if (sala) { clearInterval(t); try { window.__mp.unirse(String(sala)); } catch (e) {} return; }
          try { if (!jugando) { $('inicio').hidden = true; crearMundo('creativo'); return; } } catch (e) {}
          // ya está jugando: abre la sala privada (reintenta hasta que el servidor la confirme)
          if (window.__mp.MP.sala || ++intentos > 12) { clearInterval(t); return; }
          if (intentos % 3 === 2) try { window.__mp.abrirSala(false); } catch (e) {}
        }, 1000);
        let intentos = 0;
      }
      // si acepta una invitación con el juego ya abierto, va a esa sala sin recargar la página
      try { sdk.game.addJoinRoomListener(p => {
        const c = p && p.roomId; if (!c || !window.__mp) return;
        if (__mp.MP.sala === String(c)) return;
        if (__mp.MP.sala) { try { mpEnviar({ t: 'salir' }); terminarSala(); } catch (e) {} }
        setTimeout(() => { try { __mp.unirse(String(c)); } catch (e) {} }, 400);
      }); } catch (e) {}
    }
    { const st = document.createElement('style');
      st.textContent = '.sinChat #bFrases, .sinChat #mpFrasesCapa { display: none !important; }';
      document.head.appendChild(st); }
    { const f0 = fraseDe; fraseDe = function () { if (document.documentElement.classList.contains('sinChat')) return; return f0.apply(this, arguments); }; }
    // la sala se informa a CrazyGames: así los amigos pueden invitar y entrar desde su página
    const sala = c => { if (!sdk) return; const roomId = String(c);
      try { sdk.game.updateRoom({ roomId, isJoinable: true, inviteParams: { roomId } }); }
      catch (e) { try { sdk.game.showInviteButton({ roomId }); } catch (e2) {} } };
    { const r0 = recibir; recibir = function (m) { const r = r0.apply(this, arguments);
        if (m && (m.t === 'creada' || m.t === 'unido') && m.codigo) sala(m.codigo);
        return r; }; }
    { const t0 = terminarSala; terminarSala = function () { const r = t0.apply(this, arguments);
        if (sdk) { try { sdk.game.leftRoom(); } catch (e) { try { sdk.game.hideInviteButton(); } catch (e2) {} } }
        return r; }; }
    document.head.appendChild(s);
    if (CG_ANUNCIOS) window.__adsWeb = true;   // anuncios.js cuenta el tiempo como en la app
    const sonido = on => { try { const c = audio(); if (c) (on && !silencio) ? c.resume() : c.suspend(); } catch (e) {} };
    window.mostrarAnuncioIntersticial = cb => {
      if (!sdk) return cb();
      let listo = false; const fin = () => { if (listo) return; listo = true; sonido(true); cb(); };
      try { sdk.ad.requestAd('midgame', { adStarted: () => sonido(false), adFinished: fin, adError: fin }); } catch (e) { fin(); }
    };
    // Tienda: desbloquear mirando un anuncio con premio
    if (CG_ANUNCIOS) window.mostrarAnuncioPremiado = cb => {
      if (!sdk) return cb(true);
      let listo = false; const fin = ok => { if (listo) return; listo = true; sonido(true); cb(ok); };
      try { sdk.ad.requestAd('rewarded', { adStarted: () => sonido(false), adFinished: () => fin(true), adError: () => fin(false) }); } catch (e) { fin(false); }
    };
    // avisarle a CrazyGames cuándo se está jugando de verdad
    let jugandoAntes = false;
    setInterval(() => { if (!sdk) return; let j = false; try { j = !!(jugando && !pausado); } catch (e) {}
      if (j !== jugandoAntes) { jugandoAntes = j; try { j ? sdk.game.gameplayStart() : sdk.game.gameplayStop(); } catch (e) {} } }, 1000);
  }
}
