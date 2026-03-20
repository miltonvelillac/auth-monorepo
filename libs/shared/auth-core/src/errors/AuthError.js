"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.AuthError = void 0;
class AuthError extends Error {
    constructor(message, code = 'AUTH_ERROR', details) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
class ValidationError extends AuthError {
    constructor(message) {
        super(message, 'VALIDATION_ERROR');
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=AuthError.js.map