# 👨‍💼 PANDUAN LOGIN ADMIN
## Sistem Informasi Sekolah SMK Negeri 1 Liwa - TJKT XII-2

---

## 🌐 LINK WEBSITE

**Production:** https://your-project.vercel.app  
**Local Dev:** http://localhost:3000

---

## 🔑 DATA LOGIN ADMINISTRATOR

### 👤 Administrator 1
```
Username: admin1
Password: Admin#SMKN1Liwa2024!
Nama: Administrator 1 - SMK Negeri 1 Liwa
Email: admin1@smkn1liwa.sch.id
Role: Super Admin
```

### 👤 Administrator 2
```
Username: admin2
Password: Liwa@TJKT#2024Secure!
Nama: Administrator 2 - SMK Negeri 1 Liwa
Email: admin2@smkn1liwa.sch.id
Role: Super Admin
```

> ⚠️ **SANGAT PENTING:**  
> Password admin sudah di-encrypt dengan bcrypt.  
> JANGAN SHARE password ke siapapun!  
> Simpan di tempat yang aman!

---

## 🎯 HAK AKSES ADMINISTRATOR

Administrator memiliki **FULL ACCESS** ke semua fitur:
- ✅ Monitor semua aktivitas sistem
- ✅ Kelola data siswa & guru
- ✅ Setting jam pembelajaran & absensi
- ✅ Approve/reject password reset requests
- ✅ Input & edit nilai
- ✅ Buat & kelola ujian
- ✅ Download semua laporan
- ✅ Manage system settings

---

## 📚 FITUR ADMINISTRATOR

### 1. 📊 **Dashboard Overview**
**Akses:** Menu → Dashboard

**Info Yang Ditampilkan:**
- Total siswa: 29 siswa
- Jumlah hadir hari ini
- Jumlah tidak hadir
- Persentase kehadiran
- Grafik kehadiran bulanan
- Aktivitas terkini

### 2. ✅ **Monitoring Absensi**
**Akses:** Menu → Absensi

**Fitur:**
- View real-time attendance
- Filter by date/class/student
- See attendance method (Face/Manual)
- Download reports (CSV/Excel/PDF)
- Attendance analytics
- Late arrival tracking

**Actions:**
- Manual attendance input (jika diperlukan)
- Edit attendance records
- Delete invalid records
- Export bulk data

### 3. 👥 **Manajemen Data Siswa**
**Akses:** Menu → Data Siswa

**Total Siswa:** 29 orang kelas XII TJKT 2

**Fitur:**
- View all student data
- Search & filter siswa
- Edit student information
- Export student list
- Track student performance

**Data Fields:**
- NISN
- ID Siswa
- Nama Lengkap
- Kelas
- Status (aktif/nonaktif)

### 4. 📝 **Manajemen Nilai**
**Akses:** Menu → Nilai

**Fitur Admin:**
- View semua nilai dari semua guru
- Input nilai (jika diperlukan)
- Edit nilai existing
- Delete nilai (dengan konfirmasi)
- Filter by:
  - Siswa
  - Guru
  - Mata Pelajaran (MPKK)
  - Kategori (UH/UTS/UAS/Tugas/Praktik)
- Export nilai ke Excel/PDF
- Generate rapor

### 5. 📋 **Manajemen Ujian**
**Akses:** Menu → Ujian

**Fitur:**
- View semua ujian dari guru
- Create ujian (jika diperlukan)
- Edit ujian
- Delete ujian
- View submission results
- Export ujian results
- Analytics per ujian

### 6. ⚙️ **Pengaturan Sekolah** (IMPORTANT!)
**Akses:** Menu → Pengaturan

**A. Jam Absensi**

Set jam absensi untuk seluruh sekolah:

**Absensi Masuk:**
- Default: 06:30 - 07:30 WIB
- Dapat diubah sesuai kebijakan sekolah

**Absensi Pulang:**
- Default: 14:30 - 15:30 WIB
- Dapat diubah sesuai kebijakan sekolah

**Cara Mengubah:**
1. Buka menu **Pengaturan**
2. Edit jam mulai & selesai
3. Klik **"Simpan Perubahan"**
4. Perubahan berlaku immediate

**B. Jadwal Pelajaran**

Jadwal MPKK - XII TJKT 2:

**DIDIK KURNIAWAN, S.Kom, M.TI**
- Hari: Rabu & Kamis
- Jam: 07:30-14:30 (Full Day)

**ADE FIRMANSYAH, S.Kom**
- Hari: Senin, Selasa, Jumat, Sabtu
- Jam: Sesuai jadwal per hari

**Cara Edit Jadwal:**
1. Menu Pengaturan → Jadwal Pelajaran
2. Pilih hari yang ingin diubah
3. Tambah/edit/hapus slot waktu
4. Assign guru ke setiap slot
5. Simpan perubahan

**C. Hari Libur**

Set tanggal libur:
- Libur nasional
- Libur sekolah
- Hari tidak ada absensi

### 7. 🔐 **Approve Password Reset**
**Akses:** Menu → Password Reset Requests

**Workflow:**
1. User request reset password
2. Admin menerima notification
3. Admin review request:
   - User ID
   - Nama
   - Role (admin/guru/siswa)
   - Alasan reset
   - Timestamp request
4. Admin action:
   - **Approve:** Generate temporary password
   - **Reject:** Send notification dengan alasan
5. User notified via system/email

**Best Practice:**
- Verify identity sebelum approve
- Check alasan reset masuk akal
- Generate strong temporary password
- Instruksikan user ubah password segera

### 8. 📊 **Reporting & Analytics**
**Akses:** Dashboard → Reports

**Available Reports:**
- Daily Attendance Report
- Monthly Attendance Summary
- Student Performance Report
- Exam Results Analysis
- Teacher Performance Stats
- System Usage Statistics

**Export Formats:**
- PDF (for printing)
- Excel/CSV (for data analysis)
- JSON (for integration)

### 9. 🔐 **Ubah Password Admin**
**Akses:** Menu → Ubah Password

**WAJIB Ubah Password Setelah Login Pertama!**

**Syarat Password Admin (STRICT):**
- Minimal 8 karakter
- Huruf BESAR (A-Z)
- Huruf kecil (a-z)
- Angka (0-9)
- Simbol (@#$!%*?&)

**Contoh Password Kuat:**
```
Admin#2024Liwa!
SuperSecure@TJKT25
Liwa$Admin2024!
```

---

## 🔒 KEAMANAN SISTEM

### Password Policy
✅ Minimum 8 characters
✅ Must include uppercase, lowercase, number, symbol
✅ Cannot reuse last 3 passwords
✅ Expire every 90 days (optional)
✅ Account locked after 5 failed attempts

### Data Security
✅ All passwords encrypted with bcrypt (10 rounds)
✅ JWT tokens for authentication (24h expiry)
✅ HTTPS only in production
✅ SQL injection protection
✅ XSS protection
✅ CSRF protection

### Access Control
✅ Role-based access (Admin/Guru/Siswa)
✅ Permission-based actions
✅ Activity logging
✅ IP restriction (optional)

### Backup Strategy
✅ Daily automatic backup (Supabase)
✅ 7-day retention (free tier)
✅ Manual backup available
✅ Export to CSV anytime

---

## 📋 CHECKLIST ADMIN HARIAN

**Pagi (07:00-08:00):**
- [ ] Check sistem status
- [ ] Review absensi hari ini
- [ ] Check pending password reset requests
- [ ] Monitor error logs

**Siang (12:00-13:00):**
- [ ] Verify attendance data
- [ ] Response to support tickets
- [ ] Check sistem performance

**Sore (15:00-16:00):**
- [ ] Generate daily report
- [ ] Backup important data
- [ ] Plan tomorrow's tasks
- [ ] Logout semua sesi

---

## 🔧 TROUBLESHOOTING ADMIN

### Problem: Sistem lambat
**Solusi:**
1. Check server status (Vercel)
2. Check database (Supabase)
3. Clear cache
4. Restart services jika perlu
5. Check Vercel analytics

### Problem: User tidak bisa login
**Solusi:**
1. Verify credentials di database
2. Check if account locked
3. Reset password via admin panel
4. Check RLS policies (Supabase)

### Problem: Absensi tidak tercatat
**Solusi:**
1. Check waktu sistem
2. Verify jam absensi settings
3. Check camera permissions (client)
4. Review error logs
5. Manual input jika diperlukan

### Problem: Database error
**Solusi:**
1. Check Supabase status
2. Verify connection string
3. Check RLS policies
4. Review SQL logs
5. Contact Supabase support

### Problem: Face recognition tidak akurat
**Solusi:**
1. Check model loading
2. Verify face descriptors di database
3. Re-register face jika perlu
4. Check lighting conditions
5. Update model (jika tersedia)

---

## 🚀 DEPLOYMENT & MAINTENANCE

### Production Deployment
**Platform:** Vercel
**Database:** Supabase
**Domain:** your-project.vercel.app

**Deployment Steps:**
1. Push to GitHub main branch
2. Vercel auto-deploy triggered
3. Build & test (2-5 minutes)
4. Deploy to production
5. Verify deployment

### Environment Variables
**Vercel Dashboard → Settings → Environment Variables**

Required:
```env
SUPABASE_URL=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
JWT_SECRET=xxx
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHAT_ID=xxx
REACT_APP_SUPABASE_URL=xxx
REACT_APP_SUPABASE_ANON_KEY=xxx
```

### Database Management
**Supabase Dashboard:**
- Table Editor: View/edit data
- SQL Editor: Run queries
- API Logs: Monitor requests
- Database: Check performance

### Monitoring
**Vercel Analytics:**
- Page views
- Performance metrics
- Error tracking
- API usage

**Supabase Metrics:**
- Database size
- API requests
- Active connections
- Storage usage

---

## 📞 SUPPORT & ESCALATION

### Level 1: User Support
**Handle by:** Admin
**Response time:** 2 jam
**Issues:** Login, password, basic usage

### Level 2: Technical Issues
**Handle by:** IT Support/Developer
**Response time:** 24 jam
**Issues:** Bugs, performance, features

### Level 3: Critical Issues
**Handle by:** Developer + Vendor
**Response time:** Immediate
**Issues:** System down, data loss, security breach

### Contact:
**Developer:** (Contact info)
**Vercel Support:** vercel.com/support
**Supabase Support:** supabase.com/support

---

## 📊 SYSTEM STATISTICS

**Total Users:** 31
- Admins: 2
- Guru: 2
- Siswa: 29 (Kelas XII TJKT 2)

**Total Data:**
- Students: 29 records
- Teachers: 2 records
- Attendance: Growing daily
- Grades: Updated by teachers
- Exams: Created by teachers
- Face Descriptors: 29 (one per student)

**System Capacity (Free Tier):**
- Vercel: 100GB bandwidth/month
- Supabase: 500MB database
- Expected usage: ~30% capacity

---

## 🎓 BEST PRACTICES

### Data Management
✅ Regular backups (weekly minimum)
✅ Verify data integrity monthly
✅ Clean up old data quarterly
✅ Archive semester data

### User Management
✅ Audit user accounts monthly
✅ Remove inactive accounts
✅ Enforce strong passwords
✅ Monitor login activities

### Performance
✅ Monitor response times
✅ Optimize slow queries
✅ Cache frequently accessed data
✅ CDN for static assets

### Security
✅ Regular security audits
✅ Update dependencies monthly
✅ Review access logs weekly
✅ Backup encryption keys

---

## 🔐 EMERGENCY PROCEDURES

### System Down
1. Check Vercel status
2. Check Supabase status
3. Review error logs
4. Contact support
5. Notify users via alternative channel

### Data Breach
1. Immediately lock all accounts
2. Change all passwords
3. Review access logs
4. Identify breach source
5. Report to authorities
6. Notify affected users

### Password Compromise
1. Force password reset for affected users
2. Review login history
3. Check for unauthorized access
4. Update security measures
5. Document incident

---

## 📖 QUICK REFERENCE

### Admin Commands
```
Dashboard: Overview sistem
Absensi: Monitor kehadiran
Data Siswa: Manage students
Nilai: Manage grades
Ujian: Manage exams
Pengaturan: System settings
Password Reset: Approve requests
```

### Database Tables
```
attendance: Attendance records
face_descriptors: Face data
profiles: User profiles
grades: Student grades
exams: Exam questions
exam_submissions: Exam results
school_settings: System config
password_reset_requests: Reset queue
```

### API Endpoints
```
/api/auth: Authentication
/api/attendance: Attendance ops
/api/grades: Grade management
/api/exams: Exam management
/api/face: Face recognition
/api/settings: System settings
```

---

## 🎯 ADMIN RESPONSIBILITIES

### Daily:
- ✅ Monitor sistem health
- ✅ Check absensi accuracy
- ✅ Response user requests
- ✅ Review pending approvals

### Weekly:
- ✅ Generate weekly reports
- ✅ Backup database
- ✅ Audit user activities
- ✅ Update system docs

### Monthly:
- ✅ Performance review
- ✅ Security audit
- ✅ User survey
- ✅ System optimization

### Quarterly:
- ✅ Major updates
- ✅ Feature enhancement
- ✅ Data archival
- ✅ Training sessions

---

**SELAMAT MENGELOLA SISTEM! 🎯**

**Untuk:** Administrator SMK Negeri 1 Liwa  
**Sistem:** Informasi Sekolah TJKT XII-2  
**Versi:** 1.0.0  
**Update:** Oktober 2025  

---

> ⚠️ **PERHATIAN:**  
> Dokumen ini berisi informasi sensitif.  
> Simpan di tempat aman & jangan share sembarangan!

