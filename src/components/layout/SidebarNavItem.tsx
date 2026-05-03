import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { SidebarBadge } from './SidebarBadge';

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: boolean;
  onClick?: () => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  to,
  icon: Icon,
  label,
  badge,
  onClick,
}) => {
  return (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => clsx(
        'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50',
        isActive 
          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
          : 'text-surface-400 hover:bg-surface-800 hover:text-surface-200',
      )}
      aria-label={label}
    >
      {({ isActive }) => (
        <>
          <Icon size={16} className="flex-shrink-0" />
          <span className="flex-1">{label}</span>
          {badge && <SidebarBadge isActive={isActive} />}
          <ChevronRight 
            size={12} 
            className={clsx(
              'flex-shrink-0 transition-opacity',
              isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'
            )} 
          />
        </>
      )}
    </NavLink>
  );
};
