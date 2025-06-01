import type { Meta, StoryObj } from '@storybook/react';
import { Header, theme } from '@dashboard/kit';

// متااطلاعات کلی
const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'عنوان نمایشی در هدر',
    },
    color: {
      control: 'color',
      description: 'رنگ پس‌زمینه هدر',
      defaultValue: theme.palette.primary.main,
    },
  },
  parameters: {
    layout: 'fullscreen', // برای نمایش هدر در عرض کامل
  },
};
export default meta;

type Story = StoryObj<typeof Header>;

// حالت پیش‌فرض
export const Default: Story = {
  args: {
    title: 'Suggestions',
  },
};

// با عنوان طولانی
export const LongTitle: Story = {
  args: {
    title: 'User Dashboard & Settings Panel',
  },
};

// با عنوان کوتاه
export const ShortTitle: Story = {
  args: {
    title: 'Hi',
  },
};

// با رنگ سفارشی
export const CustomColor: Story = {
  args: {
    title: 'Custom Color Header',
    color: '#4a148c', // رنگ بنفش تیره
  },
};

// حالت بدون عنوان
export const NoTitle: Story = {
  args: {
    title: '',
  },
};

// حالت با آیکون‌های غیرفعال
export const DisabledIcons: Story = {
  args: {
    title: 'Disabled Icons',
  },
  render: (args) => (
    <div style={{ height: '100vh' }}>
      <Header {...args} />
      <div style={{ padding: '2rem' }}>
        <p>این حالت می‌تواند برای نمایش وضعیت غیرفعال آیکون‌ها استفاده شود</p>
      </div>
    </div>
  ),
};
