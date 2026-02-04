import type { Publication } from '../../utils/bibtex';
import React from 'react';

interface Props {
    pub: Publication;
}

export const PublicationItem: React.FC<Props> = ({ pub }) => {
    return (
        <div className="py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg px-4 -mx-4">
            <div className="text-gray-300 leading-relaxed text-sm lg:text-base">
                <span className="font-medium text-white">{pub.authors}</span>: 
                <span>{pub.title}</span>, 
                <span className="italic">{pub.journal}</span>
                {pub.volume && <span>, {pub.volume}</span>}
                {pub.issue && <span>{pub.issue}</span>}
                {pub.pages && <span>, {pub.pages}</span>} 
                <span> {pub.dateDisplay}.</span>
                
                {(pub.doi || pub.url) && (
                    <span className="inline-flex gap-2 ml-2">
                        {pub.doi && (
                            <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-xs text-lab-accent hover:text-white border border-lab-accent/50 hover:border-white px-1.5 rounded transition-colors">
                                DOI
                            </a>
                        )}
                        {pub.url && (!pub.doi || !pub.url.includes(pub.doi)) && !pub.url.includes('doi.org') && (
                            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-xs text-lab-accent hover:text-white border border-lab-accent/50 hover:border-white px-1.5 rounded transition-colors">
                                URL
                            </a>
                        )}
                    </span>
                )}
            </div>
        </div>
    );
};
