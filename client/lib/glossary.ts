/**
 * Glossary of key political and legal terms used in the learning cards.
 * Each term has a short, neutral, factual definition (1-2 sentences).
 */

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  verfassung: {
    id: "verfassung",
    term: "Verfassung",
    definition:
      "Ein Dokument, das die fundamentalen Gesetze und die Struktur eines Staates festlegt. In Deutschland ist das Grundgesetz die Verfassung.",
  },
  grundgesetz: {
    id: "grundgesetz",
    term: "Grundgesetz",
    definition:
      "Die Verfassung der Bundesrepublik Deutschland seit 1949. Sie regelt die Struktur des Staates und schützt Grundrechte.",
  },
  grundrechte: {
    id: "grundrechte",
    term: "Grundrechte",
    definition:
      "Unveräußerliche und unverletzliche Rechte, die jeden Menschen schützen. Dazu gehören Meinungsfreiheit, Religionsfreiheit, Recht auf Leben und körperliche Unversehrtheit.",
  },
  sozialstaat: {
    id: "sozialstaat",
    term: "Sozialstaat",
    definition:
      "Ein Staat, der sich um das Wohlergehen seiner Bürger kümmert durch Rente, Gesundheit, Arbeitslosenversicherung und Sozialhilfe.",
  },
  parlamentarische_demokratie: {
    id: "parlamentarische_demokratie",
    term: "parlamentarische Demokratie",
    definition:
      "Eine Regierungsform, in der das Volk durch Wahl von Abgeordneten regiert, die dann die Regierung wählen oder kontrollieren.",
  },
  staatshaushalt: {
    id: "staatshaushalt",
    term: "Staatshaushalt",
    definition:
      "Der Plan der Einnahmen und Ausgaben eines Staates für ein Jahr. Der Bundestag genehmigt den deutschen Bundeshaushalt.",
  },
  arbeitsmarktreform: {
    id: "arbeitsmarktreform",
    term: "Arbeitsmarktreform",
    definition:
      "Änderungen an den Regeln für Arbeitsverträge, Löhne und Arbeitslosenhilfe, um den Arbeitsmarkt zu verbessern.",
  },
  konstruktives_misstrauensvotum: {
    id: "konstruktives_misstrauensvotum",
    term: "konstruktives Misstrauensvotum",
    definition:
      "Ein Verfahren, bei dem der Bundestag einen Bundeskanzler abwählen kann, nur wenn er gleichzeitig einen neuen wählt.",
  },
  ausschuesse: {
    id: "ausschuesse",
    term: "Ausschüsse",
    definition:
      "Kleinere Gruppen von Abgeordneten im Bundestag, die sich mit speziellen Themen (Bildung, Gesundheit, etc.) befassen.",
  },
  foederalismus: {
    id: "foederalismus",
    term: "Föderalismus",
    definition:
      "Ein System, bei dem die Macht zwischen der Bundesregierung und den Bundesländern aufgeteilt ist.",
  },
  bundesrat: {
    id: "bundesrat",
    term: "Bundesrat",
    definition:
      "Die Kammer der deutschen Gesetzgebung, in der die 16 Bundesländer vertreten sind und bei vielen Gesetzen zustimmen müssen.",
  },
  bundesverfassungsgericht: {
    id: "bundesverfassungsgericht",
    term: "Bundesverfassungsgericht",
    definition:
      "Das oberste Gericht Deutschlands. Es überprüft, ob Gesetze und Handlungen verfassungsgemäß sind und kann Gesetze aufheben.",
  },
  ewigkeitsklausel: {
    id: "ewigkeitsklausel",
    term: "Ewigkeitsklausel",
    definition:
      "Ein Teil des Grundgesetzes, der festlegt, dass bestimmte Prinzipien (wie Menschenrechte und Föderalismus) niemals geändert werden dürfen.",
  },
  bundestag: {
    id: "bundestag",
    term: "Bundestag",
    definition:
      "Das nationale Parlament der Bundesrepublik Deutschland mit etwa 630-700 Abgeordneten. Es wählt den Bundeskanzler und verabschiedet Gesetze.",
  },
  gewaltenteilung: {
    id: "gewaltenteilung",
    term: "Gewaltenteilung",
    definition:
      "Die Aufteilung der staatlichen Macht in drei Bereiche: Legislative (Gesetzgebung), Exekutive (Ausführung) und Judikative (Rechtsprechung).",
  },
  bundesregierung: {
    id: "bundesregierung",
    term: "Bundesregierung",
    definition:
      "Die Exekutive Deutschlands, bestehend aus dem Bundeskanzler und den Bundesministern. Sie führt Gesetze aus und leitet die tägliche Verwaltung.",
  },
  bundeskanzler: {
    id: "bundeskanzler",
    term: "Bundeskanzler",
    definition:
      "Der Regierungschef Deutschlands. Er wird vom Bundestag gewählt, bestimmt die Politik und ernennt die Bundesminister.",
  },
  bundesminister: {
    id: "bundesminister",
    term: "Bundesminister",
    definition:
      "Mitglieder der Bundesregierung, die verschiedene Ressorts (Finanzen, Bildung, Verteidigung, etc.) leiten.",
  },
  koalition: {
    id: "koalition",
    term: "Koalition",
    definition:
      "Ein Bündnis zwischen zwei oder mehr Parteien, um zusammen eine Regierungsmehrheit im Bundestag zu bilden.",
  },
  ressortprinzip: {
    id: "ressortprinzip",
    term: "Ressortprinzip",
    definition:
      "Das Prinzip, dass jeder Bundesminister sein Ministerium unabhängig leitet, ohne Einmischung anderer Minister.",
  },
  kollegialprinzip: {
    id: "kollegialprinzip",
    term: "Kollegialprinzip",
    definition:
      "Das Prinzip, dass das Kabinett (alle Minister zusammen) bei Streit zwischen Ministern gemeinsam entscheidet.",
  },
  gesetz: {
    id: "gesetz",
    term: "Gesetz",
    definition:
      "Eine von der Legislative (Bundestag und Bundesrat) beschlossene rechtliche Regel, die für alle Bürger bindend ist.",
  },
  fraktion: {
    id: "fraktion",
    term: "Fraktion",
    definition:
      "Eine Gruppe von Abgeordneten derselben Partei im Bundestag. Fraktionen koordinieren Abstimmungen und Verhandlungen.",
  },
  direktmandate: {
    id: "direktmandate",
    term: "Direktmandate",
    definition:
      "Sitze im Bundestag, die ein Kandidat durch die Erststimme direkt im Wahlkreis gewinnt. Eine Partei kann in den Bundestag einziehen, auch ohne die 5%-Hürde zu erreichen, wenn sie mindestens 3 Direktmandate hat.",
  },
  uberhangmandate: {
    id: "uberhangmandate",
    term: "Überhangmandate",
    definition:
      "Zusätzliche Sitze im Bundestag, die eine Partei erhielt, wenn sie mehr Direktmandate gewann als ihr nach der Zweitstimmen-Quote zustand. Dieses System wurde 2023 abgeschafft—seit 2025 gibt es keine Überhangmandate mehr.",
  },
  ausgleichsmandate: {
    id: "ausgleichsmandate",
    term: "Ausgleichsmandate",
    definition:
      "Zusätzliche Sitze im Bundestag, die andere Parteien erhielten, um die Proportionalität zu wahren, wenn eine Partei Überhangmandate bekam. Dieses System wurde 2023 abgeschafft—der Bundestag hat seit 2025 genau 630 Sitze.",
  },
  zweitstimmen: {
    id: "zweitstimmen",
    term: "Zweitstimmen",
    definition:
      "Die zweite Stimme bei Bundestagswahlen. Sie bestimmt die Sitzverteilung der Parteien im Bundestag nach der Anzahl der Prozentanteile. Die Sitzverteilung richtet sich nach den Zweitstimmen proportional auf alle Parteien.",
  },
  gesetzgebungsprozess: {
    id: "gesetzgebungsprozess",
    term: "Gesetzgebungsprozess",
    definition:
      "Der Prozess, durch den Gesetze im Bundestag entstehen. Ein Gesetzentwurf wird in drei Lesungen debattiert und abgestimmt, dann vom Bundesrat überprüft und schließlich vom Bundespräsidenten unterzeichnet.",
  },
  exekutive: {
    id: "exekutive",
    term: "Exekutive",
    definition:
      "Die ausführende Gewalt eines Staates. Sie setzt Gesetze um und führt die tägliche Verwaltung. In Deutschland ist die Bundesregierung die Exekutive.",
  },
  zustimmungsgesetze: {
    id: "zustimmungsgesetze",
    term: "Zustimmungsgesetze",
    definition:
      "Gesetze, bei denen der Bundesrat zustimmen muss. Der Bundesrat kann diese Gesetze blockieren, wenn er sie nicht billigt. Dazu gehören Gesetze zu Verfassungsänderungen, Föderalismus und Finanzausgleich.",
  },
  einspruchsgesetze: {
    id: "einspruchsgesetze",
    term: "Einspruchsgesetze",
    definition:
      "Gesetze, bei denen der Bundesrat nur Einspruch erheben kann, ihn aber nicht blockieren kann. Der Bundestag kann das Einspruchsgesetz mit einfacher Mehrheit verabschieden, ohne die Zustimmung des Bundesrats zu brauchen.",
  },
};

export const getGlossaryTerm = (termId: string): GlossaryTerm | undefined => {
  return GLOSSARY_TERMS[termId];
};

/**
 * Get all glossary terms sorted alphabetically
 */
export const getAllGlossaryTerms = (): GlossaryTerm[] => {
  return Object.values(GLOSSARY_TERMS).sort((a, b) =>
    a.term.localeCompare(b.term, "de")
  );
};
