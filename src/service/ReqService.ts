import { ReqInterface } from '@app/interface/ReqInterface';
import { SlackRequest } from '@app/interface/slackInterface';
import { v5 as uuidv5 } from 'uuid';
import { namespace as reqNamespace } from '@app/model/Req';
import { DateTime } from 'luxon';
import { saveRequest } from '@app/repository/ReqRepository';
import { SlackSaveError } from '@app/error/SlackSaveError';

/**
 * Add Request
 *
 * @param params
 */
export const addRequest = async (params: SlackRequest): Promise<ReqInterface> => {
  try {
    const req = <ReqInterface>{
      uuid: uuidv5(process.hrtime(), reqNamespace),
      team_id: params.team_id,
      team_domain: params.team_domain,
      channel_id: params.channel_id,
      channel_name: params.channel_name,
      user_id: params.user_id,
      user_name: params.user_name,
      command: params.command,
      text: params.text,
      response_url: params.response_url,
      trigger_id: params.trigger_id,
      date_creation: DateTime.now().toSQL({ includeOffset: false }),
    };

    return saveRequest(req);
  } catch (e) {
    throw new SlackSaveError(e);
  }
};
