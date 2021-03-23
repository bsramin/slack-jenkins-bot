import Database from '@app/util/Database';
import Config from '@app/config/config';
import pino from 'pino';
const logger = pino();

export default new Database(Config.database.connectionUri, logger.info.bind(logger), Config.database.logEnabled)
