import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search, Bell } from 'lucide-react';
import { useNotificationStore } from '../../stores/notificationStore';
import { clsx } from 'clsx';
import { Avatar } from '../ui/Avatar';
import { useAuthStore } from '../../stores/authStore';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back — here\'s what\'s happening' },
  '/patients': { title: 'Patient Management', subtitle: 'View and manage all patient records' },
  '/analytics': { title: 'Analytics', subtitle: 'Insights and performance metrics' },
  '/notifications': { title: 'Notifications', subtitle: 'Your recent alerts and updates' },
  '/settings': { title: 'Settings', subtitle: 'Configure your preferences' },
};

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const { unreadCount } = useNotificationStore();
  const { user } = useAuthStore();
  const page = pageTitles[pathname] || { title: 'MedCare', subtitle: '' };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[var(--sidebar-width)] h-[var(--header-height)] bg-white/80 backdrop-blur-md border-b border-surface-200/80 z-20 flex items-center px-4 lg:px-6 gap-4">
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg text-surface-500 hover:bg-surface-100 hover:text-surface-700 transition-colors">
        <Menu size={18} />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="font-display text-base font-bold text-surface-900 leading-none">{page.title}</h1>
        <p className="text-xs text-surface-400 mt-0.5 hidden sm:block">{page.subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 hover:text-surface-700 transition-colors hidden md:flex">
          <Search size={16} />
        </button>

        <div className="relative">
          <button className="relative p-2 rounded-lg text-surface-500 hover:bg-surface-100 hover:text-surface-700 transition-colors flex">
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full">
                <span className="animate-ping absolute w-2 h-2 bg-danger-400 rounded-full" />
              </span>
            )}
          </button>
        </div>

        <div className="w-px h-6 bg-surface-200 mx-1" />
        <Avatar name={user?.displayName || user?.email || 'Admin'} size="sm" className="cursor-pointer ring-2 ring-transparent hover:ring-primary-300 transition-all" />
      </div>
    </header>
  );
};
