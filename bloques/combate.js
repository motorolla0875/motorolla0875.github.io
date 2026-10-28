'use strict';
// ═════════ COMBATE NUEVO ═════════
// · Ataque cargado: mantener apretado sobre un enemigo (táctil, mouse o R2). Según lo que tengas en la mano:
//   espada (giro que pega alrededor), hacha de guerra (golpe al suelo), lanza (estocada hacia adelante), sin arma (golpe fuerte).
// · Esquivar: un salto corto hacia el costado o atrás (botón nuevo, tecla Q o Círculo en el suelo). Mientras esquivas no te lastiman.
// · Escudo: con el escudo en la mano, mantener apretado = bloquear (te sacan mucho menos).
// · Números de daño que saltan y un temblor cortito al pegar. Diseños propios.

{
Object.assign(TX.es, { cbEsquivar: 'Esquivar', cbEsquivado: '¡ESQUIVADO!', cbBloqueado: '¡BLOQUEADO!', cbGiro: '¡GIRO!', cbGolpeSuelo: '¡GOLPE AL SUELO!', cbEstocada: '¡ESTOCADA!', cbFuerte: '¡GOLPE FUERTE!',
  cbAyuda: 'NUEVO: COMBATE<small>mantén apretado sobre un enemigo para un ataque cargado · botón para esquivar</small>' });
Object.assign(TX.en, { cbEsquivar: 'Dodge', cbEsquivado: 'DODGED!', cbBloqueado: 'BLOCKED!', cbGiro: 'SPIN!', cbGolpeSuelo: 'GROUND SLAM!', cbEstocada: 'THRUST!', cbFuerte: 'POWER HIT!',
  cbAyuda: 'NEW: COMBAT<small>hold on an enemy for a charged attack · button to dodge</small>' });
Object.assign(TX.pt, { cbEsquivar: 'Esquivar', cbEsquivado: 'DESVIOU!', cbBloqueado: 'BLOQUEADO!', cbGiro: 'GIRO!', cbGolpeSuelo: 'GOLPE NO CHÃO!', cbEstocada: 'ESTOCADA!', cbFuerte: 'GOLPE FORTE!',
  cbAyuda: 'NOVO: COMBATE<small>segure sobre um inimigo para um ataque carregado · botão para esquivar</small>' });

// ─── armas nuevas: escudo, hacha de guerra y lanza ───
const LIB = []; for (let t = 205; t < 256; t++) if (TILES[t] == null) LIB.push(t); for (let t = 397; t < 448; t++) if (TILES[t] == null) LIB.push(t);
const tileC = (n, f) => { const k = LIB.shift(); if (k == null) return TL.piedra; TILES[k] = n; TL[n] = k; dibujarTile(k, f); return k; };
const NC = {};
function objC(id, clave, es, en, pt, tile) { I[clave] = id; NC[es] = { en, pt }; item(id, es, tile, { arma: clave }); TODOS.push(id); }
objC(2115, 'ESCUDO', 'Escudo', 'Shield', 'Escudo', tileC('escudo', (x, y) => { if (y < 1 || y > 14 || x < 2 || x > 13) return null; const borde = Math.abs(x - 7.5) + Math.max(0, y - 9) * 1.2; if (borde > 6.2) return null; if (borde > 5.2 || y === 1) return '#8a8a96'; return (x === 7 || x === 8) ? '#ffd23a' : x < 8 ? '#3a6ad8' : '#2a52b0'; }));
objC(2116, 'HACHA_GUERRA', 'Hacha de guerra', 'Battle axe', 'Machado de guerra', tileC('hachaGuerra', (x, y) => { if (x + y === 15 || x + y === 16) return x > 4 ? '#7a5230' : null; const d = Math.hypot(x - 10, y - 4.5); if (d < 4.2 && x > 7) return d > 3.3 ? '#6a7080' : (x + y) % 3 ? '#c8d0e0' : '#e8eef6'; return null; }));
objC(2117, 'LANZA_H', 'Lanza', 'Spear', 'Lança', tileC('lanza', (x, y) => { if (x + y === 15 && x < 11) return '#7a5230'; if (x + y >= 14 && x + y <= 16 && x >= 11) return x + y === 15 ? '#e8eef6' : '#a8b0c0'; if ((x === 9 && y === 7) || (x === 8 && y === 8)) return '#c8341a'; return null; }));
try { atlasTex.needsUpdate = true; } catch (e) {}
for (const es in NC) for (const l of ['en', 'pt']) { NOMBRES[l] = NOMBRES[l] || {}; NOMBRES[l][es] = NC[es][l]; }
RECETAS.push([[I.ESCUDO, 1], [[B.MADERA, 6], [I.HIERRO, 1]]], [[I.HACHA_GUERRA, 1], [[I.HIERRO, 3], [I.PALO, 2]]], [[I.LANZA_H, 1], [[I.HIERRO, 2], [I.PALO, 3]]]);
const enMano = () => barra[sel] || 0;

// ─── estilos y botones ───
{ const st = document.createElement('style'); st.textContent = `
  #bEsquivar { right: calc(max(14px, env(safe-area-inset-right)) + 66px); bottom: 74px; }
  #cbCarga { position: fixed; left: 50%; top: 50%; width: 46px; height: 46px; margin: -23px 0 0 -23px; z-index: 3; pointer-events: none; }
  #cbCarga circle { fill: none; stroke-width: 4; } #cbCarga .f { stroke: rgba(13,21,61,.45); } #cbCarga .c { stroke: #ffe14a; stroke-linecap: round; transform: rotate(-90deg); transform-origin: 50% 50%; }
  #cbCarga.lista .c { stroke: #ff5a3a; } #cbEscudo { position: fixed; left: 50%; top: 50%; transform: translate(-50%, 30px); z-index: 3; pointer-events: none; width: 34px; height: 34px; }`; document.head.appendChild(st); }
{ const b = document.createElement('div'); b.className = 'boton sombra'; b.id = 'bEsquivar';
  b.innerHTML = '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path d="M2 8h7M5 5l-3 3 3 3" stroke="#fff" stroke-width="2" fill="none"/><path d="M10 4h2v2h-2zM12 7h2v2h-2zM10 10h2v2h-2z" fill="#fff" opacity=".7"/></svg>';
  $('hud').appendChild(b); b.addEventListener('pointerdown', e => { e.stopPropagation(); e.preventDefault(); esquivar(); }); }
{ const d = document.createElement('div'); d.id = 'cbCarga'; d.hidden = true; d.innerHTML = '<svg viewBox="0 0 46 46"><circle class="f" cx="23" cy="23" r="19"/><circle class="c" cx="23" cy="23" r="19" stroke-dasharray="119.4" stroke-dashoffset="119.4"/></svg>'; document.body.appendChild(d);
  const e = document.createElement('div'); e.id = 'cbEscudo'; e.hidden = true; e.innerHTML = '<svg viewBox="0 0 16 16"><path d="M8 1l6 2v5c0 4-3 6-6 7-3-1-6-3-6-7V3z" fill="#3a6ad8" stroke="#fff" stroke-width="1.2"/><path d="M8 3v10" stroke="#ffd23a" stroke-width="1.4"/></svg>'; document.body.appendChild(e); }
{ const p0 = pintarVolar; pintarVolar = function () { const r = p0.apply(this, arguments); try { $('bEsquivar').hidden = volando || !jugando; } catch (e) {} return r; }; }

// ─── estado ───
let carga = 0, cargando = false, cargaT = 0, bloqueoT = 0, dashT = 0, invulT = 0, esqEspera = 0, dashDir = [0, 0];
const CARGA_LISTA = .55;
const hostiles = () => monstruos.concat(animales.filter(a => { const T = TIPOS[a.userData.animal]; return T && T.hostil; }));
const danoBase = () => [2, 3, 4, 6, 8, 11][nivelEspada()] * (J.fuerza || 1) + (enMano() === I.HACHA_GUERRA ? 2 : 0);
const centroDir = () => rayoDesde(innerWidth / 2, innerHeight / 2);

// mantener apretado: con escudo = bloquear; apuntando a un enemigo = cargar el ataque; si no, romper como siempre
{ const s0 = seguirRompiendo; seguirRompiendo = function (dir, dt) {
    if (enMano() === I.ESCUDO) { bloqueoT = .15; rompiendo = null; return; }
    const m = monstruoApuntado(dir), h = apuntar(dir);
    if ((m && (!h || m.t < h.t)) || cargando) { cargando = true; cargaT = .2; carga = Math.min(1, carga + dt / CARGA_LISTA); rompiendo = null; return; }
    return s0.apply(this, arguments); }; }
// al soltar con la carga lista: ataque cargado (antes que el manejo de siempre)
render.domElement.addEventListener('pointerup', e => { if (carga >= 1) { soltarCarga(); } }, true);
function soltarCarga() {
  if (carga < 1) { carga = 0; cargando = false; return; } carga = 0; cargando = false;
  if (!jugando || pausado) return;
  const dir = centroDir(), base = danoBase(), arma = enMano(), lista = hostiles(), pos = new THREE.Vector3(J.x, J.y + 1, J.z);
  let tocados = 0, msg = 'cbFuerte';
  const pegar = (m, n, kx, kz, vy) => { const u = m.userData; if (u.vida <= 0) return; herir(m, n); u.kx = kx; u.kz = kz; if (vy) u.vy = vy; u.rojo = .3; tocados++; };
  if (arma === I.LANZA_H) { msg = 'cbEstocada'; const f = new THREE.Vector3(dir.x, 0, dir.z).normalize();
    for (const m of lista) { const d = m.position.clone().sub(pos); d.y = 0; const a = d.dot(f), l = d.clone().sub(f.clone().multiplyScalar(a)).length(); if (a > 0 && a < 6.5 && l < 1.3) pegar(m, Math.round(base * 2.2), f.x * 11, f.z * 11, 4); }
    dashDir = [f.x, f.z]; dashT = .18; invulT = .25; }
  else if (arma === I.HACHA_GUERRA) { msg = 'cbGolpeSuelo';
    for (const m of lista) { const d = Math.hypot(m.position.x - J.x, m.position.z - J.z); if (d < 3.4) pegar(m, Math.round(base * 2), (m.position.x - J.x) / (d || 1) * 6, (m.position.z - J.z) / (d || 1) * 6, 8); }
    for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283; polvo(J.x + Math.cos(a) * 2, J.y + .2, J.z + Math.sin(a) * 2, '#8a7a6a', 2); } try { temblor = .35; } catch (e) {} son(70, .4, 'sawtooth', .15); }
  else if (nivelEspada() > 0) { msg = 'cbGiro';
    for (const m of lista) { const d = Math.hypot(m.position.x - J.x, m.position.z - J.z); if (d < 3.4 && Math.abs(m.position.y - J.y) < 2.5) pegar(m, Math.round(base * 1.7), (m.position.x - J.x) / (d || 1) * 9, (m.position.z - J.z) / (d || 1) * 9, 4); }
    for (let k = 0; k < 20; k++) { const a = k / 20 * 6.283; polvo(J.x + Math.cos(a) * 2.4, J.y + 1, J.z + Math.sin(a) * 2.4, '#e8eef6', 1); } giroManoT = .35; }
  else { const m = monstruoApuntado(dir); if (m) pegar(m.m, Math.round(base * 2), dir.x * 14, dir.z * 14, 6); }
  swing = 1; ruido(.25, .2, 2400); son(160, .18, 'sawtooth', .12); vibrar(60);
  if (tocados) { aviso(TR(msg), 700); try { temblor = Math.max(temblor || 0, .18); } catch (e) {} }
}
window.__combate = { cargaLista: () => carga >= 1, soltarCarga, esquivar: () => esquivar(), bloquear: () => { bloqueoT = .15; }, cargar: dt => { cargando = true; cargaT = .2; carga = Math.min(1, carga + dt / CARGA_LISTA); } };

// ─── esquivar ───
function esquivar() {
  if (!jugando || pausado || volando || esqEspera > 0 || window.montando) return;
  const f = -mov.y, l = mov.x, s = Math.sin(J.yaw), c = Math.cos(J.yaw); let tx = -s * f + c * l, tz = -c * f - s * l;
  if (Math.hypot(tx, tz) < .2) { tx = s; tz = c; } const n = Math.hypot(tx, tz) || 1; dashDir = [tx / n, tz / n];
  dashT = .2; invulT = .38; esqEspera = 1.1; if (J.suelo) J.vy = 3.2;
  polvo(J.x, J.y + .2, J.z, '#d8d0c0', 6); ruido(.18, .12, 3200); son(500, .08, 'triangle', .05);
}
addEventListener('keydown', e => { if (e.code === 'KeyQ' && jugando && !e.repeat) esquivar(); });
{ const l0 = lastimar; lastimar = function (n, kx = 0, kz = 0, salto) {
    if (invulT > 0 && (kx || kz)) { aviso(TR('cbEsquivado'), 500); return; }
    if (bloqueoT > 0 && (kx || kz) && !creativo()) { n = Math.max(0, Math.ceil(n * .25)); kx *= .3; kz *= .3; aviso(TR('cbBloqueado'), 500); son(900, .06, 'square', .08); son(600, .08, 'square', .06); if (!n) return; }
    return l0.call(this, n, kx, kz, salto); }; }

// ─── números de daño ───
const numeros = [];
function numero(x, y, z, n, color) {
  if (numeros.length > 24) { const v = numeros.shift(); escena.remove(v.s); }
  const c = document.createElement('canvas'); c.width = 96; c.height = 48; const g = c.getContext('2d');
  g.font = 'bold 34px "Baloo 2", Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 6; g.strokeStyle = '#0d153d'; g.strokeText(String(n), 48, 26); g.fillStyle = color; g.fillText(String(n), 48, 26);
  const t = new THREE.CanvasTexture(c), s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthTest: false, fog: false })); s.scale.set(.9, .45, 1); s.position.set(x + (Math.random() - .5) * .4, y, z + (Math.random() - .5) * .4); s.renderOrder = 6; escena.add(s);
  numeros.push({ s, t: 0 });
}
function marcar(m, antes, fuerte) { const u = m && m.userData; if (!u || antes == null) return; const d = Math.round(antes - u.vida); if (d > 0) { const p = m.position; numero(p.x, p.y + (u.al || 1.5) + .4, p.z, d, fuerte || d >= 10 ? '#ff7a3a' : '#ffffff'); try { temblor = Math.max(temblor || 0, .08); } catch (e) {} } }
{ const g0 = golpear; golpear = function (m) { const a = m && m.userData ? m.userData.vida : null; const r = g0.apply(this, arguments); marcar(m, a); return r; }; }
{ const h0 = herir; herir = function (m) { const a = m && m.userData ? m.userData.vida : null; const r = h0.apply(this, arguments); marcar(m, a); return r; }; }
// el hacha de guerra pega más fuerte también en golpes normales
{ const g0 = golpear; golpear = function (m, dir) { const r = g0.apply(this, arguments); if (enMano() === I.HACHA_GUERRA && m && m.userData && m.userData.vida > 0) { herir(m, 2); } return r; }; }

// ─── cada cuadro ───
let giroManoT = 0, ayudaDada = false;
{ const p0 = pjFrame; pjFrame = function (dt) { const r = p0.apply(this, arguments); try { frameCombate(dt); } catch (e) { console.warn('combate', e && e.message); } return r; }; }
function frameCombate(dt) {
  for (let i = numeros.length - 1; i >= 0; i--) { const v = numeros[i]; v.t += dt; v.s.position.y += dt * 1.2; v.s.material.opacity = Math.max(0, 1 - v.t / .9); if (v.t > .9 || !jugando) { escena.remove(v.s); v.s.material.map.dispose(); v.s.material.dispose(); numeros.splice(i, 1); } }
  esqEspera = Math.max(0, esqEspera - dt); invulT = Math.max(0, invulT - dt); bloqueoT = Math.max(0, bloqueoT - dt);
  cargaT -= dt; if (cargaT <= 0 && cargando) { cargando = false; if (carga < 1) carga = 0; }
  if (!jugando) { $('cbCarga').hidden = true; $('cbEscudo').hidden = true; carga = 0; return; }
  if (dashT > 0) { dashT -= dt; J.vx = dashDir[0] * 13; J.vz = dashDir[1] * 13; }
  // aro de carga
  const ca = $('cbCarga'); ca.hidden = !(cargando && carga > .05); if (!ca.hidden) { ca.querySelector('.c').setAttribute('stroke-dashoffset', String(119.4 * (1 - carga))); ca.classList.toggle('lista', carga >= 1); }
  $('cbEscudo').hidden = !(bloqueoT > 0);
  // la mano: escudo levantado o giro de espada
  if (typeof manoG !== 'undefined') { manoG.position.x = bloqueoT > 0 ? -.28 : 0; manoG.position.y = bloqueoT > 0 ? .1 : 0; manoG.rotation.z = giroManoT > 0 ? (1 - giroManoT / .35) * 6.283 : 0; }
  giroManoT = Math.max(0, giroManoT - dt);
  if (!ayudaDada && !creativo() && !pausado) { ayudaDada = true; try { if (!localStorage.getItem('voxCombateVisto')) { localStorage.setItem('voxCombateVisto', '1'); setTimeout(() => aviso(TR('cbAyuda'), 5000), 9000); } } catch (e) {} }
}
{ const e0 = entrarMundo; entrarMundo = function () { const r = e0.apply(this, arguments); try { $('bEsquivar').hidden = volando; } catch (e) {} return r; }; }
}
