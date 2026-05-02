import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { Activity, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { useLoginForm } from '../hooks/useLoginForm';
import { AuthBackground } from './AuthBackground';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export const LoginPage: React.FC = () => {
  const { user, loading } = useAuthStore();
  const {
    email,
    password,
    showPwd,
    submitting,
    fieldErrors,
    error,
    handleSubmit,
    fillDemo,
    toggleShowPwd,
    handleEmailChange,
    handlePasswordChange,
    DEMO_EMAIL,
  } = useLoginForm();

  if (user && !loading) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-950 via-primary-950 to-surface-900 flex items-center justify-center p-4 relative overflow-hidden">
      <AuthBackground />

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Activity size={20} className="text-white" />
          </div>
          <div>
            <p className="font-display text-xl font-bold text-white tracking-tight">MedCare</p>
            <p className="text-xs text-surface-400 font-mono">Healthcare Platform v2.1</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="mb-7">
            <h1 className="font-display text-2xl font-bold text-white mb-1.5">Welcome back</h1>
            <p className="text-surface-400 text-sm">Sign in to your clinical dashboard</p>
          </div>

          {/* Demo badge */}
          <button
            onClick={fillDemo}
            className="w-full mb-5 flex items-center justify-between px-4 py-3 bg-primary-500/10 hover:bg-primary-500/15 border border-primary-500/20 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-primary-500/20 flex items-center justify-center">
                <span className="text-xs">✨</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-primary-300">Demo Account</p>
                <p className="text-[10px] text-surface-500">{DEMO_EMAIL}</p>
              </div>
            </div>
            <ArrowRight size={13} className="text-primary-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-medium text-surface-300 mb-1.5">Email address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="you@example.com"
                icon={<Mail size={15} className="text-surface-500" />}
                error={fieldErrors.email}
                fullWidth
                className="h-11 bg-white/5 border-white/10 hover:border-white/20 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl text-white placeholder:text-surface-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-surface-300 mb-1.5">Password</label>
              <Input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="••••••••"
                icon={<Lock size={15} className="text-surface-500" />}
                iconRight={
                  <button type="button" onClick={toggleShowPwd} className="text-surface-500 hover:text-surface-300 transition-colors">
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
                error={fieldErrors.password}
                fullWidth
                className="h-11 bg-white/5 border-white/10 hover:border-white/20 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl text-white placeholder:text-surface-600"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2.5 px-4 py-3 bg-danger-500/10 border border-danger-500/20 rounded-xl">
                <AlertCircle size={15} className="text-danger-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-danger-300">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={submitting}
              loading={submitting}
              fullWidth
              size="lg"
              iconRight={!submitting && <ArrowRight size={15} />}
              className="mt-1 bg-primary-500 hover:bg-primary-400 active:bg-primary-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-primary-500/20 border-none"
            >
              {submitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-surface-600 mt-6">
          © 2026 MedCare Healthcare Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
};
