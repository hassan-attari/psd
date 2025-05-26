import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Dropdown } from '@dashboard/kit';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const commonOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

const Template: Story = {
  render: (args) => (
    <ThemeProvider theme={theme}>
      <Dropdown {...args} />
    </ThemeProvider>
  ),
  args: {
    name: 'default-dropdown',
    options: commonOptions,
    value: '',
    onChange: action('dropdown-changed'),
  },
};

// Stories
export const Default: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'Default Dropdown',
  },
};

export const WithValueSelected: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'With Selected Value',
    value: 'option2',
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

export const SmallSize: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'Small Size',
    size: 'small',
  },
};

export const FilledVariant: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'Filled Variant',
    variant: 'filled',
  },
};

export const StandardVariant: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'Standard Variant',
    variant: 'standard',
  },
};

export const WithHelperText: Story = {
  ...Template,
  args: {
    ...Template.args,
    label: 'With Helper Text',
    helperText: 'Select an option from the list',
  },
};
