'use strict';
// ═════════ LOGROS CON MEDALLAS (como los de Minecraft: no cuentan en modo creativo) ═════════

Object.assign(TX.es, { logros: 'Logros', logroNuevo: '¡LOGRO CONSEGUIDO!', logrosCuenta: '{n} de {t} conseguidos', logrosNota: 'En modo creativo no se ganan logros' });
Object.assign(TX.en, { logros: 'Achievements', logroNuevo: 'ACHIEVEMENT UNLOCKED!', logrosCuenta: '{n} of {t} unlocked', logrosNota: 'Achievements are not earned in creative mode' });
Object.assign(TX.pt, { logros: 'Conquistas', logroNuevo: 'CONQUISTA DESBLOQUEADA!', logrosCuenta: '{n} de {t} conquistadas', logrosNota: 'No modo criativo não se ganham conquistas' });

const LG = (() => { let g = {}, c = {}; try { g = JSON.parse(localStorage.getItem('voxLogros') || '{}') || {}; c = JSON.parse(localStorage.getItem('voxLogrosC') || '{}') || {}; } catch (e) {} return { g, c }; })();
const guardarLG = () => { try { localStorage.setItem('voxLogros', JSON.stringify(LG.g)); localStorage.setItem('voxLogrosC', JSON.stringify(LG.c)); } catch (e) {} };
const lgCuenta = k => LG.c[k] || 0;
function lgSumar(k, n = 1) { if (!jugando || creativo()) return; LG.c[k] = lgCuenta(k) + n; guardarLG(); revisarLogros(); }
const lgTiene = id => (inv[id] || 0) > 0, lgHizo = id => ((stats.hechos || {})[id] || 0) > 0, lgRompio = id => ((stats.rotos || {})[id] || 0) > 0;
const lgHayAnimal = f => animales.some(a => { const T = TIPOS[a.userData.animal]; return T && f(T, a.userData.extra || {}, a); });

// [id, icono, condición, es nombre, es detalle, en nombre, en detalle, pt nombre, pt detalle]
const LOGROS = [
  ['madera', B.TRONCO, () => lgTiene(B.TRONCO) || lgRompio(B.TRONCO), 'Consigue madera', 'Saca un tronco de un árbol', 'Getting Wood', 'Punch a tree until a log pops out', 'Pegue madeira', 'Tire um tronco de uma árvore'],
  ['tablas', B.MADERA, () => lgHizo(B.MADERA), 'Carpintero', 'Fabrica tablas de madera', 'Carpenter', 'Craft wooden planks', 'Carpinteiro', 'Fabrique tábuas de madeira'],
  ['pico1', I.PICO1, () => lgHizo(I.PICO1) || lgTiene(I.PICO1), 'Hora de picar', 'Fabrica un pico', 'Time to Mine!', 'Craft a pickaxe', 'Hora de minerar', 'Fabrique uma picareta'],
  ['pico2', I.PICO2, () => lgHizo(I.PICO2) || lgTiene(I.PICO2), 'Mejor herramienta', 'Fabrica un pico de piedra', 'Getting an Upgrade', 'Craft a stone pickaxe', 'Ferramenta melhor', 'Fabrique uma picareta de pedra'],
  ['hierro', I.HIERRO, () => lgTiene(I.HIERRO), 'Edad de hierro', 'Consigue hierro', 'Iron Age', 'Get some iron', 'Idade do ferro', 'Consiga ferro'],
  ['pico3', I.PICO3, () => lgHizo(I.PICO3) || lgTiene(I.PICO3), 'Pico de hierro', 'Fabrica un pico de hierro', 'Isn\'t It Iron Pick', 'Craft an iron pickaxe', 'Picareta de ferro', 'Fabrique uma picareta de ferro'],
  ['cristal', I.CRISTAL, () => lgTiene(I.CRISTAL), '¡Cristales!', 'Encuentra un cristal', 'Crystals!', 'Find a crystal', 'Cristais!', 'Encontre um cristal'],
  ['pico4', I.PICO4, () => lgHizo(I.PICO4) || lgTiene(I.PICO4), 'Pico de cristal', 'Fabrica el mejor pico', 'Crystal Pick', 'Craft the best pickaxe', 'Picareta de cristal', 'Fabrique a melhor picareta'],
  ['espada', I.ESP1, () => [I.ESP1, I.ESP2, I.ESP3, I.ESP4].some(x => lgHizo(x) || lgTiene(x)), 'Hora de atacar', 'Fabrica una espada', 'Time to Strike!', 'Craft a sword', 'Hora de atacar', 'Fabrique uma espada'],
  ['mata1', I.ESP2, () => lgCuenta('mata') >= 1, 'Cazador de monstruos', 'Derrota a un monstruo', 'Monster Hunter', 'Defeat a monster', 'Caçador de monstros', 'Derrote um monstro'],
  ['mata50', I.ESP4, () => lgCuenta('mata') >= 50, 'Guerrero', 'Derrota 50 monstruos', 'Warrior', 'Defeat 50 monsters', 'Guerreiro', 'Derrote 50 monstros'],
  ['zombi', I.HUESO, () => lgCuenta('zombi') >= 1, 'Adiós, zombi', 'Derrota a un zombi', 'Bye, Zombie', 'Defeat a zombie', 'Tchau, zumbi', 'Derrote um zumbi'],
  ['comer', I.MANZANA, () => (stats.comido || 0) >= 1, 'Ñam ñam', 'Come algo', 'Yum Yum', 'Eat something', 'Nham nham', 'Coma alguma coisa'],
  ['pan', I.PAN, () => lgHizo(I.PAN), 'Panadero', 'Hornea pan', 'Bake Bread', 'Make bread', 'Padeiro', 'Faça pão'],
  ['cosecha', I.TRIGO_I, () => lgRompio(B.TRIGO + 3), 'Granjero', 'Cosecha trigo que sembraste', 'Farmer', 'Harvest wheat you planted', 'Fazendeiro', 'Colha trigo que você plantou'],
  ['cama', B.CAMA, () => !!stats.durmio, 'Dulces sueños', 'Duerme en una cama', 'Sweet Dreams', 'Sleep in a bed', 'Bons sonhos', 'Durma em uma cama'],
  ['dia10', B.ANTORCHA, () => numDia() >= 10, 'Sobreviviente', 'Llega al día 10', 'Survivor', 'Reach day 10', 'Sobrevivente', 'Chegue ao dia 10'],
  ['cria', B.HENO, () => (stats.criados || 0) >= 1, 'Ganadero', 'Haz que nazca una cría', 'Repopulation', 'Breed two animals', 'Pecuarista', 'Faça nascer um filhote'],
  ['cofre', B.COFRE, () => (stats.cofres || 0) >= 1, 'Buscatesoros', 'Abre un cofre escondido', 'Treasure Hunter', 'Open a hidden chest', 'Caça-tesouros', 'Abra um baú escondido'],
  ['pez', I.PESCADO, () => (stats.pescados || 0) >= 1, 'Pescador', 'Pesca algo con la caña', 'Fisherman', 'Catch something with a rod', 'Pescador', 'Pesque algo com a vara'],
  ['mascota', I.CARNE, () => lgHayAnimal((T, e) => T.mascota && e.d), 'Mejor amigo', 'Doma una mascota', 'Best Friends', 'Tame a pet', 'Melhor amigo', 'Dome um bichinho'],
  ['dragon', B.HUEVO, () => lgHayAnimal(T => T.dragon), '¡Nació un dragón!', 'Haz nacer un dragón de un huevo', 'A Dragon Is Born!', 'Hatch a dragon egg', 'Nasceu um dragão!', 'Choque um ovo de dragão'],
  ['volar', I.MONTURA, () => lgCuenta('volar') >= 1, 'Jinete de dragón', 'Vuela en tu dragón', 'Dragon Rider', 'Fly on your dragon', 'Cavaleiro de dragão', 'Voe no seu dragão'],
  ['armadura', I.ARM + 5, () => { const a = stats.armadura || []; return a.length === 4 && a.every(x => x); }, 'Bien protegido', 'Ponte las 4 piezas de armadura', 'Suit Up', 'Wear all 4 armor pieces', 'Bem protegido', 'Vista as 4 peças de armadura'],
  ['arco', I.ARCO, () => lgHizo(I.ARCO) || lgTiene(I.ARCO), 'Arquero', 'Consigue un arco', 'Archer', 'Get a bow', 'Arqueiro', 'Consiga um arco'],
  ['encantar', I.ESP_E, () => lgTiene(I.PICO_E) || lgTiene(I.ESP_E), 'Encantador', 'Encanta una herramienta', 'Enchanter', 'Enchant a tool', 'Encantador', 'Encante uma ferramenta'],
  ['pocion', I.POCION, () => lgCuenta('pocion') >= 1, 'Alquimista', 'Toma una poción', 'Alchemist', 'Drink a potion', 'Alquimista', 'Tome uma poção'],
  ['trato', I.ORO, () => lgCuenta('trato') >= 1, 'Buen negocio', 'Cambia algo con un aldeano', 'What a Deal!', 'Trade with a villager', 'Bom negócio', 'Troque algo com um aldeão'],
  ['tnt', B.TNT, () => lgCuenta('tnt') >= 1, '¡Bum!', 'Haz explotar una TNT', 'Boom!', 'Blow up some TNT', 'Bum!', 'Exploda uma TNT'],
  ['abismo', B.PORTAL, () => window.mundoTipo === 'abismo', 'Al Abismo', 'Cruza el portal al Abismo', 'Into the Abyss', 'Go through the Abyss portal', 'Para o Abismo', 'Atravesse o portal do Abismo'],
  ['jefe', I.CORONA, () => lgCuenta('jefe') >= 1 || lgTiene(I.CORONA), 'Rey vencido', 'Derrota al Ojón Rey', 'The King Falls', 'Defeat the Big Eye King', 'Rei derrotado', 'Derrote o Rei Olhão'],
  ['ola5', B.LAPIDA, () => lgCuenta('ola') >= 5, 'Noche larga', 'Llega a la oleada 5 de zombis', 'Long Night', 'Reach zombie wave 5', 'Noite longa', 'Chegue à onda 5 de zumbis'],
  ['ola10', B.CALABAZA_F, () => lgCuenta('ola') >= 10, 'Leyenda zombi', 'Llega a la oleada 10 de zombis', 'Zombie Legend', 'Reach zombie wave 10', 'Lenda zumbi', 'Chegue à onda 10 de zumbis'],
  ['sky', B.GENERADOR, () => window.mundoTipo === 'skyblock' && [...diffs.values()].includes(B.GENERADOR), 'Isla en el cielo', 'Pon el generador en SkyBlock', 'Sky Island', 'Place the generator in SkyBlock', 'Ilha no céu', 'Coloque o gerador no SkyBlock'],
  ['arbolSky', B.BROTE, () => lgCuenta('arbol') >= 1, 'Árbol nuevo', 'Haz crecer un árbol desde un brote', 'New Tree', 'Grow a tree from a sapling', 'Árvore nova', 'Faça crescer uma árvore de uma muda'],
  ['meta', B.META, () => lgCuenta('meta') >= 1, '¡Llegaste!', 'Llega a la meta de un mapa', 'Made It!', 'Reach the finish of a map', 'Chegou!', 'Chegue ao final de um mapa'],
  ['parkour', B.MAGMA, () => lgCuenta('parkour') >= 1, 'Pies de fuego', 'Termina el Parkour de lava', 'Fire Feet', 'Finish the Lava Parkour', 'Pés de fogo', 'Termine o Parkour de lava'],
  ['obra', B.LADRILLO, () => diffs.size >= 500 && !aventura(), 'Gran obra', 'Cambia 500 bloques en un mundo', 'Master Builder', 'Change 500 blocks in one world', 'Grande obra', 'Mude 500 blocos em um mundo'],
  ['foto', B.VIDRIO, () => lgCuenta('foto') >= 1, 'Fotógrafo', 'Saca una foto del mundo', 'Photographer', 'Take a picture of the world', 'Fotógrafo', 'Tire uma foto do mundo'],
  ['todos', I.CORONA, () => LOGROS.every(l => l[0] === 'todos' || LG.g[l[0]]), 'Maestro de Voxelium', 'Consigue todos los demás logros', 'Voxelium Master', 'Unlock every other achievement', 'Mestre do Voxelium', 'Consiga todas as outras conquistas']
];
const txtLogro = l => { const k = LANG === 'en' ? 5 : LANG === 'pt' ? 7 : 3; return [l[k], l[k + 1]]; };

// ─── aviso de logro nuevo (arriba a la derecha, debajo de los botones, no tapa la mira) ───
{ const st = document.createElement('style'); st.textContent = `
  #logroToast { position: fixed; right: max(8px, env(safe-area-inset-right)); top: 62px; z-index: 12; zoom: var(--u); display: flex; align-items: center; gap: 8px; background: #f2f5ff; border: 3px solid #0d153d; border-radius: 14px; box-shadow: 0 4px 0 rgba(0,0,0,.35); padding: 6px 12px 6px 6px; color: #1b2a6b; pointer-events: none; transform: translateX(130%); transition: transform .35s; max-width: 280px; }
  #logroToast.ver { transform: none; }
  #logroToast small { display: block; font-size: 11px; color: #c8841a; letter-spacing: .5px; } #logroToast b { font-size: 15px; line-height: 1.1; display: block; }
  .medalla { width: 46px; height: 46px; flex: none; border-radius: 50%; border: 3px solid #0d153d; background: radial-gradient(circle at 35% 30%, #fff3a8, #ffd23a 45%, #c8841a); display: flex; align-items: center; justify-content: center; box-shadow: inset 0 -3px 0 rgba(0,0,0,.2); }
  .medalla i { width: 28px; height: 28px; background-size: contain; background-repeat: no-repeat; background-position: center; image-rendering: pixelated; }
  .medalla.no { background: radial-gradient(circle at 35% 30%, #d8dcef, #9aa3c4 60%, #6a7396); } .medalla.no i { filter: grayscale(1) brightness(.6); opacity: .55; }
  #logrosCapa .ventana { max-width: 760px; }
  #logrosGrilla { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 8px; padding: 10px; overflow: auto; }
  .logro { display: flex; align-items: center; gap: 8px; background: #fff; border: 2px solid #d5dbf3; border-radius: 12px; padding: 6px; }
  .logro.no { background: #e8ebf7; } .logro .nom { font-size: 14px; line-height: 1.1; } .logro .nom small { display: block; font-size: 11px; color: #5a6aa8; font-weight: 600; margin-top: 2px; }
  #logrosCuenta { padding: 0 12px; font-size: 14px; } #logrosCuenta small { color: #5a6aa8; font-weight: 600; margin-left: 6px; }
`; document.head.appendChild(st);
  const t = document.createElement('div'); t.id = 'logroToast'; document.body.appendChild(t);
  const c = document.createElement('div'); c.className = 'capa trans'; c.id = 'logrosCapa'; c.hidden = true;
  c.innerHTML = `<div class="ventana"><div class="vCab"><div class="tab on" data-i="logros"></div><div style="flex:1"></div><div class="cerrar" id="logrosCerrar">X</div></div><div id="logrosCuenta"></div><div id="logrosGrilla"></div></div>`;
  document.body.appendChild(c); }
const lgCola = []; let lgMostrando = false;
function mostrarLogro(l) { lgCola.push(l); if (!lgMostrando) siguienteToast(); }
function siguienteToast() {
  const l = lgCola.shift(); if (!l) { lgMostrando = false; return; } lgMostrando = true; const [n] = txtLogro(l), t = $('logroToast');
  t.innerHTML = `<div class="medalla"><i style="background-image:url(${icono(l[1])})"></i></div><div><small>${TR('logroNuevo')}</small><b>${n}</b></div>`;
  t.classList.add('ver'); sonar('final', .5) || son(988, .25, 'triangle', .12); setTimeout(() => son(1318, .3, 'triangle', .1), 140);
  setTimeout(() => { t.classList.remove('ver'); setTimeout(siguienteToast, 400); }, 3600);
}
function revisarLogros() {
  if (!jugando || creativo()) return;
  for (const l of LOGROS) { if (LG.g[l[0]]) continue; let ok = false; try { ok = l[2](); } catch (e) {} if (ok) { LG.g[l[0]] = Date.now(); guardarLG(); mostrarLogro(l); } }
}
setInterval(revisarLogros, 1000);

// ─── pantalla de logros ───
let logrosDesde = null;
function abrirLogros(desde) {
  logrosDesde = desde; if (desde) $(desde).hidden = true;
  const n = LOGROS.filter(l => LG.g[l[0]]).length;
  $('logrosCuenta').innerHTML = TR('logrosCuenta', { n, t: LOGROS.length }) + `<small>${TR('logrosNota')}</small>`;
  $('logrosGrilla').innerHTML = LOGROS.map(l => { const ok = !!LG.g[l[0]], [a, b] = txtLogro(l); return `<div class="logro${ok ? '' : ' no'}"><div class="medalla${ok ? '' : ' no'}"><i style="background-image:url(${icono(l[1])})"></i></div><div class="nom">${a}<small>${b}</small></div></div>`; }).join('');
  $('logrosCapa').hidden = false;
}
$('logrosCerrar').onclick = () => { $('logrosCapa').hidden = true; if (logrosDesde) $(logrosDesde).hidden = false; };
{ const fila = (a, b) => { const f = document.createElement('div'); f.className = 'filaBtn'; f.append(a, b); return f; };
  const b1 = document.createElement('div'); b1.className = 'btn'; b1.id = 'bLogrosHome'; b1.dataset.i = 'logros'; b1.onclick = () => abrirLogros('inicio');
  $('inicio').insertBefore(fila(b1, $('bCreditos')), null);
  const b2 = document.createElement('div'); b2.className = 'btn'; b2.id = 'bLogrosPausa'; b2.dataset.i = 'logros'; b2.onclick = () => abrirLogros('pausa');
  const v = $('bVideo'), f2 = fila(document.createElement('span'), b2); $('pausa').insertBefore(f2, v); f2.replaceChild(v, f2.firstChild);
  aplicarIdioma(); }

// ─── eventos que no se ven en el inventario ───
{ const q0 = quitarMonstruo; quitarMonstruo = function (m, humo = true) { if (humo && jugando && monstruos.includes(m) && m.userData.vida <= 0) lgSumar('mata'); return q0(m, humo); }; }
{ const m0 = matarAnimal; matarAnimal = function (a) { const T = TIPOS[a.userData.animal]; if (T && T.hostil) { lgSumar('mata'); if (a.userData.animal === 'zombi') lgSumar('zombi'); } return m0(a); }; }
{ const f = montar; montar = function (a) { lgSumar('volar'); return f(a); }; }
{ const f = ganar; ganar = function () { lgSumar('jefe'); return f.apply(this, arguments); }; }
{ const f = beber; beber = function (id) { lgSumar('pocion'); return f(id); }; }
{ const f = explotar; explotar = function () { lgSumar('tnt'); return f.apply(this, arguments); }; }
{ const f = sacarFoto; sacarFoto = function () { lgSumar('foto'); return f.apply(this, arguments); }; }
{ const f = llegarMeta; llegarMeta = function () { lgSumar('meta'); if (window.mundoTipo === 'parkour') lgSumar('parkour'); return f.apply(this, arguments); }; }
{ const f = crecerArbol; crecerArbol = function (i) { const r = f(i); if (r) lgSumar('arbol'); return r; }; }
setInterval(() => { if (jugando && mapa.oleadas && typeof ola !== 'undefined' && ola.n > lgCuenta('ola')) { LG.c.ola = ola.n; guardarLG(); revisarLogros(); } }, 1000);
$('tratoLista').addEventListener('click', () => { const antes = JSON.stringify(inv); setTimeout(() => { if (JSON.stringify(inv) !== antes) lgSumar('trato'); }, 0); }, true);
window.__lg = { LOGROS, LG, abrirLogros, revisarLogros, lgSumar };
