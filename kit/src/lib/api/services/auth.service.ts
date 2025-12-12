import { apiClient } from '../axios.config';

// تایپ‌های مربوط به ثبت نام
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: {
    id?: number;
    email?: string;
    fullName?: string;
    // سایر فیلدهای پاسخ API
  };
}

// تایپ‌های مربوط به لاگین
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  accessToken?: string;
  data?: {
    id?: number;
    email?: string;
    fullName?: string;
    accessToken?: string;
    // سایر فیلدهای پاسخ API
  };
}

// تابع ثبت نام
export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    console.log('Sending register request:', JSON.stringify(data, null, 2));
    console.log(
      'Request URL:',
      `${apiClient.defaults.baseURL}/api/auth/register`
    );

    const response = await apiClient.post('/api/auth/register', data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    console.log('Register response status:', response.status);
    console.log('Register response data:', response.data);

    // اگر API مستقیماً data را برمی‌گرداند
    if (response.data) {
      // اگر response.data یک object است و success دارد
      if (typeof response.data === 'object' && 'success' in response.data) {
        return response.data as RegisterResponse;
      }
      // اگر response.data مستقیماً success است
      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Register error:', error);
    console.error('Error response:', error.response);
    console.error('Error request:', error.request);
    console.error('Error message:', error.message);

    // اگر سرور پاسخ داده اما با خطا
    if (error.response) {
      const errorData = error.response.data;
      throw {
        ...error,
        response: {
          ...error.response,
          data: {
            success: false,
            message: errorData?.message || errorData?.error || 'خطا در ثبت نام',
            ...errorData,
          },
        },
      };
    }

    throw error;
  }
};

// تابع لاگین
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    console.log('Sending login request:', JSON.stringify(data, null, 2));
    console.log('Request URL:', `${apiClient.defaults.baseURL}/api/auth/login`);

    const response = await apiClient.post('/api/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    console.log('Login response status:', response.status);
    console.log('Login response data:', response.data);

    // اگر API مستقیماً data را برمی‌گرداند
    if (response.data) {
      // اگر response.data یک object است و success دارد
      if (typeof response.data === 'object' && 'success' in response.data) {
        return response.data as LoginResponse;
      }
      // بررسی accessToken در response.data یا response.data.data
      const accessToken =
        response.data.accessToken || response.data.data?.accessToken;
      if (accessToken) {
        return {
          success: true,
          accessToken: accessToken,
          token: accessToken, // برای سازگاری
          data: response.data,
        };
      }
      // اگر response.data مستقیماً token دارد
      if (response.data.token) {
        return {
          success: true,
          token: response.data.token,
          accessToken: response.data.token, // برای سازگاری
          data: response.data,
        };
      }
      // اگر response.data مستقیماً success است
      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Login error:', error);
    console.error('Error response:', error.response);
    console.error('Error request:', error.request);
    console.error('Error message:', error.message);

    // اگر سرور پاسخ داده اما با خطا
    if (error.response) {
      const errorData = error.response.data;
      throw {
        ...error,
        response: {
          ...error.response,
          data: {
            success: false,
            message: errorData?.message || errorData?.error || 'خطا در ورود',
            ...errorData,
          },
        },
      };
    }

    throw error;
  }
};

// تایپ‌های مربوط به لاگ‌اوت
export interface LogoutResponse {
  success: boolean;
  message?: string;
}

// تابع لاگ‌اوت
export const logout = async (): Promise<LogoutResponse> => {
  try {
    // دریافت accessToken از localStorage
    const accessToken = localStorage.getItem('token');
    console.log('Sending logout request');
    console.log('AccessToken exists:', !!accessToken);
    if (accessToken) {
      console.log('AccessToken length:', accessToken.length);
    }
    console.log(
      'Request URL:',
      `${apiClient.defaults.baseURL}/api/auth/logout`
    );

    // استفاده از apiClient که interceptor token را اضافه می‌کند
    // نیازی به اضافه کردن explicit header نیست چون interceptor این کار را می‌کند
    const response = await apiClient.post(
      '/api/auth/logout',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    console.log('Logout response status:', response.status);
    console.log('Logout response data:', response.data);

    // پاک کردن token از localStorage
    localStorage.removeItem('token');

    // اگر API مستقیماً data را برمی‌گرداند
    if (response.data) {
      // اگر response.data یک object است و success دارد
      if (typeof response.data === 'object' && 'success' in response.data) {
        return response.data as LogoutResponse;
      }
      // اگر response.data مستقیماً success است
      return {
        success: true,
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Logout error:', error);
    console.error('Error response:', error.response);
    console.error('Error request:', error.request);
    console.error('Error message:', error.message);

    // حتی اگر خطا رخ دهد، token را از localStorage پاک می‌کنیم
    localStorage.removeItem('token');

    // اگر سرور پاسخ داده اما با خطا
    if (error.response) {
      const errorData = error.response.data;
      throw {
        ...error,
        response: {
          ...error.response,
          data: {
            success: false,
            message: errorData?.message || errorData?.error || 'خطا در خروج',
            ...errorData,
          },
        },
      };
    }

    throw error;
  }
};
