import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase credentials not configured');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Get all ranks in progression order
 */
export async function getAllRanks() {
  try {
    const { data, error } = await supabase.rpc('get_all_ranks');
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all ranks:', error);
    throw error;
  }
}

/**
 * Get user's current rank based on XP
 */
export async function getUserCurrentRank(userXp: number) {
  try {
    const { data, error } = await supabase.rpc('get_user_rank', {
      user_xp: userXp
    });
    
    if (error) throw error;
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching user rank:', error);
    throw error;
  }
}

/**
 * Get next rank for user
 */
export async function getUserNextRank(userXp: number) {
  try {
    const { data, error } = await supabase.rpc('get_next_rank', {
      user_xp: userXp
    });
    
    if (error) throw error;
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching next rank:', error);
    throw error;
  }
}

/**
 * Get complete rank progression for user
 */
export async function getUserRankProgression(userXp: number) {
  try {
    const [currentRank, nextRank, allRanks] = await Promise.all([
      getUserCurrentRank(userXp),
      getUserNextRank(userXp),
      getAllRanks()
    ]);

    return {
      currentRank,
      nextRank,
      allRanks,
      progress: nextRank 
        ? Math.min((userXp / nextRank.xp_required) * 100, 100)
        : 100
    };
  } catch (error) {
    console.error('Error fetching rank progression:', error);
    throw error;
  }
}

export interface RankData {
  rank_title: string;
  emoji: string;
  description: string;
  xp_required: number;
}

export interface RankProgressionData {
  currentRank: RankData | null;
  nextRank: (RankData & { xp_until_next: number }) | null;
  allRanks: RankData[];
  progress: number;
}
