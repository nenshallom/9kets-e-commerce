# 9kets E-Commerce Assessment

A modern, responsive e-commerce application built with **Next.js 16 (App Router)** and **Tailwind CSS**. This project focuses on clean architecture, visual stability, and a seamless user experience across devices.

## 🚀 Live Demo
[https://9kets.netlify.app/]

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + Custom Fonts (Lufga)
- **State Management:** React Context API (Cart functionality)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Deployment:** Netlify

## ✨ Key Features
- **Responsive Design:** Fully fluid layouts with mobile-first navigation (Drawer Menu) and desktop adaptations.
- **Product Filtering:** URL-based filtering (Category & Price) ensures shareable links and browser history support.
- **Cart System:** Global state management for adding/removing items, preventing duplicates, and calculating totals.
- **Performance:** - `Suspense` boundaries for data fetching.
  - `next/font` for zero layout shift.
  - optimized images using `next/image`.
- **UX Details:** - Interactive "Add to Cart" / "Remove from Cart" toggle.
  - Smart Pagination (scrolls to top of grid, not top of page).
  - Breadcrumbs navigation.

## 📂 Project Structure
```bash
/app
  /cart        # Cart Page
  /checkout    # Checkout Page (Forms & Validation)
  /fonts       # Local font files
  /product     # Product Detail Pages
  layout.tsx   # Root Layout (Providers + Toaster)
  page.tsx     # Home Page (Filtering Logic)

/components
  /features    # Reusable business logic (ProductCard, RelatedProducts)
  /home        # Homepage specific (Hero, FilterSidebar)
  /layout      # Global layout (Header, Footer)
  /providers   # Client-side Context Wrappers
  /product     # Product specific UI (Gallery, Info)

/context       # Global State (CartContext)
/lib           # Static Data & Utilities

#🏃‍♂️ Getting Started
# 1. Clone the repository
git clone [https://github.com/nenshallom/9kets-e-commerce.git](https://github.com/nenshallom/9kets-e-commerce.git)
# 2. Install dependencies
npm install
# 3. Run the development server
npm run dev
4. Open http://localhost:3000 with your browser. 
```

## Architectural Decisions
- **URL as State:** I used URL Search Params for filtering instead of local state. This allows users to share filtered views and preserves state on refresh.

- **Component Composition:** Complex UIs (like the Cart Page) were broken down into smaller components (RelatedProducts, ProductCard) to adhere to the DRY (Don't Repeat Yourself) principle.

- **Client vs Server:** I carefully isolated client-side logic (interactive buttons, hooks) into "use client" components while keeping the outer shell server-rendered for performance.

