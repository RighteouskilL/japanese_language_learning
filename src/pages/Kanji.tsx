import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, RefreshCw, GraduationCap, Award, HelpCircle, Search, Sparkles } from 'lucide-react';
import { kanjiData } from '../data/kanji';
import type { KanjiChar } from '../data/kanji';
import { vocabData } from '../data/vocab';
import { speakJapanese } from '../utils/speech';

export default function Kanji() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'chart' | 'quiz'>('chart');
  
  // Search, Category, and Pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3' | 'custom'>('N5');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 120; // Allow full level characters to display beautifully in one Periodic table grid!

  // Custom Kanji list persistence
  const [localKanji, setLocalKanji] = useState<KanjiChar[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<KanjiChar | null>(null);
  const [speakingItem, setSpeakingItem] = useState<string | null>(null);

  // Gemini AI integration states
  const [apiKey, setApiKey] = useState('');
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [aiError, setAiError] = useState('');

  // Quiz state
  const [quizList, setQuizList] = useState<KanjiChar[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // 1. Initial Load of combined core & custom database
  useEffect(() => {
    const savedCustom = localStorage.getItem('nihongogo_custom_kanji');
    let customList: KanjiChar[] = [];
    if (savedCustom) {
      try {
        customList = JSON.parse(savedCustom);
      } catch (e) {
        console.error("Failed to parse custom kanji", e);
      }
    }
    const combined = [...kanjiData, ...customList];
    setLocalKanji(combined);

    // Auto-select first item of N5 initially to showcase Target Panel
    const initialN5 = combined.find(k => k.level === 'N5');
    if (initialN5) {
      setSelectedKanji(initialN5);
    }

    // Load API Key from shared key storage
    const savedKey = localStorage.getItem('nihongogo_gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Handle TTS
  const playSound = async (text: string) => {
    setSpeakingItem(text);
    await speakJapanese(text);
    setSpeakingItem(null);
  };

  // Initialize Quiz
  const startQuiz = () => {
    const shuffled = [...localKanji].sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuizList(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setQuizFinished(false);
    setMode('quiz');
  };

  // Generate options for the current quiz question (meanings)
  useEffect(() => {
    if (quizList.length > 0 && currentIndex < quizList.length) {
      const currentQuestion = quizList[currentIndex];
      const answer = currentQuestion.meaning;
      
      const otherMeanings = localKanji
        .map(item => item.meaning)
        .filter(m => m !== answer);
      const shuffledOthers = otherMeanings.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      const mergedOptions = [answer, ...shuffledOthers].sort(() => 0.5 - Math.random());
      setOptions(mergedOptions);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  }, [quizList, currentIndex, localKanji]);

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    const correct = option === quizList[currentIndex].meaning;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
    
    // Auto speak
    speakJapanese(quizList[currentIndex].kanji);
  };

  const nextQuestion = () => {
    if (currentIndex < quizList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // 2. Perform On-Demand Offline Compound Extractor from vocabData
  const getHarvestedCompounds = (kanjiChar: string, builtin: any[] = []) => {
    // Search offline vocabData for words containing this Kanji
    const matched = vocabData.filter(v => v.word.includes(kanjiChar));
    
    // Format into standard compounds
    const dynamicList = matched.map(v => ({
      word: v.word,
      reading: v.reading,
      meaning: v.thai
    }));

    // Merge with built-in examples & remove duplicate words
    const combined = [...(builtin || []), ...dynamicList];
    const unique = new Set<string>();
    return combined.filter(c => {
      if (unique.has(c.word)) return false;
      unique.add(c.word);
      return true;
    }).slice(0, 4); // Limit to top 4 clean examples to fit beautifully in UI panel
  };

  // 3. Optional Gemini AI lookup fallback
  const handleAIKanjiLookup = async () => {
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim();

    if (!apiKey) {
      setAiError('กรุณาติดตั้ง Gemini API Key ในส่วนตั้งค่าของหน้าคำศัพท์ก่อน เพื่อสแตนด์บาย AI สำหรับค้นคันจินอกระบบครับ 🔑');
      return;
    }

    setIsSearchingAI(true);
    setAiError('');

    try {
      const systemPrompt = `You are a Japanese language expert. Translate and analyze the requested Japanese Kanji character.
You must output a raw, clean, structured JSON object with EXACTLY the following format, and nothing else (do NOT wrap in markdown blocks):
{
  "kanji": "${query}",
  "strokes": 8,
  "meaning": "คำแปลหลักภาษาไทยสั้นกระชับ",
  "kunyomi": "เสียงอ่านคุนโยมิ (เช่น みず)",
  "onyomi": "เสียงอ่านออนโยมิ (เช่น スイ)",
  "level": "N3",
  "compounds": [
    { "word": "ตัวอย่างคำผสม 1", "reading": "คำสะกด", "meaning": "ความหมายไทย" }
  ]
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text;
      
      const cleanJson: KanjiChar = JSON.parse(rawText.trim());

      // Save custom Kanji permanently in localStorage
      const savedCustom = localStorage.getItem('nihongogo_custom_kanji');
      let customList: KanjiChar[] = [];
      if (savedCustom) {
        customList = JSON.parse(savedCustom);
      }
      
      if (!customList.some(item => item.kanji === cleanJson.kanji)) {
        customList.unshift(cleanJson);
        localStorage.setItem('nihongogo_custom_kanji', JSON.stringify(customList));
      }

      // Add to state instantly
      const updatedList = [cleanJson, ...localKanji.filter(item => item.kanji !== cleanJson.kanji)];
      setLocalKanji(updatedList);
      setSelectedKanji(cleanJson);
      setSearchQuery('');
      setSelectedLevel(cleanJson.level as any);

    } catch (e) {
      console.error(e);
      setAiError('ไม่พบข้อมูลคันจินี้ กรุณาตรวจสอบตัวอักษรและลองอีกครั้งครับ');
    } finally {
      setIsSearchingAI(false);
    }
  };

  // 4. Filter and Paginate local database
  const filteredKanji = localKanji.filter(item => {
    // Search query filter
    const query = searchQuery.toLowerCase().trim();
    const matchSearch = !query || 
      item.kanji.toLowerCase().includes(query) ||
      item.meaning.toLowerCase().includes(query) ||
      item.kunyomi.toLowerCase().includes(query) ||
      item.onyomi.toLowerCase().includes(query);

    // Level filter
    if (selectedLevel === 'custom') {
      const isCustom = !kanjiData.some(k => k.kanji === item.kanji);
      return matchSearch && isCustom;
    }
    
    return matchSearch && item.level === selectedLevel;
  });

  // Calculate pages
  const totalPages = Math.ceil(filteredKanji.length / itemsPerPage) || 1;
  const paginatedKanji = filteredKanji.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page and selection on level change
  useEffect(() => {
    setCurrentPage(1);
    // Set first item in the filtered list as default selected in right panel
    if (filteredKanji.length > 0) {
      setSelectedKanji(filteredKanji[0]);
    } else {
      setSelectedKanji(null);
    }
  }, [selectedLevel]);

  return (
    <div className="container animate-fade-in">
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ margin: 0 }} className="gradient-text">คันจิ Kanji Board (N5 - N3)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>ตารางบอร์ดเรียนรู้คันจิความหนาแน่นสูงพร้อมระบบดึงคลังศัพท์ผสมสะกดข้ามหน้าออนดีมานด์ 100% ออฟไลน์</p>
        </div>
        
        {/* Toggle Mode buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn ${mode === 'chart' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('chart')}
          >
            <GraduationCap size={18} />
            <span>ผังตารางเรียนรู้</span>
          </button>
          <button 
            className={`btn ${mode === 'quiz' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={startQuiz}
          >
            <HelpCircle size={18} />
            <span>แบบทดสอบ</span>
          </button>
        </div>
      </div>

      {/* CHART & STUDY MASTER MODE */}
      {mode === 'chart' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* A. Search Console */}
          <div className="glass-card" style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderColor: 'var(--border)' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  placeholder="ค้นหาคันจิด่วนออฟไลน์ (เช่น น้ำ, mizu, 火, 一)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.5rem',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.25)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              {/* Optional AI Trigger - clearly demarcated so they don't have to use it */}
              <button 
                onClick={handleAIKanjiLookup}
                disabled={isSearchingAI}
                className="btn btn-secondary"
                style={{
                  padding: '0.65rem 1rem',
                  borderColor: 'rgba(100, 223, 223, 0.2)',
                  background: 'rgba(100, 223, 223, 0.03)',
                  color: 'var(--secondary)',
                  fontSize: '0.85rem'
                }}
                title="ใช้เฉพาะเวลานอกเหนือคลังออฟไลน์เท่านั้น"
              >
                <Sparkles size={14} className={isSearchingAI ? 'spin-icon' : ''} />
                <span>{isSearchingAI ? 'AI ดึงข้อมูล...' : 'AI แปลนอกคลัง ✨'}</span>
              </button>
            </div>

            {aiError && (
              <div style={{ marginTop: '0.5rem', padding: '0.4rem 0.6rem', borderRadius: '6px', background: 'rgba(255, 75, 75, 0.08)', border: '1px solid rgba(255, 75, 75, 0.2)', color: '#ff6b6b', fontSize: '0.8rem', textAlign: 'left' }}>
                {aiError}
              </div>
            )}
          </div>

          {/* B. LEVEL SELECTOR TABS */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'N5', label: 'ระดับ N5 (พื้นฐาน)', emoji: '🌸' },
              { id: 'N4', label: 'ระดับ N4 (กลางต้น)', emoji: '📖' },
              { id: 'N3', label: 'ระดับ N3 (กลางสูง)', emoji: '⛰️' },
              { id: 'custom', label: 'สะสมพิเศษ', emoji: '✨' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id as any)}
                className={`tab-btn ${selectedLevel === tab.id ? 'active' : ''}`}
                style={{
                  fontSize: '0.85rem',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '20px',
                  background: selectedLevel === tab.id ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid ' + (selectedLevel === tab.id ? 'var(--primary)' : 'var(--border)'),
                  color: selectedLevel === tab.id ? '#000' : 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  fontWeight: selectedLevel === tab.id ? '700' : '400',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* C. SPLIT PANE MASTER CONSOLE */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', textAlign: 'left' }}>
            
            {/* LEFT WINDOW - Periodic Kanji Grid */}
            <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div 
                className="glass-card" 
                style={{ 
                  padding: '1.25rem', 
                  minHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.01)'
                }}
              >
                {paginatedKanji.length > 0 ? (
                  <div>
                    {/* Compact periodic blocks grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: '0.65rem' }}>
                      {paginatedKanji.map((item) => {
                        const isSelected = selectedKanji?.kanji === item.kanji;
                        return (
                          <button
                            key={item.kanji}
                            onClick={() => setSelectedKanji(item)}
                            className="glass-card periodic-block"
                            style={{
                              width: '100%',
                              height: '88px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '4px',
                              cursor: 'pointer',
                              border: isSelected ? '2px solid var(--secondary)' : '1px solid var(--border)',
                              background: isSelected ? 'rgba(100, 223, 223, 0.15)' : 'rgba(255,255,255,0.02)',
                              boxShadow: isSelected ? '0 0 15px rgba(100, 223, 223, 0.35)' : 'none',
                              borderRadius: '8px',
                              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            title={`ขีดเขียน: ${item.strokes} ขีด`}
                          >
                            <span 
                              style={{ 
                                fontSize: '2.1rem', 
                                fontWeight: 700, 
                                color: isSelected ? 'var(--secondary)' : '#fff',
                                lineHeight: 1.1
                              }}
                            >
                              {item.kanji}
                            </span>
                            <span 
                              style={{ 
                                fontSize: '0.8rem', 
                                color: 'var(--text-muted)', 
                                marginTop: '3px',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                width: '100%',
                                textAlign: 'center'
                              }}
                            >
                              {item.meaning.split(' ')[0].split('(')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div style={{ margin: 'auto', textAlign: 'center', padding: '2rem 1rem' }}>
                    <HelpCircle size={40} style={{ color: 'var(--primary)', margin: '0 auto 0.75rem auto' }} />
                    <h4 style={{ margin: 0 }}>ไม่มีอักษรคันจิในกลุ่มนี้</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                      คุณสามารถดึงข้อมูลคันจินอกคลังเพิ่มเติมได้ทันทีที่ช่องค้นหาด้านบนครับ
                    </p>
                  </div>
                )}

                {/* Grid Pagination */}
                {filteredKanji.length > itemsPerPage && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '1rem' }}>
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className="btn btn-secondary"
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                    >
                      ◀ ย้อนกลับ
                    </button>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      หน้า <strong>{currentPage}</strong> / {totalPages}
                    </span>
                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className="btn btn-secondary"
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                    >
                      ถัดไป ▶
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT WINDOW - Target Target Detail Console */}
            <div style={{ flex: '0 0 380px', width: '380px', display: 'flex', flexDirection: 'column' }}>
              <div 
                className="glass-card animate-fade-in" 
                style={{ 
                  padding: '1.25rem',
                  borderColor: 'rgba(100, 223, 223, 0.15)',
                  background: 'rgba(0, 0, 0, 0.25)',
                  minHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start'
                }}
              >
                {selectedKanji ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Header Detail block */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                      <div 
                        style={{ 
                          fontSize: '3.75rem', 
                          fontWeight: 800, 
                          color: '#fff', 
                          lineHeight: 1, 
                          background: 'rgba(255,255,255,0.03)', 
                          padding: '8px 16px', 
                          borderRadius: '10px', 
                          border: '1px solid var(--border)',
                          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
                        }}
                      >
                        {selectedKanji.kanji}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', textAlign: 'left' }}>
                        <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)' }}>
                          {selectedKanji.meaning}
                        </span>
                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                            {selectedKanji.strokes} ขีด
                          </span>
                          <span style={{ fontSize: '0.8rem', background: 'rgba(100, 223, 223, 0.1)', padding: '2px 6px', borderRadius: '4px', color: 'var(--secondary)', fontWeight: 600 }}>
                            Level: {selectedKanji.level}
                          </span>
                          <button 
                            onClick={() => playSound(selectedKanji.kanji)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', cursor: 'pointer', padding: '2px' }}
                            title="ฟังออกเสียงคันจิ"
                          >
                            <Volume2 size={16} className={speakingItem === selectedKanji.kanji ? 'pulse-light' : ''} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Readings block */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Kun (คุนโยมิ):</span>
                        <div style={{ fontSize: '1.05rem', color: '#fff', marginTop: '2px', fontWeight: 500 }}>{selectedKanji.kunyomi}</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--warning)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>On (ออนโยมิ):</span>
                        <div style={{ fontSize: '1.05rem', color: '#fff', marginTop: '2px', fontWeight: 500 }}>{selectedKanji.onyomi}</div>
                      </div>
                    </div>

                    {/* dynamic harvested compounds block */}
                    <div style={{ textAlign: 'left', marginTop: '0.25rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)', display: 'block', marginBottom: '0.4rem' }}>
                        💡 คำศัพท์ตัวอย่าง (สะกดจริงออฟไลน์):
                      </span>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {getHarvestedCompounds(selectedKanji.kanji, selectedKanji.compounds).length > 0 ? (
                          getHarvestedCompounds(selectedKanji.kanji, selectedKanji.compounds).map((comp, cIdx) => (
                            <div 
                              key={cIdx} 
                              style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                fontSize: '0.9rem', 
                                background: 'rgba(255,255,255,0.03)', 
                                padding: '0.45rem 0.7rem', 
                                borderRadius: '6px', 
                                border: '1px solid rgba(255,255,255,0.02)' 
                              }}
                            >
                              <div style={{ flex: 1, marginRight: '0.4rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                <strong style={{ fontSize: '1.05rem', color: '#fff' }}>{comp.word}</strong> <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({comp.reading.split(' ')[0]})</span> - <span style={{ fontSize: '0.88rem' }}>{comp.meaning}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                                <button 
                                  onClick={() => playSound(comp.word)}
                                  style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', cursor: 'pointer', padding: '2px' }}
                                  title="ฟังออกเสียงสะกด"
                                >
                                  <Volume2 size={13} className={speakingItem === comp.word ? 'pulse-light' : ''} />
                                </button>
                                <button 
                                  onClick={() => navigate('/vocab', { state: { searchWord: comp.word } })}
                                  style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '2px' }}
                                  title="ดูคำแปลละเอียดสะพานเชื่อมพจนานุกรม"
                                >
                                  <Search size={13} />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '0.25rem' }}>
                            ไม่มีคำสะกดตัวอย่างออฟไลน์ประกอบ
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <HelpCircle size={44} style={{ color: 'var(--border)', margin: '0 auto 0.75rem auto' }} />
                    <p style={{ fontSize: '0.85rem' }}>กรุณาเลือกช่องตัวอักษรคันจิฝั่งซ้าย เพื่อเร่งแสดงรายละเอียดเจาะลึก 💡</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* QUIZ MODE */}
      {mode === 'quiz' && (
        <div className="quiz-container">
          {!quizFinished ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <span>ข้อที่ {currentIndex + 1} / {quizList.length}</span>
                <span>คะแนนสะสม: <strong style={{ color: 'var(--secondary)' }}>{score}</strong></span>
              </div>
              
              <div style={{ margin: '2rem 0' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>คันจิตัวนี้ มีความหมายว่าอะไร?</span>
                <h2 style={{ fontSize: '6rem', margin: '0.5rem 0', fontWeight: 700, lineHeight: 1 }}>
                  {quizList[currentIndex]?.kanji}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Kun: {quizList[currentIndex]?.kunyomi}</span>
                  <span>On: {quizList[currentIndex]?.onyomi}</span>
                </div>
              </div>

              <div className="options-grid">
                {options.map((opt, i) => {
                  let btnClass = '';
                  if (selectedAnswer !== null) {
                    if (opt === quizList[currentIndex].meaning) {
                      btnClass = 'correct';
                    } else if (selectedAnswer === opt) {
                      btnClass = 'incorrect';
                    }
                  }
                  return (
                    <button
                      key={i}
                      className={`option-btn ${btnClass}`}
                      onClick={() => handleAnswer(opt)}
                      disabled={selectedAnswer !== null}
                    >
                      <span style={{ fontWeight: 500 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <div style={{ marginTop: '2rem', animation: 'fadeIn 0.3s ease forwards', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ color: isCorrect ? 'var(--success)' : 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>
                    {isCorrect ? 'ถูกต้อง! ยอดเยี่ยมมาก ✨' : `ยังไม่ถูก ความหมายจริงคือ "${quizList[currentIndex].meaning}"`}
                  </div>

                  {/* Deep learning compound words review panel harvested from vocabData */}
                  {quizList[currentIndex]?.kanji && (
                    <div className="glass-card animate-fade-in" style={{ padding: '1rem', background: 'rgba(0,0,0,0.15)', borderColor: 'rgba(100, 223, 223, 0.15)', textAlign: 'left' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        💡 คำศัพท์ตัวอย่างประกอบคันจิ "{quizList[currentIndex].kanji}" :
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {getHarvestedCompounds(quizList[currentIndex].kanji, quizList[currentIndex].compounds).length > 0 ? (
                          getHarvestedCompounds(quizList[currentIndex].kanji, quizList[currentIndex].compounds).map((comp, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', background: 'rgba(255,255,255,0.02)', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                              <div>
                                <strong style={{ fontSize: '0.95rem', color: '#fff' }}>{comp.word}</strong> <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({comp.reading.split(' ')[0]})</span> - <span>{comp.meaning}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                <button 
                                  onClick={() => speakJapanese(comp.word)}
                                  style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', cursor: 'pointer', padding: '2px' }}
                                  title="ฟังเสียง"
                                >
                                  <Volume2 size={14} />
                                </button>
                                <button 
                                  onClick={() => navigate('/vocab', { state: { searchWord: comp.word } })}
                                  style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '2px' }}
                                  title="ค้นหาในพจนานุกรมอัจฉริยะ"
                                >
                                  <Search size={14} />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                            ไม่มีคำศัพท์สะกดตัวอย่างออฟไลน์
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <button className="btn btn-primary" onClick={nextQuestion} style={{ width: '100%', padding: '0.75rem' }}>
                    <span>{currentIndex < quizList.length - 1 ? 'ข้อถัดไป ➔' : 'ดูสรุปคะแนน 🏆'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card animate-fade-in" style={{ padding: '3rem 2rem' }}>
              <Award size={64} style={{ color: 'var(--warning)', margin: '0 auto 1.5rem auto' }} />
              <h2>สิ้นสุดแบบทดสอบคันจิ!</h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
                คุณทำคะแนนได้ <strong style={{ color: 'var(--primary)', fontSize: '2rem' }}>{score}</strong> คะแนน เต็ม 10
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                <button className="btn btn-primary" onClick={startQuiz}>
                  <RefreshCw size={16} />
                  <span>ทำอีกครั้ง</span>
                </button>
                <button className="btn btn-secondary" onClick={() => setMode('chart')}>
                  <span>กลับไปดูบอร์ด</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
