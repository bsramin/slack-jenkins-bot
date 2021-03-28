import { PermissionInterface } from '@app/interface/PermissionInterface';
import { v5 as uuidv5 } from 'uuid';
import { namespace as permissionNamespace } from '@app/model/Permission';
import { DateTime } from 'luxon';
import { retrievePermissionByUserAndJob, savePermission } from '@app/repository/PermissionRepository';
import { SlackSaveError } from '@app/error/SlackSaveError';
import { JobInterface } from '@app/interface/JobInterface';

/**
 * Add Permission
 *
 * @param params
 */
export const addPermission = async (params: PermissionInterface): Promise<string> => {
  let permission;
  try {
    permission = await savePermission(<PermissionInterface>{
      uuid: uuidv5(process.hrtime(), permissionNamespace),
      user_id: params.user_id,
      job_uuid: params.job_uuid,
      date_creation: DateTime.now().toSQL({ includeOffset: false }),
    });

    return permission;
  } catch (e) {
    throw new SlackSaveError(e);
  }
}

/**
 * Check Permission
 *
 * @param user_id
 * @param job
 */
export const checkUserPermission = async (user_id: string, job: JobInterface): Promise<void> => {
  try {
    await retrievePermissionByUserAndJob(user_id, job.uuid);
  } catch (e) {
    throw e;
  }
}
