// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://todo-backend-production-b298.up.railway.app/api'
});

export const getTodos = () => API.get('/todos');
export const createTodo = (title) => API.post('/todos', { title });
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);