import { Product } from '@/types';
import { DEMO_PRODUCTS } from '@/data/demoProducts';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  orderBy
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'qadri_custom_products';

// Helper to fetch local override products
function getLocalProducts(): Product[] {
  if (typeof window === 'undefined') return DEMO_PRODUCTS;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed reading products from localStorage:', e);
  }
  return DEMO_PRODUCTS;
}

function saveLocalProducts(products: Product[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed saving products to localStorage:', e);
  }
}

export const productService = {
  /**
   * Fetch all products from Firestore or local fallback
   */
  async getAllProducts(): Promise<{ products: Product[]; source: 'firestore' | 'demo' }> {
    if (isFirebaseConfigured() && db) {
      try {
        const q = query(collection(db, 'products'), orderBy('price', 'asc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const products: Product[] = [];
          querySnapshot.forEach((docSnap) => {
            products.push({ id: docSnap.id, ...(docSnap.data() as Omit<Product, 'id'>) });
          });
          return { products, source: 'firestore' };
        }
      } catch (err) {
        console.warn('Firestore fetch failed, falling back to demo catalog:', err);
      }
    }

    // Fallback to local demo repository
    return { products: getLocalProducts(), source: 'demo' };
  },

  /**
   * Get single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { id: docSnap.id, ...(docSnap.data() as Omit<Product, 'id'>) };
        }
      } catch (err) {
        console.warn('Firestore single product fetch failed:', err);
      }
    }

    const localList = getLocalProducts();
    return localList.find((p) => p.id === id) || null;
  },

  /**
   * Add new product
   */
  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const sanitizedProduct: Omit<Product, 'id'> = {
      ...product,
      nameHi: product.nameHi.trim(),
      nameEn: product.nameEn.trim(),
      price: Math.max(0, Number(product.price)),
      originalPrice: product.originalPrice ? Math.max(0, Number(product.originalPrice)) : undefined,
      descriptionHi: product.descriptionHi.trim(),
      descriptionEn: product.descriptionEn.trim(),
      shortDescHi: product.shortDescHi.trim(),
      shortDescEn: product.shortDescEn.trim(),
      dosageHi: product.dosageHi.trim(),
      dosageEn: product.dosageEn.trim(),
      ingredients: product.ingredients.map((i) => i.trim()).filter(Boolean),
      image: product.image.trim() || 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
      weightOrVolume: product.weightOrVolume.trim() || '100g'
    };

    if (isFirebaseConfigured() && db) {
      try {
        const colRef = collection(db, 'products');
        const newDocRef = doc(colRef);
        await setDoc(newDocRef, sanitizedProduct);
        return { id: newDocRef.id, ...sanitizedProduct };
      } catch (err) {
        console.warn('Firestore add product failed, saving locally:', err);
      }
    }

    // Local state save
    const currentList = getLocalProducts();
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = { id: newId, ...sanitizedProduct };
    saveLocalProducts([newProduct, ...currentList]);
    return newProduct;
  },

  /**
   * Update existing product
   */
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, updates);
        const updated = await getDoc(docRef);
        return { id: updated.id, ...(updated.data() as Omit<Product, 'id'>) };
      } catch (err) {
        console.warn('Firestore update failed, updating locally:', err);
      }
    }

    const currentList = getLocalProducts();
    const index = currentList.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const updatedProduct = { ...currentList[index], ...updates };
    currentList[index] = updatedProduct;
    saveLocalProducts([...currentList]);
    return updatedProduct;
  },

  /**
   * Delete product
   */
  async deleteProduct(id: string): Promise<boolean> {
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
        return true;
      } catch (err) {
        console.warn('Firestore delete failed, deleting locally:', err);
      }
    }

    const currentList = getLocalProducts();
    const filtered = currentList.filter((p) => p.id !== id);
    saveLocalProducts(filtered);
    return true;
  },

  /**
   * Reset local storage to default demo catalog
   */
  resetToDemo(): Product[] {
    saveLocalProducts(DEMO_PRODUCTS);
    return DEMO_PRODUCTS;
  }
};
