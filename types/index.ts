export interface Product {
  id: string;
  nameHi: string;
  nameEn: string;
  category: string;
  price: number;
  originalPrice?: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  descriptionHi: string;
  descriptionEn: string;
  shortDescHi: string;
  shortDescEn: string;
  dosageHi: string;
  dosageEn: string;
  ingredients: string[];
  image: string;
  isFeatured?: boolean;
  isDemo: boolean;
  rating?: number;
  reviewCount?: number;
  weightOrVolume: string;
  badgeHi?: string;
  badgeEn?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  nameHi: string;
  nameEn: string;
  slug: string;
  descriptionHi: string;
  descriptionEn: string;
  iconName: string;
  image: string;
}

export interface ServicePricing {
  id: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  durationHi: string;
  durationEn: string;
  price: number;
  originalPrice?: number;
  includesHi: string[];
  includesEn: string[];
  badgeHi?: string;
  badgeEn?: string;
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  conditionHi: string;
  conditionEn: string;
  quoteHi: string;
  quoteEn: string;
  rating: number;
  date: string;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled';
  createdAt: string;
}
