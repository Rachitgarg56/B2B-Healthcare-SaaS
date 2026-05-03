import React from 'react';
import { Notification } from '../../../types';
import { NotificationItem } from './NotificationItem';

interface NotificationListProps {
  title: string;
  notifications: Notification[];
  onMarkRead?: (id: string) => void;
  onRemove: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  title,
  notifications,
  onMarkRead,
  onRemove,
}) => {
  if (notifications.length === 0) return null;

  return (
    <section aria-labelledby={`notification-list-${title.toLowerCase()}`}>
      <h3 
        id={`notification-list-${title.toLowerCase()}`}
        className="text-xs font-semibold text-surface-500 uppercase tracking-wider px-1 mb-2"
      >
        {title} · {notifications.length}
      </h3>
      <div className="space-y-2">
        {notifications.map((n) => (
          <NotificationItem 
            key={n.id} 
            notification={n} 
            onMarkRead={onMarkRead} 
            onRemove={onRemove} 
          />
        ))}
      </div>
    </section>
  );
};
