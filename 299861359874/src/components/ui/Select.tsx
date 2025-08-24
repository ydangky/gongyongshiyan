import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SelectProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
  className?: string;
}

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

interface SelectItemProps extends React.HTMLAttributes<HTMLOptionElement> {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function Select({
  defaultValue,
  value: valueProp,
  onValueChange,
  disabled = false,
  className,
  children,
}: SelectProps) {
  const [value, setValue] = useState(valueProp || defaultValue || '');
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  
  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);
  
  const handleChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };
  
  // Convert children to select options
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return null;
      
      if (child.type === SelectTrigger) {
        return React.cloneElement(child, {
          disabled,
          onClick: () => !disabled && setOpen(!open),
          children: React.Children.map(child.props.children, (triggerChild) => {
            if (!React.isValidElement(triggerChild)) return triggerChild;
            
            if (triggerChild.type === SelectValue) {
              return React.cloneElement(triggerChild, {
                children: value || triggerChild.props.placeholder,
              });
            }
            
            return triggerChild;
          }),
        });
      } else if (child.type === SelectContent) {
        return React.cloneElement(child, {
          style: { display: open && !disabled ? 'block' : 'none' },
          children: React.Children.map(child.props.children, (contentChild) => {
            if (!React.isValidElement(contentChild)) return contentChild;
            
            if (contentChild.type === SelectItem) {
              const isSelected = contentChild.props.value === value;
              return React.cloneElement(contentChild, {
                selected: isSelected,
                onClick: () => {
                  handleChange(contentChild.props.value);
                  setOpen(false);
                },
              });
            }
            
            return contentChild;
          }),
        });
      }
      
      return child;
    });
  };
  
  return (
    <div className={cn("relative inline-block w-full", className)} ref={selectRef}>
      {renderChildren()}
      
      {/* Hidden native select for accessibility */}
      <select
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        className="sr-only"
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;
          
          if (child.type === SelectContent) {
            return React.Children.map(child.props.children, (contentChild) => {
              if (!React.isValidElement(contentChild) || contentChild.type !== SelectItem) return null;
              
              return (
                <option value={contentChild.props.value}>
                  {contentChild.props.children}
                </option>
              );
            });
          }
          
          return null;
        })}
      </select>
      
      {/* Close when clicking outside */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-0"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
}

export function SelectTrigger({
  disabled = false ,
  className,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      {...props}
    >
      {children}
      <i className="fa-solid fa-chevron-down text-xs text-gray-500"></i>
    </div>
  );
}

export function SelectValue({
  placeholder = "",
  className,
  ...props
}: SelectValueProps) {
  return (
    <span className={cn("block truncate", className)} {...props}>
      {placeholder}
    </span>
  );
}

export function SelectContent({
  className,
  children,
  ...props
}: SelectContentProps) {
  return (
    <div
      className={cn(
        "absolute z-50 mt-1 max-h-96 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-800 dark:bg-gray-900",
        className
      )}
      {...props}
    >
      <div className="py-1">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          
          if (child.type === SelectItem) {
            return React.cloneElement(child, {
              className: cn(
                "flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-3 pr-3 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-100",
                child.props.className
              ),
            });
          }
          
          return child;
        })}
      </div>
    </div>
  );
}

export function SelectItem({
  value,
  className,
  children,
  ...props
}: SelectItemProps) {
  return (
    <div
      role="option"
      value={value}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
}