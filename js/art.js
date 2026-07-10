/* =========================================================
 * art.js — 原創手繪 SVG 插圖庫
 * 風格：仿療癒系角色（圓滾滾、豆豆眼、腮紅、奶油色、細棕描邊）
 * 用法：Art.html(item) → 有插圖回傳 SVG，沒有就退回 emoji
 * ========================================================= */

const Art = (() => {
  /* --- 調色盤 --- */
  const OL = '#8f7a6b';        // 描邊棕
  const CREAM = '#fdf5e8', WHITE = '#fffdf8', PINK = '#f6c6ce', BLUSH = '#f2a7b8';
  const YEL = '#f7da8f', BROWN = '#caa273', GREEN = '#b5d29a', LGREEN = '#cfe3b4';
  const BLUE = '#bfe0ef', GRAY = '#e3ddd6', NIGHT = '#5b5f85', ORANGE = '#f0925a';

  const ST = `stroke="${OL}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"`;
  const ST2 = `stroke="${OL}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;
  const wrap = inner => `<svg class="art" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

  /* --- 共用零件 --- */
  // 臉：豆豆眼 + 嘴 + 腮紅
  function face({ x = 50, y = 52, s = 1, dx = 9, mouth = 'smile', blush = true, closed = false, eyeFill = OL } = {}) {
    const eyes = closed
      ? `<path d="M${-dx - 3} 0 q3 3.2 6 0" ${ST} fill="none"/><path d="M${dx - 3} 0 q3 3.2 6 0" ${ST} fill="none"/>`
      : `<circle cx="${-dx}" cy="0" r="2.3" fill="${eyeFill}"/><circle cx="${dx}" cy="0" r="2.3" fill="${eyeFill}"/>`;
    const mouths = {
      smile: `<path d="M-3 5 q3 3 6 0" ${ST} fill="none"/>`,
      cat: `<path d="M-5 4 q2.5 3.5 5 0 q2.5 3.5 5 0" ${ST} fill="none"/>`,
      o: `<ellipse cx="0" cy="6" rx="2.6" ry="3.4" fill="${OL}"/>`,
      sad: `<path d="M-3 7 q3 -3 6 0" ${ST} fill="none"/>`,
      wavy: `<path d="M-5 6 q2 -2.5 4.5 0 q2 2.5 4.5 0" ${ST} fill="none"/>`,
      none: '',
    };
    const bl = blush
      ? `<ellipse cx="${-dx - 8.5}" cy="4.5" rx="3.6" ry="2.1" fill="${BLUSH}" opacity="0.55"/><ellipse cx="${dx + 8.5}" cy="4.5" rx="3.6" ry="2.1" fill="${BLUSH}" opacity="0.55"/>`
      : '';
    return `<g transform="translate(${x} ${y}) scale(${s})">${eyes}${mouths[mouth] || ''}${bl}</g>`;
  }

  // 圓滾滾身體
  const blob = (fill, { x = 50, y = 56, w = 52, h = 46, r = 21 } = {}) =>
    `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${ST}/>`;

  // 四角閃光
  const spark = (x, y, s = 1, fill = YEL) =>
    `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6 Q1.3 -1.3 6 0 Q1.3 1.3 0 6 Q-1.3 1.3 -6 0 Q-1.3 -1.3 0 -6 Z" fill="${fill}" ${ST2}/>`;

  // 愛心
  const heart = (x, y, s = 1, fill = BLUSH) =>
    `<path transform="translate(${x} ${y}) scale(${s})" d="M0 4.5 C-6 -1 -4.5 -7.5 0 -4 C4.5 -7.5 6 -1 0 4.5 Z" fill="${fill}" ${ST2}/>`;

  // 小幽靈（貓耳＋波浪襬）— 幽幽家族風
  function ghost({ x = 50, y = 50, s = 1, fill = WHITE, mouth = 'cat', closed = false } = {}) {
    return `<g transform="translate(${x} ${y}) scale(${s}) translate(-50 -50)">` +
      `<path d="M33 22 L27 7 L43 14 Z" fill="${fill}" ${ST}/>` +
      `<path d="M67 22 L73 7 L57 14 Z" fill="${fill}" ${ST}/>` +
      `<path d="M50 12 C32 12 25 28 25 45 L25 70 Q30 79 35 70 Q40 79 45 70 Q50 79 55 70 Q60 79 65 70 Q70 79 75 70 L75 45 C75 28 68 12 50 12 Z" fill="${fill}" ${ST}/>` +
      face({ x: 50, y: 44, mouth, closed }) +
      `</g>`;
  }

  /* --- 各插圖 --- */
  const A = {};

  /* ===== 角落生物的世界 ===== */
  A.shirokuma = wrap(
    `<circle cx="33" cy="32" r="6.5" fill="${WHITE}" ${ST}/><circle cx="67" cy="32" r="6.5" fill="${WHITE}" ${ST}/>` +
    blob(WHITE, { y: 55, w: 52, h: 46 }) +
    `<ellipse cx="50" cy="60" rx="8" ry="6" fill="${CREAM}"/>` +
    face({ y: 52, mouth: 'cat' })
  );

  A.neko = wrap(
    `<path d="M31 38 L33 21 L45 30 Z" fill="${CREAM}" ${ST}/><path d="M69 38 L67 21 L55 30 Z" fill="${CREAM}" ${ST}/>` +
    `<path d="M67 23 L66 29 L61 26 Z" fill="${BROWN}"/>` +
    blob(CREAM, { y: 56, w: 50, h: 44 }) +
    `<path d="M75 64 q9 3 5 11" fill="none" ${ST}/>` +
    face({ y: 54, mouth: 'cat' })
  );

  A.koneko = wrap(
    `<path d="M37 44 L39 30 L48 38 Z" fill="${WHITE}" ${ST}/><path d="M63 44 L61 30 L52 38 Z" fill="${WHITE}" ${ST}/>` +
    blob(WHITE, { y: 60, w: 38, h: 34, r: 16 }) +
    face({ y: 58, s: 0.8, mouth: 'cat' }) +
    heart(72, 34, 0.8)
  );

  A.tonkatsu = wrap(
    `<ellipse cx="50" cy="54" rx="29" ry="23" fill="#e2a862" ${ST}/>` +
    `<ellipse cx="50" cy="54" rx="21" ry="16" fill="#f2cf9c"/>` +
    `<circle cx="30" cy="44" r="1.4" fill="${OL}"/><circle cx="68" cy="42" r="1.4" fill="${OL}"/><circle cx="34" cy="66" r="1.4" fill="${OL}"/><circle cx="66" cy="66" r="1.4" fill="${OL}"/>` +
    face({ y: 53, mouth: 'smile' })
  );

  A.tokage = wrap(
    `<path d="M72 62 q13 -1 9 -13" fill="none" ${ST}/>` +
    `<path d="M40 40 q4 -9 9 0 M52 38 q4 -9 9 0" fill="#7db8ac" ${ST2}/>` +
    blob('#9fd0c8', { y: 57, w: 48, h: 40 }) +
    `<ellipse cx="50" cy="70" rx="13" ry="7" fill="${CREAM}"/>` +
    face({ y: 54, mouth: 'smile' })
  );

  A.pengin = wrap(
    blob('#bcd98f', { y: 55, w: 46, h: 48 }) +
    `<ellipse cx="50" cy="65" rx="13" ry="11" fill="${CREAM}"/>` +
    `<path d="M46.5 53 L53.5 53 L50 58 Z" fill="#f2b04a" ${ST2}/>` +
    face({ y: 47, dx: 10, mouth: 'none' })
  );

  A.ebifurai = wrap(
    `<path d="M74 36 L88 24 L86 42 Z" fill="#f08a5d" ${ST}/>` +
    `<path d="M30 62 Q26 36 50 30 Q72 25 74 42 Q75 57 58 66 Q42 74 30 62 Z" fill="#eec07a" ${ST}/>` +
    `<circle cx="38" cy="44" r="1.4" fill="${OL}"/><circle cx="56" cy="38" r="1.4" fill="${OL}"/><circle cx="44" cy="62" r="1.4" fill="${OL}"/>` +
    face({ x: 46, y: 52, mouth: 'smile' })
  );

  A.zassou = wrap(
    `<path d="M50 76 L50 56" fill="none" stroke="#7ea76a" stroke-width="3.5" stroke-linecap="round"/>` +
    `<path d="M50 62 Q34 58 32 44 Q48 46 50 60 Z" fill="${GREEN}" ${ST}/>` +
    `<path d="M50 62 Q66 58 68 44 Q52 46 50 60 Z" fill="${GREEN}" ${ST}/>` +
    `<circle cx="50" cy="48" r="10" fill="${LGREEN}" ${ST}/>` +
    face({ y: 48, s: 0.62, mouth: 'smile' })
  );

  A.hokori = wrap(
    `<circle cx="50" cy="55" r="21" fill="${GRAY}" ${ST}/>` +
    `<path d="M30 44 l-6 -4 M34 68 l-6 5 M66 68 l6 5 M70 44 l6 -4 M50 33 l0 -7" fill="none" ${ST2}/>` +
    face({ y: 54, s: 0.9, mouth: 'smile' })
  );

  A.tapioka = wrap(
    `<path d="M37 36 L63 36 L60 76 L40 76 Z" fill="#f6ead9" ${ST}/>` +
    `<path d="M36 36 Q50 26 64 36" fill="#e8c9a8" ${ST}/>` +
    `<path d="M54 12 L59 13 L56 34 L51 33 Z" fill="#d89a9a" ${ST2}/>` +
    `<circle cx="44" cy="70" r="3.4" fill="#6d5b52"/><circle cx="51" cy="71" r="3.4" fill="#6d5b52"/><circle cx="57" cy="69" r="3.4" fill="#6d5b52"/><circle cx="47" cy="63" r="3.4" fill="#6d5b52"/><circle cx="55" cy="62" r="3.4" fill="#6d5b52"/>` +
    face({ y: 48, s: 0.72, mouth: 'smile' })
  );

  A.sumikko = wrap(
    `<rect x="16" y="16" width="9" height="62" fill="#e5dbd0" ${ST}/>` +
    `<rect x="16" y="69" width="66" height="9" fill="#e5dbd0" ${ST}/>` +
    blob(CREAM, { x: 40, y: 57, w: 26, h: 24, r: 12 }) +
    face({ x: 40, y: 56, s: 0.62, mouth: 'smile' }) +
    spark(68, 38, 0.9)
  );

  A.kawaii = wrap(
    blob(PINK, { y: 57, w: 48, h: 42 }) +
    face({ y: 55, mouth: 'cat' }) +
    heart(26, 30, 1) + heart(74, 26, 1.3) + heart(80, 48, 0.7)
  );

  A.tomodachi = wrap(
    blob(CREAM, { x: 34, y: 60, w: 30, h: 28, r: 14 }) +
    blob(PINK, { x: 66, y: 60, w: 30, h: 28, r: 14 }) +
    face({ x: 34, y: 58, s: 0.62, mouth: 'smile' }) +
    face({ x: 66, y: 58, s: 0.62, mouth: 'cat' }) +
    heart(50, 32, 1.1)
  );

  A.onigiri = wrap(
    `<path d="M50 24 Q55 24 58 31 L71 55 Q75 63 67 65 L33 65 Q25 63 29 55 L42 31 Q45 24 50 24 Z" fill="${WHITE}" ${ST}/>` +
    `<rect x="41" y="52" width="18" height="14" rx="3" fill="#4c4a45" ${ST2}/>` +
    face({ y: 43, s: 0.78, mouth: 'smile' })
  );

  A.ocha = wrap(
    `<rect x="34" y="40" width="32" height="31" rx="7" fill="#e3ecd9" ${ST}/>` +
    `<ellipse cx="50" cy="42" rx="14" ry="4.5" fill="#a9c979" ${ST2}/>` +
    `<path d="M42 30 q-3 -5 0 -9 M52 32 q-3 -5 0 -9" fill="none" ${ST2} opacity="0.7"/>` +
    face({ y: 58, s: 0.75, mouth: 'smile' })
  );

  /* ===== 幽靈的世界 ===== */
  A.obake = wrap(ghost({}));

  A.kowai = wrap(
    blob(CREAM, { y: 57, w: 48, h: 42 }) +
    face({ y: 55, mouth: 'wavy' }) +
    `<path d="M76 34 q4 6 0 9 q-4 -3 0 -9" fill="${BLUE}" ${ST2}/>` +
    `<path d="M20 48 q-4 3 0 7 M20 60 q-4 3 0 7" fill="none" ${ST2}/>`
  );

  A.yoru = wrap(
    `<rect x="18" y="22" width="64" height="58" rx="14" fill="${NIGHT}" ${ST}/>` +
    `<path d="M62 34 A15 15 0 1 0 62 64 A20 20 0 0 1 62 34 Z" fill="${YEL}" ${ST2}/>` +
    spark(34, 38, 0.8, '#fff3cf') + spark(40, 60, 0.6, '#fff3cf') + `<circle cx="72" cy="70" r="1.6" fill="#fff3cf"/>`
  );

  A.makkura = wrap(
    `<rect x="18" y="22" width="64" height="58" rx="14" fill="#454965" ${ST}/>` +
    `<circle cx="42" cy="50" r="3" fill="#fff"/><circle cx="58" cy="50" r="3" fill="#fff"/>` +
    `<path d="M45 60 q2.5 -3 5 0 q2.5 3 5 0" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none"/>`
  );

  A.otsukisama = wrap(
    `<circle cx="50" cy="50" r="24" fill="#f9df9a" ${ST}/>` +
    face({ y: 50, mouth: 'smile', closed: true }) +
    `<path d="M56 72 Q60 66 66 70 Q70 64 78 68 Q84 70 80 76 L58 76 Q54 76 56 72 Z" fill="${WHITE}" ${ST2}/>` +
    spark(24, 28, 0.8) + spark(78, 30, 0.6)
  );

  A.hoshizora = wrap(
    `<rect x="18" y="22" width="64" height="58" rx="14" fill="${NIGHT}" ${ST}/>` +
    spark(36, 40, 1.3, '#fce9a8') + spark(62, 32, 0.9, '#fce9a8') + spark(66, 58, 1.1, '#fce9a8') + spark(42, 64, 0.7, '#fce9a8') +
    `<circle cx="52" cy="50" r="1.6" fill="#fce9a8"/><circle cx="28" cy="60" r="1.4" fill="#fce9a8"/>` +
    face({ x: 36, y: 42, s: 0.5, mouth: 'smile', blush: false })
  );

  A.bikkuri = wrap(
    blob(CREAM, { y: 58, w: 48, h: 42 }) +
    face({ y: 56, mouth: 'o' }) +
    `<path d="M26 30 L22 22 M36 26 L34 18 M64 26 L66 18 M74 30 L78 22" fill="none" ${ST}/>` +
    `<path d="M84 34 L84 22" stroke="${OL}" stroke-width="4" stroke-linecap="round"/><circle cx="84" cy="42" r="2.4" fill="${OL}"/>`
  );

  A.kakurenbo = wrap(
    `<rect x="48" y="20" width="34" height="58" rx="4" fill="#e5dbd0" ${ST}/>` +
    blob(CREAM, { x: 32, y: 58, w: 24, h: 30, r: 12 }) +
    face({ x: 36, y: 52, s: 0.7, dx: 6, mouth: 'smile' }) +
    `<circle cx="48" cy="50" r="3" fill="${CREAM}" ${ST2}/><circle cx="48" cy="60" r="3" fill="${CREAM}" ${ST2}/>`
  );

  A.bakeru = wrap(
    ghost({ y: 54, s: 0.72 }) +
    spark(22, 30, 1.2) + spark(80, 26, 1) + spark(84, 60, 0.8) + spark(18, 62, 0.7)
  );

  A.fushigi = wrap(
    blob(CREAM, { y: 62, w: 44, h: 36 }) +
    face({ y: 60, s: 0.9, mouth: 'o' }) +
    `<path d="M44 26 q0 -9 9 -9 q9 0 9 8 q0 6 -8 8 l0 4" fill="none" stroke="${OL}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="54" cy="42" r="2.2" fill="${OL}"/>`
  );

  A.nakayoshi = wrap(
    ghost({ x: 34, y: 56, s: 0.62 }) +
    ghost({ x: 66, y: 56, s: 0.62, fill: PINK, closed: true }) +
    heart(50, 20, 1)
  );

  /* ===== 狀聲詞・擬態語 ===== */
  A.dokidoki = wrap(
    blob(CREAM, { x: 42, y: 60, w: 42, h: 36 }) +
    face({ x: 42, y: 58, s: 0.85, mouth: 'o' }) +
    heart(72, 34, 2) +
    `<path d="M60 20 l-3 6 M84 20 l3 6" fill="none" ${ST2}/>`
  );

  A.wakuwaku = wrap(
    blob(CREAM, { y: 60, w: 46, h: 38 }) +
    spark(41, 56, 0.75, YEL) + spark(59, 56, 0.75, YEL) +
    `<path d="M46 66 q4 4 8 0" ${ST} fill="none"/>` +
    `<ellipse cx="32" cy="64" rx="3.6" ry="2.1" fill="${BLUSH}" opacity="0.55"/><ellipse cx="68" cy="64" rx="3.6" ry="2.1" fill="${BLUSH}" opacity="0.55"/>` +
    spark(24, 30, 0.9) + spark(76, 26, 1.1)
  );

  A.fuwafuwa = wrap(
    `<path d="M30 64 Q20 64 20 55 Q20 46 29 46 Q30 34 43 35 Q49 26 60 31 Q72 29 74 42 Q82 44 80 54 Q80 64 69 64 Z" fill="${WHITE}" ${ST}/>` +
    face({ y: 51, s: 0.9, mouth: 'smile', closed: true })
  );

  A.pikapika = wrap(
    `<path d="M50 18 Q54 44 78 50 Q54 56 50 82 Q46 56 22 50 Q46 44 50 18 Z" fill="${YEL}" ${ST}/>` +
    face({ y: 50, s: 0.72, mouth: 'smile' }) +
    spark(78, 24, 0.8) + spark(24, 74, 0.6)
  );

  A.kirakira = wrap(
    spark(38, 44, 2.2, YEL) + spark(66, 30, 1.2, YEL) + spark(66, 64, 1.5, YEL) +
    `<circle cx="30" cy="70" r="1.8" fill="${YEL}"/><circle cx="80" cy="46" r="1.8" fill="${YEL}"/>` +
    face({ x: 38, y: 46, s: 0.5, mouth: 'smile', blush: false })
  );

  A.pekopeko = wrap(
    blob(CREAM, { y: 48, w: 44, h: 36 }) +
    face({ y: 46, s: 0.9, mouth: 'sad' }) +
    `<path d="M34 72 Q34 82 50 82 Q66 82 66 72 Z" fill="#ece5dc" ${ST}/>` +
    `<ellipse cx="50" cy="72" rx="16" ry="3.5" fill="#d9d0c4" ${ST2}/>`
  );

  A.suyasuya = wrap(
    blob(CREAM, { y: 60, w: 48, h: 38 }) +
    face({ y: 58, mouth: 'none', closed: true }) +
    `<path d="M64 24 l9 0 l-9 9 l9 0 M78 14 l6 0 l-6 6 l6 0" fill="none" ${ST}/>`
  );

  A.nikoniko = wrap(
    blob(CREAM, { y: 56, w: 48, h: 42 }) +
    face({ y: 53, mouth: 'none', closed: true }) +
    `<path d="M43 60 q7 6 14 0" ${ST} fill="none"/>`
  );

  A.gorogoro = wrap(
    `<path d="M20 38 a32 32 0 0 1 12 -14 M80 38 a32 32 0 0 0 -12 -14" fill="none" ${ST2}/>` +
    `<path d="M35 46 L30 34 L44 40 Z" fill="${CREAM}" ${ST}/><path d="M65 46 L70 34 L56 40 Z" fill="${CREAM}" ${ST}/>` +
    `<ellipse cx="50" cy="62" rx="27" ry="20" fill="${CREAM}" ${ST}/>` +
    `<path d="M76 70 q8 -6 2 -12" fill="none" ${ST}/>` +
    face({ y: 60, mouth: 'cat', closed: true })
  );

  A.mogumogu = wrap(
    blob(CREAM, { y: 56, w: 48, h: 42 }) +
    `<circle cx="66" cy="60" r="7" fill="${CREAM}" ${ST2}/>` +
    face({ y: 52, mouth: 'none' }) +
    `<path d="M44 61 q4 3 8 0" ${ST} fill="none"/>` +
    `<circle cx="30" cy="70" r="1.5" fill="${OL}"/><circle cx="36" cy="75" r="1.5" fill="${OL}"/>`
  );

  A.shikushiku = wrap(
    blob(CREAM, { y: 56, w: 48, h: 42 }) +
    face({ y: 53, mouth: 'sad' }) +
    `<path d="M41 60 q3.5 6 0 9 q-3.5 -3 0 -9" fill="${BLUE}" ${ST2}/>` +
    `<path d="M59 60 q3.5 6 0 9 q-3.5 -3 0 -9" fill="${BLUE}" ${ST2}/>`
  );

  A.buruburu = wrap(
    blob('#d7e6f2', { y: 56, w: 46, h: 40 }) +
    face({ y: 54, mouth: 'wavy' }) +
    `<path d="M20 44 q-4 4 0 8 M18 58 q-4 4 0 8 M80 44 q4 4 0 8 M82 58 q4 4 0 8" fill="none" ${ST2}/>`
  );

  /* ===== 去日本玩 ===== */
  A.konnichiwa = wrap(
    blob(CREAM, { y: 60, w: 46, h: 38 }) +
    face({ y: 58, mouth: 'smile' }) +
    `<ellipse cx="72" cy="42" rx="5" ry="9" transform="rotate(-32 72 42)" fill="${CREAM}" ${ST}/>` +
    `<circle cx="24" cy="26" r="9" fill="${YEL}" ${ST2}/>`
  );

  A.arigatou = wrap(
    `<g transform="rotate(14 50 62)">` + blob(CREAM, { y: 62, w: 46, h: 38 }) + face({ y: 64, mouth: 'smile', closed: true }) + `</g>` +
    heart(74, 28, 1.2) + heart(60, 18, 0.7)
  );

  A.sumimasen = wrap(
    `<g transform="rotate(22 50 64)">` + blob(CREAM, { y: 64, w: 46, h: 38 }) + face({ y: 66, mouth: 'wavy', closed: true }) + `</g>` +
    `<path d="M76 30 q4 6 0 9 q-4 -3 0 -9" fill="${BLUE}" ${ST2}/>`
  );

  A.ohayou = wrap(
    `<path d="M18 70 L82 70" fill="none" ${ST}/>` +
    `<path d="M32 70 A18 18 0 0 1 68 70 Z" fill="${YEL}" ${ST}/>` +
    `<path d="M50 40 L50 32 M32 48 L26 42 M68 48 L74 42 M24 62 L16 60 M76 62 L84 60" fill="none" ${ST2}/>` +
    face({ y: 62, s: 0.7, mouth: 'smile' })
  );

  A.oyasumi = wrap(
    `<path d="M72 22 A13 13 0 1 0 72 48 A17 17 0 0 1 72 22 Z" fill="${YEL}" ${ST2}/>` +
    blob(CREAM, { x: 44, y: 66, w: 44, h: 30, r: 15 }) +
    face({ x: 44, y: 64, s: 0.85, mouth: 'none', closed: true }) +
    `<path d="M22 34 l7 0 l-7 7 l7 0" fill="none" ${ST}/>`
  );

  A.oishii = wrap(
    blob(CREAM, { y: 54, w: 48, h: 40 }) +
    face({ y: 51, mouth: 'smile', closed: true }) +
    `<path d="M42 58 q8 7 16 0" ${ST} fill="none"/>` +
    spark(78, 34, 1) + spark(22, 40, 0.7)
  );

  A.toire = wrap(
    `<rect x="38" y="26" width="24" height="14" rx="3" fill="#f4f9fc" ${ST}/>` +
    `<ellipse cx="50" cy="46" rx="17" ry="6" fill="#f4f9fc" ${ST}/>` +
    `<path d="M33 46 Q33 64 50 64 Q67 64 67 46" fill="#f4f9fc" ${ST}/>` +
    `<rect x="45" y="64" width="10" height="9" rx="2" fill="#e2ecf2" ${ST2}/>` +
    face({ y: 54, s: 0.6, mouth: 'smile' })
  );

  A.densha = wrap(
    `<rect x="26" y="24" width="48" height="52" rx="10" fill="#cfe6d2" ${ST}/>` +
    `<rect x="32" y="30" width="36" height="16" rx="5" fill="#eef7fb" ${ST2}/>` +
    face({ y: 58, s: 0.85, mouth: 'smile' }) +
    `<circle cx="33" cy="70" r="2.6" fill="${YEL}" ${ST2}/><circle cx="67" cy="70" r="2.6" fill="${YEL}" ${ST2}/>` +
    `<path d="M22 82 L78 82" fill="none" ${ST2}/>`
  );

  A.korekudasai = wrap(
    blob(CREAM, { x: 28, y: 62, w: 26, h: 26, r: 12 }) +
    face({ x: 28, y: 60, s: 0.6, mouth: 'o' }) +
    `<ellipse cx="43" cy="56" rx="7" ry="3.5" transform="rotate(-18 43 56)" fill="${CREAM}" ${ST2}/>` +
    `<path d="M56 44 L80 44 L77 64 Q68 68 59 64 Z" fill="#f7dc9a" ${ST}/>` +
    `<path d="M56 44 L80 44 L79 50 Q68 55 57 50 Z" fill="#c98a4b"/>` +
    `<circle cx="68" cy="40" r="3.4" fill="#e5806f" ${ST2}/>`
  );

  A.ikuradesuka = wrap(
    `<rect x="28" y="36" width="44" height="30" rx="7" fill="#f9e6b8" ${ST}/>` +
    `<circle cx="36" cy="44" r="3" fill="${WHITE}" ${ST2}/>` +
    `<path d="M36 41 Q30 28 42 24" fill="none" ${ST2}/>` +
    `<path d="M50 44 L55 51 M60 44 L55 51 M55 51 L55 60 M50 54 L60 54 M50 57.5 L60 57.5" fill="none" stroke="${OL}" stroke-width="2.8" stroke-linecap="round"/>`
  );

  A.daijoubu = wrap(
    blob(CREAM, { x: 42, y: 60, w: 44, h: 36 }) +
    face({ x: 42, y: 58, s: 0.9, mouth: 'smile' }) +
    `<circle cx="74" cy="32" r="11" fill="none" stroke="${OL}" stroke-width="3.5"/>`
  );

  A.tanoshii = wrap(
    blob(CREAM, { y: 52, w: 46, h: 38 }) +
    face({ y: 49, mouth: 'o', closed: true }) +
    `<ellipse cx="23" cy="40" rx="5" ry="8" transform="rotate(30 23 40)" fill="${CREAM}" ${ST}/>` +
    `<ellipse cx="77" cy="40" rx="5" ry="8" transform="rotate(-30 77 40)" fill="${CREAM}" ${ST}/>` +
    `<circle cx="26" cy="20" r="2" fill="${BLUSH}"/><circle cx="50" cy="12" r="2" fill="${GREEN}"/><circle cx="74" cy="18" r="2" fill="${BLUE}"/>` +
    spark(84, 42, 0.7) + spark(14, 48, 0.7)
  );

  /* ===== 50 音例字（未與上面重複者） ===== */
  A.ari = wrap(
    `<circle cx="34" cy="60" r="8" fill="#a97f52" ${ST}/><circle cx="49" cy="58" r="7" fill="#a97f52" ${ST}/><circle cx="64" cy="55" r="9" fill="#a97f52" ${ST}/>` +
    `<path d="M60 47 q-2 -8 -7 -9 M68 47 q2 -8 7 -9" fill="none" ${ST2}/>` +
    `<path d="M32 68 l-3 7 M40 67 l2 7 M48 65 l-2 8 M56 63 l3 8" fill="none" ${ST2}/>` +
    face({ x: 64, y: 54, s: 0.5, dx: 7, mouth: 'smile', blush: false })
  );

  A.inu = wrap(
    `<ellipse cx="30" cy="36" rx="7" ry="12" transform="rotate(20 30 36)" fill="${BROWN}" ${ST}/>` +
    `<ellipse cx="70" cy="36" rx="7" ry="12" transform="rotate(-20 70 36)" fill="${BROWN}" ${ST}/>` +
    blob(CREAM, { y: 54, w: 48, h: 42 }) +
    `<ellipse cx="50" cy="58" rx="9" ry="6.5" fill="${WHITE}"/>` +
    `<path d="M47 55 L53 55 L50 58.5 Z" fill="${OL}"/>` +
    face({ y: 52, mouth: 'none' }) +
    `<path d="M46 61 q4 3.5 8 0" ${ST} fill="none"/>`
  );

  A.umi = wrap(
    `<rect x="18" y="30" width="64" height="44" rx="12" fill="${BLUE}" ${ST}/>` +
    `<path d="M24 48 q7 -6 14 0 q7 6 14 0 q7 -6 14 0 q5 4 10 1 M24 62 q7 -6 14 0 q7 6 14 0 q7 -6 14 0" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>` +
    spark(70, 38, 0.6, '#fff')
  );

  A.ebi = wrap(
    `<path d="M64 26 q14 2 12 18 q-2 18 -22 22 q-18 4 -24 -8 q10 4 20 0" fill="none" stroke="#f4a988" stroke-width="13" stroke-linecap="round"/>` +
    `<path d="M64 26 q14 2 12 18 q-2 18 -22 22 q-18 4 -24 -8" fill="none" ${ST2}/>` +
    `<circle cx="64" cy="28" r="8" fill="#f4a988" ${ST2}/>` +
    `<path d="M68 22 q10 -8 16 -6 M66 20 q4 -8 10 -10" fill="none" ${ST2}/>` +
    face({ x: 62, y: 28, s: 0.5, dx: 6, mouth: 'none', blush: false })
  );

  A.kasa = wrap(
    `<path d="M50 24 Q26 26 23 50 Q29 44 36 50 Q43 44 50 50 Q57 44 64 50 Q71 44 77 50 Q74 26 50 24 Z" fill="${PINK}" ${ST}/>` +
    `<path d="M50 27 L50 24" fill="none" ${ST}/>` +
    `<path d="M50 50 L50 70 q0 7 -7 7" fill="none" stroke="${OL}" stroke-width="3.2" stroke-linecap="round"/>`
  );

  A.kitsune = wrap(
    `<path d="M30 40 L28 20 L45 30 Z" fill="#f2b56b" ${ST}/><path d="M70 40 L72 20 L55 30 Z" fill="#f2b56b" ${ST}/>` +
    blob('#f2b56b', { y: 55, w: 50, h: 44 }) +
    `<ellipse cx="50" cy="60" rx="11" ry="8" fill="${WHITE}"/>` +
    `<path d="M47.5 56 L52.5 56 L50 59 Z" fill="${OL}"/>` +
    face({ y: 52, mouth: 'none' })
  );

  A.kuma = wrap(
    `<circle cx="33" cy="32" r="6.5" fill="${BROWN}" ${ST}/><circle cx="67" cy="32" r="6.5" fill="${BROWN}" ${ST}/>` +
    blob(BROWN, { y: 55, w: 52, h: 46 }) +
    `<ellipse cx="50" cy="60" rx="9" ry="6.5" fill="${CREAM}"/>` +
    face({ y: 52, mouth: 'cat' })
  );

  A.kemushi = wrap(
    `<circle cx="66" cy="62" r="8.5" fill="${LGREEN}" ${ST}/><circle cx="54" cy="59" r="8.5" fill="${GREEN}" ${ST}/><circle cx="42" cy="59" r="8.5" fill="${LGREEN}" ${ST}/><circle cx="30" cy="60" r="9.5" fill="${GREEN}" ${ST}/>` +
    `<path d="M26 52 q-3 -7 -8 -8 M34 51 q1 -7 6 -9" fill="none" ${ST2}/>` +
    face({ x: 30, y: 59, s: 0.55, dx: 7, mouth: 'smile', blush: false })
  );

  A.sakana = wrap(
    `<path d="M68 54 L84 42 L84 66 Z" fill="#9cc7e0" ${ST}/>` +
    `<ellipse cx="46" cy="54" rx="22" ry="14" fill="${BLUE}" ${ST}/>` +
    `<path d="M44 40 q6 -8 12 -2" fill="none" ${ST2}/>` +
    face({ x: 38, y: 52, s: 0.6, dx: 6, mouth: 'o', blush: true }) +
    `<circle cx="76" cy="30" r="1.8" fill="${BLUE}"/>`
  );

  A.sushi = wrap(
    `<ellipse cx="50" cy="62" rx="21" ry="11" fill="${WHITE}" ${ST}/>` +
    `<rect x="30" y="40" width="40" height="15" rx="7.5" fill="#f7a58f" ${ST}/>` +
    `<path d="M38 44 q2 4 0 8 M48 43 q2 4 0 8 M58 43 q2 4 0 8" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.8"/>`
  );

  A.sensei = wrap(
    blob(CREAM, { y: 55, w: 48, h: 44 }) +
    `<circle cx="41" cy="50" r="6.5" fill="#fff" ${ST2}/><circle cx="59" cy="50" r="6.5" fill="#fff" ${ST2}/><path d="M47.5 50 L52.5 50" fill="none" ${ST2}/>` +
    `<circle cx="41" cy="50" r="1.8" fill="${OL}"/><circle cx="59" cy="50" r="1.8" fill="${OL}"/>` +
    `<path d="M46 62 q4 3 8 0" ${ST} fill="none"/>` +
    `<rect x="66" y="64" width="16" height="12" rx="2" fill="${PINK}" ${ST2}/>`
  );

  A.sora = wrap(
    `<rect x="18" y="26" width="64" height="50" rx="12" fill="#cfe7f5" ${ST}/>` +
    `<circle cx="68" cy="40" r="9" fill="${YEL}" ${ST2}/>` +
    `<path d="M30 58 Q24 58 24 52 Q24 47 29 47 Q31 40 39 42 Q46 40 47 47 Q52 48 51 53 Q51 58 45 58 Z" fill="#fff" ${ST2}/>`
  );

  A.tako = wrap(
    `<path d="M33 54 q-6 14 4 20 M45 60 q-3 13 5 18 M55 60 q3 13 -5 18 M67 54 q6 14 -4 20" fill="none" stroke="${OL}" stroke-width="11" stroke-linecap="round"/>` +
    `<path d="M33 54 q-6 14 4 20 M45 60 q-3 13 5 18 M55 60 q3 13 -5 18 M67 54 q6 14 -4 20" fill="none" stroke="${PINK}" stroke-width="7" stroke-linecap="round"/>` +
    `<circle cx="50" cy="42" r="19" fill="${PINK}" ${ST}/>` +
    face({ y: 42, mouth: 'o' })
  );

  A.choucho = wrap(
    `<ellipse cx="34" cy="42" rx="13" ry="11" fill="${PINK}" ${ST}/><ellipse cx="66" cy="42" rx="13" ry="11" fill="${PINK}" ${ST}/>` +
    `<ellipse cx="36" cy="62" rx="10" ry="8" fill="#f9dce2" ${ST}/><ellipse cx="64" cy="62" rx="10" ry="8" fill="#f9dce2" ${ST}/>` +
    `<ellipse cx="50" cy="52" rx="4.5" ry="15" fill="${BROWN}" ${ST}/>` +
    `<path d="M46 38 q-4 -8 -10 -9 M54 38 q4 -8 10 -9" fill="none" ${ST2}/>` +
    `<circle cx="34" cy="41" r="2.4" fill="#fff" opacity="0.8"/><circle cx="66" cy="41" r="2.4" fill="#fff" opacity="0.8"/>`
  );

  A.tsuki = wrap(
    `<path d="M62 20 A28 28 0 1 0 62 76 A38 38 0 0 1 62 20 Z" fill="${YEL}" ${ST}/>` +
    face({ x: 42, y: 48, s: 0.7, dx: 6, mouth: 'smile', closed: true }) +
    spark(76, 34, 0.9) + spark(80, 62, 0.6)
  );

  A.te = wrap(
    `<path d="M36 74 L36 48 Q36 44 39 44 Q42 44 42 48 L42 40 Q42 36 45 36 Q48 36 48 40 L48 36 Q48 32 51 32 Q54 32 54 36 L54 40 Q54 37 57 37 Q60 37 60 41 L60 52 Q64 46 67 49 Q69 51 66 56 L58 74 Q56 78 50 78 L42 78 Q38 78 36 74 Z" fill="#fbe3d2" ${ST}/>`
  );

  A.nasu = wrap(
    `<path d="M48 26 q-2 -6 2 -8" fill="none" stroke="#7ea76a" stroke-width="3.5" stroke-linecap="round"/>` +
    `<path d="M50 24 L58 30 L52 36 L62 40 L54 42" fill="none" stroke="#7ea76a" stroke-width="0"/>` +
    `<path d="M38 32 Q50 22 62 32 L56 40 Q50 36 44 40 Z" fill="#8fb974" ${ST2}/>` +
    `<ellipse cx="50" cy="56" rx="17" ry="22" fill="#9a79ba" ${ST}/>` +
    face({ y: 58, s: 0.8, mouth: 'smile' })
  );

  A.ninjin = wrap(
    `<path d="M44 30 q-6 -10 -12 -10 M50 28 q0 -12 -4 -16 M56 30 q6 -10 12 -10" fill="none" stroke="#7ea76a" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M50 80 Q40 60 41 44 Q41 32 50 32 Q59 32 59 44 Q60 60 50 80 Z" fill="${ORANGE}" ${ST}/>` +
    `<path d="M44 48 l6 2 M46 58 l6 2" fill="none" ${ST2} opacity="0.6"/>` +
    face({ y: 44, s: 0.62, mouth: 'smile' })
  );

  A.nuigurumi = wrap(
    `<circle cx="34" cy="32" r="6.5" fill="#d9b98c" ${ST}/><circle cx="66" cy="32" r="6.5" fill="#d9b98c" ${ST}/>` +
    blob('#d9b98c', { y: 55, w: 50, h: 44 }) +
    `<ellipse cx="50" cy="60" rx="8" ry="6" fill="${CREAM}"/>` +
    face({ y: 52, mouth: 'cat' }) +
    `<path d="M62 70 l8 0 M66 66 l0 8" fill="none" ${ST2}/>`
  );

  A.nori = wrap(
    `<rect x="32" y="34" width="36" height="42" rx="4" fill="#4c4a45" ${ST}/>` +
    `<path d="M38 42 l24 0 M38 52 l24 0 M38 62 l24 0" fill="none" stroke="#6b675f" stroke-width="2" stroke-linecap="round"/>` +
    `<circle cx="44" cy="55" r="2.2" fill="#fff"/><circle cx="56" cy="55" r="2.2" fill="#fff"/>` +
    `<path d="M47 62 q3 3 6 0" stroke="#fff" stroke-width="2.2" stroke-linecap="round" fill="none"/>`
  );

  A.hana = wrap(
    `<path d="M50 66 L50 82 M50 74 q-8 -2 -12 4 M50 74 q8 -2 12 4" fill="none" stroke="#7ea76a" stroke-width="3.5" stroke-linecap="round"/>` +
    `<ellipse cx="50" cy="28" rx="8" ry="10" fill="${PINK}" ${ST2}/><ellipse cx="33" cy="40" rx="8" ry="10" transform="rotate(-70 33 40)" fill="${PINK}" ${ST2}/><ellipse cx="67" cy="40" rx="8" ry="10" transform="rotate(70 67 40)" fill="${PINK}" ${ST2}/><ellipse cx="39" cy="58" rx="8" ry="10" transform="rotate(-140 39 58)" fill="${PINK}" ${ST2}/><ellipse cx="61" cy="58" rx="8" ry="10" transform="rotate(140 61 58)" fill="${PINK}" ${ST2}/>` +
    `<circle cx="50" cy="45" r="9" fill="${YEL}" ${ST2}/>` +
    face({ y: 45, s: 0.5, mouth: 'smile', blush: false })
  );

  A.hiyoko = wrap(
    blob('#f9dc8c', { y: 56, w: 46, h: 42 }) +
    `<path d="M46.5 54 L53.5 54 L50 58.5 Z" fill="#f2b04a" ${ST2}/>` +
    `<path d="M48 30 q2 -6 6 -4" fill="none" ${ST2}/>` +
    face({ y: 49, dx: 10, mouth: 'none' })
  );

  A.fune = wrap(
    `<path d="M26 58 L74 58 L65 72 L35 72 Z" fill="${BROWN}" ${ST}/>` +
    `<path d="M52 26 L52 56 M52 30 L72 52 L52 52 Z" fill="${WHITE}" ${ST}/>` +
    `<path d="M20 80 q6 -5 12 0 q6 5 12 0 q6 -5 12 0 q6 5 12 0 q6 -5 12 0" fill="none" stroke="${BLUE}" stroke-width="3" stroke-linecap="round"/>`
  );

  A.hebi = wrap(
    `<path d="M30 70 Q28 52 46 52 Q62 52 62 42 Q62 30 48 32" fill="none" stroke="${OL}" stroke-width="13" stroke-linecap="round"/>` +
    `<path d="M30 70 Q28 52 46 52 Q62 52 62 42 Q62 30 48 32" fill="none" stroke="${GREEN}" stroke-width="9" stroke-linecap="round"/>` +
    `<circle cx="46" cy="32" r="9" fill="${GREEN}" ${ST}/>` +
    `<path d="M37 32 q-6 0 -8 -3 M37 33 q-6 2 -8 5" fill="none" stroke="#d86a6a" stroke-width="2" stroke-linecap="round"/>` +
    face({ x: 48, y: 31, s: 0.55, dx: 6, mouth: 'smile', blush: false })
  );

  A.hoshi = wrap(
    `<path d="M50 16 L58 38 L82 38 L63 52 L70 76 L50 62 L30 76 L37 52 L18 38 L42 38 Z" fill="${YEL}" ${ST}/>` +
    face({ y: 48, s: 0.7, mouth: 'smile' })
  );

  A.mado = wrap(
    `<rect x="28" y="26" width="44" height="48" rx="4" fill="#eef7fb" ${ST}/>` +
    `<path d="M50 26 L50 74 M28 50 L72 50" fill="none" ${ST2}/>` +
    `<path d="M28 26 Q34 46 28 70 Z" fill="${PINK}" ${ST2}/><path d="M72 26 Q66 46 72 70 Z" fill="${PINK}" ${ST2}/>` +
    `<circle cx="60" cy="38" r="5" fill="${YEL}" ${ST2}/>`
  );

  A.mizu = wrap(
    `<path d="M50 18 Q67 44 67 58 A17 17 0 1 1 33 58 Q33 44 50 18 Z" fill="${BLUE}" ${ST}/>` +
    `<path d="M42 60 q-2 6 3 9" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>` +
    face({ y: 58, s: 0.75, mouth: 'smile' })
  );

  A.mushi = wrap(
    `<path d="M40 32 q-4 -8 -10 -8 M60 32 q4 -8 10 -8" fill="none" ${ST2}/>` +
    `<circle cx="50" cy="56" r="21" fill="#ef8f8f" ${ST}/>` +
    `<path d="M50 36 L50 76" fill="none" ${ST2}/>` +
    `<circle cx="40" cy="48" r="3" fill="${OL}"/><circle cx="60" cy="48" r="3" fill="${OL}"/><circle cx="38" cy="64" r="3" fill="${OL}"/><circle cx="62" cy="64" r="3" fill="${OL}"/>` +
    `<path d="M36 34 Q50 26 64 34" fill="#6d5b52" ${ST2}/>`
  );

  A.me = wrap(
    `<ellipse cx="37" cy="50" rx="10" ry="13" fill="#fff" ${ST}/><ellipse cx="63" cy="50" rx="10" ry="13" fill="#fff" ${ST}/>` +
    `<circle cx="37" cy="52" r="5" fill="#8a6f5c"/><circle cx="63" cy="52" r="5" fill="#8a6f5c"/>` +
    `<circle cx="39" cy="50" r="1.8" fill="#fff"/><circle cx="65" cy="50" r="1.8" fill="#fff"/>` +
    `<ellipse cx="30" cy="68" rx="4" ry="2.4" fill="${BLUSH}" opacity="0.55"/><ellipse cx="70" cy="68" rx="4" ry="2.4" fill="${BLUSH}" opacity="0.55"/>`
  );

  A.momo = wrap(
    `<ellipse cx="58" cy="28" rx="8" ry="4.5" transform="rotate(-24 58 28)" fill="${GREEN}" ${ST2}/>` +
    `<circle cx="50" cy="56" r="21" fill="${PINK}" ${ST}/>` +
    `<path d="M50 36 Q46 46 50 54" fill="none" ${ST2}/>` +
    face({ y: 58, s: 0.8, mouth: 'smile' })
  );

  A.yama = wrap(
    `<path d="M50 24 L80 74 L20 74 Z" fill="#9db7d6" ${ST}/>` +
    `<path d="M50 24 L60 41 Q55 46 50 41 Q45 46 40 41 Z" fill="#fff" ${ST2}/>` +
    face({ y: 60, s: 0.7, mouth: 'smile' }) +
    `<path d="M70 30 Q66 30 66 27 Q66 24 69 24 Q70 20 75 22 Q79 21 79 25 Q82 26 81 28 Q81 30 78 30 Z" fill="#fff" ${ST2}/>`
  );

  A.yuki = wrap(
    `<circle cx="50" cy="62" r="17" fill="${WHITE}" ${ST}/>` +
    `<circle cx="50" cy="38" r="12" fill="${WHITE}" ${ST}/>` +
    `<path d="M38 48 Q50 54 62 48" fill="none" stroke="${BLUSH}" stroke-width="3.5" stroke-linecap="round"/>` +
    face({ y: 37, s: 0.62, mouth: 'smile' }) +
    `<circle cx="24" cy="30" r="1.8" fill="${BLUE}"/><circle cx="76" cy="26" r="1.8" fill="${BLUE}"/><circle cx="80" cy="52" r="1.8" fill="${BLUE}"/><circle cx="20" cy="56" r="1.8" fill="${BLUE}"/>`
  );

  A.rappa = wrap(
    `<path d="M24 52 L58 44 Q72 40 76 52 Q72 64 58 60 L24 58 Z" fill="${YEL}" ${ST}/>` +
    `<ellipse cx="76" cy="52" rx="6" ry="11" fill="#f9e6b8" ${ST}/>` +
    `<path d="M38 48 l0 -6 M46 46.5 l0 -6 M54 45 l0 -6" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="26" cy="28" r="2.5" fill="${OL}"/><path d="M28.5 28 L28.5 16 L34 14" fill="none" ${ST2}/>` +
    `<circle cx="84" cy="26" r="2" fill="${OL}"/><path d="M86 26 L86 16" fill="none" ${ST2}/>`
  );

  A.ringo = wrap(
    `<path d="M50 34 q0 -8 6 -10" fill="none" stroke="#8a6f5c" stroke-width="3.5" stroke-linecap="round"/>` +
    `<ellipse cx="62" cy="26" rx="7" ry="4" transform="rotate(-26 62 26)" fill="${GREEN}" ${ST2}/>` +
    `<circle cx="50" cy="56" r="21" fill="#ef8f8f" ${ST}/>` +
    `<path d="M38 46 q-2 6 1 10" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>` +
    face({ y: 58, s: 0.8, mouth: 'smile' })
  );

  A.rusuban = wrap(
    `<path d="M22 46 L50 24 L78 46 Z" fill="#e0908f" ${ST}/>` +
    `<rect x="28" y="46" width="44" height="30" fill="${CREAM}" ${ST}/>` +
    `<rect x="34" y="56" width="11" height="20" rx="2" fill="${BROWN}" ${ST2}/>` +
    `<rect x="54" y="52" width="14" height="13" rx="2" fill="${BLUE}" ${ST2}/>` +
    face({ x: 61, y: 59, s: 0.42, dx: 7, mouth: 'smile', blush: false })
  );

  A.reizouko = wrap(
    `<rect x="33" y="24" width="34" height="54" rx="6" fill="#dff0f5" ${ST}/>` +
    `<path d="M33 44 L67 44" fill="none" ${ST2}/>` +
    `<path d="M38 32 L38 38 M38 50 L38 58" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>` +
    face({ y: 62, s: 0.65, mouth: 'smile' }) +
    spark(76, 30, 0.7, '#cfe7f5')
  );

  A.rousoku = wrap(
    `<path d="M50 20 Q58 30 50 39 Q42 30 50 20 Z" fill="#f7b34c" ${ST2}/>` +
    `<path d="M50 27 Q53 31 50 35 Q47 31 50 27 Z" fill="${YEL}"/>` +
    `<rect x="42" y="42" width="16" height="30" rx="4" fill="#fef3f3" ${ST}/>` +
    `<path d="M46 42 q0 6 -2 8" fill="none" stroke="${PINK}" stroke-width="2.5" stroke-linecap="round"/>` +
    `<ellipse cx="50" cy="76" rx="16" ry="4" fill="${GRAY}" ${ST2}/>`
  );

  A.wani = wrap(
    `<path d="M32 44 q3 -8 8 0 M46 42 q3 -8 8 0" fill="${GREEN}" ${ST2}/>` +
    `<rect x="22" y="46" width="46" height="24" rx="12" fill="${GREEN}" ${ST}/>` +
    `<rect x="60" y="52" width="20" height="14" rx="7" fill="${GREEN}" ${ST}/>` +
    `<path d="M64 66 l3 -4 l3 4 l3 -4 l3 4" fill="#fff" ${ST2}/>` +
    `<path d="M20 56 q-6 4 -2 10" fill="none" ${ST}/>` +
    face({ x: 40, y: 55, s: 0.7, dx: 7, mouth: 'none', blush: true })
  );

  A.hon = wrap(
    `<circle cx="50" cy="34" r="12" fill="${CREAM}" ${ST}/>` +
    `<circle cx="45" cy="36" r="1.9" fill="${OL}"/><circle cx="55" cy="36" r="1.9" fill="${OL}"/>` +
    `<path d="M50 44 Q34 36 22 42 L22 68 Q34 62 50 70 Q66 62 78 68 L78 42 Q66 36 50 44 Z" fill="${WHITE}" ${ST}/>` +
    `<path d="M50 44 L50 70" fill="none" ${ST2}/>` +
    `<path d="M28 48 l14 -2 M28 54 l14 -2 M58 46 l14 2 M58 52 l14 2" fill="none" stroke="${GRAY}" stroke-width="2.2" stroke-linecap="round"/>`
  );

  A.pan = wrap(
    `<path d="M28 60 L28 50 Q28 36 43 36 L57 36 Q72 36 72 50 L72 60 Q72 67 65 67 L35 67 Q28 67 28 60 Z" fill="#eec07a" ${ST}/>` +
    `<path d="M40 36 Q40 44 40 46 M60 36 Q60 44 60 46" fill="none" ${ST2} opacity="0.45"/>` +
    face({ y: 54, s: 0.8, mouth: 'smile' })
  );

  /* --- jp 文字 → 插圖對照表 --- */
  const BY_JP = {
    // 角落生物
    'しろくま': 'shirokuma', 'ねこ': 'neko', 'とんかつ': 'tonkatsu', 'とかげ': 'tokage',
    'ぺんぎん': 'pengin', 'えびふらい': 'ebifurai', 'ざっそう': 'zassou', 'ほこり': 'hokori',
    'たぴおか': 'tapioka', 'すみっこ': 'sumikko', 'かわいい': 'kawaii', 'ともだち': 'tomodachi',
    'おにぎり': 'onigiri', 'おちゃ': 'ocha',
    // 幽靈
    'おばけ': 'obake', 'こわい': 'kowai', 'よる': 'yoru', 'まっくら': 'makkura',
    'おつきさま': 'otsukisama', 'ほしぞら': 'hoshizora', 'びっくり': 'bikkuri',
    'かくれんぼ': 'kakurenbo', 'ばける': 'bakeru', 'ふしぎ': 'fushigi', 'なかよし': 'nakayoshi',
    // 狀聲詞
    'ドキドキ': 'dokidoki', 'ワクワク': 'wakuwaku', 'ふわふわ': 'fuwafuwa', 'ぴかぴか': 'pikapika',
    'きらきら': 'kirakira', 'ぺこぺこ': 'pekopeko', 'すやすや': 'suyasuya', 'にこにこ': 'nikoniko',
    'ごろごろ': 'gorogoro', 'もぐもぐ': 'mogumogu', 'しくしく': 'shikushiku', 'ぶるぶる': 'buruburu',
    // 旅遊
    'こんにちは': 'konnichiwa', 'ありがとう': 'arigatou', 'すみません': 'sumimasen',
    'おはよう': 'ohayou', 'おやすみ': 'oyasumi', 'おいしい': 'oishii', 'トイレ': 'toire',
    'でんしゃ': 'densha', 'これください': 'korekudasai', 'いくらですか': 'ikuradesuka',
    'だいじょうぶ': 'daijoubu', 'たのしい': 'tanoshii',
    // 50 音例字
    'あり': 'ari', 'いぬ': 'inu', 'うみ': 'umi', 'えび': 'ebi', 'かさ': 'kasa',
    'きつね': 'kitsune', 'くま': 'kuma', 'けむし': 'kemushi', 'こねこ': 'koneko',
    'さかな': 'sakana', 'すし': 'sushi', 'せんせい': 'sensei', 'そら': 'sora',
    'たこ': 'tako', 'ちょうちょ': 'choucho', 'つき': 'tsuki', 'て': 'te',
    'なす': 'nasu', 'にんじん': 'ninjin', 'ぬいぐるみ': 'nuigurumi', 'のり': 'nori',
    'はな': 'hana', 'ひよこ': 'hiyoko', 'ふね': 'fune', 'へび': 'hebi', 'ほし': 'hoshi',
    'まど': 'mado', 'みず': 'mizu', 'むし': 'mushi', 'め': 'me', 'もも': 'momo',
    'やま': 'yama', 'ゆき': 'yuki', 'らっぱ': 'rappa', 'りんご': 'ringo',
    'るすばん': 'rusuban', 'れいぞうこ': 'reizouko', 'ろうそく': 'rousoku',
    'わに': 'wani', 'ほんをよむ': 'hon', 'ぱん': 'pan',
  };

  /* 各主題選單的代表圖 */
  const DECK_ICON = { sumikko: 'shirokuma', obake: 'obake', giongo: 'kirakira', travel: 'densha' };

  /** 取得插圖 HTML；沒有對應插圖就退回 emoji */
  function html(item) {
    const key = BY_JP[item.jp];
    if (key && A[key]) return A[key];
    return `<span class="art-emoji">${item.emoji || '❓'}</span>`;
  }

  function deckIcon(deck) {
    const key = DECK_ICON[deck.id];
    return (key && A[key]) || `<span class="art-emoji">${deck.emoji}</span>`;
  }

  return { html, deckIcon, raw: A };
})();
