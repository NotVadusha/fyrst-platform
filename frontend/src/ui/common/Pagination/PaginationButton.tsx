import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { NonNullableMapped } from 'shared/NonNullableMapped';

const paginationButtonVariants = cva(
  'border-none rounded-lg px-2 py-1 font-semibold outline-none focus:ring-1',
  {
    variants: {
      appearance: {
        base: 'bg-transparent text-blue focus:ring',
        active: 'bg-blue text-white focus:ring-dark-blue',
      },
    },
    defaultVariants: {
      appearance: 'base',
    },
  },
);

interface PaginationButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    NonNullableMapped<VariantProps<typeof paginationButtonVariants>> {}

export function PaginationButton(props: PaginationButtonProps) {
  const { appearance, ...rest } = props;

  return <button className={paginationButtonVariants({ appearance })} {...rest} />;
}
