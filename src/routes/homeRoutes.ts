import Router from 'koa-router';

const router = new Router();

router.get('home', '/', async ctx => {
  ctx.body = 'hello!';
});

export default router;
