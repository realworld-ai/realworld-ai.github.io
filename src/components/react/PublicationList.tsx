import React, { useState, useMemo, useEffect } from 'react';
import type { Publication } from '../../utils/bibtex';
import { PublicationItem } from './PublicationItem';

interface Props {
    publications: Publication[];
    lang: 'en' | 'ja';
}

export const PublicationList: React.FC<Props> = ({ publications, lang }) => {
    // Debug log to console
    useEffect(() => {
        console.log(`[PublicationList] Loaded ${publications?.length} items`, publications);
    }, [publications]);

    const [search, setSearch] = useState('');

    if (!publications) {
        console.error('[PublicationList] Error: publications prop is undefined or null');
        return <div className="text-red-500 py-8">Error loading data. Please check console.</div>;
    }


    const filteredPubs = useMemo(() => {
        if (!search) return publications;
        const lowerSearch = search.toLowerCase();
        return publications.filter(pub => 
            (pub.title || '').toLowerCase().includes(lowerSearch) ||
            (pub.authors || '').toLowerCase().includes(lowerSearch) ||
            (pub.journal || '').toLowerCase().includes(lowerSearch) ||
            (pub.year || '').toString().includes(lowerSearch)
        );
    }, [publications, search]);

    // Grouping logic (replicated from Astro)
    const pubsByYear = useMemo(() => {
        return filteredPubs.reduce((acc, pub) => {
            const year = pub.year;
            if (!acc[year]) acc[year] = [];
            acc[year].push(pub);
            return acc;
        }, {} as Record<number, Publication[]>);
    }, [filteredPubs]);

    const sortedYears = useMemo(() => Object.keys(pubsByYear).map(Number).sort((a, b) => b - a), [pubsByYear]);

    const labels = {
        en: {
            international: 'International',
            journals: 'Journals',
            conferences: 'Conferences',
            other: 'Other',
            domestic: 'Domestic',
            searchPlaceholder: 'Search by title, author, venue...'
        },
        ja: {
            international: '国際発表',
            journals: '学術論文',
            conferences: '国際会議',
            other: 'その他',
            domestic: '国内発表',
            searchPlaceholder: 'タイトル、著者、会議名などで検索...'
        }
    };
    
    const t = labels[lang];

    if (!publications || publications.length === 0) {
        return <div className="text-center text-gray-400 py-12">Loading publications... (or no data found)</div>;
    }

    return (
        <div className="space-y-8">
            {/* Search Input */}
            <div className="max-w-2xl mx-auto mb-12 px-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg leading-5 bg-gray-900/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-lab-accent focus:ring-1 focus:ring-lab-accent sm:text-sm transition-colors"
                        placeholder={t.searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex justify-between items-center mt-2 px-1">
                    <p className="text-gray-500 text-xs">
                        {lang === 'en' 
                            ? 'Filter by Author, Conference, Title...' 
                            : '著者名、会議名、タイトルなどで絞り込み'}
                    </p>
                    <p className="text-gray-500 text-xs">
                        {filteredPubs.length} / {publications.length}
                    </p>
                </div>
            </div>

            <div className="space-y-16">
                {sortedYears.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        {lang === 'en' ? 'No publications found matching' : '一致する論文が見つかりません'} "{search}"
                    </div>
                )}
                
                {sortedYears.map(year => {
                    const yearPubs = pubsByYear[year];
                    const international = yearPubs.filter(p => p.category === 'International');
                    const domestic = yearPubs.filter(p => p.category === 'Domestic');
                    
                    const intJournals = international.filter(p => p.subCategory === 'Journal');
                    const intConfs = international.filter(p => p.subCategory === 'Conference');
                    const intOthers = international.filter(p => p.subCategory !== 'Journal' && p.subCategory !== 'Conference');

                    return (
                    <section key={year}>
                        <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-2 flex items-center">
                            <span className="text-lab-accent mr-3">#</span> {year}
                        </h2>
                        
                        <div className="space-y-10 pl-4 lg:pl-8">
                            {/* International Section */}
                            {(international.length > 0) && (
                                <div className="space-y-8">
                                    <h3 className="text-xl font-bold text-white/90 uppercase tracking-wider">{t.international}</h3>
                                    
                                    {/* International Journals */}
                                    {intJournals.length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-semibold text-lab-accent">{t.journals}</h4>
                                            <div className="space-y-2">
                                                {intJournals.map(pub => (
                                                    <PublicationItem key={pub.id} pub={pub} />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* International Conferences */}
                                    {intConfs.length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-semibold text-lab-accent">{t.conferences}</h4>
                                            <div className="space-y-2">
                                                {intConfs.map(pub => (
                                                    <PublicationItem key={pub.id} pub={pub} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* International Others */}
                                    {intOthers.length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-semibold text-lab-accent">{t.other}</h4>
                                            <div className="space-y-2">
                                                {intOthers.map(pub => (
                                                    <PublicationItem key={pub.id} pub={pub} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Domestic Section */}
                            {domestic.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-white/90 uppercase tracking-wider pt-4">{t.domestic}</h3>
                                    <div className="space-y-2">
                                        {domestic.map(pub => (
                                            <PublicationItem key={pub.id} pub={pub} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )})}
            </div>
        </div>
    );
};
