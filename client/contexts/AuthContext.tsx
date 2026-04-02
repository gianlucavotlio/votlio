import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useAuth as useAuthHook } from '@/lib/useAuth';

type AuthValue = ReturnType<typeof useAuthHook>;
const AuthContext = createContext<AuthValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authValue = useAuthHook();

  // Memoize the auth value to prevent unnecessary re-renders
  const memoizedAuthValue = useMemo(() => authValue, [
    authValue.session,
    authValue.user,
    authValue.loading,
    authValue.error,
    authValue.isGuest,
    authValue.isAuthenticated,
  ]);

  return (
    <AuthContext.Provider value={memoizedAuthValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Fallback: use the hook directly if context is not available
    return useAuthHook();
  }
  return context;
}
