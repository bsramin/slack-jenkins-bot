import Koa from 'koa';
import helmet from 'koa-helmet';
import koaPino from 'koa-pino-logger';
import router from '@app/router';
import logger from '@app/logger';
import serve from 'koa-static';
import favicon from 'koa-favicon';

/**
 * Application Framework
 */
const app = new Koa();

/**
 * Security Headers
 */
app.use(helmet());

const koaLogger = koaPino({ logger });
app.use(koaLogger);

/**
 * Static files
 */
app.use(serve(__dirname + '/public'));

/**
 * Favicon (prevent 404 in logs)
 */
app.use(favicon(__dirname + '/public/favicon.ico'));

/**
 * Routes
 */
app.use(router.routes());


export default app;
