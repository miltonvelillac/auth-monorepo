import { type StorageKeyEnum } from '../enums/StorageKeyEnum';

export type SignInCredentials = {
  username: string;
  password: string;
};

export type SignInCommand = SignInCredentials & {
  projectId: string;
};

export type SignInUser = {
  username: string;
  roles?: string[];
  displayName?: string;
};

export type SignInSession = {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  user?: SignInUser;
  raw?: unknown;
};

export type AuthStorageService = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => boolean;
  removeItem: (key: string) => boolean;
  clear: () => boolean;
};

export type SignInPersistenceOptions = {
  storageService?: AuthStorageService;
  tokenStorageKey?: StorageKeyEnum | string;
};

export type SignInState = {
  projectId: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
  credentials: SignInCredentials;
  session: SignInSession | null;
  error: string | null;
};

export type SignInStore = {
  getState: () => SignInState;
  subscribe: (listener: () => void) => () => void;
  setCredential: (field: keyof SignInCredentials, value: string) => void;
  submit: (overrides?: Partial<SignInCredentials>) => Promise<SignInSession | undefined>;
  reset: () => void;
};

export type AuthClient = {
  signIn: (command: SignInCommand) => Promise<SignInSession>;
};
