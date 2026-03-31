import { useLocation, useNavigate, Link } from "react-router-dom";
import { sampleChapters } from "@/lib/sampleData";
import { ChevronLeft, Zap, Trophy, Share2, Copy, Check, AlertCircle, Star, TrendingUp } from "lucide-react";
import { GameSession, GameResult } from "@shared/api";
import { useProgress } from "@/lib/useProgress";
import { useAuth } from "@/lib/useAuth";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { useState } from "react";

const getCategoryColor = (category?: string) => {
  switch (category) {
    case "Grundwissen":
      return "bg-success/10 text-success";
    case "Wiederholung":
      return "bg-warning/10 text-warning";
    case "Vertiefung":
      return "bg-danger/10 text-danger";
    default:
      return "bg-muted text-foreground";
  }
};

const getPerformanceEmoji = (percentage: number) => {
  if (percentage === 100) return "🌟";
  if (percentage >= 90) return "⭐";
  if (percentage >= 80) return "👏";
  if (percentage >= 70) return "🎉";
  return "💪";
};

const getPerformanceMessage = (percentage: number, correctAnswers: number, totalQuestions: number) => {
  if (percentage === 100) {
    return {
      title: "Perfekt! 🏆",
      message: `Du hast alle ${totalQuestions} Fragen korrekt beantwortet! Außergewöhnlich!`,
      color: "text-yellow-600",
    };
  }
  if (percentage >= 90) {
    return {
      title: "Hervorragend! ⭐",
      message: `${correctAnswers}/${totalQuestions} Fragen richtig – du bist ein echter Experte!`,
      color: "text-blue-600",
    };
  }
  if (percentage >= 80) {
    return {
      title: "Sehr gut! 👏",
      message: `${correctAnswers}/${totalQuestions} Fragen richtig – großartige Leistung!`,
      color: "text-green-600",
    };
  }
  if (percentage >= 70) {
    return {
      title: "Gut gemacht! 🎉",
      message: `${correctAnswers}/${totalQuestions} Fragen richtig – Kapitel abgeschlossen!`,
      color: "text-orange-600",
    };
  }
  return {
    title: "Versuch es nochmal! 💪",
    message: `${correctAnswers}/${totalQuestions} Fragen richtig – aber nicht genug zum Abschließen.`,
    color: "text-gray-600",
  };
};

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { isGuest } = useAuth();
  const [copied, setCopied] = useState(false);

  // Try to get gameSession from navigation state, or reconstruct from progress
  let gameSession = location.state?.gameSession as GameSession | undefined;
  let isReconstructed = false;

  // Fallback: If no state, use the last session from history
  if (!gameSession && progress.sessionHistory.length > 0) {
    const lastSession = progress.sessionHistory[progress.sessionHistory.length - 1];
    const lastChapter = sampleChapters.find((ch) => ch.id === lastSession.chapterId);

    if (lastChapter) {
      isReconstructed = true;
      // Reconstruct a gameSession from the last completed session
      gameSession = {
        id: `reconstructed-${lastSession.timestamp}`,
        chapterId: lastSession.chapterId,
        currentSituationIndex: lastChapter.situations.length,
        totalXp: lastSession.xpEarned,
        pathCounts: {
          established: lastSession.dominantPath === "established" ? 1 : 0,
          independent: lastSession.dominantPath === "independent" ? 1 : 0,
          isolated: lastSession.dominantPath === "isolated" ? 1 : 0,
        },
        // Create dummy answers array matching the number of questions
        answers: lastChapter.situations.map((sit) => ({
          situationId: sit.id,
          selectedOptionId: "",
          xpEarned: 0,
          pathSelected: lastSession.dominantPath,
        })),
      };
    }
  }

  if (!gameSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Spielsitzung nicht gefunden
          </h1>
          <Link to="/" className="btn-primary">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  const chapter = sampleChapters.find((ch) => ch.id === gameSession.chapterId);

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Kapitel nicht gefunden
          </h1>
          <Link to="/" className="btn-primary">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalQuestions = gameSession.answers.length;
  const correctAnswers = gameSession.answers.filter(a => a.pathSelected === "established").length;
  const correctPercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const performance = getPerformanceMessage(correctPercentage, correctAnswers, totalQuestions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex items-center justify-between mb-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity text-xs sm:text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Zurück
            </Link>
            <ProfileDropdown />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-base sm:text-2xl font-bold text-foreground">
              {chapter.title} – Ergebnis
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="w-full max-w-3xl">
          {/* Performance Header */}
          <div className="text-center mb-6 sm:mb-8 animate-in fade-in slide-in-from-top duration-500">
            <div className="mb-3 sm:mb-4 text-5xl sm:text-7xl">
              {getPerformanceEmoji(correctPercentage)}
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${performance.color}`}>
              {performance.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {performance.message}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
            {/* Correct Answers */}
            <div className="card-interactive bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 p-3 sm:p-4 text-center">
              <div className="text-xs sm:text-sm text-blue-600 font-semibold mb-1">
                Richtig
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-blue-700">
                {correctAnswers}
              </div>
              <div className="text-xs text-blue-600">
                von {totalQuestions}
              </div>
            </div>

            {/* Percentage */}
            <div className="card-interactive bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-3 sm:p-4 text-center">
              <div className="text-xs sm:text-sm text-blue-600 font-semibold mb-1">
                Erfolgsquote
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-blue-700">
                {correctPercentage}%
              </div>
              <div className="text-xs text-blue-600">
                der Fragen
              </div>
            </div>

            {/* XP Earned */}
            <div className="card-interactive bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 p-3 sm:p-4 text-center">
              <div className="text-xs sm:text-sm text-yellow-600 font-semibold mb-1">
                XP verdient
              </div>
              <div className="flex items-center justify-center gap-1">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                <span className="text-2xl sm:text-4xl font-bold text-yellow-700">
                  {gameSession.totalXp}
                </span>
              </div>
              <div className="text-xs text-yellow-600">
                {isGuest ? "Gastmodus" : "gespeichert"}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="card-interactive mb-6 sm:mb-8 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 p-4 sm:p-6">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">
                  Fortschritt
                </span>
                <span className="text-sm font-bold text-primary">
                  {correctPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${correctPercentage}%` }}
                />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              {correctPercentage >= 70 ? (
                <span className="text-green-700 font-semibold">
                  ✓ Kapitel abgeschlossen!
                </span>
              ) : (
                <span className="text-amber-700 font-semibold">
                  Mindestens 70% notwendig zum Abschließen
                </span>
              )}
            </div>
          </div>

          {/* Guest Mode Warning */}
          {isGuest && (
            <div className="card-interactive mb-6 sm:mb-8 bg-amber-50 border border-amber-200 p-3 sm:p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Gastmodus</h3>
                <p className="text-sm text-amber-800">
                  Im Gastmodus werden deine Fortschritte und XP-Punkte nicht gespeichert. 
                  Melde dich an, um deine Erfolge zu verfolgen!
                </p>
              </div>
            </div>
          )}

          {/* Share Screen */}
          <div className="card-interactive bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 mb-4 sm:mb-6 p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Teile dein Ergebnis
              </h3>
            </div>

            {/* Share Text */}
            <div className="bg-white dark:bg-slate-900 rounded-lg p-2.5 sm:p-3 mb-2.5 sm:mb-3 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">
                Kopiere dein Ergebnis:
              </p>
              <p className="text-xs sm:text-sm font-semibold text-foreground break-words">
                Ich habe '{chapter.title}' mit {correctPercentage}% richtig abgeschlossen! 🎮 {correctPercentage === 100 ? "Perfekt! 🏆" : ""}
              </p>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => {
                const text = `Ich habe '${chapter.title}' mit ${correctPercentage}% richtig abgeschlossen! 🎮 ${correctPercentage === 100 ? "Perfekt! 🏆" : ""}`;
                navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Kopiert!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                  Kopieren
                </>
              )}
            </button>

            {/* Social Share Hint */}
            <p className="text-xs text-muted-foreground text-center mt-2">
              💡 Teile auf Social Media: Twitter, Instagram, WhatsApp
            </p>
          </div>

          {/* Analysis Section Link */}
          {chapter.analysisQuestions && chapter.analysisQuestions.length > 0 && (
            <div className="card-interactive bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 mb-6 sm:mb-8 p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🔬</div>
                <div className="flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-blue-900 mb-2">
                    Vertiefung & Analyse
                  </h3>
                  <p className="text-sm text-blue-800 mb-4">
                    Teste dein Verständnis auf höherem Niveau. Analysiere, vergleiche und bewerte komplexere Szenarien.
                  </p>
                  <button
                    onClick={() => navigate(`/chapter/${chapter.id}/analysis`)}
                    className="btn-primary py-2 sm:py-2.5 text-sm font-semibold"
                  >
                    Zur Vertiefung →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/")}
              className="btn-secondary py-2 sm:py-3 font-semibold text-sm"
            >
              Zur Startseite
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn-primary py-2 sm:py-3 font-semibold text-sm"
            >
              Nächstes Kapitel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
