'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
  lastAddedProduct: Product | null;
  resetLastAdded: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('qadri_cart');
        if (savedCart) {
          return JSON.parse(savedCart);
        }
      } catch {
        // ignore
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('qadri_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    setLastAddedProduct(product);
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const resetLastAdded = () => setLastAddedProduct(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
        lastAddedProduct,
        resetLastAdded
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
