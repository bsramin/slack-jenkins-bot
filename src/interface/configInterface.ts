interface ConfigInterface {
  name: string;
  version: string;
  environment: string;
  description: string;
  logLevel: string;
  executePath: string;
  slackToken: string;
  jenkins: {
    domain: string;
    token: string;
    username: string;
    password: string;
  }
  database: {
    connectionUri: string;
    logEnabled: boolean;
  },
  webServer: {
    url: string;
    schema: string;
    host: string;
    port: number;
  },
}

export default ConfigInterface;
