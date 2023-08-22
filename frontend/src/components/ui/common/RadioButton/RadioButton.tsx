import styles from './RadioButton.module.css';

import React from 'react';

export type Sizes = 'small' | 'big';

export interface RadioButtonProps {
  size: Sizes;
  name: string;
  label: string;
  // checked: boolean;
  onChange?: (e: any) => void;
  value?: string;
  // checked: boolean;
}
const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ size, name, label, value, onChange, ...props }, ref) => {
    return (
      <label className={styles.container}>
        <input
          {...props}
          ref={ref}
          type='radio'
          checked={value === label}
          value={value === label ? 'on' : 'off'}
          name={name}
          onChange={() => onChange?.(label)}
          className={`${styles.radio} ${styles[size]}`}
        ></input>
        <span className={styles.label}>{label}</span>
      </label>
    );
  },
);

export default RadioButton;
