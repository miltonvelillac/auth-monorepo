import { InMemoryTokenRepository } from '../src/infrastructure/repositories/InMemoryTokenRepository';

describe('InMemoryTokenRepository', () => {
  describe('#saveToken', () => {
    it('should persist session data grouped by user', async () => {
      // Arrange
      const repository = new InMemoryTokenRepository();

      // Act
      const result = await repository.saveToken({
        userId: 'user-1',
        clientId: 'web-app',
        sessionId: 'session-1',
        tokenId: 'token-1',
        token: 'jwt-token'
      });

      // Assert
      expect(result).toEqual({
        userId: 'user-1',
        clientId: 'web-app',
        sessionId: 'session-1',
        tokenId: 'token-1',
        token: 'jwt-token'
      });
    });
  });

  describe('#revokeSession', () => {
    it('should remove only the targeted session for the user', async () => {
      // Arrange
      const repository = new InMemoryTokenRepository();
      await repository.saveToken({
        userId: 'user-1',
        clientId: 'web-app',
        sessionId: 'session-1',
        tokenId: 'token-1',
        token: 'jwt-token-1'
      });
      await repository.saveToken({
        userId: 'user-1',
        clientId: 'mobile-app',
        sessionId: 'session-2',
        tokenId: 'token-2',
        token: 'jwt-token-2'
      });

      // Act
      await repository.revokeSession({
        userId: 'user-1',
        sessionId: 'session-1',
        revokedReason: 'user-signout'
      });

      // Assert
      const state = repository as unknown as {
        sessionsByUserId: Map<string, Array<{ sessionId: string }>>;
      };
      expect(state.sessionsByUserId.get('user-1')).toEqual([
        { clientId: 'mobile-app', sessionId: 'session-2', tokenId: 'token-2', token: 'jwt-token-2' }
      ]);
    });

    it('should ignore revoke requests for missing sessions', async () => {
      // Arrange
      const repository = new InMemoryTokenRepository();
      await repository.saveToken({
        userId: 'user-1',
        clientId: 'web-app',
        sessionId: 'session-1',
        tokenId: 'token-1',
        token: 'jwt-token-1'
      });

      // Act
      await repository.revokeSession({
        userId: 'user-1',
        sessionId: 'missing-session',
        revokedReason: 'user-signout'
      });

      // Assert
      const state = repository as unknown as {
        sessionsByUserId: Map<string, Array<{ sessionId: string }>>;
      };
      expect(state.sessionsByUserId.get('user-1')).toEqual([
        { clientId: 'web-app', sessionId: 'session-1', tokenId: 'token-1', token: 'jwt-token-1' }
      ]);
    });
  });
});
