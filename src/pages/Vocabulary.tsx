import { useState, useEffect, useRef } from 'react';
import { Volume2, RefreshCw, GraduationCap, Award, HelpCircle, Search, Key, Sparkles, Plus, Trash2, ChevronDown, ChevronUp, Star, BookOpen } from 'lucide-react';
import { vocabData } from '../data/vocab';
import type { VocabItem } from '../data/vocab';
import { speakJapanese } from '../utils/speech';

export default function Vocabulary() {
  // Vocabulary items (loaded from offline database + localStorage custom items)
  const [localVocab, setLocalVocab] = useState<VocabItem[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  
  // Navigation & UI States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLevel, setActiveLevel] = useState<'all' | 'N5' | 'N4' | 'N3' | 'custom'>('all');
  const [activePos, setActivePos] = useState<'all' | 'noun' | 'verb' | 'adjective' | 'adverb' | 'expression'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState<'dict' | 'list' | 'game'>('dict'); // Default to dict mode for the wow factor
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);
  
  // Gemini API States
  const [apiKey, setApiKey] = useState('');
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [apiStatus, setApiStatus] = useState<'idle' | 'success' | 'empty'>('idle');
  const [isSearchingAi, setIsSearchingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Manual Add Form States
  const [showManualForm, setShowManualForm] = useState(false);
  const [newWord, setNewWord] = useState({ word: '', reading: '', romaji: '', thai: '', category: 'general' as VocabItem['category'], pos: 'noun' as VocabItem['pos'] });
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 15;

  // Dictionary Specific States
  const [dictSearchQuery, setDictSearchQuery] = useState('');
  const [selectedDictWord, setSelectedDictWord] = useState<VocabItem | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Game States
  const [gameJapaneseWords, setGameJapaneseWords] = useState<VocabItem[]>([]);
  const [gameThaiWords, setGameThaiWords] = useState<VocabItem[]>([]);
  const [selectedJa, setSelectedJa] = useState<VocabItem | null>(null);
  const [selectedTh, setSelectedTh] = useState<VocabItem | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<{ jaId: string; thId: string } | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  // 1. Load data from local storage and combine with offline database
  useEffect(() => {
    // Load custom vocab
    const customItemsRaw = localStorage.getItem('nihongogo_custom_vocab');
    let customItems: VocabItem[] = [];
    if (customItemsRaw) {
      try {
        customItems = JSON.parse(customItemsRaw);
      } catch (e) {
        console.error("Failed to parse custom vocab", e);
      }
    }

    const combined = [...vocabData, ...customItems];
    setLocalVocab(combined);

    // Set initial dictionary word
    if (combined.length > 0) {
      setSelectedDictWord(combined[0]);
    }

    // Load bookmarks
    const savedBookmarks = localStorage.getItem('nihongogo_bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }

    // Load API Key
    const savedKey = localStorage.getItem('nihongogo_gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setApiStatus('success');
    }
  }, []);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync API Key state and localStorage
  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (key.trim()) {
      localStorage.setItem('nihongogo_gemini_api_key', key.trim());
      setApiStatus('success');
    } else {
      localStorage.removeItem('nihongogo_gemini_api_key');
      setApiStatus('idle');
    }
  };

  const handleSpeak = async (word: string) => {
    setSpeakingWord(word);
    await speakJapanese(word);
    setSpeakingWord(null);
  };

  // Toggle Bookmark status
  const toggleBookmark = (word: string) => {
    let updated: string[];
    if (bookmarks.includes(word)) {
      updated = bookmarks.filter(w => w !== word);
    } else {
      updated = [...bookmarks, word];
    }
    setBookmarks(updated);
    localStorage.setItem('nihongogo_bookmarks', JSON.stringify(updated));
  };

  // 2. Add word manually
  const handleAddManualWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.word || !newWord.thai) return;

    const newVocabItem: VocabItem = {
      word: newWord.word,
      reading: newWord.reading || newWord.word,
      romaji: newWord.romaji || '',
      thai: newWord.thai,
      category: newWord.category,
      level: 'custom',
      pos: newWord.pos
    };

    // Save to LocalStorage
    const customItemsRaw = localStorage.getItem('nihongogo_custom_vocab');
    let customItems: VocabItem[] = [];
    if (customItemsRaw) {
      try {
        customItems = JSON.parse(customItemsRaw);
      } catch (e) {}
    }
    const updatedCustom = [newVocabItem, ...customItems];
    localStorage.setItem('nihongogo_custom_vocab', JSON.stringify(updatedCustom));

    // Update State
    const combined = [...vocabData, ...updatedCustom];
    setLocalVocab(combined);
    
    // Set as active dictionary card
    setSelectedDictWord(newVocabItem);
    
    // Reset Form
    setNewWord({ word: '', reading: '', romaji: '', thai: '', category: 'general', pos: 'noun' });
    setShowManualForm(false);
  };

  // 3. Delete custom word
  const handleDeleteCustomWord = (wordToDelete: string) => {
    const customItemsRaw = localStorage.getItem('nihongogo_custom_vocab');
    let customItems: VocabItem[] = [];
    if (customItemsRaw) {
      try {
        customItems = JSON.parse(customItemsRaw);
      } catch (e) {}
    }
    const updatedCustom = customItems.filter(item => item.word !== wordToDelete);
    localStorage.setItem('nihongogo_custom_vocab', JSON.stringify(updatedCustom));

    const combined = [...vocabData, ...updatedCustom];
    setLocalVocab(combined);
    
    // Fallback dictionary card
    if (selectedDictWord?.word === wordToDelete && combined.length > 0) {
      setSelectedDictWord(combined[0]);
    }
  };

  // 4. Gemini AI Dictionary Lookup
  const handleAiLookup = async () => {
    const query = mode === 'dict' ? dictSearchQuery : searchQuery;
    if (!query.trim()) return;
    if (!apiKey) {
      setShowApiSettings(true);
      setAiError("กรุณาใส่ Google Gemini API Key ก่อนใช้งานระบบแปลด้วย AI ครับ (คุณสามารถสมัครรับ Key ฟรีได้)");
      return;
    }

    setIsSearchingAi(true);
    setAiError(null);

    const promptText = `
You are an expert Japanese-Thai dictionary translator. 
The user wants to look up the Japanese word or Thai word: "${query}".
Please translate and analyze this word. You MUST return ONLY a JSON object and nothing else. No markdown block, no additional explanation.
The JSON object must strictly match this TypeScript interface:
{
  "word": string, // The Japanese word in Kanji or Hiragana/Katakana (e.g. "猫" or "かんじ" or "食べる")
  "reading": string, // The Hiragana reading (e.g. "ねこ" or "かんじ" or "たべる")
  "romaji": string, // Romaji spelling (e.g. "neko" or "kanji" or "taberu")
  "thai": string, // Complete, natural Thai translation/meaning (e.g. "แมว" or "ตัวอักษรคันจิ" or "กิน")
  "category": "general" | "greetings" | "food" | "places" | "numbers" | "family" | "travel" | "shopping" | "emergency" | "time" | "verbs" | "adjectives", // Pick the most relevant category
  "level": "custom",
  "pos": "noun" | "verb" | "adjective" | "adverb" | "expression" // Must be one of these
}
Do not wrap the output in \`\`\`json or \`\`\` markdown blocks. Return only the raw JSON string. If you cannot find or translate the word, make a close educational guess based on standard vocabulary.
`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: promptText }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("ระบบ API ขัดข้อง กรุณาตรวจสอบอินเทอร์เน็ตหรือ API Key ของคุณครับ");
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Clean up potential markdown wrapper from AI output
      let cleanedJsonText = rawText.trim();
      if (cleanedJsonText.startsWith('```json')) {
        cleanedJsonText = cleanedJsonText.substring(7);
      }
      if (cleanedJsonText.startsWith('```')) {
        cleanedJsonText = cleanedJsonText.substring(3);
      }
      if (cleanedJsonText.endsWith('```')) {
        cleanedJsonText = cleanedJsonText.substring(0, cleanedJsonText.length - 3);
      }
      cleanedJsonText = cleanedJsonText.trim();

      const parsedWord: VocabItem = JSON.parse(cleanedJsonText);
      
      // Validate structure before saving
      if (!parsedWord.word || !parsedWord.thai) {
        throw new Error("AI ส่งข้อมูลผิดพลาด กรุณาลองค้นหาอีกครั้งด้วยคำอื่นครับ");
      }

      // Prepend to Custom Words in localStorage
      const customItemsRaw = localStorage.getItem('nihongogo_custom_vocab');
      let customItems: VocabItem[] = [];
      if (customItemsRaw) {
        try {
          customItems = JSON.parse(customItemsRaw);
        } catch (e) {}
      }

      // Check if word already exists in custom database
      if (!customItems.some(item => item.word === parsedWord.word)) {
        const updatedCustom = [parsedWord, ...customItems];
        localStorage.setItem('nihongogo_custom_vocab', JSON.stringify(updatedCustom));
        setLocalVocab([...vocabData, ...updatedCustom]);
      }
      
      // Select the AI translated word
      setSelectedDictWord(parsedWord);
      
      // Clear queries to reset active lists if switched
      setDictSearchQuery('');
      setSearchQuery('');
      setShowSuggestions(false);

      // Auto speak the newly searched word
      speakJapanese(parsedWord.word);

    } catch (e: any) {
      console.error(e);
      setAiError(e.message || "ล้มเหลวในการเชื่อมต่อกับ AI กรุณาตรวจสอบคีย์หรือลองใหม่อีกครั้งครับ");
    } finally {
      setIsSearchingAi(false);
    }
  };

  // 5. Vocabulary Filtering Logic
  const filteredVocab = localVocab.filter(item => {
    // 1. Level Filter
    if (activeLevel === 'custom') {
      // Include both manually added custom words AND bookmarked/starred words!
      return item.level === 'custom' || bookmarks.includes(item.word);
    }
    if (activeLevel !== 'all' && item.level !== activeLevel) return false;
    
    // 2. Category Filter
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;

    // 3. Part of Speech Filter
    if (activePos !== 'all' && item.pos !== activePos) return false;

    // 4. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        item.word.includes(q) ||
        item.reading.includes(q) ||
        item.romaji.toLowerCase().includes(q) ||
        item.thai.includes(q)
      );
    }

    return true;
  });

  // Autocomplete Suggestions Logic (Dictionary Mode)
  const getSuggestions = () => {
    if (!dictSearchQuery.trim()) return [];
    const q = dictSearchQuery.toLowerCase().trim();
    return localVocab.filter(item => 
      item.word.includes(q) ||
      item.reading.includes(q) ||
      item.romaji.toLowerCase().includes(q) ||
      item.thai.toLowerCase().includes(q)
    ).slice(0, 8);
  };

  const currentSuggestions = getSuggestions();

  // 6. Pagination Logic (List Mode)
  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = filteredVocab.slice(indexOfFirstWord, indexOfLastWord);
  const totalPages = Math.ceil(filteredVocab.length / wordsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeLevel, activePos, searchQuery]);

  // Categories helper
  const categories: { key: string; label: string }[] = [
    { key: 'all', label: '🗂️ ทั้งหมด' },
    { key: 'greetings', label: '👋 ทักทาย' },
    { key: 'food', label: '🍜 อาหาร' },
    { key: 'places', label: '🏢 สถานที่' },
    { key: 'travel', label: '✈️ เดินทาง' },
    { key: 'shopping', label: '🛍️ ช็อปปิ้ง' },
    { key: 'numbers', label: '🔢 ตัวเลข' },
    { key: 'family', label: '👨‍👩‍👦 ครอบครัว' },
    { key: 'emergency', label: '🚨 ฉุกเฉิน' },
    { key: 'time', label: '⏰ เวลา' },
    { key: 'verbs', label: '🏃 คำกริยา' },
    { key: 'adjectives', label: '✨ คุณศัพท์' }
  ];

  // Part of speech helper
  const partsOfSpeech: { key: typeof activePos; label: string }[] = [
    { key: 'all', label: 'ทุกชนิดคำ' },
    { key: 'noun', label: 'คำนาม (Noun)' },
    { key: 'verb', label: 'คำกริยา (Verb)' },
    { key: 'adjective', label: 'คุณศัพท์ (Adj)' },
    { key: 'adverb', label: 'วิเศษณ์ (Adv)' },
    { key: 'expression', label: 'สำนวน (Exp)' }
  ];

  // 7. Matching Game Logic
  const startMatchingGame = () => {
    // Generate pool from current active filters, fallback to N5 if current pool is small
    const pool = filteredVocab.length >= 5 ? filteredVocab : localVocab.filter(item => item.level === 'N5');
    const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);

    setGameJapaneseWords([...selected].sort(() => 0.5 - Math.random()));
    setGameThaiWords([...selected].sort(() => 0.5 - Math.random()));
    setSelectedJa(null);
    setSelectedTh(null);
    setMatchedIds([]);
    setWrongMatch(null);
    setGameScore(0);
    setGameFinished(false);
    setMode('game');
  };

  useEffect(() => {
    if (mode === 'game') {
      startMatchingGame();
    }
  }, [mode]);

  const handleSelectJa = (item: VocabItem) => {
    if (matchedIds.includes(item.word)) return;
    setSelectedJa(item);
    speakJapanese(item.word);
    checkMatch(item, selectedTh);
  };

  const handleSelectTh = (item: VocabItem) => {
    if (matchedIds.includes(item.word)) return;
    setSelectedTh(item);
    checkMatch(selectedJa, item);
  };

  const checkMatch = (ja: VocabItem | null, th: VocabItem | null) => {
    if (!ja || !th) return;

    if (ja.word === th.word) {
      setMatchedIds(prev => [...prev, ja.word]);
      setSelectedJa(null);
      setSelectedTh(null);
      setGameScore(prev => prev + 20);

      if (matchedIds.length + 1 === gameJapaneseWords.length) {
        setGameFinished(true);
      }
    } else {
      setWrongMatch({ jaId: ja.word, thId: th.word });
      setSelectedJa(null);
      setSelectedTh(null);
      setTimeout(() => {
        setWrongMatch(null);
      }, 1000);
    }
  };

  // Featured explore words for dictionary mode
  const featuredExploreWords = [
    { word: '猫', reading: 'ねこ', romaji: 'neko', thai: 'แมว', category: 'general', level: 'N5', pos: 'noun' },
    { word: 'お寿司', reading: 'おすし', romaji: 'osushi', thai: 'ซูชิ', category: 'food', level: 'N5', pos: 'noun' },
    { word: '美味しい', reading: 'おいしい', romaji: 'oishii', thai: 'อร่อย', category: 'adjectives', level: 'N5', pos: 'adjective' },
    { word: '調べる', reading: 'しらべる', romaji: 'shiraberu', thai: 'ตรวจสอบ / สำรวจ', category: 'verbs', level: 'N4', pos: 'verb' },
    { word: '新幹線', reading: 'しんかんせん', romaji: 'shinkansen', thai: 'รถไฟชินคันเซ็น', category: 'travel', level: 'N4', pos: 'noun' },
    { word: '久しぶり', reading: 'ひさしぶり', romaji: 'hisashiburi', thai: 'ไม่ได้เจอกันนานเลยนะ', category: 'greetings', level: 'N3', pos: 'expression' }
  ] as VocabItem[];

  // Related words recommendation (Dictionary mode)
  const getRelatedWords = () => {
    if (!selectedDictWord) return [];
    return localVocab.filter(item => 
      item.word !== selectedDictWord.word && 
      (item.category === selectedDictWord.category || item.level === selectedDictWord.level)
    ).sort(() => 0.5 - Math.random()).slice(0, 4);
  };

  const relatedWords = getRelatedWords();

  return (
    <div className="container animate-fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ margin: 0 }} className="gradient-text">คลังคำศัพท์ Vocabulary (単語)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            คลังพจนานุกรมญี่ปุ่น-ไทย และรายการคำศัพท์ระดับ N5, N4, N3 ค้นหาง่าย และสร้างคำศัพท์ได้ไม่จำกัดด้วยระบบ AI 🧠
          </p>
        </div>
        
        {/* Toggle Mode buttons & Manual Add */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowManualForm(!showManualForm)}
            style={{ borderColor: 'var(--border)' }}
          >
            <Plus size={18} />
            <span>เพิ่มคำศัพท์เอง</span>
          </button>
          
          <button 
            className={`btn ${mode === 'dict' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setMode('dict');
              if (localVocab.length > 0 && !selectedDictWord) {
                setSelectedDictWord(localVocab[0]);
              }
            }}
            style={{ background: mode === 'dict' ? 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)' : '' }}
          >
            <Search size={18} />
            <span>พจนานุกรมอัจฉริยะ</span>
          </button>

          <button 
            className={`btn ${mode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('list')}
          >
            <GraduationCap size={18} />
            <span>สารบัญคำศัพท์</span>
          </button>
          
          <button 
            className={`btn ${mode === 'game' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={startMatchingGame}
          >
            <HelpCircle size={18} />
            <span>เกมจับคู่</span>
          </button>
        </div>
      </div>

      {/* Manual Form (Collapsible Drawer style) */}
      {showManualForm && (
        <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'left', borderColor: 'var(--primary)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} /> เพิ่มคำศัพท์ใหม่ด้วยตัวคุณเอง
          </h3>
          <form onSubmit={handleAddManualWord} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>คำศัพท์ (คันจิ/ญี่ปุ่น)*</label>
              <input 
                type="text" 
                required 
                placeholder="เช่น 漢字 หรือ かんじ" 
                value={newWord.word} 
                onChange={e => setNewWord({...newWord, word: e.target.value})}
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>คำอ่านฮิรางานะ</label>
              <input 
                type="text" 
                placeholder="เช่น かんじ" 
                value={newWord.reading} 
                onChange={e => setNewWord({...newWord, reading: e.target.value})}
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>เสียงสะกดโรมันจิ (Romaji)</label>
              <input 
                type="text" 
                placeholder="such as kanji" 
                value={newWord.romaji} 
                onChange={e => setNewWord({...newWord, romaji: e.target.value})}
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>คำแปลภาษาไทย*</label>
              <input 
                type="text" 
                required 
                placeholder="เช่น ตัวอักษรคันจิ" 
                value={newWord.thai} 
                onChange={e => setNewWord({...newWord, thai: e.target.value})}
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>หมวดหมู่คำ</label>
              <select 
                value={newWord.category} 
                onChange={e => setNewWord({...newWord, category: e.target.value as any})}
                style={{ background: '#12131a', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
              >
                <option value="general">ทั่วไป</option>
                <option value="greetings">ทักทาย</option>
                <option value="food">อาหาร</option>
                <option value="places">สถานที่</option>
                <option value="travel">เดินทาง</option>
                <option value="shopping">ซื้อของ</option>
                <option value="emergency">ฉุกเฉิน</option>
                <option value="time">เวลา</option>
                <option value="verbs">คำกริยา</option>
                <option value="adjectives">คำคุณศัพท์</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ชนิดของคำ</label>
              <select 
                value={newWord.pos} 
                onChange={e => setNewWord({...newWord, pos: e.target.value as any})}
                style={{ background: '#12131a', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
              >
                <option value="noun">คำนาม (Noun)</option>
                <option value="verb">คำกริยา (Verb)</option>
                <option value="adjective">คำคุณศัพท์ (Adjective)</option>
                <option value="adverb">คำวิเศษณ์ (Adverb)</option>
                <option value="expression">สำนวน (Expression)</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.65rem' }}>บันทึกคำศัพท์</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowManualForm(false)} style={{ padding: '0.65rem' }}>ยกเลิก</button>
            </div>
          </form>
        </div>
      )}

      {/* Gemini API Key Settings Panel */}
      <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem', textAlign: 'left', borderColor: showApiSettings ? 'var(--secondary)' : 'var(--border)' }}>
        <div 
          onClick={() => setShowApiSettings(!showApiSettings)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 600 }}>
            <Key size={18} style={{ color: 'var(--secondary)' }} />
            <span>⚙️ ตั้งค่าระบบดึงข้อมูลพจนานุกรมอัจฉริยะ (Gemini AI Engine)</span>
            <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', background: apiStatus === 'success' ? 'rgba(82, 183, 136, 0.15)' : 'rgba(255,255,255,0.05)', color: apiStatus === 'success' ? 'var(--success)' : 'var(--text-muted)' }}>
              {apiStatus === 'success' ? '● เปิดใช้งานแล้ว' : '○ ยังไม่ได้ใส่คีย์'}
            </span>
          </div>
          {showApiSettings ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {showApiSettings && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="animate-fade-in">
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              ใส่ **Gemini API Key** ของคุณเพื่อรับฟีเจอร์แปลภาษาไทยและดึงความหมายพจนานุกรมอัจฉริยะได้ไม่จำกัด! 
              คุณสามารถขอรับ Key ได้ฟรี 100% ภายใน 1 นาทีผ่านเว็บไซต์ <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>Google AI Studio</a>
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input 
                type="password" 
                placeholder="วาง API Key ของคุณที่นี่ (AIzaSy...)" 
                value={apiKey}
                onChange={e => handleSaveApiKey(e.target.value)}
                style={{ flex: 1, minWidth: '260px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              />
              {apiKey && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleSaveApiKey('')}
                  style={{ color: 'var(--primary)' }}
                >
                  ล้างข้อมูลคีย์
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DICTIONARY VIEW MODE (SEARCH CENTRIC HUB) */}
      {mode === 'dict' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }} className="animate-fade-in">
          
          {/* Main Dictionary Search Console */}
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(100, 223, 223, 0.25)', boxShadow: '0 8px 32px rgba(100, 223, 223, 0.05)' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Smart Japanese-Thai Dictionary</span>
              <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#fff' }}>ระบบค้นหาคำศัพท์และแปลภาษาอัจฉริยะ</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>พิมพ์ภาษาญี่ปุ่น คันจิ โคลงอ่านโรมันจิ หรือคำแปลภาษาไทย เพื่อค้นหาคำศัพท์ในระบบ</p>
            </div>

            {/* Interactive Search Field with Suggestion Box */}
            <div style={{ position: 'relative', maxWidth: '650px', width: '100%', margin: '0 auto' }} ref={suggestionsRef}>
              <div style={{ position: 'relative' }}>
                <Search size={22} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                <input 
                  type="text"
                  placeholder="ค้นหาดิกชันนารี (เช่น หมา, neko, 寿司, たべる)..."
                  value={dictSearchQuery}
                  onChange={e => {
                    setDictSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  style={{ 
                    width: '100%', 
                    padding: '1.1rem 1rem 1.1rem 3.2rem', 
                    borderRadius: '16px', 
                    background: 'rgba(0,0,0,0.3)', 
                    border: '2px solid rgba(100, 223, 223, 0.2)', 
                    color: '#fff', 
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                />
                {dictSearchQuery.trim() && (
                  <button 
                    onClick={() => {
                      setDictSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    ล้าง
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown Card */}
              {showSuggestions && dictSearchQuery.trim() && (
                <div style={{ 
                  position: 'absolute', 
                  top: '105%', 
                  left: 0, 
                  right: 0, 
                  background: '#12131b', 
                  border: '1px solid rgba(100, 223, 223, 0.3)', 
                  borderRadius: '14px', 
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5)', 
                  zIndex: 999, 
                  maxHeight: '380px', 
                  overflowY: 'auto' 
                }}>
                  {currentSuggestions.length > 0 ? (
                    <div>
                      <div style={{ padding: '0.6rem 1rem', fontSize: '0.75rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                        <span>พบในคลังศัพท์ ({currentSuggestions.length} คำ)</span>
                        <span>คลิกเพื่อเปิดดูรายละเอียด</span>
                      </div>
                      {currentSuggestions.map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            setSelectedDictWord(item);
                            setShowSuggestions(false);
                            speakJapanese(item.word);
                          }}
                          style={{ 
                            padding: '0.85rem 1rem', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            cursor: 'pointer',
                            borderBottom: idx === currentSuggestions.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.03)',
                            transition: 'background 0.2s'
                          }}
                          className="table-row-hover"
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{item.word}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>({item.reading})</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.thai}</span>
                            <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>{item.level}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                      <Sparkles size={32} style={{ color: 'var(--secondary)', marginBottom: '0.75rem' }} />
                      <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>ไม่พบคำว่า "{dictSearchQuery}" ในคลังออฟไลน์</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>ส่งคำนี้ไปให้สมองกล AI แปลและดึงเสียงสะกดวิเคราะห์คำศัพท์อย่างละเอียด</p>
                      
                      <button 
                        className="btn btn-primary"
                        onClick={handleAiLookup}
                        disabled={isSearchingAi}
                        style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)', fontSize: '0.85rem', padding: '0.5rem 1.5rem' }}
                      >
                        <Sparkles size={14} className={isSearchingAi ? 'spin-icon' : ''} />
                        <span>{isSearchingAi ? 'กำลังดึงข้อมูล AI...' : 'ค้นหาและวิเคราะห์ด้วย AI ✨'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {aiError && (
              <div style={{ fontSize: '0.85rem', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,117,151,0.08)', maxWidth: '650px', width: '100%', margin: '0 auto' }}>
                ⚠️ {aiError}
              </div>
            )}

            {/* Quick Explore Words Badge List */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>คำเด่นแนะนำ:</span>
              {featuredExploreWords.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDictWord(item);
                    setDictSearchQuery(item.word);
                    speakJapanese(item.word);
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    padding: '0.3rem 0.8rem',
                    color: 'var(--text-main)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="table-row-hover"
                >
                  {item.word} <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{item.thai}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Dictionary Display Panel */}
          {selectedDictWord && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }} className="responsive-split">
              
              {/* Left Panel: Big Word Display */}
              <div className="glass-card animate-fade-in" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px', border: '1px solid rgba(255,117,151,0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  
                  {/* Category Badges */}
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    background: 'rgba(255, 117, 151, 0.12)', 
                    color: 'var(--primary)',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                  }}>
                    {categories.find(c => c.key === selectedDictWord.category)?.label || '🗂️ ทั่วไป'}
                  </span>

                  {/* Bookmark Button */}
                  <button 
                    onClick={() => toggleBookmark(selectedDictWord.word)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: bookmarks.includes(selectedDictWord.word) ? '#ffd166' : 'var(--text-muted)' }}
                    title={bookmarks.includes(selectedDictWord.word) ? "เอาออกจากสมุดบันทึก" : "บันทึกในสมุดคำศัพท์ส่วนตัว"}
                  >
                    <Star size={26} fill={bookmarks.includes(selectedDictWord.word) ? "#ffd166" : "none"} className={bookmarks.includes(selectedDictWord.word) ? "pulse-light" : ""} />
                  </button>
                </div>

                {/* Core Word Typo */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
                  <h1 style={{ fontSize: '4.2rem', margin: 0, fontFamily: 'var(--sans)', color: '#fff', textShadow: '0 0 25px rgba(255, 117, 151, 0.25)', fontWeight: 700 }}>
                    {selectedDictWord.word}
                  </h1>
                  
                  {/* Audio Speaker */}
                  <button
                    onClick={() => handleSpeak(selectedDictWord.word)}
                    style={{
                      background: 'rgba(255, 117, 151, 0.12)',
                      border: '1px solid rgba(255, 117, 151, 0.25)',
                      borderRadius: '50%',
                      width: '54px',
                      height: '54px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(255, 117, 151, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    className="table-row-hover"
                  >
                    <Volume2 size={24} className={speakingWord === selectedDictWord.word ? 'pulse-light' : ''} />
                  </button>
                </div>

                {/* Sub Readings */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>คำอ่านอักษรคานะ</span>
                    <span style={{ fontSize: '1.15rem', color: 'var(--primary)', fontWeight: 600 }}>{selectedDictWord.reading}</span>
                  </div>
                  <div style={{ borderLeft: '1px solid var(--border)', height: '35px' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>อักษรโรมันจิ</span>
                    <span style={{ fontSize: '1.15rem', color: 'var(--secondary)', fontWeight: 600, textTransform: 'none' }}>{selectedDictWord.romaji}</span>
                  </div>
                </div>

              </div>

              {/* Right Panel: Translation Details & Related Words */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Word Specs Box */}
                <div className="glass-card" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left', borderColor: 'rgba(100, 223, 223, 0.2)' }}>
                  
                  {/* Badges line */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: 'rgba(100, 223, 223, 0.12)',
                      color: 'var(--secondary)',
                      fontWeight: 600
                    }}>
                      ระดับ: JLPT {selectedDictWord.level}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-muted)',
                      fontWeight: 600
                    }}>
                      ชนิดคำ: {selectedDictWord.pos === 'noun' ? 'คำนาม (Noun)' : selectedDictWord.pos === 'verb' ? 'คำกริยา (Verb)' : selectedDictWord.pos === 'adjective' ? 'คุณศัพท์ (Adj)' : selectedDictWord.pos === 'adverb' ? 'วิเศษณ์ (Adv)' : 'สำนวน (Exp)'}
                    </span>
                  </div>

                  {/* Thai definition card */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>คำแปลความหมายภาษาไทย:</span>
                    <div style={{ 
                      background: 'rgba(0,0,0,0.2)', 
                      border: '1px solid var(--border)', 
                      borderRadius: '12px', 
                      padding: '1.25rem', 
                      fontSize: '1.25rem', 
                      fontWeight: 600,
                      color: '#fff',
                      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)',
                      lineHeight: '1.4'
                    }}>
                      {selectedDictWord.thai}
                    </div>
                  </div>

                  {/* Delete option if custom word */}
                  {selectedDictWord.level === 'custom' && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '1rem' }}>
                      <button 
                        onClick={() => handleDeleteCustomWord(selectedDictWord.word)}
                        className="btn btn-secondary" 
                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', color: 'var(--primary)', borderColor: 'rgba(255,117,151,0.2)' }}
                      >
                        <Trash2 size={14} />
                        <span>ลบคำศัพท์ส่วนตัวนี้</span>
                      </button>
                    </div>
                  )}

                </div>

                {/* Related Words Suggestions */}
                {relatedWords.length > 0 && (
                  <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'left' }}>
                    <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
                      <BookOpen size={16} /> คำใกล้เคียงเกี่ยวข้อง
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      {relatedWords.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedDictWord(item);
                            setDictSearchQuery(item.word);
                            speakJapanese(item.word);
                          }}
                          style={{
                            padding: '0.6rem 0.8rem',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s'
                          }}
                          className="table-row-hover"
                        >
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{item.word}</span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.reading}</span>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>{item.thai.substring(0, 10)}{item.thai.length > 10 ? '..' : ''}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>
      )}

      {/* LIST VIEW MODE */}
      {mode === 'list' && (
        <>
          {/* Filters Area */}
          <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            
            {/* Search Bar & AI Search triggers */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  placeholder="ค้นหาด่วน (เช่น คำแปลไทย, โรมันจิ, หรือตัวอักษรญี่ปุ่น)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: '#fff', fontSize: '0.95rem' }}
                />
              </div>
              
              {searchQuery.trim() && (
                <button 
                  className="btn btn-primary"
                  onClick={handleAiLookup}
                  disabled={isSearchingAi}
                  style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)', boxShadow: 'none' }}
                >
                  <Sparkles size={16} className={isSearchingAi ? 'spin-icon' : ''} />
                  <span>{isSearchingAi ? 'กำลังดึงข้อมูล AI...' : 'ค้นหาด้วย AI ไร้ขีดจำกัด ✨'}</span>
                </button>
              )}
            </div>

            {aiError && (
              <div style={{ fontSize: '0.85rem', color: 'var(--primary)', padding: '0.5rem', borderRadius: '6px', background: 'rgba(255,117,151,0.1)' }}>
                ⚠️ {aiError}
              </div>
            )}

            {/* Level Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', alignSelf: 'center', color: 'var(--text-muted)', fontWeight: 600, marginRight: '0.5rem' }}>ระดับ:</span>
              <button 
                onClick={() => setActiveLevel('all')}
                className={`tab-btn ${activeLevel === 'all' ? 'active' : ''}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              >
                ทั้งหมด ({localVocab.length})
              </button>
              <button 
                onClick={() => setActiveLevel('N5')}
                className={`tab-btn ${activeLevel === 'N5' ? 'active' : ''}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              >
                JLPT N5 ({localVocab.filter(i => i.level === 'N5').length})
              </button>
              <button 
                onClick={() => setActiveLevel('N4')}
                className={`tab-btn ${activeLevel === 'N4' ? 'active' : ''}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              >
                JLPT N4 ({localVocab.filter(i => i.level === 'N4').length})
              </button>
              <button 
                onClick={() => setActiveLevel('N3')}
                className={`tab-btn ${activeLevel === 'N3' ? 'active' : ''}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              >
                JLPT N3 ({localVocab.filter(i => i.level === 'N3').length})
              </button>
              <button 
                onClick={() => setActiveLevel('custom')}
                className={`tab-btn ${activeLevel === 'custom' ? 'active' : ''}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              >
                สมุดคำศัพท์ & คำที่เซฟ ({localVocab.filter(i => i.level === 'custom').length + bookmarks.length})
              </button>
            </div>

            {/* Part of Speech & Category selector line */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>ชนิดของคำ:</span>
                <select 
                  value={activePos} 
                  onChange={e => setActivePos(e.target.value as any)}
                  style={{ background: '#12131a', border: '1px solid var(--border)', padding: '0.4rem 0.75rem', borderRadius: '6px', color: '#fff' }}
                >
                  {partsOfSpeech.map(pos => (
                    <option key={pos.key} value={pos.key}>{pos.label}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>หมวดหมู่ย่อย:</span>
                <select 
                  value={activeCategory} 
                  onChange={e => setActiveCategory(e.target.value)}
                  style={{ background: '#12131a', border: '1px solid var(--border)', padding: '0.4rem 0.75rem', borderRadius: '6px', color: '#fff' }}
                >
                  {categories.map(cat => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Vocabulary Content Table */}
          {filteredVocab.length > 0 ? (
            <div className="glass-card" style={{ padding: '0.5rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '1rem', width: '50px', textAlign: 'center' }}>ติดดาว</th>
                    <th style={{ padding: '1rem' }}>คำศัพท์ภาษาญี่ปุ่น</th>
                    <th style={{ padding: '1rem' }}>คำอ่าน (ฮิรางานะ)</th>
                    <th style={{ padding: '1rem' }}>โรมันจิ (Romaji)</th>
                    <th style={{ padding: '1rem' }}>ความหมายภาษาไทย</th>
                    <th style={{ padding: '1rem', width: '100px' }}>ประเภทคำ</th>
                    <th style={{ padding: '1rem', textAlign: 'center', width: '80px' }}>ฟังเสียง</th>
                    <th style={{ padding: '1rem', textAlign: 'center', width: '60px' }}>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {currentWords.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }} className="table-row-hover">
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button 
                          onClick={() => toggleBookmark(item.word)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: bookmarks.includes(item.word) ? '#ffd166' : 'var(--text-muted)' }}
                        >
                          <Star size={16} fill={bookmarks.includes(item.word) ? "#ffd166" : "none"} />
                        </button>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '1.25rem', fontWeight: 600, fontFamily: 'var(--sans)' }}>
                        {item.word}
                        <span style={{ fontSize: '0.65rem', marginLeft: '0.5rem', padding: '2px 6px', borderRadius: '6px', background: item.level === 'N5' ? 'rgba(255, 117, 151, 0.1)' : item.level === 'N4' ? 'rgba(100, 223, 223, 0.1)' : 'rgba(157, 78, 221, 0.15)', color: item.level === 'N5' ? 'var(--primary)' : item.level === 'N4' ? 'var(--secondary)' : 'var(--accent)', fontWeight: 600 }}>
                          {item.level}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 500 }}>{item.reading}</td>
                      <td style={{ padding: '1rem', color: 'var(--secondary)', textTransform: 'none' }}>{item.romaji}</td>
                      <td style={{ padding: '1rem', fontSize: '0.95rem', fontWeight: 500 }}>{item.thai}</td>
                      <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {item.pos === 'noun' ? 'คำนาม' : item.pos === 'verb' ? 'คำกริยา' : item.pos === 'adjective' ? 'คุณศัพท์' : item.pos === 'adverb' ? 'กริยาวิเศษณ์' : 'สำนวน'}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button 
                          onClick={() => handleSpeak(item.word)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                        >
                          <Volume2 size={20} className={speakingWord === item.word ? 'pulse-light' : ''} />
                        </button>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        {item.level === 'custom' ? (
                          <button 
                            onClick={() => handleDeleteCustomWord(item.word)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                            title="ลบคำศัพท์ส่วนตัวนี้"
                          >
                            <Trash2 size={16} />
                          </button>
                        ) : (
                          <span style={{ color: 'var(--border)', fontSize: '0.8rem' }}>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 1rem' }}>
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="btn btn-secondary"
                    style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                  >
                    ก่อนหน้า
                  </button>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    หน้า {currentPage} จากทั้งหมด {totalPages}
                  </span>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="btn btn-secondary"
                    style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                  >
                    ถัดไป
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Empty State triggers AI dictionary lookup card */
            <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <Sparkles size={48} style={{ color: 'var(--secondary)', margin: '0 auto 1rem auto' }} className={isSearchingAi ? 'spin-icon' : ''} />
              <h3>ไม่พบคำศัพท์ "{searchQuery}" ในคลังออฟไลน์ปกติ</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0.5rem auto 1.5rem auto', fontSize: '0.95rem' }}>
                ต้องการให้ AI ช่วยแปลและค้นหาคำแปลภาษาไทยพร้อมคำอ่านและเสียงสะกดของคำนี้ทันทีจากอินเทอร์เน็ตหรือไม่?
              </p>
              
              <button 
                className="btn btn-primary"
                onClick={handleAiLookup}
                disabled={isSearchingAi}
                style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)', padding: '0.75rem 2rem' }}
              >
                <Sparkles size={18} />
                <span>{isSearchingAi ? 'กำลังวิเคราะห์คำแปลด้วย AI...' : 'ค้นหาและแปลคำนี้ด้วย AI เดี๊ยวนี้! ✨'}</span>
              </button>
              
              {!apiKey && (
                <p style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '1rem' }}>
                  * ต้องระบุ Gemini API Key ในส่วนตั้งค่าด้านบนก่อนใช้งานครับ
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* GAME MODE (MATCHING GAME) */}
      {mode === 'game' && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {!gameFinished ? (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '1.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem' }}>🎮 มินิเกมจับคู่คำศัพท์ในหมวดหมู่ที่เลือก</span>
                <span>คะแนนสะสม: <strong style={{ color: 'var(--success)', fontSize: '1.25rem' }}>{gameScore}</strong></span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="responsive-split">
                
                {/* Column 1: Japanese */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'left', fontWeight: 600 }}>คอลัมน์ภาษาญี่ปุ่น:</span>
                  {gameJapaneseWords.map((item, idx) => {
                    const isMatched = matchedIds.includes(item.word);
                    const isSelected = selectedJa?.word === item.word;
                    const isWrong = wrongMatch?.jaId === item.word;
                    
                    return (
                      <button
                        key={`ja-${idx}`}
                        onClick={() => handleSelectJa(item)}
                        disabled={isMatched}
                        className="option-btn"
                        style={{ 
                          textAlign: 'center', 
                          opacity: isMatched ? 0.3 : 1,
                          borderColor: isSelected ? 'var(--primary)' : isWrong ? 'var(--primary)' : isMatched ? 'var(--success)' : 'var(--border)',
                          background: isSelected ? 'rgba(255, 117, 151, 0.15)' : isWrong ? 'rgba(255, 77, 119, 0.2)' : isMatched ? 'rgba(82, 183, 136, 0.1)' : 'var(--card-bg)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.25rem',
                          minHeight: '100px',
                          padding: '1rem',
                          width: '100%',
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          lineHeight: '1.3'
                        }}
                      >
                        <span style={{ fontSize: '1.3rem', fontWeight: 600 }}>{item.word}</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>({item.reading})</span>
                        {isMatched && <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 500 }}>✓ คู่ถูกต้อง</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Column 2: Thai meanings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'left', fontWeight: 600 }}>คอลัมน์ความหมายไทย:</span>
                  {gameThaiWords.map((item, idx) => {
                    const isMatched = matchedIds.includes(item.word);
                    const isSelected = selectedTh?.word === item.word;
                    const isWrong = wrongMatch?.thId === item.word;
                    
                    return (
                      <button
                        key={`th-${idx}`}
                        onClick={() => handleSelectTh(item)}
                        disabled={isMatched}
                        className="option-btn"
                        style={{ 
                          textAlign: 'center', 
                          opacity: isMatched ? 0.3 : 1,
                          borderColor: isSelected ? 'var(--secondary)' : isWrong ? 'var(--primary)' : isMatched ? 'var(--success)' : 'var(--border)',
                          background: isSelected ? 'rgba(100, 223, 223, 0.15)' : isWrong ? 'rgba(255, 77, 119, 0.2)' : isMatched ? 'rgba(82, 183, 136, 0.1)' : 'var(--card-bg)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.25rem',
                          minHeight: '100px',
                          padding: '1rem',
                          width: '100%',
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          lineHeight: '1.3'
                        }}
                      >
                        <span style={{ fontSize: item.thai.length > 15 ? '0.85rem' : '1rem', fontWeight: 500 }}>{item.thai}</span>
                        {isMatched && <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 500 }}>✓ คู่ถูกต้อง</span>}
                      </button>
                    );
                  })}
                </div>

              </div>

              {wrongMatch && (
                <div style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                  ❌ ยังไม่ถูกต้อง ลองใหม่อีกครั้งดูนะครับ!
                </div>
              )}
            </div>
          ) : (
            /* Finished Game view */
            <div className="glass-card animate-fade-in" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
              <Award size={64} style={{ color: 'var(--warning)', margin: '0 auto 1.5rem auto' }} />
              <h2>เก่งมากครับ! จับคู่ครบสมบูรณ์แบบ 🏆</h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
                คุณได้รับคะแนนเต็มสำหรับการจับคู่: <strong style={{ color: 'var(--success)', fontSize: '2.5rem' }}>{gameScore}</strong> คะแนน!
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                <button className="btn btn-primary" onClick={startMatchingGame}>
                  <RefreshCw size={16} />
                  <span>เล่นใหม่อีกรอบ</span>
                </button>
                <button className="btn btn-secondary" onClick={() => setMode('dict')}>
                  <span>กลับไปที่ดิกชันนารี</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Styles */}
      <style>{`
        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .spin-icon {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .responsive-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
