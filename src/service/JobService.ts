import { JobInterface } from '@app/interface/JobInterface';
import { retrieveAllJobs, retrieveJobBySlug, saveJob } from '@app/repository/JobRepository';
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
    job = await saveJob(params);

    return job;
  } catch (e) {
    throw new SlackSaveError(e);
  }
}

/**
 * Get all jobs
 */
export const getAllJobs = async (): Promise<Job[]> => {
  try {
    const jobs = await retrieveAllJobs();
    return jobs;
  } catch (e) {
    throw e;
  }
}

/**
 * Get Job
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
