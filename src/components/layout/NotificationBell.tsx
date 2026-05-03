import React from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotificationStore } from '../../stores/notificationStore';
import { Button } from '../ui/Button';

export const NotificationBell: React.FC = () => {
  const { unreadCount } = useNotificationStore();

  return (
    <div className="relative">
      <Link to="/notifications">
        <Button 
          variant="ghost" 
          size="md" 
          className="p-2 h-auto text-surface-500 hover:text-surface-700"
          aria-label={`View notifications, ${unreadCount} unread`}
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full">
              <span className="animate-ping absolute w-2 h-2 bg-danger-400 rounded-full" />
            </span>
          )}
        </Button>
      </Link>
    </div>
  );
};
