export interface Paper {
  id: string; // Corresponds to the ID in publications.json
  area: "har" | "biologging" | "positioning" | "mining";
  abstractShort: string;
  keywords: string[];
  figure: string; // Image path, e.g., /images/papers/paper-id.png
  fit?: "contain" | "cover";
}

export const papers: Paper[] = [
  {
    id: "50798609",
    area: "biologging",
    abstractShort: "自由に行動する海鳥において、バイオロガー上でのリアルタイム行動認識が、自律的な音声再生実験を可能にすることを実証しました。",
    keywords: ["Bio-logging", "On-board AI", "Seabirds", "Behavior Recognition"],
    figure: "/assets/images/papers/50798609.png",
    fit: "cover",
  },
  {
    id: "48688487",
    area: "har",
    abstractShort: "本研究では、モチーフ識別学習を通じて、複雑な活動認識のための新しい自己教師あり学習手法を提案します。",
    keywords: ["Self-Supervised Learning", "Activity Recognition", "Motif Identification"],
    figure: "/assets/images/papers/placeholder.png",
  },
  {
    id: "47526256",
    area: "positioning",
    abstractShort: "GNSSフィンガープリンティングに基づき、事前のサイトサーベイなしで屋内でのGNSS衛星からの信号受信情報を予測する手法を提案します。",
    keywords: ["Indoor Positioning", "GNSS", "Fingerprinting", "Site Survey"],
    figure: "/assets/images/papers/47526256.png",
  },
  {
    id: "42604201",
    area: "har",
    abstractShort: "モチーフ誘導型アテンションネットワーク（MGA-Net+）を用いて、加速度データに基づく梱包作業認識の精度を向上させる手法を提案します。",
    keywords: ["Activity Recognition", "Wearable Sensors", "Logistics", "Deep Learning"],
    figure: "/assets/images/papers/placeholder.png",
  },
  {
    id: "33800208",
    area: "biologging",
    abstractShort: "アテンションベースのドメイン敵対的深層ニューラルネットワークを用いて、異種間の行動分析を行う手法を開発しました。",
    keywords: ["Cross-species Analysis", "Deep Learning", "Behavior Analysis", "Domain Adaptation"],
    figure: "/assets/images/papers/33800208.png",
    fit: "cover",
  },
  {
    id: "47328633",
    area: "biologging",
    abstractShort: "シイラが海鳥の採餌行動に与える負の影響、すなわち「隠れたライバル」としての役割を明らかにしました。",
    keywords: ["Animal Behavior", "Bio-logging", "Interspecific Competition", "Foraging"],
    figure: "/assets/images/papers/47328633.png",
  },
  {
    id: "42604202",
    area: "positioning",
    abstractShort: "クラウドソースされたWi-Fi信号付き写真を用いて、Wi-Fiベースの屋内論理的位置予測器を自動構築する手法を提案します。",
    keywords: ["Indoor Positioning", "Wi-Fi", "Crowdsourcing", "Logical Location"],
    figure: "/assets/images/papers/placeholder.png",
  },
  {
    id: "43461875",
    area: "mining",
    abstractShort: "次なるPOI（Point of Interest）推薦のための、効果的かつ効率的な自己注意に基づくモデルを提案します。",
    keywords: ["Recommendation System", "POI Recommendation", "Self-Attention", "Mobility Data"],
    figure: "/assets/images/papers/placeholder.png",
  },
  {
    id: "40054243",
    area: "har",
    abstractShort: "追加のデータ収集によって人間行動認識モデルの性能がどの程度向上するかを予測する手法を提案します。",
    keywords: ["Activity Recognition", "Performance Prediction", "Data Collection", "Machine Learning"],
    figure: "/assets/images/papers/placeholder.png",
  }
];
