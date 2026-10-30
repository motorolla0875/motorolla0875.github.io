// Prueba de letra única para todo el juego (Orbitron, licencia libre OFL)
{ const st = document.createElement('style'); st.textContent = `
  @font-face { font-family: 'Orbi'; src: url('../bloques-diseno/fonts/orbitron-latin-500-normal.woff2') format('woff2'); font-weight: 400 500; }
  @font-face { font-family: 'Orbi'; src: url('../bloques-diseno/fonts/orbitron-latin-700-normal.woff2') format('woff2'); font-weight: 600 700; }
  @font-face { font-family: 'Orbi'; src: url('../bloques-diseno/fonts/orbitron-latin-900-normal.woff2') format('woff2'); font-weight: 800 900; }
  body, body *:not(svg):not(svg *) { font-family: 'Orbi', 'Baloo 2', sans-serif !important; letter-spacing: .3px; }
  .titulo:not(.logoTitulo), .dzCartel span, .azSec, #inicio #bJugar { font-weight: 900 !important; letter-spacing: 2px !important; }
  .btn, .dzB, .azEntrar { letter-spacing: 1px !important; }
`; document.head.appendChild(st); }
