/* =========================================================
 * speech.js — 發音模組（可抽換）
 * 目前用 Web Speech API 呼叫裝置內建日文語音（iOS: Kyoko 等）。
 * 之後若要換成預錄音檔，只需改寫 Speech.speak() 的實作。
 * ========================================================= */

const Speech = (() => {
  let jaVoice = null;

  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;
    // 優先挑日文語音；iOS 上通常是 Kyoko
    jaVoice =
      voices.find(v => v.lang === 'ja-JP' && /kyoko/i.test(v.name)) ||
      voices.find(v => v.lang === 'ja-JP') ||
      voices.find(v => v.lang.startsWith('ja')) ||
      null;
  }

  if ('speechSynthesis' in window) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  /** 唸出日文文字。rate 預設稍慢，適合小孩聽 */
  function speak(text, { rate = 0.85 } = {}) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // 避免排隊疊音
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      if (!jaVoice) pickVoice();
      if (jaVoice) u.voice = jaVoice;
      u.rate = rate;
      u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) {
      console.warn('speak failed', e);
    }
  }

  /** iOS 需要在使用者手勢中先「解鎖」一次語音 */
  let unlocked = false;
  function unlock() {
    if (unlocked || !('speechSynthesis' in window)) return;
    unlocked = true;
    try {
      const u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    } catch (e) { /* 沒關係，第一次點按鈕時仍會發聲 */ }
  }

  return { speak, unlock };
})();
