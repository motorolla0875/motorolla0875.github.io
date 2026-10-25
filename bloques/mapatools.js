'use strict';
// ═════════ HERRAMIENTAS PARA CREAR MAPAS ═════════
// · Generador de monstruos: va sacando la criatura que elijas (hasta 4 a la vez).
// · Dispensador: dispara flechas, fuego, bolas de nieve o pociones cuando un mecanismo lo activa.
// · Detector de zona: se activa solo cuando alguien entra cerca (como una placa invisible de 3 bloques).
// · Mecanismos: nueva acción "Activar trampas y generadores".

Object.assign(TX.es, { jaulaElige: 'ELIGE QUÉ CRIATURA VA A SALIR', jaulaLista: 'GENERADOR: {n}', dispTipo: 'DISPENSADOR: {n}', municion_flecha: 'flechas', municion_fuego: 'bolas de fuego', municion_nieve: 'bolas de nieve', municion_pocion: 'pociones',
  mecDisparar: 'Activar trampas y generadores', mecSelDisparar: 'Toca los dispensadores y generadores que va a activar ({n})', soloTrampas: 'ESO NO ES UN DISPENSADOR NI UN GENERADOR', dispAyuda: 'CONÉCTALO CON UN BOTÓN, PALANCA, PLACA O DETECTOR<small>toca para cambiar lo que dispara</small>' });
Object.assign(TX.en, { jaulaElige: 'CHOOSE WHICH CREATURE WILL COME OUT', jaulaLista: 'SPAWNER: {n}', dispTipo: 'DISPENSER: {n}', municion_flecha: 'arrows', municion_fuego: 'fireballs', municion_nieve: 'snowballs', municion_pocion: 'potions',
  mecDisparar: 'Trigger traps and spawners', mecSelDisparar: 'Tap the dispensers and spawners it will trigger ({n})', soloTrampas: "THAT ISN'T A DISPENSER OR A SPAWNER", dispAyuda: 'CONNECT IT TO A BUTTON, LEVER, PLATE OR DETECTOR<small>tap to change what it shoots</small>' });
Object.assign(TX.pt, { jaulaElige: 'ESCOLHA QUAL CRIATURA VAI SAIR', jaulaLista: 'GERADOR: {n}', dispTipo: 'DISPENSADOR: {n}', municion_flecha: 'flechas', municion_fuego: 'bolas de fogo', municion_nieve: 'bolas de neve', municion_pocion: 'poções',
  mecDisparar: 'Ativar armadilhas e geradores', mecSelDisparar: 'Toque nos dispensadores e geradores que ele vai ativar ({n})', soloTrampas: 'ISSO NÃO É UM DISPENSADOR NEM UM GERADOR', dispAyuda: 'CONECTE A UM BOTÃO, ALAVANCA, PLACA OU DETECTOR<small>toque para mudar o que dispara</small>' });

const jaulas = () => mapa.jaulas || (mapa.jaulas = {});
const disps = () => mapa.disp || (mapa.disp = {});
const MUNICION = ['flecha', 'fuego', 'nieve', 'pocion'];

// ═════════ PONER Y CONFIGURAR ═════════
let jaulaPend = null;
window.criaParaJaula = t => {
  if (jaulaPend === null) return false;
  if (t === 'dragonJefe' || t === 'tricefalo' || t === 'ojonRey' || /^dragon\d$/.test(t)) return false;
  jaulas()[jaulaPend] = { t }; jaulaPend = null; sucio = true; cerrarPanel(); aviso(TR('jaulaLista', { n: __cria.nomCria(t).toUpperCase() }), 1600); son(660, .1, 'square', .08); return true;
};
function elegirJaula(i) { jaulaPend = i; panelTab = 'criaturas'; abrirPanel('criaturas'); aviso(TR('jaulaElige'), 1800); }
{ const c0 = cerrarPanel; cerrarPanel = function () { const r = c0.apply(this, arguments); jaulaPend = null; return r; }; }
{ const p0 = ponerBloque; ponerBloque = function (x, y, z, t) {
    const r = p0(x, y, z, t);
    if (grupo && jugando && dentro(x, y, z)) { const i = idx(x, y, z);
      if (t === B.JAULA && !aventura()) { const i2 = i; setTimeout(() => { if (mundo[i2] === B.JAULA) { if (creativo()) elegirJaula(i2); else { jaulas()[i2] = { t: 'zombi' }; sucio = true; } } }, 80); }
      if (t === B.DISPENSADOR) { const fx = -Math.sin(J.yaw), fz = -Math.cos(J.yaw), f = Math.abs(fx) > Math.abs(fz) ? [fx > 0 ? -1 : 1, 0] : [0, fz > 0 ? -1 : 1]; disps()[i] = { f, t: 'flecha' }; sucio = true; setTimeout(() => aviso(TR('dispAyuda'), 2600), 100); } }
    return r; }; }
// tocar un generador o un dispensador (en creativo) para cambiarlo
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) {
    if (!aventura() && creativo() && !(window.__mec && __mec.sel())) { const h = apuntar(dir);
      if (h && h.b === B.JAULA && !(barra[sel] && esBloque(barra[sel]))) { elegirJaula(idx(h.x, h.y, h.z)); swing = 1; return true; }
      if (h && h.b === B.DISPENSADOR && !(barra[sel] && esBloque(barra[sel]))) { const i = idx(h.x, h.y, h.z), d = disps()[i] || (disps()[i] = { f: [0, 1], t: 'flecha' }); d.t = MUNICION[(MUNICION.indexOf(d.t) + 1) % MUNICION.length]; sucio = true; aviso(TR('dispTipo', { n: TR('municion_' + d.t).toUpperCase() }), 1200); swing = 1; return true; } }
    return t0(dir); }; }

// ═════════ DISPARAR Y GENERAR ═════════
function dispararDisp(i) {
  const [x, y, z] = xyz(i), d = disps()[i] || { f: [0, 1], t: 'flecha' }, [fx, fz] = d.f;
  if (solidoMov(get(x + fx, y, z + fz))) return;
  __cria.disparar(d.t, x + .5 + fx * .7, y + .5, z + .5 + fz * .7, x + .5 + fx * 12, y + .5 + (d.t === 'flecha' || d.t === 'fuego' ? 0 : -1), z + .5 + fz * 12);
  polvo(x + .5 + fx * .6, y + .5, z + .5 + fz * .6, '#cccccc', 4);
}
function generarEn(i, cant) {
  const cfg = jaulas()[i]; if (!cfg) return 0; const [x, y, z] = xyz(i); let n = 0;
  for (let k = 0; k < 12 && n < cant; k++) {
    const px = x + Math.floor(Math.random() * 7) - 3, pz = z + Math.floor(Math.random() * 7) - 3;
    for (const py of [y, y + 1, y - 1]) if (dentro(px, py, pz) && !solidoMov(get(px, py, pz)) && !solidoMov(get(px, py + 1, pz)) && solidoMov(get(px, py - 1, pz))) {
      if (cfg.t === 'ojon') { crearMonstruo(px + .5, py, pz + .5); }
      else if (TIPOS[cfg.t]) { const g = crearAnimal(cfg.t, px + .5, py, pz + .5); const e = ex(g); e.j = i; e.f = 1; g.userData.huir = 0; }
      polvo(px + .5, py + .6, pz + .5, '#ff9a2e', 10); n++; break; }
  }
  return n;
}
// cada segundo: los generadores sacan criaturas si hay alguien cerca
{ const T = {}; setInterval(() => {
    if (!jugando || pausado || creativo() || (window.__mp && __mp.MP.invitado) || typeof mapa === 'undefined' || !mapa.jaulas) return;
    for (const k in mapa.jaulas) { const i = +k; if (mundo[i] !== B.JAULA) { delete mapa.jaulas[k]; continue; }
      const [x, y, z] = xyz(i); if (Math.hypot(J.x - x - .5, J.z - z - .5) > 16 || Math.abs(J.y - y) > 10) continue;
      T[i] = (T[i] ?? 2) - 1; if (T[i] > 0) continue; T[i] = 5 + Math.floor(Math.random() * 4);
      const vivos = animales.filter(a => a.userData.extra && a.userData.extra.j === i).length + (mapa.jaulas[k].t === 'ojon' ? 0 : 0);
      if (vivos < 4) generarEn(i, 1);
    } }, 1000); }

// ═════════ MECANISMOS: nueva acción y detector de zona ═════════
MEC_ACC.push(['disparar', 'mecDisparar']);
{ const p0 = pintarSel; pintarSel = function () { const r = p0.apply(this, arguments); const s = __mec.sel(); if (s && s.a === 'disparar') $('mecBarTxt').innerHTML = TR('mecSelDisparar', { n: s.obj.length }); return r; }; }
{ const m0 = mecTocar; mecTocar = function (dir) {
    const s = __mec.sel(), h = apuntar(dir);
    if (s && s.a === 'disparar' && h && h.b !== B.JAULA && h.b !== B.DISPENSADOR && idx(h.x, h.y, h.z) !== s.i) { aviso(TR('soloTrampas'), 900); return true; }
    // el detector de zona se configura como una placa (no se "aprieta")
    if (!s && h && h.b === B.ZONA) { if (!aventura()) { __mec.abrirMec(idx(h.x, h.y, h.z)); return true; } return false; }
    return m0(dir); }; }
{ const a0 = activar; activar = function (i, on) {
    const c = __mec.mec()[i];
    if (c && c.a === 'disparar') { if (on) for (const [j] of c.obj) { if (mundo[j] === B.DISPENSADOR) dispararDisp(j); else if (mundo[j] === B.JAULA) generarEn(j, 2); } return; }
    return a0(i, on); }; }
// detector de zona: se prende cuando el jugador entra a menos de 3 bloques
{ const dentroZona = new Set(); setInterval(() => {
    if (!jugando || pausado || !window.__mec) return; const M = __mec.mec();
    for (const k in M) { const i = +k; if (mundo[i] !== B.ZONA) continue; const [x, y, z] = xyz(i);
      const cerca = Math.hypot(J.x - x - .5, J.z - z - .5) < 3 && J.y > y - 1.5 && J.y < y + 3.5;
      if (cerca && !dentroZona.has(i)) { dentroZona.add(i); if (!creativo() || aventura()) activar(i, true); }
      else if (!cerca && dentroZona.has(i)) { dentroZona.delete(i); if (!creativo() || aventura()) activar(i, false); } }
  }, 200); }
// al romper un generador o dispensador se borra su configuración
{ const a0 = alTerminarAccion; alTerminarAccion = function (g) { a0(g); for (const [i, v, t] of g) { if (v === B.JAULA && t !== B.JAULA && mapa.jaulas) delete mapa.jaulas[i]; if (v === B.DISPENSADOR && t !== B.DISPENSADOR && mapa.disp) delete mapa.disp[i]; } }; }
window.__mt = { jaulas, disps, dispararDisp, generarEn, elegirJaula };
