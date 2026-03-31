import { useContext, useEffect, useCallback } from 'react';
import { UserProfileContext, UserProfile } from '../contexts/UserProfileContext';
import { supabase } from './supabaseClient';

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within UserProfileProvider');
  }

  const { profile, setProfile } = context;

  const fetchProfile = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // Profile doesn't exist yet, create it
        if (error.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                user_id: user.id,
                xp: 0,
                level: 0,
              },
            ])
            .select()
            .single();

          if (createError) throw createError;
          setProfile(newProfile as UserProfile);
        } else {
          throw error;
        }
      } else {
        setProfile(data as UserProfile);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  }, [setProfile]);

  // Initial fetch and auth state listening
  useEffect(() => {
    fetchProfile();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          fetchProfile();
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [fetchProfile]);

  // Subscribe to real-time profile changes
  useEffect(() => {
    const setupRealtimeListener = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const channel = supabase
        .channel(`profiles:${user.id}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'profiles',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            // Update profile when changes occur
            if (payload.new) {
              setProfile(payload.new as UserProfile);
            }
          }
        )
        .subscribe();

      return channel;
    };

    let channel: any;
    setupRealtimeListener().then(ch => {
      channel = ch;
    });

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [setProfile]);

  const addXP = async (amount: number) => {
    if (!profile) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch('/api/user/xp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ xpAmount: amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to add XP');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile as UserProfile);
    } catch (err) {
      console.error('Error adding XP:', err);
    }
  };

  // Method to manually refresh profile (useful after quiz completion)
  const refreshProfile = useCallback(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, addXP, refreshProfile };
};
