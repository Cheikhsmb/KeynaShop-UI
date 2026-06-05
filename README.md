# Keyna Shop - Architecture Guide

## Overview

Keyna Shop is a modern, multi-language e-commerce platform built with React, TypeScript, and Vite. It integrates with Shopify's Storefront API to manage products and inventory while providing a responsive, accessible UI powered by Shadcn UI components.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18 + TypeScript | Component-based UI with type safety |
| **Build Tool** | Vite | Fast development and optimized builds |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **UI Components** | Shadcn UI + Radix UI | Pre-built, accessible components |
| **State Management** | Zustand | Lightweight, persistent cart state |
| **Routing** | React Router v6 | Client-side navigation |
| **Data Fetching** | React Query (@tanstack/react-query) | Server state management |
| **Backend Integration** | Shopify Storefront API | Product catalog & e-commerce operations |
| **i18n** | Custom Context API | Multi-language support (EN, FR, AR) |
| **Testing** | Vitest | Unit and integration testing |

---

## Project Structure

```
src/
├── App.tsx                 # Root app component with routing setup
├── main.tsx                # Application entry point
├── index.css               # Global styles
├── App.css                 # App-specific styles
│
├── components/             # Reusable React components
│   ├── HeroSection.tsx     # Landing page hero
│   ├── Navbar.tsx          # Navigation header
│   ├── CartDrawer.tsx      # Shopping cart sidebar
│   ├── BestSellersSection.tsx
│   ├── NewArrivalsSection.tsx
│   ├── CollectionsSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── AboutSection.tsx
│   ├── NewsletterSection.tsx
│   ├── FooterSection.tsx
│   ├── WhatsAppButton.tsx  # WhatsApp contact button
│   └── ui/                 # Shadcn UI component library
│       ├── button.tsx, card.tsx, dialog.tsx, etc.
│       └── use-toast.ts    # Toast notification hook
│
├── pages/                  # Page components for routing
│   ├── Index.tsx           # Home page
│   ├── Shop.tsx            # Product listing page
│   ├── ProductDetail.tsx   # Individual product page
│   ├── About.tsx           # About page
│   ├── Contact.tsx         # Contact page
│   ├── FAQ.tsx             # FAQ page
│   ├── Delivery.tsx        # Delivery info page
│   └── NotFound.tsx        # 404 page
│
├── stores/                 # State management
│   └── cartStore.ts        # Zustand cart store with persistence
│
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx      # Mobile device detection
│   ├── use-toast.ts        # Toast notification hook
│   └── useCartSync.ts      # Cart synchronization logic
│
├── i18n/                   # Internationalization
│   ├── LanguageContext.tsx # Language state & provider
│   └── translations.ts     # Translation strings (EN, FR, AR)
│
├── lib/                    # Utility functions & API clients
│   ├── shopify.tsx         # Shopify Storefront API integration
│   └── utils.ts            # Common utility functions
│
└── data/                   # Static & mock data
    └── products.ts         # Product data types & samples
```

---

## Architecture Layers

### 1. **Presentation Layer** (`src/components/` & `src/pages/`)

- **Page Components**: Correspond to routes and handle page-level logic
- **Section Components**: Reusable sections composing pages (HeroSection, BestSellersSection, etc.)
- **UI Components**: Atomic, style-less components from Shadcn UI

**Example Component Flow**:
```
pages/Shop.tsx
  └── Renders shop layout
      ├── Navbar (from components)
      ├── ProductGrid (displays products from data)
      └── FooterSection
```

### 2. **State Management Layer**

#### **Global State** (`src/stores/cartStore.ts`)
Uses **Zustand** with persistence middleware:
- Manages shopping cart items
- Persists cart to localStorage
- Provides methods: `addItem()`, `updateQuantity()`, `removeItem()`, `clearCart()`

```typescript
// Usage in components
const items = useCartStore((state) => state.items);
useCartStore.setState({ items: [] }); // Direct updates
```

#### **UI Context State** (`src/i18n/LanguageContext.tsx`)
Manages application language:
- Supported languages: EN, FR, AR
- Persists language preference to localStorage
- Provides `t()` function for translations
- Handles RTL layout for Arabic

### 3. **API Integration Layer** (`src/lib/shopify.tsx`)

**Shopify Storefront API** integration:
- GraphQL-based queries for products, collections, variants
- Handles authentication via Storefront Access Token
- Returns typed responses (`ShopifyProduct`, etc.)

```typescript
// Configuration
SHOPIFY_API_VERSION: '2025-07'
SHOPIFY_STORE: 'my-biz-build-05-ulpkp.myshopify.com'
SHOPIFY_STOREFRONT_TOKEN: '05e1b861435b5704aa5bd4e204aa9942'
```

### 4. **Data Fetching Layer** (`@tanstack/react-query`)

Handles server state management:
- Caches API responses
- Automatic refetching and synchronization
- Used for product data, inventory, pricing

### 5. **Routing Layer** (`src/App.tsx`)

**React Router v6** configuration:
```
/ → Index (home)
/shop → Shop (product listing)
/product/:handle → ProductDetail (individual product)
/about → About
/contact → Contact
/faq → FAQ
/delivery → Delivery
* → NotFound (404)
```

---

## Data Flow

### **Product Display**
```
Shopify Storefront API
    ↓
React Query (fetch & cache)
    ↓
ProductDetail.tsx / Shop.tsx (consume via hook)
    ↓
Render UI Components (card, button, etc.)
```

### **Shopping Cart**
```
User clicks "Add to Cart"
    ↓
CartDrawer.tsx dispatches action
    ↓
useCartStore.addItem() 
    ↓
Zustand updates state + localStorage
    ↓
UI re-renders with updated cart
```

### **Language Switching**
```
User selects language
    ↓
LanguageContext.setLang()
    ↓
localStorage updated + RTL applied
    ↓
Components use t() to display translated text
    ↓
UI re-renders with new language
```

---

## Key Features & Implementations

### **1. Multi-Language Support**
- Stored in [src/i18n/translations.ts](src/i18n/translations.ts)
- Languages: French (FR), English (EN), Arabic (AR)
- RTL support for Arabic
- Persisted in localStorage as `keyna-lang`

### **2. Shopping Cart**
- Persistent cart using Zustand + localStorage
- Tracks product variants, quantities, and pricing in FCFA
- Accessible via `useCartStore` hook across the app

### **3. Shopify Integration**
- Fetches live product data, images, and pricing
- Handles product variants and availability
- GraphQL queries for efficient data retrieval

### **4. Responsive Design**
- Tailwind CSS breakpoints (mobile-first)
- `use-mobile` hook for mobile-specific logic
- Shadcn UI components handle accessibility (Radix UI)

### **5. UI/UX Enhancements**
- Toast notifications (Sonner library)
- Tooltips via Radix UI
- Smooth animations with Framer Motion
- Carousel for image/collection display

---

## Development Setup

### **Prerequisites**
- Node.js (v16+) & npm/bun
- Shopify Storefront API credentials

### **Installation**
```sh
# Clone repository
git clone <YOUR_GIT_URL>
cd Keyna-DEV

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

### **Configuration**
Update Shopify credentials in [src/lib/shopify.tsx](src/lib/shopify.tsx):
```typescript
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'your-store.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = 'your-token';
```

---

## Build & Deployment

### **Development Mode**
```sh
npm run dev
# Runs on http://localhost:8080 with HMR
```

### **Production Build**
```sh
npm run build
# Output: dist/
# Optimized, minified, tree-shaken bundle
```

### **Preview Built App**
```sh
npm run preview
# Test production build locally
```

---

## Testing

### **Unit Tests**
Framework: **Vitest**
```sh
npm run test         # Run tests once
npm run test:watch   # Watch mode
```

Test files in [src/test/](src/test/):
- [src/test/example.test.ts](src/test/example.test.ts)
- [src/test/setup.ts](src/test/setup.ts)

---

## Performance Optimizations

1. **Code Splitting**: Vite automatically chunks code per route
2. **Lazy Loading**: React Router enables route-based code splitting
3. **Image Optimization**: Shopify CDN serves optimized product images
4. **Caching**: React Query caches API responses
5. **State Persistence**: Zustand with localStorage for cart

---

## Security

- **Storefront Token**: Used for read-only Shopify API access
- **Environment Variables**: Credentials stored in code (consider moving to `.env`)
- **No Sensitive Data**: Cart and language preferences stored client-side only

---

## Future Considerations

- [ ] Move Shopify credentials to environment variables
- [ ] Implement user authentication (accounts, wishlist)
- [ ] Add payment gateway integration (Stripe, PayPal, Wave)
- [ ] Implement analytics tracking
- [ ] Add SEO optimization (meta tags, structured data)
- [ ] Admin dashboard for inventory management
- [ ] Automated email notifications for orders

---

## File Reference Guide

| File | Purpose |
|------|---------|
| [src/App.tsx](src/App.tsx) | Root component with routing config |
| [src/lib/shopify.tsx](src/lib/shopify.tsx) | Shopify API integration |
| [src/stores/cartStore.ts](src/stores/cartStore.ts) | Cart state management |
| [src/i18n/LanguageContext.tsx](src/i18n/LanguageContext.tsx) | Multi-language support |
| [tailwind.config.ts](tailwind.config.ts) | Tailwind theme configuration |
| [vite.config.ts](vite.config.ts) | Vite build configuration |

---

## Support & Contributing

For questions about the architecture or contributing changes:
1. Review relevant section above
2. Check component prop types in TypeScript files
3. Refer to library documentation (React, Shadcn UI, Zustand)
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
