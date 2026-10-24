'use strict';
// ═════════ CONSTRUCCIONES GUIADAS, HERRAMIENTAS RÁPIDAS Y VIDEO TIMELAPSE ═════════

// ───── poner muchos bloques de una sola vez (rellenar, pegar, preparar terreno) ─────
function ponerMuchos(cambios) {
  const cols = new Set(), xs = []; let luz = false;
  for (const [x, y, z, t] of cambios) {
    if (!dentro(x, y, z)) continue; const i = idx(x, y, z), v = mundo[i]; if (v === t || v === B.ROCA) continue;
    mundo[i] = t; diffs.set(i, t); if (grupo) grupo.push([i, v, t]);
    if (v && DEF[v].luz) { fuentes.delete(i); luz = true; } if (t && DEF[t].luz) { fuentes.add(i); luz = true; }
    cols.add(x + SX * z); xs.push(x, z);
  }
  if (!cols.size) return 0;
  for (const c of cols) altColumna(c % SX, (c / SX) | 0);
  if (luz) { calcLuz(); armarTodo(); }
  else { const ch = new Set(); for (let k = 0; k < xs.length; k += 2) for (const dx of [-5, 0, 5]) for (const dz of [-5, 0, 5]) { const cx = Math.floor((xs[k] + dx) / CH), cz = Math.floor((xs[k + 1] + dz) / CH); if (cx >= 0 && cz >= 0 && cx < NCX && cz < NCZ) ch.add(cx + NCX * cz); }
    for (const c of ch) armarPedazo(c % NCX, (c / NCX) | 0); }
  sucio = true; return cols.size;
}
const xyz = i => [i % SX, (i / (SX * SZ)) | 0, ((i / SX) | 0) % SZ];

// ───── deshacer y registro de lo construido ─────
let deshacer = [], registro = [];
function alTerminarAccion(g) {
  if (creativo()) { deshacer.push(g); if (deshacer.length > 60) deshacer.shift(); }
  for (const c of g) registro.push(c); if (registro.length > 6000) registro.splice(0, registro.length - 6000);
  planoRevisar(); pintarHerr();
}
function hacerDeshacer() {
  const g = deshacer.pop(); if (!g) return aviso(TR('nadaDeshacer'), 900);
  const lista = []; for (let k = g.length - 1; k >= 0; k--) { const [i, viejo, nuevo] = g[k]; const [x, y, z] = xyz(i); lista.push([x, y, z, viejo]); registro.push([i, nuevo, viejo]); }
  if (lista.length > 3) ponerMuchos(lista); else for (const [x, y, z, t] of lista) ponerBloque(x, y, z, t);
  golpe(B.MADERA, .6); planoRevisar(); pintarHerr();
}

// ───── orientación: "adelante" según hacia dónde mira el jugador ─────
function ejes() { const fx = -Math.sin(J.yaw), fz = -Math.cos(J.yaw); const f = Math.abs(fx) > Math.abs(fz) ? [Math.sign(fx), 0] : [0, Math.sign(fz)]; return { f, r: [-f[1], f[0]] }; }
const DIRV = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const dirIdx = (vx, vz) => vx > 0 ? 0 : vx < 0 ? 1 : vz > 0 ? 2 : 3;
// gira un bloque con dirección (escalones, troncos acostados) del plano local al mundo
function girarBloque(t, r, f) {
  const esc = t >= B.ESCALON && t < B.ESCALON + 16, inv = t >= B.ESC_INV && t < B.ESC_INV + 16;
  if (esc || inv) { const base = esc ? B.ESCALON : B.ESC_INV, k = Math.floor((t - base) / 4), d = (t - base) % 4, [lx, lz] = DIRV[d]; return base + k * 4 + dirIdx(lx * r[0] + lz * f[0], lx * r[1] + lz * f[1]); }
  if (t === B.TRONCO_X || t === B.TRONCO_Z) { const lx = t === B.TRONCO_X ? 1 : 0; const wx = lx ? r[0] : f[0]; return wx ? B.TRONCO_X : B.TRONCO_Z; }
  return t;
}
// "familia" de un bloque, para aceptar el mismo material aunque esté girado o abierto
function familia(t) {
  if (t >= B.ESCALON && t < B.ESCALON + 16) return 1000 + Math.floor((t - B.ESCALON) / 4);
  if (t >= B.ESC_INV && t < B.ESC_INV + 16) return 1000 + Math.floor((t - B.ESC_INV) / 4);
  if (t >= B.LOSA_ARR && t < B.LOSA_ARR + 4) return B.LOSA + t - B.LOSA_ARR;
  if (t === B.PUERTA_A) return B.PUERTA; if (t === B.TRONCO_X || t === B.TRONCO_Z) return B.TRONCO;
  return t;
}

// ═════════ PLANOS ═════════
// coordenadas del plano: x hacia la derecha, z hacia adelante (lejos del jugador), y hacia arriba (0 = piso)
const ESCM = (k, d) => B.ESCALON + k * 4 + d, ESCI = (k, d) => B.ESC_INV + k * 4 + d;   // k: 0 madera, 1 adoquín, 2 piedra, 3 ladrillo · d: 0 +x, 1 -x, 2 +z, 3 -z
const PLANOS = {
  cabana: { icono: B.MADERA, armar(P) {
    for (let x = 0; x < 7; x++) for (let z = 0; z < 6; z++) P(x, 0, z, B.MADERA_O);
    for (let x = 0; x < 7; x++) for (let z = 0; z < 6; z++) { const bx = x === 0 || x === 6, bz = z === 0 || z === 5; if (!bx && !bz) continue; for (let y = 1; y <= 3; y++) P(x, y, z, bx && bz ? B.TRONCO : B.MADERA); }
    P(3, 1, 0, B.PUERTA); P(3, 2, 0, B.PUERTA); for (const x of [1, 5]) P(x, 2, 0, B.PANEL); for (const z of [2, 3]) { P(0, 2, z, B.PANEL); P(6, 2, z, B.PANEL); }
    for (let x = 0; x < 7; x++) { P(x, 4, 0, B.TRONCO_X); P(x, 4, 5, B.TRONCO_X); }
    for (let k = 0; k < 4; k++) for (let z = -1; z <= 6; z++) { P(k - 1, 4 + k, z, ESCM(3, 0)); P(7 - k, 4 + k, z, ESCM(3, 1)); }
    for (let z = -1; z <= 6; z++) { P(3, 7, z, B.LADRILLO); P(3, 8, z, B.LOSA + 3); }
    for (const z of [0, 5]) for (let y = 5; y <= 6; y++) for (let x = y - 4; x <= 10 - y; x++) P(x, y, z, B.MADERA);
    P(1, 0, -1, B.VALLA); P(1, 1, -1, B.FAROL); P(5, 0, -1, B.VALLA); P(5, 1, -1, B.FAROL);
    P(5, 1, 4, B.CAMA); P(1, 1, 4, B.COFRE); P(1, 1, 1, B.ESTANTE);
  } },
  torre: { icono: B.LADRILLO_P, armar(P) {
    for (let y = 0; y <= 10; y++) for (let x = 0; x < 5; x++) for (let z = 0; z < 5; z++) { const borde = x === 0 || x === 4 || z === 0 || z === 4; if (y === 0) { P(x, y, z, B.ADOQUIN); continue; } if (borde) P(x, y, z, (x === 0 || x === 4) && (z === 0 || z === 4) ? B.TRONCO : B.LADRILLO_P); }
    P(2, 1, 0, B.PUERTA); P(2, 2, 0, B.PUERTA); for (const y of [5, 8]) { P(0, y, 2, B.PANEL); P(4, y, 2, B.PANEL); P(2, y, 4, B.PANEL); }
    for (let y = 1; y <= 11; y++) P(2, y, 3, B.ESCALERA);
    for (let x = -1; x <= 5; x++) for (let z = -1; z <= 5; z++) { if (x === 2 && z === 3) continue; P(x, 11, z, B.MADERA_O); }
    for (let x = -1; x <= 5; x++) for (let z = -1; z <= 5; z++) if (x === -1 || x === 5 || z === -1 || z === 5) P(x, 12, z, (x === -1 || x === 5) && (z === -1 || z === 5) ? B.TRONCO : B.VALLA);
    for (const [x, z] of [[-1, -1], [5, -1], [-1, 5], [5, 5]]) for (let y = 13; y <= 14; y++) P(x, y, z, B.TRONCO);
    for (let k = 0; k < 4; k++) for (let x = -1 + k; x <= 5 - k; x++) for (let z = -1 + k; z <= 5 - k; z++) { const borde = x === -1 + k || x === 5 - k || z === -1 + k || z === 5 - k; if (borde || k === 3) P(x, 15 + k, z, k === 3 ? B.LADRILLO : B.LOSA + 3); }
    P(2, 14, 2, B.FAROL);
  } },
  faro: { icono: B.TELA + 1, armar(P) {
    const c = 3;
    for (let y = 0; y <= 18; y++) for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) { const r = Math.hypot(a, b); if (r > 2.6) continue; if (y === 0) { P(c + a, y, c + b, B.LADRILLO_P); continue; } if (r > 1.5) P(c + a, y, c + b, Math.floor((y - 1) / 3) % 2 ? B.TELA + 1 : B.TELA); }
    for (let y = 1; y <= 19; y++) P(c, y, c, B.ESCALERA);
    P(c, 1, c - 2, B.PUERTA); P(c, 2, c - 2, B.PUERTA);
    for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) { const r = Math.hypot(a, b); if (r <= 3.3 && !(a === 0 && b === 0)) P(c + a, 19, c + b, B.LADRILLO_P); if (r > 2.5 && r <= 3.3) P(c + a, 20, c + b, B.VALLA); }
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) { if (a || b) P(c + a, 21, c + b, B.PANEL); P(c + a, 22, c + b, B.LOSA + 3); }
    P(c, 21, c, B.LAMPARA); P(c, 22, c, B.LADRILLO); P(c, 23, c, B.LOSA + 3);
  } },
  castillo: { icono: B.ADOQUIN, armar(P) {
    const W = 15;
    for (let x = 0; x < W; x++) for (let z = 0; z < W; z++) { P(x, 0, z, (x + z) % 2 ? B.ADOQUIN : B.LADRILLO_P); const borde = x === 0 || x === W - 1 || z === 0 || z === W - 1; if (!borde) continue;
      for (let y = 1; y <= 5; y++) P(x, y, z, B.ADOQUIN); if ((x + z) % 2 === 0) P(x, 6, z, B.LADRILLO_P); }
    for (const x of [6, 7, 8]) for (let y = 1; y <= 3; y++) P(x, y, 0, B.AIRE);
    for (const x of [6, 7, 8]) P(x, 4, 0, ESCI(1, 3)); P(5, 2, -1, B.FAROL); P(9, 2, -1, B.FAROL);
    for (const [cx, cz] of [[0, 0], [W - 1, 0], [0, W - 1], [W - 1, W - 1]]) for (let y = 1; y <= 9; y++) for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
      if (y < 9 && (a || b)) P(cx + a, y, cz + b, B.LADRILLO_P); else if (y < 9) P(cx, y, cz, B.ESCALERA);
      if (y === 9 && (a + b) % 2 === 0) P(cx + a, y, cz + b, B.LADRILLO_P); }
    for (let x = 1; x < W - 1; x++) for (const z of [1, W - 2]) P(x, 5, z, B.MADERA);
    for (let z = 1; z < W - 1; z++) for (const x of [1, W - 2]) P(x, 5, z, B.MADERA);
    for (let y = 1; y <= 4; y++) P(7, y, W - 2, B.ESCALERA);
    for (let x = 5; x <= 9; x++) for (let z = 7; z <= 11; z++) { for (let y = 1; y <= 7; y++) { const b = x === 5 || x === 9 || z === 7 || z === 11; if (b) P(x, y, z, y === 4 && (x === 7 || z === 9) ? B.PANEL : B.LADRILLO_P); } if ((x + z) % 2 === 0 && (x === 5 || x === 9 || z === 7 || z === 11)) P(x, 8, z, B.LADRILLO_P); P(x, 7, z, B.MADERA_O); }
    P(7, 1, 7, B.PUERTA); P(7, 2, 7, B.PUERTA); P(7, 6, 9, B.FAROL);
    for (let y = 8; y <= 11; y++) P(7, y, 9, B.TRONCO); P(8, 11, 9, B.TELA + 1); P(9, 11, 9, B.TELA + 1); P(8, 10, 9, B.TELA + 1);
  } },
};
function celdasDe(id) { const m = new Map(); PLANOS[id].armar((x, y, z, t) => m.set(x + ',' + y + ',' + z, { x, y, z, t })); return [...m.values()]; }
let plano = null;   // { id, celdas, o: [x,y,z], f, r, capa, fijo }
function aMundo(c, o, r, f) { return [o[0] + c.x * r[0] + c.z * f[0], o[1] + c.y, o[2] + c.x * r[1] + c.z * f[1]]; }
function ubicarPlano() {
  // el plano se apoya donde apunta la mira, centrado y hacia adelante
  const d = new THREE.Vector3(0, 0, -1).applyEuler(cam.rotation), h = apuntar(d, undefined, 40); if (!h) return false;
  const { f, r } = ejes(), cx = h.x + (h.cara[1] === 1 ? 0 : h.cara[0]), cz = h.z + (h.cara[1] === 1 ? 0 : h.cara[2]), cy = h.y + (h.cara[1] === 1 ? 1 : h.cara[1] === 0 ? 0 : 1);
  const ancho = Math.max(...plano.celdas.map(c => c.x)) + 1, half = Math.floor(ancho / 2);
  const o = [cx - r[0] * half + f[0] * 2, cy, cz - r[1] * half + f[1] * 2];
  const k = o.join(',') + f.join(',');
  if (k === plano.k) return true; plano.k = k; plano.o = o; plano.f = f; plano.r = r; return 'cambio';
}
function requerido(c) { return girarBloque(c.t, plano.r, plano.f); }
function cumple(c) { const [x, y, z] = aMundo(c, plano.o, plano.r, plano.f); const w = get(x, y, z); return c.t === B.AIRE ? !w || DEF[w].planta : familia(w) === familia(requerido(c)); }
let fantasma = null;
const matFantasma = new THREE.MeshBasicMaterial({ map: atlasTex, vertexColors: true, transparent: true, opacity: .5, depthWrite: false, alphaTest: .05 });
function geoCeldas(lista) {
  const P = [], UV = [], C = [], I = []; let n = 0; const e = .0006, enc = .03;
  for (const { x, y, z, t } of lista) { const d = DEF[t]; if (!d) continue; const cajas = d.conecta ? [[.375, 0, .375, .625, 1, .625]] : d.planta ? [[.3, 0, .3, .7, .8, .7]] : d.forma || [[0, 0, 0, 1, 1, 1]];
    for (const F of cajas) for (const f of CARAS) {
      const tile = d.caras ? d.caras[f.i] : d.tiles[f.t], tx = tile % 8, ty = Math.floor(tile / 8);
      for (const q of f.v) { const px = F[0] + q[0] * (F[3] - F[0]), py = F[1] + q[1] * (F[4] - F[1]), pz = F[2] + q[2] * (F[5] - F[2]);
        P.push(x + enc + px * (1 - 2 * enc), y + enc + py * (1 - 2 * enc), z + enc + pz * (1 - 2 * enc)); C.push(f.luz * .9 + .1, f.luz * .95 + .05, 1);
        let u, w; if (f.d[0]) { u = f.d[0] > 0 ? 1 - pz : pz; w = py; } else if (f.d[2]) { u = f.d[2] > 0 ? px : 1 - px; w = py; } else { u = px; w = pz; }
        UV.push((tx + e + u * (1 - 2 * e)) / 8, 1 - (ty + 1 - e - w * (1 - 2 * e)) / 16); }
      I.push(n, n + 1, n + 2, n, n + 2, n + 3); n += 4; } }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(UV, 2)); g.setAttribute('color', new THREE.Float32BufferAttribute(C, 3)); g.setIndex(I); return g;
}
function ponerFantasma(lista) { if (fantasma) { escena.remove(fantasma); fantasma.geometry.dispose(); fantasma = null; } if (!lista.length) return; fantasma = new THREE.Mesh(geoCeldas(lista), matFantasma); fantasma.renderOrder = 3; escena.add(fantasma); }
function elegirPlano(id) {
  quitarHerr(); plano = { id, celdas: celdasDe(id), fijo: false, k: '' };
  plano.alturas = [...new Set(plano.celdas.map(c => c.y))].sort((a, b) => a - b);
  pintarGuia(); son(520, .08, 'triangle', .1);
}
function cancelarPlano() { plano = null; ponerFantasma([]); $('planBar').hidden = true; pintarGuia(); }
function fijarPlano() {
  if (!plano || !plano.o) return; plano.fijo = true; plano.capa = 0;
  // en creativo se limpia el lugar (árboles, pasto, desniveles) y se rellena debajo del piso
  if (creativo()) accion(() => {
    const L = []; let xm = Infinity, xM = -Infinity, zm = Infinity, zM = -Infinity, yM = 0;
    for (const c of plano.celdas) { const [x, , z] = aMundo(c, plano.o, plano.r, plano.f); xm = Math.min(xm, x); xM = Math.max(xM, x); zm = Math.min(zm, z); zM = Math.max(zM, z); yM = Math.max(yM, c.y); }
    const oy = plano.o[1]; for (let x = xm; x <= xM; x++) for (let z = zm; z <= zM; z++) { for (let y = oy; y <= oy + yM + 2; y++) L.push([x, y, z, B.AIRE]); for (let y = oy - 3; y < oy; y++) if (!solidoMov(get(x, y, z)) || get(x, y, z) === B.AGUA) L.push([x, y, z, y === oy - 1 ? B.PASTO : B.TIERRA]); }
    ponerMuchos(L);
  });
  stats.planosEmpezados = (stats.planosEmpezados || 0) + 1; planoRevisar(true); pintarGuia(); sucio = true;
}
function planoRevisar(forzar) {
  if (!plano || !plano.fijo) return;
  const faltan = plano.celdas.filter(c => c.t !== B.AIRE && !cumple(c));
  const total = plano.celdas.filter(c => c.t !== B.AIRE).length;
  if (!faltan.length) { const nombre = TR('pl_' + plano.id); stats.planos = (stats.planos || 0) + 1; cancelarPlano(); aviso(TR('planListo') + '<small>' + nombre + '</small>', 2600); sonar('final', .7) || son(880, .3, 'triangle', .14); return; }
  const yMin = Math.min(...faltan.map(c => c.y)), capa = plano.alturas.indexOf(yMin);
  if (capa > plano.capa && !forzar) { aviso(TR('planCapa', { n: capa }), 1100); son(660, .1, 'triangle', .1); }
  plano.capa = capa; plano.faltanCapa = faltan.filter(c => c.y === yMin); plano.hechos = total - faltan.length; plano.total = total;
  ponerFantasma(plano.faltanCapa.map(c => { const [x, y, z] = aMundo(c, plano.o, plano.r, plano.f); return { x, y, z, t: requerido(c) }; }));
  pintarPlanBar();
}
function bloqueNecesario() {
  const cuenta = {}; for (const c of plano.faltanCapa || []) { const t = familia(requerido(c)); const base = t >= 1000 ? B.ESCALON + (t - 1000) * 4 : t; cuenta[base] = (cuenta[base] || 0) + 1; }
  return Object.entries(cuenta).sort((a, b) => b[1] - a[1]).map(([t, n]) => [+t, n]);
}
function pintarPlanBar() {
  const pb = $('planBar'); if (!plano || !plano.fijo) { pb.hidden = true; return; } pb.hidden = false;
  const nec = bloqueNecesario(), p = Math.floor(plano.hechos / plano.total * 100);
  pb.innerHTML = `${TR('pl_' + plano.id)} <div class="barraP"><i style="width:${p}%"></i></div> ${p}% · ${TR('piso', { a: plano.capa + 1, b: plano.alturas.length })}` +
    (nec.length ? ` · ${nom(nec[0][0])} ×${nec[0][1]} <div class="gb" id="pbUsar">${TR('usarBloque')}</div>` : '') + `<div class="gb rojo" id="pbX">X</div>`;
}
$('planBar').addEventListener('pointerdown', e => {
  e.stopPropagation();
  if (e.target.id === 'pbX') return cancelarPlano();
  if (e.target.id === 'pbUsar') { const nec = bloqueNecesario(); if (!nec.length) return; const t = nec.find(([t]) => creativo() || inv[t] > 0);
    if (!t) return aviso(TR('noTienes', { x: nom(nec[0][0]).toUpperCase() }), 1300); const ya = barra.indexOf(t[0]); if (ya >= 0) sel = ya; else barra[sel] = t[0]; pintarBarra(); aviso(nom(t[0]).toUpperCase(), 700); }
});
function planosHTML() {
  return '<h4>' + TR('planosAyuda') + '</h4>' + Object.keys(PLANOS).map(id => { const n = celdasDe(id).filter(c => c.t !== B.AIRE).length;
    return `<div class="plano" data-plano="${id}"><div class="slot" style="background-image:url(${icono(PLANOS[id].icono)})"></div><div class="nom">${TR('pl_' + id)}<small>${n} ${TR('bloquesMin')}</small></div><div class="hacer">${TR('construir')}</div></div>`; }).join('');
}

// ═════════ HERRAMIENTAS (modo creativo) ═════════
let herr = { modo: null, a: null }, clip = null, espejoEje = null, rotPegar = 0;
const marcoH = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), new THREE.LineBasicMaterial({ color: 0xffe14a, depthTest: false, transparent: true }));
marcoH.renderOrder = 5; marcoH.visible = false; escena.add(marcoH);
const planoEspejo = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x5ad0ff, transparent: true, opacity: .16, side: THREE.DoubleSide, depthWrite: false }));
planoEspejo.visible = false; escena.add(planoEspejo);
const ICON = {
  deshacer: ['...X....', '..XX....', '.XXXXXX.', '..XX...X', '...X...X', '.......X', '..XXXXX.', '........'],
  rellenar: ['XXXXXXXX', 'X......X', 'X.XXXX.X', 'X.XXXX.X', 'X.XXXX.X', 'X.XXXX.X', 'X......X', 'XXXXXXXX'],
  copiar: ['XXXXX...', 'X...X...', 'X..XXXXX', 'X..X...X', 'XXXX...X', '...X...X', '...X...X', '...XXXXX'],
  pegar: ['..XXXX..', 'XXX..XXX', 'X......X', 'X.XXXX.X', 'X......X', 'X.XXXX.X', 'X......X', 'XXXXXXXX'],
  espejo: ['X..XX..X', 'XX.XX.XX', 'XXXXXXXX', 'XX.XX.XX', 'X..XX..X', '...XX...', '...XX...', '...XX...'],
};
function pintarHerr() {
  const box = $('herr'); const ver = jugando && creativo() && !plano; box.hidden = !ver; if (!ver) return;
  box.innerHTML = Object.keys(ICON).map(k => `<div class="bChico${(herr.modo === k || (k === 'espejo' && espejoEje)) ? ' on' : ''}${(k === 'pegar' && !clip) || (k === 'deshacer' && !deshacer.length) ? ' off' : ''}" data-h="${k}" title="${TR('h_' + k)}">${pix(ICON[k], '#fff')}</div>`).join('');
}
$('herr').addEventListener('pointerdown', e => {
  e.stopPropagation(); const d = e.target.closest('[data-h]'); if (!d) return; const k = d.dataset.h;
  if (k === 'deshacer') return accion0(hacerDeshacer);
  if (k === 'espejo') { if (espejoEje) { espejoEje = null; aviso(TR('espejoOff'), 900); } else { const { f } = ejes(); espejoEje = f[0] ? { eje: 'z', c: Math.floor(J.z) } : { eje: 'x', c: Math.floor(J.x) }; aviso(TR('espejoOn'), 2000); } pintarHerr(); return; }
  if (k === 'pegar' && !clip) return aviso(TR('copiaPrimero'), 1200);
  herr = { modo: herr.modo === k ? null : k, a: null }; rotPegar = 0; pintarHerr(); pintarGuia();
});
function accion0(fn) { fn(); }
function quitarHerr() { herr = { modo: null, a: null }; marcoH.visible = false; pintarHerr(); pintarGuia(); }
function pintarGuia() {
  const g = $('guia'); let h = '';
  if (plano && !plano.fijo) h = `${TR('pl_' + plano.id)}: ${TR('guiaPlano')} <div class="gb" id="gColocar">${TR('colocar')}</div><div class="gb rojo" id="gCancelar">${TR('cancelar')}</div>`;
  else if (herr.modo === 'rellenar' || herr.modo === 'copiar') h = `${TR('h_' + herr.modo)}: ${TR(herr.a ? 'esquina2' : 'esquina1')} <div class="gb rojo" id="gCancelar">${TR('cancelar')}</div>`;
  else if (herr.modo === 'pegar') h = `${TR('h_pegar')}: ${TR('guiaPegar')} <div class="gb gris" id="gGirar">${TR('girar')}</div><div class="gb rojo" id="gCancelar">${TR('cancelar')}</div>`;
  g.hidden = !h; g.innerHTML = h;
}
$('guia').addEventListener('pointerdown', e => {
  e.stopPropagation(); const id = e.target.id;
  if (id === 'gColocar') fijarPlano(); else if (id === 'gCancelar') { if (plano) cancelarPlano(); quitarHerr(); } else if (id === 'gGirar') { rotPegar = (rotPegar + 1) % 4; }
});
// dónde cae un toque: la celda tocada (copiar) o la de al lado (rellenar y pegar)
function celdaToque(dir, pegada) { const h = apuntar(dir, undefined, 40); if (!h) return null; return pegada ? [h.x, h.y, h.z] : [h.x + h.cara[0], h.y + h.cara[1], h.z + h.cara[2]]; }
const MAX_HERR = 8000;
function cajaDe(a, b) { return [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2]), Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2])]; }
function herramientaTocar(dir) {
  if (!creativo() || !herr.modo) return false;
  const m = herr.modo;
  if (m === 'rellenar' || m === 'copiar') {
    const c = celdaToque(dir, m === 'copiar'); if (!c) return true;
    if (!herr.a) { herr.a = c; pintarGuia(); son(520, .05, 'triangle', .08); return true; }
    const [x0, y0, z0, x1, y1, z1] = cajaDe(herr.a, c), vol = (x1 - x0 + 1) * (y1 - y0 + 1) * (z1 - z0 + 1);
    if (vol > MAX_HERR) { aviso(TR('muyGrande', { n: MAX_HERR }), 1500); return true; }
    if (m === 'rellenar') { let t = barra[sel]; if (!t || !esBloque(t) || t === B.PUERTA || t === B.CAMA) t = B.AIRE; if (esEscalon(t)) t = escalonHacia(t, J.yaw);
      const L = []; for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) L.push([x, y, z, t]); ponerMuchos(L); golpe(t || B.TIERRA, 1.2); aviso(TR('rellenado', { n: vol }), 1000); }
    else { const datos = []; for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) { const t = get(x, y, z); if (t && t !== B.ROCA && t !== B.AGUA) datos.push([x - x0, y - y0, z - z0, t]); }
      clip = { sx: x1 - x0 + 1, sy: y1 - y0 + 1, sz: z1 - z0 + 1, datos }; aviso(TR('copiado', { n: datos.length }), 1200); son(660, .08, 'triangle', .1); }
    quitarHerr(); return true;
  }
  if (m === 'pegar') {
    const c = celdaToque(dir, false); if (!c || !clip) return true;
    const L = clipEn(c).map(([x, y, z, t]) => [x, y, z, t]); ponerMuchos(L); golpe(B.MADERA, 1.2); aviso(TR('pegado', { n: L.length }), 900);
    return true;   // sigue en modo pegar para pegar varias veces
  }
  return false;
}
// el portapapeles girado según rotPegar, con la esquina en la celda c
function clipEn(c) {
  const out = [], R = rotPegar, r = [[1, 0], [0, 1], [-1, 0], [0, -1]][R], f = [[0, 1], [-1, 0], [0, -1], [1, 0]][R];
  const ox = c[0] - Math.min(0, (clip.sx - 1) * r[0] + 0 * f[0], (clip.sz - 1) * f[0], (clip.sx - 1) * r[0] + (clip.sz - 1) * f[0]);
  const oz = c[2] - Math.min(0, (clip.sx - 1) * r[1], (clip.sz - 1) * f[1], (clip.sx - 1) * r[1] + (clip.sz - 1) * f[1]);
  for (const [x, y, z, t] of clip.datos) out.push([ox + x * r[0] + z * f[0], c[1] + y, oz + x * r[1] + z * f[1], girarBloque(t, r, f)]);
  return out;
}
// espejo: repite lo que pones o rompes del otro lado de una línea
function espejo(x, y, z, t) {
  if (!espejoEje || !creativo() || t === B.PUERTA || t === B.PUERTA_A) return;
  const g = grupo; const mx = espejoEje.eje === 'x' ? 2 * espejoEje.c - x : x, mz = espejoEje.eje === 'z' ? 2 * espejoEje.c - z : z;
  if (mx === x && mz === z) return;
  let tm = t;
  if (t >= B.ESCALON && t < B.ESC_INV + 16) { const base = t >= B.ESC_INV ? B.ESC_INV : B.ESCALON, d = (t - base) % 4, k = Math.floor((t - base) / 4); const nd = espejoEje.eje === 'x' ? [1, 0, 2, 3][d] : [0, 1, 3, 2][d]; tm = base + k * 4 + nd; }
  if (t === B.AIRE) { const v = get(mx, y, mz); if (v && v !== B.ROCA) ponerBloque(mx, y, mz, B.AIRE); }
  else if (reemplazable(get(mx, y, mz))) ponerBloque(mx, y, mz, tm);
}

// ═════════ VIDEO TIMELAPSE ═════════
let video = null;
const MIMES = ['video/mp4;codecs=avc1.42E01E', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
function crearVideo() {
  const cv0 = document.createElement('canvas');
  if (!window.MediaRecorder || !cv0.captureStream) return aviso(TR('videoNo'), 1800);
  // cambios propios del jugador, desde el último que sigue en el mundo
  const cambios = registro.slice(-4000);
  const puestos = cambios.filter(([, , n]) => n);
  if (puestos.length < 8) return aviso(TR('sinCambios'), 2200);
  // centro y tamaño de la construcción
  let x0 = Infinity, y0 = Infinity, z0 = Infinity, x1 = -Infinity, y1 = -Infinity, z1 = -Infinity;
  for (const [i] of puestos) { const [x, y, z] = xyz(i); x0 = Math.min(x0, x); y0 = Math.min(y0, y); z0 = Math.min(z0, z); x1 = Math.max(x1, x); y1 = Math.max(y1, y); z1 = Math.max(z1, z); }
  const cen = new THREE.Vector3((x0 + x1) / 2 + .5, (y0 + y1) / 2, (z0 + z1) / 2 + .5), tam = Math.max(x1 - x0, z1 - z0, (y1 - y0) * 1.3) + 1;
  // deshacer todo para volver a construirlo en el video
  for (let k = cambios.length - 1; k >= 0; k--) mundo[cambios[k][0]] = cambios[k][1];
  altTodo(); buscarFuentes(); calcLuz(); armarTodo();
  const mime = MIMES.find(m => MediaRecorder.isTypeSupported(m)) || '';
  const cv = document.createElement('canvas'); cv.width = 720; cv.height = 1280; const g = cv.getContext('2d');
  const rec = new MediaRecorder(cv.captureStream(30), mime ? { mimeType: mime, videoBitsPerSecond: 6e6 } : {});
  const partes = []; rec.ondataavailable = e => { if (e.data.size) partes.push(e.data); };
  rec.onstop = () => terminarVideo(new Blob(partes, { type: (mime || 'video/webm').split(';')[0] }));
  video = { cambios, k: 0, t: 0, t0: performance.now(), dur: Math.min(12, 6 + cambios.length / 120), cen, rad: Math.max(9, tam * 1.15), alto: Math.max(5, tam * .55), ang: J.yaw + Math.PI, cv, g, rec, tiempo0: tiempo, sucios: new Set(), luz: false, prev: { pr: render.getPixelRatio() } };
  $('pausa').hidden = true; $('hud').hidden = true; pausado = true; soltarTodo(); manoG.visible = false; tiempo = 60;
  render.setPixelRatio(1); render.setSize(720, 1280, false); cam.aspect = 720 / 1280; cam.updateProjectionMatrix();
  $('grabCaja').innerHTML = ''; $('grabCaja').appendChild(cv); $('grabando').hidden = false; $('grabTxt').textContent = TR('grabando', { p: 0 });
  rec.start(250);
}
function videoFrame(dt) {
  const v = video; v.t = (performance.now() - v.t0) / 1000; const p = Math.min(1, v.t / v.dur), hasta = Math.floor(p * v.cambios.length);
  while (v.k < hasta) { const [i, , n] = v.cambios[v.k++]; const vi = mundo[i]; mundo[i] = n; const [x, , z] = xyz(i); v.sucios.add(x + SX * z); if ((vi && DEF[vi].luz) || (n && DEF[n].luz)) v.luz = true; }
  if (v.sucios.size) { const ch = new Set(); for (const c of v.sucios) { const x = c % SX, z = (c / SX) | 0; altColumna(x, z); for (const dx of [-4, 0, 4]) for (const dz of [-4, 0, 4]) { const a = Math.floor((x + dx) / CH), b = Math.floor((z + dz) / CH); if (a >= 0 && b >= 0 && a < NCX && b < NCZ) ch.add(a + NCX * b); } }
    v.sucios.clear(); if (v.luz && (v.t - (v.ultLuz || 0) > .5 || p >= 1)) { buscarFuentes(); calcLuz(); v.luz = false; v.ultLuz = v.t; armarTodo(); } else for (const c of ch) armarPedazo(c % NCX, (c / NCX) | 0); }
  // la cámara da vueltas alrededor de la construcción
  const a = v.ang + v.t * .32; cam.position.set(v.cen.x + Math.sin(a) * v.rad, v.cen.y + v.alto, v.cen.z + Math.cos(a) * v.rad); cam.lookAt(v.cen.x, v.cen.y + 1, v.cen.z);
  manoG.visible = false; marco.visible = false; grieta.visible = false; if (fantasma) fantasma.visible = false;
  $('grabTxt').textContent = TR('grabando', { p: Math.floor(Math.min(1, v.t / (v.dur + 1.6)) * 100) });
  if (v.t > v.dur + 1.6 && v.rec.state === 'recording') v.rec.stop();
}
function videoDespues() {
  const v = video, g = v.g; g.drawImage(render.domElement, 0, 0, 720, 1280);
  g.textAlign = 'center'; g.font = 'bold 88px "Baloo 2", sans-serif'; g.lineWidth = 10; g.strokeStyle = '#3f3f3f'; g.fillStyle = '#ffffff';
  g.strokeText('BLOX', 360, 1150); g.fillText('BLOX', 360, 1150);
  g.font = 'bold 30px "Baloo 2", sans-serif'; g.lineWidth = 6; g.strokeText('Building Block Crafting', 360, 1196); g.fillStyle = '#ffff55'; g.fillText('Building Block Crafting', 360, 1196);
}
let videoBlob = null;
function terminarVideo(blob) {
  const v = video; video = null; tiempo = v.tiempo0;
  render.setPixelRatio(v.prev.pr); medir(); if (fantasma) fantasma.visible = true;
  buscarFuentes(); calcLuz(); armarTodo(); sucio = true;
  $('grabando').hidden = true; $('hud').hidden = false; videoBlob = blob;
  const url = URL.createObjectURL(blob); $('videoCaja').innerHTML = `<video src="${url}" autoplay loop muted playsinline></video>`; $('videoCapa').hidden = false;
  const f = new File([blob], 'blox.' + (blob.type.includes('mp4') ? 'mp4' : 'webm'), { type: blob.type });
  $('bCompartirVideo').hidden = !(navigator.canShare && navigator.canShare({ files: [f] }));
  stats.videos = (stats.videos || 0) + 1;
}
$('bVideo').onclick = () => crearVideo();
$('bCerrarVideo').onclick = () => { $('videoCapa').hidden = true; $('videoCaja').innerHTML = ''; pausado = false; };
$('bGuardarVideo').onclick = () => { if (!videoBlob) return; const a = document.createElement('a'); a.href = URL.createObjectURL(videoBlob); a.download = 'blox-timelapse.' + (videoBlob.type.includes('mp4') ? 'mp4' : 'webm'); document.body.appendChild(a); a.click(); a.remove(); };
$('bCompartirVideo').onclick = () => { if (!videoBlob) return; navigator.share({ files: [new File([videoBlob], 'blox.' + (videoBlob.type.includes('mp4') ? 'mp4' : 'webm'), { type: videoBlob.type })], title: TR('compartirT') }).catch(() => {}); };

// ═════════ CADA CUADRO ═════════
let previoT = 0;
function herrFrame(dt) {
  if (video) return videoFrame(dt);
  { const ver = jugando && creativo() && !plano; if (ver === $('herr').hidden) pintarHerr(); }
  if (!jugando) { marcoH.visible = false; planoEspejo.visible = false; return; }
  // vista previa del plano antes de fijarlo (sigue a la mira)
  if (plano && !plano.fijo && !pausado) { previoT -= dt; if (previoT <= 0) { previoT = .12; const r = ubicarPlano(); if (r === 'cambio') ponerFantasma(plano.celdas.filter(c => c.t !== B.AIRE).map(c => { const [x, y, z] = aMundo(c, plano.o, plano.r, plano.f); return { x, y, z, t: requerido(c) }; })); } }
  if (fantasma) matFantasma.opacity = .38 + Math.sin(performance.now() / 250) * .1;
  // marco amarillo de las herramientas
  marcoH.visible = false;
  if (herr.modo && !pausado) { const d = new THREE.Vector3(0, 0, -1).applyEuler(cam.rotation), m = herr.modo;
    let a = null, b = null;
    if ((m === 'rellenar' || m === 'copiar')) { const c = celdaToque(d, m === 'copiar'); b = c; a = herr.a || c; }
    else if (m === 'pegar' && clip) { const c = celdaToque(d, false); if (c) { const L = clipEn(c); let q = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity]; for (const [x, y, z] of L) q = [Math.min(q[0], x), Math.min(q[1], y), Math.min(q[2], z), Math.max(q[3], x), Math.max(q[4], y), Math.max(q[5], z)]; if (L.length) { a = q.slice(0, 3); b = q.slice(3); } } }
    if (a && b) { const [x0, y0, z0, x1, y1, z1] = cajaDe(a, b); marcoH.visible = true; marcoH.scale.set(x1 - x0 + 1.02, y1 - y0 + 1.02, z1 - z0 + 1.02); marcoH.position.set((x0 + x1) / 2 + .5, (y0 + y1) / 2 + .5, (z0 + z1) / 2 + .5); } }
  // línea del espejo
  planoEspejo.visible = !!espejoEje && creativo();
  if (planoEspejo.visible) { const e = espejoEje; planoEspejo.scale.set(60, 30, 1); if (e.eje === 'x') { planoEspejo.position.set(e.c + .5, J.y + 6, J.z); planoEspejo.rotation.set(0, Math.PI / 2, 0); } else { planoEspejo.position.set(J.x, J.y + 6, e.c + .5); planoEspejo.rotation.set(0, 0, 0); } }
}
function herrDespues() { if (video) videoDespues(); }

// ═════════ GUARDAR Y CARGAR ═════════
function herrGuardar() { return { plano: plano && plano.fijo ? { id: plano.id, o: plano.o, f: plano.f, r: plano.r } : null, registro: registro.slice(-3000) }; }
function herrCargar(x) {
  herrReset(); registro = (x && x.registro) || [];
  if (x && x.plano && PLANOS[x.plano.id]) { plano = { id: x.plano.id, celdas: celdasDe(x.plano.id), fijo: true, o: x.plano.o, f: x.plano.f, r: x.plano.r }; plano.alturas = [...new Set(plano.celdas.map(c => c.y))].sort((a, b) => a - b); plano.capa = 0; planoRevisar(true); }
  pintarHerr(); pintarGuia();
}
function herrReset() { plano = null; ponerFantasma([]); $('planBar').hidden = true; herr = { modo: null, a: null }; clip = null; espejoEje = null; deshacer = []; marcoH.visible = false; planoEspejo.visible = false; pintarHerr(); pintarGuia(); }
window.__h = { elegirPlano, fijarPlano, cancelarPlano, plano: () => plano, hacerDeshacer, herramientaTocar, setModo: m => { herr = { modo: m, a: null }; pintarGuia(); }, clip: () => clip, crearVideo, video: () => video, registro: () => registro, ubicarPlano, setEspejo: e => espejoEje = e, rot: r => rotPegar = r };
