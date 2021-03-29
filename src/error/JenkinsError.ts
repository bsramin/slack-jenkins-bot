import { error } from '@app/constant/error';
import { ApplicationError } from '@app/error/ApplicationError';

export class JenkinsError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? error.JENKINS.GENERIC.description, error.JENKINS.GENERIC.code);
  }
}
