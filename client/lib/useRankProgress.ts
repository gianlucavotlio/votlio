import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from './supabaseClient';

export interface RankProgressData {
  xp: number;
  rank_name: string;
  next_rank: string | null;
  next_rank_min_xp: number;
}

export const useRankProgress = () => {
  const { user, isGuest } = useAuth();
  const [rankData, setRankData] = useState<RankProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRankProgress = useCallback(async () => {
    if (!user || isGuest) {
      setRankData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase.rpc(
        'get_rank_progress_from_profiles',
        { p_user_id: user.id }
      );

      if (rpcError) {
        console.error('RPC Error fetching rank progress:', rpcError);
        setError('Failed to fetch rank data');
        setRankData(null);
      } else if (data && data.length > 0) {
        console.log('Rank progress data:', data[0]); // Debug log
        setRankData(data[0]);
      } else {
        console.warn('No rank data returned from RPC');
        setRankData(null);
      }
    } catch (err) {
      console.error('Error fetching rank progress:', err);
      setError('An error occurred while fetching rank data');
      setRankData(null);
    } finally {
      setLoading(false);
    }
  }, [user, isGuest]);

  // Fetch rank progress when user changes
  useEffect(() => {
    fetchRankProgress();
  }, [user, isGuest, fetchRankProgress]);

  return {
    rankData,
    loading,
    error,
    refetch: fetchRankProgress,
  };
};
