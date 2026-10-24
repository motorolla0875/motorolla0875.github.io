'use strict';
// ═════════ PERSONAJE DEL JUGADOR: 3 para elegir, brazo en primera persona y cámara desde atrás o de frente ═════════

Object.assign(TX.es, { personaje: 'Personaje', pj0: 'Explorador', pj1: 'Constructor', pj2: 'Aventurera', vistaT: 'Cambiar vista', vista0: 'PRIMERA PERSONA', vista1: 'VISTA DE ATRÁS', vista2: 'VISTA DE FRENTE' });
Object.assign(TX.en, { personaje: 'Character', pj0: 'Explorer', pj1: 'Builder', pj2: 'Adventurer', vistaT: 'Change view', vista0: 'FIRST PERSON', vista1: 'BACK VIEW', vista2: 'FRONT VIEW' });
Object.assign(TX.pt, { personaje: 'Personagem', pj0: 'Explorador', pj1: 'Construtor', pj2: 'Aventureira', vistaT: 'Mudar visão', vista0: 'PRIMEIRA PESSOA', vista1: 'VISÃO DE TRÁS', vista2: 'VISÃO DE FRENTE' });

const PJS = [
  { piel: '#f2c9a0', pelo: '#5a3418', remera: '#ff8a2e', pantalon: '#3a5ad8', mochila: '#2fb65a', flequillo: 1 },
  { piel: '#c98a5a', pelo: '#2a1a10', remera: '#ffffff', pantalon: '#2a6fe0', zapatos: '#5a3418', casco: '#ffd23a', overol: 1, mejillas: 1 },
  { piel: '#ffd9b8', pelo: '#e05a2a', remera: '#2fb65a', pantalon: '#7e2fbe', bufanda: '#ffe14a', cola: 1, mejillas: 1, flequillo: 1 },
];
const leerLS = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : +v; } catch (e) { return d; } };
const guardarLS = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
let pjSel = Math.min(2, Math.max(0, leerLS('voxPersonaje', 0))), modoCam = Math.min(2, Math.max(0, leerLS('voxVista', 0)));
const colM = c => matA(parseInt(c.slice(1), 16));

// ───── armar el personaje (con partes que se mueven) ─────
function armarPersonaje(P) {
  const g = new THREE.Group(), piel = colM(P.piel), pelo = colM(P.pelo), rem = colM(P.remera), pan = colM(P.pantalon), zap = colM(P.zapatos || '#3a2a20'), boca = colM('#a04848');
  const parte = (x, y, z) => { const q = new THREE.Group(); q.position.set(x, y, z); g.add(q); return q; };
  const piernas = [-1, 1].map(s => { const q = parte(s * .12, .44, 0); caja(q, .2, .38, .22, 0, -.19, 0, pan); caja(q, .22, .1, .28, 0, -.39, .03, zap); return q; });
  caja(g, .5, .46, .3, 0, .67, 0, rem);
  if (P.overol) { caja(g, .34, .28, .02, 0, .64, .16, pan); for (const s of [-1, 1]) caja(g, .06, .2, .02, s * .14, .82, .16, pan); }
  if (P.mochila) { caja(g, .4, .42, .16, 0, .7, -.23, colM(P.mochila)); caja(g, .3, .12, .06, 0, .62, -.32, colM('#5a3418')); }
  if (P.bufanda) caja(g, .54, .1, .34, 0, .9, 0, colM(P.bufanda));
  const brazos = [-1, 1].map(s => { const q = parte(s * .34, .88, 0); caja(q, .16, .4, .18, 0, -.2, 0, rem); caja(q, .14, .1, .16, 0, -.44, 0, piel); return q; });
  const cab = parte(0, .9, 0), Y = -.9;
  caja(cab, .62, .58, .56, 0, 1.2 + Y, 0, piel); ojos(cab, .14, 1.22 + Y, .285, 1);
  caja(cab, .16, .04, .02, 0, 1.05 + Y, .285, boca); for (const s of [-1, 1]) caja(cab, .04, .04, .02, s * .09, 1.07 + Y, .285, boca);
  if (P.mejillas) for (const s of [-1, 1]) caja(cab, .08, .05, .02, s * .21, 1.08 + Y, .283, colM('#ff9a9a'));
  // pelo: arriba, atrás y costados (tapa toda la nuca)
  caja(cab, .66, .16, .6, 0, 1.53 + Y, 0, pelo); caja(cab, .66, .5, .08, 0, 1.3 + Y, -.3, pelo); for (const s of [-1, 1]) caja(cab, .06, .32, .56, s * .32, 1.36 + Y, -.02, pelo);
  if (P.flequillo) caja(cab, .5, .1, .06, -.05, 1.45 + Y, .28, pelo);
  if (P.cola) { caja(cab, .24, .24, .16, 0, 1.4 + Y, -.4, pelo); caja(cab, .2, .44, .16, 0, 1.12 + Y, -.44, pelo); caja(cab, .26, .07, .18, 0, 1.36 + Y, -.4, colM('#ffe14a')); }
  if (P.casco) { caja(cab, .7, .2, .64, 0, 1.58 + Y, 0, colM(P.casco)); caja(cab, .74, .05, .3, 0, 1.49 + Y, .2, colM(P.casco)); caja(cab, .12, .08, .66, 0, 1.7 + Y, 0, colM('#f5b82a')); }
  g.userData = { piernas, brazos, cab, fase: 0, item: null, itemId: -1 };
  return g;
}

let jugador = null;
function rearmarJugador() { if (jugador) escena.remove(jugador); jugador = armarPersonaje(PJS[pjSel]); jugador.visible = false; escena.add(jugador); manoId = -9; }
rearmarJugador();

// lo que el personaje tiene en la mano (visto desde afuera)
function itemEnMano(id) {
  const u = jugador.userData, br = u.brazos[0]; if (u.item) { br.remove(u.item); u.item = null; } u.itemId = id; if (!id) return;
  const d = DEF[id]; let m;
  if (d && (!d.forma || d.icono) && !d.planta && id !== B.ESCALERA && id !== B.PUERTA) m = new THREE.Mesh(geoBloque(d, .26), new THREE.MeshLambertMaterial({ map: atlasTex, vertexColors: true, alphaTest: .5 }));
  else { const tile = d ? d.tiles[2] : ITEM[id].tile, c = document.createElement('canvas'); c.width = c.height = 16; c.getContext('2d').drawImage(atlas, (tile % 8) * 16, Math.floor(tile / 8) * 16, 16, 16, 0, 0, 16, 16);
    const tx = new THREE.CanvasTexture(c); tx.magFilter = tx.minFilter = THREE.NearestFilter; tx.generateMipmaps = false; m = new THREE.Mesh(new THREE.PlaneGeometry(.4, .4), new THREE.MeshLambertMaterial({ map: tx, alphaTest: .5, side: THREE.DoubleSide })); m.rotation.y = Math.PI / 2; }
  m.position.set(0, -.5, .14); br.add(m); u.item = m;
}

// ───── brazo en primera persona (con el color del personaje) ─────
const armarMano0 = armarMano;
armarMano = function (id) {
  armarMano0(id);
  if (!id && manoG.children.length) { const v = manoG.children.pop(); v.geometry.dispose(); v.material.dispose(); }
  const P = PJS[pjSel], mat = c => new THREE.MeshBasicMaterial({ color: c, map: ruidoTex, depthTest: false, depthWrite: false, transparent: true });
  const gm = new THREE.BoxGeometry(.15, .15, .42), gh = new THREE.BoxGeometry(.14, .14, .12); gm.translate(0, 0, .1); gh.translate(0, 0, -.16);
  for (const [ge, c] of [[gm, P.remera], [gh, P.piel]]) { const m = new THREE.Mesh(ge, mat(c)); if (id) { m.position.set(.5, -.34, -.46); m.rotation.set(.4, -.1, 0); } else { m.position.set(.38, -.33, -.46); m.rotation.set(.35, -.15, 0); } m.renderOrder = 998; manoG.add(m); }
};
const colorBrazo = () => { const k = Math.max(.3, U.uDia.value); manoG.traverse(o => { if (o.material && o.material !== matManoBloque && o.material.userData.base == null) o.material.userData.base = o.material.color.getHex(); if (o.material && o.material.userData.base != null) o.material.color.setHex(o.material.userData.base).multiplyScalar(k); }); };

// ───── botón de vista y elección de personaje ─────
{ const d = document.createElement('div'); d.className = 'bChico'; d.id = 'bVista'; d.dataset.it = 'vistaT';
  d.innerHTML = pix(['..XXXX..', '..XXXX..', '..XXXX..', '...XX...', '.XXXXXX.', 'X.XXXX.X', '..X..X..', '..X..X..'], '#fff');
  $('botonesArriba').insertBefore(d, $('bPausa'));
  d.onclick = () => { modoCam = (modoCam + 1) % 3; guardarLS('voxVista', modoCam); aviso(TR('vista' + modoCam), 900); }; }
{ const f = document.createElement('div'); f.className = 'ajFila'; f.innerHTML = '<span data-i="personaje"></span><div class="ajOpc" id="ajPj"><div data-p="0" data-i="pj0"></div><div data-p="1" data-i="pj1"></div><div data-p="2" data-i="pj2"></div></div>';
  $('ajustes').insertBefore(f, $('bAjListo'));
  const pintar = () => { for (const x of $('ajPj').children) x.classList.toggle('on', +x.dataset.p === pjSel); }; pintar();
  $('ajPj').addEventListener('click', e => { const x = e.target.closest('[data-p]'); if (!x) return; pjSel = +x.dataset.p; guardarLS('voxPersonaje', pjSel); rearmarJugador(); pintar(); }); }
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
  // cámara detrás o delante (sin meterse dentro de los bloques)
  const ojo = new THREE.Vector3(J.x, J.y + OJOS, J.z), cp = Math.cos(J.pitch), f = new THREE.Vector3(-Math.sin(J.yaw) * cp, Math.sin(J.pitch), -Math.cos(J.yaw) * cp);
  const lado = modoCam === 1 ? -1 : 1; let t = .3;
  for (; t < 4; t += .1) { const p = ojo.clone().addScaledVector(f, lado * t); if (solidoCam(p.x, p.y, p.z)) { t -= .3; break; } }
  t = Math.max(.6, t);
  cam.position.copy(ojo).addScaledVector(f, lado * t);
  if (modoCam === 2) { cam.rotation.y = J.yaw + Math.PI; cam.rotation.x = -J.pitch; }
}
window.__pj = { armarPersonaje, PJS, modo: v => { if (v != null) modoCam = v; return modoCam; }, sel: v => { if (v != null) { pjSel = v; rearmarJugador(); } return pjSel; }, jugador: () => jugador };
