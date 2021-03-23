import { error } from '@app/constant/error';
import { ApplicationError } from '@app/error/ApplicationError';

export class DatabaseError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? error.DATABASE.description, error.DATABASE.code);
  }
}
