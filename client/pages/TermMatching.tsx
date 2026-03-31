import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Lock, CheckCircle, XCircle, X, Info } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/useAuth';
import { GuestModeBanner } from '@/components/GuestModeBanner';
import { ProfileDropdown } from '@/components/ProfileDropdown';

interface TermMatchingProgress {
  level: number;
  unlocked: boolean;
  completed: boolean;
  score?: number;
}

interface RpcResponse {
  passed: boolean;
  points_earned: number;
  next_level_unlocked: boolean;
  is_replay: boolean;
}

// Level definitions
const LEVELS = {
  1: {
    title: 'Grundlagen des Staates',
    terms: ['Grundgesetz', 'Bundestag', 'Bundesregierung', 'Bundesrat', 'Bundespräsident', 'Ministerpräsident', 'Verwaltung', 'Föderale Struktur', 'Legislatur', 'Judikative'],
    definitions: [
      { short: 'höchste Rechtsquelle', long: 'Das Grundgesetz ist die Verfassung der Bundesrepublik Deutschland. Es legt die Grundrechte fest und bestimmt die Struktur des Staates. Kein anderes Gesetz darf dem Grundgesetz widersprechen.' },
      { short: 'Parlament', long: 'Der Bundestag ist das Parlament der Bundesrepublik und wird direkt vom Volk gewählt. Er macht Gesetze und kontrolliert die Regierung. Abgeordnete vertreten ihre Wahlkreise und Parteien.' },
      { short: 'Exekutive', long: 'Die Bundesregierung führt die politische Geschäfte aus und setzt Gesetze um. Sie besteht aus dem Bundeskanzler und den Bundesministern, die verschiedene Ressorts leiten.' },
      { short: 'Vertretung der Länder', long: 'Der Bundesrat ist das Organ, in dem die Bundesländer vertreten sind. Jedes Land entsendet Minister in den Bundesrat. Er muss vielen Gesetzen zustimmen und schützt die Rechte der Länder.' },
      { short: 'Repräsentant des deutschen Staates', long: 'Der Bundespräsident ist das Staatsoberhaupt der Bundesrepublik. Er unterzeichnet Gesetze und ernennt Minister und Richter. Seine Rolle ist eher symbolisch, aber sehr wichtig für die Einheit.' },
      { short: 'Regierungschef eines Bundeslandes', long: 'Der Ministerpräsident leitet die Landesregierung eines Bundeslandes. Er ist der höchste politische Funktionär auf Länderebene und führt die Geschäfte des Landes.' },
      { short: 'Umsetzung von Gesetzen', long: 'Die Verwaltung ist der Teil des Staates, der Gesetze in die Praxis umsetzt. Sie arbeitet in Behörden und Ämtern und verwaltet Schulen, Sozialleistungen, Steuern und vieles mehr.' },
      { short: 'Machtverteilung auf mehrere Ebenen', long: 'Die föderale Struktur Deutschlands bedeutet, dass die Macht auf Bund und Länder verteilt ist. Jede Ebene hat eigene Aufgaben und Rechte. Dies bietet mehr Mitsprache auf lokaler Ebene.' },
      { short: 'Gesetzgebende Gewalt', long: 'Die Legislatur ist die gesetzgebende Gewalt eines Staates. Sie ist verantwortlich für die Verabschiedung von Gesetzen. Im Bundestag sitzen Abgeordnete, die die Bevölkerung vertreten und über Gesetze abstimmen.' },
      { short: 'Rechtsprechende Gewalt', long: 'Die Judikative ist die Rechtsprechung, also die Gerichte und Richter. Sie entscheiden Rechtsstreitigkeiten und überprüfen, ob Gesetze und Behördenhandeln verfassungsgemäß sind. Die Unabhängigkeit der Gerichte ist ein Grundprinzip.' },
    ],
    correctMatches: {
      'Grundgesetz': 'höchste Rechtsquelle',
      'Bundestag': 'Parlament',
      'Bundesregierung': 'Exekutive',
      'Bundesrat': 'Vertretung der Länder',
      'Bundespräsident': 'Repräsentant des deutschen Staates',
      'Ministerpräsident': 'Regierungschef eines Bundeslandes',
      'Verwaltung': 'Umsetzung von Gesetzen',
      'Föderale Struktur': 'Machtverteilung auf mehrere Ebenen',
      'Legislatur': 'Gesetzgebende Gewalt',
      'Judikative': 'Rechtsprechende Gewalt',
    },
  },
  2: {
    title: 'Politische Prinzipien',
    terms: ['Gewaltenteilung', 'Demokratie', 'Rechtsstaat', 'Föderalismus', 'Pluralismus', 'Legitimation', 'Gewaltenkontrolle', 'Volkssouveränität', 'Parlamentarismus', 'Repräsentation'],
    definitions: [
      { short: 'Aufteilung staatlicher Macht', long: 'Die Gewaltenteilung ist ein Kernprinzip der Demokratie: Die Macht ist auf Legislative (Gesetzgebung), Exekutive (Ausführung) und Judikative (Rechtsprechung) verteilt. So kann keine Seite zu mächtig werden.' },
      { short: 'Herrschaft des Volkes', long: 'In einer Demokratie geht die Herrschaft vom Volk aus. Die Bürger wählen ihre Vertreter und können an Entscheidungen teilhaben. Dies geschieht durch Wahlen, Abstimmungen und Mitsprache.' },
      { short: 'Bindung an Recht und Gesetz', long: 'Der Rechtsstaat bedeutet, dass alle – auch der Staat – an die Gesetze gebunden sind. Es gibt keine willkürliche Herrschaft. Unabhängige Gerichte schützen die Rechte der Bürger vor staatlicher Gewalt.' },
      { short: 'Machtverteilung zwischen Bund und Ländern', long: 'Der Föderalismus ist die Struktur, in der ein Staat aus mehreren Bundesländern besteht. Bund und Länder teilen sich die Macht. Dies ermöglicht Vielfalt und regionale Besonderheiten.' },
      { short: 'Vielfalt von Meinungen und Gruppen', long: 'Pluralismus bedeutet, dass verschiedene Gruppen und Meinungen in der Gesellschaft nebeneinander existieren können. Parteien, Verbände und Medien bringen unterschiedliche Perspektiven ein und bereichern die Debatte.' },
      { short: 'Gesellschaftliche Anerkennung', long: 'Legitimation bedeutet, dass der Staat und seine Entscheidungen vom Volk anerkannt und akzeptiert werden. Der Staat hat nur dann Macht, wenn die Bürger ihn als berechtigt erachten. Diese Anerkennung entsteht durch demokratische Prozesse wie Wahlen und Gesetze.' },
      { short: 'System der gegenseitigen Kontrolle', long: 'Durch Gewaltenkontrolle kontrollieren sich die drei Gewalten gegenseitig. Das Parlament kontrolliert die Regierung, die Gerichte überprüfen Gesetze. So wird Machtvollkommenheit verhindert.' },
      { short: 'Die höchste Gewalt liegt beim Volk', long: 'Volkssouveränität bedeutet, dass alle Staatsgewalt vom Volk ausgeht. Der Staat hat seine Macht vom Volk und muss sich vor ihm verantworten. Wahlen und Abstimmungen sind Ausdruck dieser Souveränität.' },
      { short: 'Regierungssystem mit Parlamentsbeteiligung', long: 'Der Parlamentarismus ist ein Regierungssystem, in dem das Parlament eine zentrale Rolle spielt. Die Regierung ist vom Vertrauen des Parlaments abhängig und muss sich diesem gegenüber verantworten. Dies sichert demokratische Kontrolle.' },
      { short: 'Vertretung durch gewählte Abgeordnete', long: 'Repräsentation bedeutet, dass das Volk nicht direkt regiert, sondern sich durch gewählte Vertreter vertreten lässt. Diese Abgeordneten treffen Entscheidungen im Namen des Volkes. Dies ist typisch für repräsentative Demokratien wie Deutschland.' },
    ],
    correctMatches: {
      'Gewaltenteilung': 'Aufteilung staatlicher Macht',
      'Demokratie': 'Herrschaft des Volkes',
      'Rechtsstaat': 'Bindung an Recht und Gesetz',
      'Föderalismus': 'Machtverteilung zwischen Bund und Ländern',
      'Pluralismus': 'Vielfalt von Meinungen und Gruppen',
      'Legitimation': 'Gesellschaftliche Anerkennung',
      'Gewaltenkontrolle': 'System der gegenseitigen Kontrolle',
      'Volkssouveränität': 'Die höchste Gewalt liegt beim Volk',
      'Parlamentarismus': 'Regierungssystem mit Parlamentsbeteiligung',
      'Repräsentation': 'Vertretung durch gewählte Abgeordnete',
    },
  },
  3: {
    title: 'Schutzmechanismen der Verfassung',
    terms: ['Ewigkeitsklausel', 'Verfassungsgericht', 'Mehrheitsprinzip', 'Opposition', 'Grundrechte', 'Verfassungsbeschwerde', 'Menschenrechte', 'Verfassungstreue', 'Verfassungsänderung', 'Gewaltenkontrolle'],
    definitions: [
      { short: 'unveränderbare Grundprinzipien', long: 'Die Ewigkeitsklausel schützt bestimmte Teile des Grundgesetzes vor Änderung. Diese sind: Menschenrechte, Gewaltenteilung und Bundesstaatlichkeit. Sie sollen nicht einmal von einer großen Mehrheit abgeschafft werden können.' },
      { short: 'prüft Gesetze auf Verfassungsmäßigkeit', long: 'Das Verfassungsgericht (Bundesverfassungsgericht) prüft, ob Gesetze und Handlungen der Regierung mit dem Grundgesetz vereinbar sind. Es kann Gesetze für ungültig erklären und schützt so die Verfassung.' },
      { short: 'Entscheidungen durch Mehrheit', long: 'Das Mehrheitsprinzip bedeutet, dass demokratische Entscheidungen durch Abstimmungen getroffen werden. Die Mehrheit der Stimmen entscheidet. Dies schützt die Demokratie vor Willkür einzelner.' },
      { short: 'kontrolliert Regierung', long: 'Die Opposition sind die Parteien und Abgeordnete, die nicht in der Regierung sind. Sie kontrollieren kritisch die Regierungsarbeit, stellen Fragen und machen Vorschläge. Dies ist wichtig für eine funktionierende Demokratie.' },
      { short: 'Rechte, die allen Bürgern zustehen', long: 'Grundrechte sind individuelle Freiheiten, die jedem Bürger zustehen: Meinungsfreiheit, Versammlungsfreiheit, Gewissensfreiheit und viele mehr. Der Staat darf diese Rechte nur in besonderen Fällen einschränken.' },
      { short: 'Beschwerde gegen Behördenverletzungen', long: 'Die Verfassungsbeschwerde ermöglicht Bürgern, vor dem Bundesverfassungsgericht gegen Verletzungen ihrer Grundrechte zu klagen. Dies ist ein wichtiges Schutzmittel gegen Übergriffe von Behörden und Gerichten.' },
      { short: 'Unveräußerliche Rechte aller Menschen', long: 'Menschenrechte sind universelle Rechte, die allen Menschen zustehen – egal wo sie leben. Sie sind in internationalen Verträgen festgehalten und gehen über nationale Grenzen hinaus. Jeder Mensch hat unveräußerliche Würde.' },
      { short: 'Treue zur Verfassungsordnung', long: 'Verfassungstreue bedeutet, dass alle – besonders Beamte und Politiker – die Verfassung respektieren und einhalten müssen. Sie dürfen nicht gegen Grundprinzipien arbeiten. Dies sichert die Stabilität des Staates.' },
      { short: 'Verfahren zur Änderung der Grundgesetze', long: 'Die Verfassungsänderung ist ein förmliches Verfahren, bei dem die Verfassung geändert wird. Im Bundestag und Bundesrat ist eine Zwei-Drittel-Mehrheit notwendig. Manche Teile (wie Grundrechte) können überhaupt nicht geändert werden (Ewigkeitsklausel).' },
      { short: 'Kontrolle zwischen Legislative, Exekutive und Judikative', long: 'Gewaltenkontrolle ist das System, durch das die drei Staatsgewalten sich gegenseitig kontrollieren und ausbalancieren. Das Parlament überwacht die Regierung, die Gerichte überprüfen Gesetzmäßigkeit. Dies verhindert Machtkonzentration und Machtmissbrauch.' },
    ],
    correctMatches: {
      'Ewigkeitsklausel': 'unveränderbare Grundprinzipien',
      'Verfassungsgericht': 'prüft Gesetze auf Verfassungsmäßigkeit',
      'Mehrheitsprinzip': 'Entscheidungen durch Mehrheit',
      'Opposition': 'kontrolliert Regierung',
      'Grundrechte': 'Rechte, die allen Bürgern zustehen',
      'Verfassungsbeschwerde': 'Beschwerde gegen Behördenverletzungen',
      'Menschenrechte': 'Unveräußerliche Rechte aller Menschen',
      'Verfassungstreue': 'Treue zur Verfassungsordnung',
      'Verfassungsänderung': 'Verfahren zur Änderung der Grundgesetze',
      'Gewaltenkontrolle': 'Kontrolle zwischen Legislative, Exekutive und Judikative',
    },
  },
};

export default function TermMatching() {
  const navigate = useNavigate();
  const { user, isGuest, loading: authLoading } = useAuth();

  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [progress, setProgress] = useState<TermMatchingProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [userMatches, setUserMatches] = useState<Record<string, string>>({});
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [result, setResult] = useState<RpcResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReplay, setIsReplay] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<{ term: string; short: string; long: string } | null>(null);
  const [shuffledDefinitions, setShuffledDefinitions] = useState<string[]>([]);
  const initializedRef = useRef(false);

  // Page load: Wait for auth to load, then initialize
  useEffect(() => {
    // Don't do anything until auth is loaded
    if (authLoading) {
      return;
    }

    // Only initialize once
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;

    const initializeGame = async () => {
      try {
        setLoading(true);
        console.log('Starting game initialization...');

        // Call RPC to initialize (creates rows if they don't exist)
        // Skip RPC for guests - they play without saving progress
        if (!isGuest && user) {
          console.log('Calling init_term_matching RPC...');
          const { error: initError } = await supabase.rpc('init_term_matching');
          if (initError) {
            console.error('Init RPC error:', initError);
            // Don't fail if init fails - data might already exist
          } else {
            console.log('Init RPC successful');
          }
        }

        // Fetch progress for authenticated users, or use default for guests
        let progressData: TermMatchingProgress[] = [];

        if (isGuest) {
          // For guests, all levels are unlocked and incomplete
          progressData = [
            { level: 1, unlocked: true, completed: false },
            { level: 2, unlocked: true, completed: false },
            { level: 3, unlocked: true, completed: false },
          ];
          console.log('Guest mode - all levels unlocked');
        } else {
          console.log('Fetching term_matching_progress...');
          const { data, error: fetchError } = await supabase
            .from('term_matching_progress')
            .select('*')
            .order('level', { ascending: true });

          if (fetchError) {
            console.error('Fetch error:', fetchError);
            setError(`Fehler beim Laden: ${fetchError.message}`);
            setLoading(false);
            return;
          }

          if (!data || data.length === 0) {
            console.error('No progress data returned');
            setError('Keine Fortschrittsdaten gefunden');
            setLoading(false);
            return;
          }

          console.log('Progress data loaded:', data);
          progressData = data as TermMatchingProgress[];
        }

        setProgress(progressData);

        // Find current level: prefer incomplete unlocked level
        // If all unlocked levels are completed, show level selection instead
        const incompleteLevel = progressData?.find((p) => p.unlocked === true && p.completed === false);

        if (incompleteLevel) {
          // Found a level that's unlocked but not completed yet
          console.log('Setting current level to:', incompleteLevel.level);
          setCurrentLevel(incompleteLevel.level);
          setIsReplay(false);

          // Initialize shuffled definitions for this level
          const levelData = LEVELS[incompleteLevel.level as keyof typeof LEVELS];
          const shortDefs = levelData.definitions.map((d) => typeof d === 'string' ? d : d.short);
          const shuffled = [...shortDefs].sort(() => Math.random() - 0.5);
          setShuffledDefinitions(shuffled);
        } else {
          // All unlocked levels are completed or none are available
          // Show level selection screen (currentLevel = null triggers level selection)
          console.log('No incomplete levels found, showing selection');
          setCurrentLevel(null);
        }

        setLoading(false);
      } catch (err) {
        console.error('Initialization error:', err);
        setError(`Fehler: ${err instanceof Error ? err.message : 'Unbekannter Fehler'}`);
        setLoading(false);
      }
    };

    initializeGame();
  }, [authLoading, user, isGuest, navigate]);

  const handleLevelClick = (levelNum: number) => {
    // Only allow clicking unlocked levels
    const levelProgress = progress.find((p) => p.level === levelNum);
    if (levelProgress?.unlocked) {
      setCurrentLevel(levelNum);
      setIsReplay(levelProgress.completed === true);
      setUserMatches({});
      setShowFeedback(false);
      setResult(null);
      setShowGame(false); // Show learning screen first

      // Shuffle definitions once when level is selected
      const levelData = LEVELS[levelNum as keyof typeof LEVELS];
      const shortDefs = levelData.definitions.map((d) => typeof d === 'string' ? d : d.short);
      const shuffled = [...shortDefs].sort(() => Math.random() - 0.5);
      setShuffledDefinitions(shuffled);
    }
  };

  const handleStartGame = () => {
    // Start the actual matching game after learning screen
    setShowGame(true);
  };

  const handleTermClick = (term: string) => {
    // If clicking the same term, deselect it
    if (selectedTerm === term) {
      setSelectedTerm(null);
    } else {
      // Select the new term (whether already matched or not)
      setSelectedTerm(term);
    }
  };

  const handleDefinitionClick = (definition: string) => {
    if (!selectedTerm) return;

    // Check if the selected definition is already matched to another term
    const matchedTerm = Object.keys(userMatches).find(
      (term) => userMatches[term] === definition
    );

    // If the definition is already matched, don't allow remapping to it
    if (matchedTerm && matchedTerm !== selectedTerm) {
      return;
    }

    // Match the selected term with the clicked definition (allows remapping)
    setUserMatches((prev) => ({
      ...prev,
      [selectedTerm]: definition,
    }));

    // Deselect the term
    setSelectedTerm(null);
  };

  const handleSubmit = async () => {
    if (!currentLevel) return;

    const correctMatches =
      LEVELS[currentLevel as keyof typeof LEVELS].correctMatches;
    let correctAnswers = 0;

    // Count correct matches
    for (const [term, definition] of Object.entries(userMatches)) {
      if (correctMatches[term as keyof typeof correctMatches] === definition) {
        correctAnswers++;
      }
    }

    console.log('Submitting:', { currentLevel, correctAnswers, isReplay });
    setCorrectCount(correctAnswers);

    try {
      const levelData = LEVELS[currentLevel as keyof typeof LEVELS];
      const totalMatches = levelData.terms.length;
      const passed = correctAnswers === totalMatches;

      // For guests, just show feedback without saving
      if (isGuest) {
        console.log('Guest mode - showing feedback without saving');
        const guestResult: RpcResponse = {
          passed,
          points_earned: 0, // No XP for guests
          next_level_unlocked: passed,
          is_replay: false,
        };
        setResult(guestResult);
        setShowFeedback(true);
        return;
      }

      // Call RPC to complete level (authenticated users only)
      // Backend automatically determines is_replay based on completion status
      const { data, error: rpcError } = await supabase.rpc(
        'complete_term_matching',
        {
          p_level: currentLevel,
          p_correct: correctAnswers,
          p_total: totalMatches,
        }
      );

      console.log('RPC Response:', { data, error: rpcError });

      if (rpcError) {
        console.error('RPC Error:', rpcError);
        setError(`Fehler: ${rpcError.message}`);
        return;
      }

      if (!data || data.length === 0) {
        console.error('No data returned from RPC');
        setError('Keine Antwort vom Server');
        return;
      }

      const result = data[0];
      console.log('Setting result:', result);
      setResult(result as RpcResponse);
      setShowFeedback(true);

      // Update local progress state if passed
      if (result.passed) {
        setProgress((prevProgress) =>
          prevProgress.map((p) => {
            if (p.level === currentLevel) {
              return { ...p, completed: true };
            }
            // Unlock next level if available
            if (p.level === currentLevel + 1 && result.next_level_unlocked) {
              return { ...p, unlocked: true };
            }
            return p;
          })
        );

        // Refresh profile XP after successful completion (not replay)
        if (!result.is_replay && result.points_earned > 0) {
          console.log('Refreshing profile after XP gain');
          // Trigger profile refresh via context or state
        }
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError(`Fehler: ${err instanceof Error ? err.message : 'Unbekannter Fehler'}`);
    }
  };

  const handleReset = async () => {
    // For guests, just reset to level selection
    if (isGuest) {
      setCurrentLevel(null);
      setUserMatches({});
      setShowFeedback(false);
      setResult(null);
      setShowGame(false);
      return;
    }

    // Reload progress from database to check actual completion status
    try {
      const { data, error: fetchError } = await supabase
        .from('term_matching_progress')
        .select('*')
        .order('level', { ascending: true });

      if (!fetchError && data) {
        setProgress(data as TermMatchingProgress[]);

        // Find next unlocked incomplete level
        const nextLevel = data.find((p) => p.unlocked === true && p.completed === false);

        if (nextLevel) {
          // Move to next level
          setCurrentLevel(nextLevel.level);
          setIsReplay(false);
          console.log(`Advanced to Level ${nextLevel.level}`);

          // Shuffle definitions for the next level
          const nextLevelData = LEVELS[nextLevel.level as keyof typeof LEVELS];
          const shortDefs = nextLevelData.definitions.map((d) => typeof d === 'string' ? d : d.short);
          const shuffled = [...shortDefs].sort(() => Math.random() - 0.5);
          setShuffledDefinitions(shuffled);
        } else {
          // All levels completed, show level selection
          setCurrentLevel(null);
          console.log('All levels completed, showing level selection');
        }
      }
    } catch (err) {
      console.error('Error reloading progress:', err);
    }

    setUserMatches({});
    setShowFeedback(false);
    setResult(null);
    setCorrectCount(0);
    setSelectedTerm(null);
    setShowGame(false); // Reset to learning screen
  };

  const handleNext = () => {
    // Reload progress to update currentLevel
    window.location.reload();
  };

  // Wait for auth state to load before showing anything
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Authentifizierung wird überprüft...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Spiel wird geladen...</p>
        </div>
      </div>
    );
  }

  if (error && !currentLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/" className="btn-primary inline-block">
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  // Show level selection when no level is currently selected but levels are available
  if (!currentLevel && !loading && progress.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <GuestModeBanner isGuest={isGuest} />

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between mb-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Zurück</span>
              </Link>
              <ProfileDropdown />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                🎓 Fachbegriffe
              </h1>
              <p className="text-sm text-muted-foreground">
                Wähle ein Level zum Spielen
              </p>
            </div>
          </div>
        </header>

        {/* Level Selection */}
        <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Level-Übersicht</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {progress.map((p) => {
                const levelInfo = LEVELS[p.level as keyof typeof LEVELS];
                return (
                  <button
                    key={p.level}
                    onClick={() => handleLevelClick(p.level)}
                    disabled={!p.unlocked}
                    className={`p-6 rounded-lg border-2 text-center font-bold transition-all transform hover:scale-105 ${
                      p.completed
                        ? 'bg-green-50 border-green-200 text-green-700 hover:shadow-lg cursor-pointer'
                        : p.unlocked
                        ? 'bg-blue-50 border-blue-200 text-blue-700 hover:shadow-lg cursor-pointer'
                        : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {p.completed ? '✅' : p.unlocked ? '🎮' : '🔒'}
                    </div>
                    <div className="text-lg mb-2">Level {p.level}</div>
                    <div className="text-xs font-normal opacity-85 mb-2">
                      {levelInfo.title}
                    </div>
                    {p.completed && <div className="text-xs mt-2 opacity-75">Abgeschlossen</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const levelData = LEVELS[currentLevel as keyof typeof LEVELS];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <GuestModeBanner isGuest={isGuest} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Zurück</span>
            </Link>
            <ProfileDropdown />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              🎓 Fachbegriffe
            </h1>
            <p className="text-sm text-muted-foreground">
              Level {currentLevel} – {levelData.title}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6 text-red-700">
            <p className="font-bold">Fehler: {error}</p>
            <p className="text-sm mt-2">Siehe Browser-Konsole (F12) für Details</p>
          </div>
        )}
        {!showGame && !showFeedback ? (
          /* Learning Screen - Show all terms and definitions before game */
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">📚 Lerne die Begriffe</h2>
            <p className="text-gray-600 mb-6">Hier sind alle Begriffe mit ihren Definitionen. Lese sie durch und klicke dann auf &quot;Zum Spiel&quot;.</p>

            <div className="space-y-4 mb-8">
              {levelData.terms.map((term, index) => {
                const def = levelData.definitions[index];
                const shortDef = typeof def === 'string' ? def : def.short;
                return (
                  <div key={term} className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
                    <div className="flex gap-4 items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground mb-1">{term}</h3>
                        <p className="text-gray-700 mb-2">{shortDef}</p>
                      </div>
                      {typeof def === 'object' && def.long && (
                        <button
                          onClick={() => setSelectedInfo({ term, short: def.short, long: def.long })}
                          className="flex-shrink-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full w-7 h-7 flex items-center justify-center transition-all"
                          title="Mehr erfahren"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleLevelClick(currentLevel)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              >
                Zurück
              </button>
              <button
                onClick={handleStartGame}
                className="btn-primary px-8 py-3 font-bold text-lg"
              >
                Zum Spiel →
              </button>
            </div>
          </div>
        ) : !showFeedback ? (
          <div>
            {/* Game Board */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
              <p className="text-sm text-gray-600 mb-6 text-center">
                {selectedTerm ? '👇 Wähle die richtige Definition' : '👆 Wähle erst einen Begriff'} – {Object.keys(userMatches).length}/{levelData.terms.length} geordnet
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Terms */}
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-4">
                    Begriffe
                  </h2>
                  <div className="space-y-3">
                    {levelData.terms.map((term) => {
                      const isMatched = !!userMatches[term];
                      const isSelected = selectedTerm === term;

                      return (
                        <button
                          key={term}
                          onClick={() => handleTermClick(term)}
                          className={`w-full p-4 rounded-lg border-2 transition-all font-medium text-center ${
                            isMatched && isSelected
                              ? 'bg-purple-600 border-purple-600 text-white cursor-pointer scale-105 shadow-lg'
                              : isMatched && !isSelected
                              ? 'bg-green-50 border-green-400 text-green-900 cursor-pointer hover:bg-green-100'
                              : isSelected
                              ? 'bg-blue-600 border-blue-600 text-white cursor-pointer scale-105 shadow-lg'
                              : 'bg-gray-50 border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                          }`}
                        >
                          {isMatched && <span className="mr-2">✓</span>}
                          {term}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Definitions */}
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-4">
                    Definitionen
                  </h2>
                  <div className="space-y-3">
                    {shuffledDefinitions.map((definition) => {
                      const matchedTerm = Object.keys(userMatches).find(
                        (term) => userMatches[term] === definition
                      );
                      const isSelectableNow = selectedTerm && !matchedTerm;

                      return (
                        <button
                          key={definition}
                          onClick={() => handleDefinitionClick(definition)}
                          disabled={!selectedTerm || matchedTerm}
                          className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                            matchedTerm
                              ? 'bg-green-50 border-green-400 text-green-900 cursor-default'
                              : isSelectableNow
                              ? 'bg-blue-50 border-blue-400 hover:bg-blue-100 cursor-pointer'
                              : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-50'
                          }`}
                        >
                          {matchedTerm && (
                            <span className="text-green-600 mr-2 font-bold">✓</span>
                          )}
                          {definition}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleSubmit}
                disabled={Object.keys(userMatches).length < levelData.terms.length}
                className="btn-primary px-8 py-4 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Fertig
              </button>
            </div>
          </div>
        ) : result ? (
          /* Feedback Screen */
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
              {result.passed ? (
                <>
                  {/* Success State */}
                  <div className="text-6xl mb-4">✅</div>

                  {/* Heading - Different for replay vs first completion */}
                  <h2 className={`text-3xl font-bold mb-2 ${
                    result.is_replay ? 'text-blue-600' : 'text-green-600'
                  }`}>
                    {result.is_replay ? '🔁 Wiederholung' : 'Level bestanden!'}
                  </h2>

                  {/* XP or Practice Message */}
                  {result.is_replay ? (
                    <p className="text-lg text-gray-600 mb-6">
                      Keine XP erhalten – Trainingsmodus
                    </p>
                  ) : (
                    <p className="text-2xl font-bold text-green-600 mb-6">
                      +{result.points_earned} XP
                    </p>
                  )}

                  {/* Evaluation Stats */}
                  <div className={`rounded-lg p-4 mb-6 border ${
                    result.is_replay
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className={`text-2xl font-bold ${
                          result.is_replay ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {correctCount}/{levelData.terms.length}
                        </div>
                        <p className="text-sm text-gray-600">Richtig</p>
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${
                          result.is_replay ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {Math.round((correctCount / levelData.terms.length) * 100)}%
                        </div>
                        <p className="text-sm text-gray-600">Genauigkeit</p>
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${
                          result.is_replay ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {levelData.terms.length - correctCount}
                        </div>
                        <p className="text-sm text-gray-600">Fehler</p>
                      </div>
                    </div>
                  </div>

                  {/* Next Level Unlock - Only for first completion */}
                  {result.next_level_unlocked && !result.is_replay && (
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
                      <p className="text-lg font-bold text-yellow-700">
                        🔥 Level {currentLevel + 1} freigeschaltet!
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleReset}
                      className={`px-6 py-3 font-bold rounded-lg transition-all ${
                        result.is_replay
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Nochmal spielen
                    </button>
                    {result.next_level_unlocked && !result.is_replay && (
                      <button
                        onClick={handleNext}
                        className="btn-primary px-6 py-3 font-bold"
                      >
                        Weiter →
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Failure State */}
                  <div className="text-6xl mb-4">❌</div>
                  <h2 className="text-3xl font-bold text-red-600 mb-2">
                    Nicht bestanden
                  </h2>

                  {/* Evaluation Stats */}
                  <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-200">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-red-600">{correctCount}/{levelData.terms.length}</div>
                        <p className="text-sm text-gray-600">Richtig</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">{Math.round((correctCount / levelData.terms.length) * 100)}%</div>
                        <p className="text-sm text-gray-600">Genauigkeit</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">{levelData.terms.length - correctCount}</div>
                        <p className="text-sm text-gray-600">Fehler</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 mb-6">
                    Alle {levelData.terms.length} müssen richtig sein – versuche es nochmal!
                  </p>

                  <button
                    onClick={handleReset}
                    className="btn-primary px-8 py-3 font-bold text-lg"
                  >
                    Nochmal spielen
                  </button>
                </>
              )}
            </div>
          </div>
        ) : null}

        {/* Info Modal */}
        {selectedInfo && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full animate-fade-in">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-foreground">{selectedInfo.term}</h3>
                  <button
                    onClick={() => setSelectedInfo(null)}
                    className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Kurzdefinition</p>
                    <p className="text-lg font-medium text-blue-600">{selectedInfo.short}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Ausführliche Erklärung</p>
                    <p className="text-gray-700 leading-relaxed">{selectedInfo.long}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedInfo(null)}
                  className="w-full btn-primary py-2 font-bold rounded-lg"
                >
                  Verstanden
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
