import { ServicePricing } from '@/types';

export const SERVICE_PRICINGS: ServicePricing[] = [
  {
    id: 'consult-1',
    titleHi: 'सामान्य स्वास्थ्य एवं दोष परामर्श',
    titleEn: 'General Dosha & Health Assessment',
    descHi: 'प्रकृति परीक्षण (वात-पित्त-कफ) एवं व्यक्तिगत जीवनशैली व आहार परामर्श।',
    descEn: 'Prakriti analysis (Vata-Pitta-Kapha balance) with personalized diet and lifestyle regimen.',
    durationHi: '20-25 मिनट (व्हाट्सएप/प्रत्यक्ष)',
    durationEn: '20-25 mins (WhatsApp / In-Person)',
    price: 199,
    originalPrice: 350,
    badgeHi: 'आरंभिक परामर्श',
    badgeEn: 'Starter Session',
    includesHi: [
      'व्यक्तिगत वात-पित्त-कफ संतुलन समीक्षा',
      'अनुकूल आहार एवं ऋतुचर्या मार्गदर्शिका',
      'उचित जड़ी-बूटियों की सिफारिश',
      'व्हाट्सएप पर 7 दिनों तक फॉलोअप सहायता'
    ],
    includesEn: [
      'Personalized Dosha balance review',
      'Customized diet & seasonal lifestyle guide',
      'Herbal formulation recommendations',
      '7-day direct WhatsApp follow-up support'
    ]
  },
  {
    id: 'consult-2',
    titleHi: 'पुराने रोगों का समग्र आयुर्वेदिक उपचार',
    titleEn: 'Chronic Ailment & Custom Regimen',
    descHi: 'जोड़ों के दर्द, उदर विकार, मधुमेह, श्वसन अथवा त्वचा रोगों के लिए विशेष उपचार योजना।',
    descEn: 'Targeted holistic care for chronic joint stiffness, gut issues, metabolic or skin distress.',
    durationHi: '35-45 मिनट विस्तृत चर्चा',
    durationEn: '35-45 mins Comprehensive Session',
    price: 399,
    originalPrice: 600,
    badgeHi: 'सर्वाधिक अनुशंसित',
    badgeEn: 'Most Recommended',
    isPopular: true,
    includesHi: [
      'विस्तृत स्वास्थ्य इतिहास एवं रोग निदान',
      'कस्टमाइज्ड औषधीय योग एवं क्वाथ निर्माण',
      'पारंपरिक तेल मालिश व सेक निर्देश',
      '15 दिनों तक निरंतर व्हाट्सएप परामर्श',
      'औषधि पार्सल पर विशेष पैकेजिंग'
    ],
    includesEn: [
      'Detailed health history & root-cause review',
      'Custom herbal decoction & tablet planning',
      'Specific tailam application protocols',
      '15-day ongoing direct WhatsApp check-ins',
      'Priority dispensary preparation & dispatch'
    ]
  },
  {
    id: 'consult-3',
    titleHi: 'मौसमी रसायन एवं संपूर्ण कायाकल्प',
    titleEn: 'Seasonal Detox & Rejuvenation Care',
    descHi: 'शरीर से टॉक्सिन्स (आम) निष्कासन, ऊर्जा वृद्धि और ओज वर्धन का शास्त्रीय 30-दिवसीय कार्यक्रम।',
    descEn: 'Classical 30-day program to eliminate bodily toxins (Ama), restore stamina, and enhance vitality.',
    durationHi: '30-दिवसीय निगरानी',
    durationEn: '30-Day Monitored Program',
    price: 699,
    originalPrice: 999,
    badgeHi: 'सम्पूर्ण स्वास्थ्य',
    badgeEn: 'Complete Vitality',
    includesHi: [
      'साप्ताहिक दोष व प्रगति विश्लेषण',
      'पंचामृत व विशेष रसायन योग योजना',
      'मानसिक शांति व निद्रा सुधार नुस्खे',
      'महीने भर समर्पित वैद्य परामर्श सहायता'
    ],
    includesEn: [
      'Weekly dosha progression assessments',
      'Rasayana restorative protocol customization',
      'Deep sleep & mental clarity guidance',
      'Full-month dedicated practitioner WhatsApp line'
    ]
  }
];
