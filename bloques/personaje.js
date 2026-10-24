'use strict';
// ═════════ PERSONAJE DEL JUGADOR: 3 para elegir, brazo en primera persona y cámara desde atrás o de frente ═════════

Object.assign(TX.es, { personaje: 'Personaje', pj0: 'Explorador', pj1: 'Constructor', pj2: 'Aventurera', vistaT: 'Cambiar vista', vista0: 'PRIMERA PERSONA', vista1: 'VISTA DE ATRÁS', vista2: 'VISTA DE FRENTE',
  cambiarPj: 'Cambiar', misPj: 'Personajes', nuevoPj: '+ Nuevo', usarPj: 'Usar este', pjUsando: 'EN USO', baseAyuda: 'Este personaje viene con el juego. Toca "+ Nuevo" para crear uno tuyo a partir de él.',
  piel: 'Piel', peloC: 'Pelo', peinado: 'Peinado', pCorto: 'Corto', pLargo: 'Largo', pCola: 'Cola', pPuntas: 'Puntas', pPelado: 'Pelado', flequilloC: 'Flequillo',
  remeraC: 'Remera', pantalonC: 'Pantalón', zapatosC: 'Zapatos', overolC: 'Overol', sombreroC: 'En la cabeza', ninguno: 'Nada', sCasco: 'Casco', sGorra: 'Gorra', sCorona: 'Corona', sOrejas: 'Orejas de gato',
  lentesC: 'Lentes', mochilaC: 'Mochila', bufandaC: 'Bufanda', capaC: 'Capa', mejillasC: 'Mejillas', skinCargada: 'PERSONAJE CARGADO<small>ya lo puedes usar</small>', nombrePj: 'Mi personaje' });
Object.assign(TX.en, { personaje: 'Character', pj0: 'Explorer', pj1: 'Builder', pj2: 'Adventurer', vistaT: 'Change view', vista0: 'FIRST PERSON', vista1: 'BACK VIEW', vista2: 'FRONT VIEW',
  cambiarPj: 'Change', misPj: 'Characters', nuevoPj: '+ New', usarPj: 'Use this one', pjUsando: 'IN USE', baseAyuda: 'This character comes with the game. Tap "+ New" to make your own based on it.',
  piel: 'Skin', peloC: 'Hair', peinado: 'Hairstyle', pCorto: 'Short', pLargo: 'Long', pCola: 'Ponytail', pPuntas: 'Spiky', pPelado: 'Bald', flequilloC: 'Bangs',
  remeraC: 'Shirt', pantalonC: 'Pants', zapatosC: 'Shoes', overolC: 'Overalls', sombreroC: 'On the head', ninguno: 'Nothing', sCasco: 'Helmet', sGorra: 'Cap', sCorona: 'Crown', sOrejas: 'Cat ears',
  lentesC: 'Glasses', mochilaC: 'Backpack', bufandaC: 'Scarf', capaC: 'Cape', mejillasC: 'Blush', skinCargada: 'CHARACTER LOADED<small>you can use it now</small>', nombrePj: 'My character' });
Object.assign(TX.pt, { personaje: 'Personagem', pj0: 'Explorador', pj1: 'Construtor', pj2: 'Aventureira', vistaT: 'Mudar visão', vista0: 'PRIMEIRA PESSOA', vista1: 'VISÃO DE TRÁS', vista2: 'VISÃO DE FRENTE',
  cambiarPj: 'Mudar', misPj: 'Personagens', nuevoPj: '+ Novo', usarPj: 'Usar este', pjUsando: 'EM USO', baseAyuda: 'Este personagem vem com o jogo. Toque em "+ Novo" para criar o seu a partir dele.',
  piel: 'Pele', peloC: 'Cabelo', peinado: 'Penteado', pCorto: 'Curto', pLargo: 'Longo', pCola: 'Rabo de cavalo', pPuntas: 'Espetado', pPelado: 'Careca', flequilloC: 'Franja',
  remeraC: 'Camiseta', pantalonC: 'Calça', zapatosC: 'Sapatos', overolC: 'Macacão', sombreroC: 'Na cabeça', ninguno: 'Nada', sCasco: 'Capacete', sGorra: 'Boné', sCorona: 'Coroa', sOrejas: 'Orelhas de gato',
  lentesC: 'Óculos', mochilaC: 'Mochila', bufandaC: 'Cachecol', capaC: 'Capa', mejillasC: 'Bochechas', skinCargada: 'PERSONAGEM CARREGADO<small>já pode usar</small>', nombrePj: 'Meu personagem' });

// personajes que vienen con el juego (no se editan; se copian para crear uno propio)
const PJS = [
  { id: 'b0', base: 'pj0', piel: '#f2c9a0', pelo: '#5a3418', remera: '#ff8a2e', pantalon: '#3a5ad8', zapatos: '#3a2a20', peinado: 'corto', flequillo: 1, mochila: '#2fb65a' },
  { id: 'b1', base: 'pj1', piel: '#c98a5a', pelo: '#2a1a10', remera: '#ffffff', pantalon: '#2a6fe0', zapatos: '#5a3418', peinado: 'corto', sombrero: 'casco', sombreroC: '#ffd23a', overol: 1, mejillas: 1 },
  { id: 'b2', base: 'pj2', piel: '#ffd9b8', pelo: '#e05a2a', remera: '#2fb65a', pantalon: '#7e2fbe', zapatos: '#3a2a20', peinado: 'cola', flequillo: 1, mejillas: 1, bufanda: '#ffe14a' },
];
const leerLS = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } };
const guardarLS = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
const leerSkins = () => { try { return JSON.parse(localStorage.getItem('voxSkins') || '[]'); } catch (e) { return []; } };
const guardarSkins = l => { try { localStorage.setItem('voxSkins', JSON.stringify(l)); } catch (e) { aviso(TR('noGuardar'), 1500); } };
let skinSel = leerLS('voxSkin', null) || ('b' + Math.min(2, Math.max(0, +leerLS('voxPersonaje', 0) || 0)));
let modoCam = Math.min(2, Math.max(0, +leerLS('voxVista', 0) || 0));
const todasSkins = () => PJS.concat(leerSkins());
const skinDe = id => todasSkins().find(x => x.id === id) || PJS[0];
const skinActual = () => skinDe(skinSel);
const nombreSkin = k => k.base ? TR(k.base) : (k.nombre || TR('nombrePj'));
const colM = c => matA(parseInt(String(c || '#888888').slice(1), 16));

// ───── armar el personaje (con partes que se mueven) ─────
function armarPersonaje(P) {
  const g = new THREE.Group(), piel = colM(P.piel), pelo = colM(P.pelo), rem = colM(P.remera), pan = colM(P.pantalon), zap = colM(P.zapatos || '#3a2a20'), boca = colM('#a04848');
  const parte = (x, y, z, padre = g) => { const q = new THREE.Group(); q.position.set(x, y, z); padre.add(q); return q; };
  const piernas = [-1, 1].map(s => { const q = parte(s * .12, .44, 0); caja(q, .2, .38, .22, 0, -.19, 0, pan); caja(q, .22, .1, .28, 0, -.39, .03, zap); return q; });
  caja(g, .5, .46, .3, 0, .67, 0, rem);
  if (P.overol) { caja(g, .34, .28, .02, 0, .64, .16, pan); for (const s of [-1, 1]) caja(g, .06, .2, .02, s * .14, .82, .16, pan); }
  if (P.mochila) { caja(g, .4, .42, .16, 0, .7, -.23, colM(P.mochila)); caja(g, .3, .12, .06, 0, .62, -.32, colM('#5a3418')); }
  if (P.bufanda) caja(g, .54, .1, .34, 0, .9, 0, colM(P.bufanda));
  let capa = null; if (P.capa) { capa = parte(0, .9, P.mochila ? -.33 : -.17); caja(capa, .5, .74, .04, 0, -.37, 0, colM(P.capa)); }
  const brazos = [-1, 1].map(s => { const q = parte(s * .34, .88, 0); caja(q, .16, .4, .18, 0, -.2, 0, rem); caja(q, .14, .1, .16, 0, -.44, 0, piel); return q; });
  const cab = parte(0, .9, 0), Y = -.9;
  caja(cab, .62, .58, .56, 0, 1.2 + Y, 0, piel); ojos(cab, .14, 1.22 + Y, .285, 1);
  caja(cab, .16, .04, .02, 0, 1.05 + Y, .285, boca); for (const s of [-1, 1]) caja(cab, .04, .04, .02, s * .09, 1.07 + Y, .285, boca);
  if (P.mejillas) for (const s of [-1, 1]) caja(cab, .08, .05, .02, s * .21, 1.08 + Y, .283, colM('#ff9a9a'));
  // pelo
  const pz = P.peinado || 'corto';
  if (pz !== 'pelado') {
    caja(cab, .66, .16, .6, 0, 1.53 + Y, 0, pelo);
    if (pz === 'largo') { caja(cab, .66, .78, .08, 0, 1.16 + Y, -.3, pelo); for (const s of [-1, 1]) caja(cab, .07, .62, .56, s * .325, 1.24 + Y, -.02, pelo); }
    else { caja(cab, .66, .5, .08, 0, 1.3 + Y, -.3, pelo); for (const s of [-1, 1]) caja(cab, .06, .32, .56, s * .32, 1.36 + Y, -.02, pelo); }
    if (pz === 'puntas') for (const [x, z, h] of [[-.2, -.1, .16], [0, .05, .22], [.2, -.1, .16], [0, -.2, .18]]) caja(cab, .16, h, .16, x, 1.61 + h / 2 + Y, z, pelo);
    if (pz === 'cola') { caja(cab, .24, .24, .16, 0, 1.4 + Y, -.4, pelo); caja(cab, .2, .44, .16, 0, 1.12 + Y, -.44, pelo); caja(cab, .26, .07, .18, 0, 1.36 + Y, -.4, colM('#ffe14a')); }
    if (P.flequillo) caja(cab, .5, .1, .06, -.05, 1.45 + Y, .28, pelo);
  }
  if (P.lentes) { const l = colM(P.lentes); for (const s of [-1, 1]) caja(cab, .2, .16, .02, s * .14, 1.22 + Y, .3, l); caja(cab, .1, .03, .02, 0, 1.25 + Y, .3, l); }
  const sc = colM(P.sombreroC || '#ffd23a');
  if (P.sombrero === 'casco') { caja(cab, .7, .2, .64, 0, 1.58 + Y, 0, sc); caja(cab, .74, .05, .3, 0, 1.49 + Y, .2, sc); caja(cab, .12, .08, .66, 0, 1.7 + Y, 0, colM('#f5b82a')); }
  if (P.sombrero === 'gorra') { caja(cab, .68, .16, .62, 0, 1.57 + Y, 0, sc); caja(cab, .52, .04, .26, 0, 1.51 + Y, .4, sc); }
  if (P.sombrero === 'corona') { const o = colM('#ffd23a'); caja(cab, .64, .1, .58, 0, 1.6 + Y, 0, o); for (const [x, z] of [[-.27, -.24], [.27, -.24], [-.27, .24], [.27, .24], [0, .24], [0, -.24]]) caja(cab, .1, .14, .1, x, 1.71 + Y, z, o); caja(cab, .08, .08, .02, 0, 1.6 + Y, .3, sc); }
  if (P.sombrero === 'orejas') for (const s of [-1, 1]) { caja(cab, .16, .18, .08, s * .2, 1.6 + Y, 0, sc); caja(cab, .08, .1, .02, s * .2, 1.59 + Y, .045, colM('#ff9ab8')); }
  g.userData = { piernas, brazos, cab, capa, fase: 0, item: null, itemId: -1 };
  return g;
}

let jugador = null;
function rearmarJugador() { if (jugador) escena.remove(jugador); jugador = armarPersonaje(skinActual()); jugador.visible = false; escena.add(jugador); manoId = -9; }
rearmarJugador();

// lo que el personaje tiene en la mano (visto desde afuera)
function itemEnMano(id) {
  const u = jugador.userData, br = u.brazos[0]; if (u.item) { br.remove(u.item); u.item = null; } u.itemId = id; if (!id) return;
  const d = DEF[id]; let m;
  if (d && (!d.forma || d.icono) && !d.planta && id !== B.ESCALERA && id !== B.PUERTA) { const ge = geoBloque(d, .26); ge.computeVertexNormals(); m = new THREE.Mesh(ge, new THREE.MeshLambertMaterial({ map: atlasTex, vertexColors: true, alphaTest: .5 })); }
  else { const tile = d ? d.tiles[2] : ITEM[id].tile, c = document.createElement('canvas'); c.width = c.height = 16; c.getContext('2d').drawImage(atlas, (tile % 8) * 16, Math.floor(tile / 8) * 16, 16, 16, 0, 0, 16, 16);
    const tx = new THREE.CanvasTexture(c); tx.magFilter = tx.minFilter = THREE.NearestFilter; tx.generateMipmaps = false; m = new THREE.Mesh(new THREE.PlaneGeometry(.4, .4), new THREE.MeshLambertMaterial({ map: tx, alphaTest: .5, side: THREE.DoubleSide })); m.rotation.y = Math.PI / 2; }
  m.position.set(0, -.5, .14); br.add(m); u.item = m;
}

// ───── brazo en primera persona (con el color del personaje) ─────
const armarMano0 = armarMano;
armarMano = function (id) {
  armarMano0(id);
  if (!id && manoG.children.length) { const v = manoG.children.pop(); v.geometry.dispose(); v.material.dispose(); }
  const P = skinActual(), mat = c => new THREE.MeshBasicMaterial({ color: c, map: ruidoTex, depthTest: false, depthWrite: false, transparent: true });
  const gm = new THREE.BoxGeometry(.15, .15, .42), gh = new THREE.BoxGeometry(.14, .14, .12); gm.translate(0, 0, .1); gh.translate(0, 0, -.16);
  for (const [ge, c] of [[gm, P.remera], [gh, P.piel]]) { const m = new THREE.Mesh(ge, mat(c)); if (id) { m.position.set(.5, -.34, -.46); m.rotation.set(.4, -.1, 0); } else { m.position.set(.38, -.33, -.46); m.rotation.set(.35, -.15, 0); } m.renderOrder = 998; manoG.add(m); }
};
const colorBrazo = () => { const k = Math.max(.3, U.uDia.value); manoG.traverse(o => { if (o.material && o.material !== matManoBloque && o.material.userData.base == null) o.material.userData.base = o.material.color.getHex(); if (o.material && o.material.userData.base != null) o.material.color.setHex(o.material.userData.base).multiplyScalar(k); }); };

// ───── botón de vista y elección de personaje ─────
{ const d = document.createElement('div'); d.className = 'bChico'; d.id = 'bVista'; d.dataset.it = 'vistaT';
  d.innerHTML = pix(['..XXXX..', '..XXXX..', '..XXXX..', '...XX...', '.XXXXXX.', 'X.XXXX.X', '..X..X..', '..X..X..'], '#fff');
  $('botonesArriba').insertBefore(d, $('bPausa'));
  d.onclick = () => { modoCam = (modoCam + 1) % 3; guardarLS('voxVista', modoCam); aviso(TR('vista' + modoCam), 900); }; }
{ const f = document.createElement('div'); f.className = 'ajFila'; f.innerHTML = '<span data-i="personaje"></span><b id="ajPjNom" style="font-size:13px;color:#ffe14a"></b><div class="ajOpc"><div class="on" id="ajPjCambiar" data-i="cambiarPj"></div></div>';
  $('ajustes').insertBefore(f, $('bAjListo')); }
aplicarIdioma();

// ───── cada cuadro: mover el personaje y la cámara ─────
const solidoCam = (x, y, z) => { const t = get(Math.floor(x), Math.floor(y), Math.floor(z)); return t && DEF[t] && DEF[t].solido && !DEF[t].trans; };
function pjFrame(dt) {
  const tercera = jugando && modoCam > 0;
  jugador.visible = tercera; if (!jugando) return;
  colorBrazo(); manoG.visible = !tercera && manoId !== -2; $('mira').style.visibility = modoCam === 2 ? 'hidden' : '';
  if (!tercera) return;
  const u = jugador.userData, id = barra[sel] || 0; if (id !== u.itemId) itemEnMano(id);
  jugador.position.set(J.x, J.y, J.z); jugador.rotation.y = J.yaw + Math.PI;
  // caminar, saltar y golpear
  const vel = J.rapidez || 0; u.fase += dt * vel * 2.4; const amp = Math.min(1, vel / 4) * .75, s = Math.sin(u.fase) * amp;
  const aire = !J.suelo && !volando;
  u.piernas[0].rotation.x = aire ? .35 : s; u.piernas[1].rotation.x = aire ? -.25 : -s;
  u.brazos[1].rotation.x = aire ? -.5 : -s * .9; u.brazos[0].rotation.x = aire ? -.5 : s * .9;
  if (swing > 0) u.brazos[0].rotation.x = -.4 - Math.sin(swing * Math.PI) * 1.3;
  if (volando) { u.brazos[0].rotation.z = .5; u.brazos[1].rotation.z = -.5; } else { u.brazos[0].rotation.z = 0; u.brazos[1].rotation.z = 0; }
  u.cab.rotation.x = -J.pitch * .6;
  if (u.capa) u.capa.rotation.x = -.08 - Math.min(.7, vel * .12) - (aire ? .3 : 0) + Math.sin(u.fase * 2) * .04 * amp;
  // cámara detrás o delante (sin meterse dentro de los bloques)
  const ojo = new THREE.Vector3(J.x, J.y + OJOS, J.z), cp = Math.cos(J.pitch), f = new THREE.Vector3(-Math.sin(J.yaw) * cp, Math.sin(J.pitch), -Math.cos(J.yaw) * cp);
  const lado = modoCam === 1 ? -1 : 1; let t = .3;
  for (; t < 4; t += .1) { const p = ojo.clone().addScaledVector(f, lado * t); if (solidoCam(p.x, p.y, p.z)) { t -= .3; break; } }
  t = Math.max(.6, t);
  cam.position.copy(ojo).addScaledVector(f, lado * t);
  if (modoCam === 2) { cam.rotation.y = J.yaw + Math.PI; cam.rotation.x = -J.pitch; }
}
window.__pj = { armarPersonaje, PJS, modo: v => { if (v != null) modoCam = v; return modoCam; }, sel: v => { if (v != null) { skinSel = typeof v === 'number' ? 'b' + v : v; rearmarJugador(); } return skinSel; }, jugador: () => jugador, leerSkins, abrirSkins: () => abrirSkins('ajustes') };

// ═════════ EDITOR DE PERSONAJES (skins) ═════════
cap('skinCapa', '<div class="mVentana" style="width:min(820px,96vw)"><div class="vCab"><div class="vTit" data-i="personaje"></div><div class="cerrar" id="skinCerrar">X</div></div><div class="vCuerpo"><div class="pixWrap"><canvas id="skinVista" width="240" height="300" style="width:170px;height:212px;border:3px solid #0d153d;border-radius:12px;background:linear-gradient(#8fc4ef,#cfe8ff);position:sticky;top:0;display:block"></canvas><div style="flex:1;min-width:250px" id="skinCuerpo"></div></div></div><div class="vPie" style="display:flex;gap:6px;flex-wrap:wrap" id="skinPie"></div></div>');
aplicarIdioma();
const TONOS = ['#ffe0c4', '#f2c9a0', '#e0ac80', '#c98a5a', '#a86a40', '#8a5232', '#5e3a22', '#3e2616'];
let skinVer = null, skinVolver = null, skinVista = null;
function abrirSkins(volver) { skinVolver = volver; skinVer = skinSel; pintarSkins(); if (volver) cerrar(volver); abrir('skinCapa'); vistaSkin(); }
$('ajPjCambiar').onclick = () => abrirSkins('ajustes');
const pintarNomPj = () => { $('ajPjNom').textContent = nombreSkin(skinActual()); }; pintarNomPj();
function pintarSkins() {
  const lista = todasSkins(), k = skinDe(skinVer), propia = !k.base;
  let h = `<h4>${TR('misPj')}</h4><div class="opcG">` + lista.map(x => `<div data-ver="${x.id}" class="${x.id === skinVer ? 'on' : ''}">${esc(nombreSkin(x))}${x.id === skinSel ? ' ✓' : ''}</div>`).join('') + `<div data-nuevo="1" style="background:#2fb65a">${TR('nuevoPj')}</div></div>`;
  if (!propia) h += `<div style="font-size:13px;margin-top:10px">${TR('baseAyuda')}</div>`;
  else {
    const pal = (campo, colores, conNada) => `<div class="paleta" data-campo="${campo}" style="grid-template-columns:repeat(12,22px)">${conNada ? `<div data-c="" title="${TR('ninguno')}" class="${!k[campo] ? 'on' : ''}" style="background:repeating-linear-gradient(45deg,#fff 0 4px,#e0475a 4px 6px);width:22px;height:22px"></div>` : ''}${colores.map(c => `<div data-c="${c}" style="background:${c};width:22px;height:22px" class="${k[campo] === c ? 'on' : ''}"></div>`).join('')}</div>`;
    const ops = (campo, lista) => `<div class="opcG" data-op="${campo}">${lista.map(([v, l]) => `<div data-v='${JSON.stringify(v)}' class="${JSON.stringify(k[campo] ?? null) === JSON.stringify(v) ? 'on' : ''}">${TR(l)}</div>`).join('')}</div>`;
    h += `<h4>${TR('nombrePj')}</h4><input class="campo" id="skinNombre" maxlength="20" value="${esc(k.nombre || '')}">`;
    h += `<h4>${TR('piel')}</h4>` + pal('piel', TONOS.concat(['#9fe08a', '#8ab8ff', '#c58cf5', '#ff9ab8']));
    h += `<h4>${TR('peinado')}</h4>` + ops('peinado', [['corto', 'pCorto'], ['largo', 'pLargo'], ['cola', 'pCola'], ['puntas', 'pPuntas'], ['pelado', 'pPelado']]) + `<div style="margin-top:4px">` + ops('flequillo', [[1, 'flequilloC'], [0, 'no']]) + '</div>';
    h += `<h4>${TR('peloC')}</h4>` + pal('pelo', ['#2a1a10', '#5a3418', '#8a5232', '#e05a2a', '#f5d36a', '#f2f2f2', '#7f7f7f', '#3f8eec', '#ff8ab8', '#7e2fbe', '#2fb65a', '#d42a2a']);
    h += `<h4>${TR('remeraC')}</h4>` + pal('remera', PALETA) + `<h4>${TR('pantalonC')}</h4>` + pal('pantalon', PALETA) + `<div style="margin-top:4px">` + ops('overol', [[1, 'overolC'], [0, 'no']]) + '</div>';
    h += `<h4>${TR('zapatosC')}</h4>` + pal('zapatos', PALETA);
    h += `<h4>${TR('sombreroC')}</h4>` + ops('sombrero', [[null, 'ninguno'], ['casco', 'sCasco'], ['gorra', 'sGorra'], ['corona', 'sCorona'], ['orejas', 'sOrejas']]) + (k.sombrero && k.sombrero !== 'corona' ? pal('sombreroC', PALETA) : '');
    h += `<h4>${TR('lentesC')}</h4>` + pal('lentes', ['#14142a', '#3a3a3a', '#d42a2a', '#3f8eec', '#ff8ab8', '#ffd23a'], true);
    h += `<h4>${TR('mochilaC')}</h4>` + pal('mochila', PALETA, true) + `<h4>${TR('bufandaC')}</h4>` + pal('bufanda', PALETA, true) + `<h4>${TR('capaC')}</h4>` + pal('capa', PALETA, true);
    h += `<h4>${TR('mejillasC')}</h4>` + ops('mejillas', [[1, 'si'], [0, 'no']]);
  }
  $('skinCuerpo').innerHTML = h;
  $('skinPie').innerHTML = (skinVer === skinSel ? `<div class="mb" style="background:#7c86ad">${TR('pjUsando')}</div>` : `<div class="mb verde" id="skinUsar">${TR('usarPj')}</div>`) + (propia ? `<div class="mb" id="skinCompartir">${TR('compartir')}</div><div class="mb rojo" id="skinBorrar">${TR('borrar')}</div>` : '');
}
function cambiarSkin(fn) { const l = leerSkins(), i = l.findIndex(x => x.id === skinVer); if (i < 0) return; fn(l[i]); guardarSkins(l); if (skinVer === skinSel) rearmarJugador(); pintarSkins(); vistaSkin(); }
$('skinCuerpo').addEventListener('click', e => {
  let d = e.target.closest('[data-ver]'); if (d) { skinVer = d.dataset.ver; pintarSkins(); vistaSkin(); return; }
  if (e.target.closest('[data-nuevo]')) { const base = skinDe(skinVer), n = Object.assign({}, base, { id: 's' + Date.now().toString(36), nombre: TR('nombrePj') + ' ' + (leerSkins().length + 1) }); delete n.base; const l = leerSkins(); l.push(n); guardarSkins(l); skinVer = n.id; pintarSkins(); vistaSkin(); return; }
  d = e.target.closest('[data-campo] [data-c]'); if (d) { const campo = d.parentElement.dataset.campo; cambiarSkin(k => { k[campo] = d.dataset.c || null; }); return; }
  d = e.target.closest('[data-op] [data-v]'); if (d) { const campo = d.parentElement.dataset.op; cambiarSkin(k => { k[campo] = JSON.parse(d.dataset.v); }); }
});
$('skinCuerpo').addEventListener('change', e => { if (e.target.id === 'skinNombre') cambiarSkin(k => { k.nombre = e.target.value.trim().slice(0, 20) || TR('nombrePj'); }); });
$('skinPie').addEventListener('click', async e => {
  if (e.target.closest('#skinUsar')) { skinSel = skinVer; guardarLS('voxSkin', skinSel); rearmarJugador(); pintarSkins(); pintarNomPj(); }
  else if (e.target.closest('#skinCompartir')) { const k = skinDe(skinVer); compartirArchivo(await empacar({ formato: 'voxelium', tipo: 'skin', v: 1, skin: k }), nombreArchivo(nombreSkin(k)) + '.voxelskin'); }
  else if (d0(e, '#skinBorrar')) { const b = e.target.closest('#skinBorrar'); if (!b.dataset.seguro) { b.dataset.seguro = 1; b.textContent = TR('seguro'); return; }
    guardarSkins(leerSkins().filter(x => x.id !== skinVer)); if (skinSel === skinVer) { skinSel = 'b0'; guardarLS('voxSkin', skinSel); rearmarJugador(); pintarNomPj(); } skinVer = skinSel; pintarSkins(); vistaSkin(); }
});
const d0 = (e, s) => e.target.closest(s);
$('skinCerrar').onclick = () => { cerrar('skinCapa'); if (skinVista) skinVista.on = false; pintarNomPj(); if (skinVolver) abrir(skinVolver); };
// cargar un personaje que te pasaron (.voxelskin)
function skinImportar(k) { const n = Object.assign({}, k, { id: 's' + Date.now().toString(36) }); delete n.base; const l = leerSkins(); l.push(n); guardarSkins(l); aviso(TR('skinCargada'), 2000); if (!$('skinCapa').hidden) { skinVer = n.id; pintarSkins(); vistaSkin(); } }
// vista 3D que gira y camina
function vistaSkin() {
  if (!skinVista) { const r = new THREE.WebGLRenderer({ canvas: $('skinVista'), antialias: true, alpha: true }); r.setPixelRatio(1); const e = new THREE.Scene(); e.add(new THREE.AmbientLight(0xffffff, .62)); const l = new THREE.DirectionalLight(0xffffff, .7); l.position.set(2, 4, 3); e.add(l);
    const c = new THREE.PerspectiveCamera(30, 240 / 300, .1, 50); c.position.set(0, 1.05, 4); c.lookAt(0, .82, 0); skinVista = { r, e, c, g: null, on: false, t: 0 }; }
  const v = skinVista; if (v.g) v.e.remove(v.g); v.g = armarPersonaje(skinDe(skinVer)); v.e.add(v.g);
  if (!v.on) { v.on = true; const giro = () => { if (!v.on || $('skinCapa').hidden) { v.on = false; return; } v.t += .016; const u = v.g.userData, s = Math.sin(v.t * 6) * .5;
    v.g.rotation.y = Math.sin(v.t * .6) * 1.1; u.piernas[0].rotation.x = s; u.piernas[1].rotation.x = -s; u.brazos[0].rotation.x = -s * .9; u.brazos[1].rotation.x = s * .9; if (u.capa) u.capa.rotation.x = -.35 + Math.sin(v.t * 12) * .05;
    v.r.render(v.e, v.c); requestAnimationFrame(giro); }; giro(); }
}
