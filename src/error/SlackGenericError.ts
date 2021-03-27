import { error } from '@app/constant/error';
import { ApplicationError } from '@app/error/ApplicationError';

export class SlackUnauthorized extends ApplicationError {
  constructor(message?: string) {
    super(message ?? error.SLACK.UNAUTHORIZED.description, error.SLACK.UNAUTHORIZED.code);
  }
}
