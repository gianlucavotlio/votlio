import { Link } from 'react-router-dom';
import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface GuestModeBannerProps {
  isGuest: boolean;
}

export const GuestModeBanner = ({ isGuest }: GuestModeBannerProps) => {
  const [isClosed, setIsClosed] = useState(false);

  if (!isGuest || isClosed) {
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
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/auth"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm rounded transition-colors"
          >
            Anmelden
          </Link>
          <button
            onClick={() => setIsClosed(true)}
            className="p-1.5 hover:bg-amber-200 text-amber-700 rounded transition-colors"
            aria-label="Banner schließen"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
