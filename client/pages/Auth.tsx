import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, setGuestMode } from '../lib/useAuth';
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
    setGuestMode(true);
    navigate('/home');
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
        // Redirect to home after successful login
        setTimeout(() => navigate('/home'), 1500);
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
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-white to-purple-50 flex flex-col px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top spacer */}
      <div className="flex-1" />

      {/* Main content - centered card */}
      <div className="w-full max-w-md mx-auto bg-white bg-opacity-80 backdrop-blur rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-900">
          Votlio
        </h1>
        <h2 className="text-center text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
          {isSignUp ? 'Erstellen Sie Ihr Konto' : 'Melden Sie sich an'}
        </h2>

        {/* Messages */}
        {(error || message) && (
          <div
            className={`p-3 sm:p-4 rounded-lg mb-5 sm:mb-6 text-xs sm:text-sm ${
              message && (message.includes('successfully') || message.includes('Erfolgreich') || message.includes('erstellt'))
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message || error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
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
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all"
          >
            {loading ? 'Wird geladen...' : isSignUp ? 'Registrieren' : 'Einloggen'}
          </Button>

          {/* Guest Button */}
          <button
            type="button"
            onClick={handleContinueAsGuest}
            disabled={loading}
            className="w-full mt-2 px-4 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-colors disabled:opacity-50"
          >
            Als Gast fortfahren
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="mt-5 sm:mt-6 text-center">
          <p className="text-gray-600 text-xs sm:text-sm">
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
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              {isSignUp ? 'Einloggen' : 'Registrieren'}
            </button>
          </p>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="flex-1" />
    </div>
  );
}
