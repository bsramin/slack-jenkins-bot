import * as fs from 'fs';
import path from 'path';
import logger from '@app/logger';
import connection from '@app/connection';

(async (): Promise<void> => {
  try {
    logger.info('try to import tables.sql');
    const dbInit = fs.readFileSync(path.join(__dirname, 'tables.sql')).toString();
    await connection.query(dbInit);
    process.exit(0);
  } catch (e) {
    logger.error(e.message);
    process.exit(1);
  }
})();
