import { useState, useEffect } from 'react';
import { Volume2, Play, Pause, Compass, Coffee, ShoppingBag, User, Sparkles, Key, Plus, Trash2, HelpCircle, Award, BookOpen, MessageSquare, ChevronDown, ChevronUp, AlertCircle, RefreshCw } from 'lucide-react';
import { situationsData } from '../data/situations';
import type { Situation, DialogueLine } from '../data/situations';
import type { VocabItem } from '../data/vocab';
import { speakJapanese } from '../utils/speech';

export default function Situations() {
  const [allSituations, setAllSituations] = useState<Situation[]>([]);
  const [activeSitId, setActiveSitId] = useState<string>('greetings');
  
  // Audio playback states
  const [speakingLineIdx, setSpeakingLineIdx] = useState<number | null>(null);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [speakingVocabWord, setSpeakingVocabWord] = useState<string | null>(null);
  
  // Situation Card Tab Selection
  const [activeCardTab, setActiveCardTab] = useState<'dialogue' | 'vocab' | 'game'>('dialogue');

  // Gemini API States
  const [apiKey, setApiKey] = useState('');
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiError, setAiError] = useState<string | null>(null);

  // Manual Scenario Creator States
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualThaiTitle, setManualThaiTitle] = useState('');
  const [manualDesc, setManualDesc] = useState('');
  const [manualDialogue, setManualDialogue] = useState<DialogueLine[]>([
    { speaker: 'Somchai', japanese: '', romaji: '', thai: '' },
    { speaker: 'Staff', japanese: '', romaji: '', thai: '' }
  ]);
  const [manualVocab, setManualVocab] = useState<{ word: string; reading: string; romaji: string; thai: string }[]>([
    { word: '', reading: '', romaji: '', thai: '' }
  ]);

  // Matching Game States (specific to active situation)
  const [gameJapaneseWords, setGameJapaneseWords] = useState<VocabItem[]>([]);
  const [gameThaiWords, setGameThaiWords] = useState<VocabItem[]>([]);
  const [selectedJa, setSelectedJa] = useState<VocabItem | null>(null);
  const [selectedTh, setSelectedTh] = useState<VocabItem | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<{ jaId: string; thId: string } | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  // Preset situations for AI Generator
  const presetAiTopics = [
    { title: 'เซเว่น (Konbini)', desc: 'ซื้อของในเซเว่น อุ่นอาหารกล่องและปฏิเสธถุงพลาสติก', prompt: 'การซื้อของกินในร้านสะดวกซื้อญี่ปุ่น ขอให้พนักงานช่วยอุ่นอาหารกล่อง และปฏิเสธการรับถุงพลาสติกอย่างสุภาพ' },
    { title: 'สั่งราเม็งข้อสอบ', desc: 'สั่งราเม็งข้อสอบ Ichiran เลือกระดับความนุ่มเส้นและน้ำซุป', prompt: 'การสั่งราเม็งที่ร้านราเม็งข้อสอบ (Ichiran Ramen) คุยกับพนักงานเรื่องเลือกระดับความนุ่มของเส้น น้ำซุปเข้มข้น และสั่งหมูชาชูเพิ่ม' },
    { title: 'เช็กอินโรงแรม & ฝากกระเป๋า', desc: 'เช็กอินโรงแรม ขอรหัส Wi-Fi และฝากกระเป๋าเดินทาง', prompt: 'การเช็กอินที่เคาน์เตอร์โรงแรมย่านชินจูกุ การขอรหัส Wi-Fi และการขอฝากกระเป๋าเดินทางไว้ก่อนเวลาเช็กอิน' },
    { title: 'ซื้อของติ่งอนิเมะ', desc: 'ซื้อของสะสมในอากิฮาบาระและถามเรื่องการยกเว้นภาษี', prompt: 'การซื้อฟิกเกอร์/สินค้าอนิเมะในร้านค้าที่อากิฮาบาระ สอบถามพนักงานเรื่องสินค้าที่หมด และขั้นตอนการทำ Tax-Free (ปลอดภาษี)' },
    { title: 'ต่อรถไฟไปภูเขาไฟฟูจิ', desc: 'ถามพนักงานสถานีรถไฟเรื่องเปลี่ยนชานชาลาไปฟูจิ', prompt: 'การสอบถามนายสถานีรถไฟชินจูกุว่าต้องต่อรถไฟขบวนใดและเปลี่ยนชานชาลาที่ไหนเพื่อเดินทางไปยังทะเลสาบคาวากุจิโกะ/ภูเขาไฟฟูจิ' },
    { title: 'หาหมอ/ซื้อยาหวัด', desc: 'อธิบายอาการปวดหัวตัวร้อนกับเภสัชกรที่ร้านยา', prompt: 'การอธิบายอาการป่วย (มีอาการปวดหัว มีไข้ และเจ็บคอ) กับเภสัชกรในร้านขายยาที่โตเกียวเพื่อขอยาบรรเทาอาการหวัด' },
    { title: 'เรียกรถแท็กซี่โอซาก้า', desc: 'บอกจุดหมายคนขับแท็กซี่และจ่ายด้วยบัตรเครดิต', prompt: 'การคุยกับคนขับรถแท็กซี่ที่โอซาก้าเพื่อแจ้งจุดหมายปลายทางไปยังโรงแรม และสอบถามว่าชำระเงินด้วยบัตรเครดิตได้หรือไม่' },
    { title: 'ซื้อตั๋วเข้า Shibuya Sky', desc: 'ถามราคาตั๋วและช่วงเวลาเข้าชมกับพนักงานขาย', prompt: 'การสอบถามราคาตั๋วและขอซื้อตั๋วเข้าจุดชมวิว Shibuya Sky สำหรับผู้ใหญ่ 2 คนในช่วงเวลาเย็นเพื่อชมพระอาทิตย์ตก' }
  ];

  // 1. Initial Load of Situations from local state and LocalStorage
  useEffect(() => {
    loadAllSituations();

    // Load API Key
    const savedKey = localStorage.getItem('nihongogo_gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const loadAllSituations = () => {
    const customSitsRaw = localStorage.getItem('nihongogo_custom_situations');
    let customSits: Situation[] = [];
    if (customSitsRaw) {
      try {
        customSits = JSON.parse(customSitsRaw);
      } catch (e) {
        console.error("Failed to parse custom situations", e);
      }
    }
    setAllSituations([...situationsData, ...customSits]);
  };

  const activeSituation = allSituations.find(sit => sit.id === activeSitId) || allSituations[0] || situationsData[0];

  // Reset tab and game when switching situations
  useEffect(() => {
    stopFullSpeech();
    setActiveCardTab('dialogue');
    setGameFinished(false);
  }, [activeSitId]);

  // Icons based on situation ID
  const getSitIcon = (id: string) => {
    switch (id) {
      case 'greetings': return <User size={20} />;
      case 'restaurant': return <Coffee size={20} />;
      case 'directions': return <Compass size={20} />;
      case 'shopping': return <ShoppingBag size={20} />;
      default: return <Sparkles size={20} style={{ color: 'var(--secondary)' }} />;
    }
  };

  // Speak a single dialogue bubble line
  const handleSpeakLine = async (line: DialogueLine, idx: number) => {
    if (isPlayingFull) return;
    setSpeakingLineIdx(idx);
    await speakJapanese(line.japanese);
    setSpeakingLineIdx(null);
  };

  // Speak a vocab word
  const handleSpeakVocab = async (word: string) => {
    setSpeakingVocabWord(word);
    await speakJapanese(word);
    setSpeakingVocabWord(null);
  };

  // Stop full speech sequence
  const stopFullSpeech = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingFull(false);
    setSpeakingLineIdx(null);
  };

  // Play full conversation dialogue in order
  const handlePlayFullConversation = async () => {
    if (isPlayingFull) {
      stopFullSpeech();
      return;
    }

    setIsPlayingFull(true);
    const dialogue = activeSituation.dialogue;
    
    for (let i = 0; i < dialogue.length; i++) {
      if (!window.speechSynthesis) break;
      
      setSpeakingLineIdx(i);
      await speakJapanese(dialogue[i].japanese);
      
      // Delay slightly between speakers
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Break loop if cancelled
      if (!isPlayingFull) break;
    }
    
    setIsPlayingFull(false);
    setSpeakingLineIdx(null);
  };

  // Save API Key
  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (key.trim()) {
      localStorage.setItem('nihongogo_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('nihongogo_gemini_api_key');
    }
  };

  // Delete custom situation
  const handleDeleteSituation = (sitIdToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingFull) stopFullSpeech();

    const customSitsRaw = localStorage.getItem('nihongogo_custom_situations');
    let customSits: Situation[] = [];
    if (customSitsRaw) {
      try {
        customSits = JSON.parse(customSitsRaw);
      } catch (e) {}
    }
    const updatedCustom = customSits.filter(item => item.id !== sitIdToDelete);
    localStorage.setItem('nihongogo_custom_situations', JSON.stringify(updatedCustom));
    
    // Fallback active item
    if (activeSitId === sitIdToDelete) {
      setActiveSitId('greetings');
    }

    // Refresh state
    setAllSituations([...situationsData, ...updatedCustom]);
  };

  // 2. AI Scenario Retrieval from Gemini API
  const handleGenerateAiSituation = async (promptDescription: string) => {
    if (!apiKey) {
      setShowApiSettings(true);
      setAiError("กรุณาใส่ Google Gemini API Key ก่อนเรียกใช้ระบบ AI ครับ");
      return;
    }

    setIsGeneratingAi(true);
    setAiError(null);

    const promptText = `
You are a native Japanese language tutor who writes highly engaging, educational dialogues for Thai learners.
The user wants a dialogue and vocabulary list for the situation: "${promptDescription}".
Please design:
1. A Title in English and Thai.
2. A brief 1-sentence Description in Thai.
3. An interactive dialogue bubble feed between 2 speakers (Somchai and a Japanese Local/Staff). The dialogue must be 4 to 6 lines long, highly natural, practical, and polite Japanese.
4. A vocabulary list containing 5 to 7 key vocabulary words used in this dialogue, with Kanji/Kana, Reading, Romaji, and Thai translation.

You MUST return ONLY a JSON object and nothing else. No markdown, no additional explanation.
The JSON object must strictly match this TypeScript interface:
{
  "id": string, // A unique ID (e.g. "custom_hotel_1")
  "title": string, // English Title (e.g. "Checking in at hotel")
  "thaiTitle": string, // Thai Title (e.g. "การเช็กอินที่เคาน์เตอร์โรงแรม")
  "description": string, // Thai description of the scenario (e.g. "บทสนทนาโต้ตอบสำหรับเช็กอินโรงแรมและขอรหัสไวไฟ")
  "dialogue": [
    {
      "speaker": string, // e.g. "Somchai" or "Staff"
      "japanese": string, // The Japanese sentence (with Kanji and Kana) (e.g. "すみません、チェックインをお願いします。")
      "romaji": string, // Romaji spelling (e.g. "Sumimasen, chekkuin wo onegaishimasu.")
      "thai": string // Natural Thai translation (e.g. "ขอโทษนะครับ ขอเช็กอินหน่อยครับ")
    }
  ],
  "vocabList": [
    {
      "word": string, // Kanji or Japanese word (e.g. "チェックイン")
      "reading": string, // Hiragana reading (e.g. "ちぇっくいん")
      "romaji": string, // Romaji (e.g. "chekkuin")
      "thai": string, // Thai translation (e.g. "การเช็กอิน")
      "category": "travel", // Choose from "general" | "greetings" | "food" | "places" | "numbers" | "family" | "travel" | "shopping" | "emergency" | "time" | "verbs" | "adjectives"
      "level": "custom",
      "pos": "noun" // Choose from "noun" | "verb" | "adjective" | "adverb" | "expression"
    }
  ]
}
Do not wrap the output in \`\`\`json or \`\`\` markdown blocks. Return only the raw JSON string. If you cannot generate the specific request, make a close practical guess.
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
        throw new Error("ระบบ API มีปัญหากรุณาลองใหม่อีกครั้ง หรือตรวจสอบคีย์การเข้าถึง");
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Clean up markdown markers
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

      const newSituation: Situation = JSON.parse(cleanedJsonText);
      
      // Inject unique ID based on timestamp
      newSituation.id = 'ai_' + Date.now();

      // Save to localStorage
      const customSitsRaw = localStorage.getItem('nihongogo_custom_situations');
      let customSits: Situation[] = [];
      if (customSitsRaw) {
        try {
          customSits = JSON.parse(customSitsRaw);
        } catch (e) {}
      }
      const updatedCustom = [newSituation, ...customSits];
      localStorage.setItem('nihongogo_custom_situations', JSON.stringify(updatedCustom));

      // Update state and focus the new situation
      setAllSituations([...situationsData, ...updatedCustom]);
      setActiveSitId(newSituation.id);
      setCustomPrompt('');
      
    } catch (e: any) {
      console.error(e);
      setAiError(e.message || "ล้มเหลวในการส่งข้อมูลเจเนอเรตกับ AI กรุณาลองใหม่อีกครั้งครับ");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // 3. Manual Scenario Creation
  const handleAddManualDialogueRow = () => {
    setManualDialogue([...manualDialogue, { speaker: 'Somchai', japanese: '', romaji: '', thai: '' }]);
  };

  const handleRemoveDialogueRow = (idx: number) => {
    setManualDialogue(manualDialogue.filter((_, i) => i !== idx));
  };

  const handleAddManualVocabRow = () => {
    setManualVocab([...manualVocab, { word: '', reading: '', romaji: '', thai: '' }]);
  };

  const handleRemoveVocabRow = (idx: number) => {
    setManualVocab(manualVocab.filter((_, i) => i !== idx));
  };

  const handleSaveManualSituation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualThaiTitle || !manualTitle) return;

    // Build the VocabItem list with required attributes
    const vocabItemsList: VocabItem[] = manualVocab
      .filter(v => v.word && v.thai)
      .map(v => ({
        word: v.word,
        reading: v.reading || v.word,
        romaji: v.romaji || '',
        thai: v.thai,
        category: 'general',
        level: 'custom',
        pos: 'noun'
      }));

    const newManualSit: Situation = {
      id: 'manual_' + Date.now(),
      title: manualTitle,
      thaiTitle: manualThaiTitle,
      description: manualDesc || 'สถานการณ์ป้อนมือส่วนตัว',
      dialogue: manualDialogue.filter(d => d.japanese && d.thai),
      vocabList: vocabItemsList
    };

    // Save
    const customSitsRaw = localStorage.getItem('nihongogo_custom_situations');
    let customSits: Situation[] = [];
    if (customSitsRaw) {
      try {
        customSits = JSON.parse(customSitsRaw);
      } catch (e) {}
    }
    const updatedCustom = [newManualSit, ...customSits];
    localStorage.setItem('nihongogo_custom_situations', JSON.stringify(updatedCustom));

    setAllSituations([...situationsData, ...updatedCustom]);
    setActiveSitId(newManualSit.id);
    
    // Reset manual form
    setManualTitle('');
    setManualThaiTitle('');
    setManualDesc('');
    setManualDialogue([
      { speaker: 'Somchai', japanese: '', romaji: '', thai: '' },
      { speaker: 'Staff', japanese: '', romaji: '', thai: '' }
    ]);
    setManualVocab([{ word: '', reading: '', romaji: '', thai: '' }]);
    setShowManualForm(false);
  };

  // 4. Scenario-Specific Matching Game Logic
  const startMatchingGame = () => {
    const pool = activeSituation.vocabList || [];
    if (pool.length < 3) return; // Need at least some words to play

    setGameJapaneseWords([...pool].sort(() => 0.5 - Math.random()));
    setGameThaiWords([...pool].sort(() => 0.5 - Math.random()));
    setSelectedJa(null);
    setSelectedTh(null);
    setMatchedIds([]);
    setWrongMatch(null);
    setGameScore(0);
    setGameFinished(false);
  };

  // Initialize matching game when switching tab
  useEffect(() => {
    if (activeCardTab === 'game') {
      startMatchingGame();
    }
  }, [activeCardTab, activeSitId]);

  const handleSelectGameJa = (item: VocabItem) => {
    if (matchedIds.includes(item.word)) return;
    setSelectedJa(item);
    speakJapanese(item.word);
    checkGameMatch(item, selectedTh);
  };

  const handleSelectGameTh = (item: VocabItem) => {
    if (matchedIds.includes(item.word)) return;
    setSelectedTh(item);
    checkGameMatch(selectedJa, item);
  };

  const checkGameMatch = (ja: VocabItem | null, th: VocabItem | null) => {
    if (!ja || !th) return;

    if (ja.word === th.word) {
      setMatchedIds(prev => [...prev, ja.word]);
      setSelectedJa(null);
      setSelectedTh(null);
      setGameScore(prev => prev + Math.floor(100 / (activeSituation.vocabList?.length || 5)));

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

  return (
    <div className="container animate-fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ margin: 0 }} className="gradient-text">บทสนทนาตามสถานการณ์ (シチュエーション)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            เลือกบทสนทนาจำลองในชีวิตประจำวันเพื่อออกเสียงโต้ตอบ เล่นเกม และใช้ AI โหลดบทเรียนใหม่แบบไร้ขีดจำกัด
          </p>
        </div>
        
        {/* Toggle Manual Form Button */}
        <button 
          className="btn btn-secondary" 
          onClick={() => setShowManualForm(!showManualForm)}
          style={{ borderColor: 'var(--border)' }}
        >
          <Plus size={18} />
          <span>เขียนสถานการณ์เอง</span>
        </button>
      </div>

      {/* Manual Creation Form Drawer */}
      {showManualForm && (
        <div className="glass-card animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'left', borderColor: 'var(--primary)' }}>
          <h2 style={{ margin: '0 0 1.5rem 0', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ➕ เขียนคำศัพท์และบทสนทนาจำลองด้วยตัวเอง
          </h2>
          <form onSubmit={handleSaveManualSituation} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Title / Description info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="responsive-split">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>หัวข้อภาษาไทย*</label>
                <input 
                  type="text" required placeholder="เช่น สั่งอาหารในโรงแรม" 
                  value={manualThaiTitle} onChange={e => setManualThaiTitle(e.target.value)}
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>หัวข้อภาษาอังกฤษ*</label>
                <input 
                  type="text" required placeholder="เช่น Ordering Food in Room Service" 
                  value={manualTitle} onChange={e => setManualTitle(e.target.value)}
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>คำอธิบายสั้นๆ</label>
              <input 
                type="text" placeholder="เช่น การโทรศัพท์สั่งรูมเซอร์วิสเป็นภาษาญี่ปุ่นง่ายๆ" 
                value={manualDesc} onChange={e => setManualDesc(e.target.value)}
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
              />
            </div>

            {/* Dialogue Rows Builder */}
            <div>
              <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--secondary)' }}>💬 บรรทัดบทสนทนาโต้ตอบ</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {manualDialogue.map((row, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '0.5fr 1.5fr 1fr 1.5fr 40px', gap: '0.5rem', alignItems: 'center' }} className="responsive-split">
                    <input 
                      type="text" placeholder="ชื่อผู้พูด (เช่น Somchai)" value={row.speaker} 
                      onChange={e => {
                        const newD = [...manualDialogue];
                        newD[idx].speaker = e.target.value;
                        setManualDialogue(newD);
                      }}
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.6rem', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                    <input 
                      type="text" placeholder="ภาษาญี่ปุ่น (คันจิ/คานะ)*" value={row.japanese} required
                      onChange={e => {
                        const newD = [...manualDialogue];
                        newD[idx].japanese = e.target.value;
                        setManualDialogue(newD);
                      }}
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.6rem', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                    <input 
                      type="text" placeholder="คำอ่านโรมันจิ" value={row.romaji} 
                      onChange={e => {
                        const newD = [...manualDialogue];
                        newD[idx].romaji = e.target.value;
                        setManualDialogue(newD);
                      }}
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.6rem', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                    <input 
                      type="text" placeholder="คำแปลภาษาไทย*" value={row.thai} required
                      onChange={e => {
                        const newD = [...manualDialogue];
                        newD[idx].thai = e.target.value;
                        setManualDialogue(newD);
                      }}
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.6rem', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveDialogueRow(idx)}
                      disabled={manualDialogue.length <= 1}
                      style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', opacity: manualDialogue.length <= 1 ? 0.3 : 1 }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                type="button" onClick={handleAddManualDialogueRow} 
                className="btn btn-secondary" 
                style={{ marginTop: '0.75rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }}
              >
                + เพิ่มแถวบทสนทนา
              </button>
            </div>

            {/* Vocab List Rows Builder */}
            <div>
              <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent)' }}>📚 คำศัพท์เด่นของสถานการณ์</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {manualVocab.map((row, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.5fr 40px', gap: '0.5rem', alignItems: 'center' }} className="responsive-split">
                    <input 
                      type="text" placeholder="คำศัพท์ญี่ปุ่น (เช่น 部屋)" value={row.word} required
                      onChange={e => {
                        const newV = [...manualVocab];
                        newV[idx].word = e.target.value;
                        setManualVocab(newV);
                      }}
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.6rem', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                    <input 
                      type="text" placeholder="คำอ่านคานะ (เช่น へや)" value={row.reading}
                      onChange={e => {
                        const newV = [...manualVocab];
                        newV[idx].reading = e.target.value;
                        setManualVocab(newV);
                      }}
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.6rem', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                    <input 
                      type="text" placeholder="โรมันจิ (เช่น heya)" value={row.romaji}
                      onChange={e => {
                        const newV = [...manualVocab];
                        newV[idx].romaji = e.target.value;
                        setManualVocab(newV);
                      }}
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.6rem', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                    <input 
                      type="text" placeholder="ความหมายไทย* (เช่น ห้อง)" value={row.thai} required
                      onChange={e => {
                        const newV = [...manualVocab];
                        newV[idx].thai = e.target.value;
                        setManualVocab(newV);
                      }}
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.6rem', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveVocabRow(idx)}
                      disabled={manualVocab.length <= 1}
                      style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', opacity: manualVocab.length <= 1 ? 0.3 : 1 }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                type="button" onClick={handleAddManualVocabRow} 
                className="btn btn-secondary" 
                style={{ marginTop: '0.75rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }}
              >
                + เพิ่มช่องคำศัพท์
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>บันทึกสถานการณ์จำลอง</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowManualForm(false)}>ยกเลิก</button>
            </div>

          </form>
        </div>
      )}

      {/* Gemini API Settings Panel (Accordion) */}
      <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem', textAlign: 'left', borderColor: showApiSettings ? 'var(--secondary)' : 'var(--border)' }}>
        <div 
          onClick={() => setShowApiSettings(!showApiSettings)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 600 }}>
            <Key size={18} style={{ color: 'var(--secondary)' }} />
            <span>⚙️ ตั้งค่าระบบเจเนอเรต AI ประจำบทเรียน (Gemini AI Engine)</span>
            <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', background: apiKey ? 'rgba(82, 183, 136, 0.15)' : 'rgba(255,255,255,0.05)', color: apiKey ? 'var(--success)' : 'var(--text-muted)' }}>
              {apiKey ? '● เปิดใช้งานแล้ว' : '○ ยังไม่ได้ใส่คีย์'}
            </span>
          </div>
          {showApiSettings ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {showApiSettings && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="animate-fade-in">
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              ใส่ **Gemini API Key** ของคุณเพื่อรับฟีเจอร์แปลและสร้างบทสนทนาอัจฉริยะตามสั่งได้ในคลิกเดียว! 
              ขอรับคีย์ฟรีด่วนได้ผ่าน <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>Google AI Studio</a>
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

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: '2rem' }} className="responsive-split">
        
        {/* LEFT COLUMN: List of Situations & Preset AI generator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Preset Topics Panel */}
          <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
              <Sparkles size={16} /> โหลดบทเรียนสำเร็จรูปด้วย AI (คลิกเดียว)
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {presetAiTopics.map((topic, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleGenerateAiSituation(topic.prompt)}
                  disabled={isGeneratingAi}
                  className="btn btn-secondary"
                  style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.6rem 0.5rem',
                    textAlign: 'center', 
                    whiteSpace: 'normal',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '65px',
                    lineHeight: '1.2'
                  }}
                  title={topic.desc}
                >
                  <strong style={{ display: 'block', fontSize: '0.8rem', color: '#fff', marginBottom: '2px' }}>{topic.title}</strong>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{topic.desc}</span>
                </button>
              ))}
            </div>

            {/* Custom Prompt Box */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>หรือระบุสถานการณ์แบบกำหนดเองที่คุณอยากเรียน:</span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <input 
                  type="text" 
                  placeholder="เช่น สั่งเบียร์ที่บาร์ในโตเกียว" 
                  value={customPrompt} 
                  onChange={e => setCustomPrompt(e.target.value)}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: '#fff', fontSize: '0.8rem' }}
                />
                <button 
                  onClick={() => handleGenerateAiSituation(customPrompt)}
                  disabled={isGeneratingAi || !customPrompt.trim()}
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                >
                  <Sparkles size={14} />
                  <span>สร้าง ✨</span>
                </button>
              </div>
            </div>

            {aiError && (
              <div style={{ fontSize: '0.8rem', color: 'var(--primary)', background: 'rgba(255,117,151,0.1)', padding: '0.5rem', borderRadius: '6px', display: 'flex', gap: '4px' }}>
                <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{aiError}</span>
              </div>
            )}

            {isGeneratingAi && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem', color: 'var(--secondary)', fontSize: '0.85rem' }}>
                <RefreshCw size={16} className="spin-icon" />
                <span>กำลังวิเคราะห์บทเรียนและเสียงพูด...</span>
              </div>
            )}

          </div>

          {/* List of situations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'left', fontWeight: 600, paddingLeft: '4px' }}>เลือกหัวข้อเรียนรู้:</span>
            
            {allSituations.map(sit => {
              const isActive = sit.id === activeSitId;
              const isCustom = sit.id.startsWith('ai_') || sit.id.startsWith('manual_');
              
              return (
                <button
                  key={sit.id}
                  onClick={() => setActiveSitId(sit.id)}
                  className="btn btn-secondary animate-fade-in"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textAlign: 'left',
                    padding: '0.9rem 1rem',
                    borderColor: isActive ? 'var(--primary)' : 'var(--border)',
                    background: isActive ? 'rgba(255, 117, 151, 0.1)' : 'var(--card-bg)',
                    color: isActive ? 'var(--primary)' : 'var(--text-main)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      padding: '6px',
                      borderRadius: '8px',
                      background: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                      color: isActive ? '#fff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getSitIcon(sit.id)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{sit.thaiTitle}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sit.title}</div>
                    </div>
                  </div>

                  {/* Delete custom situation trigger */}
                  {isCustom && (
                    <button 
                      onClick={(e) => handleDeleteSituation(sit.id, e)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                      title="ลบบทสนทนาที่สร้างขึ้นนี้"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Active dialogue bubbles, vocab, matching game */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left', minHeight: '500px' }}>
          
          {/* Situation Title bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 700 }}>{activeSituation.thaiTitle}</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>คำอธิบาย: {activeSituation.description}</span>
            </div>
            
            <button 
              className="btn btn-primary" 
              onClick={handlePlayFullConversation}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              {isPlayingFull ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlayingFull ? 'หยุดฟัง' : 'ฟังบทสนทนาทั้งหมด 🔊'}</span>
            </button>
          </div>

          {/* Cards Tabs switcher: Dialogue / Vocab List / Mini-Game */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '0.25rem', borderRadius: '10px', width: 'fit-content' }}>
            <button 
              className={`tab-btn ${activeCardTab === 'dialogue' ? 'active' : ''}`}
              onClick={() => setActiveCardTab('dialogue')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              <MessageSquare size={14} />
              <span>บทสนทนา ({activeSituation.dialogue.length})</span>
            </button>
            <button 
              className={`tab-btn ${activeCardTab === 'vocab' ? 'active' : ''}`}
              onClick={() => setActiveCardTab('vocab')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              <BookOpen size={14} />
              <span>คำศัพท์เด่น ({activeSituation.vocabList?.length || 0})</span>
            </button>
            <button 
              className={`tab-btn ${activeCardTab === 'game' ? 'active' : ''}`}
              onClick={() => setActiveCardTab('game')}
              disabled={!activeSituation.vocabList || activeSituation.vocabList.length < 3}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', fontSize: '0.85rem', opacity: (!activeSituation.vocabList || activeSituation.vocabList.length < 3) ? 0.4 : 1 }}
              title={(!activeSituation.vocabList || activeSituation.vocabList.length < 3) ? 'ต้องการคำศัพท์อย่างน้อย 3 คำเพื่อเล่นเกม' : ''}
            >
              <HelpCircle size={14} />
              <span>มินิเกมจับคู่</span>
            </button>
          </div>

          {/* TAB CONTENT: DIALOGUE FEED */}
          {activeCardTab === 'dialogue' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
              {activeSituation.dialogue.map((line, idx) => {
                const isSpeaking = speakingLineIdx === idx;
                const isUser = line.speaker.toLowerCase() === 'somchai' || line.speaker.toLowerCase() === 'b' || line.speaker.includes('สมชาย');
                
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      animation: 'fadeIn 0.3s ease forwards',
                      opacity: isSpeaking ? 1 : 0.85,
                      transform: isSpeaking ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', alignSelf: isUser ? 'flex-end' : 'flex-start' }}>
                      👤 {line.speaker}
                    </div>
                    
                    {/* Bubble card */}
                    <div 
                      style={{ 
                        background: isUser ? 'rgba(255, 117, 151, 0.12)' : 'rgba(100, 223, 223, 0.08)',
                        border: '1px solid',
                        borderColor: isSpeaking ? 'var(--primary)' : isUser ? 'rgba(255, 117, 151, 0.2)' : 'rgba(100, 223, 223, 0.2)',
                        padding: '1rem',
                        borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '1.15rem', fontWeight: 500, fontFamily: 'var(--sans)', lineHeight: 1.5, margin: 0, color: 'var(--text-main)' }}>
                          {line.japanese}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--secondary)', textTransform: 'none', margin: '0.25rem 0' }}>
                          {line.romaji}
                        </p>
                        <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-main)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem', marginTop: '0.4rem', margin: '0.4rem 0 0 0' }}>
                          {line.thai}
                        </p>
                      </div>

                      <button 
                        onClick={() => handleSpeakLine(line, idx)}
                        disabled={isPlayingFull}
                        style={{ 
                          background: 'transparent', 
                          border: 'none', 
                          color: 'var(--primary)', 
                          cursor: isPlayingFull ? 'not-allowed' : 'pointer',
                          padding: '4px',
                          alignSelf: 'center',
                          opacity: isPlayingFull ? 0.3 : 1
                        }}
                      >
                        <Volume2 size={18} className={isSpeaking ? 'pulse-light' : ''} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB CONTENT: VOCABULARY GRID */}
          {activeCardTab === 'vocab' && (
            <div style={{ marginTop: '0.5rem' }}>
              {activeSituation.vocabList && activeSituation.vocabList.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {activeSituation.vocabList.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="glass-card animate-fade-in"
                      style={{ 
                        padding: '1.25rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.4rem',
                        justifyContent: 'space-between',
                        border: '1px solid var(--border)',
                        background: 'rgba(255,255,255,0.02)'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
                          {item.pos === 'noun' ? 'คำนาม' : item.pos === 'verb' ? 'คำกริยา' : item.pos === 'adjective' ? 'คุณศัพท์' : 'สำนวน'}
                        </span>
                        <h4 style={{ margin: '0.25rem 0 0.1rem 0', fontSize: '1.4rem', fontWeight: 700 }}>{item.word}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'block' }}>読み: {item.reading}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontStyle: 'italic', marginBottom: '0.5rem' }}>{item.romaji}</span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{item.thai}</span>
                        <button 
                          onClick={() => handleSpeakVocab(item.word)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                        >
                          <Volume2 size={16} className={speakingVocabWord === item.word ? 'pulse-light' : ''} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <AlertCircle size={32} style={{ margin: '0 auto 0.75rem auto' }} />
                  <p>สถานการณ์จำลองนี้ไม่มีรายการคำศัพท์กำกับแยกต่างหาก</p>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: SCENARIO MATCHING GAME */}
          {activeCardTab === 'game' && activeSituation.vocabList && (
            <div style={{ marginTop: '0.5rem' }}>
              {!gameFinished ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>🧩 ฝึกจับคู่คำศัพท์ในหัวข้อนี้เพื่อทบทวนความเข้าใจ</span>
                    <span>คะแนน: <strong style={{ color: 'var(--success)' }}>{gameScore}</strong></span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="responsive-split">
                    
                    {/* Game Ja */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {gameJapaneseWords.map((item, idx) => {
                        const isMatched = matchedIds.includes(item.word);
                        const isSelected = selectedJa?.word === item.word;
                        const isWrong = wrongMatch?.jaId === item.word;

                        return (
                          <button 
                            key={`gameja-${idx}`}
                            onClick={() => handleSelectGameJa(item)}
                            disabled={isMatched}
                            className="option-btn"
                            style={{ 
                              textAlign: 'center', 
                              opacity: isMatched ? 0.3 : 1,
                              borderColor: isSelected ? 'var(--primary)' : isWrong ? 'var(--primary)' : isMatched ? 'var(--success)' : 'var(--border)',
                              background: isSelected ? 'rgba(255, 117, 151, 0.15)' : isWrong ? 'rgba(255, 77, 119, 0.2)' : isMatched ? 'rgba(82, 183, 136, 0.1)' : 'rgba(0,0,0,0.15)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.25rem',
                              minHeight: '90px',
                              padding: '0.85rem',
                              width: '100%',
                              wordBreak: 'break-word',
                              whiteSpace: 'normal',
                              lineHeight: '1.3'
                            }}
                          >
                            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{item.word}</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>({item.reading})</span>
                            {isMatched && <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 500 }}>✓ คู่ถูกต้อง</span>}
                          </button>
                        );
                      })}
                    </div>

                    {/* Game Th */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {gameThaiWords.map((item, idx) => {
                        const isMatched = matchedIds.includes(item.word);
                        const isSelected = selectedTh?.word === item.word;
                        const isWrong = wrongMatch?.thId === item.word;

                        return (
                          <button 
                            key={`gameth-${idx}`}
                            onClick={() => handleSelectGameTh(item)}
                            disabled={isMatched}
                            className="option-btn"
                            style={{ 
                              textAlign: 'center', 
                              opacity: isMatched ? 0.3 : 1,
                              borderColor: isSelected ? 'var(--secondary)' : isWrong ? 'var(--primary)' : isMatched ? 'var(--success)' : 'var(--border)',
                              background: isSelected ? 'rgba(100, 223, 223, 0.15)' : isWrong ? 'rgba(255, 77, 119, 0.2)' : isMatched ? 'rgba(82, 183, 136, 0.1)' : 'rgba(0,0,0,0.15)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.25rem',
                              minHeight: '90px',
                              padding: '0.85rem',
                              width: '100%',
                              wordBreak: 'break-word',
                              whiteSpace: 'normal',
                              lineHeight: '1.3'
                            }}
                          >
                            <span style={{ fontSize: item.thai.length > 15 ? '0.85rem' : '0.95rem', fontWeight: 500 }}>{item.thai}</span>
                            {isMatched && <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 500 }}>✓ คู่ถูกต้อง</span>}
                          </button>
                        );
                      })}
                    </div>

                  </div>

                  {wrongMatch && (
                    <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                      ❌ ยังจับคู่ไม่ถูกต้อง ลองเลือกใหม่อีกทีนะครับ
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }} className="animate-fade-in">
                  <Award size={48} style={{ color: 'var(--warning)', margin: '0 auto 1rem auto' }} />
                  <h3>เยี่ยมยอด! จับคู่คำศัพท์ประจำบทครบถ้วน 🎉</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>คุณจดจำและเข้าใจคำศัพท์ประจำสถานการณ์นี้ได้อย่างสมบูรณ์</p>
                  <button className="btn btn-primary" onClick={startMatchingGame} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}>
                    <RefreshCw size={14} /> เล่นทบทวนอีกครั้ง
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Styles */}
      <style>{`
        .spin-icon {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
