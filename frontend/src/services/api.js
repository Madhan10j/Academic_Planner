import axios from 'axios';

const api = axios.create({
  baseURL: 'https://academic-planner-1.onrender.com/api',
});

// Add JWT token to headers if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 