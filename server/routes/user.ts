import { RequestHandler } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables on server');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handleAddXP: RequestHandler = async (req, res) => {
  try {
    const { xpAmount } = req.body;

    if (typeof xpAmount !== 'number' || xpAmount < 0) {
      return res.status(400).json({ error: 'Invalid xpAmount' });
    }

    // Get the user from the auth header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization' });
    }

    const token = authHeader.slice(7);

    // Verify the token using Supabase client
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get current profile
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (fetchError || !profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Calculate new XP and level
    const newXP = profile.xp + xpAmount;
    const newLevel = Math.floor(newXP / 100);

    // Update profile
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({
        xp: newXP,
        level: newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error('Error adding XP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
