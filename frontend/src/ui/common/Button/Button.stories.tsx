import type { Meta, StoryObj } from '@storybook/react';
import GoogleLogo from '../../../icons/google.svg';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,

  tags: ['autodocs'],
  args: {
    type: 'primary',
    label: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
  },
};

export const Inactive: Story = {
  args: {
    type: 'primary',
    disabled: true,
  },
};

export const ButtonWithIcon: Story = {
  args: {
    type: 'primary',
    imgSrc: GoogleLogo,
    fullWidth: true,
  },
};

export const ButtonWithFullWidth: Story = {
  args: {
    type: 'primary',
    fullWidth: true,
  },
};
