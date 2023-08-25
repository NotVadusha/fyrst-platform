import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Dropdown, { DropdownOption, DropdownProps } from './Dropdown';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Form } from '../Form';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'UI/Common/Dropdown',
  decorators: [
    Story => (
      <div style={{ minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const FormTemplate = ({
  name,
  label,
  placeholder,
  ddType,
  options,
}: Omit<DropdownProps, 'control'>) => {
  const formSchema = y.object({
    city: y.string(),
  });

  type FormData = y.InferType<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: yupResolver<FormData>(formSchema),
  });

  function onSubmit(values: y.InferType<typeof formSchema>) {
    // do smth
    console.log(values.city);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Dropdown
          control={form.control}
          name={name}
          label={label}
          options={options}
          ddType={ddType}
          placeholder={placeholder}
        />
      </form>
    </Form>
  );
};

export const Default: Story = {
  args: {
    name: 'city',
    label: 'City',
    placeholder: 'Chose city',
    ddType: 'default',
    options: [
      { value: 'kyiv', label: 'Kyiv' },
      { value: 'lviv', label: 'Lviv' },
      { value: 'odessa', label: 'Odessa' },
    ],
  },
  render: args => {
    return <FormTemplate {...args} />;
  },
};
