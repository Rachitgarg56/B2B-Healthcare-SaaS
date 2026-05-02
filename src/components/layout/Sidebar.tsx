import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard, Users, BarChart2, Bell, Settings, LogOut,
  Activity, ChevronRight, X,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { Avatar } from '../ui/Avatar';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/patients', icon: Users, label: 'Patients' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/notifications', icon: Bell, label: 'Notifications', badge: true },
];

interface SidebarProps { open: boolean; onClose: () => void; }

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  const handleLogout = async () => {
    try { await signOut(auth); } catch {}
    logout();
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-surface-900/40 backdrop-blur-sm z-30 lg:hidden" onClick={onClose} />}
      <aside className={clsx(
        'fixed top-0 left-0 h-screen bg-surface-950 flex flex-col z-40 transition-transform duration-300 ease-out w-[var(--sidebar-width)]',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}>
        <div className="flex items-center justify-between h-[var(--header-height)] px-5 border-b border-surface-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white tracking-tight">MedCare</p>
              <p className="text-[10px] text-surface-500 font-mono">Healthcare SaaS</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-surface-500 hover:text-surface-300"><X size={16} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-0.5">
          <p className="text-[10px] font-semibold text-surface-600 uppercase tracking-widest px-3 mb-3">Main Menu</p>
          {navItems.map(({ to, icon: Icon, label, badge }) => (
            <NavLink key={to} to={to} onClick={onClose}
              className={({ isActive }) => clsx(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                isActive ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-surface-400 hover:bg-surface-800 hover:text-surface-200',
              )}>
              {({ isActive }) => (
                <>
                  <Icon size={16} className="flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {badge && unreadCount > 0 && (
                    <span className={clsx('text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center', isActive ? 'bg-white/20 text-white' : 'bg-danger-500 text-white')}>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                  <ChevronRight size={12} className={clsx('flex-shrink-0 transition-opacity', isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-40')} />
                </>
              )}
            </NavLink>
          ))}
          <div className="pt-4 mt-4 border-t border-surface-800">
            <p className="text-[10px] font-semibold text-surface-600 uppercase tracking-widest px-3 mb-3">System</p>
            <NavLink to="/settings" onClick={onClose}
              className={({ isActive }) => clsx(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                isActive ? 'bg-primary-500 text-white' : 'text-surface-400 hover:bg-surface-800 hover:text-surface-200',
              )}>
              {({ isActive }) => (
                <>
                  <Settings size={16} />
                  <span className="flex-1">Settings</span>
                  <ChevronRight size={12} className={clsx('transition-opacity', isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-40')} />
                </>
              )}
            </NavLink>
          </div>
        </nav>

        <div className="border-t border-surface-800 p-4">
          <div className="flex items-center gap-3 px-1">
            <Avatar name={user?.displayName || user?.email || 'Admin'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-surface-200 truncate">{user?.displayName || 'Admin User'}</p>
              <p className="text-[10px] text-surface-500 truncate">{user?.email || 'admin@medcare.com'}</p>
            </div>
            <button onClick={handleLogout} className="p-1.5 rounded-lg text-surface-500 hover:text-danger-400 hover:bg-surface-800 transition-colors" title="Sign out">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
