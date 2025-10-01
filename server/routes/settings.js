const express = require('express');
const router = express.Router();

// In-memory storage for settings (localStorage fallback in production will use Supabase)
let schoolSettings = {
  school_schedule: {
    name: "SMK Negeri 1 Liwa - TJKT XII-2",
    timezone: "Asia/Jakarta",
    attendance_hours: {
      masuk: {
        start: "06:30",
        end: "07:30",
        label: "Jam Masuk"
      },
      pulang: {
        start: "14:30",
        end: "15:30",
        label: "Jam Pulang"
      }
    },
    school_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    holidays: []
  },
  class_schedule: {
    "XII TJKT 2": {
      "Monday": [
        { time: "10:45-12:00", subject: "MPKK", teacher: "ADE FIRMANSYAH, S.Kom" },
        { time: "13:00-14:30", subject: "MPKK", teacher: "ADE FIRMANSYAH, S.Kom" },
        { time: "14:30-15:45", subject: "MPKK", teacher: "ADE FIRMANSYAH, S.Kom" }
      ],
      "Tuesday": [],
      "Wednesday": [
        { time: "10:45-12:00", subject: "MPKK", teacher: "DIDIK KURNIAWAN, S.Kom, M.TI" },
        { time: "13:00-14:30", subject: "MPKK", teacher: "DIDIK KURNIAWAN, S.Kom, M.TI" },
        { time: "14:30-15:45", subject: "MPKK", teacher: "DIDIK KURNIAWAN, S.Kom, M.TI" }
      ],
      "Thursday": [
        { time: "07:30-09:00", subject: "MPKK", teacher: "DIDIK KURNIAWAN, S.Kom, M.TI" },
        { time: "09:00-10:30", subject: "MPKK", teacher: "DIDIK KURNIAWAN, S.Kom, M.TI" },
        { time: "10:30-12:15", subject: "MPKK", teacher: "DIDIK KURNIAWAN, S.Kom, M.TI" }
      ],
      "Friday": [
        { time: "09:00-10:30", subject: "MPKK", teacher: "ADE FIRMANSYAH, S.Kom" },
        { time: "10:30-12:15", subject: "MPKK", teacher: "ADE FIRMANSYAH, S.Kom" }
      ],
      "Saturday": []
    }
  }
};

// Get all settings
router.get('/all', (req, res) => {
  res.json(schoolSettings);
});

// Get specific setting
router.get('/:key', (req, res) => {
  const { key } = req.params;
  
  if (schoolSettings[key]) {
    res.json({ 
      key, 
      value: schoolSettings[key],
      success: true 
    });
  } else {
    res.status(404).json({ message: 'Setting tidak ditemukan' });
  }
});

// Update setting (admin only)
router.put('/:key', (req, res) => {
  const { key } = req.params;
  const { value, updatedBy } = req.body;

  if (!value) {
    return res.status(400).json({ message: 'Value tidak boleh kosong' });
  }

  schoolSettings[key] = value;
  
  res.json({ 
    message: 'Setting berhasil diupdate',
    key,
    value: schoolSettings[key],
    updatedBy,
    success: true 
  });
});

// Check current attendance time
router.get('/check/attendance-time', (req, res) => {
  const schedule = schoolSettings.school_schedule;
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });

  const masukStart = schedule.attendance_hours.masuk.start;
  const masukEnd = schedule.attendance_hours.masuk.end;
  const pulangStart = schedule.attendance_hours.pulang.start;
  const pulangEnd = schedule.attendance_hours.pulang.end;

  let canCheckin = false;
  let currentPeriod = 'none';
  let message = 'Diluar jam absensi';

  // Check if current day is a school day
  if (!schedule.school_days.includes(currentDay)) {
    return res.json({
      canCheckin: false,
      currentPeriod: 'none',
      message: 'Hari ini bukan hari sekolah',
      currentTime,
      currentDay
    });
  }

  // Check if current time is within attendance hours
  if (currentTime >= masukStart && currentTime <= masukEnd) {
    canCheckin = true;
    currentPeriod = 'masuk';
    message = 'Waktu absensi masuk';
  } else if (currentTime >= pulangStart && currentTime <= pulangEnd) {
    canCheckin = true;
    currentPeriod = 'pulang';
    message = 'Waktu absensi pulang';
  }

  res.json({
    canCheckin,
    currentPeriod,
    message,
    currentTime,
    currentDay,
    schedule: {
      masuk: `${masukStart} - ${masukEnd}`,
      pulang: `${pulangStart} - ${pulangEnd}`
    }
  });
});

// Get today's class schedule
router.get('/schedule/today', (req, res) => {
  const { kelas } = req.query;
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });

  const classSchedule = schoolSettings.class_schedule;
  
  if (!kelas || !classSchedule[kelas]) {
    return res.status(400).json({ message: 'Kelas tidak valid' });
  }

  const todaySchedule = classSchedule[kelas][currentDay] || [];

  res.json({
    kelas,
    day: currentDay,
    schedule: todaySchedule,
    success: true
  });
});

module.exports = router;

