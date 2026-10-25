'use strict';
// ═════════ TUTORIAL: se aprende jugando, en una isla armada para eso ═════════
// Parte 1 "Sobrevivir" (supervivencia) y Parte 2 "Construir" (creativo). Cada paso se cumple haciéndolo.
// El mundo del tutorial es aparte: se borra al salir y no toca los mundos del jugador.

const TT = {
  es: { tutorial: 'Tutorial', tutoElegir: '¿Qué quieres aprender?', tutoSobrevivir: 'Sobrevivir<small>caminar, sacar madera, fabricar, comer, dormir</small>', tutoConstruir: 'Construir<small>volar, torres, techos, losas y herramientas</small>', tutoAmbas: 'Las dos partes',
    tutoSaltar: 'Saltar', tutoBien: '¡BIEN!', tutoPaso: 'Paso {a} de {b}', tutoFin1: '¡LISTO! YA SABES SOBREVIVIR', tutoFin2: '¡YA ERES CONSTRUCTOR!', tutoFinSub: 'Ahora crea tu propio mundo y juega a tu manera.', tutoCrear: 'Crear mi primer mundo', tutoInicio: 'Volver al inicio', tutoSigue: 'Seguir con Construir',
    s_caminar: 'Mueve el joystick (abajo a la izquierda) y camina hasta la flecha amarilla.',
    s_mirar: 'Desliza el dedo por la pantalla para mirar alrededor.',
    s_saltar: 'Toca el botón de saltar (abajo a la derecha) y sube al escalón de la flecha.',
    s_troncos: 'Mantén el dedo apretado sobre el tronco del árbol hasta romperlo. Saca 3 troncos.',
    s_fabricar: 'Toca la bolsa (arriba), entra a Fabricar y haz: tablas, palos y un pico de madera.',
    s_hueco: 'La casa tiene un hueco en la pared. Elige las tablas en la barra y toca el hueco para taparlo.',
    s_piedra: 'Con el pico en la bolsa rompes la piedra. Ve a la mina y saca 3 piedras.',
    s_cofre: 'Toca el cofre que está al lado de la casa y saca todo lo que tiene.',
    s_comer: 'Te dio hambre. Elige el pan en la barra y toca la pantalla para comer.',
    s_antorcha: 'Se hace de noche. Elige la antorcha y ponla dentro de la casa para tener luz.',
    s_cama: 'Pon la cama dentro de la casa y tócala para dormir hasta que sea de día.',
    c_volar: 'En creativo puedes volar: toca el botón de las alas (abajo a la derecha).',
    c_subir: 'Mantén apretado el botón de arriba para subir bien alto.',
    c_bajar: 'Ahora mantén apretado el botón de abajo para bajar.',
    c_aterrizar: 'Toca otra vez las alas para dejar de volar y vuelve al piso.',
    c_torre: 'Construye hacia arriba: mira hacia abajo, salta y toca el piso debajo tuyo. Sube 3 bloques así.',
    c_pared: 'Baja y levanta una pared arriba de los bloques amarillos del piso (4 de largo, 2 de alto).',
    c_escalon: 'Para techos: elige el escalón y ponlo arriba de la pared. Queda subiendo hacia donde miras. Pon 3.',
    c_invertido: 'Si tocas la mitad de arriba del costado de un bloque, el escalón queda dado vuelta. Pon uno así.',
    c_losas: 'Elige la losa (medio bloque) y pon una arriba de otra igual: se juntan en un bloque entero.',
    c_puerta: 'Pon una puerta y un bloque de vidrio para la ventana.',
    c_rellenar: 'Herramientas: toca Rellenar (arriba a la izquierda), toca una esquina y después la otra. ¡Se llena todo de una vez!',
    c_copiar: 'Toca Copiar y marca dos esquinas de algo que construiste. Después toca Pegar y toca donde quieras ponerlo.',
    c_espejo: 'Toca Espejo y pon un bloque: aparece otro igual del otro lado, como en un espejo.',
    c_deshacer: 'Si te equivocas, toca Deshacer y se borra lo último que hiciste.',
    c_planos: 'Abre la bolsa, entra a Planos y elige uno. Mueve la guía transparente y toca Colocar.',
    tutoTablas: 'tablas', tutoPalos: 'palos', tutoPico: 'pico' },
  en: { tutorial: 'Tutorial', tutoElegir: 'What do you want to learn?', tutoSobrevivir: 'Survive<small>walk, get wood, craft, eat, sleep</small>', tutoConstruir: 'Build<small>fly, towers, roofs, slabs and tools</small>', tutoAmbas: 'Both parts',
    tutoSaltar: 'Skip', tutoBien: 'NICE!', tutoPaso: 'Step {a} of {b}', tutoFin1: 'DONE! YOU KNOW HOW TO SURVIVE', tutoFin2: 'YOU ARE A BUILDER NOW!', tutoFinSub: 'Now create your own world and play your way.', tutoCrear: 'Create my first world', tutoInicio: 'Back to home', tutoSigue: 'Continue with Build',
    s_caminar: 'Move the joystick (bottom left) and walk to the yellow arrow.',
    s_mirar: 'Swipe your finger on the screen to look around.',
    s_saltar: 'Tap the jump button (bottom right) and climb onto the step with the arrow.',
    s_troncos: 'Hold your finger on the tree trunk until it breaks. Get 3 logs.',
    s_fabricar: 'Tap the bag (top), go to Craft and make: planks, sticks and a wooden pickaxe.',
    s_hueco: 'The house has a hole in the wall. Pick the planks in the hotbar and tap the hole to fill it.',
    s_piedra: 'With the pickaxe in your bag you can break stone. Go to the mine and get 3 stones.',
    s_cofre: 'Tap the chest next to the house and take everything out.',
    s_comer: 'You are hungry. Pick the bread in the hotbar and tap the screen to eat.',
    s_antorcha: 'Night is coming. Pick the torch and put it inside the house for light.',
    s_cama: 'Put the bed inside the house and tap it to sleep until morning.',
    c_volar: 'In creative you can fly: tap the wings button (bottom right).',
    c_subir: 'Hold the up button to go up high.',
    c_bajar: 'Now hold the down button to go down.',
    c_aterrizar: 'Tap the wings again to stop flying and get back to the ground.',
    c_torre: 'Build upward: look down, jump and tap the ground under you. Go up 3 blocks like that.',
    c_pared: 'Go down and build a wall on top of the yellow blocks on the ground (4 long, 2 high).',
    c_escalon: 'For roofs: pick the stairs and put them on top of the wall. They go up where you look. Place 3.',
    c_invertido: 'If you tap the top half of the side of a block, the stair goes upside down. Place one like that.',
    c_losas: 'Pick the slab (half block) and put one on top of another: they join into a full block.',
    c_puerta: 'Place a door and a glass block for the window.',
    c_rellenar: 'Tools: tap Fill (top left), tap one corner and then the other. It all fills at once!',
    c_copiar: 'Tap Copy and mark two corners of something you built. Then tap Paste and tap where you want it.',
    c_espejo: 'Tap Mirror and place a block: another one appears on the other side, like a mirror.',
    c_deshacer: 'If you make a mistake, tap Undo and the last thing you did is erased.',
    c_planos: 'Open the bag, go to Blueprints and pick one. Move the see-through guide and tap Place.',
    tutoTablas: 'planks', tutoPalos: 'sticks', tutoPico: 'pickaxe' },
  pt: { tutorial: 'Tutorial', tutoElegir: 'O que você quer aprender?', tutoSobrevivir: 'Sobreviver<small>andar, pegar madeira, fabricar, comer, dormir</small>', tutoConstruir: 'Construir<small>voar, torres, telhados, lajes e ferramentas</small>', tutoAmbas: 'As duas partes',
    tutoSaltar: 'Pular', tutoBien: 'MUITO BEM!', tutoPaso: 'Passo {a} de {b}', tutoFin1: 'PRONTO! VOCÊ SABE SOBREVIVER', tutoFin2: 'AGORA VOCÊ É CONSTRUTOR!', tutoFinSub: 'Agora crie seu próprio mundo e jogue do seu jeito.', tutoCrear: 'Criar meu primeiro mundo', tutoInicio: 'Voltar ao início', tutoSigue: 'Continuar com Construir',
    s_caminar: 'Mova o joystick (embaixo à esquerda) e ande até a seta amarela.',
    s_mirar: 'Deslize o dedo na tela para olhar em volta.',
    s_saltar: 'Toque no botão de pular (embaixo à direita) e suba no degrau da seta.',
    s_troncos: 'Segure o dedo no tronco da árvore até quebrar. Pegue 3 troncos.',
    s_fabricar: 'Toque na bolsa (em cima), entre em Fabricar e faça: tábuas, gravetos e uma picareta de madeira.',
    s_hueco: 'A casa tem um buraco na parede. Escolha as tábuas na barra e toque no buraco para fechar.',
    s_piedra: 'Com a picareta na bolsa você quebra pedra. Vá à mina e pegue 3 pedras.',
    s_cofre: 'Toque no baú ao lado da casa e tire tudo.',
    s_comer: 'Você está com fome. Escolha o pão na barra e toque na tela para comer.',
    s_antorcha: 'Está anoitecendo. Escolha a tocha e coloque dentro da casa para ter luz.',
    s_cama: 'Coloque a cama dentro da casa e toque nela para dormir até de manhã.',
    c_volar: 'No criativo você pode voar: toque no botão das asas (embaixo à direita).',
    c_subir: 'Segure o botão de cima para subir bem alto.',
    c_bajar: 'Agora segure o botão de baixo para descer.',
    c_aterrizar: 'Toque de novo nas asas para parar de voar e volte ao chão.',
    c_torre: 'Construa para cima: olhe para baixo, pule e toque no chão embaixo de você. Suba 3 blocos assim.',
    c_pared: 'Desça e levante uma parede em cima dos blocos amarelos do chão (4 de comprimento, 2 de altura).',
    c_escalon: 'Para telhados: escolha a escada e coloque em cima da parede. Ela sobe para onde você olha. Coloque 3.',
    c_invertido: 'Se tocar na metade de cima do lado de um bloco, a escada fica de cabeça para baixo. Coloque uma assim.',
    c_losas: 'Escolha a laje (meio bloco) e coloque uma em cima de outra igual: viram um bloco inteiro.',
    c_puerta: 'Coloque uma porta e um bloco de vidro para a janela.',
    c_rellenar: 'Ferramentas: toque em Preencher (em cima à esquerda), toque num canto e depois no outro. Tudo se preenche de uma vez!',
    c_copiar: 'Toque em Copiar e marque dois cantos de algo que você construiu. Depois toque em Colar e toque onde quiser.',
    c_espejo: 'Toque em Espelho e coloque um bloco: aparece outro igual do outro lado.',
    c_deshacer: 'Se errar, toque em Desfazer e a última coisa que você fez é apagada.',
    c_planos: 'Abra a bolsa, entre em Projetos e escolha um. Mova a guia transparente e toque em Colocar.',
    tutoTablas: 'tábuas', tutoPalos: 'gravetos', tutoPico: 'picareta' },
};
for (const l in TT) Object.assign(TX[l], TT[l]);

{ const st = document.createElement('style'); st.textContent = `
  #tutoCaja { position: fixed; top: max(6px, env(safe-area-inset-top)); left: max(8px, env(safe-area-inset-left)); z-index: 6; zoom: var(--u); width: min(46vw, 430px); background: rgba(13,21,61,.82); border: 3px solid #ffe14a; border-radius: 14px; padding: 7px 10px 8px; color: #fff; font-family: 'Baloo 2', sans-serif; box-shadow: 0 4px 0 rgba(0,0,0,.35); pointer-events: auto; }
  #tutoCaja[hidden] { display: none; }
  #tutoCaja .cab { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 800; color: #ffe14a; letter-spacing: .5px; }
  #tutoCaja .cab .barraT { flex: 1; height: 6px; background: rgba(255,255,255,.18); border-radius: 4px; overflow: hidden; } #tutoCaja .cab .barraT i { display: block; height: 100%; background: #6cbb40; transition: width .4s; }
  #tutoCaja .cab .salta { background: rgba(255,255,255,.15); border: 2px solid rgba(255,255,255,.6); border-radius: 10px; padding: 0 9px; color: #fff; font-size: 12px; cursor: pointer; }
  #tutoCaja .txt { font-size: 15px; font-weight: 700; line-height: 1.25; margin-top: 4px; }
  #tutoCaja .subs { display: flex; gap: 10px; margin-top: 4px; font-size: 13px; font-weight: 800; } #tutoCaja .subs span { opacity: .55; } #tutoCaja .subs span.ok { opacity: 1; color: #8fe36a; }
  #tutoCaja.bien { border-color: #6cbb40; } #tutoCaja.bien .txt { color: #8fe36a; }
  .tutoBrilla { animation: tutoBrilla 1s ease-in-out infinite; position: relative; z-index: 7 !important; }
  @keyframes tutoBrilla { 0%, 100% { box-shadow: 0 0 0 3px #ffe14a, 0 0 14px 4px rgba(255,225,74,.8); } 50% { box-shadow: 0 0 0 5px #ffe14a, 0 0 26px 10px rgba(255,225,74,.35); } }
  #tutoJoy, #tutoDesliza { position: fixed; z-index: 4; pointer-events: none; zoom: var(--u); }
  #tutoJoy { left: max(34px, env(safe-area-inset-left)); bottom: 34px; width: 120px; height: 120px; }
  #tutoDesliza { left: 50%; top: 52%; width: 180px; height: 80px; margin-left: -90px; }
  #tutoJoy[hidden], #tutoDesliza[hidden] { display: none; }
  #tutoJoy .mano { animation: tutoJoy 1.6s ease-in-out infinite; transform-origin: 60px 60px; } @keyframes tutoJoy { 0%, 100% { transform: translate(0, 0); } 30% { transform: translate(0, -26px); } 60% { transform: translate(22px, -10px); } }
  #tutoDesliza .mano { animation: tutoDes 1.8s ease-in-out infinite; } @keyframes tutoDes { 0%, 100% { transform: translateX(-50px); } 50% { transform: translateX(50px); } }
  #tutoElegir .btn small, #tutoFin .btn small { display: block; font-size: 12px; font-weight: 600; opacity: .9; }
  #tutoFin .titulo { color: #ffe14a; font-size: clamp(24px, 5vw, 40px); text-align: center; } #tutoFin .texto { margin-bottom: 8px; }
  body.tuto #mision { display: none !important; }
  body.tuto2 #tutoCaja { top: calc(max(6px, env(safe-area-inset-top)) + 58px); }
`; document.head.appendChild(st); }

const SVG_MANO = '<g class="mano"><path d="M52 96 C40 86 34 74 36 66 c1-5 7-6 10-2 l6 8 V36 c0-5 8-5 8 0 v22 c0-5 8-5 8 0 v4 c0-5 8-5 8 0 v4 c0-5 8-5 8 0 v18 c0 10-4 16-10 22z" fill="#fff" stroke="#0d153d" stroke-width="4" stroke-linejoin="round"/></g>';
{ const j = document.createElement('div'); j.id = 'tutoJoy'; j.hidden = true; j.innerHTML = `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="44" fill="rgba(255,255,255,.18)" stroke="#ffe14a" stroke-width="4"/><circle cx="60" cy="60" r="18" fill="rgba(255,255,255,.5)"/>${SVG_MANO}</svg>`; document.body.appendChild(j);
  const d = document.createElement('div'); d.id = 'tutoDesliza'; d.hidden = true; d.innerHTML = `<svg viewBox="-90 -10 180 110"><path d="M-80 20 l16 -12 v8 h128 v-8 l16 12 l-16 12 v-8 h-128 v8z" fill="#ffe14a" stroke="#0d153d" stroke-width="3"/><g transform="translate(-60,-12) scale(.9)">${SVG_MANO}</g></svg>`; document.body.appendChild(d);
  const c = document.createElement('div'); c.id = 'tutoCaja'; c.hidden = true; document.body.appendChild(c); }
cap('tutoElegir', `<div class="titulo" style="font-size:clamp(24px,5vw,40px)" data-i="tutoElegir"></div><div class="btn" id="tutoB1" data-ih="tutoSobrevivir"></div><div class="btn" id="tutoB2" data-ih="tutoConstruir"></div><div class="btn" id="tutoB3" data-i="tutoAmbas" style="background:linear-gradient(#ffd23a,#f5a62a);color:#1b2a6b;text-shadow:none"></div><div class="btn" id="tutoVolver" data-i="volver"></div>`);
cap('tutoFin', `<div class="titulo" id="tutoFinTit"></div><div class="texto" data-i="tutoFinSub"></div><div class="btn" id="tutoFinSigue" data-i="tutoSigue" style="background:linear-gradient(#ffd23a,#f5a62a);color:#1b2a6b;text-shadow:none"></div><div class="btn" id="tutoFinCrear" data-i="tutoCrear"></div><div class="btn" id="tutoFinInicio" data-i="tutoInicio"></div>`);

// ═════════ LA ISLA ═════════
const TU = { on: false, parte: 0, ambas: false, k: 0, pasos: [], ini: {}, cuenta: {}, flags: {}, bienT: 0, flecha: null, desde: null, yawAcum: 0, yawAnt: 0 };
const TY = 30;   // altura del pasto de la isla
const tc = () => ({ cx: SX / 2, cz: SZ / 2 });
function generarTutorial(S) {
  const put = mundoVacio(S), { cx, cz } = tc();
  // isla redonda: piedra, tierra y pasto
  for (let a = -17; a <= 17; a++) for (let b = -17; b <= 17; b++) { const r = Math.hypot(a, b); if (r > 17.3) continue;
    const prof = 3 + Math.floor((17.3 - r) / 3); for (let k = 0; k < prof; k++) put(cx + a, TY - k, cz + b, k === 0 ? B.PASTO : k < 3 ? B.TIERRA : B.PIEDRA); }
  // escalón para saltar
  for (let a = -1; a <= 1; a++) for (let b = -2; b <= -1; b++) put(cx + a, TY + 1, cz + b, B.PASTO);
  // árbol
  arbolEn(put, cx + 6, TY, cz - 3, 4);
  // casa de madera (5x5, 3 de alto) con puerta abierta adelante y un hueco a la izquierda
  const hx = cx - 8, hz = cz - 8;
  for (let a = 0; a < 5; a++) for (let b = 0; b < 5; b++) { put(hx + a, TY, hz + b, B.MADERA);
    for (let h = 1; h <= 3; h++) { const borde = a === 0 || a === 4 || b === 0 || b === 4; if (!borde) continue; const esq = (a === 0 || a === 4) && (b === 0 || b === 4);
      put(hx + a, TY + h, hz + b, esq ? B.TRONCO : h === 2 && (a === 2 || b === 2) ? B.VIDRIO : B.MADERA); }
    put(hx + a, TY + 4, hz + b, B.LADRILLO); }
  put(hx + 2, TY + 1, hz + 4, B.AIRE); put(hx + 2, TY + 2, hz + 4, B.AIRE);   // puerta
  put(hx, TY + 1, hz + 1, B.AIRE); put(hx, TY + 2, hz + 1, B.AIRE);           // hueco para tapar
  // cofre al lado de la casa
  put(hx + 5, TY + 1, hz + 5, B.COFRE);
  // mina: un montículo de piedra con carbón
  for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let h = 1; h <= 2; h++) put(cx + 7 + a, TY + h, cz - 10 + b, (a + b + h) % 3 === 0 ? B.CARBON_M : B.PIEDRA);
  put(cx + 7, TY + 3, cz - 10, B.PIEDRA);
  // zona de construir: bloques amarillos en el piso donde va la pared
  for (let a = 0; a < 4; a++) put(cx + 4 + a, TY, cz + 8, B.TELA + 3);
  // flores y pasto
  for (const [a, b, t] of [[-3, 4, B.FLOR_R], [3, 3, B.FLOR_A], [-10, 3, B.PASTO_ALTO], [10, 2, B.PASTO_ALTO], [-5, 11, B.FLOR_A], [9, -6, B.FLOR_R], [-12, -2, B.PASTO_ALTO]]) put(cx + a, TY + 1, cz + b, t);
  spawn = { x: cx + .5, y: TY + 1, z: cz + 9.5, yaw: 0 };
  TU.casa = { x: hx, z: hz }; TU.cofre = idx(hx + 5, TY + 1, hz + 5);
}
{ const p0 = prepararMundo; prepararMundo = function (S, ej) {
    if (window.mundoTipo !== 'tutorial') return p0(S, ej);
    generarTutorial(S); diffs = new Map(); spawnPropio = false;
  }; }

// ═════════ PASOS ═════════
const lugar = (a, h, b) => { const { cx, cz } = tc(); return { x: cx + a + .5, y: TY + h, z: cz + b + .5 }; };
const cerca = (p, d = 1.6) => Math.hypot(J.x - p.x, J.z - p.z) < d && Math.abs(J.y - p.y) < 1.6;
const lleno = (x, y, z) => { const t = get(x, y, z); return t && DEF[t] && DEF[t].solido; };
function enCasa(t) { const { x, z } = TU.casa; let n = 0; for (let a = 1; a < 4; a++) for (let b = 1; b < 4; b++) for (let h = 1; h <= 2; h++) if (get(x + a, TY + h, z + b) === t) n++; return n; }

const PASOS = {
  1: [
    { t: 's_caminar', flecha: () => lugar(0, 1, 5), guia: 'joy', hecho: () => cerca(lugar(0, 1, 5)) },
    { t: 's_mirar', guia: 'desliza', ini: () => { TU.yawAcum = 0; TU.yawAnt = J.yaw; }, hecho: () => TU.yawAcum > 2.2 },
    { t: 's_saltar', flecha: () => lugar(0, 2, -1), brilla: '#bSaltar', hecho: () => J.y > TY + 1.9 && cerca(lugar(0, 2, -1), 2.4) },
    { t: 's_troncos', flecha: () => lugar(6, 5, -3), hecho: () => (inv[B.TRONCO] || 0) >= 3 },
    { t: 's_fabricar', brilla: '#bBolsa', subs: () => [['tutoTablas', (inv[B.MADERA] || 0) > 0 || (inv[I.PALO] || 0) > 0 || (inv[I.PICO1] || 0) > 0], ['tutoPalos', (inv[I.PALO] || 0) > 0 || (inv[I.PICO1] || 0) > 0], ['tutoPico', (inv[I.PICO1] || 0) > 0]],
      ini: () => { if ((inv[B.TRONCO] || 0) < 3) darItem(B.TRONCO, 3 - (inv[B.TRONCO] || 0)); }, hecho: () => (inv[I.PICO1] || 0) > 0 },
    { t: 's_hueco', flecha: () => ({ x: TU.casa.x + .5, y: TY + 3, z: TU.casa.z + 1.5 }), ini: () => { if ((inv[B.MADERA] || 0) < 2) darItem(B.MADERA, 4); ponerEnBarra(B.MADERA); },
      hecho: () => lleno(TU.casa.x, TY + 1, TU.casa.z + 1) && lleno(TU.casa.x, TY + 2, TU.casa.z + 1) },
    { t: 's_piedra', flecha: () => lugar(7, 4, -10), ini: () => { TU.ini.piedra = (stats.rotos[B.PIEDRA] || 0) + (stats.rotos[B.CARBON_M] || 0); }, hecho: () => (stats.rotos[B.PIEDRA] || 0) + (stats.rotos[B.CARBON_M] || 0) - TU.ini.piedra >= 3 },
    { t: 's_cofre', flecha: () => { const [x, y, z] = xyz(TU.cofre); return { x: x + .5, y: y + 1, z: z + .5 }; }, ini: () => { cofres[TU.cofre] = { [B.ANTORCHA]: 4, [I.PAN]: 3, [B.CAMA]: 1 }; diffs.set(TU.cofre, B.COFRE); },
      hecho: () => (inv[B.ANTORCHA] || 0) > 0 && (inv[I.PAN] || 0) > 0 && (inv[B.CAMA] || 0) > 0 && cofreAbierto === null },
    { t: 's_comer', ini: () => { hambre = 11; hambrePintado = -1; pintarHambre(); if (!(inv[I.PAN] > 0)) darItem(I.PAN, 2); ponerEnBarra(I.PAN); TU.ini.comido = stats.comido || 0; }, hecho: () => (stats.comido || 0) > TU.ini.comido },
    { t: 's_antorcha', noche: true, flecha: () => ({ x: TU.casa.x + 2.5, y: TY + 2, z: TU.casa.z + 2.5 }), ini: () => { tiempo = 214; if (!(inv[B.ANTORCHA] > 0)) darItem(B.ANTORCHA, 2); ponerEnBarra(B.ANTORCHA); }, hecho: () => enCasa(B.ANTORCHA) > 0 || TU.cuenta[B.ANTORCHA] > 0 },
    { t: 's_cama', noche: true, flecha: () => ({ x: TU.casa.x + 2.5, y: TY + 2, z: TU.casa.z + 2.5 }), ini: () => { tiempo = Math.max(tiempo, 214); stats.durmio = 0; if (!(inv[B.CAMA] > 0)) darItem(B.CAMA, 1); ponerEnBarra(B.CAMA); }, hecho: () => stats.durmio === 1 },
  ],
  2: [
    { t: 'c_volar', brilla: '#bVolar', hecho: () => volando },
    { t: 'c_subir', brilla: '#bSaltar', ini: () => { TU.ini.y = J.y; TU.ini.max = J.y; }, hecho: () => { TU.ini.max = Math.max(TU.ini.max, J.y); return J.y > TU.ini.y + 6; } },
    { t: 'c_bajar', brilla: '#bBajar', ini: () => { TU.ini.max = J.y; }, hecho: () => J.y < TU.ini.max - 3 },
    { t: 'c_aterrizar', brilla: '#bVolar', hecho: () => !volando && J.y < TY + 3.2 },
    { t: 'c_torre', ini: () => { ponerEnBarra(B.MADERA); TU.ini.suelo = sueloBajo(); }, hecho: () => !volando && J.y >= TU.ini.suelo + 3 - .05 && Math.abs(J.vy) < .5 },
    { t: 'c_pared', flecha: () => lugar(5.5 - .5, 3, 8), ini: () => ponerEnBarra(B.LADRILLO), hecho: () => { const { cx, cz } = tc(); let n = 0; for (let a = 0; a < 4; a++) for (let h = 1; h <= 2; h++) if (lleno(cx + 4 + a, TY + h, cz + 8)) n++; return n >= 7; } },
    { t: 'c_escalon', ini: () => { ponerEnBarra(B.ESCALON); TU.cuenta.esc = 0; }, hecho: () => TU.cuenta.esc >= 3 },
    { t: 'c_invertido', ini: () => { ponerEnBarra(B.ESCALON); TU.cuenta.inv = 0; }, hecho: () => TU.cuenta.inv >= 1 },
    { t: 'c_losas', ini: () => { ponerEnBarra(B.LOSA); TU.flags.losa = false; }, hecho: () => TU.flags.losa },
    { t: 'c_puerta', ini: () => { ponerEnBarra(B.VIDRIO); ponerEnBarra(B.PUERTA); TU.cuenta[B.PUERTA] = 0; TU.cuenta[B.VIDRIO] = 0; }, hecho: () => TU.cuenta[B.PUERTA] > 0 && TU.cuenta[B.VIDRIO] > 0 },
    { t: 'c_rellenar', brilla: '[data-h="rellenar"]', ini: () => { ponerEnBarra(B.PIEDRA); TU.flags.rellenar = false; }, hecho: () => TU.flags.rellenar },
    { t: 'c_copiar', brilla: () => clip ? '[data-h="pegar"]' : '[data-h="copiar"]', ini: () => { TU.flags.pegar = false; }, hecho: () => TU.flags.pegar },
    { t: 'c_espejo', brilla: '[data-h="espejo"]', ini: () => { TU.flags.espejo = false; }, hecho: () => TU.flags.espejo },
    { t: 'c_deshacer', brilla: '[data-h="deshacer"]', ini: () => { TU.flags.deshacer = false; if (espejoEje) { espejoEje = null; pintarHerr(); } }, hecho: () => TU.flags.deshacer },
    { t: 'c_planos', brilla: () => plano ? '#gColocar' : '#bBolsa', ini: () => { if (herr.modo) quitarHerr(); }, hecho: () => !!(plano && plano.fijo) },
  ],
};
function sueloBajo() { let y = Math.floor(J.y); while (y > 0 && !lleno(Math.floor(J.x), y - 1, Math.floor(J.z))) y--; return y; }
function ponerEnBarra(id) { let k = barra.indexOf(id); if (k < 0) { k = barra.findIndex(x => !x); if (k < 0) k = 8; barra[k] = id; } sel = k; if (!creativo() && !(inv[id] > 0)) darItem(id, 1); pintarBarra(); }

// lo que hace el jugador, para saber si cumplió el paso
{ const p0 = ponerBloque; ponerBloque = function (x, y, z, t) {
    const viejo = dentro(x, y, z) ? mundo[idx(x, y, z)] : 0, r = p0(x, y, z, t);
    if (TU.on && grupo && t && t !== viejo) { TU.cuenta[t] = (TU.cuenta[t] || 0) + 1; if (esEscalon(t)) TU.cuenta.esc = (TU.cuenta.esc || 0) + 1; if (t >= B.ESC_INV && t < B.ESC_INV + 16) TU.cuenta.inv = (TU.cuenta.inv || 0) + 1;
      if (esLosa(viejo) && t === DEF[viejo].base) TU.flags.losa = true; }
    return r; }; }
{ const p0 = ponerMuchos; ponerMuchos = function (L) { if (TU.on && herr.modo === 'rellenar') TU.flags.rellenar = true; if (TU.on && herr.modo === 'pegar') TU.flags.pegar = true; return p0(L); }; }
{ const e0 = espejo; espejo = function (x, y, z, t) { if (TU.on && espejoEje && creativo()) TU.flags.espejo = true; return e0(x, y, z, t); }; }
{ const d0 = hacerDeshacer; hacerDeshacer = function () { if (TU.on) TU.flags.deshacer = true; return d0(); }; }
// en el tutorial no hay misiones ni animales que aparezcan solos
{ const r0 = revisarMision; revisarMision = function () { if (TU.on) return; return r0(); }; }
{ const p0 = poblarAnimales; poblarAnimales = function (n, l) { if (TU.on) return; return p0(n, l); }; }

// ═════════ EMPEZAR, AVANZAR, TERMINAR ═════════
function abrirTutoElegir(desde) {
  TU.desde = desde || null; for (const c of ['introFin', 'inicio', 'ajustes', 'pausa']) if ($(c)) $(c).hidden = true;
  aplicarIdioma(); abrir('tutoElegir');
}
window.abrirTutorial = () => abrirTutoElegir('inicio');
$('tutoB1').onclick = () => { cerrar('tutoElegir'); TU.ambas = false; empezarParte(1); };
$('tutoB2').onclick = () => { cerrar('tutoElegir'); TU.ambas = false; empezarParte(2); };
$('tutoB3').onclick = () => { cerrar('tutoElegir'); TU.ambas = true; empezarParte(1); };
$('tutoVolver').onclick = () => { cerrar('tutoElegir'); $('inicio').hidden = false; };

function empezarParte(n) {
  if (jugando) salirAlMenu();
  borrarMundoTutorial();
  const lista = leerLista(); lista.push({ id: 'tutorial', nombre: TR('tutorial'), num: 0, modo: n === 1 ? 'supervivencia' : 'creativo', tipo: 'tutorial', tam: 96, semilla: 777, creado: Date.now(), fecha: 0, dia: 1, bloques: 0 });
  try { localStorage.setItem('bloquesMundos', JSON.stringify(lista)); } catch (e) {}
  TU.parte = n; TU.k = -1; TU.pasos = PASOS[n]; TU.cuenta = {}; TU.flags = {}; TU.ini = {};
  for (const c of ['inicio', 'mundos', 'nuevo', 'tutoFin']) $(c).hidden = true;
  pantallaCompleta(); entrarMundo('tutorial');
  TU.on = true; document.body.classList.add('tuto'); document.body.classList.toggle('tuto2', n === 2);
  REG.monstruos = 0; REG.hambre = 0; tiempo = 20; vida = 20; hambre = 20; pintarVida();
  if (n === 2) { barra = [B.MADERA, B.LADRILLO, B.ESCALON, B.LOSA, B.PUERTA, B.VIDRIO, B.PIEDRA, B.ANTORCHA, B.TELA + 3]; sel = 0; pintarBarra(); }
  $('tutoCaja').hidden = false; siguientePaso();
}
function siguientePaso() {
  TU.k++; quitarBrillos();
  if (TU.k >= TU.pasos.length) return terminarParte();
  const p = TU.pasos[TU.k]; TU.bienT = 0; if (p.ini) p.ini();
  $('tutoCaja').classList.remove('bien'); pintarCaja();
}
function pintarCaja() {
  const p = TU.pasos[TU.k]; if (!p) return;
  const subs = p.subs ? `<div class="subs">${p.subs().map(([k, ok]) => `<span class="${ok ? 'ok' : ''}">${ok ? '<svg viewBox="0 0 12 12" width="11" height="11" style="vertical-align:-1px;margin-right:2px"><path d="M1.5 6.5l3 3 6-7" fill="none" stroke="#8fe36a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}${TR(k)}</span>`).join('')}</div>` : '';
  $('tutoCaja').innerHTML = `<div class="cab"><span>${TR('tutoPaso', { a: TU.k + 1, b: TU.pasos.length })}</span><div class="barraT"><i style="width:${TU.k / TU.pasos.length * 100}%"></i></div><div class="salta" id="tutoSaltar">${TR('tutoSaltar')}</div></div><div class="txt">${TU.bienT > 0 ? TR('tutoBien') : TR(p.t)}</div>${subs}`;
}
$('tutoCaja').addEventListener('pointerdown', e => { e.stopPropagation(); if (e.target.id === 'tutoSaltar') terminarParte(true); });
function quitarBrillos() { for (const el of document.querySelectorAll('.tutoBrilla')) el.classList.remove('tutoBrilla'); }
function terminarParte(saltado) {
  const n = TU.parte; TU.on = false; document.body.classList.remove('tuto', 'tuto2'); $('tutoCaja').hidden = true; $('tutoJoy').hidden = true; $('tutoDesliza').hidden = true; quitarBrillos();
  if (TU.flecha) TU.flecha.visible = false;
  if (jugando) salirAlMenu(); borrarMundoTutorial();
  if (TU.ambas && n === 1 && !saltado) { $('tutoFinTit').textContent = TR('tutoFin1'); $('tutoFinSigue').hidden = false; }
  else { $('tutoFinTit').textContent = TR(n === 1 ? 'tutoFin1' : 'tutoFin2'); $('tutoFinSigue').hidden = true; }
  for (const c of ['inicio', 'mundos', 'nuevo']) $(c).hidden = true; aplicarIdioma(); abrir('tutoFin');
  sonar('final', .7) || son(880, .3, 'triangle', .12);
}
$('tutoFinSigue').onclick = () => { cerrar('tutoFin'); empezarParte(2); };
$('tutoFinCrear').onclick = () => { cerrar('tutoFin'); $('nuevo').hidden = false; };
$('tutoFinInicio').onclick = () => { cerrar('tutoFin'); $('inicio').hidden = false; };
function borrarMundoTutorial() { try { localStorage.setItem('bloquesMundos', JSON.stringify(leerLista().filter(x => x.id !== 'tutorial'))); localStorage.removeItem('bloquesMundo_tutorial'); } catch (e) {} }
// si se sale del mundo del tutorial (pausa → salir), se termina el tutorial
{ const s0 = salirAlMenu; salirAlMenu = function () { const era = TU.on && mundoId === 'tutorial'; const r = s0.apply(this, arguments);
    if (era) { TU.on = false; document.body.classList.remove('tuto', 'tuto2'); $('tutoCaja').hidden = true; $('tutoJoy').hidden = true; $('tutoDesliza').hidden = true; quitarBrillos(); if (TU.flecha) TU.flecha.visible = false; borrarMundoTutorial(); }
    return r; }; }
// si el juego se cerró en medio del tutorial, se borra lo que quedó
borrarMundoTutorial();

// ═════════ FLECHA 3D Y CADA CUADRO ═════════
function armarFlecha() {
  const g = new THREE.Group(), m = new THREE.MeshBasicMaterial({ color: 0xffe14a, depthTest: false, transparent: true }), b = new THREE.MeshBasicMaterial({ color: 0x0d153d, depthTest: false });
  const punta = new THREE.Mesh(new THREE.ConeGeometry(.42, .7, 4), m); punta.rotation.x = Math.PI; punta.position.y = .35; g.add(punta);
  const palo = new THREE.Mesh(new THREE.BoxGeometry(.24, .6, .24), m); palo.position.y = 1; g.add(palo);
  const borde = new THREE.Mesh(new THREE.ConeGeometry(.5, .82, 4), b); borde.rotation.x = Math.PI; borde.position.y = .36; borde.renderOrder = 9; g.add(borde);
  punta.renderOrder = palo.renderOrder = 10; g.visible = false; escena.add(g); return g;
}
function tutoFrame(dt) {
  if (!TU.on || !jugando) return;
  const p = TU.pasos[TU.k]; if (!p) return;
  // cuánto miró alrededor
  let d = J.yaw - TU.yawAnt; d = Math.atan2(Math.sin(d), Math.cos(d)); TU.yawAcum += Math.abs(d); TU.yawAnt = J.yaw;
  // flecha
  if (!TU.flecha) TU.flecha = armarFlecha();
  const f = p.flecha && TU.bienT <= 0 ? p.flecha() : null; TU.flecha.visible = !!f;
  if (f) { TU.flecha.position.set(f.x, f.y + .2 + Math.abs(Math.sin(performance.now() / 300)) * .4, f.z); TU.flecha.rotation.y += dt * 2; }
  // ayudas en la pantalla
  $('tutoJoy').hidden = p.guia !== 'joy' || TU.bienT > 0; $('tutoDesliza').hidden = p.guia !== 'desliza' || TU.bienT > 0;
  const sel0 = typeof p.brilla === 'function' ? p.brilla() : p.brilla;
  if (sel0 !== TU.brillaAnt) { quitarBrillos(); TU.brillaAnt = sel0; }
  if (sel0 && TU.bienT <= 0) for (const el of document.querySelectorAll(sel0)) el.classList.add('tutoBrilla');
  // de noche hasta que duerma
  if (p.noche && stats.durmio !== 1 && TU.bienT <= 0) tiempo = Math.min(Math.max(tiempo, 214), 280);
  // no caerse de la isla
  if (J.y < TY - 8) { Object.assign(J, { x: spawn.x, y: spawn.y, z: spawn.z, vx: 0, vy: 0, vz: 0 }); vida = 20; pintarVida(); }
  if (TU.parte === 1 && vida < 8) { vida = 20; pintarVida(); }
  // paso cumplido
  if (TU.bienT > 0) { if (performance.now() >= TU.bienHasta) { TU.bienT = 0; siguientePaso(); } return; }
  if (p.subs) { const k = JSON.stringify(p.subs()); if (k !== TU.subsAnt) { TU.subsAnt = k; pintarCaja(); } }
  let ok = false; try { ok = p.hecho(); } catch (e) {}
  if (ok) { TU.bienT = 1; TU.bienHasta = performance.now() + 1100; quitarBrillos(); TU.brillaAnt = null; $('tutoCaja').classList.add('bien'); pintarCaja(); son(784, .12, 'triangle', .12); setTimeout(() => son(1046, .18, 'triangle', .12), 110); }
}
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; try { tutoFrame(dt); } catch (e) { console.error(e); } }; requestAnimationFrame(tick); }

// botón "Ver tutorial" en Ajustes (al lado de "Ver intro")
{ const b = document.createElement('div'); b.className = 'btn'; b.id = 'bVerTutorialAj'; b.dataset.i = 'verTutorial'; b.onclick = () => abrirTutoElegir('ajustes');
  $('ajustes').insertBefore(b, $('bAjListo')); aplicarIdioma(); }
window.__tuto = { TU, PASOS, empezarParte, terminarParte, siguientePaso, abrirTutorial: abrirTutoElegir };
