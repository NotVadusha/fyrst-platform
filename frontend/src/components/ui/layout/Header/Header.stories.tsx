import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from 'src/components/ui/layout/Header/Header';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'ui/layout/Header',
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: 'Page',
  },
};

export const WithChildren: Story = {
  args: {
    ...Default.args,
    children: <p>Text</p>,
  },
};
