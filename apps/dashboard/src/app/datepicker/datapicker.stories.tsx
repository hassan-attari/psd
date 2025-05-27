import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DatePicker } from '@dashboard/kit';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';

const mata: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    label: { control: { type: 'text' } },
    value: { control: { type: 'date' } },
    onChange: { action: 'changed' },
    calendarType: {
      control: { type: 'select' },
      options: ['gregorian', 'jalali'],
    },
    disabled: { control: { type: 'boolean' } },
    fullWidth: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    minDate: { control: { type: 'date' } },
    maxDate: { control: { type: 'date' } },
  },
};

export default mata;
type Story = StoryObj<typeof DatePicker>;

const Template: Story = {
  render: (args) => (
    <ThemeProvider theme={theme}>
      <DatePicker {...args} />
    </ThemeProvider>
  ),
  args: {
    value: null,
    onChange: action('datepicker-changed'),
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2026, 11, 31),
  },
};

// Stories
export const Default: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'Default DatePicker',
  },
};

export const WithValueSelected: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'With Selected Value',
    value: new Date(2025, 1, 1),
  },
};

export const ErrorState: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'Error State',
    error: true,
    helperText: 'This field is required',
  },
};

export const WithCalendarTypeJalali: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'With Calendar Type',
    calendarType: 'jalali',
  },
};

export const WithHelperText: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'With Helper Text',
    helperText: 'Select a date from the list',
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'Disabled',
    disabled: true,
  },
};
