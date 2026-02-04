import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// CMS API
export const cmsAPI = {
  getPages: () => api.get('/cms/pages'),
  getPage: (slug) => api.get(`/cms/pages/${slug}`),
  getGallery: (params) => api.get('/cms/gallery', { params }),
  getPackages: () => api.get('/cms/packages'),
  getPackage: (id) => api.get(`/cms/packages/${id}`),
  getServices: (params) => api.get('/cms/services', { params }),
  getService: (id) => api.get(`/cms/services/${id}`),
  getTestimonials: (params) => api.get('/cms/testimonials', { params }),
  getFAQs: (params) => api.get('/cms/faqs', { params })
};

// Booking API
export const bookingAPI = {
  createBooking: (data) => api.post('/bookings', data),
  getAvailability: (params) => api.get('/bookings/availability', { params }),
  getAvailableSlots: (params) => api.get('/bookings/slots', { params }),
  getUserBookings: () => api.get('/bookings/my-bookings'),
  getBooking: (id) => api.get(`/bookings/${id}`)
};

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

export default api;
