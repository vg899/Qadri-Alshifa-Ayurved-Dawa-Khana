'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types';
import { CATEGORIES } from '@/data/categories';
import { useLanguage } from '@/context/LanguageContext';
import { ProductCard } from '@/components/ProductCard';
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  Info,
  RotateCcw
} from 'lucide-react';

interface ProductCatalogueProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  onSelectProduct: (product: Product) => void;
  loading: boolean;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  loading
}) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'name'>('featured');

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const nameHi = p.nameHi.toLowerCase();
        const nameEn = p.nameEn.toLowerCase();
        const shortHi = p.shortDescHi.toLowerCase();
        const shortEn = p.shortDescEn.toLowerCase();
        const ingredients = (p.ingredients || []).join(' ').toLowerCase();
        return (
          nameHi.includes(q) ||
          nameEn.includes(q) ||
          shortHi.includes(q) ||
          shortEn.includes(q) ||
          ingredients.includes(q)
        );
      });
    }

    // Sorting
    if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => {
        const nameA = language === 'hi' ? a.nameHi : a.nameEn;
        const nameB = language === 'hi' ? b.nameHi : b.nameEn;
        return nameA.localeCompare(nameB);
      });
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy, language]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <section id="products" className="py-20 bg-[#052619] text-[#fcf8f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#083523] border border-[#205b3f] text-[#dfb86c] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'दवाखाना कैटलॉग' : 'Ayurvedic Dispensary'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#fcf8f0]">
            {t('catalogueTitle')}
          </h2>

          <p className="text-xs sm:text-sm text-[#b8ccbf]">
            {t('catalogueSubtitle')}
          </p>
        </div>

        {/* Demo Mode Reassurance Notice Bar */}
        <div className="p-3.5 rounded-2xl bg-[#093524]/90 border border-[#dfb86c]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#ded3c1] shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#dfb86c]/20 flex items-center justify-center text-[#dfb86c] flex-shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#dfb86c]">
                {language === 'hi' ? 'प्रामाणिक कैटलॉग एवं व्हाट्सएप बुकिंग:' : 'Catalogue & Direct WhatsApp Order:'}
              </span>{' '}
              {language === 'hi'
                ? 'सभी औषधियां शास्त्रीय ग्रंथों के अनुसार तैयार की जाती हैं। किसी भी विशेष योग हेतु सीधे व्हाट्सएप पर संपर्क करें।'
                : 'All preparations adhere to classical scriptures. For custom decoctions, reach out via WhatsApp.'}
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#86efac] bg-[#031d13] px-3 py-1 rounded-full border border-[#1b5038] flex-shrink-0">
            {language === 'hi' ? 'त्वरित प्रतिक्रिया' : 'Fast Response'}
          </span>
        </div>

        {/* Search, Filter Bar and Sorting Controls */}
        <div className="p-4 sm:p-5 rounded-3xl bg-[#072f20] border border-[#184e36] space-y-4 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-7 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7e998b]" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl bg-[#041d13] border border-[#1c553a] text-[#fcf8f0] placeholder-[#769182] focus:outline-none focus:border-[#dfb86c] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7e998b] hover:text-[#fcf8f0]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sorting Select */}
            <div className="md:col-span-5 flex items-center gap-2 justify-end">
              <div className="relative w-full">
                <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#dfb86c]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full text-xs pl-9 pr-4 py-3 rounded-2xl bg-[#041d13] border border-[#1c553a] text-[#dfb86c] font-semibold focus:outline-none focus:border-[#dfb86c] appearance-none cursor-pointer"
                >
                  <option value="featured">{t('sortFeatured')}</option>
                  <option value="priceAsc">{t('sortPriceAsc')}</option>
                  <option value="priceDesc">{t('sortPriceDesc')}</option>
                  <option value="name">{t('sortName')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <span className="text-[11px] font-semibold text-[#8ca395] flex items-center gap-1 pl-1 flex-shrink-0">
              <Filter className="w-3 h-3 text-[#dfb86c]" />
              <span>{language === 'hi' ? 'श्रेणी:' : 'Category:'}</span>
            </span>

            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#dfb86c] text-[#031d13] shadow-md font-bold'
                      : 'bg-[#041d13] text-[#ded3c1] hover:bg-[#093825] border border-[#1a553a]'
                  }`}
                >
                  {language === 'hi' ? cat.nameHi : cat.nameEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between text-xs text-[#9eb6a9] px-1">
          <div>
            {language === 'hi' ? 'प्रदर्शित औषधियां:' : 'Showing formulations:'}{' '}
            <strong className="text-[#dfb86c]">{filteredProducts.length}</strong>{' '}
            {activeCategoryObj && selectedCategory !== 'all' && (
              <span>({language === 'hi' ? activeCategoryObj.nameHi : activeCategoryObj.nameEn})</span>
            )}
          </div>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="flex items-center gap-1 text-[#dfb86c] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t('resetFilters')}</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-2 border-[#dfb86c] border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs text-[#9eb6a9]">
              {language === 'hi' ? 'आयुर्वेदिक कैटलॉग लोड किया जा रहा है...' : 'Loading formulations...'}
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#06281a] border border-[#164d36] p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#093524] flex items-center justify-center text-[#dfb86c] mx-auto">
              <Search className="w-7 h-7 opacity-60" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#fcf8f0]">
                {t('noProductsFound')}
              </h3>
              <p className="text-xs text-[#9eb6a9] max-w-sm mx-auto">
                {language === 'hi'
                  ? 'कृपया भिन्न शब्द या सभी श्रेणियां चुनकर पुनः प्रयास करें।'
                  : 'Try adjusting your search terms or selecting all categories.'}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="px-5 py-2.5 rounded-full bg-[#dfb86c] text-[#031d13] font-bold text-xs hover:bg-[#ebd08f]"
            >
              {t('resetFilters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
