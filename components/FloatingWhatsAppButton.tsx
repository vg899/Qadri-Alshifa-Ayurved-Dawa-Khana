'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BUSINESS_INFO } from '@/data/businessInfo';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 group">
      {/* Tooltip on hover */}
      <div className="hidden sm:block px-3 py-1.5 rounded-xl bg-[#042419] text-[#dfb86c] text-xs font-semibold border border-[#20573e] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {language === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'Chat on WhatsApp'}
      </div>

      <a
        href={BUSINESS_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#166534] to-[#22c55e] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-[#86efac]/40"
        aria-label="Order or Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfb86c] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#dfb86c]" />
        </span>
        <MessageCircle className="w-7 h-7 fill-white text-[#166534]" />
      </a>
    </div>
  );
};
