import * as React from 'react';
import { cn } from '../../lib/utils';
import * as LucideIcons from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'info';
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', className, ...props }, ref) => {
    const base = 'w-full rounded-lg p-4 inline-flex items-start';
    const variants = {
      default: 'bg-blue-50 text-blue-700',
      info: 'bg-indigo-50 text-indigo-700',
      destructive: 'bg-red-50 text-red-700',
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(base, variants[variant], className)}
        {...props}
      >
        {/** Icon slot; user should pass their own Lucide-react icon as child if needed */}
        <div className="flex-1" />
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export const AlertTitle: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={cn('font-semibold leading-none', className)} {...props}>
    {children}
  </p>
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={cn('mt-2 text-sm', className)} {...props}>
    {children}
  </p>
);
AlertDescription.displayName = 'AlertDescription';
