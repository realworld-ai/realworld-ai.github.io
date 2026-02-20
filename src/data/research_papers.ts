export interface Paper {
  id: string;
  // New fields
  title: string;
  authors: string;
  journal: string;
  dateDisplay: string;
  year: number;
  url: string;
  doi: string;
  // Existing fields
  area: "har" | "biologging" | "positioning" | "mining" | "none";
  abstractShort: string;
  abstractShortEn: string;
  keywords: string[];
  figure: string;
  fit?: "contain" | "cover";
}

export const papers: Paper[] = [
  {
    "id": "50798609",
    "area": "biologging",
    "abstractShort": "野生の海鳥に対して、自律的な音声プレイバック実験を可能にするバイオロガー上に実装されたリアルタイム行動認識AIを実現しました。",
    "abstractShortEn": "We demonstrated that real-time behavior recognition on bio-loggers enables autonomous audio playback experiments in free-ranging seabirds.",
    "keywords": [
      "Bio-logging",
      "On-board AI",
      "Seabirds",
      "Behavior Recognition"
    ],
    "figure": "/assets/images/papers/biologging/realtime behavior recognition.jpg",
    "fit": "contain",
    "title": "Real-Time Behaviour Recognition on Bio-Loggers Enables Autonomous Audio Playback Experiments in Free-Ranging Seabirds",
    "authors": "Ryoma Otsuka, Hibiki Sugiyama, Yuichi Mizutani, Ken Yoda, Takuya Maekawa",
    "journal": "Ecology and Evolution",
    "dateDisplay": "(Aug. 2025)",
    "year": 2025,
    "url": "https://doi.org/10.1002/ece3.71832",
    "doi": "10.1002/ece3.71832"
  },
  {
    "id": "48688487",
    "area": "har",
    "abstractShort": "複雑な行動認識のための、センサデータモチーフを識別する自己教師あり学習手法を提案しました。",
    "abstractShortEn": "In this study, we propose a novel self-supervised learning method for complex activity recognition through motif identification learning.",
    "keywords": [
      "Self-Supervised Learning",
      "Activity Recognition",
      "Motif Identification",
      "Deep Learning"
    ],
    "figure": "/assets/images/papers/har/Self-Supervised_Learning_for_Complex_Activity_Recognition_Through_Motif_Identification_Learning.png",
    "fit": "contain",
    "title": "Self-Supervised Learning for Complex Activity Recognition Through Motif Identification Learning",
    "authors": "Qingxin Xia, Jaime Morales, Yongzhi Huang, Takahiro Hara, Kaishun Wu, Hirotomo Oshima, Masamitsu Fukuda, Yasuo Namioka, Takuya Maekawa",
    "journal": "IEEE Transactions on Mobile Computing",
    "dateDisplay": "(May 2025)",
    "year": 2025,
    "url": "https://doi.org/10.1109/TMC.2024.3514736",
    "doi": "10.1109/TMC.2024.3514736"
  },
  {
    "id": "46459298",
    "area": "har",
    "abstractShort": "物流環境における梱包作業認識のための大規模センサデータセット「OpenPack」を構築・公開しました。",
    "abstractShortEn": "This paper introduces OpenPack, a large-scale dataset for recognizing packaging work in IoT-enabled logistic environments.",
    "keywords": [
      "Activity Recognition",
      "Wearable Sensors",
      "Logistics",
      "Dataset"
    ],
    "figure": "/assets/images/papers/har/openpack.png",
    "fit": "contain",
    "title": "OpenPack: A Large-Scale Dataset for Recognizing Packaging Works in IoT-Enabled Logistic Environments.",
    "authors": "Naoya Yoshimura, Jaime Morales, Takuya Maekawa, Takahiro Hara",
    "journal": "IEEE Int'l Conf. on Pervasive Computing and Communications (PerCom 2024)",
    "dateDisplay": "(Mar. 2024)",
    "year": 2024,
    "url": "https://doi.org/10.1109/PerCom59722.2024.10494448",
    "doi": "10.1109/PerCom59722.2024.10494448"
  },
  {
    "id": "33800227",
    "area": "har",
    "abstractShort": "弱教師あり学習を用いて、加速度センサーデータからトレーニングの繰り返し回数を計測する手法「WeakCounter」を提案しました。",
    "abstractShortEn": "This paper proposes WeakCounter, a method for counting action repetitions from acceleration data using weakly supervised learning.",
    "keywords": [
      "Repetition Counting",
      "Weakly Supervised Learning",
      "Wearable Sensors"
    ],
    "figure": "/assets/images/papers/har/weakcounter.png",
    "fit": "contain",
    "title": "WeakCounter: Acceleration-based Repetition Counting of Actions with Weakly Supervised Learning",
    "authors": "Yuuki Nishino, Takuya Maekawa, Takahiro Hara",
    "journal": "2021 International Symposium on Wearable Computers",
    "dateDisplay": "(Sep. 2021)",
    "year": 2021,
    "url": "https://doi.org/10.1145/3460421.3480431",
    "doi": "10.1145/3460421.3480431"
  },
  {
    "id": "30123089",
    "area": "har",
    "abstractShort": "深層強化学習を用いた、移動ロボットのカメラによる人間行動認識手法を提案しました。",
    "abstractShortEn": "This paper proposes a human activity recognition method using deep reinforcement learning with the camera of a mobile robot.",
    "keywords": [
      "Human Activity Recognition",
      "Deep Reinforcement Learning",
      "Mobile Robot"
    ],
    "figure": "/assets/images/papers/har/HARRLRobot.png",
    "fit": "contain",
    "title": "Human Activity Recognition with Deep Reinforcement Learning using the Camera of a Mobile Robot.",
    "authors": "Teerawat Kumrai, Joseph Korpela, Takuya Maekawa, Yen Yu, Ryota Kanai",
    "journal": "PerCom 2020",
    "dateDisplay": "(Mar. 2020)",
    "year": 2020,
    "url": "https://doi.org/10.1109/PerCom45495.2020.9127376",
    "doi": "10.1109/PerCom45495.2020.9127376"
  },
  {
    "id": "23318428",
    "area": "har",
    "abstractShort": "スマートフォンの音声データを用いて歯磨きのパフォーマンスを自動評価する手法を提案しました。",
    "abstractShortEn": "This paper proposes a method for evaluating tooth brushing performance using smartphone sound data.",
    "keywords": [
      "Health Monitoring",
      "Acoustic Sensing",
      "Activity Recognition"
    ],
    "figure": "/assets/images/papers/har/toothbrushing.png",
    "fit": "contain",
    "title": "Evaluating Tooth Brushing Performance With Smartphone Sound Data",
    "authors": "Joseph Korpela, Ryosuke Miyaji, Takuya Maekawa, Kazunori Nozaki, Hiroo Tamagawa",
    "journal": "PROCEEDINGS OF THE 2015 ACM INTERNATIONAL JOINT CONFERENCE ON PERVASIVE AND UBIQUITOUS COMPUTING (UBICOMP 2015)",
    "dateDisplay": "(2015)",
    "year": 2015,
    "url": "https://doi.org/10.1145/2750858.2804259",
    "doi": "10.1145/2750858.2804259"
  },
  {
    "id": "47526256",
    "area": "positioning",
    "abstractShort": "GNSS信号を用いた屋内位置測位を実現するため、事前のサイトサーベイなしで屋内でのGNSS衛星からの信号受信情報を予測する手法を提案しました。",
    "abstractShortEn": "We propose a method to predict signal reception information from GNSS satellites in indoor environments without a prior site survey, based on GNSS fingerprinting.",
    "keywords": [
      "Indoor Positioning",
      "GNSS",
      "Fingerprinting",
      "Site Survey"
    ],
    "figure": "/assets/images/papers/indoor/Predicting Signal Reception Information from GNSS Satellites.png",
    "title": "Predicting Signal Reception Information from GNSS Satellites in Indoor Environments without Site Survey: Towards Opportunistic Indoor Positioning Based on GNSS Fingerprinting",
    "authors": "Heng Zhou, Takuya Maekawa",
    "journal": "Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies",
    "dateDisplay": "(Aug. 2024)",
    "year": 2024,
    "url": "https://doi.org/10.1145/3678554",
    "doi": "10.1145/3678554"
  },
  {
    "id": "33800208",
    "area": "mining",
    "abstractShort": "アテンションベースのドメイン敵対的深層ニューラルネットワークを用いて、異種動物行動を横断的に分析する手法を開発しました。",
    "abstractShortEn": "We have developed a method for cross-species behavior analysis using attention-based domain-adversarial deep neural networks.",
    "keywords": [
      "Cross-species Analysis",
      "Deep Learning",
      "Behavior Analysis",
      "Domain Adaptation"
    ],
    "figure": "/assets/images/papers/biologging/Cross-species behavior analysis with attention-based domain-adversarial dnn.png",
    "fit": "cover",
    "title": "Cross-species behavior analysis with attention-based domain-adversarial deep neural networks.",
    "authors": "Takuya Maekawa, Daiki Higashide, Takahiro Hara, Kentarou Matsumura, Kaoru Ide, Takahisa Miyatake, Koutarou D Kimura, Susumu Takahashi",
    "journal": "Nature communications",
    "dateDisplay": "(Sep. 2021)",
    "year": 2021,
    "url": "https://doi.org/10.1038/s41467-021-25636-x",
    "doi": "10.1038/s41467-021-25636-x"
  },
  {
    "id": "42604202",
    "area": "positioning",
    "abstractShort": "クラウドソーシングによって収集されたWi-Fi信号付き写真を用いて、Wi-Fiベースの屋内位置予測モデルを自動構築する手法を提案しました。",
    "abstractShortEn": "We propose a method to automatically construct a Wi-Fi-based indoor logical location predictor using crowdsourced photos with Wi-Fi signals.",
    "keywords": [
      "Indoor Positioning",
      "Wi-Fi",
      "Crowdsourcing",
      "Logical Location"
    ],
    "figure": "/assets/images/papers/indoor/Automatic Update of Indoor Location Fingerprints.png",
    "title": "Automated construction of Wi-Fi-based indoor logical location predictor using crowd-sourced photos with Wi-Fi signals",
    "authors": "Teerawat Kumrai, Joseph Korpela, Yizhe Zhang, Kazuya Ohara, Tomoki Murakami, Hirantha Abeysekera, Takuya Maekawa",
    "journal": "Pervasive Mob. Comput.",
    "dateDisplay": "(Feb. 2023)",
    "year": 2023,
    "url": "https://doi.org/10.1016/j.pmcj.2022.101742",
    "doi": "10.1016/j.pmcj.2022.101742"
  },
  {
    "id": "31940752",
    "area": "biologging",
    "abstractShort": "海鳥に装着するバイオロガーにリアルタイム行動認識AIを世界で初めて搭載し、重要行動の自動映像撮影を実現しました。",
    "abstractShortEn": "We showed that machine learning enables improved runtime and precision for bio-loggers on seabirds.",
    "keywords": [
      "Bio-logging",
      "Machine Learning",
      "Seabirds",
      "Energy Efficiency"
    ],
    "figure": "/assets/images/papers/biologging/Machine learning enables improved runtime and precision for bio-loggers on seabirds.png",
    "fit": "cover",
    "title": "Machine learning enables improved runtime and precision for bio-loggers on seabirds",
    "authors": "Joseph Korpela, Hirokazu Suzuki, Sakiko Matsumoto, Yuichi Mizutani, Masaki Samejima, Takuya Maekawa, Junichi Nakai, Ken Yoda",
    "journal": "COMMUNICATIONS BIOLOGY",
    "dateDisplay": "(Oct. 2020)",
    "year": 2020,
    "url": "https://doi.org/10.1038/s42003-020-01356-8",
    "doi": "10.1038/s42003-020-01356-8"
  },
  {
    "id": "44467792",
    "area": "biologging",
    "abstractShort": "軽量な異常検知器を搭載したビデオバイオロガーを用いて、野生動物の稀な行動を自動的に記録する手法を開発しました。",
    "abstractShortEn": "We developed a method to automatically record rare behaviors of wild animals using video bio-loggers with on-board light-weight outlier detector.",
    "keywords": [
      "Bio-logging",
      "Outlier Detection",
      "Video Recording",
      "Wild Animals"
    ],
    "figure": "/assets/images/papers/biologging/Automatic recording of rare behaviors of wild animals.png",
    "fit": "cover",
    "title": "Automatic recording of rare behaviors of wild animals using video bio-loggers with on-board light-weight outlier detector",
    "authors": "Kei Tanigaki, Ryoma Otsuka, Aiyi Li, Yota Hatano, Yuanzhou Wei, Shiho Koyama, Ken Yoda, Takuya Maekawa",
    "journal": "PNAS Nexus",
    "dateDisplay": "(Jan. 2024)",
    "year": 2024,
    "url": "https://doi.org/10.1093/pnasnexus/pgad447",
    "doi": "10.1093/pnasnexus/pgad447"
  },
  {
    "id": "31940751",
    "area": "mining",
    "abstractShort": "深層学習による動物の軌跡の比較分析手法DeepHLを提案しました。",
    "abstractShortEn": "We propose a deep learning-assisted comparative analysis method of animal trajectories named DeepHL.",
    "keywords": [
      "Trajectory Analysis",
      "Deep Learning",
      "DeepHL",
      "Animal Behavior"
    ],
    "figure": "/assets/images/papers/biologging/Deep learning-assisted comparative analysis of animal trajectories with DeepHL.png",
    "fit": "cover",
    "title": "Deep learning-assisted comparative analysis of animal trajectories with DeepHL",
    "authors": "Takuya Maekawa, Kazuya Ohara, Yizhe Zhang, Matasaburo Fukutomi, Sakiko Matsumoto, Kentarou Matsumura, Hisashi Shidara, Shuhei J. Yamazaki, Ryusuke Fujisawa, Kaoru Ide, Naohisa Nagaya, Koji Yamazaki, Shinsuke Koike, Takahisa Miyatake, Koutarou D. Kimura, Hiroto Ogawa, Susumu Takahashi, Ken Yoda",
    "journal": "NATURE COMMUNICATIONS",
    "dateDisplay": "(Oct. 2020)",
    "year": 2020,
    "url": "https://doi.org/10.1038/s41467-020-19105-0",
    "doi": "10.1038/s41467-020-19105-0"
  },
  {
    "id": "45639287",
    "area": "biologging",
    "abstractShort": "加速度センサを用いた野生動物の行動認識のための様々な深層学習技術を検証しました。",
    "abstractShortEn": "Exploring deep learning techniques for wild animal behaviour classification using animal-borne accelerometers.",
    "keywords": [
      "Bio-logging",
      "Deep Learning",
      "Animal Behavior",
      "Accelerometers"
    ],
    "figure": "https://besjournals.onlinelibrary.wiley.com/cms/asset/495358c4-0801-4a16-a75b-dc3c56881bda/mee314137-toc-0001-m.jpg",
    "fit": "cover",
    "title": "Exploring deep learning techniques for wild animal behaviour classification using animal‐borne accelerometers",
    "authors": "Ryoma Otsuka, Naoya Yoshimura, Kei Tanigaki, Shiho Koyama, Yuichi Mizutani, Ken Yoda, Takuya Maekawa",
    "journal": "Methods in Ecology and Evolution",
    "dateDisplay": "(Apr. 2024)",
    "year": 2024,
    "url": "https://doi.org/10.1111/2041-210X.14294",
    "doi": "10.1111/2041-210X.14294"
  },
  {
    "id": "80000001",
    "area": "positioning",
    "abstractShort": "音響信号の手がかりを活用して屋内での歩行者デッドレコニング（PDR）の精度を向上させる手法を提案しました。",
    "abstractShortEn": "We proposed a method to improve the accuracy of indoor Pedestrian Dead Reckoning (PDR) by utilizing acoustic signal cues.",
    "keywords": [
      "Indoor Positioning",
      "PDR",
      "Acoustic Signal"
    ],
    "figure": "/assets/images/papers/indoor/Acoustic-assisted Indoor Pedestrian Dead Reckoning.png",
    "title": "Acoustic-assisted Indoor Pedestrian Dead Reckoning",
    "authors": "Yang Wang, Heng Zhou, Takuya Maekawa",
    "journal": "Proceedings of the 2025 ACM International Symposium on Wearable Computers (ISWC 2025)",
    "dateDisplay": "",
    "year": 2025,
    "url": "https://dl.acm.org/doi/10.1145/3715071.3750409",
    "doi": "10.1145/3715071.3750409"
  },
  {
    "id": "80000004",
    "area": "positioning",
    "abstractShort": "Wi-Fi CSIからAoAを推定し、デバイスフリー屋内位置推定を実現する「AoA-net」を提案しました。",
    "abstractShortEn": "We proposed AoA-net, realizing device-free indoor localization based on AoA estimation with WiFi CSI.",
    "keywords": [
      "Device-free Localization",
      "AoA",
      "WiFi CSI",
      "Deep Learning"
    ],
    "figure": "/assets/images/papers/indoor/AoA-net.png",
    "title": "AoA-net: Estimating Angle-of-arrival Using Wi-Fi Channel State Information Based on Deep Neural Networks with Subcarrier Selection",
    "authors": "Teerawat Kumrai, Zesheng Cai, Takuya Maekawa, Takahiro Hara, Kazuya Ohara, Tomoki Murakami, Hirantha Abeysekera",
    "journal": "Journal of Information Processing",
    "dateDisplay": "",
    "year": 2024,
    "url": "https://www.jstage.jst.go.jp/article/ipsjjip/32/0/32_863/_article",
    "doi": "https://doi.org/10.2197/ipsjjip.32.863"
  },
  {
    "id": "80000005",
    "area": "positioning",
    "abstractShort": "CSIベースの深度画像再構成において、環境への依存を低減し汎化性能を向上させる手法を提案しました。",
    "abstractShortEn": "We proposed a method to enhance environmental independency for CSI-based depth image reconstruction.",
    "keywords": [
      "CSI",
      "Depth Image Reconstruction",
      "Environmental Independency"
    ],
    "figure": "/assets/images/papers/indoor/Enhancing Environmental Independency.png",
    "title": "Enhancing Environmental Independency for CSI-based Depth Image Reconstruction",
    "authors": "Guanyu Cao; Takuya Maekawa; Kazuya Ohara; Yasue Kishino",
    "journal": "IEEE Annual Conference on Pervasive Computing and Communications Workshops (PerCom)",
    "dateDisplay": "",
    "year": 2025,
    "url": "https://ieeexplore.ieee.org/document/11038560",
    "doi": "10.1109/PerComWorkshops65533.2025.00121"
  },
  {
    "id": "80000007",
    "area": "positioning",
    "abstractShort": "GPS信号を活用して屋内での歩行者デッドレコニング（PDR）の精度を向上させる手法を提案しました。",
    "abstractShortEn": "We proposed a method to improve indoor Pedestrian Dead Reckoning (PDR) accuracy assisted by GPS signals.",
    "keywords": [
      "Indoor PDR",
      "GPS-assisted",
      "Navigation"
    ],
    "figure": "/assets/images/papers/indoor/GPS-assisted Indoor Pedestrian Dead Reckoning.png",
    "title": "GPS-assisted Indoor Pedestrian Dead Reckoning",
    "authors": "Zhou, Heng and Maekawa, Takuya",
    "journal": "Proc. ACM Interact. Mob. Wearable Ubiquitous Technol.",
    "dateDisplay": "",
    "year": 2023,
    "url": "https://doi.org/10.1145/3569467",
    "doi": "10.1145/3569467"
  }
];
