/** @jsxImportSource @emotion/react */
import { useState } from 'react';
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
import { register } from '../../api/services/auth.service';

const SignUpContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 0;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema as any),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormInputs) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await register({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
      });

      console.log('Register response received:', response);

      // اگر response.success وجود دارد و true است
      if (response && response.success === true) {
        // ثبت نام موفقیت‌آمیز بود
        navigate('/login');
      } else if (response && response.success === false) {
        // ثبت نام ناموفق بود
        setError(response.message || 'خطا در ثبت نام');
      } else {
        // اگر response.success وجود ندارد، فرض می‌کنیم موفق بوده
        navigate('/login');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
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
        } else if (status === 400) {
          errorMessage = 'اطلاعات ارسالی معتبر نیست';
        } else if (status === 409) {
          errorMessage = 'این ایمیل قبلاً ثبت شده است';
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
    <SignUpContainer maxWidth={false}>
      <FormWrapper>
        <Title variant="h4">ثبت نام</Title>
        <Subtitle variant="body1">حساب کاربری جدید ایجاد کنید</Subtitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                name="fullName"
                label="نام و نام خانوادگی"
                placeholder="نام و نام خانوادگی خود را وارد کنید"
                hasError={!!errors.fullName}
                guidMessage={errors.fullName?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                name="email"
                type="email"
                label="ایمیل"
                placeholder="example@email.com"
                hasError={!!errors.email}
                guidMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                name="phoneNumber"
                label="شماره تلفن"
                placeholder="09123456789"
                hasError={!!errors.phoneNumber}
                guidMessage={errors.phoneNumber?.message}
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

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                name="confirmPassword"
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
            disabled={isLoading}
          >
            {isLoading ? 'در حال ثبت نام...' : 'ثبت نام'}
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
