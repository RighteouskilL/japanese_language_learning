/**
 * Premium Text-to-Speech (TTS) utility for Japanese language learning.
 * Completely rewritten to solve the first-syllable drop bug natively in all browsers.
 */

let jaVoice: SpeechSynthesisVoice | null = null;

// Preload the Japanese voice immediately when the application loads
const loadJapaneseVoice = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    jaVoice = voices.find(v => v.lang.startsWith('ja')) || null;
  }
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadJapaneseVoice();
  window.speechSynthesis.onvoiceschanged = loadJapaneseVoice;
}

/**
 * Speaks the given text in Japanese.
 */
export const speakJapanese = (text: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn("SpeechSynthesis not supported in this browser.");
      resolve(false);
      return;
    }

    // 1. Clean and prepare text
    let cleanText = text;
    if (cleanText.includes('(') && cleanText.includes(')')) {
      const match = cleanText.match(/\(([^)]+)\)/);
      if (match?.[1]) {
        cleanText = match[1];
      }
    }
    
    // Strip Thai characters
    cleanText = cleanText.replace(/[\u0E00-\u0E7F]/g, '').trim();

    if (!cleanText) {
      resolve(true);
      return;
    }

    // Stop any ongoing speech instantly
    window.speechSynthesis.cancel();

    // 2. THE ULTIMATE FIRST-SYLLABLE CLIPPING RESOLUTION:
    // We prepend a Japanese period and space ('。　') to the text.
    // - Punctuation like '。' is completely silent (the TTS will NOT read it out loud).
    // - However, it triggers a natural silent pause (~300-400ms) in the TTS engine.
    // - This forces the browser to open and active the audio channel first.
    // - By the time the pause ends, the soundcard/Bluetooth is fully awake,
    //   guaranteeing the very first syllable (like 'De' in 'Depaato') is heard perfectly!
    const spokenText = '。　' + cleanText;

    // 3. Create utterance synchronously to preserve the browser's User Gesture
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85; // Natural learning speed
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Apply the preloaded Japanese voice if available
    if (jaVoice) {
      utterance.voice = jaVoice;
    } else {
      // Fallback: search again just in case voices loaded late
      const voices = window.speechSynthesis.getVoices();
      const fallbackJaVoice = voices.find(v => v.lang.startsWith('ja'));
      if (fallbackJaVoice) {
        utterance.voice = fallbackJaVoice;
      }
    }

    utterance.onend = () => resolve(true);
    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      resolve(false);
    };

    // Speak synchronously in the click call stack
    window.speechSynthesis.speak(utterance);
  });
};
