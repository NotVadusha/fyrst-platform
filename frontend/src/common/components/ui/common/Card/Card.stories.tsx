import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardContent, CardTitle } from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'UI/Common/Card',
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className='px-4 py-4 shadow-lg'>
      <CardTitle>Title</CardTitle>
      <CardContent>Some info</CardContent>
    </Card>
  ),
};
