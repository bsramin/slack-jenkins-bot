import Router from 'koa-router';
import { severityType, SlackSlashResponse } from '@app/util/SlackSlash';
import { SlashSlashResponseOptions } from '@app/interface/slackInterface';

const router = new Router();

router.get('test', '/test', async ctx => {
  ctx.type = 'application/json';
  ctx.status = 200;
  return ctx.body = SlackSlashResponse(<SlashSlashResponseOptions>{
    title: 'test',
    message: 'message',
    severity: severityType.alert,
    footer: 'IQUII',
  })
});

export default router;
