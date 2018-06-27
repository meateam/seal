/**
 * The errors that come from the client-side
 */
import { ClientError } from './application';

export class UserError extends ClientError {
  constructor(message?: string, status?: number) {
    super(message || 'Bad user error', status || 400);
  }
}

export class UserNotFoundError extends UserError {
  constructor(message?: string) {
    super(message || 'The user requested was not found', 404);
  }
}

export class UserExistsError extends UserError {
  constructor(message?: string) {
    super(message || 'User already exists', 409);
  }
}

export class BadIdError extends UserError {
  constructor(message?: string) {
    super(message || 'Bad id provided', 422);
  }
}
