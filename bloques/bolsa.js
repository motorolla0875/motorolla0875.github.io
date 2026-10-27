'use strict';
// ═════════ BOLSA: nombre del bloque elegido (en amarillo) y bloques por categoría en creativo ═════════

Object.assign(TX.es, { catTodo: 'Todo', catConstruir: 'Construcción', catNaturaleza: 'Naturaleza', catDeco: 'Decoración', catMec: 'Mecanismos', catObjetos: 'Objetos y comida' });
Object.assign(TX.en, { catTodo: 'All', catConstruir: 'Building', catNaturaleza: 'Nature', catDeco: 'Decoration', catMec: 'Mechanisms', catObjetos: 'Items and food' });
Object.assign(TX.pt, { catTodo: 'Tudo', catConstruir: 'Construção', catNaturaleza: 'Natureza', catDeco: 'Decoração', catMec: 'Mecanismos', catObjetos: 'Itens e comida' });

{ const st = document.createElement('style'); st.textContent = `
  #pCuerpo .elegido { color: #c8841a; font-weight: 800; margin-left: 8px; text-transform: none; }
  #pCuerpo .elegido::before { content: '›'; margin-right: 6px; color: #9aa3c4; }
  .catTabs { display: flex; flex-wrap: wrap; gap: 6px; margin: 2px 0 8px; }
  .catTabs .ct { padding: 4px 11px; border-radius: 10px; background: #e8ebf7; border: 2px solid #d5dbf3; font-weight: 800; font-size: 12px; color: #1b2a6b; cursor: pointer; }
  .catTabs .ct.on { background: #ffd23a; border-color: #c8841a; }
`; document.head.appendChild(st); }

// ─── a qué categoría va cada cosa ───
const NATURALES = () => new Set([B.PASTO, B.TIERRA, B.PIEDRA, B.ARENA, B.NIEVE, B.TRONCO, B.HOJAS, B.HOJAS_SELVA, B.HOJAS_PINO, B.ENREDADERA, B.HIELO, B.NENUFAR, B.ARBUSTO_SECO, B.CALABAZA, B.TELARANA, B.BROTE, B.CORAL, B.CORAL + 1, B.CORAL + 2, B.OBSIDIANA, B.PIEDRA_ABISMO, B.MAGMA, B.CRISTAL_OSC_M, B.PASTO_ALTO, B.FLOR_R, B.FLOR_A, B.COLMENA, B.HENO, B.CAMINO_T, B.CACTUS, B.ARADA].filter(x => x != null));
const MECANICOS = () => new Set([B.PUERTA, B.ESCALERA, B.BOTON, B.PALANCA, B.PLACA, B.TNT, B.TNT_G, B.RIEL, B.JAULA, B.DISPENSADOR, B.ZONA, B.META, B.CONTROL, B.PORTAL, B.GENERADOR, B.COFRE, B.HORNO, B.MESA_ENC, B.TOCADISCOS, B.CAMA].filter(x => x != null));
const DECO = () => new Set([B.ANTORCHA, B.LAMPARA, B.FAROL, B.CARTEL, B.ESTANTE, B.SILLA, B.MESA, B.SOFA, B.LAMPARA_P, B.CUADRO, B.TELE, B.CALABAZA_F, B.LAPIDA, B.VALLA, B.PANEL].filter(x => x != null));
let CAT_CACHE = null;
function categoria(id) {
  if (!CAT_CACHE) CAT_CACHE = { nat: NATURALES(), mec: MECANICOS(), deco: DECO() };
  if (ITEM[id]) return 'catObjetos';
  const d = DEF[id] || {};
  if (d.cat) return d.cat;
  if (CAT_CACHE.mec.has(id) || d.mec) return 'catMec';
  if (CAT_CACHE.deco.has(id) || (id >= B.ALFOMBRA && id < B.ALFOMBRA + TELAS.length) || (id >= B.HUEVO && id < B.HUEVO + 5)) return 'catDeco';
  if (CAT_CACHE.nat.has(id) || d.planta || /_M$/.test(Object.keys(B).find(k => B[k] === id) || '')) return 'catNaturaleza';
  return 'catConstruir';
}
const CATS = ['catTodo', 'catConstruir', 'catNaturaleza', 'catDeco', 'catMec', 'catObjetos'];
let catBolsa = 'catTodo', ultimoElegido = 0;

// el nombre de lo último que tocaste, al lado del título
const etiqueta = () => ultimoElegido ? `<span class="elegido">${esc(nom(ultimoElegido))}</span>` : '';
{ const p0 = pintarPanel; pintarPanel = function () {
    const r = p0.apply(this, arguments);
    if (panelTab !== 'bolsa' || cofreAbierto !== null) return r;
    const cu = $('pCuerpo');
    if (creativo()) {
      const lista = catBolsa === 'catTodo' ? TODOS : TODOS.filter(id => categoria(id) === catBolsa);
      cu.innerHTML = `<h4>${TR('tocaBloque')}${etiqueta()}</h4><div class="catTabs">${CATS.map(c => `<div class="ct${c === catBolsa ? ' on' : ''}" data-cat="${c}">${TR(c)}</div>`).join('')}</div><div class="grilla">${lista.map(id => slotHTML(id, 1, `data-poner="${id}"`)).join('')}</div>`;
    } else { const h = cu.querySelector('h4'); if (h && ultimoElegido) h.insertAdjacentHTML('beforeend', etiqueta()); }
    return r; }; }
// se anota qué tocaste antes de que la bolsa se vuelva a dibujar
$('panel').addEventListener('pointerdown', e => {
  const c = e.target.closest('[data-cat]'); if (c) { e.stopPropagation(); catBolsa = c.dataset.cat; pintarPanel(); const g = $('pCuerpo'); if (g) g.scrollTop = 0; return; }
  const d = e.target.closest('[data-poner]'); if (d) { ultimoElegido = +d.dataset.poner; setTimeout(() => { const h = $('pCuerpo') && $('pCuerpo').querySelector('h4'); if (h && !h.querySelector('.elegido')) h.insertAdjacentHTML('beforeend', etiqueta()); }, 0); }
}, true);
// al cerrar la bolsa se borra el nombre
{ const c0 = cerrarPanel; cerrarPanel = function () { ultimoElegido = 0; return c0.apply(this, arguments); }; }
window.__bolsa = { categoria, CATS };
