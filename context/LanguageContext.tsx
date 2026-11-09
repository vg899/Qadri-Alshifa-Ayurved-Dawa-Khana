'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'hi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation & Branding
  brandName: {
    hi: 'क़ादरी अलशिफ़ा आयुर्वेद दवाखाना',
    en: 'Qadri Alshifa Ayurved Dawa Khana'
  },
  brandShort: {
    hi: 'क़ादरी अलशिफ़ा',
    en: 'Qadri Alshifa'
  },
  tagline: {
    hi: 'परंपरा का विश्वास, आयुर्वेद की पहचान।',
    en: 'Trust in Tradition, the True Identity of Ayurveda.'
  },
  home: { hi: 'मुख्य पृष्ठ', en: 'Home' },
  products: { hi: 'औषधियां', en: 'Medicines' },
  consultation: { hi: 'परामर्श व शुल्क', en: 'Consultation & Pricing' },
  aboutUs: { hi: 'हमारे बारे में', en: 'About Us' },
  contact: { hi: 'संपर्क एवं पता', en: 'Contact & Location' },
  admin: { hi: 'प्रशासक पोर्टल', en: 'Admin Portal' },
  cart: { hi: 'दवा झोला (कार्ट)', en: 'Cart' },

  // Announcement Bar
  announcementText: {
    hi: '🌿 बेचुआ, श्रावस्ती (उ.प्र.) | व्हाट्सएप पर सीधे ऑर्डर करें एवं आयुर्वेदिक मार्गदर्शन प्राप्त करें',
    en: '🌿 Bechuwa, Shrawasti (U.P.) | Direct WhatsApp Ordering & Ayurvedic Guidance'
  },
  callNow: { hi: 'कॉल करें', en: 'Call Now' },
  whatsappOrder: { hi: 'व्हाट्सएप ऑर्डर', en: 'WhatsApp Order' },
  demoNotice: {
    hi: 'डेमो कैटलॉग सक्रिय (वास्तविक ऑर्डर व्हाट्सएप से पुष्टि किए जाते हैं)',
    en: 'Demo Catalogue Active (Real orders confirmed via WhatsApp)'
  },

  // Hero Section
  heroBadge: {
    hi: '१००% शुद्ध एवं प्रामाणिक आयुर्वेदिक उत्पाद',
    en: '100% Pure & Classical Ayurvedic Formulations'
  },
  heroTitleLine1: {
    hi: 'परंपरा का विश्वास,',
    en: 'Trust in Tradition,'
  },
  heroTitleLine2: {
    hi: 'आयुर्वेद की पहचान।',
    en: 'Identity of Ayurveda.'
  },
  heroSubtitle: {
    hi: 'श्रावस्ती की पावन धरा बेचुआ में स्थित क़ादरी अलशिफ़ा दवाखाना — जहां प्राचीन जड़ी-बूटियों की शुद्धता और परंपरागत निष्ठा से तैयार की जाती हैं स्वास्थ्यवर्धक औषधियां।',
    en: 'Located in Bechuwa, Shrawasti (Uttar Pradesh), Qadri Alshifa crafts classical botanical formulations with pure Himalayan herbs and time-honored integrity.'
  },
  exploreProducts: { hi: 'औषधियां देखें', en: 'Explore Medicines' },
  orderOnWhatsapp: { hi: 'व्हाट्सएप पर ऑर्डर करें', en: 'Order via WhatsApp' },
  consultDoctor: { hi: 'स्वास्थ्य परामर्श लें', en: 'Consult on WhatsApp' },
  viewCatalogue: { hi: 'कैटलॉग देखें', en: 'View Catalogue' },

  // Badges & Highlights
  pureHerbs: { hi: 'शुद्ध जड़ी-बूटियां', en: 'Pure Wild Herbs' },
  traditionalMethod: { hi: 'शास्त्रीय वैदिक निर्माण', en: 'Classical Preparation' },
  whatsappSupport: { hi: 'त्वरित व्हाट्सएप सहायता', en: 'Quick WhatsApp Support' },
  localDispensary: { hi: 'बेचुआ, श्रावस्ती में स्थित', en: 'Based in Bechuwa, Shrawasti' },

  // Product Catalog
  catalogueTitle: { hi: 'प्रामाणिक औषधियां एवं योग', en: 'Classical & Herbal Formulations' },
  catalogueSubtitle: {
    hi: 'हमारी सभी औषधियां शास्त्रीय विधि एवं उच्च गुणवत्ता वाली जड़ी-बूटियों से निर्मित हैं।',
    en: 'Every medicine is formulated following classical texts using tested herbal ingredients.'
  },
  searchPlaceholder: {
    hi: 'औषधि का नाम, रोग या घटक खोजें...',
    en: 'Search medicine name, herb, or ailment...'
  },
  allCategories: { hi: 'सभी श्रेणियां', en: 'All Categories' },
  sortBy: { hi: 'क्रमबद्ध करें', en: 'Sort By' },
  sortFeatured: { hi: 'विशेष रूप से चुनिंदा', en: 'Featured' },
  sortPriceAsc: { hi: 'मूल्य: कम से अधिक', en: 'Price: Low to High' },
  sortPriceDesc: { hi: 'मूल्य: अधिक से कम', en: 'Price: High to Low' },
  sortName: { hi: 'नाम अनुसार', en: 'By Name' },
  inStock: { hi: 'उपलब्ध है', en: 'In Stock' },
  lowStock: { hi: 'सीमित मात्रा', en: 'Limited Stock' },
  outOfStock: { hi: 'शीघ्र उपलब्ध होगा', en: 'Restocking Soon' },
  addToCart: { hi: 'कार्ट में जोड़ें', en: 'Add to Cart' },
  addedToCart: { hi: 'कार्ट में जोड़ा गया ✓', en: 'Added to Cart ✓' },
  quickOrder: { hi: 'त्वरित ऑर्डर (WhatsApp)', en: 'Quick Order (WhatsApp)' },
  viewDetails: { hi: 'विवरण देखें', en: 'View Details' },
  dosage: { hi: 'सेवन विधि व मात्रा', en: 'Dosage & Direction' },
  ingredients: { hi: 'प्रमुख घटक (जड़ी-बूटियां)', en: 'Key Herbal Ingredients' },
  weightVolume: { hi: 'मात्रा / वजन', en: 'Net Content / Weight' },
  demoBadge: { hi: 'डेमो उत्पाद', en: 'Demo Product' },
  noProductsFound: {
    hi: 'कोई औषधि नहीं मिली। कृपया भिन्न खोज शब्द या श्रेणी का चयन करें।',
    en: 'No medicines found. Try adjusting your search query or category filter.'
  },
  resetFilters: { hi: 'फ़िल्टर हटाएं', en: 'Reset Filters' },

  // Cart
  cartTitle: { hi: 'आपका दवा झोला (कार्ट)', en: 'Your Shopping Cart' },
  cartEmpty: {
    hi: 'आपका झोला अभी खाली है। कृपया औषधियां चुनें।',
    en: 'Your cart is empty. Browse our medicines to add items.'
  },
  cartEmptySub: {
    hi: 'किसी भी औषधि को चुनकर सीधे व्हाट्सएप पर मंगवा सकते हैं।',
    en: 'You can select any medicine and place an order directly on WhatsApp.'
  },
  itemsInCart: { hi: 'चयनित औषधियां', en: 'Selected Items' },
  subtotal: { hi: 'उप-कुल (Subtotal)', en: 'Subtotal' },
  clearCart: { hi: 'झोला खाली करें', en: 'Clear Cart' },
  customerNameOptional: { hi: 'आपका शुभ नाम (वैकल्पिक)', en: 'Your Full Name (Optional)' },
  deliveryAddressOptional: { hi: 'डिलीवरी का पता या कस्बा (वैकल्पिक)', en: 'Delivery Address / Town (Optional)' },
  additionalNotesOptional: { hi: 'कोई विशेष निर्देश या समस्या (वैकल्पिक)', en: 'Special instructions or notes (Optional)' },
  checkoutWhatsapp: { hi: 'व्हाट्सएप पर ऑर्डर भेजें', en: 'Place Order on WhatsApp' },
  checkoutNotice: {
    hi: 'व्हाट्सएप खुलने के बाद कृपया संदेश भेजें। हमारे प्रतिनिधि द्वारा अंतिम बिल व डिलीवरी की पुष्टि की जाएगी।',
    en: 'Clicking opens WhatsApp with your prefilled order. Final confirmation and dispatch will be coordinated by our dispensary.'
  },

  // Service Pricing
  pricingTitle: { hi: 'आयुर्वेदिक परामर्श एवं सेवाएं', en: 'Ayurvedic Consultations & Services' },
  pricingSubtitle: {
    hi: 'पारंपरिक नाड़ी एवं दोष विश्लेषण के साथ व्यक्तिगत स्वास्थ्य समाधान।',
    en: 'Personalized holistic healthcare guided by classical constitutional diagnosis.'
  },
  bookConsultWhatsapp: { hi: 'व्हाट्सएप पर समय बुक करें', en: 'Book Session via WhatsApp' },
  pricingNotice: {
    hi: 'परामर्श सीधे वैद्य जी द्वारा व्हाट्सएप ऑडियो/वीडियो या बेचुआ दवाखाने पर प्रत्यक्ष उपलब्ध है।',
    en: 'Consultations are conducted directly via WhatsApp or in-person at our Bechuwa dispensary.'
  },

  // Testimonials
  testimonialsTitle: { hi: 'मरीजों एवं संरक्षकों के अनुभव', en: 'Patient Experiences & Feedback' },
  testimonialsSubtitle: {
    hi: 'श्रावस्ती एवं समीपवर्ती जनपदों के सम्मानीय परिवारों का विश्वास।',
    en: 'Trusted by patrons across Shrawasti and neighboring districts.'
  },

  // Why Choose Us
  whyChooseTitle: { hi: 'क़ादरी अलशिफ़ा को क्यों चुनें?', en: 'Why Choose Qadri Alshifa?' },
  whyChooseSubtitle: {
    hi: 'हम केवल प्रामाणिक, सत्यनिष्ठ और शास्त्रीय परंपरा से जुड़ी औषधियां ही उपलब्ध कराते हैं।',
    en: 'We uphold pure, verifiable, and ethical principles of genuine Ayurveda.'
  },
  reason1Title: { hi: 'सत्यनिष्ठ शास्त्रीय विधियां', en: 'Pure Classical Formulations' },
  reason1Desc: {
    hi: 'चरक, सुश्रुत एवं भावप्रकाश संहिताओं में वर्णित योगों के अनुसार औषधियों का निर्माण एवं चयन।',
    en: 'Sourced and prepared adhering strictly to time-tested classical Ayurvedic pharmacopeia.'
  },
  reason2Title: { hi: 'व्यक्तिगत मार्गदर्शन', en: 'Direct Practitioner Guidance' },
  reason2Desc: {
    hi: 'केवल उत्पाद बेचना नहीं, बल्कि सही सेवन विधि, परहेज और पथ्य-अपथ्य का सम्पूर्ण ज्ञान देना।',
    en: 'More than a sale — we provide comprehensive dosage, dietary, and lifestyle counsel.'
  },
  reason3Title: { hi: 'स्थानिक विश्वसनीयता', en: 'Local Rooted Trust' },
  reason3Desc: {
    hi: 'बेचुआ, श्रावस्ती में प्रत्यक्ष दवाखाना जहां आप स्वयं आकर औषधियों की परख कर सकते हैं।',
    en: 'A verified physical dispensary in Bechuwa, Shrawasti where you can visit in person.'
  },
  reason4Title: { hi: 'सुलभ व्हाट्सएप सेवा', en: 'Convenient WhatsApp Access' },
  reason4Desc: {
    hi: 'घर बैठे एक क्लिक में व्हाट्सएप संदेश भेजकर दवा परामर्श एवं होम डिलीवरी प्राप्त करें।',
    en: 'Easy one-click ordering and direct communication via +91 63938 80986.'
  },

  // How to order
  howToOrderTitle: { hi: 'ऑर्डर करने की आसान प्रक्रिया', en: 'Simple Ordering Process' },
  step1Title: { hi: '१. औषधि चुनें', en: '1. Browse & Select' },
  step1Desc: { hi: 'कैटलॉग में अपनी आवश्यकतानुसार औषधियां देखें और झोले में जोड़ें।', en: 'Browse formulations and add your chosen medicines to the cart.' },
  step2Title: { hi: '२. झोला जांचें', en: '2. Review Cart' },
  step2Desc: { hi: 'मात्रा समायोजित करें और यदि चाहें तो अपना नाम व पता दर्ज करें।', en: 'Adjust quantities and provide your delivery location if needed.' },
  step3Title: { hi: '३. व्हाट्सएप पर भेजें', en: '3. Send via WhatsApp' },
  step3Desc: { hi: 'एक क्लिक में स्वचालित रूप से तैयार संदेश सीधे हमारे नंबर पर भेजें।', en: 'Click to launch WhatsApp with a prefilled, itemized order summary.' },
  step4Title: { hi: '४. पुष्टि एवं प्राप्ति', en: '4. Confirm & Receive' },
  step4Desc: { hi: 'हमारे प्रतिनिधि द्वारा उपलब्धता की पुष्टि के बाद सुरक्षित डिलीवरी प्राप्त करें।', en: 'Our team verifies availability and arranges dispatch directly to you.' },

  // Contact
  contactTitle: { hi: 'हमसे संपर्क करें एवं मिलें', en: 'Get In Touch & Visit Us' },
  contactSubtitle: {
    hi: 'किसी भी औषधि, नुस्खे अथवा स्वास्थ्य परामर्श के लिए बेझिझक संपर्क करें।',
    en: 'Feel free to visit our Bechuwa center or reach out via phone or WhatsApp.'
  },
  addressLabel: { hi: 'हमारा पता', en: 'Dispensary Address' },
  phoneLabel: { hi: 'फोन / व्हाट्सएप', en: 'Phone / WhatsApp' },
  hoursLabel: { hi: 'कार्य समय', en: 'Working Hours' },
  sendMessage: { hi: 'संदेश या परामर्श प्रश्न भेजें', en: 'Send an Inquiry / Message' },
  yourName: { hi: 'आपका नाम', en: 'Your Name' },
  yourPhone: { hi: 'मोबाइल नंबर', en: 'Phone Number' },
  yourMessage: { hi: 'समस्या या संदेश विवरण', en: 'Health Concern or Message' },
  sendViaWhatsappBtn: { hi: 'व्हाट्सएप द्वारा भेजें', en: 'Submit via WhatsApp' },

  // Footer & Disclaimer
  footerDisclaimerTitle: { hi: 'सांविधिक अस्वीकरण (Statutory Disclaimer)', en: 'Statutory Ayurvedic Disclaimer' },
  footerDisclaimerText: {
    hi: 'इस वेबसाइट पर प्रस्तुत जानकारी और उत्पाद विवरण केवल पारंपरिक एवं शैक्षिक उद्देश्य हेतु हैं। किसी भी गंभीर रोग की स्थिति में प्रत्यक्ष वैद्य से परामर्श अवश्य करें। डेमो उत्पाद केवल प्रदर्शन हेतु हैं।',
    en: 'Information on this website is for educational and traditional awareness. Consult a qualified Ayurvedic practitioner for serious ailments. Demo items are strictly for presentation.'
  },
  copyright: {
    hi: '© 2025 क़ादरी अलशिफ़ा आयुर्वेद दवाखाना, बेचुआ, श्रावस्ती (उ.प्र.)। सर्वाधिकार सुरक्षित।',
    en: '© 2025 Qadri Alshifa Ayurved Dawa Khana, Bechuwa, Shrawasti (U.P.). All Rights Reserved.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('qadri_language') as Language;
        if (saved === 'hi' || saved === 'en') {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return 'hi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('qadri_language', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'hi' ? 'en' : 'hi';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry.hi || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
