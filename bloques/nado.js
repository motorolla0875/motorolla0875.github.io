'use strict';
// ═════════ NADAR: brazadas, patadas, cuerpo acostado al nadar rápido, burbujas y chapuzón al caer ═════════
(() => {
  const agua = (x, y, z) => get(Math.floor(x), Math.floor(y), Math.floor(z)) === B.AGUA;
  const PI2 = Math.PI * 2, burbujas = [];
  const geoB = new THREE.BoxGeometry(.07, .07, .07), matB = new THREE.MeshBasicMaterial({ color: 0xe4f6ff, transparent: true, opacity: .7 });
  let estaba = false, vyAntes = 0, ultChap = -9, reloj = 0, tB = .6, fase = 0, incl = 0, flota = 0, giro = false;

  function burbuja(x, y, z, grande) {
    if (burbujas.length > 70) return;
    const m = new THREE.Mesh(geoB, matB), s = grande ? 1.4 + Math.random() * .6 : .6 + Math.random() * .7;
    m.scale.set(s, s, s); m.position.set(x, y, z);
    m.userData = { t: 0, f: Math.random() * 6, vy: .8 + Math.random() * .7 };
    escena.add(m); burbujas.push(m);
  }
  function superficie(x, y, z) { let k = Math.floor(y); for (let i = 0; i < 12 && agua(x, k + 1, z); i++) k++; return k + .92; }
  function chapuzon(x, z, y, fuerza) {
    const n = Math.round(8 + fuerza * 14);
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(geoP, new THREE.MeshLambertMaterial({ color: i % 3 ? 0x8fd0ff : 0xffffff, transparent: true, opacity: .85 }));
      const a = Math.random() * PI2, r = .2 + Math.random() * .4, v = 1 + fuerza * 1.8;
      m.scale.setScalar(.35 + Math.random() * .4); m.position.set(x + Math.cos(a) * r, y, z + Math.sin(a) * r);
      m.userData = { vx: Math.cos(a) * v, vy: 2.5 + Math.random() * (2 + fuerza * 3.5), vz: Math.sin(a) * v, t: 0 };
      escena.add(m); parts.push(m);
    }
    for (let i = 0; i < 4 + fuerza * 8; i++) burbuja(x + (Math.random() - .5) * .7, y - .3 - Math.random() * (.4 + fuerza), z + (Math.random() - .5) * .7, i < 3);
    ruido(.35 + fuerza * .4, .16 + fuerza * .2, 900 + fuerza * 500);
    setTimeout(() => ruido(.3, .08 + fuerza * .06, 2600), 70);
  }
  function blup() { if (Math.random() < .5) son(260 + Math.random() * 180, .08, 'sine', .025); }

  const p0 = pjFrame;
  pjFrame = function (dt) {
    const r = p0(dt);
    if (!jugando || typeof jugador === 'undefined' || !jugador) return r;
    reloj += dt;
    const cuerpo = agua(J.x, J.y + .3, J.z), cabeza = agua(J.x, J.y + OJOS, J.z);
    const montado = window.montando || window.sentado || (typeof caballoMontado !== 'undefined' && caballoMontado);

    // chapuzón al entrar al agua (más grande si caes de alto)
    if (cuerpo && !estaba && !volando && reloj - ultChap > .5) {
      const fuerza = Math.max(0, Math.min(1, (-vyAntes - 2) / 14));
      if (vyAntes < -1.5 || Math.hypot(J.vx || 0, J.vz || 0) > 1.5) { chapuzon(J.x, J.z, superficie(J.x, J.y + .3, J.z), fuerza); ultChap = reloj; }
    }
    estaba = cuerpo; vyAntes = J.vy || 0;

    // burbujas cuando la cabeza está bajo el agua
    if (cabeza && !volando) {
      tB -= dt;
      if (tB <= 0) {
        tB = .7 + Math.random() * 1.1;
        const tercera = jugador.visible, f = tercera ? 0 : .45, s = Math.sin(J.yaw), c = Math.cos(J.yaw);
        const hx = J.x - s * (f + (tercera ? .2 : 0)), hz = J.z - c * (f + (tercera ? .2 : 0)), hy = J.y + (tercera ? (incl > .8 ? .9 : 1.45) : OJOS - .25);
        const n = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < n; i++) burbuja(hx + (Math.random() - .5) * .15, hy - i * .1, hz + (Math.random() - .5) * .15);
        blup();
      }
    }
    for (let i = burbujas.length - 1; i >= 0; i--) {
      const m = burbujas[i], u = m.userData; u.t += dt;
      m.position.y += u.vy * dt; m.position.x += Math.sin(u.t * 5 + u.f) * .25 * dt; m.position.z += Math.cos(u.t * 4 + u.f) * .25 * dt;
      if (u.t > 5 || !agua(m.position.x, m.position.y, m.position.z)) { escena.remove(m); burbujas.splice(i, 1); }
    }

    // animación de nado (vista de afuera)
    const u = jugador.userData, nada = cuerpo && !volando && !montado && jugador.visible;
    const vel = Math.hypot(J.vx || 0, J.vz || 0), rapido = nada && vel > 1.2;
    let meta = 0;
    if (nada) meta = rapido ? (cabeza ? Math.max(.5, Math.min(2.4, 1.5708 - J.pitch * .8)) : 1.2) : (vel > .5 ? .4 : .12);
    incl += (meta - incl) * Math.min(1, dt * 6);
    if (nada) {
      fase += dt * (rapido ? 6.5 : 3.2);
      if (rapido) {
        for (let k = 0; k < 2; k++) { if (k === 0 && swing > 0) continue; u.brazos[k].rotation.x = -((fase + k * Math.PI) % PI2); u.brazos[k].rotation.z = (k ? -1 : 1) * .12; }
        u.piernas[0].rotation.x = Math.sin(fase * 2.2) * .45; u.piernas[1].rotation.x = -Math.sin(fase * 2.2) * .45;
      } else {
        for (let k = 0; k < 2; k++) { if (k === 0 && swing > 0) continue; const s = k ? -1 : 1; u.brazos[k].rotation.x = -.55 + Math.sin(fase + k) * .35; u.brazos[k].rotation.z = s * (.6 + Math.cos(fase + k) * .35); }
        u.piernas[0].rotation.x = Math.sin(fase * 1.3) * .5; u.piernas[1].rotation.x = -Math.sin(fase * 1.3) * .5;
      }
      u.cab.rotation.x = -J.pitch * .6 - Math.min(1, incl * .6);
      if (u.capa) u.capa.rotation.x = -.2 - incl * .5 + Math.sin(fase * 2) * .08;
      flota = cabeza ? 0 : Math.sin(reloj * 2.4) * .06;
    } else flota = 0;
    if (!jugador.visible) { incl = 0; if (giro) { jugador.rotation.x = 0; giro = false; } }
    else if (incl > .002 || giro) {
      jugador.rotation.order = 'YXZ'; jugador.rotation.x = incl; giro = incl > .002;
      if (!giro) jugador.rotation.x = 0;
      // girar alrededor del pecho, no de los pies
      const oz = -.8 * Math.sin(incl), ry = jugador.rotation.y;
      jugador.position.x += oz * Math.sin(ry); jugador.position.z += oz * Math.cos(ry);
      jugador.position.y += .8 * (1 - Math.cos(incl)) + flota;
    } else if (flota) jugador.position.y += flota;
    return r;
  };
})();
