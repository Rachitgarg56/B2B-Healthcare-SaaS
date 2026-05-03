import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../stores/authStore';

export const useLogout = () => {
  const { logout: clearStore } = useAuthStore();

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearStore();
    }
  };

  return { logout };
};
