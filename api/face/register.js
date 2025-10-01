const { supabase } = require('../_supabaseClient');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { studentId, nisn, nama, descriptors } = req.body || {};

    if (!studentId || !descriptors) {
      return res.status(400).json({ message: 'studentId and descriptors are required' });
    }

    const record = {
      student_id: studentId,
      nisn: nisn || null,
      nama: nama || null,
      descriptors,
      registered_at: new Date().toISOString()
    };

    if (supabase) {
      // Upsert by student_id
      await supabase.from('face_descriptors').upsert(record, { onConflict: 'student_id' });
    }

    return res.status(200).json({ message: 'Wajah berhasil didaftarkan', face: { studentId, nama, nisn } });
  } catch (error) {
    console.error('[face/register] Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


