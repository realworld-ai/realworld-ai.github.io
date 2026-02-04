import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
}

interface Props {
    navItems: NavItem[];
    lang: string;
}

export const Navigation: React.FC<Props> = ({ navItems, lang }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
                <ul className="flex space-x-8">
                    {navItems.map(item => (
                        <li key={item.href}>
                            <a href={item.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                {item.label}
                            </a>
                        </li>
                    ))}
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
                <div className="fixed inset-0 top-16 z-40 bg-lab-bg/95 backdrop-blur-lg border-t border-white/10 md:hidden flex flex-col p-6 animate-in slide-in-from-top-5 duration-200">
                    <ul className="flex flex-col space-y-6">
                        {navItems.map(item => (
                            <li key={item.href}>
                                <a 
                                    href={item.href} 
                                    className="text-lg font-medium text-white block py-2 border-b border-white/5 hover:text-lab-accent transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};
