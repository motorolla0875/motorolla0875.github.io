'use strict';
// ═════════ ANUNCIOS CON AVISO Y VOXELIUM PRO ═════════
// Se cuenta el tiempo jugado de verdad (no en menús, ni en pausa, ni en el tutorial, ni en línea).
// Al faltar 1 minuto aparece a la izquierda, chiquito: "Anuncio en 0:59". Al llegar a 0 se espera un momento
// tranquilo (sin monstruos cerca, sin caer, sin ir montado) y se abre el cartel: ver el anuncio o jugar sin anuncios.
// En la app: window.mostrarAnuncioIntersticial(cb) (Unity Ads). En la web: un anuncio de prueba.
// Para probar rápido en la web: ?anuncioRapido (los intervalos pasan a ser de segundos).

// minutos de juego entre anuncios: 10, 7, 10, 5 y después se repite 10, 5
const AD_MINUTOS = [10, 7, 10, 5], AD_REPITE = [10, 5];
const AD_RAPIDO = /[?&]anuncioRapido\b/.test(location.search);
const AD_PRECIOS = { sinAnuncios: 'US$ 3,99', mensual: 'US$ 2,99', anual: 'US$ 19,99' };

Object.assign(TX.es, { adSinRedT: 'SIN CONEXIÓN', adSinRed: 'Conéctate a internet para seguir jugando. Con Pro o sin anuncios puedes jugar sin conexión.', adReintentar: 'Ya me conecté', adSigueSinRed: 'TODAVÍA NO HAY CONEXIÓN<small>prende el wifi o los datos</small>', adSinSub: 'Pro o pago único', adEn: 'Anuncio en {t}', adYa: 'Anuncio en un momento…', adPausa: 'PAUSA PUBLICITARIA', adTexto: 'Mira un anuncio corto para seguir jugando.', adVer: 'Ver anuncio y seguir',
  adSinTitulo: 'Juega sin anuncios', adHazPro: 'Hazte Pro', adQuitar: 'Quitar anuncios', adPrueba: 'ANUNCIO DE PRUEBA', adPruebaTxt: 'En la app acá se ve un video corto', adSaltar: 'Cerrar',
  proTitulo: 'VOXELIUM PRO', proSub: 'Juega sin cortes y con cosas que nadie más tiene', proB1: 'Sin anuncios', proB2: 'Criaturas y mascotas exclusivas', proB3: 'Texturas y skins exclusivas', proB4: 'Mapas oficiales Pro',
  proB5: 'Más lugares para guardar mundos', proB6: 'Corona dorada al jugar en línea', proMensual: 'Mensual', proAnual: 'Anual', proAhorro: 'Ahorra 44%', proPorMes: 'por mes', proPorAnio: 'por año', proSuscribirse: 'Suscribirme',
  proUnico: 'Solo quitar anuncios', proUnicoSub: 'Pagas una vez y es para siempre', proComprar: 'Comprar', proRestaurar: 'Restaurar compras', proLegal: 'La suscripción se renueva sola. La puedes cancelar cuando quieras desde la tienda.',
  proYa: '¡YA ERES PRO!<small>gracias por apoyar Voxelium</small>', sinAnunciosYa: '¡LISTO, SIN ANUNCIOS!<small>gracias por apoyar Voxelium</small>', proSim: 'Compra de prueba (en la web no se cobra nada). ¿Seguir?', proActivo: 'Eres Pro', sinAnunciosActivo: 'Ya no tienes anuncios', nadaRestaurar: 'NO HAY COMPRAS PARA RESTAURAR' });
Object.assign(TX.en, { adSinRedT: 'NO CONNECTION', adSinRed: 'Connect to the internet to keep playing. With Pro or no ads you can play offline.', adReintentar: 'I am connected', adSigueSinRed: 'STILL NO CONNECTION<small>turn on wifi or mobile data</small>', adSinSub: 'Pro or one-time purchase', adEn: 'Ad in {t}', adYa: 'Ad in a moment…', adPausa: 'AD BREAK', adTexto: 'Watch a short ad to keep playing.', adVer: 'Watch ad and continue',
  adSinTitulo: 'Play without ads', adHazPro: 'Go Pro', adQuitar: 'Remove ads', adPrueba: 'TEST AD', adPruebaTxt: 'In the app a short video plays here', adSaltar: 'Close',
  proTitulo: 'VOXELIUM PRO', proSub: 'Play without breaks and with things nobody else has', proB1: 'No ads', proB2: 'Exclusive creatures and pets', proB3: 'Exclusive textures and skins', proB4: 'Pro official maps',
  proB5: 'More slots to save worlds', proB6: 'Golden crown when playing online', proMensual: 'Monthly', proAnual: 'Yearly', proAhorro: 'Save 44%', proPorMes: 'per month', proPorAnio: 'per year', proSuscribirse: 'Subscribe',
  proUnico: 'Just remove ads', proUnicoSub: 'Pay once, keep it forever', proComprar: 'Buy', proRestaurar: 'Restore purchases', proLegal: 'The subscription renews automatically. You can cancel it anytime from the store.',
  proYa: "YOU'RE PRO!<small>thanks for supporting Voxelium</small>", sinAnunciosYa: 'DONE, NO MORE ADS!<small>thanks for supporting Voxelium</small>', proSim: 'Test purchase (nothing is charged on the web). Continue?', proActivo: "You're Pro", sinAnunciosActivo: 'You have no ads', nadaRestaurar: 'NO PURCHASES TO RESTORE' });
Object.assign(TX.pt, { adSinRedT: 'SEM CONEXÃO', adSinRed: 'Conecte-se à internet para continuar jogando. Com Pro ou sem anúncios você pode jogar offline.', adReintentar: 'Já me conectei', adSigueSinRed: 'AINDA SEM CONEXÃO<small>ligue o wifi ou os dados</small>', adSinSub: 'Pro ou pagamento único', adEn: 'Anúncio em {t}', adYa: 'Anúncio em um instante…', adPausa: 'PAUSA PARA ANÚNCIO', adTexto: 'Veja um anúncio curto para continuar jogando.', adVer: 'Ver anúncio e continuar',
  adSinTitulo: 'Jogue sem anúncios', adHazPro: 'Seja Pro', adQuitar: 'Remover anúncios', adPrueba: 'ANÚNCIO DE TESTE', adPruebaTxt: 'No app aqui passa um vídeo curto', adSaltar: 'Fechar',
  proTitulo: 'VOXELIUM PRO', proSub: 'Jogue sem pausas e com coisas que ninguém mais tem', proB1: 'Sem anúncios', proB2: 'Criaturas e mascotes exclusivos', proB3: 'Texturas e skins exclusivas', proB4: 'Mapas oficiais Pro',
  proB5: 'Mais espaços para salvar mundos', proB6: 'Coroa dourada ao jogar online', proMensual: 'Mensal', proAnual: 'Anual', proAhorro: 'Economize 44%', proPorMes: 'por mês', proPorAnio: 'por ano', proSuscribirse: 'Assinar',
  proUnico: 'Só remover anúncios', proUnicoSub: 'Paga uma vez e é para sempre', proComprar: 'Comprar', proRestaurar: 'Restaurar compras', proLegal: 'A assinatura renova sozinha. Você pode cancelar quando quiser na loja.',
  proYa: 'VOCÊ É PRO!<small>obrigado por apoiar o Voxelium</small>', sinAnunciosYa: 'PRONTO, SEM ANÚNCIOS!<small>obrigado por apoiar o Voxelium</small>', proSim: 'Compra de teste (na web nada é cobrado). Continuar?', proActivo: 'Você é Pro', sinAnunciosActivo: 'Você não tem mais anúncios', nadaRestaurar: 'NÃO HÁ COMPRAS PARA RESTAURAR' });

// ─── ¿tiene Pro o compró "sin anuncios"? ───
const lsLeer = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } };
const lsPoner = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
function esPro() { const u = +lsLeer('voxProHasta', 0), c = +lsLeer('voxCodigoHasta', 0); return u === -1 || u > Date.now() || c > Date.now(); }   // voxCodigoHasta: Pro activado con un código (no lo toca la tienda)
function sinAnuncios() { return esPro() || lsLeer('voxSinAnuncios', '0') === '1'; }
window.esPro = esPro; window.sinAnuncios = sinAnuncios;

// ─── íconos (SVG, sin emojis) ───
const SVG_WIFI = '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="19.5" r="1.8" fill="currentColor"/></svg>';
const SVG_TV = '<svg viewBox="0 0 24 24" width="16" height="16"><rect x="2" y="5" width="20" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M10 9v5l4.5-2.5z" fill="currentColor"/></svg>';
const SVG_PRO_OK = '<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="11" fill="#36c95a"/><path d="M6.5 12.5l3.5 3.5 7.5-8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const SVG_CORONA = '<svg viewBox="0 0 32 24" width="34" height="26"><path d="M3 20h26l2-15-8 6-7-9-7 9-8-6z" fill="#ffd23a" stroke="#c8841a" stroke-width="2" stroke-linejoin="round"/><circle cx="16" cy="14" r="2.4" fill="#e03a5a"/></svg>';

{ const st = document.createElement('style'); st.textContent = `
  #adCuenta { position: fixed; left: 10px; top: 50%; transform: translateY(-50%); z-index: 6; display: flex; align-items: center; gap: 6px; padding: 5px 10px 4px 8px;
    background: rgba(13,21,61,.72); color: #fff; border: 2px solid rgba(255,210,58,.75); border-radius: 12px; font: 800 13px 'Baloo 2', 'Trebuchet MS', sans-serif; pointer-events: none; }
  #adCuenta svg { color: #ffd23a; flex: none; } #adCuenta.ultimos { border-color: #ff7a3a; } #adCuenta.ultimos b { color: #ffd23a; }
  #adCapa .ventana { max-width: 460px; } #proCapa .ventana { max-width: 460px; }
  #proCuerpo .x2 { display: none; position: absolute; top: 8px; right: 10px; width: 30px; height: 30px; border-radius: 8px; background: #e0405a; color: #fff; font-weight: 800; align-items: center; justify-content: center; cursor: pointer; border: 2px solid #8a1a2a; }
  @media (max-height: 520px) and (min-width: 600px) { #proCapa .ventana { max-width: 760px; } #proCuerpo { display: grid; grid-template-columns: 1.1fr 1fr; gap: 0 16px; align-items: start; } #proCuerpo .izq, #proCuerpo .der { min-width: 0; } .proLista { grid-template-columns: 1fr; } #proCapa .vCab { display: none; } #proCuerpo { position: relative; padding-top: 12px; } #proCuerpo .x2 { display: flex; } #proCuerpo .der { padding-top: 30px; } }
  #adCuerpo { padding: 14px 16px 16px; text-align: center; color: #1b2a6b; }
  #adCuerpo .adT { font-weight: 700; font-size: 15px; margin-bottom: 10px; }
  #adVer { margin: 0 auto 6px; width: min(300px, 90%); background: #36c95a; } #adCapa.sinRed #adVer { background: #4a7cff; } #adVer.esperando { opacity: .6; pointer-events: none; }
  .adPro { margin-top: 12px; padding: 10px 12px; border-radius: 14px; background: linear-gradient(#fff6d8, #ffe9a8); border: 2px solid #ffb21a; display: flex; align-items: center; gap: 10px; text-align: left; }
  .adPro .tx { flex: 1; } .adPro .tx b { display: block; font-size: 15px; } .adPro .tx small { font-size: 12px; color: #6b5a2a; font-weight: 700; }
  .adPro .pb { padding: 6px 10px; border-radius: 10px; background: #ffd23a; border: 2px solid #c8841a; font-weight: 800; font-size: 13px; color: #1b2a6b; cursor: pointer; white-space: nowrap; }
  .adPro .pb + .pb { background: #fff; }
  #proCuerpo { padding: 10px 16px 14px; color: #1b2a6b; overflow: auto; max-height: calc(100vh - 90px); }
  #proCuerpo .cab { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; } #proCuerpo .cab b { font-size: 20px; letter-spacing: 1px; } #proCuerpo .cab small { display: block; font-size: 12px; font-weight: 700; color: #5a6aa8; }
  .proLista { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 10px; margin: 6px 0 10px; } .proLista div { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; } .proLista svg { flex: none; }
  .proPlanes { display: flex; gap: 8px; } .proPlan { flex: 1; position: relative; padding: 8px 6px; border-radius: 12px; border: 2px solid #d5dbf3; background: #fff; text-align: center; cursor: pointer; font-weight: 800; }
  .proPlan.on { border-color: #c8841a; background: #fff6d8; box-shadow: 0 0 0 3px rgba(255,178,26,.35); } .proPlan .pr { font-size: 18px; color: #1b2a6b; } .proPlan small { display: block; font-size: 11px; color: #5a6aa8; }
  .proPlan .tag { position: absolute; top: -9px; right: 6px; background: #36c95a; color: #fff; font-size: 10px; padding: 1px 6px; border-radius: 8px; }
  #proSuscribir { margin: 8px auto 4px; width: 100%; background: #c8841a; }
  .proUnico { display: flex; align-items: center; gap: 10px; margin-top: 8px; padding: 8px 10px; border: 2px solid #d5dbf3; border-radius: 12px; background: #fff; }
  .proUnico .tx { flex: 1; font-weight: 800; font-size: 14px; } .proUnico .tx small { display: block; font-size: 11px; color: #5a6aa8; }
  .proUnico .pb { padding: 6px 10px; border-radius: 10px; background: #ffd23a; border: 2px solid #c8841a; font-weight: 800; font-size: 13px; cursor: pointer; white-space: nowrap; }
  .proPie { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 8px; font-size: 10.5px; color: #5a6aa8; font-weight: 600; }
  .proPie .rest { text-decoration: underline; cursor: pointer; white-space: nowrap; font-weight: 800; }
  .proActivo { text-align: center; padding: 14px 0; font-weight: 800; font-size: 16px; }
  #bQuitarAnuncios { background: #c8841a; }
`; document.head.appendChild(st); }

// ─── el contador chiquito de la izquierda ───
const adCuentaEl = document.createElement('div'); adCuentaEl.id = 'adCuenta'; adCuentaEl.hidden = true; document.body.appendChild(adCuentaEl);

// ─── el cartel del anuncio ───
cap('adCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="adPausa"></div><div style="flex:1"></div></div>
  <div id="adCuerpo"><div class="adT" data-i="adTexto"></div><div class="btn" id="adVer"></div>
  <div class="adPro">${SVG_CORONA}<div class="tx"><b data-i="adSinTitulo"></b><small data-i="adSinSub"></small></div><div class="pb" id="adPro" data-i="adHazPro"></div><div class="pb" id="adQuitar"></div></div></div></div>`);
// anuncio de prueba (web)
cap('adPruebaCapa', `<div class="titulo" style="font-size:clamp(22px,4vw,34px)" data-i="adPrueba"></div><div class="texto" data-i="adPruebaTxt"></div><div class="titulo" id="adPruebaN" style="font-size:60px">5</div><div class="btn" id="adPruebaX" data-i="adSaltar" hidden></div>`, false);
// pantalla Pro
cap('proCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="proTitulo"></div><div style="flex:1"></div><div class="cerrar" id="proCerrar">X</div></div><div id="proCuerpo"></div></div>`);

// ─── reloj del anuncio ───
let adN = 0, adFalta = 0, adEsperando = false, adAbierto = false, proDesdeAnuncio = false;
const adIntervalo = n => (n < AD_MINUTOS.length ? AD_MINUTOS[n] : AD_REPITE[(n - AD_MINUTOS.length) % AD_REPITE.length]) * (AD_RAPIDO ? 9 : 60);
adFalta = adIntervalo(0);
const enLineaAhora = () => { try { return !!(MP && MP.sala); } catch (e) { return false; } };
// en la web no hay anuncios (solo en la app); para probarlos en la web: ?anuncioRapido
const adEnApp = () => { const C = window.Capacitor; return !!(C && C.isNativePlatform && C.isNativePlatform()); };
const cuentaActiva = () => (adEnApp() || AD_RAPIDO) && jugando && !pausado && !document.hidden && window.mundoTipo !== 'tutorial' && !enLineaAhora() && !sinAnuncios();
// momento tranquilo: sin monstruos cerca, en el suelo (o volando en creativo), sin ir montado, sin paneles abiertos
function momentoTranquilo() {
  if (!cuentaActiva()) return false;
  try { if (monstruos.some(m => Math.hypot(m.position.x - J.x, m.position.y - J.y, m.position.z - J.z) < 12)) return false; } catch (e) {}
  if (window.montando || (typeof jinete !== 'undefined' && jinete)) return false;
  if (!J.suelo && !volando) return false;
  if (typeof vida !== 'undefined' && vida <= 0) return false;
  return true;
}
const mmss = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
let adUlt = performance.now();
setInterval(() => {
  const ahora = performance.now(), dt = Math.min(1, (ahora - adUlt) / 1000); adUlt = ahora;
  if (adAbierto) return;
  if (!cuentaActiva()) { adCuentaEl.hidden = true; return; }
  if (!adEsperando) { adFalta -= dt; if (adFalta <= 0) { adFalta = 0; adEsperando = true; } }
  if (adEsperando) {
    adCuentaEl.hidden = false; adCuentaEl.classList.add('ultimos'); adCuentaEl.innerHTML = SVG_TV + '<span>' + TR('adYa') + '</span>';
    if (momentoTranquilo()) abrirCartelAnuncio();
    return;
  }
  if (adFalta <= 60) {
    adCuentaEl.hidden = false; adCuentaEl.classList.toggle('ultimos', adFalta <= 10);
    adCuentaEl.innerHTML = SVG_TV + '<span>' + TR('adEn', { t: '<b>' + mmss(Math.ceil(adFalta)) + '</b>' }) + '</span>';
  } else adCuentaEl.hidden = true;
}, 250);

function siguienteAnuncio() { adN++; adFalta = adIntervalo(adN); adEsperando = false; adAbierto = false; adCuentaEl.hidden = true; }
// ¿hay internet? (modo avión / sin wifi: navigator.onLine es false; si dice que sí, se prueba de verdad)
async function hayInternet() {
  if (window.__sinRedPrueba) return false;
  if (navigator.onLine === false) return false;
  try { const c = new AbortController(), t = setTimeout(() => c.abort(), 4000);
    await fetch('https://dmith.app/favicon.ico?r=' + Date.now(), { mode: 'no-cors', cache: 'no-store', signal: c.signal }); clearTimeout(t); return true; }
  catch (e) { return false; }
}
let adSinRed = false;
function pintarCartel() {
  $('adCapa').classList.toggle('sinRed', adSinRed);
  $('adCapa').querySelector('.vCab .tab').textContent = TR(adSinRed ? 'adSinRedT' : 'adPausa');
  $('adCuerpo').querySelector('.adT').textContent = TR(adSinRed ? 'adSinRed' : 'adTexto');
  $('adVer').innerHTML = adSinRed ? SVG_WIFI + ' ' + TR('adReintentar') : SVG_TV.replace('16" height="16"', '20" height="20"') + ' ' + TR('adVer');
  $('adQuitar').textContent = TR('adQuitar') + ' ' + AD_PRECIOS.sinAnuncios;
}
async function abrirCartelAnuncio() {
  adAbierto = true; adCuentaEl.hidden = true; pausado = true; soltarTodo();
  adSinRed = !(await hayInternet());
  aplicarIdioma(); pintarCartel(); abrir('adCapa');
}
// si vuelve la conexión con el cartel "conéctate" abierto, pasa solo al anuncio
window.addEventListener('online', () => { if (adAbierto && adSinRed) setTimeout(async () => { if (await hayInternet()) { adSinRed = false; pintarCartel(); } }, 800); });
function volverAJugar() { cerrar('adCapa'); pausado = false; siguienteAnuncio(); }
// mostrar el anuncio: en la app Unity Ads; en la web uno de prueba de 5 segundos
function mostrarIntersticial(cb) {
  if (typeof window.mostrarAnuncioIntersticial === 'function') { try { return window.mostrarAnuncioIntersticial(() => cb()); } catch (e) { return cb(); } }
  abrir('adPruebaCapa'); $('adPruebaX').hidden = true; let n = 5; $('adPruebaN').textContent = n;
  const t = setInterval(() => { n--; $('adPruebaN').textContent = Math.max(0, n); if (n <= 0) { clearInterval(t); $('adPruebaX').hidden = false; } }, 1000);
  $('adPruebaX').onclick = () => { cerrar('adPruebaCapa'); cb(); };
}
$('adVer').onclick = async () => {
  if (adSinRed) { $('adVer').classList.add('esperando'); const ok = await hayInternet(); $('adVer').classList.remove('esperando');
    if (!ok) { aviso(TR('adSigueSinRed'), 1500); return; } adSinRed = false; pintarCartel(); return; }
  cerrar('adCapa'); mostrarIntersticial(() => { pausado = false; siguienteAnuncio(); }); };
$('adPro').onclick = () => { proDesdeAnuncio = true; abrirPro(); };
$('adQuitar').onclick = () => comprar('sinAnuncios');

// ─── pantalla Voxelium Pro ───
let planPro = 'anual';
function pintarPro() {
  const c = $('proCuerpo');
  const lista = ['proB1', 'proB2', 'proB3', 'proB4', 'proB5', 'proB6', 'proB7'].map(k => `<div>${SVG_PRO_OK}<span>${TR(k)}</span></div>`).join('');
  if (esPro()) { c.innerHTML = `<div class="cab">${SVG_CORONA}<div><b>${TR('proTitulo')}</b><small>${TR('proSub')}</small></div></div><div class="proLista">${lista}</div><div class="proActivo">${TR('proActivo')}</div>`; return; }
  c.innerHTML = `<div class="x2" id="proCerrar2">X</div><div class="izq"><div class="cab">${SVG_CORONA}<div><b>${TR('proTitulo')}</b><small>${TR('proSub')}</small></div></div>
    <div class="proLista">${lista}</div></div><div class="der">
    <div class="proPlanes">
      <div class="proPlan${planPro === 'mensual' ? ' on' : ''}" data-plan="mensual">${TR('proMensual')}<div class="pr">${AD_PRECIOS.mensual}</div><small>${TR('proPorMes')}</small></div>
      <div class="proPlan${planPro === 'anual' ? ' on' : ''}" data-plan="anual"><span class="tag">${TR('proAhorro')}</span>${TR('proAnual')}<div class="pr">${AD_PRECIOS.anual}</div><small>${TR('proPorAnio')}</small></div>
    </div>
    <div class="btn" id="proSuscribir">${TR('proSuscribirse')}</div>
    ${lsLeer('voxSinAnuncios', '0') === '1' ? `<div class="proUnico"><div class="tx">${TR('sinAnunciosActivo')}</div></div>` :
      `<div class="proUnico"><div class="tx">${TR('proUnico')}<small>${TR('proUnicoSub')}</small></div><div class="pb" id="proUnicoBtn">${AD_PRECIOS.sinAnuncios}</div></div>`}
    <div class="proPie"><span>${TR('proLegal')}</span><span class="rest" id="proRest">${TR('proRestaurar')}</span></div></div>`;
  $('proCerrar2').onclick = () => $('proCerrar').onclick();
  c.querySelectorAll('[data-plan]').forEach(p => p.onclick = () => { planPro = p.dataset.plan; pintarPro(); });
  $('proSuscribir').onclick = () => comprar(planPro);
  if ($('proUnicoBtn')) $('proUnicoBtn').onclick = () => comprar('sinAnuncios');
  $('proRest').onclick = restaurar;
}
function abrirPro() { pintarPro(); aplicarIdioma(); if (jugando) { pausado = true; soltarTodo(); } abrir('proCapa'); }
window.abrirPro = abrirPro;
$('proCerrar').onclick = () => { cerrar('proCapa'); if (adAbierto && !sinAnuncios()) return;   // vuelve al cartel del anuncio
  if (jugando && $('pausa').hidden) pausado = false; };

// ─── comprar: en la app irá por la tienda (RevenueCat); en la web es de prueba ───
async function comprar(que) {
  let ok = false;
  if (typeof window.comprarVoxelium === 'function') { try { ok = await window.comprarVoxelium(que); } catch (e) { ok = false; } }
  else ok = confirm(TR('proSim'));
  if (!ok) return;
  if (que === 'sinAnuncios') lsPoner('voxSinAnuncios', '1');
  else if (!esPro()) lsPoner('voxProHasta', String(Date.now() + (que === 'anual' ? 365 : 30) * 864e5));   // en la app ya lo puso la tienda con la fecha real
  aviso(TR(que === 'sinAnuncios' ? 'sinAnunciosYa' : 'proYa'), 2200); sonar('final', .6) || son(880, .3, 'triangle', .12);
  cerrar('proCapa');
  if (adAbierto) { cerrar('adCapa'); adAbierto = false; adEsperando = false; adCuentaEl.hidden = true; pausado = false; }
  else if (jugando && $('pausa').hidden) pausado = false;
  actualizarBotonPausa();
  if (typeof window.alCambiarPro === 'function') window.alCambiarPro();
}
async function restaurar() {
  if (typeof window.restaurarVoxelium === 'function') { try { await window.restaurarVoxelium(); } catch (e) {} pintarPro(); return; }
  aviso(TR('nadaRestaurar'), 1500);
}

// ─── botón en la pausa: "Quitar anuncios" (se oculta si ya es Pro o compró) ───
const bQuitar = document.createElement('div'); bQuitar.className = 'btn'; bQuitar.id = 'bQuitarAnuncios';
bQuitar.onclick = () => { $('pausa').hidden = true; abrirPro(); };
{ const sm = $('bSubirMapa'); if (sm && sm.parentNode === $('pausa')) { const fila = document.createElement('div'); fila.className = 'filaBtn'; sm.parentNode.insertBefore(fila, sm); fila.appendChild(sm); fila.appendChild(bQuitar); } else $('pausa').insertBefore(bQuitar, $('bSalir')); }
function actualizarBotonPausa() { bQuitar.innerHTML = SVG_CORONA.replace('34" height="26"', '22" height="17"') + ' ' + TR('adQuitar'); bQuitar.style.display = sinAnuncios() ? 'none' : ''; }
new MutationObserver(() => { if (!$('pausa').hidden) actualizarBotonPausa(); }).observe($('pausa'), { attributes: true, attributeFilter: ['hidden'] });
actualizarBotonPausa();

window.__anuncios = { estado: () => ({ adN, adFalta, adEsperando, adAbierto }), forzar: s => { adFalta = s; adEsperando = false; } };
