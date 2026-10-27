'use strict';
// ═════════ MAPAS OFICIALES "DEL JUEGO" EN LA LISTA DE MAPAS ═════════
// La Casa embrujada, el Parkour de lava, la Noche de zombis, el SkyBlock y el Faro de la costa se arman
// en el momento (no se descargan): aparecen en Mapas como tarjetas OFICIAL y, al jugar, se crean igual
// que desde "Mundo nuevo" (mismo botón). Si ya hay uno empezado, ofrece Seguir o Empezar de nuevo.

const ML = [
  { k: 'casa', btn: 'bCasa', foto: 'mapas-locales/casa.jpg', modo: 'aventura' },
  { k: 'parkour', btn: 'bParkour', foto: 'mapas-locales/parkour.jpg', modo: 'aventura', tipo: 'parkour' },
  { k: 'zombis', btn: 'bZombis', foto: 'mapas-locales/zombis.jpg', modo: 'supervivencia' },
  { k: 'sky', btn: 'bSky', foto: 'mapas-locales/sky.jpg', modo: 'supervivencia', tipo: 'skyblock' },
  { k: 'faro', btn: 'bEjemplo', foto: 'mapas-locales/faro.jpg', modo: 'creativo' },
];
const ML_TX = {
  es: { casa: ['Casa embrujada', 'Entra a la casa, encuentra las llaves y escapa de los fantasmas antes del amanecer.'], parkour: ['Parkour de lava', 'Salta de bloque en bloque antes de que suba la lava. Compite por el mejor tiempo.'],
    zombis: ['Noche de zombis', 'Construye defensas y sobrevive a oleadas de zombis cada vez más fuertes.'], sky: ['SkyBlock', 'Sobrevive en una isla pequeña en el cielo con muy pocos recursos.'],
    faro: ['Faro de la costa', 'Una casa, un faro y una granja ya construidos para explorar y seguir construyendo.'], seguir: 'Seguir', nuevo: 'Empezar de nuevo', delJuego: 'Del juego', jugar: 'Jugar' },
  en: { casa: ['Haunted House', 'Go into the house, find the keys and escape the ghosts before dawn.'], parkour: ['Lava Parkour', 'Jump from block to block before the lava rises. Go for the best time.'],
    zombis: ['Zombie Night', 'Build defenses and survive waves of ever stronger zombies.'], sky: ['SkyBlock', 'Survive on a tiny island in the sky with very few resources.'],
    faro: ['Coastal Lighthouse', 'A house, a lighthouse and a farm already built to explore and keep building.'], seguir: 'Continue', nuevo: 'Start over', delJuego: 'Built-in', jugar: 'Play' },
  pt: { casa: ['Casa assombrada', 'Entre na casa, encontre as chaves e fuja dos fantasmas antes do amanhecer.'], parkour: ['Parkour de lava', 'Pule de bloco em bloco antes que a lava suba. Dispute o melhor tempo.'],
    zombis: ['Noite dos zumbis', 'Construa defesas e sobreviva a ondas de zumbis cada vez mais fortes.'], sky: ['SkyBlock', 'Sobreviva numa ilha pequena no céu com pouquíssimos recursos.'],
    faro: ['Farol da costa', 'Uma casa, um farol e uma fazenda já construídos para explorar e continuar construindo.'], seguir: 'Continuar', nuevo: 'Começar de novo', delJuego: 'Do jogo', jugar: 'Jogar' },
  tr: { casa: ['Perili Ev', 'Eve gir, anahtarları bul ve şafaktan önce hayaletlerden kaç.'], parkour: ['Lav Parkuru', 'Lav yükselmeden bloktan bloğa atla. En iyi süre için yarış.'],
    zombis: ['Zombi Gecesi', 'Savunma kur ve giderek güçlenen zombi dalgalarından sağ çık.'], sky: ['SkyBlock', 'Gökyüzündeki küçük bir adada çok az kaynakla hayatta kal.'],
    faro: ['Sahil Feneri', 'Keşfetmek ve inşa etmeye devam etmek için hazır bir ev, fener ve çiftlik.'], seguir: 'Devam et', nuevo: 'Baştan başla', delJuego: 'Oyundan', jugar: 'Oyna' },
  id: { casa: ['Rumah Hantu', 'Masuk ke rumah, temukan kuncinya, dan kabur dari hantu sebelum fajar.'], parkour: ['Parkour Lava', 'Lompat dari blok ke blok sebelum lava naik. Kejar waktu terbaik.'],
    zombis: ['Malam Zombi', 'Bangun pertahanan dan bertahan dari gelombang zombi yang makin kuat.'], sky: ['SkyBlock', 'Bertahan di pulau kecil di langit dengan sumber daya sangat sedikit.'],
    faro: ['Mercusuar Pantai', 'Rumah, mercusuar, dan kebun yang sudah jadi untuk dijelajahi dan terus dibangun.'], seguir: 'Lanjutkan', nuevo: 'Mulai lagi', delJuego: 'Bawaan', jugar: 'Main' },
  ar: { casa: ['البيت المسكون', 'ادخل البيت وابحث عن المفاتيح واهرب من الأشباح قبل الفجر.'], parkour: ['باركور الحمم', 'اقفز من كتلة إلى أخرى قبل أن ترتفع الحمم. نافس على أفضل وقت.'],
    zombis: ['ليلة الزومبي', 'ابنِ دفاعاتك ونجُ من موجات زومبي تزداد قوة.'], sky: ['سكاي بلوك', 'انجُ في جزيرة صغيرة في السماء بموارد قليلة جدًا.'],
    faro: ['منارة الساحل', 'بيت ومنارة ومزرعة جاهزة للاستكشاف ومواصلة البناء.'], seguir: 'متابعة', nuevo: 'ابدأ من جديد', delJuego: 'من اللعبة', jugar: 'العب' },
};
const mlT = () => ML_TX[LANG] || ML_TX.en;
const mlNom = k => mlT()[k][0], mlDes = k => mlT()[k][1];
const mlSub = m => [mlT().delJuego, m.tipo === 'skyblock' ? TR('tipoMapaSky') : m.tipo === 'parkour' ? TR('tipoMapaParkour') : '', m.modo === 'creativo' ? TR('creativo') : m.modo === 'aventura' ? TR('modoMapaAventura') : TR('supervivencia')].filter(Boolean).join(' · ');
const mlEsc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// mundos guardados que vienen de una tarjeta (o de su botón en "Mundo nuevo")
const mlGuardado = k => leerLista().find(w => w.of === k);
function mlMarcar(k) { try { const l = leerLista(), w = l.find(x => x.id === mundoId); if (w) { w.of = k; localStorage.setItem('bloquesMundos', JSON.stringify(l)); } } catch (e) {} }
// también se marcan los que se crean desde "Mundo nuevo"
for (const m of ML) { const b = $(m.btn); if (!b || !b.onclick) continue; const o = b.onclick; b.onclick = function () { const r = o.apply(this, arguments); mlMarcar(m.k); return r; }; }

// tarjetas al principio de la lista (en las dos pestañas), aunque el servidor no responda
{ const c0 = cargarLista; cargarLista = async function () {
    const r = await c0.apply(this, arguments);
    const g = $('mapasGrilla'); if (!g) return r;
    g.querySelectorAll('[data-local]').forEach(x => x.remove());
    g.insertAdjacentHTML('afterbegin', ML.map(m => `<div class="mapaT" data-local="${m.k}"><span class="oficial">OFICIAL</span><img loading="lazy" src="${m.foto}" alt=""><div class="n">${mlEsc(mlNom(m.k))}</div><div class="a">${mlEsc(mlSub(m))}</div></div>`).join(''));
    if (g.children.length) { const msg = $('mapasMsg'); if (msg && msg.textContent === TR('mapasVacio')) msg.hidden = true; }
    return r; }; }

function mlJugar(m, deNuevo) {
  const w = mlGuardado(m.k);
  cerrar('mapasCapa'); for (const c of ['inicio', 'mundos', 'nuevo']) if ($(c)) $(c).hidden = true;
  if (w && !deNuevo) { pantallaCompleta(); entrarMundo(w.id); return; }
  $(m.btn).onclick();
}
$('mapasGrilla').addEventListener('click', e => {
  const d = e.target.closest('[data-local]'); if (!d) return; e.stopPropagation();
  const m = ML.find(x => x.k === d.dataset.local); if (!m) return;
  const w = mlGuardado(m.k);
  $('mapaDet').innerHTML = `<img src="${m.foto}" alt=""><div class="info"><b>${mlEsc(mlNom(m.k))}</b><small><span class="oficial">OFICIAL</span>${mlEsc(mlSub(m))}</small><p>${mlEsc(mlDes(m.k))}</p>` +
    (w ? `<div class="btn" id="mlSeguir">${mlT().seguir}</div><div class="btn" id="mlNuevo" style="background:#7c86ad">${mlT().nuevo}</div>` : `<div class="btn" id="mlJugar">${mlT().jugar}</div>`) + `</div>`;
  $('mapasGrilla').hidden = true; $('mapasTabs').hidden = true; $('mapaDet').hidden = false; $('mapasMsg').hidden = true;
  if ($('mlJugar')) $('mlJugar').onclick = () => mlJugar(m, true);
  if ($('mlSeguir')) $('mlSeguir').onclick = () => mlJugar(m, false);
  if ($('mlNuevo')) $('mlNuevo').onclick = () => mlJugar(m, true);
}, true);
window.__mapasLocales = { ML, mlGuardado };
