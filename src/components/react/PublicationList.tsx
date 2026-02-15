import React, { useState, useMemo, useEffect } from 'react';
import type { Publication } from '../../utils/bibtex';
import { PublicationItem } from './PublicationItem';

interface Props {
    publications: Publication[];
    lang: 'en' | 'ja';
}

type FilterType = 'venue' | 'author';

export const PublicationList: React.FC<Props> = ({ publications, lang }) => {
    useEffect(() => {
        console.log(`[PublicationList] Loaded ${publications?.length} items`, publications);
    }, [publications]);

    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState<{ type: FilterType, value: string } | null>(null);
    const [activeTab, setActiveTab] = useState<FilterType>('venue');
    const [showAllAuthors, setShowAllAuthors] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    if (!publications) {
        console.error('[PublicationList] Error: publications prop is undefined or null');
        return <div className="text-red-500 py-8">Error loading data. Please check console.</div>;
    }

    // Normalization Functions
    const normalizeVenue = (venue: string) => {
        if (!venue) return 'Unknown';
        let v = venue.trim();
        
        // Extract acronym in parens if present at end or implies conference acronym
        const parenMatch = v.match(/\(([^)]+)\)$/);
        if (parenMatch && parenMatch[1].length < 20) {
            // e.g. (PerCom 2024) -> PerCom
            return parenMatch[1].replace(/\d{4}/g, '').trim(); 
        }

        // Common cleanups
        v = v
            .replace(/^Proc\. of\s+/i, '')
            .replace(/^the\s+/i, '')
            .replace(/\d{4}/g, '') // Remove years
            .replace(/International Conference on/i, 'Int. Conf. on')
            .replace(/Symposium on/i, 'Symp. on')
            .replace(/IEEE/g, '')
            .replace(/ACM/g, '')
            .trim();
        
        // Remove trailing comma or dot
        v = v.replace(/[.,]+$/, '');
        
        return v || 'Unknown';
    };

    const normalizeAuthor = (author: string) => {
        return author.trim().replace(/\*/g, ''); // Remove corresponding author asterisk
    };

    // Extract Data for Index
    const indexData = useMemo(() => {
        const venues: Record<string, number> = {};
        const authors: Record<string, number> = {};

        publications.forEach(pub => {
            // Venue
            if (pub.journal) {
                const v = normalizeVenue(pub.journal);
                venues[v] = (venues[v] || 0) + 1;
            }

            // Authors
            if (pub.authors) {
                pub.authors.split(',').forEach(a => {
                    const auth = normalizeAuthor(a);
                    if (auth) {
                        authors[auth] = (authors[auth] || 0) + 1;
                    }
                });
            }
        });

        const sortedVenues = Object.entries(venues).sort((a, b) => b[1] - a[1]);
        const sortedAuthors = Object.entries(authors).sort((a, b) => b[1] - a[1]);

        return { venues: sortedVenues, authors: sortedAuthors };
    }, [publications]);

    // Filtering
    const filteredPubs = useMemo(() => {
        let result = publications;

        // 1. Text Search
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(pub => 
                (pub.title || '').toLowerCase().includes(lowerSearch) ||
                (pub.authors || '').toLowerCase().includes(lowerSearch) ||
                (pub.journal || '').toLowerCase().includes(lowerSearch) ||
                (pub.year || '').toString().includes(lowerSearch)
            );
        }

        // 2. Sidebar Filter
        if (activeFilter) {
            if (activeFilter.type === 'venue') {
                result = result.filter(pub => pub.journal && normalizeVenue(pub.journal) === activeFilter.value);
            } else if (activeFilter.type === 'author') {
                result = result.filter(pub => pub.authors && pub.authors.split(',').map(normalizeAuthor).includes(activeFilter.value));
            }
        }

        return result;
    }, [publications, search, activeFilter]);

    // Grouping
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
            searchPlaceholder: 'Search by title, author, venue...',
            byVenue: 'By Venue',
            byAuthor: 'By Author',
            clearFilter: 'Clear Filter',
            showAllAuthors: 'Show all authors',
            filter: 'Filter',
            toggleFilters: 'Toggle Filters'
        },
        ja: {
            international: '国際発表',
            journals: '学術論文',
            conferences: '国際会議',
            other: 'その他',
            domestic: '国内発表',
            searchPlaceholder: 'タイトル、著者、会議名などで検索...',
            byVenue: '会議・雑誌別',
            byAuthor: '著者別',
            clearFilter: '絞り込み解除',
            showAllAuthors: '全ての著者を表示',
            filter: 'フィルター',
            toggleFilters: 'フィルター表示切替'
        }
    };
    
    const t = labels[lang];

    if (!publications || publications.length === 0) {
        return <div className="text-center text-gray-400 py-12">Loading publications... (or no data found)</div>;
    }

    const AuthorsList = () => {
        // Option A: >= 2 by default
        const threshold = 2;
        const visibleAuthors = showAllAuthors ? indexData.authors : indexData.authors.filter(([_, count]) => count >= threshold);
        
        return (
            <div className="space-y-1">
                {visibleAuthors.map(([name, count]) => (
                    <button
                        key={name}
                        onClick={() => setActiveFilter({ type: 'author', value: name })}
                        className={`w-full text-left text-sm py-1 px-2 rounded flex justify-between group ${
                            activeFilter?.type === 'author' && activeFilter.value === name
                                ? 'bg-lab-accent/20 text-lab-accent'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        <span className="truncate pr-2">{name}</span>
                        <span className="text-xs bg-white/10 px-1.5 rounded-full h-5 flex items-center">{count}</span>
                    </button>
                ))}
                {!showAllAuthors && indexData.authors.length > visibleAuthors.length && (
                    <button 
                        onClick={() => setShowAllAuthors(true)}
                        className="text-xs text-lab-accent hover:underline mt-2 pl-2"
                    >
                        {t.showAllAuthors} ({indexData.authors.length - visibleAuthors.length} more)
                    </button>
                )}
            </div>
        );
    };

    const VenuesList = () => (
        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
            {indexData.venues.map(([name, count]) => (
                <button
                    key={name}
                    onClick={() => setActiveFilter({ type: 'venue', value: name })}
                    className={`w-full text-left text-sm py-1 px-2 rounded flex justify-between group ${
                        activeFilter?.type === 'venue' && activeFilter.value === name
                            ? 'bg-lab-accent/20 text-lab-accent'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                    <span className="truncate pr-2" title={name}>{name}</span>
                    <span className="text-xs bg-white/10 px-1.5 rounded-full h-5 flex items-center">{count}</span>
                </button>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-8 relative items-start">
             {/* Sidebar - Desktop Sticky / Mobile Collapsible */}
             <div className={`w-full lg:w-1/4 lg:sticky lg:top-4 bg-gray-900/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm transition-all z-10 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                 {/* Mobile Close Button */}
                 <div className="lg:hidden flex justify-end mb-2">
                     <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-400">&times;</button>
                 </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10 mb-4">
                    <button
                        onClick={() => setActiveTab('venue')}
                        className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'venue' ? 'border-lab-accent text-lab-accent' : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        {t.byVenue}
                    </button>
                    <button
                        onClick={() => setActiveTab('author')}
                        className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'author' ? 'border-lab-accent text-lab-accent' : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        {t.byAuthor}
                    </button>
                </div>

                {/* Filter List */}
                {activeTab === 'venue' ? <VenuesList /> : <AuthorsList />}

                {/* Active Filter Indication / Clear */}
                {activeFilter && (
                    <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="text-xs text-gray-500 mb-2">{t.filter}:</div>
                        <div className="bg-lab-accent/10 border border-lab-accent/30 rounded px-2 py-1 text-sm text-lab-accent flex justify-between items-center mb-2">
                            <span className="truncate">{activeFilter.value}</span>
                            <button onClick={() => setActiveFilter(null)} className="hover:text-white ml-2">&times;</button>
                        </div>
                        <button 
                            onClick={() => setActiveFilter(null)}
                            className="w-full text-center text-xs text-gray-400 hover:text-white hover:underline"
                        >
                            {t.clearFilter}
                        </button>
                    </div>
                )}
             </div>

             {/* Mobile Filter Toggle */}
             <div className="lg:hidden w-full mb-4">
                 <button 
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="w-full py-2 bg-gray-800 rounded border border-white/10 text-gray-300 flex justify-center items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                    {t.toggleFilters} {activeFilter ? '(1)' : ''}
                 </button>
             </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4 space-y-8">
                {/* Search Input */}
                <div>
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
                           {/* Hint */}
                        </p>
                        <p className="text-gray-500 text-xs">
                            {filteredPubs.length} / {publications.length}
                        </p>
                    </div>
                </div>

                <div className="space-y-16">
                    {sortedYears.length === 0 && (
                        <div className="text-center text-gray-500 py-12">
                            {lang === 'en' ? 'No publications found matching criteria' : '条件に一致する論文が見つかりません'}
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
        </div>
    );
};

