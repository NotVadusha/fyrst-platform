import React, { ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { NonNullableMapped } from 'shared/NonNullableMapped';

const tabButtonVariants = cva('', {
  variants: {
    variant: {
      default: 'text-grey',
      active: 'text-blue underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TabButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    NonNullableMapped<VariantProps<typeof tabButtonVariants>> {
  tab: number;
  setTab: (tab: number) => void;
  children: ReactNode;
}

export function TabButton({ tab, setTab, children, variant, ...props }: TabButtonProps) {
  return (
    <button onClick={() => setTab(tab)} className={tabButtonVariants({ variant })} {...props}>
      {children}
    </button>
  );
}
