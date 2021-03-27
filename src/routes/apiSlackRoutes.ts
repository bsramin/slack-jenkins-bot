import Router from 'koa-router';
import koaBody from 'koa-body';
import { checkToken } from '@app/service/SlackService';
import { executeFromSlack } from '@app/controller/SlackExecuteController';
import { SlackSlashErrorResponse } from '@app/util/SlackSlash';

const router = new Router();

router.post('test', '/test', koaBody(), async ctx => {
  ctx.type = 'application/json';
  ctx.status = 200;
  let response;
  try {
    checkToken(ctx.request.body.token);
    response = executeFromSlack({
      command: ctx.request.body.command,
      text: ctx.request.body.text,
    });
  } catch (e) {
    response = SlackSlashErrorResponse(e);
  }
  console.log(response);
  return ctx.body = response;
});

export default router;
