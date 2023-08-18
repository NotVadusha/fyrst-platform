import { Meta, Story } from '@storybook/react/types-6-0';
import Button from './Button';
import { ButtonProps } from './Button';
import GoogleLogo from '../../../icons/google.svg';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'tertiary'],
      },
    },
    state: {
      control: {
        type: 'select',
        options: ['default', 'inactive'],
      },
      mapping: {
        default: undefined,
        inactive: 'inactive',
      },
    },
    imgSrc: {
      control: 'text',
    },
    fullWidth: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args}>Button</Button>;
const Template2: Story<ButtonProps> = args => <Button {...args}>Sign up with Google</Button>;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  type: 'tertiary',
};

export const Inactive = Template.bind({});
Inactive.args = {
  type: 'primary',
  state: 'inactive',
};

export const WithImage = Template2.bind({});
WithImage.args = {
  type: 'primary',
  imgSrc: GoogleLogo,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  type: 'primary',
  fullWidth: true,
};
