import {
  createHttpAuthClient,
  createSignInModule,
  mergeAuthDesignTokens,
  toCssVariables,
  type AuthClient,
  type HttpAuthClientOptions,
  type PartialAuthDesignTokens,
  type SignInSession,
} from '@auth-monorepo/auth-core';
import {
  type CSSProperties,
  type PropsWithChildren,
  useEffect,
  useMemo,
} from 'react';
import { AuthContext } from '../context/AuthContext';
import { authReactBaseStyles } from '../styles/baseStyles';

export type SignInProviderProps = PropsWithChildren<{
  idProject: string;
  authClient?: AuthClient;
  transport?: HttpAuthClientOptions;
  theme?: PartialAuthDesignTokens;
  onSuccess?: (session: SignInSession) => void;
}>;

export function SignInProvider({
  idProject,
  authClient,
  transport,
  theme,
  onSuccess,
  children,
}: SignInProviderProps) {
  useInjectAuthStyles();

  const resolvedAuthClient = useMemo(
    () => authClient ?? createHttpAuthClient(transport ?? { baseUrl: '' }),
    [authClient, transport],
  );

  const module = useMemo(
    () =>
      createSignInModule({
        projectId: idProject,
        authClient: resolvedAuthClient,
      }),
    [idProject, resolvedAuthClient],
  );

  const tokens = useMemo(() => mergeAuthDesignTokens(theme), [theme]);
  const cssVariables = useMemo(
    () => toCssVariables(tokens) as CSSProperties,
    [tokens],
  );

  return (
    <AuthContext.Provider
      value={{
        projectId: idProject,
        store: module.store,
        tokens,
        authClient: resolvedAuthClient,
        onSuccess,
      }}
    >
      <div className="auth-ui-root" style={cssVariables}>
        {children}
      </div>
    </AuthContext.Provider>
  );
}

function useInjectAuthStyles() {
  useEffect(() => {
    const styleId = 'auth-react-base-styles';

    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = authReactBaseStyles;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);
}
