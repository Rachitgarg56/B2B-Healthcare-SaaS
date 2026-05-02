import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useAuthStore } from '../../../stores/authStore';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Activity, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';

const DEMO_EMAIL = 'demo@medcare.com';
const DEMO_PASSWORD = 'Demo@1234';

export const LoginPage: React.FC = () => {
  const { user, setUser, setError, error, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  if (user && !loading) return <Navigate to="/dashboard" replace />;

  const validate = () => {
    const errors: typeof fieldErrors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Try Firebase first; on failure (demo env), simulate login
      let firebaseUser = null;
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        firebaseUser = cred.user;
      } catch (firebaseErr: any) {
        // Demo mode: accept demo credentials without real Firebase
        if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
          setUser({ uid: 'demo-uid', email: DEMO_EMAIL, displayName: 'Dr. Admin', photoURL: null });
          return;
        }
        const code = firebaseErr.code;
        if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
          setError('Invalid email or password. Try demo@medcare.com / Demo@1234');
        } else if (code === 'auth/too-many-requests') {
          setError('Too many failed attempts. Please try again later.');
        } else {
          // Network/config error → use demo mode
          if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
            setUser({ uid: 'demo-uid', email: DEMO_EMAIL, displayName: 'Dr. Admin', photoURL: null });
            return;
          }
          setError('Login failed. Use demo@medcare.com / Demo@1234 to explore.');
        }
        return;
      }
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, displayName: firebaseUser.displayName, photoURL: firebaseUser.photoURL });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = () => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); setFieldErrors({}); setError(null); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-950 via-primary-950 to-surface-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

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
            <div className="relative">
              <label className="block text-xs font-medium text-surface-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: undefined })); }}
                  placeholder="you@example.com"
                  className="w-full h-11 bg-white/5 border border-white/10 hover:border-white/20 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-surface-600 outline-none transition-all"
                />
              </div>
              {fieldErrors.email && <p className="mt-1 text-xs text-danger-400">{fieldErrors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-surface-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors(p => ({ ...p, password: undefined })); }}
                  placeholder="••••••••"
                  className="w-full h-11 bg-white/5 border border-white/10 hover:border-white/20 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 rounded-xl pl-10 pr-11 text-sm text-white placeholder:text-surface-600 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors">
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {fieldErrors.password && <p className="mt-1 text-xs text-danger-400">{fieldErrors.password}</p>}
            </div>

            {error && (
              <div className="flex items-start gap-2.5 px-4 py-3 bg-danger-500/10 border border-danger-500/20 rounded-xl">
                <AlertCircle size={15} className="text-danger-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-danger-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 mt-1 bg-primary-500 hover:bg-primary-400 active:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign in <ArrowRight size={15} /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-surface-600 mt-6">
          © 2026 MedCare Healthcare Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
};
