import React, { useState } from 'react';
import axios from 'axios';
import { Send, AlertTriangle } from 'lucide-react';
import './NotificationsPage.css';

function NotificationsPage({ user }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendNotification = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await axios.post('/api/telegram/notify', { message });
      setStatus('success');
      setMessage('');
    } catch (err) {
      setStatus('error');
    }
  };

  if (!(user.role === 'guru' || user.role === 'admin')) {
    return (
      <div className="card">
        <div className="restricted">
          <AlertTriangle size={20} />
          <span>Halaman ini hanya untuk Admin/Guru.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="page-header">
        <div>
          <h1>Notifikasi Telegram</h1>
          <p className="subtitle">Kirim pengumuman ke grup/akun Telegram yang terhubung</p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={sendNotification}>
          <div className="input-group">
            <label>Pesan</label>
            <textarea
              rows="5"
              placeholder="Tulis pesan pengumuman di sini..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={!message.trim()}>
            <Send size={18} />
            Kirim Notifikasi
          </button>

          {status === 'success' && (
            <p className="notif-status success">Notifikasi terkirim.</p>
          )}
          {status === 'error' && (
            <p className="notif-status error">Gagal mengirim. Periksa konfigurasi Telegram.</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default NotificationsPage;


