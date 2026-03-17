// Shared PerCom ranking card data — used on both the JoinUs page and the top page 当講座の特徴 section.
// Edit this file to update the ranking table in both places at once.

export interface RankingRow {
  cells: [string, string, string];
  highlight: boolean;
}

export interface RankingCardData {
  title: string;
  subtitle: string;
  caption: string;
  headers: [string, string, string];
  rows: RankingRow[];
}

export const PERCOM_RANKING: Record<'ja' | 'en', RankingCardData> = {
  ja: {
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
    ],
  },
  en: {
    title: 'PerCom Full Paper Acceptances (Past 5 Years)',
    subtitle: 'CORE Conference Ranking: A* / A leading international conference in IoT',
    caption: 'Real-world Intelligence Lab ranks #1 worldwide in PerCom full paper acceptances over the past five years, as of 2026.',
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
    ],
  },
};
