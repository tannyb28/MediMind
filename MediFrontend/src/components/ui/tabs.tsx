import * as React from 'react';
import { cn } from '../../lib/utils';

interface TabsProps { children: React.ReactNode; defaultValue?: string; className?: string; }
export const Tabs: React.FC<TabsProps> = ({ children, className }) => <div className={className}>{children}</div>;

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={cn('flex space-x-2 border-b', className)} {...props}>
    {children}
  </div>
);

interface TabsTriggerProps { value: string; children: React.ReactNode; }
export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children }) => (
  <button className="px-3 py-1 font-medium hover:text-blue-600">{children}</button>
);

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ children, className, ...props }) => (
  <div className={cn('pt-4', className)} {...props}>
    {children}
  </div>
);
