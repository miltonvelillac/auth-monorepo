import { type AuthClient, type SignInCommand, type SignInSession } from '../contracts/auth.types';
export declare class SignInUseCase {
    private readonly authClient;
    constructor(authClient: AuthClient);
    execute(command: SignInCommand): Promise<SignInSession>;
}
//# sourceMappingURL=SignInUseCase.d.ts.map