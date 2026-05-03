import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { AdminProfile } from './supabase';
import { AuthContext } from './auth-context';
import type { AuthContextType } from './auth-context';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [session, setSession] = useState<AuthContextType['session']>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchAdminProfile(userId: string) {
    const { data } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    setAdminProfile(data);
    return data;
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchAdminProfile(session.user.id);
      } else {
        setAdminProfile(null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        (async () => { await fetchAdminProfile(session.user.id); })();
      } else {
        setAdminProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error, isAdmin: false };

    const profile = data.user ? await fetchAdminProfile(data.user.id) : null;
    if (!profile) {
      await supabase.auth.signOut();
      return { error: new Error('This account is not configured as an admin.'), isAdmin: false };
    }

    return { error: null, isAdmin: true };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{
      user, session, adminProfile,
      isAdmin: !!adminProfile,
      loading,
      signIn, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
