// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('semua');
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [page, setPage] = useState('login');

  useEffect(() => {
    if (username) fetchTodos();
  }, [username]);

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  const handleLogin = (username) => {
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    setTodos([]);
    setPage('login');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'aktif') return !todo.completed;
    if (filter === 'selesai') return todo.completed;
    return true;
  });

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

  if (!username) {
    return page === 'login'
      ? <Login onLogin={handleLogin} switchToRegister={() => setPage('register')} />
      : <Register onRegister={handleLogin} switchToLogin={() => setPage('login')} />;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>My Todo App</h1>
        <div className="user-info">
          <span>Halo, {username}!</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
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