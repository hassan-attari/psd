import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '@dashboard/kit';

const meta: Meta = {
	title: 'Components/Checkbox',
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

export const Unchecked: StoryObj = {
	render: () => <Checkbox />,
};

export const Checked: StoryObj = { 
	render: () => <Checkbox defaultChecked />,
};

export const DisabledUnchecked: StoryObj = {
	render: () => <Checkbox disabled />,
};

export const DisabledChecked: StoryObj = {
	render: () => <Checkbox disabled defaultChecked />,
};

export const WithLabel: StoryObj = {
	render: () => <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox with label" />,
};