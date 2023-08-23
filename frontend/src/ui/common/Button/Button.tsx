import React, { useMemo } from 'react';
import styles from './Button.module.css';
import { emitter } from '../../../utils/emitter';

export interface ButtonProps {
  type: 'primary' | 'secondary' | 'tertiary';
  label: string;
  disabled?: boolean;
  btnType?: 'submit' | 'button' | 'reset';
  imgSrc?: string;
  fullWidth?: boolean;
  eventName: string;
}

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  disabled,
  imgSrc,
  fullWidth,
  btnType = 'button',
  eventName,
}) => {
  const handleButtonClick = () => {
    if (eventName && emitter) {
      emitter.emit(eventName);
    }
  };

  const buttonClasses = useMemo(() => {
    return [
      styles['btn'],
      styles[type],
      disabled && styles.disabled,
      fullWidth && styles.fullWidth,
      imgSrc && styles.imgButton,
    ]
      .filter(Boolean)
      .join(' ');
  }, [type, disabled, imgSrc, fullWidth]);

  return (
    <button
      className={buttonClasses}
      onClick={handleButtonClick}
      disabled={disabled}
      type={btnType}
    >
      {imgSrc && type === 'primary' ? (
        <div className={styles.contentWrapper}>
          <img src={imgSrc} alt='button icon' className={styles.img} />
          {label}
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
