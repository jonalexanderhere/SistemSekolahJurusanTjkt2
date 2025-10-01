const express = require('express');
const router = express.Router();
const users = require('../data/users');

// In-memory storage for face descriptors
let faceDescriptors = [];

// Register face
router.post('/register', (req, res) => {
  const { studentId, descriptors } = req.body;
  
  const student = users.students.find(s => s.id === studentId);
  
  if (!student) {
    return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  }

  // Remove existing descriptors for this student
  faceDescriptors = faceDescriptors.filter(fd => fd.studentId !== studentId);

  // Add new descriptors
  faceDescriptors.push({
    studentId: student.id,
    nisn: student.nisn,
    nama: student.nama,
    descriptors,
    registeredAt: new Date().toISOString()
  });

  // Update student's faceRegistered status
  student.faceRegistered = true;

  res.json({
    message: 'Wajah berhasil didaftarkan',
    student: {
      id: student.id,
      nama: student.nama,
      nisn: student.nisn,
      faceRegistered: true
    }
  });
});

// Get all face descriptors (for matching)
router.get('/descriptors', (req, res) => {
  res.json(faceDescriptors);
});

// Get student face registration status
router.get('/status/:studentId', (req, res) => {
  const { studentId } = req.params;
  const student = users.students.find(s => s.id === studentId);
  
  if (!student) {
    return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  }

  const hasFace = faceDescriptors.some(fd => fd.studentId === studentId);

  res.json({
    studentId: student.id,
    nama: student.nama,
    faceRegistered: hasFace
  });
});

// Query-based alias for local compatibility: /api/face/status?studentId=...
router.get('/status', (req, res) => {
  const { studentId } = req.query;
  if (!studentId) return res.status(400).json({ message: 'studentId is required' });

  const student = users.students.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  }

  const hasFace = faceDescriptors.some(fd => fd.studentId === studentId);

  res.json({
    studentId: student.id,
    nama: student.nama,
    faceRegistered: hasFace
  });
});

// Delete face registration
router.delete('/delete/:studentId', (req, res) => {
  const { studentId } = req.params;
  
  const student = users.students.find(s => s.id === studentId);
  
  if (!student) {
    return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  }

  faceDescriptors = faceDescriptors.filter(fd => fd.studentId !== studentId);
  student.faceRegistered = false;

  res.json({ message: 'Registrasi wajah berhasil dihapus' });
});

module.exports = router;

