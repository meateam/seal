/**
 * This file contains extended errors for the application.
 */

export class ApplicationError extends Error {
  private status: number;

  constructor(message: string, status: number) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Error: Undefined Application Error';
    this.status = status || 500;
  }
}

export class UserError extends ApplicationError {
  constructor(message?: string, status?: number) {
    super(message || 'Internal Server Error', status || 500);
  }
}

export class FolderError extends ApplicationError {
  constructor(message?: string, status?: number) {
    super(message || 'Internal Server Error', status || 500);
  }
}
