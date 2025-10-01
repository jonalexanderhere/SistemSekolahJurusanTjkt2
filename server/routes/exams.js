const express = require('express');
const router = express.Router();

// In-memory storage for exams and submissions
let exams = [];
let submissions = [];

// Create exam
router.post('/create', (req, res) => {
  const { 
    title, 
    mataPelajaran, 
    kelas, 
    deskripsi, 
    waktuMulai, 
    waktuSelesai, 
    durasi, 
    questions, 
    teacherId,
    teacherName 
  } = req.body;

  const exam = {
    id: `exam_${Date.now()}`,
    title,
    mataPelajaran,
    kelas,
    deskripsi,
    waktuMulai,
    waktuSelesai,
    durasi, // in minutes
    questions, // array of questions with options and correct answer
    teacherId,
    teacherName,
    createdAt: new Date().toISOString(),
    status: 'active'
  };

  exams.push(exam);

  res.json({
    message: 'Ujian berhasil dibuat',
    exam
  });
});

// Get all exams
router.get('/all', (req, res) => {
  const { kelas, mataPelajaran } = req.query;
  
  let filtered = exams;

  if (kelas) {
    filtered = filtered.filter(e => e.kelas === kelas);
  }

  if (mataPelajaran) {
    filtered = filtered.filter(e => e.mataPelajaran === mataPelajaran);
  }

  res.json(filtered);
});

// Get exam by ID
router.get('/:examId', (req, res) => {
  const { examId } = req.params;
  const exam = exams.find(e => e.id === examId);
  
  if (!exam) {
    return res.status(404).json({ message: 'Ujian tidak ditemukan' });
  }

  res.json(exam);
});

// Submit exam
router.post('/submit', (req, res) => {
  const { examId, studentId, studentName, answers } = req.body;
  
  const exam = exams.find(e => e.id === examId);
  
  if (!exam) {
    return res.status(404).json({ message: 'Ujian tidak ditemukan' });
  }

  // Calculate score
  let correctAnswers = 0;
  const totalQuestions = exam.questions.length;
  
  exam.questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      correctAnswers++;
    }
  });

  const score = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  const submission = {
    id: `submission_${Date.now()}`,
    examId,
    examTitle: exam.title,
    mataPelajaran: exam.mataPelajaran,
    studentId,
    studentName,
    answers,
    correctAnswers,
    totalQuestions,
    score: parseFloat(score),
    submittedAt: new Date().toISOString(),
    submittedAtString: new Date().toLocaleString('id-ID')
  };

  submissions.push(submission);

  res.json({
    message: 'Jawaban berhasil disimpan',
    submission
  });
});

// Get student submissions
router.get('/submissions/student/:studentId', (req, res) => {
  const { studentId } = req.params;
  const studentSubmissions = submissions.filter(s => s.studentId === studentId);
  
  res.json(studentSubmissions);
});

// Get exam submissions (for teacher)
router.get('/submissions/exam/:examId', (req, res) => {
  const { examId } = req.params;
  const examSubmissions = submissions.filter(s => s.examId === examId);
  
  res.json(examSubmissions);
});

// Update exam
router.put('/update/:examId', (req, res) => {
  const { examId } = req.params;
  const updates = req.body;
  
  const examIndex = exams.findIndex(e => e.id === examId);
  
  if (examIndex === -1) {
    return res.status(404).json({ message: 'Ujian tidak ditemukan' });
  }

  exams[examIndex] = { ...exams[examIndex], ...updates, updatedAt: new Date().toISOString() };

  res.json({
    message: 'Ujian berhasil diupdate',
    exam: exams[examIndex]
  });
});

// Delete exam
router.delete('/delete/:examId', (req, res) => {
  const { examId } = req.params;
  const initialLength = exams.length;
  
  exams = exams.filter(e => e.id !== examId);
  
  if (exams.length === initialLength) {
    return res.status(404).json({ message: 'Ujian tidak ditemukan' });
  }

  // Also delete related submissions
  submissions = submissions.filter(s => s.examId !== examId);

  res.json({ message: 'Ujian berhasil dihapus' });
});

module.exports = router;

