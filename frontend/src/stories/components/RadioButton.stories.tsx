// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import RadioButton from '../../components/ui/common/RadioButton/RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Primary: Story = {
  args: {
    size: 'big',
  },
  render: args => <RadioButton {...args} />,
};
