import React from 'react';
import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={clsx('skeleton rounded-lg', className)} />
    ))}
  </>
);

export const CardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl border border-surface-200/80 p-5 shadow-card">
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-16" />
      </div>
      <Skeleton className="w-11 h-11 rounded-xl" />
    </div>
    <Skeleton className="h-4 w-32" />
  </div>
);

export const TableRowSkeleton: React.FC = () => (
  <tr className="border-b border-surface-100">
    {Array.from({ length: 6 }).map((_, i) => (
      <td key={i} className="px-4 py-3.5">
        <Skeleton className={clsx('h-3.5', i === 0 ? 'w-32' : i === 1 ? 'w-16' : 'w-20')} />
      </td>
    ))}
  </tr>
);
