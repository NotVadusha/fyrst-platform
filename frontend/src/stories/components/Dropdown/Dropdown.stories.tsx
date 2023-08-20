import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '../../../components/ui/common/Dropdown/Dropdown';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'Components/UI/Dropdown',
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    options: ['Kyiv', 'Lviv', 'Odessa'],
  },
};

export const WithSelected: Story = {
  args: {
    ...Default.args,
    defaultValue: 'Kyiv',
  },
};
