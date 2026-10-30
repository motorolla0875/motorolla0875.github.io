'use strict';
// ═════════ PERSONAJE en pantalla completa (pensado para jugar acostado) ═════════
// Izquierda: el personaje grande, flotando sobre una islita de pasto del juego, con un paisaje real del juego atrás.
// Derecha: todas las opciones, ordenadas en pestañas (Cuerpo, Ropa, Accesorios, Especial) para no tener que bajar tanto.

Object.assign(TX.es, { pnCuerpo: 'Cuerpo', pnRopa: 'Ropa', pnAcc: 'Accesorios', pnEsp: 'Especial' });
Object.assign(TX.en, { pnCuerpo: 'Body', pnRopa: 'Clothes', pnAcc: 'Accessories', pnEsp: 'Special' });
Object.assign(TX.pt, { pnCuerpo: 'Corpo', pnRopa: 'Roupa', pnAcc: 'Acessórios', pnEsp: 'Especial' });

{ const st = document.createElement('style'); st.textContent = `
  #skinCapa.pn { padding: 0 !important; align-items: stretch !important; justify-content: stretch !important; background: #0b1530 !important; }
  #skinCapa.pn > .mVentana { zoom: 1 !important; width: 100vw !important; max-width: none !important; height: 100vh !important; height: 100dvh !important; max-height: none !important; margin: 0 !important;
    border: none !important; border-radius: 0 !important; box-shadow: none !important; background: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
    display: grid !important; grid-template-columns: minmax(0, 46fr) minmax(0, 54fr); grid-template-rows: auto minmax(0, 1fr) auto; overflow: hidden !important; }
  #pnEscena { grid-column: 1; grid-row: 1 / 4; position: relative; overflow: hidden; background: #8fc4ef url('../bloques-diseno/fondos/personaje.jpg') center / cover no-repeat; }
  #pnEscena::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0) 70%, rgba(11,21,48,.35)); pointer-events: none; }
  #pnEscena canvas#skinVista { position: absolute !important; inset: 0; width: 100% !important; height: 100% !important; border: none !important; border-radius: 0 !important; background: none !important; }
  #pnEscena .pnNom { position: absolute; left: 0; right: 0; bottom: max(14px, env(safe-area-inset-bottom)); text-align: center; z-index: 2; font-weight: 900; font-size: clamp(16px, 3.4vh, 26px); color: #fff; text-shadow: 0 2px 0 #0d153d, 0 0 12px rgba(0,0,0,.5); pointer-events: none; }
  #skinCapa.pn .vCab, #skinCapa.pn .vCuerpo, #skinCapa.pn .vPie { grid-column: 2; background: rgba(242,245,255,.94) !important; margin: 0 !important; }
  #skinCapa.pn .vCab { grid-row: 1; padding: max(10px, env(safe-area-inset-top)) max(14px, env(safe-area-inset-right)) 6px 16px !important; border: none !important; }
  #skinCapa.pn .vCuerpo { grid-row: 2; overflow-y: auto !important; padding: 0 max(14px, env(safe-area-inset-right)) 8px 16px !important; max-height: none !important; }
  #skinCapa.pn .vPie { grid-row: 3; padding: 8px max(14px, env(safe-area-inset-right)) max(10px, env(safe-area-inset-bottom)) 16px !important; border-top: 2px solid rgba(13,21,61,.12); }
  #skinCapa.pn .pixWrap { display: block !important; }
  #skinCapa.pn #skinCuerpo { min-width: 0 !important; }
  #skinCapa.pn #skinCuerpo h4 { margin: 10px 0 5px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #3a4a8a; }
  #pnTabs { display: flex; gap: 6px; margin: 10px 0 2px; position: sticky; top: 0; z-index: 2; background: rgba(242,245,255,.98); padding: 6px 0; }
  #pnTabs > div { flex: 1; text-align: center; padding: 7px 4px; border-radius: 10px; border: 3px solid #0d153d; background: #7c86ad; color: #fff; font-weight: 900; font-size: 13px; cursor: pointer; text-shadow: 0 2px 0 rgba(13,21,61,.55); }
  #pnTabs > div.on { background: #3a86e8; }
  #skinCuerpo .pnSec[hidden] { display: none !important; }
  #skinCapa.pn .paleta { grid-template-columns: repeat(auto-fill, 26px) !important; }
  #skinCapa.pn .paleta div { width: 26px !important; height: 26px !important; border: 2px solid #0d153d !important; border-radius: 6px !important; }
  @media (max-height: 500px) {
    #skinCapa.pn > .mVentana { grid-template-columns: minmax(0, 42fr) minmax(0, 58fr); }
    #skinCapa.pn #skinCuerpo h4 { margin: 6px 0 3px; font-size: 11px; } #pnTabs { margin: 4px 0 0; padding: 4px 0; } #pnTabs > div { padding: 4px 2px; font-size: 11px; }
    #skinCapa.pn .vPie .mb { padding: 4px 10px !important; font-size: 12px !important; }
  }
  /* marco azul medio transparente, como Mis mundos: el paisaje ocupa toda la pantalla y el panel flota a la derecha */
  #skinCapa.pn { background: #0b1530 url('../bloques-diseno/fondos/personaje.jpg') center / cover no-repeat !important; }
  #skinCapa.pn #pnEscena { background: none !important; } #pnEscena::after { display: none; }
  #pnMarco { grid-column: 2; grid-row: 1 / 4; margin: max(10px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(10px, env(safe-area-inset-bottom)) 4px; border-radius: 18px; z-index: 0;
    background: linear-gradient(180deg, rgba(14,32,70,.62), rgba(8,20,46,.64)); box-shadow: inset 0 0 0 2px #2f6fd6, 0 0 0 1px rgba(110,180,255,.25), 0 0 24px rgba(40,120,255,.25), 0 20px 50px rgba(0,0,0,.45);
    backdrop-filter: blur(10px) saturate(1.15); -webkit-backdrop-filter: blur(10px) saturate(1.15); }
  #skinCapa.pn .vCab, #skinCapa.pn .vCuerpo, #skinCapa.pn .vPie { position: relative; z-index: 1; background: transparent !important; color: #fff !important; margin: 0 calc(max(12px, env(safe-area-inset-right)) + 2px) 0 6px !important; }
  #skinCapa.pn .vCab { margin-top: max(10px, env(safe-area-inset-top)) !important; padding: 10px 12px 4px !important; }
  #skinCapa.pn .vPie { margin-bottom: max(10px, env(safe-area-inset-bottom)) !important; padding: 8px 12px 10px !important; border-top: 2px solid rgba(110,180,255,.25) !important; }
  #skinCapa.pn .vCuerpo { padding: 0 12px 8px !important; }
  #skinCapa.pn .vTit { color: #ffd23a !important; font-weight: 900 !important; font-size: clamp(18px, 3.6vh, 28px) !important; text-shadow: 0 2px 0 #0d153d; }
  #skinCapa.pn #skinCuerpo, #skinCapa.pn #skinCuerpo div:not([data-c]):not(.on) { color: #e8f0ff; }
  #skinCapa.pn #skinCuerpo h4 { color: #9fc4ff !important; }
  #skinCapa.pn .campo, #skinCapa.pn #skinNombre { background: rgba(8,20,46,.7) !important; color: #fff !important; border: 2px solid #3a6fc4 !important; border-radius: 10px !important; }
  #skinCapa.pn #pnTabs { background: transparent !important; backdrop-filter: blur(6px); }
  #skinCapa.pn .secPro { background: rgba(255,200,60,.14) !important; border-color: #ffc531 !important; color: #fff !important; }
  #skinCapa.pn .paleta div.on { outline: 3px solid #fff !important; }
`; document.head.appendChild(st); }

let pnTab = 'cuerpo';
const PN_GRUPO = { nombrePj: 'cuerpo', piel: 'cuerpo', peinado: 'cuerpo', peloC: 'cuerpo', mejillasC: 'cuerpo', remeraC: 'ropa', pantalonC: 'ropa', zapatosC: 'ropa',
  sombreroC: 'acc', lentesC: 'acc', mochilaC: 'acc', bufandaC: 'acc', capaC: 'acc', especial: 'esp' };
function pnArmar() {
  const C = $('skinCapa'); if (!C || C.classList.contains('pn')) return;
  C.classList.add('pn'); const V = C.querySelector('.mVentana'), cv = $('skinVista');
  const E = document.createElement('div'); E.id = 'pnEscena'; E.innerHTML = '<div class="pnNom"></div>'; V.insertBefore(E, V.firstChild); E.insertBefore(cv, E.firstChild);
  const M = document.createElement('div'); M.id = 'pnMarco'; V.insertBefore(M, E.nextSibling);
}
// las secciones del editor se reparten en pestañas
function pnPestanas() {
  const cu = $('skinCuerpo'); if (!cu) return;
  const hijos = [...cu.children]; if (!hijos.length) return;
  const porTexto = {}; for (const k in PN_GRUPO) porTexto[TR(k)] = PN_GRUPO[k];
  let grupo = null; const secs = { cuerpo: [], ropa: [], acc: [], esp: [] }, arriba = [];
  for (const el of hijos) {
    if (el.tagName === 'H4') { const g = porTexto[el.textContent.trim()]; grupo = g || (grupo ? grupo : null); if (!g && !grupo) { arriba.push(el); continue; } }
    if (el.classList.contains('secPro')) { secs.esp.push(el); continue; }
    if (grupo) secs[grupo].push(el); else arriba.push(el);
  }
  if (!secs.cuerpo.length && !secs.ropa.length) return; // personaje del juego: no se edita, sin pestañas
  if (!secs[pnTab].length) pnTab = 'cuerpo';
  const tabs = document.createElement('div'); tabs.id = 'pnTabs';
  tabs.innerHTML = [['cuerpo', 'pnCuerpo'], ['ropa', 'pnRopa'], ['acc', 'pnAcc'], ['esp', 'pnEsp']].filter(([k]) => secs[k].length).map(([k, l]) => `<div data-pntab="${k}" class="${k === pnTab ? 'on' : ''}">${TR(l)}</div>`).join('');
  cu.innerHTML = ''; for (const el of arriba) cu.appendChild(el); cu.appendChild(tabs);
  for (const k in secs) { if (!secs[k].length) continue; const d = document.createElement('div'); d.className = 'pnSec'; d.dataset.sec = k; d.hidden = k !== pnTab; for (const el of secs[k]) d.appendChild(el); cu.appendChild(d); }
}
$('skinCuerpo').addEventListener('click', e => { const t = e.target.closest('[data-pntab]'); if (!t) return; e.stopPropagation(); pnTab = t.dataset.pntab;
  for (const x of document.querySelectorAll('#pnTabs > div')) x.classList.toggle('on', x.dataset.pntab === pnTab);
  for (const s of document.querySelectorAll('#skinCuerpo .pnSec')) s.hidden = s.dataset.sec !== pnTab; }, true);
{ const p0 = pintarSkins; pintarSkins = function () { const r = p0.apply(this, arguments); pnArmar(); try { pnPestanas(); } catch (e) { console.error(e); }
    const n = document.querySelector('#pnEscena .pnNom'); if (n) n.textContent = nombreSkin(skinDe(skinVer)); return r; }; }

// ─── la escena 3D: islita de pasto flotando, personaje grande ───
let pnIsla = null, pnT = 0;
function pnEscena3D() {
  const v = skinVista, E = $('pnEscena'); if (!v || !E) return;
  const w = Math.max(50, E.clientWidth), h = Math.max(50, E.clientHeight), dpr = Math.min(2, devicePixelRatio || 1);
  v.r.setPixelRatio(dpr); v.r.setSize(w, h, false);
  v.c.fov = 38; v.c.aspect = w / h; v.c.position.set(0, 1.05, 6.2); v.c.lookAt(0, .45, 0); v.c.updateProjectionMatrix();
  if (!pnIsla) {
    const tex = n => { const t = new THREE.TextureLoader().load(tileURL(n)); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; return t; };
    const mat = n => new THREE.MeshLambertMaterial({ map: tex(n) });
    const arriba = mat(TL.pastoArriba), costado = mat(TL.pastoCostado), tierra = mat(TL.tierra), piedra = mat(TL.piedra);
    const pasto = [costado, costado, arriba, tierra, costado, costado], tie = [tierra, tierra, tierra, tierra, tierra, tierra], pie = [piedra, piedra, piedra, piedra, piedra, piedra];
    const geo = new THREE.BoxGeometry(1, 1, 1), g = new THREE.Group(), B0 = .55; // tamaño de cada bloque de la islita
    const capa = (y, r, mats, quitar) => { for (let i = -r; i <= r; i++) for (let j = -r; j <= r; j++) { if (quitar && Math.abs(i) === r && Math.abs(j) === r) continue; const b = new THREE.Mesh(geo, mats); b.scale.setScalar(B0); b.position.set(i * B0, y * B0, j * B0); g.add(b); } };
    capa(-.5, 2, pasto, true); capa(-1.5, 1, tie, false); capa(-1.5, 2, tie, true); capa(-2.5, 1, pie, true); capa(-3.5, 0, pie, false);
    // pasto alto y una flor arriba (planos cruzados, como en el juego)
    const planta = (n, x, z, s) => { const m = new THREE.MeshLambertMaterial({ map: tex(n), transparent: true, alphaTest: .5, side: THREE.DoubleSide }); for (const a of [Math.PI / 4, -Math.PI / 4]) { const p = new THREE.Mesh(new THREE.PlaneGeometry(s, s), m); p.position.set(x * B0, s * B0 / 2, z * B0); p.scale.setScalar(B0); p.rotation.y = a; g.add(p); } };
    if (TL.pastoAlto !== undefined) { planta(TL.pastoAlto, -1.4, .9, .8); planta(TL.pastoAlto, 1.5, -1, .8); planta(TL.pastoAlto, 1.1, 1.3, .7); }
    const flor = ['florRoja', 'flor_r', 'florR', 'tulipanR'].map(k => TL[k]).find(x => x !== undefined); if (flor !== undefined) planta(flor, -1.2, -1.3, .7);
    pnIsla = g; }
  if (pnIsla.parent !== v.e) v.e.add(pnIsla);
  if (!v.e.userData.pnLuz) { v.e.userData.pnLuz = 1; const l2 = new THREE.DirectionalLight(0xfff4dd, .35); l2.position.set(-3, 2, 2); v.e.add(l2); }
}
{ const v0 = vistaSkin; vistaSkin = function () { const r = v0.apply(this, arguments); try { pnEscena3D(); } catch (e) { console.error(e); } return r; }; }
// flotar suave (arriba y abajo) y ajustar al tamaño de la pantalla
{ const flotar = () => { requestAnimationFrame(flotar); const C = $('skinCapa'); if (!C || C.hidden || !skinVista || !skinVista.g || !pnIsla) return;
    pnT += .016; const y = Math.sin(pnT * 1.6) * .14; skinVista.g.position.y = y; pnIsla.position.y = y; pnIsla.rotation.y = Math.sin(pnT * .3) * .25; };
  requestAnimationFrame(flotar);
  addEventListener('resize', () => { if (!$('skinCapa').hidden) setTimeout(pnEscena3D, 50); }); }
