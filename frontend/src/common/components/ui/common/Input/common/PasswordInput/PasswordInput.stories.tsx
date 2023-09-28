import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PasswordInput, PasswordInputProps } from './PasswordInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Form } from '../../../Form/Form';

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,

  title: 'UI/Common/Password Input',
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

interface Props extends Omit<PasswordInputProps, 'control'> {
  name: string;
  label: string;
}

const FormTemplate = ({ name, label }: Props) => {
  const formSchema = y.object({
    password: y
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one digit')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('Password is required'),
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
        <PasswordInput name={name} control={form.control} label={label} />
      </form>
    </Form>
  );
};

export const Default: Story = {
  args: {
    name: 'password',
    label: 'Password',
  },
  render: args => {
    return <FormTemplate {...args} />;
  },
};
