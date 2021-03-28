import { JobInterface } from '@app/interface/JobInterface';

export const namespace = '22a018c5-082b-4947-ab5e-34a3097dd271';

export default class Job implements JobInterface {
  readonly uuid: string;
  readonly slug: string;
  readonly job: string;
  readonly enabled: boolean;
  readonly date_creation: string;

  constructor({
                uuid,
                slug,
                job,
                enabled,
                date_creation,
              }: JobInterface) {
    this.uuid = uuid;
    this.slug = slug;
    this.job = job;
    this.enabled = enabled;
    this.date_creation = date_creation;
  }
}
