import { CartItem, Product, ServicePricing } from '@/types';
import { BUSINESS_INFO } from '@/data/businessInfo';

export interface CheckoutDetails {
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  notes?: string;
}

/**
 * Builds a properly formatted, luxury WhatsApp order message
 */
export function buildCartOrderWhatsAppUrl(
  items: CartItem[],
  totalPrice: number,
  details: CheckoutDetails,
  language: 'hi' | 'en' = 'hi'
): string {
  const isHi = language === 'hi';

  const header = isHi
    ? `🌿 *नमस्ते क़ादरी अलशिफ़ा आयुर्वेद दवाखाना*\nमैं निम्नलिखित औषधियों का ऑर्डर देना चाहता/चाहती हूँ:\n`
    : `🌿 *Hello Qadri Alshifa Ayurved Dawa Khana*\nI would like to place an order for the following Ayurvedic medicines:\n`;

  const itemsList = items
    .map((item, index) => {
      const name = isHi ? item.product.nameHi : item.product.nameEn;
      const weight = item.product.weightOrVolume ? ` (${item.product.weightOrVolume})` : '';
      const demoTag = item.product.isDemo ? (isHi ? ' [डेमो उत्पाद]' : ' [Demo Item]') : '';
      const lineTotal = item.product.price * item.quantity;
      return `${index + 1}. *${name}*${weight}${demoTag}\n   ↳ मात्रा: ${item.quantity} x ₹${item.product.price} = ₹${lineTotal}`;
    })
    .join('\n\n');

  const totalStr = isHi
    ? `\n\n💰 *अनुमानित कुल राशि:* ₹${totalPrice}`
    : `\n\n💰 *Estimated Total Amount:* ₹${totalPrice}`;

  let customerInfo = '';
  if (details.customerName?.trim()) {
    customerInfo += isHi
      ? `\n👤 *ग्राहक का नाम:* ${details.customerName.trim()}`
      : `\n👤 *Customer Name:* ${details.customerName.trim()}`;
  }
  if (details.customerPhone?.trim()) {
    customerInfo += isHi
      ? `\n📱 *फ़ोन नंबर:* ${details.customerPhone.trim()}`
      : `\n📱 *Contact:* ${details.customerPhone.trim()}`;
  }
  if (details.deliveryAddress?.trim()) {
    customerInfo += isHi
      ? `\n📍 *डिलीवरी का पता:* ${details.deliveryAddress.trim()}`
      : `\n📍 *Delivery Address:* ${details.deliveryAddress.trim()}`;
  }
  if (details.notes?.trim()) {
    customerInfo += isHi
      ? `\n📝 *विशेष निर्देश / समस्या:* ${details.notes.trim()}`
      : `\n📝 *Notes / Concern:* ${details.notes.trim()}`;
  }

  const footer = isHi
    ? `\n\n📌 *नोट:* कृपया दवा की उपलब्धता, सटीक बिल एवं डिलीवरी समय की पुष्टि करें। धन्यवाद!`
    : `\n\n📌 *Note:* Please confirm availability, final invoice, and dispatch details. Thank you!`;

  const fullMessage = `${header}\n${itemsList}${totalStr}${customerInfo}${footer}`;
  return `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Builds direct single-product WhatsApp order message
 */
export function buildQuickProductWhatsAppUrl(
  product: Product,
  quantity: number = 1,
  language: 'hi' | 'en' = 'hi'
): string {
  const isHi = language === 'hi';
  const name = isHi ? product.nameHi : product.nameEn;
  const demoTag = product.isDemo ? (isHi ? ' (डेमो कैटलॉग)' : ' (Demo Catalog)') : '';

  const message = isHi
    ? `🌿 *नमस्ते क़ादरी अलशिफ़ा आयुर्वेद*\nमुझे निम्नलिखित औषधि के बारे में जानकारी एवं ऑर्डर चाहिए:\n\n` +
      `📦 *औषधि:* ${name}${demoTag}\n` +
      `⚖️ *मात्रा/पैकिंग:* ${product.weightOrVolume}\n` +
      `🔢 *वांछित संख्या:* ${quantity}\n` +
      `💵 *मूल्य:* ₹${product.price * quantity} (₹${product.price} प्रति यूनिट)\n\n` +
      `कृपया उपलब्धता और डिलीवरी की जानकारी साझा करें।`
    : `🌿 *Hello Qadri Alshifa Ayurved*\nI would like to inquire/order the following Ayurvedic medicine:\n\n` +
      `📦 *Product:* ${name}${demoTag}\n` +
      `⚖️ *Pack Size:* ${product.weightOrVolume}\n` +
      `🔢 *Quantity:* ${quantity}\n` +
      `💵 *Price:* ₹${product.price * quantity} (₹${product.price} each)\n\n` +
      `Please let me know about availability and dispatch.`;

  return `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds consultation booking WhatsApp message
 */
export function buildConsultationWhatsAppUrl(
  service: ServicePricing,
  language: 'hi' | 'en' = 'hi'
): string {
  const isHi = language === 'hi';
  const title = isHi ? service.titleHi : service.titleEn;

  const message = isHi
    ? `🌿 *नमस्ते वैद्य जी (क़ादरी अलशिफ़ा)*\nमैं *${title}* (शुल्क: ₹${service.price}) के लिए आयुर्वेदिक स्वास्थ्य परामर्श बुक करना चाहता/चाहती हूँ।\nकृपया उपलब्ध समय और परामर्श प्रक्रिया बताएं।`
    : `🌿 *Hello Practitioner (Qadri Alshifa)*\nI would like to schedule an Ayurvedic consultation for *${title}* (Fee: ₹${service.price}).\nPlease let me know your available slots and guidance process.`;

  return `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * General contact inquiry message
 */
export function buildGeneralInquiryWhatsAppUrl(
  name: string,
  concern: string,
  language: 'hi' | 'en' = 'hi'
): string {
  const isHi = language === 'hi';
  const message = isHi
    ? `🌿 *नमस्ते क़ादरी अलशिफ़ा दवाखाना*\n` +
      `👤 *नाम:* ${name || 'परामर्शार्थी'}\n` +
      `💬 *स्वास्थ्य प्रश्न / समस्या:* ${concern}\n\n` +
      `कृपया उचित आयुर्वेदिक मार्गदर्शन एवं औषधि सुझाव प्रदान करें।`
    : `🌿 *Hello Qadri Alshifa Dawa Khana*\n` +
      `👤 *Name:* ${name || 'Patient/Visitor'}\n` +
      `💬 *Health Concern / Query:* ${concern}\n\n` +
      `Please provide Ayurvedic guidance and suitable recommendations.`;

  return `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}
