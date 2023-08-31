import React, { useState } from 'react';
import styles from './DefaultInput.module.css';

import {
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
  FormField,
} from 'src/common/components/ui/common/Form/Form';
import PhoneInput from 'react-phone-input-2';

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  isFocused?: boolean;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ control, name, label, disabled }) => {
  const formField = useFormField().invalid ? styles.invalid : '';
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={styles.wrapper}>
          <FormLabel className={`${styles.label} ${field.value ? styles.active : ''}`}>
            {label}
          </FormLabel>
          <PhoneInput
            inputClass={`${styles.input} ${fieldState.invalid ? styles.invalid : ''}`}
            placeholder=''
            disabled={disabled}
            specialLabel={''}
            {...field}
          />
          <FormMessage className={styles.error} />
        </FormItem>
      )}
    />
  );
};

export default CustomPhoneInput;
