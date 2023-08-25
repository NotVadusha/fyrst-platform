import React, { useState } from 'react';
import styles from './PhoneInput.module.css';

import {
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
  FormField,
} from 'src/components/ui/common/Form';
import PhoneInput from 'react-phone-input-2';

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  isFocused?: boolean;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({
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
            inputClass={`${styles.input} ${useFormField().invalid ? styles.invalid : ''}`}
            placeholder=''
            disabled={disabled}
            specialLabel={''}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            onChange={(value, data, event) => (props.onChange ? props.onChange(event) : '')}
          />
          <FormMessage className={styles.error} />
        </FormItem>
      )}
    />
  );
};

export default CustomPhoneInput;
