// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('semua'); 
const filteredTodos = todos.filter(todo => {
  if (filter === 'aktif') return !todo.completed;
  if (filter === 'selesai') return todo.completed;
  return true;
});

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      console.error('Detail error:', err.response || err.message || err);
    }
  };

  const handleAdd = async (title) => {
    const res = await createTodo(title);
    setTodos([res.data, ...todos]);
  };

  const handleToggle = async (id, data) => {
    const res = await updateTodo(id, data);
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleEdit = async (id, data) => {
    const res = await updateTodo(id, data);
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

 return (
    <div className="app">
      <h1>My Todo App</h1>
      <TodoInput onAdd={handleAdd} />
      <div className="filter-buttons">
        <button onClick={() => setFilter('semua')}>Semua</button>
        <button onClick={() => setFilter('aktif')}>Aktif</button>
        <button onClick={() => setFilter('selesai')}>Selesai</button>
      </div>
      <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;