# 🎓 Sistem Informasi Sekolah SMK Negeri 1 Liwa

<div align="center">

![School System](https://img.shields.io/badge/SMK%20Negeri%201%20Liwa-TJKT%20XII--2-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**Sistem Informasi Sekolah Modern dengan Face Recognition Attendance**

Mata Pelajaran: **MPKK (Maintenance & Troubleshooting)**  
Kelas: **XII TJKT 2**  
Total Siswa: **29 Orang**

[Demo](#) | [Documentation](#dokumentasi) | [Installation](#-installation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Usage](#-usage)
- [Documentation](#-dokumentasi)
- [Support](#-support)

---

## 🎯 Overview

Sistem Informasi Sekolah terintegrasi untuk **SMK Negeri 1 Liwa** khusus jurusan **Teknik Komputer dan Jaringan (TJKT)** kelas **XII-2**. Sistem ini menyediakan solusi digital lengkap untuk:

- ✅ **Absensi** berbasis Face Recognition
- ✅ **Manajemen Nilai** digital
- ✅ **Ujian Online** dengan auto-grading
- ✅ **Dashboard** real-time untuk monitoring
- ✅ **Notifikasi** Telegram terintegrasi

### 👥 Users

| Role | Total | Access Level |
|------|-------|--------------|
| **Admin** | 2 | Full system control |
| **Guru** | 2 | Teaching & grading |
| **Siswa** | 29 | Learning & exams |

### 👨‍🏫 Guru Pengampu MPKK

1. **DIDIK KURNIAWAN, S.Kom, M.TI**
   - NIP: 198103102010011012
   - Jadwal: Rabu & Kamis

2. **ADE FIRMANSYAH, S.Kom**
   - NIP: 3855773674130022
   - Jadwal: Senin & Jumat

---

## ✨ Features

### 🔐 Authentication & Security

- [x] Role-based access control (Admin, Guru, Siswa)
- [x] JWT authentication with secure tokens
- [x] bcrypt password hashing (10 rounds)
- [x] Strong password policy enforcement
- [x] Password reset with admin approval
- [x] Session management

### 📸 Face Recognition Attendance

- [x] One-time face registration
- [x] Real-time face detection using face-api.js
- [x] Auto-attendance marking
- [x] Timestamp-based validation
- [x] Schedule-aware attendance (jam masuk/pulang)
- [x] Camera permission handling
- [x] Fallback to manual attendance

### 📊 Grading System

- [x] Multiple grade categories (UH, UTS, UAS, Tugas, Praktik)
- [x] Teacher-specific grade management
- [x] Student grade viewing
- [x] Grade statistics & analytics
- [x] Export to CSV/Excel
- [x] Real-time updates

### 📝 Online Exam Platform

- [x] Multiple-choice question support
- [x] Essay questions (planned)
- [x] Timer-based exams
- [x] Auto-grading for MCQ
- [x] Manual grading for essays
- [x] Exam history & results
- [x] Student submissions tracking

### ⚙️ Admin Panel

- [x] System settings management
- [x] School schedule configuration
- [x] Attendance hours setting
- [x] Password reset approval
- [x] User management
- [x] System monitoring
- [x] Reports & analytics

### 🔔 Notifications

- [x] Real-time Socket.IO updates
- [x] Telegram bot integration
- [x] In-app toast notifications
- [x] Browser push notifications
- [x] Email alerts (planned)

---

## 🛠 Tech Stack

### Frontend

- **Framework:** React 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS (responsive)
- **Face Recognition:** face-api.js
- **Real-time:** Socket.IO Client
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Language:** JavaScript/TypeScript (migration in progress)

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JWT + bcrypt
- **Real-time:** Socket.IO
- **Database Client:** Supabase JS
- **Notifications:** Telegram Bot API

### Database & Cloud

- **Database:** PostgreSQL (Supabase)
- **Storage:** Supabase Storage
- **Realtime:** Supabase Realtime
- **Row Level Security:** Enabled
- **Deployment:** Vercel (Serverless)

### DevOps

- **Version Control:** Git/GitHub
- **CI/CD:** Vercel Auto-deploy
- **Monitoring:** Vercel Analytics
- **Error Tracking:** Built-in logging

---

## 🚀 Installation

### Prerequisites

- Node.js v16+ 
- npm or yarn
- Git
- Supabase account (for production)
- Vercel account (for deployment)

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/jonalexanderhere/SistemSekolahJurusanTjkt2.git
cd SistemSekolahJurusanTjkt2

# 2. Install dependencies
npm install
cd client && npm install && cd ..

# 3. Download face-api.js models
cd client && npm run fetch-models && cd ..

# 4. Create .env file (see Configuration section)
cp .env.example .env

# 5. Start development server
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### Quick Test

```bash
# Run with localStorage (no Supabase needed)
npm run dev

# Login as:
# Admin: admin1 / Admin#SMKN1Liwa2024!
# Guru: guru1 / guru123
# Siswa: 0089990908 / 6643
```

---

## ⚙️ Configuration

### Environment Variables

Create `.env` in root directory:

```env
# Server
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_min_32_chars

# Supabase (Backend)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

Create `client/.env.local`:

```env
# Supabase (Frontend)
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key

# API
REACT_APP_API_URL=http://localhost:5000
```

### Database Setup

```bash
# 1. Create Supabase project
# https://supabase.com/dashboard

# 2. Run schema setup
# Copy contents of supabase_schema.sql
# Paste in Supabase SQL Editor → Run

# 3. Generate password hashes
node scripts/generate-password-hashes.js

# 4. Run generated SQL to insert users
# Copy supabase_update_passwords.sql
# Run in Supabase SQL Editor
```

---

## 🌐 Deployment

### Deploy to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Import to Vercel
# https://vercel.com/new

# 3. Configure build
# Build Command: cd client && npm install && npm run build && cd .. && npm install
# Output Directory: client/build

# 4. Add environment variables
# See .env.example for required variables

# 5. Deploy!
```

### Production Checklist

- [ ] Supabase database setup complete
- [ ] All environment variables configured
- [ ] Password hashes generated & inserted
- [ ] Face recognition models uploaded
- [ ] Telegram bot configured
- [ ] Admin passwords changed from defaults
- [ ] CORS configured for production URL
- [ ] SSL certificate active (auto with Vercel)
- [ ] Database backups enabled
- [ ] Monitoring tools active

**📖 Detailed Guide:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📚 Usage

### For Students (Siswa)

```bash
# 1. Login with NISN and ID
NISN: Your NISN number
Password: Your Student ID

# 2. Register face (one-time)
Dashboard → Registrasi Wajah → Allow camera → Complete

# 3. Daily attendance
Dashboard → Absensi Saya → Mulai Absensi
# Jam Masuk: 06:30-07:30
# Jam Pulang: 14:30-15:30

# 4. Check grades
Dashboard → Nilai Saya

# 5. Take exams
Dashboard → Ujian → Select exam → Start
```

**📖 Full Guide:** [UNTUK_SISWA.md](./UNTUK_SISWA.md)

### For Teachers (Guru)

```bash
# 1. Login
Username: guru1 or guru2
Password: guru123 (change after first login!)

# 2. Monitor attendance
Dashboard → Absensi

# 3. Input grades
Dashboard → Nilai → + Tambah Nilai

# 4. Create exam
Dashboard → Ujian → + Buat Ujian Baru

# 5. View reports
Dashboard → Download reports
```

**📖 Full Guide:** [UNTUK_GURU.md](./UNTUK_GURU.md)

### For Administrators

```bash
# 1. Login with strong password
Username: admin1 or admin2
Password: (Strong password provided)

# 2. Configure school hours
Dashboard → Pengaturan → Edit attendance times

# 3. Approve password resets
Dashboard → Password Reset Requests

# 4. Monitor system
Dashboard → View statistics & logs

# 5. Manage users
Dashboard → Data Siswa / Guru
```

**📖 Full Guide:** [UNTUK_ADMIN.md](./UNTUK_ADMIN.md)

---

## 📖 Dokumentasi

| Document | Description |
|----------|-------------|
| [UNTUK_SISWA.md](./UNTUK_SISWA.md) | Panduan lengkap untuk siswa |
| [UNTUK_GURU.md](./UNTUK_GURU.md) | Panduan lengkap untuk guru |
| [UNTUK_ADMIN.md](./UNTUK_ADMIN.md) | Panduan lengkap untuk admin |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Deployment ke Vercel + Supabase |
| [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) | Development lokal tanpa Supabase |
| [AKUN_LOGIN.md](./AKUN_LOGIN.md) | Daftar lengkap akun & password |
| [FITUR_LENGKAP.md](./FITUR_LENGKAP.md) | Dokumentasi fitur lengkap |

---

## 🔧 Development

### Project Structure

```
├── client/                 # React frontend
│   ├── public/
│   │   └── models/        # face-api.js models
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── lib/          # Utilities
│   │   └── types/        # TypeScript types
│   └── package.json
├── server/                # Express backend
│   ├── data/             # User data (dev)
│   ├── routes/           # API routes
│   └── server.js
├── scripts/              # Utility scripts
├── api/                  # Vercel serverless functions
└── package.json
```

### Available Scripts

```bash
# Development
npm run dev          # Run both frontend & backend
npm run server       # Run backend only
npm run client       # Run frontend only

# Production
npm start            # Start production server

# Utilities
npm run fetch-models # Download face-api models
npm run hash-passwords # Generate password hashes
```

### Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5000/3000
taskkill /F /IM node.exe  # Windows
killall node              # Mac/Linux
```

**Face recognition not working:**
- Ensure models are downloaded: `cd client && npm run fetch-models`
- Check camera permissions in browser
- Use HTTPS in production (required for camera)

**Database connection error:**
- Verify Supabase URL and keys in `.env`
- Check Supabase project status
- Ensure RLS policies are correct

**Attendance time validation fails:**
- Check system time is correct
- Verify attendance hours in settings
- Check timezone configuration

**For more issues:** See [QUICK_START.md](./QUICK_START.md)

---

## 📊 System Stats

| Metric | Value |
|--------|-------|
| Total Users | 33 (2 admin, 2 guru, 29 siswa) |
| Average Build Time | 2-3 minutes |
| Bundle Size (gzipped) | ~150KB |
| Database Tables | 9 tables |
| API Endpoints | 25+ endpoints |
| Supported Browsers | Chrome, Firefox, Edge, Safari |
| Mobile Responsive | ✅ Yes |
| PWA Ready | ✅ Yes |

---

## 📱 Screenshots

<div align="center">

### Login Page
![Login](./docs/screenshots/login.png)

### Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

### Face Registration
![Face Registration](./docs/screenshots/face-registration.png)

### Attendance
![Attendance](./docs/screenshots/attendance.png)

</div>

---

## 🔐 Security

- ✅ All passwords hashed with bcrypt (cost: 10)
- ✅ JWT tokens with expiration (24h)
- ✅ HTTPS enforced in production
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Row Level Security (RLS) enabled
- ✅ Environment variables secured
- ✅ No sensitive data in git

**Security Audit:** Run `npm audit` regularly

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👏 Acknowledgments

- **SMK Negeri 1 Liwa** - School support
- **face-api.js** - Face recognition library
- **Supabase** - Backend as a Service
- **Vercel** - Deployment platform
- **React Team** - Frontend framework

---

## 📞 Support

### Contact

- **Email:** admin@smkn1liwa.sch.id
- **GitHub Issues:** [Report Bug](https://github.com/jonalexanderhere/SistemSekolahJurusanTjkt2/issues)
- **Documentation:** See `/docs` folder

### Resources

- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [React Docs](https://react.dev)
- [face-api.js Docs](https://github.com/justadudewhohacks/face-api.js)

---

<div align="center">

**Made with ❤️ for SMK Negeri 1 Liwa - TJKT XII-2**

[![GitHub](https://img.shields.io/badge/GitHub-jonalexanderhere-black?style=flat-square&logo=github)](https://github.com/jonalexanderhere)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

**⭐ Star this repo if you find it useful!**

</div>
