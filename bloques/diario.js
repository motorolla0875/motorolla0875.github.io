'use strict';
// ═════════ VOLVER CADA DÍA: regalo diario (racha de 7 días) y récords en línea ═════════
// Récords: Parkour de lava (menos tiempo) y Noche de zombis (más oleadas). Esta semana y de siempre.
// Se guardan en el servidor de Voxelium; si no hay conexión, el juego sigue igual.

Object.assign(TX.es, { regaloDia: 'REGALO DEL DÍA', regaloDiaSub: 'Vuelve mañana para seguir la racha. El día 7 trae el mejor premio.', dia: 'Día {n}', recibir: 'Recibir', recibido: '¡RECIBIDO!<small>ya está en tu bolsa</small>',
  records: 'Récords', recParkour: 'Parkour de lava', recOleadas: 'Noche de zombis', recSemana: 'Esta semana', recSiempre: 'De siempre', recNadie: 'Todavía nadie tiene récord acá. ¡Sé el primero!',
  recTu: 'Tú: puesto {p} · {v}', recSinTu: 'Todavía no tienes récord en esta tabla', recNuevo: '¡NUEVO RÉCORD EN LÍNEA!<small>puesto {p} de esta semana</small>', recOlas: '{n} oleadas', recCargando: 'Cargando…', recNota: 'Los récords se ven con tu nombre de jugador en línea.' });
Object.assign(TX.en, { regaloDia: 'DAILY GIFT', regaloDiaSub: 'Come back tomorrow to keep your streak. Day 7 has the best prize.', dia: 'Day {n}', recibir: 'Claim', recibido: 'CLAIMED!<small>it is in your bag</small>',
  records: 'Records', recParkour: 'Lava Parkour', recOleadas: 'Zombie Night', recSemana: 'This week', recSiempre: 'All time', recNadie: 'Nobody has a record here yet. Be the first!',
  recTu: 'You: rank {p} · {v}', recSinTu: 'You have no record in this table yet', recNuevo: 'NEW ONLINE RECORD!<small>rank {p} this week</small>', recOlas: '{n} waves', recCargando: 'Loading…', recNota: 'Records show your online player name.' });
Object.assign(TX.pt, { regaloDia: 'PRESENTE DO DIA', regaloDiaSub: 'Volte amanhã para manter a sequência. O dia 7 tem o melhor prêmio.', dia: 'Dia {n}', recibir: 'Receber', recibido: 'RECEBIDO!<small>já está na sua bolsa</small>',
  records: 'Recordes', recParkour: 'Parkour de lava', recOleadas: 'Noite dos zumbis', recSemana: 'Esta semana', recSiempre: 'De sempre', recNadie: 'Ninguém tem recorde aqui ainda. Seja o primeiro!',
  recTu: 'Você: posição {p} · {v}', recSinTu: 'Você ainda não tem recorde nesta tabela', recNuevo: 'NOVO RECORDE ONLINE!<small>posição {p} desta semana</small>', recOlas: '{n} ondas', recCargando: 'Carregando…', recNota: 'Os recordes mostram seu nome de jogador online.' });

{ const st = document.createElement('style'); st.textContent = `
  #diaCapa .ventana, #recCapa .ventana { max-width: 640px; }
  #diaFila { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; padding: 10px 12px 4px; }
  .diaC { background: #fff; border: 2px solid #d5dbf3; border-radius: 12px; padding: 4px 2px 6px; text-align: center; font-size: 12px; color: #5a6aa8; font-weight: 700; position: relative; }
  .diaC.hoy { border-color: #ffb21a; background: #fff6d8; box-shadow: 0 0 0 3px rgba(255,178,26,.35); color: #1b2a6b; }
  .diaC.ya { background: #e5f6e3; border-color: #8fcf86; }
  .diaC .its { display: flex; flex-wrap: wrap; justify-content: center; gap: 1px; min-height: 30px; margin-top: 3px; }
  .diaC .its span { position: relative; width: 24px; height: 24px; background-size: contain; image-rendering: pixelated; }
  .diaC .its b { position: absolute; right: -2px; bottom: -4px; font-size: 10px; color: #fff; text-shadow: 0 1px 0 #000, 0 -1px 0 #000, 1px 0 0 #000, -1px 0 0 #000; }
  .diaC svg.ok { position: absolute; top: -6px; right: -6px; width: 18px; height: 18px; }
  #diaSub { padding: 2px 14px 8px; font-size: 13px; color: #5a6aa8; font-weight: 600; text-align: center; }
  #diaRecibir { margin: 0 auto 12px; width: min(260px, 80%); }
  #recTabs { display: flex; gap: 6px; padding: 8px 12px 0; flex-wrap: wrap; }
  #recTabs .mb { flex: 1; text-align: center; padding: 6px 4px; border-radius: 10px; background: #e8ebf7; border: 2px solid #d5dbf3; font-weight: 800; font-size: 13px; color: #1b2a6b; cursor: pointer; }
  #recTabs .mb.on { background: #ffd23a; border-color: #c8841a; }
  #recLista { padding: 8px 12px; overflow: auto; min-height: 120px; }
  .recF { display: flex; align-items: center; gap: 8px; background: #fff; border: 2px solid #d5dbf3; border-radius: 10px; padding: 4px 8px; margin-bottom: 4px; font-weight: 800; color: #1b2a6b; font-size: 14px; }
  .recF.yo { background: #fff6d8; border-color: #ffb21a; }
  .recF .pos { width: 26px; height: 26px; flex: none; display: flex; align-items: center; justify-content: center; font-size: 13px; }
  .recF .nom { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .recF .val { color: #c8641a; }
  #recYo { padding: 0 12px 4px; font-size: 13px; font-weight: 700; color: #1b2a6b; } #recNota { padding: 0 12px 10px; font-size: 11px; color: #5a6aa8; font-weight: 600; }
`; document.head.appendChild(st); }

// ═════════ REGALO DEL DÍA ═════════
const PREMIOS = [
  [[I.PAN, 4]],
  [[B.ANTORCHA, 8], [I.CARBON, 4]],
  [[I.CHULETA_A, 3], [I.HIERRO, 3]],
  [[I.ORO, 3], [I.MANZANA, 4]],
  [[I.COHETE, 3], [I.MIEL, 2], [I.HIERRO, 4]],
  [[I.CRISTAL, 1], [I.PAN, 4]],
  [[I.CRISTAL, 3], [I.ORO, 4], [I.DISCO, 1]],
];
const hoyTxt = (d = new Date()) => d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
function leerDia() { try { return JSON.parse(localStorage.getItem('voxDiario') || '{}') || {}; } catch (e) { return {}; } }
function rachaHoy() { // qué día de la racha toca hoy (1..7), o 0 si ya se recibió
  const d = leerDia(), hoy = hoyTxt(); if (d.ult === hoy) return 0;
  const ayer = new Date(); ayer.setDate(ayer.getDate() - 1);
  return d.ult === hoyTxt(ayer) ? (d.racha % 7) + 1 : 1;
}
const SVG_OK = '<svg class="ok" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#3fae4a" stroke="#0d153d" stroke-width="2"/><path d="M5.5 10.5l3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
cap('diaCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="regaloDia"></div><div style="flex:1"></div><div class="cerrar" id="diaCerrar">X</div></div><div id="diaFila"></div><div id="diaSub" data-i="regaloDiaSub"></div><div class="btn" id="diaRecibir" data-i="recibir"></div></div>`);
function pintarDia(n) {
  $('diaFila').innerHTML = PREMIOS.map((p, k) => `<div class="diaC${k + 1 === n ? ' hoy' : k + 1 < n ? ' ya' : ''}">${TR('dia', { n: k + 1 })}${k + 1 < n ? SVG_OK : ''}<div class="its">${p.map(([id, c]) => `<span style="background-image:url(${icono(id)})"><b>${c > 1 ? c : ''}</b></span>`).join('')}</div></div>`).join('');
}
let diaPendiente = 0;
function ofrecerRegalo() {
  if (!jugando || modoJuego !== 'supervivencia' || window.mundoTipo || (window.__mp && __mp.MP.invitado)) return;
  const n = rachaHoy(); if (!n) return; diaPendiente = n;
  pintarDia(n); aplicarIdioma(); pausado = true; soltarTodo(); abrir('diaCapa'); son(660, .15, 'triangle', .1);
}
$('diaRecibir').onclick = () => {
  const n = diaPendiente; if (!n || !jugando) { cerrar('diaCapa'); pausado = false; return; }
  diaPendiente = 0; for (const [id, c] of PREMIOS[n - 1]) darItem(id === I.DISCO ? I.DISCO + Math.floor(Math.random() * 3) : id, c);
  try { localStorage.setItem('voxDiario', JSON.stringify({ ult: hoyTxt(), racha: n })); } catch (e) {}
  sucio = true; cerrar('diaCapa'); pausado = false; pintarBarra(); aviso(TR('recibido'), 1800);
  sonar('final', .6) || son(988, .25, 'triangle', .12);
};
$('diaCerrar').onclick = () => { cerrar('diaCapa'); pausado = false; }; // si lo cierra, se le vuelve a ofrecer la próxima vez que entre
{ const e0 = entrarMundo; entrarMundo = function (id) { const r = e0(id); setTimeout(ofrecerRegalo, 2500); return r; }; }

// ═════════ RÉCORDS EN LÍNEA ═════════
const REC = { tabla: 'parkour', vista: 'semana', datos: {}, desde: null };
const miDev = (() => { try { let d = localStorage.getItem('voxDev'); if (!d || !/^[a-z0-9]{8,40}$/.test(d)) { d = Array.from({ length: 16 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join(''); localStorage.setItem('voxDev', d); } return d; } catch (e) { return 'singuardar' + Math.floor(Math.random() * 1e9); } })();
const valorRec = (tabla, v) => tabla === 'parkour' ? fmtT(v) + '.' + String(Math.floor((v % 1) * 10)) : TR('recOlas', { n: v });
const conectarRec = () => (__mp.MP.ws && __mp.MP.ws.readyState === 1) ? Promise.resolve() : __mp.conectar();
function mandarRecord(tabla, v) {
  REC.esperaNuevo = tabla;
  conectarRec().then(() => __mp.MP.ws.send(JSON.stringify({ t: 'record', tabla, v, dev: miDev }))).catch(() => {});
}
function pedirRecords() { conectarRec().then(() => __mp.MP.ws.send(JSON.stringify({ t: 'records', tabla: REC.tabla, dev: miDev }))).catch(() => { $('recLista').innerHTML = `<div class="recF">${TR('sinConexion')}</div>`; }); }
const SVG_COPA = c => `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M6 3h12v4a6 6 0 01-12 0z" fill="${c}" stroke="#0d153d" stroke-width="1.6"/><path d="M6 5H3v1a4 4 0 004 4M18 5h3v1a4 4 0 01-4 4" fill="none" stroke="#0d153d" stroke-width="1.6"/><path d="M10 13h4v4h-4z" fill="${c}" stroke="#0d153d" stroke-width="1.4"/><path d="M7 21h10v-3H7z" fill="#8a5a2b" stroke="#0d153d" stroke-width="1.4"/></svg>`;
const COPAS = ['#ffd23a', '#d8dcef', '#e0965a'];
function pintarRecords() {
  for (const d of document.querySelectorAll('#recTabs [data-tb]')) d.classList.toggle('on', d.dataset.tb === REC.tabla);
  for (const d of document.querySelectorAll('#recTabs [data-vs]')) d.classList.toggle('on', d.dataset.vs === REC.vista);
  const r = REC.datos[REC.tabla]; if (!r) { $('recLista').innerHTML = `<div class="recF">${TR('recCargando')}</div>`; $('recYo').textContent = ''; return; }
  const l = REC.vista === 'semana' ? r.semana : r.siempre, yo = REC.vista === 'semana' ? r.yoW : r.yoS;
  $('recLista').innerHTML = l.length ? l.map(([n, v], k) => `<div class="recF${yo && yo[0] === k + 1 ? ' yo' : ''}"><div class="pos">${k < 3 ? SVG_COPA(COPAS[k]) : k + 1}</div><div class="nom">${String(n).replace(/[<>&"]/g, '')}</div><div class="val">${valorRec(REC.tabla, +v)}</div></div>`).join('') : `<div class="recF">${TR('recNadie')}</div>`;
  $('recYo').textContent = yo ? TR('recTu', { p: yo[0], v: valorRec(REC.tabla, yo[1]) }) : TR('recSinTu');
}
cap('recCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="records"></div><div style="flex:1"></div><div class="cerrar" id="recCerrar">X</div></div>
  <div id="recTabs"><div class="mb" data-tb="parkour" data-i="recParkour"></div><div class="mb" data-tb="oleadas" data-i="recOleadas"></div></div>
  <div id="recTabs2" style="display:flex;gap:6px;padding:6px 12px 0"></div><div id="recLista"></div><div id="recYo"></div><div id="recNota" data-i="recNota"></div></div>`);
$('recTabs2').innerHTML = '<div class="mb" data-vs="semana" data-i="recSemana"></div><div class="mb" data-vs="siempre" data-i="recSiempre"></div>';
$('recTabs').appendChild(document.createElement('div')).style.flexBasis = '100%';
for (const d of [...$('recTabs2').children]) $('recTabs').appendChild(d); $('recTabs2').remove();
function abrirRecords(desde, tabla) {
  REC.desde = desde; if (desde) $(desde).hidden = true; if (tabla) REC.tabla = tabla;
  aplicarIdioma(); pintarRecords(); abrir('recCapa'); pedirRecords();
}
$('recCerrar').onclick = () => { cerrar('recCapa'); if (REC.desde) $(REC.desde).hidden = false; };
$('recTabs').addEventListener('click', e => { const d = e.target.closest('.mb'); if (!d) return;
  if (d.dataset.tb) { REC.tabla = d.dataset.tb; pintarRecords(); pedirRecords(); } else if (d.dataset.vs) { REC.vista = d.dataset.vs; pintarRecords(); } });
// lo que contesta el servidor
{ const r0 = recibir; recibir = function (m) {
    if (m && m.t === 'records' && (m.tabla === 'parkour' || m.tabla === 'oleadas')) {
      REC.datos[m.tabla] = { siempre: m.siempre || [], semana: m.semana || [], yoS: m.yoS, yoW: m.yoW };
      if (REC.esperaNuevo === m.tabla && m.nuevo && m.yoW) { aviso(TR('recNuevo', { p: m.yoW[0] }), 2600); }
      REC.esperaNuevo = null; if (!$('recCapa').hidden) pintarRecords(); return;
    }
    return r0(m);
  }; }
// botón Récords: en el inicio (al lado de Logros) y al llegar a la meta del parkour
{ const b = document.createElement('div'); b.className = 'btn'; b.id = 'bRecords'; b.dataset.i = 'records'; b.onclick = () => abrirRecords('inicio');
  $('bLogrosHome').parentNode.insertBefore(b, $('bLogrosHome').nextSibling);
  const m = document.createElement('div'); m.className = 'btn'; m.id = 'metaRecords'; m.dataset.i = 'records'; m.onclick = () => abrirRecords('metaCapa', 'parkour');
  $('metaCapa').appendChild(m); aplicarIdioma(); }

// ─── cuándo se manda un récord ───
{ const l0 = llegarMeta; llegarMeta = function () { const t = cronoT; const r = l0();
    if (window.mundoTipo === 'parkour' && !creativo() && t >= 25) mandarRecord('parkour', +t.toFixed(2));
    return r; }; }
let olaVista = 0;
{ const e0 = entrarMundo; entrarMundo = function (id) { const r = e0(id); olaVista = (typeof mapa !== 'undefined' && mapa.mejorOla) || 0; return r; }; }
setInterval(() => {
  if (!jugando || typeof mapa === 'undefined' || !mapa.oleadas || creativo()) return;
  const n = mapa.mejorOla || 0; if (n > olaVista) { olaVista = n; mandarRecord('oleadas', n); }
}, 1500);

window.__dia = { PREMIOS, rachaHoy, ofrecerRegalo, abrirRecords, mandarRecord, REC, miDev };
