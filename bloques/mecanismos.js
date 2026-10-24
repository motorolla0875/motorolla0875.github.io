'use strict';
// ═════════ MECANISMOS: botón, palanca y placa de presión ═════════
// Cada mecanismo se conecta a una acción: abrir puertas, hacer desaparecer o aparecer bloques, teletransportar o mostrar un mensaje.

Object.assign(TX.es, {
  mecTitulo: '¿Qué hace?', mecPuerta: 'Abrir puertas', mecQuitar: 'Hacer desaparecer bloques', mecPoner: 'Hacer aparecer bloques', mecTele: 'Teletransportar', mecMensaje: 'Mostrar un mensaje',
  mecSelPuerta: 'Toca las puertas que va a abrir ({n})', mecSelQuitar: 'Toca los bloques que van a desaparecer ({n})', mecSelPoner: 'Toca los bloques que van a aparecer ({n})<small>se esconden hasta que lo actives</small>',
  mecSelTele: 'Toca el bloque adonde te lleva', mecListo: 'CONECTADO', mecSin: 'NO ESTÁ CONECTADO A NADA', soloPuertas: 'ESO NO ES UNA PUERTA', cancelar: 'Cancelar', mecMsgPh: 'Escribe el mensaje…',
  mecAyuda: 'Botón: se activa un momento · Palanca: prende y apaga · Placa: se activa mientras la pisas',
});
Object.assign(TX.en, {
  mecTitulo: 'What does it do?', mecPuerta: 'Open doors', mecQuitar: 'Make blocks disappear', mecPoner: 'Make blocks appear', mecTele: 'Teleport', mecMensaje: 'Show a message',
  mecSelPuerta: 'Tap the doors it will open ({n})', mecSelQuitar: 'Tap the blocks that will disappear ({n})', mecSelPoner: 'Tap the blocks that will appear ({n})<small>they hide until you turn it on</small>',
  mecSelTele: 'Tap the block it takes you to', mecListo: 'CONNECTED', mecSin: "IT ISN'T CONNECTED TO ANYTHING", soloPuertas: "THAT ISN'T A DOOR", cancelar: 'Cancel', mecMsgPh: 'Write the message…',
  mecAyuda: 'Button: turns on for a moment · Lever: on and off · Plate: on while you stand on it',
});
Object.assign(TX.pt, {
  mecTitulo: 'O que faz?', mecPuerta: 'Abrir portas', mecQuitar: 'Fazer blocos sumirem', mecPoner: 'Fazer blocos aparecerem', mecTele: 'Teletransportar', mecMensaje: 'Mostrar uma mensagem',
  mecSelPuerta: 'Toque nas portas que ele vai abrir ({n})', mecSelQuitar: 'Toque nos blocos que vão sumir ({n})', mecSelPoner: 'Toque nos blocos que vão aparecer ({n})<small>ficam escondidos até você ativar</small>',
  mecSelTele: 'Toque no bloco para onde ele te leva', mecListo: 'CONECTADO', mecSin: 'NÃO ESTÁ CONECTADO A NADA', soloPuertas: 'ISSO NÃO É UMA PORTA', cancelar: 'Cancelar', mecMsgPh: 'Escreva a mensagem…',
  mecAyuda: 'Botão: ativa por um momento · Alavanca: liga e desliga · Placa: ativa enquanto você pisa',
});
Object.assign(NOMBRES.en, { 'Botón': 'Button', 'Palanca': 'Lever', 'Placa de presión': 'Pressure plate' });
Object.assign(NOMBRES.pt, { 'Botón': 'Botão', 'Palanca': 'Alavanca', 'Placa de presión': 'Placa de pressão' });

{ const st = document.createElement('style'); st.textContent = `
  #mecBar { position: fixed; top: 10px; left: 50%; transform: translateX(-50%); z-index: 6; background: rgba(0,0,0,.72); border: 3px solid #000; padding: 8px 10px; display: flex; gap: 8px; align-items: center; max-width: 94vw; font-size: 14px; color: #fff; }
  #mecBar small { display: block; font-size: 11px; color: #ffff55; }
  #mecOps .mb { display: block; margin: 6px 0; text-align: center; font-size: 15px; padding: 10px; }
  #mecMsg { width: 100%; min-height: 70px; font: 700 15px 'Courier New', monospace; padding: 8px; border: 3px solid #000; }
`; document.head.appendChild(st); }
cap('mecCapa', '<div class="mVentana" style="width:min(460px,94vw)"><div class="vCab"><div class="vTit" data-i="mecTitulo"></div><div class="cerrar" id="mecCerrar">X</div></div><div class="vCuerpo"><div style="font-size:12px;margin-bottom:6px" data-i="mecAyuda"></div><div id="mecOps"></div><div id="mecMsgCaja" hidden><textarea id="mecMsg" maxlength="160"></textarea><div class="mb verde" id="mecMsgOk" style="text-align:center;margin-top:6px" data-i="listo"></div></div></div></div>');
{ const d = document.createElement('div'); d.id = 'mecBar'; d.className = 'sombra'; d.hidden = true; d.innerHTML = '<div id="mecBarTxt" style="flex:1"></div><div class="mb verde" id="mecBarOk" data-i="listo"></div><div class="mb rojo" id="mecBarNo" data-i="cancelar"></div>'; document.body.appendChild(d); }
aplicarIdioma();

const MEC_ACC = [['puerta', 'mecPuerta'], ['quitar', 'mecQuitar'], ['poner', 'mecPoner'], ['teleport', 'mecTele'], ['mensaje', 'mecMensaje']];
let mec = {}, mecSel = null, mecEdit = -1, placaOn = -1, botones = [];
const marcas = [], geoMarca = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.06, 1.06, 1.06)), matMarca = new THREE.LineBasicMaterial({ color: 0xffe14a });
const esMec = t => t && DEF[t] && DEF[t].mec;

function mecCargar(x) { mec = x || {}; mecSel = null; placaOn = -1; botones = []; limpiarMarcas(); $('mecBar').hidden = true; }
function mecGuardar() { const o = {}; for (const i in mec) if (esMec(mundo[+i])) o[i] = mec[i]; return o; }

// ───── configurar ─────
function mecPuesto(i) { if (aventura()) return; abrirMec(i); }
function abrirMec(i) {
  mecEdit = i; pausado = true; soltarTodo();
  $('mecOps').innerHTML = MEC_ACC.map(([a, l]) => `<div class="mb${mec[i] && mec[i].a === a ? ' on' : ''}" data-a="${a}">${TR(l)}</div>`).join('');
  $('mecMsgCaja').hidden = true; $('mecOps').hidden = false; abrir('mecCapa');
}
$('mecCerrar').onclick = () => { cerrar('mecCapa'); pausado = false; };
$('mecOps').addEventListener('click', e => {
  const d = e.target.closest('[data-a]'); if (!d) return; const a = d.dataset.a;
  if (a === 'mensaje') { $('mecOps').hidden = true; $('mecMsgCaja').hidden = false; $('mecMsg').placeholder = TR('mecMsgPh'); $('mecMsg').value = (mec[mecEdit] && mec[mecEdit].txt) || ''; setTimeout(() => $('mecMsg').focus(), 50); return; }
  cerrar('mecCapa'); pausado = false;
  mecSel = { i: mecEdit, a, obj: [] }; pintarSel(); $('mecBar').hidden = false;
});
$('mecMsgOk').onclick = () => { mec[mecEdit] = { a: 'mensaje', txt: $('mecMsg').value.slice(0, 160) }; sucio = true; cerrar('mecCapa'); pausado = false; aviso(TR('mecListo'), 1000); };
function pintarSel() {
  const s = mecSel, n = s.obj.length;
  $('mecBarTxt').innerHTML = TR({ puerta: 'mecSelPuerta', quitar: 'mecSelQuitar', poner: 'mecSelPoner', teleport: 'mecSelTele' }[s.a], { n });
  limpiarMarcas(); for (const [j] of s.obj) { const [x, y, z] = xyz(j); const m = new THREE.LineSegments(geoMarca, matMarca); m.position.set(x + .5, y + .5, z + .5); escena.add(m); marcas.push(m); }
}
function limpiarMarcas() { for (const m of marcas) escena.remove(m); marcas.length = 0; }
$('mecBarNo').onclick = () => { mecSel = null; limpiarMarcas(); $('mecBar').hidden = true; };
$('mecBarOk').onclick = () => {
  const s = mecSel; mecSel = null; limpiarMarcas(); $('mecBar').hidden = true; if (!s || !s.obj.length) return;
  mec[s.i] = { a: s.a, obj: s.obj }; sucio = true;
  if (s.a === 'poner') sinRegistro(() => ponerMuchos(s.obj.map(([j]) => [...xyz(j), B.AIRE])));   // los bloques que van a aparecer empiezan escondidos
  aviso(TR('mecListo'), 1000); son(660, .1, 'square', .08);
};

// ───── tocar ─────
function mecTocar(dir) {
  const h = apuntar(dir);
  if (mecSel) {
    if (!h) return true;
    const j = idx(h.x, h.y, h.z), s = mecSel;
    if (j === s.i) return true;
    if (s.a === 'puerta' && h.b !== B.PUERTA && h.b !== B.PUERTA_A) { aviso(TR('soloPuertas'), 900); return true; }
    if (s.a === 'teleport') s.obj = [[j, h.b]];
    else { const k = s.obj.findIndex(([x]) => x === j); if (k >= 0) s.obj.splice(k, 1); else if (s.obj.length < 200) s.obj.push([j, h.b]); }
    son(520, .06, 'square', .06); swing = 1; pintarSel(); return true;
  }
  if (!h || !esMec(h.b)) return false;
  const m = monstruoApuntado(dir); if (m && m.t < h.t) return false;
  const i = idx(h.x, h.y, h.z), tipo = DEF[h.b].mec;
  if (!mec[i] && !aventura()) { abrirMec(i); return true; }
  if (tipo === 'placa') { if (creativo() && !aventura()) { abrirMec(i); return true; } return false; }
  swing = 1; son(tipo === 'boton' ? 900 : 300, .06, 'square', .1); vibrar(10);
  if (tipo === 'boton') { activar(i, true); botones = botones.filter(b => b.i !== i); botones.push({ i, t: 1.6 }); }
  else { const on = h.b === B.PALANCA; sinRegistro(() => ponerBloque(h.x, h.y, h.z, on ? B.PALANCA_ON : B.PALANCA)); activar(i, on); }
  return true;
}
function sinRegistro(fn) { const g = grupo; grupo = null; try { fn(); } finally { grupo = g; } }

// ───── activar y desactivar ─────
function activar(i, on) {
  const c = mec[i]; if (!c) { if (on) aviso(TR('mecSin'), 1000); return; }
  sinRegistro(() => {
    if (c.a === 'puerta') for (const [j] of c.obj) { const [x, y, z] = xyz(j), t = get(x, y, z); if ((t === B.PUERTA && on) || (t === B.PUERTA_A && !on)) puerta(x, y, z); }
    else if (c.a === 'quitar' || c.a === 'poner') {
      const ver = (c.a === 'poner') === on;   // ¿los bloques tienen que verse?
      ponerMuchos(c.obj.map(([j, b]) => [...xyz(j), ver ? b : B.AIRE]));
      if (on) sonar('puerta', .5, .7) || son(200, .15, 'square', .08);
    }
    else if (c.a === 'teleport' && on && c.obj[0]) { const [x, y, z] = xyz(c.obj[0][0]); Object.assign(J, { x: x + .5, y: y + 1.02, z: z + .5, vx: 0, vy: 0, vz: 0 }); polvo(J.x, J.y + 1, J.z, '#c58cf5', 18); son(1200, .3, 'triangle', .1); son(600, .3, 'sine', .08); }
    else if (c.a === 'mensaje' && on) aviso(esc(c.txt || ''), 3200);
  });
}

// ───── placas de presión y botones que vuelven solos ─────
function mecFrame(dt) {
  for (const b of botones.slice()) { b.t -= dt; if (b.t <= 0) { botones = botones.filter(x => x !== b); activar(b.i, false); } }
  if (pausado || mecSel) return;
  const x = Math.floor(J.x), y = Math.floor(J.y + .05), z = Math.floor(J.z), i = dentro(x, y, z) ? idx(x, y, z) : -1;
  const pisa = i >= 0 && DEF[mundo[i]] && DEF[mundo[i]].mec === 'placa' ? i : -1;
  if (pisa === placaOn) return;
  if (placaOn >= 0) activar(placaOn, false);
  placaOn = pisa; if (pisa >= 0) { son(400, .05, 'square', .08); activar(pisa, true); }
}
window.__mec = { mec: () => mec, activar, mecTocar, abrirMec, sel: () => mecSel };
