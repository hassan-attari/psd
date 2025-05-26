/** @jsxImportSource @emotion/react */
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import {
  Dashboard,
  LocalDining,
  SwapVerticalCircleOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import { Loading } from '../../components/loading';
import { Button } from '../../components/button';

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

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  margin-bottom: 2rem;
`;

const ButtonLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const Login = () => {
  const theme = useTheme();
  const variants = ['outlined', 'contained'] as const;
  const colors = [
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
  ] as const;
  const sizes = ['small', 'medium', 'large'] as const;
  const [loading, setLoading] = useState(false);
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

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Login Page</Title>
        <Button  onClick={() => setLoading(!loading)}>
          Run loading
        </Button>
        <Title>Button Style Guide</Title>
        {colors.map((color) => (
          <ButtonGroup key={color}>
            <ButtonLabel>{color.toUpperCase()} Buttons</ButtonLabel>
            {variants.map((variant) => (
              <div key={`${color}-${variant}`}>
                <ButtonLabel>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
                </ButtonLabel>
                {sizes.map((size) => (
                  <ButtonRow key={`${variant}-${size}`}>
                    <Button
                      variant={variant}
                      color={color}
                      size={size}
                      loadingIndicator={<LocalDining />}
                    >
                      Normal
                    </Button>
                    <Button
                      loading={true}
                      loadingPosition="start"
                      variant="outlined"
                      loadingIndicator={<AutorenewIcon />}
                    >
                      Save
                    </Button>
                    <Button
                      variant={variant}
                      color={color}
                      size={size}
                      disabled
                    >
                      Disabled
                    </Button>
                    <Button
                      variant={variant}
                      color={color}
                      size={size}
                      startIcon={<Dashboard />}
                    >
                      Icon
                    </Button>
                  </ButtonRow>
                ))}
              </div>
            ))}
          </ButtonGroup>
        ))}

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
      </Container>
      <Loading open={loading} />
      <Button loading={false} size="small">
        save
      </Button>
      <Button loading={true} size="medium">
        save
      </Button>
      <Button loading={true} size="large" color="secondary">
        save
      </Button>
      <Button  size="large" color="secondary">
        save
      </Button>
    </ThemeProvider>
  );
};
