# 🚀 Deployment Guide - SMK Negeri 1 Liwa TJKT 2

## 📋 Overview

This guide will help you deploy the **Sistem Informasi Sekolah SMK Negeri 1 Liwa - TJKT 2** to production using:
- **Vercel** for frontend and serverless API
- **Supabase** for PostgreSQL database
- **GitHub** for version control

---

## ✅ Prerequisites

Before starting, make sure you have:
- [x] GitHub account
- [x] Vercel account (free tier is fine)
- [x] Supabase account (free tier is fine)
- [x] Project pushed to GitHub

---

## 🗄️ Step 1: Setup Supabase Database

### 1.1 Create New Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in details:
   - **Name:** `smkn1-liwa-tjkt2`
   - **Database Password:** (save this securely!)
   - **Region:** Choose closest to Indonesia (Singapore recommended)
4. Click **"Create new project"** (wait 2-3 minutes)

### 1.2 Run SQL Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Copy the entire contents of `supabase_schema.sql` from your project
4. Paste into the SQL editor
5. Click **"Run"** button

**What this does:**
- Creates all tables (attendance, face_descriptors, profiles, grades, exams, school_settings)
- Sets up indexes for performance
- Enables Row Level Security (RLS) policies
- Inserts default school schedule settings
- Creates helper functions

### 1.3 Get API Keys

1. Go to **Settings** → **API**
2. Copy these values (you'll need them later):
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbGci...
   service_role key: eyJhbGci... (keep this SECRET!)
   ```

### 1.4 Enable Realtime (Optional)

1. Go to **Database** → **Replication**
2. Enable replication for:
   - `attendance` table
   - `school_settings` table
3. Save changes

---

## 🌐 Step 2: Deploy to Vercel

### 2.1 Connect Repository

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Select the repo: `SistemSekolahJurusanTjkt2`

### 2.2 Configure Build Settings

**Framework Preset:** Other

**Root Directory:** `./` (leave default)

**Build Command:**
```bash
cd client && npm install && npm run build && cd .. && npm install
```

**Output Directory:** `client/build`

**Install Command:**
```bash
npm install
```

### 2.3 Environment Variables

Add these environment variables in Vercel:

#### Backend Variables (for API routes)
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
TELEGRAM_BOT_TOKEN=7960819436:AAEi0F_YzgFGOeKCkdPibGAAHIIpFLp4ljE
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

#### Frontend Variables (for client)
```env
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
REACT_APP_API_URL=https://your-project.vercel.app
```

**How to add:**
1. In Vercel project settings → **Environment Variables**
2. Add each variable with key and value
3. Select environment: **Production, Preview, and Development**

### 2.4 Deploy!

1. Click **"Deploy"**
2. Wait 3-5 minutes for build to complete
3. Your app will be live at: `https://your-project.vercel.app`

---

## 🔧 Step 3: Post-Deployment Configuration

### 3.1 Update Frontend API URL

If using Socket.IO or real-time features, update:

**File:** `client/src/components/pages/AttendancePage.js`

```javascript
// Change from localhost to your Vercel URL
const socket = io('https://your-project.vercel.app');
```

### 3.2 CORS Configuration

**File:** `server/server.js`

```javascript
const io = socketIo(server, {
  cors: {
    origin: "https://your-project.vercel.app", // Update this
    methods: ["GET", "POST"]
  }
});
```

**And:**

```javascript
app.use(cors({
  origin: ['https://your-project.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### 3.3 Commit and Redeploy

```bash
git add .
git commit -m "Update: Production URLs for Vercel deployment"
git push origin main
```

Vercel will auto-deploy when you push to main branch.

---

## 🧪 Step 4: Testing

### 4.1 Test Database Connection

1. Open your deployed app
2. Try to login with admin account
3. Check browser console for errors
4. Go to **Supabase Dashboard** → **Table Editor**
5. Verify data is being saved

### 4.2 Test Face Recognition

1. Login as a student
2. Go to **Face Registration**
3. Register face
4. Check **Supabase** → `face_descriptors` table
5. Try attendance via face recognition
6. Verify in `attendance` table

### 4.3 Test Settings

1. Login as admin
2. Go to **Settings**
3. Change attendance hours
4. Save
5. Check `school_settings` table in Supabase

---

## 📱 Step 5: Telegram Notifications Setup

### 5.1 Create Telegram Bot

1. Open Telegram
2. Search for **@BotFather**
3. Send `/newbot`
4. Follow instructions
5. Copy the bot token

### 5.2 Get Chat ID

1. Add your bot to a group/channel
2. Send a test message
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Find `"chat":{"id":-xxxxxxxxx}`
5. Copy the chat ID

### 5.3 Update Environment Variables

In **Vercel** → **Settings** → **Environment Variables**:

```env
TELEGRAM_BOT_TOKEN=your_actual_bot_token
TELEGRAM_CHAT_ID=your_actual_chat_id
```

Redeploy for changes to take effect.

---

## 🔐 Step 6: Security Checklist

### Database Security

- [x] RLS policies enabled
- [x] Service role key kept secret (not in frontend code)
- [x] Only anon key used in client
- [x] HTTPS enforced

### API Security

- [x] JWT secret is strong (32+ characters)
- [x] Password hashing with bcrypt
- [x] CORS configured properly
- [x] Rate limiting (optional, but recommended)

### Vercel Security

- [x] Environment variables in Vercel dashboard (not in code)
- [x] `.env` files in `.gitignore`
- [x] Only necessary secrets exposed

---

## 📊 Step 7: Monitoring & Maintenance

### Vercel Analytics

1. Go to Vercel project → **Analytics**
2. View:
   - Page views
   - API calls
   - Performance metrics
   - Error logs

### Supabase Monitoring

1. Go to Supabase project → **Database**
2. Monitor:
   - Storage usage
   - Active connections
   - Query performance
   - Table sizes

### Logs

**Vercel Logs:**
- Go to **Deployments** → Click a deployment → **Logs**

**Supabase Logs:**
- Go to **Logs** → Select log type (Postgres, API, etc.)

---

## 🛠️ Troubleshooting

### Issue: "Failed to fetch"

**Solution:**
1. Check CORS configuration
2. Verify Supabase URL in environment variables
3. Check browser console for specific error

### Issue: Face recognition not working

**Solution:**
1. Verify models are in `client/public/models/`
2. Check browser console for model loading errors
3. Ensure HTTPS (required for camera access)

### Issue: Database connection error

**Solution:**
1. Verify Supabase URL and keys
2. Check if Supabase project is paused (free tier)
3. Verify SQL schema was executed

### Issue: Attendance not saving

**Solution:**
1. Check `attendance` table in Supabase
2. Verify RLS policies allow insert
3. Check browser console and Vercel logs

### Issue: Real-time updates not working

**Solution:**
1. Verify Replication is enabled in Supabase
2. Check Socket.IO connection in browser console
3. Verify CORS allows WebSocket connections

---

## 🔄 Update Workflow

### For Code Changes

```bash
# 1. Make changes locally
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Description of changes"
git push origin main

# 4. Vercel auto-deploys
# 5. Monitor deployment in Vercel dashboard
```

### For Database Schema Changes

```bash
# 1. Update supabase_schema.sql
# 2. Test locally with Supabase local dev (optional)
# 3. Go to Supabase SQL Editor
# 4. Run new schema changes
# 5. Verify tables/functions created
```

---

## 📦 Backup Strategy

### Database Backups

1. Go to Supabase → **Settings** → **Backups**
2. Daily backups are automatic (free tier: 7 days retention)
3. For manual backup:
   - Go to **Table Editor**
   - Export data as CSV
   - Store securely

### Code Backups

- Already handled by GitHub
- Vercel keeps deployment history
- For extra safety: Download repo as ZIP monthly

---

## 🎯 Performance Optimization

### Frontend

1. **Lazy Loading**
   ```javascript
   const FaceRegistration = React.lazy(() => import('./pages/FaceRegistration'));
   ```

2. **Image Optimization**
   - Use WebP format
   - Compress images
   - Lazy load images

3. **Code Splitting**
   - Already handled by Create React App

### Backend

1. **Database Indexes**
   - Already created in schema
   - Monitor slow queries in Supabase

2. **Caching**
   - Use Vercel Edge Caching for static assets
   - Cache frequently accessed data

3. **Face Recognition Models**
   - Already optimized (only loading necessary models)
   - Served from `/public/models/`

---

## 📈 Scaling Considerations

### Free Tier Limits

**Vercel:**
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless function executions: 100 GB-hours

**Supabase:**
- 500 MB database
- 1 GB bandwidth/month
- 2 GB file storage

### When to Upgrade

Upgrade when you hit:
- **Students:** 100+ active users
- **Storage:** 400 MB+ database size
- **Bandwidth:** 800 MB+/month

---

## 🌟 Production Checklist

Before going live:

### Technical
- [ ] All environment variables set in Vercel
- [ ] Supabase schema executed successfully
- [ ] Face recognition models uploaded to `/public/models/`
- [ ] CORS configured for production URL
- [ ] Admin passwords changed from defaults
- [ ] JWT secret is strong and unique
- [ ] Telegram notifications tested
- [ ] All pages load without errors
- [ ] Database backups enabled

### Content
- [ ] School name and branding correct
- [ ] Class schedule uploaded
- [ ] Attendance hours configured
- [ ] Teacher data verified
- [ ] Student data imported

### Testing
- [ ] Login works for all roles (admin, guru, siswa)
- [ ] Face registration successful
- [ ] Face recognition attendance works
- [ ] Grades can be added/edited
- [ ] Exams can be created
- [ ] Settings can be updated (admin only)
- [ ] Password change works
- [ ] Mobile responsive

---

## 🎓 Training Materials

### For Administrators

1. **Login:**
   - URL: `https://your-project.vercel.app`
   - Use strong password provided

2. **Configure School Hours:**
   - Dashboard → Settings
   - Update attendance hours as needed

3. **Monitor Attendance:**
   - Dashboard → Attendance
   - View real-time updates

### For Teachers

1. **Add Grades:**
   - Dashboard → Nilai
   - Click "+" button

2. **Create Exams:**
   - Dashboard → Ujian
   - Add questions and answers

### For Students

1. **Register Face:**
   - Dashboard → Registrasi Wajah
   - One-time setup

2. **Daily Attendance:**
   - Dashboard → Absensi Saya
   - Use face recognition

---

## 📞 Support

### Resources

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **face-api.js Docs:** https://github.com/justadudewhohacks/face-api.js

### Common Commands

```bash
# View Vercel logs
vercel logs <deployment-url>

# Redeploy
vercel --prod

# Pull environment variables
vercel env pull
```

---

## ✅ Deployment Complete!

Your **Sistem Informasi Sekolah SMK Negeri 1 Liwa - TJKT 2** is now live and ready to use!

**Next Steps:**
1. Share the URL with teachers and students
2. Train staff on how to use the system
3. Monitor for the first week
4. Collect feedback
5. Iterate and improve

---

**Deployed by:** [Your Name]
**Date:** October 1, 2025
**Version:** 1.0.0

**Good luck! 🎉**

