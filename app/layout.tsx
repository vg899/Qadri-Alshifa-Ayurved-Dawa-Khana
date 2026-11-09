import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Qadri Alshifa Ayurved Dawa Khana | क़ादरी अलशिफ़ा आयुर्वेद दवाखाना',
  description: 'Premium Ayurvedic Medicines & Natural Formulations from Bechuwa, Shrawasti, Uttar Pradesh. Discover authentic herbal care and easy WhatsApp ordering.',
  keywords: ['Ayurvedic Medicine', 'Qadri Alshifa', 'Bechuwa', 'Shrawasti', 'Uttar Pradesh', 'Chyawanprash', 'Maha Narayan Tailam', 'WhatsApp Order'],
  openGraph: {
    title: 'Qadri Alshifa Ayurved Dawa Khana | Bechuwa, Shrawasti',
    description: 'Authentic Ayurvedic Medicines & Natural Formulations. Direct WhatsApp Ordering.',
    type: 'website',
    locale: 'hi_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qadri Alshifa Ayurved Dawa Khana',
    description: 'Authentic Ayurvedic Medicines & Natural Formulations from Bechuwa, Shrawasti.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="hi" className="scroll-smooth">
      <body suppressHydrationWarning className="bg-[#031d13] text-[#fcf8f0] antialiased">
        {children}
      </body>
    </html>
  );
}
