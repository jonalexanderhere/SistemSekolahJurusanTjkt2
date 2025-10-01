-- ============================================
-- INSERT ALL USERS DATA TO SUPABASE
-- Sistem Informasi Sekolah SMK Negeri 1 Liwa
-- TJKT XII-2
-- ============================================

-- Create users table if not exists
create table if not exists users (
  id text primary key,
  username text unique not null,
  password text not null, -- bcrypt hashed
  nama text not null,
  role text check (role in ('admin','guru','siswa')),
  email text,
  nisn text,
  nip text,
  kelas text,
  mata_pelajaran jsonb,
  hadir boolean default false,
  face_registered boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table users enable row level security;

-- RLS Policies
create policy "Allow all read users" on users for select using (true);
create policy "Allow insert users" on users for insert with check (true);
create policy "Allow update users" on users for update using (true);

-- Index for performance
create index if not exists idx_users_username on users(username);
create index if not exists idx_users_role on users(role);
create index if not exists idx_users_nisn on users(nisn);

-- ============================================
-- INSERT ADMIN ACCOUNTS
-- ============================================

INSERT INTO users (id, username, password, nama, role, email) VALUES
('admin001', 'admin1', '$2a$10$encrypted_admin1_password', 'Administrator 1 - SMK Negeri 1 Liwa', 'admin', 'admin1@smkn1liwa.sch.id'),
('admin002', 'admin2', '$2a$10$encrypted_admin2_password', 'Administrator 2 - SMK Negeri 1 Liwa', 'admin', 'admin2@smkn1liwa.sch.id')
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  email = EXCLUDED.email;

-- Note: Passwords need to be hashed with bcrypt before inserting
-- Admin1 password: Admin#SMKN1Liwa2024!
-- Admin2 password: Liwa@TJKT#2024Secure!

-- ============================================
-- INSERT TEACHER ACCOUNTS
-- ============================================

INSERT INTO users (id, username, password, nama, role, email, nip, mata_pelajaran) VALUES
('guru001', 'guru1', '$2a$10$encrypted_guru1_password', 'DIDIK KURNIAWAN, S.Kom, M.TI', 'guru', 'didik.kurniawan@smkn1liwa.sch.id', '198103102010011012', '["MPKK"]'::jsonb),
('guru002', 'guru2', '$2a$10$encrypted_guru2_password', 'ADE FIRMANSYAH, S.Kom', 'guru', 'ade.firmansyah@smkn1liwa.sch.id', '3855773674130022', '["MPKK"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  email = EXCLUDED.email,
  nip = EXCLUDED.nip;

-- Guru1 (DIDIK) password: guru123
-- Guru2 (ADE) password: guru123

-- ============================================
-- INSERT STUDENT ACCOUNTS (29 STUDENTS)
-- ============================================

INSERT INTO users (id, username, password, nama, role, nisn, kelas, hadir, face_registered) VALUES
('6643', '0089990908', '$2a$10$encrypted_student_password', 'ALLDOO SAPUTRA', 'siswa', '0089990908', 'XII TJKT 2', false, false),
('6644', '0071887022', '$2a$10$encrypted_student_password', 'ALYA ANGGITA MAHERA', 'siswa', '0071887022', 'XII TJKT 2', false, false),
('6645', '0071317242', '$2a$10$encrypted_student_password', 'AMELIA', 'siswa', '0071317242', 'XII TJKT 2', false, false),
('6646', '0083627332', '$2a$10$encrypted_student_password', 'AMELIA SEPTIA SARI', 'siswa', '0083627332', 'XII TJKT 2', false, false),
('6647', '0081278251', '$2a$10$encrypted_student_password', 'AULIA KENANGA SAFITRI', 'siswa', '0081278251', 'XII TJKT 2', false, false),
('6648', '3102623580', '$2a$10$encrypted_student_password', 'AYUNDA NAFISHA', 'siswa', '3102623580', 'XII TJKT 2', false, false),
('6649', '0088754753', '$2a$10$encrypted_student_password', 'BERLIAN ANUGRAH PRATAMA', 'siswa', '0088754753', 'XII TJKT 2', false, false),
('6650', '0076775460', '$2a$10$encrypted_student_password', 'DESTI RAHAYU', 'siswa', '0076775460', 'XII TJKT 2', false, false),
('6651', '0077986875', '$2a$10$encrypted_student_password', 'DESTIA', 'siswa', '0077986875', 'XII TJKT 2', false, false),
('6652', '0069944236', '$2a$10$encrypted_student_password', 'ERIC ERIANTO', 'siswa', '0069944236', 'XII TJKT 2', false, false),
('6653', '0084352502', '$2a$10$encrypted_student_password', 'FAIZAH AZ ZAHRA', 'siswa', '0084352502', 'XII TJKT 2', false, false),
('6654', '0082539133', '$2a$10$encrypted_student_password', 'FITRI ULANDARI', 'siswa', '0082539133', 'XII TJKT 2', false, false),
('6655', '0074043979', '$2a$10$encrypted_student_password', 'GHEA LITA ANASTASYA', 'siswa', '0074043979', 'XII TJKT 2', false, false),
('6656', '0081353027', '$2a$10$encrypted_student_password', 'JHOVANI WIJAYA', 'siswa', '0081353027', 'XII TJKT 2', false, false),
('6657', '0082019386', '$2a$10$encrypted_student_password', 'KEISYA AGUSTIN RASFA AULIA', 'siswa', '0082019386', 'XII TJKT 2', false, false),
('6659', '0074731920', '$2a$10$encrypted_student_password', 'MAHARANI', 'siswa', '0074731920', 'XII TJKT 2', false, false),
('6660', '0076724319', '$2a$10$encrypted_student_password', 'NAURA GHIFARI AZHAR', 'siswa', '0076724319', 'XII TJKT 2', false, false),
('6662', '0083063479', '$2a$10$encrypted_student_password', 'PATRA ADITTIA', 'siswa', '0083063479', 'XII TJKT 2', false, false),
('6663', '0085480329', '$2a$10$encrypted_student_password', 'PUTRI SAPARA', 'siswa', '0085480329', 'XII TJKT 2', false, false),
('6664', '0079319957', '$2a$10$encrypted_student_password', 'RAFI SEPTA WIRA TAMA', 'siswa', '0079319957', 'XII TJKT 2', false, false),
('6665', '0082901449', '$2a$10$encrypted_student_password', 'RAKA RAMADHANI PRATAMA', 'siswa', '0082901449', 'XII TJKT 2', false, false),
('6666', '0081628824', '$2a$10$encrypted_student_password', 'REGITA MAHARANI', 'siswa', '0081628824', 'XII TJKT 2', false, false),
('6667', '0081133109', '$2a$10$encrypted_student_password', 'REGITHA ANINDYA AZZAHRA', 'siswa', '0081133109', 'XII TJKT 2', false, false),
('6668', '0076040547', '$2a$10$encrypted_student_password', 'RENDI ARISNANDO', 'siswa', '0076040547', 'XII TJKT 2', false, false),
('6669', '0078327818', '$2a$10$encrypted_student_password', 'RIDHO ZAENAL MUSTAQIM', 'siswa', '0078327818', 'XII TJKT 2', false, false),
('6670', '0076113354', '$2a$10$encrypted_student_password', 'RISTY WIDIASIH', 'siswa', '0076113354', 'XII TJKT 2', false, false),
('6671', '0084399894', '$2a$10$encrypted_student_password', 'SIFA RISTIANA', 'siswa', '0084399894', 'XII TJKT 2', false, false),
('6672', 'AMELDIANA', '$2a$10$encrypted_student_password', 'AMELIA DIANA', 'siswa', 'AMELDIANA', 'XII TJKT 2', false, false),
('6673', 'DESTAMEL', '$2a$10$encrypted_student_password', 'DESTA AMELIA', 'siswa', 'DESTAMEL', 'XII TJKT 2', false, false)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  kelas = EXCLUDED.kelas;

-- Student passwords: Their ID (6643, 6644, 6645, etc.)

-- ============================================
-- VERIFY DATA
-- ============================================

-- Check total users
SELECT role, COUNT(*) as total FROM users GROUP BY role;

-- Expected result:
-- admin: 2
-- guru: 2
-- siswa: 29
-- TOTAL: 33 users

-- ============================================
-- IMPORTANT NOTES
-- ============================================
-- 
-- 1. HASH PASSWORDS BEFORE INSERTING!
--    Use Node.js script to generate bcrypt hashes:
--    
--    const bcrypt = require('bcryptjs');
--    const hash = bcrypt.hashSync('password', 10);
--    console.log(hash);
--
-- 2. Replace '$2a$10$encrypted_XXX_password' with actual hashes
--
-- 3. Password mapping:
--    - admin1: Admin#SMKN1Liwa2024!
--    - admin2: Liwa@TJKT#2024Secure!
--    - guru1: guru123
--    - guru2: guru123
--    - students: Their ID (6643, 6644, etc.)
--
-- 4. Run this AFTER supabase_schema.sql
--
-- 5. For production, use environment-specific passwords!
--
-- ============================================

