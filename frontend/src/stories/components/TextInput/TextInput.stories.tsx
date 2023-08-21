import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from '../../../components/ui/common/TextInput/TextInput';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  argTypes: {
    type: {
      options: ['text', 'email'],
      control: { type: 'radio' },
      defaultValue: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    id: 'text-input',
    type: 'text',
    disabled: false,
    label: 'Name',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
export const DisabledWithText: Story = {
  args: {
    ...Default.args,
    defaultValue: 'John',
    disabled: true,
  },
};
export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Error message',
    defaultValue: 'John',
  },
};
