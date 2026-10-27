'use strict';
// ═════════ COMPRAS DE VERDAD (Google Play, por RevenueCat) ═════════
// Solo dentro de la app. En la web no hace nada y la compra sigue siendo de prueba.
// Productos en Play Console:
//   - "Sin anuncios" (compra única):  com.dmithbuilds.voxelium.sinanuncios
//   - "Voxelium Pro" (suscripción):   voxelium_pro, con dos planes base: "mensual" y "anual"
// Si existen en RevenueCat los derechos (entitlements) "pro" y "sinanuncios", también se usan.

const RC_KEY_ANDROID = '';   // la clave pública de RevenueCat para Android (empieza con goog_)
const RC_SIN_ANUNCIOS = 'com.dmithbuilds.voxelium.sinanuncios';
const RC_PRO = 'voxelium_pro';

Object.assign(TX.es, { tiendaError: 'No se pudo conectar con Google Play. Prueba de nuevo.', tiendaRestaurado: 'Listo, recuperamos tus compras.' });
Object.assign(TX.en, { tiendaError: "Couldn't connect to Google Play. Please try again.", tiendaRestaurado: 'Done, your purchases are back.' });
Object.assign(TX.pt, { tiendaError: 'Não foi possível conectar ao Google Play. Tente de novo.', tiendaRestaurado: 'Pronto, recuperamos suas compras.' });
if (TX.tr) Object.assign(TX.tr, { tiendaError: "Google Play'e bağlanılamadı. Tekrar dene.", tiendaRestaurado: 'Tamam, satın aldıkların geri geldi.' });
if (TX.id) Object.assign(TX.id, { tiendaError: 'Tidak bisa terhubung ke Google Play. Coba lagi.', tiendaRestaurado: 'Selesai, pembelianmu sudah kembali.' });
if (TX.ar) Object.assign(TX.ar, { tiendaError: 'تعذّر الاتصال بـ Google Play. حاول مرة أخرى.', tiendaRestaurado: 'تم، استعدنا مشترياتك.' });

{ const C = window.Capacitor;
  const enApp = !!(C && C.isNativePlatform && C.isNativePlatform());
  const PUR = enApp && C.Plugins && C.Plugins.Purchases;
  if (enApp) {
    let listo = false, arrancando = null;
    const prods = {};   // 'sinAnuncios' | 'mensual' | 'anual' -> producto de la tienda

    // lo que dice la tienda manda: si la suscripción venció, se apaga Pro; si compró, se prende
    function aplicar(ci) {
      if (!ci) return;
      const act = (ci.entitlements && ci.entitlements.active) || {};
      const subs = ci.activeSubscriptions || [];
      const compras = ci.allPurchasedProductIdentifiers || [];
      const exp = ci.allExpirationDates || {};
      if (act.sinanuncios || compras.some(p => p.indexOf(RC_SIN_ANUNCIOS) === 0)) lsPoner('voxSinAnuncios', '1');
      const proSubs = subs.filter(p => p.indexOf(RC_PRO) === 0);
      if (act.pro || proSubs.length) {
        let hasta = act.pro && act.pro.expirationDate ? Date.parse(act.pro.expirationDate) : 0;
        for (const p of proSubs) { const t = Date.parse(exp[p] || ''); if (t > hasta) hasta = t; }
        lsPoner('voxProHasta', String(hasta > Date.now() ? hasta : Date.now() + 864e5));
      } else if (+lsLeer('voxProHasta', 0) > 0) lsPoner('voxProHasta', '0');
      try { if (typeof window.alCambiarPro === 'function') window.alCambiarPro(); } catch (e) {}
    }

    async function cargarProductos() {
      try {
        const a = await PUR.getProducts({ productIdentifiers: [RC_SIN_ANUNCIOS], type: 'NON_SUBSCRIPTION' });
        for (const p of a.products || []) if (p.identifier.indexOf(RC_SIN_ANUNCIOS) === 0) prods.sinAnuncios = p;
      } catch (e) {}
      try {
        const b = await PUR.getProducts({ productIdentifiers: [RC_PRO], type: 'SUBSCRIPTION' });
        for (const p of b.products || []) {
          const id = p.identifier || '';
          const per = (p.subscriptionPeriod || '').toUpperCase();
          if (/:mensual$/.test(id) || per === 'P1M') prods.mensual = p;
          else if (/:anual$/.test(id) || per === 'P1Y') prods.anual = p;
        }
      } catch (e) {}
      // los precios en la moneda de cada país
      for (const k of ['sinAnuncios', 'mensual', 'anual']) if (prods[k] && prods[k].priceString) AD_PRECIOS[k] = prods[k].priceString;
    }

    function arrancar() {
      if (listo) return Promise.resolve(true);
      if (!PUR || !RC_KEY_ANDROID) return Promise.resolve(false);
      if (arrancando) return arrancando;
      arrancando = (async () => {
        try {
          await PUR.configure({ apiKey: RC_KEY_ANDROID });
          listo = true;
          try { PUR.addCustomerInfoUpdateListener(ci => aplicar(ci)); } catch (e) {}
          await cargarProductos();
          try { const r = await PUR.getCustomerInfo(); aplicar(r.customerInfo); } catch (e) {}
        } catch (e) { console.warn('RevenueCat no arrancó', e); }
        arrancando = null; return listo;
      })();
      return arrancando;
    }

    window.comprarVoxelium = async que => {
      if (!(await arrancar())) { aviso(TR('tiendaError'), 2000); return false; }
      if (!prods[que]) await cargarProductos();
      const p = prods[que];
      if (!p) { aviso(TR('tiendaError'), 2000); return false; }
      try {
        const r = await PUR.purchaseStoreProduct({ product: p });
        aplicar(r && r.customerInfo);
        return true;
      } catch (e) {
        if (e && (e.userCancelled || e.code === '1' || /cancel/i.test(String(e.message || '')))) return false;
        console.warn('compra fallida', e); aviso(TR('tiendaError'), 2000); return false;
      }
    };
    window.restaurarVoxelium = async () => {
      if (!(await arrancar())) { aviso(TR('tiendaError'), 2000); return; }
      try {
        const r = await PUR.restorePurchases(); aplicar(r.customerInfo);
        aviso(TR(sinAnuncios() ? 'tiendaRestaurado' : 'nadaRestaurar'), 1800);
      } catch (e) { aviso(TR('tiendaError'), 2000); }
    };
    setTimeout(arrancar, 1500);
  }
}
