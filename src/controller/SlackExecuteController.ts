import {
  SlackRequest,
  SlackSlashAttachments, SlackSlashResponseOptions,
} from '@app/interface/slackInterface';
import { addRequest, getLatestRequests } from '@app/service/ReqService';
import { SlackParamsError } from '@app/error/SlackParamsError';
import { checkUserPermission } from '@app/service/PermissionService';
import { getJob } from '@app/service/JobService';
import { extractJenkinsCommand } from '@app/util/String';
import { jenkinsCall } from '@app/service/JenkinsService';
import logger from '@app/logger';
import { responseSlack } from '@app/service/SlackService';
import { severityType, SlackSlashResponse } from '@app/util/SlackSlash';

/**
 * @param params
 */
export const executeFromSlack = async (params: SlackRequest): Promise<SlackSlashAttachments> => {
  try {
    /**
     * Get the command
     */
      // TODO: map to db
      // @ts-ignore
    const command = params.command;

    /**
     * Get the jenkins command
     */
    const args = params.text;
    if (args?.length === 0 && !/\s/.test(<string>args)) {
      return Promise.reject(new SlackParamsError());
    }
    const jenkinsCommand = extractJenkinsCommand(args);

    /**
     * Get the jenkins job
     */
    const job = await getJob(jenkinsCommand.job);

    /**
     * Save the request
     */
    const request = await addRequest(params);
    logger.info(`${decodeURIComponent(job.job)} executed with '${args}' by ${request.user_id}`);

    /**
     * Check the user authorization
     */
    await checkUserPermission(params.user_id, job);

    /**
     * Call Jenkins
     */
    jenkinsCall(job, jenkinsCommand.params, request);

    /**
     * Return to slack a correct response
     */
    return responseSlack(job);
  } catch (e) {
    throw e;
  }
};

/**
 * @param params
 */
export const latestRequests = async (params: SlackRequest): Promise<SlackSlashAttachments> => {
  try {
    /**
     * Save the request
     */
    await addRequest(params);

    /**
     * Retrieve the latest requests
     */
    const latestRequests = await getLatestRequests();

    return SlackSlashResponse(
      <SlackSlashResponseOptions>{
        response_type: 'ephemeral',
        title: 'Latest requests',
        message: latestRequests,
        severity: severityType.info,
      }
    );
  } catch (e) {
    throw e;
  }
};

