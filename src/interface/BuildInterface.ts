export interface BuildInterface {
  uuid: string,
  req_uuid: string,
  job_uuid: string,
  build_number: string,
  date_start: string,
  date_end?: string,
  status?: string,
}
