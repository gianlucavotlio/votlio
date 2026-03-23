import { useContext } from 'react';
import { UserProfileContext } from '../contexts/UserProfileContext';
import { useAuth } from '../lib/useAuth';

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
  const context = useContext(UserProfileContext);
  const { isGuest } = useAuth();

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

  if (!context || !context.profile) {
    return null;
  }

  const { xp, rank_title = 'Wähler' } = context.profile;
  const colors = getRankColors(rank_title);
  const emoji = RANK_EMOJIS[rank_title] || '🎖️';

  return (
    <div className="flex flex-col gap-2">
      {/* Rank Title Badge */}
      <div className="flex items-center gap-2">
        <div className={`${colors.badge} ${colors.text} px-3 py-1.5 rounded-lg flex items-center gap-2`}>
          <span className="text-lg">{emoji}</span>
          <span className="font-semibold text-sm">{rank_title}</span>
        </div>
      </div>

      {/* XP Display */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500">XP:</span>
        <span className="text-sm font-bold text-gray-700">{xp}</span>
      </div>
    </div>
  );
};
