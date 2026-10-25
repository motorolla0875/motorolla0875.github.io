'use strict';
// ═════════ MAPAS DE LA COMUNIDAD: ver, descargar y subir mapas ═════════
// Los mapas están en el servidor de Voxelium (dmith.app). Los que sube la gente se publican
// recién cuando el dueño del juego los aprueba.

Object.assign(TX.es, { mapasBtn: 'Mapas<small>descarga mapas de otros jugadores</small>', mapasTit: 'Mapas', mapasNuevos: 'Nuevos', mapasPopulares: 'Populares', mapasVacio: 'Todavía no hay mapas publicados. ¡Sube el primero desde la pausa de tu mundo!',
  mapasCargando: 'Cargando mapas…', mapasError: 'No se pudo conectar. Revisa tu internet.', descargas: '{n} descargas', jugarMapa: 'Descargar y jugar', descargando: 'DESCARGANDO MAPA…', mapaListo: '¡MAPA DESCARGADO!',
  subirMapaBtn: 'Subir a Mapas', subirTit: 'Subir mi mapa', subirNombre: 'Nombre del mapa', subirDesc: 'Cuéntale a los demás de qué se trata (opcional)', subirEnviar: 'Enviar', subirNota: 'Lo revisamos antes de publicarlo. Se publica con tu nombre de jugador: {n}',
  subiendo: 'SUBIENDO…', subidoOk: '¡MAPA ENVIADO!<small>cuando lo aprobemos aparece en Mapas</small>', subidoEspera: 'ESPERA UN MINUTO ANTES DE SUBIR OTRO', subidoGrande: 'EL MAPA ES DEMASIADO GRANDE', subidoMal: 'NO SE PUDO SUBIR', nombreCorto: 'PONLE UN NOMBRE (3 LETRAS O MÁS)',
  tipoMapaSky: 'SkyBlock', tipoMapaParkour: 'Parkour', tipoMapaPlano: 'Superplano', modoMapaAventura: 'Aventura' });
Object.assign(TX.en, { mapasBtn: 'Maps<small>download maps from other players</small>', mapasTit: 'Maps', mapasNuevos: 'New', mapasPopulares: 'Popular', mapasVacio: 'No maps published yet. Upload the first one from your world\'s pause menu!',
  mapasCargando: 'Loading maps…', mapasError: 'Could not connect. Check your internet.', descargas: '{n} downloads', jugarMapa: 'Download and play', descargando: 'DOWNLOADING MAP…', mapaListo: 'MAP DOWNLOADED!',
  subirMapaBtn: 'Upload to Maps', subirTit: 'Upload my map', subirNombre: 'Map name', subirDesc: 'Tell others what it is about (optional)', subirEnviar: 'Send', subirNota: 'We review it before publishing. It is published with your player name: {n}',
  subiendo: 'UPLOADING…', subidoOk: 'MAP SENT!<small>it shows up in Maps once approved</small>', subidoEspera: 'WAIT A MINUTE BEFORE UPLOADING ANOTHER', subidoGrande: 'THE MAP IS TOO BIG', subidoMal: 'COULD NOT UPLOAD', nombreCorto: 'GIVE IT A NAME (3 LETTERS OR MORE)',
  tipoMapaSky: 'SkyBlock', tipoMapaParkour: 'Parkour', tipoMapaPlano: 'Superflat', modoMapaAventura: 'Adventure' });
Object.assign(TX.pt, { mapasBtn: 'Mapas<small>baixe mapas de outros jogadores</small>', mapasTit: 'Mapas', mapasNuevos: 'Novos', mapasPopulares: 'Populares', mapasVacio: 'Ainda não há mapas publicados. Envie o primeiro pela pausa do seu mundo!',
  mapasCargando: 'Carregando mapas…', mapasError: 'Não foi possível conectar. Verifique sua internet.', descargas: '{n} downloads', jugarMapa: 'Baixar e jogar', descargando: 'BAIXANDO MAPA…', mapaListo: 'MAPA BAIXADO!',
  subirMapaBtn: 'Enviar para Mapas', subirTit: 'Enviar meu mapa', subirNombre: 'Nome do mapa', subirDesc: 'Conte aos outros do que se trata (opcional)', subirEnviar: 'Enviar', subirNota: 'Revisamos antes de publicar. É publicado com seu nome de jogador: {n}',
  subiendo: 'ENVIANDO…', subidoOk: 'MAPA ENVIADO!<small>aparece em Mapas quando for aprovado</small>', subidoEspera: 'ESPERE UM MINUTO ANTES DE ENVIAR OUTRO', subidoGrande: 'O MAPA É GRANDE DEMAIS', subidoMal: 'NÃO FOI POSSÍVEL ENVIAR', nombreCorto: 'DÊ UM NOME (3 LETRAS OU MAIS)',
  tipoMapaSky: 'SkyBlock', tipoMapaParkour: 'Parkour', tipoMapaPlano: 'Superplano', modoMapaAventura: 'Aventura' });

{ const st = document.createElement('style'); st.textContent = `
  #bMapas { background: linear-gradient(#b07cff, #6a3fd0) !important; }
  #mapasCapa .ventana, #subirCapa .ventana { max-width: 820px; width: 94vw; max-height: 92vh; display: flex; flex-direction: column; }
  #mapasTabs { display: flex; gap: 6px; padding: 8px 12px 0; }
  #mapasTabs .mb, #subirCapa .mb { padding: 6px 14px; border-radius: 10px; background: #e8ebf7; border: 2px solid #d5dbf3; font-weight: 800; font-size: 13px; color: #1b2a6b; cursor: pointer; }
  #mapasTabs .mb.on { background: #ffd23a; border-color: #c8841a; }
  #mapasGrilla { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; padding: 10px 12px 12px; overflow: auto; }
  .mapaT { background: #fff; border: 2px solid #d5dbf3; border-radius: 12px; overflow: hidden; cursor: pointer; display: flex; flex-direction: column; }
  .mapaT img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; background: #9db7e8; display: block; }
  .mapaT .n { font-weight: 800; font-size: 14px; color: #1b2a6b; padding: 5px 8px 0; line-height: 1.15; } .mapaT .a { font-size: 11px; color: #5a6aa8; font-weight: 700; padding: 1px 8px 7px; }
  #mapasMsg { padding: 16px; text-align: center; font-weight: 700; color: #5a6aa8; }
  #mapaDet { display: flex; gap: 12px; padding: 12px; overflow: auto; flex-wrap: wrap; } #mapaDet img { width: min(420px, 100%); border-radius: 10px; aspect-ratio: 16 / 9; object-fit: cover; background: #9db7e8; }
  #mapaDet .info { flex: 1; min-width: 200px; color: #1b2a6b; } #mapaDet .btn { width: 100%; max-width: 100%; box-sizing: border-box; } #mapaDet .info b { font-size: 20px; display: block; } #mapaDet .info small { display: block; color: #5a6aa8; font-weight: 700; margin: 2px 0 8px; } #mapaDet .info p { margin: 0 0 12px; font-weight: 600; white-space: pre-wrap; }
  #subirCuerpo { display: flex; gap: 12px; padding: 12px; overflow: auto; flex-wrap: wrap; color: #1b2a6b; } #subirFoto { width: min(380px, 100%); border-radius: 10px; aspect-ratio: 16 / 9; object-fit: cover; background: #9db7e8; }
  #subirCuerpo .campos { flex: 1; min-width: 220px; display: flex; flex-direction: column; gap: 6px; font-weight: 700; font-size: 13px; }
  #subirCuerpo input, #subirCuerpo textarea { font: inherit; font-size: 16px; padding: 8px 10px; border: 2px solid #c5cdee; border-radius: 10px; color: #1b2a6b; background: #fff; }
  #subirCuerpo textarea { min-height: 70px; resize: none; } #subirCuerpo .nota { font-size: 12px; color: #5a6aa8; font-weight: 600; }
`; document.head.appendChild(st); }

const urlMapas = () => { let u = 'wss://dmith.app/voxws'; try { u = localStorage.getItem('voxServidor') || u; } catch (e) {} return u.replace(/^ws/, 'http').replace(/\/$/, ''); };
const escH = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MAPAS = { orden: 'nuevos', lista: [], desde: null };

// ═════════ VER Y DESCARGAR ═════════
cap('mapasCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="mapasTit"></div><div style="flex:1"></div><div class="cerrar" id="mapasCerrar">X</div></div>
  <div id="mapasTabs"><div class="mb on" data-o="nuevos" data-i="mapasNuevos"></div><div class="mb" data-o="populares" data-i="mapasPopulares"></div></div>
  <div id="mapasMsg"></div><div id="mapasGrilla"></div><div id="mapaDet" hidden></div></div>`);
{ const b = document.createElement('div'); b.className = 'btn'; b.id = 'bMapas'; b.dataset.ih = 'mapasBtn'; b.onclick = () => abrirMapas('mundos');
  $('bCargarArchivo').parentNode.insertBefore(b, $('bCargarArchivo')); aplicarIdioma(); }
function abrirMapas(desde) {
  MAPAS.desde = desde; if (desde) $(desde).hidden = true; aplicarIdioma(); abrir('mapasCapa'); $('mapaDet').hidden = true; $('mapasGrilla').hidden = false; $('mapasTabs').hidden = false; cargarLista();
}
$('mapasCerrar').onclick = () => { if (!$('mapaDet').hidden) { $('mapaDet').hidden = true; $('mapasGrilla').hidden = false; $('mapasTabs').hidden = false; return; } cerrar('mapasCapa'); if (MAPAS.desde) $(MAPAS.desde).hidden = false; };
$('mapasTabs').addEventListener('click', e => { const d = e.target.closest('[data-o]'); if (!d) return; MAPAS.orden = d.dataset.o; for (const x of $('mapasTabs').children) x.classList.toggle('on', x === d); cargarLista(); });
const subMapa = m => [m.autor, m.tipo === 'skyblock' ? TR('tipoMapaSky') : m.tipo === 'parkour' ? TR('tipoMapaParkour') : m.plano ? TR('tipoMapaPlano') : '', m.modo === 'creativo' ? TR('creativo') : m.modo === 'aventura' ? TR('modoMapaAventura') : TR('supervivencia'), TR('descargas', { n: m.descargas || 0 })].filter(Boolean).join(' · ');
async function cargarLista() {
  $('mapasMsg').textContent = TR('mapasCargando'); $('mapasMsg').hidden = false; $('mapasGrilla').innerHTML = '';
  try { const r = await fetch(urlMapas() + '/mapas?orden=' + MAPAS.orden, { cache: 'no-store' }); const d = await r.json(); MAPAS.lista = d.mapas || []; }
  catch (e) { $('mapasMsg').textContent = TR('mapasError'); return; }
  if (!MAPAS.lista.length) { $('mapasMsg').textContent = TR('mapasVacio'); return; }
  $('mapasMsg').hidden = true;
  $('mapasGrilla').innerHTML = MAPAS.lista.map(m => `<div class="mapaT" data-id="${escH(m.id)}"><img loading="lazy" src="${urlMapas()}/mapas/foto/${encodeURIComponent(m.id)}" alt=""><div class="n">${escH(m.nombre)}</div><div class="a">${escH(subMapa(m))}</div></div>`).join('');
}
$('mapasGrilla').addEventListener('click', e => { const d = e.target.closest('[data-id]'); if (!d) return; const m = MAPAS.lista.find(x => x.id === d.dataset.id); if (!m) return;
  $('mapaDet').innerHTML = `<img src="${urlMapas()}/mapas/foto/${encodeURIComponent(m.id)}" alt=""><div class="info"><b>${escH(m.nombre)}</b><small>${escH(subMapa(m))}</small><p>${escH(m.desc)}</p><div class="btn" id="bJugarMapa" data-i="jugarMapa">${TR('jugarMapa')}</div></div>`;
  $('mapasGrilla').hidden = true; $('mapasTabs').hidden = true; $('mapaDet').hidden = false;
  $('bJugarMapa').onclick = () => descargarMapa(m); });
async function descargarMapa(m) {
  aviso(TR('descargando'), 4000); let o;
  try { const r = await fetch(urlMapas() + '/mapas/archivo/' + encodeURIComponent(m.id)); if (!r.ok) throw 0; o = await desempacar(await r.blob()); }
  catch (e) { return aviso(TR('mapasError'), 2000); }
  if (!o || o.tipo !== 'mapa' || !o.datos) return aviso(TR('archivoMal'), 1800);
  const lista = leerLista(), id = Date.now().toString(36), modo = ['aventura', 'supervivencia', 'creativo'].includes(o.modo) ? o.modo : 'aventura';
  lista.unshift({ id, nombre: String(o.nombre || m.nombre || 'Mapa').slice(0, 30), num: lista.length + 1, modo, tipo: ['skyblock', 'parkour'].includes(o.tipoMundo) ? o.tipoMundo : undefined, plano: o.plano || undefined, tam: +o.tam || 160, gen: +o.gen || 1, ejemplo: !!o.ejemplo, importado: true, mapaId: m.id, semilla: +o.semilla || 1, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0 });
  try { localStorage.setItem('bloquesMundos', JSON.stringify(lista)); localStorage.setItem('bloquesMundo_' + id, JSON.stringify(o.datos)); } catch (e) { return aviso(TR('noGuardar'), 2000); }
  cerrar('mapasCapa'); for (const c of ['inicio', 'mundos', 'nuevo']) $(c).hidden = true; aviso(TR('mapaListo'), 1400); pantallaCompleta(); entrarMundo(id);
}

// ═════════ SUBIR MI MAPA (desde la pausa) ═════════
cap('subirCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="subirTit"></div><div style="flex:1"></div><div class="cerrar" id="subirCerrar">X</div></div>
  <div id="subirCuerpo"><img id="subirFoto" alt=""><div class="campos"><span data-i="subirNombre"></span><input id="subirNom" maxlength="30" autocomplete="off"><span data-i="subirDesc"></span><textarea id="subirDes" maxlength="200"></textarea>
  <div class="nota" id="subirNotaTxt"></div><div class="btn" id="bSubirEnviar" data-i="subirEnviar"></div></div></div></div>`);
{ const b = document.createElement('div'); b.className = 'btn'; b.id = 'bSubirMapa'; b.dataset.i = 'subirMapaBtn'; b.style.background = 'linear-gradient(#b07cff,#6a3fd0)'; b.onclick = () => abrirSubir();
  $('pausa').insertBefore(b, $('bSalir'));
  const ob = new MutationObserver(() => { if ($('pausa').hidden) return; const ok = jugando && mundoId && mundoId !== 'tutorial' && mundoId !== 'enlinea' && !(window.__mp && __mp.MP.invitado); b.style.display = ok ? '' : 'none'; });
  ob.observe($('pausa'), { attributes: true, attributeFilter: ['hidden'] }); aplicarIdioma(); }
let subirFotoURL = '';
function fotoMapa() {
  try { const vis = manoG.visible; marco.visible = false; manoG.visible = false; render.render(escena, cam); manoG.visible = vis;
    const src = render.domElement, c = document.createElement('canvas'); c.width = 640; c.height = 360; const g = c.getContext('2d');
    const r = Math.max(640 / src.width, 360 / src.height), w = src.width * r, h = src.height * r; g.drawImage(src, (640 - w) / 2, (360 - h) / 2, w, h);
    return c.toDataURL('image/jpeg', .78); } catch (e) { return ''; }
}
function abrirSubir() {
  $('pausa').hidden = true; subirFotoURL = fotoMapa(); $('subirFoto').src = subirFotoURL;
  const meta = leerLista().find(m => m.id === mundoId) || {}; $('subirNom').value = (typeof mapa !== 'undefined' && mapa.nombre) || meta.nombre || ''; $('subirDes').value = '';
  aplicarIdioma(); $('subirNotaTxt').textContent = TR('subirNota', { n: window.__mp ? __mp.nombre() : '' }); abrir('subirCapa');
}
$('subirCerrar').onclick = () => { cerrar('subirCapa'); $('pausa').hidden = false; };
// el mapa se arma igual que "Compartir mundo", con el tipo de mundo para que se vea igual
async function armarMapa(nombre) {
  guardar(); const meta = leerLista().find(m => m.id === mundoId); let datos; try { datos = JSON.parse(localStorage.getItem('bloquesMundo_' + mundoId)); } catch (e) {} if (!meta || !datos) return null;
  const ini = mapa.inicio || { x: J.x, y: J.y, z: J.z, yaw: J.yaw };
  const d = Object.assign({}, datos, { J: { x: ini.x, y: ini.y, z: ini.z, yaw: ini.yaw ?? 0, pitch: -.1 }, spawnP: ini, inv: {}, stats: { rotos: {}, hechos: {}, cofres: 0 }, mision: 0, tiempo: 0, vida: 20, hambre: 20, volando: false, extra: null });
  const modo = mapa.modoJugar || (tieneMeta ? 'aventura' : meta.modo === 'creativo' ? 'creativo' : meta.modo);
  d.barra = modo === 'creativo' ? BARRA_CREATIVO.slice() : Array(9).fill(0);
  return { obj: { formato: 'voxelium', tipo: 'mapa', v: 1, nombre, modo, tam: meta.tam || 160, semilla: meta.semilla, gen: meta.gen || 1, ejemplo: !!meta.ejemplo, tipoMundo: meta.tipo || '', plano: !!meta.plano, datos: d }, meta, modo };
}
const aBase64 = blob => new Promise((ok, mal) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1] || ''); r.onerror = mal; r.readAsDataURL(blob); });
$('bSubirEnviar').onclick = async () => {
  const nombre = $('subirNom').value.trim(); if (nombre.length < 3) return aviso(TR('nombreCorto'), 1600);
  const a = await armarMapa(nombre); if (!a) return aviso(TR('subidoMal'), 1800);
  aviso(TR('subiendo'), 6000); const voxel = await aBase64(await empacar(a.obj));
  if (voxel.length > 8 * 1024 * 1024) return aviso(TR('subidoGrande'), 2000);
  try {
    const r = await fetch(urlMapas() + '/mapas/subir', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ nombre, desc: $('subirDes').value.trim().slice(0, 200), autor: window.__mp ? __mp.nombre() : '', dev: window.__dia ? __dia.miDev : '', modo: a.modo, tipo: a.meta.tipo || '', plano: !!a.meta.plano, tam: a.meta.tam || 160, foto: subirFotoURL, voxel }) });
    if (r.status === 429) return aviso(TR('subidoEspera'), 2200);
    if (r.status === 413) return aviso(TR('subidoGrande'), 2200);
    if (!r.ok) throw 0;
    cerrar('subirCapa'); pausado = false; aviso(TR('subidoOk'), 3000); sonar('final', .5) || son(880, .2, 'triangle', .1);
  } catch (e) { aviso(TR('subidoMal'), 2000); }
};
// al escribir en los campos, que el juego no tome las teclas
for (const id of ['subirNom', 'subirDes']) $(id).addEventListener('keydown', e => e.stopPropagation());
window.__mapas = { abrirMapas, cargarLista, descargarMapa, armarMapa, urlMapas };
