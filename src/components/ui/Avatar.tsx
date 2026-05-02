import React from 'react';
import { clsx } from 'clsx';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-base',
  xl: 'w-16 h-16 text-xl',
};

const colors = [
  'bg-primary-100 text-primary-700',
  'bg-violet-100 text-violet-700',
  'bg-teal-100 text-teal-700',
  'bg-warning-100 text-warning-700',
  'bg-danger-100 text-danger-700',
  'bg-success-100 text-success-700',
];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className }) => {
  const [imgError, setImgError] = React.useState(false);
  const showFallback = !src || imgError;
  return (
    <div className={clsx('rounded-full flex items-center justify-center flex-shrink-0 font-semibold overflow-hidden', sizes[size], showFallback && getColor(name), className)}>
      {!showFallback ? (
        <img src={src} alt={name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};
