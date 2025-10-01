import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, FileText, Clock, CheckCircle, X } from 'lucide-react';
import './ExamsPage.css';

function ExamsPage({ user }) {
  const [exams, setExams] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    mataPelajaran: 'MPKK',
    kelas: 'XII TJKT 2',
    deskripsi: '',
    durasi: 60,
    questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]
  });

  useEffect(() => {
    loadExams();
    if (user.role === 'siswa') {
      loadSubmissions();
    }
  }, [user]);

  const loadExams = async () => {
    try {
      const params = user.role === 'siswa' ? { kelas: 'XII TJKT 2' } : {};
      const response = await axios.get('/api/exams/all', { params });
      setExams(response.data);
    } catch (error) {
      console.error('Error loading exams:', error);
    }
  };

  const loadSubmissions = async () => {
    try {
      const response = await axios.get(`/api/exams/submissions/student/${user.id}`);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error loading submissions:', error);
    }
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]
    });
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleCreateExam = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/exams/create', {
        ...formData,
        teacherId: user.id,
        teacherName: user.nama
      });

      setShowCreateModal(false);
      setFormData({
        title: '',
        mataPelajaran: '',
        kelas: 'XI TJKT',
        deskripsi: '',
        durasi: 60,
        questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]
      });
      loadExams();
      alert('Ujian berhasil dibuat!');
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Gagal membuat ujian.');
    }
  };

  const handleStartExam = (exam) => {
    // Check if already submitted
    const hasSubmitted = submissions.some(s => s.examId === exam.id);
    if (hasSubmitted) {
      alert('Anda sudah mengerjakan ujian ini!');
      return;
    }

    setSelectedExam(exam);
    setAnswers({});
    setShowExamModal(true);
  };

  const handleSubmitExam = async () => {
    if (!window.confirm('Yakin ingin submit jawaban? Pastikan semua soal sudah dijawab.')) return;

    try {
      await axios.post('/api/exams/submit', {
        examId: selectedExam.id,
        studentId: user.id,
        studentName: user.nama,
        answers: Object.values(answers)
      });

      setShowExamModal(false);
      setSelectedExam(null);
      setAnswers({});
      loadSubmissions();
      alert('Jawaban berhasil disimpan!');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Gagal menyimpan jawaban.');
    }
  };

  const hasSubmitted = (examId) => {
    return submissions.some(s => s.examId === examId);
  };

  const getSubmissionScore = (examId) => {
    const submission = submissions.find(s => s.examId === examId);
    return submission ? submission.score : null;
  };

  return (
    <div className="exams-page">
      <div className="page-header">
        <div>
          <h1>Ujian</h1>
          <p className="subtitle">
            {user.role === 'guru' ? 'Buat dan kelola ujian' : 'Lihat dan kerjakan ujian'}
          </p>
        </div>
        {user.role === 'guru' && (
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={20} />
            Buat Ujian
          </button>
        )}
      </div>

      <div className="exams-grid">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div key={exam.id} className="exam-card card">
              <div className="exam-header">
                <h3>{exam.title}</h3>
                <span className="badge badge-info">{exam.mataPelajaran}</span>
              </div>
              
              <p className="exam-description">{exam.deskripsi}</p>
              
              <div className="exam-info">
                <div className="info-item">
                  <Clock size={16} />
                  <span>{exam.durasi} menit</span>
                </div>
                <div className="info-item">
                  <FileText size={16} />
                  <span>{exam.questions.length} soal</span>
                </div>
              </div>

              <div className="exam-meta">
                <small>Oleh: {exam.teacherName}</small>
                <small>Kelas: {exam.kelas}</small>
              </div>

              {user.role === 'siswa' && (
                <div className="exam-actions">
                  {hasSubmitted(exam.id) ? (
                    <div className="submission-status">
                      <CheckCircle size={20} color="#10b981" />
                      <span>Selesai - Nilai: {getSubmissionScore(exam.id)}</span>
                    </div>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleStartExam(exam)}>
                      Mulai Ujian
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="empty-state">Belum ada ujian</p>
        )}
      </div>

      {/* Create Exam Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Buat Ujian Baru</h2>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateExam}>
              <div className="input-group">
                <label>Judul Ujian *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
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
                  <label>Durasi (menit) *</label>
                  <input
                    type="number"
                    min="10"
                    max="180"
                    value={formData.durasi}
                    onChange={(e) => setFormData({ ...formData, durasi: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Deskripsi</label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  rows="3"
                  placeholder="Deskripsi ujian"
                />
              </div>

              <div className="questions-section">
                <div className="section-header">
                  <h3>Soal-soal</h3>
                  <button type="button" className="btn btn-secondary" onClick={handleAddQuestion}>
                    <Plus size={16} />
                    Tambah Soal
                  </button>
                </div>

                {formData.questions.map((question, qIndex) => (
                  <div key={qIndex} className="question-item">
                    <div className="question-header">
                      <h4>Soal {qIndex + 1}</h4>
                      {formData.questions.length > 1 && (
                        <button
                          type="button"
                          className="btn-icon btn-danger"
                          onClick={() => handleRemoveQuestion(qIndex)}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    <div className="input-group">
                      <label>Pertanyaan *</label>
                      <textarea
                        value={question.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                        rows="2"
                        required
                      />
                    </div>

                    <div className="options-grid">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="option-item">
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={question.correctAnswer === oIndex}
                            onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            placeholder={`Pilihan ${String.fromCharCode(65 + oIndex)}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Buat Ujian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Take Exam Modal */}
      {showExamModal && selectedExam && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <div>
                <h2>{selectedExam.title}</h2>
                <p className="exam-meta">{selectedExam.mataPelajaran} - {selectedExam.durasi} menit</p>
              </div>
              <button className="close-btn" onClick={() => setShowExamModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="exam-questions">
              {selectedExam.questions.map((question, index) => (
                <div key={index} className="question-box">
                  <h4>Soal {index + 1}</h4>
                  <p>{question.question}</p>

                  <div className="answer-options">
                    {question.options.map((option, oIndex) => (
                      <label key={oIndex} className="option-label">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={oIndex}
                          checked={answers[index] === oIndex}
                          onChange={() => setAnswers({ ...answers, [index]: oIndex })}
                        />
                        <span>{String.fromCharCode(65 + oIndex)}. {option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowExamModal(false)}>
                Batal
              </button>
              <button className="btn btn-success" onClick={handleSubmitExam}>
                Submit Jawaban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamsPage;

