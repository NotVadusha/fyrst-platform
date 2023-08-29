import React from 'react';
import styles from './TextInput.module.css';
import { cva } from 'class-variance-authority';

import { FormItem, FormLabel, FormMessage, useFormField, FormField, FormControl } from '../Form';

const labelVariants = cva(styles.label, {
  variants: {
    active: {
      true: styles.active,
      false: '',
    },
  },
});

const inputVariants = cva(styles.input, {
  variants: {
    invalid: {
      true: styles.invalid,
      false: '',
    },
  },
});

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  disabled?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ control, name, label, type, disabled, className, ...props }, ref) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={styles.wrapper}>
            <FormControl>
              <input
                {...field}
                type={type}
                className={`${inputVariants({ invalid: !!useFormField().error })} ${className}`}
                disabled={disabled}
                value={field.value ?? ''}
                ref={ref}
                {...props}
              />
              <FormLabel className={labelVariants({ active: !!field.value })}>{label}</FormLabel>
            </FormControl>
            <FormMessage className={styles.error} />
          </FormItem>
        )}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
