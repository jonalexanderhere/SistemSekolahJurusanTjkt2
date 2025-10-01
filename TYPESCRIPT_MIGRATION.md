# 📘 TypeScript Migration Guide

## ✅ Progress TypeScript Migration

### 🔧 **Setup Complete**
- ✅ `tsconfig.json` - Strict TypeScript configuration
- ✅ `client/src/types/index.ts` - Type definitions
- ✅ `client/src/utils/permissions.ts` - Camera & notification permissions (TypeScript)
- ✅ TypeScript dependencies installed

### 📝 **Type Definitions Ready**

#### User Types
```typescript
interface User {
  id: string;
  username: string;
  nama: string;
  role: 'admin' | 'guru' | 'siswa';
  email?: string;
  nisn?: string;
  nip?: string;
  kelas?: string;
  mataPelajaran?: string[];
}
```

#### Attendance, Grade, Exam Types
Semua types sudah defined di `client/src/types/index.ts`

---

## 🎯 **Camera Permission Features**

### ✅ **Fitur Baru:**

1. **Auto Request Permission**
   ```typescript
   import { requestCameraPermission } from './utils/permissions';
   
   const stream = await requestCameraPermission();
   ```

2. **Check Permission Status**
   ```typescript
   import { checkCameraPermission } from './utils/permissions';
   
   const status = await checkCameraPermission();
   if (status.granted) {
     // Camera ready
   }
   ```

3. **Error Handling yang Jelas**
   - ❌ Permission denied → "Izin kamera ditolak..."
   - ❌ Camera not found → "Kamera tidak ditemukan..."
   - ❌ Camera busy → "Kamera sedang digunakan..."

4. **Notification Permission**
   ```typescript
   import { requestNotificationPermission } from './utils/permissions';
   
   await requestNotificationPermission();
   ```

---

## 📂 **Files to Migrate**

### Priority 1 (Core)
- [ ] `src/index.js` → `src/index.tsx`
- [ ] `src/App.js` → `src/App.tsx`
- [ ] `src/components/Login.js` → `src/components/Login.tsx`
- [ ] `src/components/Dashboard.js` → `src/components/Dashboard.tsx`

### Priority 2 (Pages)
- [ ] `src/components/pages/FaceRegistration.js` → `.tsx` (dengan permissions.ts)
- [ ] `src/components/pages/AttendancePage.js` → `.tsx`
- [ ] `src/components/pages/GradesPage.js` → `.tsx`
- [ ] `src/components/pages/ExamsPage.js` → `.tsx`
- [ ] `src/components/pages/ProfilePage.js` → `.tsx`

### Priority 3 (Dashboards)
- [ ] `src/components/dashboards/AdminDashboard.js` → `.tsx`
- [ ] `src/components/dashboards/TeacherDashboard.js` → `.tsx`
- [ ] `src/components/dashboards/StudentDashboard.js` → `.tsx`

---

## 🔄 **Migration Pattern**

### Before (JavaScript)
```javascript
// Login.js
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  // ...
}
```

### After (TypeScript)
```typescript
// Login.tsx
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User, token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  // ...
}
```

---

## 🚀 **How to Use Permissions**

### In FaceRegistration Component

```typescript
import { requestCameraPermission, stopMediaStream } from '../../utils/permissions';
import { useState, useRef } from 'react';

const FaceRegistration: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await requestCameraPermission();
      if (videoRef.current && mediaStream) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const stopCamera = () => {
    stopMediaStream(stream);
    setStream(null);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={startCamera}>Aktifkan Kamera</button>
    </div>
  );
};
```

---

## ⚙️ **Tailwind CSS Setup**

Tailwind sudah configured di `tailwind.config.js`. Untuk menggunakan:

```tsx
// Instead of CSS classes
<div className="bg-purple-500 text-white p-4 rounded-lg">
  Content
</div>
```

---

## 🔍 **Type Checking**

Run type checker:
```bash
cd client
npx tsc --noEmit
```

---

## 📌 **Notes**

1. **allowJs: true** - JavaScript files masih bisa berjalan selama migrasi
2. **strict: true** - Strict type checking enabled
3. **Camera Permission** - Otomatis request saat component mount
4. **Error Handling** - User-friendly error messages dalam Bahasa Indonesia

---

## 🎯 **Current Status**

✅ **TypeScript Infrastructure Ready**
✅ **Type Definitions Complete**
✅ **Permissions Utility Ready**
✅ **Tailwind CSS Configured**
⏳ **Component Migration** - Can be done gradually

**Project masih berjalan dengan JavaScript** karena `allowJs: true`. Migration bisa dilakukan bertahap tanpa breaking existing functionality.

---

## 🚀 **Next Steps**

### Option 1: Gradual Migration (Recommended)
- Keep existing .js files working
- Convert new features to .tsx
- Migrate component by component

### Option 2: Full Migration
- Rename all .js to .tsx
- Add type annotations
- Fix type errors
- More work upfront, but fully typed codebase

---

**Choose Option 1 untuk development yang stabil dan continuous.**
**Choose Option 2 jika ingin full TypeScript experience.**

Saat ini aplikasi **100% functional** dengan TypeScript infrastructure ready!

