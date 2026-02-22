import React, { useState, useMemo } from 'react';
import { PublicationItem } from './PublicationItem';
import { BookOpen, Award, Newspaper, Mic2, Search, Filter, Star } from 'lucide-react';

// Import data directly
import membersData from '../../data/members.json';
import publicationsData from '../../data/publications.json';
import awardsData from '../../data/awards.json';
import mediaData from '../../data/media_coverage.json';
import presentationsData from '../../data/presentations.json';

// Types based on data structure
interface Member {
    id: string;
    name_ja: string;
    name_en: string;
    role_ja: string;
    role_en: string;
    image: string;
}

interface Publication {
    id: string;
    type: string;
    category: string; // 'International' | 'Domestic'
    subCategory: string; // 'Journal' | 'Conference' | 'Other'
    title: string;
    authors: string;
    journal: string;
    volume?: string;
    issue?: string;
    pages?: string;
    dateDisplay: string;
    year: number;
    doi?: string;
    url?: string;
    publication_date?: string;
    major_achievement?: boolean;
}

interface Award {
    id: string;
    award_name: string;
    award_title: string;
    winners: string | { name: string }[]; // Can be string or array based on fetch script
    association: string;
    award_date: string; // YYYY-MM
    major_achievement?: boolean;
}

interface MediaCoverage {
    id: string;
    media_coverage_title: string;
    event: string;
    publication_date: string; // YYYY-MM
    media_coverage_type: string;
    major_achievement?: boolean;
}

interface Presentation {
    id: string;
    presentation_title: string;
    presenters: string;
    event: string;
    publication_date: string; // YYYY-MM-DD
    presentation_type: string;
    major_achievement?: boolean;
}

interface Props {
    lang: 'en' | 'ja';
}

type Tab = 'selected' | 'all' | 'awards_selected' | 'awards_all' | 'media' | 'presentations_invited' | 'presentations_all';
type MemberFilter = string | null; // member ID

export const PublicationList: React.FC<Props> = ({ lang }) => {
    const [activeTab, setActiveTab] = useState<Tab>('selected');
    const [selectedMemberId, setSelectedMemberId] = useState<MemberFilter>(null);
    const [search, setSearch] = useState('');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Filter Logic
    const selectedMember = useMemo(() => 
        membersData.find(m => m.id === selectedMemberId), 
    [selectedMemberId]);

    const filterItemByMember = (item: any, type: Tab) => {
        if (!selectedMember) return true;
        
        const names = [selectedMember.name_en.toLowerCase(), selectedMember.name_ja.toLowerCase()];
        const check = (text: string) => {
            if (!text) return false;
            const t = text.toLowerCase();
            return names.some(n => t.includes(n));
        };

        if (type.startsWith('all') || type.startsWith('selected')) { // Publication
            return check(item.authors);
        } else if (type.startsWith('awards')) {
            // winners can be string or array
            if (Array.isArray(item.winners)) {
                return item.winners.some((w: any) => check(w.name || w));
            }
            return check(item.winners);
        } else if (type === 'media') {
            return check(item.media_coverage_title) || check(item.event);
        } else if (type.startsWith('presentations')) {
            return check(item.presenters);
        }
        return true;
    };

    const filterItemBySearch = (item: any, type: Tab) => {
        if (!search) return true;
        const s = search.toLowerCase();
        
        if (type.startsWith('all') || type.startsWith('selected')) {
            return (item.title || '').toLowerCase().includes(s) || 
                   (item.authors || '').toLowerCase().includes(s) || 
                   (item.journal || '').toLowerCase().includes(s);
        } else if (type.startsWith('awards')) {
            return (item.award_title || '').toLowerCase().includes(s) || 
                   (item.award_name || '').toLowerCase().includes(s) ||
                   (item.association || '').toLowerCase().includes(s);
        } else if (type === 'media') {
            return (item.media_coverage_title || '').toLowerCase().includes(s) || 
                   (item.event || '').toLowerCase().includes(s);
        } else if (type.startsWith('presentations')) {
            return (item.presentation_title || '').toLowerCase().includes(s) ||
                   (item.event || '').toLowerCase().includes(s);
        }
        return true;
    };

    // Filtered Lists
    // Sort by Date Descending
    const filteredData = useMemo(() => {
        let data: any[] = [];
        if (activeTab === 'selected') {
            data = publicationsData.filter((item: any) => item.major_achievement === true);
        } else if (activeTab === 'all') {
            data = publicationsData;
        } else if (activeTab === 'awards_selected') {
            data = awardsData.filter((item: any) => item.major_achievement === true);
        } else if (activeTab === 'awards_all') {
             data = awardsData;
        } else if (activeTab === 'media') {
             data = mediaData;
        } else if (activeTab === 'presentations_invited') {
             data = presentationsData.filter((item: any) => 
                 item.presentation_type === 'keynote_oral_presentation' || 
                 item.presentation_type === 'invited_oral_presentation'
             );
        } else if (activeTab === 'presentations_all') {
             data = presentationsData;
        }

        return data.filter(item => filterItemByMember(item, activeTab) && filterItemBySearch(item, activeTab));
    }, [activeTab, selectedMember, search]);

    // Grouping by Year
    const dataByYear = useMemo(() => {
        const grouped: Record<string, any[]> = {};
        filteredData.forEach(item => {
            // date field varies: publication_date, award_date. 
            // Publications has 'year' number. Others use date string.
            let year = '';
            if (activeTab.startsWith('all') || activeTab.startsWith('selected')) {
                year = item.year.toString();
            } else if (activeTab.startsWith('awards')) {
                year = (item.award_date || '').split('-')[0];
            } else {
                year = (item.publication_date || '').split('-')[0];
            }
            
            if (!year) year = 'Others';
            if (!grouped[year]) grouped[year] = [];
            grouped[year].push(item);
        });
        return grouped;
    }, [filteredData, activeTab]);

    const sortedYears = Object.keys(dataByYear).sort((a, b) => Number(b) - Number(a));

    const labels = {
        en: {
            pageTitle: 'Publications',
            selected: 'Selected Papers',
            all: 'All Papers',
            awards_selected: 'Selected Awards',
            awards_all: 'All Awards',
            media: 'Media',
            presentations_invited: 'Invited Talks',
            presentations_all: 'All Talks',
            searchPlaceholder: 'Search...',
            filterByMember: 'Filter by Member',
            clearFilter: 'Clear Filter',
            toggleFilters: 'Toggle Filters'
        },
        ja: {
            pageTitle: '業績リスト',
            selected: '主要論文',
            all: '全論文',
            awards_selected: '主要受賞',
            awards_all: '全受賞',
            media: '報道',
            presentations_invited: '招待講演',
            presentations_all: '全講演',
            searchPlaceholder: '検索...',
            filterByMember: 'メンバーで絞り込み',
            clearFilter: '絞り込み解除',
            toggleFilters: 'フィルター表示切替'
        }
    };
    
    const t = labels[lang];

    const tabs: { id: Tab; label: string; icon: any }[] = [
        { id: 'selected', label: t.selected, icon: Star },
        { id: 'all', label: t.all, icon: BookOpen },
        { id: 'awards_selected', label: t.awards_selected, icon: Award },
        { id: 'awards_all', label: t.awards_all, icon: Award },
        { id: 'media', label: t.media, icon: Newspaper },
        { id: 'presentations_invited', label: t.presentations_invited, icon: Mic2 },
        { id: 'presentations_all', label: t.presentations_all, icon: Mic2 },
    ];

    // --- Renderers ---

    const renderAward = (award: Award) => {
        const winnersStr = Array.isArray(award.winners) 
            ? award.winners.map((w: any) => w.name || w).join(', ') 
            : award.winners;
        return (
            <div key={award.id} className="py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg px-4 -mx-4">
                <div className="text-gray-300 leading-relaxed text-sm lg:text-base">
                    <span className="font-bold text-white">{award.award_name}</span>. 
                    <span className="block italic text-gray-400 mt-1">{award.award_title}</span>
                    <div className="text-sm mt-1">
                        <span className="text-gray-400">{winnersStr}</span>
                        <span className="text-gray-500 mx-2">|</span>
                        <span className="text-lab-accent">{award.association}</span>
                        <span className="text-gray-500 ml-2">({award.award_date})</span>
                    </div>
                </div>
            </div>
        );
    };

    const mediaTypeMap: Record<'en' | 'ja', Record<string, string>> = {
        en: {
            paper: "Newspaper, magazine",
            internet: "Internet", 
            media_report: "TV or radio program"
        },
        ja: {
            paper: "新聞・雑誌",
            internet: "インターネットメディア",
            media_report: "テレビ・ラジオ番組"
        }
    };

    const renderMedia = (media: MediaCoverage) => (
        <div key={media.id} className="py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg px-4 -mx-4">
            <div className="text-gray-300 leading-relaxed text-sm lg:text-base">
                <span className="font-bold text-white max-w-3xl block">{media.media_coverage_title}</span>
                <div className="text-sm mt-1 text-gray-500 flex items-center gap-2">
                    {media.publication_date}
                    {media.event && <span className="">{media.event}</span>}
                    {media.media_coverage_type && (
                         <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                            {mediaTypeMap[lang][media.media_coverage_type] || media.media_coverage_type}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    const renderPresentation = (pres: Presentation) => (
        <div key={pres.id} className="py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg px-4 -mx-4">
            <div className="text-gray-300 leading-relaxed text-sm lg:text-base">
                <span className="font-bold text-white max-w-3xl block">{pres.presentation_title}</span>
                <span className="block text-gray-400 text-sm mt-1">{pres.presenters}</span>
                <div className="text-sm mt-1 flex items-center gap-2">
                    <span className="italic text-lab-accent">{pres.event}</span>
                    <span className="text-gray-500">({pres.publication_date})</span>
                    {pres.presentation_type && <span className="px-1.5 py-0.5 rounded bg-white/10 text-xs text-gray-400">{pres.presentation_type}</span>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-[50vh]">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">{t.pageTitle}</h1>
                
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-white/10">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-medium transition-all relative top-[1px] ${
                                    isActive
                                        ? 'bg-lab-accent text-white border border-lab-accent/30 shadow-lg shadow-accent/10 relative z-10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                            >
                                {tab.icon && (
                                    <tab.icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-gray-500 group-hover:text-white'}`} />
                                )}
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 relative items-start">
             {/* Sidebar - Members */}
             <div className={`w-full lg:w-1/4 lg:sticky lg:top-8 bg-gray-900/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm transition-all z-10 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                 <div className="lg:hidden flex justify-end mb-2">
                     <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-400">&times;</button>
                 </div>
                 
                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">{t.filterByMember}</h3>
                 
                 <div className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                     <button
                        onClick={() => setSelectedMemberId(null)}
                        className={`w-full text-left text-sm py-2 px-3 rounded transition-colors ${
                            selectedMemberId === null 
                                ? 'bg-lab-accent text-white font-bold shadow-lg shadow-lab-accent/20' 
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                     >
                        All Members
                     </button>
                     {membersData.map(member => (
                         <button
                            key={member.id}
                            onClick={() => setSelectedMemberId(member.id)}
                            className={`w-full text-left text-sm py-2 px-3 rounded transition-colors flex items-center gap-3 ${
                                selectedMemberId === member.id
                                    ? 'bg-lab-accent/20 text-lab-accent border border-lab-accent/30'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                            }`}
                         >
                             <span className="truncate">{lang === 'en' ? member.name_en : member.name_ja}</span>
                         </button>
                     ))}
                 </div>
             </div>

             {/* Mobile Filter Toggle */}
             <div className="lg:hidden w-full mb-4">
                 <button 
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="w-full py-2 bg-gray-800 rounded border border-white/10 text-gray-300 flex justify-center items-center gap-2"
                >
                    <Filter className="w-4 h-4" />
                    {t.toggleFilters} {selectedMember ? '(1)' : ''}
                </button>
             </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4 space-y-6">
                
                {/* Search */}
                <div className="">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-9 pr-3 py-2 border border-white/10 rounded-lg leading-5 bg-gray-900/50 text-gray-300 placeholder-gray-600 focus:outline-none focus:bg-gray-900 focus:border-lab-accent text-sm transition-colors"
                            placeholder={t.searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Counter */}
                <div className="flex justify-between items-center text-xs text-gray-500 px-2 border-b border-white/5 pb-2">
                    <span>
                        {selectedMember ? (lang === 'en' ? `Showing results for: ${selectedMember.name_en}` : `${selectedMember.name_ja} の業績を表示中`) : ''}
                    </span>
                    <span>{filteredData.length} items found</span>
                </div>

                {/* List */}
                <div className="space-y-12">
                     {sortedYears.length === 0 && (
                        <div className="text-center text-gray-500 py-12 bg-gray-900/20 rounded-xl border border-white/5 border-dashed">
                            {lang === 'en' ? 'No items found matching criteria' : '条件に一致する項目が見つかりません'}
                        </div>
                    )}

                    {sortedYears.map(year => (
                        <section key={year} className="relative">
                            <div className="flex items-center gap-4 mb-8 mt-12 first:mt-0">
                                <h2 className="text-3xl font-bold text-white/60 font-mono">{year}</h2>
                                <div className="h-px bg-white/10 flex-grow"></div>
                            </div>
                            
                            <div className="pl-2 lg:pl-4 space-y-1">
                                {dataByYear[year].map(item => {
                                    if (activeTab.startsWith('all') || activeTab.startsWith('selected')) return <PublicationItem key={item.id} pub={item as any} />;
                                    if (activeTab.startsWith('awards')) return renderAward(item as Award);
                                    if (activeTab === 'media') return renderMedia(item as MediaCoverage);
                                    if (activeTab.startsWith('presentations')) return renderPresentation(item as Presentation);
                                    return null;
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
          </div>
        </div>
    );
};

