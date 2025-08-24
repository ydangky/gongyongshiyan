import React, { createPortal } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      ></div>
      
      {/* Dialog content */}
      <div className="relative w-full max-w-md">
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <div 
      className={cn(
        "relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ className, children, ...props }: DialogHeaderProps) {
  return (
    <div className={cn("p-6 pb-2", className)} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ className, children, ...props }: DialogTitleProps) {
  return (
    <h2 className={cn("text-xl font-bold text-gray-900 dark:text-white", className)} {...props}>
      {children}
    </h2>
  );
}

export function DialogFooter({ className, children, ...props }: DialogFooterProps) {
  return (
    <div className={cn("p-6 pt-2 flex justify-end gap-3", className)} {...props}>
      {children}
    </div>
  );
}