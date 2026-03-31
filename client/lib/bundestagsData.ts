import { Chapter } from "@/types/chapter";

export const bundestagsChapters: Chapter[] = [
  // VERTIEFUNG (Advanced) - Deep dive into political reality
  {
    id: "bundestag-vertiefung",
    title: "Bundestag",
    description: "Tiefes Verständnis: Macht, Strategie und echte Legislative",
    difficulty: "hard",
    topicId: "bundestag",
    stageId: "vertiefung",
    category: "Vertiefung",
    icon: "🔍",
    explanationCards: [
      {
        id: "1",
        title: "Opposition als Strategie: Kontrolle statt Regierung",
        content:
          "• Kontrollinstrumente: Kleine Anfragen, Große Anfragen, Misstrauensvotum\n• Ziel: Regierungsfehler öffentlich machen und Vertrauen untergraben\n• Medienpräsenz = Macht (auch ohne Regierungsbeteiligung)\n• Vorbereitung für nächste Wahl – Profil schärfen\n• Opposition schafft Gegenpol zur Regierungspropaganda\n\n💡 Wichtig: Opposition hat echte Macht – nicht nur Kritik, sondern institutionalisierte Kontrolle.",
      },
      {
        id: "2",
        title: "Fraktionen: Macht, Einfluss und innere Konflikte",
        content:
          "• Fraktionsvorsitzende = zentrale Machtposition (noch mächtiger als einfache Abgeordnete)\n• Koalitionsfraktionen müssen auch untereinander verhandeln – nicht nur mit Opposition\n• Flügel innerhalb Fraktionen (liberal, konservativ, sozial, etc.) – innere Machtkämpfe\n• Fraktionsdisziplin vs. Gewissensfreiheit (z.B. bei ethischen Fragen – hier gibt es Ausnahmen)\n• Fraktionen können Abgeordnete disziplinarisch sanktionieren\n\n💡 Wichtig: Selbst innerhalb einer Fraktion gibt es Machtkämpfe und Verhandlungen.",
      },
      {
        id: "3",
        title: "Ausschüsse und die Legislative-Realität",
        content:
          "• Lobbyisten arbeiten intensiv in {ausschuesse} – dort haben sie direkten Zugang zu Entscheidungsträgern\n• Sachverstand = Macht (Experten und Lobbyisten beeinflussen Ergebnisse stark)\n• Ausschuss-Mehrheit entscheidet oft vorher – Plenumabstimmungen sind dann Formalität\n• Abstimmungen im Plenum sind oft schon entschieden – große Überraschungen sind selten\n• Ausschuss-Berichte werden vom Plenum meist bestätigt\n\n💡 Wichtig: Die echte Gesetzgebungsarbeit ist oft unsichtbar – Demokratie findet im Stillen statt.",
      },
      {
        id: "4",
        title: "Kompromisse: Die Kunst der Regierungsfähigkeit",
        content:
          "• Koalitionsverträge fixieren Kompromisse schriftlich – \"Wer kriegt was?\"\n• \"Rote Linien\": Was jede Partei auf keinen Fall akzeptiert – nicht verhandelbar\n• Große Koalitionen = tiefe Kompromisse, weniger Profilierung, aber stabile Regierung\n• Kleine Koalitionen (z.B. SPD-Grüne) = weniger Kompromisse, mehr Eigenständigkeit\n• Koalitionsbruch kostet Vertrauen – Verlässlichkeit ist Macht\n\n💡 Wichtig: Koalitionen sind Ehen auf Zeit – der Partner von heute könnte der Gegner von morgen sein.",
      },
    ],
    situations: [
      {
        id: "situation-1",
        chapterId: "bundestag-vertiefung",
        description: "Welche Kontrollmittel hat die Opposition, um die Regierung zur Rechenschaft zu ziehen?",
        options: [
          {
            id: "option-1a",
            text: "Kleine Anfragen, Große Anfragen und Misstrauensvotum",
            xp: 25,
            path: "established",
            feedbackText: "Richtig! Das sind die Hauptinstrumente. Damit kann Opposition Regierungsfehler aufdecken.",
          },
          {
            id: "option-1b",
            text: "Nur Gesetzesblocker – keine echten Kontrollmechanismen",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Opposition hat spezielle Fragen- und Votum-Instrumentarien zur Kontrolle.",
          },
          {
            id: "option-1c",
            text: "Sie kann die Medien nutzen, aber keine formalen Mittel",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Sie hat konkrete formale Kontrollmechanismen im Bundestag.",
          },
        ],
      },
      {
        id: "situation-2",
        chapterId: "bundestag-vertiefung",
        description: "Warum ist Medienpräsenz für die Opposition so wichtig?",
        options: [
          {
            id: "option-2a",
            text: "Weil sie ohne Regierungsmacht ihre Macht über öffentliche Wahrnehmung ausübt",
            xp: 25,
            path: "established",
            feedbackText: "Richtig! Opposition nutzt Medien als Hebel – Öffentlichkeit ist ihre Macht.",
          },
          {
            id: "option-2b",
            text: "Weil sie damit Wahlen sofort gewinnt",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Medienpräsenz hilft, aber garantiert keine Wahlen.",
          },
          {
            id: "option-2c",
            text: "Weil der Bundestag das verlangt",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Das ist eine strategische Entscheidung der Opposition, nicht eine Anforderung.",
          },
        ],
      },
      {
        id: "situation-3",
        chapterId: "bundestag-vertiefung",
        description: "Was macht eine Fraktionsvorsitzende so mächtig?",
        options: [
          {
            id: "option-3a",
            text: "Sie kontrolliert Abstimmungen, Ressourcen und kann Abgeordnete disziplinarisch sanktionieren",
            xp: 25,
            path: "established",
            feedbackText: "Richtig! Fraktionsvorsitzende sind zentrale Machtpositionen mit Einfluss auf Karrieren.",
          },
          {
            id: "option-3b",
            text: "Sie hat mehr Stimmen als normale Abgeordnete",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Eine Stimme = eine Stimme. Die Macht kommt aus Organisation und Kontrolle.",
          },
          {
            id: "option-3c",
            text: "Sie wird vom Kanzler ernannt",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Fraktionsvorsitzende werden von der Fraktion gewählt, nicht vom Kanzler.",
          },
        ],
      },
      {
        id: "situation-4",
        chapterId: "bundestag-vertiefung",
        description: "Was bedeutet Fraktionsdisziplin mit \"Gewissensfreiheit\" bei ethischen Fragen?",
        options: [
          {
            id: "option-4a",
            text: "Bei Gewissensfragen können Abgeordnete ohne Strafe anders abstimmen",
            xp: 25,
            path: "established",
            feedbackText: "Richtig! Bei Themen wie Abtreibung oder Sterbehilfe gibt es Ausnahmen von der Disziplin.",
          },
          {
            id: "option-4b",
            text: "Gewissensfreiheit bedeutet, man kann immer gegen die Fraktion abstimmen",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Das ist nur bei bestimmten ethischen Fragen erlaubt.",
          },
          {
            id: "option-4c",
            text: "Es gibt keine Gewissensfreiheit – Fraktionsdisziplin ist absolut",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Fraktionsdisziplin hat Ausnahmen bei ethischen Fragen.",
          },
        ],
      },
      {
        id: "situation-5",
        chapterId: "bundestag-vertiefung",
        description: "Wo haben Lobbyisten den meisten Einfluss im Bundestag?",
        options: [
          {
            id: "option-5a",
            text: "In den Ausschüssen – dort arbeiten sie mit Fachleuten an Gesetzen",
            xp: 25,
            path: "established",
            feedbackText: "Richtig! Ausschüsse sind der Ort, wo Lobbyisten direkten Zugang haben.",
          },
          {
            id: "option-5b",
            text: "Im Plenum – dort sind alle Abgeordneten anwesend",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Im Plenum ist schon alles entschieden – Lobbyisten arbeiten vorher.",
          },
          {
            id: "option-5c",
            text: "Sie haben keinen formalen Einfluss – das wäre illegal",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Lobbyismus ist legal und üblich – sie arbeiten transparent in Ausschüssen.",
          },
        ],
      },
      {
        id: "situation-6",
        chapterId: "bundestag-vertiefung",
        description: "Warum sind Ausschuss-Abstimmungen oft entscheidend für den Ausgang?",
        options: [
          {
            id: "option-6a",
            text: "Weil die Ausschuss-Mehrheit meist auch die Plenum-Mehrheit hat – Überraschungen sind selten",
            xp: 25,
            path: "established",
            feedbackText: "Richtig! Ausschüsse spiegeln Fraktionsmajoritäten – Plenum-Abstimmungen sind oft Formalität.",
          },
          {
            id: "option-6b",
            text: "Weil die Ausschüsse mehr Stimmen haben als das Plenum",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Ausschüsse haben nicht mehr Stimmen – aber ihre Abstimmungen sind Basis für Plenum.",
          },
          {
            id: "option-6c",
            text: "Weil der Bundesrat Ausschuss-Ergebnisse überprüft",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Der Bundesrat kommt später – Ausschüsse und Plenum sind im Bundestag.",
          },
        ],
      },
      {
        id: "situation-7",
        chapterId: "bundestag-vertiefung",
        description: "Was sind \"rote Linien\" in einem Koalitionsvertrag?",
        options: [
          {
            id: "option-7a",
            text: "Forderungen, die jede Koalitionspartner auf keinen Fall aufgibt – nicht verhandelbar",
            xp: 25,
            path: "established",
            feedbackText: "Richtig! Rote Linien sind die Grenze – wer das verletzt, riskiert den Koalitionsbruch.",
          },
          {
            id: "option-7b",
            text: "Punkte, über die noch verhandelt wird",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Rote Linien sind gerade nicht verhandelbar – sie sind fix.",
          },
          {
            id: "option-7c",
            text: "Die Teile des Vertrags, die öffentlich sind",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Rote Linien sind intern festgelegt – nicht öffentlich sichtbar.",
          },
        ],
      },
      {
        id: "situation-8",
        chapterId: "bundestag-vertiefung",
        description: "Warum kostet ein Koalitionsbruch Vertrauen?",
        options: [
          {
            id: "option-8a",
            text: "Weil Wähler Zuverlässigkeit erwarten – ein Bruch signalisiert Unverlässlichkeit für nächste Koalition",
            xp: 25,
            path: "established",
            feedbackText: "Richtig! Koalitionsbruch zerstört das Vertrauen – künftige Partner sind skeptisch.",
          },
          {
            id: "option-8b",
            text: "Weil der Bundespräsident das Vertrauen entzieht",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Der Präsident mischt sich nicht ein. Das Vertrauen kommt von Wählern und Partnern.",
          },
          {
            id: "option-8c",
            text: "Es kostet kein Vertrauen – Koalitionsbruch ist normal",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Koalitionsbruch ist selten, weil er reputationsmäßig sehr teuer ist.",
          },
        ],
      },
    ],
  },
];
