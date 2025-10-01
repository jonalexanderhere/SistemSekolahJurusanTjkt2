import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings, Clock, Calendar, Save, AlertCircle } from 'lucide-react';
import './SettingsPage.css';

function SettingsPage({ user }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [scheduleForm, setScheduleForm] = useState({
    masuk_start: '06:30',
    masuk_end: '07:30',
    pulang_start: '14:30',
    pulang_end: '15:30'
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await axios.get('/api/settings/all');
      setSettings(response.data);
      
      // Populate form
      if (response.data.school_schedule) {
        const schedule = response.data.school_schedule;
        setScheduleForm({
          masuk_start: schedule.attendance_hours.masuk.start,
          masuk_end: schedule.attendance_hours.masuk.end,
          pulang_start: schedule.attendance_hours.pulang.start,
          pulang_end: schedule.attendance_hours.pulang.end
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Gagal memuat pengaturan' });
      setLoading(false);
    }
  };

  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const updatedSchedule = {
        ...settings.school_schedule,
        attendance_hours: {
          masuk: {
            start: scheduleForm.masuk_start,
            end: scheduleForm.masuk_end,
            label: "Jam Masuk"
          },
          pulang: {
            start: scheduleForm.pulang_start,
            end: scheduleForm.pulang_end,
            label: "Jam Pulang"
          }
        }
      };

      await axios.put('/api/settings/school_schedule', {
        value: updatedSchedule,
        updatedBy: user.nama
      });

      setMessage({ 
        type: 'success', 
        text: 'Jadwal absensi berhasil diperbarui!' 
      });

      // Reload settings
      loadSettings();
    } catch (error) {
      console.error('Error saving schedule:', error);
      setMessage({ 
        type: 'error', 
        text: 'Gagal menyimpan jadwal. Silakan coba lagi.' 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="loading">Memuat pengaturan...</div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <Settings size={32} />
        <div>
          <h1>Pengaturan Sekolah</h1>
          <p>Kelola jam pembelajaran dan absensi</p>
        </div>
      </div>

      {message.text && (
        <div className={`message-alert ${message.type}`}>
          <AlertCircle size={20} />
          <span>{message.text}</span>
        </div>
      )}

      {/* School Info */}
      <div className="settings-section">
        <div className="section-header">
          <Calendar size={24} />
          <h2>Informasi Sekolah</h2>
        </div>
        <div className="info-card">
          <div className="info-item">
            <label>Nama Sekolah:</label>
            <p>{settings?.school_schedule?.name || 'SMK Negeri 1 Liwa - TJKT XII-2'}</p>
          </div>
          <div className="info-item">
            <label>Zona Waktu:</label>
            <p>{settings?.school_schedule?.timezone || 'Asia/Jakarta'}</p>
          </div>
          <div className="info-item">
            <label>Hari Sekolah:</label>
            <p>{settings?.school_schedule?.school_days?.join(', ') || 'Monday - Saturday'}</p>
          </div>
        </div>
      </div>

      {/* Attendance Schedule */}
      <div className="settings-section">
        <div className="section-header">
          <Clock size={24} />
          <h2>Jam Absensi</h2>
        </div>
        
        <form onSubmit={handleSaveSchedule} className="schedule-form">
          <div className="time-settings-grid">
            {/* Jam Masuk */}
            <div className="time-group">
              <h3>Absensi Masuk</h3>
              <div className="time-inputs">
                <div className="form-group">
                  <label>Jam Mulai</label>
                  <input
                    type="time"
                    value={scheduleForm.masuk_start}
                    onChange={(e) => setScheduleForm({...scheduleForm, masuk_start: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Jam Selesai</label>
                  <input
                    type="time"
                    value={scheduleForm.masuk_end}
                    onChange={(e) => setScheduleForm({...scheduleForm, masuk_end: e.target.value})}
                    required
                  />
                </div>
              </div>
              <p className="time-preview">
                Siswa dapat absen masuk dari <strong>{scheduleForm.masuk_start}</strong> sampai <strong>{scheduleForm.masuk_end}</strong>
              </p>
            </div>

            {/* Jam Pulang */}
            <div className="time-group">
              <h3>Absensi Pulang</h3>
              <div className="time-inputs">
                <div className="form-group">
                  <label>Jam Mulai</label>
                  <input
                    type="time"
                    value={scheduleForm.pulang_start}
                    onChange={(e) => setScheduleForm({...scheduleForm, pulang_start: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Jam Selesai</label>
                  <input
                    type="time"
                    value={scheduleForm.pulang_end}
                    onChange={(e) => setScheduleForm({...scheduleForm, pulang_end: e.target.value})}
                    required
                  />
                </div>
              </div>
              <p className="time-preview">
                Siswa dapat absen pulang dari <strong>{scheduleForm.pulang_start}</strong> sampai <strong>{scheduleForm.pulang_end}</strong>
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary save-btn"
            disabled={saving}
          >
            <Save size={20} />
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>

      {/* Class Schedule Info */}
      <div className="settings-section">
        <div className="section-header">
          <Calendar size={24} />
          <h2>Jadwal Pelajaran XII TJKT 2</h2>
        </div>
        
        <div className="schedule-preview">
          {settings?.class_schedule?.['XII TJKT 2'] && (
            Object.entries(settings.class_schedule['XII TJKT 2']).map(([day, schedules]) => (
              <div key={day} className="day-schedule">
                <h4>{day}</h4>
                <div className="schedule-list">
                  {schedules.map((schedule, idx) => (
                    <div key={idx} className="schedule-item">
                      <span className="time">{schedule.time}</span>
                      <span className="subject">{schedule.subject}</span>
                      <span className="teacher">{schedule.teacher}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="info-note">
          <AlertCircle size={18} />
          <p>
            Untuk mengubah jadwal pelajaran, hubungi administrator sistem.
            Jadwal ini digunakan untuk referensi dan pelaporan.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

