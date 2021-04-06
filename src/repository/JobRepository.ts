import { JobInterface } from '@app/interface/JobInterface';
import connection from '@app/connection';
import { DatabaseError } from '@app/error/DatabaseError';
import Job from '@app/model/Job';
import { SlackJobError } from '@app/error/SlackJobError';

/**
 * Save the job to the database
 *
 * @param params
 */
export const saveJob = async (params: JobInterface): Promise<string> => {
  let jobId: string;
  try {
    await connection.insert('job', params);
    jobId = params.uuid;
  } catch (e) {
    throw new DatabaseError(e);
  }
  return jobId;
};

/**
 * Retrieve all jobs
 */
export const retrieveAllJobs = async (): Promise<Job[]> => {
  let rows;
  let jobs: Job[] = [];
  try {
    rows = await connection.select(`SELECT uuid, slug, job, enabled, date_creation FROM job`);
  } catch (e) {
    throw new SlackJobError(`No Jobs found or invalid command`);
  }
  for (const [, value] of Object.entries(rows)) {
    jobs.push(<Job>{
      // @ts-ignore
      uuid: value.uuid,
      // @ts-ignore
      slug: value.slug,
      // @ts-ignore
      job: value.job,
      // @ts-ignore
      enabled: value.enabled,
      // @ts-ignore
      date_creation: value.date_creation,
    });
  }
  return jobs;
};

/**
 * Retrieve Job by slug
 *
 * @param slug
 */
export const retrieveJobBySlug = async (slug: string): Promise<Job> => {
  let row;
  try {
    row = await connection.select(`SELECT uuid, slug, job, enabled, date_creation FROM job WHERE slug = :slug LIMIT 1`, {
      slug,
      limit: 1,
    });
  } catch (e) {
    throw new SlackJobError(`Job '${slug}' not found or invalid`);
  }

  const job: Job = {
    uuid: row.uuid,
    slug: row.slug,
    job: row.job,
    enabled: row.enabled,
    date_creation: row.date_creation,
  };

  return job;
};
