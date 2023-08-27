import React from 'react';

import styles from './Checkbox.module.css';
import { FormControl, FormField, FormItem, FormLabel, useFormField } from '../Form';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
}

const Checkbox = ({ control, name, label, className, ...props }: CheckboxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={styles.wrapper}>
          <FormControl>
            <input
              {...field}
              type='checkbox'
              className={`${styles.check} ${className}`}
              placeholder=''
              {...props}
            />
          </FormControl>
          <FormLabel className={styles.label}>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
};

export default Checkbox;
