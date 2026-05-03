import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

interface DashboardHeaderProps {
  greeting: string;
  userName: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ greeting, userName }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <p className="text-surface-500 text-sm">{greeting},</p>
      <h2 className="font-display text-2xl font-bold text-surface-900">{userName} 👋</h2>
    </div>
    <div className="flex items-center gap-2 text-xs text-surface-400 bg-white border border-surface-200 rounded-xl px-3 py-2 shadow-card">
      <Clock size={13} />
      <span>{format(new Date(), "EEEE, MMMM d, yyyy")}</span>
    </div>
  </div>
);
