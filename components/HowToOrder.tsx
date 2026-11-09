'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Search, ShoppingBag, MessageCircle, Truck } from 'lucide-react';

export const HowToOrder: React.FC = () => {
  const { language, t } = useLanguage();

  const steps = [
    {
      icon: Search,
      num: '01',
      title: t('step1Title'),
      desc: t('step1Desc')
    },
    {
      icon: ShoppingBag,
      num: '02',
      title: t('step2Title'),
      desc: t('step2Desc')
    },
    {
      icon: MessageCircle,
      num: '03',
      title: t('step3Title'),
      desc: t('step3Desc')
    },
    {
      icon: Truck,
      num: '04',
      title: t('step4Title'),
      desc: t('step4Desc')
    }
  ];

  return (
    <section className="py-20 bg-[#041c12] border-y border-[#0f3d2b] text-[#fcf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#dfb86c]">
            {language === 'hi' ? 'सरल एवं पारदर्शी खरीद' : 'Hassle-Free Checkout'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#fcf8f0]">
            {t('howToOrderTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#b8ccbf]">
            {language === 'hi'
              ? 'बिना किसी जटिल पेमेंट गेटवे के सीधे व्हाट्सएप पर अपनी सुविधानुसार ऑर्डर करें।'
              : 'Direct and transparent ordering via WhatsApp without complicated checkouts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl p-6 bg-[#06281a] border border-[#144733] flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#083523] border border-[#1b5b3d] flex items-center justify-center text-[#dfb86c]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-[#1b5239] font-serif">
                    {st.num}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#fcf8f0] font-serif mb-1.5">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#b8ccbf] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
