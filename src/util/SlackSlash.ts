import { DateTime } from 'luxon';
import {
  SlackSlashAttachmentFields,
  SlackSlashAttachments,
  SlackSlashResponseOptions,
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
export const SlackSlashResponse = (options: SlackSlashResponseOptions, fields: Array<SlackSlashAttachmentFields> = []): SlackSlashAttachments => {
  const response: SlackSlashAttachments = {
    attachments: [{
      response_type: options.response_type ?? 'ephemeral', // ephemeral | in_channel
      fallback: options.message,
      color: getSeverityColor(options.severity),
      ts: DateTime.now().toMillis(),
      title: options.title,
      text: options.message,
      image_url: options.image ?? '',
      footer: options.footer ?? Config.custom.footerCompany,
      footer_icon: options.footer_icon ?? Config.custom.footerLogoUrl,
      mrkdwn_in: ['fallback', 'fields'],
    }],
  };

  if (fields.length > 0) {
    response.attachments[0].fields = fields;
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
export const SlackSlashErrorResponse = (e: Error): SlackSlashAttachments => {
  const managedErrorExpression = /^9\d{2}$/g; // 9xx errors
  let options = <SlackSlashResponseOptions>{
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

