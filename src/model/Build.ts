import { BuildInterface } from '@app/interface/BuildInterface';

export const namespace = '69e000dc-74f0-422d-b2b8-efad66ec9070';

export default class Build implements BuildInterface {
  readonly uuid: string;
  readonly job_uuid: string;
  readonly build_number: string;
  readonly req_uuid: string;
  readonly date_start: string;
  readonly date_end?: string;
  readonly status?: string;

  constructor({
                uuid,
                job_uuid,
                build_number,
                req_uuid,
                date_start,
                date_end,
                status,
              }: BuildInterface) {
    this.uuid = uuid;
    this.job_uuid = job_uuid;
    this.build_number = build_number;
    this.req_uuid = req_uuid;
    this.date_start = date_start;
    this.date_end = date_end;
    this.status = status;
  }
}
