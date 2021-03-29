import { severityType, SlackSlashResponse } from '@app/util/SlackSlash';
import { SlackRequest, SlashSlashAttachments, SlashSlashResponseOptions } from '@app/interface/slackInterface';
import { addRequest } from '@app/service/ReqService';
import { SlackParamsError } from '@app/error/SlackParamsError';
import { checkUserPermission } from '@app/service/PermissionService';
import { getJob } from '@app/service/JobService';
import { extractJenkinsCommand } from '@app/util/String';
import { executeJob } from '@app/service/JenkinsService';


export const executeFromSlackToJenkins = async (params: SlackRequest): Promise<SlashSlashAttachments> => {
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
    await addRequest(params);

    /**
     * Check the user authorization
     */
    await checkUserPermission(params.user_id, job);

    /**
     * Call Jenkins
     */
    await executeJob(job.job, jenkinsCommand.params);

    /**
     * Return to slack a correct response
     */
    return SlackSlashResponse(<SlashSlashResponseOptions>{
      response_type: 'in_channel',
      title: 'test',
      message: 'message',
      severity: severityType.success,
    });
  } catch (e) {
    throw e;
  }
};

