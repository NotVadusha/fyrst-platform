import React, { useMemo, useState } from 'react';
import styles from './Dropdownd.module.css';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow-down.svg';
import { FormControl, FormField, FormItem, FormLabel, useFormField } from '../Form';
import { cva } from 'class-variance-authority';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useCombinedRefs } from 'src/common/hooks/useCombinedRef';

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

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  control: any;
  name: string;
  options: DropdownOption[];
  ddType: 'default' | 'in-form';
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      control,
      name,
      options,
      ddType = 'default',
      label,
      placeholder,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeDropdown = () => {
      setIsOpen(false);
    };

    const dropdownRef = useDetectClickOutside({ onTriggered: closeDropdown });
    const combinedRef = useCombinedRefs(dropdownRef, ref);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          const currentOption = useMemo(
            () => options.find(opt => opt.value === field.value),
            [field.value, options],
          );

          return (
            <div className={`${className} relative`} ref={combinedRef}>
              <div className={styles.header} onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
                <p className={heading({ type: ddType, hidden: !currentOption })}>{label}</p>

                <div className={fieldVar({ type: ddType, active: isOpen })}>
                  {currentOption ? (
                    <p className={valueVar({ type: ddType })}>{currentOption.label}</p>
                  ) : (
                    <p className={styles.placeholder}>{placeholder}</p>
                  )}
                  <ArrowIcon className={arrow({ active: isOpen })} />
                </div>
              </div>
              <div className={menuVar({ closed: !isOpen })}>
                {options.map(opt => (
                  <FormItem className={styles.option} key={opt.value}>
                    <FormLabel>{opt.label}</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type='radio'
                        value={opt.value}
                        onChange={e => {
                          if (onChange) onChange(e);
                          field.onChange(opt.value);
                          setIsOpen(false);
                        }}
                        {...props}
                      />
                    </FormControl>
                  </FormItem>
                ))}
              </div>
            </div>
          );
        }}
      />
    );
  },
);

Dropdown.displayName = 'Dropdown';
