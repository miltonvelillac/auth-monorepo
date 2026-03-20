import { TokenRepository } from '../../domain/ports/TokenRepository';
import { AppError, ErrorCodes } from '../../shared/errors/AppError';

export class SignOutUser {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute({
    userId,
    sessionId
  }: {
    userId: string;
    sessionId: string;
  }): Promise<{ sessionId: string }> {
    if (!userId.trim() || !sessionId.trim()) {
      throw new AppError({
        code: ErrorCodes.UNAUTHORIZED,
        message: 'Invalid authentication token',
        status: 401
      });
    }

    await this.tokenRepository.revokeSession({
      userId: userId.trim(),
      sessionId: sessionId.trim(),
      revokedReason: 'user-signout'
    });

    return { sessionId: sessionId.trim() };
  }
}
