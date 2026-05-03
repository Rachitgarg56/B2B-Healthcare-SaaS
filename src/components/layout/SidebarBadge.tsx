import React from 'react';
import { clsx } from 'clsx';
import { useNotificationStore } from '../../stores/notificationStore';

interface SidebarBadgeProps {
  isActive: boolean;
}

export const SidebarBadge: React.FC<SidebarBadgeProps> = ({ isActive }) => {
  const { unreadCount } = useNotificationStore();

  if (unreadCount === 0) return null;

  return (
    <span 
      className={clsx(
        'text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center transition-colors',
        isActive ? 'bg-white/20 text-white' : 'bg-danger-500 text-white'
      )}
      aria-label={`${unreadCount} unread notifications`}
    >
      {unreadCount > 9 ? '9+' : unreadCount}
    </span>
  );
};
