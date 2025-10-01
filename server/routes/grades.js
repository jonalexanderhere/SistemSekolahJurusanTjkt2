const express = require('express');
const router = express.Router();
const users = require('../data/users');

// In-memory storage for grades
let grades = [];

// Add or update grade
router.post('/add', (req, res) => {
  const { studentId, mataPelajaran, kategori, nilai, keterangan, teacherId } = req.body;
  
  const student = users.students.find(s => s.id === studentId);
  const teacher = users.teachers.find(t => t.id === teacherId);
  
  if (!student) {
    return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  }

  const grade = {
    id: `grade_${Date.now()}`,
    studentId: student.id,
    nisn: student.nisn,
    namaSiswa: student.nama,
    kelas: student.kelas,
    mataPelajaran,
    kategori, // UH, UTS, UAS, Tugas, Praktik
    nilai: parseFloat(nilai),
    keterangan,
    teacherId,
    teacherName: teacher?.nama || 'Unknown',
    tanggal: new Date().toISOString(),
    tanggalString: new Date().toLocaleDateString('id-ID')
  };

  grades.push(grade);

  res.json({
    message: 'Nilai berhasil ditambahkan',
    grade
  });
});

// Get grades by student
router.get('/student/:studentId', (req, res) => {
  const { studentId } = req.params;
  const studentGrades = grades.filter(g => g.studentId === studentId);
  
  res.json(studentGrades);
});

// Get all grades
router.get('/all', (req, res) => {
  const { mataPelajaran, kelas } = req.query;
  
  let filtered = grades;

  if (mataPelajaran) {
    filtered = filtered.filter(g => g.mataPelajaran === mataPelajaran);
  }

  if (kelas) {
    filtered = filtered.filter(g => g.kelas === kelas);
  }

  res.json(filtered);
});

// Update grade
router.put('/update/:gradeId', (req, res) => {
  const { gradeId } = req.params;
  const { nilai, keterangan } = req.body;
  
  const gradeIndex = grades.findIndex(g => g.id === gradeId);
  
  if (gradeIndex === -1) {
    return res.status(404).json({ message: 'Nilai tidak ditemukan' });
  }

  if (nilai !== undefined) {
    grades[gradeIndex].nilai = parseFloat(nilai);
  }
  
  if (keterangan !== undefined) {
    grades[gradeIndex].keterangan = keterangan;
  }

  grades[gradeIndex].updatedAt = new Date().toISOString();

  res.json({
    message: 'Nilai berhasil diupdate',
    grade: grades[gradeIndex]
  });
});

// Delete grade
router.delete('/delete/:gradeId', (req, res) => {
  const { gradeId } = req.params;
  const initialLength = grades.length;
  
  grades = grades.filter(g => g.id !== gradeId);
  
  if (grades.length === initialLength) {
    return res.status(404).json({ message: 'Nilai tidak ditemukan' });
  }

  res.json({ message: 'Nilai berhasil dihapus' });
});

// Get grade statistics
router.get('/statistics/:studentId', (req, res) => {
  const { studentId } = req.params;
  const studentGrades = grades.filter(g => g.studentId === studentId);
  
  if (studentGrades.length === 0) {
    return res.json({ message: 'Belum ada nilai', average: 0, total: 0 });
  }

  const total = studentGrades.reduce((sum, g) => sum + g.nilai, 0);
  const average = (total / studentGrades.length).toFixed(2);
  
  const bySubject = {};
  studentGrades.forEach(g => {
    if (!bySubject[g.mataPelajaran]) {
      bySubject[g.mataPelajaran] = [];
    }
    bySubject[g.mataPelajaran].push(g.nilai);
  });

  const subjectAverages = {};
  Object.keys(bySubject).forEach(subject => {
    const subjectTotal = bySubject[subject].reduce((sum, val) => sum + val, 0);
    subjectAverages[subject] = (subjectTotal / bySubject[subject].length).toFixed(2);
  });

  res.json({
    average: parseFloat(average),
    total: studentGrades.length,
    bySubject: subjectAverages,
    highest: Math.max(...studentGrades.map(g => g.nilai)),
    lowest: Math.min(...studentGrades.map(g => g.nilai))
  });
});

module.exports = router;

