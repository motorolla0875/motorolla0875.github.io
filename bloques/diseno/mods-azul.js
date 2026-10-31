'use strict';
// ═════════ MODS con el marco azul medio transparente (como Mis mundos y Personaje) ═════════
// · Mis mods, el editor de mods, el dibujo de texturas y las opciones: panel azul vidrio, título amarillo, letras blancas.
// · Tu criatura: pantalla completa, la criatura grande a la izquierda sobre la islita de pasto y las opciones a la derecha.

{ const VID = `background: linear-gradient(180deg, rgba(14,32,70,.62), rgba(8,20,46,.64)) !important; border: none !important; border-radius: 18px !important;
    box-shadow: inset 0 0 0 2px #2f6fd6, 0 0 0 1px rgba(110,180,255,.25), 0 0 24px rgba(40,120,255,.25), 0 20px 50px rgba(0,0,0,.45) !important;
    backdrop-filter: blur(10px) saturate(1.15) !important; -webkit-backdrop-filter: blur(10px) saturate(1.15) !important; color: #e8f0ff !important;`;
  const M = '#modsCapa, #modEd, #pixEd, #opcCapa, #criEd';
  const st = document.createElement('style'); st.textContent = `
  #modsCapa > .mVentana, #modEd > .mVentana, #pixEd > .mVentana, #opcCapa > .mVentana { ${VID} }
  :is(${M}) .vCab, :is(${M}) .vCuerpo, :is(${M}) .vPie { background: transparent !important; color: #e8f0ff !important; }
  :is(${M}) .vPie { border-top: 2px solid rgba(110,180,255,.25) !important; }
  :is(${M}) .vTit { color: #ffd23a !important; font-weight: 900 !important; text-shadow: 0 2px 0 #0d153d; }
  :is(${M}) h4 { color: #9fc4ff !important; text-transform: uppercase; letter-spacing: 1px; font-size: 13px !important; }
  :is(${M}) .campo, :is(${M}) input[type=text], :is(${M}) input:not([type]), :is(${M}) select, :is(${M}) textarea { background: rgba(8,20,46,.7) !important; color: #fff !important; border: 2px solid #3a6fc4 !important; border-radius: 10px !important; }
  :is(${M}) select option { background: #0b1a40; color: #fff; }
  :is(${M}) .fila { border-color: rgba(110,180,255,.2) !important; color: #e8f0ff !important; }
  :is(${M}) .fila small, :is(${M}) .nom small { color: #9fb8e0 !important; }
  :is(${M}) .vCuerpo > div:not(.fila):not(.pixWrap):not(.opcG):not(.paleta), :is(${M}) .ajFila, :is(${M}) .ajFila span { color: #e8f0ff !important; }
  :is(${M}) .paleta div { border: 2px solid #0d153d !important; border-radius: 6px !important; } :is(${M}) .paleta div.on { outline: 3px solid #fff !important; }
  /* ── Tu criatura: igual que Personaje ── */
  #criEd.cn { padding: 0 !important; align-items: stretch !important; justify-content: stretch !important; background: #0b1530 url('diseno/fondos/personaje.jpg') center / cover no-repeat !important; }
  #criEd.cn > .mVentana { zoom: 1 !important; width: 100vw !important; max-width: none !important; height: 100vh !important; height: 100dvh !important; max-height: none !important; margin: 0 !important;
    border: none !important; border-radius: 0 !important; box-shadow: none !important; background: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
    display: grid !important; grid-template-columns: minmax(0, 46fr) minmax(0, 54fr); grid-template-rows: auto minmax(0, 1fr) auto; overflow: hidden !important; }
  #cnEscena { grid-column: 1; grid-row: 1 / 4; position: relative; overflow: hidden; }
  #cnEscena canvas#criVista { position: absolute !important; inset: 0; width: 100% !important; height: 100% !important; border: none !important; background: none !important; }
  #cnEscena .cnNom { position: absolute; left: 0; right: 0; bottom: max(14px, env(safe-area-inset-bottom)); text-align: center; font-weight: 900; font-size: clamp(16px, 3.4vh, 26px); color: #fff; text-shadow: 0 2px 0 #0d153d, 0 0 12px rgba(0,0,0,.5); pointer-events: none; }
  #cnMarco { grid-column: 2; grid-row: 1 / 4; margin: max(10px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(10px, env(safe-area-inset-bottom)) 4px; z-index: 0; ${VID} }
  #criEd.cn .vCab, #criEd.cn .vCuerpo, #criEd.cn .vPie { grid-column: 2; position: relative; z-index: 1; margin: 0 calc(max(12px, env(safe-area-inset-right)) + 2px) 0 6px !important; }
  #criEd.cn .vCab { grid-row: 1; margin-top: max(10px, env(safe-area-inset-top)) !important; padding: 10px 12px 4px !important; border: none !important; }
  #criEd.cn .vCuerpo { grid-row: 2; overflow-y: auto !important; padding: 0 12px 8px !important; max-height: none !important; }
  #criEd.cn .vPie { grid-row: 3; margin-bottom: max(10px, env(safe-area-inset-bottom)) !important; padding: 8px 12px 10px !important; }
  #criEd.cn .pixWrap { display: block !important; } #criEd.cn .pixWrap > div { min-width: 0 !important; }
  #criEd.cn .vTit { font-size: clamp(18px, 3.6vh, 28px) !important; }
  #criEd.cn .paleta { grid-template-columns: repeat(auto-fill, 24px) !important; } #criEd.cn .paleta div { width: 24px !important; height: 24px !important; }
  @media (max-height: 500px) { #criEd.cn > .mVentana { grid-template-columns: minmax(0, 42fr) minmax(0, 58fr); } :is(${M}) h4 { font-size: 11px !important; margin: 6px 0 3px !important; } }
`; document.head.appendChild(st); }

// textos con <small> que quedaron escritos como texto (ej. "Cargar mapa o mod<small>…")
{ const arreglar = () => { for (const b of document.querySelectorAll('.mb, .btn')) { const t = b.textContent; if (t.includes('<small>') && !b.querySelector('small')) b.innerHTML = t; } };
  arreglar(); setTimeout(arreglar, 800); let p = 0; new MutationObserver(() => { if (p) return; p = 1; requestAnimationFrame(() => { p = 0; arreglar(); }); }).observe(document.body, { childList: true, subtree: true, characterData: true }); }

// ─── islita de pasto con los bloques del juego (la misma idea que en Personaje) ───
function islitaPasto(B0) {
  const tex = n => { const t = new THREE.TextureLoader().load(tileURL(n)); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; return t; };
  const mat = n => new THREE.MeshLambertMaterial({ map: tex(n) });
  const arriba = mat(TL.pastoArriba), costado = mat(TL.pastoCostado), tierra = mat(TL.tierra), piedra = mat(TL.piedra);
  const pasto = [costado, costado, arriba, tierra, costado, costado], tie = Array(6).fill(tierra), pie = Array(6).fill(piedra);
  const geo = new THREE.BoxGeometry(1, 1, 1), g = new THREE.Group();
  const capa = (y, r, mats, quitar) => { for (let i = -r; i <= r; i++) for (let j = -r; j <= r; j++) { if (quitar && Math.abs(i) === r && Math.abs(j) === r) continue; const b = new THREE.Mesh(geo, mats); b.scale.setScalar(B0); b.position.set(i * B0, y * B0, j * B0); g.add(b); } };
  capa(-.5, 2, pasto, true); capa(-1.5, 1, tie, false); capa(-1.5, 2, tie, true); capa(-2.5, 1, pie, true); capa(-3.5, 0, pie, false);
  const planta = (n, x, z, s) => { const m = new THREE.MeshLambertMaterial({ map: tex(n), transparent: true, alphaTest: .5, side: THREE.DoubleSide }); for (const a of [Math.PI / 4, -Math.PI / 4]) { const p = new THREE.Mesh(new THREE.PlaneGeometry(s, s), m); p.scale.setScalar(B0); p.position.set(x * B0, s * B0 / 2, z * B0); p.rotation.y = a; g.add(p); } };
  if (TL.pastoAlto !== undefined) { planta(TL.pastoAlto, -1.4, .9, .8); planta(TL.pastoAlto, 1.5, -1, .8); planta(TL.pastoAlto, 1.1, 1.3, .7); }
  return g;
}

// ─── Tu criatura en pantalla completa ───
let cnIsla = null, cnT = 0;
function cnArmar() {
  const C = $('criEd'); if (!C || C.classList.contains('cn')) return;
  C.classList.add('cn'); const V = C.querySelector('.mVentana'), cv = $('criVista');
  const E = document.createElement('div'); E.id = 'cnEscena'; E.innerHTML = '<div class="cnNom"></div>'; V.insertBefore(E, V.firstChild); E.insertBefore(cv, E.firstChild);
  const Mk = document.createElement('div'); Mk.id = 'cnMarco'; V.insertBefore(Mk, E.nextSibling);
}
function cnEscena3D() {
  const v = criVista, E = $('cnEscena'); if (!v || !E || !v.g) return;
  const w = Math.max(50, E.clientWidth), h = Math.max(50, E.clientHeight); v.r.setPixelRatio(Math.min(2, devicePixelRatio || 1)); v.r.setSize(w, h, false);
  // alto de la criatura (para que entre entera, grande)
  const caja = new THREE.Box3().setFromObject(v.g), al = Math.max(.6, caja.max.y - Math.min(0, caja.min.y)), an = Math.max(caja.max.x - caja.min.x, caja.max.z - caja.min.z, .6);
  const B0 = Math.max(.35, Math.min(.9, an * .45));
  if (!cnIsla || cnIsla.userData.b0 !== B0) { if (cnIsla) v.e.remove(cnIsla); cnIsla = islitaPasto(B0); cnIsla.userData.b0 = B0; }
  if (cnIsla.parent !== v.e) v.e.add(cnIsla);
  const tot = al + B0 * 2.2, d = tot * 1.25 / Math.tan(19 * Math.PI / 180) / 2 + an * .4;
  v.cam.fov = 38; v.cam.aspect = w / h; v.cam.position.set(0, al * .55 + .3, d); v.cam.lookAt(0, al * .45 - B0 * .9, 0); v.cam.updateProjectionMatrix();
  const n = document.querySelector('#cnEscena .cnNom'); if (n) n.textContent = ($('criNombre') && $('criNombre').value) || '';
}
{ const v0 = vistaCri; vistaCri = function () { cnArmar(); const r = v0.apply(this, arguments); try { cnEscena3D(); } catch (e) { console.error(e); } return r; }; }
{ const flotar = () => { requestAnimationFrame(flotar); const C = $('criEd'); if (!C || C.hidden || !criVista || !criVista.g || !cnIsla) return;
    cnT += .016; const y = Math.sin(cnT * 1.6) * .12; criVista.g.position.y = y; cnIsla.position.y = y; cnIsla.rotation.y = Math.sin(cnT * .3) * .25; };
  requestAnimationFrame(flotar);
  addEventListener('resize', () => { if ($('criEd') && !$('criEd').hidden) setTimeout(cnEscena3D, 50); });
  document.addEventListener('input', e => { if (e.target && e.target.id === 'criNombre') { const n = document.querySelector('#cnEscena .cnNom'); if (n) n.textContent = e.target.value; } }); }
