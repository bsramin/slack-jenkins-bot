import { error } from '@app/constant/error';
import { ApplicationError } from '@app/error/ApplicationError';

export class SlackJobError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? error.SLACK.JOB.description, error.SLACK.JOB.code);
  }
}
