'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { lastAddedProduct, resetLastAdded, openCart } = useCart();
  const { language } = useLanguage();

  useEffect(() => {
    if (lastAddedProduct) {
      const timer = setTimeout(() => {
        resetLastAdded();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedProduct, resetLastAdded]);

  if (!lastAddedProduct) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slideUp">
      <div className="p-3.5 pr-4 rounded-2xl bg-[#052418] border border-[#dfb86c]/60 shadow-2xl flex items-center gap-3.5 max-w-sm text-[#fcf8f0]">
        <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#03180f] flex-shrink-0 border border-[#1d573d]">
          <Image
            src={lastAddedProduct.image}
            alt={lastAddedProduct.nameEn}
            fill
            className="object-cover"
            sizes="44px"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[10px] text-[#86efac] font-bold uppercase tracking-wider">
            ✓ {language === 'hi' ? 'झोले में जोड़ा गया' : 'Added to Cart'}
          </div>
          <div className="text-xs font-bold text-[#fcf8f0] truncate">
            {language === 'hi' ? lastAddedProduct.nameHi : lastAddedProduct.nameEn}
          </div>
          <div className="text-xs font-semibold text-[#dfb86c]">
            ₹{lastAddedProduct.price}
          </div>
        </div>

        <button
          onClick={() => {
            resetLastAdded();
            openCart();
          }}
          className="px-3 py-1.5 rounded-xl bg-[#dfb86c] hover:bg-[#ebd08f] text-[#031d13] font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
        >
          <span>{language === 'hi' ? 'देखें' : 'View'}</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <button
          onClick={resetLastAdded}
          className="text-[#7e998b] hover:text-[#fcf8f0] p-1"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
