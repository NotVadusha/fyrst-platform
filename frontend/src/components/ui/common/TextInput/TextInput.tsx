import React, { useState } from 'react';
import styles from './TextInput.module.css';

export interface TextInputProps {
  id: string;
  type: 'text' | 'email';
  label: string;
  defaultValue: string;
  disabled?: boolean;
  error?: string;
}

export const TextInput = ({
  id,
  type,
  label,
  defaultValue = '',
  disabled,
  error,
}: TextInputProps) => {
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.wrapper}>
      <label
        htmlFor={id}
        className={`${styles.label} ${isFocused || value ? styles['label-active'] : ''}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder=''
        value={value}
        className={`${styles.input} ${error ? styles['input-error'] : ''} ${
          value || isFocused ? styles['input-filled'] : ''
        } ${isFocused ? styles['input-focused'] : ''} ${disabled ? styles['input-disabled'] : ''}`}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
};
