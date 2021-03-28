import { PermissionInterface } from '@app/interface/PermissionInterface';
import connection from '@app/connection';
import { DatabaseError } from '@app/error/DatabaseError';
import Permission from '@app/model/Permission';
import { SlackUnauthorizedError } from '@app/error/SlackUnauthorizedError';

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
    row = await connection.select(`SELECT uuid FROM permission WHERE user_id = :user_id and uuid = :job_uuid LIMIT 1`, {
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
