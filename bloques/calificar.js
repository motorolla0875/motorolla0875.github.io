'use strict';
// ═════════ CALIFICAR VOXELIUM ═════════
// 1) La ventanita oficial de Google (in-app review): se pide solo en momentos buenos
//    (misión 5 completada, ganar la Guerra de Aldeas) y como mucho una vez cada 30 días. Google decide si la muestra.
// 2) Nuestro botón propio: en el menú principal y en Ajustes, abre la página del juego en Google Play.
//    Sin premios por votar y sin filtrar a nadie (lo piden Google y Apple).
// 3) "Enviar sugerencia": abre un mail, para que las quejas lleguen a nosotros.

const PLAY_ID = 'com.dmithbuilds.voxelium';
const PLAY_URL = 'https://play.google.com/store/apps/details?id=' + PLAY_ID;
const MAIL_SUG = 'dmith.builds@gmail.com';
Object.assign(TX.es, { calChip: '¿Te gusta Voxelium? <b>¡Califícanos!</b>', calFila: 'Voxelium', calVotar: 'Calificar', calSug: 'Enviar sugerencia', calAsunto: 'Voxelium - Sugerencia' });
Object.assign(TX.en, { calChip: 'Enjoying Voxelium? <b>Rate us!</b>', calFila: 'Voxelium', calVotar: 'Rate', calSug: 'Send feedback', calAsunto: 'Voxelium - Feedback' });
Object.assign(TX.pt, { calChip: 'Curtindo o Voxelium? <b>Avalie!</b>', calFila: 'Voxelium', calVotar: 'Avaliar', calSug: 'Enviar sugestão', calAsunto: 'Voxelium - Sugestão' });
if (TX.tr) Object.assign(TX.tr, { calChip: "Voxelium'u sevdin mi? <b>Bizi puanla!</b>", calFila: 'Voxelium', calVotar: 'Puanla', calSug: 'Öneri gönder', calAsunto: 'Voxelium - Öneri' });
if (TX.id) Object.assign(TX.id, { calChip: 'Suka Voxelium? <b>Beri kami nilai!</b>', calFila: 'Voxelium', calVotar: 'Beri nilai', calSug: 'Kirim saran', calAsunto: 'Voxelium - Saran' });
if (TX.ar) Object.assign(TX.ar, { calChip: 'هل أعجبتك Voxelium؟ <b>قيّمنا!</b>', calFila: 'Voxelium', calVotar: 'قيّم', calSug: 'أرسل اقتراحًا', calAsunto: 'Voxelium - اقتراح' });

const ESTRELLA = '<svg viewBox="0 0 10 10" style="width:18px;height:18px;flex:none"><path d="M5 .6l1.35 2.8 3.05.42-2.2 2.13.53 3.03L5 7.55 2.27 8.98l.53-3.03L.6 3.82l3.05-.42z" fill="#ffd23a" stroke="#0d153d" stroke-width=".9" stroke-linejoin="round"/></svg>';

{ const st = document.createElement('style'); st.textContent = `
  #calChip { position: absolute; top: max(10px, env(safe-area-inset-top)); right: max(12px, env(safe-area-inset-right)); display: flex; align-items: center; gap: 7px;
    background: rgba(13,21,61,.72); border: 2px solid #0d153d; border-radius: 999px; padding: 5px 12px 5px 9px; color: #fff; font-weight: 700; font-size: 13px; cursor: pointer; box-shadow: 0 3px 0 #0d153d; z-index: 3; }
  #calChip b { color: #ffd23a; } #calChip:active { transform: translateY(2px); box-shadow: 0 1px 0 #0d153d; }
  #ajCal2 .ajOpc > div { white-space: nowrap; display: inline-flex; align-items: center; gap: 5px; }
  #ajCal2 .oro { background: linear-gradient(#ffe14a, #f5a62a) !important; color: #1b2a6b !important; }
`; document.head.appendChild(st); }

const enApp = () => !!(window.Capacitor && Capacitor.isNativePlatform && Capacitor.isNativePlatform());
function abrirTienda() {
  if (enApp()) { try { location.href = 'market://details?id=' + PLAY_ID; return; } catch (e) {} }
  try { window.open(PLAY_URL, '_blank'); } catch (e) { location.href = PLAY_URL; }
}
function enviarSugerencia() { location.href = `mailto:${MAIL_SUG}?subject=${encodeURIComponent(TR('calAsunto'))}`; }

// botón en el menú principal
{ const c = document.createElement('div'); c.id = 'calChip'; c.innerHTML = ESTRELLA + `<span data-ih="calChip"></span>`; c.onclick = abrirTienda; $('inicio').appendChild(c); }
// fila en Ajustes (antes de Legal)
{ const f = document.createElement('div'); f.className = 'ajFila'; f.id = 'ajCal2';
  f.innerHTML = `<span data-i="calFila"></span><div class="ajOpc"><div data-c2="votar" class="oro">${ESTRELLA}<span data-i="calVotar"></span></div><div data-c2="sug" data-i="calSug"></div></div>`;
  $('ajustes').insertBefore(f, $('ajPriv') || $('bAjListo'));
  f.addEventListener('click', e => { const d = e.target.closest('[data-c2]'); if (!d) return; if (d.dataset.c2 === 'votar') abrirTienda(); else enviarSugerencia(); }); }
aplicarIdioma();

// ventanita oficial de Google, en momentos buenos y como mucho una vez cada 30 días
function pedirResena() {
  if (!enApp()) return;
  const P = Capacitor.Plugins && Capacitor.Plugins.InAppReview; if (!P) return;
  let ult = 0; try { ult = +localStorage.getItem('voxResenaT') || 0; } catch (e) {}
  if (Date.now() - ult < 30 * 864e5) return;
  try { localStorage.setItem('voxResenaT', String(Date.now())); } catch (e) {}
  setTimeout(() => { try { P.requestReview().catch(() => {}); } catch (e) {} }, 2500);
}
window.pedirResena = pedirResena;
{ const r0 = revisarMision; revisarMision = function () { const antes = mision, r = r0.apply(this, arguments); if (antes < 5 && mision >= 5) pedirResena(); return r; }; }
if (typeof gzMostrarFin === 'function') { const g0 = gzMostrarFin; gzMostrarFin = function (G) { const r = g0.apply(this, arguments); try { if (G && G.fin && G.gana && G.gana === gzMiEquipo()) pedirResena(); } catch (e) {} return r; }; }
