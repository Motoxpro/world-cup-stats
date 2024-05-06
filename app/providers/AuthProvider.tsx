import React, { createContext, useContext, useEffect, useState } from 'react';

import type { Provider } from '@supabase/gotrue-js';
import { useSupabaseBrowser } from '~/lib/supabase/supabaseClient';
import { AuthProviderEnum } from '~/lib/const';

interface AuthContextProps {
  isSignedIn: boolean;
  hasCompletedOnboarding: boolean;
  signInUser: (authTokenProvider: AuthProviderEnum) => Promise<void>;
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
  const supabaseClient = useSupabaseBrowser();
  // const { identify } = useAnalytics();
  // const { refetch: refetchUser } = useUserQuery();
  // const { refetch: refetchPublicProfile } = usePublicProfileQuery();
  // const { trackUserSignInSuccess, trackUserSignOutSuccess, trackUserSignUpSuccess } =
  //   useSegmentTrack();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      // identify(session?.user?.id, {
      //   GrowSource: 'pumptrack-app',
      //   email: session?.user?.email,
      //   name: session?.user?.user_metadata?.name,
      // }).then();
      console.log('event', event);
      console.log('session', session);
      setHasCompletedOnboarding(session?.user?.user_metadata?.hasCompletedOnboarding);
      setIsSignedIn(!!session);
      setIsInitialized(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Save token to storage and set auth state.
   */
  const signInUserWithOAuth = async (authTokenProvider: Provider): Promise<void> => {
    if (!authTokenProvider) {
      throw new Error('No token or auth provider provided');
    }
    setIsAuthLoading(true);
    // Sign in with credentials
    const { data, error: authError } = await supabaseClient.auth.signInWithOAuth({
      provider: authTokenProvider,
      // options: {
      // // Client side redirect. Where do we want to go when we get back to the app?
      // redirectTo: `${process.env.APP_URL}/larry`,
      // },
    });
    console.log(authError);
    const authTokenResponse = data;
    console.log('authTokenResponse', authTokenResponse);
    // console.log('authTokenResponse', authTokenResponse);
    // const user = authTokenResponse?.user;
    // if (authError || !user) {
    //   setIsAuthLoading(false);
    //   throw new Error(`Error signing in: ${authError?.message}`);
    // }

    // refetchUser().then();
    // refetchPublicProfile().then();
    // trackUserSignInSuccess();
    // Track first time sign in
    // if (!user.user_metadata?.hasCompletedOnboarding) {
    //   trackUserSignUpSuccess();
    // }
    setIsAuthLoading(false);
  };

  // const signInUser = async (
  //   authTokenProvider: AuthProviderEnum,
  //   usernamePassword: { email: string; password: string },
  // ): Promise<void> => {
  //   if (!authTokenProvider) {
  //     throw new Error('No token or auth provider provided');
  //   }
  //   setIsAuthLoading(true);
  //   let authTokenResponse;
  //   // Sign in with credentials
  //   if (authTokenProvider === AuthProviderEnum.Email) {
  //     const { data, error: authError } = await supabaseClient.auth.signInWithPassword({
  //       email,
  //       password,
  //     });
  //     console.log(authError);
  //     authTokenResponse = data;
  //   } else {
  //     const { data, error: authError } = await supabaseClient.auth.signInWithOAuth({
  //       provider: authTokenProvider,
  //     });
  //     console.log(authError);
  //     authTokenResponse = data;
  //   }
  //   console.log('authTokenResponse', authTokenResponse);
  //   const user = authTokenResponse?.user;
  //   if (authError || !user) {
  //     setIsAuthLoading(false);
  //     throw new Error(`Error signing in: ${authError?.message}`);
  //   }
  //
  //   // refetchUser().then();
  //   // refetchPublicProfile().then();
  //   // trackUserSignInSuccess();
  //   // Track first time sign in
  //   // if (!user.user_metadata?.hasCompletedOnboarding) {
  //   //   trackUserSignUpSuccess();
  //   // }
  //   setIsAuthLoading(false);
  // };

  /**
   * Sign up the user.
   */
  const signUpUser = async (email: string, password: string): Promise<void> => {
    setIsAuthLoading(true);
    // Sign in with credentials
    const { data: authTokenResponse, error: authError } = await supabaseClient.auth.signUp({
      email,
      password,
      // options: {
      //   emailRedirectTo: `${env.APP_URL}/auth/verify-email`,
      // },
    });
    console.log(authError);
    // console.log('authTokenResponse', authTokenResponse);
    const user = authTokenResponse?.user;
    if (authError || !user) {
      setIsAuthLoading(false);
      throw new Error(`Error signing in: ${authError?.message}`);
    }

    // refetchUser().then();
    // refetchPublicProfile().then();
    // trackUserSignInSuccess();
    // Track first time sign in
    // if (!user.user_metadata?.hasCompletedOnboarding) {
    //   trackUserSignUpSuccess();
    // }
    setIsAuthLoading(false);
  };

  /**
   * Log out the user.
   */
  const signOutUser = async (): Promise<void> => {
    await supabaseClient.auth.signOut();
    // trackUserSignOutSuccess();
  };

  const auth = {
    isSignedIn,
    signUpUser,
    signInUserWithOAuth,
    signOutUser,
    isInitialized,
    hasCompletedOnboarding,
    isAuthLoading,
  };

  if (!isInitialized) {
    return <></>;
  }

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
