# Join Us Page Refactoring Plan

## 目标 / Goals
- 将 joinus 页面重构为类似 PublicationList 的 React 组件架构
- Tab 设计与 publications 页面完全一致（rounded-t-lg 风格）
- 文字内容集中管理（全部在 `JoinUs.tsx` 的 `CONTENT` 对象中）
- 可复用的渲染函数（renderStudents, renderAssociates, renderTechnical, renderVisiting）
- 保留 Hero 区块（「実世界を理解するAIへ」）不变，仅重构 tabs + 内容区域

---

## 涉及文件变更 / Files to Change

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/react/JoinUs.tsx` | **新建** | 主体 React 组件，含全部文字内容 |
| `src/data/join.json` | **修改** | 仅更新 `formUrl` 为新 Google Form |
| `src/pages/ja/joinus.astro` | **修改** | 简化为 Hero + `<JoinUs client:only="react" lang="ja" />` |
| `src/pages/en/joinus.astro` | **修改** | 简化为 Hero + `<JoinUs client:only="react" lang="en" />` |

---

## 1. `src/data/join.json` — 改动

```diff
- "formUrl": "https://forms.gle/rMxkmG2vhwUNb4y17",
+ "formUrl": "https://forms.gle/eTXeKE44swMK1ZGMA",
```
> join.json 其余字段不再被 JoinUs.tsx 使用，但保留不删除（向后兼容）。

---

## 2. `src/components/react/JoinUs.tsx` — 新建组件

### 组件结构

```
JoinUs.tsx
├── Props: { lang: 'en' | 'ja' }
├── CONTENT 对象（所有文字内容，ja/en 双语）
│   ├── tabs[]
│   ├── students { intro, masters, phd, support, faq }
│   ├── associates { intro, roles }
│   ├── technical { intro, positions[] }
│   └── visiting { intro, items[], schedule[], faq[] }
├── useState: activeTab ('students' | 'associates' | 'technical' | 'visiting')
└── 渲染函数
    ├── renderStudents()
    ├── renderAssociates()
    ├── renderTechnical()
    └── renderVisiting()   ← 包含 FAQ accordion
```

### Tab 导航样式（与 PublicationList 完全一致）

```tsx
// Tab button states:
// Active:   bg-lab-blue text-white border border-lab-blue/30 shadow-lg
// Inactive: text-gray-400 hover:text-white hover:bg-white/5 border border-transparent
```

---

## 3. 文字内容 / CONTENT 对象

### 3.1 Tab 标签

| ID | 日本語 | English |
|----|--------|---------|
| `students` | 学生募集 | Student Recruitment |
| `associates` | 研究支援スタッフ | Research Associates |
| `technical` | 技術スタッフ | Technical Staff |
| `visiting` | 見学・訪問 | Visiting / Lab Visit |

---

### 3.2 学生募集 (students) タブ

**イントロ（ja）**
> Real-world Intelligence Lab では、センシング技術と機械学習を融合させ、人間行動認識・バイオロギング・屋内測位・実世界データマイニングの4領域で研究を推進しています。実世界のデータから知識を引き出し、社会に貢献できる研究者・エンジニアを育成しています。

**イントロ（en）**
> At Real-world Intelligence Lab, we fuse sensing technology and machine learning across four core areas—human activity recognition, bio-logging, indoor positioning, and real-world data mining. We cultivate researchers and engineers who extract knowledge from real-world data and contribute to society.

---

**研究室説明会ブロック（ja）**

タイトル: 研究室説明会を開催します！

> 月に一度、学生を対象とした研究室の説明会を開く予定です！<br>
> 内部生から当研究室を志望している方、外部進学を考えている学生さんも大歓迎です！<br>
> 下記フォームよりお気軽にご連絡ください。

**研究室説明会ブロック（en）**

Title: Lab Information Sessions

> We hold monthly lab information sessions for prospective students, including current The University of Osaka undergraduates and students from other institutions.<br>
> Feel free to reach out via the form below.

---

**修士課程 (masters) カード（ja）**

タイトル: 修士課程

> 大阪大学大学院 [情報科学研究科 マルチメディア工学専攻](https://www.ist.osaka-u.ac.jp/japanese/) に所属しています。修士課程への入学を希望する方は、[夏季の一般入試](https://www.ist.osaka-u.ac.jp/japanese/admission/) をご検討ください。センシング技術からAI実装・フィールドデプロイメントまで、実世界AI開発の全工程を経験できます。

Highlights:
- 人間行動認識・バイオロギング・屋内測位など実プロジェクトへの参加
- ウェアラブルセンサシステムの開発とAI処理
- 業界パートナー・フィールド研究者との共同研究

備考（info box）: 研究生は原則受け付けておりません。修士課程への入学希望者は夏季の一般受験をご検討ください。

**修士課程 (masters) カード（en）**

Title: Master's Students

> We belong to The University of Osaka's [Graduate School of Information Science and Technology, Multimedia Engineering](https://www.ist.osaka-u.ac.jp/english/). For admission to the Master's program, please consider the [general entrance examination](https://www.ist.osaka-u.ac.jp/english/admission/). You will experience the full cycle of real-world AI development—from sensing to AI implementation to field deployment.

Highlights:
- Active projects in human activity recognition, bio-logging, and indoor positioning
- Wearable sensor systems and edge AI development
- Collaboration with industry partners and field researchers

Note (info box): We do not generally accept research students (kenkyusei). Prospective Master's students should apply through the official entrance examination.

---

**博士後期課程 (phd) カード（ja）**

タイトル: 博士後期課程

> 博士後期課程の学生を積極的に募集しています！新しい研究テーマの開拓と独立した研究推進を目指します。国内外の学会発表、論文投稿、社会への研究成果の発信が中心となります。他大学からの進学も歓迎します。博士課程での入学希望者はフォームよりご連絡ください。

Highlights:
- 新規研究テーマの立案と推進
- 国内外学会での発表・論文投稿
- 業界との共同研究・技術移転プロジェクト

**博士後期課程 (phd) カード（en）**

Title: Ph.D. Students

> We actively recruit doctoral students. The program focuses on opening new research directions and pursuing independent research. You'll present at international conferences, publish in leading journals, and shape the future of real-world AI. We welcome students from other universities and institutions. Please contact us via the form below.

Highlights:
- Identify and lead new research themes
- Present at domestic and international conferences
- Industry collaboration and technology transfer projects

---

**経済的サポート (support) カード（ja）**

タイトル: 経済的サポート（博士後期課程）

> 当研究室では、十分な研究費がある限り、博士後期課程の学生をリサーチアシスタント（RA）として雇用し、経済的なサポートを行っています。修士課程から博士課程への進学を検討している方は、進学相談の際にサポート制度についてお気軽にご質問ください。

Notes:
- ヒューマンウェア系列など関連研究科では、修士課程段階からのサポート制度が利用できる場合があります。
- サポートの可否は研究費の状況等によりますので、詳細は個別にご相談ください。

**経済的サポート (support) カード（en）**

Title: Financial Support (Ph.D.)

> Subject to research funding availability, doctoral students may be employed as Research Assistants (RA) to provide financial support. Students considering the transition from Master's to Ph.D. are encouraged to ask about available support programs during a consultation.

Notes:
- In certain graduate programs (e.g., humanware-related fields), support may be available from the Master's stage onward.
- Availability depends on funding status; details will be discussed individually.

---

**学生募集 FAQ（ja）**

| Q | A |
|---|---|
| 学部生ですが、配属される前に研究室を見学することはできますか？ | はい、可能です。月に一度の説明会（詳細は「見学・訪問」タブ参照）か、フォームからお問い合わせください。 |
| 他大学からの大学院進学は可能ですか？ | もちろん可能です。国内外の大学からの受け入れ実績があります。大阪大学大学院の入試情報をご確認のうえ、ご応募ください。 |
| 研究室のコアタイムはありますか？ | 特別なコアタイムは定めていませんが、セミナーやミーティングで定期的に顔を合わせます。詳細はお問い合わせください。 |
| 博士課程進学時のサポートについて詳しく知りたいです。 | 進学検討時点でご相談ください。進学先研究科の制度を確認した上で、活用可能なサポート制度についてお話しします。 |

**学生募集 FAQ（en）**

| Q | A |
|---|---|
| Can I visit the lab before my assignment or enrollment? | Yes. We hold monthly info sessions (see the "Visiting" tab) or you can reach us directly via the form. |
| Can I apply from outside The University of Osaka? | Definitely. We have a track record of welcoming students from domestic and international institutions. Check The University of Osaka's graduate admissions information. |
| Are there required core hours? | We don't enforce strict core hours, but regular seminars and meetings keep the team connected. Ask us for details. |
| What financial support is available for Ph.D. students? | We discuss support options individually during consultation, depending on research track and funding availability. |

---

### 3.3 研究支援スタッフ (associates) タブ

**イントロ（ja）**
> 実務経験を積みながら研究支援に関わりたい方を募集しています。ソフトウェア開発からデータ収集・フィールド調査まで、多様な役割で参加できます。

**イントロ（en）**
> We welcome motivated individuals eager to build practical experience while supporting cutting-edge research—from software development to data collection and field surveys.

**募集職種（ja）**
- ソフトウェア開発・エッジAI実装
- センサデータ処理、ビデオアノテーション、ラベリング作業
- プロトタイプシステムの開発・テスト
- 実験支援・データ収集・フィールド調査補助

**Roles（en）**
- Software development and edge AI implementation
- Sensor data processing, video annotation, and data labeling
- Prototype system development and testing
- Experimental support, data collection, and field research assistance

CTA（ja）: フォームでお問い合わせ  
CTA（en）: Inquire via Form

---

### 3.4 技術スタッフ (technical) タブ

**イントロ（ja）**
> セッティング・運用・テクニカルサポートを担当するスタッフを募集しています。現在以下のポジションを公募中です。

**イントロ（en）**
> We are seeking technical professionals for system setup, operations, and technical support roles. The following position is currently open.

**ポジション（ja / en 共通データ）**

| フィールド | 日本語 | English |
|-----------|--------|---------|
| タイトル | パートタイム技術補助スタッフ | Part-time Technical Assistants |
| 募集数 | 2〜3名 | 2–3 positions |
| 職務内容 | 生物実験中に収集されたビデオおよびセンサデータのラベリングおよび整理（専門ツールの訓練を提供）| Labeling and organizing video and sensor data collected during biological experiments (training on specialized tools provided) |
| 必要スキル | 基本的なコンピュータスキル（Word、Excel）；生物実験の経験があると望ましい | Basic computer skills (Word and Excel); experience in biological experiments is preferred |
| 勤務条件 | 週3〜5日、1日6時間（スケジュール応相談） | 3–5 days/week, 6 hours/day (flexible) |
| 時給 | 1,203円〜1,387円 | JPY 1,203–1,387/hour |

応募要項リンク（ja）: https://www.osaka-u.ac.jp/ja/guide/employment/part_research/  
Application Guidelines（en）: https://www.osaka-u.ac.jp/en/guide/employment/part_research/

---

### 3.5 見学・訪問 (visiting) タブ

**イントロ（ja）**
> 研究室の研究内容をより詳しく知りたい方、進学前に環境を確認したい方からのご連絡をお待ちしています。月に一度、学生向けの研究室説明会を開催しています。いちょう祭（大阪大学）でも説明会を開催します（申し込み不要）。

**イントロ（en）**
> We warmly welcome those who want to learn more about our research before deciding to join. We hold monthly lab information sessions for prospective students. We also hold a session at Icho-sai (The University of Osaka's open campus festival)—no registration required.

**見学対象者（ja）**
- 大学院進学を検討している学部生：研究内容・指導体制・学生生活についてご説明します
- 他大学からの進学希望者：研究室見学・スタッフとの面談をアレンジします
- 短期学術訪問・共同研究サイト調査の相談もお受けしています

**Visiting Items（en）**
- Undergraduates considering graduate school: we'll explain research directions, mentorship, and student life
- Students from other institutions: we can arrange lab visits and meetings with current members
- Short-term academic visits and collaborative site surveys are also welcome

**申し込み方法（ja）**
> フォームにて「見学希望」の旨をご記入の上、お申し込みください。

**How to Apply（en）**
> Please fill in the form indicating you'd like to visit the lab.

CTA（ja）: 見学を申し込む  
CTA（en）: Apply for a Visit

---

**見学 FAQ（ja）**

| Q | A |
|---|---|
| 説明会は予約が必要ですか？ | 月次の説明会はフォームからの事前申し込みをお願いしています。いちょう祭での説明会は申し込み不要です。 |
| 遠方なのですが、オンラインでの見学は可能ですか？ | はい、オンラインでの対応も可能です。フォームからお申し込みください。 |
| 社会人ですが、聴講や連携の相談は可能ですか？ | はい、お気軽にフォームよりご連絡ください。 |

**Visiting FAQ（en）**

| Q | A |
|---|---|
| Do I need to register for the information session? | Monthly sessions require prior registration via the form. The Icho-sai session is open without registration. |
| Can I attend online if I'm not in Osaka? | Yes, online sessions are available. Please indicate your preference in the form. |
| I'm a working professional—can I inquire about collaboration? | Absolutely. Please reach out via the form. |

---

## 4. `.astro` ページ構成（Hero は現状維持）

### `ja/joinus.astro` after refactoring

```astro
---
import Layout from "../../layouts/Layout.astro";
import { JoinUs } from "../../components/react/JoinUs";
const lang = "ja";
---
<Layout title="採用情報・見学 | Real-world Intelligence Lab" lang={lang}>
  <!-- Hero Section — 現状のまま維持 -->
  <section class="...gradient hero...">
    <h1>実世界を理解するAIへ。</h1>
    <p>...</p>
  </section>

  <!-- React Component: Tabs + Content -->
  <div class="pb-20 max-w-7xl mx-auto px-4 py-16">
    <JoinUs client:only="react" lang="ja" />
  </div>
</Layout>
```

### `en/joinus.astro` after refactoring

```astro
---
import Layout from "../../layouts/Layout.astro";
import { JoinUs } from "../../components/react/JoinUs";
const lang = "en";
---
<Layout title="Join Us | Real-world Intelligence Lab" lang={lang}>
  <!-- Hero Section — 現状のまま維持 -->
  ...
  <div class="pb-20 max-w-7xl mx-auto px-4 py-16">
    <JoinUs client:only="react" lang="en" />
  </div>
</Layout>
```

---

## 5. `JoinUs.tsx` 组件内部架构

```tsx
// === ALL CONTENT DEFINED HERE ===
const CONTENT = {
  ja: {
    tabs: [...],
    students: { intro, seminar, masters, phd, support, faq },
    associates: { intro, roles, ctaLabel },
    technical: { intro, positions, applicationUrl },
    visiting: { intro, items, applyNote, ctaLabel, faq },
  },
  en: { ... }
};

// === REUSABLE RENDER HELPERS ===
const HighlightList = ({ items }) => ...      // bullet list
const InfoCard = ({ title, children }) => ... // rounded card
const FAQAccordion = ({ items }) => ...        // <details> accordion
const CTAButton = ({ href, label }) => ...    // primary button

// === TAB SECTIONS ===
function renderStudents(c, formUrl) { ... }
function renderAssociates(c, formUrl) { ... }
function renderTechnical(c) { ... }
function renderVisiting(c, formUrl) { ... }

// === MAIN COMPONENT ===
export const JoinUs: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState('students');
  const c = CONTENT[lang];
  // Tab nav + content render
};
```

---

## 6. 样式说明 / Styling Notes

- Tab 激活态：`bg-lab-blue text-white border border-lab-blue/30 shadow-lg` （与 PublicationList 的 `bg-lab-accent` 等价，joinus 使用 `lab-blue`）
- Tab 未激活态：`text-gray-400 hover:text-white hover:bg-white/5 border border-transparent`
- FAQ：使用 `<details>/<summary>` + `group-open:rotate-180` chevron（与现状一致）
- 卡片：`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50`

---

## 请确认以下几点 / Confirmation Checklist

1. [ ] Google Form URL `https://forms.gle/eTXeKE44swMK1ZGMA` — 是否用于所有 CTA（学生募集・見学・研究支援スタッフ）？
2. [ ] FAQ：学生募集 FAQ 放在「学生募集」tab 内，見学 FAQ 放在「見学・訪問」tab 内 — 是否认可？
3. [ ] 技術スタッフ：使用现有的 `positions` 数据（2〜3 名，时薪 1,203–1,387 円）— 是否更新？
4. [ ] 见学スケジュール（いちょう祭等）不放具体日期，仅写「月に一度開催・フォームで申込」— 是否认可？
5. [ ] 英語版の FAQ：現状の「研究支援スタッフ」タブには FAQ なし，見学タブに独自 FAQ あり — 是否認可？
6. [ ] `join.json` 保留但不再用于渲染（仅更新 formUrl） — 还是希望继续从 JSON 驱动内容？
