import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import './ChangePassword.css';

function ChangePassword({ user }) {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { label: 'Minimal 8 karakter', check: (pwd) => pwd.length >= 8 },
    { label: 'Mengandung huruf besar', check: (pwd) => /[A-Z]/.test(pwd) },
    { label: 'Mengandung huruf kecil', check: (pwd) => /[a-z]/.test(pwd) },
    { label: 'Mengandung angka', check: (pwd) => /[0-9]/.test(pwd) },
    { label: 'Mengandung karakter khusus (@#$!%*?&)', check: (pwd) => /[@#$!%*?&]/.test(pwd) }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validation
    if (form.newPassword !== form.confirmPassword) {
      setMessage({ type: 'error', text: 'Password baru dan konfirmasi password tidak sama!' });
      return;
    }

    const failedRequirements = passwordRequirements.filter(req => !req.check(form.newPassword));
    if (failedRequirements.length > 0) {
      setMessage({ 
        type: 'error', 
        text: 'Password baru tidak memenuhi persyaratan keamanan!' 
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/auth/change-password', {
        userId: user.id,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });

      setMessage({ 
        type: 'success', 
        text: 'Password berhasil diubah! Silakan login ulang dengan password baru.' 
      });
      
      // Reset form
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Gagal mengubah password. Silakan coba lagi.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="change-password-page">
      <div className="page-header">
        <Lock size={32} />
        <div>
          <h1>Ubah Password</h1>
          <p>Tingkatkan keamanan akun Anda dengan password yang kuat</p>
        </div>
      </div>

      <div className="change-password-container">
        <div className="password-form-section">
          <form onSubmit={handleSubmit} className="password-form">
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                <span>{message.text}</span>
              </div>
            )}

            <div className="form-group">
              <label>Password Saat Ini</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.current ? "text" : "password"}
                  value={form.currentPassword}
                  onChange={(e) => setForm({...form, currentPassword: e.target.value})}
                  placeholder="Masukkan password saat ini"
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Password Baru</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.new ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(e) => setForm({...form, newPassword: e.target.value})}
                  placeholder="Masukkan password baru"
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Konfirmasi Password Baru</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                  placeholder="Masukkan ulang password baru"
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Mengubah Password...' : 'Ubah Password'}
            </button>
          </form>
        </div>

        <div className="password-requirements-section">
          <h3>Persyaratan Password</h3>
          <p className="requirements-subtitle">Password baru harus memenuhi kriteria berikut:</p>
          
          <div className="requirements-list">
            {passwordRequirements.map((req, index) => {
              const isValid = req.check(form.newPassword);
              return (
                <div key={index} className={`requirement-item ${isValid ? 'valid' : ''}`}>
                  {isValid ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  <span>{req.label}</span>
                </div>
              );
            })}
          </div>

          <div className="security-tips">
            <h4>Tips Keamanan:</h4>
            <ul>
              <li>Jangan gunakan password yang sama dengan akun lain</li>
              <li>Hindari menggunakan informasi pribadi yang mudah ditebak</li>
              <li>Ubah password secara berkala</li>
              <li>Jangan bagikan password kepada siapapun</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;

