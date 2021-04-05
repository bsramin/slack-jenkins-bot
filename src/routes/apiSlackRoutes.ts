import Router from 'koa-router';
import koaBody from 'koa-body';
import { checkToken } from '@app/service/SlackService';
import { executeFromSlackToJenkins } from '@app/controller/SlackExecuteController';
import { SlackSlashErrorResponse } from '@app/util/SlackSlash';
import Config from '@app/config/config';

const router = new Router();

router.post('execute', '/'+Config.executePath, koaBody(), async ctx => {
  ctx.type = 'application/json';
  ctx.status = 200;
  let response;
  try {
    /**
     * Check the token
     */
    checkToken(ctx.request.body.token);

    /**
     * Execute the command
     */
    response = await executeFromSlackToJenkins({
      team_id: ctx.request.body.team_id,
      team_domain: ctx.request.body.team_domain,
      channel_id: ctx.request.body.channel_id,
      channel_name: ctx.request.body.channel_name,
      user_id: ctx.request.body.user_id,
      user_name: ctx.request.body.user_name,
      command: ctx.request.body.command,
      text: ctx.request.body.text,
      api_app_id: ctx.request.body.api_app_id,
      is_enterprise_install: ctx.request.body.is_enterprise_install,
      response_url: ctx.request.body.response_url,
      trigger_id: ctx.request.body.trigger_id,
    });
  } catch (e) {
    response = SlackSlashErrorResponse(e);
  }
  return ctx.body = response;
});


export default router;
