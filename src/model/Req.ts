import { ReqInterface } from '@app/interface/ReqInterface';

export const namespace = 'a23ecd3c-3ef9-43f9-ae58-5570f3402ae6';

export default class Req implements ReqInterface {
  readonly uuid: string;
  readonly team_id: string;
  readonly team_domain: string;
  readonly channel_id: string;
  readonly channel_name: string;
  readonly user_id: string;
  readonly user_name: string;
  readonly command: string;
  readonly text: string;
  readonly response_url: string;
  readonly trigger_id: string;
  readonly date_creation: string;

  constructor({
                uuid,
                team_id,
                team_domain,
                channel_id,
                channel_name,
                user_id,
                user_name,
                command,
                text,
                response_url,
                trigger_id,
                date_creation,
              }: ReqInterface) {
    this.uuid = uuid;
    this.team_id = team_id;
    this.team_domain = team_domain;
    this.channel_id = channel_id;
    this.channel_name = channel_name;
    this.user_id = user_id;
    this.user_name = user_name;
    this.command = command;
    this.text = text;
    this.response_url = response_url;
    this.trigger_id = trigger_id;
    this.date_creation = date_creation;
  }
}
