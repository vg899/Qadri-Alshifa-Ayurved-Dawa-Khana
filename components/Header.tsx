'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { BUSINESS_INFO } from '@/data/businessInfo';
import {
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  Lock,
  Phone,
  MessageCircle,
  Leaf,
  Globe
} from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onNavigateSection }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { totalItems, totalPrice, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#063323]/95 backdrop-blur-md border-b border-[#1b4b35] shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#dfb86c] to-[#99732b] p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#042419] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#dfb86c] stroke-[2.2]" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-[#f9df9c] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#fbf7ee] group-hover:text-[#dfb86c] transition-colors leading-tight font-serif">
                {language === 'hi' ? 'क़ादरी अलशिफ़ा' : 'QADRI ALSHIFA'}
              </span>
              <span className="text-[11px] sm:text-xs text-[#d3c2a6] font-medium tracking-wider uppercase">
                {language === 'hi' ? 'आयुर्वेद दवाखाना' : 'Ayurved Dawa Khana'}
              </span>
              <span className="text-[10px] text-[#9eb6a9] font-normal leading-none mt-0.5">
                {language === 'hi' ? 'बेचुआ, श्रावस्ती (उ.प्र.)' : 'Bechuwa, Shrawasti (U.P.)'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#e3dad0]">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-[#dfb86c] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#dfb86c]"
            >
              {t('home')}
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="hover:text-[#dfb86c] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#dfb86c]"
            >
              {t('products')}
            </button>
            <button
              onClick={() => handleNavClick('consultation')}
              className="hover:text-[#dfb86c] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#dfb86c]"
            >
              {t('consultation')}
            </button>
            <button
              onClick={() => handleNavClick('why-us')}
              className="hover:text-[#dfb86c] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#dfb86c]"
            >
              {language === 'hi' ? 'विशेषताएं' : 'Why Us'}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-[#dfb86c] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#dfb86c]"
            >
              {t('aboutUs')}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#dfb86c] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#dfb86c]"
            >
              {t('contact')}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Quick Link */}
            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b5e3a] hover:bg-[#23784b] text-[#f2faf5] text-xs font-semibold border border-[#348e5b] shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#22c55e] text-[#1b5e3a]" />
              <span>WhatsApp</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0a422d] hover:bg-[#12553b] text-[#dfb86c] border border-[#266247] shadow-md transition-all cursor-pointer group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#dfb86c] group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-xs font-medium text-[#f6efe4]">
                {t('cart')}
              </span>
              {totalItems > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#dfb86c] text-[#063323] text-xs font-bold shadow-sm">
                  {totalItems}
                </span>
              )}
              {totalPrice > 0 && (
                <span className="hidden xl:inline text-xs text-[#d3c2a6] font-semibold border-l border-[#266247] pl-2">
                  ₹{totalPrice}
                </span>
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full text-[#9fb3a7] hover:text-[#dfb86c] hover:bg-[#0c3e2b] transition-all cursor-pointer"
              title={language === 'hi' ? 'प्रशासक पोर्टल (लॉगिन)' : 'Admin Portal (Login)'}
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#f4eee6] hover:bg-[#0d3f2b] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#042419] border-b border-[#1b4b35] px-4 pt-3 pb-6 space-y-3 shadow-xl transition-all animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#123e2c]">
            <span className="text-xs text-[#9eb6a9]">
              {language === 'hi' ? 'दवाखाना नेविगेशन' : 'Navigation Menu'}
            </span>
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#093524] text-[#dfb86c] text-xs border border-[#23533c]"
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'hi' ? 'English' : 'हिन्दी'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left px-3 py-2.5 rounded-lg bg-[#073021] text-[#f6efe4] hover:bg-[#0c402d]"
            >
              {t('home')}
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="text-left px-3 py-2.5 rounded-lg bg-[#073021] text-[#f6efe4] hover:bg-[#0c402d]"
            >
              {t('products')}
            </button>
            <button
              onClick={() => handleNavClick('consultation')}
              className="text-left px-3 py-2.5 rounded-lg bg-[#073021] text-[#f6efe4] hover:bg-[#0c402d]"
            >
              {t('consultation')}
            </button>
            <button
              onClick={() => handleNavClick('why-us')}
              className="text-left px-3 py-2.5 rounded-lg bg-[#073021] text-[#f6efe4] hover:bg-[#0c402d]"
            >
              {language === 'hi' ? 'विशेषताएं' : 'Why Us'}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2.5 rounded-lg bg-[#073021] text-[#f6efe4] hover:bg-[#0c402d]"
            >
              {t('aboutUs')}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2.5 rounded-lg bg-[#073021] text-[#f6efe4] hover:bg-[#0c402d]"
            >
              {t('contact')}
            </button>
          </div>

          {/* Quick Contact buttons in mobile menu */}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#166534] hover:bg-[#15803d] text-white text-sm font-semibold shadow"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{language === 'hi' ? 'सीधे व्हाट्सएप पर संपर्क करें' : 'Contact on WhatsApp'}</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#0a3a27] text-[#dfb86c] text-sm font-medium border border-[#205d40]"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
