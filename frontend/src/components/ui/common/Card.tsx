import * as React from 'react';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-md bg-white shadow-sm p-6 ${className}`}
      {...props}
    />
  ),
);

Card.displayName = 'Card';

export { Card };
