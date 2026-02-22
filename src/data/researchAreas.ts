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
    descriptionEn: "Human activity recognition is an AI technology that identifies the behaviors of observed subjects using sensor data collected from devices such as wearable or environmental sensors. It serves as a foundational technology for realizing future smart societies and industries, including smart factories, smart healthcare, and smart homes. At the Real-World Intelligence Laboratory, we focus particularly on recognizing and understanding complex activities in environments such as smart factories and life science experiments. We develop real-world AI technologies that can be applied to coaching systems and industrial robotics. In addition, we construct large-scale activity recognition datasets and develop benchmarks for foundation models in activity recognition.",
  },
  {
    id: "biologging",
    titleJa: "AI バイオロギング",
    titleEn: "AI Bio-logging",
    video: "https://www.youtube.com/watch?v=rXBI1jfGbn8",
    description: "AIバイオロギングは、バイオロギングデバイスに搭載したAIが知的に野生動物の生態観測を行う、我々が世界で初めて提唱した研究手法です。小型デバイス上で動作する小型で賢いAIの開発などを通じて、これまでに明らかにされていなかった野生生物の謎に挑みます。",
    descriptionEn: "AI Biologging is a research paradigm that we were the first in the world to propose. In this approach, AI embedded in biologging devices intelligently observes and records the behaviors and ecology of wild animals. Through the development of compact and efficient AI models that operate on small, resource-constrained devices, we aim to uncover previously unknown aspects of wildlife behavior and ecology.",
  },
  {
    id: "positioning",
    titleJa: "屋内位置測位",
    titleEn: "Indoor Positioning",
    video: "/assets/video/realworldAIonlyHuman.mp4",
    description: "屋内位置推定技術は、スマートフォンなどのセンサデバイスから得られた加速度データやWi-Fi信号などのデータを利用し、人間やロボットなどの位置座標を推定する技術で、屋内ナビゲーションやスマートファクトリーなど幅広い応用があります。実世界知能基盤講座では、そのようなデータに加えて音声や屋内で観測されるGPS信号なども用いた、マルチモーダル屋内位置推定の研究を行っています。",
    descriptionEn: "Indoor positioning technology estimates the spatial coordinates of humans and robots by leveraging sensor data such as accelerometer signals from smartphones and Wi-Fi signal measurements. It has broad applications in indoor navigation, smart factories, and beyond. At the Real-World Intelligence Laboratory, we conduct research on multimodal indoor positioning, integrating not only inertial and Wi-Fi data but also audio signals and GPS signals observable indoors, enabling more robust and accurate localization in real-world environments.",
  },
  {
    id: "mining",
    titleJa: "実世界データマイニング",
    titleEn: "Real-world Data Mining",
    video: "/assets/video/realworldAIonlyHuman.mp4",
    description: "人間や動物の行動データを自動解析するAIを実現し、これまでに明らかになっていなかった知識を掘り起こすデータマイニング技術を開発しています。健常および疾患のモデル動物の行動を解析して創薬に役立てたり、環境変動による野生動物の行動に及ぼす影響の評価、獣害対策施策の動物行動に与える影響の評価、熟練作業員の作業データからのノウハウや暗黙知の抽出などの様々な実世界応用が見込まれます。",
    descriptionEn: "We develop AI technologies for the automatic analysis of human and animal behavioral data, enabling data mining approaches that uncover previously undiscovered knowledge. Our research has wide-ranging real-world applications, including: analyzing the behavior of healthy and disease-model animals to support drug discovery; evaluating the impact of environmental changes on wildlife behavior; assessing the effects of wildlife damage control policies on animal behavior; extracting tacit knowledge and expertise from skilled workers’ operational data. Through these efforts, we aim to transform behavioral data into actionable insights for science, industry, and society.",
  },
];