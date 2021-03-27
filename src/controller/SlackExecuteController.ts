import { severityType, SlackSlashResponse } from '@app/util/SlackSlash';
import { SlackRequest, SlashSlashAttachments, SlashSlashResponseOptions } from '@app/interface/slackInterface';


export const executeFromSlack = (params: SlackRequest): SlashSlashAttachments => {
  try {
    // @ts-ignore
    const command = params.command;
    // @ts-ignore
    const args = params.text;

    return SlackSlashResponse(<SlashSlashResponseOptions>{
      response_type: 'in_channel',
      title: 'test',
      message: 'message',
      severity: severityType.success,
      footer: 'IQUII',
    });
  } catch (e) {
    throw e;
  }
};

