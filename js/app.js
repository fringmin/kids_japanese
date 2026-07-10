/* =========================================================
 * app.js — 畫面切換、玩家檔案、三個測驗遊戲、跟讀模式
 * ========================================================= */

/* ---------- 玩家檔案（localStorage） ---------- */
const STORE_KEY = 'knj.v1';

const DEFAULT_PROFILES = [
  { id: 1, name: '姊姊', avatar: '🌸', stars: 0, score: 0, best: {}, learnedKana: [], learnedWords: [] },
  { id: 2, name: '妹妹', avatar: '🐥', stars: 0, score: 0, best: {}, learnedKana: [], learnedWords: [] },
];

let store = loadStore();
let profile = null; // 目前玩家

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.profiles) && parsed.profiles.length === 2) return parsed;
    }
  } catch (e) { /* 資料壞掉就重來 */ }
  return { profiles: JSON.parse(JSON.stringify(DEFAULT_PROFILES)), current: null };
}

function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* 私密模式可能失敗 */ }
}

/* ---------- 小工具 ---------- */
const $ = id => document.getElementById(id);
const shuffle = arr => arr.slice().sort(() => Math.random() - 0.5);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

function showPraise() {
  const p = pick(PRAISES);
  const pop = $('praise-pop');
  pop.innerHTML = `${p.jp}<small>${p.zh}</small>`;
  pop.classList.remove('hidden');
  setTimeout(() => pop.classList.add('hidden'), 1100);
}

/* ---------- 畫面切換 ---------- */
const SCREENS = ['profile', 'home', 'kana', 'decks', 'cards', 'quiz', 'speak', 'result'];
let backTarget = null; // 目前畫面按「返回」要去哪

function show(name, { title = 'こどもにほんご', back = null } = {}) {
  SCREENS.forEach(s => $('screen-' + s).classList.toggle('hidden', s !== name));
  backTarget = back;
  $('topbar').classList.toggle('hidden', name === 'profile');
  $('btn-back').classList.toggle('hidden', !back);
  $('topbar-title').textContent = title;
  updateChip();
  window.scrollTo(0, 0);
}

function updateChip() {
  if (!profile) return;
  $('chip-avatar').textContent = profile.avatar;
  $('chip-stars').textContent = '⭐' + profile.stars;
}

$('btn-back').addEventListener('click', () => { if (backTarget) backTarget(); });
$('btn-profile').addEventListener('click', renderProfileSelect);

/* ---------- 選玩家畫面 ---------- */
function renderProfileSelect() {
  const list = $('profile-list');
  list.innerHTML = '';
  store.profiles.forEach(p => {
    const card = document.createElement('button');
    card.className = 'profile-card';
    card.innerHTML = `
      <span class="profile-avatar">${p.avatar}</span>
      <span class="profile-name">${p.name}</span>
      <div class="profile-stars">⭐ ${p.stars}　🏅 ${p.score}分</div>
      <div class="profile-edit">✏️ 改名字</div>`;
    card.addEventListener('click', e => {
      if (e.target.classList.contains('profile-edit')) { renameProfile(p, card); return; }
      profile = p;
      store.current = p.id;
      saveStore();
      goHome();
    });
    list.appendChild(card);
  });
  show('profile');
}

function renameProfile(p, card) {
  const nameEl = card.querySelector('.profile-name');
  const input = document.createElement('input');
  input.className = 'profile-rename';
  input.value = p.name;
  input.maxLength = 8;
  nameEl.replaceWith(input);
  input.focus();
  const done = () => {
    p.name = input.value.trim() || p.name;
    saveStore();
    renderProfileSelect();
  };
  input.addEventListener('blur', done);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') input.blur(); });
}

/* ---------- 主選單 ---------- */
function goHome() {
  $('home-stats').innerHTML =
    `${profile.avatar} <b>${profile.name}</b>　⭐ ${profile.stars} 顆星　🏅 ${profile.score} 分<br>` +
    `已認識假名 ${profile.learnedKana.length}/${KANA_LIST.length}　已學單字 ${profile.learnedWords.length} 個`;
  show('home', { title: `${profile.avatar} ${profile.name}` });
}

document.querySelectorAll('.menu-card').forEach(btn => {
  btn.addEventListener('click', () => {
    const go = btn.dataset.go;
    if (go === 'kana') renderKanaChart();
    else if (go === 'quiz-kana-listen') startQuiz('kana-listen');
    else if (go === 'quiz-kana-match') startQuiz('kana-match');
    else if (go === 'decks-cards') renderDecks('cards');
    else if (go === 'decks-listen') renderDecks('listen');
    else if (go === 'decks-speak') renderDecks('speak');
  });
});

/* ---------- 50 音表 ---------- */
let kanaTab = 'hira';

function renderKanaChart() {
  const grid = $('kana-grid');
  grid.innerHTML = '';
  const learned = new Set(profile.learnedKana);
  KANA_ROWS.forEach(row => {
    row.forEach(cell => {
      const el = document.createElement('button');
      if (!cell) {
        el.className = 'kana-cell empty';
      } else {
        const char = kanaTab === 'hira' ? cell.hira : cell.kata;
        el.className = 'kana-cell' + (learned.has(cell.hira) ? ' learned' : '');
        el.innerHTML = `<span class="kana-char">${char}</span><span class="kana-romaji">${cell.romaji}</span>`;
        el.addEventListener('click', () => {
          Speech.speak(cell.hira);
          showKanaDetail(cell);
        });
      }
      grid.appendChild(el);
    });
  });
  $('kana-detail').classList.add('hidden');
  show('kana', { title: '50音表', back: goHome });
}

document.querySelectorAll('[data-kanatab]').forEach(tab => {
  tab.addEventListener('click', () => {
    kanaTab = tab.dataset.kanatab;
    document.querySelectorAll('[data-kanatab]').forEach(t => t.classList.toggle('active', t === tab));
    renderKanaChart();
  });
});

function showKanaDetail(cell) {
  const d = $('kana-detail');
  d.innerHTML = `
    <span class="kd-emoji">${Art.html(cell.word)}</span>
    <span>
      <div class="kd-word">${cell.word.jp}</div>
      <div class="kd-zh">${cell.word.zh}</div>
    </span>
    <button class="icon-btn kd-play">🔊</button>`;
  d.classList.remove('hidden');
  d.querySelector('.kd-play').addEventListener('click', e => {
    e.stopPropagation();
    Speech.speak(cell.word.jp);
  });
  d.onclick = () => Speech.speak(cell.word.jp);
}

/* ---------- 單字主題選單（單字卡 / 聽力 / 跟讀 共用） ---------- */
const DECK_MODE_INFO = {
  cards:  { hint: '選一個主題，翻翻單字卡！', title: '單字卡' },
  listen: { hint: '選一個主題，聽聲音找圖！', title: '聽單字選圖' },
  speak:  { hint: '選一個主題，換你唸日文！', title: '跟著唸' },
};

function renderDecks(mode) {
  const info = DECK_MODE_INFO[mode];
  $('decks-hint').textContent = info.hint;
  const list = $('deck-list');
  list.innerHTML = '';
  DECKS.forEach(deck => {
    const btn = document.createElement('button');
    btn.className = 'deck-card';
    btn.innerHTML = `
      <span class="deck-emoji">${Art.deckIcon(deck)}</span>
      <span>
        <div class="deck-name">${deck.name}</div>
        <div class="deck-desc">${deck.desc}（${deck.words.length} 個字）</div>
      </span>`;
    btn.addEventListener('click', () => {
      if (mode === 'cards') startCards(deck);
      else if (mode === 'listen') startQuiz('word-listen', deck);
      else startSpeak(deck);
    });
    list.appendChild(btn);
  });
  show('decks', { title: info.title, back: goHome });
}

/* ---------- 單字卡 ---------- */
let cardsDeck = null;
let cardIndex = 0;

function startCards(deck) {
  cardsDeck = deck;
  cardIndex = 0;
  renderCard();
  show('cards', { title: deck.name, back: () => renderDecks('cards') });
  Speech.speak(deck.words[0].jp);
}

function renderCard() {
  const w = cardsDeck.words[cardIndex];
  $('fc-emoji').innerHTML = Art.html(w);
  $('fc-jp').textContent = w.jp;
  $('fc-reading').textContent = w.jp === w.reading ? '' : w.reading;
  $('fc-zh').textContent = w.zh;
  $('fc-count').textContent = `${cardIndex + 1} / ${cardsDeck.words.length}`;
}

$('flashcard').addEventListener('click', () => Speech.speak(cardsDeck.words[cardIndex].jp));
$('fc-prev').addEventListener('click', () => {
  cardIndex = (cardIndex - 1 + cardsDeck.words.length) % cardsDeck.words.length;
  renderCard();
  Speech.speak(cardsDeck.words[cardIndex].jp);
});
$('fc-next').addEventListener('click', () => {
  cardIndex = (cardIndex + 1) % cardsDeck.words.length;
  renderCard();
  Speech.speak(cardsDeck.words[cardIndex].jp);
});

/* ---------- 測驗引擎（聽音選字 / 平片配對 / 聽單字選圖） ---------- */
const QUIZ_LEN = 10;
let quiz = null; // { mode, deck, questions, index, score, streak, correctCount }

const QUIZ_TITLES = { 'kana-listen': '聽音選字', 'kana-match': '平片配對', 'word-listen': '聽單字選圖' };

function startQuiz(mode, deck = null) {
  quiz = { mode, deck, index: 0, score: 0, streak: 0, correctCount: 0, questions: buildQuestions(mode, deck) };
  show('quiz', {
    title: QUIZ_TITLES[mode],
    back: deck ? () => renderDecks('listen') : goHome,
  });
  renderQuestion();
}

function buildQuestions(mode, deck) {
  if (mode === 'word-listen') {
    const words = shuffle(deck.words).slice(0, QUIZ_LEN);
    return words.map(w => ({
      word: w,
      choices: shuffle([w, ...shuffle(deck.words.filter(x => x !== w)).slice(0, 3)]),
    }));
  }
  const kanas = shuffle(KANA_LIST).slice(0, QUIZ_LEN);
  return kanas.map(k => ({
    kana: k,
    choices: shuffle([k, ...shuffle(KANA_LIST.filter(x => x !== k)).slice(0, 3)]),
  }));
}

function renderQuestion() {
  const q = quiz.questions[quiz.index];
  $('quiz-progress').textContent = `第 ${quiz.index + 1} / ${quiz.questions.length} 題`;
  $('quiz-score').textContent = `${quiz.score} 分`;
  $('quiz-feedback').textContent = '';
  const prompt = $('quiz-prompt');
  const choices = $('quiz-choices');
  choices.innerHTML = '';

  if (quiz.mode === 'kana-listen' || quiz.mode === 'word-listen') {
    // 播聲音 → 選答案
    const speakIt = () => Speech.speak(quiz.mode === 'kana-listen' ? q.kana.hira : q.word.jp);
    prompt.innerHTML = `<button class="play-big">🔊</button><div class="qp-hint">聽聽看，然後選出正確答案（可以再按一次重聽）</div>`;
    prompt.querySelector('.play-big').addEventListener('click', speakIt);
    setTimeout(speakIt, 350);
  } else {
    // 平片配對：看平假名選片假名
    prompt.innerHTML = `<div class="qp-big">${q.kana.hira}</div><div class="qp-hint">這個平假名的片假名朋友是哪一個？</div>`;
    Speech.speak(q.kana.hira);
  }

  q.choices.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    if (quiz.mode === 'kana-listen') btn.textContent = c.hira;
    else if (quiz.mode === 'kana-match') btn.textContent = c.kata;
    else btn.innerHTML = `${Art.html(c)}<small>${c.zh}</small>`;
    btn.addEventListener('click', () => answer(btn, c, q));
    choices.appendChild(btn);
  });
}

function answer(btn, chosen, q) {
  const target = quiz.mode === 'word-listen' ? q.word : q.kana;
  const correct = chosen === target;
  document.querySelectorAll('.choice-btn').forEach(b => (b.disabled = true));

  if (correct) {
    btn.classList.add('correct');
    quiz.streak += 1;
    quiz.correctCount += 1;
    let gain = 10;
    if (quiz.streak >= 3) gain += 5; // 連續答對加成
    quiz.score += gain;
    $('quiz-feedback').textContent = quiz.streak >= 3 ? `⭐ 連續答對！+${gain} 分` : `+${gain} 分`;
    showPraise();
    // 記錄「已認識」
    if (quiz.mode === 'word-listen') markLearnedWord(target.jp);
    else markLearnedKana(target.hira);
  } else {
    btn.classList.add('wrong');
    quiz.streak = 0;
    // 把正確的亮出來，順便再唸一次
    document.querySelectorAll('.choice-btn').forEach((b, i) => {
      if (q.choices[i] === target) b.classList.add('correct');
    });
    $('quiz-feedback').textContent = '差一點！聽聽正確答案～';
    Speech.speak(quiz.mode === 'word-listen' ? target.jp : target.hira);
  }
  $('quiz-score').textContent = `${quiz.score} 分`;

  setTimeout(() => {
    quiz.index += 1;
    if (quiz.index < quiz.questions.length) renderQuestion();
    else finishQuiz();
  }, correct ? 1200 : 2000);
}

function finishQuiz() {
  const ratio = quiz.correctCount / quiz.questions.length;
  const stars = ratio >= 0.99 ? 3 : ratio >= 0.7 ? 2 : 1;
  awardAndShowResult({
    stars,
    score: quiz.score,
    modeKey: quiz.mode + (quiz.deck ? ':' + quiz.deck.id : ''),
    msg: `答對 ${quiz.correctCount} / ${quiz.questions.length} 題`,
    again: () => startQuiz(quiz.mode, quiz.deck),
  });
}

/* ---------- 已學記錄 ---------- */
function markLearnedKana(hira) {
  if (!profile.learnedKana.includes(hira)) profile.learnedKana.push(hira);
}
function markLearnedWord(jp) {
  if (!profile.learnedWords.includes(jp)) profile.learnedWords.push(jp);
}

/* ---------- 結果畫面 ---------- */
function awardAndShowResult({ stars, score, modeKey, msg, again }) {
  profile.stars += stars;
  profile.score += score;
  const prevBest = profile.best[modeKey] || 0;
  const isNewBest = score > prevBest;
  if (isNewBest) profile.best[modeKey] = score;
  saveStore();

  $('result-stars').innerHTML = '<span class="star">⭐</span>'.repeat(stars);
  $('result-score').textContent = `+${score} 分`;
  $('result-msg').innerHTML = msg + (isNewBest ? '<br>🎉 新的最高分！' : `<br>最高分：${Math.max(prevBest, score)}`);
  $('result-again').onclick = again;
  show('result', { title: '結果發表！' });
  Speech.speak(stars === 3 ? 'パーフェクト！すごい！' : 'よくできました！');
}

$('result-home').addEventListener('click', goHome);

/* ---------- 跟讀模式（Speak 式） ---------- */
const SPEAK_LEN = 8;
let sp = null; // { deck, words, index, score, okCount, canRecognize }

function startSpeak(deck) {
  sp = {
    deck,
    words: shuffle(deck.words).slice(0, SPEAK_LEN),
    index: 0,
    score: 0,
    okCount: 0,
    canRecognize: Recognition.available(),
  };
  show('speak', { title: '跟著唸 🎤', back: () => renderDecks('speak') });
  renderSpeakWord();
}

function renderSpeakWord() {
  const w = sp.words[sp.index];
  $('speak-progress').textContent = `第 ${sp.index + 1} / ${sp.words.length} 個`;
  $('speak-score').textContent = `${sp.score} 分`;
  $('sp-emoji').innerHTML = Art.html(w);
  $('sp-jp').textContent = w.jp;
  $('sp-reading').textContent = w.jp === w.reading ? '' : w.reading;
  $('sp-zh').textContent = w.zh;
  $('speak-status').textContent = sp.canRecognize
    ? '先按 🔊 聽一次，再按 🎤 換你唸！'
    : '先按 🔊 聽一次，再按 🎤 錄下你唸的（會放給你聽）';
  $('sp-mic').classList.remove('recording');
  $('sp-mic').disabled = false;
  $('sp-next').classList.add('hidden');
  $('sp-selfpass').classList.add('hidden');
  setTimeout(() => Speech.speak(w.jp), 350);
}

$('sp-play').addEventListener('click', () => Speech.speak(sp.words[sp.index].jp));

$('sp-mic').addEventListener('click', async () => {
  const w = sp.words[sp.index];
  const mic = $('sp-mic');
  mic.disabled = true;

  if (sp.canRecognize) {
    $('speak-status').textContent = '準備好…';
    const result = await Recognition.listen(w, {
      onStart: () => {
        mic.classList.add('recording');
        $('speak-status').textContent = `大聲唸出「${w.jp}」！`;
      },
    });
    mic.classList.remove('recording');

    if (result.ok) {
      speakSuccess(20);
    } else if (result.error === 'not-allowed' || result.error === 'service-not-allowed') {
      // 沒麥克風權限 → 之後都改用自評
      sp.canRecognize = false;
      $('speak-status').textContent = '沒辦法用麥克風，那就自己大聲唸三次吧！';
      $('sp-selfpass').classList.remove('hidden');
      mic.disabled = false;
    } else {
      $('speak-status').textContent = result.transcript
        ? `我聽到「${result.transcript}」，再試一次？`
        : '沒聽清楚，再唸一次試試看！';
      $('sp-selfpass').classList.remove('hidden');
      mic.disabled = false;
    }
  } else {
    // 退路：錄音回放
    const r = await Recognition.recordAndPlayback({
      onRecording: () => {
        mic.classList.add('recording');
        $('speak-status').textContent = `現在唸「${w.jp}」！（錄 3 秒）`;
      },
      onPlayback: () => {
        mic.classList.remove('recording');
        $('speak-status').textContent = '聽聽看你唸的～';
      },
    });
    mic.classList.remove('recording');
    $('speak-status').textContent = r.ok ? '唸得像嗎？像的話按下面過關！' : '錄音沒成功，直接大聲唸三次吧!';
    $('sp-selfpass').classList.remove('hidden');
    mic.disabled = false;
  }
});

$('sp-selfpass').addEventListener('click', () => speakSuccess(10));

function speakSuccess(points) {
  const w = sp.words[sp.index];
  sp.score += points;
  sp.okCount += 1;
  markLearnedWord(w.jp);
  $('speak-score').textContent = `${sp.score} 分`;
  $('speak-status').textContent = points >= 20 ? '🎉 唸對了！' : '👍 有練到就很棒！';
  showPraise();
  $('sp-mic').disabled = true;
  $('sp-selfpass').classList.add('hidden');
  $('sp-next').classList.remove('hidden');
}

$('sp-next').addEventListener('click', () => {
  sp.index += 1;
  if (sp.index < sp.words.length) renderSpeakWord();
  else {
    const maxScore = sp.words.length * 20;
    const ratio = sp.score / maxScore;
    const stars = ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : 1;
    awardAndShowResult({
      stars,
      score: sp.score,
      modeKey: 'speak:' + sp.deck.id,
      msg: `完成 ${sp.okCount} / ${sp.words.length} 個跟讀`,
      again: () => startSpeak(sp.deck),
    });
  }
});

/* ---------- 啟動 ---------- */
document.addEventListener('pointerdown', () => Speech.unlock(), { once: true });

(function init() {
  const remembered = store.profiles.find(p => p.id === store.current);
  if (remembered) {
    profile = remembered;
    goHome();
  } else {
    renderProfileSelect();
  }
})();
