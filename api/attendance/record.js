const fetch = require('node-fetch');
const { supabase } = require('../_supabaseClient');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { studentId, nisn, nama, kelas, type = 'masuk', method = 'face' } = req.body || {};

    if (!studentId) {
      return res.status(400).json({ message: 'studentId is required' });
    }

    const now = new Date();
    const payload = {
      student_id: studentId,
      nisn: nisn || null,
      nama: nama || null,
      kelas: kelas || null,
      type,
      method,
      timestamp_iso: now.toISOString(),
      date_id: now.toLocaleDateString('id-ID'),
      time_id: now.toLocaleTimeString('id-ID'),
      status: 'hadir'
    };

    // Store to Supabase if configured
    if (supabase) {
      await supabase.from('attendance').insert(payload);
    }

    // Telegram notification
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const text = `✅ Absensi Berhasil\nNama: ${payload.nama || '-'}\nKelas: ${payload.kelas || '-'}\nWaktu: ${payload.date_id} ${payload.time_id}\nMetode: ${method === 'face' ? 'Face Recognition' : 'Manual'}\nStatus: Hadir`;
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text })
      });
    }

    return res.status(200).json({ message: 'Absensi berhasil dicatat', attendance: payload });
  } catch (error) {
    console.error('[attendance/record] Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


