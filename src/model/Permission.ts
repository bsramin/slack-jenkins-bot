import { PermissionInterface } from '@app/interface/PermissionInterface';

export const namespace = 'f1b34739-7b39-476c-875a-691f434b97e0';

export default class Permission implements PermissionInterface {
  readonly uuid: string;
  readonly user_id: string;
  readonly job_uuid: string;
  readonly date_creation: string;

  constructor({
                uuid,
                user_id,
                job_uuid,
                date_creation,
              }: PermissionInterface) {
    this.uuid = uuid;
    this.user_id = user_id;
    this.job_uuid = job_uuid;
    this.date_creation = date_creation;
  }
}
