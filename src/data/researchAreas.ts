export interface ResearchArea {
  id: string;
  titleJa: string;
  titleEn: string;
  description: string;
  descriptionEn: string; // Added this field
  video?: string; // Added this field
}

export const researchAreas: ResearchArea[] = [
  {
    id: "har",
    titleJa: "人間行動認識",
    titleEn: "Human Activity Recognition",
    // video: "/assets/video/realworldAIonlyHuman.mp4",
    video: "https://www.youtube.com/watch?v=R_Rj6inD2Qs",
    description: "行動認識技術は、センサなどのデバイスから観測されたセンサデータを用いて、観測対象の行動を認識するAI技術です。スマートファクトリーやスマートヘルスケア、スマートホームなど我々の未来の生活や産業を実現するための基盤となる技術です。実世界知能基盤講座では、特にスマートファクトリーやライフサイエンス実験などにおける複雑行動を認識・理解し、コーチングや産業ロボットに活用する実世界AIの研究開発をしています。また、大規模行動認識用データセットや行動認識基盤モデルのためのベンチマークの構築なども行っています。",
    descriptionEn: "Human Activity Recognition is an AI technology that infers and classifies an individual’s activities from sensor data collected by devices such as wearables and environmental sensors. It serves as a foundational capability for enabling future lifestyles and industries, including smart factories, smart healthcare, and smart homes. At the Real-World Intelligence Foundation Chair, we conduct research and development on real-world AI that can recognize and interpret complex behaviors—particularly in smart manufacturing and life-science experiments—and leverage these capabilities for applications such as coaching support and industrial robotics.",
  },
  {
    id: "biologging",
    titleJa: "AI バイオロギング",
    titleEn: "AI Bio-logging",
    video: "https://www.youtube.com/watch?v=rXBI1jfGbn8",
    description: "AIバイオロギングは、バイオロギングデバイスに搭載したAIが知的に野生動物の生態観測を行う、我々が世界で初めて提唱した研究手法です。小型デバイス上で動作する小型で賢いAIの開発などを通じて、これまでに明らかにされていなかった野生生物の謎に挑みます。",
    descriptionEn: "Using small sensors (bio-loggers) attached to animals, we research data analysis techniques to elucidate the ecology of wild animals and develop efficient data collection methods.",
  },
  {
    id: "positioning",
    titleJa: "屋内位置測位",
    titleEn: "Indoor Positioning",
    video: "/assets/video/realworldAIonlyHuman.mp4",
    description: "屋内位置推定技術は、スマートフォンなどのセンサデバイスから得られた加速度データやWi-Fi信号などのデータを利用し、人間やロボットなどの位置座標を推定する技術で、屋内ナビゲーションやスマートファクトリーなど幅広い応用があります。実世界知能基盤講座では、そのようなデータに加えて音声や屋内で観測されるGPS信号なども用いた、マルチモーダル屋内位置推定の研究を行っています。",
    descriptionEn: "In indoor environments where GPS is unavailable, we research high-precision positioning technologies to locate people and objects using Wi-Fi, geomagnetism, and sound waves.",
  },
  // {
  //   id: "mining",
  //   titleJa: "実世界データマイニング",
  //   titleEn: "Real-world Data Mining",
  //   video: "/assets/video/realworldAIonlyHuman.mp4",
  //   description: "人間や動物の行動データを自動解析するAIを実現し、これまでに明らかになっていなかった知識を掘り起こすデータマイニング技術を開発しています。健常および疾患のモデル動物の行動を解析して創薬に役立てたり、環境変動による野生動物の行動に及ぼす影響の評価、獣害対策施策の動物行動に与える影響の評価、熟練作業員の作業データからのノウハウや暗黙知の抽出などの様々な実世界応用が見込まれます。",
  //   descriptionEn: "We are engaged in the research of advanced real-world data mining techniques using machine learning and statistical methods to extract valuable insights from diverse data sources.",
  // },
];