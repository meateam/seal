/**
 * The errors that come from the client-side
 */
import { ClientError } from './application';

export class FileError extends ClientError {
  constructor(message?: string, status?: number) {
    super(message || 'Bad file error', status || 400);
  }
}

export class FilesEmpty extends ClientError {
  constructor(message?: string, status?: number) {
    super(message || 'Files cannot be empty', status || 400);
  }
}

export class FileNotFoundError extends FileError {
  constructor(message?: string) {
    super(message || 'The file requested was not found', 404);
  }
}

export class FileExistsError extends FileError {
  constructor(message?: string) {
    super(message || 'File already exists', 409);
  }
}

export class BadIdError extends FileError {
  constructor(message?: string) {
    super(message || 'Bad id provided', 422);
  }
}

export class DeleteFileError extends FileError {
  constructor(message?: string) {
    super(message || 'File doesnt exist', 404);
  }
}

export class UpdateFileError extends FileError {
  constructor(message?: string) {
    super(message || 'File was not updated', 422);
  }
}
