# 🇩🇿 Algeria Eye — Tourism Platform (MVP)

**Algeria Eye** is a modern, full-stack tourism platform designed to showcase Algeria's rich heritage and vibrant travel opportunities. This MVP (Minimum Viable Product) provides a professional, high-performance interface for both tourists and local service providers.

---

## 🚀 Key Features

- **📍 Explore Algeria**: Deep-dive pages for Wilayas (provinces) with curated historical, cultural, and culinary insights.
- **🏨 Multi-Service Marketplace**: Discover and book hotels, guesthouses, restaurants, and guided tours.
- **🧑‍🎨 Creators Lounge**: A social-media-inspired section showcasing content from top Algerian travel creators.
- **🏪 Owner Dashboards**: Specialized management hubs for Property Owners, Tour Guides, and Agencies to manage listings and bookings.
- **💬 Real-time Interaction**: Direct messaging between tourists and service providers, plus local notifications.
- **🌓 Dynamic Design**: Vibrant, modern UI with 3D elements, glassmorphism, and full dark/light mode support.
- **🌍 Trilingual Support**: Fully localized in **Arabic**, **French**, and **English**.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

### Backend & Infrastructure
- **BaaS**: [Supabase](https://supabase.com/)
- **Authentication**: Supabase Auth (Email & OAuth)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Storage**: Supabase Storage for high-res images and avatars
- **Realtime**: PostgreSQL CDC (Change Data Capture) for live messaging

---

## 📊 Database Architecture

The data model is optimized for a multi-tenant marketplace:

- **`profiles`**: Unified user model with role-based access (Tourist, Owner, Admin, Guide).
- **`listings`**: Polymorphic table supporting various tourism services (Hotels, Restaurants, etc.).
- **`bookings`**: Flexible booking engine with support for stays and restaurant reservations.
- **`menus` & `menu_items`**: Dedicated structures for restaurant digital menus.
- **`notifications` & `messages`**: Engaging communication layers.
- **`stories`**: Short-lived content for creator updates.

---

## 🏁 Getting Started

### 1. Prerequisites
- Node.js 18+
- Supabase Account

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### 4. Database Setup
Run the consolidated [`schema.sql`](./schema.sql) in your Supabase SQL Editor to initialize the entire database structure, RLS policies, and storage buckets.

### 5. Run Development Server
```bash
npm run dev
```

---

## 📜 License
© 2026 Algeria Eye. All rights reserved.
