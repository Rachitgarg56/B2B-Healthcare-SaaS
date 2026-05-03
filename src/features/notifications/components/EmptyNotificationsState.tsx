import React from 'react';
import { Bell } from 'lucide-react';

export const EmptyNotificationsState: React.FC = () => (
  <div className="bg-white rounded-2xl border border-surface-200/80 shadow-card p-12 text-center" role="status">
    <div className="w-12 h-12 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-3">
      <Bell size={20} className="text-surface-400" aria-hidden="true" />
    </div>
    <p className="font-semibold text-surface-600 text-sm">No notifications yet</p>
    <p className="text-xs text-surface-400 mt-1">You're all caught up!</p>
  </div>
);
