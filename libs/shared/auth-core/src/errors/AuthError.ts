export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code = 'AUTH_ERROR',
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends AuthError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}
