'use strict';
// ═════════ LAS ISLAS DEL CONFÍN: el tercer mundo y el final del juego ═════════
// Camino: tu mundo → Abismo (vencer al Ojón Rey: su corona) → fabricar la Llave estelar → encontrar la Fortaleza
// (o fabricar un Altar estelar) → tocar el Altar con la llave: se abre el Portal estelar → Islas del Confín →
// vencer al Vigía de las Estrellas → final con créditos y premio. Después se puede seguir jugando o volver a casa.
// Diseño propio. Bloques 138 (Altar estelar) y 139 (Portal estelar); objetos 380 (Llave estelar) y 381 (Fragmento estelar).

B.ALTAR_E = 138; B.PORTAL_E = 139; I.LLAVE_E = 380; I.FRAGMENTO_E = 381;
const CF_TILES = { altarLado: 238, altarArriba: 239, portalE: 240, llave: 241, fragmento: 242 };   // 244-247 energía, 248-254 equipo, 255 Cacería

Object.assign(TX.es, {
  cfAltar: 'ALTAR ESTELAR<small>tócalo con la Llave estelar para abrir el portal</small>', cfAbierto: '¡EL PORTAL ESTELAR SE ABRIÓ!<small>tócalo con la mano vacía para viajar</small>',
  cfViajando: 'VIAJANDO A LAS ISLAS DEL CONFÍN…', cfVolviendo: 'VOLVIENDO A TU MUNDO…', cfMundo: 'Confín', cfInicio: 'LAS ISLAS DEL CONFÍN<small>cruza los puentes hacia el norte: allí vigila la última criatura</small>',
  cfVigia: 'EL VIGÍA DE LAS ESTRELLAS', cfAparece: '¡EL VIGÍA DE LAS ESTRELLAS!<small>rompe su escudo venciendo a sus chispas</small>', cfEscudo: '¡ESCUDO!<small>vence a las chispas para romperlo</small>',
  cfLluvia: '¡LLUVIA DE ESTRELLAS!<small>sal de los círculos</small>', cfVacio: '¡CAÍSTE AL VACÍO!', cfEnLinea: 'EL PORTAL NO FUNCIONA EN LÍNEA<small>viaja jugando solo</small>',
  cfFin: 'FIN', cfFinSub: 'Venciste al Vigía de las Estrellas. Los mundos de Voxelium están a salvo.',
  cfCreditos: ['VOXELIUM', 'Un juego de dmith.builds', 'Mundos, criaturas y aventuras: dmith.builds', 'Gracias por jugar', 'El viaje no termina: construye, explora y vuelve cuando quieras'],
  cfPremio: 'Premio: {p}', cfCasa: 'Volver a casa', cfSeguir: 'Seguir explorando', cfPista: 'LA FORTALEZA ESTÁ {d}<small>busca su Altar estelar</small>',
  cfLlaveListo: '¡LLAVE ESTELAR!<small>úsala en el Altar estelar de la Fortaleza</small>',
});
Object.assign(TX.en, {
  cfAltar: 'STAR ALTAR<small>tap it with the Star Key to open the portal</small>', cfAbierto: 'THE STAR PORTAL IS OPEN!<small>tap it with an empty hand to travel</small>',
  cfViajando: 'TRAVELING TO THE FARTHEST ISLES…', cfVolviendo: 'GOING BACK TO YOUR WORLD…', cfMundo: 'Farthest Isles', cfInicio: 'THE FARTHEST ISLES<small>cross the bridges to the north: the last creature keeps watch there</small>',
  cfVigia: 'THE STAR WARDEN', cfAparece: 'THE STAR WARDEN!<small>break its shield by beating its sparks</small>', cfEscudo: 'SHIELD!<small>beat the sparks to break it</small>',
  cfLluvia: 'STAR RAIN!<small>get out of the circles</small>', cfVacio: 'YOU FELL INTO THE VOID!', cfEnLinea: "THE PORTAL DOESN'T WORK ONLINE<small>travel while playing alone</small>",
  cfFin: 'THE END', cfFinSub: 'You defeated the Star Warden. The worlds of Voxelium are safe.',
  cfCreditos: ['VOXELIUM', 'A game by dmith.builds', 'Worlds, creatures and adventures: dmith.builds', 'Thanks for playing', "The journey doesn't end: build, explore and come back anytime"],
  cfPremio: 'Reward: {p}', cfCasa: 'Go back home', cfSeguir: 'Keep exploring', cfPista: 'THE FORTRESS IS {d}<small>find its Star Altar</small>',
  cfLlaveListo: 'STAR KEY!<small>use it on the Star Altar in the Fortress</small>',
});
Object.assign(TX.pt, {
  cfAltar: 'ALTAR ESTELAR<small>toque com a Chave estelar para abrir o portal</small>', cfAbierto: 'O PORTAL ESTELAR ABRIU!<small>toque com a mão vazia para viajar</small>',
  cfViajando: 'VIAJANDO PARA AS ILHAS DO CONFIM…', cfVolviendo: 'VOLTANDO PARA O SEU MUNDO…', cfMundo: 'Confim', cfInicio: 'AS ILHAS DO CONFIM<small>atravesse as pontes para o norte: lá vigia a última criatura</small>',
  cfVigia: 'O VIGIA DAS ESTRELAS', cfAparece: 'O VIGIA DAS ESTRELAS!<small>quebre o escudo vencendo suas faíscas</small>', cfEscudo: 'ESCUDO!<small>vença as faíscas para quebrá-lo</small>',
  cfLluvia: 'CHUVA DE ESTRELAS!<small>saia dos círculos</small>', cfVacio: 'VOCÊ CAIU NO VAZIO!', cfEnLinea: 'O PORTAL NÃO FUNCIONA ONLINE<small>viaje jogando sozinho</small>',
  cfFin: 'FIM', cfFinSub: 'Você derrotou o Vigia das Estrelas. Os mundos de Voxelium estão a salvo.',
  cfCreditos: ['VOXELIUM', 'Um jogo de dmith.builds', 'Mundos, criaturas e aventuras: dmith.builds', 'Obrigado por jogar', 'A jornada não termina: construa, explore e volte quando quiser'],
  cfPremio: 'Prêmio: {p}', cfCasa: 'Voltar para casa', cfSeguir: 'Continuar explorando', cfPista: 'A FORTALEZA ESTÁ {d}<small>procure o Altar estelar</small>',
  cfLlaveListo: 'CHAVE ESTELAR!<small>use no Altar estelar da Fortaleza</small>',
});
if (TX.tr) Object.assign(TX.tr, {
  cfAltar: 'YILDIZ SUNAĞI<small>geçidi açmak için Yıldız Anahtarı ile dokun</small>', cfAbierto: 'YILDIZ GEÇİDİ AÇILDI!<small>yolculuk için boş elle dokun</small>',
  cfViajando: 'UÇ ADALAR\'A YOLCULUK…', cfVolviendo: 'DÜNYANA DÖNÜLÜYOR…', cfMundo: 'Uç Adalar', cfInicio: 'UÇ ADALAR<small>kuzeye köprüleri geç: son yaratık orada nöbet tutuyor</small>',
  cfVigia: 'YILDIZ BEKÇİSİ', cfAparece: 'YILDIZ BEKÇİSİ!<small>kıvılcımlarını yenerek kalkanını kır</small>', cfEscudo: 'KALKAN!<small>kırmak için kıvılcımları yen</small>',
  cfLluvia: 'YILDIZ YAĞMURU!<small>dairelerden çık</small>', cfVacio: 'BOŞLUĞA DÜŞTÜN!', cfEnLinea: 'GEÇİT ÇEVRİMİÇİ ÇALIŞMAZ<small>tek başına oynarken yolculuk yap</small>',
  cfFin: 'SON', cfFinSub: 'Yıldız Bekçisi\'ni yendin. Voxelium dünyaları güvende.',
  cfCreditos: ['VOXELIUM', 'dmith.builds yapımı bir oyun', 'Dünyalar, yaratıklar ve maceralar: dmith.builds', 'Oynadığın için teşekkürler', 'Yolculuk bitmiyor: inşa et, keşfet ve istediğin zaman geri dön'],
  cfPremio: 'Ödül: {p}', cfCasa: 'Eve dön', cfSeguir: 'Keşfetmeye devam', cfPista: 'KALE {d}<small>Yıldız Sunağı\'nı bul</small>',
  cfLlaveListo: 'YILDIZ ANAHTARI!<small>Kale\'deki Yıldız Sunağı\'nda kullan</small>',
});
if (TX.id) Object.assign(TX.id, {
  cfAltar: 'ALTAR BINTANG<small>sentuh dengan Kunci Bintang untuk membuka portal</small>', cfAbierto: 'PORTAL BINTANG TERBUKA!<small>sentuh dengan tangan kosong untuk pergi</small>',
  cfViajando: 'MENUJU PULAU-PULAU UJUNG…', cfVolviendo: 'KEMBALI KE DUNIAMU…', cfMundo: 'Pulau Ujung', cfInicio: 'PULAU-PULAU UJUNG<small>seberangi jembatan ke utara: makhluk terakhir berjaga di sana</small>',
  cfVigia: 'PENJAGA BINTANG', cfAparece: 'PENJAGA BINTANG!<small>hancurkan perisainya dengan mengalahkan percikannya</small>', cfEscudo: 'PERISAI!<small>kalahkan percikan untuk menghancurkannya</small>',
  cfLluvia: 'HUJAN BINTANG!<small>keluar dari lingkaran</small>', cfVacio: 'KAMU JATUH KE KEHAMPAAN!', cfEnLinea: 'PORTAL TIDAK BERFUNGSI ONLINE<small>pergilah saat bermain sendiri</small>',
  cfFin: 'TAMAT', cfFinSub: 'Kamu mengalahkan Penjaga Bintang. Dunia Voxelium aman.',
  cfCreditos: ['VOXELIUM', 'Game buatan dmith.builds', 'Dunia, makhluk, dan petualangan: dmith.builds', 'Terima kasih sudah bermain', 'Perjalanan belum berakhir: bangun, jelajahi, dan kembali kapan saja'],
  cfPremio: 'Hadiah: {p}', cfCasa: 'Pulang', cfSeguir: 'Terus menjelajah', cfPista: 'BENTENG ADA DI {d}<small>cari Altar Bintangnya</small>',
  cfLlaveListo: 'KUNCI BINTANG!<small>gunakan di Altar Bintang di Benteng</small>',
});
if (TX.ar) Object.assign(TX.ar, {
  cfAltar: 'مذبح النجوم<small>المسه بمفتاح النجوم لفتح البوابة</small>', cfAbierto: 'بوابة النجوم انفتحت!<small>المسها بيد فارغة للسفر</small>',
  cfViajando: 'السفر إلى الجزر القصوى…', cfVolviendo: 'العودة إلى عالمك…', cfMundo: 'الجزر القصوى', cfInicio: 'الجزر القصوى<small>اعبر الجسور شمالًا: هناك يحرس آخر مخلوق</small>',
  cfVigia: 'حارس النجوم', cfAparece: 'حارس النجوم!<small>اكسر درعه بهزيمة شراراته</small>', cfEscudo: 'درع!<small>اهزم الشرارات لكسره</small>',
  cfLluvia: 'مطر النجوم!<small>اخرج من الدوائر</small>', cfVacio: 'سقطت في الفراغ!', cfEnLinea: 'البوابة لا تعمل عبر الإنترنت<small>سافر وأنت تلعب وحدك</small>',
  cfFin: 'النهاية', cfFinSub: 'هزمت حارس النجوم. عوالم Voxelium في أمان.',
  cfCreditos: ['VOXELIUM', 'لعبة من dmith.builds', 'العوالم والمخلوقات والمغامرات: dmith.builds', 'شكرًا على اللعب', 'الرحلة لا تنتهي: ابنِ واستكشف وعد متى شئت'],
  cfPremio: 'الجائزة: {p}', cfCasa: 'العودة إلى البيت', cfSeguir: 'تابع الاستكشاف', cfPista: 'القلعة {d}<small>ابحث عن مذبح النجوم</small>',
  cfLlaveListo: 'مفتاح النجوم!<small>استخدمه على مذبح النجوم في القلعة</small>',
});
// nombres de bloques y objetos
Object.assign(NOMBRES.en, { 'Altar estelar': 'Star Altar', 'Portal estelar': 'Star Portal', 'Llave estelar': 'Star Key', 'Fragmento estelar': 'Star Shard' });
Object.assign(NOMBRES.pt, { 'Altar estelar': 'Altar estelar', 'Portal estelar': 'Portal estelar', 'Llave estelar': 'Chave estelar', 'Fragmento estelar': 'Fragmento estelar' });
if (NOMBRES.tr) Object.assign(NOMBRES.tr, { 'Altar estelar': 'Yıldız Sunağı', 'Portal estelar': 'Yıldız Geçidi', 'Llave estelar': 'Yıldız Anahtarı', 'Fragmento estelar': 'Yıldız Parçası' });
if (NOMBRES.id) Object.assign(NOMBRES.id, { 'Altar estelar': 'Altar Bintang', 'Portal estelar': 'Portal Bintang', 'Llave estelar': 'Kunci Bintang', 'Fragmento estelar': 'Pecahan Bintang' });
if (NOMBRES.ar) Object.assign(NOMBRES.ar, { 'Altar estelar': 'مذبح النجوم', 'Portal estelar': 'بوابة النجوم', 'Llave estelar': 'مفتاح النجوم', 'Fragmento estelar': 'شظية نجمية' });

// ═════════ DIBUJOS (5 casilleros del atlas) ═════════
if (TILES[CF_TILES.altarLado] != null) console.warn('confin.js: el atlas ya usa el casillero', CF_TILES.altarLado);
function cfPintar() {
  const borrar = n => ag.clearRect((n % 8) * 16, Math.floor(n / 8) * 16, 16, 16);
  for (const n of Object.values(CF_TILES)) borrar(n);
  // altar: piedra oscura con runas doradas y una estrella en el centro de arriba
  dibujarTile(CF_TILES.altarLado, (x, y, r) => { if (y < 2 || y > 13) return y < 2 ? '#c8a038' : '#2a2448'; if ((x === 3 || x === 12) && y > 3 && y < 12) return '#ffd23a'; if (y === 7 && x > 4 && x < 11) return (x % 2) ? '#ffe880' : '#c8a038'; return r() < .2 ? '#3a3260' : '#322a54'; });
  dibujarTile(CF_TILES.altarArriba, (x, y, r) => { const dx = Math.abs(x - 7.5), dy = Math.abs(y - 7.5); if (x === 0 || y === 0 || x === 15 || y === 15) return '#c8a038';
    if ((dx < .6 || dy < .6) && dx + dy < 6) return '#fff6c0'; if (Math.abs(dx - dy) < .6 && dx < 4) return '#ffd23a'; return r() < .2 ? '#3a3260' : '#2a2448'; });
  // portal estelar: azul noche con remolino de estrellas
  dibujarTile(CF_TILES.portalE, (x, y, r) => { const a = Math.atan2(y - 7.5, x - 7.5), d = Math.hypot(x - 7.5, y - 7.5), s = Math.sin(a * 3 + d * .9);
    if (r() < .07) return '#ffffff'; return s > .55 ? '#7fe3ff' : s > 0 ? '#5a4ad8' : d < 3 ? '#c8b8ff' : '#1a1450'; });
  // llave estelar
  dibujarTile(CF_TILES.llave, (x, y) => { const dc = Math.abs(x - 5) + Math.abs(y - 5);
    if (dc <= 3 && dc >= 2) return dc === 3 ? '#c8841a' : '#ffd23a'; if (dc < 2) return '#7fe3ff';
    if (x >= 6 && x <= 13 && x - y >= 0 && x - y <= 1) return '#ffd23a'; if ((x === 11 && y === 13) || (x === 13 && y === 11) || (x === 12 && y === 12)) return '#c8841a'; return null; });
  // fragmento estelar: cristal de cinco puntas
  dibujarTile(CF_TILES.fragmento, (x, y) => { const dx = x - 7.5, dy = y - 7.5, a = Math.atan2(dy, dx), d = Math.hypot(dx, dy), rad = 3 + 3.6 * Math.pow(Math.abs(Math.cos(a * 2.5)), 3);
    if (d > rad) return null; return d < 2 ? '#ffffff' : d < rad - 1.4 ? '#9fe8ff' : '#5a7ad8'; });
  try { atlasTex.needsUpdate = true; } catch (e) {}
  for (const id of [B.ALTAR_E, B.PORTAL_E, I.LLAVE_E, I.FRAGMENTO_E]) { try { delete iconos[id]; } catch (e) {} }
  for (const n of Object.values(CF_TILES)) { try { delete tileURLs[n]; } catch (e) {} }
}
cfPintar();
def(B.ALTAR_E, 'Altar estelar', [CF_TILES.altarArriba, CF_TILES.altarLado, CF_TILES.altarLado], { dur: 6, req: 1, luz: 7, color: '#2a2448' });
def(B.PORTAL_E, 'Portal estelar', [CF_TILES.portalE], { dur: 6, req: 1, luz: 15, color: '#5a4ad8', suelta: B.ALTAR_E });
item(I.LLAVE_E, 'Llave estelar', CF_TILES.llave);
item(I.FRAGMENTO_E, 'Fragmento estelar', CF_TILES.fragmento);
// recetas: la llave usa la corona del Ojón Rey (Abismo); el altar se puede fabricar si tu mundo no tiene Fortaleza
RECETAS.push([[I.LLAVE_E, 1], [[I.CORONA, 1], [I.CRISTAL, 4], [I.ORO, 4]]]);
RECETAS.push([[B.ALTAR_E, 1], [[B.OBSIDIANA, 4], [I.CRISTAL, 4], [I.ORO, 2]]]);
for (const id of [B.ALTAR_E, I.LLAVE_E, I.FRAGMENTO_E]) if (!TODOS.includes(id)) TODOS.push(id);

// ═════════ GENERACIÓN DEL CONFÍN ═════════
const CF = { llegada: { x: 80, y: 24, z: 128 }, arena: { x: 80, y: 26, z: 38, r: 17 } };
const cofresConfin = new Map();
function generarConfin(S) {
  semilla = S; mundo = new Uint16Array(N); ruinas = []; aldeas = []; ejemploFaro = null; animalesIniciales = []; biomaDe = () => 0; cofresConfin.clear();
  const put = (x, y, z, t) => { if (dentro(x, y, z)) mundo[idx(x, y, z)] = t; };
  const cx = SX / 2; CF.llegada.x = cx; CF.arena.x = cx;
  // una isla flotante: arriba piedra clara, abajo piedra oscura que termina en punta con cristales
  const isla = (ix, iy, iz, r, plano = false) => {
    for (let x = ix - r - 2; x <= ix + r + 2; x++) for (let z = iz - r - 2; z <= iz + r + 2; z++) {
      const d = Math.hypot(x - ix, z - iz) + (plano ? 0 : vn2(x / 4, z / 4, S + 31) * 1.8); if (d > r) continue;
      const hondo = Math.max(1, Math.round((r - d) * .9 + vn2(x / 3, z / 3, S + 32) * 2)), top = iy + (plano ? 0 : Math.round(vn2(x / 6, z / 6, S + 33) * 1.2));
      for (let y = top - hondo; y <= top; y++) put(x, y, z, y === top ? B.MARMOL : y > top - 2 ? B.LADRILLO_P : y === top - hondo && h3(x, y, z, S + 34) < .3 ? B.CRISTAL_OSC_M : B.PIEDRA_ABISMO);
    } };
  // árbol de cristal
  const arbolCristal = (x, y, z) => { const alto = 3 + Math.floor(h3(x, y, z, S + 41) * 3); for (let k = 1; k <= alto; k++) put(x, y + k, z, B.OBSIDIANA);
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let c = 0; c <= 1; c++) if (Math.abs(a) + Math.abs(b) + c < 3) put(x + a, y + alto + c, z + b, c ? B.CRISTAL_OSC_M : B.VIDRIO);
    put(x, y + alto + 2, z, B.FAROL); };
  // puente de luz recto (en x o en z)
  const puente = (x0, z0, x1, z1, y) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(z1 - z0)); for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), z = Math.round(z0 + (z1 - z0) * i / n), ex = x1 !== x0 ? 0 : 1, ez = x1 !== x0 ? 1 : 0;
    for (let w = -1; w <= 1; w++) put(x + ex * w, y, z + ez * w, w ? B.LADRILLO_P : B.MARMOL); if (i % 6 === 3) { put(x + ex * 2, y + 1, z + ez * 2, B.FAROL); put(x - ex * 2, y + 1, z - ez * 2, B.FAROL); } } };
  // llegada (sur), arena (norte) y seis islas a los costados
  const L = CF.llegada, A = CF.arena;
  isla(L.x, L.y, L.z, 10); isla(A.x, A.y, A.z, A.r + 1, true);
  const islas = [[cx - 34, 23, 112, 7], [cx + 33, 25, 104, 6], [cx - 30, 27, 72, 8], [cx + 32, 24, 66, 7], [cx - 12, 30, 92, 5], [cx + 14, 22, 90, 5]];
  for (const [x, y, z, r] of islas) isla(x, y, z, r);
  // camino central de la llegada a la arena, con dos islas de descanso
  isla(cx, 25, 96, 5); isla(cx, 26, 66, 5);
  puente(cx, L.z - 9, cx, 101, 24); puente(cx, 91, cx, 71, 25); puente(cx, 61, cx, A.z + A.r + 1, 26);
  for (const z of [101, 96, 91]) for (let y = 24; y <= 25; y++) put(cx, y, z, B.MARMOL);
  for (let z = 61; z <= 71; z++) put(cx, 26, z, B.MARMOL);
  // escalones entre alturas del camino
  for (let w = -1; w <= 1; w++) { put(cx + w, 25, 101, B.MARMOL); put(cx + w, 26, 71, B.MARMOL); }
  // puentes a las islas de los costados
  puente(cx - 4, 112, islas[0][0] + 6, 112, 24); puente(cx + 4, 104, islas[1][0] - 5, 104, 25);
  puente(cx - 4, 66, islas[2][0] + 7, 66, 26); puente(cx + 4, 66, islas[3][0] - 6, 66, 26);
  // decoración y cofres en las islas
  islas.forEach(([x, y, z, r], k) => { arbolCristal(x + 2, y, z - 2); if (r >= 6) arbolCristal(x - 3, y, z + 2); put(x, y + 1, z + 1, B.COFRE); cofresConfin.set(idx(x, y + 1, z + 1), k < 2 ? 'bajo' : 'alto'); put(x + 1, y + 1, z + 1, B.FAROL); });
  arbolCristal(L.x - 6, L.y, L.z - 2); arbolCristal(L.x + 6, L.y, L.z + 1);
  // arena del Vigía: piso a cuadros, seis columnas con cristal y un círculo de faroles
  for (let x = A.x - A.r; x <= A.x + A.r; x++) for (let z = A.z - A.r; z <= A.z + A.r; z++) { const d = Math.hypot(x - A.x, z - A.z); if (d > A.r) continue; put(x, A.y, z, d > A.r - 1.2 ? B.LADRILLO_P : (Math.floor(x / 3) + Math.floor(z / 3)) % 2 ? B.MARMOL : B.OBSIDIANA); }
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + .5, x = Math.round(A.x + Math.cos(a) * (A.r - 3)), z = Math.round(A.z + Math.sin(a) * (A.r - 3));
    for (let y = A.y + 1; y <= A.y + 6; y++) put(x, y, z, y === A.y + 6 ? B.CRISTAL_OSC_M : B.OBSIDIANA); put(x, A.y + 7, z, B.FAROL); }
  // la llegada: portal de vuelta y faroles
  for (let x = L.x - 2; x <= L.x + 2; x++) put(x, L.y, L.z + 6, B.LADRILLO_P);
  put(L.x, L.y + 1, L.z + 6, B.PORTAL_E); put(L.x - 2, L.y + 1, L.z + 6, B.FAROL); put(L.x + 2, L.y + 1, L.z + 6, B.FAROL);
  spawn = { x: L.x + .5, y: L.y + 1, z: L.z + .5, yaw: 0 };
}
{ const p0 = prepararMundo; prepararMundo = function (S, ej) { if (window.mundoTipo === 'confin') { generarConfin(S); diffs = new Map(); spawnPropio = false; return; } return p0.apply(this, arguments); }; }
// cofres del Confín
{ const l0 = lootCofre; lootCofre = function (i) {
  const t = window.mundoTipo === 'confin' ? cofresConfin.get(i) : null; if (!t) return l0(i);
  const r = k => h3(i, k, 11, semilla + 880), c = {};
  c[I.CRISTAL] = 3 + Math.floor(r(1) * 5); c[I.ORO] = 3 + Math.floor(r(2) * 6); c[I.FRAGMENTO_E] = 1 + Math.floor(r(3) * 2); c[I.POCION + Math.floor(r(4) * 4)] = 1 + Math.floor(r(5) * 2);
  if (t === 'alto') { if (r(6) < .5) c[I.ESP4] = 1; else c[I.PICO4] = 1; c[I.FLECHA] = 8 + Math.floor(r(7) * 8); }
  c[I.PAN] = 2 + Math.floor(r(8) * 3);
  return c; }; }
// en el Confín no salen monstruos comunes
{ const a0 = aparecerMonstruos; aparecerMonstruos = function () { if (window.mundoTipo === 'confin') return; return a0.apply(this, arguments); }; }

// ═════════ CIELO: noche estrellada y violeta ═════════
{ const NIEBLA = new THREE.Color('#120c2e'), ARRIBA = new THREE.Color('#04020e');
  const c0 = cielo; cielo = function () { const r = c0.apply(this, arguments); if (!jugando || window.mundoTipo !== 'confin') return r;
    render.setClearColor(NIEBLA); escena.fog.color.copy(NIEBLA); U.uNiebla.value.copy(NIEBLA);
    try { domo.material.uniforms.uArriba.value.copy(ARRIBA); domo.material.uniforms.uHorizonte.value.copy(NIEBLA); } catch (e) {}
    U.uDia.value = Math.max(U.uDia.value, .5); hemi.intensity = Math.max(hemi.intensity, .45);
    try { cieloObj.estrellas.material.opacity = 1; } catch (e) {}
    return r; }; }

// ═════════ VIAJAR ═════════
const cfInvitado = () => { try { return !!(MP && MP.sala); } catch (e) { return false; } };
function viajarConfin() {
  if (cfInvitado()) { aviso(TR('cfEnLinea'), 2200); return; }
  const lista = leerLista(), meta = lista.find(m => m.id === mundoId); if (!meta) return;
  const llevar = { inv: JSON.parse(JSON.stringify(inv)), barra: barra.slice(), sel, vida, hambre, arm: (stats.armadura || [0, 0, 0, 0]).slice() };
  guardar();
  let destino, volver = false;
  if (meta.tipo === 'confin') { destino = meta.padre; volver = true; }
  else { meta.portalE = { x: J.x, y: J.y, z: J.z };
    if (!meta.confin || !lista.some(m => m.id === meta.confin)) { const id = Date.now().toString(36) + 'c'; lista.unshift({ id, nombre: meta.nombre + ' · ' + TR('cfMundo'), num: meta.num, modo: meta.modo, tipo: 'confin', importado: true, padre: meta.id, tam: 160, semilla: (meta.semilla + 1313) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0 }); meta.confin = id; }
    destino = meta.confin; }
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  aviso(TR(volver ? 'cfVolviendo' : 'cfViajando'), 1500); $('flash').style.background = '#1a1450'; $('flash').style.opacity = .85;
  setTimeout(() => {
    entrarMundo(destino);
    inv = llevar.inv; barra = llevar.barra; sel = llevar.sel; vida = llevar.vida; hambre = llevar.hambre; stats.armadura = llevar.arm;
    if (volver) { const p = (leerLista().find(m => m.id === destino) || {}).portalE; if (p) Object.assign(J, { x: p.x + 1.5, y: p.y + .2, z: p.z, vx: 0, vy: 0, vz: 0 }); }
    else setTimeout(() => aviso(TR('cfInicio'), 3500), 600);
    pintarBarra(); pintarVida(); hambrePintado = -1; pintarHambre(); rearmarJugador(); guardar(); $('flash').style.opacity = 0; setTimeout(() => { $('flash').style.background = ''; }, 500);
  }, 400);
}
// tocar el altar (con la llave) o el portal estelar (con la mano vacía)
{ const t0 = tocarExtra2; tocarExtra2 = function (dir) {
    const h = apuntar(dir);
    if (h && h.b === B.ALTAR_E) { const id = barra[sel] || 0;
      if (id === I.LLAVE_E && (creativo() || inv[I.LLAVE_E] > 0)) { if (!creativo()) quitarItem(I.LLAVE_E, 1); ponerBloque(h.x, h.y, h.z, B.PORTAL_E); polvo(h.x + .5, h.y + 1, h.z + .5, '#7fe3ff', 26); polvo(h.x + .5, h.y + 1.4, h.z + .5, '#ffd23a', 18); sonar('final', .7) || son(880, .4, 'triangle', .14); aviso(TR('cfAbierto'), 2600); swing = 1; sucio = true; return true; }
      if (!id || ITEM[id]) { aviso(TR('cfAltar'), 2200); return true; } }
    if (h && h.b === B.PORTAL_E) { const id = barra[sel] || 0; if (!id || ITEM[id]) { viajarConfin(); return true; } }
    return t0(dir); }; }

// ═════════ EL VIGÍA DE LAS ESTRELLAS ═════════
// Un guardián de cristal que flota. Tira estrellas, hace llover estrellas en círculos marcados en el piso
// y, a 2/3 y a 1/3 de su vida, se cubre con un escudo y llama chispas: hay que vencerlas para dañarlo.
const vigiaMat = c => new THREE.MeshLambertMaterial({ color: parseInt(c.slice(1), 16) });
const vigiaLuz = c => new THREE.MeshBasicMaterial({ color: parseInt(c.slice(1), 16) });
TIPOS.vigia = { vida: 520, an: 1.3, al: 3.6, vel: 1.2, peso: 1, color: '#9a86ff', voz: 'rugidoJefe', hostil: true, ia: true, jefe: true, dano: 6, vuela: true,
  armar(g) { const cu = vigiaMat('#6a5ad8'), cl = vigiaMat('#b8a8ff'), os = vigiaMat('#2a2060'), oj = vigiaLuz('#ffffff'), ir = vigiaLuz('#7fe3ff'), oro = vigiaLuz('#ffd23a');
    // cuerpo de cristal: rombo de capas
    [[.7, 0], [1.3, .5], [1.8, 1.0], [2.0, 1.6], [1.8, 2.2], [1.3, 2.7], [.7, 3.1]].forEach(([w, y], k) => caja(g, w, .5, w, 0, y + .25, 0, k % 2 ? vigiaLuz('#a898ff') : cu));
    // ojo grande al frente
    caja(g, 1.2, .9, .1, 0, 1.85, 1.02, oj); caja(g, .55, .55, .12, 0, 1.85, 1.06, ir); caja(g, .22, .22, .14, 0, 1.85, 1.1, vigiaLuz('#10103a'));
    // corona de puntas doradas
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; caja(g, .16, .5, .16, Math.cos(a) * .55, 3.55, Math.sin(a) * .55, oro); }
    // cuatro fragmentos que giran alrededor
    const anillo = new THREE.Group(); anillo.position.y = 1.8; g.add(anillo);
    for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2, q = new THREE.Group(); q.position.set(Math.cos(a) * 2.2, 0, Math.sin(a) * 2.2); anillo.add(q); caja(q, .35, .9, .35, 0, 0, 0, cl); caja(q, .2, .5, .2, 0, .6, 0, ir); caja(q, .2, .4, .2, 0, -.55, 0, os); }
    g._anillo = anillo;
    // escudo (se ve solo cuando está activo)
    const esc = new THREE.Mesh(new THREE.SphereGeometry(2.6, 16, 12), new THREE.MeshBasicMaterial({ color: 0x7fe3ff, transparent: true, opacity: .22, depthWrite: false })); esc.position.y = 1.8; esc.visible = false; g.add(esc); g._escudo = esc;
    return []; },
  guiar: () => ({ vel: 0 }),
  tick(a, dt) {
    const u = a.userData, e = ex(a), p = a.position, A = CF.arena; if (e.cx == null) { e.cx = A.x + .5; e.cz = A.z + .5; }
    u.fase = (u.fase || 0) + dt; u.vy = 0;
    if (a._anillo) { a._anillo.rotation.y += dt * (e.esc ? 2.4 : 1.1); a._anillo.children.forEach((q, k) => q.position.y = Math.sin(u.fase * 2 + k) * .3); }
    if (a._escudo) { a._escudo.visible = !!e.esc; a._escudo.material.opacity = .18 + Math.sin(u.fase * 6) * .06; }
    // escudo: no recibe daño mientras haya chispas
    if (e.esc) { if (u.vida < e.vidaEsc) { u.vida = e.vidaEsc; if ((e.avisoT || 0) <= 0) { aviso(TR('cfEscudo'), 1400); e.avisoT = 3; } polvo(p.x, p.y + 1.8, p.z, '#7fe3ff', 6); }
      e.avisoT = (e.avisoT || 0) - dt; if (!animales.some(o => o.userData.animal === 'chispaE' && o.position.distanceTo(p) < 60)) { e.esc = false; polvo(p.x, p.y + 1.8, p.z, '#ffffff', 30); son(980, .3, 'triangle', .12); } }
    // fases: a 2/3 y 1/3 de vida se cubre y llama chispas
    const T = TIPOS.vigia, fase = u.vida < T.vida / 3 ? 2 : u.vida < T.vida * 2 / 3 ? 1 : 0;
    if (fase > (e.fase || 0)) { e.fase = fase; e.esc = true; e.vidaEsc = u.vida; for (let k = 0; k < 3 + fase; k++) { const g = crearAnimal('chispaE', e.cx + Math.cos(k * 2.1) * 6, A.y + 1, e.cz + Math.sin(k * 2.1) * 6); ex(g).f = 1; } aviso(TR('cfEscudo'), 1800); voz('rugidoJefe', 0); }
    // vuela en círculos sobre la arena
    const ataca = atacan(a), h = haciaJ(a), ang = u.fase * .3, tx = e.cx + Math.cos(ang) * 9, tz = e.cz + Math.sin(ang) * 9, ty = A.y + 5 + Math.sin(u.fase * .8) * 1.5;
    const dx = tx - p.x, dy = ty - p.y, dz = tz - p.z, n = Math.hypot(dx, dy, dz) || 1, v = Math.min(n, 5 * dt);
    p.x += dx / n * v; p.y += dy / n * v; p.z += dz / n * v; a.rotation.y = ataca ? h.dir : Math.atan2(dx, dz);
    if (!ataca) return;
    // estrellas de a tres
    u.tiro = (u.tiro ?? 2.5) - dt; if (u.tiro <= 0 && h.d < 40) { u.tiro = fase === 2 ? 1.6 : 2.4; for (let k = -1; k <= 1; k++) disparar('estrellaE', p.x, p.y + 1.85, p.z, J.x + k * 1.6, J.y + 1, J.z + k * 1.6); }
    // lluvia de estrellas: círculos en el piso que explotan de luz
    u.lluvia = (u.lluvia ?? 9) - dt; if (u.lluvia <= 0) { u.lluvia = fase === 2 ? 7 : 10; lluviaEstrellas(4 + fase * 2); }
  },
  suelta: () => [[I.FRAGMENTO_E, 5], [I.CRISTAL, 20], [I.ORO, 20]] };
// chispas: pequeñas y rápidas, saltan hacia ti
TIPOS.chispaE = { vida: 10, an: .3, al: .7, vel: 2.3, peso: .3, color: '#7fe3ff', voz: 'ojon', hostil: true, dano: 2,
  armar(g) { const cl = vigiaLuz('#7fe3ff'), bl = vigiaLuz('#ffffff'), os = vigiaMat('#4a3ab8'); caja(g, .45, .45, .45, 0, .45, 0, os); caja(g, .3, .3, .3, 0, .45, 0, cl); caja(g, .12, .12, .5, 0, .45, 0, bl); caja(g, .5, .12, .12, 0, .45, 0, bl); caja(g, .12, .5, .12, 0, .45, 0, bl); return []; },
  suelta: () => [[I.CRISTAL, 1]] };
try { NOMBRES.en; } catch (e) {}
// círculos de aviso y estrellas que caen
const circulos = [];
function lluviaEstrellas(n) {
  aviso(TR('cfLluvia'), 1300); const A = CF.arena;
  for (let k = 0; k < n; k++) {
    const x = k === 0 ? J.x : A.x + (Math.random() - .5) * A.r * 1.6, z = k === 0 ? J.z : A.z + (Math.random() - .5) * A.r * 1.6;
    const m = new THREE.Mesh(new THREE.RingGeometry(1.3, 1.8, 24), new THREE.MeshBasicMaterial({ color: 0xffd23a, transparent: true, opacity: .85, side: THREE.DoubleSide, depthWrite: false }));
    m.rotation.x = -Math.PI / 2; m.position.set(x, A.y + 1.06, z); escena.add(m); circulos.push({ m, t: 1.6, x, z });
  }
}
function moverCirculos(dt) {
  for (const c of circulos.slice()) { c.t -= dt; c.m.material.opacity = .5 + Math.sin(c.t * 18) * .35; c.m.scale.setScalar(1 + (1.6 - c.t) * .15);
    if (c.t <= 0) { escena.remove(c.m); c.m.geometry.dispose(); circulos.splice(circulos.indexOf(c), 1);
      const y = CF.arena.y + 1; for (let k = 0; k < 4; k++) polvo(c.x, y + 4 - k, c.z, k % 2 ? '#ffd23a' : '#ffffff', 8); son(140, .25, 'sawtooth', .12);
      if (Math.hypot(J.x - c.x, J.z - c.z) < 1.9 && Math.abs(J.y - y) < 2.5 && !creativo()) lastimar(4, (J.x - c.x) || .3, (J.z - c.z) || .3); } }
}

// ═════════ CADA CUADRO ═════════
let vigia = null, cfVacioT = 0, cfPistaDada = false, cfProyListo = false;
function cfFrame(dt) {
  if (!jugando) return;
  // la estrella del Vigía como proyectil (sin romper bloques)
  if (!cfProyListo && typeof PROY !== 'undefined') { cfProyListo = true; PROY.estrellaE = { vel: 13, g: 0, dano: 4 }; FORMA_PROY.estrellaE = () => { const g = new THREE.Group(); caja(g, .5, .16, .16, 0, 0, 0, vigiaLuz('#ffd23a')); caja(g, .16, .5, .16, 0, 0, 0, vigiaLuz('#ffd23a')); caja(g, .16, .16, .5, 0, 0, 0, vigiaLuz('#ffd23a')); caja(g, .26, .26, .26, 0, 0, 0, vigiaLuz('#ffffff')); return g; }; }
  if (pausado) return;
  moverCirculos(dt);
  // pista: con la llave en la bolsa, una vez, a dónde queda la Fortaleza
  if (!cfPistaDada && !window.mundoTipo && inv[I.LLAVE_E] > 0 && window.__est && __est.fortaleza()) { cfPistaDada = true; const f = __est.fortaleza(), dx = f.x - J.x, dz = f.z - J.z;
    if (Math.hypot(dx, dz) > 12) { const dir = Math.abs(dx) > Math.abs(dz) ? (dx > 0 ? 'czEste' : 'czOeste') : (dz > 0 ? 'czSur' : 'czNorte'); aviso(TR('cfPista', { d: TR(dir).toUpperCase() }), 3200); } else aviso(TR('cfLlaveListo'), 2600); }
  if (window.mundoTipo !== 'confin') { vigia = null; return; }
  REG.hora = 'noche';
  // caer al vacío lastima (después el juego te devuelve a la llegada)
  cfVacioT -= dt; if (J.y < -3 && cfVacioT <= 0 && !creativo()) { cfVacioT = 2; lastimar(6, 0, 0, false); aviso(TR('cfVacio'), 1500); }
  if (cfInvitado() && window.__mp && !window.__mp.MP.dueno) return;
  const A = CF.arena;
  // aparece cuando entras a la arena
  if (!vigia && !mapa.vigiaVencido && Math.hypot(J.x - A.x, J.z - A.z) < A.r + 2 && Math.abs(J.y - A.y) < 8) {
    vigia = animales.find(a => a.userData.animal === 'vigia') || crearAnimal('vigia', A.x + .5, A.y + 6, A.z - 8 + .5); ex(vigia).f = 1;
    aviso(TR('cfAparece'), 2800); voz('rugidoJefe', 0); if (typeof temblorJefe === 'function') temblorJefe(.6);
  }
  if (vigia && !animales.includes(vigia)) { if (vigia.userData.vida <= 0) finConfin(); vigia = null; }
}
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; try { cfFrame(dt); } catch (e) { console.error(e); } }; requestAnimationFrame(tick); }
{ const e0 = entrarMundo; entrarMundo = function (id) { for (const c of circulos.splice(0)) escena.remove(c.m); vigia = null; cfPistaDada = false; return e0.apply(this, arguments); }; }

// ═════════ FINAL Y CRÉDITOS ═════════
{ const st = document.createElement('style'); st.textContent = `
  #finCapa { background: radial-gradient(ellipse at 50% 30%, #2a1f6a, #07051a 70%) !important; overflow: hidden; }
  #finCapa .finTit { font-size: clamp(40px, 9vw, 80px); font-weight: 900; color: #ffd23a; text-shadow: 0 5px 0 #3a2a0a, 0 0 30px rgba(255,210,58,.5); letter-spacing: 6px; }
  #finCapa .finSub { color: #d8d0ff; font-size: 16px; font-weight: 700; max-width: 560px; text-align: center; margin: 4px 16px 10px; }
  #finRollo { height: min(34vh, 200px); overflow: hidden; position: relative; width: min(560px, 92vw); -webkit-mask-image: linear-gradient(transparent, #000 25%, #000 75%, transparent); mask-image: linear-gradient(transparent, #000 25%, #000 75%, transparent); }
  #finRollo div { position: absolute; left: 0; right: 0; text-align: center; animation: finSube 16s linear forwards; color: #fff; font-weight: 800; }
  #finRollo p { margin: 0 0 22px; font-size: 17px; } #finRollo p:first-child { font-size: 26px; color: #ffd23a; letter-spacing: 3px; }
  @keyframes finSube { from { transform: translateY(200px); } to { transform: translateY(-110%); } }
  #finPremio { color: #9fe8ff; font-weight: 800; font-size: 15px; margin: 8px 0 2px; text-align: center; }
  #finCapa .filaBtn { margin-top: 6px; }
`; document.head.appendChild(st); }
cap('finCapa', '<div class="finTit" id="finTit"></div><div class="finSub" id="finSub"></div><div id="finRollo"><div id="finTexto"></div></div><div id="finPremio"></div><div class="filaBtn"><div class="btn" id="finCasa"></div><div class="btn" id="finSeguir"></div></div>', false);
function finConfin() {
  mapa.vigiaVencido = true; sucio = true; stats.vigia = 1;
  // se anota también en tu mundo de origen
  const l = leerLista(), yo = l.find(m => m.id === mundoId), padre = yo && l.find(m => m.id === yo.padre); if (padre) { padre.vigiaVencido = true; localStorage.setItem('bloquesMundos', JSON.stringify(l)); }
  // premio: las Alas planeadoras (si existen en esta versión), si no cristal y oro de más
  const premio = [];
  const ALAS = I.ALAS || 374;   // Alas planeadoras (equipo.js)
  if (ITEM[ALAS]) { darItem(ALAS, 1); premio.push(nom(ALAS)); }
  else { darItem(I.CRISTAL, 10); darItem(I.ORO, 10); premio.push(nom(I.CRISTAL) + ' x10', nom(I.ORO) + ' x10'); }
  darItem(I.FRAGMENTO_E, 3); premio.push(nom(I.FRAGMENTO_E) + ' x3');
  for (let k = 0; k < 50; k++) setTimeout(() => polvo(J.x + (Math.random() - .5) * 10, J.y + 3 + Math.random() * 5, J.z + (Math.random() - .5) * 10, ['#ffe14a', '#7fe3ff', '#ffffff', '#b8a8ff'][k % 4], 8), k * 50);
  sonar('final', .9);
  if (typeof revisarLogros === 'function') setTimeout(() => { try { revisarLogros(); } catch (e) {} }, 300);
  setTimeout(() => { pausado = true; soltarTodo(); $('finTit').textContent = TR('cfFin'); $('finSub').textContent = TR('cfFinSub');
    const c = TR('cfCreditos'); $('finTexto').innerHTML = (Array.isArray(c) ? c : TX.es.cfCreditos).map(t => `<p>${t}</p>`).join('');
    const r = $('finTexto'); r.style.animation = 'none'; void r.offsetWidth; r.style.animation = '';
    $('finPremio').textContent = TR('cfPremio', { p: premio.join(' · ') }); $('finCasa').textContent = TR('cfCasa'); $('finSeguir').textContent = TR('cfSeguir'); abrir('finCapa'); guardar(); }, 1400);
}
$('finSeguir').onclick = () => { cerrar('finCapa'); pausado = false; };
$('finCasa').onclick = () => { cerrar('finCapa'); pausado = false; viajarConfin(); };

// nombres de las criaturas nuevas (criaturas.js carga después)
addEventListener('load', () => { try {
  NOM_CRIA.es.vigia = 'Vigía de las Estrellas'; NOM_CRIA.en.vigia = 'Star Warden'; NOM_CRIA.pt.vigia = 'Vigia das Estrelas';
  NOM_CRIA.es.chispaE = 'Chispa estelar'; NOM_CRIA.en.chispaE = 'Star Spark'; NOM_CRIA.pt.chispaE = 'Faísca estelar';
  const ex = { tr: ['Yıldız Bekçisi', 'Yıldız Kıvılcımı'], id: ['Penjaga Bintang', 'Percikan Bintang'], ar: ['حارس النجوم', 'شرارة نجمية'] };
  if (typeof LANG_EXTRA !== 'undefined') for (const l in ex) { LANG_EXTRA[l] = LANG_EXTRA[l] || {}; LANG_EXTRA[l].cria = LANG_EXTRA[l].cria || {}; LANG_EXTRA[l].cria.vigia = ex[l][0]; LANG_EXTRA[l].cria.chispaE = ex[l][1]; }
} catch (e) {} });
window.__cf = { viajarConfin, finConfin, CF, vigia: () => vigia, generarConfin, cofresConfin };
