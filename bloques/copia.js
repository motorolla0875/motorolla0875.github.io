'use strict';
// ═════════ COPIA DE SEGURIDAD: todos los mundos, skins, mods y ajustes en un solo archivo ═════════

Object.assign(TX.es, {
  copiaBtn: 'Copia de seguridad', copiaNunca: 'todavía no hiciste ninguna', copiaHace: 'última: hace {n} días', copiaHoy: 'última: hoy',
  copiaTitulo: 'Copia de seguridad', copiaTxt: 'Guarda todos tus mundos, personajes, skins y mods en un archivo. Si cambias de teléfono o se borra el juego, lo abres y recuperas todo.',
  copiaGuardar: 'Guardar copia<small>crea el archivo .voxel</small>', copiaRestaurar: 'Recuperar copia<small>abre un archivo de copia</small>', copiaLista: 'COPIA LISTA<small>guárdala en Drive, WhatsApp o tu correo</small>',
  copiaRecuperada: 'COPIA RECUPERADA<small>{n} mundos recuperados</small>', copiaAviso: 'HACE TIEMPO QUE NO HACES UNA COPIA<small>guarda tus mundos en Mis mundos › Copia de seguridad</small>'
});
Object.assign(TX.en, {
  copiaBtn: 'Backup', copiaNunca: 'you have not made one yet', copiaHace: 'last one: {n} days ago', copiaHoy: 'last one: today',
  copiaTitulo: 'Backup', copiaTxt: 'Save all your worlds, characters, skins and mods in one file. If you change phones or the game gets deleted, open it and get everything back.',
  copiaGuardar: 'Save backup<small>creates the .voxel file</small>', copiaRestaurar: 'Restore backup<small>open a backup file</small>', copiaLista: 'BACKUP READY<small>keep it in Drive, WhatsApp or your email</small>',
  copiaRecuperada: 'BACKUP RESTORED<small>{n} worlds restored</small>', copiaAviso: 'IT HAS BEEN A WHILE SINCE YOUR LAST BACKUP<small>save your worlds in My worlds › Backup</small>'
});
Object.assign(TX.pt, {
  copiaBtn: 'Cópia de segurança', copiaNunca: 'você ainda não fez nenhuma', copiaHace: 'última: há {n} dias', copiaHoy: 'última: hoje',
  copiaTitulo: 'Cópia de segurança', copiaTxt: 'Salve todos os seus mundos, personagens, skins e mods em um arquivo. Se trocar de celular ou o jogo for apagado, abra-o e recupere tudo.',
  copiaGuardar: 'Salvar cópia<small>cria o arquivo .voxel</small>', copiaRestaurar: 'Recuperar cópia<small>abre um arquivo de cópia</small>', copiaLista: 'CÓPIA PRONTA<small>guarde no Drive, WhatsApp ou e-mail</small>',
  copiaRecuperada: 'CÓPIA RECUPERADA<small>{n} mundos recuperados</small>', copiaAviso: 'FAZ TEMPO QUE VOCÊ NÃO FAZ UMA CÓPIA<small>salve seus mundos em Meus mundos › Cópia de segurança</small>'
});

const CLAVE = /^(bloques|blox|vox)/;
const leerCopiaFecha = () => { try { return +localStorage.getItem('copiaFecha') || 0; } catch (e) { return 0; } };

// botón en Mis mundos, al lado de "Cargar mapa"
{ const b = document.createElement('div'); b.className = 'btn'; b.id = 'bCopia'; b.style.background = 'linear-gradient(#2fb65a,#1f8a40)';
  const f = document.createElement('div'); f.className = 'filaBtn'; $('mundos').insertBefore(f, $('bCargarArchivo')); f.append($('bCargarArchivo'), b);
  const c = document.createElement('div'); c.className = 'capa'; c.id = 'copiaCapa'; c.hidden = true; c.style.backgroundImage = 'linear-gradient(#24378f, #0d153d)';
  c.innerHTML = `<div class="titulo" style="font-size:clamp(24px,5vw,38px)" data-i="copiaTitulo"></div><div class="texto" style="max-width:440px;text-align:center;margin:4px 0 2px" data-i="copiaTxt"></div><div class="texto" id="copiaFechaTxt" style="color:#ffe14a"></div>
    <div class="btn" id="bCopiaGuardar" data-ih="copiaGuardar" style="background:linear-gradient(#2fb65a,#1f8a40)"></div><div class="btn" id="bCopiaRestaurar" data-ih="copiaRestaurar"></div><div class="btn" id="bCopiaVolver" data-i="volver"></div>`;
  document.body.appendChild(c); aplicarIdioma(); }
function textoFecha() { const f = leerCopiaFecha(); if (!f) return TR('copiaNunca'); const n = Math.floor((Date.now() - f) / 864e5); return n < 1 ? TR('copiaHoy') : TR('copiaHace', { n }); }
function pintarBotonCopia() { $('bCopia').innerHTML = TR('copiaBtn') + '<small>' + textoFecha() + '</small>'; }
{ const p0 = pintarMundos; pintarMundos = function () { p0(); pintarBotonCopia(); }; }
pintarBotonCopia();
$('bCopia').onclick = () => { $('mundos').hidden = true; $('copiaFechaTxt').textContent = textoFecha(); $('copiaCapa').hidden = false; };
$('bCopiaVolver').onclick = () => { $('copiaCapa').hidden = true; pintarMundos(); $('mundos').hidden = false; };

async function guardarCopia() {
  if (jugando) guardar();
  const datos = {}; for (let k = 0; k < localStorage.length; k++) { const c = localStorage.key(k); if (CLAVE.test(c)) datos[c] = localStorage.getItem(c); }
  const obj = { formato: 'voxelium', tipo: 'copia', v: 1, fecha: Date.now(), datos };
  const d = new Date(), dd = n => String(n).padStart(2, '0');
  await compartirArchivo(await empacar(obj), `voxelium-copia-${d.getFullYear()}-${dd(d.getMonth() + 1)}-${dd(d.getDate())}.voxel`);
  try { localStorage.setItem('copiaFecha', String(Date.now())); } catch (e) {}
  $('copiaFechaTxt').textContent = textoFecha(); aviso(TR('copiaLista'), 2600);
}
$('bCopiaGuardar').onclick = () => guardarCopia();
$('bCopiaRestaurar').onclick = () => pedirArchivo();

// recuperar: suma lo que falta, nunca borra lo que ya hay en el teléfono
function recuperarCopia(o) {
  const D = o.datos || {}, json = (s, d) => { try { return JSON.parse(s) ?? d; } catch (e) { return d; } };
  const local = leerLista(), suyos = json(D.bloquesMundos, []); let n = 0;
  for (const m of suyos) {
    const datos = D['bloquesMundo_' + m.id]; if (!datos) continue;
    const k = local.findIndex(x => x.id === m.id);
    if (k < 0) { local.push(m); n++; }
    else if ((m.fecha || 0) > (local[k].fecha || 0)) { local[k] = m; n++; }
    else continue;
    try { localStorage.setItem('bloquesMundo_' + m.id, datos); } catch (e) { aviso(TR('noGuardar'), 2000); return; }
  }
  local.sort((a, b) => (b.fecha || 0) - (a.fecha || 0));
  localStorage.setItem('bloquesMundos', JSON.stringify(local));
  // mods y skins: se suman sin repetir
  const unir = (clave, idDe) => { if (!D[clave]) return; const a = json(localStorage.getItem(clave), []), b = json(D[clave], []); const ya = new Set(a.map(idDe)); for (const x of b) if (!ya.has(idDe(x))) a.push(x); try { localStorage.setItem(clave, JSON.stringify(a)); } catch (e) {} };
  unir('bloxMods', m => m.id); unir('voxSkins', s => s.id || JSON.stringify(s)); unir('voxDesbloq', x => x);
  // el resto (personaje, ajustes, idioma…) solo si en este teléfono no hay nada
  for (const c in D) { if (!CLAVE.test(c) || c.startsWith('bloquesMundo') || ['bloxMods', 'voxSkins', 'voxDesbloq'].includes(c)) continue; try { if (localStorage.getItem(c) == null) localStorage.setItem(c, D[c]); } catch (e) {} }
  $('copiaCapa').hidden = true; pintarMundos(); $('mundos').hidden = false; aviso(TR('copiaRecuperada', { n }), 2600);
}
{ const a0 = archivoIn.onchange; archivoIn.onchange = async function () {
  const f = archivoIn.files[0]; if (!f) return; let o = null; try { o = await desempacar(f); } catch (e) {}
  if (o && o.formato === 'voxelium' && o.tipo === 'copia') return recuperarCopia(o);
  return a0.call(this); }; }

// recordatorio: si hay mundos y pasó una semana (o nunca hizo copia y ya jugó 3 días), avisa una vez al abrir Mis mundos
{ const b0 = $('bJugar').onclick; $('bJugar').onclick = function () { b0.call(this);
  const l = leerLista(), f = leerCopiaFecha(), dias = l.reduce((s, m) => s + (m.dia || 1), 0), hoy = new Date().toDateString();
  let ya = ''; try { ya = localStorage.getItem('copiaRecordado') || ''; } catch (e) {}
  if (l.length && ya !== hoy && ((f && Date.now() - f > 7 * 864e5) || (!f && dias >= 4))) { try { localStorage.setItem('copiaRecordado', hoy); } catch (e) {} setTimeout(() => aviso(TR('copiaAviso'), 3200), 400); } }; }
window.__copia = { guardarCopia, recuperarCopia };
