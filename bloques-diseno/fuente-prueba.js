// Una sola letra para todo el juego: Orbitron (licencia libre OFL)
{ const st = document.createElement('style'); st.id = 'orbiBase'; st.textContent = `
  @font-face { font-family: 'Orbi'; src: url('../bloques-diseno/fonts/orbitron-latin-500-normal.woff2') format('woff2'); font-weight: 100 500; }
  @font-face { font-family: 'Orbi'; src: url('../bloques-diseno/fonts/orbitron-latin-700-normal.woff2') format('woff2'); font-weight: 600 700; }
  @font-face { font-family: 'Orbi'; src: url('../bloques-diseno/fonts/orbitron-latin-900-normal.woff2') format('woff2'); font-weight: 800 900; }
  html, body, body *:not(svg):not(svg *), input, button, select, textarea { font-family: 'Orbi', sans-serif !important; }
  svg text, svg g, svg tspan { font-family: 'Orbi', sans-serif !important; font-style: normal !important; }
  .titulo:not(.logoTitulo), .dzCartel span, .azSec, #inicio #bJugar { font-weight: 900 !important; letter-spacing: 2px !important; }
  .btn, .dzB, .azEntrar { letter-spacing: .5px !important; }
  @media (min-height: 501px) { #pausa .btn { font-size: 13px !important; } #pausa .btn small { font-size: 9px !important; } }
  @media (max-height: 500px) { #pausa .btn { font-size: 15px !important; } .azTiles .btn { font-size: 8.5px !important; letter-spacing: 0 !important; } #mundos #bNuevo, #mundos #bNuevo * { font-size: 9px !important; white-space: nowrap; } #mundos #bNuevo svg { width: 14px !important; height: 14px !important; } }
`; document.head.appendChild(st); }
// cualquier regla de cualquier archivo que ponga otra letra pasa a Orbitron (también las que se agregan después)
const orbiFam = "'Orbi', sans-serif";
function orbiReglas(lista) { for (const r of lista) { try {
  if (r.cssRules && !r.style) orbiReglas(r.cssRules);
  else if (r.style && r.style.fontFamily && !/Orbi/.test(r.style.fontFamily) && r.type !== 5) r.style.setProperty('font-family', orbiFam, r.style.getPropertyPriority('font-family') || 'important');
} catch (e) {} } }
function orbiTodo() {
  for (const h of document.styleSheets) { try { orbiReglas(h.cssRules); } catch (e) {} }
  for (const el of document.querySelectorAll('[style*="font"]')) if (el.style.fontFamily && !/Orbi/.test(el.style.fontFamily)) el.style.setProperty('font-family', orbiFam, 'important');
  for (const g of document.querySelectorAll('svg [font-family]')) if (!/Orbi/.test(g.getAttribute('font-family'))) g.setAttribute('font-family', orbiFam);
  // el logo en gris plateado con luz azul (como los bordes del inventario)
  for (const sv of document.querySelectorAll('svg.logoSvg:not([data-gris])')) {
    sv.setAttribute('data-gris', '1');
    const grad = sv.querySelector('linearGradient');
    if (grad) grad.innerHTML = '<stop offset="0" stop-color="#ffffff"/><stop offset=".38" stop-color="#e3e8f0"/><stop offset=".52" stop-color="#b4bdcb"/><stop offset="1" stop-color="#7c8799"/>';
    const tx = [...sv.querySelectorAll('text')];
    if (tx.length >= 5) {
      tx[0].setAttribute('stroke', '#2f8cff'); tx[0].setAttribute('stroke-width', '30'); tx[0].setAttribute('opacity', '1');
      tx[1].setAttribute('stroke', '#5aa0ff'); tx[1].setAttribute('stroke-width', '24');
      tx[2].setAttribute('stroke', '#071330'); tx[2].setAttribute('stroke-width', '18');
      tx[3].setAttribute('fill', '#3a4458'); tx[3].setAttribute('stroke', '#3a4458');
    }
  }
  // el logo: Orbitron es más ancha, se ajusta al mismo largo
  for (const t of document.querySelectorAll('svg.logoSvg text')) if (!t.hasAttribute('textLength') && /VOX/i.test(t.textContent)) { t.setAttribute('textLength', '780'); t.setAttribute('lengthAdjust', 'spacingAndGlyphs'); }
}
orbiTodo(); setTimeout(orbiTodo, 300); setTimeout(orbiTodo, 1500); setTimeout(orbiTodo, 4000);
{ let pend = 0; new MutationObserver(() => { if (pend) return; pend = 1; requestAnimationFrame(() => { pend = 0; orbiTodo(); }); }).observe(document.documentElement, { childList: true, subtree: true }); }
