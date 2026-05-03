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

## 🧠 My Approach (Engineering Philosophy)

This project was built with a **production-first mindset**, focusing on scalability, maintainability, and user experience.

### 1. Feature-First Architecture
Unlike traditional flat structures (all components in one folder), I used a **feature-based directory structure**.
- **Encapsulation:** Logic, components, and hooks related to a specific domain (e.g., `patients`) are colocated.
- **Scalability:** New features can be added without bloating global directories, making it easier for large teams to work in parallel.
- **Discoverability:** Reduces cognitive load when navigating the codebase.

### 2. State Management Strategy
I opted for **Zustand** over Redux or React Context:
- **Zero Boilerplate:** Allows for rapid development without sacrificing the benefits of a global store.
- **Atomic Selectors:** Used to minimize re-renders by ensuring components only subscribe to the specific slice of state they need.
- **Decoupling:** Business logic (like filtering and sorting) is abstracted into the store or specialized hooks, keeping components purely presentational.

### 3. Performance & Optimization
- **Bundle Optimization:** Implemented route-level code splitting using `React.lazy` and `Suspense` to reduce initial load time.
- **Derived State:** Used `useMemo` for heavy computations like patient filtering and analytics data to prevent unnecessary recalculations on every render.
- **Asset Strategy:** Utilized optimized image formats and SVG icons to keep the "LightHouse" score high.

### 4. UI/UX & Design Tokens
- **Systematic Styling:** Leveraging Tailwind CSS with a custom theme configuration for consistent spacing, colors, and typography.
- **Micro-interactions:** Integrated smooth transitions and feedback loops (e.g., loading skeletons, toast notifications) to make the app feel "alive" and responsive.

## ⚖️ Trade-offs & Future Improvements

- **Mock vs. Real API:** I chose a robust mock data strategy to showcase complex UI states (loading, empty, error) without requiring a backend setup, allowing for immediate evaluation of the frontend architecture.
- **Service Worker Scope:** The PWA implementation is currently focused on offline caching and push notification simulations. In a real-world scenario, this would be expanded to include background sync for offline data entry.
- **Testing:** While the architecture is designed for testability (separated logic and view), I prioritized feature completeness and UI polish over unit/integration test coverage for this specific assignment scope.
- **Future Scale:** For a real production app, I would implement **Module Federation** for micro-frontends if the dashboard grew significantly, and move to a more robust form library like `React Hook Form` for complex data entry.

## 📝 Notes

- 48 mock patients generated with realistic Indian names, conditions, vitals
- All TypeScript interfaces in `src/types/index.ts`
- Reusable components: Button, Card, Badge, Input, Toggle, Switch, Avatar, Skeleton, EmptyState, StatCard
- Fully responsive across mobile, tablet, and desktop breakpoints using Tailwind grid system.
- Zustand was chosen over Redux due to lower boilerplate and sufficient scalability for mid-sized apps.
