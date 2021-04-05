import { BuildInterface } from '@app/interface/BuildInterface';
import connection from '@app/connection';
import { DatabaseError } from '@app/error/DatabaseError';

/**
 * Save the build to the database
 *
 * @param build
 */
export const saveBuildStarted = async (build: BuildInterface): Promise<BuildInterface> => {
  try {
    await connection.insert('build', build);
  } catch (e) {
    throw new DatabaseError(e);
  }
  return build;
};

/**
 * Save the end of build to the database
 *
 * @param params
 */
export const saveBuildEnded = async (params: BuildInterface): Promise<string> => {
  let reqId: string;
  try {
    await connection.update('UPDATE build SET date_end = :date_end WHERE uuid = :build_uuid', {
      'date_end': params.date_end,
      'build_uuid': params.uuid,
    });
    reqId = params.uuid;
  } catch (e) {
    throw new DatabaseError(e);
  }
  return reqId;
};
