import React from 'react';
import { Control, Path } from 'react-hook-form';
import { FormField } from '../Form';
import RadioButton from './RadioButton';

export type RadioButtonGroupOption = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

export type RadioButtonGroupProps<T extends typeof FormField> = {
  name: Path<T>;
  options: RadioButtonGroupOption[];
  control: Control<T>;
};

const RadioButtonGroup = <T extends typeof FormField>({
  name,
  options,
  control,
}: RadioButtonGroupProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div>
            {options.map(opt => (
              <RadioButton
                size='small'
                value={opt.value}
                checked={field.value === opt.value}
                name={name}
                label={opt.label}
                key={opt.label}
                onChange={field.onChange}
              ></RadioButton>
            ))}
          </div>
        );
      }}
    ></FormField>
  );
};

export default RadioButtonGroup;
