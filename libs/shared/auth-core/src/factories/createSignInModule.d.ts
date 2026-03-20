import { type AuthClient } from '../contracts/auth.types';
export type CreateSignInModuleOptions = {
    projectId: string;
    authClient: AuthClient;
    initialCredentials?: {
        username?: string;
        password?: string;
    };
};
export declare function createSignInModule(options: CreateSignInModuleOptions): {
    store: import("../contracts/auth.types").SignInStore;
};
//# sourceMappingURL=createSignInModule.d.ts.map