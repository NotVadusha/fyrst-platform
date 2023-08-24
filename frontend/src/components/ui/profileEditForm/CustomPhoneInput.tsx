import React, { useState } from 'react';
import styles from './PhoneInput.module.css';

import { FormItem, FormLabel, FormMessage, useFormField, FormField } from '../common/Form'; // Update this path accordingly
import PhoneInput from 'react-phone-input-2';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  isFocused?: boolean;
}

const CustomPhoneInput: React.FC<TextInputProps> = ({
  control,
  name,
  label,
  type,
  disabled,
  onFocus,
  onBlur,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const formField = useFormField().invalid ? styles.invalid : '';
  return (
    <FormField
      control={control}
      name={'phoneNumber'}
      render={({ field }) => (
        <FormItem className={styles.wrapper}>
          <FormLabel className={`${styles.label} ${field.value ? styles.active : ''}`}>
            {label}
          </FormLabel>
          <PhoneInput
            {...field}
            inputClass={`${styles.input} ${formField}`}
            placeholder=''
            disabled={disabled}
            specialLabel={''}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          <FormMessage className={styles.error} />
        </FormItem>
      )}
    />
  );
};

export default CustomPhoneInput;
