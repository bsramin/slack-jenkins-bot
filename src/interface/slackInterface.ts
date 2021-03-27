export interface SlashSlashAttachments {
  attachments: [{
    response_type: string,
    fallback: string,
    color: string,
    ts: number,
    footer?: string,
    footer_icon?: string,
    image_url?: string,
    fields: Array<SlashSlashAttachmentFields>,
    mrkdwn_in: Array<string>
  }]
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
  image?: string,
  footer?: string,
  footer_icon?: string,
}

export interface SlackRequest {
  token?: string,
  team_id?: string,
  team_domain?: string,
  channel_id?: string,
  channel_name?: string,
  user_id?: string,
  user_name?: string,
  command?: string,
  text?: string,
  api_app_id?: string,
  is_enterprise_install?: string,
  response_url?: string,
  trigger_id?: string
}
