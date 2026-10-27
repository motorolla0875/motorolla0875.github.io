'use strict';
// ═════════ GUERRA DE ALDEAS: equipo Azul contra equipo Rojo ═════════
// · Mundo propio (tipo 'guerra'): una llanura con dos aldeas enfrentadas, bosque y rocas con minerales en el medio,
//   y un Mercado en el centro con un cofre de equipo bueno.
// · Cada aldea tiene su Corazón de la aldea (diseño propio: un cristal que flota sobre un pedestal y brilla del color del equipo).
// · Fases: Construcción (se arman defensas, nadie puede lastimar a nadie) → Batalla (gana el que rompe el Corazón rival;
//   si se acaba el tiempo, gana el Corazón con más vida). Al morir se reaparece en la aldea a los pocos segundos.
// · Si faltan jugadores, el juego completa cada equipo con Guardias (defienden y reparan el Corazón) y Asaltantes (atacan).
// · Solo, sala abierta o con amigos (las salas en línea de siempre: el dueño maneja a los guardias, asaltantes y Corazones).
// · Puntos: daño al Corazón rival, derribos, defensa cerca de tu Corazón y bonus por ganar. Tabla "Guerreros".
// · Es gratis para todos. Los Pro dejan una estela dorada del color de su equipo (solo de adorno).
// No usa bloques ni objetos nuevos: todo se arma con bloques que ya existen.

const GZ_TXT = {
  es: { gzBtn: 'Guerra de Aldeas<small>equipo Azul contra equipo Rojo</small>', gzTitulo: 'GUERRA DE ALDEAS', gzSub: 'Defiende tu Corazón · rompe el del rival',
    gzT1: 'Construcción: junta recursos y arma defensas. Nadie puede lastimar a nadie.', gzT2: 'Batalla: rompe el Corazón de la aldea rival para ganar.', gzT3: 'Si se acaba el tiempo, gana el Corazón con más vida.',
    gzT4: 'Si mueres, reapareces en tu aldea a los pocos segundos.', gzT5: 'Guardias y Asaltantes completan los equipos cuando faltan jugadores.',
    gzSolo: 'Solo<small>tú y tu equipo contra el rival</small>', gzAbierta: 'Sala abierta<small>se suma cualquiera</small>', gzAmigos: 'Con amigos<small>sala privada con código</small>', gzUnirse: 'Unirse a una guerra', gzGuerreros: 'Guerreros',
    gzMundo: 'Guerra', gzAzul: 'Azul', gzRojo: 'Rojo', gzEqAzul: 'Equipo Azul', gzEqRojo: 'Equipo Rojo', gzTuEq: 'Tu equipo: {e}',
    gzEspera: 'Sala de espera', gzEsperaTx: 'Pasa el código a tus amigos. Cuando estén todos, empieza la partida.', gzEmpezar: 'Empezar', gzCambiar: 'Cambiar de equipo', gzEsperaDueno: 'Esperando que el dueño empiece…',
    gzConstruccion: 'Construcción', gzBatalla: 'Batalla', gzFaseC: 'CONSTRUCCIÓN<small>arma tus defensas: nadie puede lastimar a nadie</small>', gzFaseB: '¡A LA BATALLA!<small>rompe el Corazón de la aldea rival</small>',
    gzCorazon: 'Corazón de la aldea', gzCorAtaque: '¡ATACAN TU CORAZÓN!', gzCorRoto: '¡EL CORAZÓN {e} CAYÓ!', gzGana: '¡GANÓ EL EQUIPO {e}!', gzEmpate: '¡EMPATE!', gzGanaste: '¡GANASTE!', gzPerdiste: 'PERDISTE',
    gzTusPts: 'Tus puntos: {n}', gzOtra: 'Otra partida', gzSalir: 'Salir', gzEsperaOtra: 'El dueño de la sala puede empezar otra', gzReaparece: 'REAPARECES EN {n}', gzPts: 'Puntos: {n}',
    gzSala: 'Sala {c}', gzSalaLista: 'SALA LISTA: {c}<small>tus amigos entran con ese código desde "En línea"</small>', gzSeFue: 'LA GUERRA TERMINÓ<small>el dueño de la sala se fue</small>',
    gzBadge: 'GUERRA', recGuerra: 'Guerreros', gzGuardia: 'Guardia', gzAsaltante: 'Asaltante', gzNoAqui: 'NO SE PUEDE TAPAR EL CORAZÓN', gzDerribo: '+{n} derribo', gzMercado: 'MERCADO<small>cofre con equipo bueno en el centro</small>',
    gzCofreEq: 'Cofre del equipo', gzVida: '{n}%' },
  en: { gzBtn: 'Village War<small>Blue team against Red team</small>', gzTitulo: 'VILLAGE WAR', gzSub: 'Defend your Heart · break the rival one',
    gzT1: 'Building: gather resources and set up defenses. Nobody can get hurt.', gzT2: 'Battle: break the rival village Heart to win.', gzT3: 'If time runs out, the Heart with more health wins.',
    gzT4: 'If you die, you come back at your village a few seconds later.', gzT5: 'Guards and Raiders fill the teams when players are missing.',
    gzSolo: 'Solo<small>you and your team against the rival</small>', gzAbierta: 'Open room<small>anyone can join</small>', gzAmigos: 'With friends<small>private room with a code</small>', gzUnirse: 'Join a war', gzGuerreros: 'Warriors',
    gzMundo: 'War', gzAzul: 'Blue', gzRojo: 'Red', gzEqAzul: 'Blue team', gzEqRojo: 'Red team', gzTuEq: 'Your team: {e}',
    gzEspera: 'Waiting room', gzEsperaTx: 'Share the code with your friends. When everyone is here, start the match.', gzEmpezar: 'Start', gzCambiar: 'Switch team', gzEsperaDueno: 'Waiting for the owner to start…',
    gzConstruccion: 'Building', gzBatalla: 'Battle', gzFaseC: 'BUILDING<small>set up your defenses: nobody can get hurt</small>', gzFaseB: 'TO BATTLE!<small>break the rival village Heart</small>',
    gzCorazon: 'Village Heart', gzCorAtaque: 'YOUR HEART IS UNDER ATTACK!', gzCorRoto: 'THE {e} HEART FELL!', gzGana: '{e} TEAM WINS!', gzEmpate: "IT'S A DRAW!", gzGanaste: 'YOU WON!', gzPerdiste: 'YOU LOST',
    gzTusPts: 'Your points: {n}', gzOtra: 'Another match', gzSalir: 'Leave', gzEsperaOtra: 'The room owner can start another one', gzReaparece: 'BACK IN {n}', gzPts: 'Points: {n}',
    gzSala: 'Room {c}', gzSalaLista: 'ROOM READY: {c}<small>your friends join with that code from "Online"</small>', gzSeFue: 'THE WAR IS OVER<small>the room owner left</small>',
    gzBadge: 'WAR', recGuerra: 'Warriors', gzGuardia: 'Guard', gzAsaltante: 'Raider', gzNoAqui: "YOU CAN'T COVER THE HEART", gzDerribo: '+{n} takedown', gzMercado: 'MARKET<small>chest with good gear in the middle</small>',
    gzCofreEq: 'Team chest', gzVida: '{n}%' },
  pt: { gzBtn: 'Guerra de Aldeias<small>time Azul contra time Vermelho</small>', gzTitulo: 'GUERRA DE ALDEIAS', gzSub: 'Defenda seu Coração · quebre o do rival',
    gzT1: 'Construção: junte recursos e monte defesas. Ninguém pode se machucar.', gzT2: 'Batalha: quebre o Coração da aldeia rival para vencer.', gzT3: 'Se o tempo acabar, vence o Coração com mais vida.',
    gzT4: 'Se você morrer, volta na sua aldeia alguns segundos depois.', gzT5: 'Guardas e Invasores completam os times quando faltam jogadores.',
    gzSolo: 'Sozinho<small>você e seu time contra o rival</small>', gzAbierta: 'Sala aberta<small>qualquer um entra</small>', gzAmigos: 'Com amigos<small>sala privada com código</small>', gzUnirse: 'Entrar numa guerra', gzGuerreros: 'Guerreiros',
    gzMundo: 'Guerra', gzAzul: 'Azul', gzRojo: 'Vermelho', gzEqAzul: 'Time Azul', gzEqRojo: 'Time Vermelho', gzTuEq: 'Seu time: {e}',
    gzEspera: 'Sala de espera', gzEsperaTx: 'Passe o código para seus amigos. Quando todos chegarem, comece a partida.', gzEmpezar: 'Começar', gzCambiar: 'Trocar de time', gzEsperaDueno: 'Esperando o dono começar…',
    gzConstruccion: 'Construção', gzBatalla: 'Batalha', gzFaseC: 'CONSTRUÇÃO<small>monte suas defesas: ninguém pode se machucar</small>', gzFaseB: 'À BATALHA!<small>quebre o Coração da aldeia rival</small>',
    gzCorazon: 'Coração da aldeia', gzCorAtaque: 'ESTÃO ATACANDO SEU CORAÇÃO!', gzCorRoto: 'O CORAÇÃO {e} CAIU!', gzGana: 'O TIME {e} VENCEU!', gzEmpate: 'EMPATE!', gzGanaste: 'VOCÊ VENCEU!', gzPerdiste: 'VOCÊ PERDEU',
    gzTusPts: 'Seus pontos: {n}', gzOtra: 'Outra partida', gzSalir: 'Sair', gzEsperaOtra: 'O dono da sala pode começar outra', gzReaparece: 'VOLTA EM {n}', gzPts: 'Pontos: {n}',
    gzSala: 'Sala {c}', gzSalaLista: 'SALA PRONTA: {c}<small>seus amigos entram com esse código em "Online"</small>', gzSeFue: 'A GUERRA TERMINOU<small>o dono da sala saiu</small>',
    gzBadge: 'GUERRA', recGuerra: 'Guerreiros', gzGuardia: 'Guarda', gzAsaltante: 'Invasor', gzNoAqui: 'NÃO DÁ PARA TAPAR O CORAÇÃO', gzDerribo: '+{n} derrubada', gzMercado: 'MERCADO<small>baú com equipamento bom no centro</small>',
    gzCofreEq: 'Baú do time', gzVida: '{n}%' },
  tr: { gzBtn: 'Köy Savaşı<small>Mavi takım Kırmızı takıma karşı</small>', gzTitulo: 'KÖY SAVAŞI', gzSub: 'Kalbini koru · rakibinkini kır',
    gzT1: 'İnşa: kaynak topla ve savunma kur. Kimse yaralanamaz.', gzT2: 'Savaş: kazanmak için rakip köyün Kalbini kır.', gzT3: 'Süre biterse canı fazla olan Kalp kazanır.',
    gzT4: 'Ölürsen birkaç saniye sonra köyünde yeniden doğarsın.', gzT5: 'Oyuncu eksikse Muhafızlar ve Akıncılar takımları tamamlar.',
    gzSolo: 'Tek<small>sen ve takımın rakibe karşı</small>', gzAbierta: 'Açık oda<small>herkes katılabilir</small>', gzAmigos: 'Arkadaşlarla<small>kodlu özel oda</small>', gzUnirse: 'Bir savaşa katıl', gzGuerreros: 'Savaşçılar',
    gzMundo: 'Savaş', gzAzul: 'Mavi', gzRojo: 'Kırmızı', gzEqAzul: 'Mavi takım', gzEqRojo: 'Kırmızı takım', gzTuEq: 'Takımın: {e}',
    gzEspera: 'Bekleme odası', gzEsperaTx: 'Kodu arkadaşlarına ver. Herkes gelince maçı başlat.', gzEmpezar: 'Başlat', gzCambiar: 'Takım değiştir', gzEsperaDueno: 'Oda sahibinin başlatması bekleniyor…',
    gzConstruccion: 'İnşa', gzBatalla: 'Savaş', gzFaseC: 'İNŞA<small>savunmanı kur: kimse yaralanamaz</small>', gzFaseB: 'SAVAŞA!<small>rakip köyün Kalbini kır</small>',
    gzCorazon: 'Köy Kalbi', gzCorAtaque: 'KALBİNE SALDIRIYORLAR!', gzCorRoto: '{e} KALP DÜŞTÜ!', gzGana: '{e} TAKIM KAZANDI!', gzEmpate: 'BERABERE!', gzGanaste: 'KAZANDIN!', gzPerdiste: 'KAYBETTİN',
    gzTusPts: 'Puanın: {n}', gzOtra: 'Yeni maç', gzSalir: 'Çık', gzEsperaOtra: 'Oda sahibi yeni bir maç başlatabilir', gzReaparece: '{n} SANİYEDE DÖNÜYORSUN', gzPts: 'Puan: {n}',
    gzSala: 'Oda {c}', gzSalaLista: 'ODA HAZIR: {c}<small>arkadaşların "Çevrimiçi"den bu kodla girer</small>', gzSeFue: 'SAVAŞ BİTTİ<small>oda sahibi ayrıldı</small>',
    gzBadge: 'SAVAŞ', recGuerra: 'Savaşçılar', gzGuardia: 'Muhafız', gzAsaltante: 'Akıncı', gzNoAqui: 'KALP KAPATILAMAZ', gzDerribo: '+{n} yenme', gzMercado: 'PAZAR<small>ortada iyi ekipmanlı sandık</small>',
    gzCofreEq: 'Takım sandığı', gzVida: '%{n}' },
  id: { gzBtn: 'Perang Desa<small>tim Biru melawan tim Merah</small>', gzTitulo: 'PERANG DESA', gzSub: 'Lindungi Jantungmu · hancurkan milik lawan',
    gzT1: 'Membangun: kumpulkan bahan dan buat pertahanan. Tidak ada yang bisa terluka.', gzT2: 'Pertempuran: hancurkan Jantung desa lawan untuk menang.', gzT3: 'Jika waktu habis, Jantung dengan nyawa terbanyak menang.',
    gzT4: 'Jika kamu mati, kamu muncul lagi di desamu beberapa detik kemudian.', gzT5: 'Penjaga dan Penyerbu melengkapi tim saat pemain kurang.',
    gzSolo: 'Sendiri<small>kamu dan timmu melawan lawan</small>', gzAbierta: 'Ruang terbuka<small>siapa saja bisa ikut</small>', gzAmigos: 'Dengan teman<small>ruang pribadi dengan kode</small>', gzUnirse: 'Ikut perang', gzGuerreros: 'Pejuang',
    gzMundo: 'Perang', gzAzul: 'Biru', gzRojo: 'Merah', gzEqAzul: 'Tim Biru', gzEqRojo: 'Tim Merah', gzTuEq: 'Timmu: {e}',
    gzEspera: 'Ruang tunggu', gzEsperaTx: 'Bagikan kodenya ke temanmu. Jika semua sudah ada, mulai pertandingan.', gzEmpezar: 'Mulai', gzCambiar: 'Ganti tim', gzEsperaDueno: 'Menunggu pemilik memulai…',
    gzConstruccion: 'Membangun', gzBatalla: 'Pertempuran', gzFaseC: 'MEMBANGUN<small>buat pertahananmu: tidak ada yang bisa terluka</small>', gzFaseB: 'SERANG!<small>hancurkan Jantung desa lawan</small>',
    gzCorazon: 'Jantung Desa', gzCorAtaque: 'JANTUNGMU DISERANG!', gzCorRoto: 'JANTUNG {e} RUNTUH!', gzGana: 'TIM {e} MENANG!', gzEmpate: 'SERI!', gzGanaste: 'KAMU MENANG!', gzPerdiste: 'KAMU KALAH',
    gzTusPts: 'Poinmu: {n}', gzOtra: 'Main lagi', gzSalir: 'Keluar', gzEsperaOtra: 'Pemilik ruang bisa memulai lagi', gzReaparece: 'KEMBALI DALAM {n}', gzPts: 'Poin: {n}',
    gzSala: 'Ruang {c}', gzSalaLista: 'RUANG SIAP: {c}<small>temanmu masuk dengan kode itu dari "Online"</small>', gzSeFue: 'PERANG SELESAI<small>pemilik ruang pergi</small>',
    gzBadge: 'PERANG', recGuerra: 'Pejuang', gzGuardia: 'Penjaga', gzAsaltante: 'Penyerbu', gzNoAqui: 'JANTUNG TIDAK BOLEH DITUTUP', gzDerribo: '+{n} jatuhkan', gzMercado: 'PASAR<small>peti berisi perlengkapan bagus di tengah</small>',
    gzCofreEq: 'Peti tim', gzVida: '{n}%' },
  ar: { gzBtn: 'حرب القرى<small>الفريق الأزرق ضد الفريق الأحمر</small>', gzTitulo: 'حرب القرى', gzSub: 'احمِ قلبك · واكسر قلب الخصم',
    gzT1: 'البناء: اجمع الموارد وابنِ الدفاعات. لا أحد يستطيع أن يؤذي أحدًا.', gzT2: 'المعركة: اكسر قلب قرية الخصم لتفوز.', gzT3: 'إذا انتهى الوقت يفوز القلب الذي لديه حياة أكثر.',
    gzT4: 'إذا متّ تعود إلى قريتك بعد ثوانٍ قليلة.', gzT5: 'الحراس والمغيرون يكملون الفرق عندما ينقص اللاعبون.',
    gzSolo: 'وحدك<small>أنت وفريقك ضد الخصم</small>', gzAbierta: 'غرفة مفتوحة<small>يمكن لأي أحد الانضمام</small>', gzAmigos: 'مع الأصدقاء<small>غرفة خاصة برمز</small>', gzUnirse: 'انضم إلى حرب', gzGuerreros: 'المحاربون',
    gzMundo: 'حرب', gzAzul: 'الأزرق', gzRojo: 'الأحمر', gzEqAzul: 'الفريق الأزرق', gzEqRojo: 'الفريق الأحمر', gzTuEq: 'فريقك: {e}',
    gzEspera: 'غرفة الانتظار', gzEsperaTx: 'أعطِ الرمز لأصدقائك. عندما يصل الجميع ابدأ المباراة.', gzEmpezar: 'ابدأ', gzCambiar: 'غيّر الفريق', gzEsperaDueno: 'في انتظار أن يبدأ صاحب الغرفة…',
    gzConstruccion: 'البناء', gzBatalla: 'المعركة', gzFaseC: 'البناء<small>ابنِ دفاعاتك: لا أحد يستطيع أن يؤذي أحدًا</small>', gzFaseB: 'إلى المعركة!<small>اكسر قلب قرية الخصم</small>',
    gzCorazon: 'قلب القرية', gzCorAtaque: 'قلبك يتعرض للهجوم!', gzCorRoto: 'سقط القلب {e}!', gzGana: 'فاز الفريق {e}!', gzEmpate: 'تعادل!', gzGanaste: 'فزت!', gzPerdiste: 'خسرت',
    gzTusPts: 'نقاطك: {n}', gzOtra: 'مباراة أخرى', gzSalir: 'خروج', gzEsperaOtra: 'يمكن لصاحب الغرفة أن يبدأ مباراة أخرى', gzReaparece: 'تعود بعد {n}', gzPts: 'النقاط: {n}',
    gzSala: 'الغرفة {c}', gzSalaLista: 'الغرفة جاهزة: {c}<small>يدخل أصدقاؤك بهذا الرمز من "عبر الإنترنت"</small>', gzSeFue: 'انتهت الحرب<small>غادر صاحب الغرفة</small>',
    gzBadge: 'حرب', recGuerra: 'المحاربون', gzGuardia: 'حارس', gzAsaltante: 'مُغير', gzNoAqui: 'لا يمكن تغطية القلب', gzDerribo: '+{n} إسقاط', gzMercado: 'السوق<small>صندوق فيه عتاد جيد في الوسط</small>',
    gzCofreEq: 'صندوق الفريق', gzVida: '{n}%' } };
for (const l in GZ_TXT) if (TX[l]) Object.assign(TX[l], GZ_TXT[l]);
try { for (const [l, n] of Object.entries({ es: ['Guardia azul', 'Guardia rojo', 'Asaltante azul', 'Asaltante rojo', 'Corazón azul', 'Corazón rojo'], en: ['Blue guard', 'Red guard', 'Blue raider', 'Red raider', 'Blue heart', 'Red heart'], pt: ['Guarda azul', 'Guarda vermelho', 'Invasor azul', 'Invasor vermelho', 'Coração azul', 'Coração vermelho'] }))
  if (NOM_CRIA[l]) Object.assign(NOM_CRIA[l], { gzGuardiaA: n[0], gzGuardiaR: n[1], gzAsaltA: n[2], gzAsaltR: n[3], gzCorA: n[4], gzCorR: n[5] }); } catch (e) {}

// ═════════ AJUSTES ═════════
const GZ = { constr: 180, batalla: 600, corVida: 400, porEquipo: 4, reaparece: 5, bot: { g: { vida: 30, dano: 3, vel: 2.5 }, a: { vida: 24, dano: 3, vel: 2.7 } } };
const GZ_COL = { A: '#3a6bff', R: '#e8403a' }, GZ_COL2 = { A: '#8fdcff', R: '#ffb0a0' };
const gzEs = () => window.mundoTipo === 'guerra';
const gzYo = () => { try { return __mp.nombre(); } catch (e) { return 'Yo'; } };
const gzEnLinea = () => { try { return !!MP.sala; } catch (e) { return false; } };
const gzInvitado = () => { try { return !!MP.invitado; } catch (e) { return false; } };
const gzHost = () => !gzInvitado();
const gzEsc = s => String(s == null ? '' : s).replace(/[<>&"]/g, '');
const gzOtro = e => e === 'A' ? 'R' : 'A';
const gzNomEq = e => TR(e === 'A' ? 'gzAzul' : 'gzRojo');
const gzBloque = (k, alt) => { try { const v = window.__bloques2 && __bloques2.B2[k]; return v != null ? v : alt; } catch (e) { return alt; } };

// ═════════ EL MUNDO: dos aldeas frente a frente ═════════
// mapa de 96×96: aldea Azul al norte (z chico), aldea Roja al sur, el Mercado en el medio
const GZ_BASE = { A: { x: 48, z: 15 }, R: { x: 48, z: 81 } }, GZ_ALTO = 12;
function gzRng(s) { let t = (s >>> 0) || 1; return () => { t = (t + 0x6D2B79F5) | 0; let r = Math.imul(t ^ (t >>> 15), 1 | t); r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r; return ((r ^ (r >>> 14)) >>> 0) / 4294967296; }; }
function armarArena(S) {
  const R = gzRng(S ^ 0x2f6b9e1d), H = GZ_ALTO;
  const P = (x, y, z, t) => { if (x >= 0 && z >= 0 && x < SX && z < SZ && y > 0 && y < SY - 1) mundo[idx(x, y, z)] = t; };
  // suelo: llano, con lomitas suaves en el medio y agua en el borde
  for (let x = 0; x < SX; x++) for (let z = 0; z < SZ; z++) {
    for (let y = 1; y < SY; y++) mundo[idx(x, y, z)] = 0;
    mundo[idx(x, 0, z)] = B.PIEDRA;
    const borde = Math.min(x, z, SX - 1 - x, SZ - 1 - z);
    if (borde < 3) { for (let y = 1; y <= H - 2; y++) P(x, y, z, B.PIEDRA); P(x, H - 1, z, B.ARENA); P(x, H, z, B.AGUA); continue; }
    const medio = z > 26 && z < SZ - 27;
    const loma = medio ? Math.max(0, Math.round(Math.sin(x * .19 + S % 7) * 1.1 + Math.cos(z * .23 + S % 5) * 1.1)) : 0;
    const top = H + loma;
    for (let y = 1; y < top - 2; y++) P(x, y, z, B.PIEDRA);
    P(x, top - 2, z, B.TIERRA); P(x, top - 1, z, B.TIERRA); P(x, top, z, borde === 3 ? B.ARENA : B.PASTO);
    if (borde > 4 && R() < .05) P(x, top + 1, z, R() < .7 ? B.PASTO_ALTO : (R() < .5 ? B.FLOR_R : B.FLOR_A));
  }
  const suelo = (x, z) => { let y = SY - 2; while (y > 0 && (!mundo[idx(x, y, z)] || (DEF[mundo[idx(x, y, z)]] && DEF[mundo[idx(x, y, z)]].planta))) y--; return y; };
  // árboles y rocas con minerales en la zona del medio (iguales para los dos lados: el mapa es espejo)
  const arbol = (x, z) => { const y = suelo(x, z); if (y < H) return; for (let k = 1; k <= 4; k++) P(x, y + k, z, B.TRONCO);
    for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) for (let c = 3; c <= 5; c++) if (Math.abs(a) + Math.abs(b) + (c === 5 ? 2 : 0) < 4 && !(a === 0 && b === 0 && c < 5)) P(x + a, y + c, z + b, B.HOJAS); };
  const roca = (x, z) => { const y = suelo(x, z); for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let c = 1; c <= 2; c++) if (Math.abs(a) + Math.abs(b) + c < 4) P(x + a, y + c, z + b, R() < .3 ? (R() < .55 ? B.HIERRO_M : B.CARBON_M) : B.PIEDRA); };
  const lugares = [];
  for (let k = 0; k < 9; k++) { const x = 8 + Math.floor(R() * (SX - 16)), z = 30 + Math.floor(R() * 12); if (Math.abs(x - 48) < 6) continue; lugares.push([x, z, R() < .65 ? 'a' : 'r']); }
  for (const [x, z, t] of lugares) { const f = t === 'a' ? arbol : roca; f(x, z); f(x, SZ - 1 - z); }
  // el Mercado en el centro: plataforma de piedra con columnas, techo y un cofre de equipo bueno
  const MX = 48, MZ = 48, my = suelo(MX, MZ);
  for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) { for (let y = my + 1; y < my + 6; y++) P(MX + a, y, MZ + b, 0); P(MX + a, my, MZ + b, B.ADOQUIN); }
  for (const [a, b] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) for (let y = 1; y <= 3; y++) P(MX + a, my + y, MZ + b, B.LADRILLO_P ?? B.ADOQUIN);
  for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) P(MX + a, my + 4, MZ + b, (Math.abs(a) === 3 || Math.abs(b) === 3) ? (B.LOSA ?? B.MADERA) : B.MADERA);
  P(MX, my + 1, MZ, B.COFRE); P(MX + 2, my + 1, MZ, B.ANTORCHA); P(MX - 2, my + 1, MZ, B.ANTORCHA);
  // las dos aldeas
  for (const eq of ['A', 'R']) armarAldea(eq, P, suelo);
  animalesIniciales = [];
}
function armarAldea(eq, P, suelo) {
  const { x: X, z: Z } = GZ_BASE[eq], s = eq === 'A' ? 1 : -1, H = GZ_ALTO;
  const colorC = gzBloque(eq === 'A' ? 'HORMIGÓN_12' : 'HORMIGÓN_5', eq === 'A' ? B.LADRILLO_P ?? B.ADOQUIN : B.LADRILLO);
  // plaza
  for (let a = -7; a <= 7; a++) for (let b = -5; b <= 5; b++) { for (let y = H + 1; y < H + 8; y++) P(X + a, y, Z + b, 0); P(X + a, H, Z + b, (Math.abs(a) + Math.abs(b)) % 3 ? B.ADOQUIN : B.PIEDRA); }
  // anillo de color alrededor del Corazón (para saber de qué equipo es)
  for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) if (Math.max(Math.abs(a), Math.abs(b)) === 2) P(X + a, H, Z + b, colorC);
  // tres casitas detrás de la plaza (lado de afuera del mapa)
  const casa = (cx, cz) => { for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) { for (let y = H + 1; y <= H + 5; y++) P(cx + a, y, cz + b, 0); P(cx + a, H, cz + b, B.MADERA);
      const borde = Math.abs(a) === 2 || Math.abs(b) === 2; if (borde) for (let y = 1; y <= 3; y++) P(cx + a, H + y, cz + b, (Math.abs(a) === 2 && Math.abs(b) === 2) ? B.TRONCO : (y === 2 && (a === 0 || b === 0) ? B.VIDRIO : B.MADERA)); }
    for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) P(cx + a, H + 4, cz + b, colorC);
    P(cx, H + 1, cz + 2 * s, B.PUERTA); P(cx, H + 2, cz + 2 * s, B.PUERTA); P(cx + 1, H + 1, cz - s, B.CAMA); P(cx - 1, H + 3, cz - s, B.ANTORCHA); };
  casa(X - 10, Z - 6 * s); casa(X + 10, Z - 6 * s); casa(X, Z - 9 * s);
  // estandartes del color del equipo en las esquinas de la plaza
  for (const a of [-7, 7]) { for (let y = 1; y <= 4; y++) P(X + a, H + y, Z + 5 * s, y < 3 ? B.VALLA ?? B.TRONCO : colorC); P(X + a, H + 5, Z + 5 * s, B.ANTORCHA); }
  // cofre del equipo y una mesa de trabajo cerca del Corazón
  P(X + 4, H + 1, Z - 2 * s, B.COFRE); P(X - 4, H + 1, Z - 2 * s, B.MESA_TRABAJO ?? B.HORNO ?? B.MADERA);
}
// cofres: el del equipo (materiales para construir) y el del Mercado (equipo bueno)
function gzCofres() {
  const H = GZ_ALTO;
  for (const eq of ['A', 'R']) { const { x: X, z: Z } = GZ_BASE[eq], s = eq === 'A' ? 1 : -1;
    cofres[idx(X + 4, H + 1, Z - 2 * s)] = { [B.MADERA]: 64, [B.ADOQUIN]: 64, [gzBloque(eq === 'A' ? 'HORMIGÓN_12' : 'HORMIGÓN_5', B.LADRILLO)]: 48, [B.VIDRIO]: 16, [B.TNT]: 3, [B.PALANCA]: 2, [B.PUERTA]: 2, [I.FLECHA]: 32, [I.PAN]: 16, [I.ARM + 4]: 1, [I.ARM + 6]: 1 }; }
  let my = SY - 2; while (my > 0 && mundo[idx(48, my, 48)] !== B.COFRE) my--;
  if (my > 0) cofres[idx(48, my, 48)] = { [I.ESP3]: 2, [I.ARM + 5]: 2, [I.ARM + 7]: 2, [I.FLECHA]: 48, [B.TNT]: 4, [I.MANZANA]: 6 };
  sucio = true;
}
{ const p0 = prepararMundo; prepararMundo = function (S, ej) { const r = p0.apply(this, arguments); if (gzEs()) { try { armarArena(S); } catch (e) { console.error(e); } } return r; }; }
// cielo de día, siempre
const gzSuelo = (x, z) => { try { return sueloCerca(x, z); } catch (e) { return GZ_ALTO + 1; } };

// ═════════ EL CORAZÓN DE LA ALDEA (diseño propio) ═════════
const gzLuz = (c, niebla = true) => new THREE.MeshBasicMaterial({ color: parseInt(c.slice(1), 16), fog: niebla });
function armarCorazon(g, eq) {
  const pie = matA(0x4a4f5c), pie2 = matA(0x2c3038), oro = matA(0xd8a82a), col = gzLuz(GZ_COL[eq]), col2 = gzLuz(GZ_COL2[eq], false);
  caja(g, 1.3, .3, 1.3, 0, .15, 0, pie2); caja(g, 1.0, .5, 1.0, 0, .55, 0, pie); caja(g, 1.1, .08, 1.1, 0, .82, 0, oro);
  for (const [x, z] of [[-.45, -.45], [.45, -.45], [-.45, .45], [.45, .45]]) caja(g, .1, .12, .1, x, .92, z, col);
  const cris = new THREE.Group(); cris.position.y = 1.75; g.add(cris);
  const c1 = caja(cris, .78, .78, .78, 0, 0, 0, col); c1.rotation.set(Math.PI / 4, 0, Math.PI / 4);
  const c2 = caja(cris, .44, .44, .44, 0, 0, 0, col2); c2.rotation.set(Math.PI / 4, Math.PI / 4, 0);
  const orb = new THREE.Group(); orb.position.y = 1.75; g.add(orb);
  for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2; caja(orb, .12, .12, .12, Math.cos(a) * .85, Math.sin(k) * .12, Math.sin(a) * .85, k % 2 ? oro : col2); }
  g._cris = cris; g._orb = orb;
  return [];
}
for (const eq of ['A', 'R']) TIPOS['gzCor' + eq] = { vida: 1e6, an: .65, al: 2.3, vel: 0, peso: 9, color: GZ_COL[eq], voz: 'golem', ia: true, noNatural: true, gzCor: eq,
  armar: g => armarCorazon(g, eq), guiar: a => { a.userData.vida = 1e6; return { vel: 0 }; }, suelta: () => [] };

// ═════════ GUARDIAS Y ASALTANTES (diseño propio) ═════════
function armarSoldado(g, eq, rol) {
  const c = GZ_COL[eq], c2 = eq === 'A' ? '#1f3a9a' : '#8a1a14';
  const P = rol === 'g'
    ? { piel: '#e0ac80', pelo: '#3a2a20', remera: c, pantalon: c2, zapatos: '#2a2a30', peinado: 'corto', sombrero: 'casco', sombreroC: '#c8d0e0', armadura: 'plata' }
    : { piel: '#c98a5a', pelo: '#1d1d21', remera: c, pantalon: '#3a3a3a', zapatos: '#1d1d21', peinado: 'puntas', capa: c2, lentes: '#1d1d21' };
  const p = armarPersonaje(P); g.add(p); g.cuerpo = p;
  // arma en la mano: lanza corta (guardia) o maza (asaltante)
  const mano = p.userData.brazos && p.userData.brazos[1];
  if (mano) { if (rol === 'g') { caja(mano, .05, .9, .05, 0, -.45, .12, matA(0x8a5a2e)); caja(mano, .1, .16, .1, 0, -.95, .12, matA(0xc8d0e0)); }
    else { caja(mano, .06, .6, .06, 0, -.45, .12, matA(0x5a3418)); caja(mano, .2, .2, .2, 0, -.8, .12, matA(0x7c86ad)); } }
  return p.userData.piernas;
}
for (const eq of ['A', 'R']) for (const rol of ['g', 'a']) {
  const S = GZ.bot[rol], t = (rol === 'g' ? 'gzGuardia' : 'gzAsalt') + eq;
  TIPOS[t] = { vida: S.vida, an: .32, al: 1.8, vel: S.vel, peso: .5, color: GZ_COL[eq], voz: 'aldeano', ia: true, noNatural: true, gzBot: { eq, rol },
    armar: g => armarSoldado(g, eq, rol), guiar: (a, dt) => gzGuiarBot(a, dt), suelta: () => [] };
}

// ═════════ ESTADO DE LA PARTIDA ═════════
// El dueño (o el que juega solo) lleva la cuenta en mapa.guerra; los invitados reciben una copia (GZR).
let GZR = null;
const gzEstado = () => gzInvitado() ? GZR : (typeof mapa !== 'undefined' ? mapa.guerra : null);
const gzCorazones = () => animales.filter(a => TIPOS[a.userData.animal] && TIPOS[a.userData.animal].gzCor);
const gzCorDe = eq => animales.find(a => a.userData.animal === 'gzCor' + eq);
const gzBots = () => animales.filter(a => TIPOS[a.userData.animal] && TIPOS[a.userData.animal].gzBot);
function gzMiEquipo() { const G = gzEstado(); return (G && G.eq && G.eq[gzYo()]) || 'A'; }
function gzEquipoDe(nombre) { const G = gzEstado(); return G && G.eq ? G.eq[nombre] : null; }
function gzBasePos(eq) { const b = GZ_BASE[eq], s = eq === 'A' ? 1 : -1; return { x: b.x + .5, y: GZ_ALTO + 1.05, z: b.z + 6.5 * s + .5, yaw: eq === 'A' ? Math.PI : 0 }; }
function gzHumanos() { const l = [gzYo()]; try { for (const j of MP.jug.values()) l.push(j.nombre); } catch (e) {} return l; }
function gzBalancear(G) {
  for (const n of Object.keys(G.eq)) if (!gzHumanos().includes(n)) delete G.eq[n];
  for (const n of gzHumanos()) if (!G.eq[n]) { const c = { A: 0, R: 0 }; for (const v of Object.values(G.eq)) c[v]++; G.eq[n] = c.A <= c.R ? 'A' : 'R'; }
}
function gzNueva(enLobby) {
  if (gzInvitado()) return;
  const viejo = mapa.guerra || {}, n = (viejo.n || 0) + 1;
  const G = mapa.guerra = { on: true, n, fase: enLobby ? 'espera' : 'constr', t: GZ.constr, hp: { A: GZ.corVida, R: GZ.corVida }, max: GZ.corVida, eq: Object.assign({}, viejo.eq || {}), pts: {}, gana: '', fin: false, t1: 0, ultG: {} };
  if (!G.eq[gzYo()]) G.eq[gzYo()] = 'A';
  gzBalancear(G);
  // el mundo vuelve a como estaba al empezar: se borran bots y Corazones viejos, se reponen los cofres
  for (const a of animales.slice()) quitarAnimal(a);
  for (const m of monstruos.slice()) quitarMonstruo(m, false);
  gzCofres();
  for (const eq of ['A', 'R']) { const b = GZ_BASE[eq]; crearAnimal('gzCor' + eq, b.x + .5, GZ_ALTO + 1.02, b.z + .5); }
  if (!enLobby) gzEmpezarConstruccion();
  gzLlevarABase(); gzKit(); gzEnvioT = 0; sucio = true;
  cerrar('gzFinCapa'); pausado = false;
}
function gzEmpezarConstruccion() {
  const G = mapa.guerra; G.fase = 'constr'; G.t = GZ.constr; gzBalancear(G);
  gzPonerBots(); aviso(TR('gzFaseC'), 3200); gzAvisos.push('gzFaseC'); sonar('mision', .6) || son(660, .2, 'triangle', .1);
  if (gzEnLinea()) gzAvisos.push('$base');
}
// cada equipo tiene GZ.porEquipo lugares: los que no ocupa una persona los ocupan bots (primero un Guardia)
function gzPonerBots() {
  const G = mapa.guerra; gzRevivirBots = []; for (const a of gzBots()) quitarAnimal(a);
  for (const eq of ['A', 'R']) { const hum = Object.values(G.eq).filter(v => v === eq).length, faltan = Math.max(0, GZ.porEquipo - hum);
    for (let k = 0; k < faltan; k++) gzCrearBot(eq, k === 0 || (k === 2 && faltan === 4) ? 'g' : 'a', k); }
}
function gzCrearBot(eq, rol, k) {
  const b = GZ_BASE[eq], s = eq === 'A' ? 1 : -1, ang = k * 1.6;
  const x = b.x + .5 + Math.cos(ang) * 3.2, z = b.z + .5 + Math.sin(ang) * 2.2 + 2 * s;
  const a = crearAnimal((rol === 'g' ? 'gzGuardia' : 'gzAsalt') + eq, x, GZ_ALTO + 1.05, z);
  const e = ex(a); e.gz = 1; e.eq = eq; e.rol = rol; e.post = { x: b.x + .5 + Math.cos(ang) * 3, z: b.z + .5 + 2.6 * s + Math.sin(ang) * 1.2 }; e.k = k;
  a.userData.vida = GZ.bot[rol].vida;
  return a;
}
function gzLlevarABase() {
  const p = gzBasePos(gzMiEquipo()); spawn.x = p.x; spawn.y = p.y; spawn.z = p.z; spawn.yaw = p.yaw;
  Object.assign(J, { x: p.x, y: p.y, z: p.z, vx: 0, vy: 0, vz: 0, yaw: p.yaw });
}
function gzKit() {
  inv = {}; const eq = gzMiEquipo(), bloque = gzBloque(eq === 'A' ? 'HORMIGÓN_12' : 'HORMIGÓN_5', B.LADRILLO);
  Object.assign(inv, { [I.ESP2]: 1, [I.PICO2]: 1, [I.ARCO]: 1, [I.FLECHA]: 16, [B.MADERA]: 32, [B.ADOQUIN]: 32, [bloque]: 32, [I.PAN]: 8 });
  barra = [I.ESP2, I.PICO2, I.ARCO, bloque, B.MADERA, B.ADOQUIN, I.PAN, 0, 0]; sel = 0;
  vida = 20; hambre = 20; try { pintarBarra(); pintarVida(); } catch (e) {}
}

// ═════════ DAÑO ═════════
// quién le pegó a quién (para saber quién derribó a quién)
function gzPuntos(n, v) { const G = mapa.guerra; if (!G || !n) return; G.pts[n] = Math.round((G.pts[n] || 0) + v); }
function gzCercaDeMiCorazon(eq, x, z) { const c = gzCorDe(eq); return c && Math.hypot(c.position.x - x, c.position.z - z) < 16; }
// le pegan a una unidad de la Guerra (bot o Corazón). quien: nombre del jugador ('' si fue un bot o una explosión)
function gzDanar(a, n, quien, dir, eqAtacante) {
  const G = mapa.guerra; if (!G || !G.on || G.fin || G.fase !== 'batalla') { if (a) { a.userData.rojo = .15; } return; }
  const T = TIPOS[a.userData.animal] || {}, eqV = T.gzCor || (T.gzBot && T.gzBot.eq);
  const eqA = eqAtacante || (quien ? gzEquipoDe(quien) : null);
  if (eqA && eqA === eqV) return;                                            // no se le pega al propio equipo
  n = Math.max(1, Math.min(40, Math.round(n)));
  if (T.gzCor) {
    const real = Math.min(n, G.hp[eqV]); G.hp[eqV] -= real; a.userData.rojo = .25;
    polvo(a.position.x, a.position.y + 1.7, a.position.z, GZ_COL[eqV], 5); son(320, .1, 'square', .08);
    if (quien) gzPuntos(quien, real);
    gzUltimoAtaque[eqV] = 2.5;
    if (G.hp[eqV] <= 0) gzTerminar(gzOtro(eqV), eqV);
    sucio = true; gzEnvioT = Math.min(gzEnvioT, .05); return;
  }
  const u = a.userData; u.vida -= n; u.rojo = .25; if (dir) { u.kx = (dir.x || 0) * 6; u.kz = (dir.z || 0) * 6; } u.vy = 3.5; ex(a).ultG = quien || '';
  if (quien) gzPuntos(quien, n * (gzCercaDeMiCorazon(eqA, a.position.x, a.position.z) ? 1.5 : 1));   // defender cerca de tu Corazón vale más
  if (u.vida <= 0) gzMuereBot(a, quien);
}
function gzMuereBot(a, quien) {
  const e = ex(a), p = a.position; polvo(p.x, p.y + .8, p.z, GZ_COL[e.eq], 14);
  if (quien) { gzPuntos(quien, 15); if (quien === gzYo()) aviso(TR('gzDerribo', { n: 15 }), 900); }
  quitarAnimal(a);
  gzRevivirBots.push({ eq: e.eq, rol: e.rol, k: e.k || 0, t: 8 });
}
let gzRevivirBots = [];
const gzUltimoAtaque = { A: 0, R: 0 };
function gzTerminar(gana, cayo) {
  const G = mapa.guerra; if (!G || G.fin) return;
  G.fin = true; G.gana = gana; G.t1 = Date.now(); G.fase = 'fin';
  if (cayo) { const c = gzCorDe(cayo); if (c) { const p = c.position; for (let k = 0; k < 6; k++) polvo(p.x, p.y + .5 + k * .35, p.z, k % 2 ? GZ_COL[cayo] : '#ffffff', 16); quitarAnimal(c); } gzAvisos.push('$cayo:' + cayo); }
  if (gana) for (const [n, e] of Object.entries(G.eq)) if (e === gana) gzPuntos(n, 100);
  sonar('final', .9) || son(660, .4, 'triangle', .12);
  sucio = true; gzEnvioT = 0; gzMandar();
  gzMostrarFin(G);
}

// ═════════ LA IA DE LOS BOTS (la corre el dueño o el que juega solo) ═════════
function gzObjetivos(eqEnemigo) {
  // personas del equipo rival que están vivas
  const l = [], G = mapa.guerra;
  if (G.eq[gzYo()] === eqEnemigo && vida > 0 && !window.espectador) l.push({ tipo: 'yo', x: J.x, y: J.y, z: J.z });
  try { for (const j of MP.jug.values()) if (j.obj && (j.vida ?? 20) > 0 && G.eq[j.nombre] === eqEnemigo) l.push({ tipo: 'inv', j, x: j.obj.x, y: j.obj.y, z: j.obj.z }); } catch (e) {}
  for (const b of gzBots()) if (ex(b).eq === eqEnemigo) l.push({ tipo: 'bot', a: b, x: b.position.x, y: b.position.y, z: b.position.z });
  return l;
}
function gzPegar(a, o, n) {
  const p = a.position, dx = o.x - p.x, dz = o.z - p.z, d = Math.hypot(dx, dz) || 1, kx = dx / d, kz = dz / d;
  if (o.tipo === 'yo') { if (!creativo() && vida > 0) { gzUltG[gzYo()] = ''; lastimar(n, kx, kz); } }
  else if (o.tipo === 'inv') mpEnviar({ t: 'uno', para: o.j.id, tipo: 'dano', n, kx: +kx.toFixed(2), kz: +kz.toFixed(2), salto: true });
  else if (o.tipo === 'bot') gzDanar(o.a, n, '', { x: kx, z: kz }, ex(a).eq);
  a.userData.swing = 1; try { if (a.cuerpo && a.cuerpo.userData.brazos) a.cuerpo.userData.brazos[1].rotation.x = -1.3; } catch (e) {}
}
function gzCavar(a, dir, dt) {
  // si una pared lo frena, la rompe (las defensas demoran, pero no son eternas)
  const u = a.userData, p = a.position, e = ex(a);
  const mov = e.ultP ? Math.hypot(p.x - e.ultP.x, p.z - e.ultP.z) : 1; e.ultP = { x: p.x, z: p.z };
  e.trabado = mov < .02 * (dt / .016) ? (e.trabado || 0) + dt : 0;
  if (e.trabado < 1.2) return;
  e.trabado = .4;
  const sx = Math.sin(dir), sz = Math.cos(dir), y0 = Math.floor(p.y + .1);
  const celdas = [[Math.floor(p.x + sx * .9), Math.floor(p.z + sz * .9)], [Math.floor(p.x + Math.sign(sx) * .8), Math.floor(p.z)], [Math.floor(p.x), Math.floor(p.z + Math.sign(sz) * .8)]];
  const rompible = t => t && t !== B.AGUA && t !== B.LAVA && DEF[t] && !DEF[t].planta && t !== B.OBSIDIANA;
  let rompio = false;
  for (const [fx, fz] of celdas) for (const y of [y0 + 1, y0 + 2, y0]) { const t = get(fx, y, fz);
    if (rompible(t) && !(y === y0 && rompio)) { ponerBloque(fx, y, fz, 0); polvo(fx + .5, y + .5, fz + .5, DEF[t].color || '#888888', 6); rompio = true; } }
  if (rompio) son(260, .06, 'square', .05);
  u.vy = 6;   // y salta (para subir un escalón)
  e.trabadoTot = (e.trabadoTot || 0) + 1;
  if (e.trabadoTot > 8) { e.trabadoTot = 0; e.pasoMedio = 1; }
}
function gzGuiarBot(a, dt) {
  const G = mapa.guerra, u = a.userData, e = ex(a), p = a.position;
  if (!G || !G.on || G.fin || gzInvitado()) return { vel: 0 };
  const S = GZ.bot[e.rol], E = gzOtro(e.eq);
  u.ataque = (u.ataque || 0) - dt;
  try { if (a.cuerpo && a.cuerpo.userData.brazos) a.cuerpo.userData.brazos[1].rotation.x *= Math.pow(.02, dt); } catch (x) {}
  const ir = (x, z, vel, cerca = 1.2) => { const dx = x - p.x, dz = z - p.z, d = Math.hypot(dx, dz), dir = Math.atan2(dx, dz); if (d < cerca) return { dir, vel: 0 }; gzCavar(a, dir, dt); return { dir, vel }; };
  // en construcción y en la sala de espera: cada uno en su lugar
  if (G.fase !== 'batalla') { e.trabado = 0; return ir(e.post.x, e.post.z, S.vel * .6, 1.5); }
  const objs = gzObjetivos(E), miCor = gzCorDe(e.eq), suCor = gzCorDe(E);
  let mejor = null, dm = Infinity; for (const o of objs) { const d = Math.hypot(o.x - p.x, o.z - p.z) + Math.abs(o.y - p.y) * .5; if (d < dm) { dm = d; mejor = o; } }
  const pelear = o => { const dx = o.x - p.x, dz = o.z - p.z, d = Math.hypot(dx, dz), dir = Math.atan2(dx, dz);
    if (d < 1.6 + u.an && Math.abs(o.y - p.y) < 1.8) { if (u.ataque <= 0) { u.ataque = 1.1; gzPegar(a, o, S.dano); } return { dir, vel: 0 }; }
    gzCavar(a, dir, dt); return { dir, vel: S.vel }; };
  if (e.rol === 'g') {
    // guardia: defiende la zona de su Corazón y lo repara cuando no hay peligro
    const cx = miCor ? miCor.position.x : e.post.x, cz = miCor ? miCor.position.z : e.post.z;
    if (mejor && Math.hypot(mejor.x - cx, mejor.z - cz) < 14) return pelear(mejor);
    if (miCor && G.hp[e.eq] < G.max) { e.rep = (e.rep || 0) + dt; if (e.rep > 2) { e.rep = 0; G.hp[e.eq] = Math.min(G.max, G.hp[e.eq] + 1); polvo(cx, miCor.position.y + 1.7, cz, '#6cff8a', 3); } }
    return ir(e.post.x, e.post.z, S.vel * .7, 1.2);
  }
  // asaltante: pelea si tiene a alguien encima; si no, va derecho al Corazón rival
  // a las personas las enfrenta si están cerca; a otros bots solo si le cortan el paso
  let cerca = null, dc = Infinity; for (const o of objs) { const d = Math.hypot(o.x - p.x, o.z - p.z); if ((o.tipo === 'bot' ? d < 2.2 : d < 6) && d < dc) { dc = d; cerca = o; } }
  if (cerca) return pelear(cerca);
  // primero por un carril de costado (para no chocarse todos en el medio), después derecho al Corazón
  if (suCor && !e.pasoMedio) { const lado = e.k === 1 ? -13 : 13, sZ = e.eq === 'A' ? 1 : -1;
    if ((p.z - 48) * sZ > 5 || Math.hypot(p.x - 48.5 - lado, p.z - 48.5 - 8 * sZ) < 3) e.pasoMedio = 1; else return ir(48.5 + lado, 48.5 + 8 * sZ, S.vel, 1); }
  if (suCor) { const dx = suCor.position.x - p.x, dz = suCor.position.z - p.z, d = Math.hypot(dx, dz), dir = Math.atan2(dx, dz);
    if (d < 1.9 + u.an) { if (u.ataque <= 0) { u.ataque = 1.2; gzDanar(suCor, S.dano + 1, '', null, e.eq); } return { dir, vel: 0 }; }
    gzCavar(a, dir, dt); return { dir, vel: S.vel }; }
  return { vel: 0 };
}

// ═════════ GOLPES DE LAS PERSONAS ═════════
const gzDanoMano = () => [2, 3, 4, 6, 8, 11][nivelEspada()] * (J.fuerza || 1);
const gzUltG = {};   // nombre -> quién le pegó último (para los derribos entre personas)
{ const g0 = golpear; golpear = function (m, dir) { const T = m && m.userData && TIPOS[m.userData.animal];
    if (T && (T.gzCor || T.gzBot)) { swing = 1; sonar('golpe', .7) || son(220, .1, 'sawtooth', .12); if (!gzInvitado()) gzDanar(m, gzDanoMano(), gzYo(), dir); return; }
    return g0.apply(this, arguments); }; }
{ const h0 = herir; herir = function (m, n) { const T = m && m.userData && TIPOS[m.userData.animal];
    if (T && (T.gzCor || T.gzBot)) { if (!gzInvitado()) gzDanar(m, n, gzYo(), null); return; }
    return h0.apply(this, arguments); }; }
{ const g0 = golpeDeInvitado; golpeDeInvitado = function (m) {
    const o = animales.find(a => a.userData.nid === m.n), T = o && TIPOS[o.userData.animal];
    if (T && (T.gzCor || T.gzBot)) { const j = MP.jug.get(m.id); gzDanar(o, Math.min(30, +m.d || 2), j ? j.nombre : '', { x: +m.dx || 0, z: +m.dz || 0 }); return; }
    return g0.apply(this, arguments); }; }
// las explosiones (TNT) también le hacen daño al Corazón y a los bots
// a otra persona: se le pega en la batalla si es del equipo rival
function gzApuntaPersona(dir) {
  const o = new THREE.Vector3(J.x, J.y + OJOS, J.z), r = new THREE.Ray(o, dir), v = new THREE.Vector3(); let mejor = null;
  try { for (const j of MP.jug.values()) { if (!j.g || !j.obj || (j.vida ?? 20) <= 0) continue; const p = j.g.position;
      if (r.intersectBox(new THREE.Box3(new THREE.Vector3(p.x - .38, p.y, p.z - .38), new THREE.Vector3(p.x + .38, p.y + 1.9, p.z + .38)), v)) { const d = v.distanceTo(o); if (d < 4.2 && (!mejor || d < mejor.d)) mejor = { j, d }; } } } catch (e) {}
  if (!mejor) return null; const h = apuntar(dir); if (h && h.t < mejor.d && solidoMov(h.b)) return null; return mejor;
}
{ const t0 = tocar; tocar = function (dir) {
    if (jugando && gzEs() && barra[sel] !== I.ARCO) {
      const G = gzEstado();
      if (G && G.fase === 'batalla' && !G.fin) { const hit = gzApuntaPersona(dir);
        if (hit && gzEquipoDe(hit.j.nombre) && gzEquipoDe(hit.j.nombre) !== gzMiEquipo()) {
          const n = gzDanoMano(); swing = 1; sonar('golpe', .7) || son(220, .1, 'sawtooth', .12); gzEstela(J.x + dir.x, J.y + 1.2, J.z + dir.z, 6);
          if (gzInvitado()) mpEnviar({ t: 'g', k: 'gzpvp2', a: hit.j.id, d: n, dx: +dir.x.toFixed(2), dz: +dir.z.toFixed(2) });
          else { gzUltG[hit.j.nombre] = gzYo(); mpEnviar({ t: 'uno', para: hit.j.id, tipo: 'dano', n, kx: +dir.x.toFixed(2), kz: +dir.z.toFixed(2), salto: true }); gzPuntos(gzYo(), n * (gzCercaDeMiCorazon(gzMiEquipo(), hit.j.obj.x, hit.j.obj.z) ? 1.5 : 1)); }
          return; }
      }
    }
    return t0(dir); }; }
// no se puede tapar el Corazón con bloques (ni encerrarlo adentro de un bloque)
{ const p0 = ponerBloque; ponerBloque = function (x, y, z, t) {
    if (t && jugando && gzEs()) for (const eq of ['A', 'R']) { const b = GZ_BASE[eq]; if (x === b.x && z === b.z && y >= GZ_ALTO + 1 && y <= GZ_ALTO + 3) { if (!gzBloqueAviso) { gzBloqueAviso = 1; aviso(TR('gzNoAqui'), 1200); setTimeout(() => gzBloqueAviso = 0, 1500); } return; } }
    return p0.apply(this, arguments); }; }
let gzBloqueAviso = 0;

// ═════════ MORIR Y VOLVER ═════════
let gzReapT = 0;
new MutationObserver(() => {
  if ($('muerte').hidden || !jugando || !gzEs()) return;
  $('muerte').hidden = true; pausado = false;
  const G = gzEstado();
  // derribo: si fue otra persona, suma puntos (lo cuenta el dueño)
  if (!gzInvitado() && G && G.fase === 'batalla') { const q = gzUltG[gzYo()]; if (q) { gzPuntos(q, 25); gzUltG[gzYo()] = ''; } }
  gzReapT = G && G.fase === 'batalla' ? GZ.reaparece : .5; gzReapEl.hidden = false;
}).observe($('muerte'), { attributes: true, attributeFilter: ['hidden'] });
function gzReaparecer() {
  const p = gzBasePos(gzMiEquipo()); vida = 20; hambre = 20; try { pintarVida(); pintarHambre && pintarHambre(); } catch (e) {}
  Object.assign(J, { x: p.x, y: p.y, z: p.z, vx: 0, vy: 0, vz: 0, yaw: p.yaw }); gzReapEl.hidden = true;
}
// los invitados que mueren: el dueño ve su vida en 0 y le da el derribo al último que le pegó
{ const e0 = estadoJugador; estadoJugador = function (m) {
    const j = MP.jug.get(m.id), antes = j ? (j.vida ?? 20) : 20; const r = e0.apply(this, arguments);
    if (MP.dueno && gzEs() && j && antes > 0 && (j.vida ?? 20) <= 0) { const G = mapa.guerra; if (G && G.fase === 'batalla') { const q = gzUltG[j.nombre]; if (q) { gzPuntos(q, 25); gzUltG[j.nombre] = ''; } } }
    return r; }; }

// ═════════ PANTALLAS Y HUD ═════════
{ const st = document.createElement('style'); st.textContent = `
  #bGuerra { background: linear-gradient(90deg, #3a6bff 0 50%, #e8403a 50% 100%); }
  #gzCapa .ventana, #gzFinCapa .ventana, #gzEsperaCapa .ventana { max-width: 640px; }
  #gzCuerpo { max-height: calc(100vh - 64px); overflow: auto; padding: 10px 16px 14px; color: #1b2a6b; display: grid; grid-template-columns: 1.1fr 1fr; gap: 6px 16px; align-items: start; }
  #gzCuerpo .lista div { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; font-weight: 700; margin-bottom: 6px; } #gzCuerpo .lista svg { flex: none; margin-top: 1px; }
  #gzCuerpo .cab { grid-column: 1 / -1; display: flex; align-items: center; gap: 10px; } #gzCuerpo .cab b { font-size: 20px; letter-spacing: 1px; } #gzCuerpo .cab small { display: block; font-weight: 700; color: #5a6aa8; }
  #gzCuerpo .bots .btn { width: 100%; margin-top: 6px; padding: 7px 0 6px; font-size: 15px; } #gzCuerpo .bots .btn small { display: block; font-size: 11px; opacity: .9; }
  #gzSoloB { background: linear-gradient(#3a6bff, #2a4ab8) !important; } #gzAbiertaB { background: linear-gradient(#2fb65a, #1f8a40) !important; } #gzAmigosB { background: linear-gradient(#e8403a, #a82a24) !important; }
  #gzGueB { background: linear-gradient(#ffd23a, #c8841a) !important; color: #1b2a6b; text-shadow: none; }
  @media (max-width: 560px) { #gzCuerpo { grid-template-columns: 1fr; } }
  #gzHud { position: fixed; top: max(6px, env(safe-area-inset-top)); left: 50%; transform: translateX(-50%); z-index: 4; width: min(38vw, 380px); pointer-events: none; font: 800 12px 'Baloo 2', 'Trebuchet MS', sans-serif; color: #fff; text-shadow: 0 1px 0 #000; text-align: center; direction: ltr; }
  #gzHud .fase { display: inline-block; background: rgba(13,21,61,.78); border-radius: 9px; padding: 1px 10px; margin-bottom: 3px; font-size: 13px; }
  #gzHud .fase.b { background: rgba(140,20,20,.82); }
  #gzHud .dos { display: flex; gap: 8px; align-items: center; }
  #gzHud .eq { flex: 1; } #gzHud .eq b { display: flex; justify-content: space-between; font-size: 11px; }
  #gzHud .barra { height: 10px; background: rgba(13,21,61,.78); border: 2px solid #0d153d; border-radius: 6px; overflow: hidden; } #gzHud .barra i { display: block; height: 100%; }
  #gzHud .eq.A .barra i { background: linear-gradient(90deg, #2a4ab8, #8fdcff); } #gzHud .eq.R .barra i { background: linear-gradient(90deg, #a82a24, #ffb0a0); margin-left: auto; }
  #gzHud .eq.ataque .barra { animation: gzLate .5s ease-in-out infinite; } @keyframes gzLate { 50% { border-color: #ffd23a; } }
  #gzHud .vs { font-size: 14px; }
  #gzPts { position: fixed; right: max(12px, env(safe-area-inset-right)); top: 70px; z-index: 4; pointer-events: none; font: 800 13px 'Baloo 2', 'Trebuchet MS', sans-serif; color: #ffe14a; text-shadow: 0 1px 0 #000; text-align: right; }
  #gzPts small { display: block; font-size: 11px; } #gzPts .e { display: inline-block; padding: 0 6px; border-radius: 6px; color: #fff; margin-top: 2px; }
  #gzReap { position: fixed; inset: 0; z-index: 30; display: flex; align-items: center; justify-content: center; pointer-events: none; background: rgba(120,0,0,.25); font: 800 clamp(24px, 5vw, 40px) 'Baloo 2', 'Trebuchet MS', sans-serif; color: #fff; text-shadow: 0 3px 0 #000; }
  #gzFinCuerpo, #gzEsperaCuerpo { max-height: calc(100vh - 64px); overflow: auto; padding: 10px 16px 14px; color: #1b2a6b; }
  #gzFinCuerpo .gana { text-align: center; font-weight: 800; font-size: 22px; margin-bottom: 6px; padding: 4px; border-radius: 10px; color: #fff; text-shadow: 0 2px 0 rgba(0,0,0,.35); }
  #gzFinCuerpo .mios { text-align: center; font-weight: 800; font-size: 16px; margin: 6px 0; }
  .gzRk { display: flex; align-items: center; gap: 8px; background: #fff; border: 2px solid #d5dbf3; border-radius: 10px; padding: 4px 8px; margin-bottom: 4px; font-weight: 800; font-size: 14px; }
  .gzRk.yo { background: #fff6d8; border-color: #ffb21a; } .gzRk .pos { width: 26px; display: flex; justify-content: center; } .gzRk .nom { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .gzRk .v { color: #1b2a6b; }
  .gzRk .pt { width: 12px; height: 12px; border-radius: 50%; flex: none; }
  #gzFinCuerpo .filaBtn, #gzEsperaCuerpo .filaBtn { margin: 8px auto 0; width: 100%; } #gzFinCuerpo .btn, #gzEsperaCuerpo .btn { margin-top: 4px; }
  #gzFinEspera, #gzEsperaNota { text-align: center; font-size: 12px; color: #5a6aa8; font-weight: 700; margin-top: 6px; }
  #gzEsperaCuerpo .equipos { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
  #gzEsperaCuerpo .equipos > div { border-radius: 12px; padding: 6px 10px; color: #fff; font-weight: 800; min-height: 90px; } #gzEsperaCuerpo .equipos small { display: block; font-size: 12px; opacity: .92; font-weight: 700; }
  .gzBadge { display: inline-block; background: linear-gradient(90deg, #3a6bff, #e8403a); color: #fff; border-radius: 6px; font-size: 10px; font-weight: 800; padding: 0 5px; margin-right: 4px; vertical-align: 1px; }
`; document.head.appendChild(st); }
const GZ_SVG_ESC = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" fill="#3a6bff" stroke="#1b2a6b" stroke-width="1.5"/><path d="M12 2v20c4.5-2 8-6 8-11V5z" fill="#e8403a" stroke="#1b2a6b" stroke-width="1.5"/></svg>';
const GZ_PUNTO = c => `<svg viewBox="0 0 16 16" width="16" height="16"><path d="M8 1l2 5h5l-4 3 2 6-5-4-5 4 2-6-4-3h5z" fill="${c}"/></svg>`;
{ const b = document.createElement('div'); b.className = 'btn'; b.id = 'bGuerra'; b.dataset.ih = 'gzBtn'; b.onclick = () => abrirGuerra();
  const ref = $('bCaceria') ? $('bCaceria').nextSibling : (($('bZombis') && $('bZombis').closest('.filaBtn')) || $('bEjemplo')); ref.parentNode.insertBefore(b, ref); }
cap('gzCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="gzTitulo"></div><div style="flex:1"></div><div class="cerrar" id="gzCerrar">X</div></div><div id="gzCuerpo"></div></div>`);
cap('gzFinCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="gzTitulo"></div><div style="flex:1"></div></div><div id="gzFinCuerpo"></div></div>`);
cap('gzEsperaCapa', `<div class="ventana"><div class="vCab"><div class="tab on" data-i="gzEspera"></div><div style="flex:1"></div></div><div id="gzEsperaCuerpo"></div></div>`);
function abrirGuerra() {
  const tips = ['gzT1', 'gzT2', 'gzT3', 'gzT4', 'gzT5'].map((k, i) => `<div>${GZ_PUNTO(['#36c95a', '#e8403a', '#ffd23a', '#3a6bff', '#b46bff'][i])}<span>${TR(k)}</span></div>`).join('');
  $('gzCuerpo').innerHTML = `<div class="cab">${GZ_SVG_ESC}<div><b>${TR('gzTitulo')}</b><small>${TR('gzSub')}</small></div></div>
    <div class="lista">${tips}</div>
    <div class="bots"><div class="btn" id="gzSoloB">${TR('gzSolo')}</div><div class="btn" id="gzAbiertaB">${TR('gzAbierta')}</div><div class="btn" id="gzAmigosB">${TR('gzAmigos')}</div>
    <div class="filaBtn"><div class="btn" id="gzUnirseB">${TR('gzUnirse')}</div><div class="btn" id="gzGueB">${TR('gzGuerreros')}</div></div></div>`;
  $('nuevo').hidden = true; abrir('gzCapa');
}
$('gzCapa').addEventListener('click', e => {
  const q = s => e.target.closest(s);
  if (q('#gzCerrar')) { cerrar('gzCapa'); $('nuevo').hidden = false; }
  else if (q('#gzSoloB')) { cerrar('gzCapa'); crearGuerra(null); }
  else if (q('#gzAbiertaB')) { cerrar('gzCapa'); crearGuerra('publica'); }
  else if (q('#gzAmigosB')) { cerrar('gzCapa'); crearGuerra('privada'); }
  else if (q('#gzUnirseB')) { cerrar('gzCapa'); $('mundos').hidden = false; abrirEnLinea(); }
  else if (q('#gzGueB')) { if (window.__dia) __dia.abrirRecords('gzCapa', 'guerra'); }
});
let gzSalaPedida = null;
function crearGuerra(sala) {
  const lista = leerLista(), id = Date.now().toString(36), n = lista.filter(m => m.tipo === 'guerra').length + 1;
  lista.unshift({ id, nombre: TR('gzMundo') + ' ' + n, num: lista.length + 1, modo: 'supervivencia', tipo: 'guerra', tam: 96, semilla: (Math.random() * 2147483647) | 0, creado: Date.now(), fecha: Date.now(), dia: 1, bloques: 0, gen: 2 });
  localStorage.setItem('bloquesMundos', JSON.stringify(lista));
  gzSalaPedida = sala; pantallaCompleta(); entrarMundo(id);
  if (sala) setTimeout(() => { try { abrirSala(sala === 'publica'); } catch (e) {} }, 400);
}
{ const e0 = entrarMundo; entrarMundo = function (id) {
    GZR = null; let esG = false; try { esG = (leerLista().find(m => m.id === id) || {}).tipo === 'guerra'; } catch (e) {}
    const hw = entrarMundo.yaHw; if (esG) entrarMundo.yaHw = true;   // el aviso de Halloween (zombis) no va en la Guerra
    const r = e0.apply(this, arguments); if (esG) entrarMundo.yaHw = hw;
    if (jugando && gzEs()) {
      REG.hora = 'dia'; REG.monstruos = 0; REG.hambre = false; pintarMision();
      if (!gzInvitado()) gzNueva(!!gzSalaPedida);
    }
    return r; }; }
{ const c0 = cargarMundoRemoto; cargarMundoRemoto = function (m) { const r = c0.apply(this, arguments); if (jugando && gzEs()) { REG.hora = 'dia'; REG.hambre = false; gzKit(); gzYaEnBase = false; } return r; }; }
{ const r0 = revisarMision; revisarMision = function () { if (gzEs()) return; return r0.apply(this, arguments); }; }
{ const p0 = pintarMision; pintarMision = function () { if (jugando && gzEs()) { $('mision').hidden = true; return; } return p0.apply(this, arguments); }; }
{ const p0 = poblarAnimales; poblarAnimales = function () { if (gzEs()) return; return p0.apply(this, arguments); }; }
{ const a0 = aparecerMonstruos; aparecerMonstruos = function () { if (gzEs()) return; return a0.apply(this, arguments); }; }
// HUD
const gzHud = document.createElement('div'); gzHud.id = 'gzHud'; gzHud.hidden = true;
gzHud.innerHTML = `<div class="fase"></div><div class="dos"><div class="eq A"><b><span></span><span class="n"></span></b><div class="barra"><i></i></div></div><div class="vs">VS</div><div class="eq R"><b><span class="n"></span><span></span></b><div class="barra"><i></i></div></div></div>`;
document.body.appendChild(gzHud);
const gzPtsEl = document.createElement('div'); gzPtsEl.id = 'gzPts'; gzPtsEl.hidden = true; document.body.appendChild(gzPtsEl);
const gzReapEl = document.createElement('div'); gzReapEl.id = 'gzReap'; gzReapEl.hidden = true; document.body.appendChild(gzReapEl);
const mmssGz = s => Math.floor(Math.max(0, s) / 60) + ':' + String(Math.floor(Math.max(0, s) % 60)).padStart(2, '0');
function gzPintarHud() {
  const G = gzEstado(), on = jugando && gzEs() && G && G.on && !$('hud').hidden;
  gzHud.hidden = gzPtsEl.hidden = !on; if (!on) return;
  const f = gzHud.querySelector('.fase');
  f.textContent = G.fase === 'espera' ? TR('gzEspera') : G.fase === 'constr' ? TR('gzConstruccion') + ' ' + mmssGz(G.t) : G.fase === 'batalla' ? TR('gzBatalla') + ' ' + mmssGz(G.t) : (G.gana ? TR('gzGana', { e: gzNomEq(G.gana).toUpperCase() }) : TR('gzEmpate'));
  f.classList.toggle('b', G.fase === 'batalla');
  for (const eq of ['A', 'R']) { const el = gzHud.querySelector('.eq.' + eq), pct = Math.max(0, Math.round(G.hp[eq] / G.max * 100));
    el.querySelector('i').style.width = pct + '%'; el.querySelector('span:not(.n)').textContent = TR(eq === 'A' ? 'gzEqAzul' : 'gzEqRojo'); el.querySelector('.n').textContent = TR('gzVida', { n: pct });
    el.classList.toggle('ataque', (G.ataque && G.ataque[eq] > 0) || gzUltimoAtaque[eq] > 0); }
  const yo = gzYo(), mis = (G.pts && G.pts[yo]) || 0, eq = gzMiEquipo();
  gzPtsEl.innerHTML = TR('gzPts', { n: Math.round(mis) }) + `<small><span class="e" style="background:${GZ_COL[eq]}">${TR('gzTuEq', { e: gzNomEq(eq) })}</span></small>` + (gzEnLinea() ? `<small>${TR('gzSala', { c: gzEsc(MP.sala) })}</small>` : '');
}
// sala de espera (solo en línea): el dueño ve "Empezar"; cualquiera puede cambiar de equipo
function gzPintarEspera() {
  const G = gzEstado(); if (!G || G.fase !== 'espera' || !jugando || !gzEs()) { cerrar('gzEsperaCapa'); return; }
  const lado = eq => Object.entries(G.eq).filter(([, v]) => v === eq).map(([n]) => `<div>${gzEsc(n)}${n === gzYo() ? ' ★' : ''}</div>`).join('');
  const bots = eq => Math.max(0, GZ.porEquipo - Object.values(G.eq).filter(v => v === eq).length);
  $('gzEsperaCuerpo').innerHTML = `<div style="font-size:13px;font-weight:700">${TR('gzEsperaTx')}${gzEnLinea() ? ' · <b>' + TR('gzSala', { c: gzEsc(MP.sala) }) + '</b>' : ''}</div>
    <div class="equipos"><div style="background:linear-gradient(#3a6bff,#2a4ab8)">${TR('gzEqAzul')}${lado('A')}<small>+${bots('A')} bots</small></div><div style="background:linear-gradient(#e8403a,#a82a24)">${TR('gzEqRojo')}${lado('R')}<small>+${bots('R')} bots</small></div></div>
    <div class="filaBtn"><div class="btn" id="gzCambiarB">${TR('gzCambiar')}</div>${gzHost() ? `<div class="btn" id="gzEmpezarB" style="background:linear-gradient(#36c95a,#1f8a40)">${TR('gzEmpezar')}</div>` : ''}</div>
    ${gzHost() ? '' : `<div id="gzEsperaNota">${TR('gzEsperaDueno')}</div>`}`;
  if ($('gzEsperaCapa').hidden) abrir('gzEsperaCapa');
}
$('gzEsperaCapa').addEventListener('click', e => {
  const q = s => e.target.closest(s);
  if (q('#gzEmpezarB') && gzHost()) { cerrar('gzEsperaCapa'); gzEmpezarConstruccion(); gzEnvioT = 0; }
  else if (q('#gzCambiarB')) { if (gzHost()) { const G = mapa.guerra; G.eq[gzYo()] = gzOtro(G.eq[gzYo()] || 'A'); gzLlevarABase(); gzKit(); gzPintarEspera(); gzEnvioT = 0; } else mpEnviar({ t: 'g', k: 'gzeq' }); }
});
// pantalla final
function gzRanking(G) { return Object.entries(G.pts || {}).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]); }
let gzRecordMandado = '';
function gzMostrarFin(G) {
  if (!G || !G.fin) return;
  const yo = gzYo(), rk = gzRanking(G), mis = Math.round((G.pts && G.pts[yo]) || 0), eq = gzMiEquipo();
  const titulo = !G.gana ? TR('gzEmpate') : (G.gana === eq ? TR('gzGanaste') : TR('gzPerdiste')) + ' · ' + TR('gzGana', { e: gzNomEq(G.gana).toUpperCase() });
  const COP = ['#ffd23a', '#d8dcef', '#e0965a'];
  $('gzFinCuerpo').innerHTML = `<div class="gana" style="background:${G.gana ? GZ_COL[G.gana] : '#7c86ad'}">${titulo}</div>
    ${rk.map(([n, v], k) => `<div class="gzRk${n === yo ? ' yo' : ''}"><div class="pos">${k < 3 && typeof SVG_COPA === 'function' ? SVG_COPA(COP[k]) : k + 1}</div><span class="pt" style="background:${GZ_COL[(G.eq || {})[n]] || '#7c86ad'}"></span><div class="nom">${gzEsc(n)}</div><div class="v">${Math.round(v)}</div></div>`).join('')}
    <div class="mios">${TR('gzTusPts', { n: mis })}</div>
    <div class="filaBtn">${gzHost() ? `<div class="btn" id="gzOtraB" style="background:linear-gradient(#3a6bff,#e8403a)">${TR('gzOtra')}</div>` : ''}<div class="btn" id="gzRecB" style="background:linear-gradient(#ffd23a,#c8841a);color:#1b2a6b;text-shadow:none">${TR('gzGuerreros')}</div><div class="btn" id="gzSalirB">${TR('gzSalir')}</div></div>
    ${gzHost() ? '' : `<div id="gzFinEspera">${TR('gzEsperaOtra')}</div>`}`;
  cerrar('gzEsperaCapa'); aplicarIdioma(); pausado = true; try { soltarTodo(); } catch (e) {} abrir('gzFinCapa');
  const clave = (gzInvitado() ? 'v' : 'h') + (G.n || 0) + ':' + (G.t1 || 0);
  if (mis > 0 && gzRecordMandado !== clave && window.__dia) { gzRecordMandado = clave; try { __dia.mandarRecord('guerra', mis); } catch (e) {} }
}
$('gzFinCapa').addEventListener('click', e => {
  const q = s => e.target.closest(s);
  if (q('#gzOtraB')) { cerrar('gzFinCapa'); pausado = false; gzNueva(gzEnLinea()); }
  else if (q('#gzRecB')) { if (window.__dia) __dia.abrirRecords('gzFinCapa', 'guerra'); }
  else if (q('#gzSalirB')) { cerrar('gzFinCapa'); pausado = false; guardar(); salirAlMenu(); }
});

// ═════════ EN LÍNEA ═════════
let gzEnvioT = 0, gzAvisos = [], gzYaEnBase = false;
function gzMandar() {
  if (!gzEnLinea() || !MP.dueno || !MP.jug.size) { gzAvisos = []; return; }
  const G = mapa.guerra; if (!G) return;
  const gz = { on: G.on, n: G.n, fase: G.fase, t: Math.round(G.t), hp: G.hp, max: G.max, eq: G.eq, pts: G.pts, gana: G.gana, fin: G.fin, t1: G.t1 || 0, ataque: { A: gzUltimoAtaque.A, R: gzUltimoAtaque.R } };
  if (gzAvisos.length) gz.av = gzAvisos.slice(0, 4);
  mpEnviar({ t: 'm', gz }); gzAvisos = [];
}
function gzDelDueno(gz) {
  if (!jugando || !gzEs()) return;
  const antes = GZR; GZR = gz;
  const nueva = !antes || antes.n !== gz.n;
  if (!gzYaEnBase || nueva) { gzYaEnBase = true; gzLlevarABase(); if (nueva && antes) gzKit(); }
  for (const k of gz.av || []) {
    if (k === '$base') { gzLlevarABase(); continue; }
    if (k.startsWith('$cayo:')) { aviso(TR('gzCorRoto', { e: gzNomEq(k.slice(6)).toUpperCase() }), 2600); continue; }
    aviso(TR(k), 2600);
  }
  if (antes && antes.eq && antes.eq[gzYo()] !== gz.eq[gzYo()]) { gzLlevarABase(); gzKit(); }
  if (gz.fase === 'espera') gzPintarEspera(); else cerrar('gzEsperaCapa');
  if (gz.fin && (!antes || !antes.fin || antes.n !== gz.n)) gzMostrarFin(gz);
  if (!gz.fin && antes && antes.fin) { cerrar('gzFinCapa'); pausado = false; gzKit(); }
}
{ const r0 = recibir; recibir = function (m) {
    if (m && m.t === 'g' && m.k === 'gzeq') { if (MP.dueno && gzEs()) { const j = MP.jug.get(m.id), G = mapa.guerra; if (j && G && G.fase === 'espera') { G.eq[j.nombre] = gzOtro(G.eq[j.nombre] || 'A'); gzPintarEspera(); gzEnvioT = 0; } } return; }
    if (m && m.t === 'g' && m.k === 'gzpvp2') { if (MP.dueno && gzEs()) gzPvpDelInvitado(m); return; }
    if (m && m.t === 'm' && m.gz) { if (MP.invitado) gzDelDueno(m.gz); return; }
    if (m && m.t === 'records' && m.tabla === 'guerra' && window.__dia) {
      const R = __dia.REC; R.datos.guerra = { siempre: m.siempre || [], semana: m.semana || [], yoS: m.yoS, yoW: m.yoW };
      if (R.esperaNuevo === 'guerra' && m.nuevo && m.yoW) aviso(TR('recNuevo', { p: m.yoW[0] }), 2600);
      R.esperaNuevo = null; if (!$('recCapa').hidden) pintarRecords(); return; }
    if (m && m.t === 'creada' && gzEs() && gzSalaPedida) { const r = r0(m); aviso(TR('gzSalaLista', { c: gzEsc(m.codigo) }), 6000); gzSalaPedida = null; gzPintarEspera(); return r; }
    if (m && m.t === 'cerrada' && MP.invitado && gzEs()) { const r = r0(m); setTimeout(() => aviso(TR('gzSeFue'), 3500), 50); cerrar('gzFinCapa'); cerrar('gzEsperaCapa'); gzReapEl.hidden = true; return r; }
    if (m && m.t === 'entra' && MP.dueno && gzEs()) { const r = r0(m); const G = mapa.guerra; if (G) { gzBalancear(G); gzQuitarUnBot(G.eq[m.nombre]); } gzEnvioT = 0; return r; }
    if (m && m.t === 'sale' && MP.dueno && gzEs()) { const j = MP.jug.get(m.id), G = mapa.guerra, eq = j && G && G.eq[j.nombre]; const r = r0(m);
      if (G) { gzBalancear(G); if (eq && !G.fin && G.fase !== 'espera' && gzCorDe(eq)) gzCrearBot(eq, 'a', 1 + (gzBots().length % 3)); } gzEnvioT = 0; return r; }
    return r0(m); }; }
// el invitado le pega a otra persona: el dueño reparte el daño
function gzPvpDelInvitado(m) {
  const de = MP.jug.get(m.id), G = mapa.guerra; if (!de || !G || G.fase !== 'batalla' || G.fin) return;
  const n = Math.min(14, Math.max(1, +m.d || 2)), eqDe = G.eq[de.nombre];
  if (+m.a === +MP.id) {   // al dueño
    if (G.eq[gzYo()] === eqDe || vida <= 0) return;
    gzUltG[gzYo()] = de.nombre; lastimar(n, +m.dx || 0, +m.dz || 0);
    gzPuntos(de.nombre, n * (gzCercaDeMiCorazon(eqDe, J.x, J.z) ? 1.5 : 1)); return;
  }
  const t = MP.jug.get(+m.a); if (!t || G.eq[t.nombre] === eqDe) return;
  gzUltG[t.nombre] = de.nombre; mpEnviar({ t: 'uno', para: t.id, tipo: 'dano', n, kx: +m.dx || 0, kz: +m.dz || 0, salto: true });
  gzPuntos(de.nombre, n * (t.obj && gzCercaDeMiCorazon(eqDe, t.obj.x, t.obj.z) ? 1.5 : 1));
}
// si entra alguien, deja su lugar un bot de su equipo (si hay)
function gzQuitarUnBot(eq) { if (!eq) return; const l = gzBots().filter(b => ex(b).eq === eq).sort((a, b) => (ex(b).rol === 'a') - (ex(a).rol === 'a')); const b = l.find(x => ex(x).rol === 'a') || l[0]; if (b) quitarAnimal(b); }
// lista de salas y lista de mundos: marca las de la Guerra
{ const p0 = pintarLista; pintarLista = function (salas) { const r = p0.apply(this, arguments);
    try { const filas = document.querySelectorAll('#mpLista .mpSala'); (salas || []).forEach((s, k) => { if (s.tipo === 'guerra' && filas[k]) { const n = filas[k].querySelector('.nom'); if (n && !n.querySelector('.gzBadge')) n.insertAdjacentHTML('afterbegin', `<span class="gzBadge">${TR('gzBadge')}</span>`); } }); } catch (e) {}
    return r; }; }
{ const p0 = pintarMundos; pintarMundos = function () { const r = p0.apply(this, arguments);
    try { const l = leerLista(); for (const b of document.querySelectorAll('#listaMundos [data-entrar]')) { const m = l.find(x => x.id === b.dataset.entrar); if (m && m.tipo === 'guerra') { const f = b.closest('.mundoFila'), sm = f && f.querySelector('.info small'); if (sm && !sm.querySelector('.gzBadge')) sm.insertAdjacentHTML('afterbegin', `<span class="gzBadge">${TR('gzBadge')}</span>`); } } } catch (e) {}
    return r; }; }
// récords: pestaña "Guerreros"
{ const sp = $('recTabs').querySelector('[data-tb="caceria"]') || $('recTabs').querySelector('[data-tb="oleadas"]'); if (sp) { const b = document.createElement('div'); b.className = 'mb'; b.dataset.tb = 'guerra'; b.dataset.i = 'recGuerra'; sp.parentNode.insertBefore(b, sp.nextSibling); aplicarIdioma(); } }
{ const p0 = pintarRecords; pintarRecords = function () {
    if (__dia.REC.tabla !== 'guerra') return p0.apply(this, arguments);
    const R = __dia.REC;
    for (const d of document.querySelectorAll('#recTabs [data-tb]')) d.classList.toggle('on', d.dataset.tb === R.tabla);
    for (const d of document.querySelectorAll('#recTabs [data-vs]')) d.classList.toggle('on', d.dataset.vs === R.vista);
    const r = R.datos.guerra; if (!r) { $('recLista').innerHTML = `<div class="recF">${TR('recCargando')}</div>`; $('recYo').textContent = ''; return; }
    const l = R.vista === 'semana' ? r.semana : r.siempre, yo = R.vista === 'semana' ? r.yoW : r.yoS, val = v => TR('recPts', { n: v });
    $('recLista').innerHTML = l.length ? l.map(([n, v], k) => `<div class="recF${yo && yo[0] === k + 1 ? ' yo' : ''}"><div class="pos">${k < 3 ? SVG_COPA(COPAS[k]) : k + 1}</div><div class="nom">${gzEsc(n)}</div><div class="val">${val(+v)}</div></div>`).join('') : `<div class="recF">${TR('recNadie')}</div>`;
    $('recYo').textContent = yo ? TR('recTu', { p: yo[0], v: val(yo[1]) }) : TR('recSinTu');
  }; }
// nombres de los invitados con el color de su equipo
{ const r0 = rearmarAvatar; rearmarAvatar = function (j) { const r = r0.apply(this, arguments);
    try { const eq = gzEs() && gzEquipoDe(j.nombre); if (eq && j.g && j.cartelN && typeof cartel === 'function' && !(j.skin && j.skin.vip)) { const n = cartel(j.nombre, '#ffffff', eq === 'A' ? 'rgba(42,74,184,.85)' : 'rgba(168,42,36,.85)'); n.position.copy(j.cartelN.position); j.g.remove(j.cartelN); j.g.add(n); j.cartelN = n; j.gzEq = eq; } } catch (e) {}
    return r; }; }

// ═════════ ESTELA PRO (solo de adorno) ═════════
function gzEstela(x, y, z, n = 2) { if (typeof esPro === 'function' && esPro()) polvo(x, y, z, Math.random() < .5 ? '#ffd23a' : GZ_COL[gzMiEquipo()], n); }

// ═════════ CADA CUADRO ═════════
let gzHudT = 0, gzOroT = 0, gzUlt = null;
function guerraFrame(dt) {
  if (!jugando || !gzEs()) { gzHud.hidden = gzPtsEl.hidden = true; gzReapEl.hidden = true; return; }
  gzHudT -= dt; if (gzHudT <= 0) { gzHudT = .2; gzPintarHud(); try { for (const j of MP.jug.values()) if (j.g && gzEquipoDe(j.nombre) && j.gzEq !== gzEquipoDe(j.nombre)) rearmarAvatar(j); } catch (e) {} }
  // el Corazón gira y flota (también el que ve el invitado)
  const t = performance.now() / 1000;
  const animar = g => { if (g && g._cris) { g._cris.rotation.y = t * 1.2; g._cris.position.y = 1.75 + Math.sin(t * 2) * .08; g._orb.rotation.y = -t * 1.8; } };
  for (const a of gzCorazones()) animar(a); try { for (const b of MP.bichos.values()) if (b.tipo && b.tipo.startsWith('gzCor')) animar(b.g); } catch (e) {}
  // morir y volver
  if (!gzReapEl.hidden) { gzReapT -= dt; gzReapEl.textContent = TR('gzReaparece', { n: Math.max(1, Math.ceil(gzReapT)) }); if (gzReapT <= 0) gzReaparecer(); }
  // estela de los Pro
  if (typeof esPro === 'function' && esPro()) { gzOroT -= dt; const mov = gzUlt ? Math.hypot(J.x - gzUlt.x, J.z - gzUlt.z) : 0; gzUlt = { x: J.x, z: J.z }; if (gzOroT <= 0 && mov > .02) { gzOroT = .12; gzEstela(J.x, J.y + .25, J.z, 2); } }
  for (const eq of ['A', 'R']) gzUltimoAtaque[eq] = Math.max(0, gzUltimoAtaque[eq] - dt);
  if (gzInvitado()) return;
  const G = mapa.guerra; if (!G || !G.on) return;
  // en la Guerra no hay otros animales ni monstruos (ni perros o gatos sueltos que aparecen solos)
  for (const a of animales) if (!TIPOS[a.userData.animal] || !(TIPOS[a.userData.animal].gzBot || TIPOS[a.userData.animal].gzCor)) { quitarAnimal(a); break; }
  if (monstruos.length) quitarMonstruo(monstruos[0], false);
  if (G.fase === 'espera') { if ($('gzEsperaCapa').hidden && $('gzFinCapa').hidden) gzPintarEspera(); }
  else if (!G.fin && !(pausado && !gzEnLinea())) {
    G.t -= dt;
    if (G.fase === 'constr' && G.t <= 0) { G.fase = 'batalla'; G.t = GZ.batalla; aviso(TR('gzFaseB'), 3000); gzAvisos.push('gzFaseB'); sonar('mision', .7) || son(880, .25, 'square', .1); }
    else if (G.fase === 'batalla' && G.t <= 0) { const a = G.hp.A / G.max, r = G.hp.R / G.max; gzTerminar(Math.abs(a - r) < .001 ? '' : a > r ? 'A' : 'R', null); }
    // aviso cuando atacan mi Corazón
    const mio = gzMiEquipo(); if (gzUltimoAtaque[mio] > 2.3) { gzAvisoAtaqueT -= dt; if (gzAvisoAtaqueT <= 0) { gzAvisoAtaqueT = 6; aviso(TR('gzCorAtaque'), 1500); son(440, .15, 'square', .08); } }
    // los bots derribados vuelven a los 8 segundos (si su Corazón sigue en pie)
    for (const r of gzRevivirBots.slice()) { r.t -= dt; if (r.t <= 0) { gzRevivirBots.splice(gzRevivirBots.indexOf(r), 1); if (gzCorDe(r.eq)) gzCrearBot(r.eq, r.rol, r.k); } }
    // que los Corazones no desaparezcan
    for (const eq of ['A', 'R']) if (!gzCorDe(eq) && G.hp[eq] > 0) { const b = GZ_BASE[eq]; crearAnimal('gzCor' + eq, b.x + .5, GZ_ALTO + 1.02, b.z + .5); }
  }
  gzEnvioT -= dt; if (gzEnvioT <= 0) { gzEnvioT = .5; gzMandar(); }
}
let gzAvisoAtaqueT = 0;
{ let ult = performance.now(); const tick = t => { requestAnimationFrame(tick); const dt = Math.min(.1, (t - ult) / 1000); ult = t; try { guerraFrame(dt); } catch (e) { console.error(e); } }; requestAnimationFrame(tick); }
{ const s0 = salirAlMenu; salirAlMenu = function () { gzHud.hidden = gzPtsEl.hidden = gzReapEl.hidden = true; cerrar('gzFinCapa'); cerrar('gzEsperaCapa'); GZR = null; gzRevivirBots = []; return s0.apply(this, arguments); }; }
aplicarIdioma();
window.__gz = { GZ, nueva: gzNueva, estado: gzEstado, danar: gzDanar, terminar: gzTerminar, corDe: gzCorDe, bots: gzBots, miEquipo: gzMiEquipo, empezarConstruccion: gzEmpezarConstruccion, abrirGuerra, crearGuerra, base: GZ_BASE };

// ═════════ VOLAR SOLO DURANTE LA CONSTRUCCIÓN ═════════
// En la fase de construcción se puede volar para armar las defensas; al empezar la batalla
// se deja de volar y el personaje baja suave al suelo (sin daño por caída).
Object.assign(TX.es, { gzVolarAyuda: 'PUEDES VOLAR MIENTRAS CONSTRUYES<small>toca el botón de volar</small>', gzSinVolar: '¡A COMBATIR!<small>en la batalla ya no se puede volar</small>' });
Object.assign(TX.en, { gzVolarAyuda: 'YOU CAN FLY WHILE BUILDING<small>tap the fly button</small>', gzSinVolar: 'TO BATTLE!<small>no more flying during the battle</small>' });
Object.assign(TX.pt, { gzVolarAyuda: 'VOCÊ PODE VOAR ENQUANTO CONSTRÓI<small>toque no botão de voar</small>', gzSinVolar: 'À BATALHA!<small>na batalha não dá mais para voar</small>' });
if (TX.tr) Object.assign(TX.tr, { gzVolarAyuda: 'İNŞA EDERKEN UÇABİLİRSİN<small>uçma düğmesine dokun</small>', gzSinVolar: 'SAVAŞA!<small>savaşta artık uçamazsın</small>' });
if (TX.id) Object.assign(TX.id, { gzVolarAyuda: 'KAMU BISA TERBANG SAAT MEMBANGUN<small>ketuk tombol terbang</small>', gzSinVolar: 'BERTEMPUR!<small>saat pertempuran tidak bisa terbang</small>' });
if (TX.ar) Object.assign(TX.ar, { gzVolarAyuda: 'يمكنك الطيران أثناء البناء<small>اضغط زر الطيران</small>', gzSinVolar: 'إلى المعركة!<small>لا طيران أثناء المعركة</small>' });
const gzPuedeVolar = () => { try { const G = gzEstado(); return gzEs() && jugando && G && G.fase === 'constr' && !G.fin; } catch (e) { return false; } };
{ const p0 = pintarVolar; pintarVolar = function () { const r = p0.apply(this, arguments); if (gzEs()) { $('bVolar').hidden = !gzPuedeVolar(); $('bBajar').hidden = !volando; } return r; }; }
let gzFaseVista = null;
setInterval(() => {
  if (!gzEs() || !jugando) { gzFaseVista = null; return; }
  const G = gzEstado(); const f = G ? G.fase : null;
  if (f !== gzFaseVista) {
    const antes = gzFaseVista; gzFaseVista = f;
    if (f === 'constr') { pintarVolar(); aviso(TR('gzVolarAyuda'), 2200); }
    else if (antes === 'constr') {
      if (volando) {   // baja al suelo sin golpe
        volando = false; J.vy = 0;
        try { const y = sueloCerca(J.x, J.z); if (J.y > y) J.y = y; } catch (e) {}
      }
      pintarVolar(); if (f === 'batalla') aviso(TR('gzSinVolar'), 2000);
    }
  }
  if (volando && !gzPuedeVolar() && !window.espectador) { volando = false; J.vy = 0; pintarVolar(); }
}, 250);
