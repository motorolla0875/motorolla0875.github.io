'use strict';
// ═════════ UNITY ADS (solo dentro de la app de Android) ═════════
// Conecta los anuncios del juego con Unity:
//  - window.mostrarAnuncioIntersticial(cb): la pausa publicitaria (anuncios.js)
//  - window.mostrarAnuncioPremiado(cb(ok)): desbloquear cosas de la Tienda (tienda.js)
// En la web no hace nada (se siguen viendo los anuncios de prueba).
// Las compilaciones de prueba ponen window.VOX_UNITY_PRUEBA = true: Unity muestra anuncios de prueba
// y no cuenta nada (así nunca se tocan anuncios reales propios, que Unity castiga).

const UNITY_VOX = {
  android: { game: '', inter: 'Interstitial_Android', reward: 'Rewarded_Android' },   // game: el Game ID de Android del proyecto Voxelium en Unity
};

(() => {
  const C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  const U = C.Plugins && C.Plugins.UnityAds, cfg = UNITY_VOX[C.getPlatform && C.getPlatform()];
  if (!U || !cfg || !cfg.game) return;
  const prueba = !!window.VOX_UNITY_PRUEBA;
  let listo = null;
  const arrancar = () => {
    if (listo) return listo;
    listo = U.initialize({ gameId: cfg.game, testMode: prueba })
      .then(() => { U.preload({ placementId: cfg.inter }).catch(() => {}); U.preload({ placementId: cfg.reward, rewarded: true }).catch(() => {}); return true; })
      .catch(() => { listo = null; return false; });
    return listo;
  };
  setTimeout(arrancar, 3000);
  // el sonido del juego se apaga mientras corre el anuncio
  const silencio = on => { try { if (typeof AU !== 'undefined' && AU.ctx) { if (on) AU.ctx.suspend(); else AU.ctx.resume(); } } catch (e) {} };
  async function mostrar(place, premiado) {
    const ok = await Promise.race([arrancar(), new Promise(r => setTimeout(() => r(false), 4000))]);
    if (!ok) return { shown: false };
    silencio(true);
    try { return await Promise.race([U.show({ placementId: place, rewarded: premiado }), new Promise(r => setTimeout(() => r({ shown: false }), 90000))]) || { shown: false }; }
    catch (e) { return { shown: false }; }
    finally { silencio(false); U.preload({ placementId: place, rewarded: premiado }).catch(() => {}); }
  }
  // pausa publicitaria: pase lo que pase, el juego sigue
  window.mostrarAnuncioIntersticial = cb => { mostrar(cfg.inter, false).then(() => cb(), () => cb()); };
  // video con premio: solo da el premio si se vio completo
  window.mostrarAnuncioPremiado = cb => { mostrar(cfg.reward, true).then(r => { if (r && r.shown && r.rewarded) cb(true); else { aviso(TR('adNoListo'), 1600); cb(false); } }, () => { aviso(TR('adNoListo'), 1600); cb(false); }); };
})();
Object.assign(TX.es, { adNoListo: 'EL ANUNCIO NO ESTÁ LISTO<small>prueba de nuevo en un ratito</small>' });
Object.assign(TX.en, { adNoListo: 'THE AD IS NOT READY<small>try again in a moment</small>' });
Object.assign(TX.pt, { adNoListo: 'O ANÚNCIO NÃO ESTÁ PRONTO<small>tente de novo daqui a pouco</small>' });
