"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInUseCase = void 0;
const AuthError_1 = require("../errors/AuthError");
class SignInUseCase {
    constructor(authClient) {
        this.authClient = authClient;
    }
    async execute(command) {
        if (!command.projectId.trim()) {
            throw new AuthError_1.ValidationError('projectId is required.');
        }
        if (!command.username.trim()) {
            throw new AuthError_1.ValidationError('Username is required.');
        }
        if (!command.password.trim()) {
            throw new AuthError_1.ValidationError('Password is required.');
        }
        return this.authClient.signIn({
            projectId: command.projectId.trim(),
            username: command.username.trim(),
            password: command.password,
        });
    }
}
exports.SignInUseCase = SignInUseCase;
//# sourceMappingURL=SignInUseCase.js.map