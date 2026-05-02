import React from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg?: string;
  trend?: { value: number; label: string };
  className?: string;
  accent?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, iconBg = 'bg-primary-50', trend, className, accent }) => {
  const isPositive = trend && trend.value > 0;
  const isNegative = trend && trend.value < 0;
  return (
    <div className={clsx('bg-white rounded-2xl border border-surface-200/80 shadow-card p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200', className)}>
      {accent && <div className={clsx('h-1 rounded-full mb-4 w-12', accent)} />}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-surface-400 uppercase tracking-wide">{title}</p>
          <p className="mt-1.5 text-2xl font-display font-700 text-surface-900 tracking-tight">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-surface-400">{subtitle}</p>}
          {trend && (
            <div className={clsx('mt-2.5 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
              isPositive ? 'bg-success-100 text-success-600' : isNegative ? 'bg-danger-100 text-danger-600' : 'bg-surface-100 text-surface-500'
            )}>
              {isPositive ? <TrendingUp size={11} /> : isNegative ? <TrendingDown size={11} /> : <Minus size={11} />}
              <span>{Math.abs(trend.value)}% {trend.label}</span>
            </div>
          )}
        </div>
        <div className={clsx('flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center', iconBg)}>
          {icon}
        </div>
      </div>
    </div>
  );
};
