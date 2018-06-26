/**
 *
 */
import { ApplicationError } from './application';

export class UserError extends ApplicationError {
  constructor(message?: string, status?: number) {
    super(message || 'Bad user error', status || 400);
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

export class UserNotFoundError extends UserError {
  constructor(message?: string) {
    super(message || 'The user requested was not found', 404);
  }
}
