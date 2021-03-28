import { error } from '@app/constant/error';
import { ApplicationError } from '@app/error/ApplicationError';

export class SlackGenericError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? error.SLACK.GENERIC.description, error.SLACK.GENERIC.code);
  }
}
