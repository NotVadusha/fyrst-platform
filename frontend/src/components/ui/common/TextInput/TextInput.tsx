import React from 'react';
import styles from './TextInput.module.css';

import { FormItem, FormLabel, FormMessage, useFormField, FormField } from '../Form';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  control,
  name,
  label,
  type,
  disabled,
  className,
  ...props
}) => {
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
            {...props}
          />
          <FormMessage className={styles.error} />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
