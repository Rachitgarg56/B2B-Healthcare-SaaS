import { create } from 'zustand';
import { Notification } from '../types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const initialNotifications: Notification[] = [
  { id: '1', title: 'New Patient Admitted', message: 'Aditya Sharma has been admitted to Ward B.', type: 'info', timestamp: new Date(Date.now() - 300000).toISOString(), read: false },
  { id: '2', title: 'Critical Alert', message: 'Patient PAT-1023 vitals require immediate attention.', type: 'error', timestamp: new Date(Date.now() - 900000).toISOString(), read: false },
  { id: '3', title: 'Appointment Confirmed', message: 'Dr. Kavitha confirmed rounds at 3:00 PM.', type: 'success', timestamp: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: '4', title: 'Lab Results Ready', message: 'Blood work results for PAT-1009 are available.', type: 'warning', timestamp: new Date(Date.now() - 7200000).toISOString(), read: true },
  { id: '5', title: 'Discharge Processed', message: 'Patient Priya Verma has been discharged.', type: 'success', timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.read).length,
  addNotification: (n) => {
    const newNotif: Notification = {
      ...n,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    set((s) => ({
      notifications: [newNotif, ...s.notifications],
      unreadCount: s.unreadCount + 1,
    }));
  },
  markAsRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      unreadCount: Math.max(0, s.notifications.filter((n) => !n.read && n.id !== id).length),
    })),
  markAllAsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  removeNotification: (id) => {
    const wasUnread = get().notifications.find((n) => n.id === id)?.read === false;
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
      unreadCount: wasUnread ? Math.max(0, s.unreadCount - 1) : s.unreadCount,
    }));
  },
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
