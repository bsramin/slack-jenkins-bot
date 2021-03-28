import { ReqInterface } from '@app/interface/ReqInterface';
import connection from '@app/connection';
import { DatabaseError } from '@app/error/DatabaseError';

/**
 * Save the request to the database
 *
 * @param params
 */
export const saveRequest = async (params: ReqInterface): Promise<string> => {
  let reqId: string;
  try {
    await connection.insert('req', params);
    reqId = params.uuid;
  } catch (e) {
    throw new DatabaseError(e);
  }
  return reqId;
};
