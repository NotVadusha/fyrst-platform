import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import RadioButtonGroup, { RadioButtonGroupProps } from './RadioButtonGroup';
import { FieldValues, useForm, useWatch } from 'react-hook-form';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Components/Common/RadioButtonGroup',
  component: RadioButtonGroup,
};

export default meta;

type Story = StoryObj<RadioButtonGroupProps<FieldValues>>;

const GroupWithControl = () => {
  const { control } = useForm({ defaultValues: { test: '1' } });
  return (
    <RadioButtonGroup
      control={control}
      name={'test'}
      options={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ]}
      sizes='small'
    ></RadioButtonGroup>
  );
};

export const Primary: Story = {
  render: () => <GroupWithControl />,
};

export const InForm = () => {
  const { control, getValues } = useForm({
    mode: 'onChange',
    defaultValues: { test1: '1' },
  });

  useWatch({ control, name: 'test1' });

  return (
    <div>
      <div className='flex gap-4'>
        <RadioButtonGroup
          control={control}
          name={'test1'}
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          sizes='big'
        ></RadioButtonGroup>
      </div>
      <pre>
        <code>{JSON.stringify(getValues(), null, 2)}</code>
      </pre>
    </div>
  );
};
