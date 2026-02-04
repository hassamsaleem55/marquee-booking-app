import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getAllBookings: (params) => api.get('/admin/bookings', { params }),
  updateBookingStatus: (id, data) => api.patch(`/admin/bookings/${id}/status`, data),
  getUsers: (params) => api.get('/admin/users', { params }),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`)
};

// CMS API
export const cmsAPI = {
  // Pages
  getPages: () => api.get('/cms/pages'),
  getPage: (id) => api.get(`/cms/pages/${id}`),
  createPage: (data) => api.post('/cms/pages', data),
  updatePage: (id, data) => api.put(`/cms/pages/${id}`, data),
  deletePage: (id) => api.delete(`/cms/pages/${id}`),
  
  // Gallery
  getGallery: (params) => api.get('/cms/gallery', { params }),
  createGalleryItem: (data) => api.post('/cms/gallery', data),
  updateGalleryItem: (id, data) => api.put(`/cms/gallery/${id}`, data),
  deleteGalleryItem: (id) => api.delete(`/cms/gallery/${id}`),
  
  // Packages
  getPackages: () => api.get('/cms/packages'),
  getPackage: (id) => api.get(`/cms/packages/${id}`),
  createPackage: (data) => api.post('/cms/packages', data),
  updatePackage: (id, data) => api.put(`/cms/packages/${id}`, data),
  deletePackage: (id) => api.delete(`/cms/packages/${id}`),
  
  // Services
  getServices: (params) => api.get('/cms/services', { params }),
  getService: (id) => api.get(`/cms/services/${id}`),
  createService: (data) => api.post('/cms/services', data),
  updateService: (id, data) => api.put(`/cms/services/${id}`, data),
  deleteService: (id) => api.delete(`/cms/services/${id}`),
  
  // Testimonials
  getTestimonials: (params) => api.get('/cms/testimonials', { params }),
  getTestimonial: (id) => api.get(`/cms/testimonials/${id}`),
  createTestimonial: (data) => api.post('/cms/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/cms/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/cms/testimonials/${id}`),
  
  // FAQs
  getFAQs: (params) => api.get('/cms/faqs', { params }),
  getFAQ: (id) => api.get(`/cms/faqs/${id}`),
  createFAQ: (data) => api.post('/cms/faqs', data),
  updateFAQ: (id, data) => api.put(`/cms/faqs/${id}`, data),
  deleteFAQ: (id) => api.delete(`/cms/faqs/${id}`)
};

// Upload API
export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  uploadImages: (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    return api.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

export default api;
