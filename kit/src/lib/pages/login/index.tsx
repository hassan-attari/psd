/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box, Container, Typography, Link } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../components';
import { loginSchema, LoginFormInputs } from './login.schema';

const LoginContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1a2035;
`;

const FormWrapper = styled(Box)`
  width: 100%;
  max-width: 450px;
  padding: 3rem;
  background-color: #2b3553;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Logo = styled('img')`
  width: 150px;
  margin-bottom: 2rem;
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
  gap: 1.5rem;
  width: 100%;
`;

const SignUpLink = styled(Box)`
  margin-top: 1.5rem;
  text-align: center;
  color: #a0aed0;
`;

const StyledLink = styled(Link)`
  color: #3e97ff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Login attempt:', data);
    navigate('/home');
  };

  return (
    <LoginContainer maxWidth={false}>
      <FormWrapper>
        <Logo src="/company-logo.png" alt="Company Logo" />
        <Title variant="h4">خوش آمدید</Title>
        <Subtitle variant="body1">وارد حساب کاربری خود شوید</Subtitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                name="email"
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
                name="password"
                type="password"
                label="رمز عبور"
                placeholder="رمز عبور خود را وارد کنید"
                hasError={!!errors.password}
                guidMessage={errors.password?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            ورود
          </Button>
        </Form>
        <SignUpLink>
          حساب کاربری ندارید؟{' '}
          <StyledLink onClick={() => navigate('/signup')}>
            ثبت نام کنید
          </StyledLink>
        </SignUpLink>
      </FormWrapper>
    </LoginContainer>
  );
};
