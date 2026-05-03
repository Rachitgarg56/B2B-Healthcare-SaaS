import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { pageTitles } from './layout.config';
import { HeaderActions } from './HeaderActions';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const page = pageTitles[pathname] || { title: 'MedCare', subtitle: '' };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[var(--sidebar-width)] h-[var(--header-height)] bg-white/80 backdrop-blur-md border-b border-surface-200/80 z-20 flex items-center px-4 lg:px-6 gap-4">
      <Button 
        variant="ghost" 
        size="md" 
        onClick={onMenuClick} 
        className="lg:hidden p-2 h-auto text-surface-500 hover:text-surface-700"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </Button>

      <div className="flex-1 min-w-0">
        <h1 className="font-display text-base font-bold text-surface-900 leading-none">{page.title}</h1>
        <p className="text-xs text-surface-400 mt-0.5 hidden sm:block">{page.subtitle}</p>
      </div>

      <HeaderActions />
    </header>
  );
};
