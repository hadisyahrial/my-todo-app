// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://todo-backend-production-b298.up.railway.app/api'
});

// Tambahkan token di setiap request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Deteksi token expired dan otomatis logout
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const getTodos = () => API.get('/todos');
export const createTodo = (title) => API.post('/todos', { title });
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);