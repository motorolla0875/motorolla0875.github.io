'use strict';
// ═════════ CONTROL DE CONSOLA (PlayStation, Xbox y genéricos) ═════════
// Palanca izq: caminar · palanca der: mirar · X: saltar/subir · Círculo: bajar · R2: romper/pegar · L2: poner/usar
// R1/L1: barra · Triángulo: inventario · Cuadrado: fabricar · L3: correr · doble X: volar (creativo) · Options: pausa
// En los menús: cruceta o palanca para moverse, X para tocar, Círculo para volver.

{
Object.assign(TX.es, { padSi: 'CONTROL CONECTADO<small>{n}</small>', padNo: 'CONTROL DESCONECTADO' });
Object.assign(TX.en, { padSi: 'CONTROLLER CONNECTED<small>{n}</small>', padNo: 'CONTROLLER DISCONNECTED' });
Object.assign(TX.pt, { padSi: 'CONTROLE CONECTADO<small>{n}</small>', padNo: 'CONTROLE DESCONECTADO' });
{ const st = document.createElement('style'); st.textContent = `
  body.conControl #bSaltar, body.conControl #bBajar, body.conControl #bVolar, body.conControl #joy { display: none !important; }
  .padFoco { outline: 4px solid #ffe14a !important; outline-offset: 2px; box-shadow: 0 0 0 7px rgba(255,225,74,.35) !important; position: relative; z-index: 2; }`; document.head.appendChild(st); }

const BT = { X: 0, CIRCULO: 1, CUADRADO: 2, TRIANGULO: 3, L1: 4, R1: 5, L2: 6, R2: 7, SHARE: 8, OPTIONS: 9, L3: 10, R3: 11, ARRIBA: 12, ABAJO: 13, IZQ: 14, DER: 15 };
let antes = [], padIdx = null, movia = false, ultX = 0, repR2 = 0, repL2 = 0, navT = 0, foco = null;
const zona = v => Math.abs(v) < .16 ? 0 : (v - Math.sign(v) * .16) / .84;
const centro = () => rayoDesde(innerWidth / 2, innerHeight / 2);
const conectado = () => { const l = navigator.getGamepads ? [...navigator.getGamepads()] : []; return l.find(g => g && g.connected && g.mapping === 'standard') || l.find(g => g && g.connected) || null; };

addEventListener('gamepadconnected', e => { document.body.classList.add('conControl'); aviso(TR('padSi', { n: (e.gamepad.id || '').replace(/\(.*$/, '').trim().slice(0, 40) }), 2200); });
addEventListener('gamepaddisconnected', () => { if (!conectado()) { document.body.classList.remove('conControl'); aviso(TR('padNo'), 1600); soltarPad(); quitarFoco(); } });
function soltarPad() { if (movia) { mov = { x: 0, y: 0 }; movia = false; } saltando = false; bajando = false; delete toques.pad; teclas.ControlLeft = false; }
function vibrarPad(ms, f = .6) { const g = conectado(); try { if (g && g.vibrationActuator) g.vibrationActuator.playEffect('dual-rumble', { duration: ms, strongMagnitude: f, weakMagnitude: f * .6 }); } catch (e) {} }
{ const l0 = lastimar; lastimar = function (n) { const r = l0.apply(this, arguments); if (conectado() && !creativo()) vibrarPad(Math.min(400, 120 + n * 40), Math.min(1, .3 + n * .12)); return r; }; }

// ─── menús: qué está abierto arriba de todo y qué se puede tocar ───
const SEL = '.btn, .cerrar, .tab, .slot, .pvC, .pg, .mapaT, .opcG > div, .ajOpc > div, [data-entrar], [data-borrar], [data-hacer], [data-poner], [data-sacar], [data-guardar], [data-sacartodo], [data-cria], [data-plano], [data-pag], input, select, .ajFila .on';
const visible = el => { if (!el || el.hidden) return false; const r = el.getBoundingClientRect(); if (r.width < 4 || r.height < 4) return false; const s = getComputedStyle(el); return s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > .05; };
function capaArriba() {
  const l = [...document.querySelectorAll('.capa, #panel')].filter(c => c.id !== 'hud' && !c.hidden && visible(c));
  if (!l.length) return null; return l.reduce((a, c) => ((+getComputedStyle(c).zIndex || 0) >= (+getComputedStyle(a).zIndex || 0) ? c : a));
}
const tocables = c => [...c.querySelectorAll(SEL)].filter(el => visible(el) && !el.closest('[hidden]') && !el.classList.contains('oculta') && !el.closest('.oculta')).filter((el, i, a) => !a.some(o => o !== el && o.contains(el) && o.matches('[data-entrar], [data-pv], .pvC')));
function quitarFoco() { if (foco) foco.classList.remove('padFoco'); foco = null; }
function enfocar(el) { quitarFoco(); if (!el) return; foco = el; el.classList.add('padFoco'); try { el.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch (e) {} }
function mover(dx, dy) {
  const c = capaArriba(); if (!c) return quitarFoco(); const l = tocables(c); if (!l.length) return quitarFoco();
  if (!foco || !l.includes(foco)) { const pos = el => { const r = el.getBoundingClientRect(); return r.top * 4 + r.left; }, bt = l.filter(el => el.matches('.btn, .pvC, [data-entrar]') && !el.matches('.cerrar'));
    return enfocar((bt.length ? bt : l).slice().sort((a, b) => pos(a) - pos(b))[0]); }
  const a = foco.getBoundingClientRect(), ax = a.left + a.width / 2, ay = a.top + a.height / 2; let mejor = null, mp = 1e9;
  for (const el of l) { if (el === foco) continue; const r = el.getBoundingClientRect(), x = r.left + r.width / 2 - ax, y = r.top + r.height / 2 - ay;
    const avance = x * dx + y * dy, lado = Math.abs(x * dy) + Math.abs(y * dx); if (avance <= 2) continue; const p = avance + lado * 2.2; if (p < mp) { mp = p; mejor = el; } }
  if (mejor) { enfocar(mejor); son(520, .03, 'triangle', .05); }
}
function activar(el) {
  if (!el) return; son(700, .04, 'triangle', .06);
  if (el.matches('input, select')) { el.focus(); if (el.type === 'checkbox' || el.type === 'radio') el.click(); return; }
  const r = el.getBoundingClientRect(), o = { bubbles: true, cancelable: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, pointerType: 'mouse', isPrimary: true, button: 0 };
  if (el.closest('#panel')) { el.dispatchEvent(new PointerEvent('pointerdown', o)); setTimeout(() => { if (foco && !document.contains(foco)) mover(0, 0); }, 30); return; }
  el.dispatchEvent(new PointerEvent('pointerdown', o)); el.dispatchEvent(new PointerEvent('pointerup', o)); el.click();
  setTimeout(() => { if (!foco || !document.contains(foco) || !visible(foco)) { quitarFoco(); mover(0, 0); } }, 80);
}
function volver() {
  const c = capaArriba(); if (!c) return false;
  if (c.id === 'panel') { cerrarPanel(); return true; }
  if (c.id === 'pausa') { $('bSeguir').click(); return true; }
  const b = [...c.querySelectorAll('.cerrar, [id*="Volver"], [id*="volver"], [id*="Cerrar"], [id*="cerrar"], [id*="Listo"], [id*="listo"]')].find(visible);
  if (b) { activar(b); return true; } return false;
}
function cambiarPestana(d) { const t = [...$('pCab').querySelectorAll('.tab')]; if (!t.length) return; const k = t.findIndex(x => x.classList.contains('on')); const n = t[(k + d + t.length) % t.length]; activar(n); }

// ─── cada cuadro ───
function leerPad(dt) {
  const g = conectado(); if (!g) { if (padIdx !== null) { padIdx = null; soltarPad(); } return; } padIdx = g.index;
  if (!document.body.classList.contains('conControl')) document.body.classList.add('conControl');
  const b = g.buttons.map(x => x.pressed || x.value > .5), ax = g.axes, nuevo = k => b[k] && !antes[k];
  const enMenu = !jugando || pausado || !$('panel').hidden;
  if (enMenu) {
    if (movia || saltando || bajando || toques.pad) soltarPad();
    navT -= dt; const lx = zona(ax[0] || 0), ly = zona(ax[1] || 0);
    let dx = (b[BT.DER] ? 1 : 0) - (b[BT.IZQ] ? 1 : 0), dy = (b[BT.ABAJO] ? 1 : 0) - (b[BT.ARRIBA] ? 1 : 0); if (!dx && !dy && Math.hypot(lx, ly) > .5) { if (Math.abs(lx) > Math.abs(ly)) dx = Math.sign(lx); else dy = Math.sign(ly); }
    const algunaNueva = [BT.DER, BT.IZQ, BT.ABAJO, BT.ARRIBA].some(nuevo);
    if ((dx || dy) && (algunaNueva || navT <= 0)) { navT = algunaNueva ? .38 : .14; mover(dx, dy); } if (!dx && !dy) navT = 0;
    if (nuevo(BT.X)) { if (foco && document.contains(foco) && visible(foco)) activar(foco); else mover(0, 0); }
    if (nuevo(BT.CIRCULO) || nuevo(BT.OPTIONS)) volver();
    if (!$('panel').hidden) { if (nuevo(BT.TRIANGULO) || nuevo(BT.CUADRADO)) cerrarPanel(); if (nuevo(BT.R1)) cambiarPestana(1); if (nuevo(BT.L1)) cambiarPestana(-1); }
    // en el menú, la palanca derecha desplaza las listas largas
    const ry = zona(ax[3] || 0); if (ry) { const c = capaArriba(); const s = c && [...c.querySelectorAll('*')].find(el => el.scrollHeight > el.clientHeight + 10 && /auto|scroll/.test(getComputedStyle(el).overflowY)); if (s) s.scrollTop += ry * 600 * dt; }
    antes = b; return;
  }
  quitarFoco();
  // caminar y mirar
  const lx = zona(ax[0] || 0), ly = zona(ax[1] || 0), rx = zona(ax[2] || 0), ry = zona(ax[3] || 0);
  if (lx || ly) { mov = { x: lx, y: ly }; movia = true; } else if (movia) { mov = { x: 0, y: 0 }; movia = false; teclas.ControlLeft = false; }
  if (rx || ry) { const v = 2.9 * (AJ.sens || 1) * dt; J.yaw -= rx * Math.abs(rx) * v; J.pitch = Math.max(-1.5, Math.min(1.5, J.pitch - ry * Math.abs(ry) * v * .8)); }
  if (nuevo(BT.L3)) teclas.ControlLeft = true;
  // saltar / volar / bajar
  if (nuevo(BT.X)) { const t = performance.now(); if (creativo() && t - ultX < 320) { volando = !volando; J.vy = 0; pintarVolar(); } ultX = t; }
  saltando = !!b[BT.X]; bajando = !!b[BT.CIRCULO];
  // barra
  if (nuevo(BT.R1) || nuevo(BT.DER)) { sel = (sel + 1) % 9; pintarBarra(); }
  if (nuevo(BT.L1) || nuevo(BT.IZQ)) { sel = (sel + 8) % 9; pintarBarra(); }
  // menús
  if (nuevo(BT.TRIANGULO)) { abrirPanel('bolsa'); antes = b; return; }
  if (nuevo(BT.CUADRADO)) { abrirPanel(creativo() ? 'bolsa' : 'fabricar'); antes = b; return; }
  if (nuevo(BT.SHARE) && window.__rec) { __rec.alternar(); }
  if (nuevo(BT.OPTIONS)) { pausado = true; soltarTodo(); guardar(); $('pausa').hidden = false; antes = b; return; }
  if (nuevo(BT.ABAJO) && typeof dibujarMapa === 'function') { pausado = true; soltarTodo(); dibujarMapa(); $('mapaCapa').hidden = false; antes = b; return; }
  // R2: pegar o romper (manteniendo)
  if (b[BT.R2]) { const dir = centro(), m = monstruoApuntado(dir), h = apuntar(dir);
    if (m && (!h || m.t < h.t)) { delete toques.pad; repR2 -= dt; if (nuevo(BT.R2) || repR2 <= 0) { repR2 = .45; accion(() => tocar(dir)); } }
    else if (!toques.pad) toques.pad = { izq: false, x0: innerWidth / 2, y0: innerHeight / 2, x: innerWidth / 2, y: innerHeight / 2, t0: performance.now() - 460, movio: 0, boton: 0, mouse: false, rompe: false, mira: false, pad: true }; }
  else if (antes[BT.R2]) { delete toques.pad; rompiendo = null; repR2 = 0; }
  if (toques.pad) { toques.pad.x = innerWidth / 2; toques.pad.y = innerHeight / 2; }
  // L2: poner o usar (manteniendo, sigue poniendo)
  if (b[BT.L2]) { repL2 -= dt; if (nuevo(BT.L2) || repL2 <= 0) { repL2 = nuevo(BT.L2) ? .35 : .22; accion(() => tocar(centro())); } } else repL2 = 0;
  antes = b;
}
{ const p0 = pjFrame; pjFrame = function (dt) { const r = p0.apply(this, arguments); try { leerPad(dt); } catch (e) { console.warn('control', e && e.message); } return r; }; }
// si se toca la pantalla, el foco del control se va
addEventListener('pointerdown', e => { if (e.isTrusted) quitarFoco(); }, true);
window.__pad = { leerPad, mover, activar, volver, capaArriba, tocables };
}
