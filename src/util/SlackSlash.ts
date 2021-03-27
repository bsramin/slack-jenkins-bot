import { DateTime } from 'luxon';
import {
  SlashSlashAttachmentFields,
  SlashSlashAttachments,
  SlashSlashResponseOptions,
} from '@app/interface/slackInterface';
import { ApplicationError } from '@app/error/ApplicationError';
import Config from '@app/config/config';

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
    attachments: [{
      response_type: options.response_type ?? 'ephemeral', // ephemeral | in_channel
      fallback: options.message,
      color: getSeverityColor(options.severity),
      ts: DateTime.now().toMillis(),
      footer: options.footer,
      footer_icon: options.footer_icon ?? 'https://iquii-static.s3-eu-west-1.amazonaws.com/iquii_logo_square.png',
      fields: [
        {
          title: options.title,
          value: options.message,
          short: true,
        },
      ],
      mrkdwn_in: ['fallback', 'fields'],
    }],
  };

  if (fields.length > 0) {
    response.attachments[0].fields = [...response.attachments[0].fields, ...fields];
  }

  if (options.hasOwnProperty('image')) {
    response.attachments[0].image_url = options.image;
  }

  return response;
};

/**
 * ERROR RESPONSE
 *
 * @param e
 */
export const SlackSlashErrorResponse = (e: Error): SlashSlashAttachments => {
  const managedErrorExpression = /^9\d{2}$/g; // 9xx errors
  let options = <SlashSlashResponseOptions>{
    title: 'Error',
    message: 'Uh Oh... there was a problem',
    severity: severityType.error,
  };

  if (e instanceof ApplicationError && managedErrorExpression.test(<string>e.code)) {
    options.message = e.message;
    options.image = `${Config.webServer.url}/img/error/${e.code}.gif`;
  }

  return SlackSlashResponse(options);
}

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

