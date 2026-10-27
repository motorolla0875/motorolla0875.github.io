'use strict';
// ═════════ SUPERVIVENCIA: tamaño del mundo, aldeanos, armadura, arco, pesca, cultivos, pociones y encantamientos ═════════

Object.assign(TX.es, {
  tamMundo: 'Tamaño', tamN: 'Normal', tamG: 'Grande', tamE: 'Enorme',
  of0: 'Granjero', of1: 'Herrera', of2: 'Mago', of3: 'Cazadora', aldeano: 'Aldeano', cambiar: 'Cambiar', tratoAyuda: 'Toca "Cambiar" para hacer el trato. El oro se consigue minando o vendiendo.', tratoHecho: '¡TRATO HECHO!', faltaPara: 'TE FALTA PARA ESE TRATO',
  sinFlechas: 'NO TIENES FLECHAS<small>se fabrican con palo y adoquín</small>', apuntaAgua: 'APUNTA AL AGUA PARA PESCAR', pica: '¡PICA!<small>toca rápido</small>', pescaste: 'PESCASTE: {n}', seEscapo: 'SE ESCAPÓ…',
  encantarAyuda: 'MESA DE ENCANTAR<small>tócala con un pico o espada de cristal y 3 cristales</small>', encantado: '¡ENCANTADO!<small>{n}</small>', faltanCristales: 'NECESITAS 3 CRISTALES',
  armPuesta: 'TE PUSISTE: {n}', armadura: 'Armadura', quitarArm: 'Quitar', sinArm: 'No tienes armadura puesta', bebiste: 'TOMASTE: {n}', plantaZ: 'PLANTA EN TIERRA O PASTO',
});
Object.assign(TX.en, {
  tamMundo: 'Size', tamN: 'Normal', tamG: 'Large', tamE: 'Huge',
  of0: 'Farmer', of1: 'Smith', of2: 'Wizard', of3: 'Hunter', aldeano: 'Villager', cambiar: 'Trade', tratoAyuda: 'Tap "Trade" to make the deal. You get gold by mining or selling.', tratoHecho: 'DEAL DONE!', faltaPara: "YOU DON'T HAVE ENOUGH FOR THAT",
  sinFlechas: 'NO ARROWS<small>craft them with a stick and cobblestone</small>', apuntaAgua: 'AIM AT THE WATER TO FISH', pica: 'A BITE!<small>tap quickly</small>', pescaste: 'YOU CAUGHT: {n}', seEscapo: 'IT GOT AWAY…',
  encantarAyuda: 'ENCHANTING TABLE<small>tap it with a crystal pickaxe or sword and 3 crystals</small>', encantado: 'ENCHANTED!<small>{n}</small>', faltanCristales: 'YOU NEED 3 CRYSTALS',
  armPuesta: 'YOU PUT ON: {n}', armadura: 'Armor', quitarArm: 'Take off', sinArm: "You aren't wearing armor", bebiste: 'YOU DRANK: {n}', plantaZ: 'PLANT IT ON DIRT OR GRASS',
});
Object.assign(TX.pt, {
  tamMundo: 'Tamanho', tamN: 'Normal', tamG: 'Grande', tamE: 'Enorme',
  of0: 'Fazendeiro', of1: 'Ferreira', of2: 'Mago', of3: 'Caçadora', aldeano: 'Aldeão', cambiar: 'Trocar', tratoAyuda: 'Toque em "Trocar" para fazer a troca. O ouro vem da mineração ou de vendas.', tratoHecho: 'TROCA FEITA!', faltaPara: 'FALTA ALGO PARA ESSA TROCA',
  sinFlechas: 'SEM FLECHAS<small>feitas com graveto e pedregulho</small>', apuntaAgua: 'MIRE NA ÁGUA PARA PESCAR', pica: 'MORDEU!<small>toque rápido</small>', pescaste: 'VOCÊ PESCOU: {n}', seEscapo: 'ESCAPOU…',
  encantarAyuda: 'MESA DE ENCANTAMENTO<small>toque com uma picareta ou espada de cristal e 3 cristais</small>', encantado: 'ENCANTADO!<small>{n}</small>', faltanCristales: 'PRECISA DE 3 CRISTAIS',
  armPuesta: 'VOCÊ VESTIU: {n}', armadura: 'Armadura', quitarArm: 'Tirar', sinArm: 'Você não está de armadura', bebiste: 'VOCÊ BEBEU: {n}', plantaZ: 'PLANTE NA TERRA OU GRAMA',
});
const N_EN = { 'Hojas de selva': 'Jungle leaves', 'Hojas de pino': 'Pine leaves', 'Enredadera': 'Vines', 'Hielo': 'Ice', 'Nenúfar': 'Lily pad', 'Arbusto seco': 'Dead bush', 'Fardo de heno': 'Hay bale', 'Piedra del abismo': 'Abyss stone', 'Magma': 'Magma', 'Portal al Abismo': 'Abyss portal', 'Cristal del abismo': 'Abyss crystal', 'Mesa de encantar': 'Enchanting table', 'Zanahoria': 'Carrot', 'Papa': 'Potato', 'Papa asada': 'Baked potato',
  'Gorro de tela': 'Cloth cap', 'Saco de tela': 'Cloth tunic', 'Pantalón de tela': 'Cloth pants', 'Botas de tela': 'Cloth boots', 'Casco de hierro': 'Iron helmet', 'Pechera de hierro': 'Iron chestplate', 'Grebas de hierro': 'Iron leggings', 'Botas de hierro': 'Iron boots', 'Casco de oro': 'Gold helmet', 'Pechera de oro': 'Gold chestplate', 'Grebas de oro': 'Gold leggings', 'Botas de oro': 'Gold boots', 'Casco de cristal': 'Crystal helmet', 'Pechera de cristal': 'Crystal chestplate', 'Grebas de cristal': 'Crystal leggings', 'Botas de cristal': 'Crystal boots',
  'Arco': 'Bow', 'Flecha': 'Arrow', 'Pico encantado': 'Enchanted pickaxe', 'Espada encantada': 'Enchanted sword', 'Caña de pescar': 'Fishing rod', 'Corona del Ojón Rey': 'Big Eye King crown', 'Poción de velocidad': 'Speed potion', 'Poción de salto': 'Jump potion', 'Poción de curación': 'Healing potion', 'Poción de fuerza': 'Strength potion' };
const N_PT = { 'Hojas de selva': 'Folhas da selva', 'Hojas de pino': 'Folhas de pinheiro', 'Enredadera': 'Trepadeira', 'Hielo': 'Gelo', 'Nenúfar': 'Vitória-régia', 'Arbusto seco': 'Arbusto seco', 'Fardo de heno': 'Fardo de feno', 'Piedra del abismo': 'Pedra do abismo', 'Magma': 'Magma', 'Portal al Abismo': 'Portal do Abismo', 'Cristal del abismo': 'Cristal do abismo', 'Mesa de encantar': 'Mesa de encantamento', 'Zanahoria': 'Cenoura', 'Papa': 'Batata', 'Papa asada': 'Batata assada',
  'Gorro de tela': 'Gorro de tecido', 'Saco de tela': 'Casaco de tecido', 'Pantalón de tela': 'Calça de tecido', 'Botas de tela': 'Botas de tecido', 'Casco de hierro': 'Capacete de ferro', 'Pechera de hierro': 'Peitoral de ferro', 'Grebas de hierro': 'Perneiras de ferro', 'Botas de hierro': 'Botas de ferro', 'Casco de oro': 'Capacete de ouro', 'Pechera de oro': 'Peitoral de ouro', 'Grebas de oro': 'Perneiras de ouro', 'Botas de oro': 'Botas de ouro', 'Casco de cristal': 'Capacete de cristal', 'Pechera de cristal': 'Peitoral de cristal', 'Grebas de cristal': 'Perneiras de cristal', 'Botas de cristal': 'Botas de cristal',
  'Arco': 'Arco', 'Flecha': 'Flecha', 'Pico encantado': 'Picareta encantada', 'Espada encantada': 'Espada encantada', 'Caña de pescar': 'Vara de pescar', 'Corona del Ojón Rey': 'Coroa do Rei Olhão', 'Poción de velocidad': 'Poção de velocidade', 'Poción de salto': 'Poção de pulo', 'Poción de curación': 'Poção de cura', 'Poción de fuerza': 'Poção de força' };
Object.assign(NOMBRES.en, N_EN); Object.assign(NOMBRES.pt, N_PT);

{ const st = document.createElement('style'); st.textContent = `
  #efectosHud { position: fixed; top: 86px; left: max(8px, env(safe-area-inset-left)); z-index: 3; display: flex; gap: 4px; pointer-events: none; }
  #efectosHud div { background: rgba(13,21,61,.6); border-radius: 8px; padding: 2px 6px 2px 2px; display: flex; align-items: center; gap: 2px; font-size: 12px; }
  #efectosHud img { width: 20px; height: 20px; image-rendering: pixelated; }
  #armHud { pointer-events: auto; cursor: pointer; }
  .trato { display: flex; align-items: center; gap: 6px; padding: 5px 0; border-bottom: 2px solid #d5dbf3; } .trato .flecha { font-size: 20px; color: #5a6aa8; } .trato .mb { margin-left: auto; } .trato.no .mb { background: #9aa3c4; }
`; document.head.appendChild(st); }
{ const d = document.createElement('div'); d.id = 'efectosHud'; $('hud').appendChild(d);
  const a = document.createElement('div'); a.id = 'armHud'; a.hidden = true; $('arriba').insertBefore(a, $('dia')); }
cap('tratoCapa', '<div class="mVentana" style="width:min(560px,94vw)"><div class="vCab"><div class="vTit" id="tratoTit"></div><div class="cerrar" id="tratoCerrar">X</div></div><div class="vCuerpo"><div style="font-size:12px;margin-bottom:4px" data-i="tratoAyuda"></div><div id="tratoLista"></div></div></div>');
cap('armCapa', '<div class="mVentana" style="width:min(460px,94vw)"><div class="vCab"><div class="vTit" data-i="armadura"></div><div class="cerrar" id="armCerrar">X</div></div><div class="vCuerpo" id="armLista"></div></div>');
aplicarIdioma();
const sinG = fn => { const g = grupo; grupo = null; try { fn(); } finally { grupo = g; } };
const darOponer = (id, n = 1) => { if (creativo()) return; darItem(id, n); };

// ═════════ TAMAÑO DEL MUNDO NUEVO ═════════
window.tamNuevo = +(() => { try { return localStorage.getItem('voxTam'); } catch (e) { return 0; } })() || 256;
{ const f = document.createElement('div'); f.className = 'ajFila'; f.style.margin = '4px 0'; f.innerHTML = '<span data-i="tamMundo"></span><div class="ajOpc" id="tamOpc"><div data-t="160" data-i="tamN"></div><div data-t="256" data-i="tamG"></div><div data-t="352" data-i="tamE"></div></div>';
  $('nuevo').insertBefore(f, $('bCreativo')); aplicarIdioma();
  const pintar = () => { for (const x of $('tamOpc').children) x.classList.toggle('on', +x.dataset.t === window.tamNuevo); }; pintar();
  $('tamOpc').addEventListener('click', e => { const d = e.target.closest('[data-t]'); if (!d) return; window.tamNuevo = +d.dataset.t; try { localStorage.setItem('voxTam', d.dataset.t); } catch (er) {} pintar(); }); }

// ═════════ ALDEANOS ═════════
const OFICIO = [
  { piel: '#e0ac80', pelo: '#8a5232', remera: '#6cbb40', pantalon: '#6b4a26', zapatos: '#3a2a20', peinado: 'corto', sombrero: 'gorra', sombreroC: '#e8c850', mejillas: 1 },
  { piel: '#c98a5a', pelo: '#1d1d21', remera: '#5a3418', pantalon: '#3f3f3f', zapatos: '#1d1d21', peinado: 'cola', overol: 1, mejillas: 1 },
  { piel: '#f2c9a0', pelo: '#f2f2f2', remera: '#7e2fbe', pantalon: '#35399d', zapatos: '#1d1d21', peinado: 'largo', sombrero: 'mago', sombreroC: '#35399d' },
  { piel: '#ffd9b8', pelo: '#e05a2a', remera: '#2f6f22', pantalon: '#6b4a26', zapatos: '#3a2a20', peinado: 'cola', capa: '#2f6f22', mejillas: 1 },
];
const TRATOS = [
  [[[[I.TRIGO_I, 12]], [I.ORO, 1]], [[[I.ZANAHORIA_I, 10]], [I.ORO, 1]], [[[I.ORO, 1]], [I.PAN, 6]], [[[I.ORO, 1]], [I.ZANAHORIA_I, 6]], [[[I.ORO, 1]], [I.PAPA_I, 6]], [[[I.ORO, 2]], [I.MANZANA, 6]]],
  [[[[I.CARBON, 8]], [I.ORO, 1]], [[[I.HIERRO, 4]], [I.ORO, 1]], [[[I.ORO, 2]], [I.ARM + 4, 1]], [[[I.ORO, 3]], [I.ARM + 5, 1]], [[[I.ORO, 4]], [I.PICO3, 1]], [[[I.ORO, 6]], [I.ARMADURA_D, 1]]],
  [[[[I.ORO, 2]], [I.POCION + 2, 1]], [[[I.ORO, 2]], [I.POCION, 1]], [[[I.ORO, 2]], [I.POCION + 1, 1]], [[[I.ORO, 3]], [I.POCION + 3, 1]], [[[I.ORO, 5]], [B.HUEVO, 1]], [[[I.ORO, 6]], [B.MESA_ENC, 1]]],
  [[[[I.CARNE, 6]], [I.ORO, 1]], [[[I.HUESO, 6]], [I.ORO, 1]], [[[I.ORO, 2]], [I.ARCO, 1]], [[[I.ORO, 1]], [I.FLECHA, 10]], [[[I.ORO, 3]], [I.MONTURA, 1]], [[[I.ORO, 1]], [I.CANA, 1]]],
];
TIPOS.aldeano = { vida: 20, an: .3, al: 1.7, vel: .9, peso: .3, color: '#e0ac80', voz: 'aldeano', aldeano: true,
  armar(g) { const p = armarPersonaje(OFICIO[0]); g.add(p); g.cuerpo = p; return p.userData.piernas; }, suelta: () => [],
  cargar: a => vestirAldeano(a),
  guiar: (a, dt) => { const e = a.userData.extra || {}, p = a.position; if (e.cx == null) return null; const d = Math.hypot(e.cx - p.x, e.cz - p.z); if (d > 12) return { dir: Math.atan2(e.cx - p.x, e.cz - p.z), vel: a.userData.vel }; return null; } };
function vestirAldeano(a) { const of = (a.userData.extra || {}).of || 0; if (a.cuerpo) a.remove(a.cuerpo); const p = armarPersonaje(OFICIO[of]); a.add(p); a.cuerpo = p; a.userData.patas = p.userData.piernas; a.userData.mats = []; p.traverse(o => { if (o.material && !a.userData.mats.includes(o.material)) a.userData.mats.push(o.material); }); }
{ const tc0 = terminarCarga; terminarCarga = function (guardados) { tc0(guardados); cultivos2Cargar();
    if (!guardados && aldeas && window.mundoTipo !== 'abismo') aldeas.forEach((al, k) => { for (let of = 0; of < 4; of++) { const a = crearAnimal('aldeano', al.x + (of % 2 ? 3 : -3), al.y + .2, al.z + (of < 2 ? 3 : -3)); a.userData.extra = { of, cx: al.x, cz: al.z }; vestirAldeano(a); } }); }; }
let tratoCon = null;
function abrirTrato(a) { tratoCon = a; pausado = true; soltarTodo(); pintarTrato(); abrir('tratoCapa'); voz('aldeano', 0); }
const tiene = (id, n) => creativo() || (inv[id] || 0) >= n;
function pintarTrato() { const of = (tratoCon.userData.extra || {}).of || 0; $('tratoTit').textContent = TR('aldeano') + ' · ' + TR('of' + of);
  $('tratoLista').innerHTML = TRATOS[of].map(([dar, [rid, rn]], k) => { const ok = dar.every(([id, n]) => tiene(id, n)); return `<div class="trato${ok ? '' : ' no'}">${dar.map(([id, n]) => slotHTML(id, n)).join('')}<span class="flecha">&#10140;</span>${slotHTML(rid, rn)}<div style="font-size:12px;flex:1">${esc(nom(rid))}</div><div class="mb verde" data-trato="${k}">${TR('cambiar')}</div></div>`; }).join(''); }
$('tratoLista').addEventListener('click', e => { const d = e.target.closest('[data-trato]'); if (!d) return; const of = (tratoCon.userData.extra || {}).of || 0, [dar, [rid, rn]] = TRATOS[of][+d.dataset.trato];
  if (!dar.every(([id, n]) => tiene(id, n))) return aviso(TR('faltaPara'), 1000);
  if (!creativo()) { for (const [id, n] of dar) quitarItem(id, n); darItem(rid, rn); } else if (!barra.includes(rid)) { const k = barra.indexOf(0); if (k >= 0) barra[k] = rid; pintarBarra(); }
  aviso(TR('tratoHecho'), 900); sonar('agarrar', .5) || son(880, .1, 'triangle', .1); pintarTrato(); });
$('tratoCerrar').onclick = () => { cerrar('tratoCapa'); pausado = false; tratoCon = null; };

// ═════════ ARMADURA ═════════
const PUNTOS = [[1, 2, 2, 1], [2, 6, 5, 2], [2, 5, 3, 1], [3, 8, 6, 3]], MAT = ['tela', 'plata', 'oro', 'cristal'];
const armaduraDe = () => (stats.armadura = stats.armadura || [0, 0, 0, 0]);
const puntosArm = () => armaduraDe().reduce((s, id) => s + (id ? PUNTOS[ITEM[id].material][ITEM[id].armadura] : 0), 0);
{ const l0 = lastimar; lastimar = function (n, ...r) { if (n > 0) n = Math.max(1, Math.round(n * (1 - Math.min(.8, puntosArm() * .04)))); return l0(n, ...r); }; }
const SVG_ESCUDO = '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" fill="#9aa8e0" stroke="#0d153d" stroke-width="2"/></svg>';
function pintarArm() { const p = puntosArm(); $('armHud').hidden = creativo() || !p; if (p && typeof barraHud === 'function') $('armHud').innerHTML = barraHud(SVG_ESCUDO, p, '#9aa8e0'); }
function vestir(id) { const it = ITEM[id], a = armaduraDe(), viejo = a[it.armadura]; a[it.armadura] = id; if (!creativo()) { quitarItem(id, 1); if (viejo) darItem(viejo, 1); } aviso(TR('armPuesta', { n: nom(id) }), 1200); sonar('agarrar', .6) || son(300, .15, 'square', .1); pintarArm(); rearmarJugador(); sucio = true; }
$('armHud').addEventListener('pointerdown', e => { e.stopPropagation(); pausado = true; soltarTodo(); pintarListaArm(); abrir('armCapa'); });
function pintarListaArm() { const a = armaduraDe(); $('armLista').innerHTML = a.some(x => x) ? a.map((id, k) => id ? `<div class="trato">${slotHTML(id, 1)}<div style="flex:1;font-size:13px">${esc(nom(id))}</div><div class="mb rojo" data-quitar="${k}">${TR('quitarArm')}</div></div>` : '').join('') : `<div style="font-size:13px">${TR('sinArm')}</div>`; }
$('armLista').addEventListener('click', e => { const d = e.target.closest('[data-quitar]'); if (!d) return; const a = armaduraDe(), id = a[+d.dataset.quitar]; a[+d.dataset.quitar] = 0; if (!creativo()) darItem(id, 1); pintarListaArm(); pintarArm(); rearmarJugador(); sucio = true; });
$('armCerrar').onclick = () => { cerrar('armCapa'); pausado = false; };
// el personaje muestra la armadura puesta
rearmarJugador = function () { if (jugador) escena.remove(jugador); const a = jugando && typeof stats !== 'undefined' ? armaduraDe() : [0, 0, 0, 0], P = Object.assign({}, skinActual());
  if (a[1] || a[2]) P.armadura = MAT[ITEM[a[1] || a[2]].material]; if (a[0]) P.cascoArm = MAT[ITEM[a[0]].material];
  jugador = armarPersonaje(P); jugador.visible = false; escena.add(jugador); manoId = -9; };

// ═════════ ARCO Y FLECHAS ═════════
const flechas = [];
function dispararFlecha(dir) {
  if (!creativo()) { if (!(inv[I.FLECHA] > 0)) return aviso(TR('sinFlechas'), 1400); quitarItem(I.FLECHA, 1); }
  const g = new THREE.Group(); cajaC(g, .05, .05, .6, 0, 0, 0, '#8a5a2a'); cajaC(g, .1, .1, .1, 0, 0, -.32, '#c8c8c8'); cajaC(g, .12, .02, .12, 0, 0, .28, '#f4f4f4');
  g.position.set(J.x + dir.x * .6, J.y + OJOS - .1 + dir.y * .6, J.z + dir.z * .6); escena.add(g);
  flechas.push({ g, v: dir.clone().multiplyScalar(30), t: 0, quieta: false }); swing = 1; son(700, .12, 'triangle', .1); ruido(.1, .06, 2500);
}
function moverFlechas(dt) {
  for (const f of flechas.slice()) { f.t += dt; if (f.t > (f.quieta ? 6 : 4)) { escena.remove(f.g); flechas.splice(flechas.indexOf(f), 1); continue; } if (f.quieta) continue;
    f.v.y -= 11 * dt; const p = f.g.position, pasos = Math.max(1, Math.ceil(f.v.length() * dt / .2)), h = dt / pasos; let fin = false;
    for (let k = 0; k < pasos && !fin; k++) { p.addScaledVector(f.v, h);
      for (const m of monstruos.concat(animales)) { const u = m.userData; if (u.extra && u.extra.d) continue; if (u.animal && TIPOS[u.animal].aldeano) continue; const q = m.position, an = (u.an || .5) + .15, al = u.al || 1.4;
        if (Math.abs(p.x - q.x) < an && Math.abs(p.z - q.z) < an && p.y > q.y && p.y < q.y + al) { herir(m, 7 * (J.fuerza || 1)); u.kx = f.v.x * .25; u.kz = f.v.z * .25; escena.remove(f.g); flechas.splice(flechas.indexOf(f), 1); son(220, .1, 'sawtooth', .1); fin = true; break; } }
      if (fin) break; const t = get(Math.floor(p.x), Math.floor(p.y), Math.floor(p.z)); if (t && DEF[t] && DEF[t].solido && t !== B.AGUA) { f.quieta = true; f.t = 0; son(400, .05, 'square', .06); fin = true; } }
    f.g.lookAt(p.x - f.v.x, p.y - f.v.y, p.z - f.v.z); }
}

// ═════════ PESCA ═════════
let pesca = null;
const lineaMat = new THREE.LineBasicMaterial({ color: 0xeeeeee });
function tirarCana(dir) {
  if (pesca) { if (pesca.pica > 0) sacarPez(); else { aviso(TR('seEscapo'), 700); } quitarPesca(); return; }
  const o = new THREE.Vector3(J.x, J.y + OJOS, J.z); let w = null;
  let tSol = 99; for (let t = 1; t < 16 && t < tSol + 1.2; t += .25) { const p = o.clone().addScaledVector(dir, t), x = Math.floor(p.x), y = Math.floor(p.y), z = Math.floor(p.z), b = get(x, y, z); const agua = b === B.AGUA ? y : (b && DEF[b].solido && get(x, y + 1, z) === B.AGUA) ? y + 1 : -1; if (agua >= 0) { let yy = agua; while (get(x, yy + 1, z) === B.AGUA) yy++; w = new THREE.Vector3(x + .5, yy + .95, z + .5); break; } if (b && DEF[b].solido && tSol === 99) tSol = t; }
  if (!w) return aviso(TR('apuntaAgua'), 1000);
  const g = new THREE.Group(); cajaC(g, .16, .1, .16, 0, .05, 0, '#ffffff'); cajaC(g, .16, .1, .16, 0, -.05, 0, '#e03a2a'); g.position.copy(w); escena.add(g);
  const ge = new THREE.BufferGeometry().setFromPoints([o, w]), l = new THREE.Line(ge, lineaMat); escena.add(l);
  pesca = { g, l, w, espera: 3 + Math.random() * 6, pica: 0 }; swing = 1; son(500, .1, 'sine', .08); polvo(w.x, w.y, w.z, '#9fe0ff', 5);
}
function quitarPesca() { if (!pesca) return; escena.remove(pesca.g); escena.remove(pesca.l); pesca.l.geometry.dispose(); pesca = null; }
const PECES = [[I.PESCADO, 62], [I.HUESO, 8], [I.ORO, 8], [I.MANZANA, 6], [B.TELA, 5], [I.CRISTAL, 4], [I.MONTURA, 3], [I.POCION + 2, 3], [B.HUEVO + 2, 1]];
function sacarPez() { let r = Math.random() * 100, id = I.PESCADO; for (const [k, p] of PECES) { if (r < p) { id = k; break; } r -= p; }
  darOponer(id, 1); if (creativo() && !barra.includes(id)) { const k = barra.indexOf(0); if (k >= 0) { barra[k] = id; pintarBarra(); } }
  aviso(TR('pescaste', { n: nom(id) }), 1600); polvo(pesca.w.x, pesca.w.y, pesca.w.z, '#9fe0ff', 12); sonar('agarrar', .6); stats.pescados = (stats.pescados || 0) + 1; }
function moverPesca(dt) {
  if (!pesca) return; if (barra[sel] !== I.CANA || Math.hypot(J.x - pesca.w.x, J.z - pesca.w.z) > 20) return quitarPesca();
  const o = new THREE.Vector3(J.x + Math.cos(J.yaw) * .35, J.y + OJOS - .3, J.z - Math.sin(J.yaw) * .35), pos = pesca.l.geometry.attributes.position; pos.setXYZ(0, o.x, o.y, o.z); pos.setXYZ(1, pesca.g.position.x, pesca.g.position.y, pesca.g.position.z); pos.needsUpdate = true;
  if (pesca.pica > 0) { pesca.pica -= dt; pesca.g.position.y = pesca.w.y - .2 + Math.sin(pesca.pica * 30) * .05; if (pesca.pica <= 0) { pesca.espera = 3 + Math.random() * 6; pesca.g.position.y = pesca.w.y; } return; }
  pesca.g.position.y = pesca.w.y + Math.sin(U.uT.value * 3) * .03; pesca.espera -= dt;
  if (pesca.espera <= 0) { pesca.pica = 1.4; aviso(TR('pica'), 1200); vibrar(60); son(900, .08, 'square', .1); polvo(pesca.w.x, pesca.w.y, pesca.w.z, '#ffffff', 8); }
}

// ═════════ CULTIVOS NUEVOS: zanahoria y papa ═════════
let cultivos2 = new Set(), cultivoT = 0;
const esCultivo2 = t => t >= B.ZANAHORIA && t <= B.PAPA + 3;
function cultivos2Cargar() { cultivos2 = new Set(); for (let i = 0; i < N; i++) { const t = mundo[i]; if (t >= B.ZANAHORIA && t <= B.PAPA + 2 && DEF[t].cultivo < 3) cultivos2.add(i); } }
function crecerCultivos2(dt) { cultivoT += dt; if (cultivoT < 1) return; cultivoT = 0;
  for (const i of cultivos2) { const t = mundo[i]; if (!esCultivo2(t) || DEF[t].cultivo >= 3) { cultivos2.delete(i); continue; } if (Math.random() < 1 / 35) { const [x, y, z] = xyz(i); const s0 = sucio; rearmeLento = true; try { sinG(() => ponerBloque(x, y, z, t + 1)); } finally { rearmeLento = false; sucio = s0; } if (DEF[t + 1].cultivo === 3) cultivos2.delete(i); } } }
function sembrar(h, id) {
  const arriba = get(h.x, h.y + 1, h.z);
  if (![B.PASTO, B.TIERRA, B.ARADA].includes(h.b) || h.cara[1] !== 1 || !reemplazable(arriba) || arriba === B.AGUA) { aviso(TR('plantaZ'), 1000); return true; }
  if (!creativo()) quitarItem(id, 1); ponerBloque(h.x, h.y, h.z, B.ARADA); ponerBloque(h.x, h.y + 1, h.z, ITEM[id].siembra); cultivos2.add(idx(h.x, h.y + 1, h.z)); swing = 1; golpe(B.TIERRA, .6); return true;
}

// ═════════ POCIONES ═════════
const efectos = {};
const EFECTO = [{ n: 'vel', t: 90, on: () => J.velPocion = 1.6, off: () => J.velPocion = 1 }, { n: 'salto', t: 60, on: () => J.saltoPocion = 1.5, off: () => J.saltoPocion = 1 }, { n: 'cura', t: 0, on: () => { vida = Math.min(20, vida + 10); pintarVida(); } }, { n: 'fuerza', t: 90, on: () => J.fuerza = 2, off: () => J.fuerza = 1 }];
function beber(id) { const k = ITEM[id].pocion, E = EFECTO[k]; if (!creativo()) quitarItem(id, 1); E.on(); if (E.t) efectos[k] = E.t; aviso(TR('bebiste', { n: nom(id) }), 1300); for (let i = 0; i < 3; i++) setTimeout(() => son(400 + i * 120, .08, 'sine', .08), i * 120); swing = 1; polvo(J.x, J.y + 1, J.z, ['#e03a3a', '#5aa8ff', '#ffd23a', '#ff4a78'][k], 10); pintarEfectos(); }
let efectosT = 0;
function moverEfectos(dt) { let cambio = false; for (const k in efectos) { efectos[k] -= dt; if (efectos[k] <= 0) { delete efectos[k]; EFECTO[k].off && EFECTO[k].off(); cambio = true; } } efectosT -= dt; if (cambio || efectosT <= 0) { efectosT = 1; pintarEfectos(); } }
function pintarEfectos() { $('efectosHud').innerHTML = Object.keys(efectos).map(k => `<div class="sombra"><img src="${tileURL(TL['pocion' + k])}">${Math.ceil(efectos[k])}</div>`).join(''); }

// ═════════ MESA DE ENCANTAR ═════════
function encantar() {
  const id = barra[sel], nuevo = id === I.PICO4 ? I.PICO_E : id === I.ESP4 ? I.ESP_E : 0;
  if (!nuevo) return aviso(TR('encantarAyuda'), 2200);
  if (!creativo()) { if (!(inv[I.CRISTAL] >= 3)) return aviso(TR('faltanCristales'), 1200); quitarItem(I.CRISTAL, 3); quitarItem(id, 1); darItem(nuevo, 1); }
  barra[sel] = nuevo; pintarBarra(); aviso(TR('encantado', { n: nom(nuevo) }), 1800); for (let i = 0; i < 4; i++) setTimeout(() => son(600 + i * 200, .15, 'triangle', .1), i * 100); polvo(J.x, J.y + 1.2, J.z, '#ff8aff', 20); sucio = true;
}

// ═════════ TOCAR: el objeto que tienes en la mano ═════════
function tocarExtra2(dir) {
  const id = barra[sel] || 0, it = ITEM[id];
  const m = monstruoApuntado(dir), h = apuntar(dir), cerca = m && (!h || m.t < h.t);
  if (cerca && m.m.userData.animal && TIPOS[m.m.userData.animal].aldeano) { abrirTrato(m.m); return true; }
  if (it && it.armadura != null) { vestir(id); return true; }
  if (it && it.pocion != null) { beber(id); return true; }
  if (id === I.ARCO && !cerca) { dispararFlecha(dir); return true; }
  if (id === I.CANA) { tirarCana(dir); return true; }
  if (h && h.b === B.MESA_ENC && !aventura()) { encantar(); return true; }
  if (it && it.siembra && h && [B.PASTO, B.TIERRA, B.ARADA].includes(h.b) && h.cara[1] === 1 && !aventura()) return sembrar(h, id);
  return false;
}

// ═════════ CADA CUADRO ═════════
let armPintT = 0;
function supervivenciaFrame(dt) {
  if (!jugando) return;
  moverFlechas(dt); if (pausado) return;
  moverPesca(dt); crecerCultivos2(dt); moverEfectos(dt);
  armPintT -= dt; if (armPintT <= 0) { armPintT = 1; pintarArm(); }
}
{ const entrar0 = entrarMundo; entrarMundo = function (id) { for (const k in efectos) { EFECTO[k].off && EFECTO[k].off(); delete efectos[k]; } quitarPesca(); for (const f of flechas.splice(0)) escena.remove(f.g); entrar0(id); pintarEfectos(); pintarArm(); rearmarJugador(); }; }
window.__s = { flechas, abrirTrato, vestir, disparar: dispararFlecha, tirarCana, beber, encantar, puntosArm, efectos, pesca: () => pesca, cultivos2: () => cultivos2, TRATOS };
