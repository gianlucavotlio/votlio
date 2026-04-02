import { useState, useEffect } from 'react';
import { supabase, Session, User } from './supabaseClient';

export interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthError {
  message: string;
}

export const setGuestMode = (value: boolean) => {
  if (value) {
    localStorage.setItem('votlio_guest', 'true');
  } else {
    localStorage.removeItem('votlio_guest');
  }
  // Trigger a custom event so other components know to re-render
  window.dispatchEvent(new Event('votlio_guest_mode_changed'));
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
    error: null,
  });

  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setAuthState({
          session,
          user: session?.user || null,
          loading: false,
          error: null,
        });
      } catch (err) {
        const error = err as AuthError;
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: error.message || 'Failed to load session',
        }));
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthState({
          session,
          user: session?.user || null,
          loading: false,
          error: null,
        });
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Listen for guest mode changes
  useEffect(() => {
    const handleGuestModeChange = () => {
      setUpdateTrigger(prev => prev + 1);
    };

    window.addEventListener('votlio_guest_mode_changed', handleGuestModeChange);

    return () => {
      window.removeEventListener('votlio_guest_mode_changed', handleGuestModeChange);
    };
  }, []);

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      // Save username to profiles table if provided
      if (username && data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert(
            {
              user_id: data.user.id,
              username: username,
            },
            { onConflict: 'user_id' }
          );
        if (profileError) {
          console.error('Error saving username:', profileError);
        }
      }

      setAuthState({
        session: data.session,
        user: data.user || null,
        loading: false,
        error: null,
      });
      return { success: true };
    } catch (err) {
      const error = err as AuthError;
      const errorMsg = error.message || 'Sign up failed';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMsg,
      }));
      return { success: false, error: errorMsg };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setAuthState({
        session: data.session,
        user: data.user || null,
        loading: false,
        error: null,
      });
      return { success: true };
    } catch (err) {
      const error = err as AuthError;
      const errorMsg = error.message || 'Sign in failed';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMsg,
      }));
      return { success: false, error: errorMsg };
    }
  };

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      // Clear guest mode flag using the exported function
      setGuestMode(false);

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setAuthState({
        session: null,
        user: null,
        loading: false,
        error: null,
      });
      return { success: true };
    } catch (err) {
      const error = err as AuthError;
      const errorMsg = error.message || 'Sign out failed';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMsg,
      }));
      return { success: false, error: errorMsg };
    }
  };

  // Dynamically check guest mode from localStorage (uses updateTrigger to force re-render)
  const isGuestMode = typeof window !== 'undefined' && localStorage.getItem('votlio_guest') === 'true';

  // User is guest if: no Supabase user AND guest mode is enabled
  const isGuest = !authState.user && isGuestMode;

  // User is authenticated if: has Supabase user OR guest mode is enabled
  const isAuthenticated = !!authState.user || isGuestMode;

  // Include updateTrigger in a comment to ensure it's considered in React's dependency tracking
  // (prevents stale closures)
  console.debug('Auth state updated:', { isGuest, isAuthenticated, updateTrigger });

  return {
    ...authState,
    isGuest,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
  };
};
