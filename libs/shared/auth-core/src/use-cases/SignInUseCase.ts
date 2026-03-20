import { type AuthClient, type SignInCommand, type SignInSession } from '../contracts/auth.types';
import { ValidationError } from '../errors/AuthError';

export class SignInUseCase {
  constructor(private readonly authClient: AuthClient) {}

  async execute(command: SignInCommand): Promise<SignInSession> {
    if (!command.projectId.trim()) {
      throw new ValidationError('projectId is required.');
    }

    if (!command.username.trim()) {
      throw new ValidationError('Username is required.');
    }

    if (!command.password.trim()) {
      throw new ValidationError('Password is required.');
    }

    return this.authClient.signIn({
      projectId: command.projectId.trim(),
      username: command.username.trim(),
      password: command.password,
    });
  }
}
