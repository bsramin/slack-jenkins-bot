import mysql, { Pool, PoolOptions, PoolConnection } from 'mysql2/promise';
import { DatabaseError } from '@app/error/DatabaseError';

export default class Database {
  pool: Pool;
  logger: Function = Function.prototype;
  loggerEnabled: boolean = false

  /**
   * Constructor
   *
   * @param connectionUri
   * @param logger
   * @param loggerEnabled
   */
  constructor (connectionUri: string, logger: Function, loggerEnabled: boolean) {
    if (!connectionUri) {
      throw new DatabaseError(`Missing or invalid database connection parameters`);
    }
    this.logger = logger;
    this.loggerEnabled = loggerEnabled;
    this.pool = mysql.createPool(<PoolOptions>{
      uri: connectionUri,
      namedPlaceholders: true,
      dateStrings: true,
      timezone: 'local',
      typeCast: true
    });
  }

  /**
   * Singleton getinstance method
   */
  public connection = async (): Promise<PoolConnection> => {
    const connection = await this.pool.getConnection();
    return connection;
  };

  /**
   * @param query
   * @param replacements
   * @param connection
   */
  public execute = async (query: string, replacements: any = {}, connection: PoolConnection | Pool = this.pool): Promise<any> => {
    if (this.loggerEnabled) {
      this.logger(this.composeQuery(query, replacements));
    }
    const result = await connection.execute(query, replacements);
    return result;
  };


  /**
   * SELECT
   *
   * @param {string} query
   * @param {object} replacements
   * @param connection
   */
  public select = async (query: string, replacements: any = {}, connection: PoolConnection | Pool = this.pool): Promise<any> => {
    const [result]: any = await this.execute(query, replacements, connection);
    if (replacements.limit === 1) {
      return result[0];
    }
    return result;
  };

  /**
   * INSERT
   *
   * @param {string} table
   * @param {object} replacements
   * @param {PoolConnection} connection*
   */
  public insert = async (table: string, replacements: any = {}, connection: PoolConnection | Pool = this.pool) => {
    const columns = Object.keys(replacements);
    const query = `INSERT INTO \`${table}\` (\`${columns.join('`,`')}\`) VALUES (:${columns.join(', :')})`;
    const result = await this.execute(query, replacements, connection);
    return result[0].insertId;
  };

  /**
   * UPDATE
   *
   * @param {string} query
   * @param {object} replacements
   * @param {PoolConnection} connection
   */
  public update = async (query: string, replacements: any = {}, connection: PoolConnection | Pool = this.pool) => {
    const [{ affectedRows: result }] = await this.execute(query, replacements, connection);
    return result;
  };

  /**
   * DELETE
   *
   * @param {string} query
   * @param {object} replacements
   * @param {PoolConnection} connection
   */
  public delete = async (query: string, replacements: any = {}, connection: PoolConnection | Pool = this.pool) => {
    const [{ affectedRows: result }] = await this.execute(query, replacements, connection);
    return result;
  };

  /**
   * Compose query for the logger
   *
   * @param query
   * @param replacements
   */
  private composeQuery = (query: string, replacements: any = {}) => {
    if (replacements) {
      for (const [key, value] of Object.entries(replacements)) {
        const pattern = new RegExp(`:${key}(?=\\)|\\b)`, 'g');
        // @ts-ignore
        query = query.replace(pattern, typeof value === 'number' || value === null ? value : `'${value}'`);
      }
    }
    return query;
  };
}
