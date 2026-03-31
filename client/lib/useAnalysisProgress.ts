import { useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './useAuth';

export interface AnalysisAnswer {
  questionId: string;
  isCorrect: boolean;
}

export interface AnalysisProgressState {
  levelId: string;
  answers: AnalysisAnswer[];
  totalQuestions: number;
  isLevelAlreadyCompleted: boolean;
}

export const useAnalysisProgress = () => {
  const { isGuest } = useAuth();
  const [analysisState, setAnalysisState] = useState<AnalysisProgressState | null>(null);

  // Initialize analysis for a specific chapter
  const startAnalysis = useCallback((chapterId: string, totalQuestions: number) => {
    // Use "analysis-{chapterId}" as the level ID to distinguish from regular quiz levels
    const levelId = `analysis-${chapterId}`;

    // Check if level is already completed
    const checkLevelCompletion = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { data, error } = await supabase
          .from('completed_levels')
          .select('id')
          .eq('user_id', user.id)
          .eq('level_id', levelId)
          .maybeSingle();

        return !error && !!data;
      } catch {
        return false;
      }
    };

    checkLevelCompletion().then(isCompleted => {
      setAnalysisState({
        levelId,
        answers: [],
        totalQuestions,
        isLevelAlreadyCompleted: isCompleted,
      });
    });
  }, []);

  // Record an analysis answer (no XP given here)
  const recordAnalysisAnswer = useCallback(
    async (questionId: string, isCorrect: boolean): Promise<boolean> => {
      if (!analysisState) return false;

      try {
        // Just record the answer locally, no Supabase updates
        setAnalysisState(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            answers: [
              ...prev.answers,
              {
                questionId,
                isCorrect,
              },
            ],
          };
        });

        return true;
      } catch (error) {
        console.error('Error recording analysis answer:', error);
        return false;
      }
    },
    [analysisState]
  );

  // Complete analysis and award XP based on completion percentage
  // This is called with the final answers array to accurately count correct answers
  const completeAnalysisWithBonus = useCallback(
    async (finalAnswers: Array<{
      questionId: string;
      selectedOptionId: string;
      isCorrect: boolean;
    }>): Promise<{ success: boolean; xpReward: number }> => {
      if (!analysisState) return { success: false, xpReward: 0 };

      // Guests don't earn XP
      if (isGuest) {
        return { success: false, xpReward: 0 };
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user authenticated');

        // If level already completed, no XP
        if (analysisState.isLevelAlreadyCompleted) {
          return { success: false, xpReward: 0 };
        }

        // Calculate completion percentage from final answers
        const correctAnswers = finalAnswers.filter(a => a.isCorrect).length;
        const correctPercentage = (correctAnswers / finalAnswers.length) * 100;
        const isLevelComplete = correctPercentage >= 60; // 60% or higher to complete analysis

        if (!isLevelComplete) {
          // Analysis not completed - don't save, no XP
          return { success: false, xpReward: 0 };
        }

        // Check if this level was already completed
        const { data: existingCompletion, error: checkError } = await supabase
          .from('completed_levels')
          .select('id')
          .eq('user_id', user.id)
          .eq('level_id', analysisState.levelId)
          .maybeSingle();

        if (checkError && checkError.code !== 'PGRST116') {
          throw new Error('Failed to check level completion');
        }

        // If already completed, don't give XP again
        if (existingCompletion) {
          return { success: false, xpReward: 0 };
        }

        // Calculate XP reward based on completion percentage (higher for analysis)
        let xpReward = 0;
        const roundedPercentage = Math.round(correctPercentage);
        if (roundedPercentage === 100) {
          xpReward = 200; // +200 XP for perfect (100%) analysis completion
        } else if (correctPercentage >= 80) {
          xpReward = 150; // +150 XP for >= 80% analysis completion
        } else if (correctPercentage >= 60) {
          xpReward = 100; // +100 XP for >= 60% analysis completion
        } else {
          xpReward = 0; // No XP if below 60%
        }

        // Record level completion
        const { error: insertError } = await supabase
          .from('completed_levels')
          .insert([
            {
              user_id: user.id,
              level_id: analysisState.levelId,
              correct_percentage: correctPercentage,
            },
          ]);

        if (insertError) {
          throw new Error('Failed to save level completion');
        }

        // Update XP in profiles (single update)
        if (xpReward > 0) {
          // Get current XP first
          const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('xp')
            .eq('user_id', user.id)
            .single();

          if (fetchError || !profile) {
            throw new Error('Failed to fetch current XP');
          }

          const newXP = profile.xp + xpReward;

          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              xp: newXP,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id);

          if (updateError) {
            throw new Error('Failed to update XP');
          }
        }

        return { success: true, xpReward };
      } catch (error) {
        console.error('Error completing analysis:', error);
        return { success: false, xpReward: 0 };
      }
    },
    [analysisState, isGuest]
  );

  // Get analysis completion stats (for UI only, no XP shown during analysis)
  const getLevelStats = useCallback(() => {
    if (!analysisState) return null;

    const correctAnswers = analysisState.answers.filter(a => a.isCorrect).length;
    const correctPercentage = (correctAnswers / analysisState.totalQuestions) * 100;

    return {
      correctAnswers,
      totalQuestions: analysisState.totalQuestions,
      correctPercentage,
      isComplete: correctPercentage >= 60, // 60% threshold for analysis
      isLevelAlreadyCompleted: analysisState.isLevelAlreadyCompleted,
    };
  }, [analysisState]);

  return {
    analysisState,
    startAnalysis,
    recordAnalysisAnswer,
    completeAnalysisWithBonus,
    getLevelStats,
  };
};
