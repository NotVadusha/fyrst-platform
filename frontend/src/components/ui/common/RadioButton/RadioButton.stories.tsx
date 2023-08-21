// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import RadioButton from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/Common/RadioButton',
  component: RadioButton,
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Primary: Story = {
  args: {
    size: 'big',
    name: 'radio',
    checked: false,
    label: 'RadioButton',
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: 'small',
  },
};

export const Checked: Story = {
  args: {
    ...Primary.args,
    checked: true,
  },
};

export const Group: Story = {
  decorators: [
    Story => (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Story args={Primary.args} />
        <Story args={Checked.args} />
      </div>
    ),
  ],
};
