import React, { useState } from 'react';
import { Menu, X, Home, Search, BookOpen, Users, Newspaper, MapPin } from 'lucide-react';

const iconMap = {
    Home,
    Search,
    BookOpen,
    Users,
    Newspaper,
    MapPin
};

interface NavItem {
    label: string;
    href: string;
    icon?: string;
}

interface Props {
    navItems: NavItem[];
    lang: string;
    currentPath: string;
}

export const Navigation: React.FC<Props> = ({ navItems, lang, currentPath }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (href: string) => {
        // Remove trailing slash for consistent comparison
        const normalizedPath = currentPath.endsWith('/') && currentPath.length > 1 
            ? currentPath.slice(0, -1) 
            : currentPath;
        const normalizedHref = href.endsWith('/') && href.length > 1 
            ? href.slice(0, -1) 
            : href;

        if (normalizedHref === `/${lang}`) {
            return normalizedPath === normalizedHref;
        }
        return normalizedPath.startsWith(normalizedHref);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
                <ul className="flex space-x-8">
                    {navItems.map(item => {
                        const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null;
                        const active = isActive(item.href);
                        return (
                            <li key={item.href}>
                                <a 
                                    href={item.href} 
                                    className={`flex items-center text-sm font-medium transition-colors ${
                                        active ? 'text-lab-accent' : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    {Icon && <Icon className="w-4 h-4 mr-2" />}
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
                <a href={lang === 'ja' ? '/en' : '/ja'} className="text-xs font-mono border border-white/20 px-2 py-1 rounded hover:bg-white/10 transition-colors text-white">
                    {lang === 'ja' ? 'EN' : 'JP'}
                </a>
                <button 
                    onClick={toggleMenu}
                    className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Desktop Language Switcher (kept outside of mobile menu for desktop layout consistency in parent) */}
            <div className="hidden md:flex items-center space-x-4">
                <a href={lang === 'ja' ? '/en' : '/ja'} className="text-xs font-mono border border-white/20 px-2 py-1 rounded hover:bg-white/10 transition-colors text-white">
                    {lang === 'ja' ? 'EN' : 'JP'}
                </a>
            </div>

            {/* Mobile Navigation Overlay */}
            {isOpen && (
                <div className="fixed left-0 right-0 top-16 bottom-0 h-[calc(100vh-4rem)] z-40 bg-lab-bg/95 backdrop-blur-lg border-t border-white/10 md:hidden flex flex-col p-6 animate-in slide-in-from-top-5 duration-200 overflow-y-auto">
                    <ul className="flex flex-col space-y-6">
                        {navItems.map(item => {
                            const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null;
                            const active = isActive(item.href);
                            return (
                                <li key={item.href}>
                                    <a 
                                        href={item.href} 
                                        className={`flex items-center text-lg font-medium block py-2 border-b border-white/5 transition-colors ${
                                            active ? 'text-lab-accent' : 'text-white hover:text-lab-accent'
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {Icon && <Icon className="w-5 h-5 mr-3" />}
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};
