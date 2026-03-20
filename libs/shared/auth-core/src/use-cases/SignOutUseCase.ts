import { type AuthClient, type SignOutCommand } from '../contracts/auth.types';
import { ValidationError } from '../errors/AuthError';

export class SignOutUseCase {
  constructor(private readonly authClient: AuthClient) {}

  async execute(command: SignOutCommand): Promise<void> {
    if (!command.accessToken.trim()) {
      throw new ValidationError('Access token is required.');
    }

    await this.authClient.signOut({
      accessToken: command.accessToken.trim(),
    });
  }
}
