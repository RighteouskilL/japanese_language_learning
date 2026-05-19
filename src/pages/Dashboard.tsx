import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Languages, HelpCircle, Award, Sparkles, Volume2 } from 'lucide-react';
import { vocabData } from '../data/vocab';
import type { VocabItem } from '../data/vocab';
import { speakJapanese } from '../utils/speech';

export default function Dashboard() {
  const [dailyWord, setDailyWord] = useState<VocabItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Generate a consistent "Word of the Day" using current day as seed
    const day = new Date().getDate();
    const index = day % vocabData.length;
    setDailyWord(vocabData[index]);
  }, []);

  const handleSpeak = async () => {
    if (!dailyWord) return;
    setIsSpeaking(true);
    await speakJapanese(dailyWord.word);
    setIsSpeaking(false);
  };

  const modules = [
    {
      title: 'ตัวอักษร Kana',
      description: 'เรียนรู้ Hiragana และ Katakana พื้นฐาน ตัวสะกด พร้อมโหมดทายตัวอักษรเพื่อทดสอบความจำ',
      path: '/kana',
      icon: <Languages size={32} className="gradient-text" />,
      color: 'var(--primary)',
      stats: '46 ฮิรางานะ + 46 คาตาคานะ'
    },
    {
      title: 'คันจิ Kanji (N5)',
      description: 'คันจิพื้นฐานระดับ N5 ความหมาย ออนโยมิ คุนโยมิ พร้อมคำศัพท์ประกอบและแบบทดสอบ',
      path: '/kanji',
      icon: <BookOpen size={32} className="gradient-text" />,
      color: 'var(--secondary)',
      stats: '12 ตัวอักษรพื้นฐาน N5'
    },
    {
      title: 'คำศัพท์ Vocabulary',
      description: 'คลังคำศัพท์แยกหมวดหมู่ที่มีประโยชน์ เช่น อาหาร ครอบครัว สถานที่ ตัวเลข พร้อมเสียงอ่าน',
      path: '/vocab',
      icon: <Award size={32} className="gradient-text" />,
      color: 'var(--accent)',
      stats: '30+ คำศัพท์ที่ใช้บ่อย'
    },
    {
      title: 'บทสนทนา Situations',
      description: 'บทสนทนาตามสถานการณ์จริง เช่น ร้านอาหาร ถามทาง ซื้อของ พร้อมจำลองการออกเสียงประโยค',
      path: '/situations',
      icon: <HelpCircle size={32} className="gradient-text" />,
      color: 'var(--success)',
      stats: '4 สถานการณ์จำลอง'
    }
  ];

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Hero Welcome banner */}
      <div 
        className="glass-card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 117, 151, 0.15) 0%, rgba(157, 78, 221, 0.15) 100%)',
          borderColor: 'rgba(255, 117, 151, 0.3)',
          padding: '2.5rem',
          textAlign: 'left',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.15 }}>
          <GraduationCap size={200} style={{ color: 'var(--primary)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>
            <Sparkles size={18} />
            <span>ยินดีต้อนรับเข้าสู่การเรียนรู้</span>
          </div>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', fontWeight: 700 }} className="gradient-text">
            こんにちは (Konnichiwa!)
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '650px', lineHeight: 1.6 }}>
            เริ่มต้นเรียนภาษาญี่ปุ่นด้วยตนเองอย่างมีประสิทธิภาพ ครอบคลุมตั้งแต่ตัวอักษรพื้นฐาน คำศัพท์ คันจิ และประโยคใช้งานจริงในชีวิตประจำวัน 
          </p>
        </div>
      </div>

      {/* Grid: Word of the Day & Quick Progress */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }} className="responsive-split">
        
        {/* Word of the Day */}
        {dailyWord && (
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', textAlign: 'left' }}>
            <div>
              <div style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                <Sparkles size={14} />
                <span>คำศัพท์ประจำวัน (Word of the Day)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: 700, fontFamily: 'var(--sans)' }}>{dailyWord.word}</h2>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>[{dailyWord.reading}]</span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>โรมะจิ: <span style={{ color: 'var(--secondary)' }}>{dailyWord.romaji}</span></p>
              <h3 style={{ fontSize: '1.3rem', margin: '0.75rem 0 0 0', color: 'var(--text-main)', fontWeight: 500 }}>
                ความหมาย: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{dailyWord.thai}</span>
              </h3>
            </div>
            
            <button 
              onClick={handleSpeak}
              disabled={isSpeaking}
              className="btn btn-secondary" 
              style={{ width: 'fit-content', marginTop: '1.25rem' }}
            >
              <Volume2 size={16} className={isSpeaking ? 'pulse-light' : ''} />
              <span>{isSpeaking ? 'กำลังออกเสียง...' : 'ฟังการออกเสียง'}</span>
            </button>
          </div>
        )}

        {/* Quick progress visual */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 1rem 0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} style={{ color: 'var(--secondary)' }} />
              <span>ภาพรวมการเรียนของคุณ</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                  <span>ตัวอักษร Kana</span>
                  <span>0% เรียนแล้ว</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '0%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                  <span>คันจิ N5</span>
                  <span>0% เรียนแล้ว</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '0%', height: '100%', background: 'var(--secondary)', borderRadius: '3px' }}></div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '1rem' }}>
            💡 แนะนำ: เริ่มต้นด้วยการฝึกจำตัวอักษร **ฮิรางานะ** ก่อนเป็นอันดับแรก!
          </div>
        </div>
      </div>

      {/* Modules Cards Grid */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, textAlign: 'left', marginBottom: '1.5rem' }}>
          เลือกหมวดหมู่ที่ต้องการเรียนรู้
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {modules.map((m) => (
            <div key={m.path} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', minHeight: '260px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    {m.icon}
                  </div>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '20px', color: 'var(--text-muted)' }}>
                    {m.stats}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', fontWeight: 600 }}>{m.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>{m.description}</p>
              </div>
              <Link to={m.path} className="btn btn-primary" style={{ width: '100%' }}>
                <span>เริ่มบทเรียน</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dynamic responsive grid CSS helper */}
      <style>{`
        @media (max-width: 768px) {
          .responsive-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
