import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { useServiceWorker } from './hooks/useServiceWorker';
import PageLoader from './components/ui/PageLoader';

// Lazy-loaded pages for code splitting / performance
const LoginPage = lazy(() => import('./features/auth/components/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('./features/dashboard/components/DashboardPage').then(m => ({ default: m.DashboardPage })));
const AnalyticsPage = lazy(() => import('./features/analytics/components/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const PatientsPage = lazy(() => import('./features/patients/components/PatientsPage').then(m => ({ default: m.PatientsPage })));
const NotificationsPage = lazy(() => import('./features/notifications/components/NotificationsPage').then(m => ({ default: m.NotificationsPage })));
const SettingsPage = lazy(() => import('./features/notifications/components/SettingsPage').then(m => ({ default: m.SettingsPage })));

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
