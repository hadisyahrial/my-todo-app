// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register({ onRegister, switchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://todo-backend-production-b298.up.railway.app/api/auth/register', { username, email, password });
      switchToLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
    }
  };

  return (
    <div className="auth-container">
      <h2>Daftar Akun</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Daftar</button>
      </form>
      <p>Sudah punya akun? <span className="link" onClick={switchToLogin}>Login</span></p>
    </div>
  );
}

export default Register;