/**
 * The errors that come from the client-side
 */
import { ClientError } from './application';

export class FolderError extends ClientError {
  constructor(message?: string, status?: number) {
    super(message || 'Bad folder error', status || 400);
  }
}

export class FolderNotFoundError extends FolderError {
  constructor(message?: string) {
    super(message || 'The folder requested was not found', 404);
  }
}

export class FolderExistsError extends FolderError {
  constructor(message?: string) {
    super(message || 'Folder already exists', 409);
  }
}

export class BadIdError extends FolderError {
  constructor(message?: string) {
    super(message || 'Bad id provided', 422);
  }
}
