/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  Box,
  Container,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../components';
import { signupSchema, SignupFormInputs } from './signup.schema';

const SignUpContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 0;
  background-color: #1a2035;
`;

const FormWrapper = styled(Box)`
  width: 100%;
  max-width: 500px;
  padding: 3rem;
  background-color: #2b3553;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled(Typography)`
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #ffffff;
`;

const Subtitle = styled(Typography)`
  margin-bottom: 2rem;
  color: #a0aed0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const TermsLink = styled(Link)`
  color: #3e97ff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginLink = styled(Box)`
  margin-top: 1.5rem;
  text-align: center;
`;

export const SignUp = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: SignupFormInputs) => {
    console.log('Sign up attempt:', data);
    navigate('/home');
  };

  return (
    <SignUpContainer maxWidth={false}>
      <FormWrapper>
        <Title variant="h4">ثبت نام</Title>
        <Subtitle variant="body1">حساب کاربری جدید ایجاد کنید</Subtitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="نام"
                placeholder="نام خود را وارد کنید"
                hasError={!!errors.firstName}
                guidMessage={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="نام خانوادگی"
                placeholder="نام خانوادگی خود را وارد کنید"
                hasError={!!errors.lastName}
                guidMessage={errors.lastName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                label="ایمیل"
                placeholder="example@email.com"
                hasError={!!errors.email}
                guidMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                label="رمز عبور"
                placeholder="رمز عبور خود را وارد کنید"
                hasError={!!errors.password}
                guidMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                label="تکرار رمز عبور"
                placeholder="رمز عبور خود را دوباره وارد کنید"
                hasError={!!errors.confirmPassword}
                guidMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <FormControlLabel
            control={
              <Controller
                name="agreeToTerms"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} />
                )}
              />
            }
            label={
              <Typography variant="body2" color="#a0aed0">
                با <TermsLink>قوانین و مقررات</TermsLink> موافقم
              </Typography>
            }
          />
          {errors.agreeToTerms && (
            <Typography color="error" variant="caption">
              {errors.agreeToTerms.message}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            ثبت نام
          </Button>
        </Form>

        <LoginLink>
          <Typography variant="body2" color="#a0aed0">
            قبلاً ثبت نام کرده‌اید؟{' '}
            <TermsLink onClick={() => navigate('/login')}>وارد شوید</TermsLink>
          </Typography>
        </LoginLink>
      </FormWrapper>
    </SignUpContainer>
  );
};
