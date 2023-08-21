import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Common/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    name: 'check',
    checked: false,
    label: 'Checkbox',
  },
};

export const Selected: Story = {
  args: {
    ...Primary.args,
    checked: true,
  },
};
