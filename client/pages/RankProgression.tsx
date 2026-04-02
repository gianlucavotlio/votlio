import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { GuestModeBanner } from "@/components/GuestModeBanner";
import { supabase } from "@/lib/supabaseClient";

// Reference rank data with emoji, description, and XP requirement
const RANKS_REFERENCE = {
  "Wähler": { emoji: "🗳️", description: "Anfänger", xpRequired: 0 },
  "Kandidat": { emoji: "📋", description: "Fortgeschrittener", xpRequired: 500 },
  "Abgeordneter": { emoji: "🏛️", description: "Experte", xpRequired: 2000 },
  "Minister": { emoji: "👔", description: "Meister", xpRequired: 5000 },
  "Bundeskanzler": { emoji: "👑", description: "Legende", xpRequired: 10000 },
};

const RANK_ORDER = ["Wähler", "Kandidat", "Abgeordneter", "Minister", "Bundeskanzler"];

export interface RankProgressData {
  xp: number;
  rank_name: string;
  next_rank: string | null;
  next_rank_min_xp: number;
}

export default function RankProgression() {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const [rankData, setRankData] = useState<RankProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch rank progress from Supabase RPC
  useEffect(() => {
    if (isGuest) {
      setLoading(false);
      return;
    }

    const fetchRankData = async () => {
      if (!user) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: rpcError } = await supabase.rpc(
          "get_rank_progress_from_profiles",
          { p_user_id: user.id }
        );

        if (rpcError) {
          console.error("RPC Error:", rpcError);
          setError("Failed to fetch rank data");
          setRankData(null);
        } else if (data && data.length > 0) {
          console.log("Rank progress data loaded:", data[0]);
          setRankData(data[0]);
        } else {
          setError("No rank data found");
        }
      } catch (err) {
        console.error("Error fetching rank progress:", err);
        setError("An error occurred while fetching rank data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRankData();
    }
  }, [user, isGuest, retryCount]);

  // Show login required for guests
  if (isGuest) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
        <GuestModeBanner isGuest={isGuest} />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Rang und Fortschritt freischalten
            </h1>
            <p className="text-gray-600 mb-6">
              Diese Funktion ist nur für angemeldete Benutzer verfügbar. Melde dich an, um deine XP, deinen Rang und deinen Fortschritt zu speichern.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/auth"
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Jetzt anmelden
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Weiter lernen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Lade deine Rank-Daten...</p>
        </div>
      </div>
    );
  }

  if (error || !rankData) {
    const handleRetry = useCallback(() => {
      setError(null);
      setRetryCount(prev => prev + 1);
    }, []);

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
        <GuestModeBanner isGuest={isGuest} />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-gray-600 mb-4">{error || "Fehler beim Laden der Daten"}</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Erneut versuchen
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Zurück
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentRank = rankData.rank_name;
  const currentXp = rankData.xp;
  const nextRank = rankData.next_rank;
  const nextRankMinXp = rankData.next_rank_min_xp;
  const xpUntilNextRank = nextRank ? Math.max(0, nextRankMinXp - currentXp) : 0;
  const progressPercentage = nextRank ? Math.min((currentXp / nextRankMinXp) * 100, 100) : 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Guest Mode Banner */}
      <GuestModeBanner isGuest={isGuest} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
                  XP Pfad
                </h1>
                <p className="text-sm text-gray-600">
                  Deine Rang-Progression
                </p>
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Current Status */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="text-6xl sm:text-7xl mb-3">
                {RANKS_REFERENCE[currentRank as keyof typeof RANKS_REFERENCE]?.emoji || "🗳️"}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                {currentRank}
              </h2>
              <p className="text-sm text-gray-600 mb-5">
                Dein aktueller Rang
              </p>
            </div>

            {/* XP Progress */}
            {nextRank ? (
              <div>
                <div className="mb-3">
                  <p className="text-center text-sm font-semibold text-gray-700 mb-2">
                    <span className="text-lg font-bold text-blue-600">{currentXp} XP</span>
                    <span className="text-gray-500"> • </span>
                    <span>Noch {xpUntilNextRank} XP bis {nextRank}</span>
                  </p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                {xpUntilNextRank === 0 && (
                  <p className="text-center text-sm font-semibold text-green-600 mt-3">
                    🎉 Du bist bereit für den nächsten Rang!
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-base font-bold text-purple-600">
                  🏆 Du hast die höchste Stufe erreicht!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Rank Path */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
            Deine Progression
          </h2>

          <div className="space-y-3">
            {RANK_ORDER.map((rankName) => {
              const rankInfo = RANKS_REFERENCE[rankName as keyof typeof RANKS_REFERENCE];
              const isCurrentRank = rankName === currentRank;
              const isNextRank = rankName === nextRank;
              const isPassed = RANK_ORDER.indexOf(rankName) < RANK_ORDER.indexOf(currentRank);

              return (
                <div
                  key={rankName}
                  className={`rounded-xl p-3 sm:p-4 border-2 transition-all ${
                    isCurrentRank
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-400 shadow-md"
                      : isPassed
                      ? "bg-white border-green-200"
                      : isNextRank
                      ? "bg-white border-amber-200"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-3xl sm:text-4xl flex-shrink-0 leading-none">
                      {rankInfo?.emoji || "❓"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                          {rankName}
                        </h3>
                        <span className="text-xs font-semibold text-gray-500">
                          ab {rankInfo?.xpRequired || 0} XP
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {rankInfo?.description || ""}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {isCurrentRank && (
                        <span className="bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          Du bist hier
                        </span>
                      )}
                      {isPassed && (
                        <span className="bg-green-600 text-white px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          ✓ Erreicht
                        </span>
                      )}
                      {isNextRank && (
                        <span className="bg-amber-600 text-white px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          Nächstes Ziel
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
