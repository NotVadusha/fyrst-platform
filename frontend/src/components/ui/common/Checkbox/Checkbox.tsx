import React from 'react';

import styles from './Checkbox.module.css';
import { FormField, FormItem, FormLabel, useFormField } from '../Form';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  checked?: boolean;
}

const Checkbox = ({ control, name, label, className, checked, ...props }: CheckboxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={styles.wrapper}>
          <input
            {...field}
            type='checkbox'
            id={useFormField().id}
            className={`${styles.check} ${className}`}
            checked={checked || field.value}
            placeholder=''
            {...props}
          />
          <FormLabel className={styles.label}>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
};

export default Checkbox;
