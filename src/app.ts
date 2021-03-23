import Koa from 'koa';
import helmet from 'koa-helmet';
import pino from 'pino';
import koaPino from 'koa-pino-logger';
import router from '@app/router';

/**
 * Application Framework
 */
const app = new Koa();

/**
 * Security Headers
 */
app.use(helmet());

/**
 * Logger
 */
const logger = pino();
const koaLogger = koaPino({ logger });
app.use(koaLogger);

/**
 * Routes
 */
app.use(router.routes());


export default app;
