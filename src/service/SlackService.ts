import Config from '@app/config/config';
import { SlackUnauthorizedError } from '@app/error/SlackUnauthorizedError';
import axios from 'axios';
import { JenkinsError } from '@app/error/JenkinsError';
import { ReqInterface } from '@app/interface/ReqInterface';
import {
  SlackSlashAttachmentFields,
  SlackSlashAttachments,
  SlackSlashResponseOptions,
} from '@app/interface/slackInterface';
import { JobInterface } from '@app/interface/JobInterface';
import { severityType, SlackSlashResponse } from '@app/util/SlackSlash';
import { composeBaseJobApiUrl } from '@app/service/JenkinsService';
import { DateTime } from 'luxon';

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

export const responseSlack = (job: JobInterface) => {
  return SlackSlashResponse(
    <SlackSlashResponseOptions>{
      response_type: "in_channel",
      title: decodeURIComponent(job.job),
      message: `:rocket: started...`,
      severity: severityType.info,
    },
    <SlackSlashAttachmentFields[]>[
      {
        title: 'Time',
        value: DateTime.now().toRFC2822(),
        short: true,
      },
      {
        title: 'Job',
        value: `<${composeBaseJobApiUrl(job.job)}|View>`,
        short: true,
      },
    ]
  )
}

/**
 * Slack Callback (finished jobs)
 *
 * @param request
 * @param response
 */
export const callbackSlack = async (request: ReqInterface, response: SlackSlashAttachments) => {
  try {
    const slackResponse = await axios.post(request.response_url, response);
    return slackResponse;
  } catch (e) {
    throw new JenkinsError(e);
  }
};
