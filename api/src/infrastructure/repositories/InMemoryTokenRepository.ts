import { TokenRepository } from '../../domain/ports/TokenRepository';

export class InMemoryTokenRepository implements TokenRepository {
  private readonly sessionsByUserId = new Map<string, Array<{
    clientId: string;
    sessionId: string;
    tokenId: string;
    token: string;
  }>>();

  async saveToken({
    userId,
    clientId,
    sessionId,
    tokenId,
    token
  }: {
    userId: string;
    clientId: string;
    sessionId: string;
    tokenId: string;
    token: string;
  }): Promise<{
    userId: string;
    clientId: string;
    sessionId: string;
    tokenId: string;
    token: string;
  }> {
    const sessions = this.sessionsByUserId.get(userId) || [];
    sessions.push({ clientId, sessionId, tokenId, token });
    this.sessionsByUserId.set(userId, sessions);
    return { userId, clientId, sessionId, tokenId, token };
  }

  async revokeSession({
    userId,
    sessionId
  }: {
    userId: string;
    sessionId: string;
    revokedReason: string;
  }): Promise<void> {
    const sessions = this.sessionsByUserId.get(userId) || [];
    const activeSessions = sessions.filter(session => session.sessionId !== sessionId);

    if (activeSessions.length === 0) {
      this.sessionsByUserId.delete(userId);
      return;
    }

    this.sessionsByUserId.set(userId, activeSessions);
  }
}
