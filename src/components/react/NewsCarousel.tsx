import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Award, Activity, Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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

export const NewsCarousel: React.FC<Props> = ({ items, lang }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ delay: 5000, stopOnInteraction: false })
    ]);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString(lang === 'en' ? 'en-US' : 'ja-JP', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="relative group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y gap-6 -ml-6 py-4">
                    {items.map((item) => {
                        const slug = (item as any).slug ?? item.id;
                        return (
                        <div className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-6" key={item.id}>
                            <div className="bg-lab-card rounded-2xl p-6 border border-white/5 hover:border-lab-accent/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-lab-accent/10 flex flex-col h-full h-[320px]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg ${
                                        item.data.type === 'award' 
                                            ? 'bg-yellow-500/10 text-yellow-400' 
                                            : 'bg-blue-500/10 text-blue-400'
                                    }`}>
                                        {item.data.type === 'award' ? <Award className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${
                                            item.data.type === 'award' ? 'text-yellow-400' : 'text-blue-400'
                                        }`}>
                                            {item.data.type}
                                        </span>
                                        <time className="text-xs font-mono text-gray-400">
                                            {formatDate(item.data.date)}
                                        </time>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-white mb-3 line-clamp-3 leading-snug">
                                    {item.data.title}
                                </h3>
                                
                                {item.data.summary && (
                                    <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-grow">
                                        {item.data.summary}
                                    </p>
                                )}
                                
                                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-end">
                                    <a href={`/${lang}/news/${slug}`} className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-wider font-medium flex items-center group/link">
                                        Read Details <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-lab-accent text-white p-2 rounded-full backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all z-10 disabled:opacity-0"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-lab-accent text-white p-2 rounded-full backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all z-10 disabled:opacity-0"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};
