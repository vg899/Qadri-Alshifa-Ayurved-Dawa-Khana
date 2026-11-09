import { OrderRecord } from '@/types';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';

const LOCAL_ORDERS_KEY = 'qadri_order_records';

const SAMPLE_INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ord-101',
    customerName: 'अब्दुल हमीद (Abdul Hamid)',
    customerPhone: '+91 94150 XXXXX',
    deliveryAddress: 'ग्राम बेचुआ, श्रावस्ती (Bechuwa, Shrawasti)',
    notes: 'शाही च्यवनप्राश और अश्वगंधा चूर्ण',
    items: [
      { productId: 'demo-1', productName: 'शाही च्यवनप्राश गोल्ड', quantity: 1, price: 490 },
      { productId: 'demo-3', productName: 'शुद्ध नागौरी अश्वगंधा चूर्ण', quantity: 1, price: 210 }
    ],
    totalAmount: 700,
    status: 'delivered',
    createdAt: '2025-02-08T10:30:00Z'
  },
  {
    id: 'ord-102',
    customerName: 'सुरेश कुमार त्रिपाठी (Suresh Tripathi)',
    customerPhone: '+91 98390 XXXXX',
    deliveryAddress: 'भिनगा रोड, श्रावस्ती (Bhinga Road, Shrawasti)',
    notes: 'घुटने के दर्द हेतु महा-नारायण तेल',
    items: [
      { productId: 'demo-2', productName: 'अलशिफ़ा महा-नारायण दर्द निवारक तैलम', quantity: 2, price: 280 }
    ],
    totalAmount: 560,
    status: 'confirmed',
    createdAt: '2025-02-09T14:15:00Z'
  }
];

function getStoredOrders(): OrderRecord[] {
  if (typeof window === 'undefined') return SAMPLE_INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(LOCAL_ORDERS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return SAMPLE_INITIAL_ORDERS;
}

function saveStoredOrders(orders: OrderRecord[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // ignore
  }
}

export const orderService = {
  async createOrderRecord(order: Omit<OrderRecord, 'id' | 'createdAt'>): Promise<OrderRecord> {
    const newRecord: OrderRecord = {
      ...order,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured() && db) {
      try {
        const colRef = collection(db, 'orders');
        const docRef = await addDoc(colRef, newRecord);
        return { ...newRecord, id: docRef.id };
      } catch (err) {
        console.warn('Firestore order recording failed, storing locally:', err);
      }
    }

    const current = getStoredOrders();
    const updated = [newRecord, ...current];
    saveStoredOrders(updated);
    return newRecord;
  },

  async getOrders(): Promise<OrderRecord[]> {
    if (isFirebaseConfigured() && db) {
      try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const list: OrderRecord[] = [];
          querySnapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<OrderRecord, 'id'>) });
          });
          return list;
        }
      } catch (err) {
        console.warn('Firestore orders fetch failed:', err);
      }
    }

    return getStoredOrders();
  },

  async updateOrderStatus(id: string, status: OrderRecord['status']): Promise<void> {
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, 'orders', id);
        await updateDoc(docRef, { status });
        return;
      } catch (err) {
        console.warn('Firestore update order status failed:', err);
      }
    }

    const current = getStoredOrders();
    const updated = current.map((ord) => (ord.id === id ? { ...ord, status } : ord));
    saveStoredOrders(updated);
  }
};
