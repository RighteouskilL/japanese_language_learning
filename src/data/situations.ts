import type { VocabItem } from './vocab';

export interface DialogueLine {
  speaker: string;
  japanese: string;
  romaji: string;
  thai: string;
}

export interface Situation {
  id: string;
  title: string;
  thaiTitle: string;
  description: string;
  dialogue: DialogueLine[];
  vocabList?: VocabItem[]; // Curated vocabulary for this specific situation
}

export const situationsData: Situation[] = [
  {
    id: 'greetings',
    title: 'First Meeting (Self Introduction)',
    thaiTitle: 'การเจอกันครั้งแรก (แนะนำตัว)',
    description: 'การทักทายและแนะนำตัวเบื้องต้นเมื่อพบคนญี่ปุ่นเป็นครั้งแรก',
    dialogue: [
      { speaker: 'Tanaka', japanese: 'はじめまして。たなかです。どうぞよろしくおねがいします。', romaji: 'Hajimemashite. Tanaka desu. Douzo yoroshiku onegaishimasu.', thai: 'ยินดีที่ได้รู้จักครับ ผมทานากะครับ ขอฝากเนื้อฝากตัวด้วยนะครับ' },
      { speaker: 'Somchai', japanese: 'はじめまして。ソムチャイです。タイからきました。こちらこそよろしくおねがいします。', romaji: 'Hajimemashite. Somuchai desu. Tai kara kimashite. Kochira koso yoroshiku onegaishimasu.', thai: 'ยินดีที่ได้รู้จักเช่นกันครับ ผมสมชายครับ มาจากประเทศไทยครับ ทางนี้ต่างหากครับที่ต้องขอฝากเนื้อฝากตัวด้วย' }
    ],
    vocabList: [
      { word: 'はじめまして', reading: 'はじめまして', romaji: 'hajimemashite', thai: 'ยินดีที่ได้รู้จัก (ใช้ในการพบกันครั้งแรก)', category: 'greetings', level: 'N5', pos: 'expression' },
      { word: 'どうぞよろしく', reading: 'どうぞよろしく', romaji: 'douzo yoroshiku', thai: 'ขอฝากเนื้อฝากตัวด้วย', category: 'greetings', level: 'N5', pos: 'expression' },
      { word: 'こちらこそ', reading: 'こちらこそ', romaji: 'kochira koso', thai: 'ทางนี้ต่างหาก / เช่นกันครับ/ค่ะ', category: 'greetings', level: 'N5', pos: 'expression' },
      { word: 'から来ました', reading: 'からきました', romaji: 'kara kimashite', thai: 'มาจาก... (เช่น มาจากประเทศไทย)', category: 'greetings', level: 'N5', pos: 'expression' }
    ]
  },
  {
    id: 'restaurant',
    title: 'Ordering Food at a Restaurant',
    thaiTitle: 'การสั่งอาหารในร้านอาหาร',
    description: 'การเรียกพนักงานและสั่งอาหารรวมถึงเครื่องดื่ม',
    dialogue: [
      { speaker: 'Somchai', japanese: 'すみません！メニューをください。', romaji: 'Sumimasen! Menyuu wo kudasai.', thai: 'ขอโทษนะครับ/ค่ะ ขอเมนูหน่อยครับ' },
      { speaker: 'Staff', japanese: 'はい、どうぞ。ご注文はお決まりですか？', romaji: 'Hai, douzo. Go-chuumon wa okimari desu ka?', thai: 'นี่ค่ะ ได้แล้วค่ะ สั่งอาหารเลยไหมคะ?' },
      { speaker: 'Somchai', japanese: 'これと、お茶を二つください。', romaji: 'Kore to, ocha wo futatsu kudasai.', thai: 'เอาอันนี้ แล้วก็น้ำชาสองแก้วครับ' },
      { speaker: 'Staff', japanese: 'かしこまりました。少々お待ちください。', romaji: 'Kashikomarimashita. Shou-shou omachi kudasai.', thai: 'รับทราบค่ะ กรุณารอสักครู่นะคะ' }
    ],
    vocabList: [
      { word: 'メニュー', reading: 'メニュー', romaji: 'menyuu', thai: 'เมนูอาหาร', category: 'food', level: 'N5', pos: 'noun' },
      { word: 'ください', reading: 'ください', romaji: 'kudasai', thai: 'ขอ... (ขอสิ่งของอย่างสุภาพ)', category: 'food', level: 'N5', pos: 'expression' },
      { word: 'お茶', reading: 'おちゃ', romaji: 'ocha', thai: 'น้ำชา / ชาเขียวร้อน', category: 'food', level: 'N5', pos: 'noun' },
      { word: '注文', reading: 'ちゅうもん', romaji: 'chuumon', thai: 'การสั่งอาหาร / คำสั่งซื้อ', category: 'food', level: 'N5', pos: 'noun' },
      { word: 'かしこまりました', reading: 'かしこまりました', romaji: 'kashikomarimashita', thai: 'รับทราบค่ะ / เข้าใจแล้วค่ะ (สุภาพอย่างยิ่งของบริกร)', category: 'food', level: 'N4', pos: 'expression' },
      { word: '少々お待ちください', reading: 'しょうしょうおまちください', romaji: 'shoushou omachi kudasai', thai: 'กรุณารอสักครู่นะคะ', category: 'food', level: 'N4', pos: 'expression' }
    ]
  },
  {
    id: 'directions',
    title: 'Asking for Directions',
    thaiTitle: 'การถามทาง',
    description: 'ถามพนักงานหรือคนผ่านไปมาเกี่ยวกับสถานที่และสถานีรถไฟ',
    dialogue: [
      { speaker: 'Somchai', japanese: 'すみません、駅はどこですか？', romaji: 'Sumimasen, eki wa doko desu ka?', thai: 'ขอโทษนะครับ สถานีรถไฟอยู่ที่ไหนครับ?' },
      { speaker: 'Passerby', japanese: 'あそこです。交番のとなりですよ。', romaji: 'Asoko desu. Kouban no tonari desu yo.', thai: 'ตรงโน้นครับ อยู่ข้างๆ ป้อมตำรวจนั่นเองครับ' },
      { speaker: 'Somchai', japanese: '歩いてどのくらいですか？', romaji: 'Aruite dono kurai desu ka?', thai: 'เดินไปใช้เวลาประมาณเท่าไหร่ครับ?' },
      { speaker: 'Passerby', japanese: '五分くらいですよ。', romaji: 'Gofun kurai desu yo.', thai: 'ประมาณ 5 นาทีครับ' },
      { speaker: 'Somchai', japanese: 'ありがとうございます！', romaji: 'Arigatou gozaimasu!', thai: 'ขอบคุณมากครับ!' }
    ],
    vocabList: [
      { word: '駅', reading: 'えき', romaji: 'eki', thai: 'สถานีรถไฟ', category: 'places', level: 'N5', pos: 'noun' },
      { word: 'どこですか', reading: 'どこですか', romaji: 'doko desu ka', thai: 'อยู่ที่ไหนครับ/ค่ะ', category: 'places', level: 'N5', pos: 'expression' },
      { word: '交番', reading: 'こうばん', romaji: 'kouban', thai: 'ป้อมตำรวจ', category: 'places', level: 'N5', pos: 'noun' },
      { word: 'となり', reading: 'となり', romaji: 'tonari', thai: 'ข้างๆ / ด้านข้าง', category: 'places', level: 'N5', pos: 'noun' },
      { word: '歩いて', reading: 'あるいて', romaji: 'aruite', thai: 'โดยการเดิน / เดินเท้า', category: 'travel', level: 'N5', pos: 'expression' },
      { word: 'どのくらい', reading: 'どのくらい', romaji: 'dono kurai', thai: 'ประมาณเท่าใด / นานแค่ไหน', category: 'travel', level: 'N5', pos: 'expression' },
      { word: '五分', reading: 'ごふん', romaji: 'gofun', thai: 'ห้านาที', category: 'time', level: 'N5', pos: 'noun' }
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping',
    thaiTitle: 'การซื้อของ',
    description: 'การสอบถามราคาสินค้าและการชำระเงิน',
    dialogue: [
      { speaker: 'Somchai', japanese: 'すみません、このかばんはいくらですか？', romaji: 'Sumimasen, kono kaban wa ikura desu ka?', thai: 'ขอโทษนะครับ กระเป๋าใบนี้ราคาเท่าไหร่ครับ?' },
      { speaker: 'Staff', japanese: 'それは三千円です。', romaji: 'Sore wa san-sen en desu.', thai: 'ใบนั้นราคา 3,000 เยนค่ะ' },
      { speaker: 'Somchai', japanese: 'じゃあ、これをください。クレジットカードは使えますか？', romaji: 'Jaa, kore wo kudasai. Kurejitto kaado wa tsukaemasu ka?', thai: 'งั้นเอาอันนี้ครับ ใช้บัตรเครดิตได้ไหมครับ?' },
      { speaker: 'Staff', japanese: 'はい、使えますよ。', romaji: 'Hai, tsukaemasu yo.', thai: 'ค่ะ ใช้ได้ค่ะ' }
    ],
    vocabList: [
      { word: '鞄', reading: 'かばん', romaji: 'kaban', thai: 'กระเป๋า', category: 'shopping', level: 'N5', pos: 'noun' },
      { word: 'いくらですか', reading: 'いくらですか', romaji: 'ikura desu ka', thai: 'ราคาเท่าไหร่ครับ/ค่ะ', category: 'shopping', level: 'N5', pos: 'expression' },
      { word: '三千円', reading: 'さんせんえん', romaji: 'san-sen en', thai: 'สามพันเยน', category: 'numbers', level: 'N5', pos: 'noun' },
      { word: 'じゃあ', reading: 'じゃあ', romaji: 'jaa', thai: 'งั้นก็... / ถ้าอย่างนั้น', category: 'greetings', level: 'N5', pos: 'expression' },
      { word: 'クレジットカード', reading: 'くれじっとかーど', romaji: 'kurejitto kaado', thai: 'บัตรเครดิต', category: 'shopping', level: 'N4', pos: 'noun' },
      { word: '使えますか', reading: 'つかえますか', romaji: 'tsukaemasu ka', thai: 'สามารถใช้ได้ไหมครับ/ค่ะ', category: 'shopping', level: 'N4', pos: 'expression' }
    ]
  }
];
