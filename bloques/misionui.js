'use strict';
// ═════════ MISIÓN EN GRANDE ═════════
// Tocar el cartelito de la misión (arriba a la izquierda) abre una ventana grande para leerla bien,
// con el paso a paso, el progreso y las misiones que ya hiciste. Se cierra con la X o tocando afuera.
// Además: si tocas un animal con una comida que no come, te dice qué come.

Object.assign(TX.es, { misionTit: 'Misión {n} de {t}', misionComo: 'Cómo hacerla', misionProg: 'Progreso', misionHechas: 'Ya hiciste', misionTodas: '¡Completaste todas las misiones!', misionSig: 'Próxima', cerrarM: 'Cerrar', noCome: 'NO COME ESO<small>{a} come: {c}</small>' });
Object.assign(TX.en, { misionTit: 'Mission {n} of {t}', misionComo: 'How to do it', misionProg: 'Progress', misionHechas: 'Done so far', misionTodas: 'You completed every mission!', misionSig: 'Next', cerrarM: 'Close', noCome: "IT DOESN'T EAT THAT<small>{a} eats: {c}</small>" });
Object.assign(TX.pt, { misionTit: 'Missão {n} de {t}', misionComo: 'Como fazer', misionProg: 'Progresso', misionHechas: 'Você já fez', misionTodas: 'Você completou todas as missões!', misionSig: 'Próxima', cerrarM: 'Fechar', noCome: 'NÃO COME ISSO<small>{a} come: {c}</small>' });
if (TX.tr) Object.assign(TX.tr, { misionTit: 'Görev {n} / {t}', misionComo: 'Nasıl yapılır', misionProg: 'İlerleme', misionHechas: 'Tamamladıkların', misionTodas: 'Tüm görevleri tamamladın!', misionSig: 'Sıradaki', cerrarM: 'Kapat', noCome: 'BUNU YEMEZ<small>{a} şunu yer: {c}</small>' });
if (TX.id) Object.assign(TX.id, { misionTit: 'Misi {n} dari {t}', misionComo: 'Cara melakukannya', misionProg: 'Kemajuan', misionHechas: 'Sudah selesai', misionTodas: 'Kamu menyelesaikan semua misi!', misionSig: 'Berikutnya', cerrarM: 'Tutup', noCome: 'TIDAK MAKAN ITU<small>{a} makan: {c}</small>' });
if (TX.ar) Object.assign(TX.ar, { misionTit: 'المهمة {n} من {t}', misionComo: 'كيف تنفذها', misionProg: 'التقدم', misionHechas: 'ما أنجزته', misionTodas: 'أكملت كل المهام!', misionSig: 'التالية', cerrarM: 'إغلاق', noCome: 'لا يأكل هذا<small>{a} يأكل: {c}</small>' });

{ const st = document.createElement('style'); st.textContent = `
  #mision { pointer-events: auto !important; cursor: pointer; }
  #mision::after { content: ''; display: inline-block; width: 7px; height: 7px; margin-inline-start: 6px; border-right: 2px solid #ffff55; border-bottom: 2px solid #ffff55; transform: rotate(-45deg); vertical-align: 1px; opacity: .85; }
  #misionCapa .ventana { max-width: 560px; }
  #misionCuerpo { padding: 12px 16px 16px; color: #1b2a6b; overflow: auto; max-height: calc(100vh - 90px); }
  #misionCuerpo .grande { font-size: clamp(20px, 3.4vw, 26px); font-weight: 800; line-height: 1.2; margin-bottom: 10px; }
  #misionCuerpo .caja { background: #fff6d8; border: 2px solid #ffb21a; border-radius: 12px; padding: 8px 12px; margin-bottom: 10px; font-size: 16px; font-weight: 700; }
  #misionCuerpo .caja small { display: block; font-size: 12px; color: #8a6a1a; font-weight: 800; text-transform: uppercase; letter-spacing: .5px; }
  #misionCuerpo .prog { height: 12px; border-radius: 8px; background: #e2e6f5; overflow: hidden; margin-top: 6px; } #misionCuerpo .prog i { display: block; height: 100%; background: #36c95a; }
  #misionCuerpo .lista { font-size: 13px; color: #5a6aa8; font-weight: 700; } #misionCuerpo .lista div { display: flex; gap: 6px; align-items: center; padding: 2px 0; }
  #misionCuerpo .lista svg { flex: none; width: 14px; height: 14px; }
  #misionCerrar2 { margin: 6px auto 0; width: min(240px, 80%); }
`; document.head.appendChild(st); }
cap('misionCapa', `<div class="ventana"><div class="vCab"><div class="tab on" id="misionTab"></div><div style="flex:1"></div><div class="cerrar" id="misionCerrar">X</div></div><div id="misionCuerpo"></div></div>`);

const TILDE_M = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#36c95a"/><path d="M6.5 12.5l3.5 3.5 7.5-8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
let misionPausaba = false;
function abrirMisionGrande() {
  if (creativo() || aventura()) return;
  const total = MISIONES.length, c = $('misionCuerpo');
  $('misionTab').textContent = mision >= total ? TR('misionTodas') : TR('misionTit', { n: mision + 1, t: total });
  let h = '';
  if (mision >= total) h += `<div class="grande">${TR('misionTodas')}</div>`;
  else {
    const m = MISIONES[mision], p = m.p ? m.p() : '';
    h += `<div class="grande">${TR('m' + mision + 't')}</div>`;
    h += `<div class="caja"><small>${TR('misionComo')}</small>${TR('m' + mision + 'a')}</div>`;
    if (p) { const mm = String(p).match(/(\d+)\s*\/\s*(\d+)/); const pct = mm ? Math.min(100, Math.round(+mm[1] / Math.max(1, +mm[2]) * 100)) : 0;
      h += `<div class="caja"><small>${TR('misionProg')}</small>${p}${mm ? `<div class="prog"><i style="width:${pct}%"></i></div>` : ''}</div>`; }
    if (mision + 1 < total) h += `<div class="lista"><div><b>${TR('misionSig')}:</b>&nbsp;${TR('m' + (mision + 1) + 't')}</div></div>`;
  }
  if (mision > 0) h += `<div class="lista" style="margin-top:8px"><b>${TR('misionHechas')}</b>${Array.from({ length: Math.min(mision, total) }, (_, k) => `<div>${TILDE_M}<span>${TR('m' + k + 't')}</span></div>`).reverse().join('')}</div>`;
  h += `<div class="btn" id="misionCerrar2">${TR('cerrarM')}</div>`;
  c.innerHTML = h;
  $('misionCerrar2').onclick = cerrarMisionGrande;
  misionPausaba = pausado; pausado = true; soltarTodo(); abrir('misionCapa');
}
function cerrarMisionGrande() { cerrar('misionCapa'); pausado = misionPausaba; }
$('misionCerrar').onclick = cerrarMisionGrande;
$('misionCapa').addEventListener('pointerdown', e => { if (e.target === $('misionCapa')) cerrarMisionGrande(); });
$('mision').addEventListener('pointerdown', e => { e.stopPropagation(); e.preventDefault(); abrirMisionGrande(); });
$('mision').addEventListener('touchstart', e => { e.stopPropagation(); }, { passive: true });
window.abrirMisionGrande = abrirMisionGrande;

// ═════════ "NO COME ESO": tocar un animal con una comida que no es la suya ═════════
{ const t0 = tocar; tocar = function (dir) {
    try {
      const id = barra[sel];
      if (id && (esComida(id) || id === I.SEMILLAS || id === I.TRIGO_I || id === B.HENO)) {
        const m = monstruoApuntado(dir), h = apuntar(dir);
        if (m && (!h || m.t < h.t) && m.m.userData.animal) { const t = m.m.userData.animal, T = TIPOS[t] || {};
          if (!T.hostil && !T.dragon && !T.mascota && !comeEsto(t, id) && !['lobo', 'perro', 'gato', 'caballo', 'aldeano', 'golemHierro', 'golemNieve', 'murcielago'].includes(t)) {
            const nomA = (typeof NOM_CRIA !== 'undefined' && NOM_CRIA[LANG] && NOM_CRIA[LANG][t]) || t;
            aviso(TR('noCome', { a: nomA, c: comidaDe(t).map(x => nom(x)).join(', ') }), 1800); return; } }
      }
    } catch (e) {}
    return t0.apply(this, arguments); }; }
