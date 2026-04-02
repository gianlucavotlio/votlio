import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/lib/useUserProfile';
import { useRankProgress } from '@/lib/useRankProgress';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const RANK_EMOJIS: Record<string, string> = {
  'Wähler': '🗳️',
  'Kandidat': '📋',
  'Abgeordneter': '🏛️',
  'Minister': '👔',
  'Bundeskanzler': '👑',
};

const getRankColors = (rank: string) => {
  const colors: Record<string, {
    gradient: string;
    glow: string;
  }> = {
    'Wähler': {
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      glow: '0 0 16px rgba(59, 130, 246, 0.4)'
    },
    'Kandidat': {
      gradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
      glow: '0 0 16px rgba(251, 146, 60, 0.4)'
    },
    'Abgeordneter': {
      gradient: 'bg-gradient-to-r from-gray-500 to-slate-600',
      glow: '0 0 16px rgba(107, 114, 128, 0.4)'
    },
    'Minister': {
      gradient: 'bg-gradient-to-r from-yellow-500 to-amber-500',
      glow: '0 0 16px rgba(234, 179, 8, 0.4)'
    },
    'Bundeskanzler': {
      gradient: 'bg-gradient-to-r from-purple-600 to-violet-600',
      glow: '0 0 16px rgba(147, 51, 234, 0.4)'
    },
  };
  return colors[rank] || {
    gradient: 'bg-gradient-to-r from-gray-500 to-slate-600',
    glow: '0 0 16px rgba(107, 114, 128, 0.4)'
  };
};

export const ProfileDropdown = () => {
  const { user, isGuest, signOut } = useAuth();
  const { profile } = useUserProfile();
  const { rankData, loading: rankLoading } = useRankProgress();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  // Trigger button styles
  const triggerButtonClasses = "inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors cursor-pointer flex-shrink-0";

  // GUEST MODE
  if (isGuest || !user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={triggerButtonClasses}>
            <User className="w-5 h-5 text-blue-600" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          {/* Guest Mode Section */}
          <div className="px-4 py-4 text-center">
            <div className="text-3xl mb-3">🎭</div>
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Du bist im Gastmodus
            </h3>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Melde dich kostenlos an, um deinen Fortschritt zu speichern und Ränge freizuschalten.
            </p>
            <Link to="/auth" className="w-full inline-block">
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg text-sm transition-all duration-200">
                Kostenlos anmelden
              </button>
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // LOGGED-IN MODE
  const username = profile?.username || user.email?.split('@')[0] || 'User';
  const xp = profile?.xp || 0;
  const rankName = rankData?.rank_name || 'Wähler';
  const rankEmoji = RANK_EMOJIS[rankName] || '🎖️';
  const rankColors = getRankColors(rankName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={triggerButtonClasses}>
          <User className="w-5 h-5 text-blue-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {/* Profile Section */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{rankEmoji}</span>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-semibold text-foreground truncate">{username}</span>
            </div>
          </div>

          {/* Rank Badge */}
          <div
            className={`mt-3 px-3 py-2 rounded-md ${rankColors.gradient} text-white text-xs font-semibold flex items-center gap-2`}
            style={{ boxShadow: rankColors.glow }}
          >
            <span className="text-sm">{rankEmoji}</span>
            <span>{rankName}</span>
          </div>
        </div>

        <DropdownMenuSeparator className="my-3" />

        {/* XP Section */}
        <div className="px-4 py-3 bg-slate-50 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Punkte (XP)</span>
            <span className="text-sm font-bold text-blue-600">{xp}</span>
          </div>
        </div>

        <DropdownMenuSeparator className="my-3" />

        {/* Logout Action */}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer mx-1 my-1 px-3 py-2 text-red-600 hover:text-red-700 focus:text-red-700 focus:bg-red-50 rounded-md transition-colors">
          <LogOut className="w-4 h-4 mr-2" />
          <span>Abmelden</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
