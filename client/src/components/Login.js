import React, { useState } from 'react';
import axios from 'axios';
import { School } from 'lucide-react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });

      const { token, user } = response.data;
      onLogin(user, token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <School size={48} />
          </div>
          <h1>TJKT MPKK</h1>
          <p>Sistem Informasi Sekolah</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-info">
          <h3>Informasi Login:</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Admin:</strong>
              <p>Username: admin1 / admin2</p>
              <p>Password: admin123</p>
            </div>
            <div className="info-item">
              <strong>Guru:</strong>
              <p>Username: guru1 / guru2</p>
              <p>Password: guru123</p>
            </div>
            <div className="info-item">
              <strong>Siswa:</strong>
              <p>Username: NISN</p>
              <p>Password: ID Siswa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

