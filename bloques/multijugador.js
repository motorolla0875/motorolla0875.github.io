'use strict';
// ═════════ JUGAR EN LÍNEA: salas con amigos (código) y salas públicas ═════════
// El dueño abre su mundo; el servidor (dmith.app) solo pasa los mensajes entre los celulares.
// El dueño manda: animales, monstruos, la hora y lo que pasa solo en el mundo. Cada uno manda lo que hace él.

Object.assign(TX.es, {
  enLinea: 'Jugar en línea', enLineaSub: 'con amigos o en salas públicas', tuNombre: 'Tu nombre', otroNombre: 'Otro nombre',
  conCodigo: 'Entrar con código', codigoAyuda: 'Pídele el código de 4 números a tu amigo', entrar2: 'Entrar', salasPublicas: 'Salas públicas', sinSalas: 'No hay salas públicas ahora. ¡Abre la tuya desde la pausa!',
  conectando: 'Conectando…', sinConexion: 'NO SE PUDO CONECTAR<small>revisa tu internet y prueba de nuevo</small>', cargandoMundo: 'Entrando al mundo de {n}…',
  jugarAmigos: 'Jugar con amigos', abrirTitulo: 'Abrir tu mundo', privada: 'Privada<small>solo entran los que tienen el código</small>', publica: 'Pública<small>aparece en la lista para todos</small>',
  invitadosConstruyen: 'Los que entran pueden construir', tuCodigo: 'Código de tu sala', jugadoresN: '{n} de {m} jugadores', cerrarSala: 'Cerrar la sala', hacerPublica: 'Hacerla pública', hacerPrivada: 'Hacerla privada',
  entro: '{n} ENTRÓ', salio: '{n} SALIÓ', salaCerrada: 'LA SALA SE CERRÓ<small>el dueño salió del mundo</small>', teEcharon: 'TE SACARON DE LA SALA', noExiste: 'ESE CÓDIGO NO EXISTE', llena: 'LA SALA ESTÁ LLENA', echadoErr: 'NO PUEDES VOLVER A ESA SALA', lleno: 'EL SERVIDOR ESTÁ LLENO, PRUEBA EN UN RATO',
  jugadores: 'Jugadores', echar: 'Sacar', bloquear: 'Bloquear', desbloquear: 'Desbloquear', reportar: 'Reportar', reportado: 'GRACIAS, LO VAMOS A REVISAR', motivoMolesta: 'Molesta', motivoRompe: 'Rompe todo', motivoOtro: 'Otra cosa',
  mundoDe: 'Mundo de {n}', vos: '(tú)', dueno: 'dueño',
  fr0: '¡Hola!', fr1: '¡Ven aquí!', fr2: '¡Mira esto!', fr3: '¡Gracias!', fr4: '¡Genial!', fr5: '¡Ayuda!', fr6: '¡Vamos!', fr7: 'Sí', fr8: 'No', fr9: 'Espera', fr10: '¡Cuidado!', fr11: '¡Chau!'
});
Object.assign(TX.en, {
  enLinea: 'Play online', enLineaSub: 'with friends or in public rooms', tuNombre: 'Your name', otroNombre: 'Another name',
  conCodigo: 'Join with a code', codigoAyuda: 'Ask your friend for the 4-digit code', entrar2: 'Join', salasPublicas: 'Public rooms', sinSalas: 'No public rooms right now. Open yours from the pause menu!',
  conectando: 'Connecting…', sinConexion: 'COULD NOT CONNECT<small>check your internet and try again</small>', cargandoMundo: 'Joining {n}\'s world…',
  jugarAmigos: 'Play with friends', abrirTitulo: 'Open your world', privada: 'Private<small>only people with the code can join</small>', publica: 'Public<small>shows up in the list for everyone</small>',
  invitadosConstruyen: 'Visitors can build', tuCodigo: 'Your room code', jugadoresN: '{n} of {m} players', cerrarSala: 'Close the room', hacerPublica: 'Make it public', hacerPrivada: 'Make it private',
  entro: '{n} JOINED', salio: '{n} LEFT', salaCerrada: 'THE ROOM WAS CLOSED<small>the owner left the world</small>', teEcharon: 'YOU WERE REMOVED FROM THE ROOM', noExiste: 'THAT CODE DOES NOT EXIST', llena: 'THE ROOM IS FULL', echadoErr: 'YOU CANNOT REJOIN THAT ROOM', lleno: 'THE SERVER IS FULL, TRY AGAIN SOON',
  jugadores: 'Players', echar: 'Remove', bloquear: 'Block', desbloquear: 'Unblock', reportar: 'Report', reportado: 'THANKS, WE WILL LOOK INTO IT', motivoMolesta: 'Annoying', motivoRompe: 'Breaks everything', motivoOtro: 'Something else',
  mundoDe: '{n}\'s world', vos: '(you)', dueno: 'owner',
  fr0: 'Hi!', fr1: 'Come here!', fr2: 'Look at this!', fr3: 'Thanks!', fr4: 'Awesome!', fr5: 'Help!', fr6: 'Let\'s go!', fr7: 'Yes', fr8: 'No', fr9: 'Wait', fr10: 'Watch out!', fr11: 'Bye!'
});
Object.assign(TX.pt, {
  enLinea: 'Jogar online', enLineaSub: 'com amigos ou em salas públicas', tuNombre: 'Seu nome', otroNombre: 'Outro nome',
  conCodigo: 'Entrar com código', codigoAyuda: 'Peça o código de 4 números ao seu amigo', entrar2: 'Entrar', salasPublicas: 'Salas públicas', sinSalas: 'Não há salas públicas agora. Abra a sua pela pausa!',
  conectando: 'Conectando…', sinConexion: 'NÃO FOI POSSÍVEL CONECTAR<small>verifique sua internet e tente de novo</small>', cargandoMundo: 'Entrando no mundo de {n}…',
  jugarAmigos: 'Jogar com amigos', abrirTitulo: 'Abrir seu mundo', privada: 'Privada<small>só entra quem tem o código</small>', publica: 'Pública<small>aparece na lista para todos</small>',
  invitadosConstruyen: 'Quem entra pode construir', tuCodigo: 'Código da sua sala', jugadoresN: '{n} de {m} jogadores', cerrarSala: 'Fechar a sala', hacerPublica: 'Tornar pública', hacerPrivada: 'Tornar privada',
  entro: '{n} ENTROU', salio: '{n} SAIU', salaCerrada: 'A SALA FOI FECHADA<small>o dono saiu do mundo</small>', teEcharon: 'VOCÊ FOI TIRADO DA SALA', noExiste: 'ESSE CÓDIGO NÃO EXISTE', llena: 'A SALA ESTÁ CHEIA', echadoErr: 'VOCÊ NÃO PODE VOLTAR NESSA SALA', lleno: 'O SERVIDOR ESTÁ CHEIO, TENTE DAQUI A POUCO',
  jugadores: 'Jogadores', echar: 'Tirar', bloquear: 'Bloquear', desbloquear: 'Desbloquear', reportar: 'Denunciar', reportado: 'OBRIGADO, VAMOS VERIFICAR', motivoMolesta: 'Incomoda', motivoRompe: 'Quebra tudo', motivoOtro: 'Outra coisa',
  mundoDe: 'Mundo de {n}', vos: '(você)', dueno: 'dono',
  fr0: 'Oi!', fr1: 'Vem aqui!', fr2: 'Olha isso!', fr3: 'Obrigado!', fr4: 'Demais!', fr5: 'Socorro!', fr6: 'Vamos!', fr7: 'Sim', fr8: 'Não', fr9: 'Espera', fr10: 'Cuidado!', fr11: 'Tchau!'
});

// ─── nombre: se arma con dos listas + número (iguales a las del servidor) ───
const MP_ADJ = ['Super', 'Mega', 'Pixel', 'Turbo', 'Rayo', 'Cubo', 'Ninja', 'Gran', 'Mini', 'Cosmo', 'Neon', 'Lava', 'Hielo', 'Trueno', 'Bloque', 'Veloz', 'Feliz', 'Dorado', 'Cristal', 'Fuego'];
const MP_SUS = ['Panda', 'Zorro', 'Dragon', 'Lobo', 'Gato', 'Conejo', 'Buho', 'Tigre', 'Tiburon', 'Robot', 'Caballero', 'Mago', 'Minero', 'Constructor', 'Pinguino', 'Koala', 'Halcon', 'Pulpo', 'Leon', 'Oso'];
const mpAzar = l => l[Math.floor(Math.random() * l.length)];
const nuevoNombre = () => mpAzar(MP_ADJ) + mpAzar(MP_SUS) + (10 + Math.floor(Math.random() * 90));
let miNombre = (() => { try { return localStorage.getItem('voxNombre') || ''; } catch (e) { return ''; } })();
if (!miNombre) { miNombre = nuevoNombre(); try { localStorage.setItem('voxNombre', miNombre); } catch (e) {} }

// ─── estado de la conexión ───
const MP = { ws: null, id: 0, sala: null, dueno: false, invitado: false, publica: false, permiso: true, jug: new Map(), bichos: new Map(), cola: [], remoto: false, bloqueados: new Set(), duenoId: 0, nombreDueno: '', clave: '' };
try { JSON.parse(localStorage.getItem('voxBloqueados') || '[]').forEach(n => MP.bloqueados.add(n)); } catch (e) {}
const mpURL = () => { try { const u = localStorage.getItem('voxServidor'); if (u) return u; } catch (e) {} return 'wss://dmith.app/voxws'; };
const mpEnviar = m => { if (MP.ws && MP.ws.readyState === 1) MP.ws.send(JSON.stringify(m)); };
const skinParaEnviar = () => { try { const s = skinActual(); const c = {}; for (const k in s) if (typeof s[k] !== 'object' || k === 'partes') c[k] = s[k]; return c; } catch (e) { return null; } };

function conectar() {
  if (MP.ws && MP.ws.readyState === 1) return Promise.resolve();
  return new Promise((ok, mal) => {
    let ws; try { ws = new WebSocket(mpURL()); } catch (e) { return mal(e); }
    const tope = setTimeout(() => { try { ws.close(); } catch (e) {} mal(new Error('tiempo')); }, 8000);
    ws.onopen = () => { MP.ws = ws; ws.send(JSON.stringify({ t: 'hola', nombre: miNombre, skin: skinParaEnviar() })); };
    ws.onmessage = ev => { let m; try { m = JSON.parse(ev.data); } catch (e) { return; } if (m.t === 'bienvenida') { clearTimeout(tope); MP.id = m.id; ok(); } recibir(m); };
    ws.onclose = () => { clearTimeout(tope); const estaba = !!MP.sala; MP.ws = null; if (estaba) { aviso(TR('sinConexion'), 2500); terminarSala(true); } mal(new Error('cerrado')); };
    ws.onerror = () => {};
  });
}

// ═════════ PANTALLAS ═════════
{ const st = document.createElement('style'); st.textContent = `
  #mpCapa .ventana, #mpAbrirCapa .ventana, #mpFrasesCapa .ventana { max-width: 620px; }
  .mpCuerpo { padding: 10px 12px; overflow: auto; display: flex; flex-direction: column; gap: 10px; }
  .mpFila { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .mpNombre { font-size: 20px; font-weight: 800; color: #1b2a6b; flex: 1; }
  .mpCodigo { font: 800 26px 'Baloo 2', sans-serif; letter-spacing: 8px; width: 150px; text-align: center; padding: 4px 6px; border: 3px solid #0d153d; border-radius: 12px; color: #1b2a6b; }
  .mpSala { display: flex; align-items: center; gap: 8px; padding: 8px; background: #fff; border: 2px solid #d5dbf3; border-radius: 12px; }
  .mpSala .nom { flex: 1; font-size: 15px; } .mpSala .nom small { display: block; font-size: 12px; color: #5a6aa8; font-weight: 600; }
  .mpGrande { font: 800 54px 'Baloo 2', sans-serif; letter-spacing: 12px; color: #1b2a6b; text-align: center; line-height: 1; }
  .mpOpc { display: flex; gap: 8px; } .mpOpc .mb { flex: 1; text-align: center; padding: 8px; } .mpOpc .mb small { display: block; font-size: 11px; font-weight: 600; }
  #mpFrases { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
  #mpFrases .mb { text-align: center; padding: 8px 4px; font-size: 14px; }
  .mpJug { display: flex; align-items: center; gap: 6px; padding: 6px 8px; background: #fff; border: 2px solid #d5dbf3; border-radius: 10px; }
  .mpJug .nom { flex: 1; font-size: 14px; } .mpJug .mb { padding: 4px 8px; font-size: 12px; }
  #mpFeed { position: fixed; left: max(8px, env(safe-area-inset-left)); bottom: 120px; z-index: 3; zoom: var(--u); display: flex; flex-direction: column; gap: 3px; pointer-events: none; max-width: 40vw; }
  #mpFeed div { background: rgba(13,21,61,.62); border-radius: 8px; padding: 2px 8px; font-size: 13px; color: #fff; animation: mpFeed 5s forwards; }
  #mpFeed b { color: #ffe14a; } @keyframes mpFeed { 0%, 80% { opacity: 1; } 100% { opacity: 0; } }
`; document.head.appendChild(st);
  const capa = (id, html) => { const c = document.createElement('div'); c.className = 'capa trans'; c.id = id; c.hidden = true; c.innerHTML = html; document.body.appendChild(c); };
  capa('mpCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="enLinea"></div><div style="flex:1"></div><div class="cerrar" id="mpCerrar">X</div></div><div class="mpCuerpo">
    <div class="mpFila"><span data-i="tuNombre" style="color:#5a6aa8"></span><div class="mpNombre" id="mpNombre"></div><div class="mb" id="mpOtroNombre" data-i="otroNombre"></div></div>
    <div class="mpFila"><span data-i="conCodigo" style="font-size:16px"></span><input class="mpCodigo" id="mpCodigoIn" inputmode="numeric" maxlength="4" autocomplete="off"><div class="mb verde" id="mpEntrar" data-i="entrar2"></div></div>
    <div style="font-size:12px;color:#5a6aa8;margin-top:-6px" data-i="codigoAyuda"></div>
    <div style="font-size:16px" data-i="salasPublicas"></div><div id="mpLista"></div></div></div>`);
  capa('mpAbrirCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="jugarAmigos"></div><div style="flex:1"></div><div class="cerrar" id="mpAbrirCerrar">X</div></div><div class="mpCuerpo" id="mpAbrirCuerpo"></div></div>`);
  capa('mpFrasesCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="jugadores"></div><div style="flex:1"></div><div class="cerrar" id="mpFrasesCerrar">X</div></div><div class="mpCuerpo"><div id="mpFrases"></div><div id="mpJugadores" style="display:flex;flex-direction:column;gap:6px"></div></div></div>`);
  const f = document.createElement('div'); f.id = 'mpFeed'; $('hud').appendChild(f);
  // botón de frases arriba (solo cuando hay sala)
  const b = document.createElement('div'); b.className = 'bChico'; b.id = 'bFrases'; b.hidden = true;
  b.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#fff" stroke="#0d153d" stroke-width="2"/><circle cx="8" cy="10.5" r="1.4" fill="#0d153d"/><circle cx="12" cy="10.5" r="1.4" fill="#0d153d"/><circle cx="16" cy="10.5" r="1.4" fill="#0d153d"/></svg>';
  $('botonesArriba').insertBefore(b, $('bPausa'));
  // Mis mundos: "Jugar en línea" al lado de "Crear mundo nuevo"
  const bl = document.createElement('div'); bl.className = 'btn'; bl.id = 'bEnLinea'; bl.style.background = 'linear-gradient(#2fb65a,#1f8a40)';
  const fl = document.createElement('div'); fl.className = 'filaBtn'; $('mundos').insertBefore(fl, $('bNuevo')); fl.append($('bNuevo'), bl);
  // Pausa: "Jugar con amigos"
  const bp = document.createElement('div'); bp.className = 'btn'; bp.id = 'bAmigos'; bp.style.background = 'linear-gradient(#2fb65a,#1f8a40)';
  const fp = document.createElement('div'); fp.className = 'filaBtn'; $('pausa').insertBefore(fp, $('bAjustes2')); fp.append($('bAjustes2'), bp);
  aplicarIdioma(); }
function pintarBotonesMP() { $('bEnLinea').innerHTML = TR('enLinea') + '<small>' + TR('enLineaSub') + '</small>'; $('bAmigos').textContent = TR('jugarAmigos'); }
pintarBotonesMP();
{ const a0 = aplicarIdioma; aplicarIdioma = function () { a0(); if ($('bEnLinea')) pintarBotonesMP(); }; }

// ─── Jugar en línea (desde Mis mundos) ───
let listaT = null;
function abrirEnLinea() {
  $('mundos').hidden = true; $('mpCapa').hidden = false; $('mpNombre').textContent = miNombre; $('mpCodigoIn').value = '';
  $('mpLista').innerHTML = `<div style="color:#5a6aa8">${TR('conectando')}</div>`;
  conectar().then(pedirLista).catch(() => { $('mpLista').innerHTML = `<div style="color:#c8341a">${TR('sinConexion')}</div>`; });
  clearInterval(listaT); listaT = setInterval(() => { if ($('mpCapa').hidden) return clearInterval(listaT); pedirLista(); }, 4000);
}
const pedirLista = () => mpEnviar({ t: 'lista' });
function pintarLista(salas) {
  const e = s => String(s).replace(/[<>&"]/g, '');
  $('mpLista').innerHTML = salas.length ? salas.map(s => `<div class="mpSala"><div class="nom">${e(s.nombre || TR('mundoDe', { n: s.dueno }))}<small>${e(s.dueno)} · ${s.modo === 'creativo' ? TR('creativo') : s.modo === 'aventura' ? TR('aventuraM') : TR('supervivencia')} · ${TR('jugadoresN', { n: s.jug, m: s.max })}</small></div><div class="mb verde" data-sala="${e(s.codigo)}">${TR('entrar2')}</div></div>`).join('') : `<div style="color:#5a6aa8">${TR('sinSalas')}</div>`;
}
$('bEnLinea').onclick = abrirEnLinea;
$('mpCerrar').onclick = () => { $('mpCapa').hidden = true; clearInterval(listaT); pintarMundos(); $('mundos').hidden = false; };
$('mpOtroNombre').onclick = () => { miNombre = nuevoNombre(); try { localStorage.setItem('voxNombre', miNombre); } catch (e) {} $('mpNombre').textContent = miNombre; if (MP.ws) mpEnviar({ t: 'hola', nombre: miNombre, skin: skinParaEnviar() }); };
$('mpCodigoIn').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4); });
$('mpEntrar').onclick = () => { const c = $('mpCodigoIn').value; if (c.length === 4) unirse(c); };
$('mpLista').addEventListener('click', e => { const d = e.target.closest('[data-sala]'); if (d) unirse(d.dataset.sala); });
function unirse(codigo) { aviso(TR('conectando'), 3000); conectar().then(() => mpEnviar({ t: 'unirse', codigo })).catch(() => aviso(TR('sinConexion'), 2500)); }

// ─── Abrir tu mundo (desde la pausa) ───
function pintarAbrir() {
  const c = $('mpAbrirCuerpo');
  if (!MP.sala) {
    c.innerHTML = `<div style="font-size:16px" data-i="abrirTitulo">${TR('abrirTitulo')}</div>
      <div class="mpOpc"><div class="mb" id="mpPrivada">${TR('privada')}</div><div class="mb verde" id="mpPublica">${TR('publica')}</div></div>
      <div class="mpFila"><span>${TR('invitadosConstruyen')}</span><div class="opcG" id="mpPermiso"><div data-p="1" class="${MP.permiso ? 'on' : ''}">${TR('si')}</div><div data-p="0" class="${MP.permiso ? '' : 'on'}">${TR('no')}</div></div></div>`;
  } else {
    c.innerHTML = `<div style="text-align:center;color:#5a6aa8">${TR('tuCodigo')}</div><div class="mpGrande">${MP.sala}</div>
      <div style="text-align:center">${TR('jugadoresN', { n: MP.jug.size + 1, m: 8 })} · ${MP.publica ? TR('publica').split('<')[0] : TR('privada').split('<')[0]}</div>
      <div class="mpOpc"><div class="mb" id="mpCambiarPub">${MP.publica ? TR('hacerPrivada') : TR('hacerPublica')}</div><div class="mb rojo" id="mpCerrarSala">${TR('cerrarSala')}</div></div>`;
  }
}
$('bAmigos').onclick = () => { if (MP.invitado) return; $('pausa').hidden = true; pintarAbrir(); $('mpAbrirCapa').hidden = false; };
$('mpAbrirCerrar').onclick = () => { $('mpAbrirCapa').hidden = true; $('pausa').hidden = false; };
$('mpAbrirCuerpo').addEventListener('click', e => {
  const d = e.target.closest('[data-p]'); if (d) { MP.permiso = d.dataset.p === '1'; pintarAbrir(); return; }
  if (e.target.closest('#mpPrivada') || e.target.closest('#mpPublica')) { const pub = !!e.target.closest('#mpPublica'); abrirSala(pub); return; }
  if (e.target.closest('#mpCambiarPub')) { mpEnviar({ t: 'publica', v: !MP.publica }); return; }
  if (e.target.closest('#mpCerrarSala')) { mpEnviar({ t: 'salir' }); terminarSala(); pintarAbrir(); }
});
function abrirSala(publica) {
  const meta = leerLista().find(m => m.id === mundoId); if (!meta) return;
  $('mpAbrirCuerpo').innerHTML = `<div style="text-align:center">${TR('conectando')}</div>`;
  conectar().then(() => mpEnviar({ t: 'crear', publica, nombreMundo: TR('mundoDe', { n: miNombre }), modo: modoJuego, tipo: window.mundoTipo || '' }))
    .catch(() => { aviso(TR('sinConexion'), 2500); pintarAbrir(); });
}

// ═════════ MENSAJES ═════════
function recibir(m) {
  switch (m.t) {
    case 'lista': return pintarLista(m.salas || []);
    case 'error': return aviso(TR({ noExiste: 'noExiste', llena: 'llena', echado: 'echadoErr', lleno: 'lleno' }[m.e] || 'sinConexion'), 2200);
    case 'creada': MP.sala = m.codigo; MP.dueno = true; MP.publica = m.publica; MP.duenoId = MP.id; $('bFrases').hidden = false; if (!$('mpAbrirCapa').hidden) pintarAbrir(); return;
    case 'unido': return empezarVisita(m);
    case 'entra': agregarJugador(m); feed(TR('entro', { n: m.nombre })); if (MP.dueno) mandarMundo(m.id); if (!$('mpAbrirCapa').hidden) pintarAbrir(); return;
    case 'sale': { const j = MP.jug.get(m.id); if (j) { feed(TR('salio', { n: j.nombre })); quitarJugador(m.id); } if (!$('mpAbrirCapa').hidden) pintarAbrir(); return; }
    case 'cerrada': aviso(TR(m.motivo === 'echado' ? 'teEcharon' : 'salaCerrada'), 2800); terminarSala(true); return;
    case 'reportado': return aviso(TR('reportado'), 1800);
    case 'mundo': return cargarMundoRemoto(m);
    case 'e': return estadoJugador(m);
    case 'b': if (m.ab && typeof m.ab === 'object') { mapa.alfBajo = mapa.alfBajo || {}; for (const k in m.ab) if (esAlfombra(+m.ab[k])) mapa.alfBajo[k] = +m.ab[k]; } return aplicarBloques(m.c || []);
    case 'f': return fraseDe(m.id, m.k);
    case 'm': return bichosDelDueno(m.l || []);
    case 'h': if (MP.invitado) { tiempo = m.tiempo; REG.hora = m.hora || REG.hora; window.climaRemoto = m.clima || 'sol'; } return;
    case 'g': if (MP.dueno) golpeDeInvitado(m); return;
    case 'uno': if (m.tipo === 'drop' && Array.isArray(m.items)) for (const [id, n] of m.items) darItem(id, n); return;
    case 'skin': { const j = MP.jug.get(m.id); if (j) { j.skin = m.skin; rearmarAvatar(j); } return; }
  }
}

// ─── el dueño le manda el mundo al que entra ───
function mandarMundo(para) {
  guardar(); let datos = null; try { datos = JSON.parse(localStorage.getItem('bloquesMundo_' + mundoId)); } catch (e) {}
  const meta = leerLista().find(x => x.id === mundoId); if (!datos || !meta) return;
  datos.animales = []; datos.inv = {}; datos.barra = null; datos.cofres = {}; datos.stats = null; datos.mision = 0; datos.extra = null;
  mpEnviar({ t: 'mundo', para, meta: { tam: meta.tam || 160, semilla: meta.semilla, gen: meta.gen || 1, tipo: meta.tipo || '', modo: meta.modo, ejemplo: !!meta.ejemplo, nombre: TR('mundoDe', { n: miNombre }) }, datos, pos: { x: J.x + 1.2, y: J.y + .2, z: J.z + 1.2, yaw: J.yaw }, permiso: MP.permiso, dueno: miNombre });
}
// ─── el invitado entra ───
function empezarVisita(m) {
  MP.sala = m.codigo; MP.invitado = true; MP.dueno = false; MP.duenoId = m.dueno;
  for (const j of m.jugadores || []) agregarJugador(j);
  const d = (m.jugadores || []).find(j => j.id === m.dueno); MP.nombreDueno = d ? d.nombre : '';
  aviso(TR('cargandoMundo', { n: MP.nombreDueno }), 6000);
  setTimeout(() => { if (MP.invitado && !jugando) { aviso(TR('sinConexion'), 2500); mpEnviar({ t: 'salir' }); terminarSala(true); } }, 20000);
}
function cargarMundoRemoto(m) {
  if (!MP.invitado || !m.meta || !m.datos) return;
  MP.permiso = m.permiso !== false; MP.clave = 'voxVisita_' + m.meta.semilla;
  let visita = {}; try { visita = JSON.parse(localStorage.getItem(MP.clave) || '{}') || {}; } catch (e) {}
  const datos = m.datos; Object.assign(datos, { J: m.pos, inv: visita.inv || {}, barra: visita.barra || null, sel: 0, vida: visita.vida || 20, hambre: visita.hambre ?? 20, volando: false, cofres: {}, stats: { rotos: {}, hechos: {}, cofres: 0 } });
  const lista = leerLista().filter(x => x.id !== 'enlinea');
  lista.push({ id: 'enlinea', enLinea: true, nombre: m.meta.nombre, num: 0, modo: MP.permiso ? m.meta.modo : 'aventura', tipo: m.meta.tipo, tam: m.meta.tam, semilla: m.meta.semilla, gen: m.meta.gen || 1, ejemplo: m.meta.ejemplo, importado: true, creado: Date.now(), fecha: 0, dia: 1, bloques: 0 });
  try { localStorage.setItem('bloquesMundos', JSON.stringify(lista)); localStorage.setItem('bloquesMundo_enlinea', JSON.stringify(datos)); } catch (e) { aviso(TR('noGuardar'), 2000); return; }
  for (const c of ['inicio', 'mundos', 'nuevo', 'mpCapa', 'copiaCapa', 'logrosCapa']) if ($(c)) $(c).hidden = true;
  pantallaCompleta(); entrarMundo('enlinea');
  if (typeof mapa !== 'undefined') { mapa.oleadas = false; }
  REG.monstruos = 0; for (const a of animales.slice()) quitarAnimal(a); for (const x of monstruos.slice()) quitarMonstruo(x, false);
  $('bFrases').hidden = false; for (const j of MP.jug.values()) rearmarAvatar(j);
}
// la sala del invitado no aparece en "Mis mundos"
// si el juego se cerró en medio de una visita, se borra lo que quedó
try { const l = leerLista(); if (l.some(x => x.enLinea)) { localStorage.setItem('bloquesMundos', JSON.stringify(l.filter(x => !x.enLinea))); localStorage.removeItem('bloquesMundo_enlinea'); } } catch (e) {}

function terminarSala(forzar) {
  const eraInvitado = MP.invitado;
  for (const id of [...MP.jug.keys()]) quitarJugador(id);
  for (const b of MP.bichos.values()) escena.remove(b.g); MP.bichos.clear();
  MP.sala = null; MP.dueno = false; MP.invitado = false; MP.cola = []; $('bFrases').hidden = true; $('mpFrasesCapa').hidden = true;
  if (eraInvitado) {
    guardarVisita();
    try { localStorage.setItem('bloquesMundos', JSON.stringify(leerLista().filter(x => x.id !== 'enlinea'))); localStorage.removeItem('bloquesMundo_enlinea'); } catch (e) {}
    if (jugando && forzar !== 'yaSale') { for (const c of ['pausa', 'mpAbrirCapa', 'muerte']) if ($(c)) $(c).hidden = true; salirAlMenu(); }
  }
}
function guardarVisita() { if (!MP.clave) return; try { localStorage.setItem(MP.clave, JSON.stringify({ inv, barra, vida, hambre })); } catch (e) {} }
// el invitado guarda solo sus cosas (bolsa, barra, vida), no el mundo del otro
{ const g0 = guardar; guardar = function () { if (MP.invitado) { if (jugando) guardarVisita(); return; } return g0(); }; }
// al salir al menú se sale de la sala
{ const s0 = salirAlMenu; salirAlMenu = function () { if (MP.sala) { mpEnviar({ t: 'salir' }); terminarSala('yaSale'); } return s0(); }; }
// al cambiar de mundo (portal, etc.) el dueño cierra la sala
{ const e0 = entrarMundo; entrarMundo = function (id) { if (MP.dueno && id !== mundoId) { mpEnviar({ t: 'salir' }); terminarSala(); } return e0(id); }; }

// ═════════ JUGADORES (avatares con nombre y frase) ═════════
function cartel(texto, color, fondo) {
  const c = document.createElement('canvas'), g = c.getContext('2d'); c.width = 512; c.height = 96;
  g.font = '800 54px "Baloo 2", sans-serif'; const w = Math.min(500, g.measureText(texto).width + 40);
  g.fillStyle = fondo; const x0 = (512 - w) / 2; g.beginPath(); if (g.roundRect) g.roundRect(x0, 8, w, 80, 22); else g.rect(x0, 8, w, 80); g.fill();
  g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(texto, 256, 52);
  const t = new THREE.CanvasTexture(c); t.minFilter = THREE.LinearFilter;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, fog: false })); s.scale.set(2.4, .45, 1); s.renderOrder = 998; return s;
}
function agregarJugador(d) {
  if (d.id === MP.id) return; quitarJugador(d.id);
  const j = { id: d.id, nombre: d.nombre, skin: d.skin, g: null, pos: null, obj: null, yaw: 0, vel: 0, fase: 0, swing: 0, frase: null, fraseT: 0 };
  MP.jug.set(d.id, j); if (jugando) rearmarAvatar(j);
}
function rearmarAvatar(j) {
  if (j.g) escena.remove(j.g);
  const P = (j.skin && j.skin.piel) ? j.skin : PJS[0];
  const g = new THREE.Group(), cuerpo = armarPersonaje(P); g.add(cuerpo); j.cuerpo = cuerpo;
  const n = cartel(j.nombre, '#ffffff', 'rgba(13,21,61,.7)'); n.position.y = 2.25; g.add(n); j.cartelN = n;
  if (j.pos) g.position.set(j.pos.x, j.pos.y, j.pos.z);
  g.visible = !MP.bloqueados.has(j.nombre) && !!j.pos; escena.add(g); j.g = g;
}
function quitarJugador(id) { const j = MP.jug.get(id); if (!j) return; if (j.g) escena.remove(j.g); MP.jug.delete(id); }
function estadoJugador(m) {
  const j = MP.jug.get(m.id); if (!j) return;
  j.obj = { x: m.x, y: m.y, z: m.z }; j.yaw = m.r; j.vel = m.v || 0; if (m.s) j.swing = 1;
  if (!j.pos) { j.pos = { x: m.x, y: m.y, z: m.z }; if (jugando && !j.g) rearmarAvatar(j); if (j.g) { j.g.position.set(m.x, m.y, m.z); j.g.visible = !MP.bloqueados.has(j.nombre); } }
}
function fraseDe(id, k) {
  const j = MP.jug.get(id); if (!j || MP.bloqueados.has(j.nombre)) return;
  const txt = TR('fr' + k); feed(`<b>${j.nombre}:</b> ${txt}`);
  if (j.g) { if (j.frase) j.g.remove(j.frase); j.frase = cartel(txt, '#1b2a6b', 'rgba(255,255,255,.92)'); j.frase.position.y = 2.75; j.g.add(j.frase); j.fraseT = 4; }
  son(660, .08, 'triangle', .06);
}
function feed(html) { const d = document.createElement('div'); d.innerHTML = html; $('mpFeed').appendChild(d); setTimeout(() => d.remove(), 5000); while ($('mpFeed').children.length > 4) $('mpFeed').firstChild.remove(); }

// ═════════ BLOQUES ═════════
function aplicarBloques(c) {
  const L = []; for (let k = 0; k + 1 < c.length; k += 2) { const [x, y, z] = xyz(c[k]); L.push([x, y, z, c[k + 1]]); }
  MP.remoto = true; try { ponerMuchos(L); } finally { MP.remoto = false; }
}
// lo que hace el jugador (romper, poner, puertas…) se manda al terminar cada acción
{ const a0 = alTerminarAccion; alTerminarAccion = function (g) { a0(g); if (MP.sala && !MP.remoto) { const c = [], ab = {}; for (const [i, , t] of g) { c.push(i, t); const al = alfBajo(i); if (al) ab[i] = al; } if (c.length) mpEnviar(Object.keys(ab).length ? { t: 'b', c, ab } : { t: 'b', c }); } }; }
// lo que pasa solo en el mundo (cultivos, TNT, generadores…) lo manda el dueño; en el invitado no pasa
{ const p0 = ponerBloque; ponerBloque = function (x, y, z, t) {
    if (MP.sala && !MP.remoto && grupo === null) { if (MP.invitado) return; if (dentro(x, y, z)) MP.cola.push(idx(x, y, z), t); }
    return p0(x, y, z, t); }; }
{ const p0 = ponerMuchos; ponerMuchos = function (L) {
    if (MP.sala && !MP.remoto && grupo === null) { if (MP.invitado) return 0; for (const [x, y, z, t] of L) if (dentro(x, y, z)) MP.cola.push(idx(x, y, z), t); }
    return p0(L); }; }
// en el invitado no aparecen animales propios: se ven los del dueño
{ const p0 = poblarAnimales; poblarAnimales = function (n, l) { if (MP.invitado) return; return p0(n, l); }; }

// ═════════ ANIMALES Y MONSTRUOS DEL DUEÑO ═════════
let nidSig = 1;
const nidDe = o => o.userData.nid || (o.userData.nid = nidSig++);
function fotoBichos() {
  const l = [], cerca = (p) => { for (const j of MP.jug.values()) if (j.pos && Math.hypot(j.pos.x - p.x, j.pos.z - p.z) < 70) return true; return Math.hypot(J.x - p.x, J.z - p.z) < 70; };
  for (const a of animales) { const p = a.position; if (!cerca(p)) continue; const u = a.userData, ex = u.extra || {};
    l.push([nidDe(a), u.animal, +p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2), +a.rotation.y.toFixed(2), u.bebe > 0 ? 1 : 0, ex.of ?? null, u.rojo > 0 ? 1 : 0]); }
  for (const m of monstruos) { const p = m.position; if (!cerca(p)) continue; l.push([nidDe(m), '#', +p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2), +m.rotation.y.toFixed(2), 0, null, m.userData.rojo > 0 ? 1 : 0]); }
  return l;
}
function bichosDelDueno(l) {
  if (!MP.invitado || !jugando) return;
  const vistos = new Set();
  for (const [nid, tipo, x, y, z, ry, bebe, of, rojo] of l) {
    vistos.add(nid); let b = MP.bichos.get(nid);
    if (!b) {
      let g;
      if (tipo === '#') { crearMonstruo(x, y, z); g = monstruos.pop(); }
      else { if (!TIPOS[tipo]) continue; g = crearAnimal(tipo, x, y, z); animales = animales.filter(o => o !== g); if (of != null && TIPOS[tipo].aldeano && typeof vestirAldeano === 'function') { g.userData.extra = { of }; vestirAldeano(g); } if (bebe) g.scale.setScalar(.6); }
      b = { g, tipo, obj: { x, y, z }, ry }; MP.bichos.set(nid, b); g.userData.nid = nid; g.userData.titere = true;
    }
    b.obj = { x, y, z }; b.ry = ry; b.rojo = rojo;
  }
  for (const [nid, b] of MP.bichos) if (!vistos.has(nid)) { escena.remove(b.g); MP.bichos.delete(nid); }
}
// el invitado le pega a un bicho del dueño
{ const t0 = tocar; tocar = function (dir) {
    if (MP.invitado && MP.bichos.size) {
      const o = new THREE.Vector3(J.x, J.y + OJOS, J.z), r = new THREE.Ray(o, dir), v = new THREE.Vector3(); let mejor = null;
      for (const [nid, b] of MP.bichos) { const p = b.g.position, T = TIPOS[b.tipo] || {}, an = (T.an || .5) + .1, al = T.al || 1.45;
        if (r.intersectBox(new THREE.Box3(new THREE.Vector3(p.x - an, p.y, p.z - an), new THREE.Vector3(p.x + an, p.y + al, p.z + an)), v)) { const d = v.distanceTo(o); if (d < 4.5 && (!mejor || d < mejor.d)) mejor = { nid, d, b }; } }
      const h = apuntar(dir);
      if (mejor && (!h || mejor.d < h.t)) { const dano = [2, 3, 4, 6, 8, 11][nivelEspada()] * (J.fuerza || 1); mpEnviar({ t: 'g', n: mejor.nid, d: dano, dx: +dir.x.toFixed(2), dz: +dir.z.toFixed(2) }); swing = 1; sonar('golpe', .7) || son(220, .1, 'sawtooth', .12); mejor.b.g.userData.rojo = .25; return; }
    }
    return t0(dir); }; }
function golpeDeInvitado(m) {
  let o = animales.find(a => a.userData.nid === m.n), esMon = false; if (!o) { o = monstruos.find(a => a.userData.nid === m.n); esMon = !!o; } if (!o) return;
  const u = o.userData; u.vida -= Math.min(30, +m.d || 2); u.rojo = .25; u.kx = (+m.dx || 0) * 7; u.kz = (+m.dz || 0) * 7; u.vy = 4;
  if (u.animal) u.huir = 5;
  if (u.vida > 0) return;
  const items = [];
  if (esMon) { if (Math.random() < .5) items.push([I.CARBON, 1]); quitarMonstruo(o); }
  else { const T = TIPOS[u.animal]; if (T && T.suelta) for (const [id, n] of T.suelta()) if (n) items.push([id, n]); polvo(o.position.x, o.position.y + .6, o.position.z, T ? T.color : '#fff', 12); quitarAnimal(o); }
  if (items.length) mpEnviar({ t: 'uno', para: m.id, tipo: 'drop', items });
}

// ═════════ FRASES, JUGADORES, ECHAR, BLOQUEAR, REPORTAR ═════════
function pintarFrases() {
  $('mpFrases').innerHTML = Array.from({ length: 12 }, (_, k) => `<div class="mb" data-fr="${k}">${TR('fr' + k)}</div>`).join('');
  const l = [`<div class="mpJug"><div class="nom">${miNombre} ${TR('vos')}${MP.dueno ? ' · ' + TR('dueno') : ''}</div></div>`];
  for (const j of MP.jug.values()) { const bl = MP.bloqueados.has(j.nombre);
    l.push(`<div class="mpJug"><div class="nom">${j.nombre}${j.id === MP.duenoId ? ' · ' + TR('dueno') : ''}</div>${MP.dueno ? `<div class="mb rojo" data-echar="${j.id}">${TR('echar')}</div>` : ''}<div class="mb" data-bloq="${j.id}">${TR(bl ? 'desbloquear' : 'bloquear')}</div><div class="mb" data-rep="${j.id}">${TR('reportar')}</div></div>`); }
  $('mpJugadores').innerHTML = l.join('');
}
$('bFrases').addEventListener('pointerdown', e => { e.stopPropagation(); if (!MP.sala) return; soltarTodo(); pintarFrases(); $('mpFrasesCapa').hidden = false; });
$('mpFrasesCerrar').onclick = () => { $('mpFrasesCapa').hidden = true; };
$('mpFrasesCapa').addEventListener('click', e => {
  let d;
  if (d = e.target.closest('[data-fr]')) { const k = +d.dataset.fr; mpEnviar({ t: 'f', k }); feed(`<b>${miNombre}:</b> ${TR('fr' + k)}`); $('mpFrasesCapa').hidden = true; return; }
  if (d = e.target.closest('[data-echar]')) { mpEnviar({ t: 'echar', id: +d.dataset.echar }); quitarJugador(+d.dataset.echar); pintarFrases(); return; }
  if (d = e.target.closest('[data-bloq]')) { const j = MP.jug.get(+d.dataset.bloq); if (!j) return; if (MP.bloqueados.has(j.nombre)) MP.bloqueados.delete(j.nombre); else MP.bloqueados.add(j.nombre);
    try { localStorage.setItem('voxBloqueados', JSON.stringify([...MP.bloqueados])); } catch (er) {} if (j.g) j.g.visible = !MP.bloqueados.has(j.nombre); pintarFrases(); return; }
  if (d = e.target.closest('[data-rep]')) { const id = +d.dataset.rep;
    d.parentNode.innerHTML = `<div class="nom">${TR('reportar')}: ${(MP.jug.get(id) || {}).nombre || ''}</div>` + ['motivoMolesta', 'motivoRompe', 'motivoOtro'].map(k => `<div class="mb" data-motivo="${k}" data-id="${id}">${TR(k)}</div>`).join(''); return; }
  if (d = e.target.closest('[data-motivo]')) { mpEnviar({ t: 'reportar', id: +d.dataset.id, motivo: d.dataset.motivo }); pintarFrases(); }
});
// los que no pueden construir no ven "jugar con amigos" ni opciones del dueño
{ const ob = new MutationObserver(() => { if ($('bAmigos')) $('bAmigos').style.display = MP.invitado ? 'none' : ''; if ($('bOpcionesMundo') && MP.invitado) $('bOpcionesMundo').style.display = 'none'; if ($('bCompartirMundo')) $('bCompartirMundo').style.display = MP.invitado ? 'none' : ''; }); ob.observe($('pausa'), { attributes: true, attributeFilter: ['hidden'] }); }

// ═════════ CADA CUADRO ═════════
let mpEstT = 0, mpBichT = 0, mpHoraT = 0, mpColaT = 0, ultEnvio = '';
function mpFrame(dt) {
  if (!MP.sala) return;
  // mandar mi posición ~10 veces por segundo (solo si cambió)
  mpEstT -= dt; if (mpEstT <= 0 && jugando) { mpEstT = .1;
    const e = { t: 'e', x: +J.x.toFixed(2), y: +J.y.toFixed(2), z: +J.z.toFixed(2), r: +J.yaw.toFixed(2), v: +(J.rapidez || 0).toFixed(1), s: swing > .9 ? 1 : 0 }; if (window.mpExtraE) Object.assign(e, mpExtraE()); const k = e.x + ',' + e.y + ',' + e.z + ',' + e.r + ',' + e.s + ',' + e.vi;
    if (k !== ultEnvio || Math.random() < .05) { ultEnvio = k; mpEnviar(e); } }
  if (MP.dueno && jugando) {
    mpBichT -= dt; if (mpBichT <= 0) { mpBichT = .2; if (MP.jug.size) mpEnviar({ t: 'm', l: fotoBichos() }); }
    mpHoraT -= dt; if (mpHoraT <= 0) { mpHoraT = 2; if (MP.jug.size) mpEnviar({ t: 'h', tiempo, hora: REG.hora, clima: window.climaTipo || 'sol' }); }
    mpColaT -= dt; if (mpColaT <= 0) { mpColaT = .15; if (MP.cola.length) { const ab = {}; for (let k = 0; k < MP.cola.length; k += 2) { const al = alfBajo(MP.cola[k]); if (al) ab[MP.cola[k]] = al; } mpEnviar(Object.keys(ab).length ? { t: 'b', c: MP.cola, ab } : { t: 'b', c: MP.cola }); MP.cola = []; } }
  }
  // mover suave a los demás jugadores
  const k = Math.min(1, dt * 10);
  for (const j of MP.jug.values()) {
    if (!j.g || !j.obj || !j.pos) continue;
    j.pos.x += (j.obj.x - j.pos.x) * k; j.pos.y += (j.obj.y - j.pos.y) * k; j.pos.z += (j.obj.z - j.pos.z) * k;
    if (Math.hypot(j.obj.x - j.pos.x, j.obj.z - j.pos.z) > 8) Object.assign(j.pos, j.obj);
    j.g.position.set(j.pos.x, j.pos.y, j.pos.z); j.cuerpo.rotation.y = j.yaw + Math.PI;
    const u = j.cuerpo.userData; if (u && u.piernas) { j.fase += dt * j.vel * 2.4; const amp = Math.min(1, j.vel / 4) * .75, s = Math.sin(j.fase) * amp;
      u.piernas[0].rotation.x = s; u.piernas[1].rotation.x = -s; u.brazos[1].rotation.x = -s * .9; u.brazos[0].rotation.x = s * .9;
      if (j.swing > 0) { j.swing = Math.max(0, j.swing - dt * 4); u.brazos[0].rotation.x = -.4 - Math.sin(j.swing * Math.PI) * 1.3; } }
    if (j.frase && (j.fraseT -= dt) <= 0) { j.g.remove(j.frase); j.frase = null; }
  }
  // animales y monstruos del dueño (en el invitado)
  if (MP.invitado) for (const b of MP.bichos.values()) { const p = b.g.position; p.x += (b.obj.x - p.x) * k; p.y += (b.obj.y - p.y) * k; p.z += (b.obj.z - p.z) * k;
    let d = b.ry - b.g.rotation.y; while (d > Math.PI) d -= 6.283; while (d < -Math.PI) d += 6.283; b.g.rotation.y += d * k;
    const u = b.g.userData, mv = Math.hypot(b.obj.x - p.x, b.obj.z - p.z); u.t = (u.t || 0) + dt * Math.min(8, mv * 20);
    if (u.patas) u.patas.forEach((pa, i) => { if (pa) pa.rotation.x = Math.sin(u.t + (i % 2) * Math.PI) * Math.min(.6, mv * 3); });
    if (u.mats && b.rojo !== b.rojoAntes) { b.rojoAntes = b.rojo; for (const mt of u.mats) if (mt.emissive) mt.emissive.setHex(b.rojo ? 0x660000 : 0); } }
}
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; try { mpFrame(dt); } catch (e) { console.error(e); } }; requestAnimationFrame(tick); }
// si cambio de personaje, los demás lo ven
{ const r0 = rearmarJugador; rearmarJugador = function () { const r = r0.apply(this, arguments); if (MP.sala) mpEnviar({ t: 'skin', skin: skinParaEnviar() }); return r; }; }
window.__mp = { MP, conectar, recibir, abrirSala, unirse, nombre: () => miNombre };
