import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface GuestModeBannerProps {
  isGuest: boolean;
}

export const GuestModeBanner = ({ isGuest }: GuestModeBannerProps) => {
  if (!isGuest) {
    return null;
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-3 sm:px-6 py-2.5 sm:py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 flex-shrink-0" />
          <p className="text-sm sm:text-base font-medium text-amber-800">
            🎮 Gastmodus – Melde dich an, um XP &amp; Rang zu bekommen
          </p>
        </div>
        <Link
          to="/auth"
          className="flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm rounded transition-colors"
        >
          Anmelden
        </Link>
      </div>
    </div>
  );
};
