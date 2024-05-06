import React, { createContext, useContext, useEffect, useState } from 'react';

import { useSupabase } from '~/providers/SupabaseProvider';
import { User } from '@supabase/supabase-js';

interface AuthContextProps {
  isSignedIn: boolean;
  signInUser: (email: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  isInitialized: boolean;
  isAuthLoading: boolean;
}

const authContext = createContext<Partial<AuthContextProps>>({});

// Hook for child components to get the Auth object, re-render when it changes.
export const useAuth = (): AuthContextProps => {
  return useContext(authContext) as AuthContextProps;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { supabase } = useSupabase();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session);
      if (session) {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Sign in the user.
   */
  const signInUserWithMagicLink = async (email: string): Promise<void> => {
    setIsAuthLoading(true);
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://worldcupstats.eliotjackson.com/results',
      },
    });
    setIsAuthLoading(false);
  };

  /**
   * Log out the user.
   */
  const signOutUser = async (): Promise<void> => {
    await supabase.auth.signOut();
    // trackUserSignOutSuccess();
  };

  const auth = {
    isSignedIn,
    signInUser: signInUserWithMagicLink,
    signOutUser,
    user,
    isAuthLoading,
  };

  if (!user) {
    return <></>;
  }

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
