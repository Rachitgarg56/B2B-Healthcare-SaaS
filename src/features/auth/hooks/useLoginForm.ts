import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useAuthStore } from '../../../stores/authStore';

const DEMO_EMAIL = 'demo@medcare.com';
const DEMO_PASSWORD = 'Demo@1234';

export const useLoginForm = () => {
  const { setUser, setError, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

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

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setFieldErrors({});
    setError(null);
  };

  const toggleShowPwd = () => setShowPwd((prev) => !prev);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setFieldErrors((p) => ({ ...p, email: undefined }));
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setFieldErrors((p) => ({ ...p, password: undefined }));
  };

  return {
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
  };
};
