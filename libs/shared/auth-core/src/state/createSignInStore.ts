import {
  type AuthClient,
  type SignInCredentials,
  type SignInSession,
  type SignInState,
  type SignInStore,
} from '../contracts/auth.types';
import { SignInUseCase } from '../use-cases/SignInUseCase';

export type CreateSignInStoreOptions = {
  projectId: string;
  authClient: AuthClient;
  initialCredentials?: Partial<SignInCredentials>;
};

export function createSignInStore({
  projectId,
  authClient,
  initialCredentials,
}: CreateSignInStoreOptions): SignInStore {
  const listeners = new Set<() => void>();
  const useCase = new SignInUseCase(authClient);

  let state: SignInState = {
    projectId,
    status: 'idle',
    credentials: {
      username: initialCredentials?.username ?? '',
      password: initialCredentials?.password ?? '',
    },
    session: null,
    error: null,
  };

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const setState = (nextState: SignInState) => {
    state = nextState;
    notify();
  };

  return {
    getState: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setCredential: (field, value) => {
      setState({
        ...state,
        credentials: {
          ...state.credentials,
          [field]: value,
        },
        error: null,
      });
    },
    submit: async (overrides) => {
      setState({
        ...state,
        status: 'submitting',
        error: null,
      });

      try {
        const credentials = {
          ...state.credentials,
          ...overrides,
        };

        const session: SignInSession = await useCase.execute({
          projectId: state.projectId,
          ...credentials,
        });

        setState({
          ...state,
          credentials,
          session,
          status: 'success',
          error: null,
        });

        return session;
      } catch (error) {
        setState({
          ...state,
          credentials: {
            ...state.credentials,
            ...overrides,
          },
          status: 'error',
          error: error instanceof Error ? error.message : 'Unexpected sign in error.',
        });

        return undefined;
      }
    },
    reset: () => {
      setState({
        projectId: state.projectId,
        status: 'idle',
        credentials: {
          username: '',
          password: '',
        },
        session: null,
        error: null,
      });
    },
  };
}
