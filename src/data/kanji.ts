export interface KanjiChar {
  kanji: string;
  strokes: number;
  meaning: string;
  kunyomi: string;
  onyomi: string;
  level: 'N5' | 'N4' | 'N3';
  compounds: {
    word: string;
    reading: string;
    meaning: string;
  }[];
}

export const kanjiData: KanjiChar[] = [
  // === JLPT N5 (80 Essential Characters) ===
  {
    kanji: '一',
    strokes: 1,
    meaning: 'หนึ่ง (1)',
    kunyomi: 'ひと・つ (hito-tsu)',
    onyomi: 'イチ (ichi) / イツ (itsu)',
    level: 'N5',
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
    level: 'N5',
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
    level: 'N5',
    compounds: [
      { word: '三つ', reading: 'みっつ (mittsu)', meaning: 'สามชิ้น/สามอัน' },
      { word: '三人', reading: 'さんにん (sannin)', meaning: 'สามคน' },
      { word: '三日', reading: 'みっか (mikka)', meaning: 'วันที่ 3 หรือ 3 วัน' }
    ]
  },
  {
    kanji: '四',
    strokes: 5,
    meaning: 'สี่ (4)',
    kunyomi: 'よっ・つ (yot-tsu) / よん (yon) / よ (yo)',
    onyomi: 'シ (shi)',
    level: 'N5',
    compounds: [
      { word: '四つ', reading: 'よっつ (yottsu)', meaning: 'สี่ชิ้น/สี่อัน' },
      { word: '四人', reading: 'よにん (yonin)', meaning: 'สี่คน' },
      { word: '四日', reading: 'よっか (yokka)', meaning: 'วันที่ 4 หรือ 4 วัน' }
    ]
  },
  {
    kanji: '五',
    strokes: 4,
    meaning: 'ห้า (5)',
    kunyomi: 'いつ・つ (itsu-tsu)',
    onyomi: 'ゴ (go)',
    level: 'N5',
    compounds: [
      { word: '五つ', reading: 'いつつ (itsutsu)', meaning: 'ห้าชิ้น/ห้าอัน' },
      { word: '五人', reading: 'ごにん (gonin)', meaning: 'ห้าคน' },
      { word: '五日', reading: 'いつか (itsuka)', meaning: 'วันที่ 5 หรือ 5 วัน' }
    ]
  },
  {
    kanji: '六',
    strokes: 4,
    meaning: 'หก (6)',
    kunyomi: 'むっ・つ (mut-tsu)',
    onyomi: 'ロク (roku)',
    level: 'N5',
    compounds: [
      { word: '六つ', reading: 'むっつ (muttsu)', meaning: 'หกชิ้น/หกอัน' },
      { word: '六人', reading: 'ろくにん (rokunin)', meaning: 'หกคน' },
      { word: '六日', reading: 'むいか (muika)', meaning: 'วันที่ 6 หรือ 6 วัน' }
    ]
  },
  {
    kanji: '七',
    strokes: 2,
    meaning: 'เจ็ด (7)',
    kunyomi: 'なな・つ (nana-tsu) / なな (nana)',
    onyomi: 'シチ (shichi)',
    level: 'N5',
    compounds: [
      { word: '七つ', reading: 'ななつ (nanatsu)', meaning: 'เจ็ดชิ้น/เจ็ดอัน' },
      { word: '七人', reading: 'ななにん (nananin) / しちにん (shichinin)', meaning: 'เจ็ดคน' },
      { word: '七日', reading: 'なのか (nanoka)', meaning: 'วันที่ 7 หรือ 7 วัน' }
    ]
  },
  {
    kanji: '八',
    strokes: 2,
    meaning: 'แปด (8)',
    kunyomi: 'やっ・つ (yat-tsu) / よう (you)',
    onyomi: 'ハチ (hachi)',
    level: 'N5',
    compounds: [
      { word: '八つ', reading: 'やっつ (yattsu)', meaning: 'แปดชิ้น/แปดอัน' },
      { word: '八人', reading: 'はちにん (hachinin)', meaning: 'แปดคน' },
      { word: '八日', reading: 'ようか (youka)', meaning: 'วันที่ 8 หรือ 8 วัน' }
    ]
  },
  {
    kanji: '九',
    strokes: 2,
    meaning: 'เก้า (9)',
    kunyomi: 'ここの・つ (kokono-tsu)',
    onyomi: 'キュウ (kyuu) / ク (ku)',
    level: 'N5',
    compounds: [
      { word: '九つ', reading: 'ここのつ (kokonotsu)', meaning: 'เก้าชิ้น/เก้าอัน' },
      { word: '九日', reading: 'ここのか (kokonoka)', meaning: 'วันที่ 9 หรือ 9 วัน' },
      { word: '九州', reading: 'きゅうしゅう (kyuushuu)', meaning: 'เกาะคิวชู' }
    ]
  },
  {
    kanji: '十',
    strokes: 2,
    meaning: 'สิบ (10)',
    kunyomi: 'とお (too) / と (to)',
    onyomi: 'ジュウ (juu) / ジッ (jit)',
    level: 'N5',
    compounds: [
      { word: '十日', reading: 'とおか (tooka)', meaning: 'วันที่ 10 หรือ 10 วัน' },
      { word: '十分', reading: 'じゅうぶん (juubun)', meaning: 'พอเพียง / 10 นาที' },
      { word: '十月', reading: 'じゅうがつ (juugatsu)', meaning: 'เดือนตุลาคม' }
    ]
  },
  {
    kanji: '百',
    strokes: 6,
    meaning: 'ร้อย (100)',
    kunyomi: 'もも (momo)',
    onyomi: 'ヒャク (hyaku) / ビャク (byaku) / ピャク (pyaku)',
    level: 'N5',
    compounds: [
      { word: '三百', reading: 'さんびゃく (sanbyaku)', meaning: 'สามร้อย (300)' },
      { word: '六百', reading: 'ろっぴゃく (roppyaku)', meaning: 'หกร้อย (600)' },
      { word: '八百', reading: 'ハッピャク (happyaku)', meaning: 'แปดร้อย (800)' }
    ]
  },
  {
    kanji: '千',
    strokes: 3,
    meaning: 'พัน (1,000)',
    kunyomi: 'ち (chi)',
    onyomi: 'セン (sen) / ゼン (zen)',
    level: 'N5',
    compounds: [
      { word: '千円', reading: 'せんえん (sen-en)', meaning: 'หนึ่งพันเยน' },
      { word: '三千', reading: 'さんぜん (sanzen)', meaning: 'สามพัน (3,000)' },
      { word: '千葉県', reading: 'ちばけん (chibaken)', meaning: 'จังหวัดชิบะ' }
    ]
  },
  {
    kanji: '万',
    strokes: 3,
    meaning: 'หมื่น (10,000)',
    kunyomi: 'よろず (yorozu)',
    onyomi: 'マン (man) / バン (ban)',
    level: 'N5',
    compounds: [
      { word: '一万円', reading: 'いちまんえん (ichiman-en)', meaning: 'หนึ่งหมื่นเยน' },
      { word: '万歳', reading: 'ばんざい (banzai)', meaning: 'ไชโย / หมื่นปี' },
      { word: '万国', reading: 'ばんこく (bankoku)', meaning: 'นานาชาติ / ทุกประเทศ' }
    ]
  },
  {
    kanji: '円',
    strokes: 4,
    meaning: 'วงกลม / เยน (¥)',
    kunyomi: 'まる・い (maru-i)',
    onyomi: 'エン (en)',
    level: 'N5',
    compounds: [
      { word: '百円', reading: 'ひゃくえん (hyakuen)', meaning: 'หนึ่งร้อยเยน' },
      { word: '円い', reading: 'まるい (marui)', meaning: 'กลม' },
      { word: '楕円', reading: 'だえん (daen)', meaning: 'วงรี' }
    ]
  },
  {
    kanji: '日',
    strokes: 4,
    meaning: 'พระอาทิตย์ / วัน',
    kunyomi: 'ひ (hi) / び (bi) / か (ka)',
    onyomi: 'ニチ (nichi) / ジツ (jitsu)',
    level: 'N5',
    compounds: [
      { word: '日本', reading: 'にほん (nihon) / にっぽん (nippon)', meaning: 'ประเทศญี่ปุ่น' },
      { word: '毎日', reading: 'まいにち (mainichi)', meaning: 'ทุกวัน' },
      { word: '日曜日', reading: 'にちようび (nichiyoubi)', meaning: 'วันอาทิตย์' }
    ]
  },
  {
    kanji: '本',
    strokes: 5,
    meaning: 'หนังสือ / หนังสือเรียน / รากฐาน',
    kunyomi: 'もと (moto)',
    onyomi: 'ホン (hon)',
    level: 'N5',
    compounds: [
      { word: '日本語', reading: 'にほんご (nihongo)', meaning: 'ภาษาญี่ปุ่น' },
      { word: '本屋', reading: 'ほんや (honya)', meaning: 'ร้านขายหนังสือ' },
      { word: '一本', reading: 'いっぽん (ippon)', meaning: 'หนึ่งเล่ม/หนึ่งแท่ง' }
    ]
  },
  {
    kanji: '人',
    strokes: 2,
    meaning: 'คน / มนุษย์',
    kunyomi: 'ひと (hito)',
    onyomi: 'ジン (jin) / ニン (nin)',
    level: 'N5',
    compounds: [
      { word: '日本人', reading: 'にほんじん (nihonjin)', meaning: 'คนญี่ปุ่น' },
      { word: '大人', reading: 'おとな (otona)', meaning: 'ผู้ใหญ่' },
      { word: '外国人', reading: 'がいこくじん (gaikokujin)', meaning: 'ชาวต่างชาติ' }
    ]
  },
  {
    kanji: '木',
    strokes: 4,
    meaning: 'ต้นไม้ / ไม้',
    kunyomi: 'き (ki) / こ (ko)',
    onyomi: 'モク (moku) / ボク (boku)',
    level: 'N5',
    compounds: [
      { word: '木曜日', reading: 'もくようび (mokuyoubi)', meaning: 'วันพฤหัสบดี' },
      { word: '大木', reading: 'たいぼく (taiboku)', meaning: 'ต้นไม้ใหญ่' },
      { word: '木刀', reading: 'ぼくとう (bokutou)', meaning: 'ดาบไม้' }
    ]
  },
  {
    kanji: '水',
    strokes: 4,
    meaning: 'น้ำ',
    kunyomi: 'みず (mizu)',
    onyomi: 'スイ (sui)',
    level: 'N5',
    compounds: [
      { word: '水曜日', reading: 'すいようび (suiyoubi)', meaning: 'วันพุธ' },
      { word: '水道', reading: 'すいどう (suidou)', meaning: 'น้ำประปา' },
      { word: '海水', reading: 'かいすい (kaisui)', meaning: 'น้ำทะเล' }
    ]
  },
  {
    kanji: '金',
    strokes: 8,
    meaning: 'ทอง / เงิน (Money)',
    kunyomi: 'かね (kane) / がね (gane)',
    onyomi: 'キン (kin) / コン (kon)',
    level: 'N5',
    compounds: [
      { word: 'お金', reading: 'おかね (okane)', meaning: 'เงิน' },
      { word: '金曜日', reading: 'きんようび (kinyoubi)', meaning: 'วันศุกร์' },
      { word: '金物', reading: 'かなもの (kanamono)', meaning: 'เครื่องโลหะ' }
    ]
  },
  {
    kanji: '土',
    strokes: 3,
    meaning: 'ดิน / พื้นดิน',
    kunyomi: 'つち (tsuchi)',
    onyomi: 'ド (do) / ト (to)',
    level: 'N5',
    compounds: [
      { word: '土曜日', reading: 'どようび (doyoubi)', meaning: 'วันเสาร์' },
      { word: '土地', reading: 'とち (tochi)', meaning: 'ที่ดิน' },
      { word: '粘土', reading: 'ねんど (nendo)', meaning: 'ดินเหนียว / ดินน้ำมัน' }
    ]
  },
  {
    kanji: '山',
    strokes: 3,
    meaning: 'ภูเขา',
    kunyomi: 'やま (yama)',
    onyomi: 'サン (san) / ザン (zan)',
    level: 'N5',
    compounds: [
      { word: '富士山', reading: 'ふじさん (fujisan)', meaning: 'ภูเขาไฟฟูจิ' },
      { word: '山火事', reading: 'やまかじ (yamakaji)', meaning: 'ไฟป่า' },
      { word: '山道', reading: 'やまみち (yamamichi)', meaning: 'ทางขึ้นเขา' }
    ]
  },
  {
    kanji: '川',
    strokes: 3,
    meaning: 'แม่น้ำ / ลำธาร',
    kunyomi: 'かわ (kawa) / がわ (gawa)',
    onyomi: 'セン (sen)',
    level: 'N5',
    compounds: [
      { word: '川上', reading: 'かわかみ (kawakami)', meaning: 'ต้นน้ำ' },
      { word: '川下', reading: 'かわしも (kawashimo)', meaning: 'ปลายน้ำ' },
      { word: '荒川', reading: 'あらかわ (arakawa)', meaning: 'แม่น้ำอารากาวะ' }
    ]
  },
  {
    kanji: '上',
    strokes: 3,
    meaning: 'บน / ข้างบน / ขึ้น',
    kunyomi: 'うえ (ue) / あ・がる (a-garu) / のぼ・る (nobo-ru)',
    onyomi: 'ジョウ (jou)',
    level: 'N5',
    compounds: [
      { word: '上手', reading: 'じょうず (jouzu)', meaning: 'เก่ง' },
      { word: '上着', reading: 'うわぎ (uwagi)', meaning: 'เสื้อนอก / เสื้อคลุม' },
      { word: '川上', reading: 'かわかみ (kawakami)', meaning: 'ต้นน้ำ' }
    ]
  },
  {
    kanji: '下',
    strokes: 3,
    meaning: 'ล่าง / ข้างล่าง / ลง',
    kunyomi: 'した (shita) / さ・がる (sa-garu) / くだ・る (kuda-ru)',
    onyomi: 'カ (ka) / ゲ (ge)',
    level: 'N5',
    compounds: [
      { word: '下手', reading: 'へた (heta)', meaning: 'ไม่เก่ง / ห่วย' },
      { word: '地下鉄', reading: 'ちかてつ (chikatetsu)', meaning: 'รถไฟใต้ดิน' },
      { word: '下着', reading: 'したぎ (shitagi)', meaning: 'เสื้อชั้นใน' }
    ]
  },
  {
    kanji: '左',
    strokes: 5,
    meaning: 'ซ้าย / ด้านซ้าย',
    kunyomi: 'ひだり (hidari)',
    onyomi: 'サ (sa)',
    level: 'N5',
    compounds: [
      { word: '左手', reading: 'ひだりて (hidarite)', meaning: 'มือซ้าย' },
      { word: '左折', reading: 'させつ (sasetsu)', meaning: 'การเลี้ยวซ้าย' },
      { word: '左右', reading: 'さゆう (sayuu)', meaning: 'ซ้ายขวา / ควบคุม' }
    ]
  },
  {
    kanji: '右',
    strokes: 5,
    meaning: 'ขวา / ด้านขวา',
    kunyomi: 'みぎ (migi)',
    onyomi: 'ウ (u) / ユウ (yuu)',
    level: 'N5',
    compounds: [
      { word: '右手', reading: 'みぎて (migite)', meaning: 'มือขวา' },
      { word: '右折', reading: 'うせつ (usetsu)', meaning: 'การเลี้ยวขวา' },
      { word: '右側', reading: 'みぎがわ (migigawa)', meaning: 'ฝั่งขวา' }
    ]
  },
  {
    kanji: '中',
    strokes: 4,
    meaning: 'กลาง / ข้างใน / ระหว่าง',
    kunyomi: 'なか (naka)',
    onyomi: 'チュウ (chuu) / ジュウ (juu)',
    level: 'N5',
    compounds: [
      { word: '一日中', reading: 'いちにちじゅう (ichinichijuu)', meaning: 'ตลอดทั้งวัน' },
      { word: '中国', reading: 'ちゅうごく (chuugoku)', meaning: 'ประเทศจีน' },
      { word: '中心', reading: 'ちゅうしん (chuushin)', meaning: 'ใจกลาง / ศูนย์กลาง' }
    ]
  },
  {
    kanji: '大',
    strokes: 3,
    meaning: 'ใหญ่ / ยิ่งใหญ่',
    kunyomi: 'おお・きい (oo-kii)',
    onyomi: 'ダイ (dai) / タイ (tai)',
    level: 'N5',
    compounds: [
      { word: '大きい', reading: 'おおきい (ookii)', meaning: 'ใหญ่' },
      { word: '大学', reading: 'だいがく (daigaku)', meaning: 'มหาวิทยาลัย' },
      { word: '大人', reading: 'おとな (otona)', meaning: 'ผู้ใหญ่' }
    ]
  },
  {
    kanji: '小',
    strokes: 3,
    meaning: 'เล็ก / เล็กน้อย',
    kunyomi: 'ちい・さい (chii-sai) / こ (ko) / お (o)',
    onyomi: 'ショウ (shou)',
    level: 'N5',
    compounds: [
      { word: '小さい', reading: 'ちいさい (chiisai)', meaning: 'เล็ก' },
      { word: '小学校', reading: 'しょうがっこう (shougakkou)', meaning: 'โรงเรียนประถมศึกษา' },
      { word: '小説', reading: 'しょうせつ (shousetsu)', meaning: 'นวนิยาย' }
    ]
  },
  {
    kanji: '月',
    strokes: 4,
    meaning: 'พระจันทร์ / เดือน',
    kunyomi: 'つき (tsuki)',
    onyomi: 'ゲツ (getsu) / ガツ (gatsu)',
    level: 'N5',
    compounds: [
      { word: '月曜日', reading: 'げつようび (getsuyoubi)', meaning: 'วันจันทร์' },
      { word: '今月', reading: 'こんげつ (kongetsu)', meaning: 'เดือนนี้' },
      { word: '一月', reading: 'いちがつ (ichigatsu)', meaning: 'เดือนมกราคม' }
    ]
  },
  {
    kanji: '火',
    strokes: 4,
    meaning: 'ไฟ / เปลวไฟ',
    kunyomi: 'ひ (hi) / び (bi)',
    onyomi: 'カ (ka)',
    level: 'N5',
    compounds: [
      { word: '火曜日', reading: 'かようび (kayoubi)', meaning: 'วันอังคาร' },
      { word: '火山', reading: 'かざん (kazan)', meaning: 'ภูเขาไฟ' },
      { word: '火事', reading: 'かじ (kaji)', meaning: 'อัคคีภัย / ไฟไหม้' }
    ]
  },
  {
    kanji: '年',
    strokes: 6,
    meaning: 'ปี',
    kunyomi: 'とし (toshi)',
    onyomi: 'ネン (nen)',
    level: 'N5',
    compounds: [
      { word: '今年', reading: 'ことし (kotoshi)', meaning: 'ปีนี้' },
      { word: '毎年', reading: 'まいねん (mainen) / まいとし (maitoshi)', meaning: 'ทุกปี' },
      { word: '来년', reading: 'らいねん (rainen)', meaning: 'ปีหน้า' }
    ]
  },
  {
    kanji: '何',
    strokes: 7,
    meaning: 'อะไร',
    kunyomi: 'なに (nani) / なん (nan)',
    onyomi: 'カ (ka)',
    level: 'N5',
    compounds: [
      { word: '何時', reading: 'なんじ (nanji)', meaning: 'กี่โมง' },
      { word: '何か', reading: 'なにか (nanika)', meaning: 'บางสิ่งบางอย่าง' },
      { word: '何曜日', reading: 'なんようび (nanyoubi)', meaning: 'วันอะไร (ในสัปดาห์)' }
    ]
  },
  {
    kanji: '子',
    strokes: 3,
    meaning: 'เด็ก / ลูก',
    kunyomi: 'こ (ko)',
    onyomi: 'シ (shi) / ス (su)',
    level: 'N5',
    compounds: [
      { word: '子供', reading: 'こども (kodomo)', meaning: 'เด็ก' },
      { word: '様子', reading: 'ようす (yousu)', meaning: 'สภาพ / ท่าทาง' },
      { word: '電子', reading: 'でんし (denshi)', meaning: 'อิเล็กตรอน / ดิจิทัล' }
    ]
  },
  {
    kanji: '女',
    strokes: 3,
    meaning: 'ผู้หญิง / เพศหญิง',
    kunyomi: 'おんな (onna)',
    onyomi: 'ジョ (jo) / ニョ (nyo)',
    level: 'N5',
    compounds: [
      { word: '女の子', reading: 'おんなのこ (onnanoko)', meaning: 'เด็กหญิง' },
      { word: '女性', reading: 'じょせい (josei)', meaning: 'สตรี / ผู้หญิง' },
      { word: '女神', reading: 'めがみ (megami)', meaning: 'เทพธิดา' }
    ]
  },
  {
    kanji: '男',
    strokes: 7,
    meaning: 'ผู้ชาย / เพศชาย',
    kunyomi: 'おとこ (otoko)',
    onyomi: 'ダン (dan) / ナン (nan)',
    level: 'N5',
    compounds: [
      { word: '男の子', reading: 'おとのこ (otokonoko)', meaning: 'เด็กชาย' },
      { word: '男性', reading: 'だんせい (dansei)', meaning: 'บุรุษ / ผู้ชาย' },
      { word: '長男', reading: 'ちょうなん (chounan)', meaning: 'ลูกชายคนโต' }
    ]
  },
  {
    kanji: '学',
    strokes: 8,
    meaning: 'เรียน / ศึกษา',
    kunyomi: 'まな・ぶ (mana-bu)',
    onyomi: 'ガク (gaku) / ラク (raku)',
    level: 'N5',
    compounds: [
      { word: '学生', reading: 'がくせい (gakusei)', meaning: 'นักเรียน/นักศึกษา' },
      { word: '学校', reading: 'がっこう (gakkou)', meaning: 'โรงเรียน' },
      { word: '学ぶ', reading: 'まなぶ (manabu)', meaning: 'เรียนรู้' }
    ]
  },
  {
    kanji: '校',
    strokes: 10,
    meaning: 'โรงเรียน / สถาบัน',
    kunyomi: 'かせ (kase)',
    onyomi: 'コウ (kou)',
    level: 'N5',
    compounds: [
      { word: '小学校', reading: 'しょうがっこう (shougakkou)', meaning: 'โรงเรียนประถมศึกษา' },
      { word: '校長', reading: 'こうちょう (kouchou)', meaning: 'ครูใหญ่ / ผู้อำนวยการ' },
      { word: '高校生', reading: 'こうこうせい (koukousei)', meaning: 'นักเรียนมัธยมปลาย' }
    ]
  },
  {
    kanji: '先',
    strokes: 6,
    meaning: 'ก่อน / ข้างหน้า / อนาคต',
    kunyomi: 'さき (saki)',
    onyomi: 'セン (sen)',
    level: 'N5',
    compounds: [
      { word: '先生', reading: 'せんせい (sensei)', meaning: 'คุณครู / อาจารย์' },
      { word: '先月', reading: 'せんげつ (sengetsu)', meaning: 'เดือนที่แล้ว' },
      { word: '先週', reading: 'せんしゅう (senshuu)', meaning: 'สัปดาห์ที่แล้ว' }
    ]
  },
  {
    kanji: '生',
    strokes: 5,
    meaning: 'เกิด / มีชีวิตอยู่ / ดิบ',
    kunyomi: 'い・きる (i-kiru) / う・まれる (u-mareru) / なま (nama)',
    onyomi: 'セイ (sei) / ショウ (shou)',
    level: 'N5',
    compounds: [
      { word: '先生', reading: 'せんせい (sensei)', meaning: 'คุณครู / อาจารย์' },
      { word: '学生', reading: 'がくせい (gakusei)', meaning: 'นักเรียน' },
      { word: '生きる', reading: 'いきる (ikiru)', meaning: 'มีชีวิตอยู่' }
    ]
  },
  {
    kanji: '行',
    strokes: 6,
    meaning: 'ไป / ดำเนินการ',
    kunyomi: 'い・く (i-ku) / おこな・う (okona-u)',
    onyomi: 'コウ (kou) / ギョウ (gyou)',
    level: 'N5',
    compounds: [
      { word: '行く', reading: 'いく (iku)', meaning: 'ไป' },
      { word: '旅行', reading: 'りょこう (ryokou)', meaning: 'ท่องเที่ยว' },
      { word: '行う', reading: 'おこなう (okonau)', meaning: 'จัดงาน / ปฏิบัติ' }
    ]
  },
  {
    kanji: '来',
    strokes: 7,
    meaning: 'มา / ในอนาคต',
    kunyomi: 'く・る (ku-ru) / きた・る (kita-ru)',
    onyomi: 'ライ (rai)',
    level: 'N5',
    compounds: [
      { word: '来る', reading: 'くる (kuru)', meaning: 'มา' },
      { word: '来週', reading: 'らいしゅう (raishu)', meaning: 'สัปดาห์หน้า' },
      { word: '来日', reading: 'らいにち (rainichi)', meaning: 'การมาเยือนประเทศญี่ปุ่น' }
    ]
  },
  {
    kanji: '車',
    strokes: 7,
    meaning: 'รถยนต์ / ล้อรถ',
    kunyomi: 'くるま (kuruma)',
    onyomi: 'シャ (sha)',
    level: 'N5',
    compounds: [
      { word: '電車', reading: 'でんしゃ (densha)', meaning: 'รถไฟฟ้า' },
      { word: '自動車', reading: 'じどうしゃ (jidousha)', meaning: 'รถยนต์' },
      { word: '自転車', reading: 'じてんしゃ (jitensha)', meaning: 'รถจักรยาน' }
    ]
  },
  {
    kanji: '見',
    strokes: 7,
    meaning: 'ดู / มอง / เห็น',
    kunyomi: 'み・る (mi-ru) / み・せる (mi-seru)',
    onyomi: 'ケン (ken)',
    level: 'N5',
    compounds: [
      { word: '見る', reading: 'みる (miru)', meaning: 'ดู / มอง' },
      { word: '見せる', reading: 'みせる (miseru)', meaning: 'แสดงให้ดู' },
      { word: '見学', reading: 'けんがく (kengaku)', meaning: 'การทัศนศึกษา' }
    ]
  },
  {
    kanji: '聞',
    strokes: 14,
    meaning: 'ฟัง / ได้ยิน / ถาม',
    kunyomi: 'き・く (ki-ku) / き・こえる (ki-koeru)',
    onyomi: 'ブン (bun) / モン (mon)',
    level: 'N5',
    compounds: [
      { word: '聞く', reading: 'きく (kiku)', meaning: 'ฟัง / ถาม' },
      { word: '聞こえる', reading: 'きこえる (kikoer)', meaning: 'ได้ยิน' },
      { word: '新聞', reading: 'しんぶん (shinbun)', meaning: 'หนังสือพิมพ์' }
    ]
  },
  {
    kanji: '読',
    strokes: 14,
    meaning: 'อ่าน',
    kunyomi: 'よ・む (yo-mu)',
    onyomi: 'ドク (doku)',
    level: 'N5',
    compounds: [
      { word: '読む', reading: 'よむ (yomu)', meaning: 'อ่าน' },
      { word: '読書', reading: 'どくしょ (dokusho)', meaning: 'การรักการอ่าน' },
      { word: '音読', reading: 'おんどく (ondoku)', meaning: 'การอ่านออกเสียง' }
    ]
  },
  {
    kanji: '書',
    strokes: 10,
    meaning: 'เขียน / ลายมือ',
    kunyomi: 'か・く (ka-ku)',
    onyomi: 'ショ (sho)',
    level: 'N5',
    compounds: [
      { word: '書く', reading: 'かく (kaku)', meaning: 'เขียน' },
      { word: '図書館', reading: 'としょかん (toshokan)', meaning: 'ห้องสมุด' },
      { word: '辞書', reading: 'じしょ (jisho)', meaning: 'พจนานุกรม' }
    ]
  },
  {
    kanji: '話',
    strokes: 13,
    meaning: 'พูดคุย / สนทนา / เรื่องเล่า',
    kunyomi: 'はな・す (hana-su) / はなし (hanashi)',
    onyomi: 'ワ (wa)',
    level: 'N5',
    compounds: [
      { word: '話す', reading: 'はなす (hanasu)', meaning: 'พูดคุย' },
      { word: '電話', reading: 'でんわ (denwa)', meaning: 'โทรศัพท์' },
      { word: '会話', reading: 'かいわ (kaiwa)', meaning: 'การสนทนา' }
    ]
  },
  {
    kanji: '出',
    strokes: 5,
    meaning: 'ออก / ส่งออก',
    kunyomi: 'で・る (de-ru) / だ・す (da-su)',
    onyomi: 'シュツ (shutsu)',
    level: 'N5',
    compounds: [
      { word: '出る', reading: 'でる (deru)', meaning: 'ออก' },
      { word: '出す', reading: 'だす (dasu)', meaning: 'ส่ง/เอาออก' },
      { word: '出口', reading: 'でぐち (deguchi)', meaning: 'ทางออก' }
    ]
  },
  {
    kanji: '入',
    strokes: 2,
    meaning: 'เข้า / ใส่เข้าไป',
    kunyomi: 'はい・る (hai-ru) / い・れる (i-reru)',
    onyomi: 'ニュウ (nyuu)',
    level: 'N5',
    compounds: [
      { word: '入る', reading: 'はいる (hairu)', meaning: 'เข้า' },
      { word: '入れる', reading: 'いれる (ireru)', meaning: 'ใส่เข้าไป' },
      { word: '入口', reading: 'いりぐち (iriguchi)', meaning: 'ทางเข้า' }
    ]
  },
  {
    kanji: '口',
    strokes: 3,
    meaning: 'ปาก / ทางเข้าออก',
    kunyomi: 'くち (kuchi) / ぐち (guchi)',
    onyomi: 'コウ (kou)',
    level: 'N5',
    compounds: [
      { word: '人口', reading: 'じんこう (jinkou)', meaning: 'ประชากร' },
      { word: '窓口', reading: 'まどぐち (madoguchi)', meaning: 'ช่องบริการ/เคาน์เตอร์' },
      { word: '出口', reading: 'でぐち (deguchi)', meaning: 'ทางออก' }
    ]
  },
  {
    kanji: '食',
    strokes: 9,
    meaning: 'กิน / อาหาร',
    kunyomi: 'た・べる (ta-beru) / く・う (ku-u)',
    onyomi: 'ショク (shoku)',
    level: 'N5',
    compounds: [
      { word: '食べる', reading: 'たべる (taberu)', meaning: 'กิน' },
      { word: '食堂', reading: 'しょくどう (shokudou)', meaning: 'โรงอาหาร' },
      { word: '食べ物', reading: 'たべもの (tabemono)', meaning: 'ของกิน / อาหาร' }
    ]
  },
  {
    kanji: '飲',
    strokes: 12,
    meaning: 'ดื่ม',
    kunyomi: 'の・む (no-mu)',
    onyomi: 'イン (in)',
    level: 'N5',
    compounds: [
      { word: '飲む', reading: 'のむ (nomu)', meaning: 'ดื่ม' },
      { word: '飲み物', reading: 'のみもの (nomimono)', meaning: 'เครื่องดื่ม' },
      { word: '飲食店', reading: 'いんしょくてん (inshokuten)', meaning: 'ร้านอาหารเครื่องดื่ม' }
    ]
  },
  {
    kanji: '買',
    strokes: 12,
    meaning: 'ซื้อ',
    kunyomi: 'か・う (ka-u)',
    onyomi: 'バイ (bai)',
    level: 'N5',
    compounds: [
      { word: '買う', reading: 'かう (kau)', meaning: 'ซื้อ' },
      { word: '買い物', reading: 'かいもの (kaimono)', meaning: 'การซื้อของ' },
      { word: '買収', reading: 'ばいしゅう (baishuu)', meaning: 'การกว้านซื้อ / เทคโอเวอร์' }
    ]
  },
  {
    kanji: '立',
    strokes: 5,
    meaning: 'ยืน / สถาปนา',
    kunyomi: 'た・つ (ta-tsu) / た・てる (ta-teru)',
    onyomi: 'リツ (ritsu)',
    level: 'N5',
    compounds: [
      { word: '立つ', reading: 'たつ (tatsu)', meaning: 'ยืน' },
      { word: '立てる', reading: 'たてる (tateru)', meaning: 'ตั้งขึ้น / จัดตั้ง' },
      { word: '国立', reading: 'こくりつ (kokuritsu)', meaning: 'แห่งชาติ / ตั้งโดยรัฐ' }
    ]
  },
  {
    kanji: '休',
    strokes: 6,
    meaning: 'พักผ่อน / วันหยุด',
    kunyomi: 'やす・む (yasu-mu) / やす・み (yasu-mi)',
    onyomi: 'キュウ (kyuu)',
    level: 'N5',
    compounds: [
      { word: '休む', reading: 'やすむ (yasumu)', meaning: 'พักผ่อน / ลางาน' },
      { word: '休み', reading: 'やすみ (yasumi)', meaning: 'วันหยุด' },
      { word: '休日', reading: 'きゅうじつ (kyuujitsu)', meaning: 'วันพักผ่อน' }
    ]
  },
  {
    kanji: '手',
    strokes: 4,
    meaning: 'มือ / ผู้เชี่ยวชาญ',
    kunyomi: 'て (te) / た (ta)',
    onyomi: 'シュ (shu)',
    level: 'N5',
    compounds: [
      { word: 'お手洗い', reading: 'おてあらい (otearai)', meaning: 'ห้องน้ำ' },
      { word: '歌手', reading: 'かしゅ (kashu)', meaning: 'นักร้อง' },
      { word: '手紙', reading: 'てがみ (tegami)', meaning: 'จดหมาย' }
    ]
  },
  {
    kanji: '足',
    strokes: 7,
    meaning: 'ขา / เท้า / เพียงพอ',
    kunyomi: 'あし (ashi) / た・りる (ta-riru)',
    onyomi: 'ソク (soku)',
    level: 'N5',
    compounds: [
      { word: '足りる', reading: 'たりる (tariru)', meaning: 'เพียงพอ' },
      { word: '土足', reading: 'どそく (dosoku)', meaning: 'การสวมรองเท้าเข้าอาคาร' },
      { word: '一足', reading: 'いっそく (issoku)', meaning: 'รองเท้าหนึ่งคู่' }
    ]
  },
  {
    kanji: '目',
    strokes: 5,
    meaning: 'ตา / ดวงตา / หัวข้อ',
    kunyomi: 'め (me)',
    onyomi: 'モク (moku)',
    level: 'N5',
    compounds: [
      { word: '目次', reading: 'もくじ (mokuji)', meaning: 'สารบัญ' },
      { word: '目立つ', reading: 'めだつ (medatsu)', meaning: 'สะดุดตา / เด่น' },
      { word: '一回目', reading: 'いっかいめ (ikkaime)', meaning: 'ครั้งที่หนึ่ง' }
    ]
  },
  {
    kanji: '耳',
    strokes: 6,
    meaning: 'หู / ใบหู',
    kunyomi: 'みみ (mimi)',
    onyomi: 'ジ (ji)',
    level: 'N5',
    compounds: [
      { word: '耳鳴り', reading: 'みみなり (miminari)', meaning: 'เสียงวิ้งในหู' },
      { word: '耳かき', reading: 'みみかき (mimikaki)', meaning: 'ไม้แคะหู' },
      { word: '中耳炎', reading: 'ちゅうじえん (chuujien)', meaning: 'หูชั้นกลางอักเสบ' }
    ]
  },
  {
    kanji: '花',
    strokes: 7,
    meaning: 'ดอกไม้',
    kunyomi: 'はな (hana)',
    onyomi: 'カ (ka)',
    level: 'N5',
    compounds: [
      { word: '花見', reading: 'はなみ (hanami)', meaning: 'การชมดอกไม้' },
      { word: '花火', reading: 'はなび (hanabi)', meaning: 'ดอกไม้ไฟ' },
      { word: '生け花', reading: 'いけばな (ikebana)', meaning: 'การจัดดอกไม้แบบญี่ปุ่น' }
    ]
  },
  {
    kanji: '雨',
    strokes: 8,
    meaning: 'ฝน',
    kunyomi: 'あめ (ame) / あま (ama)',
    onyomi: 'ウ (u)',
    level: 'N5',
    compounds: [
      { word: '大雨', reading: 'おおあめ (ooame)', meaning: 'ฝนตกหนัก' },
      { word: '雨傘', reading: 'あまがさ (amagasa)', meaning: 'ร่มกันฝน' },
      { word: '梅雨', reading: 'つゆ (tsuyu) / ばいう (baiu)', meaning: 'ฤดูฝน' }
    ]
  },
  {
    kanji: '空',
    strokes: 8,
    meaning: 'ท้องฟ้า / ความว่างเปล่า',
    kunyomi: 'そら (sora) / から (kara) / あ・く (a-ku)',
    onyomi: 'クウ (kuu)',
    level: 'N5',
    compounds: [
      { word: '空気', reading: 'くうき (kuuki)', meaning: 'อากาศ' },
      { word: '空港', reading: 'くうこう (kuukou)', meaning: 'สนามบิน' },
      { word: '空く', reading: 'あく (aku)', meaning: 'ว่าง' }
    ]
  },
  {
    kanji: '天',
    strokes: 4,
    meaning: 'สวรรค์ / ชั้นฟ้า',
    kunyomi: 'あまつ (amatsu)',
    onyomi: 'テン (ten)',
    level: 'N5',
    compounds: [
      { word: '天気', reading: 'てんき (tenki)', meaning: 'สภาพอากาศ' },
      { word: '天才', reading: 'てんさい (tensai)', meaning: 'อัจฉริยะ' },
      { word: '天国', reading: 'てんごく (tengoku)', meaning: 'สวรรค์' }
    ]
  },
  {
    kanji: '気',
    strokes: 6,
    meaning: 'ความรู้สึก / พลังงาน / ลมหายใจ',
    kunyomi: 'き (ki)',
    onyomi: 'キ (ki) / ケ (ke)',
    level: 'N5',
    compounds: [
      { word: '元気', reading: 'げんき (genki)', meaning: 'แข็งแรง / สบายดี' },
      { word: '気持ち', reading: 'きもち (kimochi)', meaning: 'ความรู้สึก' },
      { word: '人気', reading: 'にんき (ninki)', meaning: 'เป็นที่นิยม' }
    ]
  },
  {
    kanji: '名',
    strokes: 6,
    meaning: 'ชื่อ / ชื่อเสียง',
    kunyomi: 'な (na)',
    onyomi: 'メイ (mei) / ミョウ (myou)',
    level: 'N5',
    compounds: [
      { word: '名前', reading: 'なまえ (namae)', meaning: 'ชื่อ' },
      { word: '有名', reading: 'ゆうめい (yuumei)', meaning: 'มีชื่อเสียง' },
      { word: '名刺', reading: 'めいし (meishi)', meaning: 'นามบัตร' }
    ]
  },
  {
    kanji: '前',
    strokes: 9,
    meaning: 'หน้า / ข้างหน้า / ก่อน',
    kunyomi: 'まえ (mae)',
    onyomi: 'ゼン (zen)',
    level: 'N5',
    compounds: [
      { word: '名前', reading: 'なまえ (namae)', meaning: 'ชื่อ' },
      { word: '前半', reading: 'ぜんはん (zenhan)', meaning: 'ครึ่งแรก' },
      { word: '午前', reading: 'ごぜん (gozen)', meaning: 'เวลาเช้า (AM)' }
    ]
  },
  {
    kanji: '後',
    strokes: 9,
    meaning: 'หลัง / ข้างหลัง / ภายหลัง',
    kunyomi: 'うし・ろ (ushi-ro) / あと (ato) / のち (nochi)',
    onyomi: 'ゴ (go) / コウ (kou)',
    level: 'N5',
    compounds: [
      { word: '午後', reading: 'ごご (gogo)', meaning: 'เวลาบ่าย (PM)' },
      { word: '後ろ', reading: 'うしろ (ushiro)', meaning: 'ข้างหลัง' },
      { word: '後半', reading: 'こうはん (kouhan)', meaning: 'ครึ่งหลัง' }
    ]
  },
  {
    kanji: '東',
    strokes: 8,
    meaning: 'ทิศตะวันออก',
    kunyomi: 'ひがし (higashi)',
    onyomi: 'トウ (tou)',
    level: 'N5',
    compounds: [
      { word: '東京', reading: 'とうきょう (toukyou)', meaning: 'เมืองโตเกียว' },
      { word: '東洋', reading: 'とうよう (touyou)', meaning: 'ตะวันออก / เอเชีย' },
      { word: '東口', reading: 'ひがしぐち (higashiguchi)', meaning: 'ทางออกทิศตะวันออก' }
    ]
  },
  {
    kanji: '西',
    strokes: 6,
    meaning: 'ทิศตะวันตก',
    kunyomi: 'にし (nishi)',
    onyomi: 'セイ (sei) / サイ (sai)',
    level: 'N5',
    compounds: [
      { word: '関西', reading: 'かんさい (kansai)', meaning: 'ภูมิภาคคันไซ' },
      { word: '洋画', reading: 'ようが (youga)', meaning: 'ภาพยนตร์ตะวันตก' },
      { word: '西口', reading: 'にしぐち (nishiguchi)', meaning: 'ทางออกทิศตะวันตก' }
    ]
  },
  {
    kanji: '南',
    strokes: 9,
    meaning: 'ทิศใต้',
    kunyomi: 'みなみ (minami)',
    onyomi: 'ナン (nan)',
    level: 'N5',
    compounds: [
      { word: '南極', reading: 'なんきょく (nankyoku)', meaning: 'ขั้วโลกใต้' },
      { word: '南米', reading: 'なんべい (nanbei)', meaning: 'อเมริกาใต้' },
      { word: '南口', reading: 'みなみぐち (minamiguchi)', meaning: 'ทางออกทิศใต้' }
    ]
  },
  {
    kanji: '北',
    strokes: 5,
    meaning: 'ทิศเหนือ',
    kunyomi: 'きた (kita)',
    onyomi: 'ホク (hoku)',
    level: 'N5',
    compounds: [
      { word: '北海道', reading: 'ほっかいどう (hokkaido)', meaning: 'เกาะฮอกไกโด' },
      { word: '北極', reading: 'ほっきょく (hokkyoku)', meaning: 'ขั้วโลกเหนือ' },
      { word: '北口', reading: 'きたぐち (kitaguchi)', meaning: 'ทางออกทิศเหนือ' }
    ]
  },
  {
    kanji: '高',
    strokes: 10,
    meaning: 'สูง / แพง',
    kunyomi: 'たか・い (taka-i)',
    onyomi: 'コウ (kou)',
    level: 'N5',
    compounds: [
      { word: '高い', reading: 'たかい (takai)', meaning: 'สูง / แพง' },
      { word: '高校', reading: 'こうこう (koukou)', meaning: 'โรงเรียนมัธยมปลาย' },
      { word: '最高', reading: 'さいこう (saikou)', meaning: 'สุดยอด / สูงสุด' }
    ]
  },
  {
    kanji: '安',
    strokes: 6,
    meaning: 'ถูก / ปลอดภัย / สบายใจ',
    kunyomi: 'やす・い (yasu-i)',
    onyomi: 'アン (an)',
    level: 'N5',
    compounds: [
      { word: '安い', reading: 'やすい (yasui)', meaning: 'ราคาถูก' },
      { word: '安全', reading: 'あんぜん (anzen)', meaning: 'ปลอดภัย' },
      { word: '安心', reading: 'あんしん (anshin)', meaning: 'สบายใจ / โล่งอก' }
    ]
  },
  {
    kanji: '新',
    strokes: 13,
    meaning: 'ใหม่ / สดใหม่',
    kunyomi: 'あたら・しい (atara-shi-i) / あら・た (ara-ta)',
    onyomi: 'シン (shin)',
    level: 'N5',
    compounds: [
      { word: '新しい', reading: 'あたらしい (atarashii)', meaning: 'ใหม่' },
      { word: '新聞', reading: 'しんぶん (shinbun)', meaning: 'หนังสือพิมพ์' },
      { word: '新幹線', reading: 'しんかんせん (shinkansen)', meaning: 'รถไฟชินคันเซ็น' }
    ]
  },
  {
    kanji: '古',
    strokes: 5,
    meaning: 'เก่า / โบราณ',
    kunyomi: 'ふる・い (furu-i)',
    onyomi: 'コ (ko)',
    level: 'N5',
    compounds: [
      { word: '古い', reading: 'ふるい (furui)', meaning: 'เก่า' },
      { word: '中古', reading: 'ちゅうこ (chuuko)', meaning: 'ของมือสอง' },
      { word: '古代', reading: 'こだい (kodai)', meaning: 'ยุคโบราณ' }
    ]
  },
  {
    kanji: '長',
    strokes: 8,
    meaning: 'ยาว / หัวหน้า',
    kunyomi: 'なが・い (naga-i)',
    onyomi: 'チョウ (chou)',
    level: 'N5',
    compounds: [
      { word: '長い', reading: 'ながい (nagai)', meaning: 'ยาว' },
      { word: '社長', reading: 'しゃちょう (shachou)', meaning: 'ประธานบริษัท' },
      { word: '校長', reading: 'こうちょう (kouchou)', meaning: 'ครูใหญ่' }
    ]
  },
  {
    kanji: '多',
    strokes: 6,
    meaning: 'มาก / จำนวนเยอะ',
    kunyomi: 'おお・い (oo-i)',
    onyomi: 'タ (ta)',
    level: 'N5',
    compounds: [
      { word: '多い', reading: 'おおい (ooi)', meaning: 'เยอะ / มาก' },
      { word: '多分', reading: 'たぶん (tabun)', meaning: 'บางที / อาจจะ' },
      { word: '多数', reading: 'たすう (tasuu)', meaning: 'จำนวนมาก' }
    ]
  },
  {
    kanji: '少',
    strokes: 4,
    meaning: 'น้อย / เล็กน้อย',
    kunyomi: 'すく・ない (suku-nai) / すこ・し (suko-shi)',
    onyomi: 'ショウ (shou)',
    level: 'N5',
    compounds: [
      { word: '少ない', reading: 'すくない (sukunai)', meaning: 'น้อย' },
      { word: '少し', reading: 'すこし (sukoshi)', meaning: 'นิดหน่อย' },
      { word: '少年', reading: 'しょうねん (shounen)', meaning: 'เด็กผู้ชาย / เยาวชน' }
    ]
  },

  // === JLPT N4 (40 Essential Characters) ===
  {
    kanji: '会',
    strokes: 6,
    meaning: 'พบ / เจอ / สมาคม',
    kunyomi: 'あ・う (a-u)',
    onyomi: 'カイ (kai) / エ (e)',
    level: 'N4',
    compounds: [
      { word: '会う', reading: 'あう (au)', meaning: 'พบเจอ' },
      { word: '会社', reading: 'かいしゃ (kaisha)', meaning: 'บริษัท' },
      { word: '会話', reading: 'かいわ (kaiwa)', meaning: 'การสนทนา' }
    ]
  },
  {
    kanji: '社',
    strokes: 7,
    meaning: 'ศาลเจ้า / บริษัท / สังคม',
    kunyomi: 'やしろ (yashiro)',
    onyomi: 'シャ (sha) / ジャ (ja)',
    level: 'N4',
    compounds: [
      { word: '神社', reading: 'じんじゃ (jinja)', meaning: 'ศาลเจ้าชินโต' },
      { word: '社会', reading: 'しゃかい (shakai)', meaning: 'สังคม' },
      { word: '会社員', reading: 'かいしゃいん (kaishayin)', meaning: 'พนักงานบริษัท' }
    ]
  },
  {
    kanji: '店',
    strokes: 8,
    meaning: 'ร้าน / ร้านค้า',
    kunyomi: 'みせ (mise)',
    onyomi: 'テン (ten)',
    level: 'N4',
    compounds: [
      { word: '店員', reading: 'てんいん (ten-in)', meaning: 'พนักงานขาย' },
      { word: '書店', reading: 'しょてん (shoten)', meaning: 'ร้านหนังสือ' },
      { word: '喫茶店', reading: 'きっさてん (kissaten)', meaning: 'ร้านกาแฟ' }
    ]
  },
  {
    kanji: '駅',
    strokes: 14,
    meaning: 'สถานีรถไฟ',
    kunyomi: 'えき (eki)',
    onyomi: 'エキ (eki)',
    level: 'N4',
    compounds: [
      { word: '駅員', reading: 'えきいん (eki-in)', meaning: 'นายสถานี / เจ้าหน้าที่สถานี' },
      { word: '東京駅', reading: 'とうきょうえき (toukyou-eki)', meaning: 'สถานีโตเกียว' },
      { word: '駅前', reading: 'えきまえ (ekimae)', meaning: 'หน้าสถานีรถไฟ' }
    ]
  },
  {
    kanji: '院',
    strokes: 10,
    meaning: 'สถาบัน / โรงพยาบาล',
    kunyomi: 'かこい (kakoi)',
    onyomi: 'イン (in)',
    level: 'N4',
    compounds: [
      { word: '病院', reading: 'びょういん (byouin)', meaning: 'โรงพยาบาล' },
      { word: '入院', reading: 'にゅういん (nyuuyin)', meaning: 'การเข้าโรงพยาบาล' },
      { word: '大学院', reading: 'だいがくいん (daigakuyin)', meaning: 'บัณฑิตวิทยาลัย' }
    ]
  },
  {
    kanji: '茶',
    strokes: 9,
    meaning: 'ชา / ใบชา',
    kunyomi: 'ちゃ (cha)',
    onyomi: 'チャ (cha) / サ (sa)',
    level: 'N4',
    compounds: [
      { word: 'お茶', reading: 'おちゃ (ocha)', meaning: 'ชาเขียวร้อน / น้ำชา' },
      { word: '紅茶', reading: 'こうちゃ (koucha)', meaning: 'ชาฝรั่ง / ชาแดง' },
      { word: '茶色', reading: 'ちゃいろ (chairo)', meaning: 'สีน้ำตาล' }
    ]
  },
  {
    kanji: '病',
    strokes: 10,
    meaning: 'เจ็บป่วย / โรคภัย',
    kunyomi: 'や・む (ya-mu) / やまい (yamai)',
    onyomi: 'ビョウ (byou)',
    level: 'N4',
    compounds: [
      { word: '病気', reading: 'びょうき (byouki)', meaning: 'ไข้หวัด / โรคภัย' },
      { word: '病院', reading: 'びょういん (byouin)', meaning: 'โรงพยาบาล' },
      { word: '病人', reading: 'びょうにん (byounin)', meaning: 'ผู้ป่วย' }
    ]
  },
  {
    kanji: '体',
    strokes: 7,
    meaning: 'ร่างกาย / โครงสร้าง',
    kunyomi: 'からだ (karada)',
    onyomi: 'タイ (tai) / テイ (tei)',
    level: 'N4',
    compounds: [
      { word: '体育', reading: 'たいいく (tai-iku)', meaning: 'พลศึกษา' },
      { word: '体重', reading: 'たいじゅう (taijuu)', meaning: 'น้ำหนักตัว' },
      { word: '全体', reading: 'ぜんたい (zentai)', meaning: 'ทั้งหมด / ภาพรวม' }
    ]
  },
  {
    kanji: '言',
    strokes: 7,
    meaning: 'คำพูด / พูด',
    kunyomi: 'い・う (i-u) / こと (koto)',
    onyomi: 'ゲン (gen) / ゴン (gon)',
    level: 'N4',
    compounds: [
      { word: '言う', reading: 'いう (iu)', meaning: 'พูด' },
      { word: '言葉', reading: 'ことば (kotoba)', meaning: 'คำพูด / ภาษา' },
      { word: '方言', reading: 'ほうげん (hougen)', meaning: 'ภาษาถิ่น' }
    ]
  },
  {
    kanji: '思',
    strokes: 9,
    meaning: 'คิด / คำนึง',
    kunyomi: 'おも・う (omo-u)',
    onyomi: 'シ (shi)',
    level: 'N4',
    compounds: [
      { word: '思う', reading: 'おもう (omou)', meaning: 'คิดว่า' },
      { word: '思い出す', reading: 'おもいだす (omoidasu)', meaning: 'นึกถึง / จำได้' },
      { word: '思考', reading: 'しこう (shikou)', meaning: 'ความคิดอ่าน' }
    ]
  },
  {
    kanji: '知',
    strokes: 8,
    meaning: 'รู้ / รับทราบ',
    kunyomi: 'し・る (shi-ru)',
    onyomi: 'チ (chi)',
    level: 'N4',
    compounds: [
      { word: '知る', reading: 'しる (shiru)', meaning: 'รู้ข่าว / ทราบ' },
      { word: '知らせる', reading: 'しらせる (shiraseru)', meaning: 'แจ้งข่าว' },
      { word: '知識', reading: 'ちしき (chishiki)', meaning: 'ความรู้' }
    ]
  },
  {
    kanji: '作',
    strokes: 7,
    meaning: 'ทำ / สร้าง / ประดิษฐ์',
    kunyomi: 'つく・る (tsuku-ru)',
    onyomi: 'サク (saku) / サ (sa)',
    level: 'N4',
    compounds: [
      { word: '作る', reading: 'つくる (tsukur)', meaning: 'ทำ / ผลิตขึ้น' },
      { word: '作文', reading: 'さくぶん (sakubun)', meaning: 'เรียงความ' },
      { word: '作者', reading: 'さくしゃ (sakusha)', meaning: 'ผู้แต่ง / ผู้สร้างสรรค์' }
    ]
  },
  {
    kanji: '使',
    strokes: 8,
    meaning: 'ใช้ / ผู้สื่อสาร',
    kunyomi: 'つか・う (tsuka-u)',
    onyomi: 'シ (shi)',
    level: 'N4',
    compounds: [
      { word: '使う', reading: 'つかう (tukau)', meaning: 'ใช้งาน' },
      { word: '使い方', reading: 'つかいかた (tsukaikata)', meaning: 'วิธีใช้' },
      { word: '大使館', reading: 'たいしかん (taishikan)', meaning: 'สถานทูต' }
    ]
  },
  {
    kanji: '始',
    strokes: 8,
    meaning: 'เริ่มต้น',
    kunyomi: 'はじ・める (haji-meru) / はじ・まる (haji-maru)',
    onyomi: 'シ (shi)',
    level: 'N4',
    compounds: [
      { word: '始める', reading: 'はじめる (hajimeru)', meaning: 'เริ่มสิ่งใดสิ่งหนึ่ง' },
      { word: '始まる', reading: 'はじまる (hajimaru)', meaning: 'เริ่มต้นขึ้นเอง' },
      { word: '開始', reading: 'かいし (kaishi)', meaning: 'การเปิดฉาก / เริ่มต้น' }
    ]
  },
  {
    kanji: '終',
    strokes: 11,
    meaning: 'จบ / อวสาน',
    kunyomi: 'お・わる (o-waru) / お・える (o-eru)',
    onyomi: 'シュウ (shuu)',
    level: 'N4',
    compounds: [
      { word: '終わる', reading: 'おわる (owaru)', meaning: 'เสร็จสิ้น / อวสาน' },
      { word: '終電', reading: 'しゅうでん (shuuden)', meaning: 'รถไฟเที่ยวสุดท้าย' },
      { word: '終点', reading: 'しゅうてん (shuuten)', meaning: 'สถานีปลายทาง' }
    ]
  },
  {
    kanji: '開',
    strokes: 12,
    meaning: 'เปิด / เบิกบาน',
    kunyomi: 'あ・く (a-ku) / ひら・く (hira-ku)',
    onyomi: 'カイ (kai)',
    level: 'N4',
    compounds: [
      { word: '開ける', reading: 'あける (akeru)', meaning: 'เปิดประตู/กล่อง' },
      { word: '開く', reading: 'ひらく (hiraku)', meaning: 'เปิดรับสมัคร/จัดงาน' },
      { word: '開始', reading: 'かいし (kaishi)', meaning: 'การเริ่มต้น' }
    ]
  },
  {
    kanji: '閉',
    strokes: 11,
    meaning: 'ปิด',
    kunyomi: 'し・める (shi-meru) / と・じる (to-jiru)',
    onyomi: 'ヘイ (hei)',
    level: 'N4',
    compounds: [
      { word: '閉める', reading: 'しめる (shimeru)', meaning: 'ปิดประตู' },
      { word: '閉じる', reading: 'とじる (tojiru)', meaning: 'ปิดสมุด/หนังสือ' },
      { word: '閉店', reading: 'へいてん (heiten)', meaning: 'ร้านค้าปิดกิจการ' }
    ]
  },
  {
    kanji: '心',
    strokes: 4,
    meaning: 'หัวใจ / จิตใจ / แกนหลัก',
    kunyomi: 'こころ (kokoro)',
    onyomi: 'シン (shin)',
    level: 'N4',
    compounds: [
      { word: '安心', reading: 'あんしん (anshin)', meaning: 'สบายใจ / หายห่วง' },
      { word: '心配', reading: 'しんぱい (shinpai)', meaning: 'กังวล / เป็นห่วง' },
      { word: '中心', reading: 'ちゅうしん (chuushin)', meaning: 'ใจกลาง' }
    ]
  },
  {
    kanji: '力',
    strokes: 2,
    meaning: 'แรง / พลัง / ความสามารถ',
    kunyomi: 'ちから (chikara)',
    onyomi: 'リョク (ryoku) / リキ (riki)',
    level: 'N4',
    compounds: [
      { word: '実力', reading: 'じつりょく (jitsuryoku)', meaning: 'ความสามารถที่แท้จริง' },
      { word: '協力', reading: 'きょうりょく (kyouryoku)', meaning: 'ความร่วมมือ' },
      { word: '力持ち', reading: 'ちからもち (chikaramochi)', meaning: 'คนจอมพลัง' }
    ]
  },
  {
    kanji: '風',
    strokes: 9,
    meaning: 'ลม / สไตล์',
    kunyomi: 'かぜ (kaze)',
    onyomi: 'フウ (fuu)',
    level: 'N4',
    compounds: [
      { word: '台風', reading: 'たいふう (taifu)', meaning: 'พายุไต้ฝุ่น' },
      { word: '和風', reading: 'わふう (wafuu)', meaning: 'แบบญี่ปุ่น / สไตล์ย้อนยุค' },
      { word: 'お風呂', reading: 'おふろ (ofuro)', meaning: 'การอาบน้ำอุ่น / อ่างน้ำ' }
    ]
  },
  {
    kanji: '林',
    strokes: 8,
    meaning: 'ป่าโปร่ง / ป่าละเมาะ',
    kunyomi: 'はやし (hayashi)',
    onyomi: 'リン (rin)',
    level: 'N4',
    compounds: [
      { word: '小林', reading: 'こばやし (kobayashi)', meaning: 'นามสกุลโคบายาชิ' },
      { word: '山林', reading: 'さんりん (sanrin)', meaning: 'ป่าไม้บนเขา' },
      { word: '林業', reading: 'りんぎょう (ringyou)', meaning: 'การทำป่าไม้' }
    ]
  },
  {
    kanji: '森',
    strokes: 12,
    meaning: 'ป่าทึบ / ดงดิบ',
    kunyomi: 'もり (mori)',
    onyomi: 'シン (shin)',
    level: 'N4',
    compounds: [
      { word: '青森', reading: 'あおもり (aomori)', meaning: 'จังหวัดอาโอโมริ' },
      { word: '森林', reading: 'しんりん (shinrin)', meaning: 'ป่าดงพงไพร' },
      { word: '森山', reading: 'もりやま (moriyama)', meaning: 'เนินเขาป่าทึบ' }
    ]
  },
  {
    kanji: '牛',
    strokes: 4,
    meaning: 'วัว',
    kunyomi: 'うし (ushi)',
    onyomi: 'ギュウ (gyuu)',
    level: 'N4',
    compounds: [
      { word: '牛乳', reading: 'ぎゅうにゅう (gyuunyuu)', meaning: 'นมวัว' },
      { word: '牛肉', reading: 'ぎゅうにく (gyuuniku)', meaning: 'เนื้อวัว' },
      { word: '水牛', reading: 'すいぎゅう (suigyuu)', meaning: 'ควาย' }
    ]
  },
  {
    kanji: '馬',
    strokes: 10,
    meaning: 'ม้า',
    kunyomi: 'うま (uma) / ま (ma)',
    onyomi: 'バ (ba)',
    level: 'N4',
    compounds: [
      { word: '乗馬', reading: 'じょうば (jouba)', meaning: 'การขี่ม้า' },
      { word: '馬車', reading: 'ばしゃ (basha)', meaning: 'รถม้า' },
      { word: '馬鹿', reading: 'ばか (baka)', meaning: 'โง่ / บ้า' }
    ]
  },
  {
    kanji: '鳥',
    strokes: 11,
    meaning: 'นก / สัตว์ปีก',
    kunyomi: 'とり (tori)',
    onyomi: 'チョウ (chou)',
    level: 'N4',
    compounds: [
      { word: '焼き鳥', reading: 'やきとり (yakitori)', meaning: 'ไก่ย่างญี่ปุ่น' },
      { word: '小鳥', reading: 'ことり (kotori)', meaning: 'นกตัวเล็ก' },
      { word: '白鳥', reading: 'はくちょう (hakuchou)', meaning: 'หงส์ขาว' }
    ]
  },
  {
    kanji: '魚',
    strokes: 11,
    meaning: 'ปลา',
    kunyomi: 'さかな (sakana) / うお (uo)',
    onyomi: 'ギョ (gyo)',
    level: 'N4',
    compounds: [
      { word: '金魚', reading: 'きんぎょ (kingyo)', meaning: 'ปลาทอง' },
      { word: '人魚', reading: 'にんぎょ (ningyo)', meaning: 'นางเงือก' },
      { word: '魚屋', reading: 'さかなや (sakanaya)', meaning: 'ร้านขายปลา' }
    ]
  },
  {
    kanji: '犬',
    strokes: 4,
    meaning: 'สุนัข / หมา',
    kunyomi: 'いぬ (inu)',
    onyomi: 'ケン (ken)',
    level: 'N4',
    compounds: [
      { word: '子犬', reading: 'こいぬ (koinu)', meaning: 'ลูกสุนัข' },
      { word: '秋田犬', reading: 'あきたけん (akitaken)', meaning: 'สุนัขพันธุ์อากิตะ' },
      { word: '猟犬', reading: 'りょうけん (ryouken)', meaning: 'สุนัขล่าสัตว์' }
    ]
  },
  {
    kanji: '猫',
    strokes: 11,
    meaning: 'แมว',
    kunyomi: 'ねこ (neko)',
    onyomi: 'ビョウ (byou)',
    level: 'N4',
    compounds: [
      { word: '子猫', reading: 'こねこ (koneko)', meaning: 'ลูกแมว' },
      { word: '野良猫', reading: 'のらねこ (noraneko)', meaning: 'แมวจรจัด' },
      { word: '招き猫', reading: 'まねきねこ (manekineko)', meaning: 'ตุ๊กตาแมวกวักนำโชค' }
    ]
  },
  {
    kanji: '自',
    strokes: 6,
    meaning: 'ตนเอง / อัตโนมัติ',
    kunyomi: 'みずか・ら (mizuka-ra)',
    onyomi: 'ジ (ji) / シ (shi)',
    level: 'N4',
    compounds: [
      { word: '自分', reading: 'じぶん (jibun)', meaning: 'ตัวฉันเอง' },
      { word: '自転車', reading: 'じてんしゃ (jitensha)', meaning: 'รถจักรยาน' },
      { word: '自由', reading: 'じゆう (jiyuu)', meaning: 'เสรีภาพ / อิสระ' }
    ]
  },
  {
    kanji: '転',
    strokes: 11,
    meaning: 'กลิ้ง / หมุน / โยกย้าย',
    kunyomi: 'ころ・がる (koro-garu) / ころ・ぶ (koro-bu)',
    onyomi: 'テン (ten)',
    level: 'N4',
    compounds: [
      { word: '運転', reading: 'うんてん (unten)', meaning: 'การขับขี่รถยนต์' },
      { word: '自転車', reading: 'じてんしゃ (jitensha)', meaning: 'รถจักรยาน' },
      { word: '転ぶ', reading: 'ころぶ (korobu)', meaning: 'หกล้ม' }
    ]
  },
  {
    kanji: '動',
    strokes: 11,
    meaning: 'เคลื่อนไหว / ทำงาน',
    kunyomi: 'うご・く (ugo-ku) / うご・かす (ugo-kasu)',
    onyomi: 'ドウ (dou)',
    level: 'N4',
    compounds: [
      { word: '自動車', reading: 'じどうしゃ (jidousha)', meaning: 'รถยนต์' },
      { word: '動物', reading: 'どうぶつ (doubutsu)', meaning: 'สัตว์' },
      { word: '運動', reading: 'うんどう (undou)', meaning: 'การออกกำลังกาย' }
    ]
  },
  {
    kanji: '道',
    strokes: 12,
    meaning: 'ถนน / หนทาง / วิถีทาง',
    kunyomi: 'みち (michi)',
    onyomi: 'ドウ (dou) / トウ (tou)',
    level: 'N4',
    compounds: [
      { word: '道路', reading: 'どうろ (douro)', meaning: 'ถนน / ทางเดินรถ' },
      { word: '柔道', reading: 'じゅうどう (juudou)', meaning: 'กีฬายูโด' },
      { word: '茶道', reading: 'さどう (sadou)', meaning: 'พิธีชงชา' }
    ]
  },
  {
    kanji: '曜',
    strokes: 18,
    meaning: 'วันในสัปดาห์',
    kunyomi: 'よう (you)',
    onyomi: 'ヨウ (you)',
    level: 'N4',
    compounds: [
      { word: '日曜日', reading: 'にちようび (nichiyoubi)', meaning: 'วันอาทิตย์' },
      { word: '何曜日', reading: 'なんようび (nanyoubi)', meaning: 'วันอะไรในสัปดาห์' },
      { word: '曜日', reading: 'ようび (youbi)', meaning: 'วันในสัปดาห์' }
    ]
  },
  {
    kanji: '度',
    strokes: 9,
    meaning: 'องศา / ครั้ง / ขอบเขต',
    kunyomi: 'たび (tabi)',
    onyomi: 'ド (do) / ト (to)',
    level: 'N4',
    compounds: [
      { word: '今度', reading: 'こんど (kondo)', meaning: 'ครั้งหน้า / รอบนี้' },
      { word: '一度', reading: 'いちど (ichido)', meaning: 'หนึ่งครั้ง / พร้อมกัน' },
      { word: '温度', reading: 'おんど (ondo)', meaning: 'อุณหภูมิ' }
    ]
  },
  {
    kanji: '持',
    strokes: 9,
    meaning: 'ถือ / ครอบครอง',
    kunyomi: 'も・つ (mo-tsu)',
    onyomi: 'ジ (ji)',
    level: 'N4',
    compounds: [
      { word: '持つ', reading: 'もつ (motsu)', meaning: 'ถือ / มี' },
      { word: '気持ち', reading: 'きもち (kimochi)', meaning: 'ความรู้สึก' },
      { word: '金持ち', reading: 'かねもち (kanemochi)', meaning: 'คนรวย' }
    ]
  },
  {
    kanji: '物',
    strokes: 8,
    meaning: 'สิ่งของ / วัตถุ',
    kunyomi: 'もの (mono)',
    onyomi: 'ブツ (butsu) / モツ (motsu)',
    level: 'N4',
    compounds: [
      { word: '食べ物', reading: 'たべもの (tabemono)', meaning: 'ของกิน / อาหาร' },
      { word: '荷物', reading: 'にもつ (nimotsu)', meaning: 'สัมภาระ / สิ่งของ' },
      { word: '動物', reading: 'どうぶつ (doubutsu)', meaning: 'สัตว์' }
    ]
  },
  {
    kanji: '送',
    strokes: 9,
    meaning: 'ส่ง / ไปส่ง',
    kunyomi: 'おく・る (oku-ru)',
    onyomi: 'ソウ (sou)',
    level: 'N4',
    compounds: [
      { word: '送る', reading: 'おくる (okuru)', meaning: 'ส่งของ/จดหมาย' },
      { word: '見送る', reading: 'みおくる (miokuru)', meaning: 'ไปส่ง / เฝ้าดู' },
      { word: '送信', reading: 'そうしん (soushin)', meaning: 'การกดส่งข้อความ/อีเมล' }
    ]
  },
  {
    kanji: '急',
    strokes: 9,
    meaning: 'รีบร้อน / ด่วน / กะทันหัน',
    kunyomi: 'いそ・ぐ (iso-gu)',
    onyomi: 'キュウ (kyuu)',
    level: 'N4',
    compounds: [
      { word: '急ぐ', reading: 'いそぐ (isogu)', meaning: 'รีบเร่ง' },
      { word: '急行', reading: 'きゅうこう (kyuukou)', meaning: 'รถไฟด่วน' },
      { word: '救急車', reading: 'きゅうきゅうしゃ (kyuukyuusha)', meaning: 'รถพยาบาลฉุกเฉิน' }
    ]
  },
  {
    kanji: '乗',
    strokes: 9,
    meaning: 'โดยสาร / ขึ้นรถ / คูณเลข',
    kunyomi: 'の・る (no-rum) / の・せる (no-seru)',
    onyomi: 'ジョウ (jou)',
    level: 'N4',
    compounds: [
      { word: '乗る', reading: 'のる (noru)', meaning: 'ขึ้นรถ / โดยสาร' },
      { word: '乗車', reading: 'じょうしゃ (jousha)', meaning: 'การขึ้นรถโดยสาร' },
      { word: '乗り物', reading: 'のりもの (norimono)', meaning: 'ยานพาหนะ' }
    ]
  },
  {
    kanji: '降',
    strokes: 10,
    meaning: 'ลง (จากรถ) / ตก (ฝน/หิมะ)',
    kunyomi: 'お・りる (o-riru) / ふ・る (fu-ru)',
    onyomi: 'コウ (kou)',
    level: 'N4',
    compounds: [
      { word: '降りる', reading: 'おりる (oriru)', meaning: 'ลงรถ / ก้าวลง' },
      { word: '降る', reading: 'ふる (furu)', meaning: 'หิมะ/ฝนตก' },
      { word: '降車', reading: 'こうしゃ (kousha)', meaning: 'การลงจากรถ' }
    ]
  }
];
