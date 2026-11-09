# Qadri Alshifa Ayurved Dawa Khana (क़ादरी अलशिफ़ा आयुर्वेद दवाखाना)

> **"परंपरा का विश्वास, आयुर्वेद की पहचान।"**
> *Trust in Tradition, the True Identity of Ayurveda.*

A luxury, production-grade Ayurvedic e-commerce and business website for **Qadri Alshifa Ayurved Dawa Khana**, located in **Bechuwa, Shrawasti, Uttar Pradesh, India**.

Designed with deep forest green, rich emerald, champagne gold, and warm ivory botanical aesthetics. Engineered for high conversion with a seamless, itemized **WhatsApp Ordering System** (+91 63938 80986), bilingual Hindi + English interfaces, consultation scheduling, and integrated Firebase Cloud Firestore and Authentication.

---

## 🌿 Business Information

- **Dispensary Name:** Qadri Alshifa Ayurved Dawa Khana (क़ादरी अलशिफ़ा आयुर्वेद दवाखाना)
- **Category:** Ayurvedic Medicines, Natural Tailams & Classical Formulations
- **Address:** Bechuwa, Shrawasti, Uttar Pradesh, India
- **Phone:** [+91 63938 80986](tel:+916393880986)
- **WhatsApp:** [+91 63938 80986](https://wa.me/916393880986)
- **Consultation Hours:** Mon - Sun: 09:00 AM - 08:30 PM (IST)
- **Primary Languages:** Hindi (Default) and English

---

## ✨ Features & Architecture

1. **Editorial Luxury Wellness Design**
   - High-fidelity botanical hero imagery, gold accents, and serif typography.
   - 100% responsive across mobile, tablet, and desktop viewports.
   - Floating fast-action WhatsApp button with real-time indicators.

2. **WhatsApp Ordering Engine**
   - Interactive shopping cart with quantity modifiers, subtotal calculations, and optional patient notes.
   - Generates beautifully formatted, URL-encoded WhatsApp messages itemizing products, pack sizes, and total amounts.
   - Quick single-product 1-click WhatsApp inquiry on every medicine card.

3. **Bilingual Hindi (हिन्दी) + English System**
   - Full bilingual interface with Hindi as the default language.
   - One-click language switcher with persistent user preference in `localStorage`.
   - Dual-language product names, descriptions, dosages (सेवन विधि), and ingredients.

4. **Ayurvedic Service Pricing & Consultation Packages**
   - Starter Dosha & Health Assessment (₹199)
   - Chronic Ailment & Custom Regimen (₹399) - Most Recommended
   - Seasonal Detox & Rejuvenation Care (₹699)
   - Real patient experiences and feedback from Shrawasti, Balrampur, and Bahraich.

5. **Firebase Integration & Resilient Demo Mode**
   - Built on Cloud Firestore (`/products`, `/categories`, `/orders`) and Firebase Authentication.
   - **Out-of-the-Box Demo Mode:** Works immediately with rich classical demo formulations even before Firebase keys are entered.
   - Protected Admin Portal for adding medicines, toggling stock availability, editing prices, and viewing inquiries.
   - Admin Demo Login: `admin@qadrialshifa.com` / `qadri123`.

6. **Security & Privacy**
   - Hardened `firestore.rules` and `storage.rules`.
   - No hardcoded private keys or service account credentials.
   - All customer WhatsApp inquiries remain confidential.

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

```bash
# Clone the repository
git clone https://github.com/your-username/qadri-alshifa.git
cd qadri-alshifa

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🔑 Firebase Setup Instructions

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project named `qadri-alshifa`.
2. Enable **Authentication** with Email/Password provider.
3. Enable **Cloud Firestore** in production mode.
4. Copy the environment variables into your local `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="qadri-alshifa.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="qadri-alshifa"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="qadri-alshifa.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
```

5. Deploy the security rules using Firebase CLI:
```bash
firebase deploy --only firestore:rules,storage
```

---

## 📦 How to Add & Manage Products

1. Click the **Lock Icon (🔒)** in the top navigation header to open the **Admin Portal**.
2. Sign in using your Firebase Admin account or click **Demo Admin Login** (`admin@qadrialshifa.com` / `qadri123`).
3. Click the **नई औषधि जोड़ें (Add Product)** tab:
   - Enter name in Hindi and English
   - Select category (Rasayan, Tailam, Churna, Syrups)
   - Set price (₹) and pack size (e.g., 500g, 100ml)
   - Add image URL and herbal ingredients
   - Click **Save Product**
4. The new formulation will immediately appear in the live catalogue and be available for WhatsApp ordering.

---

## 🌐 GitHub Pages Deployment

To deploy this project to GitHub Pages:

1. Update `next.config.ts` for static export if deploying purely static:
   ```typescript
   output: 'export',
   basePath: '/qadri-alshifa', // your repository name
   ```
2. Build the static site:
   ```bash
   npm run build
   ```
3. The generated `out/` folder can be deployed via GitHub Actions using the standard Next.js GitHub Pages workflow (`.github/workflows/deploy.yml`).

---

## ⚖️ Statutory Ayurvedic Disclaimer

Information presented on this website is for educational and traditional awareness. Customers are advised to consult a qualified Ayurvedic physician for specific chronic illnesses. Classical demo formulations are for illustration; all orders are verified and confirmed by Qadri Alshifa dispensary staff via WhatsApp.
