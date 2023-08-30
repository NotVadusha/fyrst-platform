import React, { useState } from 'react';
import styles from './PasswordInput.module.css';
import { ReactComponent as EyeOn } from 'src/assets/icons/eye-on.svg';
import { ReactComponent as EyeOf } from 'src/assets/icons/eye-off.svg';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from '../Form';
import { cva } from 'class-variance-authority';

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

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ control, name, label, className, ...props }, ref) => {
    const { onChange: onChangeProp } = props;
    const [isHidden, setIsHidden] = useState(true);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={styles.wrapper}>
            <FormControl>
              <input
                {...field}
                type={isHidden ? 'password' : 'text'}
                className={`${inputVariants({ invalid: !!useFormField().error })} ${className}`}
                onChange={e => {
                  onChangeProp?.(e);
                  field.onChange(e.target.value);
                }}
                ref={ref}
                {...props}
              />
            </FormControl>
            <FormLabel className={labelVariants({ active: !!field.value })}>{label}</FormLabel>
            <button
              className={styles.button}
              type='button'
              onClick={() => {
                setIsHidden(!isHidden);
              }}
            >
              {isHidden ? <EyeOn /> : <EyeOf />}
            </button>
            <FormMessage className={styles.error} />
          </FormItem>
        )}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput, type PasswordInputProps };
