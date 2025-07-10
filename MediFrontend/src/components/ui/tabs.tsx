// src/components/ui/tabs.ts
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('w-full', className)} {...props}>
      {children}
    </div>
  );
};
Tabs.displayName = 'Tabs';

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={cn('flex space-x-2 border-b', className)} {...props}>
    {children}
  </div>
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}
export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, className, ...props }) => (
  <button
    className={cn('px-3 py-1 font-medium hover:text-blue-600', className)}
    {...props}
  >
    {children}
  </button>
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}
export const TabsContent: React.FC<TabsContentProps> = ({ children, className, ...props }) => (
  <div className={cn('pt-4', className)} {...props}>
    {children}
  </div>
);
TabsContent.displayName = 'TabsContent';
