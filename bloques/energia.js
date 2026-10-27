'use strict';
// ═════════ ENERGÍA: cables, pistones y lámparas de energía ═════════
// · Los botones, palancas, placas y detectores de zona dan energía mientras están prendidos (con o sin acción configurada).
// · El Cable de energía la lleva hasta 32 bloques (también sube y baja escalones).
// · Lo que toca un cable con energía (o un mecanismo prendido) se activa:
//   Lámpara de energía (se prende), Pistón (empuja hasta 12 bloques; el pegajoso los trae de vuelta),
//   puertas (se abren), TNT (se enciende), dispensadores (disparan) y generadores (sacan criaturas).
// · Diseño propio. En línea: la energía la calcula cada uno para verse, y lo que mueve bloques lo hace el dueño de la sala.

B.CABLE_E = 134; B.PISTON = 135; B.LAMPARA_E = 136;
const EN_TILES = { cable: 244, piston: 245, pistonA: 246, lampara: 247 };   // casilleros del atlas que usa la energía

const EN_TX = {
  es: { enPegajoso: 'PISTÓN PEGAJOSO<small>trae de vuelta el bloque</small>', enNormal: 'PISTÓN NORMAL<small>solo empuja</small>', mecEnergia: 'Usar con cables de energía',
    enAyuda: 'CONÉCTALO CON CABLE DE ENERGÍA<small>a un botón, palanca, placa o detector</small>', enPistonAyuda: 'EMPUJA HACIA DONDE MIRABAS<small>tócalo con la mano vacía para hacerlo pegajoso</small>' },
  en: { enPegajoso: 'STICKY PISTON<small>pulls the block back</small>', enNormal: 'NORMAL PISTON<small>only pushes</small>', mecEnergia: 'Use with energy cables',
    enAyuda: 'CONNECT IT WITH ENERGY CABLE<small>to a button, lever, plate or detector</small>', enPistonAyuda: 'IT PUSHES WHERE YOU WERE LOOKING<small>tap it with an empty hand to make it sticky</small>' },
  pt: { enPegajoso: 'PISTÃO GRUDENTO<small>puxa o bloco de volta</small>', enNormal: 'PISTÃO NORMAL<small>só empurra</small>', mecEnergia: 'Usar com cabos de energia',
    enAyuda: 'CONECTE COM CABO DE ENERGIA<small>a um botão, alavanca, placa ou detector</small>', enPistonAyuda: 'EMPURRA PARA ONDE VOCÊ OLHAVA<small>toque com a mão vazia para deixá-lo grudento</small>' },
  tr: { enPegajoso: 'YAPIŞKAN PİSTON<small>bloğu geri çeker</small>', enNormal: 'NORMAL PİSTON<small>sadece iter</small>', mecEnergia: 'Enerji kablolarıyla kullan',
    enAyuda: 'ENERJİ KABLOSUYLA BAĞLA<small>bir düğmeye, kola, plakaya ya da dedektöre</small>', enPistonAyuda: 'BAKTIĞIN YÖNE İTER<small>yapışkan yapmak için boş elle dokun</small>' },
  id: { enPegajoso: 'PISTON LENGKET<small>menarik balok kembali</small>', enNormal: 'PISTON BIASA<small>hanya mendorong</small>', mecEnergia: 'Pakai dengan kabel energi',
    enAyuda: 'HUBUNGKAN DENGAN KABEL ENERGI<small>ke tombol, tuas, pelat, atau detektor</small>', enPistonAyuda: 'MENDORONG KE ARAH PANDANGANMU<small>sentuh dengan tangan kosong agar lengket</small>' },
  ar: { enPegajoso: 'مكبس لاصق<small>يعيد الكتلة إلى مكانها</small>', enNormal: 'مكبس عادي<small>يدفع فقط</small>', mecEnergia: 'استخدمه مع كابلات الطاقة',
    enAyuda: 'وصّله بكابل الطاقة<small>بزر أو ذراع أو لوح أو كاشف</small>', enPistonAyuda: 'يدفع إلى حيث كنت تنظر<small>المسه بيد فارغة ليصبح لاصقًا</small>' },
};
for (const l in EN_TX) Object.assign(TX[l] = TX[l] || {}, EN_TX[l]);
const EN_NOM = {
  en: { 'Cable de energía': 'Energy cable', 'Pistón': 'Piston', 'Lámpara de energía': 'Energy lamp' },
  pt: { 'Cable de energía': 'Cabo de energia', 'Pistón': 'Pistão', 'Lámpara de energía': 'Lâmpada de energia' },
  tr: { 'Cable de energía': 'Enerji kablosu', 'Pistón': 'Piston', 'Lámpara de energía': 'Enerji lambası' },
  id: { 'Cable de energía': 'Kabel energi', 'Pistón': 'Piston', 'Lámpara de energía': 'Lampu energi' },
  ar: { 'Cable de energía': 'كابل طاقة', 'Pistón': 'مكبس', 'Lámpara de energía': 'مصباح طاقة' },
};
for (const l in EN_NOM) Object.assign(NOMBRES[l] = NOMBRES[l] || {}, EN_NOM[l]);

// ───── dibujos (16x16, propios) ─────
function enPintar() {
  const borrar = t => ag.clearRect((t % 8) * 16, Math.floor(t / 8) * 16, 16, 16);
  for (const t of Object.values(EN_TILES)) borrar(t);
  // cable: una cruz de cobre con chispitas
  dibujarTile(EN_TILES.cable, (x, y, r) => { const cx = x >= 6 && x <= 9, cy = y >= 6 && y <= 9;
    if (!(cx || cy)) return null; const borde = (cx && (x === 6 || x === 9)) || (cy && (y === 6 || y === 9));
    if (borde && !(cx && cy)) return '#7a3a1a'; return (x + y) % 5 === 0 ? '#ffb070' : r() < .5 ? '#d8743a' : '#c8642e'; });
  // pistón: costado de piedra con banda de cobre
  dibujarTile(EN_TILES.piston, (x, y, r, e) => { if (y < 4) return y === 3 ? '#5a3a1a' : e(['#b07a3a', '#a06a32', '#c08a46']);
    if (y >= 7 && y <= 8) return e(['#d8743a', '#c8642e']); return (x === 0 || x === 15 || y === 15) ? '#4a4e56' : e(['#7c828c', '#6e737c', '#868c96']); });
  dibujarTile(EN_TILES.pistonA, (x, y, r, e) => (x === 0 || y === 0 || x === 15 || y === 15) ? '#4a4e56' : (Math.abs(x - 7.5) < 3 && Math.abs(y - 7.5) < 3) ? e(['#d8743a', '#c8642e']) : e(['#7c828c', '#6e737c', '#868c96']));
  // lámpara de energía (apagada): vidrio oscuro con marco de cobre; prendida brilla encima
  dibujarTile(EN_TILES.lampara, (x, y, r, e) => (x <= 1 || y <= 1 || x >= 14 || y >= 14) ? e(['#b8642e', '#a0562a']) : (x === 7 || x === 8 || y === 7 || y === 8) ? '#6a3a1e' : e(['#3a3448', '#433c54', '#36304a']));
  try { atlasTex.needsUpdate = true; for (const t of Object.values(EN_TILES)) delete tileURLs[t]; for (const id of [B.CABLE_E, B.PISTON, B.LAMPARA_E]) delete iconos[id]; } catch (e) {}
}
enPintar();
def(B.CABLE_E, 'Cable de energía', [EN_TILES.cable], { dur: .1, trans: true, solido: false, forma: [[0, 0, 0, 1, 1 / 16, 1]], icono: [[0, 0, 0, 1, .2, 1]], color: '#d8743a' });
def(B.PISTON, 'Pistón', [EN_TILES.pistonA, EN_TILES.pistonA, EN_TILES.piston], { dur: 1.2, color: '#7c828c' });
def(B.LAMPARA_E, 'Lámpara de energía', [EN_TILES.lampara], { dur: .5, color: '#3a3448' });
{ const k = TODOS.indexOf(B.PALANCA); TODOS.splice(k >= 0 ? k + 1 : TODOS.length, 0, B.CABLE_E, B.PISTON, B.LAMPARA_E); }
RECETAS.push([[B.CABLE_E, 8], [[I.HIERRO, 1], [I.CRISTAL, 1]]], [[B.PISTON, 1], [[B.MADERA, 3], [B.ADOQUIN, 4], [I.HIERRO, 1], [B.CABLE_E, 1]]], [[B.LAMPARA_E, 1], [[B.VIDRIO, 4], [B.CABLE_E, 1], [I.CRISTAL, 1]]]);
// en la bolsa de creativo van en "Mecanismos"
{ const envolver = () => { if (typeof categoria !== 'function' || categoria.__energia) return; const c0 = categoria; categoria = function (id) { return id === B.CABLE_E || id === B.PISTON || id === B.LAMPARA_E ? 'catMec' : c0(id); }; categoria.__energia = 1; };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', envolver); else envolver(); }

// ───── qué hay en el mundo ─────
const EN_MEC = new Set([B.BOTON, B.PALANCA, B.PALANCA_ON, B.PLACA, B.ZONA].filter(x => x != null));
const EN_USA = new Set([B.LAMPARA_E, B.PISTON, B.PUERTA, B.PUERTA_A, B.TNT, B.TNT_G, B.DISPENSADOR, B.JAULA].filter(x => x != null));
const EN_MIRA = new Uint8Array(65536); for (const t of [B.CABLE_E, B.PISTON, B.LAMPARA_E, ...EN_MEC]) EN_MIRA[t] = 1;
let enBloques = new Set(), enPrev = new Map(), enPrimera = true, enBotones = new Map(), enFirma = '', enAbiertas = new Set();
const enDatos = () => { try { return mapa.ener || (mapa.ener = {}); } catch (e) { return {}; } };
function enEscanear() { const s = new Set(); for (let i = 0; i < N; i++) if (EN_MIRA[mundo[i]]) s.add(i); enBloques = s;
  const d = enDatos(); for (const k in d) if (mundo[+k] !== B.PISTON) delete d[k]; }
const V6 = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const vecinos = i => { const [x, y, z] = xyz(i), o = []; for (const [a, b, c] of V6) if (dentro(x + a, y + b, z + c)) o.push(idx(x + a, y + b, z + c)); return o; };
const enLinea = () => { try { return !!(MP && MP.sala); } catch (e) { return false; } };
const enInvitado = () => { try { return !!(MP && MP.sala && MP.invitado); } catch (e) { return false; } };

// ¿el mecanismo está prendido?
function fuenteOn(i) {
  const t = mundo[i];
  if (t === B.PALANCA_ON) return true;
  if (t === B.BOTON) return (enBotones.get(i) || 0) > performance.now() || (typeof botones !== 'undefined' && botones.some(b => b.i === i));
  if (t === B.PLACA) { if (typeof placaOn !== 'undefined' && placaOn === i) return true;
    const [x, y, z] = xyz(i); try { for (const j of MP.jug.values()) if (j.pos && Math.floor(j.pos.x) === x && Math.floor(j.pos.y + .05) === y && Math.floor(j.pos.z) === z) return true; } catch (e) {}
    return animales.some(a => Math.floor(a.position.x) === x && Math.floor(a.position.y + .05) === y && Math.floor(a.position.z) === z); }
  if (t === B.ZONA) { const [x, y, z] = xyz(i); return Math.hypot(J.x - x - .5, J.z - z - .5) < 3 && J.y > y - 1.5 && J.y < y + 3.5; }
  return false;
}
// cables con energía: desde cada mecanismo prendido, por los cables (también un escalón arriba o abajo)
function calcularEnergia() {
  const cables = new Set(), activos = new Set(), cola = [];
  for (const i of enBloques) if (EN_MEC.has(mundo[i]) && fuenteOn(i)) { activos.add(i); for (const j of vecinos(i)) if (mundo[j] === B.CABLE_E && !cables.has(j)) { cables.add(j); cola.push([j, 0]); } }
  while (cola.length) { const [i, d] = cola.shift(); if (d >= 32) continue; const [x, y, z] = xyz(i);
    for (const [a, , c] of V6) for (const b of [0, 1, -1]) { if (a === 0 && c === 0) continue; const nx = x + a, ny = y + b, nz = z + c;
      if (!dentro(nx, ny, nz)) continue; const j = idx(nx, ny, nz); if (mundo[j] !== B.CABLE_E || cables.has(j)) continue;
      if (b === 1 && solidoMov(get(x, y + 1, z))) continue; if (b === -1 && solidoMov(get(nx, y, nz))) continue;   // no atraviesa bloques
      cables.add(j); cola.push([j, d + 1]); }
    for (const j of vecinos(i)) if (mundo[j] === B.CABLE_E && !cables.has(j)) { cables.add(j); cola.push([j, d + 1]); } }
  // lo que recibe energía: al lado de un cable con energía o de un mecanismo prendido
  const usa = new Set();
  for (const s of [cables, activos]) for (const i of s) for (const j of vecinos(i)) if (EN_USA.has(mundo[j])) usa.add(j);
  // la puerta es de dos bloques: cuenta como una sola (la de abajo)
  for (const j of [...usa]) if (mundo[j] === B.PUERTA || mundo[j] === B.PUERTA_A) { const [x, y, z] = xyz(j); const ab = get(x, y - 1, z); if (ab === B.PUERTA || ab === B.PUERTA_A) { usa.delete(j); usa.add(idx(x, y - 1, z)); } }
  return { cables, usa };
}

// ───── pistones ─────
const NO_SE_MUEVE = new Set([B.ROCA, B.OBSIDIANA, B.PORTAL, B.COFRE, B.JAULA, B.DISPENSADOR, B.PISTON, B.PUERTA, B.PUERTA_A, B.CAMA, B.CARTEL, B.CABLE_E, ...EN_MEC].filter(x => x != null));
const seRompe = t => !t || t === B.AGUA || t === B.LAVA || (DEF[t] && DEF[t].planta);
const datosPiston = i => { const d = enDatos(); return d[i] || (d[i] = { f: [0, 0, 1], s: 0, e: 0 }); };
function empujar(i) {
  const p = datosPiston(i), [x, y, z] = xyz(i), [fx, fy, fz] = p.f, fila = [];
  for (let k = 1; k <= 13; k++) { const px = x + fx * k, py = y + fy * k, pz = z + fz * k; if (!dentro(px, py, pz)) return false; const t = get(px, py, pz);
    if (seRompe(t)) { fila.push([px, py, pz, t]); break; } if (NO_SE_MUEVE.has(t) || k === 13 || (DEF[t] && DEF[t].dur < 0)) return false; fila.push([px, py, pz, t]); }
  const L = []; for (let k = fila.length - 1; k >= 1; k--) L.push([fila[k][0], fila[k][1], fila[k][2], fila[k - 1][3]]);
  L.push([x + fx, y + fy, z + fz, B.AIRE]);
  sinGrupo(() => ponerMuchos(L)); p.e = 1; sucio = true;
  sonar('puerta', .5, .6) || son(160, .12, 'square', .08); return true;
}
function retraer(i) {
  const p = datosPiston(i), [x, y, z] = xyz(i), [fx, fy, fz] = p.f; p.e = 0; sucio = true;
  if (p.s) { const a = [x + fx, y + fy, z + fz], b = [x + 2 * fx, y + 2 * fy, z + 2 * fz], tb = get(...b);
    if (!get(...a) && tb && !NO_SE_MUEVE.has(tb) && !seRompe(tb) && DEF[tb] && DEF[tb].dur >= 0) sinGrupo(() => ponerMuchos([[...a, tb], [...b, B.AIRE]])); }
  son(220, .1, 'square', .07);
}

// ───── cada décima de segundo ─────
function enTick() {
  if (!jugando) return;
  const { cables, usa } = calcularEnergia(), invitado = enInvitado(), ahora = new Map();
  for (const j of usa) ahora.set(j, 1);
  for (const i of enBloques) if (mundo[i] === B.PISTON && !ahora.has(i)) ahora.set(i, 0);
  if (enPrimera) { enPrimera = false; enPrev = new Map(); for (const i of enBloques) if (mundo[i] === B.PISTON) enPrev.set(i, enDatos()[i] && enDatos()[i].e ? 1 : 0); for (const j of usa) if (mundo[j] !== B.PISTON) enPrev.set(j, 1); }
  for (const [i, on] of ahora) {
    const antes = enPrev.get(i) || 0; if (antes === on) continue; enPrev.set(i, on);
    if (invitado) continue;   // en línea, lo que cambia bloques lo hace el dueño de la sala
    const t = mundo[i], [x, y, z] = xyz(i);
    if (t === B.PISTON) { if (on) { if (!empujar(i)) enPrev.set(i, 0); } else if (datosPiston(i).e) retraer(i); }
    else if ((t === B.PUERTA || t === B.PUERTA_A) && on && t === B.PUERTA) { puerta(x, y, z); enAbiertas.add(i); }
    else if (t === B.TNT || t === B.TNT_G) { if (on) encender(x, y, z); }
    else if (t === B.DISPENSADOR && on && window.__mt) __mt.dispararDisp(i);
    else if (t === B.JAULA && on && window.__mt) __mt.generarEn(i, 2);
  }
  for (const [i, on] of enPrev) if (!ahora.has(i)) { enPrev.delete(i);
    if (on && enAbiertas.has(i) && !invitado && mundo[i] === B.PUERTA_A) { const [x, y, z] = xyz(i); puerta(x, y, z); } enAbiertas.delete(i); }
  // puertas que se apagan
  for (const i of [...enAbiertas]) if (!ahora.has(i)) { enAbiertas.delete(i); if (!invitado && mundo[i] === B.PUERTA_A) { const [x, y, z] = xyz(i); puerta(x, y, z); } }
  pintarEnergia(cables, usa);
}
setInterval(() => { try { enTick(); } catch (e) { console.warn('energia', e); } }, 100);
setInterval(() => { try { if (jugando) enEscanear(); } catch (e) {} }, 3000);

// ───── cómo se ve: cables que brillan, lámparas prendidas y la cabeza de los pistones ─────
const enG = new THREE.Group(); escena.add(enG);
const enMat = { cable: new THREE.MeshBasicMaterial({ color: 0xff5a2e }), chispa: new THREE.MeshBasicMaterial({ color: 0xffd080 }),
  luz: new THREE.MeshBasicMaterial({ color: 0xffe680, transparent: true, opacity: .85 }), halo: new THREE.MeshBasicMaterial({ color: 0xffcf5a, transparent: true, opacity: .22, depthWrite: false }),
  madera: new THREE.MeshLambertMaterial({ color: 0xb07a3a }), barra: new THREE.MeshLambertMaterial({ color: 0x9aa0aa }), pega: new THREE.MeshLambertMaterial({ color: 0x7ad06a }) };
const enGeo = { cable: new THREE.BoxGeometry(.3, .03, .3), luz: new THREE.BoxGeometry(1.01, 1.01, 1.01), halo: new THREE.BoxGeometry(1.25, 1.25, 1.25) };
function pintarEnergia(cables, usa) {
  const d = enDatos(), lamps = [...usa].filter(i => mundo[i] === B.LAMPARA_E), pist = [...enBloques].filter(i => mundo[i] === B.PISTON);
  const firma = [...cables].sort().join(',') + '|' + lamps.sort().join(',') + '|' + pist.map(i => i + ':' + (d[i] ? d[i].f.join('') + d[i].e + d[i].s : '')).join(',');
  if (firma === enFirma) return; enFirma = firma;
  for (const c of enG.children.slice()) enG.remove(c);
  for (const i of cables) { const [x, y, z] = xyz(i); const m = new THREE.Mesh(enGeo.cable, enMat.cable); m.position.set(x + .5, y + .07, z + .5); enG.add(m); }
  for (const i of lamps) { const [x, y, z] = xyz(i); const m = new THREE.Mesh(enGeo.luz, enMat.luz); m.position.set(x + .5, y + .5, z + .5); enG.add(m); const h = new THREE.Mesh(enGeo.halo, enMat.halo); h.position.copy(m.position); enG.add(h); }
  for (const i of pist) { const p = d[i] || { f: [0, 0, 1], e: 0, s: 0 }, [x, y, z] = xyz(i), [fx, fy, fz] = p.f, off = p.e ? 1 : 0;
    const placa = new THREE.Mesh(new THREE.BoxGeometry(fx ? .2 : 1, fy ? .2 : 1, fz ? .2 : 1), p.s ? enMat.pega : enMat.madera);
    placa.position.set(x + .5 + fx * (.42 + off), y + .5 + fy * (.42 + off), z + .5 + fz * (.42 + off)); enG.add(placa);
    if (p.e) { const b = new THREE.Mesh(new THREE.BoxGeometry(fx ? 1 : .26, fy ? 1 : .26, fz ? 1 : .26), enMat.barra); b.position.set(x + .5 + fx * .9, y + .5 + fy * .9, z + .5 + fz * .9); enG.add(b); } }
}

// ───── poner, tocar y quitar ─────
{ const p0 = ponerBloque; ponerBloque = function (x, y, z, t) {
    const viejo = dentro(x, y, z) ? mundo[idx(x, y, z)] : 0, r = p0.apply(this, arguments);
    if (!dentro(x, y, z)) return r; const i = idx(x, y, z), ahora = mundo[i];
    if (EN_MIRA[ahora]) enBloques.add(i); else if (EN_MIRA[viejo]) enBloques.delete(i);
    if (viejo === B.PISTON && ahora !== B.PISTON) delete enDatos()[i];
    if (ahora === B.PISTON && viejo !== B.PISTON && grupo && jugando) {   // lo puso el jugador: empuja hacia donde miraba
      const fx = -Math.sin(J.yaw), fz = -Math.cos(J.yaw), f = J.pitch > .85 ? [0, 1, 0] : J.pitch < -.85 ? [0, -1, 0] : Math.abs(fx) > Math.abs(fz) ? [fx > 0 ? 1 : -1, 0, 0] : [0, 0, fz > 0 ? 1 : -1];
      enDatos()[i] = { f, s: 0, e: 0 }; enPrev.set(i, 0); setTimeout(() => aviso(TR('enPistonAyuda'), 2400), 80); }
    if (ahora === B.LAMPARA_E && viejo !== ahora && grupo && jugando) setTimeout(() => aviso(TR('enAyuda'), 2200), 80);
    return r; }; }
{ const p0 = ponerMuchos; ponerMuchos = function (L) { const r = p0.apply(this, arguments);
    for (const [x, y, z] of L) if (dentro(x, y, z)) { const i = idx(x, y, z); if (EN_MIRA[mundo[i]]) enBloques.add(i); else enBloques.delete(i); }
    return r; }; }
// tocar un pistón con la mano vacía (o un objeto que no es bloque): pegajoso o normal
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) {
    if (!aventura() && !(window.__mec && __mec.sel())) { const h = apuntar(dir);
      if (h && h.b === B.PISTON && !(barra[sel] && esBloque(barra[sel]))) { const p = datosPiston(idx(h.x, h.y, h.z)); p.s = p.s ? 0 : 1; sucio = true; enFirma = '';
        aviso(TR(p.s ? 'enPegajoso' : 'enNormal'), 1400); son(p.s ? 520 : 380, .08, 'square', .08); swing = 1; return true; } }
    return t0(dir); }; }
// mecanismos: si están junto a un cable o a algo que usa energía, no hace falta elegir una acción
const tocaEnergia = i => vecinos(i).some(j => mundo[j] === B.CABLE_E || EN_USA.has(mundo[j]));
{ const m0 = mecTocar; mecTocar = function (dir) {
    if (!__mec.sel()) { const h = apuntar(dir);
      if (h && EN_MEC.has(h.b) && h.b !== B.ZONA) { const i = idx(h.x, h.y, h.z), M = __mec.mec();
        if (!M[i] && tocaEnergia(i)) { M[i] = { a: 'energia' }; sucio = true; }
        if (M[i] && M[i].a === 'energia') {
          if (h.b === B.PLACA) return false;
          const m = monstruoApuntado(dir); if (m && m.t < h.t) return false;
          swing = 1; vibrar(10);
          if (h.b === B.BOTON) { son(900, .06, 'square', .1); enBotones.set(i, performance.now() + 1600); }
          else { son(300, .06, 'square', .1); const on = h.b === B.PALANCA; accion(() => ponerBloque(h.x, h.y, h.z, on ? B.PALANCA_ON : B.PALANCA)); }
          return true; } } }
    return m0(dir); }; }
// al ponerlo junto a un cable no pregunta qué hace
{ const p0 = mecPuesto; mecPuesto = function (i) { if (tocaEnergia(i)) { __mec.mec()[i] = { a: 'energia' }; sucio = true; return; } return p0(i); }; }
// en la ventana "¿Qué hace?" aparece la opción de usarlo con cables
{ const a0 = abrirMec; abrirMec = function (i) { const r = a0.apply(this, arguments);
    $('mecOps').insertAdjacentHTML('beforeend', `<div class="mb" data-energia="${i}" style="background:#c8642e">${TR('mecEnergia')}</div>`); return r; }; }
$('mecOps').addEventListener('click', e => { const d = e.target.closest('[data-energia]'); if (!d) return; e.stopPropagation();
  __mec.mec()[+d.dataset.energia] = { a: 'energia' }; sucio = true; cerrar('mecCapa'); pausado = false; aviso(TR('enAyuda'), 2000); }, true);
// la acción "energía" no hace nada más (la energía va por los cables) y no avisa "no está conectado"
{ const a0 = activar; activar = function (i, on) { const c = __mec.mec()[i]; if (c && c.a === 'energia') return; if (!c && tocaEnergia(i)) return; return a0(i, on); }; }

// ───── al entrar a un mundo ─────
{ const e0 = entrarMundo; entrarMundo = function () { const r = e0.apply(this, arguments);
    try { enPintar(); enEscanear(); enPrimera = true; enPrev = new Map(); enBotones = new Map(); enAbiertas = new Set(); enFirma = ''; for (const c of enG.children.slice()) enG.remove(c); } catch (e) {}
    return r; }; }
window.__energia = { calcularEnergia, enTick, datosPiston, bloques: () => enBloques, escanear: enEscanear };
