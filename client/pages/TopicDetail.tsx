import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle2, Trophy } from "lucide-react";
import {
  getTopicById,
  getChaptersForTopicAndStage,
  getAvailableStagesForTopic,
  topics,
} from "@/lib/sampleData";
import { useCompletedLevels } from "@/lib/useCompletedLevels";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { GuestModeBanner } from "@/components/GuestModeBanner";
import { Footer } from "@/components/Footer";

export default function TopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { isLevelCompleted, isPerfectCompletion } = useCompletedLevels();
  const { isGuest } = useAuth();

  if (!topicId) {
    navigate("/");
    return null;
  }

  const topic = getTopicById(topicId);
  if (!topic) {
    navigate("/");
    return null;
  }

  const availableStages = getAvailableStagesForTopic(topicId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Guest Mode Banner */}
      <GuestModeBanner isGuest={isGuest} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🏛️</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
                  Votlio
                </h1>
                <p className="text-sm text-muted-foreground">
                  Politik spielerisch lernen
                </p>
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 sm:mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">
            Kapitel
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{topic.title}</span>
        </div>

        {/* Topic header */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-start gap-4 sm:gap-6 mb-6">
            <div className="text-5xl sm:text-6xl">{topic.icon}</div>
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-3">
                {topic.title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                {topic.description}
              </p>
            </div>
          </div>
        </section>

        {/* Learning stages */}
        <section>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
            Lernstufen
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {availableStages.map((stage) => {
              const chapter = getChaptersForTopicAndStage(topicId, stage.id);
              const firstChapter = chapter[0];

              if (!firstChapter) return null;

              return (
                <Link
                  key={stage.id}
                  to={`/chapter/${firstChapter.id}`}
                >
                  <div className="card-interactive h-full flex flex-col hover:shadow-lg hover:scale-105 cursor-pointer group relative">
                    {/* Completion Badge */}
                    {isLevelCompleted(firstChapter.id) && (
                      <div className="absolute top-3 right-3 flex items-center gap-1">
                        {isPerfectCompletion(firstChapter.id) ? (
                          <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                            <Trophy className="w-3 h-3" />
                            100%
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            Abgeschlossen
                          </div>
                        )}
                      </div>
                    )}

                    {/* Stage label */}
                    <div className="mb-4">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground">
                        {stage.label}
                      </h4>
                      <div className="h-1 w-12 bg-blue-600 rounded-full mt-2" />
                    </div>

                    {/* Description based on stage */}
                    <p className="text-sm text-muted-foreground flex-1 mb-4">
                      {stage.id === "grundlagen" &&
                        "Lerne die Grundlagen dieses Themas."}
                      {stage.id === "anwendung" &&
                        "Wende dein Wissen praktisch an."}
                      {stage.id === "vertiefung" &&
                        "Vertiefe dein Verständnis weiter."}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <span>
                        {firstChapter.explanationCards.length} Erklärungen
                      </span>
                      <span>{firstChapter.situations.length} Fragen</span>
                    </div>

                    {/* Start button */}
                    <button className="w-full flex items-center justify-center gap-2 group-hover:gap-3 transition-all px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl shadow-md hover:shadow-lg active:scale-95">
                      Beginnen
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>

          {availableStages.length === 0 && (
            <div className="card-interactive text-center py-12">
              <p className="text-muted-foreground">
                Keine Lernstufen für dieses Thema verfügbar.
              </p>
            </div>
          )}
        </section>

        {/* Back button */}
        <div className="mt-12 sm:mt-16">
          <Link to="/">
            <button className="btn-secondary flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Zurück zu den Kapiteln
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
