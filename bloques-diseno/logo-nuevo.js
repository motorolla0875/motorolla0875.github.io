// Logo nuevo (imagen) en todos lados + inicio centrado: logo arriba, JUGAR y el menú debajo
{ const st = document.createElement('style'); st.textContent = `
  svg.logoSvg { display: none !important; }
  img.logoImg { display: block; height: auto; max-width: 100%; pointer-events: none; filter: drop-shadow(0 0 12px rgba(47,140,255,.55)) drop-shadow(0 8px 16px rgba(0,0,0,.4)); }
  #inicio { align-items: center !important; justify-content: center !important; padding-left: 0 !important; text-align: center; }
  #inicio { background: radial-gradient(ellipse at 50% 40%, rgba(4,10,26,.15), rgba(4,10,26,.6) 75%) !important; }
  #inicio .logoTitulo { align-self: center !important; margin: 0 0 4px !important; width: auto !important; filter: none !important; }
  #inicio .logoTitulo img.logoImg { height: min(34vh, 270px); width: auto; }
  #inicio .lema { display: none !important; }
  #inicio .sub { align-self: center !important; text-align: center !important; margin: .4vh 0 2.2vh !important; font-weight: 700 !important; letter-spacing: 3px !important; text-transform: uppercase; color: #eaf4ff !important; font-size: clamp(12px, 2vh, 17px) !important; text-shadow: 0 2px 0 #071330, 0 0 14px rgba(47,140,255,.85) !important; }
  #inicio #bJugar { align-self: center !important; }
  #azMenu { display: flex; flex-direction: column; align-items: center; margin-top: .6vh; }
  #azMenu .filaBtn { display: contents !important; }
  #inicio #azMenu .btn { padding: .45vh 18px !important; }
  #inicio #azMenu .btn::before { display: none; }
  #inicio .btn:not(#bJugar):hover, #inicio .btn:not(#bJugar):active { transform: scale(1.06) !important; }
  .azLogo img.logoImg { width: 100%; }
  #introFin img.logoImg { width: min(62vw, 560px); margin: 0 auto; }
  @media (max-height: 500px) {
    #inicio .logoTitulo img.logoImg { height: 38vh; }
    #azMenu { flex-direction: row; flex-wrap: wrap; justify-content: center; max-width: 92vw; gap: 2px 4px; margin-top: 1vh; }
    #inicio #azMenu .btn { font-size: 13px !important; padding: 4px 12px !important; }
    #inicio .sub { margin-bottom: 1.4vh !important; font-size: 10px !important; letter-spacing: 2px !important; }
  }
`; document.head.appendChild(st); }
const logoSrc = '../bloques-diseno/logo-voxelium.webp';
function logoNuevo() {
  for (const sv of document.querySelectorAll('svg.logoSvg')) {
    const sig = sv.nextElementSibling; if (sig && sig.classList && sig.classList.contains('logoImg')) continue;
    const im = document.createElement('img'); im.className = 'logoImg'; im.src = logoSrc; im.alt = 'Voxelium'; im.draggable = false; sv.after(im);
  }
  const ini = document.getElementById('inicio'), jug = document.getElementById('bJugar'); if (!ini || !jug) return;
  let menu = document.getElementById('azMenu'); if (!menu) { menu = document.createElement('div'); menu.id = 'azMenu'; jug.after(menu); }
  if (menu.previousElementSibling !== jug) jug.after(menu);
  for (const el of [...ini.children]) { if (el === menu || el === jug || el.classList.contains('logoTitulo') || el.classList.contains('lema') || el.classList.contains('sub')) continue;
    if (el.classList.contains('btn') || el.classList.contains('filaBtn')) menu.appendChild(el); }
  const fj = jug.closest('.filaBtn'); if (fj && fj !== ini) { /* JUGAR dentro de una fila: el resto de esa fila va al menú */ for (const b of [...fj.children]) if (b !== jug) menu.appendChild(b); }
}
logoNuevo(); setTimeout(logoNuevo, 500); setTimeout(logoNuevo, 2000);
{ let p = 0; new MutationObserver(() => { if (p) return; p = 1; requestAnimationFrame(() => { p = 0; logoNuevo(); }); }).observe(document.body, { childList: true, subtree: true }); }
