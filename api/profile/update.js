const { supabase } = require('../_supabaseClient');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { id, role, profile } = req.body || {};
    if (!id || !role || !profile) return res.status(400).json({ message: 'id, role, profile required' });

    // Upsert into generic profiles table
    if (supabase) {
      await supabase.from('profiles').upsert({
        user_id: id,
        role,
        ...profile
      }, { onConflict: 'user_id' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[profile/update] Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


