import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as GoogleLogo } from 'src/assets/icons/google.svg';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,

  tags: ['autodocs'],
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};

export const Inactive: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};

export const ButtonWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <div className='flex items-center gap-2'>
        <GoogleLogo />
        Sign in with Google
      </div>
    ),
    className: 'w-full',
  },
};

export const ButtonWithCustomClasses: Story = {
  args: {
    variant: 'primary',
    className: 'w-full bg-red hover:bg-red-2',
  },
};
