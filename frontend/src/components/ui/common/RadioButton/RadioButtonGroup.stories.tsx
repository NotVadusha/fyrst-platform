import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import RadioButtonGroup from './RadioButtonGroup';
import { useForm } from 'react-hook-form';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Components/Common/RadioButtonGroup',
  component: RadioButtonGroup,
};

export default meta;

type Story = StoryObj<typeof RadioButtonGroup>;

export const Primary: Story = {
  render: args => {
    const { control } = useForm();
    return <RadioButtonGroup {...args} control={control} />;
  },
};
