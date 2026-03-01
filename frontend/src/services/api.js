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

export const getTodos = () => API.get('/todos');
export const createTodo = (title) => API.post('/todos', { title });
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);