export interface ResearchArea {
  id: string;
  titleJa: string;
  titleEn: string;
  description: string;
  descriptionEn: string; // Added this field
}

export const researchAreas: ResearchArea[] = [
  {
    id: "har",
    titleJa: "人間行動認識",
    titleEn: "Human Activity Recognition",
    description: "ウェアラブルセンサやスマートフォン、環境センサを用いて、人々の日常行動や作業行動を認識・理解する技術の研究開発を行っています。",
    descriptionEn: "We conduct research and development of technologies to recognize and understand people's daily activities and work behaviors using wearable sensors, smartphones, and environmental sensors.",
  },
  {
    id: "biologging",
    titleJa: "バイオロギング",
    titleEn: "Bio-logging",
    description: "動物に取り付けた小型のセンサー（バイオロガー）を用いて、野生動物の生態を解明するためのデータ解析技術や、効率的なデータ収集手法を研究しています。",
    descriptionEn: "Using small sensors (bio-loggers) attached to animals, we research data analysis techniques to elucidate the ecology of wild animals and develop efficient data collection methods.",
  },
  {
    id: "positioning",
    titleJa: "屋内測位",
    titleEn: "Indoor Positioning",
    description: "GPSが届かない屋内環境において、Wi-Fiや地磁気、音波などを用いて、人やモノの位置を特定する高精度な測位技術を研究しています。",
    descriptionEn: "In indoor environments where GPS is unavailable, we research high-precision positioning technologies to locate people and objects using Wi-Fi, geomagnetism, and sound waves.",
  },
  {
    id: "mining",
    titleJa: "データマイニング",
    titleEn: "Data Mining",
    description: "多様なデータソースから価値ある知見を抽出するため、機械学習や統計的手法を用いた高度なデータマイニング技術の研究に取り組んでいます。",
    descriptionEn: "We are engaged in the research of advanced data mining techniques using machine learning and statistical methods to extract valuable insights from diverse data sources.",
  },
];