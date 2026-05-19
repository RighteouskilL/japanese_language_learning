import { useState, useEffect } from 'react';
import { Volume2, RefreshCw, GraduationCap, Award, HelpCircle } from 'lucide-react';
import { kanjiData } from '../data/kanji';
import type { KanjiChar } from '../data/kanji';
import { speakJapanese } from '../utils/speech';

export default function Kanji() {
  const [mode, setMode] = useState<'chart' | 'quiz'>('chart');
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  
  // Quiz state
  const [quizList, setQuizList] = useState<KanjiChar[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [speakingItem, setSpeakingItem] = useState<string | null>(null);

  // Handle TTS
  const playSound = async (text: string) => {
    setSpeakingItem(text);
    await speakJapanese(text);
    setSpeakingItem(null);
  };

  const toggleFlip = (index: number) => {
    const key = `kanji-${index}`;
    setFlippedCards(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Initialize Quiz
  const startQuiz = () => {
    const shuffled = [...kanjiData].sort(() => 0.5 - Math.random()).slice(0, 10);
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
      
      const otherMeanings = kanjiData
        .map(item => item.meaning)
        .filter(m => m !== answer);
      const shuffledOthers = otherMeanings.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      const mergedOptions = [answer, ...shuffledOthers].sort(() => 0.5 - Math.random());
      setOptions(mergedOptions);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  }, [quizList, currentIndex]);

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

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ margin: 0 }} className="gradient-text">คันจิ Kanji (N5)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>เรียนรู้ตัวอักษรจีนในภาษาญี่ปุ่น ความหมาย เสียงอ่านคุนโยมิ ออนโยมิ และคำผสมคันจิ</p>
        </div>
        
        {/* Toggle Mode buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn ${mode === 'chart' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('chart')}
          >
            <GraduationCap size={18} />
            <span>การเรียนรู้คันจิ</span>
          </button>
          <button 
            className={`btn ${mode === 'quiz' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={startQuiz}
          >
            <HelpCircle size={18} />
            <span>ทำแบบทดสอบ</span>
          </button>
        </div>
      </div>

      {/* CHART MODE */}
      {mode === 'chart' && (
        <div>
          <div style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            💡 แนะนำ: คลิกการ์ดคันจิเพื่อ **พลิกการ์ดเรียนรู้ความหมายและเสียงอ่าน** และคลิกที่ลำโพง 🔊 เพื่อฟังตัวอย่างการผสมคำ
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {kanjiData.map((item, idx) => {
              const cardKey = `kanji-${idx}`;
              const isFlipped = !!flippedCards[cardKey];
              return (
                <div 
                  key={cardKey} 
                  className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => toggleFlip(idx)}
                  style={{ height: '240px' }}
                >
                  <div className="flip-card-inner">
                    {/* Front of card */}
                    <div className="flip-card-front" style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ fontSize: '1rem', color: 'var(--text-muted)', alignSelf: 'flex-start' }}>ขีดเขียน: {item.strokes} ขีด</span>
                      <h2 style={{ fontSize: '4.5rem', margin: '0.25rem 0', fontWeight: 700, lineHeight: 1 }}>{item.kanji}</h2>
                      <span style={{ fontSize: '1.15rem', color: 'var(--primary)', fontWeight: 600 }}>{item.meaning}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>คลิกเพื่อดูคำผสมคันจิ ➔</span>
                    </div>

                    {/* Back of card */}
                    <div className="flip-card-back" style={{ padding: '1rem 1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{item.kanji}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>อ่านออกเสียง</span>
                      </div>
                      
                      <div style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                        <strong style={{ color: 'var(--secondary)' }}>Kunyomi:</strong> {item.kunyomi}
                      </div>
                      <div style={{ fontSize: '0.8rem', marginBottom: '0.6rem' }}>
                        <strong style={{ color: 'var(--warning)' }}>Onyomi:</strong> {item.onyomi}
                      </div>

                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.25rem' }}>คำศัพท์ผสม (Compounds):</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {item.compounds.map((comp, cIdx) => (
                          <div key={cIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', background: 'rgba(255,255,255,0.03)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                            <div>
                              <strong>{comp.word}</strong> ({comp.reading}) - <span style={{ color: 'var(--text-muted)' }}>{comp.meaning}</span>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                playSound(comp.word);
                              }}
                              style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                            >
                              <Volume2 size={12} className={speakingItem === comp.word ? 'pulse-light' : ''} />
                            </button>
                          </div>
                        ))}
                      </div>
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
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>คันจิตัวนี้ มีความหมายว่าอะไร?</span>
                <h2 style={{ fontSize: '6rem', margin: '0.5rem 0', fontWeight: 700, lineHeight: 1 }}>
                  {quizList[currentIndex]?.kanji}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Kunyomi: {quizList[currentIndex]?.kunyomi}</span>
                  <span>Onyomi: {quizList[currentIndex]?.onyomi}</span>
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
                <div style={{ marginTop: '2rem', animation: 'fadeIn 0.3s ease forwards' }}>
                  <div style={{ marginBottom: '1rem', color: isCorrect ? 'var(--success)' : 'var(--primary)', fontWeight: 600 }}>
                    {isCorrect ? 'ถูกต้อง! ยอดเยี่ยมมาก ✨' : `ยังไม่ถูก ความหมายจริงคือ "${quizList[currentIndex].meaning}"`}
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
                  <span>กลับไปดูรายการ</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
