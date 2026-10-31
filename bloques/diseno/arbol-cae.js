'use strict';
// ═════════ TALAR ÁRBOLES: rompes un tronco y se cae todo el árbol ═════════
// Solo con árboles del mundo (los que nadie tocó): si alguien construyó con troncos y hojas, eso no se cae.
// Se rompen los troncos de abajo hacia arriba, uno tras otro, y después las hojas; en supervivencia te quedás con todo lo que suelta.
{ const ES_TRONCO = new Set(), ES_HOJA = new Set();
  for (const k in DEF) { const n = (DEF[k] || {}).nombre || ''; if (/^Tronco/.test(n)) ES_TRONCO.add(+k); if (/^Hojas/.test(n)) ES_HOJA.add(+k); }
  let talando = false;
  const natural = (x, y, z) => dentro(x, y, z) && !diffs.has(idx(x, y, z));
  function arbolDe(x0, y0, z0) {
    // troncos unidos (también en diagonal hacia arriba), desde el que rompiste para arriba
    const troncos = [], visto = new Set(), cola = [[x0, y0, z0]];
    while (cola.length && troncos.length < 70) { const [x, y, z] = cola.shift();
      for (let dx = -1; dx <= 1; dx++) for (let dy = 0; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) { if (!dx && !dy && !dz) continue;
        const xx = x + dx, yy = y + dy, zz = z + dz; if (yy < y0) continue; const k = idx(xx, yy, zz); if (visto.has(k) || !dentro(xx, yy, zz)) continue; visto.add(k);
        if (ES_TRONCO.has(get(xx, yy, zz)) && natural(xx, yy, zz)) { troncos.push([xx, yy, zz]); cola.push([xx, yy, zz]); } } }
    // hojas pegadas a esos troncos (hasta 4 bloques de distancia)
    const hojas = [], vh = new Set(), ch = [];
    for (const [x, y, z] of troncos.concat([[x0, y0, z0]])) ch.push([x, y, z, 0]);
    while (ch.length && hojas.length < 200) { const [x, y, z, d] = ch.shift(); if (d >= 5) continue;
      for (const [dx, dy, dz] of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) { const xx = x + dx, yy = y + dy, zz = z + dz; if (!dentro(xx, yy, zz) || yy < y0) continue; const k = idx(xx, yy, zz); if (vh.has(k)) continue; vh.add(k);
        if (ES_HOJA.has(get(xx, yy, zz)) && natural(xx, yy, zz)) { hojas.push([xx, yy, zz]); ch.push([xx, yy, zz, d + 1]); } } }
    return { troncos, hojas };
  }
  const r0 = romper; romper = function (h) {
    const t = get(h.x, h.y, h.z), esArbol = !talando && ES_TRONCO.has(t) && natural(h.x, h.y, h.z) && !(typeof aventura === 'function' && aventura());
    const A = esArbol ? arbolDe(h.x, h.y, h.z) : null;
    const res = r0.apply(this, arguments);
    // tiene que ser un árbol de verdad: con hojas arriba
    if (A && A.hojas.length >= 4 && get(h.x, h.y, h.z) === B.AIRE) {
      A.troncos.sort((a, b) => a[1] - b[1]);
      let k = 0;
      const siguiente = () => {
        if (k < A.troncos.length) { const [x, y, z] = A.troncos[k++]; if (ES_TRONCO.has(get(x, y, z))) { talando = true; try { r0({ x, y, z }); } catch (e) {} talando = false; } setTimeout(siguiente, 55); return; }
        // las hojas caen de a varias
        let n = 0; while (A.hojas.length && n < 6) { const [x, y, z] = A.hojas.shift(); if (ES_HOJA.has(get(x, y, z))) { talando = true; try { r0({ x, y, z }); } catch (e) {} talando = false; n++; } }
        if (A.hojas.length) setTimeout(siguiente, 35);
      };
      setTimeout(siguiente, 60);
    }
    return res; }; }
