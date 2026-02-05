import React, { useState, useMemo } from 'react';
import { Calendar, Award, Activity, Link as LinkIcon, Users } from 'lucide-react';

interface NewsItemData {
    title: string;
    date: string | Date;
    type: string;
    members?: string[];
    summary?: string;
    links?: { label: string; url: string }[];
    coverImage?: string;
}

interface NewsItem {
    id: string;
    data: NewsItemData;
    body?: string;
}

interface Props {
    items: NewsItem[];
    lang: 'en' | 'ja';
}

export const NewsList: React.FC<Props> = ({ items, lang }) => {
    const [filter, setFilter] = useState<'all' | 'award' | 'activity'>('all');

    const filteredItems = useMemo(() => {
        if (filter === 'all') return items;
        return items.filter(item => item.data.type === filter);
    }, [items, filter]);

    // Group by year
    const itemsByYear = useMemo(() => {
        const groups: Record<string, NewsItem[]> = {};
        filteredItems.forEach(item => {
            const date = new Date(item.data.date);
            const year = date.getFullYear().toString();
            if (!groups[year]) groups[year] = [];
            groups[year].push(item);
        });
        return groups;
    }, [filteredItems]);

    const sortedYears = Object.keys(itemsByYear).sort((a, b) => Number(b) - Number(a));

    const labels = {
        en: {
            all: 'All',
            award: 'Awards',
            activity: 'Activities',
            readMore: 'Read more'
        },
        ja: {
            all: 'すべて',
            award: '受賞',
            activity: '活動',
            readMore: '詳細を見る'
        }
    };

    const t = labels[lang];

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString(lang === 'en' ? 'en-US' : 'ja-JP', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="flex justify-center space-x-2 mb-12">
                {(['all', 'award', 'activity'] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                            filter === type 
                                ? 'bg-lab-accent text-white shadow-lg shadow-lab-accent/25' 
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {type === 'all' ? t.all : type === 'award' ? t.award : t.activity}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-12">
                {sortedYears.map(year => (
                    <div key={year} className="relative">
                        <div className="sticky top-24 z-10 mb-6">
                            <span className="text-4xl font-bold text-white/10 select-none backdrop-blur-sm">{year}</span>
                        </div>
                        
                        <div className="space-y-6 relative z-20 pl-4 lg:pl-8 border-l border-white/10 ml-4">
                            {itemsByYear[year].map(item => {
                                const slug = (item as any).slug ?? item.id;
                                return (
                                    <article key={item.id} className="group relative bg-gray-900/40 border border-white/5 rounded-xl p-6 hover:border-lab-accent/30 transition-all hover:bg-gray-900/60">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                                                    <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                        item.data.type === 'award' 
                                                            ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' 
                                                            : 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                                                    }`}>
                                                        {item.data.type === 'award' ? <Award className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                                                        <span className="capitalize">{item.data.type}</span>
                                                    </div>
                                                    <time className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {formatDate(item.data.date)}
                                                    </time>
                                                </div>

                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lab-accent transition-colors">
                                                    <a href={`/${lang}/news/${slug}`} className="inline-block">
                                                        {item.data.title}
                                                    </a>
                                                </h3>

                                                {item.data.summary && (
                                                    <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                                                        {item.data.summary}
                                                    </p>
                                                )}

                                                <div className="space-y-2">
                                                    {item.data.members && item.data.members.length > 0 && (
                                                        <div className="flex items-start gap-2 text-sm text-gray-500">
                                                            <Users className="w-4 h-4 mt-0.5 shrink-0" />
                                                            <span>{item.data.members.join(', ')}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {item.data.links && item.data.links.length > 0 && (
                                                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/5">
                                                            {item.data.links.map((link, i) => (
                                                                <a 
                                                                    key={i}
                                                                    href={link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-1.5 text-xs text-lab-accent hover:text-white transition-colors hover:underline"
                                                                >
                                                                    <LinkIcon className="w-3 h-3" />
                                                                    {link.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
