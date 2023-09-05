import React from 'react';

import { cn } from 'src/common/helpers/helpers';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-grey', className)} {...props} />;
}

export { Skeleton };
