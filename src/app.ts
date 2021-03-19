import Koa from 'koa';
import helmet from 'koa-helmet';
import logger from 'koa-pino-logger';
import router from '@app/router';

const app = new Koa();

/* Security headers */
app.use(helmet());

/* Logger */
app.use(logger());

/* Load routes */
app.use(router.routes());

export default app;
