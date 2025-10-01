# 🏠 Local Development Guide

## ✅ Supabase Error - FIXED!

### Problem
```
ERROR: supabaseUrl is required.
```

### Solution
✅ **localStorage Fallback Implemented!**

Aplikasi sekarang bisa berjalan **100% di localhost** tanpa perlu konfigurasi Supabase.

---

## 🔧 How It Works

### Automatic Fallback

```javascript
// client/src/lib/supabase.js

// ✅ Supabase configured → Use Supabase
// ❌ Supabase not configured → Use localStorage

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const localStorageDB = {
  get(key)      // Get data from localStorage
  set(key, value) // Save data to localStorage
  add(key, item)  // Add new item
  update(key, id, updates) // Update item
  delete(key, id) // Delete item
}
```

---

## 📱 Data Storage

### Local Development (No Supabase)
Data disimpan di **browser localStorage**:
- `attendance` - Absensi records
- `face_descriptors` - Face recognition data
- `grades` - Nilai siswa
- `exams` - Data ujian
- `submissions` - Jawaban ujian

### Production (With Supabase)
Data disimpan di **Supabase PostgreSQL** dengan realtime sync.

---

## 🚀 Running Locally

### 1. Tanpa Supabase (Default)
```bash
# Just run - no config needed!
npm run dev
```

✅ App will use localStorage
✅ All features work
✅ Data persists in browser

### 2. Dengan Supabase (Optional)
Create `client/.env.local`:
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

Then:
```bash
npm run dev
```

✅ App will use Supabase
✅ Realtime sync enabled
✅ Data in cloud

---

## 🔍 Check Current Mode

Open browser console:
```javascript
// Check if Supabase is configured
import { isSupabaseConfigured } from './lib/supabase';
console.log(isSupabaseConfigured); // true or false
```

---

## 💾 localStorage API

### Get Data
```javascript
import { localStorageDB } from './lib/supabase';

// Get all attendance records
const records = localStorageDB.get('attendance');
```

### Add Data
```javascript
const newRecord = {
  student_id: '6643',
  nama: 'ALLDOO SAPUTRA',
  timestamp: new Date().toISOString()
};

localStorageDB.add('attendance', newRecord);
```

### Update Data
```javascript
localStorageDB.update('attendance', studentId, {
  status: 'completed'
});
```

### Delete Data
```javascript
localStorageDB.delete('attendance', recordId);
```

---

## 🎯 Features Working Locally

### ✅ Face Recognition
- Registrasi wajah → Saved to localStorage
- Absensi otomatis → Records in localStorage
- Face descriptors persist

### ✅ Attendance
- Real-time via Socket.IO (port 5000)
- localStorage backup
- Timestamp accurate

### ✅ Grades
- Input nilai → localStorage
- View nilai → From localStorage
- Statistics calculated

### ✅ Exams
- Create exam → localStorage
- Submit answers → localStorage
- Auto-grading works

### ✅ Profiles
- Update profile → localStorage
- Avatar URL saved
- Data persists

---

## 🔄 Migration Path

### From localStorage to Supabase

When ready for production:

1. **Setup Supabase**
   ```bash
   # Create account at supabase.com
   # Create new project
   # Run SQL schema (supabase_schema.sql)
   ```

2. **Add Environment Variables**
   ```env
   REACT_APP_SUPABASE_URL=https://xxx.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your_key
   ```

3. **Restart App**
   ```bash
   npm run dev
   ```

4. **Data Migration** (Optional)
   Export dari localStorage → Import ke Supabase

---

## 🐛 Troubleshooting

### Clear localStorage
```javascript
// In browser console
localStorage.clear();
location.reload();
```

### View localStorage Data
```javascript
// In browser console
console.log(localStorage.getItem('attendance'));
console.log(localStorage.getItem('face_descriptors'));
```

### Check Data Size
```javascript
// In browser console
let total = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    total += localStorage[key].length;
  }
}
console.log('Total size:', (total / 1024).toFixed(2), 'KB');
```

---

## ⚠️ Limitations

### localStorage (Development)
- ❌ No realtime sync across devices
- ❌ Data limited to ~5-10MB
- ❌ Data cleared if browser data cleared
- ❌ No backup
- ✅ Fast & simple
- ✅ No setup needed

### Supabase (Production)
- ✅ Realtime sync
- ✅ Unlimited storage
- ✅ Automatic backup
- ✅ Multi-device sync
- ❌ Requires setup
- ❌ Needs internet

---

## 📊 Data Persistence

### localStorage
```
Browser → localStorage → JSON strings
```

### Supabase
```
Browser → Supabase Client → PostgreSQL
           ↓
     Realtime updates via WebSocket
```

---

## 🎓 Best Practices

### Development
- ✅ Use localStorage (faster, simpler)
- ✅ Test features locally first
- ✅ No network dependency

### Staging
- ✅ Use Supabase (test realtime)
- ✅ Test multi-user scenarios
- ✅ Test backup/restore

### Production
- ✅ Use Supabase (required)
- ✅ Enable RLS policies
- ✅ Setup backups
- ✅ Monitor usage

---

## 🔥 Current Status

```
✅ localStorage fallback implemented
✅ Supabase error fixed
✅ All ESLint warnings fixed
✅ App runs 100% locally
✅ No external dependencies required
✅ TypeScript infrastructure ready
✅ Camera permission system ready
✅ All features functional
```

---

## 🚀 Quick Start

```bash
# 1. Navigate to project
cd C:\Users\User\Downloads\SistemKelasTjkt

# 2. Run dev server
npm run dev

# 3. Open browser
# http://localhost:3000

# 4. Login & test!
# No configuration needed! ✅
```

---

## 📞 Support

- **localStorage issues** → Clear browser data & reload
- **Supabase issues** → Check env variables
- **General issues** → See QUICK_START.md

---

**Development is now SUPER EASY! Just `npm run dev` and go! 🚀**

