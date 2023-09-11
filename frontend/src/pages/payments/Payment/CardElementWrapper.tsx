import React from 'react';
import styles from './Payment.module.css';
import classNames from 'classnames';

type CardElementWrapperProps = {
  children: React.ReactNode;
  label: string;
  error?: string;
  focus: boolean;
};

export const CardElementWrapper: React.FC<CardElementWrapperProps> = ({
  children,
  label,
  error,
  focus,
}) => {
  let className = classNames('w-full flex flex-col gap-2');

  if (focus && !error) className = classNames(className, styles.cardInputFocus);
  if (error) className = classNames(className, styles.cardInputError);

  return (
    <div className={className}>
      <p className={styles.cardInputText}>{label}</p>
      {children}
      {error ? <p className={styles.cardInputErrorText}>{error}</p> : null}
    </div>
  );
};
