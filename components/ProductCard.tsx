'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { buildQuickProductWhatsAppUrl } from '@/utils/whatsapp';
import {
  ShoppingBag,
  MessageCircle,
  Eye,
  Check,
  Star,
  Info
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { language, t } = useLanguage();
  const { addItem, items } = useCart();

  const isHi = language === 'hi';
  const name = isHi ? product.nameHi : product.nameEn;
  const secondaryName = isHi ? product.nameEn : product.nameHi;
  const shortDesc = isHi ? product.shortDescHi : product.shortDescEn;
  const badge = isHi ? product.badgeHi : product.badgeEn;

  // Check if item already in cart
  const inCartItem = items.find((item) => item.product.id === product.id);
  const isInCart = Boolean(inCartItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleWhatsAppDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildQuickProductWhatsAppUrl(product, 1, language);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative rounded-2xl bg-[#072d1f] border border-[#184f37] hover:border-[#dfb86c]/70 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full bg-[#052116] overflow-hidden">
        <Image
          src={product.image}
          alt={product.nameEn}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#072d1f] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Custom Feature Badge */}
          {badge ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#dfb86c] text-[#052116] shadow-sm uppercase tracking-wider">
              {badge}
            </span>
          ) : (
            <span />
          )}

          {/* Demo product indicator */}
          {product.isDemo && (
            <span
              title="यह एक डेमो उत्पाद है"
              className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-amber-950/90 text-amber-200 border border-amber-600/60 shadow flex items-center gap-1"
            >
              <Info className="w-2.5 h-2.5" />
              {t('demoBadge')}
            </span>
          )}
        </div>

        {/* Net Weight Pill */}
        {product.weightOrVolume && (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#031d12]/90 text-[#dfb86c] border border-[#1b5038] backdrop-blur-sm">
            {product.weightOrVolume}
          </div>
        )}

        {/* Quick View Floating Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-[#093524]/90 hover:bg-[#dfb86c] text-[#dfb86c] hover:text-[#052116] border border-[#20573e] backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-lg"
          title={t('viewDetails')}
          aria-label={t('viewDetails')}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Middle Card Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Rating & Stock Status */}
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 text-[#dfb86c]">
              <Star className="w-3.5 h-3.5 fill-[#dfb86c]" />
              <span className="font-semibold text-xs text-[#fbf7ee]">
                {product.rating || '4.9'}
              </span>
              <span className="text-[#8ca395]">
                ({product.reviewCount || 24})
              </span>
            </div>

            {/* Stock pill */}
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                product.stockStatus === 'in_stock'
                  ? 'bg-[#0f442c] text-[#86efac] border border-[#1e6b47]'
                  : product.stockStatus === 'low_stock'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                  : 'bg-rose-950/80 text-rose-300 border border-rose-700/60'
              }`}
            >
              {product.stockStatus === 'in_stock'
                ? t('inStock')
                : product.stockStatus === 'low_stock'
                ? t('lowStock')
                : t('outOfStock')}
            </span>
          </div>

          {/* Primary Product Name */}
          <h3 className="text-base sm:text-lg font-bold text-[#fcf8f0] font-serif leading-snug group-hover:text-[#dfb86c] transition-colors line-clamp-1">
            {name}
          </h3>

          {/* Secondary Sub-Name */}
          <div className="text-[11px] text-[#9eb6a9] font-medium line-clamp-1 italic">
            {secondaryName}
          </div>

          {/* Short description */}
          <p className="text-xs text-[#c4b59f] line-clamp-2 leading-relaxed pt-1">
            {shortDesc}
          </p>
        </div>

        {/* Pricing & Key Herb Tags */}
        <div className="space-y-3 pt-2 border-t border-[#123e2b]">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-extrabold text-[#dfb86c]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#7e998b] line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] font-semibold text-[#86efac]">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% {language === 'hi' ? 'छूट' : 'OFF'}
              </span>
            )}
          </div>

          {/* Actions: Add to Cart + WhatsApp Direct Order */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isInCart
                  ? 'bg-[#124d33] text-[#dfb86c] border border-[#2b7250]'
                  : 'bg-[#093925] hover:bg-[#0f4e34] text-[#f7efe4] border border-[#1b5b3c]'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>({inCartItem?.quantity})</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>{t('addToCart')}</span>
                </>
              )}
            </button>

            {/* Quick Order on WhatsApp */}
            <button
              onClick={handleWhatsAppDirect}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#15803d] hover:bg-[#16a34a] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              title={t('quickOrder')}
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-[#15803d]" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
