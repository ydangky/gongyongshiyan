import React, { useState, useId } from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function Tabs({
  defaultValue,
  value: valueProp,
  onValueChange,
  className,
  children,
}: TabsProps) {
  const [value, setValue] = useState(valueProp || defaultValue || '');
  const id = useId();

  React.useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const handleValueChange = (newValue: string) => {
    if (valueProp === undefined) {
      setValue(newValue);
    }
    onValueChange?.(newValue);
  };

  // Get all trigger elements to find the first one if no value is set
  React.useEffect(() => {
    if (!value) {
      const triggers = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && (child as React.ReactElement).type === TabsTrigger
      ) as React.ReactElement<TabsTriggerProps>[];
      
      if (triggers.length > 0 && triggers[0].props.value) {
        handleValueChange(triggers[0].props.value);
      }
    }
  }, [children, value]);

  // Clone children to pass context
  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    
    if (child.type === TabsList) {
      return React.cloneElement(child, {
        'data-tabs-id': id,
      });
    }
    
    if (child.type === TabsTrigger) {
      const isSelected = child.props.value === value;
      return React.cloneElement(child, {
        'data-tabs-id': id,
        'data-state': isSelected ? 'active' : 'inactive',
        onClick: () => handleValueChange(child.props.value),
        isSelected,
      });
    }
    
    if (child.type === TabsContent) {
      const isSelected = child.props.value === value;
      return React.cloneElement(child, {
        'data-tabs-id': id,
        'data-state': isSelected ? 'active' : 'inactive',
        hidden: !isSelected,
      });
    }
    
    return child;
  });

  return (
    <div className={cn("w-full", className)}>
      {clonedChildren}
    </div>
  );
}

export function TabsList({ className, children }: TabsListProps) {
  return (
    <div className={cn("flex items-center justify-start rounded-md bg-gray-100 dark:bg-gray-800 p-1", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  return (
    <button
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-300 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  return (
    <div
      className={cn("mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}