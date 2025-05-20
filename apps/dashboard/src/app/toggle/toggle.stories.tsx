import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const ToggleDemo = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <div>
        <h3>Medium Size</h3>
        <Switch {...label} size="medium" />
      </div>
      <div>
        <h3>Small Size</h3>
        <Switch {...label} size="small" />
      </div>
      <div>
        <h3>Disabled States</h3>
        <Switch {...label} disabled size="medium" defaultChecked />
        <Switch {...label} disabled size="medium" />
        <Switch {...label} disabled size="small" />
        <Switch {...label} disabled size="small" defaultChecked />
      </div>
    </div>
  );
};

const meta: Meta<typeof ToggleDemo> = {
  title: 'Components/Toggle',
  component: ToggleDemo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToggleDemo>;

export const Default: Story = {
  args: {},
};
