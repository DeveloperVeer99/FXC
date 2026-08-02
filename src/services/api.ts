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
  timeout: 30000, // 30 seconds
});

// Add token to requests from sessionStorage
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔐 Token added to request:', config.url);
  } else {
    console.warn('⚠️ No token found in sessionStorage');
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    
    if (error.response?.status === 401) {
      console.error('🔴 Unauthorized - Token may be invalid');
      sessionStorage.removeItem('adminToken');
    } else if (error.response?.status === 503) {
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

// Hero
export const heroAPI = {
  get: () => api.get('/hero'),
  update: (data: any) => api.put('/hero', data),
};

// Stats
export const statsAPI = {
  get: () => api.get('/stats'),
  update: (data: any) => api.put('/stats', data),
};

// Ecosystem
export const ecosystemAPI = {
  get: () => api.get('/ecosystem'),
  update: (data: any) => api.put('/ecosystem', data),
};

// Testimonials
export const testimonialsAPI = {
  get: () => api.get('/testimonials'),
  update: (data: any) => api.put('/testimonials', data),
};

// Community
export const communityAPI = {
  get: () => api.get('/community'),
  update: (data: any) => api.put('/community', data),
};

// Mentorship
export const mentorshipAPI = {
  get: () => api.get('/mentorship'),
  update: (data: any) => api.put('/mentorship', data),
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
