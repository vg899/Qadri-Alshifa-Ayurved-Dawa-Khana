'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { CATEGORIES } from '@/data/categories';
import { Category } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const { language } = useLanguage();

  return (
    <section className="py-12 bg-[#041c12] border-y border-[#0f3d2b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#dfb86c]">
              {language === 'hi' ? 'शास्त्रीय वर्गीकरण' : 'Ayurvedic Classifications'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#fbf7ee] font-serif mt-1">
              {language === 'hi' ? 'प्रमुख औषधि श्रेणियां' : 'Featured Formulations'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#b8ccbf] max-w-md">
            {language === 'hi'
              ? 'वात, पित्त एवं कफ के संतुलन हेतु शास्त्रीय ग्रंथों के अनुसार वर्गीकृत औषधियां।'
              : 'Categorized according to classical texts to restore tri-dosha balance.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.filter((c) => c.slug !== 'all').map((cat: Category) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between h-48 sm:h-56 cursor-pointer border ${
                  isSelected
                    ? 'border-[#dfb86c] ring-2 ring-[#dfb86c]/30 shadow-lg bg-[#073020]'
                    : 'border-[#144733] bg-[#06291b] hover:border-[#2f6f52] hover:bg-[#093524]'
                }`}
              >
                {/* Background Dim Image */}
                <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-40 transition-opacity">
                  <Image
                    src={cat.image}
                    alt={cat.nameEn}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041c12] via-[#041c12]/80 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#032115]/80 text-[#dfb86c] border border-[#20553c]">
                    {language === 'hi' ? 'प्रामाणिक योग' : 'Classical'}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#dfb86c]/10 flex items-center justify-center text-[#dfb86c] group-hover:bg-[#dfb86c] group-hover:text-[#041c12] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#fbf7ee] group-hover:text-[#dfb86c] transition-colors font-serif leading-snug">
                    {language === 'hi' ? cat.nameHi : cat.nameEn}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#c4b59f] line-clamp-2 leading-relaxed">
                    {language === 'hi' ? cat.descriptionHi : cat.descriptionEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
