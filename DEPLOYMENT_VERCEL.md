# 🚀 DEPLOYMENT GUIDE - Vercel + Supabase

> **Sistem Informasi Sekolah SMK Negeri 1 Liwa - TJKT XII-2**  
> Complete deployment guide untuk production

---

## 📋 PREREQUISITES

- ✅ GitHub repository: `https://github.com/jonalexanderhere/SistemSekolahJurusanTjkt2`
- ✅ Vercel account: `https://vercel.com`
- ✅ Supabase account: `https://supabase.com`
- ✅ Telegram Bot: `@BotFather`

---

## 🗄️ STEP 1: SETUP SUPABASE DATABASE

### 1.1 Create Supabase Project

```bash
# 1. Go to https://supabase.com/dashboard
# 2. Click "New Project"
# 3. Choose organization
# 4. Fill project details:
#    - Name: "SMK Negeri 1 Liwa - TJKT"
#    - Database Password: [Generate strong password]
#    - Region: Southeast Asia (Singapore)
# 5. Click "Create new project"
# 6. Wait for setup (2-3 minutes)
```

### 1.2 Run Database Schema

```bash
# 1. Go to Supabase Dashboard → SQL Editor
# 2. Copy entire content from: COMPLETE_DATABASE_SCHEMA.sql
# 3. Paste in SQL Editor
# 4. Click "Run" (takes 30-60 seconds)
# 5. Verify: Should see "DATABASE SCHEMA SETUP COMPLETE!" message
```

### 1.3 Generate Password Hashes

```bash
# In your local project directory:
node scripts/generate-password-hashes.js

# This creates: supabase_update_passwords.sql
# Copy the generated SQL and run in Supabase SQL Editor
```

### 1.4 Get Supabase Keys

```bash
# Go to: Project Settings → API
# Copy these values:
# - Project URL: https://xxxxx.supabase.co
# - anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# - service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🤖 STEP 2: SETUP TELEGRAM BOT

### 2.1 Create Bot

```bash
# 1. Open Telegram, search: @BotFather
# 2. Send: /newbot
# 3. Bot name: "SMK Negeri 1 Liwa - Notifications"
# 4. Username: "smk_liwa_notifications_bot" (must be unique)
# 5. Copy the Bot Token: 7960819436:AAEi0F_YzgFGOeKCkdPibGAAHIIpFLp4ljE
```

### 2.2 Get Chat ID

```bash
# 1. Add bot to your group/channel
# 2. Send any message to the bot
# 3. Visit: https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
# 4. Find "chat":{"id":-1001234567890} (negative number for groups)
# 5. Copy the Chat ID
```

---

## 🌐 STEP 3: DEPLOY TO VERCEL

### 3.1 Connect Repository

```bash
# 1. Go to https://vercel.com/dashboard
# 2. Click "New Project"
# 3. Import from GitHub: "SistemSekolahJurusanTjkt2"
# 4. Framework Preset: "Other"
# 5. Root Directory: "./" (root)
```

### 3.2 Configure Build Settings

```bash
# Build Command: cd client && npm install --legacy-peer-deps && npm run build
# Output Directory: client/build
# Install Command: npm install --legacy-peer-deps
```

### 3.3 Add Environment Variables

```bash
# Go to: Project Settings → Environment Variables
# Add these variables:

# SERVER CONFIG
NODE_ENV=production
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# SUPABASE (Backend)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# TELEGRAM
TELEGRAM_BOT_TOKEN=7960819436:AAEi0F_YzgFGOeKCkdPibGAAHIIpFLp4ljE
TELEGRAM_CHAT_ID=-1001234567890
TELEGRAM_ENABLED=true

# CLIENT (Frontend) - Add with REACT_APP_ prefix
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
REACT_APP_API_URL=https://your-vercel-app.vercel.app
```

### 3.4 Deploy

```bash
# 1. Click "Deploy"
# 2. Wait for build (3-5 minutes)
# 3. Check build logs for errors
# 4. If successful, you'll get: https://your-app.vercel.app
```

---

## ✅ STEP 4: VERIFICATION & TESTING

### 4.1 Test Database Connection

```bash
# 1. Visit your Vercel URL
# 2. Try to login with test credentials
# 3. Check browser console for errors
# 4. Check Vercel function logs
```

### 4.2 Test Telegram Notifications

```bash
# 1. Login as student
# 2. Try face attendance
# 3. Check if Telegram message received
# 4. If not, check bot token and chat ID
```

### 4.3 Test All Features

```bash
# Admin Features:
# - Login with admin credentials
# - Check settings page
# - View attendance reports

# Teacher Features:
# - Login with guru credentials
# - Input grades with custom categories
# - Create exams

# Student Features:
# - Login with student credentials
# - Register face
# - Take attendance
# - View grades
```

---

## 🔧 TROUBLESHOOTING

### Build Errors

```bash
# TypeScript conflicts:
# Solution: Already fixed with --legacy-peer-deps

# Missing dependencies:
# Solution: Check package.json dependencies

# Environment variables:
# Solution: Verify all env vars are set in Vercel
```

### Runtime Errors

```bash
# Database connection:
# - Check SUPABASE_URL and keys
# - Verify database schema is complete

# Telegram not working:
# - Check bot token format
# - Verify chat ID (negative number for groups)
# - Test bot manually first

# Face recognition:
# - Check if models are downloaded
# - Verify HTTPS (required for camera)
```

### Common Issues

```bash
# 1. "Cannot find module" errors:
# - Check if all dependencies are in package.json
# - Run npm install locally first

# 2. "Database connection failed":
# - Verify Supabase project is active
# - Check service role key permissions

# 3. "Telegram API error":
# - Bot token must start with numbers
# - Chat ID must be negative for groups
# - Bot must be added to group first
```

---

## 📊 POST-DEPLOYMENT CHECKLIST

- [ ] ✅ Database schema created
- [ ] ✅ Users data inserted
- [ ] ✅ Environment variables set
- [ ] ✅ Telegram bot configured
- [ ] ✅ Build successful
- [ ] ✅ Admin can login
- [ ] ✅ Guru can login
- [ ] ✅ Siswa can login
- [ ] ✅ Face recognition works
- [ ] ✅ Attendance recording works
- [ ] ✅ Telegram notifications work
- [ ] ✅ Grade input works
- [ ] ✅ Custom grade categories work
- [ ] ✅ Exam creation works
- [ ] ✅ All pages load correctly

---

## 🔐 SECURITY CHECKLIST

- [ ] ✅ Strong passwords for admin accounts
- [ ] ✅ JWT secret is random and long
- [ ] ✅ Supabase RLS policies enabled
- [ ] ✅ Service role key is secret
- [ ] ✅ Telegram bot token is secret
- [ ] ✅ No sensitive data in code
- [ ] ✅ HTTPS enforced
- [ ] ✅ CORS configured properly

---

## 📱 SHARING WITH USERS

### For Students:
```bash
# Share: UNTUK_SISWA.md
# Contains: Login instructions, features guide
```

### For Teachers:
```bash
# Share: UNTUK_GURU.md
# Contains: Login credentials, teaching schedule
```

### For Admin:
```bash
# Share: UNTUK_ADMIN.md
# Contains: Full system access, settings management
```

### Private Credentials:
```bash
# Share: CREDENTIALS.md (PRIVATE - NOT IN GITHUB)
# Contains: All login credentials
```

---

## 🎯 PRODUCTION URLS

After successful deployment:

```bash
# Main Application
https://your-app-name.vercel.app

# API Endpoints
https://your-app-name.vercel.app/api/auth/login
https://your-app-name.vercel.app/api/attendance/record
https://your-app-name.vercel.app/api/grades
# etc...

# Admin Panel
https://your-app-name.vercel.app/dashboard/settings
```

---

## 📞 SUPPORT

If deployment fails:

1. **Check Vercel Build Logs:**
   - Go to project → Functions → View logs

2. **Check Supabase Logs:**
   - Go to project → Logs → API

3. **Test Locally First:**
   ```bash
   npm run dev
   # Test all features locally
   ```

4. **Common Solutions:**
   - Clear Vercel cache and redeploy
   - Check environment variables
   - Verify database permissions
   - Test Telegram bot manually

---

## 🎉 SUCCESS!

If everything works:

1. ✅ **System is live and accessible**
2. ✅ **All users can login**
3. ✅ **Face recognition works**
4. ✅ **Telegram notifications work**
5. ✅ **Grade system with custom categories works**
6. ✅ **Real-time updates work**

**🎊 Congratulations! Your school information system is now live! 🎊**

---

**Repository:** https://github.com/jonalexanderhere/SistemSekolahJurusanTjkt2  
**Documentation:** See all `.md` files in repository  
**Support:** Check troubleshooting section above

