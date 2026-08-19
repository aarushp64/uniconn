import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'avatar' | 'card' | 'image';
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'text', lines = 1 }) => {
  const base = 'animate-pulse bg-slate-200 dark:bg-slate-700 rounded';

  if (variant === 'avatar') {
    return <div className={`${base} rounded-full w-10 h-10 shrink-0 ${className}`} />;
  }

  if (variant === 'image') {
    return <div className={`${base} w-full h-56 rounded-none ${className}`} />;
  }

  if (variant === 'card') {
    return (
      <div className={`bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg p-4 ${className}`}>
        <div className="flex gap-3 mb-3">
          <Skeleton variant="avatar" />
          <div className="flex-1 space-y-2">
            <div className={`${base} h-3 w-1/3`} />
            <div className={`${base} h-2.5 w-1/2`} />
          </div>
        </div>
        <div className="space-y-2 mb-3">
          <div className={`${base} h-2.5 w-full`} />
          <div className={`${base} h-2.5 w-4/5`} />
        </div>
        <Skeleton variant="image" />
        <div className="flex justify-between mt-3">
          <div className={`${base} h-2.5 w-16`} />
          <div className={`${base} h-2.5 w-16`} />
          <div className={`${base} h-2.5 w-16`} />
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className={`${base} h-2.5 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
      ))}
    </div>
  );
};
