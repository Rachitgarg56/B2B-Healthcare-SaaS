import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddings = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' };

export const Card: React.FC<CardProps> = ({ children, className, hover = false, onClick, padding = 'md' }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-2xl border border-surface-200/80 shadow-card',
        hover && 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer',
        onClick && 'cursor-pointer',
        'transition-all duration-200',
        paddings[padding],
        className,
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action, icon, className }) => (
  <div className={clsx('flex items-start justify-between gap-3 mb-4', className)}>
    <div className="flex items-center gap-3 min-w-0">
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="min-w-0">
        <h3 className="font-display text-sm font-600 text-surface-900 truncate">{title}</h3>
        {subtitle && <p className="text-xs text-surface-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);
