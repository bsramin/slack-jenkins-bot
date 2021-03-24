import { DateTime } from 'luxon';

export interface SlashSlashAttachments {
  attachments: {
    response_type: string,
    fallback: string,
    color: string,
    ts: DateTime,
    footer: string,
    footer_icon: string,
    fields: Array<SlashSlashAttachmentFields>,
    mrkdwn_in: Array<string>
  }
}

export interface SlashSlashAttachmentFields {
  title: string,
  value: string,
  short: boolean,
}

export interface SlashSlashResponseOptions {
  response_type?: string,
  title: string,
  message: string,
  severity: string,
  footer: string,
  footer_icon: string,
}
