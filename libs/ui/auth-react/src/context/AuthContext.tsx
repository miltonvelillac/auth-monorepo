import { createContext, useContext } from 'react';
import {
  type AuthDesignTokens,
  type AuthClient,
  type SignInSession,
  type SignInStore,
} from '@auth-monorepo/auth-core';

export type AuthContextValue = {
  projectId: string;
  store: SignInStore;
  tokens: AuthDesignTokens;
  authClient: AuthClient;
  onSuccess?: (session: SignInSession) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Auth React components must be used inside SignInProvider.');
  }

  return context;
}
