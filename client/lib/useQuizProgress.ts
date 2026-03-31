import { useState, useCallback, useContext } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './useAuth';

export interface QuizAnswer {
  questionId: string;
  isCorrect: boolean;
}

export interface QuizProgressState {
  levelId: string;
  answers: QuizAnswer[];
  totalQuestions: number;
  isLevelAlreadyCompleted: boolean;
}

export const useQuizProgress = () => {
  const { isGuest } = useAuth();
  const [quizState, setQuizState] = useState<QuizProgressState | null>(null);

  // Initialize quiz for a specific level
  const startQuiz = useCallback((levelId: string, totalQuestions: number) => {
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
      setQuizState({
        levelId,
        answers: [],
        totalQuestions,
        isLevelAlreadyCompleted: isCompleted,
      });
    });
  }, []);

  // Record an answer (no XP given here)
  const recordAnswer = useCallback(
    async (questionId: string, isCorrect: boolean): Promise<boolean> => {
      if (!quizState) return false;

      try {
        // Just record the answer locally, no Supabase updates
        setQuizState(prev => {
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
        console.error('Error recording answer:', error);
        return false;
      }
    },
    [quizState]
  );

  // Complete level and award XP based on completion percentage
  const completeLevelWithBonus = useCallback(async (): Promise<{ success: boolean; xpReward: number }> => {
    if (!quizState) return { success: false, xpReward: 0 };

    // Guests don't earn XP
    if (isGuest) {
      return { success: false, xpReward: 0 };
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user authenticated');

      // If level already completed, no XP
      if (quizState.isLevelAlreadyCompleted) {
        return { success: false, xpReward: 0 };
      }

      // Calculate completion percentage
      const correctAnswers = quizState.answers.filter(a => a.isCorrect).length;
      const correctPercentage = (correctAnswers / quizState.totalQuestions) * 100;
      const isLevelComplete = correctPercentage >= 70; // 70% or higher to complete

      if (!isLevelComplete) {
        // Level not completed - don't save, no XP
        return { success: false, xpReward: 0 };
      }

      // Check if this level was already completed
      const { data: existingCompletion, error: checkError } = await supabase
        .from('completed_levels')
        .select('id')
        .eq('user_id', user.id)
        .eq('level_id', quizState.levelId)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        throw new Error('Failed to check level completion');
      }

      // If already completed, don't give XP again
      if (existingCompletion) {
        return { success: false, xpReward: 0 };
      }

      // Calculate XP reward based on completion percentage
      let xpReward = 0;
      const roundedPercentage = Math.round(correctPercentage);
      if (roundedPercentage === 100) {
        xpReward = 150; // +150 XP for perfect (100%) completion
      } else if (correctPercentage >= 70) {
        xpReward = 100; // +100 XP for >= 70% completion
      } else {
        xpReward = 0; // No XP if below 70%
      }

      // Record level completion
      const { error: insertError } = await supabase
        .from('completed_levels')
        .insert([
          {
            user_id: user.id,
            level_id: quizState.levelId,
            correct_percentage: correctPercentage,
          },
        ]);

      if (insertError) {
        throw new Error('Failed to save level completion');
      }

      // Update XP in profiles (ONLY XP, rank is calculated by RPC)
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

        // Only update XP - rank is calculated by RPC based on XP value
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
      console.error('Error completing level:', error);
      return { success: false, xpReward: 0 };
    }
  }, [quizState]);

  // Get level completion stats (for UI only, no XP shown during quiz)
  const getLevelStats = useCallback(() => {
    if (!quizState) return null;

    const correctAnswers = quizState.answers.filter(a => a.isCorrect).length;
    const correctPercentage = (correctAnswers / quizState.totalQuestions) * 100;

    return {
      correctAnswers,
      totalQuestions: quizState.totalQuestions,
      correctPercentage,
      isComplete: correctPercentage >= 70,
      isLevelAlreadyCompleted: quizState.isLevelAlreadyCompleted,
    };
  }, [quizState]);

  return {
    quizState,
    startQuiz,
    recordAnswer,
    completeLevelWithBonus,
    getLevelStats,
  };
};
