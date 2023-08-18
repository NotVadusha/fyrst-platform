import React, { useState } from 'react';

import styles from './Checkbox.module.css';

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <input
      type='checkbox'
      checked={checked}
      onClick={handleChecked}
      className={styles.root}
    ></input>
  );
};

export default Checkbox;
