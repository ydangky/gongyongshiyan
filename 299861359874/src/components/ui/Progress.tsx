import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export function Progress({ value, max = 100, className }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={cn("w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
        role="progressbar"
      />
    </div>
  );
}