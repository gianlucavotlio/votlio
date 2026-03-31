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

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
    error: null,
  });

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

      // Clear guest mode flag
      localStorage.removeItem('votlio_guest');

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

  // Check if guest mode is enabled via localStorage
  const isGuestMode = localStorage.getItem('votlio_guest') === 'true';

  // User is guest if: no Supabase user AND guest mode is enabled
  const isGuest = !authState.user && isGuestMode;

  // User is authenticated if: has Supabase user OR guest mode is enabled
  const isAuthenticated = !!authState.user || isGuestMode;

  return {
    ...authState,
    isGuest,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
  };
};
