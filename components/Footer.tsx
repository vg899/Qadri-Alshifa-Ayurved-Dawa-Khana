'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BUSINESS_INFO } from '@/data/businessInfo';
import { Leaf, MapPin, Phone, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenAdmin }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#02170e] text-[#fcf8f0] border-t border-[#0d3824] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dfb86c] to-[#99732b] p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#031d13] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#dfb86c]" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif text-[#fcf8f0] leading-tight">
                  {language === 'hi' ? 'क़ादरी अलशिफ़ा' : 'QADRI ALSHIFA'}
                </h3>
                <span className="text-xs text-[#dfb86c] font-medium tracking-wider uppercase">
                  {language === 'hi' ? 'आयुर्वेद दवाखाना' : 'Ayurved Dawa Khana'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#b8ccbf] leading-relaxed max-w-sm">
              {language === 'hi' ? BUSINESS_INFO.subheadingHi : BUSINESS_INFO.subheadingEn}
            </p>

            <div className="pt-2 text-xs text-[#dfb86c] font-semibold italic">
              &ldquo;{t('tagline')}&rdquo;
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfb86c]">
              {language === 'hi' ? 'त्वरित लिंक' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-[#c4b59f]">
              <li>
                <button
                  onClick={() => onNavigateSection('hero')}
                  className="hover:text-[#dfb86c] transition-colors cursor-pointer"
                >
                  {t('home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('products')}
                  className="hover:text-[#dfb86c] transition-colors cursor-pointer"
                >
                  {t('products')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('consultation')}
                  className="hover:text-[#dfb86c] transition-colors cursor-pointer"
                >
                  {t('consultation')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('why-us')}
                  className="hover:text-[#dfb86c] transition-colors cursor-pointer"
                >
                  {language === 'hi' ? 'विशेषताएं (Why Us)' : 'Why Choose Us'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-[#dfb86c] transition-colors cursor-pointer"
                >
                  {t('aboutUs')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('contact')}
                  className="hover:text-[#dfb86c] transition-colors cursor-pointer"
                >
                  {t('contact')}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-[#8ca395] hover:text-[#dfb86c] transition-colors cursor-pointer"
                >
                  {t('admin')}
                </button>
              </li>
            </ul>
          </div>

          {/* Dispensary Address & Direct WhatsApp */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfb86c]">
              {language === 'hi' ? 'दवाखाना संपर्क' : 'Dispensary Contact'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#c4b59f]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#dfb86c] flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#dfb86c] flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-[#dfb86c]">
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0" />
                <a
                  href={BUSINESS_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4ade80] hover:underline font-semibold"
                >
                  +91 63938 80986 (WhatsApp Order)
                </a>
              </li>
              <li className="flex items-start gap-2 text-[11px] text-[#8ca395]">
                <Clock className="w-3.5 h-3.5 text-[#dfb86c] flex-shrink-0 mt-0.5" />
                <span>{language === 'hi' ? BUSINESS_INFO.workingHoursHi : BUSINESS_INFO.workingHoursEn}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Statutory Ayurvedic Disclaimer */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#041d13] border border-[#144733] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#dfb86c]">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>{t('footerDisclaimerTitle')}</span>
          </div>
          <p className="text-[11px] text-[#9eb6a9] leading-relaxed">
            {t('footerDisclaimerText')}
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#0f3723] flex flex-col sm:flex-row items-center justify-between text-xs text-[#769182] gap-2 text-center sm:text-left">
          <div>{t('copyright')}</div>
          <div className="text-[11px] text-[#dfb86c]/70">
            {language === 'hi'
              ? 'प्रामाणिक हर्बल वेलनेस एवं ऑनलाइन व्हाट्सएप ऑर्डरिंग'
              : 'Authentic Herbal Wellness & WhatsApp Ordering'}
          </div>
        </div>
      </div>
    </footer>
  );
};
