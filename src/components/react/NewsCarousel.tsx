import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Award, Activity, Calendar, ArrowRight, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';

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
    slug?: string;
}

interface Props {
    items: NewsItem[];
    lang: 'en' | 'ja';
}

export const NewsCarousel: React.FC<Props> = ({ items, lang }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ delay: 5000, stopOnInteraction: true })
    ]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString(lang === 'en' ? 'en-US' : 'ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="relative group">
            <div className="overflow-hidden -mx-4" ref={emblaRef}>
                <div className="flex">
                    {items.map((item) => {
                        const slug = item.slug ?? item.id;
                        return (
                            <div className="flex-[0_0_90%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_33.33%] min-w-0 pl-4 py-4" key={item.id}>
                                <a href={`/${lang}/news/${slug}`} className="block bg-lab-card rounded-xl overflow-hidden h-full group/card border border-white/10 hover:border-lab-accent transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                                    <div className="aspect-video bg-gray-800 overflow-hidden">
                                        {item.data.coverImage ? (
                                            <img src={item.data.coverImage} alt={item.data.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <time className="text-xs text-gray-500 mb-2 block">{formatDate(item.data.date)}</time>
                                        <h3 className="text-base font-bold text-white group-hover/card:text-lab-accent transition-colors mb-2 line-clamp-2 leading-snug flex-grow">{item.data.title}</h3>
                                        
                                        {item.data.type === 'award' && item.data.members && (
                                            <div className="flex items-center gap-2 text-sm text-yellow-300 mt-2">
                                                <Trophy className="w-4 h-4 flex-shrink-0" />
                                                <span className="truncate">{item.data.members.join(', ')}</span>
                                            </div>
                                        )}

                                        {item.data.type === 'activity' && item.data.summary && (
                                            <p className="text-sm text-gray-400 line-clamp-2 mt-2">{item.data.summary}</p>
                                        )}
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900/60 hover:bg-lab-accent text-white p-2 rounded-full backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all z-10 disabled:opacity-50"
                onClick={scrollPrev}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900/60 hover:bg-lab-accent text-white p-2 rounded-full backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all z-10 disabled:opacity-50"
                onClick={scrollNext}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};
