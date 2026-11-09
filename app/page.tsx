'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { Product } from '@/types';
import { productService } from '@/services/productService';
import { DEMO_PRODUCTS } from '@/data/demoProducts';

// Components
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedCategories } from '@/components/FeaturedCategories';
import { ProductCatalogue } from '@/components/ProductCatalogue';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { ConsultationPricing } from '@/components/ConsultationPricing';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { HowToOrder } from '@/components/HowToOrder';
import { PatientTestimonials } from '@/components/PatientTestimonials';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { AdminModal } from '@/components/AdminModal';
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton';
import { Toast } from '@/components/Toast';

function MainAppContent() {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      const res = await productService.getAllProducts();
      setProducts(res.products);
    } catch (err) {
      console.warn('Failed loading products:', err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    productService.getAllProducts().then((res) => {
      if (isMounted) {
        setProducts(res.products);
      }
    }).catch(() => {
      // keep initial DEMO_PRODUCTS
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    handleNavigateSection('products');
  };

  return (
    <div className="min-h-screen bg-[#031d13] text-[#fcf8f0] selection:bg-[#dfb86c] selection:text-[#031d13] flex flex-col font-sans">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Main Navigation */}
      <Header
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Cinematic Hero */}
        <HeroSection
          onExploreClick={() => handleNavigateSection('products')}
          onConsultClick={() => handleNavigateSection('consultation')}
        />

        {/* Botanical Classifications */}
        <FeaturedCategories
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Medicines Catalogue */}
        <ProductCatalogue
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          loading={loading}
        />

        {/* Transparent Ayurvedic Consultation & Custom Formulation Pricing */}
        <ConsultationPricing />

        {/* Verifiable Merits */}
        <WhyChooseUs />

        {/* 4-Step WhatsApp Ordering Process */}
        <HowToOrder />

        {/* Authentic Regional Patient Feedback */}
        <PatientTestimonials />

        {/* Truthful Brand Introduction */}
        <AboutSection />

        {/* Verified Location, Phone, Interactive Map & Inquiry */}
        <ContactSection />
      </main>

      {/* Luxury Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        allProducts={products}
        onClose={() => setSelectedProduct(null)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer />

      {/* Admin Management Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onProductsUpdated={loadProducts}
      />

      {/* Sticky Quick-Access Floating WhatsApp Action */}
      <FloatingWhatsAppButton />

      {/* Subtle Toast for added items */}
      <Toast />
    </div>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <CartProvider>
        <MainAppContent />
      </CartProvider>
    </LanguageProvider>
  );
}
