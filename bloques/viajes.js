'use strict';
// ═════════ PORTAL DE VIAJE: pones el portal, eliges el mundo y viajas. Cada mundo queda guardado. ═════════
// Mundos: Reino de hielo, Mundo submarino, Islas flotantes, Mundo de dulces, La Luna, el Abismo y las Islas del Confín.

{
const DEST = ['nieve', 'submarino', 'flotantes', 'dulces', 'luna', 'abismo', 'confin'];
const COLOR = { casa: '#3fae4a', nieve: '#5ab8f0', submarino: '#1a7ad0', flotantes: '#58c0e8', dulces: '#f070b0', luna: '#7a7a90', abismo: '#7a3ab8', confin: '#3a2a90' };
const SVG = {
  casa: '<path d="M4 15 16 5l12 10v12H20v-8h-8v8H4z" fill="#fff"/>',
  nieve: '<g stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M16 3v26M4.7 9.5l22.6 13M4.7 22.5l22.6-13"/><path d="M12 5l4 3 4-3M12 27l4-3 4 3" fill="none"/></g>',
  submarino: '<path d="M4 16c5-7 13-8 19-2l5-4v12l-5-4c-6 6-14 5-19-2z" fill="#fff"/><circle cx="10" cy="15" r="1.6" fill="#1a7ad0"/>',
  flotantes: '<path d="M5 14h22l-5 7-4 6-3-5-4-2z" fill="#fff"/><path d="M8 14c0-4 4-6 8-6s8 2 8 6" fill="#9be07a"/><path d="M19 23v6" stroke="#bfe8ff" stroke-width="2.4"/>',
  dulces: '<circle cx="16" cy="12" r="8" fill="#fff"/><path d="M16 12m-4 0a4 4 0 1 1 4 4" stroke="#f070b0" stroke-width="2.4" fill="none"/><path d="M16 20v10" stroke="#fff" stroke-width="2.6"/>',
  luna: '<path d="M21 4a12 12 0 1 0 7 19A10 10 0 0 1 21 4z" fill="#fff"/><circle cx="12" cy="18" r="2" fill="#7a7a90"/><circle cx="16" cy="11" r="1.4" fill="#7a7a90"/>',
  abismo: '<path d="M3 16c4-7 9-9 13-9s9 2 13 9c-4 7-9 9-13 9s-9-2-13-9z" fill="#fff"/><circle cx="16" cy="16" r="5" fill="#7a3ab8"/><circle cx="16" cy="16" r="2" fill="#1a0a2a"/>',
  confin: '<path d="M16 3l3.6 8.4 9 .8-6.8 6 2 8.8L16 22.4 8.2 27l2-8.8-6.8-6 9-.8z" fill="#fff"/>' };
const CANDADO_PV = '<svg viewBox="0 0 10 12"><rect x="1" y="5" width="8" height="7" rx="1" fill="#fff"/><path d="M3 5V3.5a2 2 0 0 1 4 0V5" stroke="#fff" stroke-width="1.4" fill="none"/></svg>';
const icono = k => `<svg viewBox="0 0 32 32" width="34" height="34">${SVG[k]}</svg>`;

Object.assign(TX.es, { pvTitulo: 'PORTAL DE VIAJE', pvElige: '¿A qué mundo lleva este portal?', pvListo: 'PORTAL A {n}<small>entra caminando o tócalo para viajar</small>', pvViajando: 'VIAJANDO A {n}…', pvSinDestino: 'ELIGE A DÓNDE VA ESTE PORTAL', pvEnLinea: 'LOS PORTALES NO FUNCIONAN EN PARTIDAS EN LÍNEA',
  pv_casa: 'Tu mundo', pv_nieve: 'Reino de hielo', pv_submarino: 'Mundo submarino', pv_flotantes: 'Islas flotantes', pv_dulces: 'Mundo de dulces', pv_luna: 'La Luna', pv_abismo: 'El Abismo', pv_confin: 'Islas del Confín',
  pvd_casa: 'Volver a donde empezaste', pvd_nieve: 'Nieve, auroras y pingüinos', pvd_submarino: 'Arrecifes, barcos hundidos y una casa bajo el agua', pvd_flotantes: 'Islas en el cielo con cascadas', pvd_dulces: 'Caramelos, chocolate y ositos de gomita', pvd_luna: 'Poca gravedad y la Tierra en el cielo', pvd_abismo: 'Magma, cristales y el Ojón Rey', pvd_confin: 'Islas entre las estrellas',
  pvl_nieve: 'REINO DE HIELO<small>mira el cielo: hay auroras</small>', pvl_submarino: 'MUNDO SUBMARINO<small>busca la casa bajo el agua</small>', pvl_flotantes: 'ISLAS FLOTANTES<small>abajo solo hay nubes</small>', pvl_dulces: 'MUNDO DE DULCES<small>todo se puede romper y usar</small>', pvl_luna: 'LA LUNA<small>poca gravedad: ¡salta!</small>' });
Object.assign(TX.es, { pvNecesitas: 'Necesitas: {n}', pvUsarLlave: 'Toca para usar tu {n}', pvAbierto: '¡ABRISTE EL CAMINO A {n}!', pvComoLlave: 'NECESITAS {n}<small>se fabrica con: {r}</small>', pvBloq_abismo: 'Llega primero con el portal del Abismo', pvBloq_confin: 'Llega primero con el Altar estelar', pvNoRomper: 'ESTE PORTAL NO SE PUEDE ROMPER<small>es tu camino de vuelta</small>' });
Object.assign(TX.en, { pvNecesitas: 'You need: {n}', pvUsarLlave: 'Tap to use your {n}', pvAbierto: 'YOU OPENED THE WAY TO {n}!', pvComoLlave: 'YOU NEED {n}<small>craft it with: {r}</small>', pvBloq_abismo: 'Get there first with the Abyss portal', pvBloq_confin: 'Get there first with the Star altar', pvNoRomper: 'THIS PORTAL CANNOT BE BROKEN<small>it is your way back</small>' });
Object.assign(TX.pt, { pvNecesitas: 'Você precisa: {n}', pvUsarLlave: 'Toque para usar sua {n}', pvAbierto: 'VOCÊ ABRIU O CAMINHO PARA {n}!', pvComoLlave: 'VOCÊ PRECISA DE {n}<small>fabrique com: {r}</small>', pvBloq_abismo: 'Chegue primeiro pelo portal do Abismo', pvBloq_confin: 'Chegue primeiro pelo Altar estelar', pvNoRomper: 'ESTE PORTAL NÃO PODE SER QUEBRADO<small>é o seu caminho de volta</small>' });
Object.assign(TX.en, { pvTitulo: 'TRAVEL PORTAL', pvElige: 'Which world does this portal go to?', pvListo: 'PORTAL TO {n}<small>walk in or tap it to travel</small>', pvViajando: 'TRAVELING TO {n}…', pvSinDestino: 'CHOOSE WHERE THIS PORTAL GOES', pvEnLinea: 'PORTALS DO NOT WORK IN ONLINE GAMES',
  pv_casa: 'Your world', pv_nieve: 'Ice Kingdom', pv_submarino: 'Undersea World', pv_flotantes: 'Floating Islands', pv_dulces: 'Candy World', pv_luna: 'The Moon', pv_abismo: 'The Abyss', pv_confin: 'Farthest Isles',
  pvd_casa: 'Go back to where you started', pvd_nieve: 'Snow, auroras and penguins', pvd_submarino: 'Reefs, shipwrecks and a house under the sea', pvd_flotantes: 'Islands in the sky with waterfalls', pvd_dulces: 'Candy, chocolate and gummy bears', pvd_luna: 'Low gravity and the Earth in the sky', pvd_abismo: 'Magma, crystals and the Big Eye King', pvd_confin: 'Islands among the stars',
  pvl_nieve: 'ICE KINGDOM<small>look up: there are auroras</small>', pvl_submarino: 'UNDERSEA WORLD<small>find the house under the sea</small>', pvl_flotantes: 'FLOATING ISLANDS<small>there are only clouds below</small>', pvl_dulces: 'CANDY WORLD<small>you can break and use everything</small>', pvl_luna: 'THE MOON<small>low gravity: jump!</small>' });
Object.assign(TX.pt, { pvTitulo: 'PORTAL DE VIAGEM', pvElige: 'Para qual mundo vai este portal?', pvListo: 'PORTAL PARA {n}<small>entre andando ou toque para viajar</small>', pvViajando: 'VIAJANDO PARA {n}…', pvSinDestino: 'ESCOLHA PARA ONDE VAI ESTE PORTAL', pvEnLinea: 'OS PORTAIS NÃO FUNCIONAM EM PARTIDAS ONLINE',
  pv_casa: 'Seu mundo', pv_nieve: 'Reino do gelo', pv_submarino: 'Mundo submarino', pv_flotantes: 'Ilhas flutuantes', pv_dulces: 'Mundo dos doces', pv_luna: 'A Lua', pv_abismo: 'O Abismo', pv_confin: 'Ilhas do Confim',
  pvd_casa: 'Voltar para onde você começou', pvd_nieve: 'Neve, auroras e pinguins', pvd_submarino: 'Recifes, navios afundados e uma casa debaixo d\'água', pvd_flotantes: 'Ilhas no céu com cachoeiras', pvd_dulces: 'Balas, chocolate e ursinhos de goma', pvd_luna: 'Pouca gravidade e a Terra no céu', pvd_abismo: 'Magma, cristais e o Rei Olhão', pvd_confin: 'Ilhas entre as estrelas',
  pvl_nieve: 'REINO DO GELO<small>olhe o céu: tem auroras</small>', pvl_submarino: 'MUNDO SUBMARINO<small>procure a casa debaixo d\'água</small>', pvl_flotantes: 'ILHAS FLUTUANTES<small>lá embaixo só há nuvens</small>', pvl_dulces: 'MUNDO DOS DOCES<small>dá para quebrar e usar tudo</small>', pvl_luna: 'A LUA<small>pouca gravidade: pule!</small>' });

// ─── ventana para elegir el destino ───
{ const st = document.createElement('style'); st.textContent = `
  #pvGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
  #pvGrid .pvC { display: flex; gap: 8px; align-items: center; padding: 8px; border-radius: 12px; border: 3px solid #0d153d; cursor: pointer; color: #fff; text-align: left; line-height: 1.1; }
  #pvGrid .pvC b { display: block; font-size: 15px; } #pvGrid .pvC small { display: block; font-size: 11px; opacity: .92; margin-top: 2px; }
  #pvGrid .pvC svg { flex: none; } #pvGrid .pvC:active { transform: scale(.97); }
  #pvSub { font-size: 14px; margin-bottom: 8px; } #pvGrid .pvC.bloq { filter: grayscale(.75) brightness(.8); } #pvGrid .pvC b svg { width: 12px; height: 13px; vertical-align: -1px; margin-right: 4px; }`; document.head.appendChild(st); }
cap('pvCapa', '<div class="mVentana" style="width:min(700px,96vw)"><div class="vCab"><div class="vTit" data-i="pvTitulo"></div><div class="cerrar" id="pvCerrar">X</div></div><div class="vCuerpo"><div id="pvSub" data-i="pvElige"></div><div id="pvGrid"></div></div></div>');
aplicarIdioma();
let pvElegir = null;
const esHijo = () => { const m = leerLista().find(m => m.id === mundoId); return !!(m && m.padre); };
function abrirElegir(i) {
  pvElegir = i; const lista = (esHijo() ? ['casa'] : []).concat(DEST);
  const A = window.__aventura, sup = !creativo() && A;
  $('pvGrid').innerHTML = lista.map(k => { const ab = !sup || A.abierto(k), ll = sup && !ab && A.llave(k), tiene = ll && (inv[ll] || 0) > 0;
    const sub = ab ? TR('pvd_' + k) : ll ? (tiene ? TR('pvUsarLlave', { n: nom(ll) }) : TR('pvNecesitas', { n: nom(ll) })) : TR('pvBloq_' + k);
    return `<div class="pvC${ab || tiene ? '' : ' bloq'}" data-pv="${k}" style="background:${COLOR[k]}">${icono(k)}<div><b>${ab ? '' : CANDADO_PV}${TR('pv_' + k)}</b><small>${sub}</small></div></div>`; }).join('');
  pausado = true; soltarTodo(); abrir('pvCapa');
}
$('pvGrid').addEventListener('click', e => { const c = e.target.closest('[data-pv]'); if (!c || pvElegir == null) return;
  const A = window.__aventura, k = c.dataset.pv;
  if (!creativo() && A && !A.abierto(k)) { const ll = A.llave(k);
    if (ll && (inv[ll] || 0) > 0) { quitarItem(ll, 1); A.abrir(k); pintarBarra(); aviso(TR('pvAbierto', { n: TR('pv_' + k).toUpperCase() }), 2600); }
    else { aviso(ll ? TR('pvComoLlave', { n: nom(ll), r: A.receta(k) }) : TR('pvBloq_' + k), 3200); son(200, .15, 'square', .06); return; } }
  mapa.portalesV = mapa.portalesV || {}; mapa.portalesV[pvElegir] = c.dataset.pv; sucio = true; pvElegir = null; cerrar('pvCapa'); pausado = false;
  aviso(TR('pvListo', { n: TR('pv_' + c.dataset.pv).toUpperCase() }), 2600); son(660, .15, 'triangle', .1); setTimeout(() => son(990, .2, 'triangle', .1), 120); pvRefrescar(true); });
$('pvCerrar').onclick = () => { cerrar('pvCapa'); pausado = false; pvElegir = null; };

// ─── el portal tiene dos bloques de alto; el destino se guarda en el de abajo ───
const PISO = () => SX * SZ;
const baseDe = i => (mundo[i - PISO()] === B.PORTAL_V ? i - PISO() : i);
const destinoDe = i => { const b = baseDe(i), m = mapa.portalesV || {}; return m[b] || m[i] || null; };
{ const p0 = ponerBloque; ponerBloque = function (x, y, z, t) {
    const antes = dentro(x, y, z) ? mundo[idx(x, y, z)] : 0; const r = p0.apply(this, arguments);
    if (t === B.PORTAL_V && antes !== B.PORTAL_V && jugando && !pvGenerando) {
      const i = idx(x, y, z); if (mundo[i - PISO()] === B.PORTAL_V) return r;   // es la parte de arriba
      if (dentro(x, y + 1, z) && !mundo[i + PISO()]) p0(x, y + 1, z, B.PORTAL_V);
      if (!(mapa.portalesV || {})[i] && $('pvCapa').hidden) setTimeout(() => { if (mundo[i] === B.PORTAL_V) abrirElegir(i); }, 60);
    }
    if (antes === B.PORTAL_V && t !== B.PORTAL_V) setTimeout(() => pvRefrescar(true), 0);
    return r; }; }
let pvGenerando = false;
{ const r0 = romper; romper = function (h) {
    const t = get(h.x, h.y, h.z); if (t !== B.PORTAL_V) return r0.apply(this, arguments);
    const i = idx(h.x, h.y, h.z), b = baseDe(i);
    if (!creativo() && (window.mundoTipo || '').startsWith('v_') && mapa.pvVuelta === b) { aviso(TR('pvNoRomper'), 2200); return; }
    const otro = b === i ? i + PISO() : b; if (mundo[otro] === B.PORTAL_V) { const y = Math.floor(otro / PISO()), r = otro % PISO(); ponerBloque(r % SX, y, Math.floor(r / SX), B.AIRE); }
    return r0.apply(this, arguments); }; }

// ─── carteles flotantes con el nombre del destino ───
const carteles = new Map(); let pvRefT = 0;
function cartelSprite(k) {
  const c = document.createElement('canvas'); c.width = 320; c.height = 80; const g = c.getContext('2d');
  g.fillStyle = 'rgba(13,21,61,.85)'; g.beginPath(); g.roundRect ? g.roundRect(4, 8, 312, 64, 18) : g.rect(4, 8, 312, 64); g.fill();
  g.fillStyle = COLOR[k] || '#7a4aff'; g.beginPath(); g.roundRect ? g.roundRect(10, 14, 300, 52, 14) : g.rect(10, 14, 300, 52); g.fill();
  g.fillStyle = '#fff'; g.font = 'bold 30px "Lilita One", Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(TR('pv_' + k).toUpperCase(), 160, 42, 284);
  const t = new THREE.CanvasTexture(c); t.minFilter = THREE.LinearFilter;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, fog: false })); s.scale.set(2.6, .65, 1); s.renderOrder = 5; return s;
}
function pvRefrescar(forzar) {
  if (!jugando) { for (const [, s] of carteles) escena.remove(s.o); carteles.clear(); return; }
  const m = mapa.portalesV || {}, vistos = new Set();
  for (const k in m) { const i = +k; if (mundo[i] !== B.PORTAL_V) { delete m[k]; continue; } vistos.add(i);
    const y = Math.floor(i / PISO()), r = i % PISO(), z = Math.floor(r / SX), x = r % SX;
    let s = carteles.get(i); if (s && s.k !== m[k]) { escena.remove(s.o); s = null; }
    if (!s) { s = { k: m[k], o: cartelSprite(m[k]) }; carteles.set(i, s); escena.add(s.o); }
    let alto = mundo[i + PISO()] === B.PORTAL_V ? 2 : 1; while (alto < 5 && y + alto < SY && mundo[i + PISO() * alto]) alto++; s.o.position.set(x + .5, y + alto + .5, z + .5);
    s.o.visible = Math.hypot(x - J.x, z - J.z) < 40; }
  for (const [i, s] of carteles) if (!vistos.has(i)) { escena.remove(s.o); carteles.delete(i); }
}

// ═════════ VIAJAR ═════════
const enLinea = () => { try { return !!(MP && MP.sala); } catch (e) { return false; } };
const tipoDe = k => k === 'abismo' ? 'abismo' : k === 'confin' ? 'confin' : 'v_' + k;
const claveDe = k => k === 'abismo' ? 'abismo' : k === 'confin' ? 'confin' : 'v_' + k;
let pvEspera = 0, pvFuera = null;
function pvViajar(dest) {
  if (enLinea()) { aviso(TR('pvEnLinea'), 2200); return; }
  const lista = leerLista(), meta = lista.find(m => m.id === mundoId); if (!meta) return;
  const raiz = meta.padre ? lista.find(m => m.id === meta.padre) : meta; if (!raiz) return;
  const llevar = { inv: JSON.parse(JSON.stringify(inv)), barra: barra.slice(), sel, vida, hambre, arm: (stats.armadura || [0, 0, 0, 0]).slice() };
  const aqui = pvFuera || { x: J.x, y: J.y, z: J.z, yaw: J.yaw };
  guardar();
  let destino, volver = dest === 'casa';
  if (volver) destino = raiz.id;
  else {
    if (!meta.padre) { raiz.portalV = aqui; if (dest === 'abismo') raiz.portal = { x: aqui.x - 1.5, y: aqui.y, z: aqui.z }; if (dest === 'confin') raiz.portalE = { x: aqui.x - 1.5, y: aqui.y, z: aqui.z }; }
    const cl = claveDe(dest);
    if (!raiz[cl] || !lista.some(m => m.id === raiz[cl])) { const id = Date.now().toString(36) + 'v';
      lista.unshift({ id, nombre: raiz.nombre + ' · ' + TR('pv_' + dest), num: raiz.num, modo: raiz.modo, tipo: tipoDe(dest), importado: true, padre: raiz.id, tam: 160, semilla: (raiz.semilla + 4242 + DEST.indexOf(dest) * 97) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0, gen: 2 });
      raiz[cl] = id; }
    destino = raiz[cl];
  }
  if (destino === mundoId) return;
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  aviso(TR('pvViajando', { n: TR('pv_' + dest).toUpperCase() }), 1600);
  const fl = $('flash'); fl.style.background = COLOR[dest] || '#7a4aff'; fl.style.opacity = .9;
  try { ruido(.9, .25, 900); son(220, .9, 'sine', .12); setTimeout(() => son(660, .5, 'triangle', .1), 250); } catch (e) {}
  setTimeout(() => {
    for (const [, s] of carteles) escena.remove(s.o); carteles.clear();
    entrarMundo(destino);
    inv = llevar.inv; barra = llevar.barra; sel = llevar.sel; vida = llevar.vida; hambre = llevar.hambre; stats.armadura = llevar.arm;
    if (volver) { const r = leerLista().find(m => m.id === destino) || {}, p = r.portalV || r.portal; if (p) Object.assign(J, { x: p.x, y: p.y + .1, z: p.z, vx: 0, vy: 0, vz: 0 }, p.yaw != null ? { yaw: p.yaw + Math.PI } : {}); }
    else { Object.assign(J, { x: spawn.x, y: spawn.y + .05, z: spawn.z, vx: 0, vy: 0, vz: 0, yaw: spawn.yaw ?? 0, pitch: -.1 });
      const msg = { abismo: 'abismoInicio', confin: 'cfInicio' }[dest] || 'pvl_' + dest; setTimeout(() => aviso(TR(msg), 3500), 600); }
    volando = false; try { pintarVolar(); } catch (e) {}
    pintarBarra(); pintarVida(); hambrePintado = -1; pintarHambre(); rearmarJugador(); guardar(); pvEspera = 1.5; pvFuera = null;
    fl.style.opacity = 0; setTimeout(() => { fl.style.background = ''; }, 500); pvRefrescar(true);
  }, 450);
}
// tocar el portal: viaja (o pide el destino si no tiene)
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) {
    const h = apuntar(dir);
    if (h && h.b === B.PORTAL_V) { const id = barra[sel] || 0;
      if (!id || ITEM[id]) { const d = destinoDe(idx(h.x, h.y, h.z)); if (d) pvViajar(d); else abrirElegir(baseDe(idx(h.x, h.y, h.z))); swing = 1; return true; } }
    return t0(dir); }; }

// ═════════ CADA CUADRO: entrar caminando, carteles, cielos especiales ═════════
{ const p0 = pjFrame; pjFrame = function (dt) { const r = p0.apply(this, arguments);
    try { pvFrame(dt); } catch (e) { console.warn('pv', e && e.message); } return r; }; }
function pvFrame(dt) {
  if (!jugando) { if (carteles.size) pvRefrescar(); cieloEspecial(false); return; }
  pvRefT -= dt; if (pvRefT <= 0) { pvRefT = 1; pvRefrescar(); }
  cieloEspecial(true, dt);
  if (pausado) return;
  pvEspera = Math.max(0, pvEspera - dt);
  const fx = Math.floor(J.x), fz = Math.floor(J.z), pies = idx(fx, Math.floor(J.y + .2), fz), cab = idx(fx, Math.floor(J.y + 1.2), fz);
  const en = dentro(fx, Math.floor(J.y + .2), fz) && (mundo[pies] === B.PORTAL_V || (dentro(fx, Math.floor(J.y + 1.2), fz) && mundo[cab] === B.PORTAL_V));
  if (!en) { pvFuera = { x: J.x, y: J.y, z: J.z, yaw: J.yaw }; pvDentro = false; return; }
  if (pvDentro || pvEspera > 0) return; pvDentro = true;
  const i = mundo[pies] === B.PORTAL_V ? pies : cab, d = destinoDe(i);
  if (d) pvViajar(d); else { aviso(TR('pvSinDestino'), 1500); abrirElegir(baseDe(i)); }
}
let pvDentro = false;

// ─── cielos: aurora, la Tierra vista desde la Luna, nieve que cae, cielo rosa ───
let aurora = null, tierra = null, copos = null, tAur = 0;
function armarAurora() {
  const g = new THREE.Group(), c = document.createElement('canvas'); c.width = 4; c.height = 64; const x = c.getContext('2d'), gr = x.createLinearGradient(0, 64, 0, 0);
  gr.addColorStop(0, 'rgba(60,255,160,0)'); gr.addColorStop(.15, 'rgba(60,255,160,.75)'); gr.addColorStop(.55, 'rgba(90,200,255,.4)'); gr.addColorStop(1, 'rgba(190,90,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 4, 64);
  const tex = new THREE.CanvasTexture(c);
  for (let k = 0; k < 3; k++) { const ge = new THREE.PlaneGeometry(260, 34 + k * 6, 48, 1);
    const m = new THREE.Mesh(ge, new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide, opacity: .8 - k * .18 }));
    m.userData = { k, base: ge.attributes.position.array.slice() }; m.position.set(0, 62 + k * 8, -70 - k * 25); m.rotation.x = .35; g.add(m); }
  escena.add(g); return g;
}
function armarTierra() {
  const c = document.createElement('canvas'); c.width = 64; c.height = 32; const x = c.getContext('2d'); x.fillStyle = '#2a6ad8'; x.fillRect(0, 0, 64, 32);
  for (let k = 0; k < 90; k++) { const a = h3(k, 1, 2, 9), b = h3(k, 3, 4, 9); x.fillStyle = k % 3 ? '#3fae4a' : '#9a7a4a'; x.fillRect(Math.floor(a * 60), 6 + Math.floor(b * 20), 3 + Math.floor(h3(k, 5, 6, 9) * 5), 2 + Math.floor(h3(k, 7, 8, 9) * 3)); }
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, 64, 3); x.fillRect(0, 29, 64, 3); for (let k = 0; k < 40; k++) { x.globalAlpha = .7; x.fillRect(Math.floor(h3(k, 9, 1, 7) * 62), Math.floor(h3(k, 2, 9, 7) * 30), 4 + Math.floor(h3(k, 4, 4, 7) * 6), 1); }
  const t = new THREE.CanvasTexture(c); t.magFilter = THREE.NearestFilter;
  const m = new THREE.Mesh(new THREE.SphereGeometry(13, 24, 16), new THREE.MeshBasicMaterial({ map: t, fog: false }));
  const halo = new THREE.Mesh(new THREE.SphereGeometry(14.2, 24, 16), new THREE.MeshBasicMaterial({ color: 0x6ab8ff, transparent: true, opacity: .25, fog: false, side: THREE.BackSide })); m.add(halo);
  escena.add(m); return m;
}
function armarCopos() {
  const n = 700, pos = new Float32Array(n * 3); for (let i = 0; i < n; i++) { pos[i * 3] = (Math.random() - .5) * 60; pos[i * 3 + 1] = Math.random() * 30; pos[i * 3 + 2] = (Math.random() - .5) * 60; }
  const ge = new THREE.BufferGeometry(); ge.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const p = new THREE.Points(ge, new THREE.PointsMaterial({ color: 0xffffff, size: .18, transparent: true, opacity: .85 })); escena.add(p); return p;
}
function cieloEspecial(on, dt = 0) {
  const t = on ? window.mundoTipo : '';
  if (aurora) aurora.visible = t === 'v_nieve'; if (tierra) tierra.visible = t === 'v_luna'; if (copos) copos.visible = t === 'v_nieve';
  try { cieloObj.nubes.visible = t !== 'v_luna'; if (t === 'v_luna' || t === 'v_nieve') cieloObj.estrellas.material.opacity = t === 'v_luna' ? 1 : Math.max(cieloObj.estrellas.material.opacity, .8); } catch (e) {}
  if (!on) return;
  const c = cam.position;
  if (t === 'v_nieve') { if (!aurora) aurora = armarAurora(); if (!copos) copos = armarCopos(); tAur += dt;
    aurora.position.set(c.x, 0, c.z);
    for (const m of aurora.children) { const a = m.geometry.attributes.position, b = m.userData.base; for (let i = 0; i < a.count; i++) { const x = b[i * 3]; a.array[i * 3 + 2] = b[i * 3 + 2] + Math.sin(x * .03 + tAur * .4 + m.userData.k) * 16 + Math.sin(x * .07 - tAur * .7) * 5; } a.needsUpdate = true; m.material.opacity = (.75 - m.userData.k * .18) * (.75 + Math.sin(tAur * .8 + m.userData.k * 2) * .25); }
    const p = copos.geometry.attributes.position; for (let i = 0; i < p.count; i++) { let y = p.array[i * 3 + 1] - dt * 2.2; if (y < -8) y += 30; p.array[i * 3 + 1] = y; p.array[i * 3] += Math.sin(tAur + i) * dt * .3; } p.needsUpdate = true; copos.position.set(c.x, c.y - 4, c.z); }
  if (t === 'v_luna') try { cieloObj.halo.material.opacity *= .2; } catch (e) {}
  if (t === 'v_luna') { if (!tierra) tierra = armarTierra(); tierra.position.set(c.x + 55, c.y + 70, c.z - 95); tierra.rotation.y += dt * .03; }
}
const CIELOS = { v_nieve: ['#1a2a5a', '#04081e', .62], v_luna: ['#000000', '#000000', .95], v_dulces: ['#ffc4e2', '#ff8ac8', .95], v_flotantes: ['#bfe6ff', '#4aa8f0', .95], v_submarino: [null, null, 0] };
{ const c0 = cielo; cielo = function () { const r = c0.apply(this, arguments); const C = jugando && CIELOS[window.mundoTipo]; if (!C) return r;
    const bajo = !$('bajoAgua').hidden; if (bajo) return r;
    const k = oscuridad(), cl = window.pvClimaLuz || 1, negro = new THREE.Color(window.mundoTipo === 'v_nieve' ? '#02040e' : '#05040c');
    const hz = new THREE.Color(C[0] || '#000').lerp(negro, k * .85).lerp(new THREE.Color('#5a6070'), (1 - cl) * .9), ar = new THREE.Color(C[1] || '#000').lerp(negro, k * .9).lerp(new THREE.Color('#4a5060'), (1 - cl) * .8);
    if (C[0]) { render.setClearColor(hz); escena.fog.color.copy(hz); U.uNiebla.value.copy(hz);
      try { domo.material.uniforms.uArriba.value.copy(ar); domo.material.uniforms.uHorizonte.value.copy(hz); } catch (e) {} }
    else if (cl < 1) { const g = escena.fog.color.clone().lerp(new THREE.Color('#5a6070'), (1 - cl) * .9); render.setClearColor(g); escena.fog.color.copy(g); U.uNiebla.value.copy(g); try { domo.material.uniforms.uArriba.value.lerp(new THREE.Color('#4a5060'), (1 - cl) * .8); domo.material.uniforms.uHorizonte.value.copy(g); } catch (e) {} }
    const piso = C[2] * (1 - k * .72) * cl; U.uDia.value = Math.max(U.uDia.value * cl, piso); hemi.intensity = Math.max(hemi.intensity * cl, piso * .7); sol.intensity = Math.max(sol.intensity * cl, piso * .5);
    if (window.pvNiebla) { escena.fog.near = Math.min(escena.fog.near, 2); escena.fog.far = Math.min(escena.fog.far, window.pvNiebla); U.uCerca.value = escena.fog.near; U.uLejos.value = escena.fog.far; }
    if (window.mundoTipo === 'v_luna' || window.mundoTipo === 'v_nieve') try { cieloObj.estrellas.material.opacity = 1; } catch (e) {}
    if (window.mundoTipo === 'v_luna') { escena.fog.near = 60; escena.fog.far = 150; U.uCerca.value = 60; U.uLejos.value = 150; }
    return r; }; }

// ═════════ AL ENTRAR: gravedad de la Luna, sin monstruos, peces en el mundo submarino ═════════
{ const e0 = entrarMundo; entrarMundo = function (id) { const r = e0.apply(this, arguments);
    const t = window.mundoTipo || '';
    if (t === 'v_luna') { REG.grav = .38; REG.salto = 2.6; REG.caida = false; }
    if (t.startsWith('v_')) { REG.hora = creativo() ? (t === 'v_nieve' || t === 'v_submarino' ? 'normal' : 'dia') : 'normal'; REG.monstruos = creativo() ? 0 : 1; }
    pvEspera = 1.5; pvRefT = 0;
    return r; }; }
{ const a0 = aparecerMonstruos; aparecerMonstruos = function () { if ((window.mundoTipo || '').startsWith('v_')) return; return a0.apply(this, arguments); }; }
{ const a0 = aparecerNadadores; aparecerNadadores = function () { if (window.mundoTipo === 'v_submarino' || window.mundoTipo === 'v_flotantes') { const t = window.mundoTipo; window.mundoTipo = ''; try { return a0.apply(this, arguments); } finally { window.mundoTipo = t; } } return a0.apply(this, arguments); }; }
// en la lista de mundos se ve a qué mundo de viaje corresponde cada uno
{ const p0 = pintarMundos; pintarMundos = function () { const r = p0.apply(this, arguments); const l = leerLista();
    for (const fila of document.querySelectorAll('#listaMundos .mundoFila')) { const b = fila.querySelector('[data-entrar]'), w = b && l.find(x => x.id === b.dataset.entrar), info = fila.querySelector('.info');
      if (!w || !info || !w.padre || info.dataset.pv) continue; info.dataset.pv = 1; const k = (w.tipo || '').replace(/^v_/, ''); const tn = info.firstChild;
      if (tn && tn.nodeType === 3 && !tn.textContent.includes(TR('pv_' + k))) tn.textContent = tn.textContent.trim() + ' · ' + TR('pv_' + k); }
    return r; }; }

// ═════════ GENERACIÓN DE LOS MUNDOS DE VIAJE ═════════
{ const p0 = prepararMundo; prepararMundo = function (S, ej) { const t = window.mundoTipo || '';
    if (!t.startsWith('v_')) return p0.apply(this, arguments);
    pvGenerando = true;
    try { generarViaje(t.slice(2), S); } catch (e) { console.error(e); } finally { pvGenerando = false; }
    diffs = new Map(); spawnPropio = false; }; }
function generarViaje(k, S) {
  semilla = S; mundo = new Uint16Array(N); ruinas = []; aldeas = []; ejemploFaro = null; animalesIniciales = []; biomaDe = () => 0;
  try { decor = []; ruinasMar = []; colmenasGen = []; huevosGen = []; cofresTesoro = new Map(); } catch (e) {}
  const put = (x, y, z, t) => { if (dentro(x, y, z)) mundo[idx(x, y, z)] = t; }, at = (x, y, z) => dentro(x, y, z) ? mundo[idx(x, y, z)] : 0;
  const R = (a, b, c) => h3(a, b, c, S + 777), cx = Math.floor(SX / 2), cz = Math.floor(SZ / 2);
  const H = new Int16Array(SX * SZ);
  const sup = (x, z) => { for (let y = SY - 1; y > 0; y--) if (at(x, y, z)) return y; return 0; };
  const animal = (t, n, ok) => { for (let g = 0, p = 0; g < 400 && p < n; g++) { const x = 4 + Math.floor(R(g, 91, t.length) * (SX - 8)), z = 4 + Math.floor(R(g, 92, t.length) * (SZ - 8)), y = sup(x, z);
    if (y < 2 || at(x, y + 1, z) || at(x, y + 2, z) || (ok && !ok(at(x, y, z), y))) continue; animalesIniciales.push([t, x + .5, y + 1, z + .5]); p++; } };
  // plaza de llegada con el portal de vuelta (atrás de donde apareces)
  const plaza = (y, piso, marco, luz, aplanar = true) => {
    if (aplanar) for (let x = cx - 16; x <= cx + 16; x++) for (let z = cz - 16; z <= cz + 16; z++) { const d = Math.max(Math.abs(x - cx), Math.abs(z - cz - 1)), lim = y + Math.max(0, Math.round((d - 6) * .9));
      if (d > 6 && lim > y + 9) continue; for (let k = lim + 1; k < Math.min(SY, lim + 30); k++) { const q = at(x, k, z); if (q && q !== B.AGUA) put(x, k, z, B.AIRE); else if (!q && k > lim + 12) break; } }
    for (let x = cx - 4; x <= cx + 4; x++) for (let z = cz - 4; z <= cz + 6; z++) { put(x, y, z, piso); for (let k = 1; k < 7; k++) put(x, y + k, z, B.AIRE); for (let k = y - 1; k > Math.max(0, y - 4); k--) if (!at(x, k, z)) put(x, k, z, piso); }
    const pz = cz + 5; for (let k = 1; k <= 3; k++) { put(cx - 1, y + k, pz, marco); put(cx + 1, y + k, pz, marco); } put(cx, y + 3, pz, marco);
    put(cx, y + 1, pz, B.PORTAL_V); put(cx, y + 2, pz, B.PORTAL_V);
    if (luz) { put(cx - 3, y + 1, pz, luz); put(cx + 3, y + 1, pz, luz); }
    mapa.portalesV = mapa.portalesV || {}; if (!mapa.portalesV[idx(cx, y + 1, pz)]) mapa.portalesV[idx(cx, y + 1, pz)] = 'casa'; mapa.pvVuelta = idx(cx, y + 1, pz);
    spawn = { x: cx + .5, y: y + 1, z: cz + .5, yaw: 0 };
  };
  const domo = (x0, y0, z0, r, vidrio, piso, luz) => { for (let x = -r; x <= r; x++) for (let y = 0; y <= r; y++) for (let z = -r; z <= r; z++) { const d = Math.hypot(x, y, z);
      if (d <= r + .5) put(x0 + x, y0 + y, z0 + z, d > r - .5 ? vidrio : y === 0 ? piso : B.AIRE); }
    if (luz) { put(x0, y0 + 1, z0, luz); } };

  if (k === 'nieve') {
    for (let x = 0; x < SX; x++) for (let z = 0; z < SZ; z++) {
      const n = fbm2(x / 40, z / 40, S), m = Math.max(0, vn2(x / 22, z / 22, S + 1) - .55) * 2.4, lago = vn2(x / 18, z / 18, S + 2);
      let h = Math.round(SEA + 1 + n * 8 + m * m * 24); if (lago > .68) h = Math.min(h, SEA - 1 - Math.round((lago - .68) * 18));
      h = Math.max(3, Math.min(SY - 5, h)); H[x + SX * z] = h;
      for (let y = 0; y <= Math.max(h, SEA); y++) put(x, y, z, y === 0 ? B.ROCA : y <= h ? (y === h ? (h >= SEA + 16 ? B.HIELO_C : B.NIEVE) : y > h - 3 ? B.NIEVE : B.PIEDRA) : y === SEA ? B.HIELO : B.AGUA);
    }
    // picos de hielo
    for (let g = 0, n = 0; g < 300 && n < 26; g++) { const x = 6 + Math.floor(R(g, 1, 1) * (SX - 12)), z = 6 + Math.floor(R(g, 2, 1) * (SZ - 12)), h = H[x + SX * z]; if (h <= SEA || Math.hypot(x - cx, z - cz) < 14) continue; n++;
      const alto = 6 + Math.floor(R(g, 3, 1) * 12), rr = 1.2 + R(g, 4, 1) * 1.4; for (let y = 0; y <= alto; y++) { const r = rr * (1 - y / alto) + .35; for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) if (Math.hypot(a, b) <= r) put(x + a, h + y, z + b, y % 5 === 2 || R(x + a, y, z + b) < .3 ? B.HIELO_C : B.HIELO_AZUL); } }
    // pinos nevados
    for (let g = 0, n = 0; g < 900 && n < 70; g++) { const x = 4 + Math.floor(R(g, 11, 1) * (SX - 8)), z = 4 + Math.floor(R(g, 12, 1) * (SZ - 8)), h = H[x + SX * z]; if (h <= SEA || at(x, h, z) !== B.NIEVE || at(x, h + 1, z) || Math.hypot(x - cx, z - cz) < 9) continue; n++;
      const alto = 5 + Math.floor(R(g, 13, 1) * 4); for (let y = 1; y <= alto; y++) put(x, h + y, z, B.TRONCO);
      for (let y = 2; y <= alto + 1; y++) { const r = Math.max(0, Math.round((alto + 1 - y) / 2.2)); for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) if (Math.abs(a) + Math.abs(b) <= r + (y % 2) && !at(x + a, h + y, z + b)) put(x + a, h + y, z + b, B.HOJAS_PINO); }
      put(x, h + alto + 2, z, B.NIEVE); }
    for (let x = 1; x < SX - 1; x++) for (let z = 1; z < SZ - 1; z++) { const h = H[x + SX * z]; if (h > SEA && at(x, h, z) === B.NIEVE && !at(x, h + 1, z) && R(x, 21, z) < .02) put(x, h + 1, z, B.CRISTAL_HIELO); }
    // un iglú cerca de la llegada
    { const ix = cx + 12, iz = cz - 8, h = H[ix + SX * iz]; if (h > SEA) { for (let x = -3; x <= 3; x++) for (let y = 0; y <= 3; y++) for (let z = -3; z <= 3; z++) { const d = Math.hypot(x, y * 1.1, z); if (d <= 3.4) put(ix + x, h + 1 + y, iz + z, d > 2.5 ? B.LADR_NIEVE : B.AIRE); } put(ix, h + 1, iz + 3, B.AIRE); put(ix, h + 2, iz + 3, B.AIRE); put(ix, h + 1, iz, B.LINTERNA); } }
    plaza(Math.max(SEA + 1, H[cx + SX * cz]), B.LADR_HIELO, B.HIELO_AZUL, B.LINTERNA);
    animal('pinguino', 8, (t, y) => t === B.NIEVE || t === B.HIELO); animal('osoPolar', 2, t => t === B.NIEVE); animal('conejo', 3, t => t === B.NIEVE);
  }

  if (k === 'submarino') {
    const islas = [{ x: cx, z: cz, r: 8 }]; for (let g = 0; g < 200 && islas.length < 7; g++) { const x = 14 + Math.floor(R(g, 31, 2) * (SX - 28)), z = 14 + Math.floor(R(g, 32, 2) * (SZ - 28)), r = 4 + Math.floor(R(g, 33, 2) * 4); if (islas.every(i => Math.hypot(x - i.x, z - i.z) > i.r + r + 14)) islas.push({ x, z, r }); }
    for (let x = 0; x < SX; x++) for (let z = 0; z < SZ; z++) {
      let h = Math.round(4 + fbm2(x / 30, z / 30, S) * 5 + vn2(x / 12, z / 12, S + 1) * 3);
      for (const I of islas) { const d = Math.hypot(x - I.x, z - I.z) + vn2(x / 4, z / 4, S + 3) * 1.5; if (d < I.r * 1.8) h = Math.max(h, Math.round(SEA + 1 - (d - I.r * .7) * 1.4)); }
      h = Math.max(2, Math.min(SEA + 3, h)); H[x + SX * z] = h;
      const fondo = vn2(x / 9, z / 9, S + 4);
      for (let y = 0; y <= Math.max(h, SEA); y++) put(x, y, z, y === 0 ? B.ROCA : y <= h ? (y >= h - 2 ? (h > SEA + 1 && y === h ? B.PASTO : h > SEA + 1 && y > h - 2 ? B.TIERRA : fondo > .7 ? B.GRAVA : fondo < .25 ? B.ARCILLA : B.ARENA) : B.PIEDRA) : B.AGUA);
    }
    // palmeras en las islas
    for (const I of islas) for (let g = 0; g < 3; g++) { const a = R(I.x, g, 41) * 6.283, x = Math.round(I.x + Math.cos(a) * I.r * .4), z = Math.round(I.z + Math.sin(a) * I.r * .4), h = H[x + SX * z]; if (h <= SEA || Math.hypot(x - cx, z - cz) < 5) continue;
      const alto = 5 + g, dx = Math.cos(a) > 0 ? 1 : -1; for (let y = 1; y <= alto; y++) put(x + (y > alto - 2 ? dx : 0), h + y, z, B.TRONCO_ABEDUL);
      const tx = x + dx, ty = h + alto + 1; put(tx, ty, z, B.HOJAS_SELVA); for (const [a2, b2] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let l = 1; l <= 3; l++) put(tx + a2 * l, ty - (l === 3 ? 1 : 0), z + b2 * l, B.HOJAS_SELVA); }
    try { generarMar(S); } catch (e) { console.warn(e); }
    // más arrecifes
    for (let x = 1; x < SX - 1; x++) for (let z = 1; z < SZ - 1; z++) { const h = H[x + SX * z], prof = SEA - h; if (prof < 2 || at(x, h + 1, z) !== B.AGUA) continue; const v = R(x, 51, z);
      if (vn2(x / 14, z / 14, S + 6) > .55 && v < .5) { const c = B.CORAL + Math.floor(R(x, 52, z) * 3); put(x, h, z, c); if (v < .08 && prof > 4) for (let y = 1; y <= 1 + Math.floor(R(x, 53, z) * 3); y++) put(x, h + y, z, c); else if (v < .4) decor.push([x, h + 1, z, 'abanico' + Math.floor(R(x, 54, z) * 3), 1]); }
      else if (v < .04 && prof > 3) decor.push([x, h + 1, z, 'alga', Math.min(prof - 1, 2 + Math.floor(R(x, 55, z) * 4))]);
      if (v > .997) put(x, h, z, B.PERLA_LUZ); }
    // casa bajo el agua (cúpula de vidrio con aire adentro)
    { let mejor = null; for (let g = 0; g < 300; g++) { const x = cx + 14 + Math.floor(R(g, 61, 3) * 30) - 15, z = cz - 22 + Math.floor(R(g, 62, 3) * 10); if (!dentro(x, 1, z)) continue; const h = H[x + SX * z]; if (SEA - h >= 8 && (!mejor || Math.abs(x - cx) + Math.abs(z - cz) < mejor.d)) mejor = { x, z, h, d: Math.abs(x - cx) + Math.abs(z - cz) }; }
      if (mejor) { const y0 = mejor.h + 1; domo(mejor.x, y0, mejor.z, 5, B.VIDRIO, B.MADERA, B.PERLA_LUZ); for (let k = 1; k <= 2; k++) put(mejor.x, y0 + k, mejor.z + 5, B.AIRE);
        put(mejor.x + 3, y0 + 1, mejor.z, B.COFRE); put(mejor.x - 3, y0 + 1, mejor.z, B.PERLA_LUZ); put(mejor.x - 2, y0 + 1, mejor.z - 2, B.BARRIL || B.MADERA); } }
    plaza(SEA + 1, B.MADERA, B.PERLA_LUZ, B.ANTORCHA);
    for (let z = cz - 4; z >= cz - 16; z--) for (const x of [cx - 1, cx, cx + 1]) { if (at(x, SEA + 1, z)) continue; put(x, SEA + 1, z, B.MADERA); if (x !== cx && z % 4 === 0) { put(x, SEA + 2, z, B.VALLA); put(x, SEA + 3, z, B.ANTORCHA); } for (let y = SEA; y > H[x + SX * z]; y--) if ((x === cx - 1 || x === cx + 1) && z % 4 === 0) put(x, y, z, B.TRONCO); }
    animal('tortuga', 4, t => t === B.ARENA || t === B.PASTO);
  }

  if (k === 'flotantes') {
    for (let x = 0; x < SX; x++) for (let z = 0; z < SZ; z++) { put(x, 0, z, B.ROCA); put(x, 1, z, B.NUBE); if (vn2(x / 7, z / 7, S + 1) > .55) put(x, 2, z, B.NUBE); }
    const islas = [{ x: cx, z: cz + 2, y: 26, r: 14 }];
    for (let g = 0; g < 600 && islas.length < 18; g++) { const r = 5 + Math.floor(R(g, 1, 3) * 7), x = r + 4 + Math.floor(R(g, 2, 3) * (SX - 2 * r - 8)), z = r + 4 + Math.floor(R(g, 3, 3) * (SZ - 2 * r - 8)), y = 14 + Math.floor(R(g, 4, 3) * 24);
      if (islas.every(i => Math.hypot(x - i.x, z - i.z) > i.r + r + 5)) islas.push({ x, z, y, r }); }
    const arboles = [[B.TRONCO, B.HOJAS], [B.TRONCO_ABEDUL, B.HOJAS_ABEDUL], [B.TRONCO_CEREZO, B.HOJAS_CEREZO]];
    islas.forEach((I, n) => {
      for (let x = I.x - I.r - 2; x <= I.x + I.r + 2; x++) for (let z = I.z - I.r - 2; z <= I.z + I.r + 2; z++) { const d = Math.hypot(x - I.x, z - I.z) + vn2(x / 4, z / 4, S + 7 + n) * 2.2 - 1; if (d > I.r) continue;
        const top = I.y + Math.round(vn2(x / 6, z / 6, S + 8) * 2 - (n ? 0 : 1)), hondo = Math.max(2, Math.round((I.r - d) * 1.15 + 1 + vn2(x / 3, z / 3, S + 9) * 3));
        for (let y = top - hondo; y <= top; y++) { const q = R(x, y, z); put(x, y, z, y === top ? B.PASTO : y > top - 3 ? B.TIERRA : q < .03 ? B.CARBON_M : q < .045 ? B.HIERRO_M : B.PIEDRA); }
        if (R(x, 5, z) < .1) for (let k = 1; k <= 1 + Math.floor(R(x, 6, z) * 4); k++) if (!at(x, top - hondo - k, z)) put(x, top - hondo - k, z, B.ENREDADERA);
        const v = R(x, 7, z); if (v < .06) put(x, top + 1, z, v < .02 ? B.FLOR_R : v < .04 ? B.FLOR_A : B.PASTO_ALTO); }
      // árboles
      const [tr, ho] = arboles[n % 3]; for (let t = 0; t < Math.max(1, Math.floor(I.r / 4)); t++) { const a = R(n, t, 11) * 6.283, x = Math.round(I.x + Math.cos(a) * I.r * .45), z = Math.round(I.z + Math.sin(a) * I.r * .45), y = sup(x, z);
        if (at(x, y, z) !== B.PASTO || (n === 0 && Math.hypot(x - cx, z - cz) < 6)) continue; const alto = 4 + Math.floor(R(x, 12, z) * 2); for (let k = 1; k <= alto; k++) put(x, y + k, z, tr);
        for (let a2 = -2; a2 <= 2; a2++) for (let b = -1; b <= 2; b++) for (let c = -2; c <= 2; c++) if (Math.abs(a2) + Math.abs(c) + Math.max(0, b) * 1.4 < 3.6 && !at(x + a2, y + alto + b, z + c)) put(x + a2, y + alto + b, z + c, ho); }
      // cascada: un charquito arriba y agua que cae hasta las nubes
      if (n % 2 === 1 || n === 0) { const a = R(n, 21, 3) * 6.283; let x = Math.round(I.x + Math.cos(a) * (I.r - 1)), z = Math.round(I.z + Math.sin(a) * (I.r - 1));
        for (let s = 0; s < 6 && at(x, sup(x, z), z) === B.PASTO; s++) { x += Math.round(Math.cos(a)); z += Math.round(Math.sin(a)); }
        const xb = x - Math.round(Math.cos(a)), zb = z - Math.round(Math.sin(a)), yt = sup(xb, zb);
        if (yt > 4 && !at(x, yt, z)) { put(xb, yt, zb, B.AGUA); put(xb - Math.round(Math.cos(a)), yt, zb - Math.round(Math.sin(a)), B.AGUA); for (let y = yt; y >= 3; y--) { if (at(x, y, z) && at(x, y, z) !== B.NUBE) break; put(x, y, z, B.AGUA); } } }
    });
    // nubes sueltas
    for (let g = 0; g < 45; g++) { const x = Math.floor(R(g, 31, 4) * SX), z = Math.floor(R(g, 32, 4) * SZ), y = 8 + Math.floor(R(g, 33, 4) * 36), rx = 3 + R(g, 34, 4) * 4, rz = 2 + R(g, 35, 4) * 3;
      for (let a = -7; a <= 7; a++) for (let c = -7; c <= 7; c++) for (let b = -1; b <= 1; b++) if ((a / rx) ** 2 + (c / rz) ** 2 + (b / 1.2) ** 2 < 1 && !at(x + a, y + b, z + c)) put(x + a, y + b, z + c, B.NUBE); }
    plaza(sup(cx, cz), B.MADERA, B.TRONCO_ABEDUL, B.LINTERNA, false);
    animal('oveja', 3, t => t === B.PASTO); animal('vaca', 2, t => t === B.PASTO); animal('gallina', 3, t => t === B.PASTO); animal('conejo', 2, t => t === B.PASTO);
  }

  if (k === 'dulces') {
    for (let x = 0; x < SX; x++) for (let z = 0; z < SZ; z++) {
      let h = Math.round(SEA + 2 + fbm2(x / 36, z / 36, S) * 7 + Math.max(0, vn2(x / 14, z / 14, S + 1) - .6) * 18);
      const rio = Math.abs(vn2(x / 48, z / 48, S + 2) - .5) < .045; if (rio) h = SEA;
      h = Math.max(3, Math.min(SY - 6, h)); H[x + SX * z] = h;
      for (let y = 0; y <= h; y++) put(x, y, z, y === 0 ? B.ROCA : rio && y === h ? B.CHOCOLATE : y === h ? B.CREMA : y > h - 4 ? B.BIZCOCHO : B.CHOCOLATE);
    }
    const libre = (x, z, r) => Math.hypot(x - cx, z - cz) > 8 + r;
    // chupetines
    for (let g = 0, n = 0; g < 400 && n < 28; g++) { const x = 5 + Math.floor(R(g, 1, 5) * (SX - 10)), z = 5 + Math.floor(R(g, 2, 5) * (SZ - 10)), h = H[x + SX * z]; if (at(x, h, z) !== B.CREMA || !libre(x, z, 3)) continue; n++;
      const alto = 4 + Math.floor(R(g, 3, 5) * 3), c1 = [B.CARAMELO_R, B.MENTA, B.CARAMELO_V][n % 3], ejeX = n % 2; for (let y = 1; y <= alto; y++) put(x, h + y, z, B.PALO_DULCE);
      for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) { const d = Math.hypot(a, b); if (d <= 2.4) put(x + (ejeX ? a : 0), h + alto + 2 + b, z + (ejeX ? 0 : a), d < 1.2 ? B.CREMA : c1); } }
    // árboles de algodón de azúcar
    for (let g = 0, n = 0; g < 500 && n < 34; g++) { const x = 5 + Math.floor(R(g, 11, 5) * (SX - 10)), z = 5 + Math.floor(R(g, 12, 5) * (SZ - 10)), h = H[x + SX * z]; if (at(x, h, z) !== B.CREMA || at(x, h + 1, z) || !libre(x, z, 3)) continue; n++;
      const alto = 3 + Math.floor(R(g, 13, 5) * 3), m = n % 3 ? B.ALGODON : B.ALGODON_C; for (let y = 1; y <= alto; y++) put(x, h + y, z, B.PALO_DULCE);
      for (let a = -3; a <= 3; a++) for (let b = -2; b <= 3; b++) for (let c = -3; c <= 3; c++) if (Math.hypot(a, b * 1.2, c) < 2.8 && !at(x + a, h + alto + 1 + b, z + c)) put(x + a, h + alto + 1 + b, z + c, m); }
    // gomitas gigantes
    for (let g = 0, n = 0; g < 300 && n < 22; g++) { const x = 5 + Math.floor(R(g, 21, 5) * (SX - 10)), z = 5 + Math.floor(R(g, 22, 5) * (SZ - 10)), h = H[x + SX * z]; if (at(x, h, z) !== B.CREMA || !libre(x, z, 3)) continue; n++;
      const r = 2 + R(g, 23, 5) * 1.5, m = [B.GOMITA_R, B.GOMITA_V, B.GOMITA_A][n % 3]; for (let a = -4; a <= 4; a++) for (let b = 0; b <= 4; b++) for (let c = -4; c <= 4; c++) if (Math.hypot(a, b * 1.15, c) <= r) put(x + a, h + 1 + b, z + c, m); }
    // bastones de caramelo
    for (let g = 0, n = 0; g < 300 && n < 14; g++) { const x = 5 + Math.floor(R(g, 31, 5) * (SX - 10)), z = 5 + Math.floor(R(g, 32, 5) * (SZ - 10)), h = H[x + SX * z]; if (at(x, h, z) !== B.CREMA || !libre(x, z, 2)) continue; n++;
      const alto = 6 + Math.floor(R(g, 33, 5) * 3); for (let y = 1; y <= alto; y++) put(x, h + y, z, y % 2 ? B.CARAMELO_R : B.PALO_DULCE); put(x + 1, h + alto + 1, z, B.CARAMELO_R); put(x + 2, h + alto, z, B.PALO_DULCE); put(x + 2, h + alto - 1, z, B.CARAMELO_R); put(x, h + alto + 1, z, B.PALO_DULCE); }
    // camino de galletas desde la llegada
    { let x = cx, z = cz - 5, d = 0; for (let s = 0; s < 70; s++) { const h = H[x + SX * z]; for (const a of [0, 1]) { const xx = x + (d % 2 ? 0 : a), zz = z + (d % 2 ? a : 0); if (dentro(xx, 1, zz)) { const hh = H[xx + SX * zz]; put(xx, hh, zz, B.GALLETA); for (let y = hh + 1; y < hh + 5; y++) put(xx, y, zz, B.AIRE); } }
      if (s % 9 === 8) d = (d + (R(s, 41, 5) < .5 ? 1 : 3)) % 4; const D = [[0, -1], [1, 0], [0, 1], [-1, 0]][d]; x = Math.max(3, Math.min(SX - 4, x + D[0])); z = Math.max(3, Math.min(SZ - 4, z + D[1])); } }
    plaza(H[cx + SX * cz], B.BIZCOCHO, B.CARAMELO_R, B.ALGODON_C);
    animal('ositoGomita', 9, t => t === B.CREMA || t === B.GALLETA);
  }

  if (k === 'luna') {
    const crateres = []; for (let g = 0; g < 80 && crateres.length < 16; g++) { const r = 4 + R(g, 1, 7) * 9, x = Math.floor(R(g, 2, 7) * SX), z = Math.floor(R(g, 3, 7) * SZ); if (Math.hypot(x - cx, z - cz) < r + 10) continue; crateres.push({ x, z, r }); }
    for (let x = 0; x < SX; x++) for (let z = 0; z < SZ; z++) {
      let h = SEA + fbm2(x / 30, z / 30, S) * 6 + vn2(x / 9, z / 9, S + 1) * 2;
      for (const C of crateres) { const d = Math.hypot(x - C.x, z - C.z) / C.r; if (d < 1) h -= (1 - d * d) * C.r * .45; else if (d < 1.35) h += (1 - Math.abs(d - 1.12) / .23) * 1.6; }
      h = Math.max(3, Math.min(SY - 6, Math.round(h))); H[x + SX * z] = h;
      for (let y = 0; y <= h; y++) put(x, y, z, y === 0 ? B.ROCA : y > h - 2 ? B.POLVO_LUNAR : B.ROCA_LUNAR);
    }
    for (let g = 0; g < 70; g++) { const x = 3 + Math.floor(R(g, 11, 7) * (SX - 6)), z = 3 + Math.floor(R(g, 12, 7) * (SZ - 6)), h = H[x + SX * z]; if (Math.hypot(x - cx, z - cz) < 8) continue; const r = R(g, 13, 7) < .3 ? 1 : 0;
      for (let a = -r; a <= r; a++) for (let b = 0; b <= r; b++) for (let c = -r; c <= r; c++) put(x + a, h + 1 + b, z + c, B.ROCA_LUNAR); }
    crateres.slice(0, 4).forEach((C, n) => { const h = H[C.x + SX * C.z]; if (h < 2) return; for (let k2 = 0; k2 < 6; k2++) { const a = k2 / 6 * 6.283, x = Math.round(C.x + Math.cos(a) * 1.5), z = Math.round(C.z + Math.sin(a) * 1.5), y = sup(x, z); for (let b = 1; b <= 1 + (k2 % 3); b++) put(x, y + b, z, B.AMATISTA); } });
    plaza(Math.max(SEA, H[cx + SX * cz]), B['HORMIGÓN_1'] || B.PIEDRA, B['HORMIGÓN_2'] || B.PIEDRA, B.LINTERNA);
    // base lunar: cúpula de vidrio y una bandera
    { const bx = cx + 11, bz = cz - 2; let y0 = 0; for (let a = -5; a <= 5; a++) for (let c = -5; c <= 5; c++) y0 = Math.max(y0, H[bx + a + SX * (bz + c)] || 0);
      for (let a = -5; a <= 5; a++) for (let c = -5; c <= 5; c++) for (let y = y0; y > y0 - 4; y--) put(bx + a, y, bz + c, B['HORMIGÓN_1'] || B.PIEDRA);
      domo(bx, y0, bz, 4, B.VIDRIO, B['HORMIGÓN_0'] || B.PIEDRA, B.LINTERNA); put(bx - 4, y0 + 1, bz, B.AIRE); put(bx - 4, y0 + 2, bz, B.AIRE); put(bx + 2, y0 + 1, bz + 1, B.COFRE);
      const fx = cx - 9, fz = cz - 7, fy = sup(fx, fz); for (let y = 1; y <= 5; y++) put(fx, fy + y, fz, B.VALLA);
      for (let a = 1; a <= 3; a++) for (let b = 3; b <= 5; b++) put(fx + a, fy + b, fz, b === 4 ? (B['HORMIGÓN_7'] || B.ARENA) : (B['HORMIGÓN_13'] || B.LADRILLO)); }
  }
}

// el portal va primero en el inventario de creativo, y un aviso la primera vez
{ const k = TODOS.indexOf(B.PORTAL_V); if (k > 0) { TODOS.splice(k, 1); TODOS.unshift(B.PORTAL_V); } }
Object.assign(TX.es, { pvNuevo: 'NUEVO: PORTAL DE VIAJE<small>búscalo en el inventario y viaja a otros mundos</small>' });
Object.assign(TX.en, { pvNuevo: 'NEW: TRAVEL PORTAL<small>find it in your inventory and travel to other worlds</small>' });
Object.assign(TX.pt, { pvNuevo: 'NOVO: PORTAL DE VIAGEM<small>procure no inventário e viaje para outros mundos</small>' });
{ const e0 = entrarMundo; entrarMundo = function (id) { const r = e0.apply(this, arguments);
    try { if (creativo() && !window.mundoTipo && !localStorage.getItem('voxPortalVisto')) { localStorage.setItem('voxPortalVisto', '1'); setTimeout(() => aviso(TR('pvNuevo'), 4500), 4000); } } catch (e) {}
    return r; }; }
window.__pv = { viajar: pvViajar, abrirElegir, destinoDe, DEST, refrescar: pvRefrescar };
}
