import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../../../kit/src/lib/components/button';


// متااطلاعات کلی
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    loading: { control: 'boolean' },
    children: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// حالت پیش‌فرض
export const Default: Story = {
  args: {
    children: 'Click Me',
    loading: false,
    variant: 'contained',
    color: 'primary',
  },
};

// حالت لودینگ
export const Loading: Story = {
  args: {
    children: 'Please wait...',
    loading: true,
    variant: 'contained',
    color: 'primary',
  },
};

// انواع وریانت‌ها
export const Outlined: Story = {
  args: {
    children: 'Outlined',
    loading: false,
    variant: 'outlined',
    color: 'secondary',
  },
};

// انواع سایزها
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </div>
  ),
  args: {
    loading: false,
    variant: 'contained',
    color: 'primary',
  },
};

// حالت disabled
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    loading: false,
    disabled: true,
    color: 'error',
  },
};
