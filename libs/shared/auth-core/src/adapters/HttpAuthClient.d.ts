import { type AuthClient, type SignInSession } from '../contracts/auth.types';
export type HttpAuthClientOptions = {
    baseUrl: string;
    endpoint?: string;
    fetcher?: typeof fetch;
    headers?: Record<string, string>;
    projectIdFieldName?: string;
    mapResponse?: (payload: unknown) => SignInSession;
};
export declare function createHttpAuthClient({ baseUrl, endpoint, fetcher, headers, projectIdFieldName, mapResponse, }: HttpAuthClientOptions): AuthClient;
//# sourceMappingURL=HttpAuthClient.d.ts.map