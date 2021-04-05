import Config from '@app/config/config';
import { SlackUnauthorizedError } from '@app/error/SlackUnauthorizedError';
import axios from 'axios';
import { JenkinsError } from '@app/error/JenkinsError';
import { ReqInterface } from '@app/interface/ReqInterface';
import { SlashSlashAttachments } from '@app/interface/slackInterface';

/**
 * Check token from slack
 *
 * @param token
 */
export const checkToken = (token: string): void => {
  if (token !== Config.slackToken) {
    throw new SlackUnauthorizedError();
  }
};

/**
 * Slack Callback (finished jobs)
 *
 * @param request
 * @param response
 */
export const callbackSlack = async (request: ReqInterface, response: SlashSlashAttachments) => {
  try {
    const slackResponse = await axios.post(request.response_url, response);
    return slackResponse;
  } catch (e) {
    throw new JenkinsError(e);
  }
};
