import { Link } from "react-router-dom";
import { topics } from "@/lib/sampleData";
import { ChevronRight, LogOut, Trophy } from "lucide-react";
import { useProgress } from "@/lib/useProgress";
import { useAuth } from "@/lib/useAuth";
import { useNavigate } from "react-router-dom";
import { UserStats } from "@/components/UserStats";
import { GuestModeBanner } from "@/components/GuestModeBanner";

export default function Home() {
  const { progress, isLoaded } = useProgress();
  const { user, isGuest, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Guest Mode Banner */}
      <GuestModeBanner isGuest={isGuest} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="text-3xl sm:text-4xl flex-shrink-0">🏛️</div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-3xl font-bold text-primary truncate">
                  Votlio
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Politik spielerisch lernen
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-6 flex-wrap justify-end">
              <UserStats />
              <div className="flex items-center gap-1 sm:gap-3">
                <Link
                  to="/leaderboard"
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg hover:bg-primary/10 text-primary transition-colors"
                  title="Leaderboard"
                >
                  <Trophy className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Leaderboard</span>
                </Link>
                <Link
                  to="/political-test"
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg hover:bg-primary/10 text-primary transition-colors"
                  title="Politischer Selbsttest"
                >
                  <span className="text-base flex-shrink-0">📊</span>
                  <span className="hidden sm:inline">Test</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg hover:bg-red-50 text-red-600 transition-colors flex-shrink-0"
                  title="Abmelden"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Abmelden</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero section */}
        <section className="mb-12 sm:mb-16 px-2 sm:px-0">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-4">
              Willkommen!
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Lerne Politik spielerisch. Wähle ein Thema und erweitere dein Wissen.
            </p>
          </div>

          {/* Stats preview */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 max-w-xs mx-auto">
            <div className="card-interactive text-center">
              <div className="text-xl sm:text-3xl font-bold text-primary">
                {topics.length}
              </div>
              <p className="text-xs text-muted-foreground">Themen</p>
            </div>
            <div className="card-interactive text-center">
              <div className="text-xl sm:text-3xl font-bold text-primary">
                ∞
              </div>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
          </div>
        </section>

        {/* Political Test Premium Section */}
        <section className="mb-20 sm:mb-48 mt-16 sm:mt-48 py-8 sm:py-24 px-2 sm:px-0">
          <div className="bg-gradient-to-b from-[#f5f3ff] to-[#f9fafb] rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 p-6 sm:p-12 lg:p-16">
              {/* Left: Axes Graphic */}
              <div className="flex items-center justify-center hidden sm:flex">
                <div className="w-full aspect-square max-w-sm flex items-center justify-center">
                  <svg
                    viewBox="-100 -100 500 500"
                    className="w-full h-full text-gray-300"
                    style={{ opacity: 0.8 }}
                  >
                    {/* Background subtle grid */}
                    <defs>
                      <linearGradient
                        id="axisGradientH"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" style={{ stopColor: "#ef4444" }} />
                        <stop offset="50%" style={{ stopColor: "#d1d5db" }} />
                        <stop offset="100%" style={{ stopColor: "#10b981" }} />
                      </linearGradient>
                      <linearGradient
                        id="axisGradientV"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" style={{ stopColor: "#f59e0b" }} />
                        <stop offset="50%" style={{ stopColor: "#d1d5db" }} />
                        <stop offset="100%" style={{ stopColor: "#3b82f6" }} />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Horizontal axis */}
                    <line
                      x1="30"
                      y1="150"
                      x2="270"
                      y2="150"
                      stroke="url(#axisGradientH)"
                      strokeWidth="2.5"
                    />

                    {/* Vertical axis */}
                    <line
                      x1="150"
                      y1="30"
                      x2="150"
                      y2="270"
                      stroke="url(#axisGradientV)"
                      strokeWidth="2.5"
                    />

                    {/* Center dot with subtle glow */}
                    <circle cx="150" cy="150" r="6" fill="#10b981" filter="url(#glow)" opacity="0.9" />

                    {/* Subtle grid lines */}
                    <line
                      x1="30"
                      y1="90"
                      x2="270"
                      y2="90"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="30"
                      y1="210"
                      x2="270"
                      y2="210"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="90"
                      y1="30"
                      x2="90"
                      y2="270"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="210"
                      y1="30"
                      x2="210"
                      y2="270"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />

                    {/* Axis labels - minimal and clean */}
                    <text
                      x="15"
                      y="157"
                      fontSize="13"
                      fill="#111827"
                      textAnchor="end"
                      fontWeight="600"
                    >
                      Wirtschaftlich
                    </text>
                    <text
                      x="15"
                      y="172"
                      fontSize="13"
                      fill="#111827"
                      textAnchor="end"
                      fontWeight="600"
                    >
                      links
                    </text>
                    <text
                      x="285"
                      y="157"
                      fontSize="13"
                      fill="#111827"
                      textAnchor="start"
                      fontWeight="600"
                    >
                      Marktwirtschaftlich
                    </text>
                    <text
                      x="153"
                      y="15"
                      fontSize="13"
                      fill="#111827"
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      Progressiv
                    </text>
                    <text
                      x="153"
                      y="295"
                      fontSize="13"
                      fill="#111827"
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      Konservativ
                    </text>
                  </svg>
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#111827] mb-4 sm:mb-6 leading-snug">
                  Wo stehst du<br />
                  politisch wirklich?
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-[#6b7280] mb-6 sm:mb-10 leading-relaxed">
                  20 präzise Aussagen.<br />
                  Kein Ranking. Keine XP. Nur Orientierung.
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-10">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-[#f3f4f6] rounded-full border border-gray-300 h-auto sm:h-12">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                      20 Fragen
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-[#f3f4f6] rounded-full border border-gray-300 h-auto sm:h-12">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                      3 Min
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-[#f3f4f6] rounded-full border border-gray-300 h-auto sm:h-12">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Wissenschaftlich
                    </span>
                  </div>
                </div>

                {/* Primary button */}
                <div className="mb-4">
                  <Link to="/political-test" className="inline-block w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white font-semibold rounded-[14px] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl min-h-[48px] sm:min-h-[56px] flex items-center justify-center gap-2 text-base sm:text-lg">
                      🧭 Position bestimmen
                    </button>
                  </Link>
                </div>

                {/* Trust notice */}
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  🔒 Dein Ergebnis bleibt privat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Topics grid */}
        <section className="mt-16 sm:mt-28 px-2 sm:px-0">
          <div className="mb-8 sm:mb-16">
            <h3 className="text-2xl sm:text-4xl font-bold text-[#111827] mb-2 sm:mb-3">
              Themenbereiche
            </h3>
            <p className="text-sm sm:text-lg text-gray-600">
              Wähle ein Thema und vertiefe dein Wissen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topics.map((topic) => (
              <Link key={topic.id} to={`/topic/${topic.id}`}>
                <div className="card-interactive h-full flex flex-col hover:shadow-2xl hover:scale-105 cursor-pointer group bg-white border border-gray-100 p-4 sm:p-6 lg:p-8 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-4 sm:mb-6 lg:mb-8">
                    <div className="text-5xl sm:text-6xl lg:text-7xl">{topic.icon}</div>
                  </div>

                  {/* Content */}
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111827] mb-2 sm:mb-3 leading-tight">
                    {topic.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 flex-1 mb-4 sm:mb-6 leading-relaxed">
                    {topic.description}
                  </p>

                  {/* View button */}
                  <button className="btn-primary w-full flex items-center justify-center gap-2 group-hover:gap-3 transition-all py-2 sm:py-3 lg:py-4 font-semibold text-sm sm:text-base">
                    Ansehen
                    <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border px-2 sm:px-0">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">
            So funktioniert Votlio
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                number: "1",
                title: "Thema wählen",
                description: "Starte mit deinem Interessensgebiet",
              },
              {
                number: "2",
                title: "Lernstufe wählen",
                description: "Wähle Grundlagen, Anwendung oder Vertiefung",
              },
              {
                number: "3",
                title: "Lernen & Üben",
                description: "Lese Erklärungen und beantworte Fragen",
              },
              {
                number: "4",
                title: "Ergebnis sehen",
                description: "Überprüfe deine Punkte und Fortschritt",
              },
            ].map((step) => (
              <div key={step.number} className="card-interactive text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg sm:text-xl mx-auto mb-3 sm:mb-4">
                  {step.number}
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            © 2026 Votlio
          </p>
        </div>
      </footer>
    </div>
  );
}
