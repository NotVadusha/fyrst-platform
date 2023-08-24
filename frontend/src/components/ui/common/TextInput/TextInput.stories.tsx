import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TextInput, { TextInputProps } from './TextInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Form } from '../Form';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'UI/Common/TextInput',
};

export default meta;

type Story = StoryObj<typeof TextInput>;

interface Props extends Omit<TextInputProps, 'control'> {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
}

const FormTemplate = ({ name, label, type, disabled }: Props) => {
  const formSchema = y.object({
    username: y
      .string()
      .min(7, {
        message: 'Username must be at least 7 characters.',
      })
      .required(),
  });

  type FormData = y.InferType<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  function onSubmit(values: y.InferType<typeof formSchema>) {
    // do smth
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <TextInput
          name={name}
          control={form.control}
          label={label}
          type={type}
          disabled={disabled}
        />
      </form>
    </Form>
  );
};

export const Default: Story = {
  args: {
    name: 'username',
    label: 'Username',
    type: 'text',
    disabled: false,
  },
  render: args => {
    return <FormTemplate {...args} />;
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: args => {
    return <FormTemplate {...args} />;
  },
};
