import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { useLogout } from '../../hooks/useLogout';

export const SidebarUserSection: React.FC = () => {
  const { user } = useAuthStore();
  const { logout } = useLogout();

  return (
    <div className="border-t border-surface-800 p-4">
      <div className="flex items-center gap-3 px-1">
        <Avatar name={user?.displayName || user?.email || 'Admin'} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-surface-200 truncate">{user?.displayName || 'Admin User'}</p>
          <p className="text-[10px] text-surface-500 truncate">{user?.email || 'admin@medcare.com'}</p>
        </div>
        <Button 
          variant="ghost" 
          size="md"
          onClick={logout} 
          className="p-1.5 h-auto rounded-lg text-surface-500 hover:text-danger-400 hover:bg-surface-800" 
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut size={14} />
        </Button>
      </div>
    </div>
  );
};
