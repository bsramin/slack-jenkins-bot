import Router from 'koa-router';

const router = new Router();

router.get('health', '/health', async ctx => {
  ctx.body = 'ok';
});

export default router;
