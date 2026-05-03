import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Notification } from '../../../types';

interface NotificationsPanelProps {
  notifications: Notification[];
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications }) => (
  <Card padding="none">
    <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-surface-100">
      <h3 className="font-display text-sm font-bold text-surface-900">Alerts</h3>
      <Link to="/notifications"><Button variant="ghost" size="xs">See all</Button></Link>
    </div>
    {notifications.length === 0 ? (
      <p className="text-xs text-surface-400 text-center py-4">No new alerts</p>
    ) : (
      <div className="divide-y divide-surface-100">
        {notifications.map(n => (
          <div key={n.id} className="px-4 py-3 flex items-start gap-2.5">
            <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.type === 'error' ? 'bg-danger-500' : n.type === 'success' ? 'bg-success-500' : n.type === 'warning' ? 'bg-warning-500' : 'bg-primary-500'}`} />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-surface-800 truncate">{n.title}</p>
              <p className="text-[10px] text-surface-400 mt-0.5 line-clamp-2">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </Card>
);
