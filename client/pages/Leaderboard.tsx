import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Trophy, Zap, TrendingUp, Lock } from 'lucide-react';
import { useLeaderboard } from '@/lib/useLeaderboard';
import { useAuth } from '@/lib/useAuth';
import { UserStats } from '@/components/UserStats';
import { GuestModeBanner } from '@/components/GuestModeBanner';

type TabType = 'alltime' | 'weekly';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<TabType>('alltime');
  const { allTimeLeaderboard, weeklyLeaderboard, myRankAllTime, myRankWeekly, loading, isAuthenticated } = useLeaderboard();
  const { user, isGuest } = useAuth();

  const currentLeaderboard = activeTab === 'alltime' ? allTimeLeaderboard : weeklyLeaderboard;
  const myRank = activeTab === 'alltime' ? myRankAllTime : myRankWeekly;

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const RANK_EMOJIS: Record<string, string> = {
    'Wähler': '🗳️',
    'Kandidat': '📋',
    'Abgeordneter': '🏛️',
    'Minister': '👔',
    'Bundeskanzler': '👑',
  };

  // Show login required message for guests
  if (isGuest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Anmeldung erforderlich
            </h1>
            <p className="text-muted-foreground mb-6">
              Das Leaderboard ist nur für angemeldete Benutzer verfügbar.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/auth"
                className="btn-primary"
              >
                Anmelden
              </Link>
              <Link
                to="/"
                className="btn-secondary"
              >
                Zurück zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Guest Mode Banner (not needed here since guests are blocked) */}
      <GuestModeBanner isGuest={isGuest} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Zurück</span>
            </Link>
            {isAuthenticated && <UserStats />}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-4xl">🏆</div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                Leaderboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Wer sind die besten Spieler?
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* My Rank Section (nur wenn eingeloggt) */}
        {isAuthenticated && myRank && (
          <section className="mb-8 sm:mb-12">
            <div className="card-interactive bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">👤</div>
                  <div>
                    <h3 className="text-sm text-muted-foreground font-medium">Dein Rang</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      #{myRank.rank}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">{myRank.username}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-lg">{activeTab === 'alltime' ? myRank.xp : myRank.xp_week}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">{RANK_EMOJIS[myRank.rank_title || 'Wähler'] || '🎖️'}</span>
                      <span className="font-bold text-lg">{myRank.rank_title || 'Wähler'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Login CTA (wenn nicht eingeloggt) */}
        {!isAuthenticated && (
          <section className="mb-8 sm:mb-12">
            <div className="card-interactive bg-blue-50 border-2 border-blue-200 p-4 sm:p-6 text-center">
              <p className="text-blue-900 font-medium mb-3">
                Melde dich an, um deinen Rang zu sehen und XP zu sammeln!
              </p>
              <Link
                to="/auth"
                className="btn-primary inline-block"
              >
                Einloggen
              </Link>
            </div>
          </section>
        )}

        {/* Tabs */}
        <div className="mb-6 sm:mb-8 border-b border-border">
          <div className="flex gap-4 sm:gap-6">
            <button
              onClick={() => setActiveTab('alltime')}
              className={`px-3 sm:px-4 py-2 sm:py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'alltime'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>All-time</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3 sm:px-4 py-2 sm:py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'weekly'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Wöchentlich</span>
              </div>
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3" />
              <p className="text-muted-foreground">Lädt Leaderboard...</p>
            </div>
          </div>
        ) : currentLeaderboard.length === 0 ? (
          <div className="card-interactive text-center py-12">
            <p className="text-muted-foreground mb-2">Noch keine Spieler in diesem Leaderboard</p>
          </div>
        ) : (
          /* Leaderboard table */
          <div className="space-y-2">
            {currentLeaderboard.map((entry, index) => {
              const medal = getMedalEmoji(entry.rank);
              const isMyRank = isAuthenticated && myRank && entry.rank === myRank.rank;

              return (
                <div
                  key={`${entry.rank}-${entry.username}`}
                  className={`card-interactive p-3 sm:p-4 flex items-center justify-between transition-all ${
                    isMyRank ? 'bg-primary/5 border-2 border-primary/30' : 'hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      {medal ? (
                        <span className="text-lg sm:text-2xl">{medal}</span>
                      ) : (
                        <span className="font-bold text-primary text-sm sm:text-base">
                          #{entry.rank}
                        </span>
                      )}
                    </div>

                    {/* User info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                        {entry.username}
                        {isMyRank && <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">DU</span>}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                        <span>{RANK_EMOJIS[entry.rank_title || 'Wähler'] || '🎖️'}</span>
                        <span>{entry.rank_title || 'Wähler'}</span>
                      </p>
                    </div>
                  </div>

                  {/* XP Display */}
                  <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
                        <span className="font-bold text-sm sm:text-base">
                          {activeTab === 'alltime' ? entry.xp : entry.xp_week}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {activeTab === 'alltime' ? 'XP' : 'XP/Woche'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info footer */}
        <div className="mt-8 sm:mt-12 card-interactive bg-secondary/50 p-4 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            ℹ️ Leaderboard wird alle 5 Minuten aktualisiert. {isAuthenticated ? 'Top 50 werden angezeigt.' : 'Melde dich an, um alle Top 50 zu sehen!'}
          </p>
        </div>
      </main>
    </div>
  );
}
