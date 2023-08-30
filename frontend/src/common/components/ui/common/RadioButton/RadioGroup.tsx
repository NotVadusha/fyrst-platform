import React from 'react';
import { FormControl, FormField, FormItem, FormLabel } from '../Form';
import styles from './RadioGroup.module.css';

export type Sizes = 'small' | 'big';

export type RadioButtonGroupOption = {
  value: string | number;
  label: string;
};

export interface RadioButtonGroupProps extends React.HTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  options: RadioButtonGroupOption[];
  size?: Sizes;
}

export const RadioButtonGroup = React.forwardRef<HTMLInputElement, RadioButtonGroupProps>(
  ({ control, name, options, size = 'small', className, ...props }, ref) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <div className={className}>
              {options.map(option => (
                <FormItem key={option.value}>
                  <FormLabel className={styles.container}>
                    <FormControl>
                      <input
                        {...field}
                        type='radio'
                        ref={ref}
                        value={option.value}
                        className={`${styles.radio} ${styles[size]}`}
                        {...props}
                      />
                    </FormControl>
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </div>
          );
        }}
      />
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';
