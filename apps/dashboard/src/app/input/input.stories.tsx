import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@dashboard/kit';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    hasNumberSeparator: { control: 'boolean' },
    hasError: { control: 'boolean' },
    guidMessage: { control: 'text' },
    value: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// حالت پیش‌فرض
export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    value: '',
    handleOnChange: (val: string) => console.log('Changed:', val),
  },
};

// حالت عدد با جداکننده
export const NumberWithSeparator: Story = {
  args: {
    label: 'Amount',
    hasNumberSeparator: true,
    value: '1000000',
    handleOnChange: (val: string) => console.log('Changed:', val),
  },
};

// حالت خطا
export const ErrorState: Story = {
  args: {
    label: 'Email',
    hasError: true,
    guidMessage: 'Invalid email address',
    value: '',
    handleOnChange: (val: string) => console.log('Changed:', val),
  },
};

// حالت Required
export const Required: Story = {
  args: {
    label: 'Phone Number',
    required: true,
    value: '',
    handleOnChange: (val: string) => console.log('Changed:', val),
  },
};

// حالت Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    value: 'You can’t change this',
    handleOnChange: (val: string) => console.log('Changed:', val),
  },
};
