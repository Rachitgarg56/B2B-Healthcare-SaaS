import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Demo Firebase config - replace with real config in production
const firebaseConfig = {
  apiKey: "AIzaSyDemo-replace-with-real-key",
  authDomain: "raga-healthcare-demo.firebaseapp.com",
  projectId: "raga-healthcare-demo",
  storageBucket: "raga-healthcare-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
