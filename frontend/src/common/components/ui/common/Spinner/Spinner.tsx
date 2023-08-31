import React, { ReactElement } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { NonNullableMapped } from 'shared/NonNullableMapped';

export const spinnerVariants = cva('bg-black rounded-full absolute inset-0 m-auto', {
  variants: {
    size: {
      lg: 'animate-[spinAroundLg_4s_linear_infinite]',
      sm: 'animate-[spinAroundSm_4s_linear_infinite]',
      base: 'animate-[spinAround_4s_linear_infinite]',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

export function Spinner({ size }: NonNullableMapped<VariantProps<typeof spinnerVariants>>) {
  const dots: ReactElement[] = [];

  function getSpinnerDotSize(size: 'sm' | 'lg' | 'base' | undefined, order: number) {
    switch (size) {
      case 'sm':
        return 1 + order;
      case 'lg':
        return 6 + order;
      case 'base':
        return 3 + order;
      default:
        return 3 + order;
    }
  }

  for (let i = 0; i < 8; i++) {
    dots.push(
      <span
        key={i}
        className={spinnerVariants({ size })}
        style={{
          animationDelay: `-${500 + i * 300}ms`,
          width: `${getSpinnerDotSize(size, i)}px`,
          height: `${getSpinnerDotSize(size, i)}px`,
        }}
      ></span>,
    );
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='relative'>{dots}</div>
    </div>
  );
}
