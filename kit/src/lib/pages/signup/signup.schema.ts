import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(2, { message: 'نام باید حداقل ۲ حرف باشد' }),
    lastName: z
      .string()
      .min(2, { message: 'نام خانوادگی باید حداقل ۲ حرف باشد' }),
    email: z.string().email({ message: 'ایمیل معتبر نیست' }),
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
