import React, { ReactNode } from 'react';

export function SectionHeader({ children }: { children: ReactNode }) {
  return <h2 className='text-h3 font-medium'>{children}</h2>;
}
