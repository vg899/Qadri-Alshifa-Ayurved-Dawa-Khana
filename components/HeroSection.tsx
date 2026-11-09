'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { BUSINESS_INFO } from '@/data/businessInfo';
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  HeartPulse,
  Leaf
} from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onConsultClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onConsultClick }) => {
  const { language, t } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden bg-[#032115] text-[#fbf7ee] pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Decorative Glow & Botanical Elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#1b5e3a]/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-[#dfb86c]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073623] border border-[#2b6448] text-[#dfb86c] text-xs font-semibold tracking-wide shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb86c]" />
              <span>{t('heroBadge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#fcf8f0] font-serif leading-[1.15]">
              <span className="block text-[#fcf8f0] drop-shadow-sm">
                {t('heroTitleLine1')}
              </span>
              <span className="block mt-1 bg-gradient-to-r from-[#e5c07b] via-[#dfb86c] to-[#f9e2ad] bg-clip-text text-transparent">
                {t('heroTitleLine2')}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#ded3c1] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('heroSubtitle')}
            </p>

            {/* Location & Trust Tag */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#b8ccbf]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#dfb86c]" />
                <strong className="text-[#f5ede0]">{language === 'hi' ? 'दवाखाना स्थान:' : 'Dispensary:'}</strong> {BUSINESS_INFO.address}
              </span>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {/* Primary CTA: Explore Products */}
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#dfb86c] to-[#c79a3c] hover:from-[#ebd08f] hover:to-[#dfb86c] text-[#042419] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <span>{t('exploreProducts')}</span>
                <ArrowRight className="w-4 h-4 text-[#042419] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: WhatsApp Direct Order */}
              <a
                href={BUSINESS_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#14532d] hover:bg-[#166534] text-[#f2faf5] font-semibold text-sm sm:text-base border border-[#22c55e]/40 shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-[#22c55e] text-[#14532d]" />
                <span>{t('orderOnWhatsapp')}</span>
              </a>

              {/* Consult Button */}
              <button
                onClick={onConsultClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#0a3a27] hover:bg-[#104b34] text-[#dfb86c] font-medium text-xs sm:text-sm border border-[#246346] transition-all cursor-pointer"
              >
                <HeartPulse className="w-4 h-4 text-[#dfb86c]" />
                <span>{language === 'hi' ? 'परामर्श शुल्क देखें' : 'View Consultation'}</span>
              </button>
            </div>

            {/* Verifiable Trust Metrics */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#123e2a]">
              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-full bg-[#0d402b] flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-4 h-4 text-[#dfb86c]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#f5ede0]">{t('pureHerbs')}</div>
                  <div className="text-[10px] text-[#9eb6a9]">{language === 'hi' ? 'प्राकृतिक जड़ी-बूटी' : '100% Botanical'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-full bg-[#0d402b] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#dfb86c]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#f5ede0]">{t('traditionalMethod')}</div>
                  <div className="text-[10px] text-[#9eb6a9]">{language === 'hi' ? 'संहिता सम्मत' : 'Classical Texts'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-full bg-[#0d402b] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-[#4ade80]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#f5ede0]">{t('whatsappSupport')}</div>
                  <div className="text-[10px] text-[#9eb6a9]">{language === 'hi' ? 'सीधा संपर्क' : 'Direct Guidance'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-full bg-[#0d402b] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#dfb86c]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#f5ede0]">{language === 'hi' ? 'श्रावस्ती दवाखाना' : 'Shrawasti Store'}</div>
                  <div className="text-[10px] text-[#9eb6a9]">{language === 'hi' ? 'प्रत्यक्ष केंद्र' : 'Physical Location'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual - Luxury Botanical Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Golden Aura Ring */}
              <div className="relative rounded-3xl p-2 bg-gradient-to-br from-[#dfb86c]/40 via-[#1b5e3a]/30 to-[#dfb86c]/20 shadow-2xl">
                <div className="relative h-[380px] sm:h-[460px] w-full rounded-2xl overflow-hidden bg-[#06291b]">
                  <Image
                    src="https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=85"
                    alt="Ayurvedic herbs, brass mortar, and natural apothecary"
                    fill
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02170e] via-transparent to-transparent opacity-80" />

                  {/* Overlaid Luxury Caption Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#042015]/90 backdrop-blur-md border border-[#20553c] text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#dfb86c] animate-ping" />
                        <span className="text-xs font-bold text-[#dfb86c]">
                          {language === 'hi' ? 'विशेष शास्त्रीय अवलेह एवं तैलम' : 'Special Classical Formulations'}
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#0b3824] text-[#86efac] font-medium border border-[#1b5b3a]">
                        {language === 'hi' ? 'व्हाट्सएप ऑर्डर सुलभ' : 'WhatsApp Orders'}
                      </span>
                    </div>
                    <p className="text-xs text-[#ded3c1] mt-1.5 leading-snug">
                      {language === 'hi'
                        ? 'परंपरागत भस्म, रस-रसायन एवं जड़ी-बूटियों का शुद्ध संयोजन।'
                        : 'Authentic preparations rooted in Vedic apothecary wisdom.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Testimonial/Trust Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 p-3 rounded-2xl bg-[#073322]/95 backdrop-blur-md border border-[#dfb86c]/40 shadow-xl flex items-center gap-3 max-w-[210px]">
                <div className="w-10 h-10 rounded-xl bg-[#dfb86c]/20 border border-[#dfb86c]/40 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-[#dfb86c]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#fcf8f0]">
                    {language === 'hi' ? '१००% प्राकृतिक' : '100% Herbal'}
                  </div>
                  <div className="text-[10px] text-[#9eb6a9]">
                    {language === 'hi' ? 'हानिरहित औषधियां' : 'Zero Harsh Chemicals'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
