'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { buildQuickProductWhatsAppUrl } from '@/utils/whatsapp';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Check,
  Star,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  allProducts: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  allProducts,
  onClose,
  onSelectProduct
}) => {
  const { language, t } = useLanguage();
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const isHi = language === 'hi';
  const name = isHi ? product.nameHi : product.nameEn;
  const secondaryName = isHi ? product.nameEn : product.nameHi;
  const description = isHi ? product.descriptionHi : product.descriptionEn;
  const dosage = isHi ? product.dosageHi : product.dosageEn;

  // Find related products in same category
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const inCartItem = items.find((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  const handleWhatsAppOrder = () => {
    const url = buildQuickProductWhatsAppUrl(product, quantity, language);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-[#06291b] rounded-3xl border border-[#235d41] shadow-2xl overflow-hidden my-auto text-[#fcf8f0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#031d13]/80 hover:bg-[#dfb86c] text-[#dfb86c] hover:text-[#031d13] border border-[#1b5038] transition-all cursor-pointer shadow-md"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Product Imagery & Badges */}
          <div className="md:col-span-5 bg-[#041f14] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#144733]">
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#031910] border border-[#184e36] shadow-inner">
                <Image
                  src={product.image}
                  alt={product.nameEn}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.badgeHi && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#dfb86c] text-[#031d13] shadow-md uppercase">
                      {isHi ? product.badgeHi : product.badgeEn}
                    </span>
                  )}
                  {product.isDemo && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-950/90 text-amber-200 border border-amber-600/60 shadow flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {t('demoBadge')}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold bg-[#041c12]/90 text-[#dfb86c] border border-[#23583f] backdrop-blur-sm">
                  {product.weightOrVolume}
                </div>
              </div>

              {/* Trust notes under image */}
              <div className="p-3 rounded-xl bg-[#073322] border border-[#164d36] space-y-2 text-xs text-[#b8ccbf]">
                <div className="flex items-center gap-2 text-[#dfb86c]">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold">
                    {language === 'hi' ? 'प्रामाणिक निर्माण' : 'Vedic Classical Standard'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {language === 'hi'
                    ? 'क़ादरी अलशिफ़ा, बेचुआ (श्रावस्ती) द्वारा निर्धारित गुणवत्ता मानकों पर आधारित।'
                    : 'Adheres to authentic herbal preparation protocols at Bechuwa, Shrawasti.'}
                </p>
              </div>
            </div>

            {/* Demo Notice Warning if demo product */}
            {product.isDemo && (
              <div className="mt-4 p-2.5 rounded-lg bg-amber-950/40 border border-amber-700/50 text-[11px] text-amber-200/90">
                <span className="font-bold">⚠️ {language === 'hi' ? 'डेमो सूचना:' : 'Demo Notice:'}</span>{' '}
                {language === 'hi'
                  ? 'यह उत्पाद विवरण एवं मूल्य प्रारंभिक प्रदर्शन हेतु है। वास्तविक औषधि उपलब्धता हेतु व्हाट्सएप पर परामर्श करें।'
                  : 'This catalogue item is for demonstration. Actual stock & pricing confirmed directly on WhatsApp.'}
              </div>
            )}
          </div>

          {/* Right Column: Complete Details, Ingredients, Dosage, Cart & WhatsApp */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#dfb86c]">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#dfb86c]" />
                  <span className="font-bold">{product.rating || '4.9'}</span>
                  <span className="text-[#8ca395]">({product.reviewCount || 24} {language === 'hi' ? 'समीक्षाएं' : 'reviews'})</span>
                </div>
                <span>•</span>
                <span className="text-[#86efac] font-medium">
                  {product.stockStatus === 'in_stock'
                    ? t('inStock')
                    : product.stockStatus === 'low_stock'
                    ? t('lowStock')
                    : t('outOfStock')}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#fcf8f0] font-serif leading-tight">
                {name}
              </h2>
              <p className="text-sm text-[#a3b8ad] italic font-medium">
                {secondaryName}
              </p>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-[#083523] border border-[#1d573d] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#9eb6a9] block">
                  {language === 'hi' ? 'मूल्य (प्रति पैक)' : 'Price (Per Pack)'}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-[#dfb86c]">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#7e998b] line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-2 bg-[#041d13] p-1.5 rounded-xl border border-[#20573e]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-[#083020] hover:bg-[#0f442d] text-[#dfb86c] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#fcf8f0]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-[#083020] hover:bg-[#0f442d] text-[#dfb86c] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart + WhatsApp Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#dfb86c] hover:bg-[#ebd08f] text-[#042419] font-bold text-sm shadow-lg transition-all cursor-pointer"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#042419]" />
                    <span>{t('addedToCart')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#042419]" />
                    <span>
                      {t('addToCart')} {inCartItem ? `(${inCartItem.quantity} पहले से)` : ''}
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#166534] hover:bg-[#15803d] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t('orderOnWhatsapp')}</span>
              </button>
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfb86c] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb86c]" />
                <span>{language === 'hi' ? 'औषधि परिचय एवं महत्व' : 'Formulation Overview'}</span>
              </h4>
              <p className="text-sm text-[#ded3c1] leading-relaxed">
                {description}
              </p>
            </div>

            {/* Dosage & Directions (सेवन विधि) */}
            <div className="space-y-2 p-3.5 rounded-xl bg-[#041d13] border border-[#144733]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#86efac] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#86efac]" />
                <span>{t('dosage')}</span>
              </h4>
              <p className="text-xs text-[#c4b59f] leading-relaxed">
                {dosage}
              </p>
            </div>

            {/* Ingredients (जड़ी-बूटियां) */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfb86c]">
                  {t('ingredients')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#083020] text-[#ded3c1] border border-[#1d573d]"
                    >
                      🌿 {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Products */}
            {related.length > 0 && (
              <div className="pt-4 border-t border-[#144733] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9eb6a9]">
                  {language === 'hi' ? 'संबद्ध अन्य औषधियां' : 'Related Formulations'}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {related.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => {
                        onSelectProduct(rel);
                        setQuantity(1);
                      }}
                      className="text-left p-2 rounded-xl bg-[#041d13] hover:bg-[#072f1f] border border-[#174934] transition-all group cursor-pointer"
                    >
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-1.5 bg-[#03150e]">
                        <Image
                          src={rel.image}
                          alt={rel.nameEn}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="150px"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-[11px] font-bold text-[#fcf8f0] line-clamp-1 group-hover:text-[#dfb86c]">
                        {isHi ? rel.nameHi : rel.nameEn}
                      </div>
                      <div className="text-[10px] text-[#dfb86c] font-semibold">
                        ₹{rel.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
