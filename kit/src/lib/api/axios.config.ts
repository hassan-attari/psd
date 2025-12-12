import axios from 'axios';

// Base URL برای API
// از متغیر محیطی استفاده می‌کنیم
// در development از proxy استفاده می‌کنیم (از vite.config)
// در production از متغیر محیطی استفاده می‌کنیم
const isDevelopment =
  typeof window !== 'undefined' && window.location.hostname === 'localhost';

// استفاده از متغیر محیطی Vite
// در Vite، متغیرهای محیطی در import.meta.env در دسترس هستند
const getBaseURL = () => {
  if (isDevelopment) {
    return ''; // در development از proxy استفاده می‌شود
  }
  // در production از متغیر محیطی استفاده می‌کنیم
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const envUrl = (import.meta as any).env?.VITE_API_BASE_URL;
  return envUrl || 'http://93.118.123.108:8080';
};

const BASE_URL = getBaseURL();

// ایجاد instance از axios با کانفیگ پیش‌فرض
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 ثانیه
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor برای request (قبل از ارسال)
apiClient.interceptors.request.use(
  (config) => {
    console.log('Request config:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      data: config.data,
      headers: config.headers,
    });
    // اضافه کردن token به header درخواست‌ها
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token added to request header');
    } else {
      console.warn('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Interceptor برای response (بعد از دریافت)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // مدیریت خطاها
    if (error.response) {
      // سرور پاسخ داده اما با کد خطا
      console.error(
        'Error Response:',
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // درخواست ارسال شده اما پاسخی دریافت نشده
      console.error('Error Request:', error.request);
    } else {
      // خطا در تنظیم درخواست
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
