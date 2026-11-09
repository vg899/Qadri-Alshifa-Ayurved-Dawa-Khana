'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Product, OrderRecord } from '@/types';
import { CATEGORIES } from '@/data/categories';
import { productService } from '@/services/productService';
import { orderService } from '@/services/orderService';
import { authenticationService, AdminUser } from '@/services/authenticationService';
import { isFirebaseConfigured, firebaseConfig } from '@/lib/firebase';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Database,
  RefreshCw,
  ShoppingBag,
  Package,
  Layers,
  LogOut,
  AlertCircle,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductsUpdated: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onProductsUpdated
}) => {
  const { language } = useLanguage();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add' | 'firebase'>('products');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Orders list state
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  // Add Product form state
  const [nameHi, setNameHi] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState('rasayan');
  const [price, setPrice] = useState('299');
  const [originalPrice, setOriginalPrice] = useState('350');
  const [weightOrVolume, setWeightOrVolume] = useState('100g');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80');
  const [stockStatus, setStockStatus] = useState<Product['stockStatus']>('in_stock');
  const [shortDescHi, setShortDescHi] = useState('');
  const [shortDescEn, setShortDescEn] = useState('');
  const [descriptionHi, setDescriptionHi] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [dosageHi, setDosageHi] = useState('1 चम्मच सुबह-शाम गुनगुने पानी के साथ।');
  const [dosageEn, setDosageEn] = useState('1 teaspoon twice daily with warm water.');
  const [ingredientsStr, setIngredientsStr] = useState('आंवला, तुलसी, गिलोय, मुलेठी');
  const [formMsg, setFormMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subscribe to auth state
  useEffect(() => {
    const unsub = authenticationService.subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Fetch orders when tab is clicked
  useEffect(() => {
    if (currentUser && (activeTab === 'orders' || activeTab === 'products')) {
      orderService.getOrders().then(setOrders);
    }
  }, [currentUser, activeTab]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const user = await authenticationService.login(email, password);
      setCurrentUser(user);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setAuthError(error.message || 'लॉगिन असफल रहा।');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDemoQuickLogin = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const user = await authenticationService.login('admin@qadrialshifa.com', 'qadri123');
      setCurrentUser(user);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setAuthError(error.message || 'डेमो लॉगिन असफल रहा।');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await authenticationService.logout();
    setCurrentUser(null);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameHi.trim() || !nameEn.trim()) {
      setFormMsg('कृपया औषधि का नाम हिन्दी एवं अंग्रेजी दोनों में दर्ज करें।');
      return;
    }

    setIsSubmitting(true);
    setFormMsg('');

    try {
      await productService.addProduct({
        nameHi,
        nameEn,
        category,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        weightOrVolume,
        image,
        stockStatus,
        shortDescHi: shortDescHi || nameHi,
        shortDescEn: shortDescEn || nameEn,
        descriptionHi: descriptionHi || shortDescHi || nameHi,
        descriptionEn: descriptionEn || shortDescEn || nameEn,
        dosageHi,
        dosageEn,
        ingredients: ingredientsStr.split(',').map((s) => s.trim()),
        isFeatured: false,
        isDemo: !isFirebaseConfigured(),
        rating: 4.9,
        reviewCount: 1
      });

      setFormMsg('✓ औषधि सफलतापूर्वक जोड़ी गई!');
      onProductsUpdated();
      // Reset form
      setNameHi('');
      setNameEn('');
      setShortDescHi('');
      setShortDescEn('');
      setDescriptionHi('');
      setDescriptionEn('');
      setActiveTab('products');
    } catch {
      setFormMsg('त्रुटि: औषधि जोड़ने में समस्या आई।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('क्या आप वाकई इस औषधि को सूची से हटाना चाहते हैं?')) {
      await productService.deleteProduct(id);
      onProductsUpdated();
    }
  };

  const handleToggleStock = async (product: Product) => {
    const nextStatus: Product['stockStatus'] =
      product.stockStatus === 'in_stock' ? 'out_of_stock' : 'in_stock';
    await productService.updateProduct(product.id, { stockStatus: nextStatus });
    onProductsUpdated();
  };

  const handleResetDemo = () => {
    if (confirm('क्या आप डेमो कैटलॉग को रीसेट करना चाहते हैं?')) {
      productService.resetToDemo();
      onProductsUpdated();
    }
  };

  const fbConfigured = isFirebaseConfigured();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-5xl bg-[#052418] rounded-3xl border border-[#1b5038] shadow-2xl overflow-hidden my-auto text-[#fcf8f0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#041d13] border-b border-[#144733] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dfb86c]/20 border border-[#dfb86c]/40 flex items-center justify-center text-[#dfb86c]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#fcf8f0] font-serif">
                  {language === 'hi' ? 'दवाखाना प्रशासक पोर्टल' : 'Dispensary Admin Portal'}
                </h3>
                {currentUser && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    currentUser.isDemo
                      ? 'bg-amber-950/90 text-amber-300 border border-amber-600/60'
                      : 'bg-emerald-950/90 text-emerald-300 border border-emerald-600/60'
                  }`}>
                    {currentUser.isDemo ? 'डेमो सत्र (Demo Admin)' : 'Firebase Auth Active'}
                  </span>
                )}
              </div>
              <span className="text-xs text-[#9eb6a9]">
                Qadri Alshifa Ayurved Dawa Khana • Bechuwa, Shrawasti
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#093524] text-[#rose-300] hover:bg-[#0e442f] text-xs font-semibold text-rose-300 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">लॉगआउट</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#083020] text-[#9eb6a9] hover:text-[#dfb86c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Logged In -> Show Login Form */}
        {!currentUser ? (
          <div className="p-6 sm:p-10 max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#093524] border border-[#1d573d] mx-auto flex items-center justify-center text-[#dfb86c]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold font-serif text-[#fcf8f0]">
                {language === 'hi' ? 'सुरक्षित प्रशासक लॉगिन' : 'Secure Admin Login'}
              </h4>
              <p className="text-xs text-[#9eb6a9]">
                {language === 'hi'
                  ? 'उत्पाद प्रबंधन, मूल्य निर्धारण एवं ऑर्डर विवरण हेतु अधिकृत लॉगिन।'
                  : 'Restricted area for catalogue, pricing, and order management.'}
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-700/60 text-xs text-rose-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#ded3c1] mb-1">
                  ईमेल पता (Email)
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@qadrialshifa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#031d13] border border-[#1c553a] text-[#fcf8f0] focus:outline-none focus:border-[#dfb86c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#ded3c1] mb-1">
                  पासवर्ड (Password)
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#031d13] border border-[#1c553a] text-[#fcf8f0] focus:outline-none focus:border-[#dfb86c]"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl bg-[#dfb86c] hover:bg-[#ebd08f] text-[#031d13] font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {authLoading ? 'सत्यापित किया जा रहा है...' : 'लॉगिन करें (Sign In)'}
              </button>
            </form>

            {/* Quick Demo Credentials Access for Client Presentation */}
            <div className="pt-4 border-t border-[#123e2a] text-center space-y-2.5">
              <div className="text-[11px] text-[#9eb6a9]">
                ⚡ <strong>ग्राहक / डेमो प्रेजेंटेशन हेतु:</strong>
              </div>
              <button
                type="button"
                onClick={handleDemoQuickLogin}
                className="w-full py-2.5 px-3 rounded-xl bg-[#083020] hover:bg-[#0e442f] text-[#dfb86c] text-xs font-semibold border border-[#20573e] transition-colors"
              >
                एक-क्लिक डेमो एडमिन लॉगिन (email: admin@qadrialshifa.com / pass: qadri123)
              </button>
            </div>
          </div>
        ) : (
          /* Logged In -> Admin Dashboard */
          <div className="p-4 sm:p-6 space-y-6">
            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#144733] pb-3">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#dfb86c] text-[#031d13]'
                    : 'bg-[#083020] text-[#ded3c1] hover:bg-[#0e442f]'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>औषधि सूची ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('add')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'add'
                    ? 'bg-[#dfb86c] text-[#031d13]'
                    : 'bg-[#083020] text-[#ded3c1] hover:bg-[#0e442f]'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>नई औषधि जोड़ें</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-[#dfb86c] text-[#031d13]'
                    : 'bg-[#083020] text-[#ded3c1] hover:bg-[#0e442f]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ऑर्डर रिकॉर्ड्स ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('firebase')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'firebase'
                    ? 'bg-[#dfb86c] text-[#031d13]'
                    : 'bg-[#083020] text-[#ded3c1] hover:bg-[#0e442f]'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Firebase स्थिति</span>
              </button>

              <div className="ml-auto">
                <button
                  onClick={handleResetDemo}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#072a1c] text-[#9eb6a9] hover:text-[#dfb86c] text-[11px] border border-[#1b5038]"
                  title="डेमो कैटलॉग रीसेट करें"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>डेमो रीसेट</span>
                </button>
              </div>
            </div>

            {/* TAB 1: Products Management */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#9eb6a9]">
                  <span>सभी पंजीकृत आयुर्वेदिक उत्पाद व उपलब्धता</span>
                  <span>कुल उत्पाद: {products.length}</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#144733] bg-[#041d13]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#03180f] text-[#dfb86c] uppercase text-[10px] tracking-wider border-b border-[#144733]">
                      <tr>
                        <th className="p-3">औषधि का नाम</th>
                        <th className="p-3">श्रेणी</th>
                        <th className="p-3">मूल्य</th>
                        <th className="p-3">स्टॉक स्थिति</th>
                        <th className="p-3 text-right">क्रियाएं</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#123e2a]">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-[#072d1f]/60 transition-colors">
                          <td className="p-3">
                            <div className="font-bold text-[#fcf8f0]">{p.nameHi}</div>
                            <div className="text-[10px] text-[#9eb6a9] italic">{p.nameEn}</div>
                          </td>
                          <td className="p-3 text-[#b8ccbf]">
                            <span className="capitalize">{p.category}</span>
                            <div className="text-[10px] text-[#769182]">{p.weightOrVolume}</div>
                          </td>
                          <td className="p-3 font-bold text-[#dfb86c]">
                            ₹{p.price}
                            {p.originalPrice && (
                              <span className="text-[10px] text-[#769182] line-through ml-1">
                                ₹{p.originalPrice}
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleToggleStock(p)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold cursor-pointer ${
                                p.stockStatus === 'in_stock'
                                  ? 'bg-[#0f442c] text-[#86efac] border border-[#1e6b47]'
                                  : 'bg-rose-950/80 text-rose-300 border border-rose-700/60'
                              }`}
                            >
                              {p.stockStatus === 'in_stock' ? 'उपलब्ध (In Stock)' : 'स्टॉक समाप्त'}
                            </button>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 text-[#7e998b] hover:text-rose-400 transition-colors"
                              title="हटाएं"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: Add New Product */}
            {activeTab === 'add' && (
              <form onSubmit={handleAddProduct} className="space-y-4 max-w-2xl bg-[#041d13] p-5 rounded-2xl border border-[#144733]">
                <h4 className="text-sm font-bold text-[#dfb86c]">
                  नई आयुर्वेदिक औषधि जोड़ें
                </h4>

                {formMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-xs text-emerald-200">
                    {formMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#ded3c1] mb-1">
                      नाम (हिन्दी में) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. शाही च्यवनप्राश"
                      value={nameHi}
                      onChange={(e) => setNameHi(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-[#03180f] border border-[#1c553a] text-[#fcf8f0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#ded3c1] mb-1">
                      Name (in English) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shahi Chyawanprash Gold"
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-[#03180f] border border-[#1c553a] text-[#fcf8f0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#ded3c1] mb-1">
                      श्रेणी (Category)
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-[#03180f] border border-[#1c553a] text-[#fcf8f0]"
                    >
                      {CATEGORIES.filter((c) => c.slug !== 'all').map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.nameHi} ({c.nameEn})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#ded3c1] mb-1">
                      मूल्य (₹ Price)
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-[#03180f] border border-[#1c553a] text-[#fcf8f0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#ded3c1] mb-1">
                      वजन / पैकिंग (Pack Size)
                    </label>
                    <input
                      type="text"
                      placeholder="100g / 200ml"
                      value={weightOrVolume}
                      onChange={(e) => setWeightOrVolume(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-[#03180f] border border-[#1c553a] text-[#fcf8f0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#ded3c1] mb-1">
                    औषधि छवि URL (Product Image URL)
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-[#03180f] border border-[#1c553a] text-[#fcf8f0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#ded3c1] mb-1">
                    संक्षिप्त परिचय (हिन्दी)
                  </label>
                  <input
                    type="text"
                    placeholder="औषधि के मुख्य लाभ एक पंक्ति में..."
                    value={shortDescHi}
                    onChange={(e) => setShortDescHi(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-[#03180f] border border-[#1c553a] text-[#fcf8f0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#ded3c1] mb-1">
                    प्रमुख घटक (कॉमा लगाकर लिखें)
                  </label>
                  <input
                    type="text"
                    placeholder="आंवला, केसर, अश्वगंधा, पिप्पली"
                    value={ingredientsStr}
                    onChange={(e) => setIngredientsStr(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-[#03180f] border border-[#1c553a] text-[#fcf8f0]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2.5 px-6 rounded-xl bg-[#dfb86c] text-[#031d13] font-bold text-xs hover:bg-[#ebd08f] transition-all cursor-pointer"
                >
                  {isSubmitting ? 'जोड़ा जा रहा है...' : 'औषधि प्रकाशित करें (Save Product)'}
                </button>
              </form>
            )}

            {/* TAB 3: Orders List */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="text-xs text-[#9eb6a9]">
                  हाल ही में दर्ज किए गए ग्राहक ऑर्डर व व्हाट्सएप पूछताछ रिकॉर्ड
                </div>

                {orders.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#9eb6a9]">
                    अभी कोई ऑर्डर रिकॉर्ड नहीं है।
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-2xl bg-[#041d13] border border-[#144733] space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#fcf8f0]">
                            {ord.customerName}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#093524] text-[#dfb86c] border border-[#1f5a3e] uppercase">
                            {ord.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#b8ccbf]">
                          फ़ोन: {ord.customerPhone} • पता: {ord.deliveryAddress}
                        </div>
                        <div className="text-xs text-[#ded3c1] font-medium">
                          आइटम्स: {ord.items.map((i) => `${i.productName} (${i.quantity})`).join(', ')}
                        </div>
                        <div className="text-xs font-black text-[#dfb86c]">
                          कुल राशि: ₹{ord.totalAmount}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Firebase Configuration Status */}
            {activeTab === 'firebase' && (
              <div className="space-y-4 max-w-2xl bg-[#041d13] p-5 rounded-2xl border border-[#144733]">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#dfb86c]" />
                  <h4 className="text-sm font-bold text-[#fcf8f0]">
                    Firebase इन्फ्रास्ट्रक्चर स्थिति
                  </h4>
                </div>

                <div className={`p-3 rounded-xl border text-xs ${
                  fbConfigured
                    ? 'bg-emerald-950/80 border-emerald-700/60 text-emerald-200'
                    : 'bg-amber-950/80 border-amber-700/60 text-amber-200'
                }`}>
                  <div className="font-bold">
                    {fbConfigured
                      ? '✓ Firebase पूर्ण रूप से सक्रिय एवं कनेक्टेड है'
                      : '⚡ डेमो मोड सक्रिय (Local Fallback Mode Active)'}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed">
                    {fbConfigured
                      ? 'क्लाउड फायरस्टोर और फायरबेस प्रमाणीकरण लाइव डेटाबेस से सीधे जुड़े हैं।'
                      : 'वेबसाइट क्लाइंट डेमो मोड में सुचारू रूप से कार्य कर रही है। उत्पाद एवं ऑर्डर स्थानीय रूप से सुरक्षित हैं।'}
                  </p>
                </div>

                <div className="text-xs text-[#b8ccbf] space-y-2">
                  <div className="font-bold text-[#dfb86c]">Firebase कनेक्ट करने की विधि:</div>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px]">
                    <li>Firebase Console में नया प्रोजेक्ट बनाएं: <code className="text-[#dfb86c]">qadri-alshifa</code></li>
                    <li>Authentication (Email/Password) एवं Cloud Firestore सक्रिय करें।</li>
                    <li>प्रोजेक्ट सेटिंग्स से वेब कॉन्फ़िग प्राप्त कर <code className="text-[#dfb86c]">.env</code> में दर्ज करें:
                      <pre className="bg-[#02140d] p-2 rounded mt-1 text-[10px] text-[#86efac] overflow-x-auto">
NEXT_PUBLIC_FIREBASE_API_KEY=&quot;your-api-key&quot;
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=&quot;your-project.firebaseapp.com&quot;
NEXT_PUBLIC_FIREBASE_PROJECT_ID=&quot;your-project&quot;
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=&quot;your-project.appspot.com&quot;
                      </pre>
                    </li>
                    <li>सुरक्षित नियम <code className="text-[#dfb86c]">firebase/firestore.rules</code> पहले से तैयार हैं।</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
