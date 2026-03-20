import { type AuthClient } from '../contracts/auth.types';
import { createSignInStore } from '../state/createSignInStore';

export type CreateSignInModuleOptions = {
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
