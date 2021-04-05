import Config from '@app/config/config';
import { environment } from '@app/constant/environment';
import pino from 'pino';

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
export default logger;
