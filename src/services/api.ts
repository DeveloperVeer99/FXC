import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// Attach token only on non-auth routes
api.interceptors.request.use((config) => {
  const isAuthRoute = config.url?.startsWith('/auth');
  if (!isAuthRoute) {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('isAdminMode');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (secretKey: string) => api.post('/auth/login', { secretKey }),
  verify: () => api.get('/auth/verify'),
};

export const bannerAPI = {
  get: () => api.get('/banner'),
  update: (data: any) => api.put('/banner', data),
};

export const heroAPI = {
  get: () => api.get('/hero'),
  update: (data: any) => api.put('/hero', data),
};

export const statsAPI = {
  get: () => api.get('/stats'),
  update: (data: any) => api.put('/stats', data),
};

export const ecosystemAPI = {
  get: () => api.get('/ecosystem'),
  update: (data: any) => api.put('/ecosystem', data),
};

export const testimonialsAPI = {
  get: () => api.get('/testimonials'),
  update: (data: any) => api.put('/testimonials', data),
};

export const communityAPI = {
  get: () => api.get('/community'),
  update: (data: any) => api.put('/community', data),
};

export const mentorshipAPI = {
  get: () => api.get('/mentorship'),
  update: (data: any) => api.put('/mentorship', data),
};

export const footerAPI = {
  get: () => api.get('/footer'),
  update: (data: any) => api.put('/footer', data),
};

export const coursesAPI = {
  getAll: () => api.get('/courses'),
  getOne: (id: string) => api.get(`/courses/${id}`),
  create: (data: any) => api.post('/courses', data),
  update: (id: string, data: any) => api.put(`/courses/${id}`, data),
  delete: (id: string) => api.delete(`/courses/${id}`),
};

export const paymentAPI = {
  createOrder: (data: { amount: number; courseId: string; courseName: string }) =>
    api.post('/payment/create-order', data),
  verify: (data: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
    name: string
    email: string
    phone: string
    courseName: string
  }) => api.post('/payment/verify', data),
};

export const curriculumAPI = {
  get: () => api.get('/curriculum'),
  update: (data: any) => api.put('/curriculum', data),
};

export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
