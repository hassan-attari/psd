import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'ایمیل معتبر نیست' }),
  password: z.string().min(6, { message: 'رمز عبور باید حداقل ۶ حرف باشد' }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
