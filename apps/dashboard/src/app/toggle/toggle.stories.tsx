import type { Meta } from '@storybook/react';
import { Switch } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const MediumToggle = () => (
	<div>
		<h3>Medium Size</h3>
		<Switch {...label} size="medium" />
	</div>
);

export const SmallToggle = () => (
	<div>
		<h3>Small Size</h3>
		<Switch {...label} size="small" />
	</div>
);

export const DisabledToggle = () => (
	<div>
		<h3>Disabled States</h3>
		<Switch {...label} disabled size="medium" defaultChecked />
		<Switch {...label} disabled size="medium" />
		<Switch {...label} disabled size="small" />
		<Switch {...label} disabled size="small" defaultChecked />
	</div>
);

const meta: Meta = {
	title: 'Components/Toggle',
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
