import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { ProfileDropdown } from "@/components/ProfileDropdown";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🏛️</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
                  Votlio
                </h1>
                <p className="text-sm text-muted-foreground">
                  Politik spielerisch lernen
                </p>
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back button */}
        <div className="mb-8 sm:mb-12">
          <Link to="/">
            <button className="btn-secondary flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Zurück zur Startseite
            </button>
          </Link>
        </div>

        {/* Impressum content */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl font-bold text-blue-600 mb-8 sm:mb-12">
            Impressum
          </h1>

          {/* Section 1: Angaben gemäß TMG */}
          <section className="mb-8 sm:mb-12 pb-8 border-b border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              Gianluca Porta<br />
              Sieglindenstrasse 20A<br />
              86152 Augsburg<br />
              Deutschland
            </p>
          </section>

          {/* Section 2: Kontakt */}
          <section className="mb-8 sm:mb-12 pb-8 border-b border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              Kontakt
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              Telefon:{" "}
              <a
                href="tel:01758658909"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                01758658909
              </a>
              <br />
              E-Mail:{" "}
              <a
                href="mailto:gianluca.votlio@gmail.com"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                gianluca.votlio@gmail.com
              </a>
              <br />
              Website:{" "}
              <a
                href="https://votlio.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                https://votlio.de
              </a>
            </p>
          </section>

          {/* Section 3: Verantwortlich für Inhalt */}
          <section className="mb-8 sm:mb-12 pb-8 border-b border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              Gianluca Porta<br />
              Sieglindenstrasse 20A<br />
              86152 Augsburg
            </p>
          </section>

          {/* Section 4: Haftung für Inhalte */}
          <section className="mb-8 sm:mb-12 pb-8 border-b border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              Haftung für Inhalte
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 des TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
            </p>
          </section>

          {/* Section 5: Haftung für Links */}
          <section className="mb-8 sm:mb-12 pb-8 border-b border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              Haftung für Links
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Illegale Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
            </p>
          </section>

          {/* Section 6: Urheberrecht */}
          <section className="mb-8 sm:mb-12 pb-8 border-b border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              Urheberrecht
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Urhebers. Downloads und Kopien dieser Seite sind nur für private, nicht kommerzielle Nutzung gestattet.
            </p>
          </section>

          {/* Section 7: Quelle */}
          <section className="mb-8 sm:mb-12">
            <p className="text-sm text-muted-foreground">
              Template erstellt mit:{" "}
              <a
                href="https://www.e-recht24.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                https://www.e-recht24.de
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
