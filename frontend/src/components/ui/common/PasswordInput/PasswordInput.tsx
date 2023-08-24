import React, { useState } from 'react';
import styles from './PasswordInput.module.css';
import { ReactComponent as EyeOn } from '../../../../icons/eye-on.svg';
import { ReactComponent as EyeOf } from '../../../../icons/eye-off.svg';
import { FormField, FormItem, FormLabel, FormMessage, useFormField } from '../Form';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
}

export const PasswordInput = ({
  control,
  name,
  label,
  className,
  ...props
}: PasswordInputProps) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={styles.wrapper}>
          <FormLabel className={`${styles.label} ${field.value ? styles.active : ''} ${className}`}>
            {label}
          </FormLabel>
          <input
            {...field}
            type={isHidden ? 'password' : 'text'}
            id={useFormField().id}
            className={`${styles.input} ${useFormField().invalid ? styles.invalid : ''}`}
            placeholder=''
            {...props}
          />
          <button className={styles.button} onClick={() => setIsHidden(!isHidden)}>
            {isHidden ? <EyeOn /> : <EyeOf />}
          </button>
          <FormMessage className={styles.error} />
        </FormItem>
      )}
    />
  );
};
