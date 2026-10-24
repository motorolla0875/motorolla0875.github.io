'use strict';
// ═════════ TIENDA: dragones raros, piezas de personaje, paquetes de skins y texturas, mascotas raras ═════════
// Por ahora todo se desbloquea mirando un anuncio corto. En la web es un anuncio de prueba;
// en la app, si existe window.mostrarAnuncioPremiado(cb), se usa ese (Unity Ads).

Object.assign(TX.es, {
  tienda: 'Tienda', tDragones: 'Dragones', tPersonaje: 'Personaje', tSkins: 'Skins', tTexturas: 'Texturas', tMascotas: 'Mascotas', tiendaAyuda: 'Todo se desbloquea gratis mirando un anuncio corto',
  desbloquear: 'Desbloquear', gratisHw: 'GRATIS POR HALLOWEEN', listo2: 'Desbloqueado', recibir: 'Recibir', llamar: 'Llamar', instalado: 'Está en Mis mods', usar: 'Usar', especial: 'Especial',
  pzAlas: 'Alas', pzCuernos: 'Cuernos', pzAura: 'Aura brillante', pzArmadura: 'Armadura', plata: 'Plata', oro: 'Oro', sMago: 'Mago', sBruja: 'Bruja', sVikingo: 'Vikingo', sCalabaza: 'Calabaza', pzMago: 'Sombrero de mago', pzBruja: 'Sombrero de bruja', pzVikingo: 'Casco vikingo', pzCalabaza: 'Cabeza de calabaza',
  huevoDorado: 'Dragón dorado', huevoCristal: 'Dragón de cristal', dHuevo: 'Un huevo que nace en un dragón único', dPieza: 'Para tus personajes', dPack: '3 personajes listos para usar o copiar', dTex: 'Cambia cómo se ven los bloques; actívalo en Opciones del mundo', dMascota: 'Una mascota que te sigue a todos lados',
  packDragones: 'Pack Dragones', packZombis: 'Pack Zombis', packCaballeros: 'Pack Caballeros', packHalloween: 'Pack Halloween', packKawaii: 'Pack Kawaii', texPastel: 'Texturas Pastel', texMedieval: 'Texturas Medievales', texNeon: 'Texturas Neón', texCiudad: 'Texturas Ciudad', zorro: 'Zorro', panda: 'Panda', miniojon: 'Mini Ojón',
  anuncioPrueba: 'ANUNCIO DE PRUEBA', anuncioPruebaTxt: 'En la app acá se ve un video corto', desbloqueadoOk: '¡DESBLOQUEADO!', entraMundo: 'ENTRA A UN MUNDO PRIMERO', recibido: 'YA LO TIENES EN LA BARRA',
  sk_jinete: 'Jinete de dragón', sk_dragona: 'Dragona', sk_fuego: 'Domador de fuego', sk_zombi: 'Zombi', sk_zombiCocinero: 'Zombi cocinero', sk_cazador: 'Cazador de zombis', sk_caballero: 'Caballero', sk_vikinga: 'Vikinga', sk_rey: 'Rey',
  sk_calabaza: 'Cabeza de calabaza', sk_bruja: 'Bruja', sk_vampiro: 'Vampiro', sk_gatita: 'Gatita', sk_nube: 'Nube', sk_frutilla: 'Frutilla',
});
Object.assign(TX.en, {
  tienda: 'Shop', tDragones: 'Dragons', tPersonaje: 'Character', tSkins: 'Skins', tTexturas: 'Textures', tMascotas: 'Pets', tiendaAyuda: 'Everything unlocks for free by watching a short ad',
  desbloquear: 'Unlock', gratisHw: 'FREE FOR HALLOWEEN', listo2: 'Unlocked', recibir: 'Get', llamar: 'Call', instalado: 'In My mods', usar: 'Use', especial: 'Special',
  pzAlas: 'Wings', pzCuernos: 'Horns', pzAura: 'Glowing aura', pzArmadura: 'Armor', plata: 'Silver', oro: 'Gold', sMago: 'Wizard', sBruja: 'Witch', sVikingo: 'Viking', sCalabaza: 'Pumpkin', pzMago: 'Wizard hat', pzBruja: 'Witch hat', pzVikingo: 'Viking helmet', pzCalabaza: 'Pumpkin head',
  huevoDorado: 'Golden dragon', huevoCristal: 'Crystal dragon', dHuevo: 'An egg that hatches into a unique dragon', dPieza: 'For your characters', dPack: '3 ready-to-use characters you can also copy', dTex: 'Changes how blocks look; turn it on in World options', dMascota: 'A pet that follows you everywhere',
  packDragones: 'Dragons Pack', packZombis: 'Zombies Pack', packCaballeros: 'Knights Pack', packHalloween: 'Halloween Pack', packKawaii: 'Kawaii Pack', texPastel: 'Pastel Textures', texMedieval: 'Medieval Textures', texNeon: 'Neon Textures', texCiudad: 'City Textures', zorro: 'Fox', panda: 'Panda', miniojon: 'Mini Big Eye',
  anuncioPrueba: 'TEST AD', anuncioPruebaTxt: 'In the app a short video plays here', desbloqueadoOk: 'UNLOCKED!', entraMundo: 'ENTER A WORLD FIRST', recibido: "IT'S IN YOUR HOTBAR",
  sk_jinete: 'Dragon rider', sk_dragona: 'Dragon girl', sk_fuego: 'Fire tamer', sk_zombi: 'Zombie', sk_zombiCocinero: 'Zombie chef', sk_cazador: 'Zombie hunter', sk_caballero: 'Knight', sk_vikinga: 'Viking girl', sk_rey: 'King',
  sk_calabaza: 'Pumpkin head', sk_bruja: 'Witch', sk_vampiro: 'Vampire', sk_gatita: 'Kitty', sk_nube: 'Cloud', sk_frutilla: 'Strawberry',
});
Object.assign(TX.pt, {
  tienda: 'Loja', tDragones: 'Dragões', tPersonaje: 'Personagem', tSkins: 'Skins', tTexturas: 'Texturas', tMascotas: 'Bichinhos', tiendaAyuda: 'Tudo se desbloqueia grátis assistindo um anúncio curto',
  desbloquear: 'Desbloquear', gratisHw: 'GRÁTIS NO HALLOWEEN', listo2: 'Desbloqueado', recibir: 'Receber', llamar: 'Chamar', instalado: 'Está em Meus mods', usar: 'Usar', especial: 'Especial',
  pzAlas: 'Asas', pzCuernos: 'Chifres', pzAura: 'Aura brilhante', pzArmadura: 'Armadura', plata: 'Prata', oro: 'Ouro', sMago: 'Mago', sBruja: 'Bruxa', sVikingo: 'Viking', sCalabaza: 'Abóbora', pzMago: 'Chapéu de mago', pzBruja: 'Chapéu de bruxa', pzVikingo: 'Capacete viking', pzCalabaza: 'Cabeça de abóbora',
  huevoDorado: 'Dragão dourado', huevoCristal: 'Dragão de cristal', dHuevo: 'Um ovo que nasce como um dragão único', dPieza: 'Para seus personagens', dPack: '3 personagens prontos para usar ou copiar', dTex: 'Muda o visual dos blocos; ative em Opções do mundo', dMascota: 'Um bichinho que te segue por todo lado',
  packDragones: 'Pacote Dragões', packZombis: 'Pacote Zumbis', packCaballeros: 'Pacote Cavaleiros', packHalloween: 'Pacote Halloween', packKawaii: 'Pacote Kawaii', texPastel: 'Texturas Pastel', texMedieval: 'Texturas Medievais', texNeon: 'Texturas Neon', texCiudad: 'Texturas Cidade', zorro: 'Raposa', panda: 'Panda', miniojon: 'Mini Olhão',
  anuncioPrueba: 'ANÚNCIO DE TESTE', anuncioPruebaTxt: 'No app aqui passa um vídeo curto', desbloqueadoOk: 'DESBLOQUEADO!', entraMundo: 'ENTRE EM UM MUNDO PRIMEIRO', recibido: 'JÁ ESTÁ NA SUA BARRA',
  sk_jinete: 'Cavaleiro de dragão', sk_dragona: 'Dragoa', sk_fuego: 'Domador de fogo', sk_zombi: 'Zumbi', sk_zombiCocinero: 'Zumbi cozinheiro', sk_cazador: 'Caçador de zumbis', sk_caballero: 'Cavaleiro', sk_vikinga: 'Viking', sk_rey: 'Rei',
  sk_calabaza: 'Cabeça de abóbora', sk_bruja: 'Bruxa', sk_vampiro: 'Vampiro', sk_gatita: 'Gatinha', sk_nube: 'Nuvem', sk_frutilla: 'Morango',
});

// ───── qué hay en la tienda ─────
const PACKS = {
  packDragones: [{ id: 'p_jinete', base: 'sk_jinete', piel: '#e0ac80', pelo: '#5a3418', remera: '#a12722', pantalon: '#3a2a20', zapatos: '#1d1d21', peinado: 'corto', sombrero: 'vikingo', capa: '#d42a2a', armadura: 'plata' },
    { id: 'p_dragona', base: 'sk_dragona', piel: '#9fe08a', pelo: '#2f6f22', remera: '#2fb65a', pantalon: '#2f6f22', zapatos: '#1d1d21', peinado: 'largo', cuernos: '#ffd23a', alas: '#36c95a', mejillas: 1 },
    { id: 'p_fuego', base: 'sk_fuego', piel: '#f2c9a0', pelo: '#e03a2a', remera: '#1d1d21', pantalon: '#7a1414', zapatos: '#1d1d21', peinado: 'puntas', alas: '#e03a2a', aura: '#ff4a78' }],
  packZombis: [{ id: 'p_zombi', base: 'sk_zombi', piel: '#7ab85a', pelo: '#3a5a2a', remera: '#2f8a8a', pantalon: '#4a3a7a', zapatos: '#3a2a20', peinado: 'corto' },
    { id: 'p_zcocinero', base: 'sk_zombiCocinero', piel: '#7ab85a', pelo: '#3a5a2a', remera: '#ffffff', pantalon: '#3f3f3f', zapatos: '#1d1d21', peinado: 'pelado', sombrero: 'gorra', sombreroC: '#ffffff' },
    { id: 'p_cazador', base: 'sk_cazador', piel: '#c98a5a', pelo: '#1d1d21', remera: '#6b4a26', pantalon: '#3a3a3a', zapatos: '#1d1d21', peinado: 'corto', sombrero: 'gorra', sombreroC: '#2f6f22', lentes: '#14142a', mochila: '#6b4a26', overol: 1 }],
  packCaballeros: [{ id: 'p_caballero', base: 'sk_caballero', piel: '#f2c9a0', pelo: '#8a5232', remera: '#3a5ad8', pantalon: '#3f3f3f', zapatos: '#3f3f3f', peinado: 'corto', armadura: 'plata', capa: '#3a5ad8' },
    { id: 'p_vikinga', base: 'sk_vikinga', piel: '#ffe0c4', pelo: '#f5d36a', remera: '#7a1414', pantalon: '#6b4a26', zapatos: '#3a2a20', peinado: 'largo', sombrero: 'vikingo', capa: '#6b4a26' },
    { id: 'p_rey', base: 'sk_rey', piel: '#e0ac80', pelo: '#f2f2f2', remera: '#7e2fbe', pantalon: '#35399d', zapatos: '#1d1d21', peinado: 'corto', sombrero: 'corona', capa: '#d42a2a', armadura: 'oro' }],
  packHalloween: [{ id: 'p_calabaza', base: 'sk_calabaza', piel: '#f2c9a0', pelo: '#1d1d21', remera: '#ff9a2e', pantalon: '#1d1d21', zapatos: '#1d1d21', peinado: 'pelado', sombrero: 'calabaza' },
    { id: 'p_bruja', base: 'sk_bruja', piel: '#9fe08a', pelo: '#1d1d21', remera: '#7e2fbe', pantalon: '#1d1d21', zapatos: '#1d1d21', peinado: 'largo', sombrero: 'bruja', sombreroC: '#ff9a2e', capa: '#7e2fbe' },
    { id: 'p_vampiro', base: 'sk_vampiro', piel: '#f2f2f2', pelo: '#1d1d21', remera: '#1d1d21', pantalon: '#1d1d21', zapatos: '#7a1414', peinado: 'corto', flequillo: 1, capa: '#7a1414' }],
  packKawaii: [{ id: 'p_gatita', base: 'sk_gatita', piel: '#ffe0c4', pelo: '#ff8ab8', remera: '#ffffff', pantalon: '#ff8ab8', zapatos: '#ffffff', peinado: 'largo', sombrero: 'orejas', sombreroC: '#ff8ab8', mejillas: 1 },
    { id: 'p_nube', base: 'sk_nube', piel: '#ffe0c4', pelo: '#ffffff', remera: '#8fdcff', pantalon: '#ffffff', zapatos: '#8fdcff', peinado: 'puntas', alas: '#ffffff', mejillas: 1 },
    { id: 'p_frutilla', base: 'sk_frutilla', piel: '#f2c9a0', pelo: '#e03a2a', remera: '#e03a2a', pantalon: '#36c95a', zapatos: '#ffffff', peinado: 'cola', sombrero: 'gorra', sombreroC: '#36c95a', mejillas: 1 }],
};
const CATALOGO = [
  { id: 'huevoDorado', tab: 'tDragones', desc: 'dHuevo', huevo: 3 }, { id: 'huevoCristal', tab: 'tDragones', desc: 'dHuevo', huevo: 4 },
  ...['pzAlas', 'pzCuernos', 'pzAura', 'pzArmadura', 'pzMago', 'pzVikingo'].map(id => ({ id, tab: 'tPersonaje', desc: 'dPieza' })),
  { id: 'pzBruja', tab: 'tPersonaje', desc: 'dPieza', hw: 1 }, { id: 'pzCalabaza', tab: 'tPersonaje', desc: 'dPieza', hw: 1 },
  ...Object.keys(PACKS).map(id => ({ id, tab: 'tSkins', desc: 'dPack', hw: id === 'packHalloween' })),
  ...['texPastel', 'texMedieval', 'texNeon', 'texCiudad'].map(id => ({ id, tab: 'tTexturas', desc: 'dTex' })),
  { id: 'zorro', tab: 'tMascotas', desc: 'dMascota' }, { id: 'panda', tab: 'tMascotas', desc: 'dMascota' }, { id: 'miniojon', tab: 'tMascotas', desc: 'dMascota' },
];
const leerDesb = () => { try { return new Set(JSON.parse(localStorage.getItem('voxDesbloq') || '[]')); } catch (e) { return new Set(); } };
const esHw = () => typeof esHalloween === 'function' && esHalloween();
function desbloqueado(id) { const c = CATALOGO.find(x => x.id === id); return leerDesb().has(id) || !!(c && c.hw && esHw()); }
function marcar(id) { const s = leerDesb(); s.add(id); try { localStorage.setItem('voxDesbloq', JSON.stringify([...s])); } catch (e) {} alActivar(id); }
function skinsTienda() { const l = []; for (const k in PACKS) if (desbloqueado(k)) l.push(...PACKS[k]); return l; }
// lo que se activa al desbloquear (y al abrir el juego, para lo ya desbloqueado)
function alActivar(id) {
  const c = CATALOGO.find(x => x.id === id); if (!c) return;
  if (c.huevo != null && !TODOS.includes(B.HUEVO + c.huevo)) TODOS.splice(TODOS.indexOf(B.HUEVO + 2) + 1, 0, B.HUEVO + c.huevo);
  if (c.tab === 'tTexturas' && !leerMods().some(m => m.id === 'tp_' + id)) guardarModLib({ id: 'tp_' + id, nombre: TR(id), ver: 1, bloques: [], texturas: paqueteTexturas(id), reglas: {}, criaturas: [] });
}
for (const c of CATALOGO) if (desbloqueado(c.id)) alActivar(c.id);

// ───── paquetes de texturas: se arman a partir de los dibujos del juego ─────
const aRGB = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const aHex = (r, g, b) => '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const CIUDAD = {
  pastoArriba: (x, y) => (x % 8 === 0 || y % 8 === 0) ? '#9aa0aa' : ((x * 7 + y * 3) % 11 === 0 ? '#c4c8d0' : '#b8bcc6'),
  pastoCostado: (x, y) => y < 3 ? '#b8bcc6' : y === 3 ? '#8a909a' : ((x * 5 + y) % 9 === 0 ? '#6a707a' : '#7c828c'),
  tierra: (x, y) => ((x * 5 + y) % 9 === 0 ? '#6a707a' : '#7c828c'),
  piedra: (x, y) => ((x * 13 + y * 7) % 17 === 0 ? '#5a5e66' : (x * 3 + y * 11) % 13 === 0 ? '#2a2c32' : '#3a3d44'),
  arena: (x, y) => (x % 4 === 0 || y % 4 === 0) ? '#e8dcc0' : '#f6ecd4',
  madera: (x, y) => y % 4 === 3 ? '#c8ccd4' : '#f4f6fa', maderaO: (x, y) => y % 4 === 3 ? '#1d1d21' : '#3a3d44', maderaC: (x, y) => y % 4 === 3 ? '#d8c8a8' : '#f0e4c8',
  troncoCostado: (x, y) => x % 4 === 0 ? '#5a5e66' : '#9aa0aa', troncoCostadoH: (x, y) => y % 4 === 0 ? '#5a5e66' : '#9aa0aa', troncoArriba: (x, y) => (x === 0 || y === 0 || x === 15 || y === 15) ? '#5a5e66' : '#9aa0aa',
  ladrillo: (x, y) => (y % 4 === 3 || (x + (Math.floor(y / 4) % 2 ? 4 : 0)) % 8 === 7) ? '#e8e8ec' : (x + y) % 5 ? '#b84a3a' : '#a8402f',
  adoquin: (x, y) => (x % 8 === 0 || y % 8 === 0) ? '#2a2c32' : '#4a4e56', ladrilloP: (x, y) => (x % 16 === 0 || y % 8 === 0) ? '#5a5e66' : '#8a909a',
  vidrio: (x, y) => (x === 0 || y === 0 || x === 15 || y === 15) ? '#3a3d44' : (x === y + 3 ? '#ffffff' : null),
  agua: (x, y) => (y % 5 === 1 && x % 6 < 3) ? '#bff4ff' : '#35b8f0',
};
function paqueteTexturas(id) {
  if (id === 'texCiudad') { const out = {}; for (const n in CIUDAD) { if (TL[n] == null) continue; const p = []; for (let k = 0; k < 256; k++) p.push(CIUDAD[n](k % 16, k >> 4)); out[n] = p; } return out; }
  const out = {}, NEON = { pasto: '#6cff5a', tierra: '#ff9a2e', piedra: '#3af0ff', arena: '#ffe14a', tronco: '#ff4adc', madera: '#ff4adc', hojas: '#6cff5a', ladrillo: '#ff4a78', agua: '#3a8aff' };
  for (const n of BISEL.concat(['hojas', 'agua'])) { const t = TL[n]; if (t == null) continue; const pix = leerTile(t), neon = NEON[Object.keys(NEON).find(k => n.toLowerCase().includes(k))] || '#c58cf5';
    out[n] = pix.map((c, k) => { if (!c) return null; const [r, g, b] = aRGB(c), x = k % 16, y = k >> 4, gris = (r + g + b) / 3;
      if (id === 'texPastel') return aHex(r * .55 + 255 * .45, g * .55 + 235 * .45, b * .55 + 245 * .45);
      if (id === 'texMedieval') return aHex((r * .6 + gris * .4) * .82 + 14, (g * .6 + gris * .4) * .8 + 6, (b * .6 + gris * .4) * .74);
      const borde = x === 0 || y === 0 || x === 15 || y === 15; if (borde) return neon; const [nr, ng, nb] = aRGB(neon); return aHex(r * .16 + nr * .06, g * .16 + ng * .06, b * .16 + nb * .08 + 10); }); }
  return out;
}

// ───── anuncio para desbloquear ─────
cap('anuncioCapa', '<div class="titulo" style="font-size:clamp(22px,4vw,34px)" data-i="anuncioPrueba"></div><div class="texto" data-i="anuncioPruebaTxt"></div><div class="titulo" id="anuncioCuenta" style="font-size:60px">3</div>', false);
function verAnuncio(cb) {
  if (typeof window.mostrarAnuncioPremiado === 'function') return window.mostrarAnuncioPremiado(ok => { if (ok) cb(); });
  abrir('anuncioCapa'); let n = 3; $('anuncioCuenta').textContent = n; const t = setInterval(() => { n--; $('anuncioCuenta').textContent = n; if (n <= 0) { clearInterval(t); cerrar('anuncioCapa'); cb(); } }, 700);
}

// ───── pantalla de la tienda ─────
{ const st = document.createElement('style'); st.textContent = `
  #tiendaGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
  .tCard { background: #fff; border: 2px solid #c9d0ee; border-radius: 12px; padding: 6px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 3px; }
  .tCard img, .tCard .tImg { width: 92px; height: 92px; border-radius: 10px; background: linear-gradient(#8fc4ef, #cfe8ff); image-rendering: auto; object-fit: contain; }
  .tCard b { font-size: 14px; } .tCard small { font-size: 11px; color: #5a6aa8; line-height: 1.2; min-height: 26px; }
  .tCard .mb { width: 100%; text-align: center; } .tCard .hw { font-size: 10px; color: #fff; background: #ff8a2e; border-radius: 6px; padding: 0 6px; }
  #anuncioCapa { background: #0d153d; }
`; document.head.appendChild(st); }
cap('tiendaCapa', '<div class="mVentana" style="width:min(860px,97vw)"><div class="vCab" id="tiendaTabs"></div><div class="vCuerpo"><div style="font-size:12px;margin-bottom:6px" data-i="tiendaAyuda"></div><div id="tiendaGrid"></div></div></div>');
aplicarIdioma();
let tiendaTab = 'tDragones', tiendaVolver = null;
function abrirTienda(foco, volver) {
  tiendaVolver = volver || null; if (volver) cerrar(volver);
  const c = CATALOGO.find(x => x.id === foco); if (c) tiendaTab = c.tab; else if (foco && foco.startsWith('t')) tiendaTab = foco;
  pintarTienda(); abrir('tiendaCapa');
}
function pintarTienda() {
  $('tiendaTabs').innerHTML = `<div class="vTit">${TR('tienda')}</div>` + ['tDragones', 'tPersonaje', 'tSkins', 'tTexturas', 'tMascotas'].map(t => `<div class="tab${t === tiendaTab ? ' on' : ''}" data-tab="${t}">${TR(t)}</div>`).join('') + '<div class="cerrar" id="tiendaCerrar">X</div>';
  $('tiendaGrid').innerHTML = CATALOGO.filter(c => c.tab === tiendaTab).map(c => { const ok = desbloqueado(c.id);
    const accion = !ok ? `<div class="mb verde" data-desb="${c.id}">${TR('desbloquear')}</div>` : c.huevo != null ? `<div class="mb" data-recibir="${c.id}">${TR('recibir')}</div>` : c.tab === 'tMascotas' ? `<div class="mb" data-llamar="${c.id}">${TR('llamar')}</div>` : c.tab === 'tTexturas' ? `<div class="mb" style="background:#7c86ad">${TR('instalado')}</div>` : c.tab === 'tSkins' || c.tab === 'tPersonaje' ? `<div class="mb" data-personaje="1">${TR('usar')}</div>` : '';
    return `<div class="tCard"><img src="${fotoItem(c)}" alt=""><b>${TR(c.huevo != null ? c.id : c.id)}</b>${c.hw && esHw() && !leerDesb().has(c.id) ? `<span class="hw">${TR('gratisHw')}</span>` : ''}<small>${TR(c.desc)}</small>${accion}</div>`; }).join('');
}
$('tiendaCapa').addEventListener('click', e => {
  const q = s => e.target.closest(s); let d;
  if (q('#tiendaCerrar')) { cerrar('tiendaCapa'); if (tiendaVolver === 'skinCapa') { pintarSkins(); vistaSkin(); } if (tiendaVolver) abrir(tiendaVolver); }
  else if (d = q('[data-tab]')) { tiendaTab = d.dataset.tab; pintarTienda(); }
  else if (d = q('[data-desb]')) { const id = d.dataset.desb; verAnuncio(() => { marcar(id); aviso(TR('desbloqueadoOk'), 1400); sonar('final', .6) || son(880, .3, 'triangle', .12); pintarTienda(); }); }
  else if (d = q('[data-recibir]')) { if (!jugando) return aviso(TR('entraMundo'), 1400); const c = CATALOGO.find(x => x.id === d.dataset.recibir), id = B.HUEVO + c.huevo;
    if (!creativo()) darItem(id, 1); let k = barra.indexOf(id); if (k < 0) { k = barra.indexOf(0); if (k < 0) k = sel; barra[k] = id; } sel = k; pintarBarra(); aviso(TR('recibido'), 1400); }
  else if (d = q('[data-llamar]')) { if (!jugando) return aviso(TR('entraMundo'), 1400); const a = nuevaMascota(d.dataset.llamar, J.x + Math.sin(J.yaw + Math.PI) * 2, J.y + .2, J.z + Math.cos(J.yaw + Math.PI) * 2); voz(TIPOS[a.userData.animal].voz, 0); sucio = true; cerrar('tiendaCapa'); if (tiendaVolver) abrir(tiendaVolver); }
  else if (q('[data-personaje]')) { cerrar('tiendaCapa'); if (tiendaVolver === 'skinCapa') { abrir('skinCapa'); pintarSkins(); vistaSkin(); } else abrirSkins(tiendaVolver); }
});

// ───── fotos de la tienda (se dibujan una vez con three.js) ─────
const fotos = {}; let fotoR = null;
function fotoItem(c) {
  if (fotos[c.id]) return fotos[c.id];
  if (c.huevo != null) return fotos[c.id] = tileURL(TL['huevo' + c.huevo]);
  if (c.tab === 'tTexturas') { const cv = document.createElement('canvas'); cv.width = cv.height = 48; const g = cv.getContext('2d'), tx = paqueteTexturas(c.id); ['pastoCostado', 'piedra', 'madera', 'ladrillo', 'pastoArriba', 'arena', 'troncoCostado', 'hojas', 'agua'].forEach((n, k) => { const p = tx[n]; if (!p) return; p.forEach((col, i) => { if (col) { g.fillStyle = col; g.fillRect((k % 3) * 16 + i % 16, Math.floor(k / 3) * 16 + (i >> 4), 1, 1); } }); }); return fotos[c.id] = cv.toDataURL(); }
  if (!fotoR) { fotoR = { r: new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }), e: new THREE.Scene(), c: new THREE.PerspectiveCamera(30, 1, .1, 50) }; fotoR.r.setSize(160, 160); fotoR.r.setPixelRatio(1); fotoR.e.add(new THREE.AmbientLight(0xffffff, .65)); const l = new THREE.DirectionalLight(0xffffff, .7); l.position.set(2, 4, 3); fotoR.e.add(l); }
  let g, alto = 1.8;
  if (c.tab === 'tMascotas') { g = new THREE.Group(); TIPOS[c.id].armar(g); alto = 1.1; }
  else { const base = { piel: '#f2c9a0', pelo: '#5a3418', remera: '#3a5ad8', pantalon: '#1d1d21', zapatos: '#3a2a20', peinado: 'corto' };
    const P = c.tab === 'tSkins' ? PACKS[c.id][0] : Object.assign(base, { pzAlas: { alas: '#8fdcff' }, pzCuernos: { cuernos: '#e03a2a' }, pzAura: { aura: '#ffe14a' }, pzArmadura: { armadura: 'oro' }, pzMago: { sombrero: 'mago' }, pzVikingo: { sombrero: 'vikingo' }, pzBruja: { sombrero: 'bruja', sombreroC: '#ff9a2e' }, pzCalabaza: { sombrero: 'calabaza' } }[c.id] || {});
    g = armarPersonaje(P); g.rotation.y = c.id === 'pzAlas' ? 2.6 : .5; if (g.userData.alas) { g.userData.alas[0].rotation.y = -.6; g.userData.alas[1].rotation.y = .6; } }
  fotoR.e.add(g); fotoR.c.position.set(0, alto * .6, alto * 2.1 + 1); fotoR.c.lookAt(0, alto * .48, 0); fotoR.r.render(fotoR.e, fotoR.c); const url = fotoR.r.domElement.toDataURL(); fotoR.e.remove(g);
  return fotos[c.id] = url;
}

// ───── botones para entrar: menú principal y pausa ─────
{ const ini = $('inicio'), fila = (a, b) => { const f = document.createElement('div'); f.className = 'filaBtn'; f.append(a, b); return f; };
  const bPj = document.createElement('div'); bPj.className = 'btn'; bPj.id = 'bPersonajeHome'; bPj.dataset.i = 'personaje'; bPj.onclick = () => abrirSkins('inicio');
  const bTi = document.createElement('div'); bTi.className = 'btn'; bTi.id = 'bTiendaHome'; bTi.dataset.i = 'tienda'; bTi.style.background = 'linear-gradient(#ffd23a,#f5a62a)'; bTi.style.color = '#1b2a6b'; bTi.style.textShadow = 'none'; bTi.onclick = () => abrirTienda(null, 'inicio');
  ini.insertBefore(fila(bPj, bTi), $('bAjustes1')); ini.insertBefore(fila($('bModsHome'), $('bAjustes1')), $('bCreditos'));
  const bT2 = document.createElement('div'); bT2.className = 'btn'; bT2.id = 'bTiendaPausa'; bT2.dataset.i = 'tienda'; bT2.onclick = () => abrirTienda(null, 'pausa');
  const bP2 = document.createElement('div'); bP2.className = 'btn'; bP2.id = 'bPersonajePausa'; bP2.dataset.i = 'personaje'; bP2.onclick = () => abrirSkins('pausa');
  $('pausa').insertBefore(fila(bP2, bT2), $('bVideo'));
  aplicarIdioma(); }
window.__t = { abrirTienda, desbloqueado, marcar, CATALOGO, paqueteTexturas, skinsTienda };
