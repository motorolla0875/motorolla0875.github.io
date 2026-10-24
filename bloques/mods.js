'use strict';
// ═════════ MAPAS Y MODS HECHOS POR LOS JUGADORES (se comparten como archivo, sin servidor) ═════════

// ───── textos de esta parte ─────
Object.assign(TX.es, {
  cargarArchivoBtn: 'Cargar mapa o mod<small>Abre un archivo .voxel que te pasaron</small>', modsBtn: 'Mods', compartirMundo: 'Compartir mundo', opcionesMundo: 'Opciones',
  misMods: 'Mis mods', nuevoMod: 'Crear mod nuevo', editar: 'Editar', borrar: 'Borrar', compartir: 'Compartir', bloquesN: '{n} bloques', sinMods: 'Todavía no tienes mods<small>crea uno o carga un archivo</small>',
  modNombre: 'Nombre del mod', bloquesMod: 'Bloques', agregarBloque: '+ Bloque nuevo', recetas: 'Recetas', reglas: 'Reglas', guardarMod: 'Guardar mod', maxBloques: 'MÁXIMO 10 BLOQUES POR MOD',
  sinReceta: 'sin receta', receta: 'se fabrica con', cantidad: 'da', noCambia: '—',
  pixTitulo: 'Dibuja tu bloque', nombreBloque: 'Nombre del bloque', brilla: 'Brilla', dureza: 'Dureza', blando: 'Blando', normalD: 'Normal', duro: 'Duro', partirDe: 'Partir de', lapiz: 'Lápiz', goma: 'Goma', balde: 'Balde', gotero: 'Gotero', listo: 'Listo', cancelar: 'Cancelar', limpiar: 'Limpiar',
  opcTitulo: 'Opciones del mundo', mapaNombre: 'Nombre del mapa', modoJugar: 'Quien lo cargue juega en', aventuraM: 'Aventura', supervivenciaM: 'Supervivencia', creativoM: 'Creativo',
  inicioAqui: 'Usar mi posición como inicio', inicioOk: 'INICIO GUARDADO<small>acá aparece quien cargue tu mapa</small>',
  hora: 'Hora', horaNormal: 'Normal', horaDia: 'Siempre de día', horaNoche: 'Siempre de noche', monstruos: 'Monstruos', no: 'No', muchos: 'Muchos', gravedad: 'Gravedad', baja: 'Baja', alta: 'Alta', salto: 'Salto', alto: 'Alto', super: 'Súper', velocidad: 'Velocidad', rapida: 'Rápida', danoCaida: 'Daño por caídas', hambreR: 'Hambre', si: 'Sí',
  modsMundo: 'Mods de este mundo', activar: 'Activar', quitar: 'Quitar', actualizar: 'Actualizar', modActivado: 'MOD ACTIVADO', modQuitado: 'MOD QUITADO', maxMods: 'MÁXIMO 8 MODS POR MUNDO',
  archivoMal: 'ESE ARCHIVO NO ES DE VOXELIUM', mapaCargado: 'MAPA CARGADO', modCargado: 'MOD CARGADO<small>actívalo desde Opciones dentro de un mundo</small>', creandoArchivo: 'PREPARANDO EL ARCHIVO…',
  cartelTitulo: 'Texto del cartel', cartelVacio: '(cartel vacío)', escribeAqui: 'Escribe aquí…',
  metaLlegaste: '¡LLEGASTE A LA META!', tiempo: 'Tiempo: {t}', mejor: 'Mejor: {t}', jugarDeNuevo: 'Jugar de nuevo', seguirExplorando: 'Seguir explorando', control: 'PUNTO DE CONTROL',
  aventuraAyuda: 'MODO AVENTURA<small>explora y llega a la meta</small>',
});
Object.assign(TX.en, {
  cargarArchivoBtn: 'Load map or mod<small>Open a .voxel file someone sent you</small>', modsBtn: 'Mods', compartirMundo: 'Share world', opcionesMundo: 'Options',
  misMods: 'My mods', nuevoMod: 'Create new mod', editar: 'Edit', borrar: 'Delete', compartir: 'Share', bloquesN: '{n} blocks', sinMods: "You don't have any mods yet<small>create one or load a file</small>",
  modNombre: 'Mod name', bloquesMod: 'Blocks', agregarBloque: '+ New block', recetas: 'Recipes', reglas: 'Rules', guardarMod: 'Save mod', maxBloques: 'MAXIMUM 10 BLOCKS PER MOD',
  sinReceta: 'no recipe', receta: 'made with', cantidad: 'gives', noCambia: '—',
  pixTitulo: 'Draw your block', nombreBloque: 'Block name', brilla: 'Glows', dureza: 'Hardness', blando: 'Soft', normalD: 'Normal', duro: 'Hard', partirDe: 'Start from', lapiz: 'Pencil', goma: 'Eraser', balde: 'Bucket', gotero: 'Picker', listo: 'Done', cancelar: 'Cancel', limpiar: 'Clear',
  opcTitulo: 'World options', mapaNombre: 'Map name', modoJugar: 'Whoever loads it plays in', aventuraM: 'Adventure', supervivenciaM: 'Survival', creativoM: 'Creative',
  inicioAqui: 'Use my position as the start', inicioOk: 'START SAVED<small>whoever loads your map appears here</small>',
  hora: 'Time', horaNormal: 'Normal', horaDia: 'Always day', horaNoche: 'Always night', monstruos: 'Monsters', no: 'No', muchos: 'Many', gravedad: 'Gravity', baja: 'Low', alta: 'High', salto: 'Jump', alto: 'High', super: 'Super', velocidad: 'Speed', rapida: 'Fast', danoCaida: 'Fall damage', hambreR: 'Hunger', si: 'Yes',
  modsMundo: 'Mods in this world', activar: 'Turn on', quitar: 'Remove', actualizar: 'Update', modActivado: 'MOD TURNED ON', modQuitado: 'MOD REMOVED', maxMods: 'MAXIMUM 8 MODS PER WORLD',
  archivoMal: "THAT FILE ISN'T A VOXELIUM FILE", mapaCargado: 'MAP LOADED', modCargado: 'MOD LOADED<small>turn it on from Options inside a world</small>', creandoArchivo: 'PREPARING THE FILE…',
  cartelTitulo: 'Sign text', cartelVacio: '(empty sign)', escribeAqui: 'Write here…',
  metaLlegaste: 'YOU REACHED THE FINISH!', tiempo: 'Time: {t}', mejor: 'Best: {t}', jugarDeNuevo: 'Play again', seguirExplorando: 'Keep exploring', control: 'CHECKPOINT',
  aventuraAyuda: 'ADVENTURE MODE<small>explore and reach the finish</small>',
});
Object.assign(TX.pt, {
  cargarArchivoBtn: 'Carregar mapa ou mod<small>Abra um arquivo .voxel que te enviaram</small>', modsBtn: 'Mods', compartirMundo: 'Compartilhar mundo', opcionesMundo: 'Opções',
  misMods: 'Meus mods', nuevoMod: 'Criar mod novo', editar: 'Editar', borrar: 'Apagar', compartir: 'Compartilhar', bloquesN: '{n} blocos', sinMods: 'Você ainda não tem mods<small>crie um ou carregue um arquivo</small>',
  modNombre: 'Nome do mod', bloquesMod: 'Blocos', agregarBloque: '+ Bloco novo', recetas: 'Receitas', reglas: 'Regras', guardarMod: 'Salvar mod', maxBloques: 'MÁXIMO 10 BLOCOS POR MOD',
  sinReceta: 'sem receita', receta: 'feito com', cantidad: 'dá', noCambia: '—',
  pixTitulo: 'Desenhe seu bloco', nombreBloque: 'Nome do bloco', brilla: 'Brilha', dureza: 'Dureza', blando: 'Mole', normalD: 'Normal', duro: 'Duro', partirDe: 'Começar de', lapiz: 'Lápis', goma: 'Borracha', balde: 'Balde', gotero: 'Conta-gotas', listo: 'Pronto', cancelar: 'Cancelar', limpiar: 'Limpar',
  opcTitulo: 'Opções do mundo', mapaNombre: 'Nome do mapa', modoJugar: 'Quem carregar joga em', aventuraM: 'Aventura', supervivenciaM: 'Sobrevivência', creativoM: 'Criativo',
  inicioAqui: 'Usar minha posição como início', inicioOk: 'INÍCIO SALVO<small>quem carregar seu mapa aparece aqui</small>',
  hora: 'Hora', horaNormal: 'Normal', horaDia: 'Sempre dia', horaNoche: 'Sempre noite', monstruos: 'Monstros', no: 'Não', muchos: 'Muitos', gravedad: 'Gravidade', baja: 'Baixa', alta: 'Alta', salto: 'Pulo', alto: 'Alto', super: 'Super', velocidad: 'Velocidade', rapida: 'Rápida', danoCaida: 'Dano de queda', hambreR: 'Fome', si: 'Sim',
  modsMundo: 'Mods deste mundo', activar: 'Ativar', quitar: 'Remover', actualizar: 'Atualizar', modActivado: 'MOD ATIVADO', modQuitado: 'MOD REMOVIDO', maxMods: 'MÁXIMO 8 MODS POR MUNDO',
  archivoMal: 'ESSE ARQUIVO NÃO É DO VOXELIUM', mapaCargado: 'MAPA CARREGADO', modCargado: 'MOD CARREGADO<small>ative em Opções dentro de um mundo</small>', creandoArchivo: 'PREPARANDO O ARQUIVO…',
  cartelTitulo: 'Texto da placa', cartelVacio: '(placa vazia)', escribeAqui: 'Escreva aqui…',
  metaLlegaste: 'VOCÊ CHEGOU AO FINAL!', tiempo: 'Tempo: {t}', mejor: 'Melhor: {t}', jugarDeNuevo: 'Jogar de novo', seguirExplorando: 'Continuar explorando', control: 'PONTO DE CONTROLE',
  aventuraAyuda: 'MODO AVENTURA<small>explore e chegue ao final</small>',
});
Object.assign(TX.es, {
  texturasMod: 'Texturas', texturasAyuda: 'redibuja cualquier bloque del juego; se ve así en los mundos donde actives este mod', cambiarTextura: '+ Redibujar un bloque del juego…', arriba: 'arriba', abajo: 'abajo', costado: 'costado', redibuja: 'Redibuja: {n}',
  criaturasMod: 'Criaturas', nuevaCriatura: '+ Criatura nueva', criTitulo: 'Tu criatura', forma: 'Forma', fVaca: 'Vaca', fOveja: 'Oveja', fGallina: 'Gallina', fOjon: 'Ojón',
  colorCuerpo: 'Color del cuerpo', colorDetalle: 'Color de los detalles', tamano: 'Tamaño', chico: 'Chico', grande: 'Grande', caracter: 'Cómo es', amistosa: 'Amistosa', ataca: 'Te ataca',
  vidaC: 'Vida', poca: 'Poca', mucha: 'Mucha', sueltaC: 'Al morir suelta', nada: 'Nada', texturasN: '{n} texturas', criaturasN: '{n} criaturas', aparecer: 'Hacer aparecer', criaturasMundo: 'Criaturas de los mods', nombreCriatura: 'Criatura',
});
Object.assign(TX.en, {
  texturasMod: 'Textures', texturasAyuda: 'redraw any block in the game; it looks like this in worlds where you turn this mod on', cambiarTextura: '+ Redraw a game block…', arriba: 'top', abajo: 'bottom', costado: 'side', redibuja: 'Redraw: {n}',
  criaturasMod: 'Creatures', nuevaCriatura: '+ New creature', criTitulo: 'Your creature', forma: 'Shape', fVaca: 'Cow', fOveja: 'Sheep', fGallina: 'Chicken', fOjon: 'Big Eye',
  colorCuerpo: 'Body color', colorDetalle: 'Detail color', tamano: 'Size', chico: 'Small', grande: 'Big', caracter: 'Behavior', amistosa: 'Friendly', ataca: 'Attacks you',
  vidaC: 'Health', poca: 'Low', mucha: 'High', sueltaC: 'Drops when it dies', nada: 'Nothing', texturasN: '{n} textures', criaturasN: '{n} creatures', aparecer: 'Spawn', criaturasMundo: 'Mod creatures', nombreCriatura: 'Creature',
});
Object.assign(TX.pt, {
  texturasMod: 'Texturas', texturasAyuda: 'redesenhe qualquer bloco do jogo; ele fica assim nos mundos onde você ativar este mod', cambiarTextura: '+ Redesenhar um bloco do jogo…', arriba: 'cima', abajo: 'baixo', costado: 'lado', redibuja: 'Redesenhe: {n}',
  criaturasMod: 'Criaturas', nuevaCriatura: '+ Criatura nova', criTitulo: 'Sua criatura', forma: 'Forma', fVaca: 'Vaca', fOveja: 'Ovelha', fGallina: 'Galinha', fOjon: 'Olhão',
  colorCuerpo: 'Cor do corpo', colorDetalle: 'Cor dos detalhes', tamano: 'Tamanho', chico: 'Pequeno', grande: 'Grande', caracter: 'Como é', amistosa: 'Amigável', ataca: 'Ataca você',
  vidaC: 'Vida', poca: 'Pouca', mucha: 'Muita', sueltaC: 'Ao morrer solta', nada: 'Nada', texturasN: '{n} texturas', criaturasN: '{n} criaturas', aparecer: 'Fazer aparecer', criaturasMundo: 'Criaturas dos mods', nombreCriatura: 'Criatura',
});
Object.assign(NOMBRES.en, { 'Cartel': 'Sign', 'Meta': 'Finish', 'Punto de control': 'Checkpoint' });
Object.assign(NOMBRES.pt, { 'Cartel': 'Placa', 'Meta': 'Chegada', 'Punto de control': 'Ponto de Controle' });
aplicarIdioma();

// ───── estilos de esta parte ─────
{ const st = document.createElement('style'); st.textContent = `
  .campo { width: 100%; font: 700 15px 'Baloo 2', 'Trebuchet MS', sans-serif; padding: 8px; border: 3px solid #000; background: #fff; color: #222; }
  .mVentana { background: #c6c6c6; border: 3px solid #000; box-shadow: inset 3px 3px 0 #fff, inset -3px -3px 0 #555; color: #3f3f3f; width: min(720px, 96vw); max-height: 94vh; display: flex; flex-direction: column; }
  .mVentana .vCuerpo { overflow: auto; padding: 8px 10px; }
  .mVentana h4 { font-size: 13px; margin: 8px 0 4px; }
  .fila { display: flex; align-items: center; gap: 8px; padding: 5px 0; border-bottom: 2px solid #aaa; font-size: 13px; flex-wrap: wrap; }
  .fila .nom { flex: 1; min-width: 120px; } .fila .nom small { display: block; font-size: 11px; color: #555; }
  .mb { padding: 6px 10px; background: #7d7d7d; color: #fff; text-shadow: 2px 2px 0 #3f3f3f; border: 3px solid #000; cursor: pointer; font-size: 13px; white-space: nowrap; }
  .mb.verde { background: #5f8f3a; } .mb.rojo { background: #8a3a3a; } .mb.on { background: #3a6fd8; }
  .opcG { display: flex; gap: 3px; flex-wrap: wrap; } .opcG div { padding: 5px 8px; background: #8b8b8b; color: #fff; border: 2px solid #000; cursor: pointer; font-size: 12px; } .opcG div.on { background: #5f8f3a; }
  .ventana select, .mVentana select { font: 700 12px 'Baloo 2', 'Trebuchet MS', sans-serif; padding: 4px; border: 2px solid #000; }
  #pixGrid { width: min(320px, 46vh, 70vw); height: min(320px, 46vh, 70vw); image-rendering: pixelated; border: 3px solid #000; background: repeating-conic-gradient(#ddd 0 25%, #fff 0 50%) 0 0 / 20px 20px; touch-action: none; position: static; display: block; }
  .pixWrap { display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start; }
  .paleta { display: grid; grid-template-columns: repeat(8, 26px); gap: 3px; } .paleta div { width: 26px; height: 26px; border: 2px solid #000; cursor: pointer; } .paleta div.on { outline: 3px solid #fff; }
  #cartelTxt { width: min(520px, 90vw); min-height: 90px; font: 700 16px 'Baloo 2', 'Trebuchet MS', sans-serif; padding: 10px; border: 3px solid #000; }
  #verCartel .tablero { background: #a7834f; border: 6px solid #5e4426; padding: 18px; max-width: 560px; font-size: 18px; line-height: 1.4; color: #2a1c0e; text-shadow: none; white-space: pre-wrap; text-align: center; }
  #crono { position: fixed; top: 66px; left: 50%; transform: translateX(-50%); z-index: 3; font-size: 15px; background: rgba(0,0,0,.45); padding: 2px 10px; pointer-events: none; }
`; document.head.appendChild(st); }
const cap = (id, html, trans = true) => { const d = document.createElement('div'); d.className = 'capa' + (trans ? ' trans' : ''); d.id = id; d.hidden = true; d.innerHTML = html; document.body.appendChild(d); return d; };
cap('modsCapa', '<div class="mVentana"><div class="vCab"><div class="vTit" data-i="misMods"></div><div class="cerrar" id="modsCerrar">X</div></div><div class="vCuerpo" id="modsLista"></div><div class="vPie" style="display:flex;gap:6px;flex-wrap:wrap"><div class="mb verde" id="bNuevoMod" data-i="nuevoMod"></div><div class="mb" id="bCargarMod" data-i="cargarArchivoBtn"></div></div></div>', false);
cap('modEd', '<div class="mVentana"><div class="vCab"><input class="campo" id="modNombre" maxlength="30" style="flex:1"><div class="cerrar" id="modEdCerrar">X</div></div><div class="vCuerpo" id="modEdCuerpo"></div><div class="vPie" style="display:flex;gap:6px"><div class="mb verde" id="bGuardarMod" data-i="guardarMod"></div></div></div>');
cap('pixEd', '<div class="mVentana"><div class="vCab"><div class="vTit" data-i="pixTitulo"></div><div class="cerrar" id="pixCerrar">X</div></div><div class="vCuerpo"><div class="pixWrap"><canvas id="pixGrid" width="16" height="16"></canvas><div style="flex:1;min-width:220px"><input class="campo" id="pixNombre" maxlength="24"><h4></h4><div class="opcG" id="pixHerr"></div><h4></h4><div class="paleta" id="pixPaleta"></div><div style="display:flex;gap:6px;align-items:center;margin-top:6px"><input type="color" id="pixColor" value="#3a6fd8" style="width:44px;height:30px;border:2px solid #000;padding:0"><select id="pixDesde"></select><div class="mb" id="pixLimpiar" data-i="limpiar"></div></div><h4 data-i="dureza"></h4><div class="opcG" id="pixDureza"></div><label style="display:flex;gap:6px;align-items:center;margin-top:8px;font-size:14px"><input type="checkbox" id="pixLuz"> <span data-i="brilla"></span></label></div></div></div><div class="vPie" style="display:flex;gap:6px"><div class="mb verde" id="pixListo" data-i="listo"></div></div></div>');
cap('criEd', '<div class="mVentana"><div class="vCab"><div class="vTit" data-i="criTitulo"></div><div class="cerrar" id="criCerrar">X</div></div><div class="vCuerpo"><div class="pixWrap"><canvas id="criVista" width="220" height="220" style="width:180px;height:180px;border:3px solid #000;background:#8fc4ef;position:sticky;top:0;display:block"></canvas><div style="flex:1;min-width:230px"><input class="campo" id="criNombre" maxlength="24"><div id="criCuerpo"></div></div></div></div><div class="vPie" style="display:flex;gap:6px"><div class="mb verde" id="criListo" data-i="listo"></div></div></div>');
cap('opcCapa', '<div class="mVentana"><div class="vCab"><div class="vTit" data-i="opcTitulo"></div><div class="cerrar" id="opcCerrar">X</div></div><div class="vCuerpo" id="opcCuerpo"></div></div>');
cap('cartelCapa', '<div class="titulo" style="font-size:clamp(22px,4vw,32px)" data-i="cartelTitulo"></div><textarea id="cartelTxt" maxlength="200"></textarea><div class="btn" id="cartelListo" data-i="listo"></div>');
cap('verCartel', '<div class="tablero" id="verCartelTxt"></div><div class="btn" id="verCartelOk" data-i="seguir"></div>');
cap('metaCapa', '<div class="titulo" style="font-size:clamp(24px,5vw,40px);color:#ffe14a" data-i="metaLlegaste"></div><div class="texto" id="metaTxt" style="font-size:18px"></div><div class="btn" id="metaOtra" data-i="jugarDeNuevo"></div><div class="btn" id="metaSeguir" data-i="seguirExplorando"></div>');
{ const c = document.createElement('div'); c.id = 'crono'; c.className = 'sombra'; c.hidden = true; $('hud').appendChild(c); }
const archivoIn = document.createElement('input'); archivoIn.type = 'file'; archivoIn.accept = '.voxel,.voxelmod,.blox,.bloxmod,application/octet-stream,application/json,application/gzip'; archivoIn.style.display = 'none'; document.body.appendChild(archivoIn);
aplicarIdioma();
const abrir = id => { $(id).hidden = false; }, cerrar = id => { $(id).hidden = true; };
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ═════════ ESTADO DEL MUNDO: mods activos, carteles, reglas y datos del mapa ═════════
const MOD_BASE = 160, MOD_SLOTS = 8, MOD_MAX_BLOQUES = 10, TILE_MOD0 = TILES.length;
let tileLibre = TILE_MOD0, modsMundo = [], carteles = {}, mapa = {}, tieneMeta = false, cronoT = 0, cronoOn = false, ultControl = -1;
function quitarModsInstalados() {
  for (let id = MOD_BASE; id < MOD_BASE + MOD_SLOTS * MOD_MAX_BLOQUES; id++) { if (DEF[id]) delete DEF[id]; delete iconos[id]; const k = TODOS.indexOf(id); if (k >= 0) TODOS.splice(k, 1); }
  for (let k = RECETAS.length - 1; k >= 0; k--) if (RECETAS[k].mod) RECETAS.splice(k, 1);
  for (let t = TILE_MOD0; t < TILE_MOD0 + 50; t++) delete tileURLs[t];
  for (const t in tilesOrig) { ag.putImageData(tilesOrig[t], (t % 8) * 16, Math.floor(t / 8) * 16); delete tileURLs[t]; }   // texturas originales de vuelta
  tilesOrig = {}; for (const k in iconos) delete iconos[k];
  for (const k in TIPOS) if (TIPOS[k].mod) delete TIPOS[k];
}
let tilesOrig = {};
const pixTile = (t, pix) => { const tx = t % 8, ty = Math.floor(t / 8); ag.clearRect(tx * 16, ty * 16, 16, 16); for (let k = 0; k < 256; k++) if (pix[k]) { ag.fillStyle = pix[k]; ag.fillRect(tx * 16 + k % 16, ty * 16 + (k >> 4), 1, 1); } delete tileURLs[t]; };
const refId = (m, r) => typeof r === 'string' && r.startsWith('m:') ? MOD_BASE + m.slot * MOD_MAX_BLOQUES + (+r.slice(2)) : +r;
function instalarMod(m) {
  m.bloques.forEach((b, k) => {
    const id = MOD_BASE + m.slot * MOD_MAX_BLOQUES + k, t = tileLibre < 128 ? tileLibre++ : TILE_MOD0 + (tileLibre++ % (128 - TILE_MOD0));   // cada bloque de mod usa un casillero libre del atlas
    const tx = t % 8, ty = Math.floor(t / 8); ag.clearRect(tx * 16, ty * 16, 16, 16);
    let trans = false; for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { const c = b.pix[y * 16 + x]; if (!c) { trans = true; continue; } ag.fillStyle = c; ag.fillRect(tx * 16 + x, ty * 16 + y, 1, 1); }
    delete tileURLs[t];
    const col = b.pix.find(c => c) || '#888888';
    def(id, b.nombre || 'Bloque', [t], { dur: [.4, 1.2, 3][b.dureza ?? 1], luz: b.luz ? 13 : 0, trans, color: col, deMod: m.nombre });
    TODOS.push(id);
    if (b.receta && b.receta.ing && b.receta.ing.length) { const r = [[id, b.receta.n || 1], b.receta.ing.filter(([x]) => x !== '' && x != null).map(([x, n]) => [refId(m, x), n || 1])]; r.mod = true; if (r[1].length) RECETAS.push(r); }
  });
  // paquete de texturas: redibuja bloques del juego
  for (const nombre in (m.texturas || {})) { const t = TL[nombre]; if (t == null || t >= TILE_MOD0) continue; if (!tilesOrig[t]) tilesOrig[t] = ag.getImageData((t % 8) * 16, Math.floor(t / 8) * 16, 16, 16); pixTile(t, m.texturas[nombre]); }
  // criaturas propias
  (m.criaturas || []).forEach((c, k) => { TIPOS['c' + m.slot + '_' + k] = tipoCriatura(c, m); });
}
// ═════════ CRIATURAS ═════════
const FORMA_BASE = {
  vaca: { an: .45, al: 1.5, vel: 1.1, c1: '#f6ead2', c2: '#7a4a2a' }, oveja: { an: .45, al: 1.45, vel: 1, c1: '#fbf6ee', c2: '#5a4a5e' },
  gallina: { an: .25, al: 1.1, vel: 1.3, c1: '#fff3c4', c2: '#ff9a2e' }, ojon: { an: .45, al: 1.4, vel: 1.4, c1: '#6b3fa0', c2: '#45276b' },
};
const hex = c => parseInt(String(c || '#888888').slice(1), 16);
const FORMAS = {
  vaca: FORMA_ANIMAL.vaca, oveja: FORMA_ANIMAL.oveja, gallina: FORMA_ANIMAL.gallina,
  ojon(g, c1, c2) { const cu = matA(hex(c1)), pa = matA(hex(c2)), bl = matA(0xf2f2f2), ne = new THREE.MeshBasicMaterial({ color: 0x1a1022 });
    caja(g, .9, 1, .9, 0, .9, 0, cu); caja(g, .52, .42, .06, 0, 1.05, .46, bl); caja(g, .22, .22, .07, 0, 1.03, .48, ne);
    return [-1, 1].map(s => pata(g, .26, .4, .26, s * .22, .4, 0, pa)); },
};
const TAM = [.6, 1, 1.6], VIDAS = [4, 10, 24];
function tipoCriatura(c, m) {
  const f = FORMA_BASE[c.base] || FORMA_BASE.vaca, s = TAM[c.tam ?? 1];
  return { mod: true, nombre: c.nombre, voz: c.base, vida: VIDAS[c.vida ?? 1], an: f.an * s, al: f.al * s, vel: f.vel * (c.rapida ? 1.7 : 1), peso: .36, color: c.c1 || f.c1, hostil: !!c.hostil, dano: c.tam === 2 ? 3 : 2,
    armar(g) { const h = new THREE.Group(); h.scale.setScalar(s); g.add(h); return (FORMAS[c.base] || FORMAS.vaca)(h, c.c1 || f.c1, c.c2 || f.c2); },
    suelta: () => c.suelta && c.suelta[0] !== '' && c.suelta[0] != null ? [[refId(m, c.suelta[0]), c.suelta[1] || 1]] : [] };
}
function modsCargar(x, meta) {
  quitarModsInstalados(); tileLibre = TILE_MOD0; x = x || {};
  modsMundo = (x.mods || []).filter(m => m && m.bloques); carteles = x.carteles || {}; mapa = x.mapa || {};
  REG = Object.assign({}, REG_BASE, x.reglas || {});
  for (const m of modsMundo) instalarMod(m);
  atlasTex.needsUpdate = true; for (const k in iconos) delete iconos[k];
  if (typeof mecCargar === 'function') mecCargar(x.mec);
  cronoT = 0; cronoOn = false; ultControl = -1; tieneMeta = false;
  if (meta && meta.modo === 'aventura') setTimeout(() => aviso(TR('aventuraAyuda'), 2600), 600);
}
function modsGuardar() {
  const c = {}; for (const i in carteles) if (mundo[+i] === B.CARTEL && carteles[i]) c[i] = carteles[i];
  const r = {}; for (const k in REG) if (REG[k] !== REG_BASE[k]) r[k] = REG[k];
  return { mods: modsMundo, carteles: c, reglas: r, mapa, mec: typeof mecGuardar === 'function' ? mecGuardar() : undefined };
}

// ═════════ CARTELES ═════════
let cartelI = null;
function escribirCartel(i) { cartelI = i; $('cartelTxt').value = carteles[i] || ''; $('cartelTxt').placeholder = TR('escribeAqui'); pausado = true; soltarTodo(); abrir('cartelCapa'); setTimeout(() => $('cartelTxt').focus(), 50); }
$('cartelListo').onclick = () => { if (cartelI != null) { carteles[cartelI] = $('cartelTxt').value.slice(0, 200); sucio = true; } cartelI = null; cerrar('cartelCapa'); pausado = false; };
function verCartel(h) {
  const i = idx(h.x, h.y, h.z);
  if (creativo() && !aventura()) { const t = carteles[i]; if (!t) return escribirCartel(i); }
  $('verCartelTxt').textContent = carteles[i] || TR('cartelVacio'); pausado = true; soltarTodo(); abrir('verCartel');
}
$('verCartelOk').onclick = () => { cerrar('verCartel'); pausado = false; };
$('verCartelTxt').ondblclick = () => { if (creativo()) { cerrar('verCartel'); const k = +Object.keys(carteles).find(k => $('verCartelTxt').textContent === carteles[k]); if (!isNaN(k)) escribirCartel(k); } };

// ═════════ META, PUNTOS DE CONTROL Y CRONÓMETRO ═════════
const fmtT = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
let metaRevT = 0;
function modsFrame(dt) {
  if (!jugando) { $('crono').hidden = true; return; }
  if (typeof mecFrame === 'function') mecFrame(dt);
  metaRevT -= dt; if (metaRevT <= 0) { metaRevT = 3; let hay = false; for (const [i, t] of diffs) if (t === B.META) { hay = true; break; } tieneMeta = hay; }
  $('crono').hidden = !tieneMeta || creativo();
  if (!tieneMeta || creativo() || pausado) return;
  if (!cronoOn) { cronoOn = true; cronoT = 0; }
  cronoT += dt; $('crono').textContent = fmtT(cronoT);
  const fx = Math.floor(J.x), fz = Math.floor(J.z), pie = Math.floor(J.y - .05);
  for (const y of [pie, pie + 1]) for (const [dx, dz] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const t = get(fx + dx, y, fz + dz); if (t !== B.META) continue;
    if (Math.abs(fx + dx + .5 - J.x) < 1.15 && Math.abs(fz + dz + .5 - J.z) < 1.15) return llegarMeta();
  }
  const bajo = get(fx, pie, fz), i = idx(fx, pie, fz);
  if (bajo === B.CONTROL && ultControl !== i) { ultControl = i; spawn = { x: fx + .5, y: pie + 1, z: fz + .5, yaw: J.yaw }; spawnPropio = true; aviso(TR('control'), 1300); son(880, .15, 'triangle', .12); sucio = true; }
}
function llegarMeta() {
  pausado = true; soltarTodo(); cronoOn = false;
  const t = cronoT; if (!mapa.mejor || t < mapa.mejor) { mapa.mejor = t; sucio = true; }
  $('metaTxt').innerHTML = TR('tiempo', { t: fmtT(t) }) + '<br><small style="font-size:14px;color:#ffff55">' + TR('mejor', { t: fmtT(mapa.mejor) }) + '</small>';
  abrir('metaCapa'); sonar('final', .8) || son(880, .4, 'triangle', .14); stats.metas = (stats.metas || 0) + 1;
}
function volverAlInicio() { const s = mapa.inicio || spawn; spawn = Object.assign({}, s); Object.assign(J, { x: s.x, y: s.y, z: s.z, vx: 0, vy: 0, vz: 0, yaw: s.yaw ?? J.yaw }); vida = 20; hambre = 20; pintarVida(); hambrePintado = -1; pintarHambre(); ultControl = -1; cronoT = 0; cronoOn = false; }
$('metaOtra').onclick = () => { cerrar('metaCapa'); volverAlInicio(); pausado = false; };
$('metaSeguir').onclick = () => { cerrar('metaCapa'); J.x += 2; pausado = false; };

// ═════════ OPCIONES DEL MUNDO (reglas, mapa y mods activos) ═════════
const OPC = [
  ['hora', 'hora', [['normal', 'horaNormal'], ['dia', 'horaDia'], ['noche', 'horaNoche']]],
  ['monstruos', 'monstruos', [[0, 'no'], [1, 'normalD'], [2, 'muchos']]],
  ['grav', 'gravedad', [[.45, 'baja'], [1, 'normalD'], [1.6, 'alta']]],
  ['salto', 'salto', [[1, 'normalD'], [1.8, 'alto'], [3, 'super']]],
  ['vel', 'velocidad', [[1, 'normalD'], [1.6, 'rapida']]],
  ['caida', 'danoCaida', [[true, 'si'], [false, 'no']]],
  ['hambre', 'hambreR', [[true, 'si'], [false, 'no']]],
];
function opcHTML(obj, conNoCambia) {
  return OPC.map(([k, lab, ops]) => `<div class="fila"><div class="nom">${TR(lab)}</div><div class="opcG" data-regla="${k}">${(conNoCambia ? [[null, 'noCambia']] : []).concat(ops).map(([v, l]) => `<div data-v='${JSON.stringify(v)}' class="${JSON.stringify(obj[k] ?? null) === JSON.stringify(v) ? 'on' : ''}">${TR(l)}</div>`).join('')}</div></div>`).join('');
}
function pintarOpciones() {
  const lib = leerMods();
  let h = `<h4 data-i="mapaNombre">${TR('mapaNombre')}</h4><input class="campo" id="opcNombre" maxlength="30" value="${esc(mapa.nombre || '')}">`;
  h += `<div class="fila"><div class="nom">${TR('modoJugar')}</div><div class="opcG" id="opcModo">${[['aventura', 'aventuraM'], ['supervivencia', 'supervivenciaM'], ['creativo', 'creativoM']].map(([v, l]) => `<div data-v="${v}" class="${(mapa.modoJugar || 'aventura') === v ? 'on' : ''}">${TR(l)}</div>`).join('')}</div></div>`;
  h += `<div class="fila"><div class="mb verde" id="opcInicio">${TR('inicioAqui')}</div></div>`;
  h += `<h4>${TR('reglas')}</h4>` + opcHTML(REG, false);
  h += `<h4>${TR('modsMundo')}</h4>`;
  if (!lib.length) h += `<div class="fila"><div class="nom">${TR('sinMods')}</div></div>`;
  for (const m of lib) { const act = modsMundo.find(x => x.id === m.id);
    h += `<div class="fila"><div class="nom">${esc(m.nombre)}<small>${resumenMod(m)}</small></div>` + (act ? (m.ver > (act.ver || 0) ? `<div class="mb verde" data-actualizar="${m.id}">${TR('actualizar')}</div>` : '') + `<div class="mb rojo" data-quitar="${m.id}">${TR('quitar')}</div>` : `<div class="mb verde" data-activar="${m.id}">${TR('activar')}</div>`) + '</div>'; }
  h += `<div class="fila"><div class="mb" id="opcMods">${TR('misMods')}</div></div>`;
  const cri = Object.keys(TIPOS).filter(k => TIPOS[k].mod);
  if (cri.length) { h += `<h4>${TR('criaturasMundo')}</h4>`; for (const k of cri) h += `<div class="fila"><div class="slot" style="background:${TIPOS[k].color}"></div><div class="nom">${esc(TIPOS[k].nombre)}<small>${TR(TIPOS[k].hostil ? 'ataca' : 'amistosa')}</small></div><div class="mb verde" data-aparecer="${k}">${TR('aparecer')}</div></div>`; }
  $('opcCuerpo').innerHTML = h;
}
$('bOpcionesMundo').onclick = () => { if (aventura()) return; cerrar('pausa'); pintarOpciones(); abrir('opcCapa'); };
$('opcCerrar').onclick = () => { mapa.nombre = $('opcNombre').value.trim(); sucio = true; cerrar('opcCapa'); abrir('pausa'); };
$('opcCuerpo').addEventListener('click', e => {
  const q = s => e.target.closest(s); let d;
  if (d = q('[data-regla] [data-v]')) { const k = d.parentElement.dataset.regla; REG[k] = JSON.parse(d.dataset.v); if (k === 'monstruos' && !REG.monstruos) for (const m of monstruos.slice()) quitarMonstruo(m, false); sucio = true; pintarOpciones(); }
  else if (d = q('#opcModo [data-v]')) { mapa.modoJugar = d.dataset.v; sucio = true; pintarOpciones(); }
  else if (q('#opcInicio')) { mapa.inicio = { x: J.x, y: J.y, z: J.z, yaw: J.yaw }; spawn = Object.assign({}, mapa.inicio); spawnPropio = true; sucio = true; aviso(TR('inicioOk'), 1600); }
  else if (d = q('[data-activar]')) activarMod(d.dataset.activar);
  else if (d = q('[data-actualizar]')) activarMod(d.dataset.actualizar, true);
  else if (d = q('[data-quitar]')) quitarMod(d.dataset.quitar);
  else if (d = q('[data-aparecer]')) { const a = crearAnimal(d.dataset.aparecer, J.x + Math.sin(J.yaw + Math.PI) * 3, J.y + .3, J.z + Math.cos(J.yaw + Math.PI) * 3); a.userData.huir = 0; aviso(esc(TIPOS[d.dataset.aparecer].nombre), 900); }
  else if (q('#opcMods')) { mapa.nombre = $('opcNombre').value.trim(); cerrar('opcCapa'); abrirLibreria('opcCapa'); }
});
function recargarMundo() { mapa.nombre = ($('opcNombre') && $('opcNombre').value.trim()) || mapa.nombre; guardar(); const id = mundoId; cerrar('opcCapa'); cerrar('pausa'); entrarMundo(id); }
function activarMod(id, actualizar) {
  const m = leerMods().find(x => x.id === id); if (!m) return;
  const ya = modsMundo.find(x => x.id === id);
  if (ya && actualizar) { const slot = ya.slot; Object.assign(ya, JSON.parse(JSON.stringify(m)), { slot }); }
  else { const usados = new Set(modsMundo.map(x => x.slot)); let slot = 0; while (usados.has(slot)) slot++; if (slot >= MOD_SLOTS) return aviso(TR('maxMods'), 1500);
    modsMundo.push(Object.assign(JSON.parse(JSON.stringify(m)), { slot })); if (m.reglas) for (const k in m.reglas) if (m.reglas[k] != null) REG[k] = m.reglas[k]; }
  aviso(TR('modActivado'), 1200); recargarMundo();
}
function quitarMod(id) {
  const m = modsMundo.find(x => x.id === id); if (!m) return;
  const a = MOD_BASE + m.slot * MOD_MAX_BLOQUES, b = a + MOD_MAX_BLOQUES;
  for (const [i, t] of diffs) if (t >= a && t < b) { mundo[i] = 0; diffs.set(i, 0); }   // sus bloques desaparecen del mundo
  for (const k in inv) if (+k >= a && +k < b) delete inv[k]; barra = barra.map(x => x >= a && x < b ? 0 : x);
  modsMundo = modsMundo.filter(x => x !== m); aviso(TR('modQuitado'), 1200); recargarMundo();
}

// ═════════ ARCHIVOS .voxel / .voxelmod (mapas y mods; también abre los .blox viejos) ═════════
async function empacar(obj) {
  const txt = JSON.stringify(obj);
  if (window.CompressionStream) { const s = new Blob([txt]).stream().pipeThrough(new CompressionStream('gzip')); return new Blob([await new Response(s).arrayBuffer()], { type: 'application/octet-stream' }); }
  return new Blob([txt], { type: 'application/json' });
}
async function desempacar(file) {
  const ab = await file.arrayBuffer(), u = new Uint8Array(ab);
  if (u[0] === 0x1f && u[1] === 0x8b) { if (!window.DecompressionStream) throw new Error('gzip'); const s = new Blob([ab]).stream().pipeThrough(new DecompressionStream('gzip')); return JSON.parse(await new Response(s).text()); }
  return JSON.parse(new TextDecoder().decode(u));
}
const nombreArchivo = n => (String(n || 'voxelium').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'voxelium').slice(0, 40);
async function compartirArchivo(blob, nombre) {
  const f = new File([blob], nombre, { type: 'application/octet-stream' });
  try { if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: nombre }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nombre; document.body.appendChild(a); a.click(); a.remove();
}
async function exportarMundo() {
  aviso(TR('creandoArchivo'), 1200); guardar();
  const meta = leerLista().find(m => m.id === mundoId); let datos; try { datos = JSON.parse(localStorage.getItem('bloquesMundo_' + mundoId)); } catch (e) {} if (!meta || !datos) return;
  const ini = mapa.inicio || { x: J.x, y: J.y, z: J.z, yaw: J.yaw };
  const d = Object.assign({}, datos, { J: { x: ini.x, y: ini.y, z: ini.z, yaw: ini.yaw ?? 0, pitch: -.1 }, spawnP: ini, inv: {}, stats: { rotos: {}, hechos: {}, cofres: 0 }, mision: 0, tiempo: 0, vida: 20, hambre: 20, volando: false, extra: null });
  const modo = mapa.modoJugar || (tieneMeta ? 'aventura' : meta.modo);
  if (modo === 'creativo') d.barra = BARRA_CREATIVO.slice(); else d.barra = Array(9).fill(0);
  const obj = { formato: 'voxelium', tipo: 'mapa', v: 1, nombre: mapa.nombre || meta.nombre, modo, semilla: meta.semilla, ejemplo: !!meta.ejemplo, datos: d };
  compartirArchivo(await empacar(obj), nombreArchivo(obj.nombre) + '.voxel');
}
$('bCompartirMundo').onclick = () => exportarMundo();
let tras = null;
function pedirArchivo(despues) { tras = despues; archivoIn.value = ''; archivoIn.click(); }
archivoIn.onchange = async () => {
  const f = archivoIn.files[0]; if (!f) return; let o;
  try { o = await desempacar(f); } catch (e) { return aviso(TR('archivoMal'), 1800); }
  if (!o || (o.formato !== 'voxelium' && o.formato !== 'blox')) return aviso(TR('archivoMal'), 1800);
  if (o.tipo === 'mod' && o.mod) { guardarModLib(Object.assign(o.mod, { id: o.mod.id || 'm' + Date.now().toString(36) })); aviso(TR('modCargado'), 2400); if (!$('modsCapa').hidden) pintarLibreria(); return; }
  if (o.tipo === 'mapa' && o.datos) {
    const lista = leerLista(), id = Date.now().toString(36), modo = ['aventura', 'supervivencia', 'creativo'].includes(o.modo) ? o.modo : 'aventura';
    lista.unshift({ id, nombre: String(o.nombre || 'Mapa').slice(0, 30), num: lista.length + 1, modo, ejemplo: !!o.ejemplo, importado: true, semilla: +o.semilla || 1, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0 });
    localStorage.setItem('bloquesMundos', JSON.stringify(lista)); localStorage.setItem('bloquesMundo_' + id, JSON.stringify(o.datos));
    aviso(TR('mapaCargado'), 1400); for (const c of ['inicio', 'mundos', 'nuevo', 'modsCapa']) $(c).hidden = true; pantallaCompleta(); entrarMundo(id); return;
  }
  aviso(TR('archivoMal'), 1800);
};
$('bCargarArchivo').onclick = () => pedirArchivo();
// en la lista de mundos, los importados muestran su nombre
const pintarMundos0 = pintarMundos;
pintarMundos = function () { pintarMundos0(); const lista = leerLista(); document.querySelectorAll('#listaMundos .mundoFila').forEach((f, k) => { const m = lista[k]; if (m && m.importado) { const inf = f.querySelector('.info'); if (inf && inf.firstChild) inf.firstChild.textContent = m.nombre; } }); };

// ═════════ LIBRERÍA DE MODS (en el teléfono) ═════════
const leerMods = () => { try { return JSON.parse(localStorage.getItem('bloxMods') || '[]'); } catch (e) { return []; } };
function guardarModLib(m) { const l = leerMods(), k = l.findIndex(x => x.id === m.id); m.ver = Math.max(m.ver || 1, k >= 0 ? (l[k].ver || 1) + (m === l[k] ? 0 : 0) : 1); if (k >= 0) l[k] = m; else l.unshift(m); try { localStorage.setItem('bloxMods', JSON.stringify(l)); } catch (e) { aviso(TR('noGuardar'), 1800); } }
let libVolver = null;
function abrirLibreria(volver) { libVolver = volver || null; pintarLibreria(); abrir('modsCapa'); }
function pintarLibreria() {
  const l = leerMods();
  $('modsLista').innerHTML = l.length ? l.map(m => `<div class="fila">${fotoMod(m) ? `<div class="slot" style="background-image:url(${fotoMod(m)})"></div>` : (m.criaturas || [])[0] ? `<div class="slot" style="background:${m.criaturas[0].c1}"></div>` : ''}<div class="nom">${esc(m.nombre)}<small>${resumenMod(m)}</small></div><div class="mb" data-editar="${m.id}">${TR('editar')}</div><div class="mb verde" data-compartir="${m.id}">${TR('compartir')}</div><div class="mb rojo" data-borrar="${m.id}">${TR('borrar')}</div></div>`).join('') : `<div class="fila"><div class="nom">${TR('sinMods')}</div></div>`;
}
$('bModsHome').onclick = () => { cerrar('inicio'); abrirLibreria('inicio'); };
$('modsCerrar').onclick = () => { cerrar('modsCapa'); if (libVolver === 'opcCapa') { pintarOpciones(); abrir('opcCapa'); } else if (libVolver) abrir(libVolver); };
$('bNuevoMod').onclick = () => abrirEditorMod({ id: 'm' + Date.now().toString(36), nombre: 'Mi mod', ver: 1, bloques: [], reglas: {} });
$('bCargarMod').onclick = () => pedirArchivo();
$('modsLista').addEventListener('click', async e => {
  const q = s => e.target.closest(s); let d; const l = leerMods();
  if (d = q('[data-editar]')) abrirEditorMod(JSON.parse(JSON.stringify(l.find(m => m.id === d.dataset.editar))));
  else if (d = q('[data-compartir]')) { const m = l.find(x => x.id === d.dataset.compartir); compartirArchivo(await empacar({ formato: 'voxelium', tipo: 'mod', v: 1, mod: m }), nombreArchivo(m.nombre) + '.voxelmod'); }
  else if (d = q('[data-borrar]')) { if (d.dataset.seguro) { localStorage.setItem('bloxMods', JSON.stringify(l.filter(m => m.id !== d.dataset.borrar))); pintarLibreria(); } else { d.dataset.seguro = 1; d.textContent = TR('seguro'); } }
});
const resumenMod = m => [m.bloques.length ? TR('bloquesN', { n: m.bloques.length }) : '', Object.keys(m.texturas || {}).length ? TR('texturasN', { n: Object.keys(m.texturas).length }) : '', (m.criaturas || []).length ? TR('criaturasN', { n: m.criaturas.length }) : ''].filter(x => x).join(' · ') || TR('bloquesN', { n: 0 });
const fotoMod = m => m.bloques[0] ? pixURL(m.bloques[0].pix) : Object.values(m.texturas || {})[0] ? pixURL(Object.values(m.texturas)[0]) : null;
function pixURL(pixE) { const c = document.createElement('canvas'); c.width = c.height = 16; const g = c.getContext('2d'); pixE.forEach((p, k) => { if (p) { g.fillStyle = p; g.fillRect(k % 16, (k / 16) | 0, 1, 1); } }); return c.toDataURL(); }

// ═════════ EDITOR DE MODS ═════════
let modEd = null;
const ING_BASE = [B.TIERRA, B.PIEDRA, B.ADOQUIN, B.ARENA, B.TRONCO, B.MADERA, B.HOJAS, B.VIDRIO, B.LADRILLO, B.NIEVE, B.TELA, I.PALO, I.CARBON, I.HIERRO, I.ORO, I.CRISTAL, I.TRIGO_I];
function abrirEditorMod(m) { modEd = m; m.reglas = m.reglas || {}; $('modNombre').value = m.nombre; pintarEditorMod(); cerrar('modsCapa'); abrir('modEd'); }
function pintarEditorMod() {
  const m = modEd; let h = `<h4>${TR('bloquesMod')}</h4>`;
  const opIng = (sel) => `<option value="">—</option>` + ING_BASE.map(id => `<option value="${id}" ${String(sel) === String(id) ? 'selected' : ''}>${esc(nom(id))}</option>`).join('') + m.bloques.map((b, k) => `<option value="m:${k}" ${sel === 'm:' + k ? 'selected' : ''}>${esc(b.nombre)}</option>`).join('');
  m.bloques.forEach((b, k) => { const r = b.receta || { n: 1, ing: [] };
    h += `<div class="fila"><div class="slot" style="background-image:url(${pixURL(b.pix)})"></div><div class="nom">${esc(b.nombre)}<small>${b.luz ? TR('brilla') + ' · ' : ''}${TR(['blando', 'normalD', 'duro'][b.dureza ?? 1])}</small></div><div class="mb" data-pix="${k}">${TR('editar')}</div><div class="mb rojo" data-bq="${k}">X</div></div>
      <div class="fila" style="font-size:12px">${TR('receta')}: <select data-ing="${k}:0">${opIng(r.ing[0] && r.ing[0][0])}</select><select data-ingn="${k}:0">${[1, 2, 3, 4].map(n => `<option ${r.ing[0] && r.ing[0][1] === n ? 'selected' : ''}>${n}</option>`).join('')}</select> + <select data-ing="${k}:1">${opIng(r.ing[1] && r.ing[1][0])}</select><select data-ingn="${k}:1">${[1, 2, 3, 4].map(n => `<option ${r.ing[1] && r.ing[1][1] === n ? 'selected' : ''}>${n}</option>`).join('')}</select> → ${TR('cantidad')} <select data-out="${k}">${[1, 2, 4, 8].map(n => `<option ${r.n === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>`; });
  if (m.bloques.length < MOD_MAX_BLOQUES) h += `<div class="fila"><div class="mb verde" id="bNuevoBloque">${TR('agregarBloque')}</div></div>`;
  // texturas
  m.texturas = m.texturas || {}; m.criaturas = m.criaturas || [];
  h += `<h4>${TR('texturasMod')}</h4><div style="font-size:11px;margin-bottom:4px">${TR('texturasAyuda')}</div>`;
  for (const n in m.texturas) h += `<div class="fila"><div class="slot" style="background-image:url(${pixURL(m.texturas[n])})"></div><div class="nom">${esc(nombreTile(n))}</div><div class="mb" data-tx="${n}">${TR('editar')}</div><div class="mb rojo" data-txq="${n}">X</div></div>`;
  h += `<div class="fila"><select id="txNueva"><option value="">${TR('cambiarTextura')}</option>${listaTiles().filter(([n]) => !m.texturas[n]).map(([n, l]) => `<option value="${n}">${esc(l)}</option>`).join('')}</select></div>`;
  // criaturas
  h += `<h4>${TR('criaturasMod')}</h4>`;
  m.criaturas.forEach((c, k) => { h += `<div class="fila"><div class="slot" style="background:linear-gradient(${c.c1} 60%, ${c.c2} 60%)"></div><div class="nom">${esc(c.nombre)}<small>${TR(FORMA_TXT[c.base])} · ${TR(c.hostil ? 'ataca' : 'amistosa')}</small></div><div class="mb" data-cri="${k}">${TR('editar')}</div><div class="mb rojo" data-criq="${k}">X</div></div>`; });
  if (m.criaturas.length < 6) h += `<div class="fila"><div class="mb verde" id="bNuevaCri">${TR('nuevaCriatura')}</div></div>`;
  h += `<h4>${TR('reglas')}</h4>` + opcHTML(m.reglas, true);
  $('modEdCuerpo').innerHTML = h;
}
$('modEdCuerpo').addEventListener('click', e => {
  const q = s => e.target.closest(s); let d;
  if (q('#bNuevoBloque')) { if (modEd.bloques.length >= MOD_MAX_BLOQUES) return aviso(TR('maxBloques'), 1200); abrirPix(modEd.bloques.length); }
  else if (d = q('[data-pix]')) abrirPix(+d.dataset.pix);
  else if (d = q('[data-bq]')) { modEd.bloques.splice(+d.dataset.bq, 1); pintarEditorMod(); }
  else if (d = q('[data-tx]')) abrirPix(0, d.dataset.tx);
  else if (d = q('[data-txq]')) { delete modEd.texturas[d.dataset.txq]; pintarEditorMod(); }
  else if (q('#bNuevaCri')) abrirCri(modEd.criaturas.length);
  else if (d = q('[data-cri]')) abrirCri(+d.dataset.cri);
  else if (d = q('[data-criq]')) { modEd.criaturas.splice(+d.dataset.criq, 1); pintarEditorMod(); }
  else if (d = q('[data-regla] [data-v]')) { const v = JSON.parse(d.dataset.v), k = d.parentElement.dataset.regla; if (v === null) delete modEd.reglas[k]; else modEd.reglas[k] = v; pintarEditorMod(); }
});
$('modEdCuerpo').addEventListener('change', e => {
  const t = e.target; let k, j;
  if (t.id === 'txNueva') { if (t.value) abrirPix(0, t.value); return; }
  if (t.dataset.ing) { [k, j] = t.dataset.ing.split(':').map((x, i) => i ? +x : +x); const b = modEd.bloques[k]; b.receta = b.receta || { n: 1, ing: [] }; b.receta.ing[j] = [t.value, (b.receta.ing[j] && b.receta.ing[j][1]) || 1]; b.receta.ing = b.receta.ing.filter(x => x && x[0] !== ''); pintarEditorMod(); }
  else if (t.dataset.ingn) { [k, j] = t.dataset.ingn.split(':').map(Number); const b = modEd.bloques[k]; if (b.receta && b.receta.ing[j]) b.receta.ing[j][1] = +t.value; }
  else if (t.dataset.out) { const b = modEd.bloques[+t.dataset.out]; b.receta = b.receta || { n: 1, ing: [] }; b.receta.n = +t.value; }
});
$('bGuardarMod').onclick = () => { modEd.nombre = $('modNombre').value.trim() || 'Mod'; const l = leerMods(), viejo = l.find(x => x.id === modEd.id); modEd.ver = viejo ? (viejo.ver || 1) + 1 : 1; guardarModLib(modEd); cerrar('modEd'); abrirLibreria(libVolver); };
$('modEdCerrar').onclick = () => { cerrar('modEd'); abrirLibreria(libVolver); };

// ═════════ EDITOR DE PÍXELES (16×16) ═════════
const PALETA = ['#ffffff', '#c6c6c6', '#7f7f7f', '#3f3f3f', '#000000', '#6b4a26', '#a7834f', '#d8c48a', '#ff5a4a', '#d42a2a', '#7a1414', '#f07613', '#f8c527', '#fff27a', '#6cbb40', '#2f6f22', '#3aafd9', '#3f8eec', '#35399d', '#7e2fbe', '#c58cf5', '#ff8ab8', '#f2b8a8', '#866043'];
let pixE = { k: 0, datos: null, color: '#3f8eec', herr: 'lapiz', dureza: 1, pinta: false };
const PIX_HERR = ['lapiz', 'goma', 'balde', 'gotero'];
function abrirPix(k, textura) {
  const b = modEd.bloques[k] || { nombre: TR('nombreBloque').split(' ')[0] + ' ' + (k + 1), pix: Array(256).fill('#a7834f'), luz: false, dureza: 1 };
  pixE = Object.assign(pixE, { k, datos: b.pix.slice(), dureza: b.dureza ?? 1, textura: textura || null });
  for (const el of [$('pixNombre'), $('pixDureza'), $('pixDureza').previousElementSibling, $('pixLuz').parentElement]) el.style.display = textura ? 'none' : '';
  $('pixEd').querySelector('.vTit').innerHTML = textura ? TR('redibuja', { n: esc(nombreTile(textura)) }) : TR('pixTitulo');
  if (textura) pixE.datos = modEd.texturas[textura] ? modEd.texturas[textura].slice() : leerTile(TL[textura]);
  $('pixNombre').value = b.nombre; $('pixLuz').checked = !!b.luz;
  $('pixPaleta').innerHTML = PALETA.map(c => `<div data-c="${c}" style="background:${c}" class="${c === pixE.color ? 'on' : ''}"></div>`).join('');
  $('pixHerr').innerHTML = PIX_HERR.map(h => `<div data-h="${h}" class="${h === pixE.herr ? 'on' : ''}">${TR(h)}</div>`).join('');
  $('pixDureza').innerHTML = ['blando', 'normalD', 'duro'].map((h, i) => `<div data-d="${i}" class="${i === pixE.dureza ? 'on' : ''}">${TR(h)}</div>`).join('');
  $('pixDesde').innerHTML = `<option value="">${TR('partirDe')}…</option>` + TODOS.filter(id => id < MOD_BASE && DEF[id] && !DEF[id].forma && !DEF[id].planta).map(id => `<option value="${id}">${esc(nom(id))}</option>`).join('');
  dibujarPix(); cerrar('modEd'); abrir('pixEd');
}
function dibujarPix() { const g = $('pixGrid').getContext('2d'); g.clearRect(0, 0, 16, 16); pixE.datos.forEach((c, k) => { if (c) { g.fillStyle = c; g.fillRect(k % 16, (k / 16) | 0, 1, 1); } }); }
function celdaPix(e) { const r = $('pixGrid').getBoundingClientRect(); const x = Math.floor((e.clientX - r.left) / r.width * 16), y = Math.floor((e.clientY - r.top) / r.height * 16); return x >= 0 && y >= 0 && x < 16 && y < 16 ? y * 16 + x : -1; }
function pintarPix(k) {
  if (k < 0) return;
  if (pixE.herr === 'lapiz') pixE.datos[k] = pixE.color;
  else if (pixE.herr === 'goma') pixE.datos[k] = null;
  else if (pixE.herr === 'gotero') { if (pixE.datos[k]) { pixE.color = pixE.datos[k]; $('pixColor').value = pixE.color; } pixE.herr = 'lapiz'; abrirHerr(); }
  else if (pixE.herr === 'balde') { const de = pixE.datos[k]; if (de === pixE.color) return; const pila = [k]; while (pila.length) { const c = pila.pop(); if (c < 0 || c > 255 || pixE.datos[c] !== de) continue; pixE.datos[c] = pixE.color; const x = c % 16; if (x > 0) pila.push(c - 1); if (x < 15) pila.push(c + 1); pila.push(c - 16, c + 16); } }
  dibujarPix();
}
function abrirHerr() { for (const d of $('pixHerr').children) d.classList.toggle('on', d.dataset.h === pixE.herr); }
$('pixGrid').addEventListener('pointerdown', e => { e.preventDefault(); pixE.pinta = true; try { $('pixGrid').setPointerCapture(e.pointerId); } catch (er) {} pintarPix(celdaPix(e)); });
$('pixGrid').addEventListener('pointermove', e => { if (pixE.pinta && (pixE.herr === 'lapiz' || pixE.herr === 'goma')) pintarPix(celdaPix(e)); });
for (const ev of ['pointerup', 'pointercancel']) $('pixGrid').addEventListener(ev, () => pixE.pinta = false);
$('pixPaleta').addEventListener('click', e => { const d = e.target.closest('[data-c]'); if (!d) return; pixE.color = d.dataset.c; $('pixColor').value = pixE.color; if (pixE.herr === 'goma' || pixE.herr === 'gotero') { pixE.herr = 'lapiz'; abrirHerr(); } for (const x of $('pixPaleta').children) x.classList.toggle('on', x === d); });
$('pixColor').addEventListener('input', e => { pixE.color = e.target.value; if (pixE.herr !== 'balde') pixE.herr = 'lapiz'; abrirHerr(); });
$('pixHerr').addEventListener('click', e => { const d = e.target.closest('[data-h]'); if (!d) return; pixE.herr = d.dataset.h; abrirHerr(); });
$('pixDureza').addEventListener('click', e => { const d = e.target.closest('[data-d]'); if (!d) return; pixE.dureza = +d.dataset.d; for (const x of $('pixDureza').children) x.classList.toggle('on', x === d); });
$('pixLimpiar').onclick = () => { pixE.datos = Array(256).fill(null); dibujarPix(); };
$('pixDesde').onchange = e => { const id = +e.target.value; if (!id || !DEF[id]) return; pixE.datos = leerTile(DEF[id].tiles[2]); dibujarPix(); e.target.value = ''; };
// lee un dibujo del atlas (si un mod lo cambió, usa el original)
function leerTile(t) { const d = (tilesOrig[t] || ag.getImageData((t % 8) * 16, Math.floor(t / 8) * 16, 16, 16)).data, o = [];
  for (let k = 0; k < 256; k++) o[k] = d[k * 4 + 3] < 128 ? null : '#' + [d[k * 4], d[k * 4 + 1], d[k * 4 + 2]].map(v => v.toString(16).padStart(2, '0')).join(''); return o; }
// lista de dibujos del juego que se pueden redibujar: "Pasto · arriba", "Piedra", "Palo"…
function listaTiles() {
  const vistos = new Set(), l = [];
  for (const id of TODOS) { const d = DEF[id]; if (id >= MOD_BASE || !d) { if (ITEM[id] && !vistos.has(ITEM[id].tile)) { vistos.add(ITEM[id].tile); l.push([TILES[ITEM[id].tile], nom(id)]); } continue; }
    const igual = d.tiles[0] === d.tiles[1] && d.tiles[1] === d.tiles[2];
    for (const k of [2, 0, 1]) { const t = d.tiles[k]; if (vistos.has(t) || t >= TILE_MOD0) continue; vistos.add(t); l.push([TILES[t], nom(id) + (igual ? '' : ' · ' + TR(['arriba', 'abajo', 'costado'][k]))]); } }
  for (const id in ITEM) { const t = ITEM[id].tile; if (!vistos.has(t)) { vistos.add(t); l.push([TILES[t], nom(+id)]); } }
  return l;
}
const nombreTile = n => (listaTiles().find(([x]) => x === n) || [n, n])[1];
$('pixListo').onclick = () => { if (pixE.textura) { modEd.texturas[pixE.textura] = pixE.datos.slice(); cerrar('pixEd'); pintarEditorMod(); abrir('modEd'); return; } const b = modEd.bloques[pixE.k] || {}; Object.assign(b, { nombre: $('pixNombre').value.trim() || 'Bloque', pix: pixE.datos.slice(), luz: $('pixLuz').checked, dureza: pixE.dureza }); modEd.bloques[pixE.k] = b; cerrar('pixEd'); pintarEditorMod(); abrir('modEd'); };
$('pixCerrar').onclick = () => { cerrar('pixEd'); pintarEditorMod(); abrir('modEd'); };

// ═════════ EDITOR DE CRIATURAS ═════════
const FORMA_TXT = { vaca: 'fVaca', oveja: 'fOveja', gallina: 'fGallina', ojon: 'fOjon' };
let criE = null, criK = 0, criVista = null;
function abrirCri(k) {
  criK = k; const base = 'vaca';
  criE = JSON.parse(JSON.stringify(modEd.criaturas[k] || { nombre: TR('nombreCriatura') + ' ' + (k + 1), base, c1: '#3f8eec', c2: '#35399d', tam: 1, hostil: false, vida: 1, rapida: false, suelta: ['', 1] }));
  $('criNombre').value = criE.nombre; pintarCri(); cerrar('modEd'); abrir('criEd'); vistaCri();
}
function pintarCri() {
  const c = criE, g = (k, ops) => `<div class="opcG" data-cc="${k}">${ops.map(([v, l]) => `<div data-v='${JSON.stringify(v)}' class="${JSON.stringify(c[k]) === JSON.stringify(v) ? 'on' : ''}">${TR(l)}</div>`).join('')}</div>`;
  const pal = k => `<div class="paleta" data-pal="${k}" style="grid-template-columns:repeat(12,20px)">${PALETA.map(x => `<div data-c="${x}" style="background:${x};width:20px;height:20px" class="${x === c[k] ? 'on' : ''}"></div>`).join('')}</div><input type="color" data-colin="${k}" value="${c[k]}" style="width:44px;height:26px;border:2px solid #000;padding:0;margin-top:3px">`;
  const ops = [['', 'nada']].concat([B.TIERRA, B.ARENA, B.MADERA, B.TELA, I.CARNE, I.POLLO, I.MANZANA, I.PAN, I.PALO, I.CARBON, I.HIERRO, I.ORO, I.CRISTAL, I.SEMILLAS, I.TRIGO_I].map(id => [id, nom(id)])).concat(modEd.bloques.map((b, k) => ['m:' + k, b.nombre]));
  $('criCuerpo').innerHTML = `<h4>${TR('forma')}</h4>` + g('base', Object.entries(FORMA_TXT)) + `<h4>${TR('colorCuerpo')}</h4>` + pal('c1') + `<h4>${TR('colorDetalle')}</h4>` + pal('c2') +
    `<h4>${TR('caracter')}</h4>` + g('hostil', [[false, 'amistosa'], [true, 'ataca']]) + `<h4>${TR('tamano')}</h4>` + g('tam', [[0, 'chico'], [1, 'normalD'], [2, 'grande']]) +
    `<h4>${TR('vidaC')}</h4>` + g('vida', [[0, 'poca'], [1, 'normalD'], [2, 'mucha']]) + `<h4>${TR('velocidad')}</h4>` + g('rapida', [[false, 'normalD'], [true, 'rapida']]) +
    `<h4>${TR('sueltaC')}</h4><select id="criSuelta">${ops.map(([v, l]) => `<option value="${v}" ${String(c.suelta[0]) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select> <select id="criSueltaN">${[1, 2, 3, 4].map(n => `<option ${c.suelta[1] === n ? 'selected' : ''}>${n}</option>`).join('')}</select>`;
}
$('criCuerpo').addEventListener('click', e => {
  let d = e.target.closest('[data-cc] [data-v]'); if (d) { criE[d.parentElement.dataset.cc] = JSON.parse(d.dataset.v); if (d.parentElement.dataset.cc === 'base') { const f = FORMA_BASE[criE.base]; criE.c1 = f.c1; criE.c2 = f.c2; } pintarCri(); vistaCri(); return; }
  d = e.target.closest('[data-pal] [data-c]'); if (d) { criE[d.parentElement.dataset.pal] = d.dataset.c; pintarCri(); vistaCri(); }
});
$('criCuerpo').addEventListener('input', e => { const k = e.target.dataset.colin; if (k) { criE[k] = e.target.value; vistaCri(); } });
$('criCuerpo').addEventListener('change', e => { if (e.target.id === 'criSuelta') criE.suelta[0] = e.target.value; if (e.target.id === 'criSueltaN') criE.suelta[1] = +e.target.value; if (e.target.dataset.colin) pintarCri(); });
$('criListo').onclick = () => { criE.nombre = $('criNombre').value.trim() || TR('nombreCriatura'); modEd.criaturas[criK] = criE; cerrarCri(); };
$('criCerrar').onclick = () => cerrarCri();
function cerrarCri() { cerrar('criEd'); if (criVista) criVista.on = false; pintarEditorMod(); abrir('modEd'); }
// vista 3D que gira
function vistaCri() {
  if (!criVista) { const r = new THREE.WebGLRenderer({ canvas: $('criVista'), antialias: true, alpha: true }); r.setPixelRatio(1); const e = new THREE.Scene(); e.add(new THREE.AmbientLight(0xffffff, .65)); const l = new THREE.DirectionalLight(0xffffff, .7); l.position.set(2, 4, 3); e.add(l);
    const cam = new THREE.PerspectiveCamera(35, 1, .1, 50); criVista = { r, e, cam, g: null, on: false }; }
  const v = criVista; if (v.g) v.e.remove(v.g);
  const t = tipoCriatura(criE, modEd), g = new THREE.Group(); t.armar(g); v.e.add(g); v.g = g;
  const al = t.al, d = 2.2 + al * 1.6; v.cam.position.set(0, al * .75 + .4, d); v.cam.lookAt(0, al * .45, 0);
  if (!v.on) { v.on = true; const giro = () => { if (!v.on) return; v.g.rotation.y += .02; v.r.render(v.e, v.cam); requestAnimationFrame(giro); }; giro(); }
}

// en aventura no se muestran las opciones del mundo
const pausaObs = new MutationObserver(() => { $('bOpcionesMundo').style.display = aventura() ? 'none' : ''; });
pausaObs.observe($('pausa'), { attributes: true, attributeFilter: ['hidden'] });
window.__m = { abrirCri, criE: () => criE, listaTiles, exportarMundo, empacar, desempacar, modsMundo: () => modsMundo, activarMod, quitarMod, guardarModLib, leerMods, carteles: () => carteles, mapa: () => mapa, llegarMeta, REG: () => REG, abrirEditorMod, abrirPix, pix: () => pixE, instalarMod, tieneMeta: () => tieneMeta };
