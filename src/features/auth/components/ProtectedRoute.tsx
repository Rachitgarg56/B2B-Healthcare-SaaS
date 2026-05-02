import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { Activity } from 'lucide-react';

interface ProtectedRouteProps { children: React.ReactNode; }

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center animate-pulse">
            <Activity size={22} className="text-white" />
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
          </div>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};
