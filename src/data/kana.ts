export interface KanaChar {
  char: string;
  romaji: string;
  thai: string;
  type: 'hiragana' | 'katakana';
  example: {
    word: string;
    reading: string;
    meaning: string;
  };
}

export const hiraganaData: KanaChar[] = [
  // A-I-U-E-O
  { char: 'あ', romaji: 'a', thai: 'อะ/อา', type: 'hiragana', example: { word: 'あめ', reading: 'ame', meaning: 'ฝน / ลูกอม' } },
  { char: 'い', romaji: 'i', thai: 'อิ', type: 'hiragana', example: { word: 'いぬ', reading: 'inu', meaning: 'สุนัข' } },
  { char: 'う', romaji: 'u', thai: 'อุ', type: 'hiragana', example: { word: 'うみ', reading: 'umi', meaning: 'ทะเล' } },
  { char: 'え', romaji: 'e', thai: 'เอะ/เอ', type: 'hiragana', example: { word: 'えき', reading: 'eki', meaning: 'สถานีรถไฟ' } },
  { char: 'お', romaji: 'o', thai: 'โอะ/โอ', type: 'hiragana', example: { word: 'おかね', reading: 'okane', meaning: 'เงิน' } },
  
  // KA-KI-KU-KE-KO
  { char: 'か', romaji: 'ka', thai: 'คะ/คา', type: 'hiragana', example: { word: 'かさ', reading: 'kasa', meaning: 'ร่ม' } },
  { char: 'き', romaji: 'ki', thai: 'คิ', type: 'hiragana', example: { word: 'きっぷ', reading: 'kippu', meaning: 'ตั๋ว' } },
  { char: 'く', romaji: 'ku', thai: 'คุ', type: 'hiragana', example: { word: 'くるま', reading: 'kuruma', meaning: 'รถยนต์' } },
  { char: 'け', romaji: 'ke', thai: 'เคะ/เค', type: 'hiragana', example: { word: 'けいたい', reading: 'keitai', meaning: 'มือถือ' } },
  { char: 'こ', romaji: 'ko', thai: 'โคะ/โค', type: 'hiragana', example: { word: 'こころ', reading: 'kokoro', meaning: 'หัวใจ' } },
  
  // SA-SHI-SU-SE-SO
  { char: 'さ', romaji: 'sa', thai: 'สะ/สา', type: 'hiragana', example: { word: 'さかな', reading: 'sakana', meaning: 'ปลา' } },
  { char: 'し', romaji: 'shi', thai: 'ชิ', type: 'hiragana', example: { word: 'しんぶん', reading: 'shinbun', meaning: 'หนังสือพิมพ์' } },
  { char: 'す', romaji: 'su', thai: 'สุ', type: 'hiragana', example: { word: 'すし', reading: 'sushi', meaning: 'ซูชิ' } },
  { char: 'せ', romaji: 'se', thai: 'เสะ/เส', type: 'hiragana', example: { word: 'せんせい', reading: 'sensei', meaning: 'ครู / อาจารย์' } },
  { char: 'そ', romaji: 'so', thai: 'โซะ/โซ', type: 'hiragana', example: { word: 'そら', reading: 'sora', meaning: 'ท้องฟ้า' } },
  
  // TA-CHI-TSU-TE-TO
  { char: 'た', romaji: 'ta', thai: 'ตะ/ตา', type: 'hiragana', example: { word: 'たまご', reading: 'tamago', meaning: 'ไข่' } },
  { char: 'ち', romaji: 'chi', thai: 'จิ', type: 'hiragana', example: { word: 'ちず', reading: 'chizu', meaning: 'แผนที่' } },
  { char: 'つ', romaji: 'tsu', thai: 'สึ', type: 'hiragana', example: { word: 'つくえ', reading: 'tsukue', meaning: 'โต๊ะทำงาน' } },
  { char: 'て', romaji: 'te', thai: 'เตะ/เต', type: 'hiragana', example: { word: 'てがみ', reading: 'tegami', meaning: 'จดหมาย' } },
  { char: 'と', romaji: 'to', thai: 'โตะ/โต', type: 'hiragana', example: { word: '友達 (ともだち)', reading: 'tomodachi', meaning: 'เพื่อน' } },
  
  // NA-NI-NU-NE-NO
  { char: 'な', romaji: 'na', thai: 'นะ/นา', type: 'hiragana', example: { word: 'なつ', reading: 'natsu', meaning: 'ฤดูร้อน' } },
  { char: 'に', romaji: 'ni', thai: 'นิ', type: 'hiragana', example: { word: 'にほん', reading: 'nihon', meaning: 'ญี่ปุ่น' } },
  { char: 'ぬ', romaji: 'nu', thai: 'นุ', type: 'hiragana', example: { word: 'ぬいぐるみ', reading: 'nuigurumi', meaning: 'ตุ๊กตา' } },
  { char: 'ね', romaji: 'ne', thai: 'เนะ/เน', type: 'hiragana', example: { word: 'ねこ', reading: 'neko', meaning: 'แมว' } },
  { char: 'の', romaji: 'no', thai: 'โนะ/โน', type: 'hiragana', example: { word: 'のりもの', reading: 'norimono', meaning: 'ยานพาหนะ' } },
  
  // HA-HI-FU-HE-HO
  { char: 'は', romaji: 'ha', thai: 'ฮะ/ฮา', type: 'hiragana', example: { word: 'はな', reading: 'hana', meaning: 'ดอกไม้ / จมูก' } },
  { char: 'ひ', romaji: 'hi', thai: 'ฮิ', type: 'hiragana', example: { word: 'ひこうき', reading: 'hikouki', meaning: 'เครื่องบิน' } },
  { char: 'ふ', romaji: 'fu', thai: 'ฟุ/ฮุ', type: 'hiragana', example: { word: 'ふじさん', reading: 'fujisan', meaning: 'ภูเขาไฟฟูจิ' } },
  { char: 'へ', romaji: 'he', thai: 'เฮะ/เฮ', type: 'hiragana', example: { word: 'へや', reading: 'heya', meaning: 'ห้อง' } },
  { char: 'ほ', romaji: 'ho', thai: 'โฮะ/โฮ', type: 'hiragana', example: { word: 'ほん', reading: 'hon', meaning: 'หนังสือ' } },
  
  // MA-MI-MU-ME-MO
  { char: 'ま', romaji: 'ma', thai: 'มะ/มา', type: 'hiragana', example: { word: 'まつり', reading: 'matsuri', meaning: 'เทศกาล' } },
  { char: 'み', romaji: 'mi', thai: 'มิ', type: 'hiragana', example: { word: 'みず', reading: 'mizu', meaning: 'น้ำ' } },
  { char: 'む', romaji: 'mu', thai: 'มุ', type: 'hiragana', example: { word: 'むし', reading: 'mushi', meaning: 'แมลง' } },
  { char: 'め', romaji: 'me', thai: 'เมะ/เม', type: 'hiragana', example: { word: 'めがね', reading: 'megane', meaning: 'แว่นตา' } },
  { char: 'も', romaji: 'mo', thai: 'โมะ/โม', type: 'hiragana', example: { word: 'もも', reading: 'momo', meaning: 'ลูกท้อ' } },
  
  // YA-YU-YO
  { char: 'や', romaji: 'ya', thai: 'ยะ/ยา', type: 'hiragana', example: { word: 'やま', reading: 'yama', meaning: 'ภูเขา' } },
  { char: 'ゆ', romaji: 'yu', thai: 'ยุ', type: 'hiragana', example: { word: 'ゆき', reading: 'yuki', meaning: 'หิมะ' } },
  { char: 'よ', romaji: 'yo', thai: 'โยะ/โย', type: 'hiragana', example: { word: 'よる', reading: 'yoru', meaning: 'กลางคืน' } },
  
  // RA-RI-RU-RE-RO
  { char: 'ら', romaji: 'ra', thai: 'ระ/รา', type: 'hiragana', example: { word: 'らいげつ', reading: 'raigetsu', meaning: 'เดือนหน้า' } },
  { char: 'り', romaji: 'ri', thai: 'ริ', type: 'hiragana', example: { word: 'りんご', reading: 'ringo', meaning: 'แอปเปิ้ล' } },
  { char: 'る', romaji: 'ru', thai: 'รุ', type: 'hiragana', example: { word: 'るすばん', reading: 'rusuban', meaning: 'การเฝ้าบ้าน' } },
  { char: 'れ', romaji: 're', thai: 'เระ/เร', type: 'hiragana', example: { word: 'れいぞうこ', reading: 'reizouko', meaning: 'ตู้เย็น' } },
  { char: 'ろ', romaji: 'ro', thai: 'โระ/โร', type: 'hiragana', example: { word: 'ろく', reading: 'roku', meaning: 'หก (6)' } },
  
  // WA-WO-N
  { char: 'わ', romaji: 'wa', thai: 'วะ/วา', type: 'hiragana', example: { word: 'わたし', reading: 'watashi', meaning: 'ฉัน' } },
  { char: 'を', romaji: 'wo', thai: 'โวะ (คำช่วย)', type: 'hiragana', example: { word: '本をよむ', reading: 'hon wo yomu', meaning: 'อ่านหนังสือ' } },
  { char: 'ん', romaji: 'n', thai: 'อึน (ตัวสะกด)', type: 'hiragana', example: { word: 'てんき', reading: 'tenki', meaning: 'สภาพอากาศ' } }
];

export const katakanaData: KanaChar[] = [
  // A-I-U-E-O
  { char: 'ア', romaji: 'a', thai: 'อะ/อา', type: 'katakana', example: { word: 'アイス', reading: 'aisu', meaning: 'ไอศกรีม' } },
  { char: 'イ', romaji: 'i', thai: 'อิ', type: 'katakana', example: { word: 'インク', reading: 'inku', meaning: 'น้ำหมึก' } },
  { char: 'ウ', romaji: 'u', thai: 'อุ', type: 'katakana', example: { word: 'ウェブ', reading: 'webu', meaning: 'เว็บ' } },
  { char: 'エ', romaji: 'e', thai: 'เอะ/เอ', type: 'katakana', example: { word: 'エアコン', reading: 'eakon', meaning: 'แอร์' } },
  { char: 'オ', romaji: 'o', thai: 'โอะ/โอ', type: 'katakana', example: { word: 'オレンジ', reading: 'orenji', meaning: 'ส้ม' } },
  
  // KA-KI-KU-KE-KO
  { char: 'カ', romaji: 'ka', thai: 'คะ/คา', type: 'katakana', example: { word: 'カメラ', reading: 'kamera', meaning: 'กล้องถ่ายรูป' } },
  { char: 'キ', romaji: 'ki', thai: 'คิ', type: 'katakana', example: { word: 'ギター', reading: 'gitaa', meaning: 'กีตาร์' } },
  { char: 'ク', romaji: 'ku', thai: 'คุ', type: 'katakana', example: { word: 'クラス', reading: 'kurasu', meaning: 'ห้องเรียน' } },
  { char: 'ケ', romaji: 'ke', thai: 'เคะ/เค', type: 'katakana', example: { word: 'ケーキ', reading: 'keeki', meaning: 'เค้ก' } },
  { char: 'コ', romaji: 'ko', thai: 'โคะ/โค', type: 'katakana', example: { word: 'コーヒー', reading: 'koohii', meaning: 'กาแฟ' } },
  
  // SA-SHI-SU-SE-SO
  { char: 'サ', romaji: 'sa', thai: 'สะ/สา', type: 'katakana', example: { word: 'サラダ', reading: 'sarada', meaning: 'สลัด' } },
  { char: 'シ', romaji: 'shi', thai: 'ชิ', type: 'katakana', example: { word: 'シャツ', reading: 'shatsu', meaning: 'เสื้อเชิ้ต' } },
  { char: 'ス', romaji: 'su', thai: 'สุ', type: 'katakana', example: { word: 'スポーツ', reading: 'supootsu', meaning: 'กีฬา' } },
  { char: 'セ', romaji: 'se', thai: 'เสะ/เส', type: 'katakana', example: { word: 'センター', reading: 'sentaa', meaning: 'ศูนย์กลาง' } },
  { char: 'ソ', romaji: 'so', thai: 'โซะ/โซ', type: 'katakana', example: { word: 'ソフト', reading: 'sofuto', meaning: 'ซอฟต์แวร์' } },
  
  // TA-CHI-TSU-TE-TO
  { char: 'タ', romaji: 'ta', thai: 'ตะ/ตา', type: 'katakana', example: { word: 'タクシー', reading: 'takushii', meaning: 'แท็กซี่' } },
  { char: 'チ', romaji: 'chi', thai: 'จิ', type: 'katakana', example: { word: 'チーズ', reading: 'chiizu', meaning: 'ชีส' } },
  { char: 'ツ', romaji: 'tsu', thai: 'สึ', type: 'katakana', example: { word: 'ツアー', reading: 'tsuaa', meaning: 'ทัวร์' } },
  { char: 'テ', romaji: 'te', thai: 'เตะ/เต', type: 'katakana', example: { word: 'テレビ', reading: 'terebi', meaning: 'ทีวี' } },
  { char: 'ト', romaji: 'to', thai: 'โตะ/โต', type: 'katakana', example: { word: 'トイレ', reading: 'toire', meaning: 'ห้องน้ำ' } },
  
  // NA-NI-NU-NE-NO
  { char: 'ナ', romaji: 'na', thai: 'นะ/นา', type: 'katakana', example: { word: 'ナイフ', reading: 'naifu', meaning: 'มีด' } },
  { char: 'ニ', romaji: 'ni', thai: 'นิ', type: 'katakana', example: { word: 'ニュース', reading: 'nyuusu', meaning: 'ข่าว' } },
  { char: 'ヌ', romaji: 'nu', thai: 'นุ', type: 'katakana', example: { word: 'ヌードル', reading: 'nuudoru', meaning: 'บะหมี่' } },
  { char: 'ネ', romaji: 'ne', thai: 'เนะ/เน', type: 'katakana', example: { word: 'ネクタイ', reading: 'nekutai', meaning: 'เนคไท' } },
  { char: 'ノ', romaji: 'no', thai: 'โนะ/โน', type: 'katakana', example: { word: 'ノート', reading: 'nooto', meaning: 'สมุดบันทึก' } },
  
  // HA-HI-FU-HE-HO
  { char: 'ハ', romaji: 'ha', thai: 'ฮะ/ฮา', type: 'katakana', example: { word: 'ハム', reading: 'hamu', meaning: 'แฮม' } },
  { char: 'ヒ', romaji: 'hi', thai: 'ฮิ', type: 'katakana', example: { word: 'ヒーター', reading: 'hiitaa', meaning: 'เครื่องทำความร้อน' } },
  { char: 'フ', romaji: 'fu', thai: 'ฟุ/ฮุ', type: 'katakana', example: { word: 'フォーク', reading: 'fooku', meaning: 'ส้อม' } },
  { char: 'ヘ', romaji: 'he', thai: 'เฮะ/เฮ', type: 'katakana', example: { word: 'ヘリコプター', reading: 'herikoputaa', meaning: 'เฮลิคอปเตอร์' } },
  { char: 'ホ', romaji: 'ho', thai: 'โฮะ/โฮ', type: 'katakana', example: { word: 'ホテル', reading: 'hoteru', meaning: 'โรงแรม' } },
  
  // MA-MI-MU-ME-MO
  { char: 'マ', romaji: 'ma', thai: 'มะ/มา', type: 'katakana', example: { word: 'マフラー', reading: 'mafuraa', meaning: 'ผ้าพันคอ' } },
  { char: 'ミ', romaji: 'mi', thai: 'มิ', type: 'katakana', example: { word: 'ミルク', reading: 'miruku', meaning: 'นม' } },
  { char: 'ム', romaji: 'mu', thai: 'มุ', type: 'katakana', example: { word: 'ムービー', reading: 'muubii', meaning: 'ภาพยนตร์' } },
  { char: 'メ', romaji: 'me', thai: 'เมะ/เม', type: 'katakana', example: { word: 'メール', reading: 'meeru', meaning: 'อีเมล' } },
  { char: 'モ', romaji: 'mo', thai: 'โมะ/โม', type: 'katakana', example: { word: 'モデル', reading: 'moderaru', meaning: 'นายแบบ/นางแบบ' } },
  
  // YA-YU-YO
  { char: 'ヤ', romaji: 'ya', thai: 'ยะ/ยา', type: 'katakana', example: { word: 'ヤマ', reading: 'yama', meaning: 'ยามา (ชื่อเฉพาะ/ภูเขา)' } },
  { char: 'ユ', romaji: 'yu', thai: 'ยุ', type: 'katakana', example: { word: 'ユニホーム', reading: 'yunihoomu', meaning: 'เครื่องแบบ' } },
  { char: 'ヨ', romaji: 'yo', thai: 'โยะ/โย', type: 'katakana', example: { word: 'ヨーグルト', reading: 'yooguruto', meaning: 'โยเกิร์ต' } },
  
  // RA-RI-RU-RE-RO
  { char: 'ラ', romaji: 'ra', thai: 'ระ/รา', type: 'katakana', example: { word: 'ラジオ', reading: 'rajio', meaning: 'วิทยุ' } },
  { char: 'リ', romaji: 'ri', thai: 'ริ', type: 'katakana', example: { word: 'リボン', reading: 'ribon', meaning: 'ริบบิ้น' } },
  { char: 'ル', romaji: 'ru', thai: 'รุ', type: 'katakana', example: { word: 'ルール', reading: 'ruuru', meaning: 'กฎเกณฑ์' } },
  { char: 'レ', romaji: 're', thai: 'เระ/เร', type: 'katakana', example: { word: 'レストラン', reading: 'resutoran', meaning: 'ร้านอาหาร' } },
  { char: 'ロ', romaji: 'ro', thai: 'โระ/โร', type: 'katakana', example: { word: 'ロケット', reading: 'roketto', meaning: 'จรวด' } },
  
  // WA-WO-N
  { char: 'ワ', romaji: 'wa', thai: 'วะ/วา', type: 'katakana', example: { word: 'ワイシャツ', reading: 'waishatsu', meaning: 'เสื้อเชิ้ตขาว' } },
  { char: 'ヲ', romaji: 'wo', thai: 'โวะ (คำช่วย)', type: 'katakana', example: { word: 'ヲタ', reading: 'wota', meaning: 'โอตาคุ (ย่อ)' } },
  { char: 'ン', romaji: 'n', thai: 'อึน (ตัวสะกด)', type: 'katakana', example: { word: 'パン', reading: 'pan', meaning: 'ขนมปัง' } }
];
