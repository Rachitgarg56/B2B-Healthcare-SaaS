import { useEffect } from 'react';
import { useNotificationStore } from '../stores/notificationStore';

export const useServiceWorker = () => {
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('[SW] Registered:', reg.scope);
      // Trigger a welcome notification on first load
      const hasShownWelcome = sessionStorage.getItem('sw-welcome');
      if (!hasShownWelcome) {
        sessionStorage.setItem('sw-welcome', '1');
        setTimeout(() => {
          addNotification({ title: 'System Ready', message: 'MedCare is online. Notifications and offline support are active.', type: 'success' });
          if (Notification.permission === 'granted') {
            reg.showNotification('MedCare Ready', {
              body: 'Your healthcare dashboard is fully loaded.',
              icon: '/icon-192.png',
              tag: 'welcome',
            });
          }
        }, 2000);
      }
    }).catch(err => console.error('[SW] Registration failed:', err));
  }, []);
};
