import axios from 'axios';
import Config from '@app/config/config';
import { objectToQueryString } from '@app/util/String';
import { JenkinsError } from '@app/error/JenkinsError';
import { BuildInterface } from '@app/interface/BuildInterface';
import { v5 as uuidv5 } from 'uuid';
import { namespace as buildNamespace } from '@app/model/Build';
import { DateTime } from 'luxon';
import { spawn, Thread, Worker } from 'threads';
import { WorkerJobInfo } from '@app/worker/retrieveJobInfoWorker';
import { WorkerJobStatus } from '@app/worker/checkJobStatusWorker';
import { sleep } from '@app/util/System';
import { saveBuildEnded, saveBuildStarted } from '@app/repository/BuildRepository';
import { JobInterface } from '@app/interface/JobInterface';
import { callbackSlack } from '@app/service/SlackService';
import { severityType, SlackSlashResponse } from '@app/util/SlackSlash';
import { SlackSlashAttachmentFields, SlackSlashResponseOptions } from '@app/interface/slackInterface';
import { ReqInterface } from '@app/interface/ReqInterface';
import logger from '@app/logger';

/**
 * @param jobName
 * @param buildNumber
 * @param publicUrl
 */
export const composeBuildedJobApiUrl = (jobName: string, buildNumber: string, publicUrl: boolean = false): string => {
  if (publicUrl) {
    return `${Config.jenkins.domain_public}/job/${jobName}/${buildNumber}/`;
  }
  return `${Config.jenkins.domain}/job/${jobName}/${buildNumber}/`;
};

/**
 * @param jobName
 * @param publicUrl
 */
export const composeBaseJobApiUrl = (jobName: string, publicUrl: boolean = false): string => {
  if (publicUrl) {
    return `${Config.jenkins.domain_public}/job/${jobName}/`;
  }
  return `${Config.jenkins.domain}/job/${jobName}/`;
};

/**
 * The main method for calling jenkins
 *
 * @param job
 * @param jenkinsCommandParams
 * @param request
 */
export const jenkinsCall = async (job: JobInterface, jenkinsCommandParams: any, request: ReqInterface) => {
  try {
    /**
     * Execute the jenkins job
     */
    const getterJobInfoUrl = await executeJob(job.job, jenkinsCommandParams);

    /**
     * Check and save the started build
     */
    let build = await saveBuildStarted(
      await retrieveJobInfo(getterJobInfoUrl, job.uuid, request.uuid),
    );

    /**
     * Check and save if the job is finished
     */
    build = await checkJobFinished(job.job, build);
    await saveBuildEnded(build);

    await callbackSlack(request,
      SlackSlashResponse(
        <SlackSlashResponseOptions>{
          response_type: 'in_channel',
          title: decodeURIComponent(job.job),
          message: (build.status == 'SUCCESS') ? `:tada: Completed.` : `:firecracker: Failed!`,
          severity: (build.status == 'SUCCESS') ? severityType.success : severityType.error,
        },
        <SlackSlashAttachmentFields[]>[
          {
            title: 'Build number',
            value: build.build_number,
            short: true,
          },
          {
          title: 'Console',
          value: `<${composeBuildedJobApiUrl(job.job, build.build_number, true)}console|View>`,
          short: true,
          },
        ],
      ),
    );

    const artifacts = await retrieveArtifacts(job.job, build);

    if (null !== artifacts) {
      await callbackSlack(request,
        SlackSlashResponse(
          <SlackSlashResponseOptions>{
            response_type: 'ephemeral',
          }
        , artifacts as SlackSlashAttachmentFields[])
      );
    }
  } catch (e) {
    logger.error(e);
    await callbackSlack(request,
      SlackSlashResponse(
        <SlackSlashResponseOptions>{
          response_type: 'in_channel',
          title: decodeURIComponent(job.job),
          message: `:firecracker: Failed!`,
          severity: severityType.error,
        }
      ),
    );
  }
};

/**
 * Call Jenkins Api for the selected job
 *
 * @param jobName
 * @param params
 */
const executeJob = async (jobName: string, params: any): Promise<string> => {
  try {
    const apiUrl = composeBuildJobApiUrl(jobName, params);
    const response = await axios({
      url: apiUrl,
      method: 'post',
      params,
      auth: {
        username: Config.jenkins.username,
        password: Config.jenkins.password,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.headers.location;
    } else {
      throw new JenkinsError();
    }
  } catch (e) {
    throw new JenkinsError(e);
  }
};

/**
 * Retrieve job information from jenkins
 *
 * @param getterJobInfoUrl
 * @param jobId
 * @param reqId
 */
const retrieveJobInfo = async (getterJobInfoUrl: string, jobId: string, reqId: string): Promise<any> => {

  const worker = await spawn<typeof WorkerJobInfo>(new Worker(`../worker/retrieveJobInfoWorker`));

  try {
    let item;
    do {
      await sleep(3000);
      item = await worker.retrieveJobInfoWorker(getterJobInfoUrl);
    }
    while (!item?.executable?.hasOwnProperty('number'));

    return <BuildInterface>{
      uuid: uuidv5(process.hrtime(), buildNamespace),
      date_start: DateTime.fromMillis(item.inQueueSince).toSQL({ includeOffset: false }),
      build_number: item.executable?.number,
      job_uuid: jobId,
      req_uuid: reqId,
    };
  } catch (error) {
    logger.error(error);
  } finally {
    await Thread.terminate(worker);
  }
};

/**
 * Check if the job is finished
 *
 * @param jobName
 * @param build
 */
const checkJobFinished = async (jobName: string, build: BuildInterface): Promise<any> => {
  const worker = await spawn<typeof WorkerJobStatus>(new Worker(`../worker/checkJobStatusWorker`));
  const getterBaseJobApiUrl = composeBuildedJobApiUrl(jobName, build.build_number);
  try {
    let item;
    do {
      await sleep(5000);
      item = await worker.retrieveJobStatusWorker(getterBaseJobApiUrl);
    }
    while (item?.result != 'SUCCESS' && item?.result != 'FAILURE');

    return <BuildInterface>{
      uuid: build.uuid,
      date_start: build.date_start,
      date_end: DateTime.fromMillis(item.timestamp).toSQL({ includeOffset: false }),
      build_number: build.build_number,
      job_uuid: build.job_uuid,
      req_uuid: build.req_uuid,
      status: item.result,
    };
  } catch (error) {
    logger.error(error);
  } finally {
    await Thread.terminate(worker);
  }
};

/**
* Retrieve artifacts from the job
*
* @param jobName
* @param build
*/
const retrieveArtifacts = async (jobName: string, build: BuildInterface): Promise<any> => {
  try {
    const apiUrl = composeBuildedJobApiUrl(jobName, build.build_number)+'/lastSuccessfulBuild/artifact/slackResponse.txt';
    const response = await axios({
      url: apiUrl,
      method: 'get',
      auth: {
        username: Config.jenkins.username,
        password: Config.jenkins.password,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return null
  } catch (e) {
    return null
  }
};

/**
 * @param jobName
 * @param params
 */
const composeBuildJobApiUrl = (jobName: string, params: [any]): string => {
  const baseUrl: string = composeBaseJobApiUrl(jobName);
  let queryString: string = '';
  let typeBuild: string = 'build';
  if (params.length > 0) {
    typeBuild = 'buildWithParameters';
    queryString = `&${objectToQueryString(params)}`;
  }
  return `${baseUrl}${typeBuild}?token=${Config.jenkins.token}${queryString}`;
};
