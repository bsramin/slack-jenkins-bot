import Config from '@app/config/config';
import { SlackUnauthorizedError } from '@app/error/SlackUnauthorizedError';

export const checkToken = (token: string): void => {
  if  (token !== Config.slackToken) {
    throw new SlackUnauthorizedError();
  }
}
