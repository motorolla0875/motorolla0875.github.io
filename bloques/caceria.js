'use strict';
// ═════════ CACERÍA: salir a cazar a Umbrak en las Tierras Sombrías ═════════
// · Mundo propio (tipo 'caceria'): noche eterna, niebla, árboles muertos, ruinas y antorchas sueltas.
// · Umbrak (diseño propio): bestia de piedra oscura con grietas y ojos violetas. Se esconde en las ruinas,
//   deja huellas que brillan y ruge a lo lejos. La Brújula de caza se calienta cuando estás cerca.
// · Al bajarle la vida huye y se esconde en otra ruina (3 veces) y vuelve más fuerte.
// · Puntos: el daño que le haces + 250 por el golpe final. Tabla de Cazadores (semana y de siempre).
// · Solo, en sala abierta o con amigos (las salas en línea de siempre: el dueño maneja a Umbrak).
// · Es gratis para todos. Los Pro ven su lanza dorada y una estela dorada (solo de adorno: los puntos son iguales).

Object.assign(TX.es, { czBtn: 'Cacería<small>caza a Umbrak en las Tierras Sombrías</small>', czTitulo: 'CACERÍA', czSub: 'Tierras Sombrías · Umbrak',
  czT1: 'Sigue las huellas violetas y escucha sus rugidos.', czT2: 'La Brújula de caza se calienta cuando estás cerca.', czT3: 'La Lanza de luz le hace mucho daño. El arco sirve de lejos.',
  czT4: 'Cuando lo lastimas, huye y se esconde: hasta 3 veces, y vuelve más fuerte.', czT5: 'Sumas puntos con cada golpe. El golpe final vale +250.',
  czSolo: 'Solo', czAbierta: 'Sala abierta<small>se suma cualquiera</small>', czAmigos: 'Con amigos<small>sala privada con código</small>', czUnirse: 'Unirse a una cacería', czCazadores: 'Cazadores',
  czMundo: 'Cacería', czEmpieza: 'LA CACERÍA EMPEZÓ<small>sigue las huellas violetas</small>', czRugido: 'SE OYE UN RUGIDO {d}', czHuyo: '¡UMBRAK HUYÓ A LAS SOMBRAS!<small>sigue sus huellas: volvió más fuerte</small>',
  czVio: '¡UMBRAK TE VIO!', czFin: '¡UMBRAK FUE CAZADO!', czGolpe: 'Golpe final: {n} (+250)', czTusPts: 'Tus puntos: {n}', czOtra: 'Otra cacería', czSalir: 'Salir', czEsperaDueno: 'El dueño de la sala puede empezar otra',
  czFrio: 'Frío', czFresco: 'Lejos', czTibio: 'Tibio', czCaliente: 'Caliente', czMuyCerca: '¡Muy cerca!', czBrujula: 'Brújula de caza', czEscondido: 'escondido', czCazado: '¡cazado!', czCazando: '¡peleando!', czHuyendo: 'huyendo',
  czFase: 'Fase {n} de 4', czPts: 'Puntos: {n}', czSala: 'Sala {c}', czSalaLista: 'SALA LISTA: {c}<small>tus amigos entran con ese código desde "En línea"</small>', czSeFue: 'LA CACERÍA TERMINÓ<small>el dueño de la sala se fue</small>',
  czBadge: 'CACERÍA', recCaceria: 'Cazadores', recPts: '{n} puntos', czNorte: 'al norte', czSur: 'al sur', czEste: 'al este', czOeste: 'al oeste', czCerca: 'muy cerca' });
Object.assign(TX.en, { czBtn: 'Hunt<small>hunt Umbrak in the Shadowlands</small>', czTitulo: 'HUNT', czSub: 'Shadowlands · Umbrak',
  czT1: 'Follow the violet footprints and listen for its roars.', czT2: 'The Hunting Compass gets warmer when you are close.', czT3: 'The Light Spear deals heavy damage. The bow works from afar.',
  czT4: 'When you hurt it, it flees and hides: up to 3 times, and it comes back stronger.', czT5: 'Every hit gives you points. The final blow is worth +250.',
  czSolo: 'Solo', czAbierta: 'Open room<small>anyone can join</small>', czAmigos: 'With friends<small>private room with a code</small>', czUnirse: 'Join a hunt', czCazadores: 'Hunters',
  czMundo: 'Hunt', czEmpieza: 'THE HUNT HAS BEGUN<small>follow the violet footprints</small>', czRugido: 'A ROAR ECHOES {d}', czHuyo: 'UMBRAK FLED INTO THE SHADOWS!<small>follow its tracks: it came back stronger</small>',
  czVio: 'UMBRAK SAW YOU!', czFin: 'UMBRAK HAS BEEN HUNTED!', czGolpe: 'Final blow: {n} (+250)', czTusPts: 'Your points: {n}', czOtra: 'Another hunt', czSalir: 'Leave', czEsperaDueno: 'The room owner can start another one',
  czFrio: 'Cold', czFresco: 'Far', czTibio: 'Warm', czCaliente: 'Hot', czMuyCerca: 'Very close!', czBrujula: 'Hunting Compass', czEscondido: 'hiding', czCazado: 'hunted!', czCazando: 'fighting!', czHuyendo: 'fleeing',
  czFase: 'Phase {n} of 4', czPts: 'Points: {n}', czSala: 'Room {c}', czSalaLista: 'ROOM READY: {c}<small>your friends join with that code from "Online"</small>', czSeFue: 'THE HUNT IS OVER<small>the room owner left</small>',
  czBadge: 'HUNT', recCaceria: 'Hunters', recPts: '{n} points', czNorte: 'to the north', czSur: 'to the south', czEste: 'to the east', czOeste: 'to the west', czCerca: 'very close' });
Object.assign(TX.pt, { czBtn: 'Caçada<small>cace o Umbrak nas Terras Sombrias</small>', czTitulo: 'CAÇADA', czSub: 'Terras Sombrias · Umbrak',
  czT1: 'Siga as pegadas violetas e escute os rugidos.', czT2: 'A Bússola de caça esquenta quando você está perto.', czT3: 'A Lança de luz causa muito dano. O arco serve de longe.',
  czT4: 'Quando você o fere, ele foge e se esconde: até 3 vezes, e volta mais forte.', czT5: 'Cada golpe dá pontos. O golpe final vale +250.',
  czSolo: 'Sozinho', czAbierta: 'Sala aberta<small>qualquer um entra</small>', czAmigos: 'Com amigos<small>sala privada com código</small>', czUnirse: 'Entrar numa caçada', czCazadores: 'Caçadores',
  czMundo: 'Caçada', czEmpieza: 'A CAÇADA COMEÇOU<small>siga as pegadas violetas</small>', czRugido: 'UM RUGIDO ECOA {d}', czHuyo: 'O UMBRAK FUGIU PARA AS SOMBRAS!<small>siga as pegadas: ele voltou mais forte</small>',
  czVio: 'O UMBRAK TE VIU!', czFin: 'O UMBRAK FOI CAÇADO!', czGolpe: 'Golpe final: {n} (+250)', czTusPts: 'Seus pontos: {n}', czOtra: 'Outra caçada', czSalir: 'Sair', czEsperaDueno: 'O dono da sala pode começar outra',
  czFrio: 'Frio', czFresco: 'Longe', czTibio: 'Morno', czCaliente: 'Quente', czMuyCerca: 'Muito perto!', czBrujula: 'Bússola de caça', czEscondido: 'escondido', czCazado: 'caçado!', czCazando: 'lutando!', czHuyendo: 'fugindo',
  czFase: 'Fase {n} de 4', czPts: 'Pontos: {n}', czSala: 'Sala {c}', czSalaLista: 'SALA PRONTA: {c}<small>seus amigos entram com esse código em "Online"</small>', czSeFue: 'A CAÇADA TERMINOU<small>o dono da sala saiu</small>',
  czBadge: 'CAÇADA', recCaceria: 'Caçadores', recPts: '{n} pontos', czNorte: 'ao norte', czSur: 'ao sul', czEste: 'ao leste', czOeste: 'ao oeste', czCerca: 'bem perto' });
try { NOM_CRIA.es.umbrak = 'Umbrak'; NOM_CRIA.en.umbrak = 'Umbrak'; NOM_CRIA.pt.umbrak = 'Umbrak'; } catch (e) {}

const CZ_VIOLETA = '#b46bff', CZ_PTS_FINAL = 250, CZ_VIDA = 360;
const czEs = () => window.mundoTipo === 'caceria';
const czYo = () => { try { return __mp.nombre(); } catch (e) { return 'Yo'; } };
const czEnLinea = () => { try { return !!MP.sala; } catch (e) { return false; } };
const czInvitado = () => { try { return !!MP.invitado; } catch (e) { return false; } };
const czHost = () => !czInvitado();
const escCZ = s => String(s == null ? '' : s).replace(/[<>&"]/g, '');

// ═════════ LANZA DE LUZ (objeto nuevo) ═════════
I.LANZA = 350;
const CZ_TILE = 255;
function pintarLanza() {
  const oro = typeof esPro === 'function' && esPro();
  const asta = oro ? ['#ffd23a', '#c8901a'] : ['#e8e0ff', '#9a86d8'], punta = oro ? ['#fff6c0', '#ffd23a', '#c8841a'] : ['#ffffff', '#d8b8ff', CZ_VIOLETA];
  ag.clearRect((CZ_TILE % 8) * 16, Math.floor(CZ_TILE / 8) * 16, 16, 16);
  dibujarTile(CZ_TILE, (x, y) => {
    const dd = Math.abs(x - 12) + Math.abs(y - 3);
    if (dd <= 1) return punta[0]; if (dd <= 2) return punta[1]; if (dd === 3 && x >= 10 && y <= 5) return punta[2];
    if ((x === 9 && y === 5) || (x === 10 && y === 6) || (x === 8 && y === 4)) return oro ? '#b8860b' : '#6a4ab8';   // guarda
    if (x >= 1 && x <= 9 && (y === 15 - x || y === 16 - x)) return (x + y) % 3 ? asta[0] : asta[1];
    return null; });
  try { atlasTex.needsUpdate = true; } catch (e) {}
  try { delete tileURLs[CZ_TILE]; } catch (e) {} try { delete iconos[I.LANZA]; } catch (e) {}
  if (ITEM[I.LANZA]) ITEM[I.LANZA].nombre = oro ? 'Lanza de luz dorada' : 'Lanza de luz';
  try { manoId = -9; pintarBarra(); } catch (e) {}
}
item(I.LANZA, 'Lanza de luz', CZ_TILE, { espada: true });
Object.assign(NOMBRES.en, { 'Lanza de luz': 'Light Spear', 'Lanza de luz dorada': 'Golden Light Spear' });
Object.assign(NOMBRES.pt, { 'Lanza de luz': 'Lança de luz', 'Lanza de luz dorada': 'Lança de luz dourada' });
pintarLanza();
if (!TODOS.includes(I.LANZA)) TODOS.push(I.LANZA);
{ const a0 = window.alCambiarPro; window.alCambiarPro = function () { try { if (a0) a0.apply(this, arguments); } finally { pintarLanza(); } }; }

// ═════════ UMBRAK (diseño propio) ═════════
const czM = c => matA(parseInt(c.slice(1), 16));
const czLuz = (c, niebla = true) => new THREE.MeshBasicMaterial({ color: parseInt(c.slice(1), 16), fog: niebla });
function armarUmbrak(g) {
  const pi = czM('#2b2733'), pi2 = czM('#3b3646'), pi3 = czM('#1d1a24'), gri = czLuz('#9b4dff'), ojo = czLuz('#e2b8ff', false), cri = czLuz('#c58cff');
  caja(g, 1.7, 1.15, 1.5, 0, 1.55, 0, pi); caja(g, 1.5, .5, 1.3, 0, 2.2, -.1, pi2);                   // lomo
  caja(g, 1.2, .35, 1.1, 0, .98, 0, pi3);                                                             // panza
  for (const [x, y, z, w, h] of [[-.5, 1.6, .76, .06, .7], [.3, 1.45, .76, .06, .5], [0, 1.9, .76, .6, .05], [-.86, 1.5, .1, .05, .6], [.86, 1.7, -.2, .05, .5]]) caja(g, w, h, .04, x, y, z, gri);   // grietas
  // cabeza baja hacia adelante, con mandíbula y ojos que brillan en la oscuridad
  caja(g, .95, .78, .85, 0, 1.75, 1.05, pi2); caja(g, .85, .22, .5, 0, 1.3, 1.25, pi3);
  for (const s of [-1, 1]) { caja(g, .24, .1, .05, s * .24, 1.86, 1.49, ojo); caja(g, .1, .06, .05, s * .24, 1.95, 1.49, gri); }
  caja(g, .5, .05, .04, 0, 1.42, 1.5, gri);
  for (const s of [-1, 1]) { const c = caja(g, .14, .5, .14, s * .36, 2.2, .9, pi3); c.rotation.z = s * -.5; }   // cuernos de piedra
  // cristales en el lomo
  [[0, 2.6, .3, .32], [0, 2.7, -.25, .4], [.35, 2.55, -.55, .26], [-.35, 2.55, -.55, .26], [0, 2.5, -.85, .22]].forEach(([x, y, z, s]) => { const c = caja(g, s * .6, s * 1.4, s * .6, x, y, z, cri); c.rotation.set(.3, .6, .2); });
  // brazos largos adelante, patas cortas atrás
  const brazos = [-1, 1].map(s => pata(g, .42, 1.1, .46, s * .95, 1.85, .6, pi));
  for (const b of brazos) { caja(b, .5, .2, .55, 0, -1.08, .08, pi3); caja(b, .05, .5, .05, 0, -.5, .24, gri); }
  const patas = [-1, 1].map(s => pata(g, .4, .78, .42, s * .55, .82, -.55, pi2));
  return [brazos[0], patas[1], brazos[1], patas[0]];
}
PROY.sombra = { vel: 13, g: 0, dano: 3 };
FORMA_PROY.sombra = () => { const g = new THREE.Group(); caja(g, .42, .42, .42, 0, 0, 0, czLuz('#2a1640')); caja(g, .56, .14, .14, 0, 0, 0, czLuz(CZ_VIOLETA, false)); caja(g, .14, .56, .14, 0, 0, 0, czLuz(CZ_VIOLETA, false)); return g; };
TIPOS.umbrak = { vida: 1e6, an: 1.0, al: 2.5, vel: 2.4, peso: 1, color: '#2b2733', voz: 'rugidoJefe', hostil: true, ia: true, noNatural: true, dano: 4,
  armar: g => armarUmbrak(g),
  guiar(a, dt) {
    const u = a.userData, e = ex(a), C = mapa.caza, p = a.position; u.vida = 1e6;
    if (!C || !C.on || C.fin || !czEs()) return { vel: 0 };
    const F = Math.min(3, C.fase | 0), h = haciaJ(a), at = atacan(a);
    if (e.st === 'pelea') { if (!at || h.d > 34) e.st = 'acecha'; }
    else if (at && (h.d < 12 || (h.d < 24 && ve(a, h)))) { e.st = 'pelea'; czRugir(p.x, p.z, true); }
    if (e.st === 'pelea') {
      morder(a, h, Math.round(3 + F * 1.5), 2.3 + u.an, dt);
      u.orbe = (u.orbe ?? 3) - dt;
      if (u.orbe <= 0 && h.d > 5 && h.d < 22 && ve(a, h)) { u.orbe = 4.5 - F * .8; disparar('sombra', p.x + Math.sin(h.dir) * 1.2, p.y + 1.9, p.z + Math.cos(h.dir) * 1.2, J.x, J.y + 1.1, J.z); }
      return { dir: h.dir, vel: h.d > 2.6 ? 2.4 + F * .55 : 0 };
    }
    // acechando: vuelve a su guarida y se queda quieto, mirando
    const dx = (e.hx ?? p.x) - p.x, dz = (e.hz ?? p.z) - p.z, d = Math.hypot(dx, dz);
    if (d > 3) return { dir: Math.atan2(dx, dz), vel: 1.7 };
    return { dir: (u.dir || 0) + dt * .25, vel: 0 };
  },
  suelta: () => [], cargar: a => { ex(a).f = 1; } };

// ═════════ EL MUNDO: Tierras Sombrías ═════════
window.__czRuinas = [];
function czRng(s) { let t = (s >>> 0) || 1; return () => { t = (t + 0x6D2B79F5) | 0; let r = Math.imul(t ^ (t >>> 15), 1 | t); r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r; return ((r ^ (r >>> 14)) >>> 0) / 4294967296; }; }
function czSuelo(x, z) { let y = SY - 2; while (y > 0 && (!mundo[idx(x, y, z)] || (DEF[mundo[idx(x, y, z)]] && DEF[mundo[idx(x, y, z)]].planta))) y--; return y; }
function transformarSombras(S) {
  const R = czRng(S ^ 0x5bd1e995), hojas = new Set([B.HOJAS, B.HOJAS_SELVA, B.HOJAS_PINO].filter(x => x != null));
  const plantas = new Set([B.PASTO_ALTO, B.FLOR_R, B.FLOR_A, B.ENREDADERA, B.NENUFAR, B.BROTE, B.CALABAZA].filter(x => x != null));
  for (let x = 0; x < SX; x++) for (let z = 0; z < SZ; z++) for (let y = 1; y < SY; y++) {
    const i = idx(x, y, z), t = mundo[i]; if (!t) continue;
    if (hojas.has(t)) mundo[i] = (R() < .025) ? B.TELARANA : 0;
    else if (plantas.has(t)) mundo[i] = R() < .3 && B.ARBUSTO_SECO != null ? B.ARBUSTO_SECO : 0;
    else if (t === B.PASTO) mundo[i] = R() < .78 ? B.TIERRA : (B.PIEDRA_ABISMO != null && R() < .4 ? B.PIEDRA_ABISMO : B.PIEDRA);
  }
  const P = (x, y, z, t) => { if (x > 0 && z > 0 && x < SX - 1 && z < SZ - 1 && y > 0 && y < SY - 1) mundo[idx(x, y, z)] = t; };
  const poste = (x, z) => { const y = czSuelo(x, z); if (y <= 0 || mundo[idx(x, y, z)] === B.AGUA) return; P(x, y + 1, z, B.ADOQUIN); P(x, y + 2, z, B.ANTORCHA); };
  // ruinas: paredes rotas, columnas caídas, una antorcha y lápidas
  const ruinas = []; let intentos = 0;
  while (ruinas.length < 11 && intentos++ < 600) {
    const x = 12 + Math.floor(R() * (SX - 24)), z = 12 + Math.floor(R() * (SZ - 24)), y = czSuelo(x, z);
    if (y <= 3 || mundo[idx(x, y, z)] === B.AGUA || ruinas.some(r => Math.hypot(r.x - x, r.z - z) < 24)) continue;
    const t = R() < .5 ? B.ADOQUIN : (B.LADRILLO_P != null ? B.LADRILLO_P : B.ADOQUIN), r = 3 + Math.floor(R() * 2);
    for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) {
      const borde = Math.abs(a) === r || Math.abs(b) === r, yy = czSuelo(x + a, z + b);
      if (!borde) { if (R() < .5) P(x + a, yy, z + b, B.ADOQUIN); continue; }
      const alto = (a + b + 9) % 4 === 0 ? 0 : 1 + Math.floor(R() * 3);
      for (let k = 1; k <= alto; k++) P(x + a, yy + k, z + b, k === alto && R() < .3 ? (B.LOSA ?? t) : t);
    }
    P(x + r - 1, czSuelo(x + r - 1, z - r + 1) + 1, z - r + 1, B.LAPIDA ?? B.ADOQUIN);
    if (R() < .6) P(x - r + 1, czSuelo(x - r + 1, z + r - 1) + 1, z + r - 1, B.TELARANA);
    poste(x + (R() < .5 ? r : -r) + (R() < .5 ? 1 : -1), z);
    ruinas.push({ x: x + .5, z: z + .5 });
  }
  window.__czRuinas = ruinas;
  // antorchas sueltas (poca luz, mucha sombra)
  for (let k = 0; k < 34; k++) poste(4 + Math.floor(R() * (SX - 8)), 4 + Math.floor(R() * (SZ - 8)));
  // campamento al empezar: un círculo de antorchas
  const sx = Math.floor(spawn.x), sz = Math.floor(spawn.z);
  for (const [a, b] of [[3, 0], [-3, 0], [0, 3], [0, -3]]) poste(sx + a, sz + b);
  animalesIniciales = [];
}
{ const p0 = prepararMundo; prepararMundo = function (S, ej) { const r = p0.apply(this, arguments); if (czEs()) { try { transformarSombras(S); } catch (e) { console.error(e); } } return r; }; }
// cielo: niebla violeta oscura que se cierra, con algo de luz para poder jugar
{ const NIEBLA_CZ = new THREE.Color('#140c22'), ARRIBA_CZ = new THREE.Color('#05030a');
  const c0 = cielo; cielo = function () { const r = c0.apply(this, arguments); if (!jugando || !czEs()) return r;
    const bajo = !$('bajoAgua').hidden; if (bajo) return r;
    render.setClearColor(NIEBLA_CZ); escena.fog.color.copy(NIEBLA_CZ); U.uNiebla.value.copy(NIEBLA_CZ);
    domo.material.uniforms.uArriba.value.copy(ARRIBA_CZ); domo.material.uniforms.uHorizonte.value.copy(NIEBLA_CZ);
    U.uCerca.value = Math.min(U.uCerca.value, 8); U.uLejos.value = Math.min(U.uLejos.value, 34); escena.fog.near = U.uCerca.value; escena.fog.far = U.uLejos.value;
    U.uDia.value = Math.max(U.uDia.value, .3); hemi.intensity = Math.max(hemi.intensity, .32);
    return r; }; }

// ═════════ ESTADO DE LA CACERÍA ═════════
// El dueño (o el que juega solo) lleva la cuenta en mapa.caza; los invitados reciben una copia.
let CZR = null;                 // copia que tiene el invitado
const czEstado = () => czInvitado() ? CZR : (typeof mapa !== 'undefined' ? mapa.caza : null);
const umbrak = () => animales.find(a => a.userData.animal === 'umbrak');
const umbrakTitere = () => { try { for (const b of MP.bichos.values()) if (b.tipo === 'umbrak') return b.g; } catch (e) {} return null; };
function czJugadores() { const l = [{ x: J.x, z: J.z }]; try { for (const j of MP.jug.values()) if (j.obj) l.push(j.obj); } catch (e) {} return l; }
function czGuarida(lejos = 34) {
  const jug = czJugadores(), R = window.__czRuinas || [];
  const ok = r => jug.every(j => Math.hypot(j.x - r.x, j.z - r.z) >= lejos);
  const cand = R.filter(ok); if (cand.length) return cand[Math.floor(Math.random() * cand.length)];
  for (let n = 0; n < 200; n++) { const r = { x: 8 + Math.random() * (SX - 16), z: 8 + Math.random() * (SZ - 16) }; if (ok(r) && get(Math.floor(r.x), sueloCerca(r.x, r.z) - 1, Math.floor(r.z)) !== B.AGUA) return r; }
  return R.length ? R[Math.floor(Math.random() * R.length)] : { x: SX / 2, z: SZ / 2 };
}
function czPonerUmbrak(g) {
  const y = sueloCerca(g.x, g.z), a = crearAnimal('umbrak', g.x, y + .1, g.z); const e = ex(a); e.f = 1; e.hx = g.x; e.hz = g.z; e.st = 'acecha';
  const C = mapa.caza; if (C) { C.x = g.x; C.z = g.z; } return a;
}
function empezarCaza(nueva) {
  if (czInvitado()) return;
  const extra = czEnLinea() ? MP.jug.size : 0, max = Math.round(CZ_VIDA * (1 + extra * .6));
  const n = ((mapa.caza && mapa.caza.n) || 0) + 1;
  mapa.caza = { on: true, n, max, hp: max, fase: 0, pts: {}, ult: '', fin: false, x: 0, z: 0, t0: Date.now() };
  for (const a of animales.slice()) if (a.userData.animal === 'umbrak') quitarAnimal(a);
  czHuellas.splice(0).forEach(h => escena.remove(h.m));
  const g = czGuarida(42), a = czPonerUmbrak(g);
  // primera pista: un rastro que empieza cerca del campamento y apunta a la guarida
  const ang = Math.atan2(g.x - J.x, g.z - J.z), x0 = J.x + Math.sin(ang) * 6, z0 = J.z + Math.cos(ang) * 6;
  czRastro(x0, z0, x0 + Math.sin(ang) * 22, z0 + Math.cos(ang) * 22);
  czRastro(g.x - Math.sin(ang) * 16, g.z - Math.cos(ang) * 16, g.x, g.z);
  czPista = 30; czRugidoT = 8; sucio = true; czEnvioT = 0;
  aviso(TR('czEmpieza'), 3200); czRugir(a.position.x, a.position.z, false);
  if (nueva) czAvisoTodos('czEmpieza');
  cerrar('czFinCapa');
}
// le pegan a Umbrak (solo lo calcula el dueño o el que juega solo)
function danarUmbrak(n, quien, dir) {
  const C = mapa.caza, a = umbrak(); if (!C || !C.on || C.fin || !a) return;
  const u = a.userData, e = ex(a); if ((u.inv || 0) > 0) { polvo(a.position.x, a.position.y + 1.5, a.position.z, '#3a2a5a', 4); return; }
  n = Math.max(1, Math.min(40, Math.round(n))); const real = Math.min(n, C.hp);
  C.hp -= real; C.pts[quien] = (C.pts[quien] || 0) + real; C.ult = quien;
  u.rojo = .3; if (dir) { u.kx = dir.x * 3; u.kz = dir.z * 3; }
  polvo(a.position.x, a.position.y + 1.6, a.position.z, CZ_VIOLETA, 6); son(140, .12, 'sawtooth', .1);
  if (e.st !== 'pelea') { e.st = 'pelea'; czRugir(a.position.x, a.position.z, true); }
  if (C.hp <= 0) return czTerminar(quien);
  const F = C.fase | 0; if (F < 3 && C.hp <= C.max * (1 - (F + 1) * .25)) czHuir(a);
  sucio = true; czEnvioT = Math.min(czEnvioT, .05);
}
function czHuir(a) {
  const C = mapa.caza, p = a.position, g = czGuarida(36), e = ex(a);
  for (let k = 0; k < 4; k++) polvo(p.x, p.y + 1 + k * .4, p.z, k % 2 ? '#2a1640' : CZ_VIOLETA, 10);
  czRastro(p.x, p.z, g.x, g.z);
  p.set(g.x, sueloCerca(g.x, g.z) + .1, g.z); e.hx = g.x; e.hz = g.z; e.st = 'acecha'; a.userData.inv = 2.5; a.userData.vy = 0;
  C.fase = Math.min(3, (C.fase | 0) + 1); C.x = g.x; C.z = g.z; czHuyo = true;
  aviso(TR('czHuyo'), 3200); czRugir(g.x, g.z, false); temblorJefe && temblorJefe(.3);
}
function czTerminar(quien) {
  const C = mapa.caza, a = umbrak();
  C.pts[quien] = (C.pts[quien] || 0) + CZ_PTS_FINAL; C.ult = quien; C.fin = true; C.hp = 0; C.t1 = Date.now();
  if (a) { const p = a.position; for (let k = 0; k < 6; k++) polvo(p.x + (Math.random() - .5) * 2, p.y + .5 + k * .35, p.z + (Math.random() - .5) * 2, k % 2 ? CZ_VIOLETA : '#e2b8ff', 14); quitarAnimal(a); }
  sonar('final', .9) || son(660, .4, 'triangle', .12); for (let i = 0; i < 4; i++) setTimeout(() => son(500 + i * 160, .18, 'triangle', .1), 200 + i * 120);
  sucio = true; czEnvioT = 0; czMandar(true);
  mostrarFin(C);
  if (typeof lgSumar === 'function') lgSumar('jefes');
}

// ═════════ HUELLAS QUE BRILLAN ═════════
const czHuellas = [], czHuellaGeo = new THREE.PlaneGeometry(.42, .62); czHuellaGeo.rotateX(-Math.PI / 2);
const czHaloGeo = new THREE.PlaneGeometry(1.1, 1.3); czHaloGeo.rotateX(-Math.PI / 2);
let czNuevas = [];
function czHuella(x, z, ang, lado, propia = true) {
  const y = sueloCerca(x, z); if (y <= 1) return;
  const m = new THREE.Mesh(czHuellaGeo, new THREE.MeshBasicMaterial({ color: 0xd8a8ff, transparent: true, opacity: .95, depthWrite: false, fog: false }));
  const halo = new THREE.Mesh(czHaloGeo, new THREE.MeshBasicMaterial({ color: 0x9b4dff, transparent: true, opacity: .35, depthWrite: false, fog: false, blending: THREE.AdditiveBlending })); halo.position.y = -.01; m.add(halo);
  const ox = Math.cos(ang) * .22 * lado, oz = -Math.sin(ang) * .22 * lado;
  m.position.set(x + ox, y + .03, z + oz); m.rotation.y = ang; m.renderOrder = 5; escena.add(m);
  czHuellas.push({ m, t: 0 }); if (czHuellas.length > 360) escena.remove(czHuellas.shift().m);
  if (propia) czNuevas.push([+(x).toFixed(1), +(z).toFixed(1), +ang.toFixed(2), lado]);
}
function czRastro(x0, z0, x1, z1) {
  const d = Math.hypot(x1 - x0, z1 - z0), n = Math.min(70, Math.floor(d / 1.25)), ang = Math.atan2(x1 - x0, z1 - z0);
  for (let k = 0; k <= n; k++) { const f = k / Math.max(1, n), x = x0 + (x1 - x0) * f + Math.sin(k * 1.7) * .4, z = z0 + (z1 - z0) * f + Math.cos(k * 1.3) * .4;
    if (x < 1 || z < 1 || x >= SX - 1 || z >= SZ - 1) continue; czHuella(x, z, ang, k % 2 ? 1 : -1); }
}
function moverHuellas(dt) {
  for (const h of czHuellas.slice()) { h.t += dt; const vida = 150; const k = Math.max(0, .95 - Math.max(0, h.t - 100) / 50) * (.75 + Math.sin(h.t * 2 + h.m.position.x) * .25); h.m.material.opacity = k; if (h.m.children[0]) h.m.children[0].material.opacity = k * .38;
    if (h.t > vida) { escena.remove(h.m); h.m.material.dispose(); if (h.m.children[0]) h.m.children[0].material.dispose(); czHuellas.splice(czHuellas.indexOf(h), 1); } }
}

// ═════════ RUGIDOS A LO LEJOS ═════════
function czRumbo(x, z) { const dx = x - J.x, dz = z - J.z; if (Math.hypot(dx, dz) < 14) return TR('czCerca'); return Math.abs(dx) > Math.abs(dz) ? TR(dx > 0 ? 'czEste' : 'czOeste') : TR(dz > 0 ? 'czSur' : 'czNorte'); }
function czRugir(x, z, cerca) {
  const d = Math.hypot(x - J.x, z - J.z), v = Math.max(.025, .17 * (1 - d / 130));
  son(62, 1.6, 'sawtooth', v); son(124, 1.3, 'square', v * .45); setTimeout(() => son(48, 1.2, 'sawtooth', v * .8), 380);
  if (!cerca && d > 10) aviso(TR('czRugido', { d: czRumbo(x, z) }), 2200);
  if (!czInvitado()) czRugio = [x, z, cerca ? 1 : 0];
  if (d < 26) { try { temblorJefe && temblorJefe(.15); } catch (e) {} }
}

// ═════════ PANTALLAS Y HUD ═════════
{ const st = document.createElement('style'); st.textContent = `
  #bCaceria { background: linear-gradient(#7e4ab8, #3a1f66); }
  #czCapa .ventana, #czFinCapa .ventana { max-width: 620px; }
  #czCuerpo { max-height: calc(100vh - 64px); overflow: auto; padding: 10px 16px 14px; color: #1b2a6b; display: grid; grid-template-columns: 1.1fr 1fr; gap: 6px 16px; align-items: start; }
  #czCuerpo .lista div { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; font-weight: 700; margin-bottom: 6px; } #czCuerpo .lista svg { flex: none; margin-top: 1px; }
  #czCuerpo .cab { grid-column: 1 / -1; display: flex; align-items: center; gap: 10px; } #czCuerpo .cab b { font-size: 20px; letter-spacing: 1px; } #czCuerpo .cab small { display: block; font-weight: 700; color: #5a6aa8; }
  #czCuerpo .bots .btn { width: 100%; margin-top: 6px; padding: 7px 0 6px; font-size: 15px; } #czCuerpo .bots .btn small { display: block; font-size: 11px; opacity: .9; }
  #czSoloB { background: linear-gradient(#7e4ab8, #4a2a86) !important; } #czAbiertaB { background: linear-gradient(#2fb65a, #1f8a40) !important; } #czAmigosB { background: linear-gradient(#4a7cff, #2a4ab8) !important; }
  #czCazB { background: linear-gradient(#ffd23a, #c8841a) !important; color: #1b2a6b; text-shadow: none; }
  @media (max-width: 560px) { #czCuerpo { grid-template-columns: 1fr; } }
  #czBru { position: fixed; left: max(12px, env(safe-area-inset-left)); top: 96px; z-index: 5; display: flex; align-items: center; gap: 6px; pointer-events: none; font: 800 12px 'Baloo 2', 'Trebuchet MS', sans-serif; color: #fff; text-shadow: 0 1px 0 #000; }
  #czBru .c { width: 46px; height: 46px; border-radius: 50%; background: rgba(13,10,30,.75); border: 3px solid var(--cz, #3a7be8); display: grid; place-items: center; box-shadow: 0 0 calc(var(--k, 0) * 18px) var(--cz, #3a7be8); }
  #czBru .c svg { width: 30px; height: 30px; color: var(--cz, #3a7be8); } #czBru.pulsa .c { animation: czPulso var(--vel, 1s) ease-in-out infinite; }
  @keyframes czPulso { 50% { transform: scale(1.12); } }
  #czBru .tx small { display: block; font-size: 10px; opacity: .8; font-weight: 700; }
  #czBar { position: fixed; top: max(8px, env(safe-area-inset-top)); left: 50%; transform: translateX(-50%); z-index: 4; width: min(36vw, 330px); pointer-events: none; text-align: center; font: 800 13px 'Baloo 2', 'Trebuchet MS', sans-serif; color: #fff; text-shadow: 0 1px 0 #000; }
  #czBar .barra { position: relative; height: 11px; background: rgba(13,10,30,.75); border: 2px solid #0d0a1e; border-radius: 6px; overflow: hidden; margin-top: 2px; }
  #czBar .barra i { display: block; height: 100%; background: linear-gradient(90deg, #6a2fd8, #c58cff); }
  #czBar .barra s { position: absolute; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,.55); }
  #czBar small { font-size: 11px; color: #e2b8ff; margin-left: 6px; }
  #czPts { position: fixed; right: max(12px, env(safe-area-inset-right)); top: 70px; z-index: 4; pointer-events: none; font: 800 13px 'Baloo 2', 'Trebuchet MS', sans-serif; color: #ffe14a; text-shadow: 0 1px 0 #000; text-align: right; }
  #czPts small { display: block; color: #e2b8ff; font-size: 11px; }
  #czFinCuerpo { max-height: calc(100vh - 64px); overflow: auto; padding: 10px 16px 14px; color: #1b2a6b; }
  #czFinCuerpo .golpe { text-align: center; font-weight: 800; color: #6a2fd8; margin-bottom: 6px; } #czFinCuerpo .mios { text-align: center; font-weight: 800; font-size: 16px; margin: 6px 0; }
  .czRk { display: flex; align-items: center; gap: 8px; background: #fff; border: 2px solid #d5dbf3; border-radius: 10px; padding: 4px 8px; margin-bottom: 4px; font-weight: 800; font-size: 14px; }
  .czRk.yo { background: #fff6d8; border-color: #ffb21a; } .czRk .pos { width: 26px; display: flex; justify-content: center; } .czRk .nom { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .czRk .v { color: #6a2fd8; }
  #czFinCuerpo .filaBtn { margin: 8px auto 0; width: 100%; } #czFinCuerpo .btn { margin-top: 4px; }
  #czFinEspera { text-align: center; font-size: 12px; color: #5a6aa8; font-weight: 700; margin-top: 6px; }
  .czBadge { display: inline-block; background: linear-gradient(#b46bff, #6a2fd8); color: #fff; border-radius: 6px; font-size: 10px; font-weight: 800; padding: 0 5px; margin-right: 4px; vertical-align: 1px; }
`; document.head.appendChild(st); }
const SVG_GARRA = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 20c2-6 3-10 2-16M10 21c1-6 2-11 1-17M15 21c0-5 1-10 3-15M19 19c0-3 1-6 3-9" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';
const SVG_OJO = '<svg viewBox="0 0 24 24"><path d="M2 12c3-5 7-7 10-7s7 2 10 7c-3 5-7 7-10 7s-7-2-10-7z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 8l2 4-2 4-2-4z" fill="currentColor"/></svg>';
const SVG_PUNTO = c => `<svg viewBox="0 0 16 16" width="16" height="16"><path d="M8 1l2 5h5l-4 3 2 6-5-4-5 4 2-6-4-3h5z" fill="${c}"/></svg>`;
// botón en "Mundo nuevo"
{ const b = document.createElement('div'); b.className = 'btn'; b.id = 'bCaceria'; b.dataset.ih = 'czBtn'; b.onclick = () => abrirCaceria();
  const ref = ($('bZombis') && $('bZombis').closest('.filaBtn')) || $('bEjemplo'); ref.parentNode.insertBefore(b, ref); }
cap('czCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="czTitulo"></div><div style="flex:1"></div><div class="cerrar" id="czCerrar">X</div></div><div id="czCuerpo"></div></div>`);
cap('czFinCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="czFin"></div><div style="flex:1"></div></div><div id="czFinCuerpo"></div></div>`);
function abrirCaceria() {
  const tips = ['czT1', 'czT2', 'czT3', 'czT4', 'czT5'].map((k, i) => `<div>${SVG_PUNTO(['#b46bff', '#ff8a2e', '#ffd23a', '#e0475a', '#36c95a'][i])}<span>${TR(k)}</span></div>`).join('');
  $('czCuerpo').innerHTML = `<div class="cab"><span style="color:#6a2fd8">${SVG_GARRA}</span><div><b>${TR('czTitulo')}</b><small>${TR('czSub')}</small></div></div>
    <div class="lista">${tips}</div>
    <div class="bots"><div class="btn" id="czSoloB">${TR('czSolo')}</div><div class="btn" id="czAbiertaB">${TR('czAbierta')}</div><div class="btn" id="czAmigosB">${TR('czAmigos')}</div>
    <div class="filaBtn"><div class="btn" id="czUnirseB">${TR('czUnirse')}</div><div class="btn" id="czCazB">${TR('czCazadores')}</div></div></div>`;
  $('nuevo').hidden = true; abrir('czCapa');
}
$('czCapa').addEventListener('click', e => {
  const q = s => e.target.closest(s);
  if (q('#czCerrar')) { cerrar('czCapa'); $('nuevo').hidden = false; }
  else if (q('#czSoloB')) { cerrar('czCapa'); crearCaceria(null); }
  else if (q('#czAbiertaB')) { cerrar('czCapa'); crearCaceria('publica'); }
  else if (q('#czAmigosB')) { cerrar('czCapa'); crearCaceria('privada'); }
  else if (q('#czUnirseB')) { cerrar('czCapa'); $('mundos').hidden = false; abrirEnLinea(); }
  else if (q('#czCazB')) { if (window.__dia) { __dia.abrirRecords('czCapa', 'caceria'); } }
});
function crearCaceria(sala) {
  const lista = leerLista(), id = Date.now().toString(36), n = lista.length + 1;
  lista.unshift({ id, nombre: TR('czMundo') + ' ' + n, num: n, modo: 'supervivencia', tipo: 'caceria', tam: 160, semilla: (Math.random() * 2147483647) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0, gen: 2 });
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  pantallaCompleta(); entrarMundo(id);
  if (sala) { czSalaPedida = sala; setTimeout(() => { try { abrirSala(sala === 'publica'); } catch (e) {} }, 400); }
}
let czSalaPedida = null;
// al entrar a un mundo de cacería: noche eterna, pocos monstruos comunes, sin hambre; equipo de cazador
const czKit = () => { if (!(inv[I.LANZA] > 0)) { inv[I.LANZA] = 1; inv[I.ARCO] = Math.max(inv[I.ARCO] || 0, 1); inv[I.FLECHA] = Math.max(inv[I.FLECHA] || 0, 32); inv[I.PAN] = Math.max(inv[I.PAN] || 0, 8); inv[B.ANTORCHA] = Math.max(inv[B.ANTORCHA] || 0, 16);
    barra = [I.LANZA, I.ARCO, I.PAN, B.ANTORCHA, 0, 0, 0, 0, 0]; sel = 0; pintarBarra(); } };
{ const e0 = entrarMundo; entrarMundo = function (id) {
    CZR = null; const r = e0.apply(this, arguments);
    if (jugando && czEs()) {
      REG.hora = 'noche'; REG.monstruos = czInvitado() ? 0 : .4; REG.hambre = false;
      czKit(); pintarMision(); if (!czInvitado()) czLimpiarAnimales();
      if (!czInvitado()) { if (!mapa.caza || !mapa.caza.on) empezarCaza(false); else if (mapa.caza.fin) mostrarFin(mapa.caza); }
    }
    return r; }; }
// invitado: el mundo llega por la sala; también recibe su equipo
{ const c0 = cargarMundoRemoto; cargarMundoRemoto = function (m) { const r = c0.apply(this, arguments); if (jugando && czEs()) { REG.hora = 'noche'; REG.hambre = false; czKit(); } return r; }; }

// sin misiones ni animales que aparezcan solos: es otra clase de juego
{ const r0 = revisarMision; revisarMision = function () { if (czEs()) return; return r0.apply(this, arguments); }; }
{ const p0 = pintarMision; pintarMision = function () { if (jugando && czEs()) { $('mision').hidden = true; return; } return p0.apply(this, arguments); }; }
{ const p0 = poblarAnimales; poblarAnimales = function () { if (czEs()) return; return p0.apply(this, arguments); }; }
const czLimpiarAnimales = () => { for (const a of animales.slice()) { const T = TIPOS[a.userData.animal] || {}; if (a.userData.animal !== 'umbrak' && !T.hostil && !(a.userData.extra && a.userData.extra.d)) quitarAnimal(a); } };
// HUD
const czBru = document.createElement('div'); czBru.id = 'czBru'; czBru.hidden = true; czBru.innerHTML = `<div class="c">${SVG_OJO}</div><div class="tx"><b></b><small></small></div>`; document.body.appendChild(czBru);
const czBar = document.createElement('div'); czBar.id = 'czBar'; czBar.hidden = true; czBar.innerHTML = '<b>UMBRAK</b><small></small><div class="barra"><i></i><s style="left:25%"></s><s style="left:50%"></s><s style="left:75%"></s></div>'; document.body.appendChild(czBar);
const czPtsEl = document.createElement('div'); czPtsEl.id = 'czPts'; czPtsEl.hidden = true; document.body.appendChild(czPtsEl);
const CZ_COLORES = [[70, '#3a7be8', 'czFrio'], [45, '#5ad0ff', 'czFresco'], [26, '#ffd23a', 'czTibio'], [12, '#ff8a2e', 'czCaliente'], [0, '#ff4adc', 'czMuyCerca']];
function pintarHud() {
  const C = czEstado(), on = jugando && czEs() && C && C.on && !$('hud').hidden;
  czBru.hidden = czBar.hidden = czPtsEl.hidden = !on; if (!on) return;
  // la brújula: se calienta al acercarse
  let ux = C.x, uz = C.z; const a = czInvitado() ? umbrakTitere() : umbrak(); if (a) { ux = a.position.x; uz = a.position.z; }
  const d = C.fin ? 999 : Math.hypot(ux - J.x, uz - J.z), [, col, txt] = CZ_COLORES.find(c => d >= c[0]) || CZ_COLORES[4];
  const k = Math.max(0, Math.min(1, 1 - d / 80));
  czBru.style.setProperty('--cz', col); czBru.style.setProperty('--k', k.toFixed(2)); czBru.style.setProperty('--vel', (1.6 - k * 1.3).toFixed(2) + 's');
  czBru.classList.toggle('pulsa', k > .35 && !C.fin); czBru.querySelector('b').textContent = C.fin ? '—' : TR(txt); czBru.querySelector('small').textContent = TR('czBrujula');
  // barra de vida por fases
  czBar.querySelector('i').style.width = Math.max(0, C.hp / C.max * 100) + '%';
  czBar.querySelector('small').textContent = TR('czFase', { n: Math.min(4, (C.fase | 0) + 1) }) + ' · ' + TR(C.fin ? 'czCazado' : C.st === 'pelea' ? 'czCazando' : C.st === 'huye' ? 'czHuyendo' : 'czEscondido');
  const yo = czYo(), mis = (C.pts && C.pts[yo]) || 0;
  czPtsEl.innerHTML = TR('czPts', { n: mis }) + (czEnLinea() ? `<small>${TR('czSala', { c: escCZ(MP.sala) })}</small>` : '');
}
// pantalla final con el ranking
function rankingDe(C) { return Object.entries(C.pts || {}).sort((a, b) => b[1] - a[1]); }
let czRecordMandado = '';
function mostrarFin(C) {
  if (!C || !C.fin) return;
  const yo = czYo(), rk = rankingDe(C), mis = (C.pts && C.pts[yo]) || 0;
  const COP = ['#ffd23a', '#d8dcef', '#e0965a'];
  $('czFinCuerpo').innerHTML = `<div class="golpe">${TR('czGolpe', { n: escCZ(C.ult) })}</div>
    ${rk.map(([n, v], k) => `<div class="czRk${n === yo ? ' yo' : ''}"><div class="pos">${k < 3 && typeof SVG_COPA === 'function' ? SVG_COPA(COP[k]) : k + 1}</div><div class="nom">${escCZ(n)}</div><div class="v">${v}</div></div>`).join('')}
    <div class="mios">${TR('czTusPts', { n: mis })}</div>
    <div class="filaBtn">${czHost() ? `<div class="btn" id="czOtraB" style="background:linear-gradient(#7e4ab8,#4a2a86)">${TR('czOtra')}</div>` : ''}<div class="btn" id="czRecB" style="background:linear-gradient(#ffd23a,#c8841a);color:#1b2a6b;text-shadow:none">${TR('czCazadores')}</div><div class="btn" id="czSalirB">${TR('czSalir')}</div></div>
    ${czHost() ? '' : `<div id="czFinEspera">${TR('czEsperaDueno')}</div>`}`;
  aplicarIdioma(); pausado = true; try { soltarTodo(); } catch (e) {} abrir('czFinCapa');
  // récord en línea (una vez por cacería)
  const clave = (czInvitado() ? 'v' : 'h') + (C.n || 0) + ':' + (C.t1 || 0);
  if (mis > 0 && czRecordMandado !== clave && window.__dia) { czRecordMandado = clave; try { __dia.mandarRecord('caceria', mis); } catch (e) {} }
}
$('czFinCapa').addEventListener('click', e => {
  const q = s => e.target.closest(s);
  if (q('#czOtraB')) { cerrar('czFinCapa'); pausado = false; empezarCaza(true); }
  else if (q('#czRecB')) { if (window.__dia) __dia.abrirRecords('czFinCapa', 'caceria'); }
  else if (q('#czSalirB')) { cerrar('czFinCapa'); pausado = false; guardar(); salirAlMenu(); }
});

// ═════════ GOLPES ═════════
// la lanza llega más lejos y le hace mucho daño a Umbrak; con la espada y el arco también se lo puede lastimar
const danoMano = () => barra[sel] === I.LANZA ? 14 : [2, 3, 4, 6, 8, 11][nivelEspada()] * (J.fuerza || 1);
function czApuntaUmbrak(dir, alcance) {
  const a = czInvitado() ? umbrakTitere() : umbrak(); if (!a) return null;
  const o = new THREE.Vector3(J.x, J.y + OJOS, J.z), r = new THREE.Ray(o, dir), v = new THREE.Vector3(), p = a.position, an = TIPOS.umbrak.an + .15, al = TIPOS.umbrak.al;
  if (!r.intersectBox(new THREE.Box3(new THREE.Vector3(p.x - an, p.y, p.z - an), new THREE.Vector3(p.x + an, p.y + al, p.z + an)), v)) return null;
  const t = v.distanceTo(o); if (t > alcance) return null; const h = apuntar(dir); if (h && h.t < t && solidoMov(h.b)) return null;   // antorchas, plantas y telarañas no tapan
  return { a, t };
}
let czOroT = 0;
function chispasOro(x, y, z, n = 6) { if (typeof esPro === 'function' && esPro()) polvo(x, y, z, Math.random() < .5 ? '#ffd23a' : '#fff6c0', n); }
{ const t0 = tocar; tocar = function (dir) {
    if (jugando && czEs() && barra[sel] !== I.ARCO) {
      const C = czEstado(), lanza = barra[sel] === I.LANZA, hit = C && C.on && !C.fin ? czApuntaUmbrak(dir, lanza ? 6 : 4.5) : null;
      if (hit) {
        const n = danoMano(); swing = 1; sonar('golpe', .7) || son(220, .1, 'sawtooth', .12);
        if (lanza) { son(880, .12, 'triangle', .08); polvo(hit.a.position.x, hit.a.position.y + 1.6, hit.a.position.z, '#ffffff', 5); }
        chispasOro(J.x + dir.x * 1.2, J.y + OJOS - .2 + dir.y * 1.2, J.z + dir.z * 1.2, 8);
        if (czInvitado()) { mpEnviar({ t: 'g', k: 'umb', d: n, dx: +dir.x.toFixed(2), dz: +dir.z.toFixed(2) }); hit.a.userData.rojo = .25; }
        else danarUmbrak(n, czYo(), dir);
        return;
      }
    }
    return t0(dir); }; }
// el dueño: cualquier otro daño (flechas, explosiones, el perro) cuenta para él
{ const h0 = herir; herir = function (m, n) { if (m && m.userData && m.userData.animal === 'umbrak') { danarUmbrak(n, czYo()); return; } return h0.apply(this, arguments); }; }
{ const g0 = golpear; golpear = function (m, dir) { if (m && m.userData && m.userData.animal === 'umbrak') { swing = 1; danarUmbrak(danoMano(), czYo(), dir); return; } return g0.apply(this, arguments); }; }
{ const g0 = golpeDeInvitado; golpeDeInvitado = function (m) {
    const o = animales.find(a => a.userData.nid === m.n);
    if (o && o.userData.animal === 'umbrak') { const j = MP.jug.get(m.id); danarUmbrak(Math.min(30, +m.d || 2), j ? j.nombre : '?', { x: +m.dx || 0, z: +m.dz || 0 }); return; }
    return g0.apply(this, arguments); }; }
// el invitado: sus flechas también le pegan a Umbrak (se avisa al dueño)
function flechasInvitado() {
  const a = umbrakTitere(); if (!a || typeof flechas === 'undefined') return;
  const q = a.position, an = TIPOS.umbrak.an + .15, al = TIPOS.umbrak.al;
  for (const f of flechas.slice()) { if (f.quieta) continue; const p = f.g.position;
    if (Math.abs(p.x - q.x) < an && Math.abs(p.z - q.z) < an && p.y > q.y && p.y < q.y + al) {
      escena.remove(f.g); flechas.splice(flechas.indexOf(f), 1); a.userData.rojo = .25; son(220, .1, 'sawtooth', .1);
      mpEnviar({ t: 'g', k: 'umb', d: 7 * (J.fuerza || 1), dx: 0, dz: 0 }); } }
}

// ═════════ EN LÍNEA ═════════
let czEnvioT = 0, czHuyo = false, czRugio = null, czAvisos = [];
function czAvisoTodos(k, h) { if (czInvitado()) return; czAvisos.push(k); }
function czMandar(forzar) {
  if (!czEnLinea() || !MP.dueno || !MP.jug.size) { czNuevas = []; czRugio = null; czHuyo = false; czAvisos = []; return; }
  const C = mapa.caza; if (!C) return; const a = umbrak(), e = a ? ex(a) : {};
  const cz = { on: C.on, n: C.n, max: C.max, hp: C.hp, fase: C.fase, st: e.st || 'acecha', x: +(a ? a.position.x : C.x).toFixed(1), z: +(a ? a.position.z : C.z).toFixed(1), pts: C.pts, ult: C.ult, fin: C.fin, t1: C.t1 || 0 };
  if (czHuyo) cz.hu = 1; if (czRugio) cz.r = czRugio; if (czAvisos.length) cz.av = czAvisos.slice(0, 3);
  mpEnviar({ t: 'm', cz, czh: czNuevas.slice(0, 120) });
  czNuevas = []; czRugio = null; czHuyo = false; czAvisos = [];
}
function czDelDueno(cz, hs) {
  if (!jugando || !czEs()) return;
  const antes = CZR; CZR = cz;
  for (const [x, z, ang, lado] of Array.isArray(hs) ? hs : []) czHuella(+x, +z, +ang, lado, false);
  if (cz.r) czRugir(cz.r[0], cz.r[1], !!cz.r[2]);
  if (cz.hu) aviso(TR('czHuyo'), 3200);
  for (const k of cz.av || []) aviso(TR(k), 2400);
  if (cz.fin && (!antes || !antes.fin || antes.n !== cz.n)) mostrarFin(cz);
  if (!cz.fin && antes && antes.fin) { cerrar('czFinCapa'); pausado = false; czHuellas.splice(0).forEach(h => escena.remove(h.m)); }
}
{ const r0 = recibir; recibir = function (m) {
    if (m && m.t === 'g' && m.k === 'umb') { if (MP.dueno && czEs()) { const j = MP.jug.get(m.id); danarUmbrak(Math.min(30, +m.d || 2), j ? j.nombre : '?', { x: +m.dx || 0, z: +m.dz || 0 }); } return; }
    if (m && m.t === 'm' && m.cz) { if (MP.invitado) czDelDueno(m.cz, m.czh); return; }
    if (m && m.t === 'records' && m.tabla === 'caceria' && window.__dia) {
      const R = __dia.REC; R.datos.caceria = { siempre: m.siempre || [], semana: m.semana || [], yoS: m.yoS, yoW: m.yoW };
      if (R.esperaNuevo === 'caceria' && m.nuevo && m.yoW) aviso(TR('recNuevo', { p: m.yoW[0] }), 2600);
      R.esperaNuevo = null; if (!$('recCapa').hidden) pintarRecords(); return; }
    if (m && m.t === 'creada' && czEs() && czSalaPedida) { const r = r0(m); aviso(TR('czSalaLista', { c: escCZ(m.codigo) }), 6000); czSalaPedida = null; return r; }
    if (m && m.t === 'cerrada' && MP.invitado && czEs()) { const r = r0(m); setTimeout(() => aviso(TR('czSeFue'), 3500), 50); return r; }
    if (m && m.t === 'entra' && MP.dueno && czEs()) { const r = r0(m); czEnvioT = 0; return r; }
    return r0(m); }; }
// lista de salas: marca las que son de cacería
{ const p0 = pintarLista; pintarLista = function (salas) { const r = p0.apply(this, arguments);
    try { const filas = document.querySelectorAll('#mpLista .mpSala'); (salas || []).forEach((s, k) => { if (s.tipo === 'caceria' && filas[k]) { const n = filas[k].querySelector('.nom'); if (n && !n.querySelector('.czBadge')) n.insertAdjacentHTML('afterbegin', `<span class="czBadge">${TR('czBadge')}</span>`); } }); } catch (e) {}
    return r; }; }
// mis mundos: marca los de cacería
{ const p0 = pintarMundos; pintarMundos = function () { const r = p0.apply(this, arguments);
    try { const l = leerLista(); for (const b of document.querySelectorAll('#listaMundos [data-entrar]')) { const m = l.find(x => x.id === b.dataset.entrar); if (m && m.tipo === 'caceria') { const f = b.closest('.mundoFila'), sm = f && f.querySelector('.info small'); if (sm && !sm.querySelector('.czBadge')) sm.insertAdjacentHTML('afterbegin', `<span class="czBadge">${TR('czBadge')}</span>`); } } } catch (e) {}
    return r; }; }
// récords: pestaña "Cazadores"
{ const sp = $('recTabs').querySelector('[data-tb="oleadas"]'); if (sp) { const b = document.createElement('div'); b.className = 'mb'; b.dataset.tb = 'caceria'; b.dataset.i = 'recCaceria'; sp.parentNode.insertBefore(b, sp.nextSibling); aplicarIdioma(); } }
{ const p0 = pintarRecords; pintarRecords = function () {
    if (__dia.REC.tabla !== 'caceria') return p0.apply(this, arguments);
    const R = __dia.REC;
    for (const d of document.querySelectorAll('#recTabs [data-tb]')) d.classList.toggle('on', d.dataset.tb === R.tabla);
    for (const d of document.querySelectorAll('#recTabs [data-vs]')) d.classList.toggle('on', d.dataset.vs === R.vista);
    const r = R.datos.caceria; if (!r) { $('recLista').innerHTML = `<div class="recF">${TR('recCargando')}</div>`; $('recYo').textContent = ''; return; }
    const l = R.vista === 'semana' ? r.semana : r.siempre, yo = R.vista === 'semana' ? r.yoW : r.yoS, val = v => TR('recPts', { n: v });
    $('recLista').innerHTML = l.length ? l.map(([n, v], k) => `<div class="recF${yo && yo[0] === k + 1 ? ' yo' : ''}"><div class="pos">${k < 3 ? SVG_COPA(COPAS[k]) : k + 1}</div><div class="nom">${escCZ(n)}</div><div class="val">${val(+v)}</div></div>`).join('') : `<div class="recF">${TR('recNadie')}</div>`;
    $('recYo').textContent = yo ? TR('recTu', { p: yo[0], v: val(yo[1]) }) : TR('recSinTu');
  }; }

// ═════════ CADA CUADRO ═════════
let czPista = 30, czRugidoT = 20, czRevT = 0, czHudT = 0;
function caceriaFrame(dt) {
  if (!jugando || !czEs()) { czBru.hidden = czBar.hidden = czPtsEl.hidden = true; return; }
  moverHuellas(dt);
  czHudT -= dt; if (czHudT <= 0) { czHudT = .2; pintarHud(); }
  // estela dorada de los Pro con la lanza en la mano
  if (barra[sel] === I.LANZA && J.rapidez > 1 && typeof esPro === 'function' && esPro()) { czOroT -= dt; if (czOroT <= 0) { czOroT = .14; polvo(J.x, J.y + .3, J.z, Math.random() < .5 ? '#ffd23a' : '#fff6c0', 2); } }
  if (czInvitado()) { flechasInvitado(); return; }
  const C = mapa.caza; if (!C || !C.on) return;
  if (pausado && !czEnLinea()) return;
  const a = umbrak();
  if (!C.fin) {
    czRevT -= dt; if (czRevT <= 0) { czRevT = 1.5; if (!a) czPonerUmbrak({ x: C.x || SX / 2, z: C.z || SZ / 2 }); }
    if (a) { const u = a.userData, e = ex(a); if (u.inv > 0) u.inv -= dt; C.st = e.st; C.x = a.position.x; C.z = a.position.z;
      // huellas mientras camina
      u.pasoT = (u.pasoT || 0) + dt; const ult = u.ultPaso || (u.ultPaso = { x: a.position.x, z: a.position.z, l: 1 });
      if (Math.hypot(a.position.x - ult.x, a.position.z - ult.z) > 1.6) { u.ultPaso = { x: a.position.x, z: a.position.z, l: -ult.l }; czHuella(a.position.x, a.position.z, a.rotation.y, ult.l); }
      // rugidos y pistas mientras se esconde
      if (e.st !== 'pelea') {
        czRugidoT -= dt; if (czRugidoT <= 0) { czRugidoT = 22 + Math.random() * 12; czRugir(a.position.x, a.position.z, false); }
        czPista -= dt; if (czPista <= 0) { czPista = 34; const j = czJugadores().sort((p, q) => Math.hypot(p.x - a.position.x, p.z - a.position.z) - Math.hypot(q.x - a.position.x, q.z - a.position.z))[0];
          const ang = Math.atan2(a.position.x - j.x, a.position.z - j.z), dd = Math.min(18, Math.hypot(a.position.x - j.x, a.position.z - j.z) * .6);
          czRastro(a.position.x - Math.sin(ang) * dd, a.position.z - Math.cos(ang) * dd, a.position.x, a.position.z); }
      }
    }
  }
  czEnvioT -= dt; if (czEnvioT <= 0) { czEnvioT = .5; czMandar(); }
}
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; try { caceriaFrame(dt); } catch (e) { console.error(e); } }; requestAnimationFrame(tick); }
// al salir al menú se esconde todo
{ const s0 = salirAlMenu; salirAlMenu = function () { czBru.hidden = czBar.hidden = czPtsEl.hidden = true; czHuellas.splice(0).forEach(h => escena.remove(h.m)); cerrar('czFinCapa'); CZR = null; return s0.apply(this, arguments); }; }
aplicarIdioma();
window.__caza = { empezarCaza, danarUmbrak, umbrak, czEstado, abrirCaceria, crearCaceria, rastro: czRastro, huellas: czHuellas };
