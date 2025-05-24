import type { Meta, StoryObj } from '@storybook/react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';

const meta: Meta = {
	title: 'Components/Radio',
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
	render: () => <Radio />,
};

export const Checked: StoryObj = {
	render: () => <Radio checked />,
};

export const DisabledUnchecked: StoryObj = {
	render: () => <Radio disabled />,
};

export const DisabledChecked: StoryObj = {
	render: () => <Radio disabled checked />,
};

export const WithLabel: StoryObj = {
	render: () => <FormControlLabel control={<Radio defaultChecked />} label="Radio with label" />,
};

export const Default: StoryObj = {
	render: () => (
		<RadioGroup defaultValue="option1" name="radio-group">
			<FormControlLabel value="option1" control={<Radio />} label="Option 1" />
			<FormControlLabel value="option2" control={<Radio />} label="Option 2" />
			<FormControlLabel value="option3" control={<Radio />} label="Option 3" />
		</RadioGroup>
	),
};
