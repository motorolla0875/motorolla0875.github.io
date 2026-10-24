'use strict';
// ═════════ INTRO: video corto del juego (solo la primera vez), se puede omitir ═════════
// Al terminar: "Ver tutorial" o "Entrar al juego". En Ajustes queda el botón "Ver intro".

Object.assign(TX.es, { omitir: 'Omitir', verTutorial: 'Ver tutorial', entrarJuego: 'Entrar al juego', verIntro: 'Ver intro', tutorialPronto: 'EL TUTORIAL LLEGA MUY PRONTO', introBienvenida: '¡Bienvenido a Voxelium!',
  in0: 'Explora mundos enormes', in1: 'Descubre aldeas', in2: 'Construye lo que imagines', in3: 'Bucea en el océano', in4: 'Viaja en vagoneta', in5: 'Sobrevive a la noche', in6: 'Juega con amigos en línea', in7: '' });
Object.assign(TX.en, { omitir: 'Skip', verTutorial: 'Watch tutorial', entrarJuego: 'Enter the game', verIntro: 'Watch intro', tutorialPronto: 'THE TUTORIAL IS COMING SOON', introBienvenida: 'Welcome to Voxelium!',
  in0: 'Explore huge worlds', in1: 'Discover villages', in2: 'Build anything you imagine', in3: 'Dive into the ocean', in4: 'Ride the minecart', in5: 'Survive the night', in6: 'Play online with friends', in7: '' });
Object.assign(TX.pt, { omitir: 'Pular', verTutorial: 'Ver tutorial', entrarJuego: 'Entrar no jogo', verIntro: 'Ver intro', tutorialPronto: 'O TUTORIAL CHEGA EM BREVE', introBienvenida: 'Bem-vindo ao Voxelium!',
  in0: 'Explore mundos enormes', in1: 'Descubra aldeias', in2: 'Construa o que imaginar', in3: 'Mergulhe no oceano', in4: 'Ande de carrinho', in5: 'Sobreviva à noite', in6: 'Jogue online com amigos', in7: '' });

// en qué segundo empieza cada texto (coincide con los cortes del video)
const INTRO_T = [0, 3, 6, 9.5, 12.5, 15.5, 18.5, 21];

{ const st = document.createElement('style'); st.textContent = `
  #introCapa { position: fixed; inset: 0; z-index: 99990; background: #000; display: flex; align-items: center; justify-content: center; font-family: 'Baloo 2', sans-serif; }
  #introCapa[hidden] { display: none; }
  #introVideo { width: 100%; height: 100%; object-fit: cover; background: #000; }
  #introTxt { position: absolute; left: 0; right: 0; bottom: 12%; text-align: center; font-weight: 800; font-size: clamp(22px, 5.4vw, 46px); color: #ffe14a; letter-spacing: .5px;
    text-shadow: 0 3px 0 #0d153d, 0 -2px 0 #0d153d, 2px 0 0 #0d153d, -2px 0 0 #0d153d, 0 0 18px rgba(0,0,0,.6); opacity: 0; transform: translateY(10px); transition: opacity .35s, transform .35s; pointer-events: none; padding: 0 20px; }
  #introTxt.ver { opacity: 1; transform: none; }
  #introLogo { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity .6s; pointer-events: none; }
  #introLogo.ver { opacity: 1; } #introLogo svg { width: min(70vw, 620px); height: auto; filter: drop-shadow(0 6px 0 rgba(13,21,61,.55)); }
  #introLogo .sub { color: #fff; font-weight: 800; font-size: clamp(14px, 2.6vw, 24px); letter-spacing: 3px; text-shadow: 0 2px 0 #0d153d; margin-top: -4px; }
  #introOmitir { position: absolute; top: max(14px, env(safe-area-inset-top)); right: max(14px, env(safe-area-inset-right)); display: flex; align-items: center; gap: 6px; background: rgba(13,21,61,.6); border: 2px solid rgba(255,255,255,.7); color: #fff;
    border-radius: 22px; padding: 6px 14px 6px 16px; font-weight: 800; font-size: 16px; cursor: pointer; opacity: 0; transition: opacity .4s; }
  #introOmitir.ver { opacity: 1; } #introOmitir svg { width: 18px; height: 18px; }
  #introSonido { position: absolute; top: max(14px, env(safe-area-inset-top)); left: max(14px, env(safe-area-inset-left)); width: 42px; height: 42px; border-radius: 50%; background: rgba(13,21,61,.6); border: 2px solid rgba(255,255,255,.7); display: flex; align-items: center; justify-content: center; cursor: pointer; }
  #introSonido[hidden] { display: none; } #introSonido svg { width: 24px; height: 24px; }
  #introFin { position: fixed; inset: 0; z-index: 99991; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; background: rgba(10,16,48,.25); font-family: 'Baloo 2', sans-serif; }
  #introFin[hidden] { display: none; } #introFin svg.logoSvg { width: min(62vw, 520px); height: auto; filter: drop-shadow(0 6px 0 rgba(13,21,61,.55)); }
  #introFin .bienv { color: #fff; font-weight: 800; font-size: clamp(16px, 3vw, 24px); text-shadow: 0 2px 0 #0d153d; margin: -6px 0 6px; }
  #introFin .btn { width: min(340px, 80vw); }
`; document.head.appendChild(st); }

const SVG_SALTAR = '<svg viewBox="0 0 24 24"><path d="M5 5l8 7-8 7z M13 5l8 7-8 7z" fill="#fff"/></svg>';
const SVG_MUDO = '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#fff"/><path d="M16 9l5 6M21 9l-5 6" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>';
let logoN = 0;
const logoClon = () => { const s = document.querySelector('#inicio .logoTitulo .logoSvg'); if (!s) return '<b style="font-size:60px;color:#ffe14a">VOXELIUM</b>'; const k = ++logoN; return s.outerHTML.replace(/oroM/g, 'oroI' + k).replace(/brilloM/g, 'brilloI' + k); };

{ const c = document.createElement('div'); c.id = 'introCapa'; c.hidden = true;
  c.innerHTML = `<video id="introVideo" playsinline webkit-playsinline preload="none"></video><div id="introTxt"></div><div id="introLogo"></div><div id="introOmitir"><span data-i="omitir"></span>${SVG_SALTAR}</div><div id="introSonido" hidden>${SVG_MUDO}</div>`;
  document.body.appendChild(c);
  const f = document.createElement('div'); f.id = 'introFin'; f.hidden = true;
  f.innerHTML = `<div id="introFinLogo"></div><div class="bienv" data-i="introBienvenida"></div><div class="btn" id="bVerTutorial" data-i="verTutorial"></div><div class="btn" id="bEntrarJuego" data-i="entrarJuego" style="background:linear-gradient(#ffd23a,#f5a62a);color:#1b2a6b;text-shadow:none"></div>`;
  document.body.appendChild(f); }

let introDesde = null, introTxtK = -1;
function verIntro(desde) {
  introDesde = desde || null; if (introDesde) $(introDesde).hidden = true;
  const v = $('introVideo'); if (!v.getAttribute('src')) v.src = 'intro.mp4';
  $('introLogo').innerHTML = logoClon() + '<div class="sub">BLOCK CRAFTING</div>';
  $('introLogo').classList.remove('ver'); $('introTxt').classList.remove('ver'); introTxtK = -1;
  $('introCapa').hidden = false; aplicarIdioma(); $('introOmitir').classList.remove('ver'); setTimeout(() => $('introOmitir').classList.add('ver'), 900);
  try { if (AU.ctx && AU.ctx.suspend) AU.ctx.suspend(); } catch (e) {}
  v.currentTime = 0; v.muted = false; $('introSonido').hidden = true;
  const p = v.play(); if (p && p.catch) p.catch(() => { v.muted = true; $('introSonido').hidden = false; v.play().catch(() => terminarIntro()); });
}
function terminarIntro() {
  const v = $('introVideo'); try { v.pause(); } catch (e) {}
  $('introCapa').hidden = true;
  try { localStorage.setItem('voxIntroVista', '1'); } catch (e) {}
  try { if (AU.ctx && AU.ctx.resume) AU.ctx.resume(); } catch (e) {}
  if (introDesde) { $(introDesde).hidden = false; introDesde = null; return; }
  // primera vez: elegir tutorial o entrar directo
  $('introFinLogo').innerHTML = logoClon(); $('inicio').hidden = true; $('introFin').hidden = false; aplicarIdioma();
}
$('introOmitir').onclick = e => { e.stopPropagation(); terminarIntro(); };
$('introSonido').onclick = e => { e.stopPropagation(); const v = $('introVideo'); v.muted = false; $('introSonido').hidden = true; };
$('introVideo').addEventListener('ended', terminarIntro);
$('introVideo').addEventListener('error', () => { if (!$('introCapa').hidden) terminarIntro(); });
$('introVideo').addEventListener('timeupdate', () => {
  const t = $('introVideo').currentTime; let k = 0; for (let i = 0; i < INTRO_T.length; i++) if (t >= INTRO_T[i]) k = i;
  if (k !== introTxtK) { introTxtK = k; const el = $('introTxt'); el.classList.remove('ver');
    setTimeout(() => { el.textContent = TR('in' + k); if (TR('in' + k)) el.classList.add('ver'); }, 180); }
  $('introLogo').classList.toggle('ver', t >= INTRO_T[7] + .3);
});
$('bVerTutorial').onclick = () => { if (typeof window.abrirTutorial === 'function') { $('introFin').hidden = true; window.abrirTutorial(); } else { const b = document.querySelector('#introFin .bienv'); b.textContent = TR('tutorialPronto'); setTimeout(() => { b.textContent = TR('introBienvenida'); }, 2200); } };
$('bEntrarJuego').onclick = () => { $('introFin').hidden = true; $('inicio').hidden = false; };

// botón "Ver intro" en Ajustes
{ const b = document.createElement('div'); b.className = 'btn'; b.id = 'bVerIntro'; b.dataset.i = 'verIntro'; b.onclick = () => verIntro('ajustes');
  $('ajustes').insertBefore(b, $('bAjListo')); aplicarIdioma(); }

// la primera vez que se abre el juego, cuando termina la precarga
{ let vista = false; try { vista = !!localStorage.getItem('voxIntroVista'); } catch (e) {}
  if (/[?&]intro\b/.test(location.search)) vista = false; // para mostrarla: .../bloques/?intro
  if (!vista) {
    $('introVideo').preload = 'auto'; $('introVideo').src = 'intro.mp4';
    const esperar = setInterval(() => { if (document.getElementById('precarga')) return; clearInterval(esperar); if (!jugando) verIntro(); }, 200);
  } }
window.__intro = { verIntro, terminarIntro };
