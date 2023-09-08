import React from 'react';
import styles from './TextInput.module.css';
import { cva } from 'class-variance-authority';

import {
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
  FormField,
  FormControl,
} from '../../../Form/Form';

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
    type: {
      shadows: styles.shadows,
      borders: styles.borders,
    },
  },
});

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  disabled?: boolean;
  styleVariant?: 'shadows' | 'borders';
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ control, name, label, type, disabled, className, styleVariant, ...props }, ref) => {
    const { onChange: onChangeProp } = props;
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={styles.wrapper}>
            <FormControl>
              <input
                type={type}
                className={`${inputVariants({
                  invalid: !!useFormField().error,
                  type: styleVariant,
                })} ${className}`}
                disabled={disabled}
                {...field}
                onChange={e => {
                  onChangeProp?.(e);
                  field.onChange(e.target.value);
                }}
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
