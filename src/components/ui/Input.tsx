import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, error, hint, icon, iconRight, fullWidth, className, id, ...props }) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-surface-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">{icon}</div>}
        <input
          id={inputId}
          className={clsx(
            'w-full h-10 bg-white border rounded-lg text-sm text-surface-900 placeholder:text-surface-400 outline-none transition-all duration-150',
            'focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            error ? 'border-danger-500 focus:ring-danger-500/20' : 'border-surface-200 hover:border-surface-300',
            icon ? 'pl-10' : 'pl-3.5',
            iconRight ? 'pr-10' : 'pr-3.5',
            className,
          )}
          {...props}
        />
        {iconRight && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">{iconRight}</div>}
      </div>
      {error && <p className="text-xs text-danger-500">{error}</p>}
      {hint && !error && <p className="text-xs text-surface-400">{hint}</p>}
    </div>
  );
};
