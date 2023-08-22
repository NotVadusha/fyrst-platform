import React, { useState } from 'react';
import styles from './TextInput.module.css';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: 'text' | 'email';
  label: string;
  isFocused?: boolean;
  error?: string;
}

export const TextInput = ({
  id,
  error,
  type,
  className,
  onFocus,
  label,
  value,
  ...props
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.wrapper}>
      <label
        htmlFor={id}
        className={`${styles.label} ${
          isFocused || value ? styles['label-active'] : ''
        } ${className}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder=''
        value={value}
        className={`${styles.input} ${error ? styles['input-error'] : ''} ${
          value || isFocused ? styles['input-filled'] : ''
        } ${isFocused ? styles['input-focused'] : ''} ${
          props.disabled ? styles['input-disabled'] : ''
        }`}
        onFocus={e => {
          onFocus?.(e);
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
};
