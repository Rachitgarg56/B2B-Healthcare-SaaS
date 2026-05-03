import React from 'react';
import { Search } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/Button';
import { NotificationBell } from './NotificationBell';

export const HeaderActions: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="md" 
        className="p-2 h-auto text-surface-500 hover:text-surface-700 hidden md:flex"
        aria-label="Search"
      >
        <Search size={16} />
      </Button>

      <NotificationBell />

      <div className="w-px h-6 bg-surface-200 mx-1" aria-hidden="true" />
      
      <button 
        className="outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full"
        aria-label="User profile"
      >
        <Avatar 
          name={user?.displayName || user?.email || 'Admin'} 
          size="sm" 
          className="cursor-pointer ring-2 ring-transparent hover:ring-primary-300 transition-all" 
        />
      </button>
    </div>
  );
};
