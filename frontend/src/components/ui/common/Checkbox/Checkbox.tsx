import React from 'react';

import styles from './Checkbox.module.css';

export interface CheckboxProps {
  name: string;
  label: string;
  checked: boolean;
}

const Checkbox = ({ name, label, checked }: CheckboxProps) => {
  return (
    <label className={styles.label}>
      <input type='checkbox' checked={checked} name={name} className={styles.check}></input>
      {label}
    </label>
  );
};

export default Checkbox;
