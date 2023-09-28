import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { RadioButtonGroup, RadioButtonGroupProps } from './RadioGroup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Form } from '../../../Form/Form';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'UI/Common/RadioGroup',
  component: RadioButtonGroup,
};

export default meta;

type Story = StoryObj<RadioButtonGroupProps>;

const FormTemplate = ({
  name,
  options,
  size,
  ...props
}: Omit<RadioButtonGroupProps, 'control'>) => {
  const formSchema = y.object({
    city: y.string(),
  });

  type FormData = y.InferType<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: yupResolver<FormData>(formSchema),
  });

  function onSubmit(values: y.InferType<typeof formSchema>) {
    // do something : console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <RadioButtonGroup
          control={form.control}
          name={name}
          options={options}
          size={size}
          {...props}
        ></RadioButtonGroup>
      </form>
    </Form>
  );
};

export const Primary: Story = {
  args: {
    name: 'test1',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    size: 'big',
    className: 'flex flex-col gap-2',
  },
  render: args => <FormTemplate {...args} />,
};
