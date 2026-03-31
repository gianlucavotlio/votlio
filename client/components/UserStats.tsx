import { useAuth } from '../lib/useAuth';
import { useRankProgress } from '../lib/useRankProgress';
import { Link } from 'react-router-dom';

const RANK_EMOJIS: Record<string, string> = {
  'Wähler': '🗳️',
  'Kandidat': '📋',
  'Abgeordneter': '🏛️',
  'Minister': '👔',
  'Bundeskanzler': '👑',
};

const getRankColors = (rank: string) => {
  const colors: Record<string, { badge: string; text: string }> = {
    'Wähler': { badge: 'bg-blue-100', text: 'text-blue-800' },
    'Kandidat': { badge: 'bg-amber-100', text: 'text-amber-800' },
    'Abgeordneter': { badge: 'bg-gray-100', text: 'text-gray-800' },
    'Minister': { badge: 'bg-yellow-100', text: 'text-yellow-800' },
    'Bundeskanzler': { badge: 'bg-purple-100', text: 'text-purple-900' },
  };
  return colors[rank] || { badge: 'bg-gray-100', text: 'text-gray-800' };
};

export const UserStats = () => {
  const { isGuest } = useAuth();
  const { rankData, loading } = useRankProgress();

  // Show 'Gast' for guests
  if (isGuest) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-lg">🎭</span>
            <span className="font-semibold text-sm">Gast</span>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while fetching rank data
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <span className="text-lg">⏳</span>
          <span className="font-semibold text-sm">Laden...</span>
        </div>
      </div>
    );
  }

  // Fallback if no rank data (should not happen in normal conditions)
  if (!rankData) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <span className="text-lg">❓</span>
          <span className="font-semibold text-sm">Rang</span>
        </div>
      </div>
    );
  }

  // Get current rank from RPC data
  const rankName = rankData.rank_name;
  const colors = getRankColors(rankName);
  const emoji = RANK_EMOJIS[rankName] || '🎖️';

  return (
    <div className="flex flex-col gap-2 items-center">
      {/* Rank Title Badge - Clickable Link to RankProgression */}
      <Link to="/rank-progression" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className={`${colors.badge} ${colors.text} px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer hover:shadow-md transition-all`}>
          <span className="text-lg">{emoji}</span>
          <div className="flex flex-col">
            <span className="text-xs opacity-75">Mein Rang</span>
            <span className="font-semibold text-sm leading-none">{rankName}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
