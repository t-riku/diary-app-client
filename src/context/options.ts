export const diaryLengthOptions = [
  50, 100, 150, 200, 250, 300, 350, 400, 450, 500,
];

export const toneOptions = [
  "指定なし",
  "お嬢様",
  "紳士",
  "俺様",
  "丁寧",
  "ゆるく",
  "ギャル",
  "関西のおばさん",
  "博多弁",
  "厨二病",
  "かっこよく",
  "可愛く",
  "JK",
  "子供っぽく",
  "赤ちゃんっぽく",
  "パワハラ上司",
  "モラハラ彼氏",
  "ツンデレ彼女",
  "冒険者っぽく",
  "先輩",
  "後輩",
  "誇らしく",
  "申し訳なさそうに",
  "ミステリーサスペンス",
  "コーヒーショップのメニュー風",
  "ホラー",
  "季節感があるように",
];

export const textFormats = [
  "指定なし",
  "英語",
  "最近流行りの言葉多め",
  "絵文字たくさん",
  "ハッシュタグをたくさん",
  "おじさん構文",
  "ひらがなのみ",
  "カタカナのみ",
  "漢字のみ",
  "ひらがなとカタカナのみ",
  "赤ちゃん言葉",
  "ネットスラング",
  "絵文字のみ",
  "数字のみ",
  "小学生の作文みたいに",
  "明らかな誤字脱字",
  "感情爆発モード",
  "シェイクスピア風",
  "SFファンタジーモード",
  "秘密の手紙モード",
  "ハードボイルド探偵モード",
  "科学者のノートモード",
  "昭和レトロモード",
  "ファッションマガジンモード",
  "アクション映画モード",
  "ホラー小説モード",
  "アート詩モード",
];

export const diaryFormats = [
  "指定なし",
  "「日記：〜〜〜」の形",
  "「朝：昼：夜：」の形",
  "詩の形式",
  "会話形式",
  "質問と回答形式",
  "物語形式",
  "箇条書き",
  "リスト",
  "めちゃくちゃ",
  "短文",
];

export const topicOptions = [
  "指定なし",
  "今日の出来事",
  "感謝の瞬間",
  "未来の目標",
  "自己成長",
  "旅行",
  "恋愛",
  "遊び",
  "学びと発見",
];

export const emotionOptions = [
  "指定なし",
  "喜び",
  "悲しみ",
  "驚き",
  "怒り",
  "成就感",
  "静か",
  "元気に",
];

export const meOptions = [
  "指定なし",
  "赤ちゃん",
  "子供",
  "架空のキャラクター",
  "高校生",
  "大学生",
  "既婚者",
  "独身",
  "動物",
  "おじいちゃん・おばあちゃん",
  "社会人",
];

export const personOptions = [
  "指定なし",
  "親友",
  "未来の自分",
  "架空のキャラクター",
  "家族",
  "友達",
  "彼氏・彼女",
  "夫・妻",
  "ペット",
  "知らない人",
  "上司",
  "孫",
  "おじいちゃん・おばあちゃん",
  "先生",
  "先輩",
  "後輩",
];

export const frequencyPenaltyOptions = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
// すごく低い、低い、まあまあ低い、少し低い、指定なし、少し高い、まあまあ高い、高い、すごく高い

export const temperatureOptions = [0, 0.2, 0.4, 0.6, 0.8, 1];
// すごく高い、高い、少し高い、低い、すごく低い、指定なし

export const convertTone = (selectedTone: string): string => {
  return toneOptions.includes(selectedTone) ? `口調：${selectedTone}` : "";
};

export const convertTextFormat = (selectedFormat: string): string => {
  return textFormats.includes(selectedFormat)
    ? `文字の形式：${selectedFormat}`
    : "";
};

export const convertDiaryFormat = (selectedFormat: string): string => {
  return diaryFormats.includes(selectedFormat)
    ? `日記の形式：${selectedFormat}`
    : "";
};

export const convertTopic = (selectedTopic: string): string => {
  return topicOptions.includes(selectedTopic)
    ? `トピック：${selectedTopic}`
    : "";
};

export const convertEmotion = (selectedEmotion: string): string => {
  return emotionOptions.includes(selectedEmotion)
    ? `感情：${selectedEmotion}`
    : "";
};

export const convertMe = (selectedMe: string): string => {
  return meOptions.includes(selectedMe) ? `自分：${selectedMe}` : "";
};

export const convertPerson = (selectedPerson: string): string => {
  return personOptions.includes(selectedPerson)
    ? `相手：${selectedPerson}`
    : "";
};

const addCommasToNumber = (number: number) => {
  let numberString = number.toString();
  numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return numberString;
};

const diarySeveralWays =
  diaryLengthOptions.length *
  toneOptions.length *
  textFormats.length *
  diaryFormats.length *
  topicOptions.length *
  emotionOptions.length *
  meOptions.length *
  personOptions.length *
  frequencyPenaltyOptions.length *
  temperatureOptions.length;

// 上記の計算結果にカンマを挿入した文字列を生成
export const formattedDiarySeveralWays = addCommasToNumber(diarySeveralWays);
