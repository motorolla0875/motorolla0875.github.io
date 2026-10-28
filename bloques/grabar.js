'use strict';
// ═════════ GRABAR LA PARTIDA (botón REC) ═════════
// Graba en 1920x1080 a 30 cuadros, con el sonido del juego, lo que se ve al jugar: el mundo 3D más la barra,
// los corazones, la comida, la mira, los carteles, la misión y la barra del jefe. Los botones táctiles no salen.
// En la compu el juego dibuja en 1080 mientras graba; en el celular dibuja en su calidad normal (para que no se trabe).

{
Object.assign(TX.es, { recT: 'Grabar video', recEmpieza: 'GRABANDO<small>toca el botón otra vez para terminar</small>', recListo: 'VIDEO LISTO<small>{n}</small>', recNo: 'ESTE NAVEGADOR NO PUEDE GRABAR VIDEO', recLargo: 'SE LLEGÓ AL MÁXIMO DE 15 MINUTOS', recGuardado: 'se guardó en Descargas', recCompartir: 'Guardar o compartir el video' });
Object.assign(TX.en, { recT: 'Record video', recEmpieza: 'RECORDING<small>tap the button again to stop</small>', recListo: 'VIDEO READY<small>{n}</small>', recNo: 'THIS BROWSER CANNOT RECORD VIDEO', recLargo: 'REACHED THE 15 MINUTE LIMIT', recGuardado: 'saved to Downloads', recCompartir: 'Save or share the video' });
Object.assign(TX.pt, { recT: 'Gravar vídeo', recEmpieza: 'GRAVANDO<small>toque o botão de novo para terminar</small>', recListo: 'VÍDEO PRONTO<small>{n}</small>', recNo: 'ESTE NAVEGADOR NÃO CONSEGUE GRAVAR VÍDEO', recLargo: 'CHEGOU AO LIMITE DE 15 MINUTOS', recGuardado: 'salvo em Downloads', recCompartir: 'Salvar ou compartilhar o vídeo' });

const W = 1920, H = 1080, MAX_SEG = 15 * 60;
{ const st = document.createElement('style'); st.textContent = `
  #bRec svg circle { transition: r .2s; } #bRec.on { background: #c8202e !important; border-color: #ff8a8a !important; }
  #recInd { position: fixed; top: max(8px, env(safe-area-inset-top)); left: 50%; transform: translateX(-50%); z-index: 7; display: flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 10px;
    background: rgba(13,21,61,.75); color: #fff; font: 800 14px 'Baloo 2', sans-serif; pointer-events: none; }
  #recInd i { width: 10px; height: 10px; border-radius: 50%; background: #ff2a3a; animation: recP 1s infinite; } @keyframes recP { 50% { opacity: .25; } }
  #recFin { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 10px; }`; document.head.appendChild(st); }
{ const b = document.createElement('div'); b.className = 'bChico'; b.id = 'bRec'; b.dataset.it = 'recT';
  b.innerHTML = '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.2" fill="#ff3a4a" stroke="#fff" stroke-width="1.6"/></svg>';
  $('botonesArriba').insertBefore(b, $('bPausa'));
  b.addEventListener('pointerdown', e => { e.stopPropagation(); alternar(); }); }
{ const d = document.createElement('div'); d.id = 'recInd'; d.hidden = true; d.innerHTML = '<i></i><span>0:00</span>'; document.body.appendChild(d); }
aplicarIdioma();

let rec = null;
const lienzo = document.createElement('canvas'); lienzo.width = W; lienzo.height = H; const cx = lienzo.getContext('2d');
const hud = document.createElement('canvas'); hud.width = W; hud.height = H; const hx = hud.getContext('2d');
const MIMES = ['video/mp4;codecs=avc1.640028,mp4a.40.2', 'video/mp4;codecs=avc1.42E01F,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
const esCelular = () => matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;

// cómo se pasa de la pantalla al video (se recorta al centro para que quede 16:9)
function encuadre() {
  const vw = innerWidth, vh = innerHeight, a = vw / vh;
  if (a > 16 / 9) { const s = H / vh, ancho = vh * 16 / 9; return { s, ox: (vw - ancho) / 2, oy: 0, ancho, alto: vh }; }
  const s = W / vw, alto = vw * 9 / 16; return { s, ox: 0, oy: (vh - alto) / 2, ancho: vw, alto };
}

// ─── dibujar lo que está encima del juego (HUD) leyendo la pantalla ───
const imgs = new Map();
function imagen(src) { let i = imgs.get(src); if (!i) { i = new Image(); i.src = src; imgs.set(src, i); if (imgs.size > 400) imgs.delete(imgs.keys().next().value); } return i.complete && i.naturalWidth ? i : null; }
function svgImg(svg) { let s = svg.outerHTML; if (!/xmlns=/.test(s)) s = s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"'); const cs = getComputedStyle(svg); if (cs.color) s = s.replace(/currentColor/g, cs.color); return imagen('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s)); }
const visible = el => { const s = getComputedStyle(el); return s.display !== 'none' && s.visibility !== 'hidden' && !el.hidden; };
function opacidad(el) { let o = 1; for (let e = el; e && e !== document.body; e = e.parentElement) o *= +getComputedStyle(e).opacity; return o; }
function redondo(g, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); g.beginPath(); if (g.roundRect) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h); }
function dibujarEl(el, E, op) {
  if (!visible(el)) return; const cs = getComputedStyle(el); op *= +cs.opacity; if (op < .02) return;
  const r = el.getBoundingClientRect();
  if (r.width < 1 || r.height < 1) { for (const n of el.children) dibujarEl(n, E, op); return; }
  if (el.id === 'mira') { const c = getComputedStyle(el, '::before'), c2 = getComputedStyle(el, '::after'), mx = (r.left + r.width / 2 - E.ox) * E.s, my = (r.top + r.height / 2 - E.oy) * E.s;
    hx.globalAlpha = op * .9; for (const [w, h] of [[parseFloat(c.width) || 2, parseFloat(c.height) || 18], [parseFloat(c2.width) || 18, parseFloat(c2.height) || 2]]) { hx.fillStyle = 'rgba(0,0,0,.35)'; hx.fillRect(mx - w * E.s / 2 - 1, my - h * E.s / 2 - 1, w * E.s + 2, h * E.s + 2); hx.fillStyle = c.backgroundColor || '#fff'; hx.fillRect(mx - w * E.s / 2, my - h * E.s / 2, w * E.s, h * E.s); } return; }
  const X = (r.left - E.ox) * E.s, Y = (r.top - E.oy) * E.s, Wd = r.width * E.s, Hd = r.height * E.s;
  hx.globalAlpha = op;
  // fondo, borde y redondeo
  const rad = (parseFloat(cs.borderTopLeftRadius) || 0) * E.s, bg = cs.backgroundColor;
  if (bg && !/rgba\(.*,\s*0\)$/.test(bg) && bg !== 'transparent') { hx.fillStyle = bg; redondo(hx, X, Y, Wd, Hd, rad); hx.fill(); }
  const bgi = cs.backgroundImage; if (bgi && bgi.startsWith('url(')) { const u = bgi.slice(4, -1).replace(/^["']|["']$/g, ''); const im = imagen(u); if (im) { const pad = Wd * .14; hx.imageSmoothingEnabled = false; hx.drawImage(im, X + pad, Y + pad, Wd - pad * 2, Hd - pad * 2); hx.imageSmoothingEnabled = true; } }
  else if (bgi && bgi.includes('gradient')) { const g = hx.createLinearGradient(X, 0, X + Wd, 0), cols = bgi.match(/rgba?\([^)]*\)|#[0-9a-f]{3,8}/gi) || []; cols.forEach((c, k) => g.addColorStop(cols.length > 1 ? k / (cols.length - 1) : 0, c)); hx.fillStyle = g; redondo(hx, X, Y, Wd, Hd, rad); hx.fill(); }
  const bw = parseFloat(cs.borderTopWidth) || 0; if (bw > 0 && cs.borderTopStyle !== 'none') { hx.strokeStyle = cs.borderTopColor; hx.lineWidth = bw * E.s; redondo(hx, X + bw * E.s / 2, Y + bw * E.s / 2, Wd - bw * E.s, Hd - bw * E.s, rad); hx.stroke(); }
  if (el.tagName.toLowerCase() === 'svg') { const im = svgImg(el); if (im) { hx.imageSmoothingEnabled = false; hx.drawImage(im, X, Y, Wd, Hd); hx.imageSmoothingEnabled = true; } return; }
  // textos
  for (const n of el.childNodes) {
    if (n.nodeType === 3) { const t = n.textContent.replace(/\s+/g, ' ').trim(); if (!t) continue; const rg = document.createRange(); rg.selectNodeContents(n); const rs = [...rg.getClientRects()]; if (!rs.length) continue;
      const peso = cs.fontWeight, fam = cs.fontFamily, tam = parseFloat(cs.fontSize);
      // si hay varias líneas, se reparte el texto por ancho
      const palabras = t.split(' '); let k = 0;
      for (const q of rs) { let linea = ''; hx.font = `${peso} ${tam * E.s}px ${fam}`;
        while (k < palabras.length) { const prueba = linea ? linea + ' ' + palabras[k] : palabras[k]; if (linea && hx.measureText(prueba).width > q.width * E.s * 1.04 && rs.length > 1) break; linea = prueba; k++; }
        if (!linea) continue; let f = tam * E.s; const m = hx.measureText(linea).width; if (m > 0 && Math.abs(m - q.width * E.s) / (q.width * E.s) > .12) { f *= (q.width * E.s) / m; hx.font = `${peso} ${f}px ${fam}`; }
        const x = (q.left - E.ox) * E.s, y = (q.top - E.oy) * E.s + q.height * E.s * .78;
        const sh = cs.textShadow && cs.textShadow !== 'none' ? cs.textShadow.match(/(rgba?\([^)]*\)|#[0-9a-f]+)\s+(-?[\d.]+)px\s+(-?[\d.]+)px/i) : null;
        if (sh) { hx.fillStyle = sh[1]; hx.fillText(linea, x + sh[2] * E.s, y + sh[3] * E.s); }
        hx.fillStyle = cs.color; hx.fillText(linea, x, y); } }
    else if (n.nodeType === 1) dibujarEl(n, E, op);
  }
}
const RAICES = ['bajoAgua', 'dano', 'arriba', 'vida', 'hambre', 'xpHud', 'mision', 'barra', 'mira', 'jefeBar', 'jefeBar2', 'aviso', 'flash'];
function pintarHud() {
  const E = encuadre(); hx.clearRect(0, 0, W, H); hx.textBaseline = 'alphabetic';
  if (!jugando) return;
  for (const id of RAICES) { const el = $(id); if (!el || el.hidden || el.closest('[hidden]')) continue; try { dibujarEl(el, E, opacidad(el.parentElement || el)); } catch (e) {} }
  hx.globalAlpha = 1;
  // la escarcha del frío
  const fr = $('pvFrio'); if (fr && +getComputedStyle(fr).opacity > .02) { const o = +getComputedStyle(fr).opacity, g = hx.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, W * .62); g.addColorStop(0, 'rgba(200,235,255,0)'); g.addColorStop(1, `rgba(200,235,255,${.85 * o})`); hx.fillStyle = g; hx.fillRect(0, 0, W, H); }
}

// ─── cada cuadro: mundo + HUD al video ───
let hudT = 0;
{ const r0 = render.render.bind(render); render.render = function (e, c) { const r = r0(e, c); if (rec && e === escena) componer(); return r; }; }
function componer() {
  const cv = render.domElement, E = encuadre(), sx = cv.width / innerWidth;
  cx.drawImage(cv, E.ox * sx, E.oy * sx, E.ancho * sx, E.alto * sx, 0, 0, W, H);
  const ahora = performance.now(); if (ahora - hudT > 100) { hudT = ahora; pintarHud(); }
  cx.drawImage(hud, 0, 0);
  const seg = (ahora - rec.t0) / 1000; $('recInd').lastElementChild.textContent = Math.floor(seg / 60) + ':' + String(Math.floor(seg % 60)).padStart(2, '0');
  if (seg > MAX_SEG) { aviso(TR('recLargo'), 2500); parar(); }
}

// ─── empezar y terminar ───
function alternar() { if (rec) parar(); else empezar(); }
function empezar() {
  if (!jugando) return; if (!window.MediaRecorder || !lienzo.captureStream) { aviso(TR('recNo'), 2000); return; }
  const mime = MIMES.find(m => { try { return MediaRecorder.isTypeSupported(m); } catch (e) { return false; } }) || '';
  const st = lienzo.captureStream(30);
  let dest = null; try { const c = audio(); if (c && AU.master) { dest = c.createMediaStreamDestination(); AU.master.connect(dest); for (const t of dest.stream.getAudioTracks()) st.addTrack(t); } } catch (e) { dest = null; }
  let mr; try { mr = new MediaRecorder(st, Object.assign(mime ? { mimeType: mime } : {}, { videoBitsPerSecond: esCelular() ? 5e6 : 8e6, audioBitsPerSecond: 160000 })); } catch (e) { try { mr = new MediaRecorder(st); } catch (e2) { aviso(TR('recNo'), 2000); return; } }
  const partes = []; mr.ondataavailable = ev => { if (ev.data && ev.data.size) partes.push(ev.data); };
  // en la compu: dibujar en 1080 mientras se graba
  const prevPR = render.getPixelRatio(); if (!esCelular()) { const pr = Math.min(2, Math.max(prevPR, H / Math.min(innerHeight, innerWidth * 9 / 16))); if (pr > prevPR + .01) { render.setPixelRatio(pr); medir(); } }
  rec = { mr, partes, dest, mime: mr.mimeType || mime, t0: performance.now(), prevPR };
  mr.onstop = terminar; mr.start(1000);
  $('bRec').classList.add('on'); $('recInd').hidden = false; aviso(TR('recEmpieza'), 1800); son(880, .08, 'triangle', .08);
  cx.fillStyle = '#000'; cx.fillRect(0, 0, W, H);
}
function parar() { if (!rec) return; const r = rec; try { r.mr.state !== 'inactive' && r.mr.stop(); } catch (e) { terminar(); } $('bRec').classList.remove('on'); $('recInd').hidden = true; son(440, .1, 'triangle', .08); }
function terminar() {
  const r = rec; if (!r) return; rec = null;
  try { if (r.dest) AU.master.disconnect(r.dest); } catch (e) {}
  if (Math.abs(render.getPixelRatio() - r.prevPR) > .01) { render.setPixelRatio(r.prevPR); medir(); }
  const tipo = (r.mime || 'video/webm').split(';')[0], ext = tipo.includes('mp4') ? 'mp4' : 'webm';
  const blob = new Blob(r.partes, { type: tipo }); if (!blob.size) return;
  const d = new Date(), nombre = `voxelium-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}.${ext}`;
  guardarVideo(blob, nombre, tipo);
}
async function guardarVideo(blob, nombre, tipo) {
  const archivo = new File([blob], nombre, { type: tipo });
  // en el celular: guardar o compartir (galería, YouTube, WhatsApp…)
  if (esCelular() && navigator.canShare && navigator.canShare({ files: [archivo] })) {
    try { await navigator.share({ files: [archivo], title: 'Voxelium' }); aviso(TR('recListo', { n: nombre }), 2500); return; } catch (e) { if (e && e.name === 'AbortError') { descargar(blob, nombre); return; } } }
  descargar(blob, nombre);
}
function descargar(blob, nombre) {
  const u = URL.createObjectURL(blob), a = document.createElement('a'); a.href = u; a.download = nombre; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 60000); aviso(TR('recListo', { n: TR('recGuardado') }), 3000);
}
// si se sale al menú o la app pasa a segundo plano, se termina la grabación
{ const s0 = salirAlMenu; salirAlMenu = function () { parar(); return s0.apply(this, arguments); }; }
document.addEventListener('visibilitychange', () => { if (document.hidden) parar(); });
addEventListener('keydown', e => { if (e.code === 'KeyR' && jugando && !e.repeat && !(e.target && /input|textarea/i.test(e.target.tagName))) alternar(); });

window.__rec = { alternar, empezar, parar, grabando: () => !!rec, lienzo, pintarHud };
}
