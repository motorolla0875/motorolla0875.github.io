'use strict';
// ═════════ CREATIVO CON GRAVEDAD REAL ═════════
// Al crear un mundo creativo se elige "Clásico" (los bloques quedan en el aire) o "Gravedad real".
// En gravedad real, si rompes un bloque y una parte de lo construido queda sin ninguna unión con el suelo, esa parte se cae entera.
// El terreno del mundo (montañas, cuevas, islas) no se cae: solo lo que construyó o tocó el jugador.

Object.assign(TX.es, { grTit: 'Creativo', grSub: '¿Cómo quieres construir?', grClasico: 'Clásico', grClasicoD: 'Los bloques quedan donde los pones, aunque estén en el aire.', grReal: 'Gravedad real', grRealD: 'Si le sacas el apoyo a algo, se cae. ¡Rompe la base de una torre y mírala venirse abajo!', grBadge: 'Gravedad' });
Object.assign(TX.en, { grTit: 'Creative', grSub: 'How do you want to build?', grClasico: 'Classic', grClasicoD: 'Blocks stay where you put them, even in mid-air.', grReal: 'Real gravity', grRealD: 'Take away the support and it falls. Break the base of a tower and watch it come down!', grBadge: 'Gravity' });
Object.assign(TX.pt, { grTit: 'Criativo', grSub: 'Como você quer construir?', grClasico: 'Clássico', grClasicoD: 'Os blocos ficam onde você coloca, mesmo no ar.', grReal: 'Gravidade real', grRealD: 'Tire o apoio de algo e ele cai. Quebre a base de uma torre e veja ela desabar!', grBadge: 'Gravidade' });

// ─── la elección al crear el mundo ───
{ const st = document.createElement('style'); st.textContent = `
  #grCapa { position: fixed; inset: 0; z-index: 40; display: flex; align-items: center; justify-content: center; background: rgba(4,10,26,.55); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
  #grCapa[hidden] { display: none; }
  #grCaja { width: min(760px, 92vw); padding: 16px 18px 14px; border-radius: 18px; color: #fff; text-align: center;
    background: linear-gradient(180deg, rgba(14,32,70,.86), rgba(8,20,46,.9)); box-shadow: inset 0 0 0 2px #2f6fd6, 0 0 24px rgba(40,120,255,.25), 0 20px 50px rgba(0,0,0,.5); }
  #grCaja .t { font-weight: 900; font-size: clamp(22px, 4.6vh, 34px); color: #ffd23a; text-shadow: 0 2px 0 #0d153d; }
  #grCaja .s { font-weight: 800; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #9fc4ff; margin: 2px 0 12px; }
  #grOps { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .grOp { border-radius: 14px; border: 3px solid #0d153d; padding: 14px 12px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .grOp.c { background: #3a86e8; } .grOp.r { background: #e8862a; }
  .grOp b { font-size: clamp(16px, 3.2vh, 22px); text-shadow: 0 2px 0 rgba(13,21,61,.55); } .grOp span { font-size: 12px; font-weight: 700; line-height: 1.3; opacity: .95; }
  .grOp svg { width: 64px; height: 64px; } .grOp:active { transform: translateY(2px); }
  #grVolver { margin-top: 10px; display: inline-block; padding: 6px 18px; border-radius: 10px; border: 3px solid #0d153d; background: #7c86ad; font-weight: 900; cursor: pointer; }
  @media (max-height: 500px) { .grOp { padding: 8px; gap: 4px; } .grOp svg { width: 40px; height: 40px; } #grCaja { padding: 10px 12px; } #grCaja .s { margin-bottom: 8px; } }
  #listaMundos .azBadge.grav { background: #e8862a; }
`; document.head.appendChild(st);
  const ic1 = '<svg viewBox="0 0 64 64"><rect x="8" y="44" width="48" height="10" fill="#7a5232" stroke="#0d153d" stroke-width="2"/><rect x="18" y="12" width="12" height="12" fill="#cfe3ff" stroke="#0d153d" stroke-width="2"/><rect x="34" y="20" width="12" height="12" fill="#cfe3ff" stroke="#0d153d" stroke-width="2"/><path d="M24 30v6M40 36v4" stroke="#fff" stroke-width="2" stroke-dasharray="2 3"/></svg>';
  const ic2 = '<svg viewBox="0 0 64 64"><rect x="8" y="50" width="48" height="8" fill="#7a5232" stroke="#0d153d" stroke-width="2"/><rect x="20" y="36" width="12" height="12" fill="#ffe0b0" stroke="#0d153d" stroke-width="2" transform="rotate(-12 26 42)"/><rect x="34" y="18" width="12" height="12" fill="#ffe0b0" stroke="#0d153d" stroke-width="2" transform="rotate(14 40 24)"/><path d="M40 6v8M36 10l4 4 4-4M26 22v8M22 26l4 4 4-4" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>';
  const c = document.createElement('div'); c.id = 'grCapa'; c.hidden = true;
  c.innerHTML = `<div id="grCaja"><div class="t"></div><div class="s"></div><div id="grOps"><div class="grOp c" data-gr="0">${ic1}<b></b><span></span></div><div class="grOp r" data-gr="1">${ic2}<b></b><span></span></div></div><div id="grVolver"></div></div>`;
  document.body.appendChild(c);
  const textos = () => { c.querySelector('.t').textContent = TR('grTit'); c.querySelector('.s').textContent = TR('grSub'); const o = c.querySelectorAll('.grOp');
    o[0].querySelector('b').textContent = TR('grClasico'); o[0].querySelector('span').textContent = TR('grClasicoD'); o[1].querySelector('b').textContent = TR('grReal'); o[1].querySelector('span').textContent = TR('grRealD'); $('grVolver').textContent = TR('volver'); };
  const bc = $('bCreativo');
  if (bc) bc.onclick = () => { textos(); c.hidden = false; };
  c.addEventListener('click', e => { const o = e.target.closest('[data-gr]');
    if (o) { c.hidden = true; window.__gravNuevo = o.dataset.gr === '1'; crearMundo('creativo'); return; }
    if (e.target.closest('#grVolver') || e.target === c) c.hidden = true; });
}
// se guarda en el mundo (meta.grav) y se lee al entrar
{ const c0 = crearMundo; crearMundo = function (modo) {
    const quiere = modo === 'creativo' && !!window.__gravNuevo; window.__gravNuevo = false;
    if (!quiere) return c0.apply(this, arguments);
    const e0 = entrarMundo;
    entrarMundo = function (id) { entrarMundo = e0; try { const l = leerLista(), m = l.find(x => x.id === id); if (m) { m.grav = true; localStorage.setItem('bloquesMundos', JSON.stringify(l)); } } catch (e) {} return e0.apply(this, arguments); };
    try { return c0.apply(this, arguments); } finally { if (entrarMundo !== e0) entrarMundo = e0; } }; }
{ const e0 = entrarMundo; entrarMundo = function (id) { try { const m = leerLista().find(x => x.id === id); window.mundoGrav = !!(m && m.grav); } catch (e) { window.mundoGrav = false; } return e0.apply(this, arguments); }; }
// etiqueta en Mis mundos
{ const p0 = pintarMundos; pintarMundos = function () { const r = p0.apply(this, arguments);
    try { const l = leerLista(); for (const fila of document.querySelectorAll('#listaMundos .mundoFila')) { const b = fila.querySelector('[data-entrar]'); const m = b && l.find(x => x.id === b.dataset.entrar); if (!m || !m.grav || fila.querySelector('.grav')) continue;
      const ref = fila.querySelector('.azBadge') || fila.querySelector('.info small'); if (ref) ref.insertAdjacentHTML(ref.classList.contains('azBadge') ? 'afterend' : 'afterbegin', `<span class="azBadge grav marcaMundo">${TR('grBadge')}</span>`); } } catch (e) {}
    return r; }; }

// ─── la física: qué queda sin apoyo y cómo cae ───
const GR_MAX = 350;              // tope de bloques que pueden caer de una vez (para no trabar el teléfono)
const grSolido = t => t > 0 && t !== B.AGUA && DEF[t] && !DEF[t].planta;
const grConstruido = (x, y, z) => diffs.has(idx(x, y, z));
// recorre lo construido pegado a (x,y,z); si toca terreno natural o el fondo, está apoyado
function grGrupo(x0, y0, z0, visto) {
  const grupo = [], cola = [[x0, y0, z0]]; visto.add(idx(x0, y0, z0));
  while (cola.length) { const [x, y, z] = cola.pop(); grupo.push([x, y, z, get(x, y, z)]);
    if (grupo.length > GR_MAX) return null;
    for (const [dx, dy, dz] of [[0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1], [0, 1, 0]]) { const xx = x + dx, yy = y + dy, zz = z + dz;
      if (yy <= 0) return null; if (!dentro(xx, yy, zz)) continue; const t = get(xx, yy, zz); if (!grSolido(t)) continue;
      if (!grConstruido(xx, yy, zz)) return null;          // tocó el terreno del mundo: apoyado
      const k = idx(xx, yy, zz); if (visto.has(k)) continue; visto.add(k); cola.push([xx, yy, zz]); } }
  return grupo;
}
const grMats = new Map();
function grMat(t) { if (grMats.has(t)) return grMats.get(t); const d = DEF[t], tl = d.tiles || [0, 0, 0];
  const m = n => { const tx = new THREE.TextureLoader().load(tileURL(n)); tx.magFilter = THREE.NearestFilter; tx.minFilter = THREE.NearestFilter; return new THREE.MeshLambertMaterial({ map: tx, transparent: !!d.trans, alphaTest: d.trans ? .5 : 0 }); };
  const top = m(tl[0]), bot = m(tl[1]), side = m(tl[2]); const arr = [side, side, top, bot, side, side]; grMats.set(t, arr); return arr; }
const grGeo = new THREE.BoxGeometry(1, 1, 1);
let grCayendo = 0;
function grCaer(grupo) {
  const en = new Set(grupo.map(([x, y, z]) => idx(x, y, z)));
  // cuánto puede bajar el grupo entero (hasta que algún bloque toque algo)
  let d = 0; const maxD = 60;
  for (; d < maxD; d++) { let choca = false; for (const [x, y, z] of grupo) { const yy = y - d - 1; if (yy <= 0) { choca = true; break; } const t = get(x, yy, z); if (grSolido(t) && !en.has(idx(x, yy, z))) { choca = true; break; } } if (choca) break; }
  if (d <= 0) return;
  // se sacan del mundo y se muestran como piezas que caen
  const g = new THREE.Group(); for (const [x, y, z, t] of grupo) { const me = new THREE.Mesh(grGeo, grMat(t)); me.position.set(x + .5, y + .5, z + .5); g.add(me); }
  escena.add(g); grCayendo++;
  for (const [x, y, z] of grupo) ponerBloque(x, y, z, B.AIRE);
  const t0 = performance.now(), dur = Math.sqrt(2 * d / 30) * 1000, giro = (Math.random() - .5) * .06;
  const paso = () => { const k = Math.min(1, (performance.now() - t0) / dur); g.position.y = -d * k * k; g.rotation.z = giro * k; if (k < 1) { requestAnimationFrame(paso); return; }
    escena.remove(g);
    // donde aterriza: si cayó de muy alto, algunos bloques se rompen
    const rompe = d > 8 ? Math.min(.35, (d - 8) * .03) : 0;
    for (const [x, y, z, t] of grupo) { const yy = y - d; if (rompe && Math.random() < rompe) { polvo(x + .5, yy + .5, z + .5, DEF[t].color || '#888', 4); continue; } if (!grSolido(get(x, yy, z))) ponerBloque(x, yy, z, t); }
    grCayendo--;
    const c = grupo[Math.floor(grupo.length / 2)]; try { golpe(c[3], 2.2); vibrar(30); } catch (e) {}
    for (let i = 0; i < Math.min(6, grupo.length); i++) { const b = grupo[Math.floor(Math.random() * grupo.length)]; polvo(b[0] + .5, b[1] - d + .2, b[2] + .5, '#cbb89a', 5); }
    // lo que quedó debajo también puede haber perdido apoyo
    setTimeout(() => { const b = grupo.find(([x, y, z]) => grSolido(get(x, y - d, z))); if (b) { const g2 = grGrupo(b[0], b[1] - d, b[2], new Set()); if (g2 && g2.length) grCaer(g2); } }, 30); };
  requestAnimationFrame(paso);
}
// después de romper (x,y,z): revisar los vecinos construidos
function grRevisar(x, y, z) {
  if (!window.mundoGrav || !creativo()) return;
  // cada vecino se revisa por separado (un recorrido que encontró apoyo no deja marcas que confundan al siguiente)
  const caidos = new Set();
  for (const [dx, dy, dz] of [[0, 1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1], [0, -1, 0]]) { const xx = x + dx, yy = y + dy, zz = z + dz;
    if (!dentro(xx, yy, zz) || caidos.has(idx(xx, yy, zz))) continue; const t = get(xx, yy, zz); if (!grSolido(t) || !grConstruido(xx, yy, zz)) continue;
    const grupo = grGrupo(xx, yy, zz, new Set()); if (grupo && grupo.length) { for (const [a, b, c] of grupo) caidos.add(idx(a, b, c)); grCaer(grupo); } }
}
{ const r0 = romper; romper = function (h) { const antes = get(h.x, h.y, h.z); const res = r0.apply(this, arguments);
    try { if (window.mundoGrav && antes && get(h.x, h.y, h.z) !== antes) grRevisar(h.x, h.y, h.z); } catch (e) { console.error(e); }
    return res; }; }
// en un mundo con gravedad, un bloque puesto en el aire (sin nada que lo sostenga) también se cae
{ const p0 = ponerBloque; ponerBloque = function (x, y, z, t) { const res = p0.apply(this, arguments);
    if (window.mundoGrav && jugando && creativo() && !grCayendo && grSolido(t) && !window.__grPoniendo) { window.__grPoniendo = true; setTimeout(() => { window.__grPoniendo = false; try { if (grSolido(get(x, y, z))) { const g = grGrupo(x, y, z, new Set()); if (g && g.length) grCaer(g); } } catch (e) {} }, 120); }
    return res; }; }
window.__grav = { grRevisar, grGrupo };
