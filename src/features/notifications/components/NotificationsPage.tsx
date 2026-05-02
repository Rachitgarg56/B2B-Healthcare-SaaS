import React from 'react';
import { Bell, CheckCheck, Trash2, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotificationStore } from '../../../stores/notificationStore';
import { Button } from '../../../components/ui/Button';
import { clsx } from 'clsx';
import { formatDistanceToNow, parseISO } from 'date-fns';

const typeConfig = {
  info: { icon: <Info size={14} />, bg: 'bg-primary-50', text: 'text-primary-600', border: 'border-primary-200', dot: 'bg-primary-500' },
  success: { icon: <CheckCircle size={14} />, bg: 'bg-success-100', text: 'text-success-600', border: 'border-success-200', dot: 'bg-success-500' },
  warning: { icon: <AlertTriangle size={14} />, bg: 'bg-warning-50', text: 'text-warning-600', border: 'border-warning-200', dot: 'bg-warning-500' },
  error: { icon: <AlertCircle size={14} />, bg: 'bg-danger-50', text: 'text-danger-600', border: 'border-danger-200', dot: 'bg-danger-500' },
};

function safeDistance(ts: string) {
  try { return formatDistanceToNow(parseISO(ts), { addSuffix: true }); } catch { return 'recently'; }
}

export const NotificationsPage: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotificationStore();

  const handleRequestPermission = async () => {
    if (!('Notification' in window)) { alert('Notifications not supported.'); return; }
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

  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  return (
    <div className="max-w-2xl space-y-5 page-enter">
      {/* Header actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center">
            <Bell size={15} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-surface-900">Notifications</p>
            <p className="text-[10px] text-surface-400">{unreadCount} unread</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<CheckCheck size={13} />} onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all read
          </Button>
          <Button variant="ghost" size="sm" icon={<Trash2 size={13} />} onClick={clearAll} disabled={notifications.length === 0}>
            Clear all
          </Button>
        </div>
      </div>

      {/* Push notification CTA */}
      {'Notification' in window && Notification.permission !== 'granted' && (
        <div className="flex items-center justify-between gap-4 bg-primary-50 border border-primary-200 rounded-2xl px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-primary-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-primary-800">Enable push notifications</p>
              <p className="text-xs text-primary-600">Get real-time alerts for critical patient events.</p>
            </div>
          </div>
          <Button size="sm" onClick={handleRequestPermission}>Enable</Button>
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-surface-200/80 shadow-card p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-3">
            <Bell size={20} className="text-surface-400" />
          </div>
          <p className="font-semibold text-surface-600 text-sm">No notifications yet</p>
          <p className="text-xs text-surface-400 mt-1">You're all caught up!</p>
        </div>
      ) : (
        <>
          {unread.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider px-1 mb-2">Unread · {unread.length}</p>
              <div className="space-y-2">
                {unread.map(n => {
                  const cfg = typeConfig[n.type];
                  return (
                    <div key={n.id} className={clsx('bg-white rounded-2xl border shadow-card p-4 flex gap-3 hover:shadow-card-hover transition-all', cfg.border)}>
                      <div className={clsx('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5', cfg.bg, cfg.text)}>{cfg.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-surface-900">{n.title}</p>
                          <span className={clsx('w-2 h-2 rounded-full flex-shrink-0 mt-1.5', cfg.dot)} />
                        </div>
                        <p className="text-xs text-surface-500 mt-0.5">{n.message}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <p className="text-[10px] text-surface-400">{safeDistance(n.timestamp)}</p>
                          <button onClick={() => markAsRead(n.id)} className="text-[10px] text-primary-600 hover:text-primary-700 font-medium">Mark read</button>
                          <button onClick={() => removeNotification(n.id)} className="text-[10px] text-surface-400 hover:text-danger-500 ml-auto">Dismiss</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {read.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider px-1 mb-2">Read · {read.length}</p>
              <div className="space-y-2">
                {read.map(n => {
                  const cfg = typeConfig[n.type];
                  return (
                    <div key={n.id} className="bg-white rounded-2xl border border-surface-200/80 shadow-card p-4 flex gap-3 opacity-60 hover:opacity-100 transition-all">
                      <div className={clsx('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 bg-surface-100 text-surface-400')}>{cfg.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-surface-700">{n.title}</p>
                        <p className="text-xs text-surface-400 mt-0.5">{n.message}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <p className="text-[10px] text-surface-400">{safeDistance(n.timestamp)}</p>
                          <button onClick={() => removeNotification(n.id)} className="text-[10px] text-surface-400 hover:text-danger-500 ml-auto">Remove</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
