import React, { useState } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';
import './ProfilePage.css';

function ProfilePage({ user, onProfileUpdated }) {
  const [form, setForm] = useState({
    nama: user.nama || '',
    email: user.email || '',
    nip: user.nip || '',
    kelas: user.kelas || '',
    phone: '',
    address: '',
    avatarUrl: ''
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const onChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');
    try {
      await axios.post('/api/profile/update', {
        id: user.id,
        role: user.role,
        profile: form
      });
      setStatus('success');
      if (onProfileUpdated) onProfileUpdated(form);
    } catch (e) {
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1>Profil {user.role === 'guru' ? 'Guru' : user.role === 'admin' ? 'Admin' : 'Siswa'}</h1>
          <p className="subtitle">Perbarui informasi profil Anda</p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Nama</label>
              <input value={form.nama} onChange={(e) => onChange('nama', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => onChange('email', e.target.value)} />
            </div>
            {user.role !== 'siswa' && (
              <div className="input-group">
                <label>NIP</label>
                <input value={form.nip} onChange={(e) => onChange('nip', e.target.value)} />
              </div>
            )}
            {user.role === 'siswa' && (
              <div className="input-group">
                <label>Kelas</label>
                <input value={form.kelas} onChange={(e) => onChange('kelas', e.target.value)} />
              </div>
            )}
            <div className="input-group">
              <label>No. HP</label>
              <input value={form.phone} onChange={(e) => onChange('phone', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Alamat</label>
              <input value={form.address} onChange={(e) => onChange('address', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Foto Profil (URL)</label>
              <input value={form.avatarUrl} onChange={(e) => onChange('avatarUrl', e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div className="actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={18} />
              Simpan Profil
            </button>
            {status === 'success' && <span className="status success">Tersimpan</span>}
            {status === 'error' && <span className="status error">Gagal menyimpan</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;


