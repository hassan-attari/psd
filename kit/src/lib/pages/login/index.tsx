/** @jsxImportSource @emotion/react */
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import {
  Button,
  Loading,
  Dropdown,
  DatePicker,
  PerPage,
  FileUploadModal,
  Snackbar,
} from '../../components';
import {
  Chip,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { DropdownOption } from '../../components/dropdown/dropdown';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { subYears, addYears } from 'date-fns';
import { Dashboard, LocalDining } from '@mui/icons-material';
import { CustomPagination } from '../../components/pagination';
import { DialogType } from '../../components/modal/modal';
import { Modal } from '../../components/modal';

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

const options: DropdownOption[] = [
  { value: 10, label: 'option 1' },
  { value: 20, label: 'option 2' },
  { value: 30, label: 'option 3', disabled: true },
  { value: 40, label: 'option 4' },
];

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

const PaginationWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: center;
  margin-top: 1rem;
`;

const dialogDetails = {
  success: {
    title: 'Done',
    message:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. fuga, quibusdam onsectetur adipisicing elit. fuga, quibusdam',
  },
  attention: {
    title: 'Attention',
    message:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. fuga, quibusdam onsectetur adipisicing elit. fuga, quibusdam',
  },
  warning: {
    title: 'Warning',
    message:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. fuga, quibusdam onsectetur adipisicing elit. fuga, quibusdam',
  },
};

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarType, setCalendarType] = useState<'gregorian' | 'jalali'>(
    'gregorian'
  );
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const minDate = subYears(today, 1); // 1 year ago
  const maxDate = addYears(today, 1); // 1 year from now

  const handleCalendarChange = (
    event: React.MouseEvent<HTMLElement>,
    newCalendarType: 'gregorian' | 'jalali' | null
  ) => {
    if (newCalendarType !== null) {
      setCalendarType(newCalendarType);
    }
  };

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

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const totalItems = 385;
  const perPageOptions = [10, 25, 50, 100];

  const [dialogState, setDialogState] = useState<{
    open: boolean;
    type: DialogType;
    title: string;
    message: string;
  }>({
    open: false,
    type: 'success',
    title: '',
    message: '',
  });

  const handleOpenDialog = (type: DialogType) => {
    const details = dialogDetails[type];
    setDialogState({
      open: true,
      type: type,
      title: details.title,
      message: details.message,
    });
  };

  const handleClose = () => {
    setDialogState((prevState) => ({ ...prevState, open: false }));
  };

  const handleAccept = () => {
    console.log(`User accepted the "${dialogState.type}" dialog.`);
    handleClose();
  };

  const [dropdownValue, setDropdownValue] = useState('');
  // const handleDropdownChange = (event: SelectChangeEvent<number | ''>) => {
  //   setDropdownValue(event.target.value as number | '');
  // };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
  };
  const StyledShadowBox = styled.div<{ shadow: string }>`
    width: 120px;
    height: 120px;
    background-color: ${({ theme }) => theme.palette.white.main};
    box-shadow: ${({ shadow, theme }) => theme.shadows[+shadow] || 'none'};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin: 50px 0;
  `;

  const ShadowBox = ({ shadow, label }: { shadow: string; label: string }) => (
    <StyledShadowBox shadow={shadow}>
      <Typography variant="caption">{label}</Typography>
    </StyledShadowBox>
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Login Page</Title>
        <Button onClick={() => setLoading(!loading)}>Run loading</Button>
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

        <Section>
          <Chip label="success" color="error" />
          <Chip label="success" color="warning" />
          <Chip label="success" color="default" />
          <Chip label="success" color="secondary" />
          <Chip label="success" color="primary" />
        </Section>

        <Section>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                disabled
              />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio checked />}
                label="other"
              />
            </RadioGroup>
          </FormControl>
        </Section>

        <Section>
          <Checkbox defaultChecked />
          <Checkbox />
          <Checkbox disabled />
          <Checkbox disabled checked />
        </Section>
        <ColorSectionWrapper>
          <Dropdown
            label="Choose a fruit"
            options={options}
            value={dropdownValue}
            onChange={setDropdownValue}
            multiple
          />
        </ColorSectionWrapper>

        <Section>
          <SectionTitle>Pagination Example</SectionTitle>
          <PaginationWrapper>
            <Typography variant="body2">
              Total suggestions: {totalItems}
            </Typography>
            <CustomPagination
              totalItems={totalItems}
              page={page}
              perPage={perPage}
              onPageChange={setPage}
              onPerPageChange={handlePerPageChange}
            />
            <PerPage
              perPage={perPage}
              perPageOptions={perPageOptions}
              onPerPageChange={handlePerPageChange}
            />
          </PaginationWrapper>
        </Section>
        <h2>Date Picker with Calendar Switch</h2>
        <ToggleButtonGroup
          value={calendarType}
          exclusive
          onChange={handleCalendarChange}
          aria-label="calendar type"
          size="small"
        >
          <ToggleButton value="gregorian" aria-label="gregorian">
            Gregorian
          </ToggleButton>
          <ToggleButton value="jalali" aria-label="jalali">
            Jalali
          </ToggleButton>
        </ToggleButtonGroup>
        <ColorSectionWrapper>
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            minDate={minDate}
            maxDate={maxDate}
            calendarType={calendarType}
          />
        </ColorSectionWrapper>
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
        <Button size="large" color="secondary">
          save
        </Button>

        <Box display={'flex'} flexWrap={'wrap'} gap={10}>
          <ShadowBox shadow={'1'} label="Drop Shadow - 01" />
          <ShadowBox shadow={'2'} label="Drop Shadow - 02" />
          <ShadowBox shadow={'3'} label="Drop Shadow - 03" />
          <ShadowBox shadow={'4'} label="Drop Shadow - 04" />
          <ShadowBox shadow={'5'} label="Drop Shadow - 05" />
          <ShadowBox shadow={'6'} label="Drop Shadow - 06" />
          <ShadowBox shadow="none" label="No Shadow" />
        </Box>

        <ColorSectionWrapper>
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            Open Upload
          </Button>
          <FileUploadModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onFileUpload={handleFileUpload}
          />
        </ColorSectionWrapper>
        <ColorSectionWrapper>
          <Button onClick={() => setSnackbarOpen(true)}>Open Snackbar</Button>
          <Snackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message="This Snackbar will be dismissed in 3 seconds."
            severity="success"
          />
        </ColorSectionWrapper>
      </Container>

      <ColorSectionWrapper>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpenDialog('success')}
        >
          Show Success
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={() => handleOpenDialog('attention')}
        >
          Show Attention
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => handleOpenDialog('warning')}
        >
          Show Warning
        </Button>

        <Modal
          open={dialogState.open}
          type={dialogState.type}
          title={dialogState.title}
          onClose={handleClose}
          onAccept={handleAccept}
        >
          {dialogState.message}
        </Modal>
      </ColorSectionWrapper>
    </ThemeProvider>
  );
};
