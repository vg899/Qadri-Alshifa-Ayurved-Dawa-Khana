'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { buildCartOrderWhatsAppUrl, CheckoutDetails } from '@/utils/whatsapp';
import { orderService } from '@/services/orderService';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    closeCart,
    totalPrice,
    totalItems
  } = useCart();
  const { language, t } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = async () => {
    if (items.length === 0) return;

    setIsSubmitting(true);
    const details: CheckoutDetails = {
      customerName,
      customerPhone,
      deliveryAddress,
      notes
    };

    // Save order record in backend / local state for store visibility
    try {
      await orderService.createOrderRecord({
        customerName: customerName || (language === 'hi' ? 'व्हाट्सएप ग्राहक' : 'WhatsApp Customer'),
        customerPhone: customerPhone || 'WhatsApp Chat',
        deliveryAddress: deliveryAddress || 'Pending Confirmation via WhatsApp',
        notes: notes || undefined,
        items: items.map((i) => ({
          productId: i.product.id,
          productName: language === 'hi' ? i.product.nameHi : i.product.nameEn,
          quantity: i.quantity,
          price: i.product.price
        })),
        totalAmount: totalPrice,
        status: 'pending'
      });
    } catch (e) {
      console.warn('Failed recording order internally:', e);
    } finally {
      setIsSubmitting(false);
    }

    // Build properly formatted URL and open WhatsApp
    const waUrl = buildCartOrderWhatsAppUrl(items, totalPrice, details, language);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={closeCart} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#052418] border-l border-[#1b5038] shadow-2xl flex flex-col justify-between text-[#fcf8f0]">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#144733] flex items-center justify-between bg-[#041d13]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#dfb86c]/15 border border-[#dfb86c]/30 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#dfb86c]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#fcf8f0] font-serif">
                  {t('cartTitle')}
                </h3>
                <span className="text-xs text-[#9eb6a9]">
                  {totalItems} {language === 'hi' ? 'औषधियां जोड़ी गईं' : 'formulations selected'}
                </span>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-[#083020] text-[#9eb6a9] hover:text-[#dfb86c] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Items or Empty State */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#083020] border border-[#144733] flex items-center justify-center text-[#dfb86c]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#fcf8f0]">
                    {t('cartEmpty')}
                  </h4>
                  <p className="text-xs text-[#9eb6a9] max-w-xs">
                    {t('cartEmptySub')}
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-full bg-[#dfb86c] text-[#041d13] font-bold text-xs hover:bg-[#ebd08f] transition-all"
                >
                  {language === 'hi' ? 'औषधि कैटलॉग देखें' : 'Browse Medicines'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Clear Cart link */}
                <div className="flex justify-between items-center text-xs text-[#9eb6a9] pb-1">
                  <span>{t('itemsInCart')}</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-400 hover:text-rose-300 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{t('clearCart')}</span>
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="p-3 rounded-2xl bg-[#072d1f] border border-[#164d36] flex gap-3 items-center"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#041b12] flex-shrink-0 border border-[#1f5a3e]">
                        <Image
                          src={product.image}
                          alt={product.nameEn}
                          fill
                          className="object-cover"
                          sizes="64px"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#fcf8f0] line-clamp-1">
                          {language === 'hi' ? product.nameHi : product.nameEn}
                        </h4>
                        <div className="text-[10px] text-[#9eb6a9]">
                          {product.weightOrVolume} • ₹{product.price}
                        </div>
                        <div className="text-xs font-black text-[#dfb86c] mt-0.5">
                          ₹{product.price * quantity}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-[#041d13] p-1 rounded-lg border border-[#1d573d]">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#dfb86c] hover:bg-[#0a3824] transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#fcf8f0]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#dfb86c] hover:bg-[#0a3824] transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-1.5 text-[#7e998b] hover:text-rose-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Optional Customer Information Form */}
                <div className="pt-3 border-t border-[#144733] space-y-3">
                  <span className="text-xs font-bold text-[#dfb86c] block">
                    {language === 'hi' ? 'डिलीवरी विवरण (वैकल्पिक)' : 'Delivery Details (Optional)'}
                  </span>

                  <div>
                    <input
                      type="text"
                      placeholder={t('customerNameOptional')}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-[#041d13] border border-[#1a553a] text-[#fcf8f0] placeholder-[#738e80] focus:outline-none focus:border-[#dfb86c]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder={language === 'hi' ? 'फोन नंबर (वैकल्पिक)' : 'Phone Number (Optional)'}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-[#041d13] border border-[#1a553a] text-[#fcf8f0] placeholder-[#738e80] focus:outline-none focus:border-[#dfb86c]"
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder={t('deliveryAddressOptional')}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={2}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-[#041d13] border border-[#1a553a] text-[#fcf8f0] placeholder-[#738e80] focus:outline-none focus:border-[#dfb86c] resize-none"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder={t('additionalNotesOptional')}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-[#041d13] border border-[#1a553a] text-[#fcf8f0] placeholder-[#738e80] focus:outline-none focus:border-[#dfb86c]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer: Subtotal & WhatsApp Checkout button */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#041b12] border-t border-[#144733] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9eb6a9] font-medium">
                  {t('subtotal')}
                </span>
                <span className="text-2xl font-black text-[#dfb86c]">
                  ₹{totalPrice}
                </span>
              </div>

              {/* Order Disclaimer Note */}
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#073020] border border-[#19553b] text-[11px] text-[#b8ccbf]">
                <ShieldAlert className="w-3.5 h-3.5 text-[#dfb86c] flex-shrink-0 mt-0.5" />
                <p className="leading-snug">
                  {t('checkoutNotice')}
                </p>
              </div>

              {/* Checkout on WhatsApp */}
              <button
                onClick={handleWhatsAppCheckout}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#166534] to-[#15803d] hover:from-[#15803d] hover:to-[#16a34a] text-white font-bold text-sm shadow-xl transition-all cursor-pointer group"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#166534]" />
                <span>{t('checkoutWhatsapp')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
