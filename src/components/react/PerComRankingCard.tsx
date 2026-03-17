import React from 'react';
import type { RankingCardData } from '../../data/percom_ranking';

/**
 * Reusable PerCom ranking table card.
 * Used on both the JoinUs page (reasons section) and the top page (当講座の特徴 section).
 * Data is sourced from src/data/percom_ranking.ts.
 */
const PerComRankingCard: React.FC<RankingCardData> = ({ title, subtitle, caption, headers, rows }) => (
  <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/50 flex flex-col h-full">
    <div className="text-base text-white font-bold mb-1">{title}</div>
    <div className="text-xs text-lab-blue mb-4 font-medium">{subtitle}</div>
    <div className="flex-1 flex flex-col">
      <table className="w-full border-collapse h-full">
        <thead>
          <tr className="border-b border-gray-700">
            {headers.map((h, i) => (
              <th
                key={i}
                className={`py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide ${
                  i === 0 ? 'w-8 text-center' : i === 2 ? 'w-8 text-right' : 'text-left'
                }`}
              >{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-gray-800/50 ${
                row.highlight ? 'bg-lab-blue/10' : 'hover:bg-white/[0.02]'
              } transition-colors`}
            >
              <td className={`py-2.5 text-center text-xs tabular-nums ${
                row.highlight ? 'text-lab-blue font-bold' : 'text-gray-500'
              }`}>{row.cells[0]}</td>
              <td className={`py-2.5 pl-1 text-xs leading-snug ${
                row.highlight ? 'text-white font-semibold' : 'text-gray-400'
              }`}>{row.cells[1]}</td>
              <td className={`py-2.5 text-right text-xs tabular-nums ${
                row.highlight ? 'text-white font-bold' : 'text-gray-400'
              }`}>{row.cells[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-xs text-gray-500 mt-auto pt-4 leading-relaxed">{caption}</p>
  </div>
);

export default PerComRankingCard;
