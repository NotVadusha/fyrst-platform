import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'base',
  },
  argTypes: {
    size: {
      table: {
        defaultValue: {
          summary: 'base',
        },
      },
    },
  },
  render(args) {
    return (
      <div className='h-28 flex items-center'>
        <Spinner {...args} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Base: Story = {};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};
