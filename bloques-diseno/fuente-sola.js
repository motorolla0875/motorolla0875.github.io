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

// ═════════ Botones con un poco de transparencia (se ve el juego detrás) ═════════
{ const ALFA = .78;
  const st = document.createElement('style'); st.textContent = `.btn.azTr { backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }`; document.head.appendChild(st);
  const aRgba = s => s.replace(/rgba?\(([^)]+)\)/g, (m, v) => { const p = v.split(',').map(x => x.trim()); const a = p.length > 3 ? +p[3] : 1; return `rgba(${p[0]}, ${p[1]}, ${p[2]}, ${Math.min(a, ALFA)})`; });
  function trBtn(b) {
    if (b.closest('svg')) return;
    if (b.closest('#inicio, #mundos, #nuevo') || b.classList.contains('azEntrar') || b.id === 'bNuevo') { if (b.dataset.trK) { b.style.removeProperty('background-image'); b.style.removeProperty('background-color'); delete b.dataset.trK; b.classList.remove('azTr'); } return; } // sólidos, como Entrar y Crear mundo nuevo
    b.style.removeProperty('background-image'); b.style.removeProperty('background-color');
    const cs = getComputedStyle(b), img = cs.backgroundImage, col = cs.backgroundColor;
    const clave = img + '|' + col; if (b.dataset.trK === clave) return;
    if (img && img !== 'none') b.style.setProperty('background-image', aRgba(img), 'important');
    if (col && col !== 'rgba(0, 0, 0, 0)') b.style.setProperty('background-color', aRgba(col), 'important');
    b.dataset.trK = getComputedStyle(b).backgroundImage + '|' + getComputedStyle(b).backgroundColor; b.classList.add('azTr');
  }
  const todos = () => { for (const b of document.querySelectorAll('.btn')) { try { trBtn(b); } catch (e) {} } };
  todos(); setTimeout(todos, 500); setTimeout(todos, 2000);
  let p = 0; new MutationObserver(() => { if (p) return; p = 1; setTimeout(() => { p = 0; todos(); }, 120); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'hidden'] }); }

// ═════════ Ventanas (fabricar, bolsa, ajustes, logros… todo lo que se abre) con fondo transparente ═════════
{ const st = document.createElement('style'); st.textContent = `
  .ventana, .mVentana { background: rgba(242,245,255,.72) !important; backdrop-filter: blur(10px) saturate(1.2); -webkit-backdrop-filter: blur(10px) saturate(1.2); }
  .ventana .vCab, .mVentana .vCab { background: transparent !important; }
  #listaMundos .mundoFila .azFoto { flex: none; width: 68px; height: 38px; border-radius: 7px; background: #3a5a2a center / cover no-repeat; box-shadow: 0 0 0 2px rgba(255,255,255,.35); }
  #listaMundos .mundoFila .azFoto.sin { background-image: linear-gradient(180deg, #8fd0ff 0 48%, #4fb04a 48% 70%, #8a5a32 70%); }
`; document.head.appendChild(st); }

// ═════════ Foto de cada mundo: se saca sola mientras juegas y se muestra en Mis mundos ═════════
{ const CLAVE = id => 'voxFoto_' + id;
  function sacarFotoMundo() {
    try { if (typeof jugando === 'undefined' || !jugando || !mundoId || mundoId === 'tutorial' || mundoId === 'enlinea') return;
      const vis = manoG.visible, mv = marco.visible; marco.visible = false; manoG.visible = false; render.render(escena, cam); manoG.visible = vis; marco.visible = mv;
      const src = render.domElement, c = document.createElement('canvas'); c.width = 192; c.height = 108; const g = c.getContext('2d');
      const r = Math.max(192 / src.width, 108 / src.height), w = src.width * r, h = src.height * r; g.drawImage(src, (192 - w) / 2, (108 - h) / 2, w, h);
      const url = c.toDataURL('image/jpeg', .7); if (url.length > 2000) localStorage.setItem(CLAVE(mundoId), url);
    } catch (e) {} }
  // a los 4 segundos de entrar y después cada 45 segundos
  let t0 = 0, antes = false;
  setInterval(() => { const j = typeof jugando !== 'undefined' && jugando;
    if (j && !antes) t0 = Date.now(); antes = j;
    if (j) { const d = Date.now() - t0; if ((d > 4000 && d < 5100) || d % 45000 < 1000) sacarFotoMundo(); } }, 1000);
  { const s0 = salirAlMenu; salirAlMenu = function () { sacarFotoMundo(); return s0.apply(this, arguments); }; }
  const ponerFotos = () => { for (const fila of document.querySelectorAll('#listaMundos .mundoFila')) {
      if (fila.querySelector('.azFoto')) continue; const b = fila.querySelector('[data-entrar]'); if (!b) continue;
      let u = null; try { u = localStorage.getItem(CLAVE(b.dataset.entrar)); } catch (e) {}
      const d = document.createElement('div'); d.className = 'azFoto' + (u ? '' : ' sin'); if (u) d.style.backgroundImage = `url("${u}")`; fila.insertBefore(d, fila.firstChild); } };
  { const p0 = pintarMundos; pintarMundos = function () { const r = p0.apply(this, arguments); ponerFotos(); return r; }; }
  ponerFotos(); }
