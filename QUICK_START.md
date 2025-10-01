# 🚀 Quick Start - Sistem TJKT MPKK

## ⚡ Jalankan Aplikasi (3 Langkah)

### 1️⃣ Pastikan di Direktori yang Benar
```bash
cd C:\Users\User\Downloads\SistemKelasTjkt
```

### 2️⃣ Jalankan Development Server
```bash
npm run dev
```

**Output yang benar:**
```
[0] Server running on port 5000
[0] API available at http://localhost:5000
[0] Frontend should be at http://localhost:3000
[1] webpack compiled successfully
```

### 3️⃣ Buka Browser
```
http://localhost:3000
```

---

## 🔍 Troubleshooting

### ❌ Error: "Could not read package.json"
**Penyebab:** Anda berada di direktori yang salah

**Solusi:**
```bash
cd C:\Users\User\Downloads\SistemKelasTjkt
npm run dev
```

### ❌ localhost:5000 menampilkan "Cannot GET /"
**Status:** ✅ SUDAH DIPERBAIKI!

Sekarang localhost:5000 akan menampilkan:
```json
{
  "message": "API Server Sistem Informasi TJKT MPKK",
  "status": "running",
  "endpoints": {
    "auth": "/api/auth",
    "attendance": "/api/attendance",
    "grades": "/api/grades",
    "exams": "/api/exams",
    "face": "/api/face"
  }
}
```

### ❌ Port 3000 atau 5000 sudah dipakai
**Solusi Windows:**
```bash
# Cari process yang menggunakan port
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill process (ganti <PID> dengan nomor process)
taskkill /PID <PID> /F
```

### ❌ React App tidak compile
**Solusi:**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
cd ..
npm run dev
```

---

## 🔑 Login Credentials

### Admin
```
Username: admin1
Password: admin123
```

### Guru
```
Username: guru1    (DIDIK KURNIAWAN)
Password: guru123

Username: guru2    (ADE FIRMANSYAH)
Password: guru123
```

### Siswa (Contoh)
```
Username: 0089990908  (NISN ALLDOO SAPUTRA)
Password: 6643        (ID Siswa)
```

**Semua akun siswa:**
- Username = NISN
- Password = ID Siswa
- Lihat lengkap di `AKUN_LOGIN.md`

---

## 📱 Endpoint API Testing

### Health Check
```bash
curl http://localhost:5000/health
```

### Login Test
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin1","password":"admin123"}'
```

### Get Students
```bash
curl http://localhost:5000/api/auth/students
```

---

## 🎯 Fitur yang Bisa Dicoba

### 1. **Registrasi Wajah (Siswa)**
1. Login sebagai siswa
2. Menu: **Registrasi Wajah**
3. Klik: **Aktifkan Kamera**
4. Klik: **Daftarkan Wajah**
5. ✅ Selesai!

### 2. **Absensi Face Recognition (Siswa)**
1. Setelah registrasi wajah
2. Menu: **Absensi Saya**
3. Klik: **Mulai Absensi**
4. Sistem otomatis deteksi wajah
5. ✅ Absen sukses!

### 3. **Input Nilai (Guru)**
1. Login sebagai guru
2. Menu: **Nilai**
3. Klik: **Tambah Nilai**
4. Pilih siswa, masukkan nilai
5. ✅ Nilai tersimpan!

### 4. **Buat Ujian (Guru)**
1. Login sebagai guru
2. Menu: **Ujian**
3. Klik: **Buat Ujian**
4. Isi soal pilihan ganda
5. ✅ Ujian siap!

### 5. **Kerjakan Ujian (Siswa)**
1. Login sebagai siswa
2. Menu: **Ujian**
3. Pilih ujian tersedia
4. Klik: **Mulai Ujian**
5. ✅ Jawab & submit!

### 6. **Kirim Notifikasi Telegram (Guru/Admin)**
1. Login sebagai guru/admin
2. Menu: **Notifikasi**
3. Tulis pesan
4. Klik: **Kirim Notifikasi**
5. ✅ Terkirim ke Telegram!

---

## 📊 Check Server Status

### Backend (Express)
```
http://localhost:5000
```
Harus menampilkan JSON dengan daftar endpoints

### Frontend (React)
```
http://localhost:3000
```
Harus menampilkan halaman login

### Health Check
```
http://localhost:5000/health
```
Response: `{"status":"OK","timestamp":"..."}`

---

## 🔧 Commands Berguna

### Stop Server
```bash
# Tekan Ctrl+C di terminal
# Atau kill process manual (lihat troubleshooting)
```

### Restart Server
```bash
# Stop (Ctrl+C)
npm run dev
```

### View Logs
```bash
# Logs otomatis muncul di terminal
# Backend: [0]
# Frontend: [1]
```

### Clean Install
```bash
# Hapus semua node_modules
rm -rf node_modules client/node_modules
rm package-lock.json client/package-lock.json

# Install ulang
npm install
cd client && npm install && cd ..

# Jalankan
npm run dev
```

---

## 📂 Struktur Project

```
SistemKelasTjkt/
├── server/               # Backend Express
│   ├── server.js        # Main server
│   ├── routes/          # API routes
│   └── data/            # User data
├── client/              # Frontend React
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Pages
│   │   └── lib/         # Utilities
│   └── public/
│       └── models/      # Face-api.js models
├── api/                 # Vercel serverless
├── package.json         # Root dependencies
└── README.md            # Full documentation
```

---

## 🌐 Deploy ke Production

### Vercel
```bash
# Push ke GitHub (sudah dilakukan)
# Import di Vercel Dashboard
# Set environment variables
# Deploy!
```

Lihat `README.md` untuk panduan deploy lengkap.

---

## 📞 Bantuan

- **README.md** - Panduan lengkap
- **ADMIN.md** - Panduan admin
- **GURU.md** - Panduan guru
- **SISWA.md** - Panduan siswa
- **SETUP_COMPLETE.md** - Setup summary
- **GitHub Issues** - Bug reports

---

## ✅ Checklist Sebelum Mulai

- [ ] Sudah `cd` ke direktori `SistemKelasTjkt`
- [ ] Sudah `npm install` di root
- [ ] Sudah `cd client && npm install`
- [ ] Port 3000 & 5000 tidak dipakai
- [ ] Browser sudah siap
- [ ] Camera permission ready (untuk face recognition)

---

**Happy Coding! 🚀**

Jika masih ada error, screenshot error dan check di:
- Terminal output
- Browser console (F12)
- `README.md` troubleshooting section

