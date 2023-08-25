import React, { useState } from 'react';
import styles from './Dropdownd.module.css';
import { ReactComponent as ArrowIcon } from '../../../../icons/arrow-down.svg';

interface DropdownProps {
  defaultValue: string;
  options: string[];
  label: string;
  placeholder: string;
  namespace: string;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ options, defaultValue, label = '', placeholder = 'Select an option' }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(defaultValue);

    return (
      <div className={styles['select__container']} ref={ref}>
        {label && <p className='select__label'>{label}</p>}
        <label className={styles['select__header']}>
          <span
            className={`${styles['select__placeholder']} ${
              value ? styles['select__placeholder--active'] : ''
            }`}
          >
            {placeholder}
          </span>
          <input
            type='text'
            readOnly
            value={value}
            className={`${styles['select__input']} ${
              isOpen ? styles['select__input--active'] : ''
            }`}
          />
          <button
            className={`${styles['select__button']} ${
              isOpen ? styles['select__button--active'] : ''
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ArrowIcon />
          </button>
        </label>
        {isOpen && (
          <ul className={styles['select__menu']}>
            {options.map(optionValue => (
              <li key={optionValue}>
                <button
                  className={styles['select__menu-item']}
                  onClick={() => {
                    setValue(optionValue);
                    setIsOpen(false);
                  }}
                >
                  {optionValue}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';

export { Dropdown, type DropdownProps };
