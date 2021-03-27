import { version, description, name } from '../../package.json';
import { environment } from '@app/constant/environment';
import { Loglevel } from '@app/constant/loglevel';
import ConfigInterface from '@app/interface/configInterface';

const Config: ConfigInterface = {
  name: name,
  version: version,
  environment: process.env.NODE_ENV ?? environment.DEV,
  description: description,
  logLevel: process.env.LOG_LEVEL ?? Loglevel.INFO,
  slackToken: process.env.SLACK_BOT_TOKEN ?? '',
  database: {
    connectionUri: process.env.DB_URI ?? '',
    logEnabled: Boolean(Number(process.env.DB_LOG_ENABLED)),
  },
  webServer: {
    url: `${process.env.SCHEMA}://${process.env.HOSTNAME}`,
    schema: process.env.SCHEMA ?? 'http',
    host: process.env.HOSTNAME ?? 'slb.localhost',
    port: Number(process.env.PORT) ?? 80,
  },
};

if (Config.webServer.port !== 80 && Config.webServer.port !== 443) {
  Config.webServer.url += ':'+Config.webServer.port;
}

export default Config;
