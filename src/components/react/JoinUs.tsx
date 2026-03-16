import React, { useState } from 'react';

type TabId = 'students' | 'associates' | 'technical' | 'visiting';
type ContentLang = (typeof CONTENT)['ja'];

interface Props {
  lang: 'en' | 'ja';
}

const FORM_URL = 'https://forms.gle/eTXeKE44swMK1ZGMA';

// ============================================================
// ALL CONTENT — Edit here to update page text (both languages)
// ============================================================
const CONTENT = {
  ja: {
    tabs: [
      { id: 'students' as TabId,   label: '学生募集' },
      { id: 'associates' as TabId, label: '研究者募集' },
      { id: 'technical' as TabId,  label: '技術スタッフ' },
      { id: 'visiting' as TabId,   label: '見学・訪問' },
    ],

    students: {
      title: '学生募集',
      intro:
        '実世界知能基盤講座では、センシング技術と機械学習を融合させ、人間行動認識・バイオロギング・屋内測位・実世界データマイニングの4領域で研究を推進しています。実世界のデータから知識を引き出し、社会に貢献できる研究者・エンジニアを育成しています。',
      masters: {
        title: '学部学生・修士学生',
        description:
          '実世界知能基盤講座は、工学部電子情報工学科情報工学システムコースおよび大学院情報科学研究科マルチメディア工学専攻に属しています。センシング技術からAI実装・フィールドデプロイメントまで、実世界AI開発の全工程を習熟できます。',
        links: [
          { label: '学部生の方へ', url: 'http://school.eei.eng.osaka-u.ac.jp/course/course14' },
          { label: '大学院進学希望の方へ', url: 'https://www.ist.osaka-u.ac.jp/japanese/examinees/admission/' },
        ],
        highlights: [
          '人間行動認識・バイオロギング・屋内測位など実プロジェクトへの参加',
          '業界パートナー・フィールド研究者との共同研究',
          '学部3、4回生からの国内・国際学会発表・表彰実績',
          '研究成果の技術移転・ベンチャービジネス化に向けた事業仮説設定・チームフォーミング・潜在顧客ヒヤリング',
          '事業化予算獲得',
        ],
        note: '当研究室では、研究生は原則受け付けていません。修士課程への入学希望者は夏季の一般受験をご検討ください。',
        ctaLabel: 'フォームで問い合わせる',
      },
      phd: {
        title: '博士学生',
        description:
          '実世界知能基盤講座は、大学院情報科学研究科マルチメディア工学専攻に属しています。国内外から博士後期課程の学生を積極的に募集しています！新しい研究テーマの開拓と独立した研究を推進します。',
        highlights: [
          '新規研究テーマの立案と推進',
          '業界パートナー・フィールド研究者との共同研究',
          '研究成果の技術移転・ベンチャービジネス化に向けた事業仮説設定・チームフォーミング・潜在顧客ヒヤリング・プロトタイピング',
          '研究・事業化予算獲得',
        ],
        ctaLabel: 'フォームで問い合わせる',
      },
      reasons: {
        sectionTitle: '実世界知能基盤講座で学ぶ理由',
        featured: {
          title: 'AI・IoTの世界的研究拠点',
          body: '前川研は、実世界AI-IoT分野における世界的な研究グループであり、学生を主体として世界的にもトップレベルの研究業績を創出しています。研究室内の豊富な研究実績・ノウハウに基づき、修士学生からトップ国際会議での発表を目指すことも可能です。学部3、4回生から学会発表の機会を多く提供しており、学部生からの受賞実績も豊富です。',
          card: {
            title: 'PerCom本会議論文採択数（過去5年）',
            subtitle: 'Core Conference Ranking A*（最高ランク） / IoT分野トップ国際会議',
            caption: '前川研は、PerCom本会議論文採択数において過去5年間（2026年から）で世界トップ水準の実績を有しています。',
            headers: ['順位', '研究グループ', '本数'],
            rows: [
              { cells: ['1', '阪大・前川研', '7'], highlight: true },
              { cells: ['2', 'Singapore Management Univ.グループ', '5'], highlight: false },
              { cells: ['3', 'ケンブリッジ大グループ', '4'], highlight: false },
              { cells: ['3', 'IIT（インド）グループ', '4'], highlight: false },
              { cells: ['5', '中国科技大グループ', '3'], highlight: false },
              { cells: ['6', 'メリーランド大グループ', '2'], highlight: false },
              { cells: ['6', '阪大・他研究室', '2'], highlight: false },
              { cells: ['6', 'ミラノ大グループ', '2'], highlight: false },
              { cells: ['6', '香港科技大グループ', '2'], highlight: false },
            ] as { cells: [string, string, string]; highlight: boolean }[],
          },
        },
        more: [
          {
            title: '実世界で役立つ革新的技術の研究開発',
            body: '技術的革新性と実世界での有用性を両立した技術開発を目指し、様々な企業や異分野研究者と共同研究を行なっています。前川研で開発された技術は、世界中で販売されている著名な製品の製造や、マーケティング戦略の立案に活かされています。',
          },
          {
            title: '激動のAI時代を生き抜く力',
            body: 'AIの劇的な進化により、パソコンの上だけで完結するようなプログラミング・開発はAIに置き換えられることが確実です。実世界で動くデバイスの開発からAI手法の研究までを一貫して行う前川研で、激動のAI時代を生き抜く力を身につけましょう。',
          },
        ],
      },
      support: {
        title: '経済的サポート（修士・博士課程）',
        description:
          '当講座では、博士後期課程進学予定の学生を修士・博士課程を通じてリサーチアシスタント（RA）・アルバイトとして雇用し、経済的なサポートを行っています。',
        // programs: [
        //   {
        //     label: '情報人材育成フェローシップ（Boost学生）',
        //     detail:
        //       '情報科学研究科博士後期課程生を対象。月額16.6万円の研究専念支援金＋研究費年額50万円を支給。競争選考あり。',
        //     url: 'https://www.ist.osaka-u.ac.jp/japanese/students/lecture/fellowship.php',
        //   },
        //   {
        //     label: 'ヒューマンウェアイノベーション学位プログラム（HWIP）',
        //     detail:
        //       '5年一貫プログラムに採択された学生は、修士課程段階から給付奨学金・研究費助成・授業料免除等のサポートを受けられます。',
        //     url: 'https://www.hwip.osaka-u.ac.jp/support/',
        //   },
        //   {
        //     label: '次世代研究者挑戦的研究プログラム（JST）',
        //     detail:
        //       'JSTの公的支援事業。書類・面接審査により採択された博士課程学生に研究奨励費および研究費を支給します。',
        //     url: 'https://itgp.osaka-u.ac.jp/jisedai/',
        //   },
        // ],
        note: 'RAおよびフェローシップは研究費状況・選考結果によります。博士進学をご検討の方は、早めに個別にご相談ください。',
      },
      faq: {
        title: 'よくある質問',
        items: [
          {
            q: '学部生ですが、配属される前に研究室を見学することはできますか？',
            a: 'はい、可能です。月に一度の説明会（詳細は「見学・訪問」タブ参照）か、フォームからお問い合わせください。',
          },
          {
            q: '他大学からの大学院進学は可能ですか？',
            a: 'もちろん可能です。国内外の大学からの受け入れ実績があります。大阪大学大学院の入試情報をご確認のうえ、ご応募ください。',
          },
          {
            q: '研究室のコアタイムはありますか？',
            a: '特別なコアタイムは定めていませんが、セミナーやミーティングで定期的に顔を合わせます。詳細はお問い合わせください。',
          },
          {
            q: '博士課程進学時のサポートについて詳しく知りたいです。',
            a: '進学検討時点でご相談ください。進学先研究科の制度を確認した上で、活用可能なサポート制度についてお話しします。',
          },
        ],
      },
    },

    associates: {
      title: '特任研究員・教員 募集',
      intro:
        '当研究室では、科研費・JST等の競争的外部資金を活用し、特任博士研究員（ポスドク）・特任助教を募集しています。実世界AIセンシング研究の最前線で活躍したい研究者のご応募をお待ちしています。',
      fundingNote:
        '現在募集は行っていません。',
      // positions: [
      //   {
      //     title: '博士研究員（ポスドク）',
      //     badge: '随時募集',
      //     target: '博士号取得者、または着任時までに取得見込みの方',
      //     description:
      //       '実世界センシング・機械学習・IoT・バイオロギング等の研究テーマに関心のある方を募集します。独立した研究推進と国際論文発表を期待します。',
      //     conditionsLabel: '雇用条件',
      //     conditions:
      //       '任期1年（更新可）・大阪大学博士研究員規程に基づく給与（目安：年収300〜450万円程度）',
      //     supportLabel: '支援内容',
      //     support: '研究費・学会発表旅費支援、共同研究推進サポート',
      //   },
      //   {
      //     title: '特任研究員',
      //     badge: 'プロジェクト採用',
      //     target: '博士号取得者で、実世界センシング・AI・組込みシステム等の開発・研究経験を有する方',
      //     description:
      //       'JST・NEDO・科研費等のプロジェクトに従事し、センシングシステムの開発・データ解析・論文執筆を担当します。',
      //     conditionsLabel: '雇用条件',
      //     conditions:
      //       'プロジェクト期間に応じた有期雇用（通常1〜3年）・大阪大学特任教員規程に基づく給与',
      //     supportLabel: '支援内容',
      //     support: '研究費・旅費支援、学会発表・論文投稿サポート',
      //   },
      //   {
      //     title: '特任助教',
      //     badge: '要相談',
      //     target: '博士号取得後、独立した研究推進・学生指導に意欲のある方',
      //     description:
      //       '研究室の主要プロジェクトを牽引しながら、大学院生の研究指導と共同研究の推進を担います。将来的なテニュアポスト取得を目指す方を歓迎します。',
      //     conditionsLabel: '雇用条件',
      //     conditions:
      //       '任期1年（更新可）・大阪大学特任教員規程に基づく給与（目安：年収400〜550万円程度）',
      //     supportLabel: '支援内容',
      //     support: '独立研究費・旅費支援、学生指導補助、共同研究機会の提供',
      //   },
      // ],
      ctaLabel: 'フォームでお問い合わせ',
    },

    technical: {
      title: '技術スタッフ',
      intro: 'セッティング・運用・テクニカルサポートを担当するスタッフを募集しています。現在以下のポジションを公募中です。',
      positions: [
        {
          title: 'パートタイム技術補助スタッフ',
          openings: '2〜3名',
          responsibilitiesLabel: '職務内容',
          responsibilities:
            '生物実験中に収集されたビデオおよびセンサデータのラベリングおよび整理。（当研究室の専門ツールについて、訓練が提供されます）',
          requirementsLabel: '必要スキル',
          requirements: '基本的なコンピュータスキル（Word、Excel）；生物実験の経験があると望ましいです。',
          scheduleLabel: '勤務条件',
          schedule: '週3〜5日、1日6時間（スケジュールは柔軟に対応可能）',
          wageLabel: '時給',
          wage: '時給 1,203円〜1,387円',
          applicationUrl: 'https://www.osaka-u.ac.jp/ja/guide/employment/part_research/',
          applicationLabel: '応募要項を確認',
        },
      ],
    },

    visiting: {
      title: '見学・訪問',
      intro:
        '研究室の研究内容をより詳しく知りたい方、進学前に環境を確認したい方からのご連絡をお待ちしています。月に一度、学生向けの研究室説明会を開催しています。',
      scheduleTitle: '毎月の学生向け研究室説明会',
      scheduleNote: '現在調整中',
      // schedule: [
      //   { date: '4/21 (Tue.)',  time: '11:00−', note: '' },
      //   { date: 'いちょう祭',   time: '',       note: '申し込み不要', url: 'https://icho.daigakusai.osaka-u.ac.jp' },
      //   { date: '5/19 (Mon.)',  time: '16:00−', note: '' },
      //   { date: '6/16 (Tue.)', time: '11:00−', note: '' },
      //   { date: '7/14 (Mon.)', time: '14:00−', note: '' },
      //   { date: '8/19 (Tue.)', time: '11:00−', note: '' },
      // ],
      itemsTitle: '見学対象者',
      items: [
        '大学院進学を検討している学部生：研究内容・指導体制・学生生活についてご説明します',
        '他大学からの進学希望者：研究室見学・スタッフとの面談をアレンジします',
        '短期学術訪問・共同研究サイト調査の相談もお受けしています',
      ],
      applyNote: 'フォームにて「見学希望」の旨をご記入の上、お申し込みください。',
      ctaLabel: '見学を申し込む',
      faq: {
        title: 'よくある質問',
        items: [
          {
            q: '説明会は予約が必要ですか？',
            a: '月次の説明会はフォームからの事前申し込みをお願いしています。いちょう祭での説明会は申し込み不要です。',
          },
          {
            q: '遠方なのですが、オンラインでの見学は可能ですか？',
            a: 'はい、オンラインでの対応も可能です。フォームからお申し込みください。',
          },
          {
            q: '社会人ですが、聴講や連携の相談は可能ですか？',
            a: 'はい、お気軽にフォームよりご連絡ください。',
          },
        ],
      },
    },
  },

  en: {
    // ── Direct translation of the Japanese content above ──────────────────
    tabs: [
      { id: 'students' as TabId,   label: 'Student Recruitment' },
      { id: 'associates' as TabId, label: 'Researcher Recruitment' },
      { id: 'technical' as TabId,  label: 'Technical Staff' },
      { id: 'visiting' as TabId,   label: 'Lab Visit / Visiting' },
    ],

    students: {
      title: 'Student Recruitment',
      intro:
        'At Real-world Intelligence Lab, we advance research across four areas—human activity recognition, bio-logging, indoor positioning, and real-world data mining—by fusing sensing technology and machine learning. We foster researchers and engineers who extract knowledge from real-world data and contribute to society.',
      masters: {
        title: "Undergraduate & Master's Students",
        description:
          "Real-world Intelligence Lab belongs to the Department of Information Engineering Systems, School of Electronic and Information Engineering, as well as the Multimedia Engineering program in the Graduate School of Information Science and Technology at The University of Osaka. You will gain hands-on experience across the full cycle of real-world AI development—from sensing to AI implementation and field deployment.",
        links: [
          { label: 'For Undergraduates',              url: 'http://school.eei.eng.osaka-u.ac.jp/course/course14' },
          { label: 'For Prospective Graduate Students', url: 'https://www.ist.osaka-u.ac.jp/english/examinees/admission/' },
        ],
        highlights: [
          'Participation in active projects including human activity recognition, bio-logging, and indoor positioning',
          'Joint research with industry partners and field researchers',
          'Track record of conference presentations and awards from 3rd/4th-year undergraduates, both domestically and internationally',
          'Business hypothesis setting, team formation, and customer interviews toward technology transfer and venture business development',
          'Securing commercialization funding',
        ],
        note: 'We do not generally accept non-degree research students (kenkyusei). Prospective Master\'s students should apply through the official summer entrance examination.',
        ctaLabel: 'Contact Us via Form',
      },
      phd: {
        title: 'Doctoral Students',
        description:
          'Real-world Intelligence Lab belongs to the Multimedia Engineering program in the Graduate School of Information Science and Technology at The University of Osaka. We actively recruit doctoral students from both Japan and abroad! You will pioneer new research themes and pursue independent research.',
        highlights: [
          'Proposing and leading new research themes',
          'Joint research with industry partners and field researchers',
          'Business hypothesis setting, team formation, customer interviews, and prototyping toward technology transfer and venture business development',
          'Securing research and commercialization funding',
        ],
        ctaLabel: 'Contact Us via Form',
      },
      reasons: {
        sectionTitle: 'Why Study at Real-world Intelligence Lab',
        featured: {
          title: 'A World-Class AI & IoT Research Group',
          body: 'Real-world Intelligence Lab is a world-class research group in the field of real-world AI-IoT, producing top-tier research results globally with students at the center. Based on the lab\'s rich research track record and accumulated know-how, even Master\'s students can aim to present at top international conferences. We provide ample conference presentation opportunities from the 3rd and 4th undergraduate years, and have a strong track record of award-winning undergraduates.',
          card: {
            title: 'PerCom Full Paper Acceptances (Past 5 Years)',
            subtitle: 'Core Conference Ranking A*（top conference） / Top International IoT Conference',
            caption: 'Real-world Intelligence Lab ranks #1 worldwide in PerCom full paper acceptances over the past five years (starting from 2026).',
            headers: ['Rank', 'Research Group', '#'],
            rows: [
              { cells: ['1', 'Osaka U — Real-world Intelligence Lab', '7'], highlight: true },
              { cells: ['2', 'Singapore Management Univ. Group', '5'], highlight: false },
              { cells: ['3', 'Univ. of Cambridge Group', '4'], highlight: false },
              { cells: ['3', 'IIT (India) Group', '4'], highlight: false },
              { cells: ['5', 'USTC Group', '3'], highlight: false },
              { cells: ['6', 'Univ. of Maryland Group', '2'], highlight: false },
              { cells: ['6', 'Other Labs in Osaka U', '2'], highlight: false },
              { cells: ['6', 'Univ. of Milan Group', '2'], highlight: false },
              { cells: ['6', 'HKUST Group', '2'], highlight: false },
            ] as { cells: [string, string, string]; highlight: boolean }[],
          },
        },
        more: [
          {
            title: 'R&D of Impactful Real-World Technologies',
            body: 'We collaborate with a wide range of companies and interdisciplinary researchers to develop technologies that are both technically innovative and practically useful. Technologies from Maekawa Lab have been applied to the manufacturing of globally sold products and to marketing strategy formulation.',
          },
          {
            title: 'Skills to Thrive in the Era of AI Disruption',
            body: 'With the dramatic advances in AI, programming and development that can be completed entirely on a PC will certainly be replaced by AI. At Maekawa Lab—where we handle everything from developing real-world devices to researching AI methods—you will build the skills to thrive in this turbulent AI era.',
          },
        ],
      },
      support: {
        title: "Financial Support (Master's & Doctoral Program)",
        description:
          // 'Our lab employs doctoral students as Research Assistants (RA), subject to available funding. We also make active use of the following public support programs at The University of Osaka.',
          'Our lab employs students planning to pursue doctoral studies as Research Assistants (RAs) or part-time workers throughout their master\'s and doctoral programs, providing them with financial support.',
          // programs: [
        //   {
        //     label: 'IST Fellowship (Boost Student)',
        //     detail:
        //       'For IST doctoral students: monthly stipend of ¥166,000 + annual research budget of ¥500,000. Competitive selection required.',
        //     url: 'https://www.ist.osaka-u.ac.jp/japanese/students/lecture/fellowship.php',
        //   },
        //   {
        //     label: 'Humanware Innovation Degree Program (HWIP)',
        //     detail:
        //       "Students enrolled in this 5-year integrated program may receive scholarship grants, research funding, and tuition waiver from the Master's stage onward.",
        //     url: 'https://www.hwip.osaka-u.ac.jp/support/',
        //   },
        //   {
        //     label: 'Next-Generation Researcher Program (JST)',
        //     detail:
        //       'A JST-funded program providing research grants and stipends to selected doctoral students through a competitive screening process.',
        //     url: 'https://itgp.osaka-u.ac.jp/jisedai/',
        //   },
        // ],
        note: 'RA employment and fellowship availability depend on funding conditions and selection results. If you are considering advancing to the doctoral program, please contact us early.',
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Can I visit the lab before being assigned to it (as an undergraduate)?',
            a: 'Yes, you can. Please check our monthly info sessions (see the "Lab Visit" tab) or contact us via the form.',
          },
          {
            q: 'Can students from other universities apply for the graduate program?',
            a: "Absolutely. We have a record of accepting students from universities both in Japan and abroad. Please check The University of Osaka's graduate admissions information and apply.",
          },
          {
            q: 'Are there core hours in the lab?',
            a: 'We do not have fixed core hours, but we meet regularly for seminars and meetings. Please contact us for more details.',
          },
          {
            q: 'I would like to know more about support when entering the doctoral program.',
            a: 'Please consult with us when you start considering advancement. We will explain available support options after reviewing the systems of the relevant graduate department.',
          },
        ],
      },
    },

    associates: {
      title: 'Researcher / Specially Appointed Faculty Recruitment',
      intro:
        'Our lab recruits Specially Appointed Postdoctoral Researchers and Specially Appointed Assistant Professors, funded through competitive external grants such as KAKENHI and JST. We welcome applications from researchers who wish to work at the forefront of real-world AI sensing research.',
      fundingNote:
        'We are not currently recruiting.',
      // positions: [
      //   {
      //     title: 'Postdoctoral Researcher',
      //     badge: 'Open',
      //     target: 'Applicants who hold a doctoral degree, or who are expected to obtain one by the start date',
      //     description:
      //       'We seek candidates interested in real-world sensing, machine learning, IoT, and bio-logging. Independent research and international publication are expected.',
      //     conditionsLabel: 'Employment Conditions',
      //     conditions:
      //       '1-year contract (renewable); salary based on The University of Osaka Postdoctoral Researcher regulations (approx. JPY 3–4.5M/year)',
      //     supportLabel: 'Support',
      //     support: 'Research budget and conference travel funding; collaborative research support',
      //   },
      //   {
      //     title: 'Specially Appointed Researcher',
      //     badge: 'Project-based',
      //     target: 'Doctoral degree holders with experience in real-world sensing, AI, or embedded systems R&D',
      //     description:
      //       'You will work on JST, NEDO, KAKENHI, or other funded projects, contributing to sensing system development, data analysis, and paper writing.',
      //     conditionsLabel: 'Employment Conditions',
      //     conditions:
      //       'Fixed-term contract aligned with project duration (typically 1–3 years); salary based on The University of Osaka Specially Appointed Faculty regulations',
      //     supportLabel: 'Support',
      //     support: 'Research budget and travel funding; support for conference presentations and paper submissions',
      //   },
      //   {
      //     title: 'Specially Appointed Assistant Professor',
      //     badge: 'By Consultation',
      //     target: 'Doctoral degree holders motivated to pursue independent research and supervise graduate students',
      //     description:
      //       'You will lead key lab projects while supervising graduate students and advancing collaborations. Candidates aiming for a future tenure-track position are especially welcome.',
      //     conditionsLabel: 'Employment Conditions',
      //     conditions:
      //       '1-year contract (renewable); salary based on The University of Osaka Specially Appointed Faculty regulations (approx. JPY 4–5.5M/year)',
      //     supportLabel: 'Support',
      //     support: 'Independent research budget, travel funding, student supervision support, and collaborative research opportunities',
      //   },
      // ],
      ctaLabel: 'Contact Us via Form',
    },

    technical: {
      title: 'Technical Staff',
      intro:
        'We are recruiting staff to handle setup, operations, and technical support. The following positions are currently open.',
      positions: [
        {
          title: 'Part-time Technical Support Staff',
          openings: '2–3 positions',
          responsibilitiesLabel: 'Responsibilities',
          responsibilities:
            "Labeling and organizing video and sensor data collected during biological experiments. (Training on the lab's specialized tools will be provided.)",
          requirementsLabel: 'Required Skills',
          requirements: 'Basic computer skills (Word, Excel); experience with biological experiments is a plus.',
          scheduleLabel: 'Working Conditions',
          schedule: '3–5 days/week, 6 hours/day (flexible schedule available)',
          wageLabel: 'Hourly Wage',
          wage: 'JPY 1,203–1,387/hour',
          applicationUrl: 'https://www.osaka-u.ac.jp/en/guide/employment/part_research/',
          applicationLabel: 'View Application Guidelines',
        },
      ],
    },

    visiting: {
      title: 'Lab Visit / Visiting',
      intro:
        'We welcome inquiries from those who wish to learn more about our research or check the environment before applying. We hold monthly lab information sessions for prospective students.',
      scheduleTitle: 'Monthly Lab Info Sessions for Prospective Students',
      scheduleNote: 'Currently being arranged',
      // schedule: [
      //   { date: 'Apr. 21 (Tue.)',  time: '11:00−', note: '' },
      //   { date: 'Icho-sai',        time: '',       note: 'No registration required', url: 'https://icho.daigakusai.osaka-u.ac.jp' },
      //   { date: 'May 19 (Mon.)',   time: '16:00−', note: '' },
      //   { date: 'Jun. 16 (Tue.)',  time: '11:00−', note: '' },
      //   { date: 'Jul. 14 (Mon.)',  time: '14:00−', note: '' },
      //   { date: 'Aug. 19 (Tue.)', time: '11:00−', note: '' },
      // ],
      itemsTitle: 'Who Should Visit',
      items: [
        'Undergraduates considering graduate school: we will explain research content, supervision structure, and student life',
        'Students from other universities: we can arrange a lab tour and meetings with staff',
        'We also accept inquiries regarding short-term academic visits and joint research site surveys',
      ],
      applyNote: 'Please fill in the form indicating that you wish to visit the lab.',
      ctaLabel: 'Apply for a Lab Visit',
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Do I need to register for the information session?',
            a: 'Monthly sessions require prior registration via the form. No registration is needed for the Icho-sai session.',
          },
          {
            q: 'I live far away—is an online visit possible?',
            a: 'Yes, online sessions are also available. Please apply via the form.',
          },
          {
            q: 'I am a working professional. Can I inquire about attending sessions or potential collaboration?',
            a: 'Yes, please feel free to contact us via the form.',
          },
        ],
      },
    },
  },
};

// ============================================================
// REUSABLE HELPERS
// ============================================================

const CTAButton: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-lab-blue hover:bg-lab-blue/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
  >
    {label}
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  </a>
);

const HighlightList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 text-gray-400">
        <span className="text-lab-blue font-bold shrink-0">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const FAQAccordion: React.FC<{ title: string; items: { q: string; a: string }[] }> = ({ title, items }) => (
  <div className="mt-16">
    <h3 className="text-2xl font-bold mb-8 text-white">{title}</h3>
    <div className="space-y-4">
      {items.map((item, i) => (
        <details
          key={i}
          className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors"
        >
          <summary className="flex items-center justify-between cursor-pointer p-6 font-medium text-white hover:text-lab-blue transition-colors">
            <span className="text-base font-bold pr-4">{item.q}</span>
            <svg
              className="w-5 h-5 text-lab-blue transition-transform group-open:rotate-180 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-gray-700/30 pt-4">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  </div>
);

// ============================================================
// TAB SECTION RENDERERS
// ============================================================

function renderStudents(c: ContentLang, formUrl: string) {
  const s = c.students;
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-bold mb-6 text-white">{s.title}</h2>
        <p className="text-lg text-gray-400 leading-relaxed">{s.intro}</p>
      </div>

      {/* Why Study Here */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-white border-l-4 border-lab-blue pl-4">{s.reasons.sectionTitle}</h3>

        {/* Left + right columns, no outer wrapper */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3">

          {/* Left column: 3 equal mini-cards */}
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            {[
              { title: s.reasons.featured.title, body: s.reasons.featured.body },
              ...s.reasons.more,
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-gray-700/60 bg-gray-900/50 px-4 py-3">
                <h5 className="text-sm font-bold text-lab-blue mb-1 uppercase tracking-wide">{item.title}</h5>
                <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Right column: ranking card */}
          <div className="lg:w-[38%] shrink-0 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/50 flex flex-col">
            <div className="text-base text-white font-bold mb-1 whitespace-nowrap">{s.reasons.featured.card.title}</div>
            <div className="text-xs text-lab-blue mb-4 font-medium">{s.reasons.featured.card.subtitle}</div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  {s.reasons.featured.card.headers.map((h, i) => (
                    <th
                      key={i}
                      className={`pb-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide ${
                        i === 0 ? 'w-8 text-center' : i === 2 ? 'w-8 text-right' : 'text-left'
                      }`}
                    >{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.reasons.featured.card.rows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-800/50 ${
                      row.highlight ? 'bg-lab-blue/10' : 'hover:bg-white/[0.02]'
                    } transition-colors`}
                  >
                    <td className={`py-1.5 text-center text-xs tabular-nums ${
                      row.highlight ? 'text-lab-blue font-bold' : 'text-gray-500'
                    }`}>{row.cells[0]}</td>
                    <td className={`py-1.5 pl-1 text-xs leading-snug ${
                      row.highlight ? 'text-white font-semibold' : 'text-gray-400'
                    }`}>{row.cells[1]}</td>
                    <td className={`py-1.5 text-right text-xs tabular-nums ${
                      row.highlight ? 'text-white font-bold' : 'text-gray-400'
                    }`}>{row.cells[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">{s.reasons.featured.card.caption}</p>
          </div>

        </div>
      </div>

      {/* Financial Support — shown first */}
      <div className="bg-gradient-to-br from-cyan-900/20 to-lab-blue/10 rounded-xl p-8 border border-lab-blue/30">
        <h3 className="text-2xl font-bold text-lab-blue mb-4">{s.support.title}</h3>
        <p className="text-gray-300 leading-relaxed mb-6">{s.support.description}</p>
        {/* programs list — temporarily hidden
        <div className="space-y-4 mb-4">
          {s.support.programs.map((prog, i) => (
            <div key={i} className="flex flex-col gap-1">
              <a
                href={prog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lab-blue font-semibold text-sm hover:underline underline-offset-2"
              >
                {prog.label} →
              </a>
              <p className="text-gray-400 text-sm leading-relaxed">{prog.detail}</p>
            </div>
          ))}
        </div>
        */}
        {s.support.note && (
          <p className="text-gray-500 text-xs leading-relaxed border-t border-gray-700/50 pt-4">{s.support.note}</p>
        )}
      </div>

      {/* Master's */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50">
        <h3 className="text-2xl font-bold text-lab-blue mb-4">{s.masters.title}</h3>
        <p className="text-gray-300 leading-relaxed mb-6">{s.masters.description}</p>
        <div className="mb-6">
          <HighlightList items={s.masters.highlights} />
        </div>
        {s.masters.note && (
          <p className="text-sm text-amber-400/80 bg-amber-400/5 border border-amber-400/20 rounded-lg px-4 py-3 mb-6">
            ⚠ {s.masters.note}
          </p>
        )}
        {s.masters.links?.[0] && (
          <CTAButton href={s.masters.links[0].url} label={s.masters.links[0].label} />
        )}
        {s.masters.links?.[1] && (
          <CTAButton href={s.masters.links[1].url} label={s.masters.links[1].label} />
        )}
      </div>

      {/* PhD */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50">
        <h3 className="text-2xl font-bold text-lab-blue mb-4">{s.phd.title}</h3>
        <p className="text-gray-300 leading-relaxed mb-6">{s.phd.description}</p>
        <div className="mb-6">
          <HighlightList items={s.phd.highlights} />
        </div>
        {s.masters.links?.[1] && (
          <CTAButton href={s.masters.links[1].url} label={s.masters.links[1].label} />
        )}
      </div>

      <FAQAccordion title={s.faq.title} items={s.faq.items} />
    </div>
  );
}

function renderAssociates(c: ContentLang, formUrl: string) {
  const a = c.associates;
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-6 text-white">{a.title}</h2>
        <p className="text-lg text-gray-400 leading-relaxed">{a.intro}</p>
      </div>

      {/* Funding note */}
      <div className="bg-gradient-to-br from-lab-blue/10 to-cyan-900/20 rounded-xl px-6 py-4 border border-lab-blue/30">
        <p className="text-gray-300 text-sm leading-relaxed">{a.fundingNote}</p>
      </div>

      {/* Position cards — temporarily hidden */}
      {/* {a.positions.map((pos, i) => (
        <div
          key={i}
          className="border-l-4 border-lab-blue p-6 bg-gray-50/5 border border-gray-700/30 rounded-r-lg hover:bg-gray-800/20 transition-colors"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
            <h3 className="text-xl font-bold text-white">{pos.title}</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-lab-blue/10 text-lab-blue border border-lab-blue/20 shrink-0">
              {pos.badge}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-4">{pos.target}</p>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">{pos.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-lab-blue mb-1">{pos.conditionsLabel}</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{pos.conditions}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-lab-blue mb-1">{pos.supportLabel}</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{pos.support}</p>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
}

function renderTechnical(c: ContentLang) {
  const t = c.technical;
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-6 text-white">{t.title}</h2>
        <p className="text-lg text-gray-400 leading-relaxed">{t.intro}</p>
      </div>

      {t.positions.map((pos, i) => (
        <div
          key={i}
          className="border-l-4 border-lab-blue p-6 bg-gray-50/5 border border-gray-700/30 rounded-r-lg hover:bg-gray-800/20 transition-colors"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
            <h3 className="text-xl font-bold text-white">{pos.title}</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-lab-blue/10 text-lab-blue border border-lab-blue/20 shrink-0">
              {pos.openings}
            </span>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h4 className="text-sm font-semibold text-lab-blue mb-1">{pos.responsibilitiesLabel}</h4>
              <p className="text-sm leading-relaxed text-justify">{pos.responsibilities}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-lab-blue mb-1">{pos.requirementsLabel}</h4>
              <p className="text-sm leading-relaxed text-justify">{pos.requirements}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-lab-blue mb-1">{pos.scheduleLabel}</h4>
                <p className="text-sm">{pos.schedule}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-lab-blue mb-1">{pos.wageLabel}</h4>
                <p className="text-sm">{pos.wage}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <a
              href={pos.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lab-blue hover:text-lab-blue/80 bg-lab-blue/5 hover:bg-lab-blue/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {pos.applicationLabel}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function renderVisiting(c: ContentLang, formUrl: string) {
  const v = c.visiting;
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-6 text-white">{v.title}</h2>
        <p className="text-lg text-gray-400 leading-relaxed">{v.intro}</p>
      </div>

      {/* Schedule */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-white">{v.scheduleTitle}</h3>
          <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium border border-yellow-500/20">
            {v.scheduleNote}
          </span>
        </div>
      </div>

      {/* Who should visit */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-6">{v.itemsTitle}</h3>
        <ul className="space-y-4">
          {v.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-300 leading-relaxed">
              <span className="text-lab-blue font-bold text-lg shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-br from-cyan-900/20 to-lab-blue/10 rounded-xl p-8 border border-lab-blue/30 flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-semibold text-white">{v.applyNote}</p>
        <CTAButton href={formUrl} label={v.ctaLabel} />
      </div>

      <FAQAccordion title={v.faq.title} items={v.faq.items} />
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export const JoinUs: React.FC<Props> = ({ lang }) => {
  const validTabs: TabId[] = ['students', 'associates', 'technical', 'visiting'];

  const getInitialTab = (): TabId => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as TabId;
      if (validTabs.includes(hash)) return hash;
    }
    return 'students';
  };

  const [activeTab, setActiveTab] = useState<TabId>(getInitialTab);
  const c = CONTENT[lang];

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tab}`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'students':   return renderStudents(c, FORM_URL);
      case 'associates': return renderAssociates(c, FORM_URL);
      case 'technical':  return renderTechnical(c);
      case 'visiting':   return renderVisiting(c, FORM_URL);
    }
  };

  return (
    <div>
      {/* Tab Navigation — same style as PublicationList */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 mb-12">
        {c.tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-medium transition-all relative top-[1px] ${
                isActive
                  ? 'bg-lab-accent text-white border border-lab-accent/30 shadow-lg shadow-lab-accent/10 relative z-10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[50vh]">
        {renderContent()}
      </div>
    </div>
  );
};
