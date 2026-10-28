'use strict';
// ═════════ PERSONAJES MÁS VIVOS ═════════
// · Misiones de los aldeanos: cada aldeano pide algo (traer cosas o vencer monstruos) y da una recompensa. Al otro día pide otra.
// · Pueblos con estilo de cada bioma (mundos nuevos, generación 7): pueblo de cerezos, de hongos y de la sabana.
// · Mascotas que pelean con vos y suben de nivel (perro, gato, zorro, panda, miniojón).

{
const TXT = {
  es: { msTit: 'Misión', msTraer: 'Tráeme {n} {o}', msMatar: 'Vence {n} monstruos ({a}/{n})', msPremio: 'Te doy: {p}', msEntregar: 'Entregar', msHecha: '¡MISIÓN CUMPLIDA!<small>{p}</small>', msGracias: '¡Gracias! Vuelve mañana y tendré otro pedido.',
    msLista: 'MISIÓN LISTA<small>vuelve con el aldeano</small>', msFalta: 'TODAVÍA TE FALTA', pu_cerezos: 'Pueblo de los cerezos', pu_hongos: 'Pueblo de los hongos', pu_sabana: 'Pueblo de la sabana', puAviso: '{n}',
    pmNivel: '¡TU {m} SUBIÓ A NIVEL {n}!<small>pega más fuerte y tiene más vida</small>', pmPelea: 'TU {m} ATACA' },
  en: { msTit: 'Quest', msTraer: 'Bring me {n} {o}', msMatar: 'Defeat {n} monsters ({a}/{n})', msPremio: 'Reward: {p}', msEntregar: 'Deliver', msHecha: 'QUEST COMPLETE!<small>{p}</small>', msGracias: 'Thanks! Come back tomorrow for another request.',
    msLista: 'QUEST READY<small>go back to the villager</small>', msFalta: 'YOU STILL NEED MORE', pu_cerezos: 'Cherry Village', pu_hongos: 'Mushroom Village', pu_sabana: 'Savanna Village', puAviso: '{n}',
    pmNivel: 'YOUR {m} REACHED LEVEL {n}!<small>it hits harder and has more health</small>', pmPelea: 'YOUR {m} ATTACKS' },
  pt: { msTit: 'Missão', msTraer: 'Traga {n} {o}', msMatar: 'Derrote {n} monstros ({a}/{n})', msPremio: 'Eu te dou: {p}', msEntregar: 'Entregar', msHecha: 'MISSÃO CUMPRIDA!<small>{p}</small>', msGracias: 'Obrigado! Volte amanhã que terei outro pedido.',
    msLista: 'MISSÃO PRONTA<small>volte ao aldeão</small>', msFalta: 'AINDA FALTA', pu_cerezos: 'Vila das cerejeiras', pu_hongos: 'Vila dos cogumelos', pu_sabana: 'Vila da savana', puAviso: '{n}',
    pmNivel: 'SEU {m} SUBIU PARA O NÍVEL {n}!<small>bate mais forte e tem mais vida</small>', pmPelea: 'SEU {m} ATACA' } };
for (const l in TXT) Object.assign(TX[l], TXT[l]);
const az = (a, b) => a + Math.random() * (b - a);

// ═════════ MISIONES DE LOS ALDEANOS ═════════
const PEDIDOS = () => [
  ['traer', B.MADERA, 16, [I.ORO, 2]], ['traer', I.CARNE_A, 4, [I.ORO, 3]], ['traer', I.PAN, 3, [I.ORO, 2]], ['traer', I.PESCADO, 5, [I.ORO, 2]],
  ['traer', I.HUESO, 6, [I.ORO, 3]], ['traer', B.TRONCO, 10, [I.SEMILLA_DORADA || I.ORO, 1]], ['traer', I.CARBON, 12, [I.HIERRO, 3]], ['traer', I.HIERRO, 6, [I.CRISTAL, 1]],
  ['traer', B.HONGO_LUZ || B.HONGO_R, 3, [I.PERLA || I.ORO, 2]], ['traer', B.TRONCO_CEREZO || B.TRONCO, 6, [I.ORO, 3]], ['traer', I.TRIGO_I, 15, [I.PAN, 6]], ['traer', B.TELA, 6, [I.ESCUDO || I.ORO, 1]],
  ['matar', 0, 5, [I.ORO, 4]], ['matar', 0, 8, [I.LANZA_H || I.ORO, 1]], ['matar', 0, 12, [I.HACHA_GUERRA || I.ORO, 1]] ].filter(p => p[1] != null && p[3][0] != null);
const matados = () => (stats.matados = stats.matados || 0);
function misionDe(a) {
  const e = ex(a); const dia = typeof numDia === 'function' ? numDia() : 1;
  if (!e.ms || (e.ms.hecha && dia > (e.ms.dia || 0))) { const L = PEDIDOS(), p = L[Math.floor(Math.random() * L.length)]; e.ms = { t: p[0], id: p[1], n: p[2], premio: p[3], dia, base: matados(), hecha: false }; sucio = true; }
  return e.ms;
}
const progreso = ms => ms.t === 'matar' ? Math.min(ms.n, matados() - ms.base) : Math.min(ms.n, inv[ms.id] || 0);
{ const st = document.createElement('style'); st.textContent = `#msCaja { margin: 0 0 10px; padding: 10px 12px; border-radius: 14px; background: linear-gradient(#fff6d8, #ffe9a8); border: 2px solid #ffb21a; display: flex; gap: 10px; align-items: center; }
  #msCaja .tx { flex: 1; font-size: 14px; font-weight: 700; color: #1b2a6b; } #msCaja .tx small { display: block; font-size: 12px; color: #6b5a2a; margin-top: 2px; } #msCaja .mb { padding: 6px 12px; border-radius: 10px; background: #36c95a; border: 2px solid #1f7a36; color: #fff; font-weight: 800; cursor: pointer; white-space: nowrap; } #msCaja .mb.no { opacity: .45; }`; document.head.appendChild(st); }
{ const p0 = pintarTrato; pintarTrato = function () { const r = p0.apply(this, arguments); try { pintarMision(); } catch (e) {} return r; }; }
function pintarMision() {
  const a = tratoCon; if (!a) return; let caja = $('msCaja'); if (!caja) { caja = document.createElement('div'); caja.id = 'msCaja'; $('tratoLista').parentElement.insertBefore(caja, $('tratoLista')); }
  if (creativo()) { caja.hidden = true; return; } caja.hidden = false;
  const ms = misionDe(a), pr = progreso(ms), ok = pr >= ms.n, premio = ms.premio[1] + ' ' + nom(ms.premio[0]);
  if (ms.hecha) { caja.innerHTML = `${slotHTML(ms.premio[0], ms.premio[1])}<div class="tx">${TR('msGracias')}</div>`; return; }
  const txt = ms.t === 'matar' ? TR('msMatar', { n: ms.n, a: pr }) : TR('msTraer', { n: ms.n, o: nom(ms.id) }) + ` (${pr}/${ms.n})`;
  caja.innerHTML = `${ms.t === 'traer' ? slotHTML(ms.id, ms.n) : slotHTML(I.ESP3, 1)}<div class="tx">${TR('msTit')}: ${txt}<small>${TR('msPremio', { p: premio })}</small></div><div class="mb${ok ? '' : ' no'}" id="msEntregar">${TR('msEntregar')}</div>`;
  $('msEntregar').onclick = () => { const ms2 = misionDe(a); if (progreso(ms2) < ms2.n) { aviso(TR('msFalta'), 900); return; }
    if (ms2.t === 'traer') quitarItem(ms2.id, ms2.n); darItem(ms2.premio[0], ms2.premio[1]); ms2.hecha = true; sucio = true;
    stats.misiones = (stats.misiones || 0) + 1; aviso(TR('msHecha', { p: premio }), 2200); sonar('mision', .7) || son(880, .2, 'triangle', .1); pintarTrato(); };
}
// contar monstruos vencidos (los de la noche y las criaturas hostiles)
{ const q0 = quitarMonstruo; quitarMonstruo = function (m, humo = true) { if (humo && jugando && monstruos.includes(m) && m.userData.vida <= 0) contarMuerte(); return q0.apply(this, arguments); }; }
{ const m0 = matarAnimal; matarAnimal = function (a) { const T = TIPOS[a.userData.animal]; if (T && T.hostil && jugando) contarMuerte(); return m0.apply(this, arguments); }; }
function contarMuerte() { if (creativo()) return; stats.matados = matados() + 1;
  const pend = animales.some(a => { const e = a.userData.extra; return e && e.ms && !e.ms.hecha && e.ms.t === 'matar' && matados() - e.ms.base === e.ms.n; }); if (pend) setTimeout(() => aviso(TR('msLista'), 2000), 600); }

// ═════════ PUEBLOS CON ESTILO DE CADA BIOMA (generación 7) ═════════
let PUEBLOS = [];
crearMundo = function (modo, ejemplo = false) {
  const lista = leerLista(), id = Date.now().toString(36), n = lista.length + 1;
  lista.unshift({ id, nombre: 'Mundo ' + n, num: n, modo, ejemplo, tam: ejemplo ? 160 : (window.tamNuevo || 160), semilla: ejemplo ? SEMILLA_EJEMPLO : (Math.random() * 2147483647) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0, gen: ejemplo ? 2 : 7 });
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  pantallaCompleta(); entrarMundo(id);
};
{ const p0 = prepararMundo; prepararMundo = function (S, ej) { PUEBLOS = []; const r = p0.apply(this, arguments);
    if ((window.genVersion || 1) >= 7 && !window.mundoTipo && !ej) { try { generarPueblos(S); } catch (e) { console.error(e); } }
    return r; }; }
const ESTILO = {
  cerezos: { pared: () => B.TABLONES_CEREZO || B.MADERA, poste: B.TRONCO_CEREZO || B.TRONCO, techo: (k) => B['TERRACOTA_15'] || B.LADRILLO, piso: B.MADERA, forma: 'casa' },
  hongos: { pared: () => B.TALLO_HONGO, poste: B.TALLO_HONGO, techo: k => k % 2 ? B.SOMBRERO_M : B.SOMBRERO_R, piso: B.MICELIO, forma: 'hongo' },
  sabana: { pared: () => B.LADR_BARRO || B.ARENISCA, poste: B.TRONCO_ACACIA || B.TRONCO, techo: () => B.TABLONES_ACACIA || B.MADERA, piso: B.LADR_BARRO || B.ARENISCA, forma: 'casa' } };
function generarPueblos(S) {
  const Z = (window.__biomas && __biomas.zonas()) || [];
  const at = (x, y, z) => dentro(x, y, z) ? mundo[idx(x, y, z)] : 0, put = (x, y, z, t) => { if (dentro(x, y, z) && t != null) mundo[idx(x, y, z)] = t; };
  const NOS = new Set(); for (const k in DEF) { const d = DEF[k]; if (d.planta || /^(Hojas|Tronco)/.test(d.nombre || '') || +k === B.TALLO_HONGO || +k === B.SOMBRERO_R || +k === B.SOMBRERO_M) NOS.add(+k); }
  const suelo = (x, z) => { for (let y = SY - 1; y > 0; y--) { const t = at(x, y, z); if (t && !NOS.has(t)) return t === B.AGUA ? -1 : y; } return -1; };
  const mz = (window.__mz && __mz.lista()) || [];
  for (const k of ['cerezos', 'hongos', 'sabana']) {
    const zona = Z.find(q => q.k === k); if (!zona) continue; const E = ESTILO[k], casas = [];
    for (let n = 0; n < 4; n++) { const a = n / 4 * 6.283 + h3(n, 1, 7, S + 7000), d = zona.r * .45, x = Math.round(zona.x + Math.cos(a) * d), z = Math.round(zona.z + Math.sin(a) * d);
      if (mz.some(m => Math.hypot(x - m.entrada.x, z - m.entrada.z) < 8)) continue;
      const ys = []; for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) ys.push(suelo(x + i, z + j)); ys.sort((p, q) => p - q); const y = ys[12]; if (y <= SEA) continue;
      // limpiar y aplanar
      for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) { for (let h = y + 1; h < Math.min(SY, y + 12); h++) put(x + i, h, z + j, B.AIRE); if (Math.max(Math.abs(i), Math.abs(j)) <= 3) for (let h = y; h > y - 4; h--) if (!at(x + i, h, z + j) || h === y) put(x + i, h, z + j, h === y ? E.piso : B.TIERRA); }
      const puerta = [[0, 2], [2, 0], [0, -2], [-2, 0]][Math.floor(h3(n, 2, 7, S + 7000) * 4)];
      if (E.forma === 'hongo') {
        for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) { const d2 = Math.hypot(i, j); if (d2 > 2.4) continue; for (let h = 1; h <= 3; h++) put(x + i, y + h, z + j, d2 > 1.5 ? E.pared() : B.AIRE); }
        for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) { const d2 = Math.hypot(i, j); if (d2 <= 4.2) put(x + i, y + 4, z + j, E.techo(n)); if (d2 <= 3) put(x + i, y + 5, z + j, E.techo(n)); if (d2 <= 1.6) put(x + i, y + 6, z + j, E.techo(n)); }
        for (const [i, j] of [[2, 0], [-2, 0], [0, -2]]) if (i !== puerta[0] || j !== puerta[1]) put(x + i, y + 2, z + j, B.VIDRIO);
      } else {
        for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) { const borde = Math.abs(i) === 2 || Math.abs(j) === 2, esq = Math.abs(i) === 2 && Math.abs(j) === 2;
          for (let h = 1; h <= 3; h++) put(x + i, y + h, z + j, esq ? E.poste : borde ? (h === 2 && (i === 0 || j === 0) ? B.VIDRIO : E.pared()) : B.AIRE); }
        for (let c = 0; c <= 2; c++) for (let i = -3 + c; i <= 3 - c; i++) for (let j = -3 + c; j <= 3 - c; j++) put(x + i, y + 4 + c, z + j, E.techo(n));
      }
      put(x + puerta[0], y + 1, z + puerta[1], B.AIRE); put(x + puerta[0], y + 2, z + puerta[1], B.AIRE);
      put(x + puerta[0] * 1.5, y + 1, z + puerta[1] * 1.5, B.ANTORCHA);
      put(x - puerta[0] / 2, y + 1, z - puerta[1] / 2, B.COFRE); put(x + (puerta[1] ? 1 : 0), y + 1, z + (puerta[0] ? 1 : 0), B.ANTORCHA);
      casas.push({ x, y, z });
    }
    if (casas.length) PUEBLOS.push({ k, x: zona.x, z: zona.z, casas });
  }
}
// aldeanos en los pueblos nuevos (la primera vez)
{ const t0 = terminarCarga; terminarCarga = function (guardados) { const r = t0.apply(this, arguments);
    if (!guardados && !window.mundoTipo) for (const P of PUEBLOS) P.casas.forEach((c, k) => { const a = crearAnimal('aldeano', c.x + 3.5, c.y + 1.1, c.z + .5); a.userData.extra = { of: k % 4, cx: P.x, cz: P.z }; vestirAldeano(a); });
    return r; }; }

// ═════════ MASCOTAS QUE PELEAN Y SUBEN DE NIVEL ═════════
const PELEAN = ['perro', 'gato', 'zorro', 'panda', 'miniojon'];
const xpNivel = n => 8 + n * 6;
for (const t of PELEAN) { const T = TIPOS[t]; if (!T || T.__pelea) continue; T.__pelea = true; const g0 = T.guiar;
  T.guiar = function (a, dt) { const e = a.userData.extra || {}, u = a.userData;
    if (e.d && !e.s && jugando && !creativo()) { const obj = blanco(a);
      if (obj) { const p = a.position, q = obj.position, dx = q.x - p.x, dz = q.z - p.z, d = Math.hypot(dx, dz);
        u.mord = (u.mord || 0) - dt; if (d < 1.4 + (obj.userData.an || .4) && u.mord <= 0) { u.mord = 1; const n = 2 + (e.nv || 0); const antes = obj.userData.vida; herir(obj, n); obj.userData.kx = dx / (d || 1) * 4; obj.userData.kz = dz / (d || 1) * 4; voz(T.voz, 0); if (antes > 0 && obj.userData.vida <= 0) ganarXp(a, Math.max(2, Math.round((TIPOS[obj.userData.animal] || { vida: 14 }).vida / 4))); }
        return { dir: Math.atan2(dx, dz), vel: d > 1 ? u.vel * 1.7 : 0 }; } }
    return g0 ? g0.apply(this, arguments) : null; }; }
function blanco(a) { const p = a.position; let mejor = null, md = 11;
  for (const m of monstruos.concat(animales)) { if (m === a) continue; const T = m.userData.animal ? TIPOS[m.userData.animal] : { hostil: true }; if (!T || !T.hostil || m.userData.vida <= 0) continue;
    const d = Math.hypot(m.position.x - p.x, m.position.z - p.z); if (d < md && Math.hypot(m.position.x - J.x, m.position.z - J.z) < 16) { md = d; mejor = m; } }
  return mejor; }
function ganarXp(a, n) { const e = ex(a); e.pxp = (e.pxp || 0) + n; e.nv = e.nv || 0; let subio = false;
  while (e.nv < 10 && e.pxp >= xpNivel(e.nv)) { e.pxp -= xpNivel(e.nv); e.nv++; subio = true; }
  if (subio) { a.userData.vida = (TIPOS[a.userData.animal].vida || 10) + e.nv * 3; aviso(TR('pmNivel', { m: (e.nombre || nomCria(a.userData.animal)).toUpperCase(), n: e.nv }), 2400); corazones(a, 6); son(880, .15, 'triangle', .1); setTimeout(() => son(1320, .2, 'triangle', .1), 120); }
  sucio = true; }
// al cargar el mundo, las mascotas recuperan la vida de su nivel
{ const t0 = terminarCarga; terminarCarga = function () { const r = t0.apply(this, arguments); for (const a of animales) { const e = a.userData.extra; if (e && e.nv && PELEAN.includes(a.userData.animal)) a.userData.vida = (TIPOS[a.userData.animal].vida || 10) + e.nv * 3; } return r; }; }

// ═════════ AVISO AL LLEGAR A UN PUEBLO ═════════
let puT = 0, puAct = null;
{ const p0 = pjFrame; pjFrame = function (dt) { const r = p0.apply(this, arguments); try { puT -= dt; if (puT <= 0 && jugando && !pausado && !window.mundoTipo) { puT = .6;
      const P = PUEBLOS.find(q => Math.hypot(J.x - q.x, J.z - q.z) < 10); const k = P ? P.k : null; if (k !== puAct) { puAct = k; if (k) setTimeout(() => aviso(TR('pu_' + k).toUpperCase(), 2200), 2400); } } } catch (e) {} return r; }; }

// logro
try { const k = LOGROS.findIndex(l => l[0] === 'todos'); LOGROS.splice(k < 0 ? LOGROS.length : k, 0, ['mision', I.ORO, () => (stats.misiones || 0) >= 1, 'Buen vecino', 'Cumple una misión de un aldeano', 'Good Neighbor', 'Complete a villager quest', 'Bom vizinho', 'Cumpra uma missão de um aldeão']); } catch (e) {}
window.__pj2 = { pueblos: () => PUEBLOS, misionDe, ganarXp };
}
