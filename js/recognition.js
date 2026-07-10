/* =========================================================
 * recognition.js — 跟讀模式的語音輸入模組
 * 首選：Web Speech API 語音辨識（ja-JP，iOS 走 Siri 伺服器、需網路）
 * 退路：MediaRecorder 錄 3 秒回放，讓小孩自己聽自己唸的
 * ========================================================= */

const Recognition = (() => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  function available() {
    return !!SR;
  }

  /* 片假名 → 平假名，並拿掉空白與標點，方便寬鬆比對 */
  function normalize(text) {
    if (!text) return '';
    return text
      .replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60))
      .replace(/[\s、。！？!?.･・「」]/g, '')
      .toLowerCase();
  }

  /** 判斷辨識結果是否算唸對（鼓勵導向：寬鬆比對） */
  function matches(word, transcript) {
    const heard = normalize(transcript);
    if (!heard) return false;
    const targets = [word.jp, word.reading, ...(word.alt || [])].map(normalize);
    return targets.some(t => t && (heard.includes(t) || t.includes(heard)));
  }

  /**
   * 聽小孩唸一次。回傳 Promise：
   *   { ok: true,  transcript }  聽到而且唸對
   *   { ok: false, transcript }  聽到但比對不上
   *   { ok: false, error }       辨識失敗（無聲音／無網路／未授權）
   */
  function listen(word, { onStart } = {}) {
    return new Promise(resolve => {
      if (!SR) { resolve({ ok: false, error: 'unsupported' }); return; }
      const rec = new SR();
      rec.lang = 'ja-JP';
      rec.interimResults = false;
      rec.maxAlternatives = 5;
      let settled = false;
      const done = result => { if (!settled) { settled = true; resolve(result); } };

      rec.onstart = () => { if (onStart) onStart(); };
      rec.onresult = e => {
        const alts = Array.from(e.results[0]).map(r => r.transcript);
        const hit = alts.find(t => matches(word, t));
        done({ ok: !!hit, transcript: hit || alts[0] || '' });
      };
      rec.onerror = e => done({ ok: false, error: e.error });
      rec.onend = () => done({ ok: false, error: 'no-speech' });

      try { rec.start(); } catch (e) { done({ ok: false, error: 'start-failed' }); }

      // 安全網：10 秒沒結果就收工
      setTimeout(() => { try { rec.abort(); } catch (e) {} done({ ok: false, error: 'timeout' }); }, 10000);
    });
  }

  /**
   * 退路模式：錄 3 秒 → 自動回放，讓小孩自我比對
   * 回傳 Promise<{ ok: true } | { ok: false, error }>
   */
  async function recordAndPlayback({ onRecording, onPlayback } = {}) {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      return { ok: false, error: 'unsupported' };
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      return { ok: false, error: 'mic-denied' };
    }
    return new Promise(resolve => {
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/mp4' });
        const audio = new Audio(URL.createObjectURL(blob));
        if (onPlayback) onPlayback();
        audio.onended = () => resolve({ ok: true });
        audio.onerror = () => resolve({ ok: false, error: 'playback-failed' });
        audio.play().catch(() => resolve({ ok: false, error: 'playback-failed' }));
      };
      if (onRecording) onRecording();
      recorder.start();
      setTimeout(() => { if (recorder.state !== 'inactive') recorder.stop(); }, 3000);
    });
  }

  return { available, listen, recordAndPlayback, matches, normalize };
})();
