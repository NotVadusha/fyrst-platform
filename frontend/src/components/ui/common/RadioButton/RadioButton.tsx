import styles from './RadioButton.module.css';

import React, { useState } from 'react';

interface RadioButtonProps {
  size: 'small' | 'big';
}

const RadioButton = (props: RadioButtonProps) => {
  const { size } = props;
  const [checked, setChecked] = useState(false);

  const handleChecked = () => setChecked(!checked);

  return (
    <>
      <input
        type='radio'
        checked={checked}
        onClick={handleChecked}
        readOnly
        className={`${styles.root} ${styles[size]}`}
      ></input>
    </>
  );
};

export default RadioButton;
