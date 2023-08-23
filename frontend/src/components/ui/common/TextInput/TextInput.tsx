import React, { useState } from 'react';
import styles from './TextInput.module.css';

import { FormItem, FormLabel, FormMessage, useFormField, FormField } from '../Form'; // Update this path accordingly

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  disabled?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ control, name, label, type, disabled, onFocus, onBlur, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={styles.wrapper}>
            <FormLabel
              className={`${styles.label} ${
                field.value ? styles.active : ''
              } ${className} pointer-events-none`}
            >
              {label}
            </FormLabel>
            <input
              {...field}
              type={type}
              id={useFormField().id}
              className={`${styles.input} ${useFormField().invalid ? styles.invalid : ''}`}
              placeholder=''
              disabled={disabled}
              onFocus={e => {
                onFocus?.(e);
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              {...props}
              ref={ref}
            />
            <FormMessage className={styles.error} />
          </FormItem>
        )}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
