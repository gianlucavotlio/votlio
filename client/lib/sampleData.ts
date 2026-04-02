import { Chapter, Topic, LearningStage } from "@shared/api";
import { bundestagsChapters } from "./bundestagsData";

/**
 * Topics/themes in the learning platform
 */
export const topics: Topic[] = [
  {
    id: "grundgesetz",
    title: "Grundgesetz",
    description: "Das Grundgesetz ist die Verfassung Deutschlands. Lerne die Grundrechte und Struktur des Staates einfach erklärt.",
    icon: "⚖️",
    order: 1,
  },
  {
    id: "bundestag",
    title: "Bundestag",
    description: "Der Bundestag ist das Parlament Deutschlands. Verstehe, wie Gesetze entstehen und Abgeordnete arbeiten.",
    icon: "🏛️",
    order: 2,
  },
  {
    id: "bundesregierung",
    title: "Bundesregierung",
    description: "Die Exekutive führt Politik um. Lerne die Rolle des Kanzlers und der Minister.",
    icon: "👥",
    order: 3,
  },
  {
    id: "bundestagswahlen",
    title: "Bundestagswahlen",
    description: "Wie funktioniert das deutsche Wahlsystem? Lerne alles über Wahlen und Wahlrecht.",
    icon: "🗳️",
    order: 4,
  },
  {
    id: "gesetzgebung",
    title: "Gesetzgebung",
    description: "Der Gesetzgebungsprozess einfach erklärt – von der Idee zum Gesetz.",
    icon: "📜",
    order: 5,
  },
  {
    id: "bundesrat-foederalismus",
    title: "Bundesrat & Föderalismus",
    description: "Bundesrat und Föderalismus – wie Bund und Länder zusammenarbeiten.",
    icon: "🗺️",
    order: 6,
  },
  {
    id: "justiz-verfassungsgericht",
    title: "Justiz & Verfassungsgericht",
    description: "Das Rechtssystem und die Kontrollfunktion von Gerichten in Deutschland einfach erklärt.",
    icon: "⚖️",
    order: 7,
  },
];

/**
 * Learning stages
 */
export const learningStages: LearningStage[] = [
  { id: "grundlagen", label: "Grundlagen", order: 1 },
  { id: "anwendung", label: "Anwendung", order: 2 },
  { id: "vertiefung", label: "Vertiefung", order: 3 },
];

export const sampleChapters: Chapter[] = [
  {
    id: "grundgesetz",
    title: "Grundgesetz",
    description: "Die Verfassung der Bundesrepublik Deutschland",
    difficulty: "easy",
    topicId: "grundgesetz",
    stageId: "grundlagen",
    category: "Grundwissen",
    icon: "⚖️",
    explanationCards: [
      {
        id: "1",
        title: "Was ist das Grundgesetz?",
        content:
          "• {grundgesetz} = {verfassung} der Bundesrepublik Deutschland\n• Seit 1949 gültig\n• Oberste Rechtsquelle\n• Regelt Struktur des Staates, Aufgaben und Rechte",
      },
      {
        id: "2",
        title: "Grundrechte",
        content:
          "• Erste 20 Artikel des {grundgesetz}\n• Schützen: Meinungsfreiheit, Religionsfreiheit, Recht auf Leben\n• Unveräußerlich und gelten für alle Menschen\n• Gelten vor allen Gerichten",
      },
      {
        id: "3",
        title: "Struktur des Staates",
        content:
          "• Deutschland = Bundesrepublik mit {foederalismus}\n• Parlamentarische Demokratie\n• {gewaltenteilung}: {bundestag}, Regierung, Gerichte\n• Macht ist aufgeteilt\n• {bundesverfassungsgericht} kontrolliert die Einhaltung des Grundgesetzes",
      },
      {
        id: "4",
        title: "Die {ewigkeitsklausel}",
        content:
          "• Bestimmte Artikel sind unveränderbar\n• Schützt: Menschenrechte, {foederalismus}, Demokratie\n• Gilt auch bei Zwei-Drittel-Mehrheit\n• Kann nie abgeändert werden",
      },
      {
        id: "5",
        title: "Was du jetzt können solltest",
        content:
          "✨ Du weißt, dass das {grundgesetz} seit 1949 unsere {verfassung} ist\n✨ Du verstehst die Bedeutung der {grundrechte} für alle Menschen\n✨ Du kennst die Säulen unserer Demokratie: Föderalismus, parlamentarische Demokratie und {gewaltenteilung}\n✨ Du weißt, was die {ewigkeitsklausel} schützt und warum sie unzerstörbar ist\n\nDamit verstehst du das Fundament unseres Staates! 🏛️",
      },
    ],
    situations: [
      {
        id: "situation-1",
        chapterId: "grundgesetz",
        description:
          "Ein Bundesland möchte eine Regelung einführen, die Bürgern die Meinungsfreiheit einschränkt. Ein Gericht lehnt dies ab. Warum?",
        options: [
          {
            id: "option-1a",
            text: "Weil die Meinungsfreiheit im Grundgesetz garantiert ist",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Das Grundgesetz schützt Grundrechte auf Bundesebene—Ländergesetze dürfen sie nicht beschneiden.",
          },
          {
            id: "option-1b",
            text: "Weil es zu teuer wäre, das durchzusetzen",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Kosten spielen keine Rolle—das Problem ist die verfassungsrechtliche Grundrechtsverletzung.",
          },
          {
            id: "option-1c",
            text: "Weil das Bundesland zu wenig Macht hat",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Der Grund ist das Grundgesetz, nicht die fehlende Macht des Bundeslandes.",
          },
        ],
      },
      {
        id: "situation-2",
        chapterId: "grundgesetz",
        description:
          "Ein Änderungsantrag soll die föderale Struktur Deutschlands abschaffen. Wird dieser angenommen?",
        options: [
          {
            id: "option-2a",
            text: "Nein, wegen der Ewigkeitsklausel",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Die Ewigkeitsklausel schützt den Föderalismus absolut—auch nicht mit Zwei-Drittel-Mehrheit.",
          },
          {
            id: "option-2b",
            text: "Ja, mit Mehrheit im Bundestag",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Selbst eine Zwei-Drittel-Mehrheit darf die Ewigkeitsklausel nicht antasten.",
          },
          {
            id: "option-2c",
            text: "Ja, wenn die Bundesländer zustimmen",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Selbst mit Zustimmung aller Länder kann die Ewigkeitsklausel nicht geändert werden.",
          },
        ],
      },
      {
        id: "situation-3",
        chapterId: "grundgesetz",
        description:
          "Ein politischer Gegner wird wegen seiner Äußerungen verfolgt. Was schützt ihn?",
        options: [
          {
            id: "option-3a",
            text: "Die Grundrechte im Grundgesetz",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Artikel 5 GG schützt Meinungsfreiheit—auch Universitäten müssen dieses Grundrecht respektieren.",
          },
          {
            id: "option-3b",
            text: "Internationale Verträge",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Internationale Verträge sind sekundär—in deutschen Gerichten gilt primär das Grundgesetz.",
          },
          {
            id: "option-3c",
            text: "Die Partei des Gegners",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Parteienschutz ist keine rechtliche Garantie—nur das Grundgesetz schützt durch Gerichte.",
          },
        ],
      },
      {
        id: "situation-4",
        chapterId: "grundgesetz",
        description:
          "Das Grundgesetz wurde seit 1949 über 60 Mal geändert. Welcher Bereich ist NICHT änderbar?",
        options: [
          {
            id: "option-4a",
            text: "Menschenrechte und Menschenwürde",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Die Ewigkeitsklausel schützt diese absolut—nie änderbar.",
          },
          {
            id: "option-4b",
            text: "Die genaue Anzahl der Bundesländer",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Die Struktur der Föderalismus kann geändert werden, aber nicht abgeschafft.",
          },
          {
            id: "option-4c",
            text: "Die Wählerqualifikationen und Wahlverfahren",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Wahlregeln werden regelmäßig angepasst, sind aber nicht tabu.",
          },
        ],
      },
      {
        id: "situation-5",
        chapterId: "grundgesetz",
        description:
          "Ein Bundesland ignoriert ein Grundrecht. Wer kann eingreifen?",
        options: [
          {
            id: "option-5a",
            text: "Das Bundesverfassungsgericht",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Das Bundesverfassungsgericht ist der oberste Hüter der Grundrechte.",
          },
          {
            id: "option-5b",
            text: "Der Bundestag kann Sanktionen verhängen",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Der Bundestag hat keine rechtliche Macht—nur das Bundesverfassungsgericht kann eingreifen.",
          },
          {
            id: "option-5c",
            text: "Das Bundesland selbst entscheidet",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Bundesländer sind an Grundrechte gebunden—das Gericht erzwingt Einhaltung.",
          },
        ],
      },
      {
        id: "situation-6",
        chapterId: "grundgesetz",
        description:
          "Nenne 1 Prinzip, das durch die Ewigkeitsklausel (Art. 79 Abs. 3) nicht geändert werden darf.",
        options: [
          {
            id: "option-6a",
            text: "Menschenrechte, Föderalismus oder Demokratie—diese sind absolut unveränderbar.",
            xp: 25,
            path: "established",
            feedbackText:
              "Richtig! Die Ewigkeitsklausel schützt diese Kernprinzipien unabhängig von verfassungsrechtlichen Mehrheiten.",
          },
          {
            id: "option-6b",
            text: "Alle Grundgesetz-Artikel können mit Zwei-Drittel-Mehrheit geändert werden.",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch. Die Ewigkeitsklausel schafft absolute Grenzen—auch Zwei-Drittel-Mehrheit kann sie nicht antasten.",
          },
          {
            id: "option-6c",
            text: "Nur die Menschenrechte sind geschützt; Föderalismus und Demokratie können geändert werden.",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch. Die Ewigkeitsklausel schützt Menschenrechte, Föderalismus UND Demokratie gleichermaßen.",
          },
        ],
      },
      {
        id: "situation-7",
        chapterId: "grundgesetz",
        description:
          "Ein Gesetz widerspricht dem Grundgesetz. Was passiert?",
        options: [
          {
            id: "option-7a",
            text: "Es ist ungültig und wird aufgehoben",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Das Bundesverfassungsgericht hebt verfassungswidrige Gesetze auf.",
          },
          {
            id: "option-7b",
            text: "Es gilt trotzdem bis zu Neuwahlen",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Ein Gesetz gilt nicht einfach weiter—das BVerfG erklärt es ungültig.",
          },
          {
            id: "option-7c",
            text: "Das Bundesland entscheidet",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Das Bundesverfassungsgericht, nicht ein Bundesland, entscheidet über Verfassungsfragen.",
          },
        ],
      },
      {
        id: "situation-8",
        chapterId: "grundgesetz",
        description:
          "Warum kann ein einfaches Gesetz das Grundgesetz nicht überstimmen?",
        options: [
          {
            id: "option-8a",
            text: "Weil das Grundgesetz die oberste Rechtsquelle ist",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Das Grundgesetz ist die oberste Rechtsquelle—alle anderen Gesetze müssen mit ihm übereinstimmen.",
          },
          {
            id: "option-8b",
            text: "Weil das Volk immer zuerst abstimmen muss",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Das Volk stimmt nicht über jedes Gesetz ab—die Rechtsquelle-Hierarchie bestimmt die Gültigkeit.",
          },
          {
            id: "option-8c",
            text: "Weil der Bundesrat stärker ist als der Bundestag",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Der Bundesrat ist nicht stärker als das Grundgesetz—das Grundgesetz steht über allem.",
          },
        ],
      },
    ],
  },
  {
    id: "bundestag",
    title: "Bundestag",
    description: "Deutschlands Parlament und Gesetzgeber",
    difficulty: "easy",
    topicId: "bundestag",
    stageId: "grundlagen",
    category: "Grundwissen",
    icon: "🏛️",
    explanationCards: [
      {
        id: "1",
        title: "Der Bundestag",
        content:
          "• Nationales Parlament Deutschlands\n• 630 Abgeordnete\n• Direkt vom Volk gewählt\n• Hauptgesetzgebungsorgan\n• Sitzverteilung nach {zweitstimmen}",
      },
      {
        id: "2",
        title: "Aufgaben",
        content:
          "• Verabschiedet Bundesgesetze\n• Wählt den Bundeskanzler\n• Kontrolliert die Bundesregierung\n• Beschließt den {staatshaushalt}",
      },
      {
        id: "3",
        title: "Struktur",
        content:
          "• Abgeordnete schließen sich zu {fraktion} zusammen\n• Fraktionen organisieren politische Mehrheiten\n• Es gibt {ausschuesse} für einzelne Themen (z. B. Haushalt, Verteidigung)\n• Ausschüsse bereiten Gesetze fachlich vor",
      },
      {
        id: "4",
        title: "Gesetzgebungsprozess",
        content:
          "• Gesetzentwürfe können von Bundesregierung, Bundestag oder Bundesrat eingebracht werden\n• Ein Gesetzentwurf wird in drei Lesungen beraten\n• In den Lesungen wird diskutiert und abgestimmt\n• Bei bestimmten Gesetzen muss der {bundesrat} zustimmen\n• Für einfache Bundesgesetze reicht die einfache Mehrheit",
      },
      {
        id: "5",
        title: "Was du jetzt können solltest",
        content:
          "✨ Du weißt, dass der {bundestag} das nationale Parlament Deutschlands ist\n✨ Du verstehst, dass Abgeordnete direkt vom Volk gewählt werden\n✨ Du kennst die Kernaufgaben: Gesetzgebung, Kanzlerwahl und Regierungskontrolle\n✨ Du weißt, wie der {gesetzgebungsprozess} mit drei Lesungen funktioniert\n\nDamit kennst du die zentrale Institution der Gesetzgebung.",
      },
    ],
    situations: [
      {
        id: "situation-1",
        chapterId: "bundestag",
        description: "Wer wählt die Abgeordneten des Bundestags?",
        options: [
          {
            id: "option-1a",
            text: "Der Bundesrat",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Der Bundesrat wählt nicht die Abgeordneten.",
          },
          {
            id: "option-1b",
            text: "Das Volk",
            xp: 25,
            path: "established",
            feedbackText: "Die Abgeordneten werden direkt vom Volk gewählt.",
          },
          {
            id: "option-1c",
            text: "Der Bundespräsident",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Der Bundespräsident wählt nicht die Abgeordneten.",
          },
        ],
      },
      {
        id: "situation-2",
        chapterId: "bundestag",
        description: "Wodurch wird die Sitzverteilung im Bundestag bestimmt?",
        options: [
          {
            id: "option-2a",
            text: "Durch die Erststimmen",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Die Sitzverteilung wird durch die Zweitstimmen bestimmt.",
          },
          {
            id: "option-2b",
            text: "Durch die Zweitstimmen",
            xp: 25,
            path: "established",
            feedbackText: "Die Zweitstimme entscheidet über die Sitzverteilung im Parlament.",
          },
          {
            id: "option-2c",
            text: "Durch den Bundesrat",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Der Bundesrat bestimmt nicht die Sitzverteilung.",
          },
        ],
      },
      {
        id: "situation-3",
        chapterId: "bundestag",
        description: "Welche Aufgabe gehört zur Funktion des Bundestags?",
        options: [
          {
            id: "option-3a",
            text: "Er kontrolliert die Regierung",
            xp: 25,
            path: "established",
            feedbackText: "Der Bundestag kontrolliert die Arbeit der Bundesregierung.",
          },
          {
            id: "option-3b",
            text: "Er leitet das Bundesverfassungsgericht",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Der Bundestag leitet nicht das Bundesverfassungsgericht.",
          },
          {
            id: "option-3c",
            text: "Er ernennt Ministerpräsidenten",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Der Bundestag ernennt nicht die Ministerpräsidenten.",
          },
        ],
      },
      {
        id: "situation-4",
        chapterId: "bundestag",
        description: "Wer wird vom Bundestag gewählt?",
        options: [
          {
            id: "option-4a",
            text: "Der Bundespräsident",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Der Bundespräsident wird von der Bundesversammlung gewählt.",
          },
          {
            id: "option-4b",
            text: "Der Bundeskanzler",
            xp: 25,
            path: "established",
            feedbackText: "Der Bundestag wählt den Bundeskanzler.",
          },
          {
            id: "option-4c",
            text: "Der Bundesrat",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Der Bundesrat wird nicht vom Bundestag gewählt.",
          },
        ],
      },
      {
        id: "situation-5",
        chapterId: "bundestag",
        description: "Welche Aufgabe haben Ausschüsse?",
        options: [
          {
            id: "option-5a",
            text: "Sie vertreten die Bundesländer",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Ausschüsse vertreten nicht die Bundesländer.",
          },
          {
            id: "option-5b",
            text: "Sie behandeln spezifische Themen",
            xp: 25,
            path: "established",
            feedbackText: "Ausschüsse befassen sich mit bestimmten Fachthemen.",
          },
          {
            id: "option-5c",
            text: "Sie wählen den Bundeskanzler",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Der Bundestag wählt den Bundeskanzler, nicht die Ausschüsse.",
          },
        ],
      },
      {
        id: "situation-6",
        chapterId: "bundestag",
        description: "Welche Funktion haben Fraktionen?",
        options: [
          {
            id: "option-6a",
            text: "Sie koordinieren Abstimmungen",
            xp: 25,
            path: "established",
            feedbackText: "Fraktionen stimmen ihre Positionen intern ab und koordinieren Abstimmungen.",
          },
          {
            id: "option-6b",
            text: "Sie kontrollieren den Bundesrat",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Fraktionen kontrollieren nicht den Bundesrat.",
          },
          {
            id: "option-6c",
            text: "Sie ernennen Minister",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Fraktionen ernennen nicht die Minister.",
          },
        ],
      },
      {
        id: "situation-7",
        chapterId: "bundestag",
        description: "Wie viele Lesungen durchläuft ein Gesetz im Bundestag?",
        options: [
          {
            id: "option-7a",
            text: "Eine",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Ein Gesetz durchläuft drei Lesungen.",
          },
          {
            id: "option-7b",
            text: "Zwei",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Ein Gesetz durchläuft drei Lesungen.",
          },
          {
            id: "option-7c",
            text: "Drei",
            xp: 25,
            path: "established",
            feedbackText: "Ein Gesetz wird im Bundestag in drei Lesungen beraten.",
          },
        ],
      },
      {
        id: "situation-8",
        chapterId: "bundestag",
        description: "Welche Mehrheit reicht für ein einfaches Bundesgesetz im Bundestag aus?",
        options: [
          {
            id: "option-8a",
            text: "Zweidrittelmehrheit",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Zweidrittelmehrheit ist nur für Verfassungsänderungen erforderlich.",
          },
          {
            id: "option-8b",
            text: "Einfache Mehrheit der abgegebenen Stimmen",
            xp: 25,
            path: "established",
            feedbackText: "Für einfache Bundesgesetze genügt die einfache Mehrheit.",
          },
          {
            id: "option-8c",
            text: "Absolute Mehrheit aller Mitglieder",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Einfache Mehrheit der abgegebenen Stimmen genügt.",
          },
        ],
      },
    ],
  },
  {
    id: "bundesregierung",
    title: "Bundesregierung",
    description: "Die Exekutive und ihre Funktionen",
    difficulty: "medium",
    topicId: "bundesregierung",
    stageId: "grundlagen",
    category: "Grundwissen",
    icon: "👥",
    explanationCards: [
      {
        id: "1",
        title: "Die {bundesregierung}",
        content:
          "• Exekutive Deutschlands\n• Besteht aus: {bundeskanzler} und {bundesminister}n\n• Setzt Gesetze um\n• Vertritt Deutschland",
      },
      {
        id: "2",
        title: "Der {bundeskanzler}",
        content:
          "• Regierungschef\n• Wird vom {bundestag} gewählt\n• Kann nur durch {konstruktives_misstrauensvotum} abgelöst werden\n• Bestimmt Richtlinien und ernennt Minister",
      },
      {
        id: "3",
        title: "Die {bundesminister}",
        content:
          "• Leiten verschiedene Ressorts (Finanzen, Außenpolitik, Bildung, etc.)\n• Folgen {ressortprinzip}: jeder leitet sein Ministerium unabhängig\n• Folgen {kollegialprinzip}: Kabinett entscheidet gemeinsam bei Streit\n• Verantwortung für eigenes Ressort",
      },
      {
        id: "4",
        title: "{koalition}en",
        content:
          "• Notwendig, wenn keine Partei absolute Mehrheit hat\n• Koalitionsvertrag wird geschlossen\n• Größter Partner stellt meist den {bundeskanzler}\n• Regieren gemeinsam",
      },
      {
        id: "5",
        title: "Bundesregierung – Das Wichtigste auf einen Blick",
        content:
          "✨ Die {bundesregierung} ist die {exekutive} und setzt Gesetze um\n✨ Sie besteht aus {bundeskanzler} und {bundesminister}n\n✨ Der {bundeskanzler} wird vom {bundestag} gewählt und bestimmt die Richtlinien\n✨ Der {bundeskanzler} kann nur durch {konstruktives_misstrauensvotum} abgelöst werden\n✨ Das {ressortprinzip} ermöglicht ministerielle Eigenständigkeit\n✨ Das {kollegialprinzip} sorgt für gemeinsame Entscheidungen bei Konflikten\n✨ Jeder {bundesminister} leitet sein Ressort verantwortungsvoll\n✨ {koalition}en entstehen, wenn keine Partei die absolute Mehrheit hat\n\nWenn du diese Punkte verstehst, hast du das Grundwissen zur Bundesregierung sicher.",
      },
    ],
    situations: [
      {
        id: "situation-1",
        chapterId: "bundesregierung",
        description: "Was ist die Bundesregierung?",
        options: [
          {
            id: "option-1a",
            text: "Die Legislative",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Die Bundesregierung ist die Exekutive.",
          },
          {
            id: "option-1b",
            text: "Die Exekutive Deutschlands",
            xp: 25,
            path: "established",
            feedbackText: "Korrekt! Die Bundesregierung ist die Exekutive.",
          },
          {
            id: "option-1c",
            text: "Das höchste Gericht",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Das höchste Gericht ist die Judikative.",
          },
        ],
      },
      {
        id: "situation-2",
        chapterId: "bundesregierung",
        description: "Aus wem besteht die Bundesregierung?",
        options: [
          {
            id: "option-2a",
            text: "Bundestag und Bundesrat",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Bundestag und Bundesrat sind die Legislative.",
          },
          {
            id: "option-2b",
            text: "Bundeskanzler und Bundesminister",
            xp: 25,
            path: "established",
            feedbackText: "Korrekt! Die Bundesregierung besteht aus Bundeskanzler und Bundesministern.",
          },
          {
            id: "option-2c",
            text: "Bundespräsident und Kanzler",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Der Bundespräsident ist nicht Teil der Bundesregierung.",
          },
        ],
      },
      {
        id: "situation-3",
        chapterId: "bundesregierung",
        description: "Wer wählt den Bundeskanzler?",
        options: [
          {
            id: "option-3a",
            text: "Das Volk direkt",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Das Volk wählt nicht direkt den Kanzler.",
          },
          {
            id: "option-3b",
            text: "Der Bundestag",
            xp: 25,
            path: "established",
            feedbackText: "Korrekt! Der Bundestag wählt den Bundeskanzler.",
          },
          {
            id: "option-3c",
            text: "Der Bundesrat",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Der Bundesrat wählt nicht den Kanzler.",
          },
        ],
      },
      {
        id: "situation-4",
        chapterId: "bundesregierung",
        description: "Wie kann ein Bundeskanzler abgelöst werden?",
        options: [
          {
            id: "option-4a",
            text: "Durch einfache Mehrheit",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Es braucht mehr als einfache Mehrheit.",
          },
          {
            id: "option-4b",
            text: "Durch ein konstruktives Misstrauensvotum",
            xp: 25,
            path: "established",
            feedbackText: "Korrekt! Das konstruktive Misstrauensvotum ermöglicht einen Kanzlerwechsel.",
          },
          {
            id: "option-4c",
            text: "Durch den Bundespräsidenten",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Der Bundespräsident kann nicht direkt absetzen.",
          },
        ],
      },
      {
        id: "situation-5",
        chapterId: "bundesregierung",
        description: "Was bestimmt der Bundeskanzler?",
        options: [
          {
            id: "option-5a",
            text: "Die Ressorts der Minister",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Die Richtlinien sind entscheidender.",
          },
          {
            id: "option-5b",
            text: "Die Richtlinien der Politik",
            xp: 25,
            path: "established",
            feedbackText: "Korrekt! Der Bundeskanzler bestimmt die Richtlinien der Regierungspolitik.",
          },
          {
            id: "option-5c",
            text: "Die Gesetze des Bundestages",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Gesetze werden vom Bundestag verabschiedet, nicht vom Kanzler.",
          },
        ],
      },
      {
        id: "situation-6",
        chapterId: "bundesregierung",
        description: "Was bedeutet das Ressortprinzip?",
        options: [
          {
            id: "option-6a",
            text: "Das Kabinett entscheidet alles gemeinsam",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Das ist das Kollegialprinzip.",
          },
          {
            id: "option-6b",
            text: "Jeder Minister leitet sein Ministerium eigenständig",
            xp: 25,
            path: "established",
            feedbackText: "Korrekt! Das Ressortprinzip bedeutet, dass jeder Minister sein Ressort unabhängig leitet.",
          },
          {
            id: "option-6c",
            text: "Der Kanzler entscheidet alles allein",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Das Ressortprinzip ermöglicht ministerielle Eigenständigkeit.",
          },
        ],
      },
      {
        id: "situation-7",
        chapterId: "bundesregierung",
        description: "Wann entscheidet das Kabinett gemeinsam?",
        options: [
          {
            id: "option-7a",
            text: "Immer",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Das Kabinett entscheidet nicht immer gemeinsam.",
          },
          {
            id: "option-7b",
            text: "Nur bei Streitfällen (Kollegialprinzip)",
            xp: 25,
            path: "established",
            feedbackText: "Korrekt! Das Kollegialprinzip regelt gemeinsame Entscheidungen bei Streitigkeiten.",
          },
          {
            id: "option-7c",
            text: "Nie",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Das Kabinett trifft gemeinsame Entscheidungen bei Konflikten.",
          },
        ],
      },
      {
        id: "situation-8",
        chapterId: "bundesregierung",
        description: "Wann sind Koalitionen notwendig?",
        options: [
          {
            id: "option-8a",
            text: "Wenn eine Partei die absolute Mehrheit hat",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Koalitionen sind nicht notwendig, wenn eine Partei die Mehrheit hat.",
          },
          {
            id: "option-8b",
            text: "Wenn keine Partei die absolute Mehrheit hat",
            xp: 25,
            path: "established",
            feedbackText: "Korrekt! Koalitionen entstehen, wenn mehrere Parteien zusammengehen müssen, um eine Mehrheit zu haben.",
          },
          {
            id: "option-8c",
            text: "Bei jeder Wahl automatisch",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Koalitionen sind nicht automatisch notwendig.",
          },
        ],
      },
    ],
  },
  {
    id: "gesetzgebung",
    title: "Gesetzgebung",
    description: "Wie Gesetze entstehen und verabschiedet werden",
    difficulty: "medium",
    topicId: "gesetzgebung",
    stageId: "grundlagen",
    category: "Wiederholung",
    icon: "📜",
    explanationCards: [
      {
        id: "1",
        title: "Gesetzgebungsprozess",
        content:
          "• Gesetzentwürfe können von Bundesregierung, Bundestag oder Bundesrat eingebracht werden\n• {gesetz}e durchlaufen drei Lesungen im {bundestag}\n• Mit Debatten und {ausschuesse}n-Beratung\n• Nach Verabschiedung: {bundesrat} behandelt das {gesetz}\n• Zustimmungsgesetze vs. Einspruchsgesetze",
      },
      {
        id: "2",
        title: "Die drei Lesungen",
        content:
          "• 1. Lesung: Einreichung und Diskussion in {ausschuesse}n\n• 2. Lesung: Debatte und Änderungsanträge\n• 3. Lesung: Abschließende Debatte und Abstimmung\n• Nach 3. Lesung: {gesetz} verabschiedet, geht zum {bundesrat}",
      },
      {
        id: "3",
        title: "{bundesrat} und {gesetz}e",
        content:
          "• {bundesrat} repräsentiert 16 Bundesländer\n• Zustimmungsgesetze: {bundesrat} muss zustimmen\n• Einspruchsgesetze: {bundesrat} kann Einspruch erheben\n• Vermittlungsausschuss bei Uneinigkeit",
      },
      {
        id: "4",
        title: "Arten von {gesetz}en",
        content:
          "• Zustimmungsgesetze: {bundesrat}-Zustimmung erforderlich\n• Einspruchsgesetze: {bundesrat} kann verzögern, nicht blockieren\n• Verfassungsänderungen: brauchen Zwei-Drittel-Mehrheit\n• Regelgesetze: nur {bundestag}-Mehrheit",
      },
      {
        id: "4a",
        title: "Ausfertigung und Verkündung",
        content:
          "• Bundespräsident prüft das {gesetz} formell\n• Er unterzeichnet es (Ausfertigung)\n• Danach Veröffentlichung im Bundesgesetzblatt\n• Erst dann tritt das {gesetz} in Kraft",
      },
      {
        id: "5",
        title: "Gesetzgebung im Überblick",
        content:
          "✨ Gesetzentwürfe können von Bundesregierung, Bundestag oder Bundesrat eingebracht werden\n✨ Ein {gesetz} durchläuft drei Lesungen im {bundestag}\n✨ {ausschuesse} beraten und ändern den Entwurf\n✨ Nach Verabschiedung prüft der {bundesrat} das {gesetz}\n✨ Zustimmungs- und Einspruchsgesetze unterscheiden sich in der Rolle des {bundesrat}es\n✨ Verfassungsänderungen benötigen eine Zweidrittelmehrheit\n\nSo entsteht ein {gesetz} – durch Beratung, Mehrheiten und Zusammenarbeit der Verfassungsorgane.",
      },
    ],
    situations: [
      {
        id: "situation-1",
        chapterId: "gesetzgebung",
        description:
          "Ein umstrittenes Gesetz besteht erste und zweite Lesung. Was passiert bei der dritten?",
        options: [
          {
            id: "option-1a",
            text: "Nochmal Debatte und Abstimmung",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Auch bei der dritten Lesung wird noch einmal debattiert und abgestimmt.",
          },
          {
            id: "option-1b",
            text: "Automatische Verabschiedung",
            xp: 0,
            path: "independent",
            feedbackText:
              "Nein, jede Lesung hat ihre eigene Bedeutung und Abstimmung.",
          },
          {
            id: "option-1c",
            text: "Automatischer Ablehnung ohne Abstimmung",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Nein. Die Lesung ist nicht automatisch.",
          },
        ],
      },
      {
        id: "situation-2",
        chapterId: "gesetzgebung",
        description:
          "Ein Steuergesetz wird vom Bundestag angenommen aber vom Bundesrat abgelehnt. Was tun?",
        options: [
          {
            id: "option-2a",
            text: "Vermittlungsausschuss einschalten",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Der Ausschuss kann Kompromisse finden.",
          },
          {
            id: "option-2b",
            text: "Das Gesetz ist automatisch ungültig",
            xp: 0,
            path: "independent",
            feedbackText:
              "Nicht automatisch - erst muss der Vermittlungsausschuss tagen.",
          },
          {
            id: "option-2c",
            text: "Der Bundestag kann es mit Zweidrittelmehrheit überstimmen",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Das geht nur bei Einspruchsgesetzen, nicht bei Zustimmungsgesetzen.",
          },
        ],
      },
      {
        id: "situation-3",
        chapterId: "gesetzgebung",
        description:
          "Wie lange darf das Gesetzgebungsverfahren dauern?",
        options: [
          {
            id: "option-3a",
            text: "Es gibt keine zeitliche Begrenzung",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Gesetze können Monate oder Jahre im Prozess sein.",
          },
          {
            id: "option-3b",
            text: "Maximal 3 Monate pro Kammer",
            xp: 0,
            path: "independent",
            feedbackText:
              "Das ist nicht festgelegt - jede Kammer kann sich Zeit nehmen.",
          },
          {
            id: "option-3c",
            text: "Der Kanzler kann das Tempo bestimmen",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Der Kanzler kann beeinflussen, aber nicht erzwingen.",
          },
        ],
      },
      {
        id: "situation-4",
        chapterId: "gesetzgebung",
        description:
          "Eine Verfassungsänderung wird geplant. Welche Mehrheit braucht es?",
        options: [
          {
            id: "option-4a",
            text: "Zweidrittelmehrheit in Bundestag und Bundesrat",
            xp: 30,
            path: "established",
            feedbackText:
              "Korrekt! Verfassungsänderungen brauchen höhere Hürden als normale Gesetze.",
          },
          {
            id: "option-4b",
            text: "Einfache Mehrheit im Bundestag",
            xp: 0,
            path: "independent",
            feedbackText:
              "Nein, Verfassungsänderungen sind schwerer.",
          },
          {
            id: "option-4c",
            text: "Einstimmigkeit aller Bundesländer",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Nein, aber eine Zweidrittelmehrheit ist sehr hoch.",
          },
        ],
      },
      {
        id: "situation-5",
        chapterId: "gesetzgebung",
        description:
          "Wer kann einen Gesetzentwurf einreichen?",
        options: [
          {
            id: "option-5a",
            text: "Die Bundesregierung, der Bundestag oder der Bundesrat",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Diese drei Legislativorgane können Gesetzentwürfe einbringen.",
          },
          {
            id: "option-5b",
            text: "Nur die Bundesregierung",
            xp: 0,
            path: "independent",
            feedbackText:
              "Nein, auch der Bundestag und Bundesrat können Entwürfe einbringen.",
          },
          {
            id: "option-5c",
            text: "Das Volk durch Petition",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Indirekt ja über ihre Abgeordneten, aber nicht direkt.",
          },
        ],
      },
      {
        id: "situation-6",
        chapterId: "gesetzgebung",
        description:
          "Wahr oder Falsch: Der Bundespräsident kann ein vom Bundestag verabschiedetes Gesetz aus politischen Gründen blockieren.",
        options: [
          {
            id: "option-6a",
            text: "Falsch",
            xp: 25,
            path: "established",
            feedbackText:
              "Richtig! Der Bundespräsident hat kein Vetorecht und kann Gesetze aus politischen Gründen nicht blockieren. Er muss Gesetze unterzeichnen, die vom Bundestag verabschiedet wurden (Art. 82 GG). Seine Rolle ist repräsentativ, nicht legislativ.",
          },
          {
            id: "option-6b",
            text: "Richtig",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch. Der Bundespräsident ist verfassungsmäßig nicht befugt, Gesetze zu blockieren—weder aus politischen Gründen noch aus anderen Gründen. Das Vetorecht existiert nicht in der deutschen Verfassung.",
          },
        ],
      },
      {
        id: "situation-7",
        chapterId: "gesetzgebung",
        description:
          "Wer leitet den Gesetzgebungsprozess in Deutschland—wer kann Gesetzentwürfe einbringen?",
        options: [
          {
            id: "option-7a",
            text: "Bundesregierung, Bundestag und Bundesrat können Gesetzentwürfe einbringen",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Alle drei Legislativorgane dürfen Gesetzentwürfe einbringen—dies ist im Grundgesetz vorgesehen.",
          },
          {
            id: "option-7b",
            text: "Nur die Bundesregierung darf Gesetzentwürfe einbringen",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Der Bundestag und Bundesrat haben ebenfalls das Initiativrecht.",
          },
          {
            id: "option-7c",
            text: "Das Volk entscheidet direkt, welche Gesetze gemacht werden",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Deutschland ist eine repräsentative Demokratie—der Bundestag und andere Organe leiten die Gesetzgebung.",
          },
        ],
      },
      {
        id: "situation-8",
        chapterId: "gesetzgebung",
        description:
          "Ein Einspruchsgesetz wird vom Bundesrat abgelehnt. Mit welcher Mehrheit kann der Bundestag es trotzdem verabschieden?",
        options: [
          {
            id: "option-8a",
            text: "Mit Zweidrittelmehrheit der anwesenden Mitglieder",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Artikel 77 GG bestimmt: Einspruchsgesetze können mit Zweidrittelmehrheit überstimmt werden.",
          },
          {
            id: "option-8b",
            text: "Mit einfacher Mehrheit—der Bundesrat kann nicht blockieren",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Einspruchsgesetze brauchen Zweidrittelmehrheit, nicht nur einfache Mehrheit.",
          },
          {
            id: "option-8c",
            text: "Der Bundesrat kann es blockieren—nur Zustimmungsgesetze können überstimmt werden",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Einspruchsgesetze können mit Zweidrittelmehrheit im Bundestag überstimmt werden.",
          },
        ],
      },
    ],
  },
  {
    id: "bundesrat-foederalismus",
    title: "Bundesrat & Föderalismus",
    description: "Die Struktur und Rolle der Bundesländer",
    difficulty: "medium",
    topicId: "bundesrat-foederalismus",
    stageId: "grundlagen",
    category: "Wiederholung",
    icon: "🗺️",
    explanationCards: [
      {
        id: "1",
        title: "Der Bundesrat",
        content:
          "• Verfassungsorgan: 16 Bundesländer vertreten\n• Jedes Land entsendet 3–6 Delegierte (nach Bevölkerung)\n• Wirkt an Gesetzgebung mit\n• Kann {zustimmungsgesetze} blockieren, {einspruchsgesetze} verzögern\n• Bei Konflikten kann der Vermittlungsausschuss einen Kompromiss suchen",
      },
      {
        id: "2",
        title: "Föderalismus in Deutschland",
        content:
          "• Macht zwischen Bund und Ländern aufgeteilt\n• Bund: Außenpolitik, Verteidigung, Währung\n• Länder: Bildung, Polizei, lokale Themen\n• Aufteilung im Grundgesetz festgelegt",
      },
      {
        id: "3",
        title: "Kompetenzen der Länder",
        content:
          "• Landesregierung und Landtag\n• Zuständig für: Schulen, Universitäten, Polizei, Verkehr, Kultur\n• Bundesrecht geht Landesrecht vor (bei Bundeskompetenz)\n• Art. 31 Grundgesetz regelt Rangfolge",
      },
      {
        id: "4",
        title: "Bund-Länder-Konflikte",
        content:
          "• Konflikte um Kompetenzen und Finanzierung\n• Finanzausgleich: Verteilung von Steuereinnahmen\n• System der Solidarität zwischen Ländern\n• Ausgleichszahlungen für ärmere Länder",
      },
      {
        id: "5",
        title: "Bundesrat & Föderalismus im Überblick",
        content:
          "✨ Deutschland ist ein föderaler Bundesstaat mit Machtaufteilung\n✨ Der Bund regelt: Außenpolitik, Verteidigung, Währung\n✨ Die Länder regeln: Bildung, Polizei, Kultur, Verkehr\n✨ Der {bundesrat} vertritt die 16 Bundesländer bei der Gesetzgebung\n✨ Bundesrecht geht vor Landesrecht\n✨ Der Finanzausgleich sorgt für Solidarität zwischen den Ländern\n\nDamit verstehst du die föderale Struktur Deutschlands.",
      },
    ],
    situations: [
      {
        id: "situation-1",
        chapterId: "bundesrat-foederalismus",
        description:
          "Bayern möchte ein Schulsystem ganz anders als der Bund. Darf es das?",
        options: [
          {
            id: "option-1a",
            text: "Ja, Bildung ist Landessache",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Bildung ist eine Länderkompetenzen im deutschen Föderalismus.",
          },
          {
            id: "option-1b",
            text: "Nein, der Bund schreibt alles vor",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch - Deutschland ist ein Föderalstaat mit Eigenmacht der Länder.",
          },
          {
            id: "option-1c",
            text: "Nur wenn andere Länder zustimmen",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Nein. Bayern kann eigenständig entscheiden.",
          },
        ],
      },
      {
        id: "situation-2",
        chapterId: "bundesrat-foederalismus",
        description:
          "Der Bundesrat blockiert ein Gesetz der Bundesregierung. Was passiert?",
        options: [
          {
            id: "option-2a",
            text: "Der Vermittlungsausschuss versucht einen Kompromiss",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Das ist der Weg, Konflikte zu beheben.",
          },
          {
            id: "option-2b",
            text: "Die Bundesregierung kann das Gesetz ungeachtet handeln",
            xp: 0,
            path: "independent",
            feedbackText:
              "Nein, bei Zustimmungsgesetzen braucht man den Bundesrat.",
          },
          {
            id: "option-2c",
            text: "Neuwahlen werden automatisch ausgerufen",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Nein, das ist nicht das Verfahren.",
          },
        ],
      },
      {
        id: "situation-3",
        chapterId: "bundesrat-foederalismus",
        description:
          "Welche Bereiche sind in Deutschland hauptsächlich Sache der Bundesländer?",
        options: [
          {
            id: "option-3a",
            text: "Bildung, Polizei und Kultur",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Gemäß Grundgesetz sind Bildung, innere Sicherheit und kulturelle Angelegenheiten Ländersache.",
          },
          {
            id: "option-3b",
            text: "Außenpolitik und Verteidigung",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Außenpolitik und Verteidigung sind Bundessache.",
          },
          {
            id: "option-3c",
            text: "Währung und internationaler Handel",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Währung und Außenhandel sind Bundeskompetenz.",
          },
        ],
      },
      {
        id: "situation-4",
        chapterId: "bundesrat-foederalismus",
        description:
          "Was ist der Finanzausgleich und welche Rolle spielt er im deutschen Föderalismus?",
        options: [
          {
            id: "option-4a",
            text: "Ein Ausgleichssystem, das Steuereinnahmen zwischen reichen und armen Ländern verteilt",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Der Finanzausgleich ist im Grundgesetz verankert und stellt sicher, dass alle Länder lebensfähig sind.",
          },
          {
            id: "option-4b",
            text: "Ein optionales Hilfsystem für Länder in Not",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Der Finanzausgleich ist nicht optional—er ist verfassungsrechtlich verpflichtend.",
          },
          {
            id: "option-4c",
            text: "Ein Mechanismus zur vollständigen Angleichung aller Landesbudgets",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Der Finanzausgleich gleicht aus, ohne eine völlige Angleichung anzustreben.",
          },
        ],
      },
      {
        id: "situation-6",
        chapterId: "bundesrat-foederalismus",
        description:
          "Wer ist nach dem Grundgesetz zuständig für die Regelung von Außenpolitik und Verteidigung?",
        options: [
          {
            id: "option-6a",
            text: "Der Bund (Bundesregierung und Bundestag)",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Außenpolitik und Verteidigung sind Bundeskompetenz gemäß Artikel 73 GG.",
          },
          {
            id: "option-6b",
            text: "Jedes Bundesland einzeln",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Außenpolitik und Verteidigung können nicht dezentral von Ländern geregelt werden.",
          },
          {
            id: "option-6c",
            text: "Gemeinsam Bund und Länder zusammen",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Diese Bereiche sind ausschließliche Bundeskompetenzen.",
          },
        ],
      },
      {
        id: "situation-7",
        chapterId: "bundesrat-foederalismus",
        description:
          "Warum gibt es den Bundesrat im politischen System Deutschlands?",
        options: [
          {
            id: "option-7a",
            text: "Damit die Bundesländer an der Gesetzgebung mitwirken können",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Der Bundesrat ist ein Verfassungsorgan, das den Bundesländern eine Rolle bei der Gesetzgebung gibt.",
          },
          {
            id: "option-7b",
            text: "Um den Bundeskanzler zu kontrollieren",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Die Kontrolle des Bundeskanzlers ist Aufgabe des Bundestags, nicht des Bundesrats.",
          },
          {
            id: "option-7c",
            text: "Um Wahlen zu organisieren",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Wahlen werden von den Ländern und dem Bundeswahlleiter organisiert.",
          },
        ],
      },
      {
        id: "situation-8",
        chapterId: "bundesrat-foederalismus",
        description:
          "Wie viele Stimmen entsenden die Bundesländer jeweils in den Bundesrat?",
        options: [
          {
            id: "option-8a",
            text: "Jedes Land genau 1 Stimme",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Die Stimmenzahl ist unterschiedlich und richtet sich nach der Bevölkerung.",
          },
          {
            id: "option-8b",
            text: "Zwischen 3 und 6 Stimmen – je nach Bevölkerung",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Die Stimmenzahl richtet sich nach der Bevölkerung der Bundesländer.",
          },
          {
            id: "option-8c",
            text: "Die Stimmenzahl wird bei jeder Abstimmung neu festgelegt",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Die Stimmenzahl ist festgelegt und richtet sich nach der Bevölkerung.",
          },
        ],
      },
      {
        id: "situation-9",
        chapterId: "bundesrat-foederalismus",
        description:
          "Wo ist die Aufteilung der Zuständigkeiten zwischen Bund und Ländern festgelegt?",
        options: [
          {
            id: "option-9a",
            text: "Im Bundesrat",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Der Bundesrat ist kein Ort, wo die Aufteilung der Zuständigkeiten festgelegt wird.",
          },
          {
            id: "option-9b",
            text: "Im Grundgesetz",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Das Grundgesetz legt die Aufteilung der Zuständigkeiten zwischen Bund und Ländern fest.",
          },
          {
            id: "option-9c",
            text: "In den Parteiprogrammen",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Die Aufteilung der Zuständigkeiten ist verfassungsrechtlich im Grundgesetz verankert.",
          },
        ],
      },
    ],
  },
  {
    id: "bundestagswahlen",
    title: "Bundestagswahlen",
    description: "Das deutsche Wahlsystem und Wahlprozess",
    difficulty: "medium",
    topicId: "bundestagswahlen",
    stageId: "grundlagen",
    category: "Grundwissen",
    icon: "🗳️",
    explanationCards: [
      {
        id: "1",
        title: "Wahlsystem",
        content:
          "• Personalisiertes Verhältniswahlsystem\n• Wähler haben 2 Stimmen\n• Erststimme: Kandidat im Wahlkreis\n• Zweitstimme: Partei (entscheidend für Sitzverteilung)",
      },
      {
        id: "2",
        title: "Sitzverteilung",
        content:
          "• Bundestag seit 2025: genau 630 Sitze\n• Verteilung nach Zweitstimmen (proportional)\n• {direktmandate}: nur wenn durch Quote gedeckt\n• Keine {uberhangmandate} und {ausgleichsmandate} mehr",
      },
      {
        id: "3",
        title: "Die 5%-Hürde",
        content:
          "• Partei braucht mindestens 5% Zweitstimmen\n• Ausnahme: 3+ {direktmandate} gedeckt durch Quote = Einzug unter 5%\n• Schützt vor Fragmentierung\n• Wichtiges Wahlsystem-Element",
      },
      {
        id: "4",
        title: "Wahlprozess",
        content:
          "• Wahl alle 4 Jahre\n• Wahlberechtigt: deutsche Bürger ab 18\n• Wahlgeheimnis verfassungsgeschützt\n• Koalitionsbildung, wenn keine Partei Mehrheit",
      },
      {
        id: "5",
        title: "Bundestagswahlen – Das Wichtigste auf einen Blick",
        content:
          "✨ Deutschland nutzt ein personalisiertes Verhältniswahlsystem\n✨ Wähler haben zwei Stimmen: Erststimme für Kandidaten, Zweitstimme für Partei\n✨ Der Bundestag hat seit 2025 genau 630 Sitze\n✨ Die Sitzverteilung ist proportional nach den Zweitstimmen\n✨ {direktmandate} zählen nur, wenn sie durch die Zweitstimmen-Quote gedeckt sind\n✨ Es gibt keine Überhang- und Ausgleichsmandate mehr\n✨ Die 5%-Hürde oder 3 {direktmandate} sind notwendig, um in den Bundestag einzuziehen\n✨ Bundestagswahlen finden alle 4 Jahre statt\n✨ Nach der Wahl wird eine {koalition} gebildet, wenn keine Partei die Mehrheit hat\n\nDamit verstehst du die zentralen Regeln der Bundestagswahl.",
      },
    ],
    situations: [
      {
        id: "situation-1",
        chapterId: "bundestagswahlen",
        description:
          "Wahr oder Falsch: Eine Partei mit 8% Zweitstimmen schafft den Einzug in den Bundestag.",
        options: [
          {
            id: "option-1a",
            text: "Richtig",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! 8% übersteigt die 5%-Hürde, daher zieht die Partei ein—auch ohne 3 Direktmandate.",
          },
          {
            id: "option-1b",
            text: "Falsch",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch. 8% übersteigt die 5%-Hürde deutlich, daher schafft die Partei garantiert den Einzug.",
          },
        ],
      },
      {
        id: "situation-2",
        chapterId: "bundestagswahlen",
        description:
          "Was ist der Unterschied zwischen Erststimme und Zweitstimme?",
        options: [
          {
            id: "option-2a",
            text: "Die Erststimme wählt einen Kandidaten im Wahlkreis, die Zweitstimme wählt eine Partei und bestimmt die proportionale Sitzverteilung",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Die Erststimme ermöglicht Direktmandate im Wahlkreis, die Zweitstimme ist entscheidend für die gesamte Sitzverteilung nach Proporz.",
          },
          {
            id: "option-2b",
            text: "Die Erststimme entscheidet über die Parteienstärke im Bundestag, die Zweitstimme ermöglicht Direktmandate im Wahlkreis",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Das ist umgekehrt. Die Zweitstimme bestimmt die Parteienstärke und Sitzverteilung, die Erststimme ermöglicht die Direktmandate.",
          },
          {
            id: "option-2c",
            text: "Die Erststimme ist für größere Wahlkreise, die Zweitstimme für kleinere Wahlkreise",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Die Unterscheidung ist nicht die Größe der Wahlkreise, sondern ihre Funktion: Erststimme = Kandidat, Zweitstimme = Partei und Proporz.",
          },
        ],
      },
      {
        id: "situation-3",
        chapterId: "bundestagswahlen",
        description:
          "Wer ist wahlberechtigt bei Bundestagswahlen?",
        options: [
          {
            id: "option-3a",
            text: "Deutsche Bürger ab 18 Jahren",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Nach dem Grundgesetz sind deutsche Bürger ab 18 Jahren bei Bundestagswahlen wahlberechtigt.",
          },
          {
            id: "option-3b",
            text: "Alle in Deutschland lebenden Personen ab 16 Jahren",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Die Altersgrenze ist 18 Jahre, und nur deutsche Staatsbürger sind wahlberechtigt—nicht alle in Deutschland Lebenden.",
          },
          {
            id: "option-3c",
            text: "Deutsche Bürger ab 21 Jahren mit mindestens 2 Jahren Wohnsitz in Deutschland",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Die Altersgrenze ist 18 Jahre, nicht 21. Für deutsche Bürger gibt es keine Wohnsitzvoraussetzung.",
          },
        ],
      },
      {
        id: "situation-4",
        chapterId: "bundestagswahlen",
        description:
          "Was ist der Zweck der 5%-Hürde im deutschen Wahlrecht?",
        options: [
          {
            id: "option-4a",
            text: "Sie soll Parlamentsfragmentierung verhindern und Regierungsstabilität fördern",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Die 5%-Hürde ist im Wahlgesetz verankert, um zu viele Kleinparteien zu vermeiden.",
          },
          {
            id: "option-4b",
            text: "Sie soll kleine Parteien aus dem Bundestag ausschließen",
            xp: 0,
            path: "independent",
            feedbackText:
              "Teilweise, aber der Hauptzweck ist die Fragmentierungsvermeidung und Stabilität.",
          },
          {
            id: "option-4c",
            text: "Sie hat keinen rechtlichen Grund und ist nur eine Tradition",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Die 5%-Hürde ist im Bundeswahlgesetz verankert.",
          },
        ],
      },
      {
        id: "situation-5",
        chapterId: "bundestagswahlen",
        description:
          "Ein Kandidat gewinnt seinen Wahlkreis mit der Erststimme. Sitzt er garantiert im Bundestag?",
        options: [
          {
            id: "option-5a",
            text: "Ja, wenn das Direktmandat durch die Zweitstimmen-Quote der Partei gedeckt ist",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Seit der Wahlrechtsreform 2025 gelten Direktmandate nur, wenn sie durch die proportionale Sitzzahl gedeckt sind.",
          },
          {
            id: "option-5b",
            text: "Ja, Direktmandate sind immer garantierte Sitze",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch. Seit 2025 müssen Direktmandate durch Zweitstimmen gedeckt sein.",
          },
          {
            id: "option-5c",
            text: "Nur wenn seine Partei über 5% kommt",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Teilweise, aber es kommt auch darauf an, ob die Sitze durch die Zweitstimmen-Quote gedeckt sind.",
          },
        ],
      },
      {
        id: "situation-6",
        chapterId: "bundestagswahlen",
        description:
          "Wie werden die 630 Bundestagssitze seit der Wahlrechtsreform 2025 auf die Parteien verteilt?",
        options: [
          {
            id: "option-6a",
            text: "Proportional nach den Zweitstimmen, unabhängig von Direktmandaten",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Die 630 Sitze werden nach Zweitstimmen verteilt. Direktmandate müssen durch diese Quote gedeckt sein.",
          },
          {
            id: "option-6b",
            text: "Nach Direktmandaten, plus zusätzliche Sitze für Ausgleich",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch. Seit 2025 gibt es keine Ausgleichsmandate mehr. Die Größe ist auf 630 Sitze begrenzt.",
          },
          {
            id: "option-6c",
            text: "Nach Zweitstimmen plus Überhangmandate für große Parteien",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch. Überhangmandate existieren nicht mehr. Der Bundestag hat genau 630 Sitze.",
          },
        ],
      },
      {
        id: "situation-7",
        chapterId: "bundestagswahlen",
        description:
          "Was passiert, wenn eine Partei viele Direktmandate gewinnt, aber wenig Zweitstimmen erhält?",
        options: [
          {
            id: "option-7a",
            text: "Sie bekommt alle Direktmandate automatisch",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Seit der Wahlrechtsreform 2025 müssen Direktmandate durch die Zweitstimmen-Quote gedeckt sein.",
          },
          {
            id: "option-7b",
            text: "Sie erhält nur so viele Sitze, wie ihr nach Zweitstimmen zustehen",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Seit 2025 sind Direktmandate nur dann Sitze im Bundestag, wenn sie durch die proportionale Sitzzahl gedeckt sind.",
          },
          {
            id: "option-7c",
            text: "Sie bekommt zusätzliche Ausgleichsmandate",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Ausgleichsmandate existieren seit 2025 nicht mehr. Der Bundestag hat genau 630 Sitze.",
          },
        ],
      },
      {
        id: "situation-8",
        chapterId: "bundestagswahlen",
        description:
          "Wie oft werden Bundestagswahlen durchgeführt?",
        options: [
          {
            id: "option-8a",
            text: "Alle 4 Jahre oder bei Auflösung",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Die normale Amtsperiode ist 4 Jahre.",
          },
          {
            id: "option-8b",
            text: "Alle 5 Jahre",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch - die Periode ist 4 Jahre, nicht 5.",
          },
          {
            id: "option-8c",
            text: "Nach Bedarf ohne festliegenden Rhythmus",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Nein, es gibt einen festgelegten 4-Jahres-Rhythmus.",
          },
        ],
      },
    ],
  },
  {
    id: "justiz-verfassungsgericht",
    title: "Justiz & Verfassungsgericht",
    description: "Das Rechtssystem und die Kontrollfunktion von Gerichten",
    difficulty: "hard",
    topicId: "justiz-verfassungsgericht",
    stageId: "grundlagen",
    category: "Vertiefung",
    icon: "⚖️",
    explanationCards: [
      {
        id: "1",
        title: "Justizsystem",
        content:
          "• Drei Ebenen: Amtsgerichte (lokal), Landgerichte (regional), Oberlandesgerichte (überregional)\n• Bundesgerichtshof = oberste Instanz\n• Richter sind Verfassungsgebunden\n• Richter sind unabhängig",
      },
      {
        id: "2",
        title: "Das Bundesverfassungsgericht",
        content:
          "• BVerfG = oberster Hüter des Grundgesetzes\n• Kontrolliert: Gesetze verfassungsgemäß?\n• Kann Gesetze für ungültig erklären\n• 16 Richter",
      },
      {
        id: "3",
        title: "Kontrollfunktion",
        content:
          "• Kann Gesetze aufheben (bei GG-Verletzung)\n• Schützt Grundrechte\n• Überprüft Wahlen\n• Kontrolliert die Regierung",
      },
      {
        id: "4",
        title: "Demokratische Kontrolle",
        content:
          "• Schützt Minderheitsrechte gegen Mehrheit\n• Essentiell für Demokratie\n• Kann umstritten sein\n• Richter gegen Bundestag-Mehrheiten möglich",
      },
      {
        id: "5",
        title: "Justiz & Verfassungsgericht im Überblick",
        content:
          "✨ Das deutsche Justizsystem hat drei Ebenen: Amtsgerichte, Landgerichte und Oberlandesgerichte\n✨ Der Bundesgerichtshof ist die oberste Instanz für normale Gerichte\n✨ Das {bundesverfassungsgericht} ist der oberste Hüter des {grundgesetz}es\n✨ Das {bundesverfassungsgericht} kontrolliert, ob Gesetze verfassungsgemäß sind\n✨ Es kann Gesetze für ungültig erklären und schützt damit die {grundrechte}\n✨ Richter sind unabhängig und verfassungsgebunden\n✨ Das {bundesverfassungsgericht} schützt Minderheitsrechte gegen Mehrheitsmacht\n\nDamit verstehst du die Kontrollfunktion der Judikative in unserer Demokratie! 🏛️",
      },
    ],
    situations: [
      {
        id: "situation-1",
        chapterId: "justiz-verfassungsgericht",
        description:
          "Das BVerfG erklärt ein Gesetz für verfassungswidrig. Was passiert?",
        options: [
          {
            id: "option-1a",
            text: "Das Gesetz ist ungültig und wird aufgehoben",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Das BVerfG-Urteil ist final und binding.",
          },
          {
            id: "option-1b",
            text: "Der Bundestag kann es mit Mehrheit ignorieren",
            xp: 0,
            path: "independent",
            feedbackText:
              "Nein, Gerichte sind höher in der Rechtshierarchie.",
          },
          {
            id: "option-1c",
            text: "Es wird dem Bundesrat zur Abstimmung vorgelegt",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Nein, das ist nicht das Verfahren.",
          },
        ],
      },
      {
        id: "situation-2",
        chapterId: "justiz-verfassungsgericht",
        description:
          "Welche Aufgabe hat das Bundesverfassungsgericht nach dem Grundgesetz?",
        options: [
          {
            id: "option-2a",
            text: "Es prüft, ob Gesetze und Regierungshandeln mit der Verfassung vereinbar sind",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Das BVerfG ist der oberste Hüter des Grundgesetzes und kontrolliert Verfassungsmäßigkeit.",
          },
          {
            id: "option-2b",
            text: "Es ernennt die Bundesregierung und kontrolliert ihre Politik",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Das BVerfG ernennt nicht und regiert nicht—es prüft nur Verfassungsmäßigkeit.",
          },
          {
            id: "option-2c",
            text: "Es führt normale Zivilverfahren durch wie andere Gerichte",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Das BVerfG ist spezialisiert auf Verfassungsfragen, nicht auf allgemeine Zivilrecht.",
          },
        ],
      },
      {
        id: "situation-3",
        chapterId: "justiz-verfassungsgericht",
        description:
          "Wie schützt das Grundgesetz die Unabhängigkeit von Richtern?",
        options: [
          {
            id: "option-3a",
            text: "Richter können nach ihrer Ernennung nicht ohne Grund entlassen werden und unterliegen nur dem Gesetz",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Artikel 97 GG garantiert die Unabhängigkeit und Sicherheit der Richterposition.",
          },
          {
            id: "option-3b",
            text: "Richter sind nur weisungsgebunden an ihre Partei",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Richter sind unabhängig—sie unterstehen keiner Partei.",
          },
          {
            id: "option-3c",
            text: "Es gibt keinen speziellen Schutz—Richter sind wie andere Beamte",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Richter haben besonderen verfassungsrechtlichen Schutz ihrer Unabhängigkeit.",
          },
        ],
      },
      {
        id: "situation-4",
        chapterId: "justiz-verfassungsgericht",
        description:
          "Was bedeutet Richterunabhängigkeit nach dem deutschen Recht?",
        options: [
          {
            id: "option-4a",
            text: "Richter sind nur dem Gesetz unterworfen und nicht an Parteiweisungen gebunden",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Artikel 97 Absatz 1 GG: Richter sind unabhängig und nur dem Gesetz unterworfen.",
          },
          {
            id: "option-4b",
            text: "Richter können ihrer Partei folgen, wenn das ihre persönliche Überzeugung ist",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Richterunabhängigkeit bedeutet, dass Richter keine Parteiweisungen befolgen dürfen.",
          },
          {
            id: "option-4c",
            text: "Richterunabhängigkeit ist ein Ideal, aber in der Praxis folgen sie der Mehrheit",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Richterunabhängigkeit ist ein verfassungsrechtliches Prinzip, nicht nur ein Ideal.",
          },
        ],
      },
      {
        id: "situation-5",
        chapterId: "justiz-verfassungsgericht",
        description:
          "Welche Stellung haben BVerfG-Urteile zur Verfassung?",
        options: [
          {
            id: "option-5a",
            text: "Sie sind bindend und können nicht durch Gesetze oder Volksentscheide überstimmt werden",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! BVerfG-Urteile sind final und schützen die Verfassung—sie sind höherrangig als Gesetze.",
          },
          {
            id: "option-5b",
            text: "Sie sind Empfehlungen, die der Bundestag ignorieren kann",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! BVerfG-Urteile sind bindend—der Bundestag muss sie befolgen.",
          },
          {
            id: "option-5c",
            text: "Sie sind gleichberechtigt mit Bundesgesetzen",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Verfassungsgerichtsurteile sind höherrangig als normale Bundesgesetze.",
          },
        ],
      },
      {
        id: "situation-6",
        chapterId: "justiz-verfassungsgericht",
        description:
          "Was darf das BVerfG laut Grundgesetz tun, wenn es ein Gesetz für verfassungswidrig erklärt?",
        options: [
          {
            id: "option-6a",
            text: "Das Gesetz aufheben und damit ungültig machen",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Das BVerfG kann verfassungswidrige Gesetze aufheben—das ist seine gesetzliche Befugnis.",
          },
          {
            id: "option-6b",
            text: "Ein neues Gesetz schreiben, um es zu ersetzen",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Das BVerfG hebt das Gesetz auf, muss aber kein neues schreiben.",
          },
          {
            id: "option-6c",
            text: "Den Bundestag beauftragen, es zu ändern, mit unverbindlichen Empfehlungen",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! BVerfG-Urteile sind bindend, nicht empfehlend.",
          },
        ],
      },
      {
        id: "situation-7",
        chapterId: "justiz-verfassungsgericht",
        description:
          "Wahr oder Falsch: Das Bundesverfassungsgericht kann eine Partei verbieten, wenn sie verfassungsfeindlich ist.",
        options: [
          {
            id: "option-7a",
            text: "Richtig",
            xp: 30,
            path: "established",
            feedbackText:
              "Richtig! Nach Art. 21 Abs. 2 GG kann das BVerfG Parteien verbieten, wenn sie gegen die FDGO (Freiheitliche Demokratische Grundordnung) verstoßen.",
          },
          {
            id: "option-7b",
            text: "Falsch",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch. Das BVerfG hat gemäß Grundgesetz die Befugnis, Parteien zu verbieten, wenn sie verfassungsfeindlich sind.",
          },
        ],
      },
      {
        id: "situation-8",
        chapterId: "justiz-verfassungsgericht",
        description:
          "Wie ist das deutsche Justizsystem strukturiert—wer entscheidet in Gerichtsverfahren?",
        options: [
          {
            id: "option-8a",
            text: "Berufliche Richter entscheiden; in Strafverfahren können Laienrichter mitwirken",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Deutschland nutzt ein Richterbankensystem mit Fachrichtern und Laienrichtern (Geschworene in bestimmten Fällen).",
          },
          {
            id: "option-8b",
            text: "Nur professionelle Richter entscheiden—kein Jury-System",
            xp: 0,
            path: "independent",
            feedbackText:
              "Teilweise richtig, aber Deutschland hat Laienmitwirkung in Form von Schöffen in Strafverfahren.",
          },
          {
            id: "option-8c",
            text: "Nur Juries von Bürgern entscheiden, ohne Richter",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Deutschland verwendet kein reines Jury-System wie angelsächsische Länder.",
          },
        ],
      },
    ],
  },
  {
    id: "grundgesetz-vertiefung",
    title: "Grundgesetz - Vertiefung & Analyse",
    description: "Teste dein Verständnis auf höherem Niveau",
    difficulty: "hard",
    topicId: "grundgesetz",
    stageId: "vertiefung",
    category: "Vertiefung",
    icon: "🔬",
    explanationCards: [
      {
        id: "1",
        title: "Vertiefung & Analyse",
        content:
          "Willkommen zu einem intensiveren Lernmodul! Hier werden deine Kenntnisse des Grundgesetzes auf akademisches Niveau vertieft. Du wirst Aussagen bewerten, Konzepte vergleichen und kritisch hinterfragen.\n\n👉 Stelle sicher, dass du die Grundlagen des Grundgesetzes bereits kennst, bevor du dieses Modul startest.\n\nViel Erfolg!",
      },
      {
        id: "2",
        title: "Rechtshierarchie und Verfassungsprimat",
        content:
          "Das Grundgesetz steht an der Spitze der deutschen Rechtsordnung:\n\n• Grundgesetz (Verfassung) = höchste Rechtsquelle\n• Bundesgesetze = müssen dem GG entsprechen\n• Landesgesetze = müssen dem GG und Bundesgesetzen entsprechen\n• Verordnungen und Verwaltungsakte = unterste Ebene\n\nWenn ein Bundesgesetz dem Grundgesetz widerspricht, kann das Bundesverfassungsgericht es aufheben. Dies ist der Verfassungsprimat.",
      },
      {
        id: "3",
        title: "Wie kann man das Grundgesetz ändern?",
        content:
          "Das Grundgesetz ist nicht unveränderbar, aber schwer zu ändern:\n\n• Regeländerungen: Benötigen Zwei-Drittel-Mehrheit im Bundestag und Bundesrat\n• Über 60 Änderungen seit 1949 (z.B. Wiedervereinigung 1990, Maastricht-Vertrag)\n• Die meisten Artikel können so geändert werden\n\nABER: Artikel 79 Absatz 3 sperrt bestimmte Kernprinzipien vor Änderung. Dies ist die Ewigkeitsklausel.",
      },
      {
        id: "4",
        title: "Die Geschichte des Grundgesetzes: Von 1949 bis heute",
        content:
          "Das Grundgesetz wurde 1949 geschaffen – aber mit einem besonderen Hintergrund:\n\n• Grund: Nach 1945 existierte kein deutsches Staatsgebilde\n• Westdeutschland: Alliierte genehmigten ein provisorisches 'Grundgesetz' (nicht 'Verfassung'!)\n• Ostdeutschland: Entwickelte unter sowjetischer Kontrolle eine separate Verfassung\n• Ziel: Das GG sollte temporär sein, bis 'ein deutscher Staat' wiedervereinigt wird\n\nDie Wiedervereinigung 1990:\n• Mit der Wiedervereinigung trat das GG auf ganz Deutschland in Kraft\n• Das GG behielt seinen Namen und wurde das Fundament der neuen Bundesrepublik\n• Technisch war der alte 'provisorische' Charakter damit Geschichte",
      },
      {
        id: "6",
        title: "Die Ewigkeitsklausel – die unabänderbare Garantie",
        content:
          "Artikel 79 Abs. 3 GG erklärt diese Prinzipien für ABSOLUT unabänderbar:\n\n• Die Menschenrechte und Grundrechte\n• Die föderalistische Struktur (Länder, Länderrat = Bundesrat)\n• Die Demokratie und Rechtsstaatlichkeit\n\nSelbst eine einstimmige, 100%-Mehrheit kann diese nicht ändern.\n\nWhy? Historischer Grund: Weimarer Republik (1919-1933) – dort konnten Verfassungsschutzbestimmungen einfach mit Mehrheit ausgehebelt werden, was zum Aufstieg des Nationalsozialismus beitrug.",
      },
      {
        id: "5",
        title: "Das Grundgesetz im Überblick",
        content:
          "✨ Das {grundgesetz} ist das Fundament der deutschen Rechtordnung und steht an der Spitze der {rechtshierarchie}\n✨ Es wurde 1949 für Westdeutschland geschaffen und trat 1990 mit der {wiedervereinigung} auf ganz Deutschland in Kraft\n✨ Das {grundgesetz} kann geändert werden, benötigt aber eine Zwei-Drittel-Mehrheit im {bundestag} und {bundesrat}\n✨ Seit 1949 gab es über 60 {verfassungsänderungen}, zum Beispiel zur {wiedervereinigung}\n✨ Die {ewigkeitsklausel} (Artikel 79 Abs. 3) schützt unverhandelbare Kernprinzipien:\n   • Die {menschenrechte} und {grundrechte}\n   • Die {föderalismus|föderalistische Struktur}  \n   • Die {demokratie} und {rechtsstaatlichkeit}\n✨ Das {bundesverfassungsgericht} als oberster {verfassungsschutz|Hüter des Grundgesetzes} kann Gesetze aufheben\n✨ Der historische Grund für die {ewigkeitsklausel}: Die {weimarische_republik} Verfassung konnte von einer Mehrheit ausgehebelt werden, was zum Aufstieg des Nationalsozialismus beitrug\n\nDamit verstehst du die rechtlichen und historischen Fundamente der deutschen Verfassung! 📜",
      },
    ],
    situations: [
      {
        id: "analysis-situation-1",
        chapterId: "grundgesetz-vertiefung",
        description:
          "Das Grundgesetz wurde 1949 für Westdeutschland geschaffen. Welche Aussage über seinen heutigen Status und Geltungsbereich ist korrekt?",
        options: [
          {
            id: "opt-1a",
            text: "Das Grundgesetz gilt seit der Wiedervereinigung 1990 für ganz Deutschland, ist aber technisch noch immer eine provisorische Verfassung",
            xp: 25,
            path: "established",
            feedbackText:
              "Das ist eine differenzierte Betrachtung. Das Grundgesetz wurde 1990 mit der Wiedervereinigung auf ganz Deutschland ausgedehnt (Artikel 23 Abs. 1 alter Fassung). Technisch behielt es seinen Namen und Charakter als 'Grundgesetz' auch nach 1990. Das Grundgesetz war ursprünglich als Übergangsverfassung für Westdeutschland gedacht. Mit der Wiedervereinigung 1990 wurde es auf die neuen Bundesländer ausgedehnt und ist nun die geltende Verfassung für die gesamte Bundesrepublik Deutschland.",
          },
          {
            id: "opt-1b",
            text: "Das Grundgesetz war eine Provisorium für Westdeutschland und wurde 1990 vollständig durch eine neue Verfassung ersetzt",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Das Grundgesetz wurde nicht ersetzt, sondern auf das wiedervereinigt Deutschland erweitert.",
          },
          {
            id: "opt-1c",
            text: "Das Grundgesetz gilt nur für Westdeutschland; Ostdeutschland hat eine separate Verfassung",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Das Grundgesetz gilt seit 1990 für ganz Deutschland.",
          },
        ],
      },
      {
        id: "analysis-situation-2",
        chapterId: "grundgesetz-vertiefung",
        description:
          "Bewerte folgende Aussage: 'Das Grundgesetz ist ein starres, unveränderliches Dokument, das seit 1949 unverändert geblieben ist.'",
        options: [
          {
            id: "opt-2a",
            text: "Diese Aussage ist völlig falsch. Das Grundgesetz wurde über 60 Mal geändert und ist flexibel",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Das Grundgesetz ist durchaus veränderbar, aber mit starken Einschränkungen. Mehr als 60 Änderungen belegen seine Flexibilität, nicht seine Starre. Artikel 79 GG erlaubt Änderungen mit Zwei-Drittel-Mehrheit in Bundestag und Bundesrat. Allerdings schützt Artikel 79 Abs. 3 (die Ewigkeitsklausel) bestimmte Kernprinzipien vor Änderung.",
          },
          {
            id: "opt-2b",
            text: "Diese Aussage ist wahr. Das Grundgesetz kann nicht geändert werden und ist starr",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Das Grundgesetz kann geändert werden – über 60 Änderungen sind bereits durchgeführt worden.",
          },
          {
            id: "opt-2c",
            text: "Diese Aussage ist teilweise wahr. Es wurde nur kleine technische Anpassungen vorgenommen",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Die Änderungen waren oft substanziell, nicht nur technisch.",
          },
        ],
      },
      {
        id: "analysis-situation-3",
        chapterId: "grundgesetz-vertiefung",
        description:
          "Vergleiche die rechtliche Bindungskraft und den Anwendungsbereich von 'Grundgesetz' und 'Bundesgesetze'. Welche Aussage ist korrekt?",
        options: [
          {
            id: "opt-3a",
            text: "Das Grundgesetz ist übergeordnet. Bundesgesetze dürfen nicht gegen das GG verstoßen; Gerichte können GG-widrige Gesetze aufheben",
            xp: 25,
            path: "established",
            feedbackText:
              "Genau! Das Grundgesetz steht an der Spitze der deutschen Rechtsordnung. Das Grundgesetz ist die Verfassung und die oberste Rechtsquelle. Alle Bundesgesetze, Landesgesetze und staatlichen Handlungen müssen mit dem Grundgesetz vereinbar sein. Das Bundesverfassungsgericht prüft dies und kann GG-widrige Gesetze aufheben.",
          },
          {
            id: "opt-3b",
            text: "Bundesgesetze sind übergeordnet, weil sie später erlassen wurden und das Grundgesetz ersetzen",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Das zeitliche Erlassungsdatum spielt keine Rolle – das GG ist immer übergeordnet.",
          },
          {
            id: "opt-3c",
            text: "Grundgesetz und Bundesgesetze haben gleiche Geltung; es gibt keine Hierarchie",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Es gibt eine klare hierarchische Ordnung – das GG ist an der Spitze.",
          },
        ],
      },
      {
        id: "analysis-situation-4",
        chapterId: "grundgesetz-vertiefung",
        description:
          "Vergleiche die Ewigkeitsklausel (Art. 79 Abs. 3 GG) mit den regulären Änderungsmöglichkeiten (Art. 79 Abs. 1 u. 2 GG). Welche Beschreibung ist am präzisesten?",
        options: [
          {
            id: "opt-4a",
            text: "Reguläre Änderungen erfordern Zwei-Drittel-Mehrheit, aber Ewigkeitsklausel-Prinzipien sind unabhängig von jeder Mehrheit unabänderbar",
            xp: 25,
            path: "established",
            feedbackText:
              "Ausgezeichnet! Du hast die entscheidende Grenze erkannt. Das Grundgesetz schafft zwei verschiedene Schutzebenen: Artikel 79 Abs. 1-2 erlaubt Änderungen mit Zwei-Drittel-Mehrheit für die meisten Artikel. Artikel 79 Abs. 3 (Ewigkeitsklausel) erklärt drei Prinzipien für unabänderbar: die Menschenrechte, die föderale Struktur und die demokratische Grundordnung.",
          },
          {
            id: "opt-4b",
            text: "Sowohl reguläre als auch Ewigkeitsklausel-Änderungen erfordern Zwei-Drittel-Mehrheit; es gibt da keinen wesentlichen Unterschied",
            xp: 0,
            path: "independent",
            feedbackText: "Falsch! Die Ewigkeitsklausel schafft eine absolute, unüberwindbare Grenze.",
          },
          {
            id: "opt-4c",
            text: "Die Ewigkeitsklausel kann mit dreifacher Mehrheit geändert werden",
            xp: 0,
            path: "isolated",
            feedbackText: "Falsch! Keine noch so große Mehrheit kann die Ewigkeitsklausel ändern.",
          },
        ],
      },
      {
        id: "analysis-situation-5",
        chapterId: "grundgesetz-vertiefung",
        description:
          "Das Grundgesetz enthält die Ewigkeitsklausel (Art. 79 Abs. 3), die Änderungen an bestimmten Grundprinzipien absolut verbietet. Welche Sicht ist akademisch am besten begründet?",
        options: [
          {
            id: "opt-5a",
            text: "Klarer Vorteil: Sie schützt Kernprinzipien vor populistischen Mehrheiten und sichert Stabilität",
            xp: 0,
            path: "established",
            feedbackText:
              "Das ist eine sinnvolle Sicht, aber zu einseitig. Die Ewigkeitsklausel verkörpert ein bewusstes demokratisches Paradoxon: Sie schützt die Demokratie selbst vor ihrer Zerstörung durch demokratische Mehrheiten. Historisch ist dieser Schutz sinnvoll (Weimarer Republik). Allerdings hat sie auch Nachteile.",
          },
          {
            id: "opt-5b",
            text: "Klarer Nachteil: Sie behindert Reformen und bindet zukünftige Generationen unnötig",
            xp: 0,
            path: "independent",
            feedbackText:
              "Das ist auch eine nachvollziehbare Kritik, aber zu einseitig. Kritiker argumentieren, dass sie legitime Reformen blockieren kann. Allerdings bietet sie auch wertvollen Schutz vor autoritären Tendenzen.",
          },
          {
            id: "opt-5c",
            text: "Beides hat Merits: Sie schützt essentielle Werte, aber kann auch berechtigte Reformen blockieren – ein strukturelles Spannungsverhältnis",
            xp: 25,
            path: "established",
            feedbackText:
              "Ausgezeichnet! Das ist die akademisch differenzierteste Sicht. Die Ewigkeitsklausel verkörpert ein Spannungsverhältnis zwischen Stabilitätsschutz und Reformfähigkeit. Andere Demokratien handhaben dies flexibler. Die optimale Balance ist ein anhaltender Diskurs der Verfassungstheorie.",
          },
        ],
      },
      {
        id: "analysis-situation-6",
        chapterId: "grundgesetz-vertiefung",
        description:
          "Ein neues Bundesgesetz wird mit Zwei-Drittel-Mehrheit im Bundestag und Bundesrat verabschiedet. Später stellt sich heraus, dass dieses Gesetz den Menschenrechtsartikel des Grundgesetzes verletzt. Was kann das Bundesverfassungsgericht tun?",
        options: [
          {
            id: "opt-6a",
            text: "Das Gesetz muss respektiert werden – eine Zwei-Drittel-Mehrheit ist so mächtig, dass sie über dem GG steht",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Eine Zwei-Drittel-Mehrheit ist nur für GG-Änderungen nötig. Für Bundesgesetze gilt kein besonderen Schutz – sie müssen dem GG entsprechen.",
          },
          {
            id: "opt-6b",
            text: "Das Bundesverfassungsgericht kann das Gesetz für GG-widrig erklären und aufheben – auch wenn es mit Zwei-Drittel-Mehrheit verabschiedet wurde",
            xp: 25,
            path: "established",
            feedbackText:
              "Genau! Das ist eine zentrale Funktion des Bundesverfassungsgerichts. Es schützt den Verfassungsprimat. Alle Gesetze – egal mit welcher Mehrheit verabschiedet – müssen dem GG entsprechen. Das BVerfG prüft dies und kann GG-widrige Gesetze aufheben. Dies ist die 'Kontrollfunktion' der Justiz.",
          },
          {
            id: "opt-6c",
            text: "Das BVerfG kann das Gesetz kritisieren, aber es muss es akzeptieren und kann es nicht aufheben",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Das Bundesverfassungsgericht hat echte Macht: Es kann GG-widrige Gesetze kassieren und für nichtig erklären.",
          },
        ],
      },
      {
        id: "analysis-situation-7",
        chapterId: "grundgesetz-vertiefung",
        description:
          "Ein Gesetzgeber möchte Artikel 1 des Grundgesetzes ändern (die Menschenrechte). Der Vorschlag erhält im Bundestag 99% Zustimmung und im Bundesrat auch. Kann diese Änderung durchgesetzt werden?",
        options: [
          {
            id: "opt-7a",
            text: "Ja, wenn 99% zustimmen, kann alles geändert werden – das ist die Kraft der Demokratie",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Artikel 1 (Menschenrechte) ist durch die Ewigkeitsklausel geschützt. Nicht einmal eine einstimmige (100%-ige) Mehrheit könnte dies ändern.",
          },
          {
            id: "opt-7b",
            text: "Nein, Artikel 1 ist durch die Ewigkeitsklausel geschützt – keine noch so große Mehrheit kann ihn ändern",
            xp: 25,
            path: "established",
            feedbackText:
              "Ausgezeichnet! Das ist die korrekte Antwort. Die Ewigkeitsklausel (Art. 79 Abs. 3) erklärt die Menschenrechte für unabänderbar. Dies ist eine bewusste Grenze der Demokratie: Sie schützt sich selbst vor ihrer Zerstörung.",
          },
          {
            id: "opt-7c",
            text: "Ja, die Ewigkeitsklausel kann selbst mit Zwei-Drittel-Mehrheit geändert werden",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Die Ewigkeitsklausel schafft eine absolute, überwindbare Grenze – nicht einmal sie selbst kann geändert werden.",
          },
        ],
      },
      {
        id: "analysis-situation-8",
        chapterId: "grundgesetz-vertiefung",
        description:
          "Szenario: Deutschland möchte einem internationalen Vertrag beitreten, der aber die föderale Struktur (Bundesländer) aufgeben würde – alles würde zentral geregelt. Ist dies verfassungsrechtlich möglich?",
        options: [
          {
            id: "opt-8a",
            text: "Nein, die Ewigkeitsklausel schützt die föderale Struktur – sie kann nicht aufgegeben werden",
            xp: 25,
            path: "established",
            feedbackText:
              "Korrekt! Die Ewigkeitsklausel schützt drei Prinzipien: Menschenrechte, föderale Struktur und Demokratie. Eine Zentralisierung, die die Bundesländer aufhebt, würde die föderale Struktur verletzen. Dies ist auch ein historischer Schutz: Das föderale System ist eines der Grundprinzipien des deutschten Staates seit 1949.",
          },
          {
            id: "opt-8b",
            text: "Ja, wenn es zur internationalen Sicherheit dient, kann die föderale Struktur aufgegeben werden",
            xp: 0,
            path: "independent",
            feedbackText:
              "Falsch! Die Ewigkeitsklausel kennt keine Ausnahmen – auch nicht für internationale Verträge oder 'höhere Ziele'.",
          },
          {
            id: "opt-8c",
            text: "Das hängt von einer Volksabstimmung ab – wenn die Mehrheit zustimmt, ist alles möglich",
            xp: 0,
            path: "isolated",
            feedbackText:
              "Falsch! Die Ewigkeitsklausel ist nicht dem Volksentscheid unterworfen – es gibt hier keine Abstimmung.",
          },
        ],
      },
    ],
  },
  ...bundestagsChapters,
];

/**
 * Utility functions for topic and stage navigation
 */

export function getTopicById(topicId: string): Topic | undefined {
  return topics.find((t) => t.id === topicId);
}

export function getChaptersForTopic(topicId: string): Chapter[] {
  return sampleChapters.filter((ch) => ch.topicId === topicId);
}

export function getChaptersForTopicAndStage(
  topicId: string,
  stageId: string
): Chapter[] {
  return sampleChapters.filter(
    (ch) => ch.topicId === topicId && ch.stageId === stageId
  );
}

export function getAvailableStagesForTopic(topicId: string): LearningStage[] {
  const chapters = getChaptersForTopic(topicId);
  const stageIds = new Set(chapters.map((ch) => ch.stageId));
  return learningStages.filter(
    (stage) => stageIds.has(stage.id)
  );
}
