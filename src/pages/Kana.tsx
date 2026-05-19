import { useState, useEffect } from 'react';
import { Volume2, RefreshCw, GraduationCap, Award, HelpCircle } from 'lucide-react';
import { hiraganaData, katakanaData } from '../data/kana';
import type { KanaChar } from '../data/kana';
import { speakJapanese } from '../utils/speech';

export default function Kana() {
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana');
  const [mode, setMode] = useState<'chart' | 'quiz'>('chart');
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  
  // Quiz state
  const [quizList, setQuizList] = useState<KanaChar[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [speakingChar, setSpeakingChar] = useState<string | null>(null);

  const currentData = activeTab === 'hiragana' ? hiraganaData : katakanaData;

  // Handle TTS
  const playSound = async (char: string) => {
    setSpeakingChar(char);
    await speakJapanese(char);
    setSpeakingChar(null);
  };

  // Flip card
  const toggleFlip = (index: number) => {
    const key = `${activeTab}-${index}`;
    setFlippedCards(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Initialize Quiz
  const startQuiz = () => {
    const shuffled = [...currentData].sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuizList(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setQuizFinished(false);
    setMode('quiz');
  };

  // Generate options for the current quiz question
  useEffect(() => {
    if (quizList.length > 0 && currentIndex < quizList.length) {
      const currentQuestion = quizList[currentIndex];
      const answer = currentQuestion.romaji;
      
      // Get three wrong answers
      const otherRomajis = currentData
        .map(item => item.romaji)
        .filter(r => r !== answer);
      const shuffledOthers = otherRomajis.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      // Merge and shuffle options
      const mergedOptions = [answer, ...shuffledOthers].sort(() => 0.5 - Math.random());
      setOptions(mergedOptions);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  }, [quizList, currentIndex]);

  // Handle answer click
  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return; // prevent clicking twice
    setSelectedAnswer(option);
    const correct = option === quizList[currentIndex].romaji;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
    
    // Play pronunciation automatically on correct/incorrect to reinforce learning
    speakJapanese(quizList[currentIndex].char);
  };

  // Next question
  const nextQuestion = () => {
    if (currentIndex < quizList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ margin: 0 }} className="gradient-text">ตัวอักษร Kana (คานะ)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>ฝึกจำตัวอักษรฮิรางานะและคาตาคานะซึ่งเป็นหัวใจหลักในการอ่านเขียนภาษาญี่ปุ่น</p>
        </div>
        
        {/* Toggle Mode buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn ${mode === 'chart' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('chart')}
          >
            <GraduationCap size={18} />
            <span>ตารางตัวอักษร</span>
          </button>
          <button 
            className={`btn ${mode === 'quiz' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={startQuiz}
          >
            <HelpCircle size={18} />
            <span>แบบทดสอบจำคำ</span>
          </button>
        </div>
      </div>

      {/* Tabs for Hiragana / Katakana */}
      {mode === 'chart' && (
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'hiragana' ? 'active' : ''}`}
            onClick={() => { setActiveTab('hiragana'); setFlippedCards({}); }}
          >
            Hiragana (ฮิรางานะ)
          </button>
          <button 
            className={`tab-btn ${activeTab === 'katakana' ? 'active' : ''}`}
            onClick={() => { setActiveTab('katakana'); setFlippedCards({}); }}
          >
            Katakana (คาตาคานะ)
          </button>
        </div>
      )}

      {/* CHART MODE */}
      {mode === 'chart' && (
        <div>
          <div style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            💡 แนะนำ: คลิกการ์ดตัวอักษรเพื่อ **ฟังเสียงสะกด** และ **พลิกการ์ดเพื่อดูความหมายและคำศัพท์ตัวอย่าง**
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem' }}>
            {currentData.map((item, idx) => {
              const cardKey = `${activeTab}-${idx}`;
              const isFlipped = !!flippedCards[cardKey];
              return (
                <div 
                  key={cardKey} 
                  className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => toggleFlip(idx)}
                >
                  <div className="flip-card-inner">
                    {/* Front of card */}
                    <div className="flip-card-front">
                      <span style={{ fontSize: '3rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1 }}>{item.char}</span>
                      <span style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 600, marginTop: '0.5rem' }}>{item.romaji}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({item.thai})</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // prevent flipping the card
                          playSound(item.char);
                        }}
                        style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', cursor: 'pointer', marginTop: '0.5rem', display: 'flex', alignItems: 'center' }}
                      >
                        <Volume2 size={16} className={speakingChar === item.char ? 'pulse-light' : ''} />
                      </button>
                    </div>

                    {/* Back of card */}
                    <div className="flip-card-back">
                      <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>คำศัพท์ตัวอย่าง</span>
                      <span style={{ fontSize: '1.75rem', fontWeight: 600, margin: '0.25rem 0' }}>{item.example.word}</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: 500 }}>{item.example.reading}</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '0.25rem', textAlign: 'center', padding: '0 0.25rem' }}>
                        {item.example.meaning}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
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
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>ตัวอักษรนี้ออกเสียงอย่างไร?</span>
                <h2 style={{ fontSize: '5rem', margin: '0.5rem 0', fontWeight: 700, lineHeight: 1 }}>
                  {quizList[currentIndex]?.char}
                </h2>
                <span style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>({quizList[currentIndex]?.type === 'hiragana' ? 'ฮิรางานะ' : 'คาตาคานะ'})</span>
              </div>

              <div className="options-grid">
                {options.map((opt, i) => {
                  let btnClass = '';
                  if (selectedAnswer !== null) {
                    if (opt === quizList[currentIndex].romaji) {
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
                      <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <div style={{ marginTop: '2rem', animation: 'fadeIn 0.3s ease forwards' }}>
                  <div style={{ marginBottom: '1rem', color: isCorrect ? 'var(--success)' : 'var(--primary)', fontWeight: 600 }}>
                    {isCorrect ? 'ถูกต้อง! เก่งมาก ✨' : `ยังไม่ถูก ตัวเลือกที่ถูกคือ "${quizList[currentIndex].romaji.toUpperCase()}"`}
                  </div>
                  <button className="btn btn-primary" onClick={nextQuestion} style={{ width: '100%' }}>
                    <span>{currentIndex < quizList.length - 1 ? 'ข้อถัดไป' : 'ดูสรุปคะแนน'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card animate-fade-in" style={{ padding: '3rem 2rem' }}>
              <Award size={64} style={{ color: 'var(--warning)', margin: '0 auto 1.5rem auto' }} />
              <h2>สิ้นสุดแบบทดสอบ!</h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
                คุณทำคะแนนได้ <strong style={{ color: 'var(--primary)', fontSize: '2rem' }}>{score}</strong> คะแนน เต็ม 10
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                <button className="btn btn-primary" onClick={startQuiz}>
                  <RefreshCw size={16} />
                  <span>ทำอีกครั้ง</span>
                </button>
                <button className="btn btn-secondary" onClick={() => setMode('chart')}>
                  <span>กลับไปดูตาราง</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
