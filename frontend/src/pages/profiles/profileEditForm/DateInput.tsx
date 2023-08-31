import React, { useState } from 'react';
import styles from './DefaultInput.module.css';
import {
  FormItem,
  FormMessage,
  useFormField,
  FormField,
  FormLabel,
} from 'src/common/components/ui/common/Form/Form';

export interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  isFocused?: boolean;
  label: string;
}

const DateInput: React.FC<DateInputProps> = ({ control, label, name, ...props }) => {
  const maxBirthdate = new Date();
  maxBirthdate.setFullYear(maxBirthdate.getFullYear() - 16);

  const maxDateFormatted = maxBirthdate.toISOString().split('T')[0];
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <FormItem className={styles.wrapper}>
            <FormLabel className={`${styles.label} ${field.value ? styles.active : ''}`}>
              {label}
            </FormLabel>
            <input
              className={`${styles.input} ${useFormField().invalid ? styles.invalid : ''}`}
              type='date'
              placeholder=''
              max={maxDateFormatted}
              {...field}
            />
            <FormMessage className={styles.error} />
          </FormItem>
        </div>
      )}
    />
  );
};

export default DateInput;
