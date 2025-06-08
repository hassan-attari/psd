import { StoryFn, Meta } from '@storybook/react';
import { Modal, theme } from '@dashboard/kit';
import { ThemeProvider } from '@mui/material/styles';
import { ModalProps } from 'kit/src/lib/components/modal/modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'attention', 'warning'],
      },
    },
    title: { control: 'text' },
    children: { control: 'text' },
    open: { control: 'boolean' },
  },
} as Meta<typeof Modal>;

const Template: StoryFn<ModalProps> = (args: ModalProps) => <Modal {...args} />;

export const Success = Template.bind({});
Success.args = {
  open: true,
  type: 'success',
  title: 'Success Title',
  children:
    'lorem ipsum dolor sit amet consectetur adipisicing elit. fuga, quibusdam onsectetur adipisicing elit. fuga, quibusdam',
};

export const Attention = Template.bind({});
Attention.args = {
  open: true,
  type: 'attention',
  title: 'Attention Title',
  children:
    'lorem ipsum dolor sit amet consectetur adipisicing elit. fuga, quibusdam onsectetur adipisicing elit. fuga, quibusdam',
};

export const Warning = Template.bind({});
Warning.args = {
  open: true,
  type: 'warning',
  title: 'Warning Title',
  children:
    'lorem ipsum dolor sit amet consectetur adipisicing elit. fuga, quibusdam onsectetur adipisicing elit. fuga, quibusdam',
};
