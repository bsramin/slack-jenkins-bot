interface ConfigInterface {
  name: string;
  version: string;
  environment: string;
  description: string;
  logLevel: string;
  webServer: {
    url: string;
    schema: string;
    host: string;
    port: number;
  }
}

export default ConfigInterface;
