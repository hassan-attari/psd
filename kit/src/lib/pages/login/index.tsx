/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box, Container, Typography, Link } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../components';
import { loginSchema, LoginFormInputs } from './login.schema';
import { login } from '../../api/services/auth.service';

const LoginContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      console.log('Login response received:', response);

      // اگر response.success وجود دارد و true است
      if (response && response.success === true) {
        // ذخیره accessToken در localStorage
        const accessToken =
          response.accessToken || response.token || response.data?.accessToken;
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          console.log('AccessToken saved to localStorage');
        }
        // ورود موفقیت‌آمیز بود
        navigate('/home');
      } else if (response && response.success === false) {
        // ورود ناموفق بود
        setError(response.message || 'خطا در ورود');
      } else {
        // اگر response.success وجود ندارد، فرض می‌کنیم موفق بوده
        const accessToken =
          response.accessToken || response.token || response.data?.accessToken;
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          console.log('AccessToken saved to localStorage');
        }
        navigate('/home');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      console.error('Error response:', err.response);

      // نمایش خطای دقیق‌تر
      let errorMessage = 'خطا در ارتباط با سرور';

      if (err.response) {
        // سرور پاسخ داده
        const status = err.response.status;
        const responseData = err.response.data;

        if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (responseData?.error) {
          errorMessage = responseData.error;
        } else if (status === 401) {
          errorMessage = 'ایمیل یا رمز عبور اشتباه است';
        } else if (status === 400) {
          errorMessage = 'اطلاعات ارسالی معتبر نیست';
        } else if (status === 500) {
          errorMessage = 'خطای سرور. لطفاً دوباره تلاش کنید';
        } else {
          errorMessage = `خطا: ${status}`;
        }
      } else if (err.request) {
        // درخواست ارسال شده اما پاسخی دریافت نشده (مشکل CORS یا شبکه)
        errorMessage =
          'خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید';
      } else {
        errorMessage = err.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer maxWidth={false}>
      <FormWrapper>
        <Logo src="/company-logo.png" alt="Company Logo" />
        <Title variant="h4">خوش آمدید</Title>
        <Subtitle variant="body1">وارد حساب کاربری خود شوید</Subtitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

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
            disabled={isLoading}
          >
            {isLoading ? 'در حال ورود...' : 'ورود'}
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
