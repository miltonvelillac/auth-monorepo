import { SignOutUser } from '../src/application/use-cases/SignOutUser';
import { ErrorCodes } from '../src/shared/errors/AppError';

type SignOutDependencies = {
  tokenRepository: { revokeSession: jest.Mock };
};

const buildUseCase = (): { useCase: SignOutUser; deps: SignOutDependencies } => {
  const deps: SignOutDependencies = {
    tokenRepository: { revokeSession: jest.fn() }
  };

  const useCase = new SignOutUser(deps.tokenRepository as never);
  return { useCase, deps };
};

describe('SignOutUser', () => {
  describe('#execute', () => {
    it('should revoke the current session and return its id', async () => {
      // Arrange
      const { useCase, deps } = buildUseCase();
      deps.tokenRepository.revokeSession.mockResolvedValue(undefined);

      // Act
      const result = await useCase.execute({
        userId: 'user-1',
        sessionId: 'session-1'
      });

      // Assert
      expect(result).toEqual({ sessionId: 'session-1' });
      expect(deps.tokenRepository.revokeSession).toHaveBeenCalledWith({
        userId: 'user-1',
        sessionId: 'session-1',
        revokedReason: 'user-signout'
      });
    });

    it('should throw UNAUTHORIZED when userId is missing', async () => {
      // Arrange
      const { useCase, deps } = buildUseCase();

      // Act
      const execution = useCase.execute({
        userId: '   ',
        sessionId: 'session-1'
      });

      // Assert
      await expect(execution).rejects.toMatchObject({
        code: ErrorCodes.UNAUTHORIZED,
        status: 401
      });
      expect(deps.tokenRepository.revokeSession).not.toHaveBeenCalled();
    });

    it('should throw UNAUTHORIZED when sessionId is missing', async () => {
      // Arrange
      const { useCase, deps } = buildUseCase();

      // Act
      const execution = useCase.execute({
        userId: 'user-1',
        sessionId: '   '
      });

      // Assert
      await expect(execution).rejects.toMatchObject({
        code: ErrorCodes.UNAUTHORIZED,
        status: 401
      });
      expect(deps.tokenRepository.revokeSession).not.toHaveBeenCalled();
    });
  });
});
