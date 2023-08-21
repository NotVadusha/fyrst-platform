import type { Meta, StoryObj } from '@storybook/react';

import { PasswordInput } from '../../../components/ui/common/PasswordInput/PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    id: 'password-input',
    label: 'Password',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: 'Password not correct',
  },
};
