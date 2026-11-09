'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  BookOpen,
  UserCheck,
  Building2,
  MessageCircle
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: BookOpen,
      title: t('reason1Title'),
      desc: t('reason1Desc')
    },
    {
      icon: UserCheck,
      title: t('reason2Title'),
      desc: t('reason2Desc')
    },
    {
      icon: Building2,
      title: t('reason3Title'),
      desc: t('reason3Desc')
    },
    {
      icon: MessageCircle,
      title: t('reason4Title'),
      desc: t('reason4Desc')
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-[#032115] text-[#fcf8f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#dfb86c]">
            {t('whyChooseTitle')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#fcf8f0]">
            {t('whyChooseTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#b8ccbf]">
            {t('whyChooseSubtitle')}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#062c1e] border border-[#164d36] hover:border-[#dfb86c]/50 transition-all space-y-4 text-left group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0a3a27] border border-[#1e5d42] flex items-center justify-center text-[#dfb86c] group-hover:scale-110 transition-transform shadow-inner">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-[#fcf8f0] font-serif group-hover:text-[#dfb86c] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#c4b59f] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
