import { JobInterface } from '@app/interface/JobInterface';
import { v5 as uuidv5 } from 'uuid';
import { namespace as reqNamespace } from '@app/model/Req';
import { DateTime } from 'luxon';
import { retrieveJobBySlug, saveJob } from '@app/repository/JobRepository';
import { SlackSaveError } from '@app/error/SlackSaveError';
import Job from '@app/model/Job';

/**
 * Add Request
 *
 * @param params
 */
export const addJob = async (params: JobInterface): Promise<string> => {
  let job;
  try {
    job = await saveJob(<JobInterface>{
      uuid: uuidv5(process.hrtime(), reqNamespace),
      slug: params.slug,
      job: params.job,
      enabled: params.enabled,
      date_creation: DateTime.now().toSQL({ includeOffset: false }),
    });

    return job;
  } catch (e) {
    throw new SlackSaveError(e);
  }
}

/**
 * Get Request
 *
 * @param jobSlug
 */
export const getJob = async (jobSlug: string): Promise<Job> => {
  try {
    const job = await retrieveJobBySlug(jobSlug);
    return job;
  } catch (e) {
    throw e;
  }
}
