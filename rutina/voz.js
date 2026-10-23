// Idioma, entrenador (voz de Dora o de Alex) y reproducción de las frases grabadas.
// Las frases están grabadas en voces/<idioma>-<F|M>/ y se arman juntando pedazos: ['v:descanso', 'v:despues', 'ej:sentadilla'].
(function () {
  const leer = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const escribir = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const nav = (navigator.language || 'es').slice(0, 2).toLowerCase();
  let lang = leer('rcIdioma') || (['es', 'en', 'pt'].includes(nav) ? nav : 'en');
  let voz = leer('rcVoz') || 'F';
  const base = (document.currentScript && document.currentScript.src || '').replace(/voz\.js.*$/, '');
  document.documentElement.lang = lang;

  const RC = window.RC = {
    get lang() { return lang; }, get voz() { return voz; }, get T() { return TXT[lang]; },
    elegido: !!(leer('rcIdioma') && leer('rcVoz')), mudo: false,
    // textos: RC.t('u', 'clave', { n: 3 })
    t(sec, key, vars) { let s = (TXT[lang][sec] || {})[key]; if (s == null) s = (TXT.es[sec] || {})[key]; if (s == null) return key; if (vars && typeof s === 'string') for (const k in vars) s = s.split('{' + k + '}').join(vars[k]); return s; },
    aplicar(raiz = document) {   // pone los textos en los elementos marcados con data-t="sec.clave"
      for (const el of raiz.querySelectorAll('[data-t]')) { const [sec, key] = el.dataset.t.split('.'); el.innerHTML = RC.t(sec, key); }
      const tt = (RC.t('u', 'titulo1') + ' ' + RC.t('u', 'titulo2')).toLowerCase(); document.title = tt.charAt(0).toUpperCase() + tt.slice(1);
    },
  };

  // ───── audio ─────
  let ac = null, cola = [], bufs = {}, cargando = {}, fin = 0, gen = 0;
  const archivo = k => `${base}voces/${lang}-${voz}/${k.replace(':', '_')}.mp3`;
  const texto = k => { const [s, id] = k.split(':'); if (s === 'n') return id; if (s === 'v') return id === 'hola' ? TXT[lang].v['hola' + voz] : TXT[lang].v[id]; if (s === 'po') return TXT[lang].po[id]; if (s === 'tr') { const x = TXT[lang].tr[id]; return x ? x[0] + '. ' + x[1] : ''; } if (s === 'ej') { const x = TXT[lang].ej[id]; return x ? x[0] : ''; } return ''; };
  RC.contexto = c => { ac = c; };
  RC.desbloquear = () => {   // en iPhone el audio solo arranca después de un toque
    try { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); const b = ac.createBuffer(1, 1, 22050), s = ac.createBufferSource(); s.buffer = b; s.connect(ac.destination); s.start(0); } catch (e) {}
  };
  function cargar(k) {
    const f = archivo(k);
    if (bufs[f]) return Promise.resolve(bufs[f]);
    if (!cargando[f]) cargando[f] = fetch(f).then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then(a => new Promise((ok, mal) => ac.decodeAudioData(a, ok, mal))).then(b => (bufs[f] = b)).catch(() => (bufs[f] = null));
    return cargando[f];
  }
  RC.precargar = (claves) => { if (!ac) return; for (const k of claves) cargar(k); };
  let fuentes = [];
  RC.callar = () => { gen++; for (const s of fuentes) try { s.stop(); } catch (e) {} fuentes = []; fin = 0; try { speechSynthesis.cancel(); } catch (e) {} };
  // habla(['v:descanso', 'v:despues', 'ej:sentadilla'], { cortar: true })
  RC.habla = async (claves, op = {}) => {
    if (RC.mudo || !claves || !claves.length) return;
    if (!Array.isArray(claves)) claves = [claves];
    if (op.cortar !== false) RC.callar();
    if (!ac) RC.desbloquear();
    const g = gen, lista = await Promise.all(claves.map(cargar));
    if (g !== gen) return;
    if (lista.some(b => !b)) {   // si falta algún audio, usa la voz del teléfono
      try { const u = new SpeechSynthesisUtterance(claves.map(texto).join(' ')); u.lang = { es: 'es-ES', en: 'en-US', pt: 'pt-BR' }[lang]; speechSynthesis.speak(u); } catch (e) {}
      return;
    }
    let t = Math.max(ac.currentTime + .02, fin);
    for (const b of lista) { const s = ac.createBufferSource(), gn = ac.createGain(); s.buffer = b; gn.gain.value = 1.15; s.connect(gn).connect(ac.destination); s.start(t); fuentes.push(s); t += b.duration + .06; }
    fin = t;
  };
  // claves de todo lo que dice la app, para tenerlas listas antes de entrenar
  RC.todas = () => [...Object.keys(TXT.es.v).filter(k => !k.startsWith('hola')).map(k => 'v:' + k), 'v:hola', ...Object.keys(TXT.es.po).map(k => 'po:' + k), ...Object.keys(TXT.es.tr).map(k => 'tr:' + k), ...Object.keys(TXT.es.ej).map(k => 'ej:' + k), ...Array.from({ length: 60 }, (_, i) => 'n:' + (i + 1))];
  RC.numero = n => 'n:' + Math.max(1, Math.min(60, Math.round(n)));

  // ───── pantalla para elegir idioma y entrenador ─────
  function cara(g) {   // retrato cómic de Dora o de Alex
    const piel = '#f2c9a0', t = '#2a2238', pelo = g === 'F' ? '#7a3b1e' : '#2e2016', rem = g === 'F' ? '#ff4d6d' : '#4f8fff';
    return `<svg viewBox="0 0 120 120" width="100%" height="100%">
      <rect x="0" y="0" width="120" height="120" rx="18" fill="${g === 'F' ? '#ffe3ea' : '#e2ecff'}"/>
      ${g === 'F' ? `<path d="M30 58 q-6 34 10 46 h40 q16-12 10-46 z" fill="${pelo}" stroke="${t}" stroke-width="3"/>` : ''}
      <path d="M22 120 q4-30 38-30 q34 0 38 30 z" fill="${rem}" stroke="${t}" stroke-width="3.5"/>
      <rect x="52" y="76" width="16" height="16" fill="${piel}" stroke="${t}" stroke-width="3"/>
      <circle cx="60" cy="56" r="26" fill="${piel}" stroke="${t}" stroke-width="3.5"/>
      <path d="${g === 'F' ? 'M33 54 q2-30 27-30 q26 0 27 30 q-10-12-27-14 q-17 2-27 14z' : 'M35 50 q0-24 25-24 q26 0 25 24 q-6-10-25-10 q-19 0-25 10z'}" fill="${pelo}" stroke="${t}" stroke-width="3"/>
      <rect x="33" y="40" width="54" height="9" rx="4" fill="#ffd23f" stroke="${t}" stroke-width="2.5"/>
      <circle cx="50" cy="58" r="3.2" fill="${t}"/><circle cx="70" cy="58" r="3.2" fill="${t}"/>
      <path d="M50 68 q10 9 20 0" fill="none" stroke="${t}" stroke-width="3" stroke-linecap="round"/>
      ${g === 'F' ? `<circle cx="34" cy="64" r="3" fill="#ffd23f" stroke="${t}" stroke-width="1.5"/><circle cx="86" cy="64" r="3" fill="#ffd23f" stroke="${t}" stroke-width="1.5"/>` : ''}
    </svg>`;
  }
  RC.elegir = (alListo) => {
    let d = document.getElementById('rcElegir');
    if (!d) {
      d = document.createElement('div'); d.id = 'rcElegir';
      d.innerHTML = `<style>
        #rcElegir { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'Baloo 2', system-ui, sans-serif; color: #2a2238;
          background: radial-gradient(circle, rgba(255,210,63,.18) 1.5px, transparent 2px) 0 0/12px 12px, repeating-conic-gradient(from 0deg at 50% 45%, #1f4a3f 0 7deg, #15302a 7deg 16deg); }
        #rcElegir .c { width: min(440px, 100%); max-height: 100%; overflow: auto; background: #fff8ec; border: 4px solid #2a2238; border-radius: 22px; box-shadow: 0 7px 0 #2a2238; padding: 14px 16px 16px; text-align: center; }
        #rcElegir h2 { font-size: 32px; line-height: .95; font-weight: 800; color: #3ec8a0; -webkit-text-stroke: 1.5px #2a2238; paint-order: stroke fill; text-shadow: 3px 3px 0 #2a2238; margin: 4px 0 6px; }
        #rcElegir .d { font-weight: 700; font-size: 14px; opacity: .75; }
        #rcElegir .idi { display: flex; gap: 6px; margin: 10px 0 12px; } #rcElegir .idi div { flex: 1; border: 3px solid #2a2238; border-radius: 12px; padding: 6px 0 3px; font-weight: 800; background: #fff; cursor: pointer; }
        #rcElegir .idi .sel { background: #ffd23f; }
        #rcElegir .ent { display: flex; gap: 10px; } #rcElegir .ent div.e { flex: 1; border: 4px solid #2a2238; border-radius: 18px; background: #fff; padding: 6px 6px 4px; cursor: pointer; box-shadow: 0 4px 0 #2a2238; }
        #rcElegir .ent .sel { background: #ffd23f !important; transform: translateY(-3px); }
        #rcElegir .ent .cr { height: 120px; } #rcElegir .ent .cr svg { width: 100%; height: 100%; }
        #rcElegir .ent b { display: block; font-size: 22px; line-height: 1; margin-top: 4px; } #rcElegir .ent small { font-weight: 700; opacity: .7; }
        #rcElegir .ok { display: block; margin-top: 14px; font: 800 21px/1 'Baloo 2', system-ui; color: #fff; background: #3ec8a0; border: 4px solid #2a2238; border-radius: 16px; box-shadow: 0 5px 0 #2a2238; padding: 12px 0 8px; cursor: pointer; }
        #rcElegir .lab { font-weight: 800; font-size: 12px; letter-spacing: 1px; opacity: .6; margin-top: 8px; }
      </style><div class="c"><h2 id="rcTit"></h2><div class="d" id="rcDes"></div><div class="lab" id="rcIdi"></div>
        <div class="idi" id="rcLangs"><div data-l="es">ESPAÑOL</div><div data-l="en">ENGLISH</div><div data-l="pt">PORTUGUÊS</div></div>
        <div class="ent" id="rcEnts"><div class="e" data-g="F"><div class="cr">${cara('F')}</div><b>DORA</b><small id="rcF"></small></div><div class="e" data-g="M"><div class="cr">${cara('M')}</div><b>ALEX</b><small id="rcM"></small></div></div>
        <div class="ok" id="rcOk"></div></div>`;
      document.body.appendChild(d);
      d.querySelector('#rcLangs').addEventListener('click', e => { const x = e.target.closest('[data-l]'); if (!x) return; lang = x.dataset.l; escribir('rcIdioma', lang); document.documentElement.lang = lang; pintar(); RC.desbloquear(); RC.habla(['v:hola']); });
      d.querySelector('#rcEnts').addEventListener('click', e => { const x = e.target.closest('[data-g]'); if (!x) return; voz = x.dataset.g; escribir('rcVoz', voz); pintar(); RC.desbloquear(); RC.habla(['v:hola']); });
      d.querySelector('#rcOk').addEventListener('click', () => { escribir('rcIdioma', lang); escribir('rcVoz', voz); RC.elegido = true; d.remove(); RC.desbloquear(); if (alListo) alListo(); });
    }
    function pintar() {
      d.querySelector('#rcTit').textContent = RC.t('u', 'elegir'); d.querySelector('#rcDes').textContent = RC.t('u', 'elegirD'); d.querySelector('#rcIdi').textContent = RC.t('u', 'idioma');
      d.querySelector('#rcF').textContent = RC.t('u', 'entrenadora'); d.querySelector('#rcM').textContent = RC.t('u', 'entrenador'); d.querySelector('#rcOk').textContent = RC.t('u', 'listoEmpezar');
      for (const x of d.querySelectorAll('[data-l]')) x.classList.toggle('sel', x.dataset.l === lang);
      for (const x of d.querySelectorAll('[data-g]')) x.classList.toggle('sel', x.dataset.g === voz);
    }
    pintar();
  };
})();
