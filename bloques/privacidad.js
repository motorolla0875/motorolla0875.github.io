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

// ═════════ CÓDIGO (para el equipo de revisión de Google / Apple) ═════════
// En la pantalla de Voxelium Pro: "Tengo un código". El código de revisión activa Pro por 30 días en ese teléfono.
const COD_REVISION = 'VOXREVIEW26';
Object.assign(TX.es, { codLink: 'Tengo un código', codTit: 'Código', codPh: 'Escribe tu código', codOk: '¡CÓDIGO ACTIVADO!<small>Voxelium Pro por 30 días</small>', codMal: 'CÓDIGO NO VÁLIDO', codUsar: 'Usar código' });
Object.assign(TX.en, { codLink: 'I have a code', codTit: 'Code', codPh: 'Type your code', codOk: 'CODE ACTIVATED!<small>Voxelium Pro for 30 days</small>', codMal: 'INVALID CODE', codUsar: 'Redeem' });
Object.assign(TX.pt, { codLink: 'Tenho um código', codTit: 'Código', codPh: 'Digite seu código', codOk: 'CÓDIGO ATIVADO!<small>Voxelium Pro por 30 dias</small>', codMal: 'CÓDIGO INVÁLIDO', codUsar: 'Usar código' });
if (TX.tr) Object.assign(TX.tr, { codLink: 'Kodum var', codTit: 'Kod', codPh: 'Kodunu yaz', codOk: 'KOD ETKİN!<small>30 gün Voxelium Pro</small>', codMal: 'GEÇERSİZ KOD', codUsar: 'Kullan' });
if (TX.id) Object.assign(TX.id, { codLink: 'Saya punya kode', codTit: 'Kode', codPh: 'Ketik kodemu', codOk: 'KODE AKTIF!<small>Voxelium Pro selama 30 hari</small>', codMal: 'KODE TIDAK VALID', codUsar: 'Pakai kode' });
if (TX.ar) Object.assign(TX.ar, { codLink: 'لدي رمز', codTit: 'الرمز', codPh: 'اكتب رمزك', codOk: 'تم تفعيل الرمز!<small>Voxelium Pro لمدة 30 يومًا</small>', codMal: 'رمز غير صالح', codUsar: 'استخدم الرمز' });
{ const st = document.createElement('style'); st.textContent = `#codCapa .ventana { max-width: 380px; } #codCuerpo { padding: 14px 18px 16px; }
  #codIn { width: 100%; box-sizing: border-box; font: inherit; font-size: 18px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 10px 12px; border: 2px solid #c5cdee; border-radius: 12px; color: #1b2a6b; margin-bottom: 10px; }
  #codBtn { margin: 0 !important; width: 100%; } .proPie .leg a[data-cod] { font-weight: 700; }`; document.head.appendChild(st); }
cap('codCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="codTit"></div><div style="flex:1"></div><div class="cerrar" id="codX">X</div></div>
  <div id="codCuerpo"><input id="codIn" autocomplete="off" autocapitalize="characters" spellcheck="false"><div class="btn" id="codBtn" data-i="codUsar"></div></div></div>`);
$('codX').onclick = () => cerrar('codCapa');
$('codBtn').onclick = () => {
  const v = String($('codIn').value || '').trim().toUpperCase();
  if (v !== COD_REVISION) { aviso(TR('codMal'), 1500); return; }
  lsPoner('voxCodigoHasta', String(Math.max(+lsLeer('voxCodigoHasta', 0), Date.now() + 30 * 864e5)));
  cerrar('codCapa'); cerrar('proCapa'); aviso(TR('codOk'), 2400);
  if (typeof window.alCambiarPro === 'function') window.alCambiarPro();
  try { actualizarBotonPausa(); } catch (e) {}
};
{ const p0 = pintarPro; pintarPro = function () { const r = p0.apply(this, arguments);
    const d = document.querySelector('#proCuerpo .proPie .der2');
    if (d && !d.querySelector('[data-cod]')) { d.insertAdjacentHTML('beforeend', `<span class="leg"><a data-cod>${TR('codLink')}</a></span>`);
      d.querySelector('[data-cod]').onclick = () => { $('codIn').value = ''; $('codIn').placeholder = TR('codPh'); aplicarIdioma(); abrir('codCapa'); setTimeout(() => $('codIn').focus(), 50); }; }
    return r; }; }
