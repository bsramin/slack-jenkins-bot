import { error } from '@app/constant/error';
import { ApplicationError } from '@app/error/ApplicationError';

export class SlackParamsError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? error.SLACK.PARAMS.description, error.SLACK.PARAMS.code);
  }
}
