'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PATIENT_TESTIMONIALS } from '@/data/testimonials';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';

export const PatientTestimonials: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-20 bg-[#041c12] border-t border-[#0f3d2b] text-[#fcf8f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#dfb86c]">
            {language === 'hi' ? 'सत्यनिष्ठ अनुभव' : 'Authentic Patron Feedback'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#fcf8f0]">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#b8ccbf]">
            {t('testimonialsSubtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PATIENT_TESTIMONIALS.map((item) => {
            const condition = language === 'hi' ? item.conditionHi : item.conditionEn;
            const quote = language === 'hi' ? item.quoteHi : item.quoteEn;

            return (
              <div
                key={item.id}
                className="rounded-3xl bg-[#06291b] border border-[#164d36] p-6 sm:p-7 flex flex-col justify-between hover:border-[#dfb86c]/60 transition-all shadow-md"
              >
                <div className="space-y-4">
                  {/* Top Quote Icon & Stars */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#dfb86c]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#dfb86c]" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-[#dfb86c]/30" />
                  </div>

                  {/* Health Condition Pill */}
                  <div className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#031d13] text-[#86efac] border border-[#1d573d]">
                    🌿 {condition}
                  </div>

                  {/* Quote Body */}
                  <p className="text-xs sm:text-sm text-[#ded3c1] leading-relaxed italic">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>

                {/* Patient Signature */}
                <div className="pt-6 border-t border-[#123e2a] flex items-center justify-between mt-6">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#fcf8f0] flex items-center gap-1.5">
                      <span>{item.patientName}</span>
                      <span title="Verified Patron">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#86efac]" />
                      </span>
                    </div>
                    <div className="text-[11px] text-[#9eb6a9] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#dfb86c]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#769182]">
                    {item.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
