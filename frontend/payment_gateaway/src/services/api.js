import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const productAPI = {
  getAll: () => api.get('/products'),
  getByCategory: (category) => api.get(`/products/category/${category}`),
};

export const transactionAPI = {
  create: (data) => api.post('/transactions', data),
  getHistory: () => api.get('/transactions/history'),
};

export default api;