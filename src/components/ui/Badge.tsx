import React from 'react';
import { clsx } from 'clsx';

type BadgeVariant = 'active' | 'stable' | 'critical' | 'recovered' | 'discharged' | 'info' | 'warning' | 'success' | 'danger' | 'default';

const variantStyles: Record<BadgeVariant, string> = {
  active: 'bg-primary-100 text-primary-700 ring-primary-200',
  stable: 'bg-success-100 text-success-600 ring-success-200',
  critical: 'bg-danger-100 text-danger-600 ring-danger-200',
  recovered: 'bg-teal-100 text-teal-600 ring-teal-200',
  discharged: 'bg-surface-100 text-surface-600 ring-surface-200',
  info: 'bg-primary-100 text-primary-700 ring-primary-200',
  warning: 'bg-warning-50 text-warning-600 ring-warning-200',
  success: 'bg-success-100 text-success-600 ring-success-200',
  danger: 'bg-danger-100 text-danger-600 ring-danger-200',
  default: 'bg-surface-100 text-surface-600 ring-surface-200',
};

const dotStyles: Record<BadgeVariant, string> = {
  active: 'bg-primary-500',
  stable: 'bg-success-500',
  critical: 'bg-danger-500',
  recovered: 'bg-teal-500',
  discharged: 'bg-surface-400',
  info: 'bg-primary-500',
  warning: 'bg-warning-500',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  default: 'bg-surface-400',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, dot = false, className, pulse = false }) => {
  const isPulse = pulse || variant === 'critical';
  return (
    <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset', variantStyles[variant], className)}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {isPulse && <span className={clsx('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotStyles[variant])} />}
          <span className={clsx('relative inline-flex rounded-full h-1.5 w-1.5', dotStyles[variant])} />
        </span>
      )}
      {children}
    </span>
  );
};
