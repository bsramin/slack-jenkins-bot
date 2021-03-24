import { DateTime } from 'luxon';
import {
  SlashSlashAttachmentFields,
  SlashSlashAttachments,
  SlashSlashResponseOptions,
} from '@app/interface/slackInterface';

export const severityType = {
  info: 'info',
  success: 'success',
  alert: 'alert',
  error: 'error',
};

/**
 * RESPONSE
 *
 * @param options
 * @param fields
 */
export const SlackSlashResponse = (options: SlashSlashResponseOptions, fields: Array<SlashSlashAttachmentFields> = []): SlashSlashAttachments => {
  const response: SlashSlashAttachments = {
    attachments: {
      response_type: options.response_type ?? 'ephemeral',
      fallback: options.message,
      color: getSeverityColor(options.severity),
      ts: DateTime.now(),
      footer: options.footer,
      footer_icon: options.footer_icon,
      fields: [
        {
          title: options.title,
          value: options.message,
          short: false,
        },
      ],
      mrkdwn_in: ['fallback', 'fields'],
    },
  };

  if (fields.length > 0) {
    response.attachments.fields = [...response.attachments.fields, ...fields];
  }

  return response;
};

/**
 * Get correct color from severity
 *
 * @param severity
 */
const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case severityType.info:
      return '#436788';
    case severityType.success:
      return '#008c15';
    case severityType.alert:
      return '#fec200';
    case severityType.error:
      return '#ea0038';
    default:
      return '#e8e8e8';
  }
};
