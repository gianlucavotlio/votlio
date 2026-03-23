import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/useAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Auth() {
  const navigate = useNavigate();
  const { signUp, signIn, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleContinueAsGuest = () => {
    console.log("Continuing as guest");
    localStorage.setItem('votlio_guest', 'true');
    localStorage.removeItem('votlio_onboarding_done');
    navigate('/onboarding');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    // Validate sign-up form
    if (isSignUp) {
      if (password.length < 8) {
        setMessage('Das Passwort muss mindestens 8 Zeichen lang sein');
        return;
      }
      if (password !== confirmPassword) {
        setMessage('Die Passwörter stimmen nicht überein');
        return;
      }
    }

    setLoading(true);

    try {
      const result = isSignUp
        ? await signUp(email, password, username)
        : await signIn(email, password);

      if (result.success) {
        console.log("Auth successful, navigating to onboarding");
        setMessage(
          isSignUp
            ? 'Konto erstellt! Überprüfen Sie Ihre E-Mail zur Bestätigung.'
            : 'Erfolgreich angemeldet!'
        );
        // Clear any existing onboarding flag on login so new users see it
        if (isSignUp) {
          localStorage.removeItem('votlio_onboarding_done');
        }
        // Redirect to onboarding after successful login
        setTimeout(() => navigate('/onboarding'), 1500);
      } else {
        setMessage(result.error || 'Authentifizierung fehlgeschlagen');
      }
    } catch (err) {
      setMessage('Ein unerwarteter Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Votlio
        </h1>
        <h2 className="text-center text-gray-600 mb-8">
          {isSignUp ? 'Erstellen Sie Ihr Konto' : 'Melden Sie sich bei Ihrem Konto an'}
        </h2>

        {(error || message) && (
          <div
            className={`p-4 rounded mb-6 text-sm ${
              message && (message.includes('successfully') || message.includes('Erfolgreich') || message.includes('erstellt'))
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benutzername
              </label>
              <Input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="dein_benutzername"
                required={isSignUp}
                disabled={loading}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail
            </label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ihre@email.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passwort
            </label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passwort wiederholen
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Wird geladen...' : isSignUp ? 'Registrieren' : 'Einloggen'}
          </Button>

          <button
            type="button"
            onClick={handleContinueAsGuest}
            disabled={loading}
            className="w-full mt-3 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            Als Gast fortfahren
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {isSignUp ? 'Haben Sie bereits ein Konto?' : 'Haben Sie noch kein Konto?'}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setUsername('');
              }}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              {isSignUp ? 'Einloggen' : 'Registrieren'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
