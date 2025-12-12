import { z } from 'zod';

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'نام و نام خانوادگی باید حداقل ۲ حرف باشد' }),
    email: z.string().email({ message: 'ایمیل معتبر نیست' }),
    phoneNumber: z
      .string()
      .min(11, { message: 'شماره تلفن باید ۱۱ رقم باشد' })
      .regex(/^09\d{9}$/, { message: 'شماره تلفن معتبر نیست' }),
    password: z.string().min(6, { message: 'رمز عبور باید حداقل ۶ حرف باشد' }),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'شما باید با قوانین و مقررات موافقت کنید',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'رمزهای عبور یکسان نیستند',
    path: ['confirmPassword'],
  });

export type SignupFormInputs = z.infer<typeof signupSchema>;
