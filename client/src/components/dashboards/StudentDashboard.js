import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipboardCheck, GraduationCap, FileText, Award } from 'lucide-react';
import '../dashboards/AdminDashboard.css';

function StudentDashboard({ user }) {
  const [stats, setStats] = useState({
    totalAttendance: 0,
    averageGrade: 0,
    totalExams: 0,
    completedExams: 0
  });
  const [recentGrades, setRecentGrades] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, [user.id]);

  const loadDashboardData = async () => {
    try {
      const [attendanceRes, gradesRes, statisticsRes, submissionsRes, examsRes] = await Promise.all([
        axios.get(`/api/attendance/history/${user.id}`),
        axios.get(`/api/grades/student/${user.id}`),
        axios.get(`/api/grades/statistics/${user.id}`),
        axios.get(`/api/exams/submissions/student/${user.id}`),
        axios.get(`/api/exams/all?kelas=${user.kelas}`)
      ]);

      setStats({
        totalAttendance: attendanceRes.data.length,
        averageGrade: statisticsRes.data.average || 0,
        totalExams: examsRes.data.length,
        completedExams: submissionsRes.data.length
      });

      setRecentGrades(gradesRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Siswa</h1>
      <p className="subtitle">Selamat datang, {user.nama}</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#d1fae5' }}>
            <ClipboardCheck size={24} color="#065f46" />
          </div>
          <div className="stat-info">
            <h3>Total Kehadiran</h3>
            <p className="stat-value">{stats.totalAttendance}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe' }}>
            <GraduationCap size={24} color="#1e40af" />
          </div>
          <div className="stat-info">
            <h3>Rata-rata Nilai</h3>
            <p className="stat-value">{stats.averageGrade.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7' }}>
            <FileText size={24} color="#92400e" />
          </div>
          <div className="stat-info">
            <h3>Ujian Tersedia</h3>
            <p className="stat-value">{stats.totalExams}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0e7ff' }}>
            <Award size={24} color="#4338ca" />
          </div>
          <div className="stat-info">
            <h3>Ujian Selesai</h3>
            <p className="stat-value">{stats.completedExams}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Nilai Terbaru</h2>
        {recentGrades.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Mata Pelajaran</th>
                  <th>Kategori</th>
                  <th>Nilai</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentGrades.map((grade) => (
                  <tr key={grade.id}>
                    <td>{grade.mataPelajaran}</td>
                    <td>{grade.kategori}</td>
                    <td>
                      <span className={`badge ${
                        grade.nilai >= 80 ? 'badge-success' : 
                        grade.nilai >= 60 ? 'badge-warning' : 
                        'badge-danger'
                      }`}>
                        {grade.nilai}
                      </span>
                    </td>
                    <td>{grade.tanggalString}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-state">Belum ada nilai</p>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;

