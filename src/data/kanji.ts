export interface KanjiChar {
  kanji: string;
  strokes: number;
  meaning: string;
  kunyomi: string;
  onyomi: string;
  compounds: {
    word: string;
    reading: string;
    meaning: string;
  }[];
}

export const kanjiData: KanjiChar[] = [
  {
    kanji: '一',
    strokes: 1,
    meaning: 'หนึ่ง (1)',
    kunyomi: 'ひと・つ (hito-tsu)',
    onyomi: 'イチ (ichi) / イツ (itsu)',
    compounds: [
      { word: '一つ', reading: 'ひとつ (hitotsu)', meaning: 'หนึ่งชิ้น/หนึ่งอัน' },
      { word: '一人', reading: 'ひとり (hitori)', meaning: 'หนึ่งคน' },
      { word: '一日', reading: 'ついたち (tsuitachi)', meaning: 'วันที่ 1 ของเดือน' }
    ]
  },
  {
    kanji: '二',
    strokes: 2,
    meaning: 'สอง (2)',
    kunyomi: 'ふた・つ (futa-tsu)',
    onyomi: 'ニ (ni)',
    compounds: [
      { word: '二つ', reading: 'ふたつ (futatsu)', meaning: 'สองชิ้น/สองอัน' },
      { word: '二人', reading: 'ふたり (futari)', meaning: 'สองคน' },
      { word: '二日', reading: 'ふつか (futsuka)', meaning: 'วันที่ 2 หรือ 2 วัน' }
    ]
  },
  {
    kanji: '三',
    strokes: 3,
    meaning: 'สาม (3)',
    kunyomi: 'みっ・つ (mit-tsu)',
    onyomi: 'サン (san)',
    compounds: [
      { word: '三つ', reading: 'みっつ (mittsu)', meaning: 'สามชิ้น/สามอัน' },
      { word: '三人', reading: 'さんにん (sannin)', meaning: 'สามคน' },
      { word: '三日', reading: 'みっか (mikka)', meaning: 'วันที่ 3 หรือ 3 วัน' }
    ]
  },
  {
    kanji: '日',
    strokes: 4,
    meaning: 'พระอาทิตย์ / วัน / ญี่ปุ่น',
    kunyomi: 'ひ (hi) / び (bi) / か (ka)',
    onyomi: 'ニチ (nichi) / ジツ (jitsu)',
    compounds: [
      { word: '日本', reading: 'にほん (nihon)', meaning: 'ประเทศญี่ปุ่น' },
      { word: '日曜日', reading: 'にちようび (nichiyoubi)', meaning: 'วันอาทิตย์' },
      { word: '毎日', reading: 'まいにち (mainichi)', meaning: 'ทุกวัน' }
    ]
  },
  {
    kanji: '本',
    strokes: 5,
    meaning: 'หนังสือ / หนังสือพิมพ์ / แหล่งกำเนิด',
    kunyomi: 'もと (moto)',
    onyomi: 'ホン (hon)',
    compounds: [
      { word: '日本語', reading: 'にほんご (nihongo)', meaning: 'ภาษาญี่ปุ่น' },
      { word: '本屋', reading: 'ほんや (honya)', meaning: 'ร้านหนังสือ' },
      { word: '一本', reading: 'いっぽん (ippon)', meaning: 'หนึ่งแท่ง/หนึ่งขวด (ลักษณนามทรงยาว)' }
    ]
  },
  {
    kanji: '人',
    strokes: 2,
    meaning: 'คน / มนุษย์',
    kunyomi: 'ひと (hito)',
    onyomi: 'ジン (jin) / ニン (nin)',
    compounds: [
      { word: '日本人', reading: 'にほんじん (nihonjin)', meaning: 'คนญี่ปุ่น' },
      { word: 'タイ人', reading: 'たいじん (taijin)', meaning: 'คนไทย' },
      { word: '大人', reading: 'おとな (otona)', meaning: 'ผู้ใหญ่' }
    ]
  },
  {
    kanji: '木',
    strokes: 4,
    meaning: 'ต้นไม้ / ไม้',
    kunyomi: 'き (ki)',
    onyomi: 'モク (moku) / ボク (boku)',
    compounds: [
      { word: '木曜日', reading: 'もくようび (mokuyoubi)', meaning: 'วันพฤหัสบดี' },
      { word: '木立', reading: 'こだち (kodachi)', meaning: 'พุ่มไม้/ราวป่า' },
      { word: '大木', reading: 'たいぼく (taiboku)', meaning: 'ต้นไม้ใหญ่' }
    ]
  },
  {
    kanji: '水',
    strokes: 4,
    meaning: 'น้ำ',
    kunyomi: 'みず (mizu)',
    onyomi: 'スイ (sui)',
    compounds: [
      { word: '水曜日', reading: 'すいようび (suiyoubi)', meaning: 'วันพุธ' },
      { word: '水道', reading: 'すいどう (suidou)', meaning: 'ประปา/น้ำประปา' },
      { word: '海水', reading: 'かいすい (kaisui)', meaning: 'น้ำทะเล' }
    ]
  },
  {
    kanji: '金',
    strokes: 8,
    meaning: 'ทอง / เงิน (money)',
    kunyomi: 'かね (kane) / かな (kana)',
    onyomi: 'キン (kin) / コン (kon)',
    compounds: [
      { word: 'お金', reading: 'おかね (okane)', meaning: 'เงิน' },
      { word: '金曜日', reading: 'きんようび (kinyoubi)', meaning: 'วันศุกร์' },
      { word: '金メダル', reading: 'きんめだる (kin medaru)', meaning: 'เหรียญทอง' }
    ]
  },
  {
    kanji: '土',
    strokes: 3,
    meaning: 'ดิน / แผ่นดิน',
    kunyomi: 'つち (tsuchi)',
    onyomi: 'ド (do) / ト (to)',
    compounds: [
      { word: '土曜日', reading: 'どようび (doyoubi)', meaning: 'วันเสาร์' },
      { word: '土地', reading: 'とち (tochi)', meaning: 'ที่ดิน/ผืนดิน' },
      { word: '粘土', reading: 'ねんど (nendo)', meaning: 'ดินน้ำมัน/ดินเหนียว' }
    ]
  },
  {
    kanji: '山',
    strokes: 3,
    meaning: 'ภูเขา',
    kunyomi: 'やま (yama)',
    onyomi: 'サン (san)',
    compounds: [
      { word: '富士山', reading: 'ふじさん (fujisan)', meaning: 'ภูเขาไฟฟูจิ' },
      { word: '火山', reading: 'かざん (kazan)', meaning: 'ภูเขาไฟ' },
      { word: '山林', reading: 'さんりん (sanrin)', meaning: 'ป่าเขา' }
    ]
  },
  {
    kanji: '川',
    strokes: 3,
    meaning: 'แม่น้ำ / ลำธาร',
    kunyomi: 'かわ (kawa) / がわ (gawa)',
    onyomi: 'セン (sen)',
    compounds: [
      { word: '小川', reading: 'おがわ (ogawa)', meaning: 'ลำธารสายเล็กๆ' },
      { word: 'ナイル川', reading: 'ないるがわ (nairu gawa)', meaning: 'แม่น้ำไนล์' },
      { word: '川上', reading: 'かわかみ (kawakami)', meaning: 'ต้นน้ำ/เหนือน้ำ' }
    ]
  }
];
