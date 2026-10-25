'use strict';
// ═════════ COMO MINECRAFT PE: dificultad, mundo Superplano, modo Extremo y Espectador ═════════

Object.assign(TX.es, { dificultad: 'Dificultad', difPacifico: 'Pacífico', difFacil: 'Fácil', difNormal: 'Normal', difDificil: 'Difícil', tipoMundo: 'Mundo', tipoInfinito: 'Normal', tipoPlano: 'Superplano',
  extremoBtn: 'Extremo<small>una sola vida: si mueres, el mundo termina</small>', extremo: 'Extremo', plano: 'Superplano',
  extremoMuerte: '¡MORISTE EN MODO EXTREMO!', extremoMuerteSub: 'Este mundo terminó. Puedes recorrerlo como espectador.', verEspectador: 'Mirar como espectador', salirMenu: 'Salir al menú',
  espectador: 'Espectador', espectadorBtn: 'Modo espectador', espectadorOn: 'MODO ESPECTADOR<small>atraviesas todo volando · solo miras</small>', espectadorOff: 'VOLVISTE A CREATIVO', extremoAviso: 'MODO EXTREMO<small>una sola vida, cuídate</small>', extremoTerminado: 'ESTE MUNDO EXTREMO TERMINÓ<small>lo recorres como espectador</small>' });
Object.assign(TX.en, { dificultad: 'Difficulty', difPacifico: 'Peaceful', difFacil: 'Easy', difNormal: 'Normal', difDificil: 'Hard', tipoMundo: 'World', tipoInfinito: 'Normal', tipoPlano: 'Superflat',
  extremoBtn: 'Hardcore<small>one life only: if you die, the world ends</small>', extremo: 'Hardcore', plano: 'Superflat',
  extremoMuerte: 'YOU DIED IN HARDCORE MODE!', extremoMuerteSub: 'This world is over. You can explore it as a spectator.', verEspectador: 'Watch as spectator', salirMenu: 'Back to menu',
  espectador: 'Spectator', espectadorBtn: 'Spectator mode', espectadorOn: 'SPECTATOR MODE<small>fly through everything · just watch</small>', espectadorOff: 'BACK TO CREATIVE', extremoAviso: 'HARDCORE MODE<small>one life only, be careful</small>', extremoTerminado: 'THIS HARDCORE WORLD IS OVER<small>you explore it as a spectator</small>' });
Object.assign(TX.pt, { dificultad: 'Dificuldade', difPacifico: 'Pacífico', difFacil: 'Fácil', difNormal: 'Normal', difDificil: 'Difícil', tipoMundo: 'Mundo', tipoInfinito: 'Normal', tipoPlano: 'Superplano',
  extremoBtn: 'Hardcore<small>uma só vida: se morrer, o mundo acaba</small>', extremo: 'Hardcore', plano: 'Superplano',
  extremoMuerte: 'VOCÊ MORREU NO MODO HARDCORE!', extremoMuerteSub: 'Este mundo acabou. Você pode explorá-lo como espectador.', verEspectador: 'Ver como espectador', salirMenu: 'Voltar ao menu',
  espectador: 'Espectador', espectadorBtn: 'Modo espectador', espectadorOn: 'MODO ESPECTADOR<small>atravesse tudo voando · só olhe</small>', espectadorOff: 'DE VOLTA AO CRIATIVO', extremoAviso: 'MODO HARDCORE<small>uma só vida, cuidado</small>', extremoTerminado: 'ESTE MUNDO HARDCORE ACABOU<small>você o explora como espectador</small>' });

{ const st = document.createElement('style'); st.textContent = `
  #bExtremo { background: linear-gradient(#5a5f7a, #2a2d40) !important; }
  #extremoCapa .calavera { width: clamp(70px, 16vh, 120px); height: auto; margin-bottom: 6px; }
  #extremoCapa .titulo { color: #ff6b6b; font-size: clamp(24px, 5vw, 40px); text-align: center; }
  body.espect #barra, body.espect #barrasHud, body.espect #vida, body.espect #hambre, body.espect #xpHud, body.espect #herr, body.espect #mira, body.espect #brujulaHud, body.espect #minimapa { display: none !important; }
  .marcaMundo { display: inline-block; font-size: 10px; font-weight: 800; letter-spacing: .5px; padding: 0 6px; border-radius: 6px; margin-right: 4px; background: #2a2d40; color: #fff; vertical-align: 1px; }
  .marcaMundo.ext { background: #c0392b; }
`; document.head.appendChild(st); }

const SVG_CALAVERA = '<svg class="calavera" viewBox="0 0 16 16" shape-rendering="crispEdges"><path d="M4 1h8v1h1v1h1v6h-1v2h-2v3H5v-3H3V9H2V3h1V2h1z" fill="#f2f5ff"/><path d="M4 5h3v3H4zM9 5h3v3H9zM7 9h2v1H7zM6 12h1v1H6zM9 12h1v1H9z" fill="#0d153d"/><path d="M4 1h8v1H4zM3 2h1v1H3zM12 2h1v1h-1z" fill="#c8ccd8"/></svg>';

// ═════════ PANTALLA "NUEVO MUNDO": dificultad, tipo de mundo y botón Extremo ═════════
const leerOp = (k, d) => { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };
const NM = { dif: leerOp('voxDif', 'normal'), plano: leerOp('voxPlano', '0') === '1' };
{ const fila = (id, et, opc) => { const f = document.createElement('div'); f.className = 'ajFila'; f.style.margin = '4px 0'; f.innerHTML = `<span data-i="${et}"></span><div class="ajOpc" id="${id}">${opc}</div>`; return f; };
  const fd = fila('difOpc', 'dificultad', ['pacifico', 'facil', 'normal', 'dificil'].map(d => `<div data-d="${d}" data-i="dif${d[0].toUpperCase() + d.slice(1)}"></div>`).join(''));
  const fp = fila('planoOpc', 'tipoMundo', '<div data-p="0" data-i="tipoInfinito"></div><div data-p="1" data-i="tipoPlano"></div>');
  const tr = $('tamOpc') ? $('tamOpc').parentNode : $('bCreativo'); tr.parentNode.insertBefore(fp, tr.nextSibling); tr.parentNode.insertBefore(fd, tr.nextSibling);
  const e = document.createElement('div'); e.className = 'btn'; e.id = 'bExtremo'; e.dataset.ih = 'extremoBtn'; $('bSuper').parentNode.insertBefore(e, $('bSuper').nextSibling);
  const pintar = () => { for (const x of $('difOpc').children) x.classList.toggle('on', x.dataset.d === NM.dif); for (const x of $('planoOpc').children) x.classList.toggle('on', (x.dataset.p === '1') === NM.plano); };
  $('difOpc').addEventListener('click', ev => { const d = ev.target.closest('[data-d]'); if (!d) return; NM.dif = d.dataset.d; try { localStorage.setItem('voxDif', NM.dif); } catch (er) {} pintar(); });
  $('planoOpc').addEventListener('click', ev => { const d = ev.target.closest('[data-p]'); if (!d) return; NM.plano = d.dataset.p === '1'; try { localStorage.setItem('voxPlano', NM.plano ? '1' : '0'); } catch (er) {} pintar(); });
  e.onclick = () => { NM.extremoSig = true; crearMundo('supervivencia'); };
  pintar(); aplicarIdioma(); }

// lo elegido se guarda en el mundo nuevo justo antes de entrar
let pendienteNuevo = null;
{ const c0 = crearMundo; crearMundo = function (modo, ejemplo) {
    pendienteNuevo = ejemplo ? null : { dificultad: NM.extremoSig ? 'dificil' : NM.dif, plano: NM.plano || undefined, extremo: NM.extremoSig || undefined };
    NM.extremoSig = false; try { return c0(modo, ejemplo); } finally { pendienteNuevo = null; } }; }
const metaDe = id => leerLista().find(m => m.id === id);
function guardarMeta(id, cambios) { const l = leerLista(), m = l.find(x => x.id === id); if (!m) return; Object.assign(m, cambios); try { localStorage.setItem('bloquesMundos', JSON.stringify(l)); } catch (e) {} }

// ═════════ SUPERPLANO ═════════
const PLANO_Y = 9;
function generarPlano(S) {
  const put = mundoVacio(S);
  for (let x = 0; x < SX; x++) for (let z = 0; z < SZ; z++) { put(x, 0, z, B.ROCA); for (let y = 1; y < PLANO_Y - 2; y++) put(x, y, z, B.PIEDRA); put(x, PLANO_Y - 2, z, B.TIERRA); put(x, PLANO_Y - 1, z, B.TIERRA); put(x, PLANO_Y, z, B.PASTO); }
  spawn = { x: SX / 2 + .5, y: PLANO_Y + 1, z: SZ / 2 + .5, yaw: .6 };
}
{ const p0 = prepararMundo; prepararMundo = function (S, ej) {
    if (!window.mundoPlano || window.mundoTipo) return p0(S, ej);
    generarPlano(S); diffs = new Map(); spawnPropio = false;
  }; }

// ═════════ AL ENTRAR A UN MUNDO ═════════
window.difActual = 'normal'; window.mundoExtremo = false; window.espectador = false;
{ const e0 = entrarMundo; entrarMundo = function (id) {
    if (pendienteNuevo) { guardarMeta(id, pendienteNuevo); pendienteNuevo = null; }
    const m = metaDe(id) || {}; window.mundoPlano = !!m.plano;
    quitarEspectador(true);
    const r = e0(id); if (!jugando) return r;
    window.difActual = m.dificultad || 'normal'; window.mundoExtremo = !!m.extremo;
    // la dificultad se aplica una vez (después el jugador la puede cambiar en Opciones del mundo)
    if (m.dificultad && typeof mapa !== 'undefined' && !mapa.difOk) { mapa.difOk = 1;
      if (m.dificultad === 'pacifico') { REG.monstruos = 0; REG.hambre = false; for (const x of monstruos.slice()) quitarMonstruo(x, false); }
      else if (m.dificultad === 'dificil') REG.monstruos = 2;
      sucio = true; }
    if (m.extremo && !m.extremoMuerto && modoJuego === 'supervivencia') setTimeout(() => { if (jugando && mundoId === id) aviso(TR('extremoAviso'), 2600); }, 1600);
    if (m.extremoMuerto) { ponerEspectador(true); setTimeout(() => aviso(TR('extremoTerminado'), 3000), 800); }
    return r; }; }
{ const s0 = salirAlMenu; salirAlMenu = function () { quitarEspectador(true); $('extremoCapa').hidden = true; window.mundoExtremo = false; return s0.apply(this, arguments); }; }

// ═════════ DAÑO SEGÚN LA DIFICULTAD ═════════
const FACTOR_DANO = { pacifico: .5, facil: .5, normal: 1, dificil: 1.5 };
{ const l0 = lastimar; lastimar = function (n, kx, kz, salto) {
    if (window.espectador) return;
    if (n > 0 && n < 100) n = Math.max(1, Math.round(n * (FACTOR_DANO[window.difActual] || 1)));
    const r = l0(n, kx, kz, salto);
    if (vida <= 0 && window.mundoExtremo && jugando && !creativo()) muerteExtrema();
    return r; }; }
// en Pacífico la vida se recupera sola
{ let t = 0; setInterval(() => { if (!jugando || pausado || window.difActual !== 'pacifico' || creativo() || vida <= 0 || vida >= 20) return; if (++t >= 2) { t = 0; vida = Math.min(20, vida + 1); pintarVida(); } }, 1000); }

// ═════════ EXTREMO: una sola vida ═════════
cap('extremoCapa', `${SVG_CALAVERA}<div class="titulo" data-i="extremoMuerte"></div><div class="texto" data-i="extremoMuerteSub"></div><div class="btn" id="bExtEspect" data-i="verEspectador"></div><div class="btn" id="bExtSalir" data-i="salirMenu"></div>`);
function muerteExtrema() {
  guardarMeta(mundoId, { extremoMuerto: true });
  $('muerte').hidden = true; aplicarIdioma(); $('extremoCapa').hidden = false; pausado = true; soltarTodo();
  son(110, .9, 'sawtooth', .16);
}
$('bExtEspect').onclick = () => { $('extremoCapa').hidden = true; vida = 20; pintarVida(); pausado = false; ponerEspectador(true); };
$('bExtSalir').onclick = () => { $('extremoCapa').hidden = true; vida = 20; guardar(); salirAlMenu(); $('inicio').hidden = false; };
// en Extremo no se puede revivir: si igual aparece la pantalla de muerte, se reemplaza
{ const ob = new MutationObserver(() => { if (!$('muerte').hidden && window.mundoExtremo && jugando) muerteExtrema(); }); ob.observe($('muerte'), { attributes: true, attributeFilter: ['hidden'] }); }

// ═════════ ESPECTADOR ═════════
let espectFijo = false;
function ponerEspectador(fijo) {
  window.espectador = true; espectFijo = !!fijo; volando = true; J.vy = 0;
  document.body.classList.add('espect'); if (typeof pintarVolar === 'function') pintarVolar(); $('bVolar').hidden = true; $('bBajar').hidden = false;
  if (typeof quitarHerr === 'function') quitarHerr();
  if (!fijo) aviso(TR('espectadorOn'), 2200);
}
function quitarEspectador(silencio) {
  if (!window.espectador) return; window.espectador = false; espectFijo = false; document.body.classList.remove('espect');
  if (jugando) { volando = creativo() && volando; if (typeof pintarVolar === 'function') pintarVolar(); pintarBarra(); if (!silencio) aviso(TR('espectadorOff'), 1400); }
}
// atraviesa todo
{ const t0 = tope; tope = function (x, y, z, an, al) { if (window.espectador && jugando) return -Infinity; return t0(x, y, z, an, al); }; }
// no rompe ni pone nada
{ const t0 = tocar; tocar = function (dir) { if (window.espectador) return; return t0(dir); }; }
{ const s0 = seguirRompiendo; seguirRompiendo = function (dir, dt) { if (window.espectador) return; return s0(dir, dt); }; }
// siempre volando, sin caer
{ const f0 = fisica; fisica = function (dt) { if (window.espectador) { volando = true; if (J.y < 1) J.y = 1; } return f0(dt); }; }
// botón en la pausa (solo en creativo, o en un mundo extremo terminado)
{ const b = document.createElement('div'); b.className = 'btn'; b.id = 'bEspect'; b.dataset.i = 'espectadorBtn';
  b.onclick = () => { if (espectFijo) return; $('pausa').hidden = true; pausado = false; if (window.espectador) quitarEspectador(); else ponerEspectador(false); };
  $('pausa').insertBefore(b, $('bSalir'));
  const ob = new MutationObserver(() => { if ($('pausa').hidden) return; b.style.display = jugando && creativo() && !espectFijo ? '' : 'none'; b.classList.toggle('on', !!window.espectador); });
  ob.observe($('pausa'), { attributes: true, attributeFilter: ['hidden'] }); aplicarIdioma(); }

// ═════════ LISTA DE MUNDOS: marcas de Extremo, Superplano y dificultad ═════════
{ const p0 = pintarMundos; pintarMundos = function () { const r = p0.apply(this, arguments);
    const l = leerLista();
    for (const fila of document.querySelectorAll('#listaMundos .mundoFila')) { const b = fila.querySelector('[data-entrar]'); if (!b) continue; const m = l.find(x => x.id === b.dataset.entrar); if (!m) continue;
      const sm = fila.querySelector('.info small'); if (!sm) continue; let h = '';
      if (m.extremo) h += `<span class="marcaMundo ext">${TR('extremo').toUpperCase()}</span>`;
      if (m.plano) h += `<span class="marcaMundo">${TR('plano').toUpperCase()}</span>`;
      if (m.dificultad && m.dificultad !== 'normal' && !m.extremo) h += `<span class="marcaMundo">${TR('dif' + m.dificultad[0].toUpperCase() + m.dificultad.slice(1)).toUpperCase()}</span>`;
      if (h) sm.insertAdjacentHTML('afterbegin', h); }
    return r; }; }

window.__mc = { NM, ponerEspectador, quitarEspectador, muerteExtrema, generarPlano, metaDe };
