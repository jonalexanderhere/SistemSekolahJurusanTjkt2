import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ClipboardCheck, GraduationCap, TrendingUp } from 'lucide-react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
    attendancePercentage: 0
  });
  const [recentAttendance, setRecentAttendance] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [studentsRes, summaryRes, recordsRes] = await Promise.all([
        axios.get('/api/auth/students'),
        axios.get('/api/attendance/summary'),
        axios.get('/api/attendance/records')
      ]);

      setStats({
        totalStudents: studentsRes.data.length,
        presentToday: summaryRes.data.hadir,
        absentToday: summaryRes.data.tidak_hadir,
        attendancePercentage: summaryRes.data.percentage
      });

      setRecentAttendance(recordsRes.data.slice(0, 10));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Administrator</h1>
      <p className="subtitle">Selamat datang di sistem informasi TJKT MPKK</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe' }}>
            <Users size={24} color="#1e40af" />
          </div>
          <div className="stat-info">
            <h3>Total Siswa</h3>
            <p className="stat-value">{stats.totalStudents}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#d1fae5' }}>
            <ClipboardCheck size={24} color="#065f46" />
          </div>
          <div className="stat-info">
            <h3>Hadir Hari Ini</h3>
            <p className="stat-value">{stats.presentToday}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fee2e2' }}>
            <Users size={24} color="#991b1b" />
          </div>
          <div className="stat-info">
            <h3>Tidak Hadir</h3>
            <p className="stat-value">{stats.absentToday}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7' }}>
            <TrendingUp size={24} color="#92400e" />
          </div>
          <div className="stat-info">
            <h3>Persentase Kehadiran</h3>
            <p className="stat-value">{stats.attendancePercentage}%</p>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h2>Absensi Terbaru</h2>
        <div className="card">
          {recentAttendance.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Kelas</th>
                    <th>Waktu</th>
                    <th>Metode</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAttendance.map((record) => (
                    <tr key={record.id}>
                      <td>{record.nama}</td>
                      <td>{record.kelas}</td>
                      <td>{record.time}</td>
                      <td>
                        <span className={`badge ${record.method === 'face' ? 'badge-info' : 'badge-warning'}`}>
                          {record.method === 'face' ? 'Face Recognition' : 'Manual'}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-success">Hadir</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-state">Belum ada data absensi hari ini</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

