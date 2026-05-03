import { useMemo } from 'react';
import { usePatientStore } from '../../../stores/patientStore';
import { useAuthStore } from '../../../stores/authStore';
import { useNotificationStore } from '../../../stores/notificationStore';

export const useDashboardData = () => {
  const { patients } = usePatientStore();
  const { user } = useAuthStore();
  const { notifications } = useNotificationStore();

  const stats = useMemo(() => ({
    total: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    critical: patients.filter(p => p.status === 'critical').length,
    recovered: patients.filter(p => p.status === 'recovered').length,
  }), [patients]);

  const recentPatients = useMemo(() =>
    [...patients].sort((a, b) => b.admissionDate.localeCompare(a.admissionDate)).slice(0, 6),
    [patients]
  );

  const recentNotifications = useMemo(() => 
    notifications.filter(n => !n.read).slice(0, 4),
    [notifications]
  );

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening';

  return {
    user,
    stats,
    recentPatients,
    recentNotifications,
    greeting
  };
};
