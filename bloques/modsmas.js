'use strict';
// ═════════ MÁS FORMAS PARA LAS CRIATURAS DE LOS MODS ═════════
// Además de vaca, oveja, gallina y ojón, se puede partir de casi cualquier criatura del juego (y cambiarle los colores).
// También se elige dónde aparece sola (pasto, arena, nieve o en cualquier lado) y las malas aparecen solas de noche.

{
Object.assign(TX.es, { dondeC: 'Dónde aparece sola', dPasto: 'En el pasto', dArena: 'En la arena', dNieve: 'En la nieve', dTodo: 'En cualquier lado', dNunca: 'Nunca (solo a mano)', malasNoche: 'Las criaturas que atacan aparecen solas de noche.' });
Object.assign(TX.en, { dondeC: 'Where it spawns on its own', dPasto: 'On grass', dArena: 'On sand', dNieve: 'On snow', dTodo: 'Anywhere', dNunca: 'Never (only by hand)', malasNoche: 'Creatures that attack spawn on their own at night.' });
Object.assign(TX.pt, { dondeC: 'Onde aparece sozinha', dPasto: 'Na grama', dArena: 'Na areia', dNieve: 'Na neve', dTodo: 'Em qualquer lugar', dNunca: 'Nunca (só manual)', malasNoche: 'As criaturas que atacam aparecem sozinhas à noite.' });

// criaturas del juego que sirven de base (las que caminan y se ven bien en cualquier color)
const BASES = ['cerdo', 'caballo', 'conejo', 'llama', 'cabra', 'perro', 'gato', 'zorro', 'panda', 'lobo', 'osoPolar', 'tortuga', 'loro', 'zombi', 'arquero', 'arana', 'bruja', 'bombin', 'golemHierro',
  'jirafa', 'elefante', 'hongin', 'pinguino', 'ositoGomita', 'yeti', 'loboHielo', 'alien', 'robot', 'galletaZombi', 'escorpion'];
const colorDe = m => m && m.color && !m.map ? m.color.getHexString() : m && m.color ? m.color.getHexString() : null;
// los dos colores que más se ven en la criatura (para poder cambiarlos)
function coloresDe(k) {
  const g = new THREE.Group(); try { TIPOS[k].armar(g); } catch (e) { return null; }
  const cuenta = {}; g.traverse(o => { if (!o.isMesh || !o.material || !o.material.color) return; const p = o.geometry && o.geometry.parameters || {}; const v = (p.width || .2) * (p.height || .2) * (p.depth || .2) * (o.parent && o.parent.scale ? o.parent.scale.x ** 3 : 1);
    const c = o.material.color.getHexString(); cuenta[c] = (cuenta[c] || 0) + v; });
  const orden = Object.keys(cuenta).sort((a, b) => cuenta[b] - cuenta[a]);
  g.traverse(o => { if (o.geometry) o.geometry.dispose(); });
  return orden.length ? ['#' + orden[0], '#' + (orden[1] || orden[0])] : null;
}
for (const k of BASES) {
  const T = TIPOS[k]; if (!T || !T.armar || FORMA_BASE[k]) continue;
  const cols = coloresDe(k); if (!cols) continue;
  FORMA_BASE[k] = { an: T.an || .4, al: T.al || 1.2, vel: T.vel || 1, c1: cols[0], c2: cols[1], orig: cols };
  FORMAS[k] = (g, c1, c2) => { const patas = TIPOS[k].armar(g) || []; const o1 = FORMA_BASE[k].orig[0].slice(1), o2 = FORMA_BASE[k].orig[1].slice(1);
    g.traverse(o => { if (!o.isMesh || !o.material || !o.material.color) return; const c = o.material.color.getHexString();
      if (c === o1 || c === o2) { o.material = o.material.clone(); o.material.color.set(c === o1 ? c1 : c2); } });
    return patas; };
  FORMA_TXT[k] = 'f_' + k;
  for (const l of ['es', 'en', 'pt']) try { TX[l]['f_' + k] = (NOM_CRIA[l] || NOM_CRIA.en)[k] || k; } catch (e) {}
}

// dónde aparece (se guarda en el mod) y las malas de noche
{ const p0 = pintarCri; pintarCri = function () { const r = p0.apply(this, arguments);
    const c = criE; if (c.donde == null) c.donde = 'pasto';
    const ops = [['pasto', 'dPasto'], ['arena', 'dArena'], ['nieve', 'dNieve'], ['todo', 'dTodo'], ['nunca', 'dNunca']];
    $('criCuerpo').insertAdjacentHTML('beforeend', `<h4>${TR('dondeC')}</h4><div class="opcG" data-cc="donde">${ops.map(([v, l]) => `<div data-v='${JSON.stringify(v)}' class="${c.donde === v ? 'on' : ''}">${TR(l)}</div>`).join('')}</div><div style="font-size:12px;margin-top:4px">${TR('malasNoche')}</div>`);
    return r; }; }
{ const t0 = tipoCriatura; tipoCriatura = function (c, m) { const T = t0.apply(this, arguments); T.donde = c.donde || 'pasto'; return T; }; }
// si se instala con el mundo ya cargado, los tipos se rearman con lo nuevo
const SUELOS = { pasto: [B.PASTO], arena: [B.ARENA, B.ARENA_R], nieve: [B.NIEVE], todo: null };
let modT = 0;
function aparecerMods(dt) {
  modT -= dt; if (modT > 0) return; modT = 7;
  if (!jugando || pausado || window.mundoTipo === 'tutorial' || (window.__mp && __mp.MP.invitado)) return;
  const mods = Object.keys(TIPOS).filter(k => TIPOS[k].mod); if (!mods.length) return;
  const noche = oscuridad() > .5;
  for (const k of mods) { const T = TIPOS[k], donde = T.donde || 'pasto'; if (donde === 'nunca') continue;
    if (T.hostil && (!noche || creativo() || !REG.monstruos)) continue;
    if (!T.hostil && donde === 'pasto') continue;   // las mansas del pasto ya aparecen con los demás animales
    const n = animales.filter(a => a.userData.animal === k).length; if (n >= (T.hostil ? 4 : 5)) continue;
    if (Math.random() > (T.hostil ? .55 : .35)) continue;
    for (let i = 0; i < 25; i++) { const a = Math.random() * 6.283, d = 18 + Math.random() * 22, x = Math.floor(J.x + Math.cos(a) * d), z = Math.floor(J.z + Math.sin(a) * d); if (x < 2 || z < 2 || x >= SX - 2 || z >= SZ - 2) continue;
      let y = SY - 2; while (y > 0 && !solidoMov(get(x, y, z)) && get(x, y, z) !== B.AGUA) y--; const t = get(x, y, z); if (t === B.AGUA || solidoMov(get(x, y + 1, z)) || solidoMov(get(x, y + 2, z))) continue;
      const ok = SUELOS[donde]; if (ok && !ok.includes(t)) continue; if (T.hostil && cieloEn(x, y + 1, z) < .5) continue;
      crearAnimal(k, x + .5, y + 1, z + .5); break; } }
}
{ const p0 = pjFrame; pjFrame = function (dt) { const r = p0.apply(this, arguments); try { aparecerMods(dt); } catch (e) {} return r; }; }
// de día, las malas de los mods se van (si están lejos)
{ let t = 0; const p0 = pjFrame; pjFrame = function (dt) { const r = p0.apply(this, arguments); t -= dt; if (t <= 0 && jugando) { t = 5; if (oscuridad() < .3) for (const a of animales.slice()) { const T = TIPOS[a.userData.animal]; if (T && T.mod && T.hostil && !(a.userData.extra && a.userData.extra.f) && a.position.distanceTo(cam.position) > 24) quitarAnimal(a); } } return r; }; }
window.__modsmas = { BASES: () => Object.keys(FORMA_TXT) };
}
