import { useParams, useNavigate, Link } from "react-router-dom";
import { sampleChapters } from "@/lib/sampleData";
import { ChevronLeft, ChevronRight, BookOpen, Zap, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { parseContentWithTerms } from "@/lib/contentParser";
import {
  createInterleaveSequence,
  countQuestionsInSequence,
} from "@/lib/questionCardMapping";
import { SequenceItem, GameSession, AnswerOption } from "@shared/api";
import { useProgress } from "@/lib/useProgress";
import { useQuizProgress } from "@/lib/useQuizProgress";
import { useUserProfile } from "@/lib/useUserProfile";
import { useAuth } from "@/lib/useAuth";
import { UserStats } from "@/components/UserStats";
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

export default function ChapterIntro() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { completeChapter } = useProgress();
  const { startQuiz, recordAnswer, completeLevelWithBonus, getLevelStats } = useQuizProgress();
  const { refreshProfile } = useUserProfile();
  const { isGuest } = useAuth();

  const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>([]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<any[] | null>(
    null
  );
  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  const chapter = sampleChapters.find((ch) => ch.id === chapterId);
  const levelStats = getLevelStats();

  // Initialize sequence and game session on mount
  useEffect(() => {
    if (chapter) {
      const sequence = createInterleaveSequence(
        chapter.explanationCards,
        chapter.situations
      );
      setSequenceItems(sequence);

      // Start quiz progress tracking
      const questionCount = chapter.situations.length;
      startQuiz(chapterId || '', questionCount);

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

  // Shuffle options when we reach a question
  useEffect(() => {
    if (sequenceItems.length > 0 && currentSequenceIndex < sequenceItems.length) {
      const currentItem = sequenceItems[currentSequenceIndex];
      if (currentItem.type === "question") {
        const situation = currentItem.data as any;
        const seed = `${situation.id}-${currentSequenceIndex}`;
        const shuffled = shuffleArray(situation.options, seed);
        setShuffledOptions(shuffled);
      } else {
        setShuffledOptions(null);
      }
    }
  }, [currentSequenceIndex, sequenceItems]);

  if (!chapter || !gameSession || sequenceItems.length === 0) {
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

  const currentItem = sequenceItems[currentSequenceIndex];
  const isCard = currentItem.type === "card";
  const totalQuestions = countQuestionsInSequence(sequenceItems);
  const currentQuestionIndex = sequenceItems
    .slice(0, currentSequenceIndex + 1)
    .filter((item) => item.type === "question").length;
  const currentCardNumber = sequenceItems
    .slice(0, currentSequenceIndex + 1)
    .filter((item) => item.type === "card").length;
  const progress = ((currentSequenceIndex + 1) / sequenceItems.length) * 100;

  const handleNext = async () => {
    if (currentSequenceIndex < sequenceItems.length - 1) {
      setCurrentSequenceIndex(currentSequenceIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // Completed all items, award XP based on completion
      const completionResult = await completeLevelWithBonus();

      // Refresh profile to show updated XP/Rank if awarded
      if (completionResult.xpReward > 0) {
        refreshProfile();
      }

      // Update session with final XP reward (shown on result screen)
      const finalSession: GameSession = {
        ...gameSession,
        totalXp: completionResult.xpReward,
      };

      // Navigate to result
      completeChapter(
        chapterId || "",
        chapter.title,
        completionResult.xpReward,
        gameSession.pathCounts
      );

      navigate(`/chapter/${chapterId}/result`, {
        state: { gameSession: finalSession, levelCompleted: completionResult.success },
      });
    }
  };

  const handlePrev = () => {
    if (currentSequenceIndex > 0) {
      setCurrentSequenceIndex(currentSequenceIndex - 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    setShowFeedback(true);
  };

  const handleContinue = async () => {
    if (!selectedOption) return;

    const currentQuestion = currentItem.data as any;
    const selectedOpt = currentQuestion.options.find(
      (o: AnswerOption) => o.id === selectedOption
    );
    if (!selectedOpt) return;

    // Get the correct option ID to verify if answer is correct
    let maxXp = -1;
    let correctId = "";
    for (const opt of currentQuestion.options) {
      if (opt.xp > maxXp) {
        maxXp = opt.xp;
        correctId = opt.id;
      }
    }

    const isCorrect = selectedOption === correctId;

    // Record answer locally (no XP awarded during quiz)
    await recordAnswer(currentQuestion.id, isCorrect);

    // Update game session (only for progress, not XP)
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
          situationId: currentQuestion.id,
          selectedOptionId: selectedOption,
          xpEarned: 0, // No XP during quiz
          pathSelected: selectedOpt.path,
        },
      ],
      currentSituationIndex: gameSession.currentSituationIndex + 1,
    };

    setGameSession(updatedSession);
    handleNext();
  };

  const getCorrectOptionId = () => {
    const currentQuestion = currentItem.data as any;
    let maxXp = -1;
    let correctId = "";
    for (const opt of currentQuestion.options) {
      if (opt.xp > maxXp) {
        maxXp = opt.xp;
        correctId = opt.id;
      }
    }
    return correctId;
  };

  const correctOptionId = isCard ? "" : getCorrectOptionId();
  const isAnswerCorrect = selectedOption === correctOptionId;
  const isLastItem = currentSequenceIndex === sequenceItems.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex flex-col">
      {/* Guest Mode Banner */}
      <GuestModeBanner isGuest={isGuest} />

      {/* Completion Warning Banner */}
      {levelStats?.isLevelAlreadyCompleted && (
        <div className="bg-blue-50 border-b border-blue-200 px-3 sm:px-6 py-2 sm:py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-2 text-sm text-blue-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">
              ℹ️ Dieses Level ist bereits abgeschlossen. Du bekommst keine neuen XP-Punkte mehr.
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-2 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-base sm:text-xl font-bold text-foreground">
                  {chapter.title}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {isCard
                  ? `Erklärung ${currentCardNumber} von ${chapter.explanationCards.length}`
                  : `Frage ${currentQuestionIndex} von ${totalQuestions}`}
              </p>
            </div>
            <UserStats />
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 sm:h-1 bg-border">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="w-full max-w-2xl">
          {isCard ? (
            // EXPLANATION CARD VIEW
            <div key={currentItem.data.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="card-interactive p-3 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                      Schritt {currentSequenceIndex + 1} von{" "}
                      {sequenceItems.length}
                    </div>
                    <h2 className="text-base sm:text-2xl font-bold text-foreground truncate">
                      {parseContentWithTerms((currentItem.data as any).title)}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4 sm:mb-6 py-3 sm:py-4 border-y border-border">
                  <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line">
                    {parseContentWithTerms((currentItem.data as any).content)}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <button
                    onClick={handlePrev}
                    disabled={currentSequenceIndex === 0}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 rounded-lg transition-colors text-xs sm:text-base"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Zurück</span>
                  </button>

                  <div className="flex gap-1.5 justify-center flex-1 flex-wrap">
                    {Array.from({ length: Math.min(sequenceItems.length, 20) }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setCurrentSequenceIndex(i);
                          setSelectedOption(null);
                          setShowFeedback(false);
                        }}
                        disabled={i > currentSequenceIndex}
                        className={`h-1.5 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                          i === currentSequenceIndex
                            ? "bg-primary w-6"
                            : "bg-border w-1.5"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors font-medium text-xs sm:text-base ${
                      isLastItem
                        ? "btn-primary"
                        : "text-primary hover:bg-primary/10"
                    }`}
                  >
                    <span className="hidden sm:inline">
                      {isLastItem ? "Zum Ergebnis" : "Weiter"}
                    </span>
                    <span className="sm:hidden">
                      {isLastItem ? "Ziel" : ""}
                    </span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Info box */}
              <div className="mt-3 sm:mt-4 card-interactive bg-primary/5 border-primary/20 p-2.5 sm:p-4">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">💡 Tipp:</span>{" "}
                  Lies die Erklärungen sorgfältig durch. Sie helfen dir, bessere
                  Entscheidungen in den nächsten Fragen zu treffen!
                </p>
              </div>
            </div>
          ) : (
            // QUESTION VIEW
            <div key={currentItem.data.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Question description */}
              <div className="card-interactive mb-3 sm:mb-4 p-3 sm:p-6">
                <h2 className="text-base sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
                  {(currentItem.data as any).description}
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Wähle die richtige Antwort.
                </p>
              </div>

              {/* Answer options */}
              <div className="space-y-2 sm:space-y-3">
                {shuffledOptions &&
                  shuffledOptions.map((option, index) => (
                    <div key={option.id}>
                      <button
                        onClick={() => handleSelectOption(option.id)}
                        disabled={
                          selectedOption !== null &&
                          selectedOption !== option.id
                        }
                        className={`btn-answer text-left transition-all duration-200 p-2.5 sm:p-3 w-full ${
                          selectedOption === option.id
                            ? option.id === correctOptionId
                              ? "bg-success text-success-foreground shadow-lg scale-100"
                              : "bg-danger text-danger-foreground shadow-lg scale-100"
                            : "bg-secondary text-secondary-foreground border-2 border-border hover:border-primary/30"
                        } ${
                          selectedOption !== null &&
                          selectedOption !== option.id
                            ? "opacity-40 cursor-not-allowed"
                            : ""
                        }`}
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
                            {index === 0 ? "A" : index === 1 ? "B" : "C"}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-sm">
                              {option.text}
                            </p>
                            {selectedOption === option.id && (
                              <div className="mt-1 flex items-center gap-1 text-xs">
                                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>+{option.xp} XP</span>
                              </div>
                            )}
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
                          <p
                            className={`text-xs sm:text-sm font-medium ${
                              option.id === correctOptionId
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {option.id === correctOptionId
                              ? "✓ Korrekt!"
                              : "✗ Falsch!"}
                          </p>
                          <p className="text-xs sm:text-sm text-foreground mt-1">
                            {option.feedbackText}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {/* Question-specific navigation */}
              {showFeedback && (
                <div className="mt-4 sm:mt-6 flex items-center justify-between gap-2 sm:gap-4">
                  <button
                    onClick={handlePrev}
                    disabled={currentSequenceIndex === 0}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 rounded-lg transition-colors text-xs sm:text-base"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Zurück</span>
                  </button>

                  <button
                    onClick={handleContinue}
                    className="btn-primary flex-1 py-2 sm:py-3 font-bold text-sm sm:text-base"
                  >
                    {isLastItem ? "Zu meinem Ergebnis →" : "Weiter →"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
