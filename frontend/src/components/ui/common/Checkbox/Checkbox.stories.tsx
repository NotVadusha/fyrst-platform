import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Checkbox, { CheckboxProps } from './Checkbox';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Form } from '../Form';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Common/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

interface Props extends Omit<CheckboxProps, 'control'> {
  name: string;
  label: string;
}

const FormTemplate = ({ name, label }: Props) => {
  const formSchema = y.object({
    username: y.boolean().required(),
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
        <Checkbox control={form.control} name={name} label={label} />
      </form>
    </Form>
  );
};

export const Default: Story = {
  args: {
    name: 'agreement',
    label: 'Agree with terms and conditions',
  },
  render: args => {
    return <FormTemplate {...args} />;
  },
};
