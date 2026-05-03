import React from 'react';
import { clsx } from 'clsx';
import { Activity, X, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { navItems } from './sidebar.config';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUserSection } from './SidebarUserSection';

interface SidebarProps { 
  open: boolean; 
  onClose: () => void; 
}

const SidebarHeader: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex items-center justify-between h-[var(--header-height)] px-5 border-b border-surface-800">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center">
        <Activity size={16} className="text-white" aria-hidden="true" />
      </div>
      <div>
        <p className="font-display text-sm font-bold text-white tracking-tight">MedCare</p>
        <p className="text-[10px] text-surface-500 font-mono">Healthcare SaaS</p>
      </div>
    </div>
    <Button 
      variant="ghost" 
      size="md"
      onClick={onClose} 
      className="lg:hidden p-1 h-auto text-surface-500 hover:text-surface-300"
      aria-label="Close sidebar"
    >
      <X size={16} />
    </Button>
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-surface-900/40 backdrop-blur-sm z-30 lg:hidden" 
          onClick={onClose} 
          aria-hidden="true"
        />
      )}
      
      <aside 
        className={clsx(
          'fixed top-0 left-0 h-screen bg-surface-950 flex flex-col z-40 transition-transform duration-300 ease-out w-[var(--sidebar-width)]',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
        aria-label="Sidebar Navigation"
      >
        <SidebarHeader onClose={onClose} />

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-0.5" role="navigation">
          <p className="text-[10px] font-semibold text-surface-600 uppercase tracking-widest px-3 mb-3">Main Menu</p>
          {navItems.map((item) => (
            <SidebarNavItem 
              key={item.to} 
              {...item} 
              onClick={onClose} 
            />
          ))}
          
          <div className="pt-4 mt-4 border-t border-surface-800">
            <p className="text-[10px] font-semibold text-surface-600 uppercase tracking-widest px-3 mb-3">System</p>
            <SidebarNavItem 
              to="/settings" 
              icon={Settings} 
              label="Settings" 
              onClick={onClose} 
            />
          </div>
        </nav>

        <SidebarUserSection />
      </aside>
    </>
  );
};
