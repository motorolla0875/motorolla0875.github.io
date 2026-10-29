'use strict';
// ═════════ VERSIÓN PARA PORTALES WEB (itch.io, CrazyGames, GameDistribution, GameMonetize, Microsoft Store) ═════════
// El paquete de cada portal pone window.VOX_PORTAL = 'itch' | 'newgrounds' | 'y8' | 'crazygames' | 'gamedistribution' | 'gamemonetize' | 'windows' en el <head>.
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
  // itch.io, Newgrounds (y CrazyGames en Basic launch): lo de la Tienda se desbloquea directo (sin el anuncio de prueba)
  if (P === 'itch' || P === 'newgrounds' || (P === 'crazygames' && !CG_ANUNCIOS)) {
    window.mostrarAnuncioPremiado = cb => cb(true);
    const txt = { es: 'Todo se desbloquea gratis', en: 'Everything unlocks for free', pt: 'Tudo é desbloqueado de graça' };
    for (const l of Object.keys(txt)) if (TX[l]) TX[l].tiendaAyuda = txt[l];
  }
  // Microsoft Store (Windows): sin compras ni anuncios; lo de la Tienda se desbloquea gratis
  // y un botón "También en Android" muestra un código QR para bajar la app en el celular.
  // GameMonetize: tiene el mismo botón "También en Android" y además un botón directo a Google Play.
  if (P === 'windows' || P === 'gamemonetize') {
    window.mostrarAnuncioPremiado = cb => cb(true);
    const txt = { es: 'Todo se desbloquea gratis', en: 'Everything unlocks for free', pt: 'Tudo é desbloqueado de graça' };
    for (const l of Object.keys(txt)) if (TX[l]) TX[l].tiendaAyuda = txt[l];
    const T = {
      es: { andChip: 'También en <b>Android</b>', andTit: 'Jugá en tu celular', andTxt: 'Escaneá el código con la cámara de tu celular para bajar Voxelium desde Google Play.', andOk: 'Listo' },
      en: { andChip: 'Also on <b>Android</b>', andTit: 'Play on your phone', andTxt: 'Scan the code with your phone camera to get Voxelium on Google Play.', andOk: 'Done' },
      pt: { andChip: 'Também no <b>Android</b>', andTit: 'Jogue no celular', andTxt: 'Escaneie o código com a câmera do celular para baixar o Voxelium no Google Play.', andOk: 'Pronto' },
      tr: { andChip: '<b>Android</b>\'de de var', andTit: 'Telefonunda oyna', andTxt: 'Voxelium\'u Google Play\'den indirmek için kodu telefonunun kamerasıyla tara.', andOk: 'Tamam' },
      id: { andChip: 'Juga di <b>Android</b>', andTit: 'Main di ponselmu', andTxt: 'Pindai kode dengan kamera ponselmu untuk mengunduh Voxelium di Google Play.', andOk: 'Selesai' },
      ar: { andChip: 'متوفرة أيضًا على <b>Android</b>', andTit: 'العب على هاتفك', andTxt: 'امسح الرمز بكاميرا هاتفك لتنزيل Voxelium من Google Play.', andOk: 'تم' }
    };
    for (const l of Object.keys(T)) if (TX[l]) Object.assign(TX[l], T[l]);
    const st = document.createElement('style'); st.textContent = `
      #andChip { position: absolute; top: max(10px, env(safe-area-inset-top)); right: max(12px, env(safe-area-inset-right)); display: flex; align-items: center; gap: 7px;
        background: rgba(13,21,61,.72); border: 2px solid #0d153d; border-radius: 999px; padding: 5px 12px; color: #fff; font-weight: 700; font-size: 13px; cursor: pointer; box-shadow: 0 3px 0 #0d153d; z-index: 3; }
      #andChip b { color: #7dff9a; } #andChip:active { transform: translateY(2px); box-shadow: 0 1px 0 #0d153d; }
      #andCapa { position: fixed; inset: 0; background: rgba(0,0,0,.55); display: flex; align-items: center; justify-content: center; z-index: 60; }
      #andCapa[hidden] { display: none; }
      #andCapa .caja { background: #f3f6ff; color: #0d153d; border: 3px solid #0d153d; border-radius: 18px; padding: 18px 22px; width: min(340px, 90vw); text-align: center; box-shadow: 0 6px 0 #0d153d; }
      #andCapa h3 { margin: 0 0 8px; font-size: 22px; } #andCapa p { margin: 8px 0 12px; font-size: 14px; }
      #andCapa img { width: 200px; height: 200px; image-rendering: pixelated; }
      #andCapa .ok.gp { background: linear-gradient(#7dff9a, #2fbf5a); margin-right: 6px; }
      #andCapa .ok { display: inline-block; margin-top: 4px; padding: 8px 26px; background: linear-gradient(#ffe14a, #f5a62a); border: 2px solid #0d153d; border-radius: 12px; font-weight: 800; cursor: pointer; box-shadow: 0 3px 0 #0d153d; }`;
    document.head.appendChild(st);
    const c = document.createElement('div'); c.id = 'andChip'; c.innerHTML = '<span data-ih="andChip"></span>';
    const v = document.createElement('div'); v.id = 'andCapa'; v.hidden = true;
    v.innerHTML = '<div class="caja"><h3 data-i="andTit"></h3><img alt="QR" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAAD2CAIAAABqcO2fAAAFL0lEQVR42u3dwZEjNwwF0FlXn/focBy8w/FxE5ADmINZXHwAkt87z6hbrV8sNooEf7xery/4XH94BIg4iDiIOIg4iDiIOIg4Ig4iDiIO856TP/r551+Dt/jrn7//835O/ib3yd//puqpnnzy3f3c/aZ3z7kzG0ZxTFRAxEHEQcShxXP3b3c1hBO5SsjJtXLVm7unenL1qv+6+y22ZcMojokKiDiIOIg4tHiqPmj27TtXVcipuvrdk+9cWzKbDaM4Jiog4iDiIOIQ8LzjTVfVEE7e2av+pvMOv39O1cofoziIOIg4iDiIOHx9fb1pReWkGnCisx/LyX9V1TTudvR8Rv3EKI6JCog4iDiIOLQoq6jM7qDp3FcyW3Wpej65PirbsmEUx0QFRBxEHEQcAi4rKtvWM8ye2pO7n5Mnv+27b8uGURwTFRBxEHEQcQj48Xq93u6mcxWD/afb5M5TNoqDiIOIg4iDiMOxo4pK1Rt650nEszr31OTup/PXyVWKjOKYqICIg4iDiENA2RqVztUdnR1Itj2N2VN7On+vqjqeURwTFRBxEHEQcQi4XKNSVQ3IvUfnagi5/US57iuz3z2XKKM4iDgiDiIOIg5DWisqVXIVnk+VO5+oswpkjQqIOCIOIg4iDmsMd6btXElS9cl33+Id98vkvmnnr2MUx0QFRBxEHEQcAi4rKts6lFZdq2p9xaeeVvyOfW+M4piogIiDiIOIQ8CTeyPuPPm36uq5KkfudKQTVXWhu2x0flOjOCYqIOIg4iDi0OKoolK1p+bkrbmzG2quDvP9c3IVgztVV8+t4TGKg4iDiCPiIOKw2DN7+dzql9kqR+7qnXt89ne5MYqDiCPiIOIg4jAk2Eclt8ensxax/372n2jc2YfWKI6JCog4iDiIOLQo66NSZduekdlvkdsZNNv/pPO7G8UxUQERBxEHEYeA4K6f/SftdvZ93VZnuHvyVWch3eXHGhUQcUQcRBxEHNa43PVT9f67repycvWqDred1YnZk5pzO6eM4iDiiDiIOIg4DAn2Ual6r992Sk5nlSPXa2X2njt/QaM4Jiog4iDiIOIQcFRR+YwzX3L3U7UGo7OHzP5eNNaogIiDiCPiIOKw2GVFZf9qk9kqUG6XTa5607kzKLdPyiiOiQqIOIg4iDi0CPZRuXuPzv3X3T3fme0hk7v67HoYnWlBxBFxEHEQcVgjeHry3ek2d3JrXWZXblS5+wWrqi6znXCM4piogIiDiIOIQ8BRRaVqzcP+nq4nOs/oqXrOs11TZjsJG8UxUQERBxEHEYeAJ/fRs/1G7q6VW8uR+5zOakmuf05uHZRRHBMVEHEQcRBxCAju+sm9+3//nM6OH7O9TXK/zrZrGcVBxEHEEXEQcVisrDNtp9zql859SXf301nzmT3jqerqRnFMVEDEQcRBxCGgdY3KnbsOt517jmZXtsz+XrNdZ43iIOKIOIg4iDgMOVqj0vnW3LniYr/cupGTZ3hyP1WfnPvuRnFMVEDEQcRBxCGgrDNtrrPoybU610Xsv+e7a92dg2wUBxEHEQcRBxHnf+l5x5vu3EFz4uRaVfuSZrud7D+NyCiOiQqIOIg4iDi0eD7ja1SdkjO7g+ZkTci2jrtV62Hurm4UBxFHxEHEQcRhSFlFZVs/0qr3+qr1J539dTvPbu7scqOiAiKOiIOIg4jDGpcVldl+Gp37XDp32byjzjOVdKYFEUfEQcRBxGGNo7N+wCgOIg4iDiIOIg4ijoiDiIOIg4iDiMNv+BdoIom2Do9WGwAAAABJRU5ErkJggg=="><p data-i="andTxt"></p>' + (P === 'gamemonetize' ? '<div class="ok gp">Google Play</div> ' : '') + '<div class="ok" data-i="andOk"></div></div>';
    c.onclick = () => { v.hidden = false; };
    v.addEventListener('click', e => {
      if (e.target.closest('.gp')) { try { window.open('https://play.google.com/store/apps/details?id=com.dmithbuilds.voxelium', '_blank'); } catch (er) {} return; }
      if (e.target === v || e.target.closest('.ok')) v.hidden = true; });
    try { $('inicio').appendChild(c); document.body.appendChild(v); aplicarIdioma(); } catch (e) {}
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
  // GameMonetize: anuncios entre partidas con su SDK (sdk.showBanner). No tiene anuncios con premio,
  // así que lo de la Tienda se desbloquea gratis (arriba). GM_ID es el "Game ID" del panel de GameMonetize.
  if (P === 'gamemonetize') {
    let alTerminar = null, empezo = false;
    const sonidoGM = on => { try { const c = audio(); if (c) on ? c.resume() : c.suspend(); } catch (e) {} };
    window.SDK_OPTIONS = { gameId: window.VOX_GM_ID || '', onEvent: ev => {
      switch (ev.name) {
        case 'SDK_GAME_PAUSE': empezo = true; sonidoGM(false); break;
        case 'SDK_GAME_START': sonidoGM(true); if (alTerminar) { const f = alTerminar; alTerminar = null; setTimeout(f, 300); } break;
      }
    } };
    { const st = document.createElement('style'); st.textContent = '#sdk__advertisement, #imaContainer, #imaContainer_new { z-index: 2147483000 !important; }'; document.head.appendChild(st); }
    const s = document.createElement('script'); s.id = 'gamemonetize-sdk'; s.src = 'https://api.gamemonetize.com/sdk.js';
    document.head.appendChild(s);
    const gm = () => (typeof window.sdk !== 'undefined' && window.sdk && typeof window.sdk.showBanner === 'function') ? window.sdk : null;
    // GameMonetize no permite anuncios por tiempo: acá no se usa el reloj de anuncios.js.
    // Los anuncios salen en pausas naturales (al entrar a un mundo y al revivir), como mucho uno cada 3 minutos.
    let ultimo = 0;
    const pausaNatural = cb => {
      if (!gm() || Date.now() - ultimo < 180000 || (typeof sinAnuncios === 'function' && sinAnuncios())) return cb();
      ultimo = Date.now(); window.mostrarAnuncioIntersticial(cb);
    };
    { const e0 = entrarMundo; entrarMundo = window.entrarMundo = function () {
        const r = e0.apply(this, arguments);
        if (window.mundoTipo !== 'tutorial') pausaNatural(() => {});
        return r; }; }
    try { const b = $('bRevivir'), r0 = b.onclick; b.onclick = function (ev) { pausaNatural(() => r0.call(b, ev)); }; } catch (e) {}
    window.mostrarAnuncioIntersticial = cb => {
      const g = gm(); if (!g) return cb();
      let listo = false; empezo = false;
      const fin = () => { if (listo) return; listo = true; alTerminar = null; sonidoGM(true); cb(); };
      alTerminar = fin; setTimeout(fin, 90000);
      setTimeout(() => { if (!empezo) fin(); }, 4000);   // si no hay anuncio, se sigue jugando
      try { g.showBanner(); } catch (e) { fin(); }
    };
  }
  // Y8: anuncios con su SDK. Entre partidas en pausas naturales (al entrar a un mundo y al revivir, como mucho uno cada 3 minutos)
  // y con premio en la Tienda (si no hay anuncio disponible, se desbloquea igual). IDs del panel de Y8.
  if (P === 'y8') {
    let y8s = null;
    const sonidoY8 = on => { try { const c = audio(); if (c) on ? c.resume() : c.suspend(); } catch (e) {} };
    window.addEventListener('y8sdk.ready', () => {
      try { y8s = y8.sdk(); y8s.init({ appId: '6ae359d5f5f29e44a52a398e', autoLogin: false }, { gameId: '290209', preloadAdBreaks: 'on', sound: 'on', onReady: () => {} }); } catch (e) { y8s = null; }
    }, { once: true });
    const s = document.createElement('script'); s.async = true; s.src = 'https://cdn.y8.com/minimal-sdk/2-0/y8.min.js';
    s.onload = () => { try { if (window.y8 && window.y8.emitReadyEvent) window.y8.emitReadyEvent(); } catch (e) {} };
    document.head.appendChild(s);
    const anuncio = (tipo, nombre, alPremio, cb) => {
      if (!y8s) return cb(false);
      let listo = false; const fin = ok => { if (listo) return; listo = true; sonidoY8(true); cb(ok); };
      setTimeout(() => fin(false), 90000);
      try {
        Promise.resolve(y8s.showAd({ type: tipo, name: nombre,
          beforeAd: () => sonidoY8(false), afterAd: () => sonidoY8(true),
          beforeReward: show => show(), adDismissed: () => {}, adViewed: () => { if (alPremio) alPremio(); },
          adBreakDone: () => setTimeout(() => fin(true), 200) })).catch(() => fin(false));
      } catch (e) { fin(false); }
    };
    window.mostrarAnuncioIntersticial = cb => anuncio('next', 'pausa', null, () => cb());
    window.mostrarAnuncioPremiado = cb => { let ok = false; anuncio('reward', 'tienda', () => { ok = true; }, hubo => cb(ok || !hubo)); };
    let ultimo = 0;
    const pausaNatural = cb => {
      if (!y8s || Date.now() - ultimo < 180000 || (typeof sinAnuncios === 'function' && sinAnuncios())) return cb();
      ultimo = Date.now(); window.mostrarAnuncioIntersticial(cb);
    };
    { const e0 = entrarMundo; entrarMundo = window.entrarMundo = function () {
        const r = e0.apply(this, arguments);
        if (window.mundoTipo !== 'tutorial') pausaNatural(() => {});
        return r; }; }
    try { const b = $('bRevivir'), r0 = b.onclick; b.onclick = function (ev) { pausaNatural(() => r0.call(b, ev)); }; } catch (e) {}
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
