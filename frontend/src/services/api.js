import axios from 'axios';

let baseURL;

// Use local backend if running locally, otherwise use deployed backend
if (
  window.location.hostname === 'localhost' ||
  window.location.hostname.startsWith('127.')
) {
  baseURL = 'http://localhost:5000/api'; // Local backend
} else {
  baseURL = 'https://academic-planner-2.onrender.com/api'; // Deployed backend
}

const api = axios.create({
  baseURL,
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