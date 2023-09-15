import React, { useMemo, useState } from 'react';
import styles from './Dropdown.module.css';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow-down.svg';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from '../Form/Form';
import { cva } from 'class-variance-authority';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useCombinedRefs } from 'src/common/hooks/use-combined-ref/useCombinedRef.hook';

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
      shadows: styles.shadows,
      borders: styles.borders,
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
      shadows: styles.shadows,
      borders: styles.borders,
    },
    active: {
      active: styles.active,
      false: '',
    },
    invalid: {
      true: styles.invalid,
      false: '',
    },
  },
});

const valueVar = cva(styles.value, {
  variants: {
    type: {
      shadows: styles.shadows,
      borders: styles.borders,
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
  styleVariant?: 'shadows' | 'borders';
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
      styleVariant = 'shadows',
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
            <div className={className} ref={combinedRef}>
              <div className='relative'>
                <div className={styles.header} onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
                  <p className={heading({ type: styleVariant, hidden: !currentOption })}>{label}</p>

                  <div
                    className={fieldVar({
                      type: styleVariant,
                      active: isOpen,
                      invalid: !!useFormField().error,
                    })}
                  >
                    {currentOption ? (
                      <p className={valueVar({ type: styleVariant })}>{currentOption.label}</p>
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
              <FormMessage className='m-0 mt-1 pl-3 text-xs text-red'></FormMessage>
            </div>
          );
        }}
      />
    );
  },
);

Dropdown.displayName = 'Dropdown';
