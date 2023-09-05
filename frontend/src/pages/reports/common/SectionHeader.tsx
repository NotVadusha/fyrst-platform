import React, { ReactNode } from 'react';

export function SectionHeader({ children }: { children: ReactNode }) {
  return <h2 className='text-h2 font-bold'>{children}</h2>;
}
