import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center text-surface-400 mb-4">
      {icon}
    </div>
    <h3 className="font-display text-sm font-600 text-surface-700 mb-1.5">{title}</h3>
    <p className="text-sm text-surface-400 max-w-xs">{description}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);
