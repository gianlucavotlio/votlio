import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, BarChart3 } from 'lucide-react';
import { GuestModeBanner } from '@/components/GuestModeBanner';
import { useAuth } from '@/lib/useAuth';

interface TestQuestion {
  id: number;
  text: string;
  category: 'wirtschaft' | 'gesellschaft';
}

const questions: TestQuestion[] = [
  // Wirtschaft (1-10)
  { id: 1, text: 'Der Staat sollte hohe Vermögen stärker besteuern.', category: 'wirtschaft' },
  { id: 2, text: 'Der Markt regelt wirtschaftliche Prozesse effizienter als der Staat.', category: 'wirtschaft' },
  { id: 3, text: 'Soziale Ungleichheit sollte aktiv reduziert werden.', category: 'wirtschaft' },
  { id: 4, text: 'Staatliche Unternehmen sollten privatisiert werden.', category: 'wirtschaft' },
  { id: 5, text: 'Ein starker Sozialstaat ist wichtiger als niedrige Steuern.', category: 'wirtschaft' },
  { id: 6, text: 'Mindestlohn sollte regelmäßig erhöht werden.', category: 'wirtschaft' },
  { id: 7, text: 'Unternehmen sollten weniger staatliche Regulierung erfahren.', category: 'wirtschaft' },
  { id: 8, text: 'Der Staat sollte strategisch wichtige Industrien schützen.', category: 'wirtschaft' },
  { id: 9, text: 'Erbschaften sollten hoch besteuert werden.', category: 'wirtschaft' },
  { id: 10, text: 'Wettbewerb ist wichtiger als staatliche Umverteilung.', category: 'wirtschaft' },
  
  // Gesellschaft (11-20)
  { id: 11, text: 'Traditionelle Werte sollten stärker geschützt werden.', category: 'gesellschaft' },
  { id: 12, text: 'Migration bereichert die Gesellschaft kulturell und wirtschaftlich.', category: 'gesellschaft' },
  { id: 13, text: 'Der Staat sollte sich aus moralischen Fragen weitgehend heraushalten.', category: 'gesellschaft' },
  { id: 14, text: 'Innere Sicherheit ist wichtiger als maximale persönliche Freiheit.', category: 'gesellschaft' },
  { id: 15, text: 'Gleichstellungspolitik sollte stärker gefördert werden.', category: 'gesellschaft' },
  { id: 16, text: 'Klimaschutz sollte Vorrang vor Wirtschaftswachstum haben.', category: 'gesellschaft' },
  { id: 17, text: 'Nationale Identität ist ein wichtiger Bestandteil politischer Ordnung.', category: 'gesellschaft' },
  { id: 18, text: 'Vielfalt in der Gesellschaft sollte aktiv gefördert werden.', category: 'gesellschaft' },
  { id: 19, text: 'Der Staat sollte religiöse Einflüsse aus Politik heraushalten.', category: 'gesellschaft' },
  { id: 20, text: 'Strenge Gesetze sorgen für mehr gesellschaftliche Stabilität.', category: 'gesellschaft' },
];

const getScaleLabel = (value: number) => {
  switch (value) {
    case -2:
      return 'Stark nicht';
    case -1:
      return 'Nicht';
    case 0:
      return 'Neutral';
    case 1:
      return 'Ja';
    case 2:
      return 'Stark ja';
    default:
      return '';
  }
};

const getWirtschaftInterpretation = (score: number) => {
  if (score >= 8) {
    return {
      title: 'Deutlich sozialstaatlich 🤝',
      description: 'Du befürwortest einen starken Staat mit aktiver Umverteilung und Regulierung.',
      color: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
    };
  }
  if (score >= -7) {
    return {
      title: 'Moderat / Gemischt ⚖️',
      description: 'Du erkennst die Vorteile beider Systeme und befürwortest einen ausgewogenen Mix.',
      color: 'from-blue-50 to-purple-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
    };
  }
  return {
    title: 'Deutlich marktwirtschaftlich 💼',
    description: 'Du vertraust mehr auf Marktkräfte und minimale staatliche Einmischung.',
    color: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
  };
};

const getGesellschaftInterpretation = (score: number) => {
  if (score >= 8) {
    return {
      title: 'Liberal / Progressiv 🌈',
      description: 'Du befürwortest offene Gesellschaft, Vielfalt und progressive Werte.',
      color: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
    };
  }
  if (score >= -7) {
    return {
      title: 'Moderat 🤲',
      description: 'Du hältst die Balance zwischen Tradition und Fortschritt.',
      color: 'from-cyan-50 to-blue-50',
      borderColor: 'border-cyan-200',
      textColor: 'text-cyan-700',
    };
  }
  return {
    title: 'Konservativ 🏛️',
    description: 'Du legst Wert auf Stabilität, Tradition und bewährte Ordnungen.',
    color: 'from-gray-50 to-slate-50',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-700',
  };
};

export default function PoliticalTest() {
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateResults = () => {
    const wirtschaftScore = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce(
      (sum, id) => sum + (answers[id] || 0),
      0
    );

    const gesellschaftScore = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].reduce(
      (sum, id) => sum + (answers[id] || 0),
      0
    );

    return { wirtschaftScore, gesellschaftScore };
  };

  const allAnswered = Object.keys(answers).length === 20;
  const { wirtschaftScore, gesellschaftScore } = calculateResults();
  const wirtschaftInterpretation = getWirtschaftInterpretation(wirtschaftScore);
  const gesellschaftInterpretation = getGesellschaftInterpretation(gesellschaftScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <GuestModeBanner isGuest={isGuest} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Zurück</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="text-3xl">📊</div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                Politischer Selbsttest
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Beantworte 20 Aussagen und finde heraus, wo du politisch stehst.
                Dieser Test hat keinen Einfluss auf XP, Rang oder Level.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        {!showResults ? (
          <div>
            {/* Wirtschaft Section */}
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="text-2xl">💼</div>
                <h2 className="text-2xl font-bold text-foreground">Wirtschaft</h2>
              </div>

              <div className="space-y-6">
                {questions.filter(q => q.category === 'wirtschaft').map((question) => (
                  <div key={question.id} className="card-interactive p-4 sm:p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                        {question.id}
                      </div>
                      <p className="text-foreground font-medium flex-1 pt-1">
                        {question.text}
                      </p>
                    </div>

                    {/* Slider */}
                    <div className="px-2">
                      <input
                        type="range"
                        min="-2"
                        max="2"
                        step="1"
                        value={answers[question.id] ?? 0}
                        onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-red-400 via-gray-300 to-green-400 rounded-lg appearance-none cursor-pointer accent-primary"
                      />

                      {/* Scale Labels */}
                      <div className="flex justify-between text-xs text-muted-foreground mt-3">
                        <span>Stark nicht</span>
                        <span>Nicht</span>
                        <span>Neutral</span>
                        <span>Ja</span>
                        <span>Stark ja</span>
                      </div>

                      {/* Current Value */}
                      {answers[question.id] !== undefined && (
                        <div className="text-center mt-2">
                          <span className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${
                            answers[question.id] > 0
                              ? 'bg-green-100 text-green-700'
                              : answers[question.id] < 0
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {getScaleLabel(answers[question.id])}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gesellschaft Section */}
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="text-2xl">🌍</div>
                <h2 className="text-2xl font-bold text-foreground">Gesellschaft</h2>
              </div>

              <div className="space-y-6">
                {questions.filter(q => q.category === 'gesellschaft').map((question) => (
                  <div key={question.id} className="card-interactive p-4 sm:p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                        {question.id}
                      </div>
                      <p className="text-foreground font-medium flex-1 pt-1">
                        {question.text}
                      </p>
                    </div>

                    {/* Slider */}
                    <div className="px-2">
                      <input
                        type="range"
                        min="-2"
                        max="2"
                        step="1"
                        value={answers[question.id] ?? 0}
                        onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-red-400 via-gray-300 to-green-400 rounded-lg appearance-none cursor-pointer accent-primary"
                      />

                      {/* Scale Labels */}
                      <div className="flex justify-between text-xs text-muted-foreground mt-3">
                        <span>Stark nicht</span>
                        <span>Nicht</span>
                        <span>Neutral</span>
                        <span>Ja</span>
                        <span>Stark ja</span>
                      </div>

                      {/* Current Value */}
                      {answers[question.id] !== undefined && (
                        <div className="text-center mt-2">
                          <span className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${
                            answers[question.id] > 0
                              ? 'bg-green-100 text-green-700'
                              : answers[question.id] < 0
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {getScaleLabel(answers[question.id])}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Results Button */}
            <div className="flex gap-3 mb-12">
              <button
                onClick={() => setShowResults(true)}
                disabled={!allAnswered}
                className={`flex-1 py-3 sm:py-4 font-semibold rounded-lg transition-all ${
                  allAnswered
                    ? 'btn-primary'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {allAnswered ? 'Ergebnis anzeigen' : `${20 - Object.keys(answers).length} noch zu beantworten`}
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary px-6 py-3 sm:py-4 font-semibold"
              >
                Abbrechen
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Results Premium Card */}
            <div className="bg-white rounded-[20px] shadow-xl overflow-hidden p-8 sm:p-12 mb-8 animate-in fade-in duration-500">
              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl font-bold text-[#111827] mb-12 text-center">
                Dein politisches Profil
              </h2>

              {/* Content Grid */}
              <div className="space-y-12">
                {/* Axes Diagram - Large Centered */}
                <div className="flex items-center justify-center mb-8">
                  <div className="w-full aspect-square max-w-3xl flex items-center justify-center">
                    <svg
                      viewBox="-150 -100 550 500"
                      className="w-full h-full"
                      style={{ opacity: 1 }}
                    >
                      {/* Definitions */}
                      <defs>
                        <linearGradient
                          id="resultAxisH"
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
                          id="resultAxisV"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" style={{ stopColor: "#f59e0b" }} />
                          <stop offset="50%" style={{ stopColor: "#d1d5db" }} />
                          <stop offset="100%" style={{ stopColor: "#3b82f6" }} />
                        </linearGradient>
                        <filter id="resultGlow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        <style>
                          {`
                            @keyframes slideIn {
                              from {
                                opacity: 0;
                                transform: scale(0.8);
                              }
                              to {
                                opacity: 1;
                                transform: scale(1);
                              }
                            }
                            .result-point {
                              animation: slideIn 0.6s ease-out 0.3s both;
                            }
                          `}
                        </style>
                      </defs>

                      {/* Axes */}
                      <line x1="30" y1="150" x2="270" y2="150" stroke="url(#resultAxisH)" strokeWidth="3" />
                      <line x1="150" y1="30" x2="150" y2="270" stroke="url(#resultAxisV)" strokeWidth="3" />

                      {/* Grid */}
                      <line x1="30" y1="90" x2="270" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="30" y1="210" x2="270" y2="210" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="90" y1="30" x2="90" y2="270" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="210" y1="30" x2="210" y2="270" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />

                      {/* Data Point - animated */}
                      <circle
                        className="result-point"
                        cx={150 + (wirtschaftScore / 20) * 120}
                        cy={150 - (gesellschaftScore / 20) * 120}
                        r="14"
                        fill="#6366f1"
                        filter="url(#resultGlow)"
                        opacity="0.95"
                      />

                      {/* Labels */}
                      <text x="10" y="157" fontSize="15" fill="#111827" textAnchor="end" fontWeight="700">
                        Wirtschaftlich
                      </text>
                      <text x="10" y="172" fontSize="15" fill="#111827" textAnchor="end" fontWeight="700">
                        links
                      </text>
                      <text x="305" y="157" fontSize="15" fill="#111827" textAnchor="start" fontWeight="700">
                        Marktwirtschaftlich
                      </text>
                      <text x="153" y="12" fontSize="15" fill="#111827" textAnchor="middle" fontWeight="700">
                        Progressiv
                      </text>
                      <text x="153" y="298" fontSize="15" fill="#111827" textAnchor="middle" fontWeight="700">
                        Konservativ
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Interpretations Grid - Below Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Wirtschaft */}
                  <div>
                    <h3 className="text-xl font-bold text-[#111827] mb-3">
                      Wirtschaftlich:
                    </h3>
                    <h4 className={`text-2xl font-bold mb-3 ${wirtschaftInterpretation.textColor}`}>
                      {wirtschaftInterpretation.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {wirtschaftInterpretation.description}
                    </p>
                    <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
                      <span className="font-semibold text-gray-800">
                        Score: {wirtschaftScore > 0 ? '+' : ''}{wirtschaftScore}/20
                      </span>
                    </div>
                  </div>

                  {/* Gesellschaft */}
                  <div>
                    <h3 className="text-xl font-bold text-[#111827] mb-3">
                      Gesellschaftlich:
                    </h3>
                    <h4 className={`text-2xl font-bold mb-3 ${gesellschaftInterpretation.textColor}`}>
                      {gesellschaftInterpretation.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {gesellschaftInterpretation.description}
                    </p>
                    <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
                      <span className="font-semibold text-gray-800">
                        Score: {gesellschaftScore > 0 ? '+' : ''}{gesellschaftScore}/20
                      </span>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="text-sm text-gray-600 mt-8 pt-6 border-t border-gray-200">
                    <p>
                      💡 <strong>Interpretation:</strong> Dein Punkt auf der Grafik zeigt deine Position im zweidimensionalen politischen Raum.
                      Je weiter rechts, desto marktwirtschaftlicher; je weiter oben, desto progressiver.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="card-interactive bg-blue-50 border border-blue-200 p-4 sm:p-6 mb-8">
              <p className="text-sm text-blue-900">
                ℹ️ <strong>Hinweis:</strong> Dieser Test speichert keine Daten und hat keinen Einfluss auf dein XP, Rang oder Level.
                Die Ergebnisse sind nur zur persönlichen Orientierung gedacht.
              </p>
            </div>

            {/* Action Button */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowResults(false);
                  setAnswers({});
                }}
                className="btn-primary py-3 sm:py-4 font-semibold text-lg"
              >
                🧭 Test erneut machen
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary py-3 sm:py-4 font-semibold"
              >
                Zur Startseite
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
