"use client";

import { createContext, useContext, ReactNode } from 'react';
import type { UserProfile } from '@/lib/types';
import { useLocalStorage } from '@/hooks/use-local-storage';

const defaultProfile: UserProfile = {
  healthConditions: 'None',
  goals: 'Maintain a balanced diet',
  allergies: [],
};

type UserProfileContextType = {
  profile: UserProfile;
  setProfile: (profile: UserProfile | ((val: UserProfile) => UserProfile)) => void;
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useLocalStorage<UserProfile>('user-profile', defaultProfile);

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
