import React, { createContext, ReactNode, useContext } from 'react';
import { ReactFCC } from '~/lib/types/type-utils';
import { AppEnv } from '~/lib/zodSchema';

const EnvContext = createContext<AppEnv>({} as AppEnv);

type EnvProviderProps = {
  children: ReactNode;
  env: AppEnv;
};

const EnvProvider: ReactFCC<EnvProviderProps> = ({ children, env }) => {
  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
};

export const useEnv = (): AppEnv => {
  const context = useContext(EnvContext);
  if (!context) {
    throw new Error('useEnv must be used within a EnvProvider');
  }
  return context;
};

export default EnvProvider;
