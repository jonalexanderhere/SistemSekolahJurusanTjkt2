const { supabase } = require('../_supabaseClient');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { studentId } = req.query || {};
    if (!studentId) return res.status(400).json({ message: 'studentId is required' });

    if (!supabase) return res.status(200).json({ faceRegistered: false });

    const { data } = await supabase
      .from('face_descriptors')
      .select('student_id')
      .eq('student_id', studentId)
      .maybeSingle();

    return res.status(200).json({ faceRegistered: !!data });
  } catch (error) {
    console.error('[face/status] Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


