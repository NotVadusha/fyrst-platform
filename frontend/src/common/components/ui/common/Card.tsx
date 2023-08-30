import * as React from 'react';
import { cn } from 'src/common/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-md bg-white shadow-sm p-6', className)} {...props} />
  ),
);

Card.displayName = 'Card';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-bold text-lg', className)} {...props} />
  ),
);

CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn('mt-4', className)} {...props} />,
);

CardContent.displayName = 'CardContent';

export { Card, CardTitle, CardContent };
