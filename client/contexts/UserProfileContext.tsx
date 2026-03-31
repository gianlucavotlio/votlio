import { createContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import { supabase } from '@/lib/supabaseClient';

export interface UserProfile {
  id: string;
  user_id: string;
  xp: number;
  level: number;
  rank_title?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  setProfile: (profile: UserProfile | null) => void;
  updateXP: (amount: number) => void;
  refreshProfile: () => Promise<void>;
}

export const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isGuest } = useAuth();

  // Fetch user profile from Supabase (XP only - rank is calculated by RPC)
  const fetchProfile = useCallback(async () => {
    if (!user || isGuest) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        // Note: Do NOT read or calculate rank_title here
        // Rank is determined by RPC function based on XP value
        setProfile(data);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [user, isGuest]);

  // Fetch profile when user changes
  useEffect(() => {
    fetchProfile();
  }, [user, isGuest, fetchProfile]);

  const updateXP = useCallback((amount: number) => {
    setProfile(prev => {
      if (!prev) return prev;
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100);
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        updated_at: new Date().toISOString(),
      };
    });
  }, []);

  const refreshProfile = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  return (
    <UserProfileContext.Provider value={{ profile, loading, setProfile, updateXP, refreshProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
