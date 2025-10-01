import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ClipboardCheck, 
  GraduationCap, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Lock
} from 'lucide-react';
import AdminDashboard from './dashboards/AdminDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import StudentDashboard from './dashboards/StudentDashboard';
import AttendancePage from './pages/AttendancePage';
import GradesPage from './pages/GradesPage';
import ExamsPage from './pages/ExamsPage';
import FaceRegistration from './pages/FaceRegistration';
import NotificationsPage from './pages/NotificationsPage';
import StudentsPage from './pages/StudentsPage';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChangePassword';
import SettingsPage from './pages/SettingsPage';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getMenuItems = () => {
    const baseItems = [
      { path: '/dashboard', icon: Home, label: 'Dashboard', exact: true }
    ];

    if (user.role === 'admin') {
      return [
        ...baseItems,
        { path: '/dashboard/attendance', icon: ClipboardCheck, label: 'Absensi' },
        { path: '/dashboard/students', icon: Users, label: 'Data Siswa' },
        { path: '/dashboard/grades', icon: GraduationCap, label: 'Nilai' },
        { path: '/dashboard/exams', icon: FileText, label: 'Ujian' },
        { path: '/dashboard/notifications', icon: FileText, label: 'Notifikasi' },
        { path: '/dashboard/settings', icon: Settings, label: 'Pengaturan' },
        { path: '/dashboard/change-password', icon: Lock, label: 'Ubah Password' }
      ];
    } else if (user.role === 'guru') {
      return [
        ...baseItems,
        { path: '/dashboard/attendance', icon: ClipboardCheck, label: 'Absensi' },
        { path: '/dashboard/grades', icon: GraduationCap, label: 'Nilai' },
        { path: '/dashboard/exams', icon: FileText, label: 'Ujian' },
        { path: '/dashboard/notifications', icon: FileText, label: 'Notifikasi' },
        { path: '/dashboard/change-password', icon: Lock, label: 'Ubah Password' }
      ];
    } else {
      return [
        ...baseItems,
        { path: '/dashboard/face-registration', icon: Users, label: 'Registrasi Wajah' },
        { path: '/dashboard/attendance', icon: ClipboardCheck, label: 'Absensi Saya' },
        { path: '/dashboard/grades', icon: GraduationCap, label: 'Nilai Saya' },
        { path: '/dashboard/exams', icon: FileText, label: 'Ujian' },
        { path: '/dashboard/profile', icon: Settings, label: 'Profil' },
        { path: '/dashboard/change-password', icon: Lock, label: 'Ubah Password' }
      ];
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>{sidebarOpen ? 'SMK Negeri 1 Liwa' : 'SMKN1'}</h2>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {sidebarOpen && (
          <div className="sidebar-subtitle">
            <p>TJKT XII-2</p>
          </div>
        )}

        <div className="user-info">
          <div className="user-avatar">
            {user.nama.charAt(0).toUpperCase()}
          </div>
          {sidebarOpen && (
            <div className="user-details">
              <h3>{user.nama}</h3>
              <p className={`role-badge role-${user.role}`}>
                {user.role === 'admin' ? 'Administrator' : 
                 user.role === 'guru' ? 'Guru' : 'Siswa'}
              </p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {getMenuItems().map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            user.role === 'admin' ? <AdminDashboard /> :
            user.role === 'guru' ? <TeacherDashboard user={user} /> :
            <StudentDashboard user={user} />
          } />
          <Route path="/attendance" element={<AttendancePage user={user} />} />
          <Route path="/grades" element={<GradesPage user={user} />} />
          <Route path="/exams" element={<ExamsPage user={user} />} />
          {(user.role === 'guru' || user.role === 'admin') && (
            <Route path="/notifications" element={<NotificationsPage user={user} />} />
          )}
          {(user.role === 'guru' || user.role === 'admin') && (
            <Route path="/students" element={<StudentsPage />} />
          )}
          <Route path="/profile" element={<ProfilePage user={user} />} />
          <Route path="/change-password" element={<ChangePassword user={user} />} />
          {user.role === 'admin' && (
            <Route path="/settings" element={<SettingsPage user={user} />} />
          )}
          {user.role === 'siswa' && (
            <Route path="/face-registration" element={<FaceRegistration user={user} />} />
          )}
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;

