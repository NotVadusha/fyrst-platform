import React, { useState } from 'react';
import styles from './PasswordInput.module.css';
import { ReactComponent as EyeOn } from '../../../../icons/eye-on.svg';
import { ReactComponent as EyeOf } from '../../../../icons/eye-off.svg';

export interface PasswordInputProps {
  id: string;
  label: string;
  value: any;
  setValue: (e: any) => void
  error?: string;
}

export const PasswordInput = ({ id, label, error, value, setValue }: PasswordInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

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
        type={isHidden ? 'password' : 'text'}
        placeholder=''
        value={value}
        className={`${styles.input} ${styles['input-password']} ${
          error ? styles['input-error'] : ''
        } ${value || isFocused ? styles['input-filled'] : ''} ${
          isFocused ? styles['input-focused'] : ''
        } `}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button className={styles.button} onClick={() => setIsHidden(!isHidden)}>
        {isHidden ? <EyeOn /> : <EyeOf />}
      </button>
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
};
