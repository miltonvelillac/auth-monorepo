import { type AuthClient, type SignInPersistenceOptions } from '../contracts/auth.types';
import { createSignInStore } from '../state/createSignInStore';

export type CreateSignInModuleOptions = SignInPersistenceOptions & {
  projectId: string;
  authClient: AuthClient;
  initialCredentials?: {
    username?: string;
    password?: string;
  };
};

export function createSignInModule(options: CreateSignInModuleOptions) {
  return {
    store: createSignInStore(options),
  };
}
