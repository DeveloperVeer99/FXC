import axios from 'axios';

const getAPIUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return 'http://localhost:5000/api';
};

const API_URL = getAPIUrl();
console.log('🔗 API URL configured:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
});

// Add token to requests from sessionStorage
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 503) {
      console.warn('⚠️ Backend service unavailable');
    } else if (error.code === 'ECONNABORTED') {
      console.warn('⚠️ Request timeout');
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  login: (secretKey: string) => api.post('/auth/login', { secretKey }),
  verify: () => api.get('/auth/verify'),
};

// Banner
export const bannerAPI = {
  get: () => api.get('/banner'),
  update: (data: any) => api.put('/banner', data),
};

// Footer
export const footerAPI = {
  get: () => api.get('/footer'),
  update: (data: any) => api.put('/footer', data),
};

// Courses
export const coursesAPI = {
  getAll: () => api.get('/courses'),
  getOne: (id: string) => api.get(`/courses/${id}`),
  create: (data: any) => api.post('/courses', data),
  update: (id: string, data: any) => api.put(`/courses/${id}`, data),
  delete: (id: string) => api.delete(`/courses/${id}`),
};

// Curriculum
export const curriculumAPI = {
  get: (courseId: string) => api.get(`/curriculum/${courseId}`),
  create: (data: any) => api.post('/curriculum', data),
  update: (courseId: string, data: any) => api.put(`/curriculum/${courseId}`, data),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
