import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { sampleChapters } from "@/lib/sampleData";
import { ChevronLeft, Zap, Trophy, Home, ArrowRight } from "lucide-react";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { useState } from "react";

interface AnalysisResultState {
  correctAnswers: number;
  totalAnswers: number;
  xpReward: number;
  levelCompleted: boolean;
}

const getAnalysisLevel = (percentage: number) => {
  if (percentage >= 80) {
    return {
      level: "Sehr gutes Systemverständnis",
      emoji: "🎓",
      color: "text-emerald-700 bg-emerald-50",
      borderColor: "border-emerald-200",
      description:
        "Du hast ein tiefes Verständnis für die politischen Strukturen demonstriert. Du kannst Konzepte vergleichen und kritisch analysieren.",
    };
  }
  if (percentage >= 60) {
    return {
      level: "Fortgeschritten",
      emoji: "📚",
      color: "text-blue-700 bg-blue-50",
      borderColor: "border-blue-200",
      description:
        "Du beherrschst die Kernkonzepte gut. Mit etwas mehr Vertiefung erreichst du Expertenniveau.",
    };
  }
  return {
    level: "Grundlagen verstanden",
    emoji: "🌱",
    color: "text-amber-700 bg-amber-50",
    borderColor: "border-amber-200",
    description:
      "Du hast die Grundlagen erfasst. Wiederhole die akademischen Erklärungen, um dein Verständnis zu vertiefen.",
  };
};

export default function AnalysisResult() {
  const { chapterId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const state = location.state as AnalysisResultState | undefined;

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Ergebnis nicht gefunden
          </h1>
          <Link to="/" className="btn-primary">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  const { correctAnswers, totalAnswers, xpReward } = state;
  const percentage = Math.round((correctAnswers / totalAnswers) * 100);
  const analysisLevel = getAnalysisLevel(percentage);

  const chapter = chapterId ? sampleChapters.find((ch) => ch.id === chapterId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link
              to={chapter ? `/chapter/${chapter.id}` : "/"}
              className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Zurück
            </Link>
            <ProfileDropdown />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="w-full max-w-2xl">
          {/* Analysis Level Card */}
          <div className={`rounded-[20px] border-2 p-6 sm:p-8 mb-6 shadow-sm ${analysisLevel.color} ${analysisLevel.borderColor} text-center`}>
            <div className="text-5xl sm:text-6xl mb-4">{analysisLevel.emoji}</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1.5">
              {analysisLevel.level}
            </h1>
            <p className="text-sm sm:text-base font-semibold mb-4 opacity-90">
              {percentage}% – {correctAnswers} von {totalAnswers} Fragen korrekt beantwortet
            </p>
            <p className="text-sm leading-relaxed">
              {analysisLevel.description}
            </p>
          </div>

          {/* Performance Details */}
          <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
              Deine Leistung
            </h2>

            <div className="space-y-3">
              {/* Korrekte Antworten */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-foreground font-medium">Korrekte Antworten</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-600">
                  {correctAnswers}/{totalAnswers}
                </span>
              </div>

              {/* Erfolgsquote */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-foreground font-medium">Erfolgsquote</span>
                <span className="text-lg sm:text-xl font-bold text-blue-600">
                  {percentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Fortschritt</span>
                  <span className="text-xs text-muted-foreground">{percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* XP Reward */}
              {xpReward > 0 && (
                <div className="mt-4 flex items-center justify-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-yellow-700">
                    +{xpReward} XP verdient!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Insights Card */}
          <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
              Was du gelernt hast
            </h2>

            <ul className="space-y-2 text-sm sm:text-base text-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  Du verstehst die strukturellen Prinzipien der Verfassung und ihre historischen Hintergründe.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  Du kannst komplexe politische Konzepte vergleichen und ihre Auswirkungen bewerten.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  Du kannst kritisch hinterfragen und Argumente differenziert einordnen.
                </span>
              </li>
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {chapter && (
              <Link
                to={`/chapter/${chapter.id}`}
                className="btn-primary w-full py-3 sm:py-4 text-base sm:text-lg font-bold flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Zurück zum Kapitel
              </Link>
            )}
            <Link
              to="/"
              className="btn-secondary w-full py-3 sm:py-4 text-base sm:text-lg font-bold flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Zur Startseite
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
