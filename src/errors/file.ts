/**
 * The errors that come from the client-side
 */
import { ClientError } from './application';

export class FileError extends ClientError {
  constructor(message?: string, status?: number) {
    super(message || 'Bad user error', status || 400);
  }
}

export class FileNotFoundError extends FileError {
  constructor(message?: string) {
    super(message || 'The file requested was not found', 404);
  }
}

export class NoFilesFoundError extends FileError {
  constructor(message?: string) {
    super(message || 'No Files Found', 404);
  }
}

export class UserExistsError extends FileError {
  constructor(message?: string) {
    super(message || 'User already exists', 409);
  }
}

export class BadIdError extends FileError {
  constructor(message?: string) {
    super(message || 'Bad id provided', 422);
  }
}
