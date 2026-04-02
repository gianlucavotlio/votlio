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
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200 px-4 sm:px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-lg flex-shrink-0">🎭</span>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Gastmodus</span> – melde dich an, um XP, Rang und Fortschritt zu speichern.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/auth"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Anmelden
          </Link>
          <button
            onClick={() => setIsClosed(true)}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg transition-colors duration-200"
            aria-label="Banner schließen"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
