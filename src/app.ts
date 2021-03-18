import Koa from 'koa';
import router from '@app/router';

const app = new Koa();

/* Load routes */
app.use(router.routes());

export default app;
