import { Link } from "react-router-dom";
import { ChevronLeft, Settings } from "lucide-react";

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Admin Panel
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <div className="text-6xl mb-4">🔧</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Admin Panel in Entwicklung
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Hier können zukünftig Kapitel, Situationen und Fragen verwaltet werden.
            </p>
          </div>

          <div className="card-interactive bg-primary/5 border-primary/20 mb-8">
            <p className="text-foreground font-semibold mb-3">
              Folgende Features werden implementiert:
            </p>
            <ul className="text-left space-y-2 text-muted-foreground text-sm">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Kapitel erstellen und bearbeiten</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Erklärungskarten hinzufügen und ändern</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Situationen und Fragen verwalten</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Antwortoptionen mit XP und Pfad-Zuordnung</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Statistiken und Nutzer-Analysen anzeigen</span>
              </li>
            </ul>
          </div>

          <Link to="/" className="btn-primary">
            Zur Startseite
          </Link>
        </div>
      </main>
    </div>
  );
}
