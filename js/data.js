/* =========================================================
 * data.js — 全部學習內容的唯一來源
 * 之後要新增假名例字或單字，只需要改這個檔案
 * ========================================================= */

/* 50 音基本表。每格：hira 平假名 / kata 片假名 / romaji 羅馬拼音
 * word 代表單字（jp 顯示、reading 讀音、zh 中文、emoji 圖示）
 * null = 表格空位（や行、わ行本來就沒有那些音） */
const KANA_ROWS = [
  [
    { hira: 'あ', kata: 'ア', romaji: 'a',   word: { jp: 'あり',       reading: 'あり',       zh: '螞蟻',   emoji: '🐜' } },
    { hira: 'い', kata: 'イ', romaji: 'i',   word: { jp: 'いぬ',       reading: 'いぬ',       zh: '狗',     emoji: '🐶' } },
    { hira: 'う', kata: 'ウ', romaji: 'u',   word: { jp: 'うみ',       reading: 'うみ',       zh: '海',     emoji: '🌊' } },
    { hira: 'え', kata: 'エ', romaji: 'e',   word: { jp: 'えび',       reading: 'えび',       zh: '蝦子',   emoji: '🦐' } },
    { hira: 'お', kata: 'オ', romaji: 'o',   word: { jp: 'おばけ',     reading: 'おばけ',     zh: '幽靈',   emoji: '👻' } },
  ],
  [
    { hira: 'か', kata: 'カ', romaji: 'ka',  word: { jp: 'かさ',       reading: 'かさ',       zh: '雨傘',   emoji: '☂️' } },
    { hira: 'き', kata: 'キ', romaji: 'ki',  word: { jp: 'きつね',     reading: 'きつね',     zh: '狐狸',   emoji: '🦊' } },
    { hira: 'く', kata: 'ク', romaji: 'ku',  word: { jp: 'くま',       reading: 'くま',       zh: '熊',     emoji: '🐻' } },
    { hira: 'け', kata: 'ケ', romaji: 'ke',  word: { jp: 'けむし',     reading: 'けむし',     zh: '毛毛蟲', emoji: '🐛' } },
    { hira: 'こ', kata: 'コ', romaji: 'ko',  word: { jp: 'こねこ',     reading: 'こねこ',     zh: '小貓',   emoji: '🐱' } },
  ],
  [
    { hira: 'さ', kata: 'サ', romaji: 'sa',  word: { jp: 'さかな',     reading: 'さかな',     zh: '魚',     emoji: '🐟' } },
    { hira: 'し', kata: 'シ', romaji: 'shi', word: { jp: 'しろくま',   reading: 'しろくま',   zh: '白熊',   emoji: '🐻‍❄️' } },
    { hira: 'す', kata: 'ス', romaji: 'su',  word: { jp: 'すし',       reading: 'すし',       zh: '壽司',   emoji: '🍣' } },
    { hira: 'せ', kata: 'セ', romaji: 'se',  word: { jp: 'せんせい',   reading: 'せんせい',   zh: '老師',   emoji: '🧑‍🏫' } },
    { hira: 'そ', kata: 'ソ', romaji: 'so',  word: { jp: 'そら',       reading: 'そら',       zh: '天空',   emoji: '☁️' } },
  ],
  [
    { hira: 'た', kata: 'タ', romaji: 'ta',  word: { jp: 'たこ',       reading: 'たこ',       zh: '章魚',   emoji: '🐙' } },
    { hira: 'ち', kata: 'チ', romaji: 'chi', word: { jp: 'ちょうちょ', reading: 'ちょうちょ', zh: '蝴蝶',   emoji: '🦋' } },
    { hira: 'つ', kata: 'ツ', romaji: 'tsu', word: { jp: 'つき',       reading: 'つき',       zh: '月亮',   emoji: '🌙' } },
    { hira: 'て', kata: 'テ', romaji: 'te',  word: { jp: 'て',         reading: 'て',         zh: '手',     emoji: '✋' } },
    { hira: 'と', kata: 'ト', romaji: 'to',  word: { jp: 'とんかつ',   reading: 'とんかつ',   zh: '炸豬排', emoji: '🍖' } },
  ],
  [
    { hira: 'な', kata: 'ナ', romaji: 'na',  word: { jp: 'なす',       reading: 'なす',       zh: '茄子',   emoji: '🍆' } },
    { hira: 'に', kata: 'ニ', romaji: 'ni',  word: { jp: 'にんじん',   reading: 'にんじん',   zh: '紅蘿蔔', emoji: '🥕' } },
    { hira: 'ぬ', kata: 'ヌ', romaji: 'nu',  word: { jp: 'ぬいぐるみ', reading: 'ぬいぐるみ', zh: '布偶',   emoji: '🧸' } },
    { hira: 'ね', kata: 'ネ', romaji: 'ne',  word: { jp: 'ねこ',       reading: 'ねこ',       zh: '貓',     emoji: '🐈' } },
    { hira: 'の', kata: 'ノ', romaji: 'no',  word: { jp: 'のり',       reading: 'のり',       zh: '海苔',   emoji: '🍙' } },
  ],
  [
    { hira: 'は', kata: 'ハ', romaji: 'ha',  word: { jp:'はな',        reading: 'はな',       zh: '花',     emoji: '🌸' } },
    { hira: 'ひ', kata: 'ヒ', romaji: 'hi',  word: { jp: 'ひよこ',     reading: 'ひよこ',     zh: '小雞',   emoji: '🐤' } },
    { hira: 'ふ', kata: 'フ', romaji: 'fu',  word: { jp: 'ふね',       reading: 'ふね',       zh: '船',     emoji: '⛵' } },
    { hira: 'へ', kata: 'ヘ', romaji: 'he',  word: { jp: 'へび',       reading: 'へび',       zh: '蛇',     emoji: '🐍' } },
    { hira: 'ほ', kata: 'ホ', romaji: 'ho',  word: { jp: 'ほし',       reading: 'ほし',       zh: '星星',   emoji: '⭐' } },
  ],
  [
    { hira: 'ま', kata: 'マ', romaji: 'ma',  word: { jp: 'まど',       reading: 'まど',       zh: '窗戶',   emoji: '🪟' } },
    { hira: 'み', kata: 'ミ', romaji: 'mi',  word: { jp: 'みず',       reading: 'みず',       zh: '水',     emoji: '💧' } },
    { hira: 'む', kata: 'ム', romaji: 'mu',  word: { jp: 'むし',       reading: 'むし',       zh: '蟲',     emoji: '🐞' } },
    { hira: 'め', kata: 'メ', romaji: 'me',  word: { jp: 'め',         reading: 'め',         zh: '眼睛',   emoji: '👀' } },
    { hira: 'も', kata: 'モ', romaji: 'mo',  word: { jp: 'もも',       reading: 'もも',       zh: '桃子',   emoji: '🍑' } },
  ],
  [
    { hira: 'や', kata: 'ヤ', romaji: 'ya',  word: { jp: 'やま',       reading: 'やま',       zh: '山',     emoji: '⛰️' } },
    null,
    { hira: 'ゆ', kata: 'ユ', romaji: 'yu',  word: { jp: 'ゆき',       reading: 'ゆき',       zh: '雪',     emoji: '☃️' } },
    null,
    { hira: 'よ', kata: 'ヨ', romaji: 'yo',  word: { jp: 'よる',       reading: 'よる',       zh: '晚上',   emoji: '🌃' } },
  ],
  [
    { hira: 'ら', kata: 'ラ', romaji: 'ra',  word: { jp: 'らっぱ',     reading: 'らっぱ',     zh: '喇叭',   emoji: '🎺' } },
    { hira: 'り', kata: 'リ', romaji: 'ri',  word: { jp: 'りんご',     reading: 'りんご',     zh: '蘋果',   emoji: '🍎' } },
    { hira: 'る', kata: 'ル', romaji: 'ru',  word: { jp: 'るすばん',   reading: 'るすばん',   zh: '看家',   emoji: '🏠' } },
    { hira: 'れ', kata: 'レ', romaji: 're',  word: { jp: 'れいぞうこ', reading: 'れいぞうこ', zh: '冰箱',   emoji: '🧊' } },
    { hira: 'ろ', kata: 'ロ', romaji: 'ro',  word: { jp: 'ろうそく',   reading: 'ろうそく',   zh: '蠟燭',   emoji: '🕯️' } },
  ],
  [
    { hira: 'わ', kata: 'ワ', romaji: 'wa',  word: { jp: 'わに',       reading: 'わに',       zh: '鱷魚',   emoji: '🐊' } },
    null, null, null,
    { hira: 'を', kata: 'ヲ', romaji: 'o',   word: { jp: 'ほんをよむ', reading: 'ほんをよむ', zh: '讀書（を是助詞）', emoji: '📖' } },
  ],
  [
    { hira: 'ん', kata: 'ン', romaji: 'n',   word: { jp: 'ぱん',       reading: 'ぱん',       zh: '麵包（ん不放字首）', emoji: '🍞' } },
    null, null, null, null,
  ],
];

/* 攤平的假名清單（遊戲出題用） */
const KANA_LIST = KANA_ROWS.flat().filter(Boolean);

/* =========================================================
 * 主題單字卡
 * alt：語音辨識可能回傳的其他寫法（漢字等），跟讀模式比對用
 * ========================================================= */
const DECKS = [
  {
    id: 'sumikko',
    name: '角落生物的世界',
    emoji: '🐻‍❄️',
    desc: 'すみっコぐらし常見的單字',
    words: [
      { jp: 'しろくま',   reading: 'しろくま',   zh: '白熊',       emoji: '🐻‍❄️', alt: ['白熊', 'シロクマ', '白くま'] },
      { jp: 'ねこ',       reading: 'ねこ',       zh: '貓咪',       emoji: '🐈',   alt: ['猫', 'ネコ'] },
      { jp: 'とんかつ',   reading: 'とんかつ',   zh: '炸豬排',     emoji: '🍖',   alt: ['トンカツ', '豚カツ', '豚かつ'] },
      { jp: 'とかげ',     reading: 'とかげ',     zh: '蜥蜴',       emoji: '🦎',   alt: ['トカゲ', '蜥蜴'] },
      { jp: 'ぺんぎん',   reading: 'ぺんぎん',   zh: '企鵝',       emoji: '🐧',   alt: ['ペンギン'] },
      { jp: 'えびふらい', reading: 'えびふらい', zh: '炸蝦',       emoji: '🍤',   alt: ['エビフライ', '海老フライ'] },
      { jp: 'ざっそう',   reading: 'ざっそう',   zh: '雜草',       emoji: '🌱',   alt: ['雑草'] },
      { jp: 'ほこり',     reading: 'ほこり',     zh: '灰塵',       emoji: '💨',   alt: ['埃', 'ホコリ'] },
      { jp: 'たぴおか',   reading: 'たぴおか',   zh: '珍珠（粉圓）', emoji: '🧋', alt: ['タピオカ'] },
      { jp: 'すみっこ',   reading: 'すみっこ',   zh: '角落',       emoji: '📦',   alt: ['隅っこ', 'すみっコ'] },
      { jp: 'かわいい',   reading: 'かわいい',   zh: '可愛',       emoji: '💕',   alt: ['可愛い'] },
      { jp: 'ともだち',   reading: 'ともだち',   zh: '朋友',       emoji: '👫',   alt: ['友達', '友だち'] },
      { jp: 'おにぎり',   reading: 'おにぎり',   zh: '飯糰',       emoji: '🍙',   alt: ['お握り', 'オニギリ'] },
      { jp: 'おちゃ',     reading: 'おちゃ',     zh: '茶',         emoji: '🍵',   alt: ['お茶'] },
    ],
  },
  {
    id: 'obake',
    name: '幽靈的世界',
    emoji: '👻',
    desc: 'おばけ繪本常見的單字',
    words: [
      { jp: 'おばけ',     reading: 'おばけ',     zh: '幽靈',       emoji: '👻',  alt: ['お化け', 'オバケ'] },
      { jp: 'こわい',     reading: 'こわい',     zh: '好可怕',     emoji: '😱',  alt: ['怖い', '恐い'] },
      { jp: 'よる',       reading: 'よる',       zh: '晚上',       emoji: '🌙',  alt: ['夜'] },
      { jp: 'まっくら',   reading: 'まっくら',   zh: '一片漆黑',   emoji: '🌑',  alt: ['真っ暗'] },
      { jp: 'おつきさま', reading: 'おつきさま', zh: '月亮公公',   emoji: '🌕',  alt: ['お月様', 'お月さま'] },
      { jp: 'ほしぞら',   reading: 'ほしぞら',   zh: '星空',       emoji: '✨',  alt: ['星空'] },
      { jp: 'びっくり',   reading: 'びっくり',   zh: '嚇一跳',     emoji: '😲',  alt: ['ビックリ', 'びっくりした'] },
      { jp: 'かくれんぼ', reading: 'かくれんぼ', zh: '捉迷藏',     emoji: '🙈',  alt: ['隠れんぼ'] },
      { jp: 'ばける',     reading: 'ばける',     zh: '變身',       emoji: '✨',  alt: ['化ける'] },
      { jp: 'ふしぎ',     reading: 'ふしぎ',     zh: '不可思議',   emoji: '🔮',  alt: ['不思議'] },
      { jp: 'なかよし',   reading: 'なかよし',   zh: '感情很好',   emoji: '🤝',  alt: ['仲良し'] },
    ],
  },
  {
    id: 'giongo',
    name: '狀聲詞・擬態語',
    emoji: '💥',
    desc: '繪本圖旁邊的小字最常出現！',
    words: [
      { jp: 'ドキドキ', reading: 'どきどき', zh: '心跳撲通撲通（緊張）', emoji: '💓', alt: ['どきどき'] },
      { jp: 'ワクワク', reading: 'わくわく', zh: '好期待、好興奮',       emoji: '🤩', alt: ['わくわく'] },
      { jp: 'ふわふわ', reading: 'ふわふわ', zh: '軟綿綿',               emoji: '☁️', alt: ['フワフワ'] },
      { jp: 'ぴかぴか', reading: 'ぴかぴか', zh: '亮晶晶',               emoji: '✨', alt: ['ピカピカ'] },
      { jp: 'きらきら', reading: 'きらきら', zh: '閃閃發光',             emoji: '🌟', alt: ['キラキラ'] },
      { jp: 'ぺこぺこ', reading: 'ぺこぺこ', zh: '肚子好餓',             emoji: '🍽️', alt: ['ペコペコ'] },
      { jp: 'すやすや', reading: 'すやすや', zh: '睡得香甜',             emoji: '😴', alt: ['スヤスヤ'] },
      { jp: 'にこにこ', reading: 'にこにこ', zh: '笑瞇瞇',               emoji: '😊', alt: ['ニコニコ'] },
      { jp: 'ごろごろ', reading: 'ごろごろ', zh: '滾來滾去',             emoji: '🐱', alt: ['ゴロゴロ'] },
      { jp: 'もぐもぐ', reading: 'もぐもぐ', zh: '大口大口吃',           emoji: '🍙', alt: ['モグモグ'] },
      { jp: 'しくしく', reading: 'しくしく', zh: '啜泣、小聲哭',         emoji: '😢', alt: ['シクシク'] },
      { jp: 'ぶるぶる', reading: 'ぶるぶる', zh: '發抖',                 emoji: '🥶', alt: ['ブルブル'] },
    ],
  },
  {
    id: 'travel',
    name: '去日本玩',
    emoji: '✈️',
    desc: '旅行時用得到的話',
    words: [
      { jp: 'こんにちは',   reading: 'こんにちは',   zh: '你好',        emoji: '👋', alt: ['今日は'] },
      { jp: 'ありがとう',   reading: 'ありがとう',   zh: '謝謝',        emoji: '🙏', alt: ['有難う', 'ありがとうございます'] },
      { jp: 'すみません',   reading: 'すみません',   zh: '不好意思',    emoji: '🙇', alt: [] },
      { jp: 'おはよう',     reading: 'おはよう',     zh: '早安',        emoji: '☀️', alt: ['おはようございます'] },
      { jp: 'おやすみ',     reading: 'おやすみ',     zh: '晚安',        emoji: '🌙', alt: ['お休み', 'おやすみなさい'] },
      { jp: 'おいしい',     reading: 'おいしい',     zh: '好吃',        emoji: '😋', alt: ['美味しい'] },
      { jp: 'トイレ',       reading: 'といれ',       zh: '廁所',        emoji: '🚻', alt: ['toilet'] },
      { jp: 'でんしゃ',     reading: 'でんしゃ',     zh: '電車',        emoji: '🚃', alt: ['電車'] },
      { jp: 'これください', reading: 'これください', zh: '請給我這個',  emoji: '🛍️', alt: ['これ下さい'] },
      { jp: 'いくらですか', reading: 'いくらですか', zh: '多少錢？',    emoji: '💰', alt: ['幾らですか'] },
      { jp: 'だいじょうぶ', reading: 'だいじょうぶ', zh: '沒關係、沒問題', emoji: '👌', alt: ['大丈夫'] },
      { jp: 'たのしい',     reading: 'たのしい',     zh: '好開心',      emoji: '🎉', alt: ['楽しい'] },
    ],
  },
];

/* 稱讚語（答對／跟讀成功時隨機出現） */
const PRAISES = [
  { jp: 'すごい！',     zh: '好厲害！' },
  { jp: 'じょうず！',   zh: '唸得真好！' },
  { jp: 'やったね！',   zh: '太棒了！' },
  { jp: 'せいかい！',   zh: '答對了！' },
  { jp: 'パーフェクト！', zh: '完美！' },
  { jp: 'いいね！',     zh: '很讚喔！' },
];
