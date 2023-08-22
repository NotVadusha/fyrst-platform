import styles from './RadioButton.module.css';

import React from 'react';

export type Sizes = 'small' | 'big';

export interface RadioButtonProps {
  size: Sizes;
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  value: string;
}

const RadioButton = ({ size, name, label, checked, onChange, value }: RadioButtonProps) => {
  return (
    <label className={styles.container}>
      <input
        type='radio'
        checked={checked}
        name={name}
        className={`${styles.radio} ${styles[size]}`}
        onChange={onChange}
        value={value}
      ></input>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default RadioButton;
