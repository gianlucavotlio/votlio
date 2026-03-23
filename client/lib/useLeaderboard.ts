import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';

export interface LeaderboardEntry {
  rank: number;
  username: string;
  xp?: number;
  xp_week?: number;
  level: number;
  rank_title?: string;
}

export interface MyRank {
  rank: number;
  username: string;
  xp?: number;
  xp_week?: number;
  level: number;
  rank_title?: string;
}

export const useLeaderboard = () => {
  const [allTimeLeaderboard, setAllTimeLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [myRankAllTime, setMyRankAllTime] = useState<MyRank | null>(null);
  const [myRankWeekly, setMyRankWeekly] = useState<MyRank | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch all-time leaderboard
  const fetchAllTimeLeaderboard = useCallback(async (limit: number = 50) => {
    try {
      const { data, error } = await supabase
        .from('leaderboard_all_time')
        .select('*')
        .limit(limit);

      if (error) {
        console.error('Error fetching all-time leaderboard:', error);
        setAllTimeLeaderboard([]);
      } else {
        setAllTimeLeaderboard(data || []);
      }
    } catch (err) {
      console.error('Error fetching all-time leaderboard:', err);
      setAllTimeLeaderboard([]);
    }
  }, []);

  // Fetch weekly leaderboard
  const fetchWeeklyLeaderboard = useCallback(async (limit: number = 50) => {
    try {
      const { data, error } = await supabase
        .from('leaderboard_weekly')
        .select('*')
        .limit(limit);

      if (error) {
        console.error('Error fetching weekly leaderboard:', error);
        setWeeklyLeaderboard([]);
      } else {
        setWeeklyLeaderboard(data || []);
      }
    } catch (err) {
      console.error('Error fetching weekly leaderboard:', err);
      setWeeklyLeaderboard([]);
    }
  }, []);

  // Fetch my rank all-time
  const fetchMyRankAllTime = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMyRankAllTime(null);
        return;
      }

      const { data, error } = await supabase
        .rpc('get_my_rank_all_time');

      if (error) {
        console.error('Error fetching my all-time rank:', error);
        setMyRankAllTime(null);
      } else if (data && data.length > 0) {
        setMyRankAllTime(data[0]);
      } else {
        setMyRankAllTime(null);
      }
    } catch (err) {
      console.error('Error fetching my all-time rank:', err);
      setMyRankAllTime(null);
    }
  }, []);

  // Fetch my rank weekly
  const fetchMyRankWeekly = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMyRankWeekly(null);
        return;
      }

      const { data, error } = await supabase
        .rpc('get_my_rank_weekly');

      if (error) {
        console.error('Error fetching my weekly rank:', error);
        setMyRankWeekly(null);
      } else if (data && data.length > 0) {
        setMyRankWeekly(data[0]);
      } else {
        setMyRankWeekly(null);
      }
    } catch (err) {
      console.error('Error fetching my weekly rank:', err);
      setMyRankWeekly(null);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        const isAuth = !!user;
        setIsAuthenticated(isAuth);

        const limit = isAuth ? 50 : 10;

        await Promise.all([
          fetchAllTimeLeaderboard(limit),
          fetchWeeklyLeaderboard(limit),
          ...(isAuth ? [fetchMyRankAllTime(), fetchMyRankWeekly()] : []),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchAllTimeLeaderboard, fetchWeeklyLeaderboard, fetchMyRankAllTime, fetchMyRankWeekly]);

  return {
    allTimeLeaderboard,
    weeklyLeaderboard,
    myRankAllTime,
    myRankWeekly,
    loading,
    isAuthenticated,
    refetch: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const isAuth = !!user;
      const limit = isAuth ? 50 : 10;
      await Promise.all([
        fetchAllTimeLeaderboard(limit),
        fetchWeeklyLeaderboard(limit),
        ...(isAuth ? [fetchMyRankAllTime(), fetchMyRankWeekly()] : []),
      ]);
    },
  };
};
