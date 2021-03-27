import { error } from '@app/constant/error';
import { ApplicationError } from '@app/error/ApplicationError';

export class SlackSaveError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? error.SLACK.SAVE.description, error.SLACK.SAVE.code);
  }
}
