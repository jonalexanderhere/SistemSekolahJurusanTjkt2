import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, X } from 'lucide-react';
import './GradesPage.css';

function GradesPage({ user }) {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    mataPelajaran: '',
    kategori: 'UH',
    sub_kategori: '',
    nilai: '',
    keterangan: ''
  });

  useEffect(() => {
    loadGrades();
    if (user.role !== 'siswa') {
      loadStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, user.role]);

  const loadGrades = async () => {
    try {
      if (user.role === 'siswa') {
        const response = await axios.get(`/api/grades/student/${user.id}`);
        setGrades(response.data);
      } else {
        const response = await axios.get('/api/grades/all');
        const all = response.data || [];
        // Hanya tampilkan nilai yang diinput oleh guru yang login
        const filtered = user.role === 'guru' ? all.filter(g => g.teacherId === user.id) : all;
        setGrades(filtered);
      }
    } catch (error) {
      console.error('Error loading grades:', error);
    }
  };

  const loadStudents = async () => {
    try {
      const response = await axios.get('/api/auth/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/grades/add', {
        ...formData,
        teacherId: user.id,
        teacherName: user.nama
      });

      setShowModal(false);
      setFormData({
        studentId: '',
        mataPelajaran: '',
        kategori: 'UH',
        nilai: '',
        keterangan: ''
      });
      loadGrades();
      alert('Nilai berhasil ditambahkan!');
    } catch (error) {
      console.error('Error adding grade:', error);
      alert('Gagal menambahkan nilai.');
    }
  };

  const handleDelete = async (gradeId) => {
    if (!window.confirm('Yakin ingin menghapus nilai ini?')) return;

    try {
      await axios.delete(`/api/grades/delete/${gradeId}`);
      loadGrades();
      alert('Nilai berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting grade:', error);
      alert('Gagal menghapus nilai.');
    }
  };

  const getAverageGrade = () => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + grade.nilai, 0);
    return (total / grades.length).toFixed(2);
  };

  return (
    <div className="grades-page">
      <div className="page-header">
        <div>
          <h1>Nilai</h1>
          <p className="subtitle">
            {user.role === 'siswa' ? 'Lihat nilai Anda' : 'Kelola nilai siswa'}
          </p>
        </div>
        {user.role === 'guru' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={20} />
            Tambah Nilai
          </button>
        )}
      </div>

      {user.role === 'siswa' && (
        <div className="average-card card">
          <h2>Rata-rata Nilai</h2>
          <p className="average-value">{getAverageGrade()}</p>
        </div>
      )}

      <div className="card">
        <h2>Daftar Nilai</h2>
        {grades.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {user.role !== 'siswa' && <th>Nama Siswa</th>}
                  <th>Mata Pelajaran</th>
                  <th>Kategori</th>
                  <th>Nilai</th>
                  <th>Keterangan</th>
                  {user.role !== 'siswa' && <th>Guru</th>}
                  <th>Tanggal</th>
                  {user.role === 'guru' && <th>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr key={grade.id}>
                    {user.role !== 'siswa' && <td>{grade.namaSiswa}</td>}
                    <td>{grade.mataPelajaran}</td>
                    <td>
                      <span className="badge badge-info">
                        {grade.kategori}
                        {grade.sub_kategori && <br />}
                        {grade.sub_kategori && <small>{grade.sub_kategori}</small>}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        grade.nilai >= 80 ? 'badge-success' : 
                        grade.nilai >= 60 ? 'badge-warning' : 
                        'badge-danger'
                      }`}>
                        {grade.nilai}
                      </span>
                    </td>
                    <td>{grade.keterangan || '-'}</td>
                    {user.role !== 'siswa' && <td>{grade.teacherName}</td>}
                    <td>{grade.tanggalString}</td>
                    {user.role === 'guru' && (
                      <td>
                        <button 
                          className="btn-icon btn-danger" 
                          onClick={() => handleDelete(grade.id)}
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-state">Belum ada nilai</p>
        )}
      </div>

      {/* Add Grade Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tambah Nilai</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Siswa *</label>
                <select
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  required
                >
                  <option value="">Pilih Siswa</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.nama} - {student.kelas}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Mata Pelajaran *</label>
                <select
                  value={formData.mataPelajaran}
                  onChange={(e) => setFormData({ ...formData, mataPelajaran: e.target.value })}
                  required
                >
                  <option value="">Pilih Mata Pelajaran</option>
                  {user.mataPelajaran?.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Kategori *</label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value, sub_kategori: '' })}
                  required
                >
                  <option value="UH">Ulangan Harian</option>
                  <option value="UTS">Ujian Tengah Semester</option>
                  <option value="UAS">Ujian Akhir Semester</option>
                  <option value="Tugas">Tugas</option>
                  <option value="Praktik">Praktik</option>
                  <option value="Proyek">Proyek</option>
                </select>
              </div>

              {formData.kategori === 'Praktik' && (
                <div className="input-group">
                  <label>Jenis Praktik *</label>
                  <select
                    value={formData.sub_kategori}
                    onChange={(e) => setFormData({ ...formData, sub_kategori: e.target.value })}
                    required
                  >
                    <option value="">Pilih Jenis Praktik</option>
                    <option value="Praktik Jaringan">Praktik Jaringan</option>
                    <option value="Praktik Troubleshooting">Praktik Troubleshooting</option>
                    <option value="Praktik Maintenance">Praktik Maintenance</option>
                    <option value="Praktik Perakitan PC">Praktik Perakitan PC</option>
                    <option value="Praktik Konfigurasi Server">Praktik Konfigurasi Server</option>
                  </select>
                </div>
              )}

              {formData.kategori === 'Tugas' && (
                <div className="input-group">
                  <label>Jenis Tugas</label>
                  <input
                    type="text"
                    value={formData.sub_kategori}
                    onChange={(e) => setFormData({ ...formData, sub_kategori: e.target.value })}
                    placeholder="Contoh: Tugas Troubleshooting, Tugas Jaringan, dll"
                  />
                </div>
              )}

              <div className="input-group">
                <label>Nilai (0-100) *</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.nilai}
                  onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Keterangan</label>
                <textarea
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  rows="3"
                  placeholder="Keterangan tambahan (opsional)"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GradesPage;

