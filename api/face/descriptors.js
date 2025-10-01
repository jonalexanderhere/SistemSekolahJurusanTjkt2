const { supabase } = require('../_supabaseClient');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    if (!supabase) {
      return res.status(200).json([]);
    }

    const { data, error } = await supabase
      .from('face_descriptors')
      .select('student_id, nisn, nama, descriptors');

    if (error) {
      console.error('[face/descriptors] Supabase error', error);
      return res.status(500).json({ message: 'Database Error' });
    }

    const result = (data || []).map((row) => ({
      studentId: row.student_id,
      nisn: row.nisn,
      nama: row.nama,
      descriptors: row.descriptors
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error('[face/descriptors] Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


