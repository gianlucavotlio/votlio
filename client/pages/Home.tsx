import { Link } from "react-router-dom";
import { topics } from "@/lib/sampleData";
import { ChevronRight, Trophy } from "lucide-react";
import { useProgress } from "@/lib/useProgress";
import { useAuth } from "@/lib/useAuth";
import { UserStats } from "@/components/UserStats";
import { GuestModeBanner } from "@/components/GuestModeBanner";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { UserProfileContext } from "@/contexts/UserProfileContext";
import { useContext } from "react";

export default function Home() {
  const { progress, isLoaded } = useProgress();
  const { user, isGuest } = useAuth();
  const userProfile = useContext(UserProfileContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Guest Mode Banner */}
      <GuestModeBanner isGuest={isGuest} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="text-3xl sm:text-4xl flex-shrink-0">🏛️</div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-3xl font-bold text-blue-600 truncate">
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
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                  title="Leaderboard"
                >
                  <Trophy className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Leaderboard</span>
                </Link>
                <Link
                  to="/political-test"
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                  title="Politischer Selbsttest"
                >
                  <span className="text-base flex-shrink-0">📊</span>
                  <span className="hidden sm:inline">Test</span>
                </Link>
                <ProfileDropdown />
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto">
            <div className="card-interactive text-center">
              <div className="text-xl sm:text-3xl font-bold text-blue-600">
                {topics.length}
              </div>
              <p className="text-xs text-muted-foreground">Themen</p>
            </div>
            <div className="card-interactive text-center">
              <div className="text-xl sm:text-3xl font-bold text-blue-600">
                {isGuest ? "∞" : userProfile?.profile?.xp || 0}
              </div>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
            <div className="card-interactive text-center">
              <UserStats />
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
                      <tspan x="285" dy="0">Markt-</tspan>
                      <tspan x="285" dy="16">wirtschaftlich</tspan>
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
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl min-h-[48px] sm:min-h-[56px] flex items-center justify-center gap-2 text-base sm:text-lg">
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
                  <button className="w-full flex items-center justify-center gap-2 group-hover:gap-3 transition-all py-2 sm:py-3 lg:py-4 px-4 font-semibold text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg active:scale-95">
                    Ansehen
                    <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Term Matching Game Section */}
        <section className="mb-12 sm:mb-16 mt-16 sm:mt-28 py-8 sm:py-16 px-2 sm:px-0">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-12 lg:p-16 items-center">
              {/* Left: Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-snug">
                  🎓 Fachbegriffe<br />
                  lernen
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-10 leading-relaxed">
                  Ordne politische Begriffe ihren Definitionen zu und meistere drei Level voller Herausforderungen.
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-10">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-white/20 rounded-full backdrop-blur h-auto sm:h-12">
                    <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                      3 Level
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-white/20 rounded-full backdrop-blur h-auto sm:h-12">
                    <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                      XP Rewards
                    </span>
                  </div>
                </div>

                {/* Primary button */}
                <div className="mb-4">
                  <Link to="/term-matching" className="inline-block w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl min-h-[48px] sm:min-h-[56px] flex items-center justify-center gap-2 text-base sm:text-lg">
                      Zum Spiel
                      <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right: Illustration */}
              <div className="flex items-center justify-center hidden lg:flex">
                <div className="text-7xl">📚</div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works - Compact version */}
        <section className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border px-2 sm:px-0">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-5">
            So funktioniert Votlio
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                number: "1",
                title: "Thema wählen",
                description: "Starte mit deinem Interessensgebiet",
              },
              {
                number: "2",
                title: "Lernstufe wählen",
                description: "Wähle Grundlagen oder Vertiefung",
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
              <div key={step.number} className="card-interactive text-center p-2 sm:p-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-base mx-auto mb-2 shadow-sm">
                  {step.number}
                </div>
                <h4 className="font-semibold text-foreground mb-1 text-xs sm:text-sm leading-tight">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-snug">
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
