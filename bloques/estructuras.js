'use strict';
// ═════════ ESTRUCTURAS NUEVAS DEL MUNDO: Fortaleza, Templo del desierto y Templo de la selva ═════════
// Solo en mundos nuevos (versión de generación 3), así los mundos que ya existen no cambian.
// · Fortaleza: murallas, cuatro torres y una sala central con el Altar estelar (el camino al Confín).
// · Templo del desierto: pirámide de arena con una cámara del tesoro abajo y una trampa de arañas.
// · Templo de la selva: templo cubierto de enredaderas con un pasillo de flechas y su tesoro.
// Los barcos hundidos ya vienen del mar (mar.js). Bloques y objetos: solo los que ya existen + el Altar estelar (confin.js).

Object.assign(TX.es, { estFortaleza: 'LA FORTALEZA<small>en el centro está el Altar estelar</small>', estTrampa: '¡TRAMPA!', estDesierto: 'TEMPLO DEL DESIERTO', estSelva: 'TEMPLO DE LA SELVA' });
Object.assign(TX.en, { estFortaleza: 'THE FORTRESS<small>the Star Altar is in the middle</small>', estTrampa: "IT'S A TRAP!", estDesierto: 'DESERT TEMPLE', estSelva: 'JUNGLE TEMPLE' });
Object.assign(TX.pt, { estFortaleza: 'A FORTALEZA<small>no centro está o Altar estelar</small>', estTrampa: 'ARMADILHA!', estDesierto: 'TEMPLO DO DESERTO', estSelva: 'TEMPLO DA SELVA' });
if (TX.tr) Object.assign(TX.tr, { estFortaleza: 'KALE<small>ortada Yıldız Sunağı var</small>', estTrampa: 'TUZAK!', estDesierto: 'ÇÖL TAPINAĞI', estSelva: 'ORMAN TAPINAĞI' });
if (TX.id) Object.assign(TX.id, { estFortaleza: 'BENTENG<small>Altar Bintang ada di tengah</small>', estTrampa: 'JEBAKAN!', estDesierto: 'KUIL GURUN', estSelva: 'KUIL HUTAN' });
if (TX.ar) Object.assign(TX.ar, { estFortaleza: 'القلعة<small>مذبح النجوم في الوسط</small>', estTrampa: 'فخ!', estDesierto: 'معبد الصحراء', estSelva: 'معبد الغابة' });

// mundos nuevos: generación 3 (la 2 sigue igual para los mundos que ya existen)
crearMundo = function (modo, ejemplo = false) {
  const lista = leerLista(), id = Date.now().toString(36), n = lista.length + 1;
  lista.unshift({ id, nombre: 'Mundo ' + n, num: n, modo, ejemplo, tam: ejemplo ? 160 : (window.tamNuevo || 160), semilla: ejemplo ? SEMILLA_EJEMPLO : (Math.random() * 2147483647) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0, gen: ejemplo ? 2 : 3 });
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  pantallaCompleta(); entrarMundo(id);
};

const EST = { lista: [], cofres: new Map(), trampas: [] };
function generarEstructuras(S) {
  EST.lista = []; EST.cofres = new Map(); EST.trampas = [];
  const put = (x, y, z, t) => { if (dentro(x, y, z)) mundo[idx(x, y, z)] = t; };
  const at = (x, y, z) => dentro(x, y, z) ? mundo[idx(x, y, z)] : 0;
  const sup = (x, z) => { let y = SY - 2; while (y > 0 && (!mundo[idx(x, y, z)] || (DEF[mundo[idx(x, y, z)]] || {}).planta || mundo[idx(x, y, z)] === B.HOJAS || mundo[idx(x, y, z)] === B.HOJAS_SELVA || mundo[idx(x, y, z)] === B.HOJAS_PINO || mundo[idx(x, y, z)] === B.TRONCO || mundo[idx(x, y, z)] === B.ENREDADERA)) y--; return y; };
  const cofre = (x, y, z, tipo) => { put(x, y, z, B.COFRE); EST.cofres.set(idx(x, y, z), tipo); };
  const lejos = (x, z, r) => Math.hypot(x - spawn.x, z - spawn.z) > r + 8 && !(aldeas || []).some(a => Math.hypot(a.x - x, a.z - z) < r + 5) && !(ruinas || []).some(a => Math.hypot((a.x ?? a[0]) - x, (a.z ?? a[2]) - z) < r) && !EST.lista.some(e => Math.hypot(e.x - x, e.z - z) < r + e.r + 6);
  // busca un lugar firme y bastante plano para una huella de (2r+1)x(2r+1)
  function lugar(r, pred, semi, rango = 7, agua = 0) {
    for (let n = 0; n < 3000; n++) {
      const x = r + 3 + Math.floor(h3(n, 1, semi, S + 500) * (SX - 2 * r - 6)), z = r + 3 + Math.floor(h3(n, 2, semi, S + 501) * (SZ - 2 * r - 6));
      if (!pred(x, z) || !lejos(x, z, r)) continue;
      const hs = []; let mojado = 0, tot = 0;
      for (let a = -r; a <= r; a += 2) for (let b = -r; b <= r; b += 2) { const y = sup(x + a, z + b), t = at(x + a, y, z + b); tot++; if (t === B.AGUA || t === B.HIELO || y <= SEA) mojado++; else hs.push(y); }
      if (mojado > tot * agua || hs.length < 4) continue; hs.sort((p, q) => p - q); const med = hs[Math.floor(hs.length / 2)];
      if (hs[Math.floor(hs.length * .9)] - hs[Math.floor(hs.length * .1)] > rango) continue;
      return { x, z, y: Math.max(med, SEA + 2) };
    }
    return null;
  }
  // aplana: rellena debajo y despeja arriba
  function aplanar(x0, z0, r, y, relleno, alto = 16) {
    for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) { const x = x0 + a, z = z0 + b;
      for (let yy = y - 8; yy <= y; yy++) if (!at(x, yy, z) || at(x, yy, z) === B.AGUA || yy === y) put(x, yy, z, yy === y ? relleno : B.PIEDRA);
      for (let yy = y + 1; yy <= y + alto; yy++) put(x, yy, z, B.AIRE); }
  }

  // ───── FORTALEZA ─────
  const f = lugar(11, (x, z) => { const b = biomaDe ? biomaDe(x, z) : 0; return b === 0 || b === 2 || b === 4; }, 3) || lugar(11, () => true, 4, 9, .12) || lugar(11, () => true, 5, 14, .3);
  if (f) {
    const { x: X, z: Z, y: Y } = f, P = B.LADRILLO_P; aplanar(X, Z, 11, Y, B.ADOQUIN, 16);
    // muralla con almenas
    for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) { if (Math.abs(a) !== 10 && Math.abs(b) !== 10) continue;
      const puerta = b === 10 && Math.abs(a) <= 1; for (let h = 1; h <= 5; h++) if (!(puerta && h <= 3)) put(X + a, Y + h, Z + b, P);
      if ((a + b) % 2 === 0) put(X + a, Y + 6, Z + b, P); }
    // camino de ronda por dentro
    for (let a = -9; a <= 9; a++) for (let b = -9; b <= 9; b++) if (Math.abs(a) === 9 || Math.abs(b) === 9) put(X + a, Y + 5, Z + b, P);
    // cuatro torres
    for (const [sa, sb] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const tx = X + sa * 10, tz = Z + sb * 10;
      for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) { const borde = Math.abs(a) === 2 || Math.abs(b) === 2;
        for (let h = 1; h <= 9; h++) put(tx + a, Y + h, tz + b, borde ? (h === 4 || h === 7) && (a === 0 || b === 0) ? B.VIDRIO : P : B.AIRE);
        put(tx + a, Y + 9, tz + b, P); if (borde && (a + b) % 2 === 0) put(tx + a, Y + 10, tz + b, P); }
      for (let h = 1; h <= 9; h++) put(tx - sa, Y + h, tz - sb, B.ESCALERA);   // escalera por dentro, sale arriba por un hueco
      put(tx, Y + 10, tz, B.FAROL); }
    // salón central con el Altar estelar
    for (let a = -5; a <= 5; a++) for (let b = -5; b <= 5; b++) { const borde = Math.abs(a) === 5 || Math.abs(b) === 5;
      put(X + a, Y, Z + b, (a + b) % 2 ? B.MARMOL : B.OBSIDIANA);
      for (let h = 1; h <= 6; h++) put(X + a, Y + h, Z + b, borde ? (h === 3 && (Math.abs(a) === 3 || Math.abs(b) === 3) && !(Math.abs(a) === 5 && Math.abs(b) === 5) ? B.VIDRIO : P) : B.AIRE);
      put(X + a, Y + 7, Z + b, P); if (borde && (a + b) % 2 === 0) put(X + a, Y + 8, Z + b, P); }
    put(X, Y + 1, Z + 5, B.PUERTA); put(X, Y + 2, Z + 5, B.PUERTA);
    // tarima con el altar y cuatro columnas de cristal
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) put(X + a, Y + 1, Z + b, B.MARMOL);
    put(X, Y + 2, Z, B.ALTAR_E);
    for (const [a, b] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) { put(X + a, Y + 1, Z + b, B.OBSIDIANA); put(X + a, Y + 2, Z + b, B.CRISTAL_OSC_M); put(X + a, Y + 3, Z + b, B.FAROL); }
    // biblioteca al fondo y dos cofres
    for (let a = -4; a <= 4; a++) if (Math.abs(a) > 1) { put(X + a, Y + 1, Z - 4, B.ESTANTE); put(X + a, Y + 2, Z - 4, B.ESTANTE); }
    cofre(X - 4, Y + 1, Z + 3, 'fortaleza'); cofre(X + 4, Y + 1, Z + 3, 'fortaleza');
    // patio: faroles y un pozo de agua
    for (const [a, b] of [[-7, 7], [7, 7], [-7, -7], [7, -7]]) put(X + a, Y + 1, Z + b, B.FAROL);
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) { put(X + 7 + a, Y + 1, Z + b, Math.abs(a) + Math.abs(b) ? B.ADOQUIN : B.AGUA); }
    EST.lista.push({ tipo: 'fortaleza', x: X + .5, z: Z + .5, y: Y, r: 11, sala: { x0: X - 4.5, x1: X + 5.5, z0: Z - 4.5, z1: Z + 5.5, y0: Y, y1: Y + 7 } });
  }

  // ───── TEMPLO DEL DESIERTO ─────
  const d = lugar(8, (x, z) => biomaDe && biomaDe(x, z) === 1, 7) || lugar(8, (x, z) => biomaDe && biomaDe(x, z) === 1, 8, 11, .15);
  if (d) {
    const { x: X, z: Z, y: Y } = d, NAR = B.TELA + 2, ROJ = B.TELA + 1; aplanar(X, Z, 8, Y, B.ARENA, 12);
    // pirámide escalonada
    for (let k = 0; k <= 6; k++) { const r = 7 - k; for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) { const borde = Math.abs(a) === r || Math.abs(b) === r;
      put(X + a, Y + 1 + k, Z + b, borde && k % 2 === 1 ? ((a + b) % 2 ? NAR : ROJ) : B.ARENA); } }
    put(X, Y + 8, Z, B.B_ORO);
    // sala de adentro y entrada por el sur
    for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) for (let h = 1; h <= 3; h++) put(X + a, Y + h, Z + b, B.AIRE);
    for (let b = 3; b <= 8; b++) for (let h = 1; h <= 2; h++) put(X, Y + h, Z + b, B.AIRE);
    for (const [a, b] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) put(X + a, Y + 2, Z + b, B.ANTORCHA);
    // bajada a la cámara del tesoro
    for (let h = Y; h >= Y - 5; h--) put(X, h, Z - 2, B.AIRE);
    for (let h = Y - 5; h <= Y; h++) put(X, h, Z - 3, B.ARENA), put(X, h, Z - 2, B.ESCALERA);
    // cámara: 4 cofres, telarañas y una placa trampa en el medio
    for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) { for (let h = Y - 7; h <= Y - 2; h++) put(X + a, h, Z + b, (Math.abs(a) === 3 || Math.abs(b) === 3 || h === Y - 7 || h === Y - 2) ? (h === Y - 7 ? ROJ : B.ARENA) : B.AIRE); }
    for (let h = Y - 6; h <= Y; h++) put(X, h, Z - 2, B.ESCALERA);
    for (const [a, b] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) cofre(X + a, Y - 6, Z + b, 'desierto');
    for (const [a, b] of [[-2, 0], [2, 0], [0, 2]]) put(X + a, Y - 6, Z + b, B.TELARANA);
    put(X, Y - 6, Z, B.PLACA); put(X - 2, Y - 4, Z - 2, B.ANTORCHA); put(X + 2, Y - 4, Z + 2, B.ANTORCHA);
    EST.trampas.push({ i: idx(X, Y - 6, Z), tipo: 'aranas', x: X + .5, y: Y - 6, z: Z + .5 });
    EST.lista.push({ tipo: 'desierto', x: X + .5, z: Z + .5, y: Y, r: 8 });
  }

  // ───── TEMPLO DE LA SELVA ─────
  const s = lugar(7, (x, z) => biomaDe && biomaDe(x, z) === 3, 9) || lugar(7, (x, z) => biomaDe && biomaDe(x, z) === 3, 10, 11, .15);
  if (s) {
    const { x: X, z: Z, y: Y } = s, M = B.ADOQUIN; aplanar(X, Z, 7, Y, M, 14);
    for (let k = 0; k <= 2; k++) { const r = 6 - k * 2, h0 = Y + 1 + k * 4;
      for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) { const borde = Math.abs(a) === r || Math.abs(b) === r;
        for (let h = 0; h < 4; h++) put(X + a, h0 + h, Z + b, borde ? (h3(a, h, b, S + 77) < .25 ? B.HOJAS_SELVA : M) : h === 3 ? M : B.AIRE); } }
    // enredaderas colgando por fuera
    for (let a = -7; a <= 7; a++) for (const b of [-7, 7]) if (h3(a, b, 3, S + 78) < .35) for (let h = 1; h <= 3; h++) put(X + a, Y + 5 - h, Z + b, B.ENREDADERA);
    // entrada al sur y pasillo de flechas
    for (let b = 1; b <= 6; b++) for (let h = 1; h <= 2; h++) put(X, Y + h, Z + b, B.AIRE);
    put(X, Y + 1, Z + 3, B.PLACA); put(X - 1, Y + 2, Z + 1, B.DISPENSADOR); put(X + 1, Y + 2, Z + 1, B.DISPENSADOR);
    EST.trampas.push({ i: idx(X, Y + 1, Z + 3), tipo: 'flechas', x: X + .5, y: Y + 1, z: Z + 3.5, desde: [[X - .5, Y + 2.5, Z + 1.5], [X + 1.5, Y + 2.5, Z + 1.5]] });
    // tesoro en el centro, arriba de todo una antorcha
    cofre(X, Y + 1, Z - 3, 'selva'); cofre(X - 3, Y + 1, Z - 1, 'selva'); put(X + 3, Y + 1, Z - 1, B.ANTORCHA); put(X - 3, Y + 2, Z - 3, B.ANTORCHA);
    put(X, Y + 13, Z, B.FAROL);
    EST.lista.push({ tipo: 'selva', x: X + .5, z: Z + .5, y: Y, r: 7 });
  }
}
{ const p0 = prepararMundo; prepararMundo = function (S, ej) { const r = p0.apply(this, arguments);
    EST.lista = []; EST.cofres = new Map(); EST.trampas = [];
    if ((window.genVersion || 1) >= 3 && !window.mundoTipo && !ej) { try { generarEstructuras(S); } catch (e) { console.error(e); } }
    return r; }; }
// cofres con su tesoro
{ const l0 = lootCofre; lootCofre = function (i) {
  const t = !window.mundoTipo && EST.cofres.get(i); if (!t) return l0(i);
  const r = k => h3(i, k, 13, semilla + 990), c = {};
  if (t === 'fortaleza') { c[I.HIERRO] = 4 + Math.floor(r(1) * 5); c[I.ORO] = 3 + Math.floor(r(2) * 4); c[B.OBSIDIANA] = 4; c[I.CRISTAL] = 2 + Math.floor(r(3) * 3); c[I.PAN] = 3; if (r(4) < .5) c[I.ARM + 4 + Math.floor(r(5) * 4)] = 1; else c[I.ESP3] = 1; c[I.FLECHA] = 6 + Math.floor(r(6) * 8); }
  else if (t === 'desierto') { c[I.ORO] = 4 + Math.floor(r(1) * 6); c[I.CRISTAL] = 1 + Math.floor(r(2) * 3); c[I.HUESO] = 2 + Math.floor(r(3) * 4); if (r(4) < .45) c[I.PICO_E] = 1; else c[I.POCION + Math.floor(r(5) * 4)] = 1 + Math.floor(r(6) * 2); if (r(7) < .3) c[B.TNT] = 2; }
  else { c[I.ORO] = 3 + Math.floor(r(1) * 4); c[I.CRISTAL] = 2 + Math.floor(r(2) * 3); c[I.FLECHA] = 8 + Math.floor(r(3) * 10); c[I.MANZANA] = 2 + Math.floor(r(4) * 3); if (r(5) < .4) c[I.ESP_E] = 1; else c[I.ARCO] = 1; if (r(6) < .4) c[B.HUEVO + 3] = 1; }
  return c; }; }

// ═════════ TRAMPAS Y LLEGADAS ═════════
const trampaUsada = t => (mapa.trampas || {})[t.i];
function estFrame(dt) {
  if (!jugando || pausado || window.mundoTipo) return;
  const yo = [Math.floor(J.x), Math.floor(J.y + .05), Math.floor(J.z)];
  for (const t of EST.trampas) {
    if (trampaUsada(t) || creativo()) continue;
    if (Math.floor(t.x) === yo[0] && Math.floor(t.z) === yo[2] && Math.abs(t.y - J.y) < 1.2 && mundo[t.i] === B.PLACA) {
      (mapa.trampas || (mapa.trampas = {}))[t.i] = 1; sucio = true; aviso(TR('estTrampa'), 1500); son(180, .3, 'sawtooth', .14);
      if (t.tipo === 'aranas' && TIPOS.arana) for (let k = 0; k < 3; k++) { const g = crearAnimal('arana', t.x + Math.cos(k * 2.1) * 1.8, t.y + .2, t.z + Math.sin(k * 2.1) * 1.8); if (typeof ex === 'function') ex(g).f = 1; }
      if (t.tipo === 'flechas' && typeof disparar === 'function') { let n = 0; const iv = setInterval(() => { for (const [x, y, z] of t.desde) disparar('flecha', x, y, z, J.x, J.y + 1.1, J.z); if (++n >= 3) clearInterval(iv); }, 380); }
    }
  }
  // entrar a la Fortaleza: logro y guardias la primera vez
  const f = EST.lista.find(e => e.tipo === 'fortaleza');
  if (f) { const s = f.sala; if (J.x > s.x0 && J.x < s.x1 && J.z > s.z0 && J.z < s.z1 && J.y >= s.y0 && J.y < s.y1) {
    if (!stats.fortaleza) { stats.fortaleza = 1; sucio = true; aviso(TR('estFortaleza'), 2600); if (typeof revisarLogros === 'function') setTimeout(() => { try { revisarLogros(); } catch (e) {} }, 200);
      if (!creativo() && TIPOS.arquero && !mapa.fortGuardias) { mapa.fortGuardias = 1; for (let k = 0; k < 2; k++) { const g = crearAnimal('arquero', f.x + (k ? 7 : -7), f.y + 1, f.z + 7); if (typeof ex === 'function') ex(g).f = 1; } } } } }
}
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; try { estFrame(dt); } catch (e) { console.error(e); } }; requestAnimationFrame(tick); }

// ═════════ LOGROS ═════════
addEventListener('load', () => { try {
  if (typeof LOGROS === 'undefined' || LOGROS.some(l => l[0] === 'fortaleza')) return;
  const nuevos = [
    ['fortaleza', B.ALTAR_E, () => !!(stats && stats.fortaleza), 'La Fortaleza', 'Entra al salón del Altar estelar', 'The Fortress', 'Enter the Star Altar hall', 'A Fortaleza', 'Entre no salão do Altar estelar'],
    ['confin', B.PORTAL_E, () => window.mundoTipo === 'confin', 'Más allá de las estrellas', 'Viaja a las Islas del Confín', 'Beyond the Stars', 'Travel to the Farthest Isles', 'Além das estrelas', 'Viaje para as Ilhas do Confim'],
    ['vigia', I.FRAGMENTO_E, () => !!(stats && stats.vigia), 'El final del viaje', 'Vence al Vigía de las Estrellas', "The Journey's End", 'Defeat the Star Warden', 'O fim da jornada', 'Derrote o Vigia das Estrelas'],
  ];
  LOGROS.splice(LOGROS.findIndex(l => l[0] === 'todos'), 0, ...nuevos);
  const tx = { tr: { fortaleza: ['Kale', 'Yıldız Sunağı salonuna gir'], confin: ['Yıldızların Ötesinde', "Uç Adalar'a yolculuk yap"], vigia: ['Yolculuğun Sonu', "Yıldız Bekçisi'ni yen"] },
    id: { fortaleza: ['Benteng', 'Masuki aula Altar Bintang'], confin: ['Melampaui Bintang', 'Pergi ke Pulau-Pulau Ujung'], vigia: ['Akhir Perjalanan', 'Kalahkan Penjaga Bintang'] },
    ar: { fortaleza: ['القلعة', 'ادخل قاعة مذبح النجوم'], confin: ['ما وراء النجوم', 'سافر إلى الجزر القصوى'], vigia: ['نهاية الرحلة', 'اهزم حارس النجوم'] } };
  if (typeof LANG_EXTRA !== 'undefined') for (const l in tx) { LANG_EXTRA[l] = LANG_EXTRA[l] || {}; LANG_EXTRA[l].logros = Object.assign(LANG_EXTRA[l].logros || {}, tx[l]); }
} catch (e) { console.error(e); } });

window.__est = { EST, generarEstructuras, fortaleza: () => (!window.mundoTipo && EST.lista.find(e => e.tipo === 'fortaleza')) || null };
