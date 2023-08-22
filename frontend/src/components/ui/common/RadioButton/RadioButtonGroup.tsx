import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import RadioButton, { Sizes } from './RadioButton';

export type RadioButtonGroupOption = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

export type RadioButtonGroupProps<T extends FieldValues> = {
  name: Path<T>;
  options: RadioButtonGroupOption[];
  control: Control<T>;
  sizes: Sizes;
};

const RadioButtonGroup = <T extends FieldValues>({
  name,
  options,
  control,
  sizes,
}: RadioButtonGroupProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className='flex flex-col gap-4'>
            {options.map(opt => (
              <RadioButton
                size={sizes}
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
    ></Controller>
  );
};

export default RadioButtonGroup;
