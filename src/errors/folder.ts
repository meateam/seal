/**
 * All the folder errors for the controller
 */
import { FolderError } from './application';

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

export class FolderNotFoundError extends FolderError {
  constructor(message?: string) {
    super(message || 'The folder requested was not found', 404);
  }
}
