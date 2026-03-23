import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";
import { useEffect } from "react";

export default function Onboarding() {
  const navigate = useNavigate();
  const { isGuest } = useAuth();

  useEffect(() => {
    // Check if onboarding is already done
    const onboardingDone = localStorage.getItem("votlio_onboarding_done") === "true";
    console.log("Onboarding check - Done:", onboardingDone);

    if (onboardingDone) {
      // If already done, redirect to home
      console.log("Onboarding already done, redirecting to home");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleStartClick = () => {
    console.log("Setting onboarding flag and navigating to home");
    localStorage.setItem("votlio_onboarding_done", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-8">
      {/* Centered Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-[20px] shadow-xl sm:shadow-2xl p-6 sm:p-8 lg:p-16 animate-in fade-in slide-in-from-bottom duration-500">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] mb-2 text-center">
          Willkommen bei Votlio
        </h1>
        <div className="text-4xl sm:text-5xl text-center mb-6 sm:mb-8">👋</div>

        {/* Explanation Text */}
        <p className="text-base sm:text-lg text-gray-700 text-center mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto">
          Votlio hilft dir, Politik spielerisch zu verstehen. Wähle ein Kapitel, beantworte Fragen und sammle Wissen.
        </p>

        {/* Features List */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 border border-purple-200">
          <ul className="space-y-3 sm:space-y-4">
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl flex-shrink-0">📚</span>
              <span className="text-sm sm:text-base text-gray-800">
                <strong className="text-gray-900">Kapitel auswählen</strong> – Erkunde Themen
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl flex-shrink-0">❓</span>
              <span className="text-sm sm:text-base text-gray-800">
                <strong className="text-gray-900">Fragen beantworten</strong> – Teste dein Wissen
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl flex-shrink-0">🎓</span>
              <span className="text-sm sm:text-base text-gray-800">
                <strong className="text-gray-900">Wissen vertiefen</strong> – Lerne Zusammenhänge
              </span>
            </li>
            {!isGuest && (
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl flex-shrink-0">⭐</span>
                <span className="text-sm sm:text-base text-gray-800">
                  <strong className="text-gray-900">XP sammeln</strong> – Steige auf & erreiche Ränge
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Guest Mode Notice */}
        {isGuest && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm text-amber-900">
              <span className="font-semibold">💡 Gastmodus:</span> Deine Fortschritte werden nicht gespeichert. Melde dich an für XP!
            </p>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={handleStartClick}
          type="button"
          className="w-full py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-base sm:text-lg rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
        >
          Los geht's 🚀
        </button>

        {/* Optional: Skip or Learn More Link */}
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
          Du kannst später einen{" "}
          <span className="text-purple-600 font-semibold cursor-pointer hover:underline">
            Selbsttest
          </span>{" "}
          machen, um deine politische Position zu bestimmen.
        </p>
      </div>
    </div>
  );
}
