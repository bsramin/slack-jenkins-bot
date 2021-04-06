import Router from 'koa-router';
import koaBody from 'koa-body';
import { checkToken } from '@app/service/SlackService';
import { executeFromSlack, latestRequests } from '@app/controller/SlackExecuteController';
import {
  convertRequestToSlackRequest,
  SlackSlashErrorResponse,
} from '@app/util/SlackSlash';
import Config from '@app/config/config';
import logger from '@app/logger';

const router = new Router();

router.post('execute', '/' + Config.executePath, koaBody(), async ctx => {
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
    response = await executeFromSlack(
      convertRequestToSlackRequest(ctx.request),
    );
  } catch (e) {
    logger.error(e);
    response = SlackSlashErrorResponse(e);
  }
  return ctx.body = response;
});

router.post('latestRequests', '/requests/latest', koaBody(), async ctx => {
  ctx.type = 'application/json';
  ctx.status = 200;
  let response;
  try {
    /**
     * Check the token
     */
    checkToken(ctx.request.body.token);

    /**
     * Get the latest 10 requests
     */
    response = await latestRequests(
      convertRequestToSlackRequest(ctx.request),
    );
  } catch (e) {
    logger.error(e);
    response = SlackSlashErrorResponse(e);
  }
  return ctx.body = response;
});

export default router;
