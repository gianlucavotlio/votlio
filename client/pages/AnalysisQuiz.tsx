import { useParams, useNavigate, Link } from "react-router-dom";
import { sampleChapters } from "@/lib/sampleData";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { AnalysisQuestion } from "@shared/api";
import { useProgress } from "@/lib/useProgress";
import { useAnalysisProgress } from "@/lib/useAnalysisProgress";
import { useUserProfile } from "@/lib/useUserProfile";
import { useRankProgress } from "@/lib/useRankProgress";
import { useAuth } from "@/contexts/AuthContext";
import { UserStats } from "@/components/UserStats";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { GuestModeBanner } from "@/components/GuestModeBanner";

export default function AnalysisQuiz() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { completeChapter } = useProgress();
  const { startAnalysis, recordAnalysisAnswer, completeAnalysisWithBonus, getLevelStats } = useAnalysisProgress();
  const { refreshProfile } = useUserProfile();
  const { refetch: refetchRank } = useRankProgress();
  const { isGuest } = useAuth();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<Array<{
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }>>([]);

  const chapter = sampleChapters.find((ch) => ch.id === chapterId);
  const analysisQuestions = chapter?.analysisQuestions || [];
  const levelStats = getLevelStats();

  useEffect(() => {
    if (chapter && analysisQuestions.length > 0) {
      startAnalysis(chapterId || "", analysisQuestions.length);
    }
  }, [chapter, chapterId, analysisQuestions.length, startAnalysis]);

  if (!chapter || analysisQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Analysefragen nicht gefunden
          </h1>
          <Link to="/" className="btn-primary">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = analysisQuestions[currentQuestionIndex];
  const totalQuestions = analysisQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (optionId: string) => {
    if (!showFeedback) {
      setSelectedOptionId(optionId);
      setShowFeedback(true);
    }
  };

  const handleContinue = async () => {
    if (!selectedOptionId) return;

    const isCorrect = selectedOptionId === currentQuestion.correctAnswerId;

    // Record answer locally
    await recordAnalysisAnswer(currentQuestion.id, isCorrect);

    const newAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        selectedOptionId,
        isCorrect,
      },
    ];
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionId(null);
      setShowFeedback(false);
    } else {
      // Complete analysis and get XP reward
      const completionResult = await completeAnalysisWithBonus(newAnswers);

      // Refresh profile and rank data if XP was awarded
      if (completionResult.xpReward > 0) {
        refreshProfile();
        // Refetch rank data to update UI with new rank
        await refetchRank();
      }

      // Store in localStorage and update progress
      completeChapter(chapterId || "", chapter.title, completionResult.xpReward, {
        established: newAnswers.filter((a) => a.isCorrect).length,
        independent: 0,
        isolated: 0,
      });

      navigate(`/chapter/${chapterId}/analysis/result`, {
        state: {
          correctAnswers: newAnswers.filter((a) => a.isCorrect).length,
          totalAnswers: totalQuestions,
          xpReward: completionResult.xpReward,
          levelCompleted: completionResult.success,
        },
      });
    }
  };

  const selectedOption = currentQuestion.options?.find(
    (o) => o.id === selectedOptionId
  );
  const isAnswerCorrect = selectedOptionId === currentQuestion.correctAnswerId;

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
                Vertiefung & Analyse
              </h1>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {chapter.title}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Frage {currentQuestionIndex + 1} von {totalQuestions}
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
          <div className="w-full max-w-3xl">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Question Card - Academic Style */}
              <div className="bg-white rounded-[20px] shadow-sm border border-gray-150 mb-3 sm:mb-4 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-relaxed">
                  {currentQuestion.description}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Wähle die beste Antwort.
                </p>
              </div>

              {/* Answer options - Clean white buttons */}
              <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
                {currentQuestion.options && currentQuestion.options.map((option, index) => (
                  <div key={option.id}>
                    <button
                      onClick={() => handleSelectOption(option.id)}
                      disabled={showFeedback}
                      className={`
                        w-full text-left p-3 sm:p-4 rounded-[16px] border transition-all duration-200
                        font-medium text-sm sm:text-base leading-relaxed
                        ${
                          selectedOptionId === option.id
                            ? option.id === currentQuestion.correctAnswerId
                              ? "bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm"
                              : "bg-rose-50 border-rose-300 text-rose-900 shadow-sm"
                            : "bg-white border-gray-200 text-gray-900 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer shadow-sm"
                        }
                        ${showFeedback && selectedOptionId !== option.id ? "opacity-50 cursor-default" : ""}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold text-xs mt-0.5">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option.text}</span>
                      </div>
                    </button>

                    {/* Feedback for selected option */}
                    {showFeedback && selectedOptionId === option.id && (
                      <div
                        className={`
                          mt-2.5 p-3 sm:p-4 rounded-[12px] border-l-4 animate-in fade-in slide-in-from-top-2 duration-300
                          ${
                            option.id === currentQuestion.correctAnswerId
                              ? "bg-emerald-50 border-l-emerald-400"
                              : "bg-rose-50 border-l-rose-400"
                          }
                        `}
                      >
                        <p className={`
                          text-xs sm:text-sm font-semibold mb-1.5
                          ${
                            option.id === currentQuestion.correctAnswerId
                              ? "text-emerald-700"
                              : "text-rose-700"
                          }
                        `}>
                          {option.id === currentQuestion.correctAnswerId
                            ? "✓ Richtig! Ausgezeichnete Analyse."
                            : "✗ Dies ist nicht die beste Antwort."}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-700 mb-2">
                          {currentQuestion.feedbackText}
                        </p>
                        <div className="text-xs sm:text-sm text-gray-600 border-t border-gray-300 pt-2.5 mt-2.5">
                          <p className="font-semibold text-gray-800 mb-1">Akademische Erklärung:</p>
                          <p className="leading-relaxed">{currentQuestion.explanationText}</p>
                        </div>
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
              {currentQuestionIndex < totalQuestions - 1
                ? "Weiter →"
                : "Zu meinem Ergebnis →"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
