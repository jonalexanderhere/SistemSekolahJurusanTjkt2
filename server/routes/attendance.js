const express = require('express');
const router = express.Router();
const users = require('../data/users');

// In-memory storage for attendance records
let attendanceRecords = [];

// Record attendance
router.post('/record', (req, res) => {
  const { studentId, type, method } = req.body; // type: 'masuk' or 'pulang', method: 'face' or 'manual'
  
  const student = users.students.find(s => s.id === studentId);
  
  if (!student) {
    return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  }

  const now = new Date();
  const attendance = {
    id: `att_${Date.now()}`,
    studentId: student.id,
    nisn: student.nisn,
    nama: student.nama,
    kelas: student.kelas,
    type,
    method,
    timestamp: now.toISOString(),
    date: now.toLocaleDateString('id-ID'),
    time: now.toLocaleTimeString('id-ID'),
    status: 'hadir'
  };

  attendanceRecords.push(attendance);

  // Update student's hadir status
  student.hadir = true;

  // Emit realtime update via socket.io
  const io = req.app.get('io');
  io.emit('attendanceUpdate', attendance);

  res.json({
    message: 'Absensi berhasil dicatat',
    attendance
  });
});

// Get all attendance records
router.get('/records', (req, res) => {
  const { date, studentId } = req.query;
  
  let filtered = attendanceRecords;

  if (date) {
    filtered = filtered.filter(r => r.date === date);
  }

  if (studentId) {
    filtered = filtered.filter(r => r.studentId === studentId);
  }

  res.json(filtered);
});

// Get attendance summary
router.get('/summary', (req, res) => {
  const { date } = req.query;
  const today = date || new Date().toLocaleDateString('id-ID');
  
  const todayRecords = attendanceRecords.filter(r => r.date === today);
  const presentStudents = [...new Set(todayRecords.map(r => r.studentId))];
  
  const summary = {
    total: users.students.length,
    hadir: presentStudents.length,
    tidak_hadir: users.students.length - presentStudents.length,
    percentage: ((presentStudents.length / users.students.length) * 100).toFixed(2)
  };

  res.json(summary);
});

// Get student attendance history
router.get('/history/:studentId', (req, res) => {
  const { studentId } = req.params;
  const history = attendanceRecords.filter(r => r.studentId === studentId);
  
  res.json(history);
});

module.exports = router;

