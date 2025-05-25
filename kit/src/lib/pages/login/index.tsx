/** @jsxImportSource @emotion/react */
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Chip, Typography, Switch } from '@mui/material';
import { Dropdown, Button } from '../../components';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { DropdownOption } from '../../components/dropdown/dropdown';

const typographyClasses = [
  'text-xs-regular',
  'text-xs-medium',
  'text-xs-semibold',
  'text-xs-bold',
  'text-sm-regular',
  'text-sm-medium',
  'text-sm-semibold',
  'text-sm-bold',
  'text-md-regular',
  'text-md-medium',
  'text-md-semibold',
  'text-md-bold',
  'text-lg-regular',
  'text-lg-medium',
  'text-lg-semibold',
  'text-lg-bold',
  'text-xl-regular',
  'text-xl-medium',
  'text-xl-semibold',
  'text-xl-bold',
  'text-2xl-regular',
  'text-2xl-medium',
  'text-2xl-semibold',
  'text-2xl-bold',
  'text-3xl-regular',
  'text-3xl-medium',
  'text-3xl-semibold',
  'text-3xl-bold',
];

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ColorSwatch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
`;

const ColorBox = styled.div<{ bgColor: string }>`
  width: 60px;
  height: 20px;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 0.25rem;
  background-color: ${({ bgColor }) => bgColor};
`;

const ColorSectionWrapper = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const options: DropdownOption<number>[] = [
  { value: 10, label: 'option 1' },
  { value: 20, label: 'option 2' },
  { value: 30, label: 'option 3', disabled: true },
  { value: 40, label: 'option 4' },
];

export const Login = () => {
  const theme = useTheme();

  const renderColorSet = (label: string, colors: Record<string, unknown>) => (
    <Section key={label}>
      <SectionTitle>{label}</SectionTitle>
      <ColorGrid>
        {Object.entries(colors)
          .filter(([_, value]) => typeof value === 'string')
          .map(([key, value]) => {
            const color = value as string;
            return (
              <ColorSwatch key={key}>
                <ColorBox bgColor={color} title={`${label}.${key}`} />
                <span>{key}</span>
              </ColorSwatch>
            );
          })}
      </ColorGrid>
    </Section>
  );

  const [dropdownValue, setDropdownValue] = useState<number | ''>('');
  const handleDropdownChange = (event: SelectChangeEvent<number | ''>) => {
    setDropdownValue(event.target.value as number | '');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Login Page</Title>
        <Button />
        <div>
          <div>
            {typographyClasses.map((className, index) => (
              <Typography key={index} className={className}>
                Dashboard sample text
              </Typography>
            ))}
          </div>
        </div>
        <ColorSectionWrapper>
          {Object.entries(theme.palette).map(([label, colors]) =>
            typeof colors === 'object' ? renderColorSet(label, colors) : null
          )}
        </ColorSectionWrapper>
        <Chip label="success" color="error" />
        <Chip label="success" color="warning" />
        <Chip label="success" color="default" />
        <Chip label="success" color="secondary" />
        <Chip label="success" color="primary" />
        <Switch {...label} size="medium" />
        <Switch {...label} size="small" />
        <Switch {...label} disabled size="medium" />
        <Switch {...label} disabled size="small" />
        <Switch {...label} disabled size="medium" defaultChecked />
        <Switch {...label} disabled size="small" defaultChecked />
        <ColorSectionWrapper>
          <Dropdown
            name="single-select"
            label="Select a Option"
            options={options}
            value={dropdownValue}
            onChange={handleDropdownChange}
          />
        </ColorSectionWrapper>
      </Container>
    </ThemeProvider>
  );
};
