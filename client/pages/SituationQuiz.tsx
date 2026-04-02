import { useParams, useNavigate, Link } from "react-router-dom";
import { sampleChapters } from "@/lib/sampleData";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { GameSession } from "@shared/api";
import { useProgress } from "@/lib/useProgress";
import { useQuizProgress } from "@/lib/useQuizProgress";
import { useUserProfile } from "@/lib/useUserProfile";
import { useRankProgress } from "@/lib/useRankProgress";
import { useAuth } from "@/contexts/AuthContext";
import { UserStats } from "@/components/UserStats";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { GuestModeBanner } from "@/components/GuestModeBanner";

// Helper function to shuffle array in a deterministic way based on seed
function shuffleArray<T>(array: T[], seed: string): T[] {
  const arr = [...array];

  // Simple deterministic shuffle using the seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }

  // Use seeded random for consistent shuffling
  let currentHash = Math.abs(hash);
  for (let i = arr.length - 1; i > 0; i--) {
    currentHash = (currentHash * 9301 + 49297) % 233280;
    const j = Math.floor((currentHash / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

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

export default function SituationQuiz() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { completeChapter } = useProgress();
  const { startQuiz, recordAnswer, completeLevelWithBonus, getLevelStats } = useQuizProgress();
  const { refreshProfile } = useUserProfile();
  const { refetch: refetchRank } = useRankProgress();
  const { isGuest } = useAuth();

  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<Array<{
    id: string;
    text: string;
    xp: number;
    path: string;
    feedbackText: string;
  }> | null>(null);

  const chapter = sampleChapters.find((ch) => ch.id === chapterId);
  const levelStats = getLevelStats();

  useEffect(() => {
    if (chapter) {
      // Start quiz progress tracking
      startQuiz(chapterId || '', chapter.situations.length);

      const newSession: GameSession = {
        id: Math.random().toString(36),
        chapterId: chapter.id,
        currentSituationIndex: 0,
        totalXp: 0,
        pathCounts: {
          established: 0,
          independent: 0,
          isolated: 0,
        },
        answers: [],
      };
      setGameSession(newSession);
    }
  }, [chapter, chapterId, startQuiz]);

  // Shuffle options when situation changes
  useEffect(() => {
    if (chapter && gameSession) {
      const currentSit = chapter.situations[currentSituationIndex];
      if (currentSit) {
        // Use situation ID and index as seed for deterministic but unique shuffling
        const seed = `${currentSit.id}-${currentSituationIndex}`;
        const shuffled = shuffleArray(currentSit.options, seed);
        setShuffledOptions(shuffled);
      }
    }
  }, [currentSituationIndex, chapter, gameSession]);

  if (!chapter || !gameSession) {
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

  const currentSituation = chapter.situations[currentSituationIndex];
  const totalSituations = chapter.situations.length;
  const progress = ((currentSituationIndex + 1) / totalSituations) * 100;

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    setShowFeedback(true);
  };

  const handleContinue = async () => {
    if (!selectedOption) return;

    const selectedOpt = currentSituation.options.find(
      (o) => o.id === selectedOption
    );
    if (!selectedOpt) return;

    // Get the correct answer (highest XP)
    let maxXp = -1;
    let correctId = "";
    for (const opt of currentSituation.options) {
      if (opt.xp > maxXp) {
        maxXp = opt.xp;
        correctId = opt.id;
      }
    }

    const isCorrect = selectedOption === correctId;

    // Record answer locally (no XP awarded yet)
    await recordAnswer(currentSituation.id, isCorrect);

    // Update game session (only for progress tracking, not XP)
    const updatedSession: GameSession = {
      ...gameSession,
      totalXp: 0, // XP is awarded only at chapter completion
      pathCounts: {
        ...gameSession.pathCounts,
        [selectedOpt.path]: gameSession.pathCounts[selectedOpt.path] + 1,
      },
      answers: [
        ...gameSession.answers,
        {
          situationId: currentSituation.id,
          selectedOptionId: selectedOption,
          xpEarned: 0, // No XP during quiz
          pathSelected: selectedOpt.path,
        },
      ],
      currentSituationIndex: currentSituationIndex + 1,
    };

    if (currentSituationIndex < totalSituations - 1) {
      setGameSession(updatedSession);
      setCurrentSituationIndex(currentSituationIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // Complete level and get XP reward
      const completionResult = await completeLevelWithBonus();

      // Refresh profile and rank data if XP was awarded
      if (completionResult.xpReward > 0) {
        refreshProfile();
        // Refetch rank data to update UI with new rank
        await refetchRank();
      }

      // Update session with final XP reward (shown on result screen)
      const finalSession: GameSession = {
        ...updatedSession,
        totalXp: completionResult.xpReward,
      };

      // Save progress and navigate to result screen
      completeChapter(
        chapterId || "",
        chapter.title,
        completionResult.xpReward,
        updatedSession.pathCounts
      );

      navigate(`/chapter/${chapterId}/result`, {
        state: { gameSession: finalSession, levelCompleted: completionResult.success },
      });
    }
  };

  const selectedOptionObj =
    selectedOption &&
    currentSituation.options.find((o) => o.id === selectedOption);

  // Get the correct answer (highest XP)
  const getCorrectOptionId = () => {
    let maxXp = -1;
    let correctId = "";
    for (const opt of currentSituation.options) {
      if (opt.xp > maxXp) {
        maxXp = opt.xp;
        correctId = opt.id;
      }
    }
    return correctId;
  };

  const correctOptionId = getCorrectOptionId();
  const isAnswerCorrect = selectedOption === correctOptionId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex flex-col">
      {/* Guest Mode Banner */}
      <GuestModeBanner isGuest={isGuest} />

      {/* Completion Warning Banner */}
      {levelStats?.isLevelAlreadyCompleted && (
        <div className="bg-blue-50 border-b border-blue-200 px-3 sm:px-6 py-2 sm:py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-blue-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">
              ℹ️ Dieses Level ist bereits abgeschlossen. Du bekommst keine neuen XP-Punkte mehr.
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <Link
              to={`/chapter/${chapterId}`}
              className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Zurück</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <UserStats />
              <ProfileDropdown />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-lg sm:text-2xl font-bold text-foreground">
                {chapter.title}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Frage {currentSituationIndex + 1} von {totalSituations}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-2 sm:mt-4 h-1 sm:h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-start justify-center">
          <div className="w-full max-w-2xl">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Situation description */}
              <div className="card-interactive mb-2 sm:mb-3 p-3 sm:p-6">
                <h2 className="text-base sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
                  {currentSituation.description}
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Wähle die richtige Antwort.
                </p>
              </div>

              {/* Answer options */}
              <div className="space-y-1 sm:space-y-2">
                {shuffledOptions && shuffledOptions.map((option, index) => (
                  <div key={option.id}>
                    <button
                      onClick={() => handleSelectOption(option.id)}
                      disabled={selectedOption !== null && selectedOption !== option.id}
                      className={`btn-answer text-left transition-all duration-200 p-2.5 sm:p-3 ${
                        selectedOption === option.id
                          ? option.id === correctOptionId
                            ? "bg-success text-success-foreground shadow-lg scale-100"
                            : "bg-danger text-danger-foreground shadow-lg scale-100"
                          : "bg-secondary text-secondary-foreground border-2 border-border hover:border-primary/30"
                      } ${selectedOption !== null && selectedOption !== option.id ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div
                          className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-bold mt-0.5 ${
                            selectedOption === option.id
                              ? option.id === correctOptionId
                                ? "bg-success-foreground text-success border-success-foreground"
                                : "bg-danger-foreground text-danger border-danger-foreground"
                              : "border-current"
                          }`}
                        >
                          {index === 0
                            ? "A"
                            : index === 1
                              ? "B"
                              : "C"}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-sm">{option.text}</p>
                        </div>
                      </div>
                    </button>

                    {/* Feedback when selected */}
                    {showFeedback && selectedOption === option.id && (
                      <div
                        className={`mt-2 p-2 sm:p-3 border rounded-lg animate-in fade-in slide-in-from-top-2 duration-300 ${
                          option.id === correctOptionId
                            ? "bg-success/10 border-success/20"
                            : "bg-danger/10 border-danger/20"
                        }`}
                      >
                        <p className={`text-xs sm:text-sm font-medium ${
                          option.id === correctOptionId
                            ? "text-success"
                            : "text-danger"
                        }`}>
                          {option.id === correctOptionId ? "✓ Korrekt!" : "✗ Falsch!"}
                        </p>
                        <p className="text-xs sm:text-sm text-foreground mt-1">
                          {option.feedbackText}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Continue button - Prominent at bottom */}
        {showFeedback && (
          <div className="mt-2 sm:mt-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <button
              onClick={handleContinue}
              className="btn-primary w-full py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              {currentSituationIndex < totalSituations - 1
                ? "Weiter →"
                : "Zu meinem Ergebnis →"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
