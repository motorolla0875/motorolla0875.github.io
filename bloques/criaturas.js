'use strict';
// ═════════ CRIATURAS NUEVAS (diseño propio de Voxelium) ═════════
// Monstruos: arquero, bombín (explota), araña, sombra (se teletransporta), bruja, gelatina (se divide), ahogado.
// Animales: conejo, lobo (se domestica con hueso), llama, cabra, oso polar, murciélago.
// Ayudantes: gólem de hierro y gólem de nieve (se arman con bloques y una calabaza arriba).
// Jefes: Dragón de Tormenta y Rey de Tres Cabezas (se llaman con el Cuerno y el Cetro).
// También: pestaña "Criaturas" en creativo para poner cualquier criatura (sirve para crear mapas).

const NOM_CRIA = {
  es: { vaca: 'Vaca', oveja: 'Oveja', gallina: 'Gallina', cerdo: 'Cerdo', caballo: 'Caballo', loro: 'Loro', tortuga: 'Tortuga', aldeano: 'Aldeano', perro: 'Perro', gato: 'Gato', zorro: 'Zorro', panda: 'Panda',
    zombi: 'Zombi', ojon: 'Ojón', ojonRey: 'Ojón Rey', arquero: 'Esqueleto arquero', bombin: 'Bombín', arana: 'Araña', sombra: 'Sombra', bruja: 'Bruja', gelatina3: 'Gelatina', gelatina2: 'Gelatina mediana', gelatina1: 'Gelatina chica', ahogado: 'Ahogado',
    conejo: 'Conejo', lobo: 'Lobo', llama: 'Llama', cabra: 'Cabra', osoPolar: 'Oso polar', murcielago: 'Murciélago', golemHierro: 'Gólem de hierro', golemNieve: 'Gólem de nieve', dragonJefe: 'Dragón de Tormenta', tricefalo: 'Rey de Tres Cabezas',
    dragon0: 'Dragón verde', dragon1: 'Dragón de fuego', dragon2: 'Dragón de hielo', dragon3: 'Dragón dorado', dragon4: 'Dragón de cristal', pez: 'Peces', calamar: 'Calamar', delfin: 'Delfín', guardian: 'Guardián' },
  en: { vaca: 'Cow', oveja: 'Sheep', gallina: 'Chicken', cerdo: 'Pig', caballo: 'Horse', loro: 'Parrot', tortuga: 'Turtle', aldeano: 'Villager', perro: 'Dog', gato: 'Cat', zorro: 'Fox', panda: 'Panda',
    zombi: 'Zombie', ojon: 'Eyeball', ojonRey: 'Eyeball King', arquero: 'Skeleton archer', bombin: 'Boomling', arana: 'Spider', sombra: 'Shade', bruja: 'Witch', gelatina3: 'Jelly', gelatina2: 'Medium jelly', gelatina1: 'Small jelly', ahogado: 'Drowned',
    conejo: 'Rabbit', lobo: 'Wolf', llama: 'Llama', cabra: 'Goat', osoPolar: 'Polar bear', murcielago: 'Bat', golemHierro: 'Iron golem', golemNieve: 'Snow golem', dragonJefe: 'Storm Dragon', tricefalo: 'Three-Headed King',
    dragon0: 'Green dragon', dragon1: 'Fire dragon', dragon2: 'Ice dragon', dragon3: 'Golden dragon', dragon4: 'Crystal dragon', pez: 'Fish', calamar: 'Squid', delfin: 'Dolphin', guardian: 'Guardian' },
  pt: { vaca: 'Vaca', oveja: 'Ovelha', gallina: 'Galinha', cerdo: 'Porco', caballo: 'Cavalo', loro: 'Papagaio', tortuga: 'Tartaruga', aldeano: 'Aldeão', perro: 'Cachorro', gato: 'Gato', zorro: 'Raposa', panda: 'Panda',
    zombi: 'Zumbi', ojon: 'Olhudo', ojonRey: 'Rei Olhudo', arquero: 'Esqueleto arqueiro', bombin: 'Bombinho', arana: 'Aranha', sombra: 'Sombra', bruja: 'Bruxa', gelatina3: 'Geleia', gelatina2: 'Geleia média', gelatina1: 'Geleia pequena', ahogado: 'Afogado',
    conejo: 'Coelho', lobo: 'Lobo', llama: 'Lhama', cabra: 'Cabra', osoPolar: 'Urso polar', murcielago: 'Morcego', golemHierro: 'Golem de ferro', golemNieve: 'Golem de neve', dragonJefe: 'Dragão da Tempestade', tricefalo: 'Rei de Três Cabeças',
    dragon0: 'Dragão verde', dragon1: 'Dragão de fogo', dragon2: 'Dragão de gelo', dragon3: 'Dragão dourado', dragon4: 'Dragão de cristal', pez: 'Peixes', calamar: 'Lula', delfin: 'Golfinho', guardian: 'Guardião' },
};
const nomCria = t => (NOM_CRIA[LANG] || NOM_CRIA.es)[t] || (TIPOS[t] && TIPOS[t].nombre) || t;
Object.assign(TX.es, { tabCriaturas: 'Criaturas', quemarDia: 'Zombis se queman de día', criaGranja: 'Granja', criaSalvajes: 'Salvajes y mascotas', criaMar: 'Mar', criaMonstruos: 'Monstruos', criaAyudantes: 'Ayudantes', criaDragones: 'Dragones', criaJefes: 'Jefes', criaMods: 'Mis criaturas',
  criaTocar: 'Toca una criatura y aparece adelante tuyo', ponEnAgua: 'MIRA HACIA EL AGUA PARA PONERLO', golemListo: '¡ARMASTE UN GÓLEM!', loboDomado: '¡EL LOBO AHORA ES TU PERRO!', loboNo: 'EL LOBO NO QUISO… PRUEBA OTRA VEZ',
  jefeYaHay: 'YA HAY UN JEFE CERCA', jefeLlega: '¡SE ACERCA {n}!', jefeVencido: '¡VENCISTE A {n}!', cuernoAyuda: 'TOCA EL PISO PARA LLAMAR AL JEFE' });
Object.assign(TX.en, { tabCriaturas: 'Creatures', quemarDia: 'Zombies burn in daylight', criaGranja: 'Farm', criaSalvajes: 'Wild and pets', criaMar: 'Sea', criaMonstruos: 'Monsters', criaAyudantes: 'Helpers', criaDragones: 'Dragons', criaJefes: 'Bosses', criaMods: 'My creatures',
  criaTocar: 'Tap a creature and it appears in front of you', ponEnAgua: 'LOOK AT THE WATER TO PLACE IT', golemListo: 'YOU BUILT A GOLEM!', loboDomado: 'THE WOLF IS NOW YOUR DOG!', loboNo: "THE WOLF DIDN'T WANT IT… TRY AGAIN",
  jefeYaHay: 'THERE IS ALREADY A BOSS NEARBY', jefeLlega: '{n} IS COMING!', jefeVencido: 'YOU DEFEATED {n}!', cuernoAyuda: 'TAP THE GROUND TO CALL THE BOSS' });
Object.assign(TX.pt, { tabCriaturas: 'Criaturas', quemarDia: 'Zumbis queimam de dia', criaGranja: 'Fazenda', criaSalvajes: 'Selvagens e pets', criaMar: 'Mar', criaMonstruos: 'Monstros', criaAyudantes: 'Ajudantes', criaDragones: 'Dragões', criaJefes: 'Chefes', criaMods: 'Minhas criaturas',
  criaTocar: 'Toque numa criatura e ela aparece na sua frente', ponEnAgua: 'OLHE PARA A ÁGUA PARA COLOCAR', golemListo: 'VOCÊ MONTOU UM GOLEM!', loboDomado: 'O LOBO AGORA É SEU CACHORRO!', loboNo: 'O LOBO NÃO QUIS… TENTE DE NOVO',
  jefeYaHay: 'JÁ TEM UM CHEFE POR PERTO', jefeLlega: '{n} ESTÁ CHEGANDO!', jefeVencido: 'VOCÊ VENCEU {n}!', cuernoAyuda: 'TOQUE NO CHÃO PARA CHAMAR O CHEFE' });
Object.assign(NOMBRES.en, { 'Generador de monstruos': 'Monster spawner', 'Dispensador': 'Dispenser', 'Detector de zona': 'Zone detector', 'Cuerno del dragón': 'Dragon horn', 'Cetro de las tres cabezas': 'Three-headed scepter' });
Object.assign(NOMBRES.pt, { 'Generador de monstruos': 'Gerador de monstros', 'Dispensador': 'Dispensador', 'Detector de zona': 'Detector de zona', 'Cuerno del dragón': 'Chifre do dragão', 'Cetro de las tres cabezas': 'Cetro das três cabeças' });

const M = c => matA(typeof c === 'string' ? parseInt(c.slice(1), 16) : c);
const brillo = c => new THREE.MeshBasicMaterial({ color: typeof c === 'string' ? parseInt(c.slice(1), 16) : c });
const azar = (a, b) => a + Math.random() * (b - a);

// ═════════ AYUDAS PARA LA IA ═════════
const atacan = a => jugando && !creativo() && !window.espectador && vida > 0 && (REG.monstruos || (a.userData.extra && a.userData.extra.f));
function haciaJ(a) { const p = a.position, dx = J.x - p.x, dz = J.z - p.z, d = Math.hypot(dx, dz) || .001; return { dx, dz, d, dy: J.y - p.y, dir: Math.atan2(dx, dz) }; }
function morder(a, h, n, alcance, dt) {
  const u = a.userData; u.ataque = (u.ataque || 0) - dt;
  if (h.d < alcance && Math.abs(h.dy) < 1.7 && u.ataque <= 0) { u.ataque = 1; lastimar(n, h.dx / h.d, h.dz / h.d); return true; }
  return false;
}
const deambular = () => null;   // null = que el juego lo haga caminar solo
const enojado = a => a.userData.extra && a.userData.extra.eno > 0;
function enojar(a, t = 25) { ex(a).eno = t; }
// el monstruo "mira" al jugador: ¿hay bloques en el medio?
function ve(a, h) { const p = a.position; for (let k = 1; k < h.d; k += .7) { const x = p.x + h.dx / h.d * k, z = p.z + h.dz / h.d * k, y = p.y + 1.4 + h.dy * k / h.d; if (solidoMov(get(Math.floor(x), Math.floor(y), Math.floor(z)))) return false; } return true; }
function sueloCerca(x, z) { let y = SY - 2; while (y > 0 && !solidoMov(get(Math.floor(x), y, Math.floor(z)))) y--; return y + 1; }

// ═════════ PROYECTILES (flechas, pociones, bolas de nieve, fuego, orbes) ═════════
const proys = [];
const FORMA_PROY = {
  flecha: () => { const g = new THREE.Group(); caja(g, .05, .05, .6, 0, 0, 0, M('#7a5230')); caja(g, .09, .09, .1, 0, 0, .3, M('#c8ccd8')); caja(g, .14, .02, .12, 0, 0, -.28, M('#f2f2f2')); return g; },
  pocion: () => { const g = new THREE.Group(); caja(g, .2, .22, .2, 0, 0, 0, brillo('#b05ae0')); caja(g, .08, .08, .08, 0, .14, 0, M('#e8e8f0')); return g; },
  nieve: () => { const g = new THREE.Group(); caja(g, .22, .22, .22, 0, 0, 0, M('#ffffff')); return g; },
  fuego: () => { const g = new THREE.Group(); caja(g, .5, .5, .5, 0, 0, 0, brillo('#ff7a1a')); caja(g, .3, .3, .3, 0, 0, 0, brillo('#ffe14a')); return g; },
  orbe: () => { const g = new THREE.Group(); caja(g, .42, .42, .42, 0, 0, 0, brillo('#3a1a5a')); caja(g, .5, .16, .16, 0, 0, 0, brillo('#c58cf5')); caja(g, .16, .5, .16, 0, 0, 0, brillo('#c58cf5')); return g; },
  escupida: () => { const g = new THREE.Group(); caja(g, .14, .14, .14, 0, 0, 0, M('#f2f2e8')); return g; },
  rayo: () => { const g = new THREE.Group(); caja(g, .5, .5, .5, 0, 0, 0, brillo('#fff6a0')); caja(g, .9, .12, .12, 0, 0, 0, brillo('#5ad0ff')); caja(g, .12, .9, .12, 0, 0, 0, brillo('#5ad0ff')); return g; },
};
const PROY = { flecha: { vel: 20, g: 9, dano: 3 }, pocion: { vel: 11, g: 12, dano: 3 }, nieve: { vel: 16, g: 10, dano: 1 }, fuego: { vel: 14, g: 0, dano: 5, explota: 2 }, orbe: { vel: 11, g: 0, dano: 4, explota: 1.4 }, escupida: { vel: 14, g: 8, dano: 1 }, rayo: { vel: 16, g: 0, dano: 5, explota: 2 } };
function disparar(tipo, x, y, z, tx, ty, tz, de = 'mon') {
  const P = PROY[tipo], dx = tx - x, dy = ty - y, dz = tz - z, d = Math.hypot(dx, dy, dz) || 1, t = d / P.vel;
  const v = new THREE.Vector3(dx / t, dy / t + P.g * t / 2, dz / t);
  const m = FORMA_PROY[tipo](); m.position.set(x, y, z); escena.add(m);
  proys.push({ tipo, m, v, t: 0, de }); son(tipo === 'flecha' ? 700 : 300, .08, 'triangle', .06);
}
function golpeJugador(n, kx, kz) { if (!creativo() && !window.espectador && vida > 0) lastimar(n, kx, kz); }
function moverProys(dt) {
  for (const q of proys.slice()) {
    const P = PROY[q.tipo], p = q.m.position; q.t += dt; q.v.y -= P.g * dt; p.addScaledVector(q.v, dt);
    if (q.tipo === 'flecha') q.m.lookAt(p.x + q.v.x, p.y + q.v.y, p.z + q.v.z); else { q.m.rotation.x += dt * 6; q.m.rotation.y += dt * 4; }
    let fin = q.t > 6 || p.y < -2 || solidoMov(get(Math.floor(p.x), Math.floor(p.y), Math.floor(p.z)));
    if (!fin && q.de === 'mon') {
      // al jugador (y en línea, a los invitados)
      if (Math.hypot(J.x - p.x, J.z - p.z) < .6 && p.y > J.y - .1 && p.y < J.y + 1.9) { const k = Math.hypot(q.v.x, q.v.z) || 1; golpeJugador(P.dano, q.v.x / k, q.v.z / k); if (q.tipo === 'pocion') { J.velPocion = .55; setTimeout(() => { J.velPocion = 1; }, 3500); } fin = true; }
      else if (window.__mp && __mp.MP.dueno) for (const j of __mp.MP.jug.values()) if (j.obj && Math.hypot(j.obj.x - p.x, j.obj.z - p.z) < .6 && p.y > j.obj.y - .1 && p.y < j.obj.y + 1.9) { mpEnviar({ t: 'uno', para: j.id, tipo: 'dano', n: P.dano, kx: 0, kz: 0, salto: true }); fin = true; break; }
    }
    if (!fin && q.de === 'golem') for (const m of monstruos.concat(animales.filter(a => (TIPOS[a.userData.animal] || {}).hostil))) { const mp = m.position; if (Math.hypot(mp.x - p.x, mp.z - p.z) < .7 && p.y > mp.y - .1 && p.y < mp.y + 2) { herir(m, P.dano * 2); m.userData.kx = q.v.x * .3; m.userData.kz = q.v.z * .3; fin = true; break; } }
    if (fin) {
      escena.remove(q.m); proys.splice(proys.indexOf(q), 1);
      if (P.explota && q.t < 6) explotar(p.x, p.y, p.z, P.explota);
      else polvo(p.x, p.y, p.z, q.tipo === 'pocion' ? '#b05ae0' : q.tipo === 'nieve' ? '#ffffff' : '#8a6a4a', 6);
    }
  }
}

// ═════════ MONSTRUOS ═════════
// Esqueleto arquero: se queda a distancia y dispara flechas
TIPOS.arquero = { vida: 12, an: .3, al: 1.8, vel: 1.15, peso: .28, color: '#e8e4d4', voz: 'hueso', hostil: true, ia: true, dano: 2, quemaDia: true,
  armar(g) { const hu = M('#ebe6d2'), so = M('#9a9484'), cu = M('#6b4a2a'), bu = M('#c8341a'), ne = M('#1d1d21'), ar = M('#8a5a2a');
    caja(g, .36, .5, .2, 0, .98, 0, hu); for (let k = 0; k < 3; k++) caja(g, .38, .04, .22, 0, .86 + k * .12, 0, so);
    caja(g, .44, .44, .42, 0, 1.46, 0, hu); for (const s of [-1, 1]) caja(g, .12, .1, .03, s * .1, 1.48, .215, ne); caja(g, .2, .05, .03, 0, 1.34, .215, so);
    caja(g, .5, .16, .48, 0, 1.68, -.02, cu); caja(g, .46, .3, .1, 0, 1.52, -.22, cu);   // capucha de cuero
    caja(g, .4, .1, .26, 0, 1.22, .02, bu);   // bufanda roja
    caja(g, .14, .5, .14, 0, 1.02, -.18, cu); for (const k of [-1, 0, 1]) caja(g, .04, .14, .04, k * .04, 1.32, -.18, M('#f2f2f2'));   // carcaj
    for (const s of [-1, 1]) caja(g, .08, .48, .08, s * .24, .98, 0, hu);
    const arco = new THREE.Group(); arco.position.set(.3, 1.0, .22); g.add(arco); caja(arco, .05, .62, .05, 0, 0, 0, ar); caja(arco, .05, .14, .14, 0, .3, -.06, ar); caja(arco, .05, .14, .14, 0, -.3, -.06, ar); caja(arco, .01, .6, .01, 0, 0, -.12, M('#f2f2f2'));
    return [-1, 1].map(s => pata(g, .1, .62, .1, s * .1, .64, 0, hu)); },
  guiar(a, dt) { if (!atacan(a)) return deambular(); const u = a.userData, h = haciaJ(a); if (h.d > 22) return deambular();
    u.tiro = (u.tiro ?? 1.5) - dt;
    if (u.tiro <= 0 && h.d < 18 && ve(a, h)) { u.tiro = 2 + Math.random() * .8; const p = a.position; disparar('flecha', p.x + Math.sin(h.dir) * .4, p.y + 1.35, p.z + Math.cos(h.dir) * .4, J.x, J.y + 1.2, J.z); }
    const vel = h.d < 5 ? -u.vel : h.d > 11 ? u.vel * 1.3 : Math.sin(u.t * .8) * .6;
    return { dir: h.dir, vel }; },
  suelta: () => [[I.HUESO, Math.floor(Math.random() * 3)], [I.FLECHA, Math.floor(Math.random() * 3)]].filter(x => x[1]) };

// Bombín: barril caminante con mecha; se acerca y explota
TIPOS.bombin = { vida: 10, an: .32, al: 1.2, vel: 1.25, peso: .3, color: '#c8441a', voz: 'mecha', hostil: true, ia: true, dano: 0,
  armar(g) { const ba = M('#c8441a'), ba2 = M('#a8321a'), me = M('#5a5f7a'), ne = M('#1d1d21'), bl = M('#ffffff');
    caja(g, .64, .7, .64, 0, .7, 0, ba); for (const y of [.46, .94]) caja(g, .66, .08, .66, 0, y, 0, me); caja(g, .5, .06, .5, 0, 1.08, 0, ba2);
    for (const s of [-1, 1]) { caja(g, .16, .16, .03, s * .14, .78, .325, bl); caja(g, .08, .1, .03, s * .14, .76, .335, ne); caja(g, .18, .04, .03, s * .14, .89, .33, ne); }
    caja(g, .2, .05, .03, 0, .6, .325, ne);
    caja(g, .06, .3, .06, 0, 1.25, 0, M('#7a5230')); caja(g, .14, .14, .14, 0, 1.43, 0, brillo('#ffe14a'));
    return [[.18, .18], [-.18, -.18], [-.18, .18], [.18, -.18]].map(([x, z]) => pata(g, .14, .3, .14, x, .32, z, me)); },
  guiar(a, dt) { if (!atacan(a)) { a.userData.mecha = 0; return deambular(); } const u = a.userData, h = haciaJ(a); if (h.d > 18) return deambular();
    if (u.mecha > 0) { u.mecha -= dt; u.rojo = Math.sin(u.mecha * 30) > 0 ? .06 : 0; a.scale.setScalar(1 + (1.4 - u.mecha) * .12);
      if (h.d > 4.5) { u.mecha = 0; a.scale.setScalar(1); }
      else if (u.mecha <= 0) { const p = a.position.clone(); quitarAnimal(a); explotar(p.x, p.y + .6, p.z, 3); return { vel: 0 }; }
      return { dir: h.dir, vel: 0 }; }
    if (h.d < 2.3 && Math.abs(h.dy) < 2) { u.mecha = 1.4; ruido(.5, .05, 3000); }
    return { dir: h.dir, vel: u.vel * 1.4 }; },
  suelta: () => [[I.CARBON, 1 + Math.floor(Math.random() * 2)]] };

// Araña: rápida, salta encima y trepa paredes. De día no ataca salvo que la molesten
TIPOS.arana = { vida: 12, an: .5, al: .7, vel: 1.6, peso: .3, color: '#4a3428', voz: 'arana', hostil: true, ia: true, dano: 2,
  armar(g) { const cu = M('#4a3428'), cu2 = M('#3a2620'), pa = M('#2e1e18'), oj = brillo('#ff9a2e');
    caja(g, .7, .4, .7, 0, .5, -.25, cu); caja(g, .5, .34, .44, 0, .5, .3, cu2);
    for (const [x, y] of [[-.12, .58], [.12, .58], [-.2, .5], [.2, .5], [-.07, .48], [.07, .48]]) caja(g, .07, .07, .03, x, y, .525, oj);
    caja(g, .08, .12, .08, -.08, .36, .54, pa); caja(g, .08, .12, .08, .08, .36, .54, pa);
    const pats = [];
    for (const s of [-1, 1]) for (let k = 0; k < 4; k++) { const piv = new THREE.Group(); piv.position.set(s * .25, .55, .22 - k * .2); g.add(piv);
      const p1 = caja(piv, .5, .07, .07, s * .25, .05, 0, pa); p1.rotation.z = s * .5; const p2 = caja(piv, .07, .4, .07, s * .5, -.18, 0, pa); p2.rotation.z = -s * .15; pats.push(piv); }
    return pats; },
  guiar(a, dt) { const u = a.userData, noche = oscuridad() > .4; if (!atacan(a) || (!noche && !enojado(a))) return deambular();
    const h = haciaJ(a); if (h.d > 18) return deambular();
    u.salto = (u.salto || 0) - dt;
    if (h.d < 4 && h.d > 1.4 && u.suelo && u.salto <= 0) { u.salto = 2; u.vy = 5.2; u.kx = h.dx / h.d * 6; u.kz = h.dz / h.d * 6; }
    morder(a, h, 2, 1.25 + u.an, dt);
    return { dir: h.dir, vel: h.d > 1 ? u.vel * 1.6 : 0 }; },
  tick(a, dt) { const u = a.userData; if (u.rojo > .2) enojar(a, 20); if (enojado(a)) ex(a).eno -= dt;
    // trepa: si tiene una pared adelante, sube
    const p = a.position, fx = p.x + Math.sin(a.rotation.y) * .7, fz = p.z + Math.cos(a.rotation.y) * .7;
    if ((oscuridad() > .4 || enojado(a)) && atacan(a) && solidoMov(get(Math.floor(fx), Math.floor(p.y + .3), Math.floor(fz)))) u.vy = Math.max(u.vy, 3.2); },
  suelta: () => [[B.TELARANA, Math.random() < .6 ? 1 : 0]].filter(x => x[1]) };

// Sombra: alta y oscura. Se teletransporta. Solo ataca si la golpean
TIPOS.sombra = { vida: 30, an: .3, al: 2.6, vel: 1.1, peso: .35, color: '#1a1d33', voz: 'sombra', hostil: true, ia: true, dano: 4,
  armar(g) { const ca = M('#3a4a8a'), ca2 = M('#2a3670'), ma = M('#e8ecf6'), vi = brillo('#5ae8ff'), ne = M('#141830');
    caja(g, .7, 1.1, .6, 0, 1.45, 0, ca); for (const [x, z, h] of [[-.25, .2, .5], [.05, .25, .65], [.28, .15, .4], [-.2, -.2, .55], [.2, -.22, .45]]) caja(g, .2, h, .16, x, .9 - h / 2 + .25, z, ca2);
    caja(g, .66, .62, .62, 0, 2.25, -.02, ca); caja(g, .5, .46, .1, 0, 2.2, .27, ne); caja(g, .38, .34, .04, 0, 2.2, .31, ma);
    for (const sx of [-1, 1]) caja(g, .09, .06, .03, sx * .09, 2.24, .335, vi); caja(g, .74, .14, .7, 0, 2.6, -.04, ca2);
    for (const sx of [-1, 1]) { const b = caja(g, .16, .8, .16, sx * .44, 1.6, .1, ca); b.rotation.x = -.35; caja(g, .14, .12, .14, sx * .44, 1.18, .25, ma); }
    for (const k of [0, 1, 2]) { const c = caja(g, .06, .06, .06, (k - 1) * .3, 2.85 + k * .08, -.1, vi); c.userData.flota = k; }
    return []; },
  guiar(a, dt) { const u = a.userData; if (!enojado(a) || !atacan(a)) return deambular(); const h = haciaJ(a); if (h.d > 30) return deambular();
    morder(a, h, 4, 1.3 + u.an, dt); return { dir: h.dir, vel: h.d > 1 ? u.vel * 2.2 : 0 }; },
  tick(a, dt) { const u = a.userData; if (u.rojo > .2 && !enojado(a)) enojar(a, 30); if (enojado(a)) ex(a).eno -= dt;
    u.tele = (u.tele ?? azar(5, 12)) - dt;
    if (u.tele <= 0) { u.tele = enojado(a) ? azar(2.5, 4.5) : azar(8, 16); const p = a.position;
      let x, z; if (enojado(a) && atacan(a)) { const ang = J.yaw + Math.PI + azar(-.8, .8); x = J.x + Math.sin(ang) * 2.5; z = J.z + Math.cos(ang) * 2.5; } else { x = p.x + azar(-10, 10); z = p.z + azar(-10, 10); }
      if (x > 1 && z > 1 && x < SX - 1 && z < SZ - 1) { const y = sueloCerca(x, z); if (y > 0 && !solidoMov(get(Math.floor(x), y, Math.floor(z))) && !solidoMov(get(Math.floor(x), y + 1, Math.floor(z))) && !solidoMov(get(Math.floor(x), y + 2, Math.floor(z)))) {
        polvo(p.x, p.y + 1.3, p.z, '#5ae8ff', 14); p.set(x, y, z); polvo(x, y + 1.3, z, '#5ae8ff', 14); son(220, .25, 'sine', .08); son(880, .2, 'triangle', .05); } } } },
  suelta: () => [[I.CRISTAL, Math.random() < .35 ? 1 : 0]].filter(x => x[1]) };

// Bruja: tira pociones que lastiman y te hacen lento
TIPOS.bruja = { vida: 18, an: .3, al: 2.2, vel: 1, peso: .3, color: '#2a6a6a', voz: 'bruja', hostil: true, ia: true, dano: 2,
  armar(g) { const tu = M('#2a6a6a'), tu2 = M('#1f5050'), pi = M('#c8b8e8'), so = M('#6a3fd0'), so2 = M('#4a2a9a'), es = brillo('#ffd23a'), pe = M('#f2f2f2'), ne = M('#1d1d21');
    caja(g, .56, .92, .4, 0, .82, 0, tu); caja(g, .6, .1, .44, 0, .4, 0, tu2); caja(g, .3, .06, .02, 0, 1.0, .205, M('#ffd23a'));
    caja(g, .46, .46, .44, 0, 1.52, 0, pi); for (const s of [-1, 1]) { caja(g, .12, .12, .03, s * .1, 1.55, .225, M('#ffffff')); caja(g, .06, .08, .03, s * .1, 1.54, .232, ne); }
    caja(g, .14, .04, .03, 0, 1.4, .225, M('#8a5a8a')); for (const s of [-1, 1]) caja(g, .1, .5, .1, s * .24, 1.3, -.12, pe);
    caja(g, .7, .06, .66, 0, 1.78, 0, so); caja(g, .44, .26, .42, 0, 1.92, 0, so); caja(g, .3, .22, .3, 0, 2.14, -.04, so2); caja(g, .16, .2, .16, 0, 2.32, -.1, so2); caja(g, .46, .06, .44, 0, 1.84, 0, es);
    caja(g, .1, .1, .03, 0, 1.96, .215, es);
    for (const s of [-1, 1]) caja(g, .12, .5, .12, s * .34, 1.04, .06, tu);
    caja(g, .1, .14, .1, .34, .76, .14, brillo('#b05ae0'));
    return [-1, 1].map(s => pata(g, .14, .36, .14, s * .12, .38, 0, tu2)); },
  guiar(a, dt) { if (!atacan(a)) return deambular(); const u = a.userData, h = haciaJ(a); if (h.d > 20) return deambular();
    u.tiro = (u.tiro ?? 2) - dt;
    if (u.tiro <= 0 && h.d < 12 && ve(a, h)) { u.tiro = 2.8 + Math.random(); const p = a.position; disparar('pocion', p.x, p.y + 1.6, p.z, J.x, J.y + 1, J.z); }
    const vel = h.d < 4 ? -u.vel : h.d > 8 ? u.vel * 1.2 : 0;
    return { dir: h.dir, vel }; },
  suelta: () => [[I.POCION + Math.floor(Math.random() * 4), Math.random() < .4 ? 1 : 0], [I.CARBON, 1]].filter(x => x[1]) };

// Gelatina: salta hacia ti; al morir se divide en dos más chicas
const COL_GEL = ['#5ad0ff', '#ff6ad5', '#8fe36a'];
[3, 2, 1].forEach(n => {
  const s = [0, .45, .75, 1.15][n];
  TIPOS['gelatina' + n] = { vida: [0, 4, 8, 16][n], an: s * .45, al: s * .9, vel: 1.2, peso: .25, color: COL_GEL[0], voz: 'gelatina', hostil: true, ia: true, dano: n, noNatural: n < 3, divide: n > 1 ? 'gelatina' + (n - 1) : null,
    armar(g) { const c = COL_GEL[Math.floor(Math.random() * 3)], m = new THREE.MeshLambertMaterial({ color: parseInt(c.slice(1), 16), transparent: true, opacity: .72 }), nu = M(c), bl = M('#ffffff'), ne = M('#1d1d21');
      const h = new THREE.Group(); h.scale.setScalar(s); g.add(h);
      caja(h, 1, .34, 1, 0, .17, 0, m); caja(h, .84, .3, .84, 0, .49, 0, m); caja(h, .6, .2, .6, 0, .74, 0, m); caja(h, .36, .1, .36, 0, .89, 0, nu); caja(h, .38, .26, .38, 0, .38, 0, nu);
      caja(h, .1, .16, .03, -.3, .62, .425, M('#ffffff')); caja(h, .06, .06, .03, -.3, .48, .425, M('#ffffff'));
      for (const x of [-1, 1]) { caja(h, .2, .22, .03, x * .17, .42, .505, bl); caja(h, .09, .11, .03, x * .17, .4, .52, ne); }
      caja(h, .16, .05, .03, 0, .24, .505, ne);
      return []; },
    guiar(a, dt) { if (!atacan(a)) return deambular(); const u = a.userData, h = haciaJ(a); if (h.d > 18) return deambular();
      u.salto = (u.salto ?? 1) - dt;
      if (u.suelo && u.salto <= 0) { u.salto = azar(.9, 1.6); u.vy = 5 + n; u.kx = h.dx / h.d * (2 + n); u.kz = h.dz / h.d * (2 + n); son(180 - n * 30, .08, 'sine', .06); }
      morder(a, h, n, .6 + u.an, dt);
      return { dir: h.dir, vel: 0 }; },
    suelta: () => n === 1 ? [[I.MIEL, Math.random() < .25 ? 1 : 0]].filter(x => x[1]) : [] };
});

// Ahogado: zombi del agua
TIPOS.ahogado = { vida: 14, an: .3, al: 1.75, vel: 1.1, peso: .3, color: '#4a9a9a', voz: 'zombi', hostil: true, dano: 2, noNatural: true,
  armar(g) { const piel = M('#6ac8b8'), ropa = M('#2a4a7a'), ropa2 = M('#1f3a5f'), al = M('#3a8a3a'), ne = M('#0d2a2a'), ojo = brillo('#9af0ff');
    caja(g, .5, .46, .3, 0, .67, 0, ropa); caja(g, .2, .12, .02, -.1, .56, .16, ropa2);
    for (const s of [-1, 1]) { caja(g, .16, .16, .44, s * .34, .84, .24, ropa); caja(g, .14, .14, .1, s * .34, .84, .5, piel); }
    caja(g, .6, .56, .54, 0, 1.2, 0, piel); for (const s of [-1, 1]) { caja(g, .15, .13, .03, s * .14, 1.24, .275, ne); caja(g, .06, .06, .03, s * .14, 1.24, .285, ojo); }
    caja(g, .2, .06, .03, 0, 1.05, .275, ne); for (const [x, h] of [[-.2, .3], [.05, .4], [.22, .25]]) caja(g, .08, h, .04, x, 1.38 - h / 2, .28, al); caja(g, .64, .1, .58, 0, 1.49, -.02, al);
    return [-1, 1].map(s => pata(g, .2, .44, .22, s * .12, .44, 0, ropa2)); },
  tick(a, dt) { const u = a.userData, p = a.position; if (get(Math.floor(p.x), Math.floor(p.y + .5), Math.floor(p.z)) !== B.AGUA || !atacan(a)) return;
    const h = haciaJ(a); if (h.d < 16) u.vy = Math.max(-2, Math.min(2.5, h.dy * 1.5)); },
  suelta: () => [[I.PESCADO, Math.random() < .5 ? 1 : 0], [I.HUESO, Math.random() < .3 ? 1 : 0]].filter(x => x[1]) };

// ═════════ ANIMALES ═════════
TIPOS.conejo = { vida: 4, an: .2, al: .5, vel: 1.6, peso: .2, color: '#a8845a', voz: 'conejo',
  armar(g) { const c = ['#a8845a', '#f2f2f2', '#7a7a80'][Math.floor(Math.random() * 3)], m = M(c), ro = M('#f2a0b0'), ne = M('#1d1d21');
    caja(g, .3, .26, .42, 0, .3, -.02, m); caja(g, .26, .24, .24, 0, .44, .22, m); for (const s of [-1, 1]) { caja(g, .07, .26, .05, s * .07, .66, .2, m); caja(g, .04, .18, .02, s * .07, .66, .225, ro); caja(g, .05, .05, .02, s * .08, .48, .34, ne); }
    caja(g, .05, .04, .02, 0, .42, .345, ro); caja(g, .12, .12, .1, 0, .34, -.26, M('#ffffff'));
    return [[.08, .14], [-.08, -.12], [-.08, .14], [.08, -.12]].map(([x, z]) => pata(g, .07, .16, .1, x, .18, z, m)); },
  tick(a, dt) { const u = a.userData; if (u.suelo && Math.hypot(u.kx, u.kz) < .5 && Math.random() < dt * 2.2) u.vy = 4; },
  suelta: () => [[I.CARNE, 1]] };

PELO.lobo = ['#a8a8b0', '#e8e8ec', '#3a3a40'];
TIPOS.lobo = { vida: 12, an: .3, al: .9, vel: 1.3, peso: .3, color: '#a8a8b0', voz: 'lobo', ia: true, dano: 2,
  armar: g => armarCuadrupedo(g, 'lobo'),
  guiar(a, dt) { if (!enojado(a) || !atacan(a)) return deambular(); const h = haciaJ(a); if (h.d > 20) return deambular(); morder(a, h, 2, 1.3, dt); return { dir: h.dir, vel: h.d > 1 ? a.userData.vel * 1.7 : 0 }; },
  tick(a, dt) { const u = a.userData; if (u.rojo > .2 && !enojado(a)) { enojar(a, 20); for (const o of animales) if (o.userData.animal === 'lobo' && o.position.distanceTo(a.position) < 10) enojar(o, 20); } if (enojado(a)) ex(a).eno -= dt; },
  suelta: () => [] };

TIPOS.llama = { vida: 15, an: .42, al: 1.9, vel: 1, peso: .38, color: '#e8d8b8', voz: 'llama', ia: true,
  armar(g) { const c = Math.random() < .5 ? ['#e8d8b8', '#c8a878'] : ['#8a6a4a', '#6a4a2a'], m = M(c[0]), m2 = M(c[1]), ne = M('#1d1d21'), ta = M(['#c8341a', '#3a8ad0', '#3fae4a'][Math.floor(Math.random() * 3)]);
    caja(g, .6, .56, .9, 0, .95, 0, m); caja(g, .62, .14, .5, 0, 1.24, -.05, ta);
    caja(g, .3, .7, .3, 0, 1.5, .38, m); caja(g, .34, .3, .44, 0, 1.92, .48, m); caja(g, .2, .16, .16, 0, 1.86, .74, m2); caja(g, .06, .06, .02, 0, 1.88, .825, ne);
    for (const s of [-1, 1]) { caja(g, .07, .18, .07, s * .12, 2.14, .42, m); caja(g, .05, .05, .02, s * .12, 1.98, .705, ne); }
    caja(g, .14, .2, .14, 0, 1.0, -.48, m);
    return [[.2, .3], [-.2, -.3], [-.2, .3], [.2, -.3]].map(([x, z]) => pata(g, .16, .66, .16, x, .68, z, m2)); },
  guiar: () => null,
  tick(a, dt) { const u = a.userData; u.esc = (u.esc || 0) - dt; if (u.rojo > .2 && u.esc <= 0 && jugando && !creativo()) { u.esc = 1.6; const p = a.position; disparar('escupida', p.x, p.y + 1.9, p.z, J.x, J.y + 1.4, J.z); } },
  suelta: () => [[B.TELA, 1 + Math.floor(Math.random() * 2)]] };

TIPOS.cabra = { vida: 10, an: .32, al: 1.2, vel: 1.2, peso: .32, color: '#f2f2ee', voz: 'cabra', ia: true,
  armar(g) { const m = M('#f2f2ee'), m2 = M('#d8d8d0'), cu = M('#8a8070'), ne = M('#1d1d21');
    caja(g, .44, .44, .7, 0, .8, 0, m); caja(g, .3, .34, .36, 0, 1.12, .4, m); caja(g, .14, .2, .06, 0, .9, .56, m2); for (const s of [-1, 1]) { caja(g, .06, .06, .02, s * .09, 1.17, .585, ne); const c = caja(g, .06, .26, .06, s * .08, 1.38, .32, cu); c.rotation.x = -.5; caja(g, .12, .05, .06, s * .2, 1.2, .36, m2); }
    return [[.14, .22], [-.14, -.22], [-.14, .22], [.14, -.22]].map(([x, z]) => pata(g, .12, .58, .12, x, .6, z, m2)); },
  guiar: () => null,
  tick(a, dt) { const u = a.userData; if (u.suelo && Math.random() < dt * .15) { u.vy = 8; u.kx = azar(-2, 2); u.kz = azar(-2, 2); }
    u.emb = (u.emb ?? azar(15, 40)) - dt; const h = haciaJ(a);
    if (u.emb <= 0 && h.d < 3 && atacan(a)) { u.emb = azar(25, 50); lastimar(1, h.dx / h.d * 1.8, h.dz / h.d * 1.8); son(140, .12, 'square', .1); } },
  suelta: () => [[I.CARNE, 1]] };

TIPOS.osoPolar = { vida: 30, an: .6, al: 1.4, vel: 1.1, peso: .5, color: '#f4f6f8', voz: 'oso', ia: true, dano: 3,
  armar(g) { const m = M('#f4f6f8'), m2 = M('#dde2e8'), ne = M('#1d1d21');
    caja(g, .84, .7, 1.3, 0, .9, 0, m); caja(g, .56, .5, .5, 0, 1.06, .82, m); caja(g, .3, .24, .22, 0, .96, 1.14, m2); caja(g, .12, .08, .03, 0, 1.02, 1.255, ne);
    for (const s of [-1, 1]) { caja(g, .12, .12, .08, s * .22, 1.36, .74, m); caja(g, .07, .07, .03, s * .14, 1.14, 1.075, ne); }
    return [[.28, .42], [-.28, -.42], [-.28, .42], [.28, -.42]].map(([x, z]) => pata(g, .26, .56, .3, x, .58, z, m2)); },
  guiar(a, dt) { if (!enojado(a) || !atacan(a)) return deambular(); const h = haciaJ(a); if (h.d > 20) return deambular(); morder(a, h, 3, 1.6, dt); return { dir: h.dir, vel: h.d > 1.2 ? a.userData.vel * 1.6 : 0 }; },
  tick(a, dt) { const u = a.userData; if (u.rojo > .2 && !enojado(a)) enojar(a, 25); if (enojado(a)) ex(a).eno -= dt; },
  suelta: () => [[I.PESCADO, 1 + Math.floor(Math.random() * 2)]] };

TIPOS.murcielago = { vida: 3, an: .2, al: .4, vel: 2, peso: .15, color: '#4a3a2e', voz: 'murcielago', noNatural: true,
  armar(g) { const m = M('#4a3a2e'), m2 = M('#3a2a20'), oj = brillo('#ffd23a');
    caja(g, .2, .22, .2, 0, .25, 0, m); caja(g, .18, .16, .16, 0, .42, .04, m); for (const s of [-1, 1]) { caja(g, .05, .1, .04, s * .06, .54, .04, m); caja(g, .04, .04, .02, s * .05, .44, .125, oj); }
    const alas = [-1, 1].map(s => { const q = new THREE.Group(); q.position.set(s * .1, .3, 0); g.add(q); caja(q, .4, .03, .26, s * .2, 0, 0, m2); return q; });
    g._alas = alas; return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) { const u = a.userData, p = a.position;
    if (!u.dest || Math.random() < dt * .7) u.dest = { x: p.x + azar(-5, 5), y: p.y + azar(-2, 2), z: p.z + azar(-5, 5) };
    const d = u.dest, dx = d.x - p.x, dy = d.y - p.y, dz = d.z - p.z, n = Math.hypot(dx, dy, dz) || 1, v = 3 * dt;
    const nx = p.x + dx / n * v, ny = p.y + dy / n * v, nz = p.z + dz / n * v;
    if (!solidoMov(get(Math.floor(nx), Math.floor(ny), Math.floor(nz))) && !solidoMov(get(Math.floor(nx), Math.floor(ny + .4), Math.floor(nz)))) { p.set(nx, ny, nz); } else u.dest = null;
    u.vy = 0; a.rotation.y = Math.atan2(dx, dz);
    if (a._alas) a._alas.forEach((q, k) => { q.rotation.z = Math.sin(u.t * 30) * .9 * (k ? -1 : 1); }); },
  suelta: () => [] };

// ═════════ GÓLEMS (ayudantes) ═════════
const hostilCerca = (p, r) => { let mejor = null, md = r; for (const m of monstruos.concat(animales.filter(a => (TIPOS[a.userData.animal] || {}).hostil && !(TIPOS[a.userData.animal] || {}).jefe))) { const d = m.position.distanceTo(p); if (d < md) { md = d; mejor = m; } } return mejor; };
TIPOS.golemHierro = { vida: 80, an: .6, al: 2.6, vel: .85, peso: .7, color: '#b8bcc8', voz: 'golem', ia: true, ayudante: true,
  armar(g) { const ac = M('#b8bcc8'), ac2 = M('#8a8fa0'), ro = M('#5a5f70'), vi = brillo('#ff9a2e');
    caja(g, 1.1, .9, .7, 0, 1.75, 0, ac); caja(g, .8, .5, .56, 0, 1.15, 0, ac2); for (const [x, y] of [[-.4, 2.05], [.4, 2.05], [-.4, 1.45], [.4, 1.45]]) caja(g, .08, .08, .04, x, y, .36, ro);
    caja(g, .5, .5, .46, 0, 2.45, .12, ac); caja(g, .4, .1, .04, 0, 2.48, .36, vi); caja(g, .14, .1, .06, 0, 2.3, .36, ro);
    for (const s of [-1, 1]) { const b = caja(g, .3, 1.3, .32, s * .72, 1.38, 0, ac2); caja(g, .36, .3, .38, s * .72, .7, 0, ac); }
    return [-1, 1].map(s => pata(g, .34, .9, .36, s * .24, .9, 0, ac2)); },
  guiar(a, dt) { const u = a.userData, obj = hostilCerca(a.position, 14); u.golpe = (u.golpe || 0) - dt;
    if (!obj) { const e = ex(a); if (e.cx != null && Math.hypot(e.cx - a.position.x, e.cz - a.position.z) > 14) return { dir: Math.atan2(e.cx - a.position.x, e.cz - a.position.z), vel: u.vel }; return null; }
    const p = obj.position, dx = p.x - a.position.x, dz = p.z - a.position.z, d = Math.hypot(dx, dz) || .1;
    if (d < 2.1 && u.golpe <= 0) { u.golpe = 1.2; herir(obj, 12); obj.userData.vy = 7; obj.userData.kx = dx / d * 4; obj.userData.kz = dz / d * 4; son(110, .15, 'square', .14); swingGolem(a); }
    return { dir: Math.atan2(dx, dz), vel: d > 1.6 ? u.vel * 1.3 : 0 }; },
  suelta: () => [[I.HIERRO, 3 + Math.floor(Math.random() * 3)]] };
function swingGolem(a) { a.userData.brazo = .4; }
TIPOS.golemNieve = { vida: 8, an: .3, al: 1.8, vel: 1, peso: .3, color: '#f4f8ff', voz: 'golem', ia: true, ayudante: true,
  armar(g) { const n = M('#f4f8ff'), n2 = M('#e2eaf6'), ca = M('#1d1d21'), pa = M('#7a5230'), bu = M('#c8341a'), ba = M('#8a8fa0'), na = M('#ff9a2e');
    caja(g, .7, .6, .7, 0, .32, 0, n); caja(g, .56, .5, .56, 0, .86, 0, n2); caja(g, .46, .44, .46, 0, 1.33, 0, n);
    for (const s of [-1, 1]) caja(g, .08, .08, .03, s * .1, 1.4, .245, ca); caja(g, .06, .06, .16, 0, 1.3, .3, na); for (const y of [.75, .95]) caja(g, .06, .06, .03, 0, y, .295, ca);
    caja(g, .5, .1, .5, 0, 1.12, 0, bu); caja(g, .12, .3, .06, .16, .96, .24, bu);
    caja(g, .34, .3, .34, 0, 1.68, 0, ba); caja(g, .4, .05, .4, 0, 1.54, 0, ba);
    for (const s of [-1, 1]) { const b = caja(g, .5, .05, .05, s * .48, 1.0, 0, pa); b.rotation.z = s * .35; }
    return []; },
  guiar(a, dt) { const u = a.userData, obj = hostilCerca(a.position, 10); if (!obj) return null; u.tiro = (u.tiro || 0) - dt;
    const p = obj.position, dx = p.x - a.position.x, dz = p.z - a.position.z, d = Math.hypot(dx, dz) || .1;
    if (u.tiro <= 0) { u.tiro = 1.4; disparar('nieve', a.position.x, a.position.y + 1.1, a.position.z, p.x, p.y + .9, p.z, 'golem'); }
    return { dir: Math.atan2(dx, dz), vel: d < 4 ? -u.vel : d > 7 ? u.vel : 0 }; },
  suelta: () => [[B.NIEVE, 2]] };

// armar gólems: calabaza arriba de 2 bloques de hierro o de 2 de nieve
{ const p0 = ponerBloque; ponerBloque = function (x, y, z, t) {
    const r = p0(x, y, z, t);
    if (grupo && (t === B.CALABAZA || t === B.CALABAZA_F) && jugando) {
      const a = get(x, y - 1, z), b = get(x, y - 2, z), tipo = a === B.B_HIERRO && b === B.B_HIERRO ? 'golemHierro' : a === B.NIEVE && b === B.NIEVE ? 'golemNieve' : null;
      if (tipo) setTimeout(() => { if (get(x, y, z) !== t) return; sinGrupo(() => ponerMuchos([[x, y, z, B.AIRE], [x, y - 1, z, B.AIRE], [x, y - 2, z, B.AIRE]])); const g = crearAnimal(tipo, x + .5, y - 2, z + .5); ex(g).cx = x + .5; ex(g).cz = z + .5;
        polvo(x + .5, y - 1, z + .5, tipo === 'golemHierro' ? '#b8bcc8' : '#ffffff', 24); aviso(TR('golemListo'), 1800); sonar('final', .5) || son(660, .2, 'triangle', .1); sucio = true; if (typeof lgSumar === 'function') lgSumar('golem'); }, 60);
    }
    return r; }; }

// ═════════ JEFES ═════════
RAZAS.push(['#2f5aa8', '#a8d8ff', '#ffe14a']);
TIPOS.dragonJefe = { vida: 300, an: 1.6, al: 3, vel: 1.5, peso: 1, color: '#2f5aa8', voz: 'rugidoJefe', hostil: true, ia: true, jefe: true, dano: 6, vuela: true,
  armar(g) { const h = new THREE.Group(); h.scale.setScalar(2.6); g.add(h); armarDragon(h, RAZAS.length - 1); g._alas = h.alas;
    for (const s of [-1, 1]) { caja(h, .08, .34, .08, s * .1, 2.12, 1.0, brillo('#ffe14a')); caja(h, .04, .5, .3, s * .46, 1.32, -.3, brillo('#ffe14a')); } return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) { const u = a.userData, e = ex(a), p = a.position; if (e.cx == null) { e.cx = p.x; e.cz = p.z; e.cy = p.y; }
    u.fase = (u.fase || 0) + dt; u.vy = 0; const al = a._alas; if (al) al.forEach((q, k) => q.rotation.z = Math.sin(u.fase * 4) * .5 * (k ? -1 : 1));
    const ataca = atacan(a), h = haciaJ(a); u.pique = (u.pique ?? 6) - dt; u.bola = (u.bola ?? 3) - dt;
    let tx, ty, tz;
    if (ataca && u.pique < 1.4 && u.pique > 0) { tx = J.x; ty = J.y + 1; tz = J.z; }   // se tira en picada
    else { const ang = u.fase * .35; tx = e.cx + Math.cos(ang) * 16; tz = e.cz + Math.sin(ang) * 16; ty = Math.max(e.cy, sueloCerca(tx, tz)) + 12; }
    if (u.pique <= 0) u.pique = azar(6, 9);
    const dx = tx - p.x, dy = ty - p.y, dz = tz - p.z, n = Math.hypot(dx, dy, dz) || 1, v = Math.min(n, (u.pique < 1.4 ? 14 : 8) * dt);
    p.x += dx / n * v; p.y += dy / n * v; p.z += dz / n * v; a.rotation.y = Math.atan2(dx, dz);
    if (ataca) { morder(a, h, 6, 3, dt); if (u.bola <= 0 && h.d < 40) { u.bola = azar(3, 5); disparar('rayo', p.x, p.y + 1.5, p.z, J.x, J.y + .5, J.z); } } },
  suelta: () => [[I.CRISTAL, 15], [I.ORO, 10], [B.HUEVO + Math.floor(Math.random() * 5), 1]] };

TIPOS.tricefalo = { vida: 260, an: 1.1, al: 3, vel: 1.2, peso: 1, color: '#3a3a4a', voz: 'rugidoJefe', hostil: true, ia: true, jefe: true, dano: 4, vuela: true,
  armar(g) { const pi = M('#a8784a'), pi2 = M('#8a5f38'), oro = M('#ffd23a'), la = brillo('#ff8a1a'), ma = M('#c8341a');
    caja(g, 1.5, 1.2, 1, 0, 1.6, 0, pi); caja(g, 1.9, .5, 1.3, 0, .95, 0, pi2); caja(g, 1.3, .4, 1.1, 0, .6, 0, ma); caja(g, .9, .3, .8, 0, .32, 0, ma);
    for (const [x, y, w, h] of [[-.4, 1.7, .08, .5], [.35, 1.5, .08, .4], [0, 1.9, .3, .06], [-.1, 1.35, .3, .06]]) caja(g, w, h, .04, x, y, .51, la);
    caja(g, 1.6, .16, 1.1, 0, 2.18, 0, oro);
    for (const sx of [-1, 1]) { caja(g, .34, .34, .34, sx * .95, 1.95, 0, pi2); const b = caja(g, .26, .8, .26, sx * 1.02, 1.45, .12, pi); b.rotation.x = -.3; caja(g, .3, .26, .3, sx * 1.02, 1.04, .3, pi2); }
    caja(g, .1, 1.6, .1, 1.06, 1.3, .36, M('#6b5133')); caja(g, .3, .3, .3, 1.06, 2.15, .36, brillo('#5ad0ff'));
    const cab = [[-.62, 2.55, .72, '#ff4a4a'], [0, 2.85, .95, '#ffe14a'], [.62, 2.55, .72, '#5ad0ff']].map(([x, y, sc, c]) => {
      const q = new THREE.Group(); q.position.set(x, y, 0); g.add(q); caja(q, .8 * sc, .7 * sc, .76 * sc, 0, 0, 0, pi);
      for (const sx of [-1, 1]) caja(q, .2 * sc, .18 * sc, .03, sx * .19 * sc, .06 * sc, .39 * sc, brillo(c)); caja(q, .36 * sc, .08, .03, 0, -.18 * sc, .39 * sc, M('#3a2416'));
      caja(q, .9 * sc, .14, .86 * sc, 0, .42 * sc, 0, oro); for (const px of [-1, 0, 1]) caja(q, .14, .26 + (px ? 0 : .1), .14, px * .3 * sc, .6 * sc, .3 * sc, oro);
      return q; });
    g._cab = cab; return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) { const u = a.userData, p = a.position; u.fase = (u.fase || 0) + dt; u.vy = 0;
    const cab = a._cab; if (cab) cab.forEach((q, k) => { q.rotation.y = Math.sin(u.fase * 1.3 + k) * .3; q.position.y = (k === 1 ? 2.75 : 2.35) + Math.sin(u.fase * 2 + k) * .06; });
    const ataca = atacan(a), h = haciaJ(a), suelo = sueloCerca(p.x, p.z);
    let vx = 0, vz = 0; if (ataca && h.d < 40) { const dd = h.d > 9 ? 1 : h.d < 6 ? -1 : 0; vx = h.dx / h.d * dd * 3; vz = h.dz / h.d * dd * 3; a.rotation.y = h.dir; }
    const nx = p.x + vx * dt, nz = p.z + vz * dt; if (!solidoMov(get(Math.floor(nx), Math.floor(p.y + 1), Math.floor(nz)))) { p.x = nx; p.z = nz; }
    p.y += ((suelo + 3.5 + Math.sin(u.fase) * .5) - p.y) * Math.min(1, dt * 2);
    if (ataca && h.d < 30) { u.tiro = (u.tiro ?? 1.5) - dt; if (u.tiro <= 0) { u.tiro = 1.1; u.cab = ((u.cab || 0) + 1) % 3; const c = cab && cab[u.cab]; const w = c ? c.getWorldPosition(new THREE.Vector3()) : p.clone(); disparar('orbe', w.x, w.y, w.z, J.x, J.y + 1, J.z); } }
    if (!u.ayuda && u.vida < 130) { u.ayuda = true; for (let k = 0; k < 2; k++) { const g = crearAnimal('arquero', p.x + azar(-3, 3), suelo, p.z + azar(-3, 3)); ex(g).f = 1; } } },
  suelta: () => [[I.CRISTAL, 12], [I.ORO, 12], [I.ESP4, 1]] };

// llamar a los jefes con el Cuerno y el Cetro
function llamarJefe(tipo) {
  if (animales.some(a => (TIPOS[a.userData.animal] || {}).jefe && a.position.distanceTo(new THREE.Vector3(J.x, J.y, J.z)) < 60)) { aviso(TR('jefeYaHay'), 1600); return false; }
  const ang = J.yaw + Math.PI, x = Math.max(4, Math.min(SX - 4, J.x + Math.sin(ang) * 14)), z = Math.max(4, Math.min(SZ - 4, J.z + Math.cos(ang) * 14));
  const y = tipo === 'dragonJefe' ? sueloCerca(x, z) + 12 : sueloCerca(x, z) + 3;
  const g = crearAnimal(tipo, x, y, z); ex(g).cx = x; ex(g).cz = z; ex(g).cy = sueloCerca(x, z); ex(g).f = 1;
  aviso(TR('jefeLlega', { n: nomCria(tipo).toUpperCase() }), 2600); voz('rugidoJefe', 0); temblorJefe && temblorJefe(.6);
  return true;
}
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) {
    const id = barra[sel] || 0;
    if ((id === I.CUERNO || id === I.CETRO) && !aventura()) { if (llamarJefe(id === I.CUERNO ? 'dragonJefe' : 'tricefalo') && !creativo()) quitarItem(id, 1); swing = 1; return true; }
    return t0(dir); }; }

// barra de vida del jefe
{ const b = document.createElement('div'); b.id = 'jefeBar2'; b.hidden = true; b.innerHTML = '<b></b><div><i></i></div>'; document.body.appendChild(b);
  const st = document.createElement('style'); st.textContent = `#jefeBar2 { position: fixed; top: max(8px, env(safe-area-inset-top)); left: 50%; transform: translateX(-50%); z-index: 4; zoom: var(--u); width: min(46vw, 380px); text-align: center; color: #fff; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 14px; text-shadow: 0 2px 0 #0d153d; pointer-events: none; }
    #jefeBar2[hidden] { display: none; } #jefeBar2 div { height: 10px; background: rgba(13,21,61,.7); border: 2px solid #0d153d; border-radius: 6px; overflow: hidden; margin-top: 2px; } #jefeBar2 i { display: block; height: 100%; background: linear-gradient(#ff6a8a, #c8341a); transition: width .2s; }`; document.head.appendChild(st); }
let jefeVisto = null;
function pintarJefe() {
  const j = jugando ? animales.find(a => (TIPOS[a.userData.animal] || {}).jefe && a.userData.animal !== 'ojonRey' && a.position.distanceTo(new THREE.Vector3(J.x, J.y, J.z)) < 70) : null;
  $('jefeBar2').hidden = !j; if (!j) return; const T = TIPOS[j.userData.animal];
  $('jefeBar2').querySelector('b').textContent = nomCria(j.userData.animal); $('jefeBar2').querySelector('i').style.width = Math.max(0, j.userData.vida / T.vida * 100) + '%';
}
// al morir: la gelatina se divide, los jefes avisan
{ const m0 = matarAnimal; matarAnimal = function (a) {
    const u = a.userData, T = TIPOS[u.animal] || {}, p = a.position.clone();
    const r = m0(a);
    if (T.divide && jugando) for (let k = 0; k < 2; k++) { const g = crearAnimal(T.divide, p.x + azar(-.4, .4), p.y + .3, p.z + azar(-.4, .4)); if (u.extra && u.extra.f) ex(g).f = 1; }
    if (T.jefe && u.animal !== 'ojonRey' && jugando) { aviso(TR('jefeVencido', { n: nomCria(u.animal).toUpperCase() }), 3000); sonar('final', .8); if (typeof lgSumar === 'function') lgSumar('jefes'); stats['jefe_' + u.animal] = 1; }
    return r; }; }

// ═════════ LOBO: se domestica con un hueso ═════════
{ const t0 = tocarAnimal; tocarAnimal = function (a) {
    if (a.userData.animal === 'lobo' && !enojado(a)) { const id = barra[sel] || 0;
      if (id === I.HUESO && (creativo() || inv[I.HUESO] > 0)) { if (!creativo()) quitarItem(I.HUESO, 1); swing = 1;
        if (creativo() || Math.random() < .35) { const p = a.position; quitarAnimal(a); nuevaMascota('perro', p.x, p.y, p.z); aviso(TR('loboDomado'), 1800); sucio = true; if (typeof lgSumar === 'function') lgSumar('lobo'); } else { polvo(a.position.x, a.position.y + .6, a.position.z, '#888888', 6); aviso(TR('loboNo'), 1000); }
        return true; } }
    return t0(a); }; }

// ═════════ VOCES ═════════
{ const v0 = voz; voz = function (tipo, dist = 0) {
    const t = TIPOS[tipo] && TIPOS[tipo].voz ? TIPOS[tipo].voz : tipo;
    const VZ = {
      hueso: () => { for (let k = 0; k < 4; k++) setTimeout(() => ruido(.03, .06 * vol, 2500), k * 60); },
      mecha: () => ruido(.6, .04 * vol, 3500),
      arana: () => { for (let k = 0; k < 3; k++) setTimeout(() => son(1200 + k * 200, .04, 'square', .03 * vol), k * 50); },
      sombra: () => { son(90, .7, 'sine', .08 * vol); son(140, .6, 'triangle', .04 * vol); },
      bruja: () => { for (let k = 0; k < 4; k++) setTimeout(() => son(700 - k * 60, .07, 'square', .04 * vol), k * 90); },
      gelatina: () => son(160, .12, 'sine', .08 * vol),
      conejo: () => son(1400, .03, 'triangle', .02 * vol),
      lobo: () => { son(330, .6, 'sawtooth', .04 * vol); setTimeout(() => son(520, .7, 'triangle', .05 * vol), 200); },
      llama: () => son(420, .3, 'sawtooth', .04 * vol),
      cabra: () => { son(560, .25, 'sawtooth', .05 * vol); setTimeout(() => son(500, .25, 'sawtooth', .04 * vol), 120); },
      oso: () => son(110, .7, 'sawtooth', .07 * vol),
      murcielago: () => son(2400, .05, 'square', .02 * vol),
      golem: () => son(80, .3, 'square', .06 * vol),
      rugidoJefe: () => { son(70, 1.4, 'sawtooth', .16 * vol); son(140, 1.2, 'square', .08 * vol); },
    };
    if (!VZ[t]) return v0(tipo, dist);
    const vol = Math.max(0, 1 - dist / 22); if (vol < .05) return; try { VZ[t](); } catch (e) {} }; }

// ═════════ CADA CUADRO: comportamientos especiales y proyectiles ═════════
{ const m0 = moverAnimales; moverAnimales = function (dt) {
    const r = m0(dt);
    for (const a of animales.slice()) { const T = TIPOS[a.userData.animal]; if (T && T.tick) { try { T.tick(a, dt); } catch (e) {} }
      if (a.userData.brazo > 0) a.userData.brazo -= dt;
      if (a.userData.animal === 'sombra') for (const c of a.children) if (c.userData.flota != null) c.position.y = 2.85 + c.userData.flota * .08 + Math.sin(a.userData.t * 3 + c.userData.flota) * .06; }
    return r; }; }
{ let ult = performance.now(), jefeT = 0; const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; if (!jugando || pausado) return;
    try { moverProys(dt); jefeT -= dt; if (jefeT <= 0) { jefeT = .25; pintarJefe(); } } catch (e) { console.error(e); } };
  requestAnimationFrame(tick); }
// al salir del mundo se limpian los proyectiles
{ const s0 = salirAlMenu; salirAlMenu = function () { for (const q of proys.splice(0)) escena.remove(q.m); $('jefeBar2').hidden = true; return s0.apply(this, arguments); }; }

// ═════════ DÓNDE APARECEN ═════════
// animales nuevos en el campo (además de vacas, ovejas y gallinas)
{ const p0 = poblarAnimales; poblarAnimales = function (n, lejos) {
    const r = p0(n, lejos);
    if (window.mundoTipo === 'tutorial') return r;
    for (let k = 0; k < Math.max(1, Math.ceil(n * .5)); k++) { if (Math.random() > .55) continue;
      for (let intento = 0; intento < 30; intento++) {
        const x = 3 + Math.floor(Math.random() * (SX - 6)), z = 3 + Math.floor(Math.random() * (SZ - 6)); if (lejos && Math.hypot(x - J.x, z - J.z) < 26) continue;
        let y = SY - 2; while (y > 0 && !solidoMov(get(x, y, z)) && get(x, y, z) !== B.AGUA) y--; const t = get(x, y, z); if (solidoMov(get(x, y + 1, z)) || solidoMov(get(x, y + 2, z))) continue;
        let tipo = null;
        if (t === B.NIEVE || get(x, y + 1, z) === B.NIEVE) tipo = Math.random() < .5 ? 'osoPolar' : 'conejo';
        else if (t === B.PASTO) { const alto = typeof SEA !== 'undefined' && y > SEA + 12; const rr = Math.random(); tipo = alto && rr < .5 ? 'cabra' : rr < .38 ? 'conejo' : rr < .6 ? 'lobo' : rr < .8 ? 'llama' : 'cabra'; }
        if (!tipo) continue;
        const cant = tipo === 'lobo' ? 2 + Math.floor(Math.random() * 2) : tipo === 'conejo' ? 2 : 1;
        for (let q = 0; q < cant; q++) crearAnimal(tipo, x + .5 + azar(-1, 1), y + 1, z + .5 + azar(-1, 1));
        break; } }
    return r; }; }
// de noche: ahogados en el agua; en cuevas, murciélagos
{ let t = 0; setInterval(() => { if (!jugando || pausado || window.mundoTipo || (window.__mp && __mp.MP.invitado)) return; if (++t < 4) return; t = 0;
    const cuenta = tp => animales.filter(a => a.userData.animal === tp).length;
    if (oscuridad() > .5 && REG.monstruos && !creativo() && cuenta('ahogado') < 3) for (let k = 0; k < 10; k++) {
      const x = Math.floor(J.x + azar(-20, 20)), z = Math.floor(J.z + azar(-20, 20)); if (x < 2 || z < 2 || x >= SX - 2 || z >= SZ - 2) continue;
      if (typeof SEA === 'undefined' || get(x, SEA, z) !== B.AGUA || get(x, SEA - 2, z) !== B.AGUA || Math.hypot(x - J.x, z - J.z) < 9) continue;
      crearAnimal('ahogado', x + .5, SEA - 2, z + .5); break; }
    const bajoTierra = typeof cieloEn === 'function' && cieloEn(Math.floor(J.x), Math.floor(J.y + 1), Math.floor(J.z)) < .2;
    if (bajoTierra && cuenta('murcielago') < 4 && Math.random() < .5) for (let k = 0; k < 10; k++) {
      const x = Math.floor(J.x + azar(-8, 8)), y = Math.floor(J.y + azar(0, 4)), z = Math.floor(J.z + azar(-8, 8));
      if (dentro(x, y, z) && !get(x, y, z) && !get(x, y + 1, z) && Math.hypot(x - J.x, z - J.z) > 3) { crearAnimal('murcielago', x + .5, y + .2, z + .5); break; } }
  }, 1000); }
// un gólem de hierro cuida cada aldea
{ const e0 = entrarMundo; entrarMundo = function (id) { const r = e0(id);
    try { if (jugando && typeof mapa !== 'undefined' && !mapa.golemsAldea && !window.mundoTipo && aldeas && aldeas.length && !(window.__mp && __mp.MP.invitado)) { mapa.golemsAldea = 1;
      for (const al of aldeas) { const g = crearAnimal('golemHierro', al.x + 2, al.y + .2, al.z + 2); ex(g).cx = al.x; ex(g).cz = al.z; } sucio = true; } } catch (e) {}
    return r; }; }

// ═════════ PESTAÑA "CRIATURAS" (creativo): poner cualquier criatura ═════════
const GRUPOS_CRIA = [
  ['criaGranja', ['vaca', 'oveja', 'gallina', 'cerdo', 'caballo', 'conejo', 'llama', 'cabra', 'loro', 'aldeano']],
  ['criaSalvajes', ['lobo', 'osoPolar', 'murcielago', 'tortuga', 'perro', 'gato', 'zorro', 'panda']],
  ['criaMar', ['pez', 'calamar', 'delfin', 'guardian']],
  ['criaMonstruos', ['zombi', 'ojon', 'arquero', 'bombin', 'arana', 'sombra', 'bruja', 'gelatina3', 'ahogado']],
  ['criaAyudantes', ['golemHierro', 'golemNieve']],
  ['criaDragones', ['dragon0', 'dragon1', 'dragon2', 'dragon3', 'dragon4']],
  ['criaJefes', ['ojonRey', 'dragonJefe', 'tricefalo']],
];
const COLOR_MAR = { pez: '#ff9a2e', calamar: '#3a4a7a', delfin: '#8aa8c8', guardian: '#5a9a8a' };
function colorCria(t) { return t === 'ojon' ? '#6b3fa0' : COLOR_MAR[t] || (TIPOS[t] && TIPOS[t].color) || '#888'; }
window.criaturasHTML = () => {
  const mods = Object.keys(TIPOS).filter(t => TIPOS[t].mod);
  const gr = GRUPOS_CRIA.concat(mods.length ? [['criaMods', mods]] : []);
  return `<h4>${TR('criaTocar')}</h4>` + gr.map(([k, l]) => `<h4>${TR(k)}</h4><div class="grilla criaG">${l.filter(t => t === 'ojon' || COLOR_MAR[t] || TIPOS[t]).map(t => `<div class="criaC" data-cria="${t}"><i style="background:${colorCria(t)}"></i><span>${esc(nomCria(t))}</span></div>`).join('')}</div>`).join('');
};
{ const st = document.createElement('style'); st.textContent = `.criaG { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 6px; } .criaC { display: flex; align-items: center; gap: 6px; background: #fff; border: 2px solid #d5dbf3; border-radius: 10px; padding: 5px 7px; cursor: pointer; font-weight: 800; font-size: 12px; color: #1b2a6b; line-height: 1.1; } .criaC i { width: 18px; height: 18px; border-radius: 5px; border: 2px solid #0d153d; flex: none; }`; document.head.appendChild(st); }
let criaElegida = null;   // para el generador de monstruos
window.elegirCria = t => {
  if (typeof window.criaParaJaula === 'function' && window.criaParaJaula(t)) return;
  cerrarPanel(); ponerCria(t);
};
function ponerCria(t, xx, yy, zz) {
  const ang = J.yaw + Math.PI, x = xx ?? J.x + Math.sin(ang) * 3, z = zz ?? J.z + Math.cos(ang) * 3; let y = yy ?? sueloCerca(x, z);
  if (yy == null && y > J.y + 3) y = Math.floor(J.y);
  if (COLOR_MAR[t]) { if (get(Math.floor(x), Math.floor(y - 1), Math.floor(z)) !== B.AGUA && get(Math.floor(x), Math.floor(y), Math.floor(z)) !== B.AGUA) { let yw = Math.floor(J.y); while (yw > 0 && get(Math.floor(x), yw, Math.floor(z)) !== B.AGUA) yw--; if (yw <= 0) return aviso(TR('ponEnAgua'), 1400); y = yw; }
    if (window.__mar) { const n = t === 'pez' ? 4 : 1; for (let k = 0; k < n; k++) __mar.crearNadador(t, x + azar(-.5, .5), y - .5, z + azar(-.5, .5), Math.floor(Math.random() * 6)); } return; }
  if (t === 'ojon') { crearMonstruo(x, y, z); return; }
  if (t === 'dragonJefe' || t === 'tricefalo') { llamarJefe(t); return; }
  if (/^dragon\d$/.test(t) && typeof nuevoDragon === 'function') { nuevoDragon(+t.slice(6), x, y, z); return; }
  if (['perro', 'gato', 'zorro', 'panda'].includes(t) && typeof nuevaMascota === 'function') { nuevaMascota(t, x, y, z); return; }
  if (!TIPOS[t]) return; const g = crearAnimal(t, x, y + (t === 'murcielago' ? 1.5 : 0), z); g.userData.huir = 0; if (TIPOS[t].ayudante) { ex(g).cx = x; ex(g).cz = z; }
  if (t === 'ojonRey') ex(g).f = 1;
  polvo(x, y + .5, z, colorCria(t), 10); sucio = true;
}
window.__cria = { ponerCria, disparar, proys, llamarJefe, nomCria, GRUPOS_CRIA };

// ═════════ LOGROS NUEVOS ═════════
{ const c = k => (typeof lgCuenta === 'function' ? lgCuenta(k) : 0) > 0, mata = t => () => c('mata_' + t);
  const nuevos = [
    ['golem', B.B_HIERRO, () => c('golem'), 'Guardián de la aldea', 'Arma un gólem con bloques y una calabaza', 'Village Guardian', 'Build a golem with blocks and a pumpkin', 'Guardião da aldeia', 'Monte um golem com blocos e uma abóbora'],
    ['loboAmigo', I.HUESO, () => c('lobo'), 'Mejor amigo', 'Domestica un lobo con un hueso', 'Best Friend', 'Tame a wolf with a bone', 'Melhor amigo', 'Domestique um lobo com um osso'],
    ['arquero', I.FLECHA, mata('arquero'), 'Duelo de flechas', 'Vence a un esqueleto arquero', 'Arrow Duel', 'Defeat a skeleton archer', 'Duelo de flechas', 'Derrote um esqueleto arqueiro'],
    ['bombin', I.CARBON, mata('bombin'), 'Desactivado', 'Vence a un bombín antes de que explote', 'Defused', 'Defeat a boomling before it explodes', 'Desativado', 'Derrote um bombinho antes que exploda'],
    ['sombra', I.CRISTAL, mata('sombra'), 'Cazasombras', 'Vence a una sombra', 'Shade Hunter', 'Defeat a shade', 'Caça-sombras', 'Derrote uma sombra'],
    ['dragonJefe', I.CUERNO, mata('dragonJefe'), 'Domador de tormentas', 'Vence al Dragón de Tormenta', 'Storm Tamer', 'Defeat the Storm Dragon', 'Domador de tempestades', 'Derrote o Dragão da Tempestade'],
    ['tricefalo', I.CETRO, mata('tricefalo'), 'Sin corona', 'Vence al Rey de Tres Cabezas', 'Uncrowned', 'Defeat the Three-Headed King', 'Sem coroa', 'Derrote o Rei de Três Cabeças'],
  ];
  if (typeof LOGROS !== 'undefined') LOGROS.splice(LOGROS.findIndex(l => l[0] === 'todos'), 0, ...nuevos);
  const sm = k => { if (typeof lgSumar === 'function') lgSumar(k); };
  { const m0 = matarAnimal; matarAnimal = function (a) { const t = a.userData.animal; const r = m0(a); if (['arquero', 'bombin', 'sombra', 'dragonJefe', 'tricefalo'].includes(t)) sm('mata_' + t); return r; }; }
  window.__logroCria = sm; }
// las crías del Ojón Rey solo aparecen en el Abismo
if (TIPOS.ojonHijo) TIPOS.ojonHijo.noNatural = true;
