import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dropdown, DropdownProps } from './Dropdown';
import { Button } from '../Button';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Form } from '../Form/Form';

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
  styleVariant = 'borders',
  options,
}: Omit<DropdownProps, 'control'>) => {
  const formSchema = y.object({
    city: y.string().required('city has to be selected'),
  });

  type FormData = y.InferType<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: yupResolver<FormData>(formSchema),
  });

  function onSubmit(values: y.InferType<typeof formSchema>) {
    // do smth
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Dropdown
          control={form.control}
          name={name}
          label={label}
          options={options}
          styleVariant={styleVariant}
          placeholder={placeholder}
        />
        <Button type='submit' variant='primary' className='mt-4'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export const Default: Story = {
  args: {
    name: 'city',
    label: 'City',
    placeholder: 'Chose city',
    styleVariant: 'shadows',
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
