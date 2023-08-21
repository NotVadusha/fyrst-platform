import React, { useMemo, useState } from 'react';
import styles from './Button.module.css';
import { emitter } from 'src/utils/emitter';

export interface ButtonProps {
  type: 'primary' | 'secondary' | 'tertiary';
  label: string;
  state?: 'inactive';
  btnType?: 'submit' | 'button' | 'reset';
  imgSrc?: string;
  fullWidth?: boolean;
  eventName: string;
}

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  state,
  imgSrc,
  fullWidth,
  btnType = 'button',
  eventName,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouse = (mouseState: boolean) => state !== 'inactive' && setIsPressed(mouseState);
  const handleButtonClick = () => {
    if (eventName && emitter) {
      emitter.emit(eventName);
    }
  };

  const buttonClasses = useMemo(() => {
    return [
      styles[type],
      state && styles[state],
      isPressed && !imgSrc && styles.pressed,
      fullWidth && styles.fullWidth,
      imgSrc && styles.imgButton,
    ]
      .filter(Boolean)
      .join(' ');
  }, [type, state, imgSrc, isPressed, fullWidth]);

  return (
    <button
      className={buttonClasses}
      onMouseUp={handleMouse.bind(null, false)}
      onMouseDown={handleMouse.bind(null, true)}
      onClick={handleButtonClick}
      disabled={state === 'inactive'}
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
