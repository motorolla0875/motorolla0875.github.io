// Clon exacto de Voxelium, solo cambia la letra: Orbitron (licencia libre OFL)
{ const st = document.createElement('style'); st.id = 'orbiBase'; st.textContent = `
  @font-face { font-family: 'Orbi'; src: url('../bloques-diseno/fonts/orbitron-latin-500-normal.woff2') format('woff2'); size-adjust: 84%; font-weight: 100 500; }
  @font-face { font-family: 'Orbi'; src: url('../bloques-diseno/fonts/orbitron-latin-700-normal.woff2') format('woff2'); size-adjust: 84%; font-weight: 600 700; }
  @font-face { font-family: 'Orbi'; src: url('../bloques-diseno/fonts/orbitron-latin-900-normal.woff2') format('woff2'); size-adjust: 84%; font-weight: 800 900; }
  html, body, body *:not(svg):not(svg *), input, button, select, textarea { font-family: 'Orbi', sans-serif !important; }
  svg text, svg g, svg tspan { font-family: 'Orbi', sans-serif !important; font-style: normal !important; }
  .titulo:not(.logoTitulo) { font-weight: 900 !important; letter-spacing: 1px !important; }
  .btn { letter-spacing: .3px !important; }
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
  // el logo: Orbitron es más ancha, se ajusta al mismo largo
  for (const t of document.querySelectorAll('svg.logoSvg text')) if (!t.hasAttribute('textLength') && /VOX/i.test(t.textContent)) { t.setAttribute('textLength', '700'); t.setAttribute('lengthAdjust', 'spacingAndGlyphs'); }
}
orbiTodo(); setTimeout(orbiTodo, 300); setTimeout(orbiTodo, 1500); setTimeout(orbiTodo, 4000);
{ let pend = 0; new MutationObserver(() => { if (pend) return; pend = 1; requestAnimationFrame(() => { pend = 0; orbiTodo(); }); }).observe(document.documentElement, { childList: true, subtree: true }); }
