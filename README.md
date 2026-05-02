# MedCare — B2B Healthcare SaaS Dashboard

A production-quality healthcare platform built with React, TypeScript, Zustand, Tailwind CSS, and Firebase Authentication.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

**Demo Login:** `demo@medcare.com` / `Demo@1234`

---

## 🛠 Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 + Vite | Fast HMR, modern tooling |
| Language | TypeScript (strict) | Type safety across all layers |
| State | Zustand | Lightweight, scalable, no boilerplate |
| Styling | Tailwind CSS v3 | Utility-first, consistent design tokens |
| Charts | Recharts | Composable, accessible charting |
| Auth | Firebase Auth | Production-grade, session persistence |
| Routing | React Router v6 | Declarative, nested layouts |
| Icons | Lucide React | Tree-shakable, consistent |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── ui/            # Reusable primitives (Button, Card, Badge, Input, Toggle...)
│   └── layout/        # App shell (Sidebar, Header, AppLayout)
├── features/
│   ├── auth/          # Login page, ProtectedRoute
│   ├── dashboard/     # Dashboard page + stat cards
│   ├── analytics/     # Charts and metrics
│   ├── patients/      # Grid/List view, Drawer, Table
│   └── notifications/ # Notification center + Settings
├── stores/            # Zustand stores (auth, patient, notification)
├── hooks/             # useAuth, useServiceWorker
├── lib/               # Firebase config, mock data
└── types/             # Shared TypeScript interfaces
```

---

## ✅ Features Implemented

### Authentication
- Firebase email/password login with validation and error states
- Demo mode fallback (works without real Firebase project)
- Session persistence via Zustand persist middleware
- ProtectedRoute with loading state

### Dashboard
- Stat cards with trend indicators
- Ward occupancy progress bars
- Recent admissions feed
- Unread alert panel with live badge count

### Analytics
- Area chart: monthly admissions vs discharges
- Bar chart: weekly day-by-day breakdown
- Donut chart: patient status distribution
- Condition distribution with progress bars
- KPI strip with calculated metrics

### Patient Management (Core Module)
- **Grid view**: visual cards with vitals, status badges, color-coded by status
- **List view**: sortable table with avatar, condition, ward, heart rate
- **Toggle switch**: smooth animated view switcher
- **Filters**: search (name/ID/doctor/condition), status filter, condition filter
- **Detail drawer**: slide-in panel with full vitals, medications, contact, clinical info
- **Add Patient**: demo button triggers in-app + push notification

### Notifications
- Notification center with unread/read sections
- In-app store + browser push notification support
- Service worker integration for push permission request
- Mark as read, dismiss, clear all

### Service Worker
- Registers `sw.js` for offline caching
- Handles push event and `notificationclick`
- Shows welcome notification on first load
- Used on "Add Patient" action for live demo

---

## 🎨 Design Decisions

- **Font pairing**: Syne (display/headings) + DM Sans (body) — distinctive, not Inter
- **Color system**: Primary blue with surface grays; danger/success/warning semantic palette
- **Dark sidebar**: surface-950 sidebar contrasts cleanly with light main area
- **Micro-interactions**: card hover lifts, badge pulses on critical, page entry animations
- **Status-coded borders**: Patient cards have left border color = patient status

---

## 📦 Build & Deploy

```bash
npm run build     # Output: dist/
```

Deploy `dist/` to Vercel, Netlify, or any static host.

**Vercel:** `vercel --prod`
**Netlify:** Drag & drop `dist/` folder

### Firebase Setup (for real auth)
1. Create a Firebase project at console.firebase.google.com
2. Enable Email/Password Authentication
3. Replace `src/lib/firebase.ts` config with your project credentials

---

## 🔧 Performance Optimizations

- Route-level code splitting via `React.lazy` + `Suspense`
- Manual chunk splitting: vendor / firebase / charts / zustand
- Zustand persist only stores auth user (not full patient list)
- CSS `transition-all` only on interactive elements
- Avatar fallback avoids broken image flicker

## 🧠 My Approach

- Focused on building a scalable frontend architecture rather than overengineering features
- Prioritized patient module as the core feature (grid/list toggle, filters, UI clarity)
- Used mock data to simulate real-world healthcare workflows
- Avoided adding backend to keep scope focused on frontend quality

## ⚖️ Trade-offs

- Did not implement real backend APIs to keep assignment focused on frontend
- Service worker uses basic push simulation instead of real push server
- Micro-frontend architecture skipped due to scope vs value trade-off

## 📝 Notes

- 48 mock patients generated with realistic Indian names, conditions, vitals
- All TypeScript interfaces in `src/types/index.ts`
- Reusable components: Button, Card, Badge, Input, Toggle, Switch, Avatar, Skeleton, EmptyState, StatCard
- Fully responsive across mobile, tablet, and desktop breakpoints using Tailwind grid system.
- Zustand was chosen over Redux due to lower boilerplate and sufficient scalability for mid-sized apps.
