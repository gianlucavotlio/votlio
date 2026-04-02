import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border mt-12 sm:mt-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2026 Votlio
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/impressum"
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Impressum
            </Link>
            <Link
              to="/datenschutz"
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
