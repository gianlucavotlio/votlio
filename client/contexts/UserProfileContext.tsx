import { createContext, ReactNode, useState, useCallback } from 'react';

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
}

export const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <UserProfileContext.Provider value={{ profile, loading, setProfile, updateXP }}>
      {children}
    </UserProfileContext.Provider>
  );
};
