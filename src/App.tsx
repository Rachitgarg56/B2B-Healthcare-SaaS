import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { useServiceWorker } from './hooks/useServiceWorker';
import { Activity } from 'lucide-react';

// Lazy-loaded pages for code splitting / performance
const LoginPage = lazy(() => import('./features/auth/components/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('./features/dashboard/components/DashboardPage').then(m => ({ default: m.DashboardPage })));
const AnalyticsPage = lazy(() => import('./features/analytics/components/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const PatientsPage = lazy(() => import('./features/patients/components/PatientsPage').then(m => ({ default: m.PatientsPage })));
const NotificationsPage = lazy(() => import('./features/notifications/components/NotificationsPage').then(m => ({ default: m.NotificationsPage })));
const SettingsPage = lazy(() => import('./features/notifications/components/SettingsPage').then(m => ({ default: m.SettingsPage })));

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
        <Activity size={18} className="text-primary-500 animate-pulse" />
      </div>
      <div className="flex gap-1">
        {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
      </div>
    </div>
  </div>
);

function AppInner() {
  useAuth();
  useServiceWorker();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
