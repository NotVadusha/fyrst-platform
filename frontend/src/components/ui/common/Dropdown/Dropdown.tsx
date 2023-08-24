import React, { useEffect, useState } from 'react';
import styles from './Dropdownd.module.css';
import { ReactComponent as ArrowIcon } from '../../../../icons/arrow-down.svg';
import { FormField, FormItem, FormLabel, useFormField } from '../Form';
import { cva } from 'class-variance-authority';

const arrow = cva(styles.arrow, {
  variants: {
    active: {
      true: styles.active,
      false: '',
    },
  },
});

const heading = cva(styles.heading, {
  variants: {
    type: {
      default: styles.default,
      ['in-form']: styles['in-form'],
    },
    hidden: {
      true: styles.hidden,
      false: '',
    },
  },
});

const fieldVar = cva(styles.field, {
  variants: {
    type: {
      default: styles.default,
      ['in-form']: styles['in-form'],
    },
    active: {
      active: styles.active,
      false: '',
    },
  },
});

const valueVar = cva(styles.value, {
  variants: {
    type: {
      default: styles.default,
      ['in-form']: styles['in-form'],
    },
  },
});

const menuVar = cva(styles.menu, {
  variants: {
    closed: {
      true: styles.closed,
      false: '',
    },
  },
});

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  options: DropdownOption[];
  ddType: 'default' | 'in-form';
  label: string;
  placeholder: string;
}

const Dropdown = React.forwardRef<HTMLInputElement, DropdownProps>(
  (
    { control, name, options, ddType = 'default', label, placeholder, className, ...props },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className='relative'>
            <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
              <p className={heading({ type: ddType, hidden: !label })}>{label}</p>

              <div className={fieldVar({ type: ddType, active: isOpen })}>
                {field.value ? (
                  <p className={valueVar({ type: ddType })}>
                    {options.find(opt => opt.value === field.value)?.label}
                  </p>
                ) : (
                  <p className={styles.placeholder}>{placeholder}</p>
                )}
                <ArrowIcon className={arrow({ active: isOpen })} />
              </div>
            </div>
            <div className={menuVar({ closed: !isOpen })}>
              {options.map(opt => (
                <FormItem className={styles.option} key={opt.value}>
                  <FormLabel className='pointer-events-none'>{opt.label}</FormLabel>
                  <input
                    {...field}
                    type='radio'
                    id={useFormField().formItemId}
                    value={opt.value}
                    onChange={() => {
                      field.onChange(opt.value);
                      setIsOpen(false);
                    }}
                    {...props}
                  />
                </FormItem>
              ))}
            </div>
          </div>
        )}
      />
    );
  },
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
