import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';

export interface CompletedLevel {
  id: string;
  level_id: string;
  correct_percentage: number;
  completed_at: string;
  bonus_awarded: boolean;
}

export const useCompletedLevels = () => {
  const [completedLevels, setCompletedLevels] = useState<CompletedLevel[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch completed levels on mount
  useEffect(() => {
    const fetchCompletedLevels = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setCompletedLevels([]);
          return;
        }

        const { data, error } = await supabase
          .from('completed_levels')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false });

        if (error) {
          console.error('Error fetching completed levels:', error);
          setCompletedLevels([]);
        } else {
          setCompletedLevels(data || []);
        }
      } catch (error) {
        console.error('Error fetching completed levels:', error);
        setCompletedLevels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedLevels();

    // Subscribe to changes
    const subscription = supabase
      .channel('completed_levels')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'completed_levels',
        },
        () => {
          // Refetch when changes occur
          fetchCompletedLevels();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check if a specific level is completed
  const isLevelCompleted = useCallback((levelId: string): boolean => {
    return completedLevels.some(level => level.level_id === levelId);
  }, [completedLevels]);

  // Get level completion details
  const getLevelCompletion = useCallback((levelId: string): CompletedLevel | undefined => {
    return completedLevels.find(level => level.level_id === levelId);
  }, [completedLevels]);

  // Check if level completed with 100%
  const isPerfectCompletion = useCallback((levelId: string): boolean => {
    const completion = completedLevels.find(level => level.level_id === levelId);
    return completion ? completion.correct_percentage === 100 : false;
  }, [completedLevels]);

  return {
    completedLevels,
    loading,
    isLevelCompleted,
    getLevelCompletion,
    isPerfectCompletion,
  };
};
