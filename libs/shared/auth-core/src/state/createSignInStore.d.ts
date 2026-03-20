import { type AuthClient, type SignInCredentials, type SignInStore } from '../contracts/auth.types';
export type CreateSignInStoreOptions = {
    projectId: string;
    authClient: AuthClient;
    initialCredentials?: Partial<SignInCredentials>;
};
export declare function createSignInStore({ projectId, authClient, initialCredentials, }: CreateSignInStoreOptions): SignInStore;
//# sourceMappingURL=createSignInStore.d.ts.map