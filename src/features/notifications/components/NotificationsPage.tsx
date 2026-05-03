import React, { useMemo } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { useNotificationStore } from '../../../stores/notificationStore';
import { Button } from '../../../components/ui/Button';
import { NotificationList } from './NotificationList';
import { EmptyNotificationsState } from './EmptyNotificationsState';

export const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAll 
  } = useNotificationStore();

  const handleRequestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Notifications not supported.');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted' && 'serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification('Notifications Enabled', {
        body: 'You will now receive real-time health alerts.',
        icon: '/icon-192.png',
        tag: 'permission-granted',
      });
    }
  };

  const { unread, read } = useMemo(() => ({
    unread: notifications.filter(n => !n.read),
    read: notifications.filter(n => n.read)
  }), [notifications]);

  return (
    <div className="max-w-2xl space-y-5 page-enter">
      {/* Header actions */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center">
            <Bell size={15} className="text-primary-600" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-surface-900">Notifications</h1>
            <p className="text-[10px] text-surface-400">{unreadCount} unread</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            icon={<CheckCheck size={13} />} 
            onClick={markAllAsRead} 
            disabled={unreadCount === 0}
          >
            Mark all read
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<Trash2 size={13} />} 
            onClick={clearAll} 
            disabled={notifications.length === 0}
          >
            Clear all
          </Button>
        </div>
      </header>

      {/* Push notification CTA */}
      {'Notification' in window && Notification.permission !== 'granted' && (
        <aside 
          className="flex items-center justify-between gap-4 bg-primary-50 border border-primary-200 rounded-2xl px-4 py-3.5"
          aria-labelledby="push-cta-title"
        >
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-primary-500 flex-shrink-0" aria-hidden="true" />
            <div>
              <p id="push-cta-title" className="text-sm font-semibold text-primary-800">Enable push notifications</p>
              <p className="text-xs text-primary-600">Get real-time alerts for critical patient events.</p>
            </div>
          </div>
          <Button size="sm" onClick={handleRequestPermission}>Enable</Button>
        </aside>
      )}

      {notifications.length === 0 ? (
        <EmptyNotificationsState />
      ) : (
        <div className="space-y-6">
          <NotificationList 
            title="Unread" 
            notifications={unread} 
            onMarkRead={markAsRead} 
            onRemove={removeNotification} 
          />
          <NotificationList 
            title="Read" 
            notifications={read} 
            onRemove={removeNotification} 
          />
        </div>
      )}
    </div>
  );
};
