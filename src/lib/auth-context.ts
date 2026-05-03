import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import type { AdminProfile } from './supabase';

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  adminProfile: AdminProfile | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
