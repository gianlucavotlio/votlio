import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";

export default function Onboarding() {
  const navigate = useNavigate();
  const { isGuest } = useAuth();

  const handleStartClick = () => {
    // Navigate to auth (login/signup)
    navigate("/auth");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-white to-purple-50 flex flex-col px-4 sm:px-6 lg:px-8">
      {/* Top Section: Title & Emoji */}
      <div className="pt-12 sm:pt-16 lg:pt-20 text-center">
        <div className="text-6xl sm:text-7xl lg:text-8xl mb-4">👋</div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3">
          Willkommen bei Votlio
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Verstehe Politik spielerisch und sammle Wissen
        </p>
      </div>

      {/* Middle Section: Features List - Grows to fill space */}
      <div className="flex-1 flex items-center justify-center py-8 sm:py-12">
        <div className="w-full max-w-lg space-y-4">
          {/* Feature 1 */}
          <div className="bg-white bg-opacity-60 backdrop-blur rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-3xl sm:text-4xl flex-shrink-0">📚</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Kapitel auswählen
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Erkunde spannende Themen zur deutschen Politik
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white bg-opacity-60 backdrop-blur rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-3xl sm:text-4xl flex-shrink-0">❓</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Fragen beantworten
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Teste dein Wissen mit interaktiven Aufgaben
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white bg-opacity-60 backdrop-blur rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-3xl sm:text-4xl flex-shrink-0">🎓</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Wissen vertiefen
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Lerne Zusammenhänge und vertiefe dein Verständnis
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4 - XP */}
          {!isGuest && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-3xl sm:text-4xl flex-shrink-0">⭐</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    XP sammeln
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Steige in Ränge auf und erreiche neue Levels
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Guest Mode Warning */}
          {isGuest && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 sm:p-4 mt-2">
              <p className="text-xs sm:text-sm text-amber-900">
                <span className="font-semibold">💡 Tipp:</span> Melde dich an, um deine Fortschritte zu speichern und XP zu sammeln!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: CTA Button */}
      <div className="pb-8 sm:pb-12 lg:pb-16 space-y-3">
        <button
          onClick={handleStartClick}
          type="button"
          className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg sm:text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl active:scale-95 cursor-pointer"
        >
          Los geht's 🚀
        </button>
        <p className="text-center text-xs sm:text-sm text-gray-500">
          Du kannst später einen{" "}
          <span className="text-blue-600 font-semibold">Selbsttest</span>{" "}
          machen, um deine Position zu bestimmen
        </p>
      </div>
    </div>
  );
}
