import React from 'react';
import PerComRankingCard from './PerComRankingCard';
import { PERCOM_RANKING } from '../../data/percom_ranking';

interface Props {
  lang: 'ja' | 'en';
}

// ============================================================
// CONTENT — Edit here to update section text (both languages)
// Edit src/data/percom_ranking.ts to update the ranking table.
// ============================================================
const CONTENT = {
  ja: {
    sectionTitle: '当講座の特徴',
    features: [
      {
        title: 'AI・IoTの世界的研究拠点',
        body: '当講座は実世界AI-IoT分野において、世界的にもトップレベルの研究業績を創出しています。研究室内の豊富な研究実績・ノウハウに基づき、修士学生からでもトップ国際会議での口頭発表を多く行っています。',
        bullets: null as string[] | null,
      },
      {
        title: '実世界で役立つ革新的技術の研究開発',
        body: '技術的革新性と実世界での有用性を両立した技術開発を目指し、様々な企業や異分野研究者と共同研究を行なっています。研究成果を活用したスタートアップ設立に向けた活動も積極的に推進しています。',
        bullets: [
          '産業分野における作業効率向上や作業自動化に向けた作業行動認識手法の開発',
          '大規模言語モデルとモビリティデータを活用したマーケティング戦略立案',
          'AIバイオロギングデバイスを用いた動物生態の理解と獣害対策',
          '創薬などへの応用に向けたラボ動物の行動データマイニング研究',
          'などの共同研究を行っています。',
        ] as string[],
      },
    ],
  },
  en: {
    sectionTitle: 'Lab Highlights',
    features: [
      {
        title: 'A World-Class AI & IoT Research Hub',
        body: "Our lab is recognized internationally as a top-tier research group in real-world AI and IoT. Building on our extensive research track record and accumulated knowledge, even master's students frequently deliver oral presentations at leading international conferences.",
        bullets: null as string[] | null,
      },
      {
        title: 'R&D of Innovative Technologies for the Real World',
        body: 'We develop technologies that achieve both technical innovation and real-world utility, conducting joint research with a wide range of companies and researchers from diverse fields. We also actively drive initiatives toward establishing startups that leverage our research outcomes.',
        bullets: [
          'Developing human activity recognition methods for industrial workflow automation and efficiency improvement',
          'Formulating marketing strategies using large language models and mobility data',
          'Understanding animal ecology and mitigating wildlife damage with AI bio-logging devices',
          'Mining behavioral data from laboratory animals for applications in drug discovery',
          'and more collaborative research projects.',
        ] as string[],
      },
    ],
  },
};

export const LabFeatures: React.FC<Props> = ({ lang }) => {
  const c = CONTENT[lang];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-heading font-bold border-l-4 border-lab-accent pl-4 mb-6">
        {c.sectionTitle}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_40%] gap-3">

        {/* Left column: feature cards */}
        <div className="flex flex-col gap-3 h-full">
          {c.features.map((feature, i) => (
            <div key={i} className={`group rounded-lg border border-gray-700/60 bg-gray-900/50 px-4 py-3 ${i === 0 ? '[flex-grow:4]' : '[flex-grow:6]'} transition-all hover:-translate-y-0.5 hover:border-lab-blue/60 hover:bg-gray-800/70`}>
              <h5 className="text-base font-bold text-lab-blue mb-1 uppercase tracking-wide transition-colors group-hover:text-white">{feature.title}</h5>
              <p className="text-base text-gray-400 leading-relaxed">{feature.body}</p>
              {feature.bullets && (
                <ul className="mt-2 space-y-1">
                  {feature.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-2 text-base text-gray-400">
                      <span className="text-lab-blue font-bold shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Right column: PerCom ranking card — h-full resolves correctly in a grid cell */}
        <PerComRankingCard {...PERCOM_RANKING[lang]} />

      </div>
    </section>
  );
};
