import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toastVariants,
} from './Toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Form } from '../Form';
import { VariantProps } from 'class-variance-authority';
import { ToasterToast } from './useToast';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'UI/Common/Toast',
};

export default meta;

type Story = StoryObj<typeof Toaster>;

interface Props extends VariantProps<typeof toastVariants> {
  title: string;
  description: string;
}

function Toaster({ title, description, ...props }: Props) {
  return (
    <ToastProvider>
      <Toast {...props}>
        <div className='grid gap-1'>
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export const Default: Story = {
  args: {
    title: 'Successfully signed up.',
    description: 'Check email for further instructions.',
  },
  render: args => {
    return <Toaster {...args} />;
  },
};

export const Destructive: Story = {
  args: {
    title: 'Something went wrong.',
    description: 'Please, try again later.',
    variant: 'destructive',
  },
  render: args => {
    return <Toaster {...args} />;
  },
};
