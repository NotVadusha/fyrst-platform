import React, { MouseEventHandler, useMemo, useState } from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  type: 'primary' | 'secondary' | 'tertiary';
  state?: 'inactive';
  btnType?: 'submit' | 'button' | 'reset';
  onClick: MouseEventHandler<HTMLButtonElement>;
  imgSrc?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  state,
  children,
  imgSrc,
  fullWidth,
  btnType = 'button',
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouse = (mouseState: boolean) => state !== 'inactive' && setIsPressed(mouseState);

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
      onClick={onClick}
      disabled={state === 'inactive'}
      type={btnType}
    >
      {imgSrc && type === 'primary' ? (
        <div className={styles.contentWrapper}>
          <img src={imgSrc} alt='button icon' className={styles.img} />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
