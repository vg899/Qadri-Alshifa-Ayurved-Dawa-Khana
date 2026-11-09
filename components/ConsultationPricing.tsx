'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICE_PRICINGS } from '@/data/servicePricing';
import { buildConsultationWhatsAppUrl } from '@/utils/whatsapp';
import { ServicePricing } from '@/types';
import {
  Check,
  MessageCircle,
  Clock,
  Sparkles,
  HeartPulse,
  ShieldCheck
} from 'lucide-react';

export const ConsultationPricing: React.FC = () => {
  const { language, t } = useLanguage();

  const handleBook = (service: ServicePricing) => {
    const url = buildConsultationWhatsAppUrl(service, language);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="consultation" className="py-20 bg-[#031d13] text-[#fcf8f0] relative overflow-hidden">
      {/* Background radial accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#144733]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#083523] border border-[#205b3f] text-[#dfb86c] text-xs font-semibold">
            <HeartPulse className="w-3.5 h-3.5 text-[#dfb86c]" />
            <span>{language === 'hi' ? 'पारदर्शी सेवा शुल्क' : 'Transparent Pricing'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fcf8f0] font-serif">
            {t('pricingTitle')}
          </h2>

          <p className="text-sm sm:text-base text-[#c4b59f] leading-relaxed">
            {t('pricingSubtitle')}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SERVICE_PRICINGS.map((service) => {
            const isPopular = service.isPopular;
            const title = language === 'hi' ? service.titleHi : service.titleEn;
            const desc = language === 'hi' ? service.descHi : service.descEn;
            const duration = language === 'hi' ? service.durationHi : service.durationEn;
            const badge = language === 'hi' ? service.badgeHi : service.badgeEn;
            const includes = language === 'hi' ? service.includesHi : service.includesEn;

            return (
              <div
                key={service.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#083d28] to-[#05281a] border-2 border-[#dfb86c] shadow-2xl scale-[1.02] md:-translate-y-2'
                    : 'bg-[#06291b] border border-[#164d36] hover:border-[#2f6f52]'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#dfb86c] text-[#031d13] text-xs font-extrabold shadow uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{badge}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Top Badge & Title */}
                  <div>
                    {!isPopular && badge && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#031d13] text-[#dfb86c] border border-[#1b5038] mb-2 uppercase">
                        {badge}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#fcf8f0] font-serif leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-[#b8ccbf] mt-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="p-4 rounded-2xl bg-[#031f14] border border-[#144733] flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-[#dfb86c]">
                          ₹{service.price}
                        </span>
                        {service.originalPrice && (
                          <span className="text-xs text-[#7e998b] line-through">
                            ₹{service.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#9eb6a9]">
                        {language === 'hi' ? 'एकमुश्त परामर्श शुल्क' : 'One-time consult fee'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-[#86efac] font-medium bg-[#083020] px-2.5 py-1 rounded-lg border border-[#1a553a]">
                      <Clock className="w-3 h-3 text-[#86efac]" />
                      <span>{duration}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold text-[#fcf8f0] uppercase tracking-wider block">
                      {language === 'hi' ? 'सेवा में सम्मिलित:' : 'What is included:'}
                    </span>
                    <ul className="space-y-2 text-xs text-[#ded3c1]">
                      {includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-[#dfb86c]/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#dfb86c]">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="pt-8">
                  <button
                    onClick={() => handleBook(service)}
                    className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md ${
                      isPopular
                        ? 'bg-[#dfb86c] hover:bg-[#ebd08f] text-[#031d13]'
                        : 'bg-[#15803d] hover:bg-[#16a34a] text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t('bookConsultWhatsapp')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[#06291b] border border-[#1b5038] max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#093524] border border-[#235d41] flex items-center justify-center flex-shrink-0 text-[#dfb86c]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#fcf8f0]">
              {language === 'hi' ? 'सत्यनिष्ठ आयुर्वेदिक परामर्श' : 'Ethical Consultation Policy'}
            </h4>
            <p className="text-xs text-[#b8ccbf] mt-0.5 leading-relaxed">
              {t('pricingNotice')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
