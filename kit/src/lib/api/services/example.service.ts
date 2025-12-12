import { apiClient } from '../axios.config';

// مثال استفاده از API
// این فایل را می‌توانید به عنوان الگو برای ایجاد service های دیگر استفاده کنید

export interface ExampleResponse {
  id: number;
  name: string;
  // سایر فیلدها بر اساس API شما
}

// مثال: دریافت لیست
export const getExamples = async (): Promise<ExampleResponse[]> => {
  const response = await apiClient.get<ExampleResponse[]>('/api/examples');
  return response.data;
};

// مثال: دریافت یک آیتم
export const getExampleById = async (id: number): Promise<ExampleResponse> => {
  const response = await apiClient.get<ExampleResponse>(`/api/examples/${id}`);
  return response.data;
};

// مثال: ایجاد
export const createExample = async (
  data: Partial<ExampleResponse>
): Promise<ExampleResponse> => {
  const response = await apiClient.post<ExampleResponse>('/api/examples', data);
  return response.data;
};

// مثال: به‌روزرسانی
export const updateExample = async (
  id: number,
  data: Partial<ExampleResponse>
): Promise<ExampleResponse> => {
  const response = await apiClient.put<ExampleResponse>(
    `/api/examples/${id}`,
    data
  );
  return response.data;
};

// مثال: حذف
export const deleteExample = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/examples/${id}`);
};
