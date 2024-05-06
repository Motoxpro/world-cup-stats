import React, { createContext, ReactNode, useContext } from 'react';
import { ReactFCC } from '~/lib/types/type-utils';
import invariant from 'tiny-invariant';
import { createBrowserClient } from '@supabase/ssr';
import { useEnv } from '~/providers/EnvProvider';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/lib/supabase/schema';

type SupabaseContextType = { supabase: SupabaseClient<Database, 'public'> };
const SupabaseContext = createContext<SupabaseContextType>({} as SupabaseContextType);

type SupabaseProviderProps = {
  children: ReactNode;
};

const SupabaseProvider: ReactFCC<SupabaseProviderProps> = ({ children }) => {
  const env = useEnv();
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseAnonKey = env.SUPABASE_ANON_KEY;
  invariant(supabaseUrl, 'SUPABASE_URL must be set in your environment variables.');
  invariant(supabaseAnonKey, 'SUPABASE_ANON_KEY must be set in your environment variables.');

  const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

  return <SupabaseContext.Provider value={{ supabase }}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = (): SupabaseContextType => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

export default SupabaseProvider;
