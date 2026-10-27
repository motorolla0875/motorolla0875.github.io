'use strict';
// ═════════ PRIVACIDAD: política, términos y "borrar mis datos" ═════════
// · En Ajustes: una fila con Privacidad, Términos y Borrar mis datos.
// · En la pantalla de Voxelium Pro: enlaces a Términos y Privacidad (lo pide Apple para las suscripciones).
// · Borrar mis datos: el servidor borra los récords y los mapas subidos desde este teléfono.
//   Los mundos guardados están solo en el teléfono (se borran al desinstalar el juego).

const SITIO = 'https://voxelium.app';
Object.assign(TX.es, { privTit: 'Legal', privPol: 'Privacidad', privTer: 'Términos', privBorrar: 'Borrar mis datos',
  privBorrarT: '¿Borrar tus datos en línea?', privBorrarP: 'Se borran del servidor tus récords y los mapas que subiste desde este teléfono. No se puede deshacer.<br><small>Tus mundos están guardados solo en tu teléfono: se borran si desinstalas el juego.</small>',
  privSi: 'Sí, borrar', privNo: 'Cancelar', privListo: 'LISTO, BORRAMOS TUS DATOS', privError: 'NO SE PUDO CONECTAR<small>prueba de nuevo con internet</small>', privY: 'y' });
Object.assign(TX.en, { privTit: 'Legal', privPol: 'Privacy', privTer: 'Terms', privBorrar: 'Delete my data',
  privBorrarT: 'Delete your online data?', privBorrarP: 'Your records and the maps you uploaded from this phone will be deleted from the server. This cannot be undone.<br><small>Your worlds are saved only on your phone: they are deleted if you uninstall the game.</small>',
  privSi: 'Yes, delete', privNo: 'Cancel', privListo: 'DONE, YOUR DATA WAS DELETED', privError: "COULDN'T CONNECT<small>try again with internet</small>", privY: 'and' });
Object.assign(TX.pt, { privTit: 'Legal', privPol: 'Privacidade', privTer: 'Termos', privBorrar: 'Apagar meus dados',
  privBorrarT: 'Apagar seus dados online?', privBorrarP: 'Seus recordes e os mapas que você enviou deste celular serão apagados do servidor. Não dá para desfazer.<br><small>Seus mundos ficam salvos só no seu celular: são apagados se você desinstalar o jogo.</small>',
  privSi: 'Sim, apagar', privNo: 'Cancelar', privListo: 'PRONTO, APAGAMOS SEUS DADOS', privError: 'NÃO FOI POSSÍVEL CONECTAR<small>tente de novo com internet</small>', privY: 'e' });
if (TX.tr) Object.assign(TX.tr, { privTit: 'Yasal', privPol: 'Gizlilik', privTer: 'Şartlar', privBorrar: 'Verilerimi sil',
  privBorrarT: 'Çevrim içi verilerin silinsin mi?', privBorrarP: 'Rekorların ve bu telefondan yüklediğin haritalar sunucudan silinir. Geri alınamaz.<br><small>Dünyaların yalnızca telefonunda kayıtlı: oyunu kaldırırsan silinir.</small>',
  privSi: 'Evet, sil', privNo: 'İptal', privListo: 'TAMAM, VERİLERİN SİLİNDİ', privError: 'BAĞLANILAMADI<small>internetle tekrar dene</small>', privY: 've' });
if (TX.id) Object.assign(TX.id, { privTit: 'Legal', privPol: 'Privasi', privTer: 'Ketentuan', privBorrar: 'Hapus dataku',
  privBorrarT: 'Hapus data online-mu?', privBorrarP: 'Rekor dan peta yang kamu unggah dari ponsel ini akan dihapus dari server. Tidak bisa dibatalkan.<br><small>Duniamu hanya tersimpan di ponselmu: akan terhapus jika kamu menghapus game.</small>',
  privSi: 'Ya, hapus', privNo: 'Batal', privListo: 'SELESAI, DATAMU SUDAH DIHAPUS', privError: 'TIDAK BISA TERHUBUNG<small>coba lagi dengan internet</small>', privY: 'dan' });
if (TX.ar) Object.assign(TX.ar, { privTit: 'قانوني', privPol: 'الخصوصية', privTer: 'الشروط', privBorrar: 'احذف بياناتي',
  privBorrarT: 'حذف بياناتك على الإنترنت؟', privBorrarP: 'ستُحذف أرقامك القياسية والخرائط التي رفعتها من هذا الهاتف من الخادم. لا يمكن التراجع.<br><small>عوالمك محفوظة على هاتفك فقط: تُحذف إذا أزلت اللعبة.</small>',
  privSi: 'نعم، احذف', privNo: 'إلغاء', privListo: 'تم حذف بياناتك', privError: 'تعذّر الاتصال<small>حاول مرة أخرى مع الإنترنت</small>', privY: 'و' });

const urlLegal = p => `${SITIO}/${p}/?l=${LANG}`;
function abrirEnlace(u) { try { window.open(u, '_blank'); } catch (e) { location.href = u; } }

{ const st = document.createElement('style'); st.textContent = `
  #ajPriv .ajOpc > div { white-space: nowrap; }
  #ajPriv .rojo { background: #e8505b !important; color: #fff !important; }
  #privCapa .ventana { max-width: 460px; }
  #privCuerpo { padding: 14px 18px 16px; color: #1b2a6b; text-align: center; }
  #privCuerpo p { margin: 0 0 12px; font-weight: 700; } #privCuerpo small { display: block; margin-top: 6px; font-weight: 600; color: #5a6aa8; }
  #privCuerpo .filaBtn { display: flex; gap: 8px; } #privCuerpo .btn { flex: 1; margin: 0 !important; }
  #proCuerpo .proPie { line-height: 1.2; margin-top: 6px; } #proCuerpo .proPlan { padding-top: 6px; padding-bottom: 6px; } #proCuerpo .proUnico { margin-top: 6px; padding-top: 6px; padding-bottom: 6px; }
  .proPie .der2 { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex: none; }
  .proPie .leg { white-space: nowrap; } .proPie .leg a { color: #3a4fb0; text-decoration: underline; cursor: pointer; font-weight: 800; }
`; document.head.appendChild(st); }

// fila en Ajustes (antes del botón Listo)
{ const f = document.createElement('div'); f.className = 'ajFila'; f.id = 'ajPriv';
  f.innerHTML = `<span data-i="privTit"></span><div class="ajOpc"><div data-p="privacy" data-i="privPol"></div><div data-p="terms" data-i="privTer"></div><div data-p="borrar" class="rojo" data-i="privBorrar"></div></div>`;
  $('ajustes').insertBefore(f, $('bAjListo'));
  f.addEventListener('click', e => { const d = e.target.closest('[data-p]'); if (!d) return; if (d.dataset.p === 'borrar') pedirBorrar(); else abrirEnlace(urlLegal(d.dataset.p)); });
  aplicarIdioma(); }

// confirmar y borrar
cap('privCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="privBorrar"></div><div style="flex:1"></div><div class="cerrar" id="privX">X</div></div>
  <div id="privCuerpo"><p data-ih="privBorrarP"></p><div class="filaBtn"><div class="btn" id="privNo" data-i="privNo" style="background:#7c86ad"></div><div class="btn" id="privSi" data-i="privSi" style="background:#e8505b"></div></div></div></div>`);
function pedirBorrar() { aplicarIdioma(); abrir('privCapa'); }
$('privX').onclick = $('privNo').onclick = () => cerrar('privCapa');
let privEspera = null;
$('privSi').onclick = async () => {
  const dev = window.__dia ? __dia.miDev : (localStorage.getItem('voxDev') || '');
  $('privSi').classList.add('esperando');
  const fin = ok => { clearTimeout(privEspera); privEspera = null; $('privSi').classList.remove('esperando'); cerrar('privCapa'); aviso(TR(ok ? 'privListo' : 'privError'), 2400); };
  try {
    await __mp.conectar();
    privEspera = setTimeout(() => fin(false), 8000);
    window.__privFin = ok => { if (privEspera) { if (ok) { try { localStorage.removeItem('voxDev'); } catch (e) {} } fin(ok); } };
    __mp.MP.ws.send(JSON.stringify({ t: 'borrarDatos', dev }));
  } catch (e) { fin(false); }
};
{ const r0 = recibir; recibir = function (m) { if (m && m.t === 'datosBorrados') { if (window.__privFin) window.__privFin(!!m.ok); return; } return r0.apply(this, arguments); }; }

// enlaces a Términos y Privacidad en la pantalla de Voxelium Pro
{ const p0 = pintarPro; pintarPro = function () { const r = p0.apply(this, arguments);
    const rest = document.querySelector('#proCuerpo .proPie .rest');
    if (rest && !rest.parentNode.classList.contains('der2')) { const d = document.createElement('div'); d.className = 'der2'; rest.parentNode.insertBefore(d, rest); d.appendChild(rest);
      d.insertAdjacentHTML('beforeend', `<span class="leg"><a data-leg="terms">${TR('privTer')}</a> · <a data-leg="privacy">${TR('privPol')}</a></span>`);
      d.querySelectorAll('[data-leg]').forEach(a => a.onclick = () => abrirEnlace(urlLegal(a.dataset.leg))); }
    return r; }; }
