'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BUSINESS_INFO } from '@/data/businessInfo';
import { Phone, MessageCircle, Globe, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="bg-[#032318] text-[#e8ded1] text-xs border-b border-[#0f3d2b] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Location & Tagline */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#0f3d2b] text-[#dfb86c] border border-[#2d5f47]">
            <ShieldCheck className="w-3 h-3 text-[#dfb86c]" />
            {language === 'hi' ? 'प्रामाणिक औषधालय' : 'Authentic Dispensary'}
          </span>
          <span className="hidden md:inline text-[#c4b59f]">|</span>
          <span className="text-xs text-[#eae3d6] font-medium tracking-wide">
            {t('announcementText')}
          </span>
        </div>

        {/* Right: Direct Contact & Language Switch */}
        <div className="flex items-center gap-4 text-xs font-medium">
          {/* Direct Phone */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="hidden sm:inline-flex items-center gap-1 text-[#dfb86c] hover:text-[#f3d289] transition-colors"
            title="Call Dispensary"
          >
            <Phone className="w-3 h-3" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          {/* Quick WhatsApp Link */}
          <a
            href={BUSINESS_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#4ade80] hover:text-[#86efac] transition-colors font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-[#22c55e] text-[#032318]" />
            <span className="hidden xs:inline">{t('whatsappOrder')}</span>
            <span className="xs:hidden">WhatsApp</span>
          </a>

          <span className="text-[#0f3d2b]">|</span>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#093524] hover:bg-[#10432f] text-[#dfb86c] border border-[#23533c] transition-all text-xs cursor-pointer shadow-sm"
            aria-label="Toggle language"
          >
            <Globe className="w-3 h-3 text-[#dfb86c]" />
            <span className="font-semibold">
              {language === 'hi' ? 'English' : 'हिन्दी'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
