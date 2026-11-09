'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { BUSINESS_INFO } from '@/data/businessInfo';
import { MapPin, Phone, ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-[#032115] text-[#fcf8f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden p-2 bg-gradient-to-br from-[#dfb86c]/30 to-[#144733] shadow-2xl">
              <div className="relative h-[420px] rounded-2xl overflow-hidden bg-[#041c12]">
                <Image
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=85"
                  alt="Ayurvedic botanicals and apothecary roots"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02170e] via-transparent to-transparent opacity-85" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#031d13]/90 backdrop-blur-md border border-[#1b5038]">
                  <div className="text-xs font-bold text-[#dfb86c] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#dfb86c]" />
                    <span>{language === 'hi' ? 'शास्त्रीय आयुर्वेदिक केंद्र' : 'Ayurvedic Dispensary'}</span>
                  </div>
                  <div className="text-[11px] text-[#ded3c1] mt-1">
                    {BUSINESS_INFO.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#dfb86c]">
                {t('aboutUs')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#fcf8f0] leading-tight">
                {language === 'hi'
                  ? 'क़ादरी अलशिफ़ा आयुर्वेद दवाखाना का परिचय'
                  : 'About Qadri Alshifa Ayurved Dawa Khana'}
              </h2>
              <p className="text-sm font-medium text-[#dfb86c] italic">
                &ldquo;{t('tagline')}&rdquo;
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#ded3c1] leading-relaxed">
              {language === 'hi'
                ? 'क़ादरी अलशिफ़ा आयुर्वेद दवाखाना उत्तर प्रदेश के ऐतिहासिक जनपद श्रावस्ती के बेचुआ क्षेत्र में स्थित एक समर्पित आयुर्वेदिक औषधालय है। हमारा उद्देश्य प्राचीन वैदिक व शास्त्रीय ग्रंथों (चरक संहिता, सुश्रुत संहिता, भावप्रकाश) में वर्णित प्रामाणिक जड़ी-बूटियों एवं रस-रसायनों की शुद्धता को जन-जन तक पहुंचाना है।'
                : 'Qadri Alshifa Ayurved Dawa Khana is an authentic Ayurvedic dispensary established in Bechuwa, Shrawasti, Uttar Pradesh. Our mission is to provide pure, time-honored herbal formulations crafted according to classical Vedic pharmacopeia directly to patrons.'}
            </p>

            <p className="text-xs sm:text-sm text-[#ded3c1] leading-relaxed">
              {language === 'hi'
                ? 'हम केवल वाणिज्यिक उत्पाद बेचने के स्थान पर प्रत्येक व्यक्ति की प्रकृति, जीवनशैली और आवश्यकताओं को ध्यान में रखते हुए उचित सेवन विधि, परहेज और व्यक्तिगत परामर्श उपलब्ध कराते हैं। स्थानीय ग्राहकों के साथ-साथ दूर-दराज के व्यक्ति भी हमारे समर्पित व्हाट्सएप नंबर के माध्यम से परामर्श एवं औषधि आपूर्ति प्राप्त कर सकते हैं।'
                : 'Rather than treating wellness as mere commodities, we focus on constitutional tri-dosha balance, proper dietary guidance, and personalized herbal protocols. Through our dedicated WhatsApp channel, patrons can conveniently receive guidance and home delivery.'}
            </p>

            {/* Core Values / Location info */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#06281a] border border-[#164d36] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#093524] flex items-center justify-center text-[#dfb86c] flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#fcf8f0]">
                    {language === 'hi' ? 'दवाखाना पता' : 'Physical Location'}
                  </div>
                  <div className="text-[11px] text-[#9eb6a9] mt-0.5">
                    {BUSINESS_INFO.address}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#06281a] border border-[#164d36] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#093524] flex items-center justify-center text-[#dfb86c] flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#fcf8f0]">
                    {language === 'hi' ? 'हेल्पलाइन / व्हाट्सएप' : 'Phone & WhatsApp'}
                  </div>
                  <div className="text-[11px] text-[#dfb86c] font-semibold mt-0.5">
                    {BUSINESS_INFO.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Truthful Commitment */}
            <div className="p-3.5 rounded-xl bg-[#052418] border border-[#1a553a] flex items-center gap-3 text-xs text-[#b8ccbf]">
              <HeartHandshake className="w-5 h-5 text-[#86efac] flex-shrink-0" />
              <p>
                {language === 'hi'
                  ? 'सत्यनिष्ठा, शुद्ध प्राकृतिक घटक एवं प्रत्यक्ष मानवीय सहायता ही हमारी पहचान है।'
                  : 'Grounded in integrity, pure botanicals, and personalized human care.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
