export interface Paper {
  id: string;
  area: "har" | "biologging" | "positioning" | "mining";
  abstractShort: string;
  abstractShortEn: string; // Added this field
  keywords: string[];
  figure: string;
  fit?: "contain" | "cover";
}

export const papers: Paper[] = [
  {
    id: "50798609",
    area: "biologging",
    abstractShort: "自由に行動する海鳥において、バイオロガー上でのリアルタイム行動認識が、自律的な音声再生実験を可能にすることを実証しました。",
    abstractShortEn: "We demonstrated that real-time behavior recognition on bio-loggers enables autonomous audio playback experiments in free-ranging seabirds.",
    keywords: ["Bio-logging", "On-board AI", "Seabirds", "Behavior Recognition"],
    figure: "/assets/images/papers/50798609.png",
    fit: "cover",
  },
  {
    id: "48688487",
    area: "har",
    abstractShort: "本研究では、モチーフ識別学習を通じて、複雑な活動認識のための新しい自己教師あり学習手法を提案します。",
    abstractShortEn: "In this study, we propose a novel self-supervised learning method for complex activity recognition through motif identification learning.",
    keywords: ["Self-Supervised Learning", "Activity Recognition", "Motif Identification", "Deep Learning"],
    figure: "/assets/images/papers/har/Self-Supervised_Learning_for_Complex_Activity_Recognition_Through_Motif_Identification_Learning.png",
    fit: "contain",
  },
  {
    id: "46459298",
    area: "har",
    abstractShort: "本研究では、IoT対応の物流環境における梱包作業を認識するための大規模データセット「OpenPack」を紹介します。",
    abstractShortEn: "This paper introduces OpenPack, a large-scale dataset for recognizing packaging work in IoT-enabled logistic environments.",
    keywords: ["Activity Recognition", "Wearable Sensors", "Logistics", "Dataset"],
    figure: "/assets/images/papers/har/openpack.png",
    fit: "contain",
  },
  {
    id: "33800227",
    area: "har",
    abstractShort: "本研究では、弱い教師あり学習を用いて、加速度センサーデータから行動の繰り返し回数を計測する手法「WeakCounter」を提案します。",
    abstractShortEn: "This paper proposes WeakCounter, a method for counting action repetitions from acceleration data using weakly supervised learning.",
    keywords: ["Repetition Counting", "Weakly Supervised Learning", "Wearable Sensors"],
    figure: "/assets/images/papers/har/weakcounter.png",
    fit: "contain",
  },
  {
    id: "30123089",
    area: "har",
    abstractShort: "本稿では、移動ロボットのカメラを用いた深層強化学習による人間行動認識手法を提案します。",
    abstractShortEn: "This paper proposes a human activity recognition method using deep reinforcement learning with the camera of a mobile robot.",
    keywords: ["Human Activity Recognition", "Deep Reinforcement Learning", "Mobile Robot"],
    figure: "/assets/images/papers/har/HARRLRobot.png",
    fit: "contain",
  },
  {
    id: "23318428",
    area: "har",
    abstractShort: "本研究では、スマートフォンの音声データを用いて歯磨きのパフォーマンスを評価する手法を提案します。",
    abstractShortEn: "This paper proposes a method for evaluating tooth brushing performance using smartphone sound data.",
    keywords: ["Health Monitoring", "Acoustic Sensing", "Activity Recognition"],
    figure: "/assets/images/papers/har/toothbrushing.png",
    fit: "contain",
  },
  {
    id: "23318443",
    area: "har",
    abstractShort: "本研究では、手に巻いたワイヤーコイルを用いて、携帯型電気機器の使用を認識する手法を提案します。",
    abstractShortEn: "This paper proposes a method for recognizing the usage of handheld electrical devices with a hand-worn coil of wire.",
    keywords: ["Activity Recognition", "Wearable Sensors", "Electromagnetic Sensing"],
    figure: "/assets/images/papers/har/Handheld Electrical Device.png",
    fit: "contain",
  },
  {
    id: "47526256",
    area: "positioning",
    abstractShort: "GNSSフィンガープリンティングに基づき、事前のサイトサーベイなしで屋内でのGNSS衛星からの信号受信情報を予測する手法を提案します。",
    abstractShortEn: "We propose a method to predict signal reception information from GNSS satellites in indoor environments without a prior site survey, based on GNSS fingerprinting.",
    keywords: ["Indoor Positioning", "GNSS", "Fingerprinting", "Site Survey"],
    figure: "/assets/images/papers/47526256.png",
  },

  {
    id: "33800208",
    area: "biologging",
    abstractShort: "アテンションベースのドメイン敵対的深層ニューラルネットワークを用いて、異種間の行動分析を行う手法を開発しました。",
    abstractShortEn: "We have developed a method for cross-species behavior analysis using attention-based domain-adversarial deep neural networks.",
    keywords: ["Cross-species Analysis", "Deep Learning", "Behavior Analysis", "Domain Adaptation"],
    figure: "/assets/images/papers/33800208.png",
    fit: "cover",
  },
  {
    id: "47328633",
    area: "biologging",
    abstractShort: "シイラが海鳥の採餌行動に与える負の影響、すなわち「隠れたライバル」としての役割を明らかにしました。",
    abstractShortEn: "We clarified the negative impact of dolphinfish on seabird foraging behavior, revealing their role as 'hidden rivals'.",
    keywords: ["Animal Behavior", "Bio-logging", "Interspecific Competition", "Foraging"],
    figure: "/assets/images/papers/47328633.png",
  },
  {
    id: "42604202",
    area: "positioning",
    abstractShort: "クラウドソースされたWi-Fi信号付き写真を用いて、Wi-Fiベースの屋内論理的位置予測器を自動構築する手法を提案します。",
    abstractShortEn: "We propose a method to automatically construct a Wi-Fi-based indoor logical location predictor using crowdsourced photos with Wi-Fi signals.",
    keywords: ["Indoor Positioning", "Wi-Fi", "Crowdsourcing", "Logical Location"],
    figure: "/assets/images/papers/placeholder.png",
  },
  {
    id: "43461875",
    area: "mining",
    abstractShort: "次なるPOI（Point of Interest）推薦のための、効果的かつ効率的な自己注意に基づくモデルを提案します。",
    abstractShortEn: "We propose an effective and efficient self-attention-based model for next Point of Interest (POI) recommendation.",
    keywords: ["Recommendation System", "POI Recommendation", "Self-Attention", "Mobility Data"],
    figure: "/assets/images/papers/placeholder.png",
  },

];