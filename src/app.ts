import Koa from 'koa';
import helmet from 'koa-helmet';
import pino from 'pino';
import koaPino from 'koa-pino-logger';
import router from '@app/router';
import serve from 'koa-static';
import favicon from 'koa-favicon';
import Config from '@app/config/config';
import { environment } from '@app/constant/environment';

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
let loggerOptions;
if (Config.environment === environment.PROD) {
  loggerOptions = {
    prettifier: require('pino-pretty'),
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: 'SYS:standard',
    }
  }
}
const logger = pino(loggerOptions);
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
