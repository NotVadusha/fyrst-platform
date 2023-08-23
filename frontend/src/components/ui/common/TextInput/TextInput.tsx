import React from 'react';
import styles from './TextInput.module.css';

import {
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  useFormField,
  FormField,
} from '../Form'; // Update this path accordingly

export interface TextInputProps {
  control: any;
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ control, name, label, type, disabled }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={styles.wrapper}>
          <FormLabel className={`${styles.label} ${field.value ? styles.active : ''}`}>
            {label}
          </FormLabel>
          <input
            {...field}
            type={type}
            className={`${styles.input} ${useFormField().invalid ? styles.invalid : ''}`}
            placeholder=''
            disabled={disabled}
          />
          <FormMessage className={styles.error} />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
