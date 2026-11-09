'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BUSINESS_INFO } from '@/data/businessInfo';
import { buildGeneralInquiryWhatsAppUrl } from '@/utils/whatsapp';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Send,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(language === 'hi' ? 'कृपया अपना नाम दर्ज करें।' : 'Please enter your name.');
      return;
    }
    if (!concern.trim()) {
      setError(language === 'hi' ? 'कृपया अपनी समस्या या संदेश विवरण दर्ज करें।' : 'Please describe your concern or query.');
      return;
    }

    setError('');
    setSubmitted(true);

    // Launch WhatsApp with prefilled inquiry
    const url = buildGeneralInquiryWhatsAppUrl(name, concern, language);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 bg-[#041a11] text-[#fcf8f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#dfb86c]">
            {t('contact')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#fcf8f0]">
            {t('contactTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#b8ccbf]">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Verified Location, Phone & Interactive Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#06281a] border border-[#164d36] space-y-5">
              <h3 className="text-lg font-bold text-[#fcf8f0] font-serif border-b border-[#123e2a] pb-3">
                {language === 'hi' ? 'दवाखाना संपर्क विवरण' : 'Dispensary Information'}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#093524] border border-[#1c553a] flex items-center justify-center text-[#dfb86c] flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#fcf8f0]">
                    {t('addressLabel')}
                  </div>
                  <div className="text-xs text-[#c4b59f] mt-0.5 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </div>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#dfb86c] hover:underline mt-1 font-semibold"
                  >
                    <span>{language === 'hi' ? 'गूगल मैप्स पर देखें' : 'View on Google Maps'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#093524] border border-[#1c553a] flex items-center justify-center text-[#4ade80] flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4 fill-[#22c55e] text-[#093524]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#fcf8f0]">
                    {t('phoneLabel')}
                  </div>
                  <div className="text-xs text-[#dfb86c] font-bold mt-0.5">
                    {BUSINESS_INFO.phone}
                  </div>
                  <div className="text-[11px] text-[#9eb6a9]">
                    {language === 'hi' ? 'कॉल एवं व्हाट्सएप दोनों उपलब्ध' : 'Direct Call & WhatsApp'}
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#093524] border border-[#1c553a] flex items-center justify-center text-[#dfb86c] flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#fcf8f0]">
                    {t('hoursLabel')}
                  </div>
                  <div className="text-xs text-[#c4b59f] mt-0.5">
                    {language === 'hi' ? BUSINESS_INFO.workingHoursHi : BUSINESS_INFO.workingHoursEn}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Visual Embed Frame */}
            <div className="rounded-3xl overflow-hidden border border-[#184e36] bg-[#062417] shadow-md">
              <div className="p-3 bg-[#031d13] border-b border-[#123e2a] flex items-center justify-between text-xs text-[#b8ccbf]">
                <span className="font-semibold flex items-center gap-1 text-[#dfb86c]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Bechuwa, Shrawasti (U.P.)</span>
                </span>
                <span className="text-[10px] text-[#769182]">Uttar Pradesh, India</span>
              </div>
              <div className="relative w-full h-56 bg-[#041a11]">
                <iframe
                  title="Qadri Alshifa Location Map"
                  src="https://maps.google.com/maps?q=Bechuwa,+Shrawasti,+Uttar+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(0.9)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Health Inquiry & WhatsApp Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#06281a] border border-[#184e36] space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#dfb86c] block">
                  {language === 'hi' ? 'वैद्य जी से सीधा संपर्क' : 'Direct Inquiry'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#fcf8f0] mt-1">
                  {t('sendMessage')}
                </h3>
                <p className="text-xs text-[#b8ccbf] mt-1">
                  {language === 'hi'
                    ? 'अपनी स्वास्थ्य समस्या या औषधि संबंधी प्रश्न लिखें। सबमिट करते ही यह सीधे व्हाट्सएप पर प्रेषित हो जाएगा।'
                    : 'Submit your health question or medicine inquiry. It will open directly in WhatsApp for quick response.'}
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-700/60 text-xs text-rose-200">
                  {error}
                </div>
              )}

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    {language === 'hi'
                      ? 'धन्यवाद! व्हाट्सएप खुल गया है, कृपया अपना संदेश सेंड करें।'
                      : 'Thank you! WhatsApp has been launched with your inquiry.'}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#ded3c1] mb-1.5">
                      {t('yourName')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'hi' ? 'उदा. मोहम्मद आरिफ' : 'e.g. Mohd. Arif'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl bg-[#031d13] border border-[#1c553a] text-[#fcf8f0] placeholder-[#769182] focus:outline-none focus:border-[#dfb86c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#ded3c1] mb-1.5">
                      {t('yourPhone')} (वैकल्पिक)
                    </label>
                    <input
                      type="tel"
                      placeholder={language === 'hi' ? 'उदा. 98390 XXXXX' : 'e.g. +91 98390...'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl bg-[#031d13] border border-[#1c553a] text-[#fcf8f0] placeholder-[#769182] focus:outline-none focus:border-[#dfb86c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#ded3c1] mb-1.5">
                    {t('yourMessage')} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={
                      language === 'hi'
                        ? 'अपनी समस्या (जैसे: जोड़ों में दर्द, पुराना कफ, पाचन विकार आदि) या औषधि का नाम लिखें...'
                        : 'Describe your symptoms, duration, or specific Ayurvedic formulation needed...'
                    }
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl bg-[#031d13] border border-[#1c553a] text-[#fcf8f0] placeholder-[#769182] focus:outline-none focus:border-[#dfb86c] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#166534] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t('sendViaWhatsappBtn')}</span>
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-[#9eb6a9]">
                <ShieldCheck className="w-4 h-4 text-[#dfb86c] flex-shrink-0" />
                <span>
                  {language === 'hi'
                    ? 'आपकी व्यक्तिगत जानकारी केवल स्वास्थ्य परामर्श हेतु गोपनीय रखी जाती है।'
                    : 'Your information remains confidential and is utilized solely for health guidance.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
