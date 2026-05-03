import React from 'react';
import { clsx } from 'clsx';
import { Notification } from '../../../types';
import { typeConfig, safeDistance } from '../config/notificationConfig';

interface NotificationItemProps {
  notification: Notification;
  onMarkRead?: (id: string) => void;
  onRemove: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification: n, 
  onMarkRead, 
  onRemove 
}) => {
  const cfg = typeConfig[n.type];
  const isRead = n.read;

  return (
    <div 
      className={clsx(
        'bg-white rounded-2xl border shadow-card p-4 flex gap-3 transition-all',
        isRead 
          ? 'border-surface-200/80 opacity-60 hover:opacity-100' 
          : clsx('hover:shadow-card-hover', cfg.border)
      )}
    >
      <div 
        className={clsx(
          'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5',
          isRead ? 'bg-surface-100 text-surface-400' : clsx(cfg.bg, cfg.text)
        )}
      >
        {cfg.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={clsx('text-sm font-semibold', isRead ? 'text-surface-700' : 'text-surface-900')}>
            {n.title}
          </p>
          {!isRead && <span className={clsx('w-2 h-2 rounded-full flex-shrink-0 mt-1.5', cfg.dot)} />}
        </div>
        <p className={clsx('text-xs mt-0.5', isRead ? 'text-surface-400' : 'text-surface-500')}>
          {n.message}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-[10px] text-surface-400">{safeDistance(n.timestamp)}</p>
          {!isRead && onMarkRead && (
            <button 
              onClick={() => onMarkRead(n.id)} 
              className="text-[10px] text-primary-600 hover:text-primary-700 font-medium"
              aria-label={`Mark ${n.title} as read`}
            >
              Mark read
            </button>
          )}
          <button 
            onClick={() => onRemove(n.id)} 
            className="text-[10px] text-surface-400 hover:text-danger-500 ml-auto"
            aria-label={`${isRead ? 'Remove' : 'Dismiss'} ${n.title}`}
          >
            {isRead ? 'Remove' : 'Dismiss'}
          </button>
        </div>
      </div>
    </div>
  );
};
