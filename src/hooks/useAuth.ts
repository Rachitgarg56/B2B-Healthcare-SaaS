import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const { setUser, setLoading, user } = useAuthStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, displayName: firebaseUser.displayName, photoURL: firebaseUser.photoURL });
      } else {
        // Only clear if not in demo mode (demo users have uid = 'demo-uid')
        if (user?.uid !== 'demo-uid') {
          setUser(null);
        } else {
          setLoading(false);
        }
      }
    });
    return () => unsub();
  }, []);
};
