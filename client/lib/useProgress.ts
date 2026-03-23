import { useState, useEffect } from "react";

export interface UserProgress {
  totalXp: number;
  completedChapters: string[]; // chapter IDs
  pathCounts: {
    established: number;
    independent: number;
    isolated: number;
  };
  dominantPath: "established" | "independent" | "isolated";
  level: number;
  sessionHistory: Array<{
    chapterId: string;
    chapterTitle: string;
    xpEarned: number;
    dominantPath: "established" | "independent" | "isolated";
    timestamp: number;
  }>;
}

const STORAGE_KEY = "votlio_user_progress";
const XP_PER_LEVEL = 100; // 100 XP pro Level

// Default Progress
const DEFAULT_PROGRESS: UserProgress = {
  totalXp: 0,
  completedChapters: [],
  pathCounts: {
    established: 0,
    independent: 0,
    isolated: 0,
  },
  dominantPath: "established",
  level: 1,
  sessionHistory: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load progress:", error);
        setProgress(DEFAULT_PROGRESS);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
  };

  const calculateDominantPath = (
    pathCounts: UserProgress["pathCounts"]
  ): "established" | "independent" | "isolated" => {
    const { established, independent, isolated } = pathCounts;
    if (established >= independent && established >= isolated) return "established";
    if (independent >= established && independent >= isolated) return "independent";
    return "isolated";
  };

  const completeChapter = (
    chapterId: string,
    chapterTitle: string,
    totalXpEarned: number,
    sessionPathCounts: UserProgress["pathCounts"]
  ) => {
    setProgress((prev) => {
      // Calculate session dominant path
      const sessionDominantPath = calculateDominantPath(sessionPathCounts);

      const newProgress = {
        ...prev,
        totalXp: prev.totalXp + totalXpEarned,
        completedChapters: prev.completedChapters.includes(chapterId)
          ? prev.completedChapters
          : [...prev.completedChapters, chapterId],
        pathCounts: {
          established:
            prev.pathCounts.established + sessionPathCounts.established,
          independent:
            prev.pathCounts.independent + sessionPathCounts.independent,
          isolated: prev.pathCounts.isolated + sessionPathCounts.isolated,
        },
        sessionHistory: [
          ...prev.sessionHistory,
          {
            chapterId,
            chapterTitle,
            xpEarned: totalXpEarned,
            dominantPath: sessionDominantPath,
            timestamp: Date.now(),
          },
        ],
      };

      // Recalculate level and dominant path
      newProgress.level = calculateLevel(newProgress.totalXp);
      newProgress.dominantPath = calculateDominantPath(newProgress.pathCounts);

      return newProgress;
    });
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getProgressPercentage = (totalChapters: number) => {
    return Math.round((progress.completedChapters.length / totalChapters) * 100);
  };

  const isChapterUnlocked = (chapterId: string, chapterIndex: number) => {
    // Erste Kapitel ist immer offen
    if (chapterIndex === 0) return true;

    // Kapitel wird freigeschalten wenn vorheriges abgeschlossen
    const previousChapterId = chapterId; // würde in der Praxis vom Index abhängen
    // Für jetzt: XP-basiert freischalten
    return progress.level >= Math.floor(chapterIndex / 2) + 1;
  };

  return {
    progress,
    isLoaded,
    completeChapter,
    resetProgress,
    getProgressPercentage,
    isChapterUnlocked,
    calculateLevel,
  };
}
