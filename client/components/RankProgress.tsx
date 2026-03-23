import { useMemo } from 'react';

// XP thresholds for political ranks
const RANK_THRESHOLDS = {
  'Wähler': 0,
  'Kandidat': 100,
  'Abgeordneter': 300,
  'Minister': 800,
  'Bundeskanzler': 2000,
};

interface RankProgressProps {
  xp: number;
  rank_title: string;
}

export const RankProgress = ({ xp, rank_title }: RankProgressProps) => {
  const { currentThreshold, nextThreshold, nextRank, progress } = useMemo(() => {
    const ranks = Object.entries(RANK_THRESHOLDS);
    const currentIdx = ranks.findIndex(([name]) => name === rank_title);

    if (currentIdx === -1 || currentIdx === ranks.length - 1) {
      // Rank not found or at max rank
      return { currentThreshold: 0, nextThreshold: 0, nextRank: null, progress: 100 };
    }

    const currentThreshold = ranks[currentIdx][1];
    const nextThreshold = ranks[currentIdx + 1][1];
    const nextRank = ranks[currentIdx + 1][0];
    const rangeSize = nextThreshold - currentThreshold;
    const xpInRange = Math.max(0, Math.min(xp - currentThreshold, rangeSize));
    const progress = (xpInRange / rangeSize) * 100;

    return { currentThreshold, nextThreshold, nextRank, progress };
  }, [xp, rank_title]);

  if (!nextRank) {
    return (
      <div className="text-xs text-gray-600 text-center">
        Maximaler Rang erreicht!
      </div>
    );
  }

  const xpToNext = nextThreshold - xp;

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Progress Text */}
      <div className="text-xs text-gray-600 text-center">
        {xpToNext > 0 ? `Noch ${xpToNext} XP bis ${nextRank}` : `${nextRank} erreicht!`}
      </div>
    </div>
  );
};
