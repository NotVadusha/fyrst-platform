import styles from './RadioButton.module.css';

import React from 'react';

interface RadioButtonProps {
  size: 'small' | 'big';
  name: string;
  label: string;
  checked: boolean;
}

const RadioButton = ({ size, name, label, checked }: RadioButtonProps) => {
  return (
    <label className={styles.container}>
      <input
        type='radio'
        checked={checked}
        name={name}
        readOnly
        className={`${styles.radio} ${styles[size]}`}
      ></input>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default RadioButton;
