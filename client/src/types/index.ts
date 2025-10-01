// User types
export interface User {
  id: string;
  username: string;
  nama: string;
  role: 'admin' | 'guru' | 'siswa';
  email?: string;
  nisn?: string;
  nip?: string;
  kelas?: string;
  mataPelajaran?: string[];
  faceRegistered?: boolean;
  hadir?: boolean;
}

// Attendance types
export interface AttendanceRecord {
  id: string;
  studentId: string;
  nisn?: string;
  nama: string;
  kelas: string;
  type: 'masuk' | 'pulang';
  method: 'face' | 'manual';
  timestamp: string;
  date: string;
  time: string;
  status: string;
}

// Grade types
export interface Grade {
  id: string;
  studentId: string;
  nisn?: string;
  namaSiswa: string;
  kelas: string;
  mataPelajaran: string;
  kategori: 'UH' | 'UTS' | 'UAS' | 'Tugas' | 'Praktik';
  nilai: number;
  keterangan?: string;
  teacherId: string;
  teacherName: string;
  tanggal: string;
  tanggalString: string;
}

// Exam types
export interface ExamQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Exam {
  id: string;
  title: string;
  mataPelajaran: string;
  kelas: string;
  deskripsi: string;
  waktuMulai?: string;
  waktuSelesai?: string;
  durasi: number;
  questions: ExamQuestion[];
  teacherId: string;
  teacherName: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface ExamSubmission {
  id: string;
  examId: string;
  examTitle: string;
  mataPelajaran: string;
  studentId: string;
  studentName: string;
  answers: number[];
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  submittedAt: string;
  submittedAtString: string;
}

// Camera permission types
export interface CameraPermissionState {
  granted: boolean;
  denied: boolean;
  prompt: boolean;
}

