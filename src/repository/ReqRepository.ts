import { ReqInterface } from '@app/interface/ReqInterface';
import connection from '@app/connection';
import { DatabaseError } from '@app/error/DatabaseError';

/**
 * Save the request to the database
 *
 * @param request
 */
export const saveRequest = async (request: ReqInterface): Promise<ReqInterface> => {
  try {
    await connection.insert('req', request);
  } catch (e) {
    throw new DatabaseError(e);
  }
  return request;
};

/**
 * Retrieve the latest 10 requests
 */
export const retrievelatestRequests = async (): Promise<any> => {
  try {
    const latest = await connection.select('SELECT * FROM req ORDER BY date_creation DESC LIMIT 10');
    return latest;
  } catch (e) {
    throw new DatabaseError(e);
  }
}
