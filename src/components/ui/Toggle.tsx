import React from 'react';
import { clsx } from 'clsx';
import { LayoutGrid, List } from 'lucide-react';
import { ViewMode } from '../../types';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ value, onChange }) => (
  <div className="flex items-center gap-0.5 bg-surface-100 p-1 rounded-xl border border-surface-200">
    {(['grid', 'list'] as ViewMode[]).map((mode) => (
      <button
        key={mode}
        onClick={() => onChange(mode)}
        className={clsx(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
          value === mode
            ? 'bg-white text-surface-900 shadow-card'
            : 'text-surface-500 hover:text-surface-700',
        )}
        aria-label={`Switch to ${mode} view`}
      >
        {mode === 'grid' ? <LayoutGrid size={14} /> : <List size={14} />}
        <span className="capitalize">{mode}</span>
      </button>
    ))}
  </div>
);

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, size = 'md' }) => {
  const trackSize = size === 'sm' ? 'w-8 h-4' : 'w-10 h-5';
  const thumbSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';
  const thumbTranslate = size === 'sm' ? 'translate-x-4' : 'translate-x-5';
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40',
          trackSize,
          checked ? 'bg-primary-500' : 'bg-surface-300',
        )}
      >
        <span className={clsx(
          'absolute left-0.5 inline-block rounded-full bg-white shadow transition-transform duration-200',
          thumbSize,
          checked ? thumbTranslate : 'translate-x-0.5',
        )} />
      </button>
      {label && <span className="text-sm text-surface-700">{label}</span>}
    </label>
  );
};
