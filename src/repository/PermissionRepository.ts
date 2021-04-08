import { PermissionInterface } from '@app/interface/PermissionInterface';
import connection from '@app/connection';
import { DatabaseError } from '@app/error/DatabaseError';
import Permission from '@app/model/Permission';
import { SlackUnauthorizedError } from '@app/error/SlackUnauthorizedError';
import { SlackJobError } from '@app/error/SlackJobError';

/**
 * Save the permission to the database
 *
 * @param params
 */
export const savePermission = async (params: PermissionInterface): Promise<string> => {
  let permissionId: string;
  try {
    await connection.insert('permission', params);
    permissionId = params.uuid;
  } catch (e) {
    throw new DatabaseError(e);
  }
  return permissionId;
};

/**
 * Retrieve the correct permission by user and job
 *
 * @param user_id
 * @param job_uuid
 */
export const retrievePermissionByUserAndJob = async (user_id: string, job_uuid: string): Promise<Permission> => {
  let row;
  try {
    row = await connection.select(`SELECT uuid FROM permission WHERE user_id = :user_id and job_uuid = :job_uuid LIMIT 1`, {
      user_id,
      job_uuid,
      limit: 1
    });
  } catch (e) {
    throw new DatabaseError(e);
  }

  if (typeof row === 'undefined') {
    throw new SlackUnauthorizedError(`${user_id} Unauthorized`);
  }

  const permission: PermissionInterface = {
    uuid: row.uuid,
    user_id: row.user_id,
    job_uuid: row.job_uuid,
    date_creation: row.date_creation,
  };

  return permission;
};

/**
 * Retrieve all permissions
 */
export const retrieveAllPermissions = async (): Promise<[]> => {
  let rows;
  let permissions: [] = [];
  try {
    rows = await connection.select(`SELECT permission.uuid, permission.user_id, job.slug, job.job, job.enabled, permission.date_creation FROM permission JOIN job ON permission.job_uuid = job.uuid`);
  } catch (e) {
    throw new SlackJobError(`No permissions found or invalid command`);
  }
  for (const [, value] of Object.entries(rows)) {
    permissions.push({
      // @ts-ignore
      uuid: value.uuid,
      // @ts-ignore
      user_id: value.user_id,
      // @ts-ignore
      job_slug: value.slug,
      // @ts-ignore
      job_name: value.job,
      // @ts-ignore
      enabled: value.enabled,
      // @ts-ignore
      date_creation: value.date_creation,
    });
  }
  return permissions;
};
