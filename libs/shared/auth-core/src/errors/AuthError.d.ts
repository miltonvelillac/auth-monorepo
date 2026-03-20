export declare class AuthError extends Error {
    readonly code: string;
    readonly details?: unknown | undefined;
    constructor(message: string, code?: string, details?: unknown | undefined);
}
export declare class ValidationError extends AuthError {
    constructor(message: string);
}
//# sourceMappingURL=AuthError.d.ts.map