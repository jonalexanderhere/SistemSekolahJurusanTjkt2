import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, FileText, GraduationCap, Clock } from 'lucide-react';
import '../dashboards/AdminDashboard.css';

function TeacherDashboard({ user }) {
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    totalExams: 0,
    totalGrades: 0
  });

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDashboardData = async () => {
    try {
      const [studentsRes, summaryRes, examsRes, gradesRes] = await Promise.all([
        axios.get('/api/auth/students'),
        axios.get('/api/attendance/summary'),
        axios.get('/api/exams/all'),
        axios.get('/api/grades/all')
      ]);

      setStats({
        totalStudents: studentsRes.data.length,
        presentToday: summaryRes.data.hadir,
        totalExams: examsRes.data.filter(e => e.teacherId === user.id).length,
        totalGrades: (gradesRes.data || []).filter(g => g.teacherId === user.id).length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Guru</h1>
      <p className="subtitle">Selamat datang, {user.nama}</p>

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
            <Clock size={24} color="#065f46" />
          </div>
          <div className="stat-info">
            <h3>Hadir Hari Ini</h3>
            <p className="stat-value">{stats.presentToday}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7' }}>
            <FileText size={24} color="#92400e" />
          </div>
          <div className="stat-info">
            <h3>Ujian Dibuat</h3>
            <p className="stat-value">{stats.totalExams}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0e7ff' }}>
            <GraduationCap size={24} color="#4338ca" />
          </div>
          <div className="stat-info">
            <h3>Nilai Diinput</h3>
            <p className="stat-value">{stats.totalGrades}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Mata Pelajaran Diampu</h2>
        <div className="subject-list">
          {user.mataPelajaran?.map((subject, index) => (
            <div key={index} className="subject-item">
              <GraduationCap size={20} />
              <span>{subject}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;

