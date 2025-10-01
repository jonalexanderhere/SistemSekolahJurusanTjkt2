# 📘 Panduan Instalasi Lengkap - Sistem Informasi TJKT MPKK

## 📋 Daftar Isi
1. [Persiapan](#persiapan)
2. [Instalasi Step-by-Step](#instalasi-step-by-step)
3. [Download Face Recognition Models](#download-face-recognition-models)
4. [Menjalankan Aplikasi](#menjalankan-aplikasi)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## Persiapan

### Software yang Dibutuhkan:

1. **Node.js** (v14.0 atau lebih baru)
   - Download: https://nodejs.org/
   - Pilih versi LTS (Long Term Support)
   - Install dengan semua opsi default

2. **Git** (optional, untuk download models)
   - Download: https://git-scm.com/
   - Hanya diperlukan jika ingin download models otomatis

3. **Browser Modern**
   - Google Chrome (Recommended)
   - Firefox
   - Edge

---

## Instalasi Step-by-Step

### Step 1: Persiapan Folder

Pastikan Anda sudah berada di folder `SistemKelasTjkt`:

```bash
cd C:\Users\User\Downloads\SistemKelasTjkt
```

### Step 2: Install Dependencies Backend

```bash
npm install
```

Tunggu hingga proses selesai. Dependencies yang akan terinstall:
- express
- cors
- bcryptjs
- jsonwebtoken
- multer
- dotenv
- socket.io
- nodemon
- concurrently

### Step 3: Install Dependencies Frontend

```bash
cd client
npm install
```

Dependencies yang akan terinstall:
- react
- react-dom
- react-router-dom
- axios
- face-api.js
- socket.io-client
- lucide-react
- recharts

Kembali ke root folder:
```bash
cd ..
```

---

## Download Face Recognition Models

### Metode 1: Download Manual

1. **Buat folder models**
   ```bash
   mkdir client\public\models
   ```

2. **Download files** dari GitHub:
   https://github.com/justadudewhohacks/face-api.js-models

3. **Copy semua file** dari folder berikut ke `client/public/models/`:
   - tiny_face_detector/
   - face_landmark_68/
   - face_recognition/
   - face_expression/

### Metode 2: Menggunakan Git (Recommended)

```bash
cd client\public
git clone https://github.com/justadudewhohacks/face-api.js-models models
cd ..\..
```

### Verifikasi Files Models

Pastikan struktur folder seperti ini:
```
client/public/models/
├── tiny_face_detector_model-weights_manifest.json
├── tiny_face_detector_model-shard1
├── face_landmark_68_model-weights_manifest.json
├── face_landmark_68_model-shard1
├── face_recognition_model-weights_manifest.json
├── face_recognition_model-shard1
├── face_recognition_model-shard2
├── face_expression_model-weights_manifest.json
└── face_expression_model-shard1
```

---

## Menjalankan Aplikasi

### Development Mode (Recommended untuk Testing)

**Opsi 1: Jalankan Semua Sekaligus**
```bash
npm run dev
```

**Opsi 2: Jalankan Terpisah**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

### Akses Aplikasi

Buka browser dan akses:
```
http://localhost:3000
```

Backend API berjalan di:
```
http://localhost:5000
```

---

## Testing

### Test 1: Login Admin

1. Buka http://localhost:3000
2. Login dengan:
   - Username: `admin1`
   - Password: `admin123`
3. Cek dashboard admin muncul

### Test 2: Login Guru

1. Logout dari admin
2. Login dengan:
   - Username: `guru1`
   - Password: `guru123`
3. Test buat nilai atau ujian

### Test 3: Login Siswa & Face Registration

1. Logout dari guru
2. Login dengan:
   - Username: `0089990908` (NISN)
   - Password: `6643` (ID)
3. Masuk ke menu "Registrasi Wajah"
4. Klik "Aktifkan Kamera"
5. Izinkan akses kamera
6. Posisikan wajah dan klik "Daftarkan Wajah"

### Test 4: Absensi Face Recognition

1. Masih sebagai siswa yang sudah registrasi wajah
2. Buka menu "Absensi Saya"
3. Klik "Mulai Absensi"
4. Sistem otomatis mendeteksi dan mencatat absensi

### Test 5: Sistem Ujian

Sebagai Guru:
1. Login sebagai guru1
2. Buka menu "Ujian"
3. Klik "Buat Ujian"
4. Isi detail dan tambah beberapa soal
5. Simpan ujian

Sebagai Siswa:
1. Login sebagai siswa
2. Buka menu "Ujian"
3. Klik "Mulai Ujian" pada ujian yang tersedia
4. Jawab soal dan submit

---

## Troubleshooting

### Problem: `npm install` gagal

**Solusi:**
```bash
# Clear npm cache
npm cache clean --force

# Install ulang
npm install
```

### Problem: Port sudah digunakan

**Windows:**
```bash
# Cek process yang menggunakan port
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Kill process (ganti <PID> dengan nomor process ID)
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Kill process
lsof -ti:5000 | xargs kill
lsof -ti:3000 | xargs kill
```

### Problem: Camera tidak bisa diakses

**Solusi:**
1. Pastikan browser memiliki permission untuk akses camera
2. Di Chrome: Settings > Privacy and Security > Site Settings > Camera
3. Pastikan menggunakan `localhost` atau `HTTPS`
4. Restart browser

### Problem: Face models tidak load

**Cek:**
1. Folder `client/public/models` ada dan berisi files
2. Buka browser console (F12) untuk lihat error
3. Verify path models di kode

**Re-download models:**
```bash
# Hapus folder lama
rmdir /s client\public\models

# Download ulang
cd client\public
git clone https://github.com/justadudewhohacks/face-api.js-models models
cd ..\..
```

### Problem: "Module not found" error

**Solusi:**
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules client/node_modules
npm run install-all
```

### Problem: Face recognition tidak akurat

**Tips:**
1. Pastikan pencahayaan cukup terang
2. Posisi wajah tepat di depan kamera
3. Jangan ada wajah lain di frame
4. Coba registrasi ulang di kondisi pencahayaan berbeda

### Problem: Real-time updates tidak berfungsi

**Cek:**
1. Socket.IO connection di browser console
2. Pastikan backend dan frontend running
3. Check firewall tidak block port 5000

**Restart aplikasi:**
```bash
# Stop semua (Ctrl+C di terminal)
# Jalankan ulang
npm run dev
```

---

## Tips Penggunaan

### Untuk Development:

1. **Hot Reload**: Frontend auto-reload saat ada perubahan
2. **Nodemon**: Backend auto-restart saat ada perubahan
3. **Browser Console**: Buka F12 untuk debug
4. **Network Tab**: Monitor API calls

### Untuk Production:

1. **Build Frontend:**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Run Production Server:**
   ```bash
   NODE_ENV=production node server/server.js
   ```

3. **Serve Static Files:**
   Backend akan serve built files dari `client/build`

---

## Next Steps

Setelah instalasi berhasil:

1. ✅ Test semua fitur
2. ✅ Customize sesuai kebutuhan
3. ✅ Tambah data siswa jika perlu
4. ✅ Setup database untuk production
5. ✅ Deploy ke server

---

## Kontak & Support

Jika masih ada kendala:
1. Cek README.md untuk informasi detail
2. Lihat error message di console
3. Search error di Google atau Stack Overflow

---

**Selamat Menggunakan! 🎉**

