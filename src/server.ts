import app from '@app/app';
import Config from '@app/config/config';

const HOST = Config.webServer.host;
const PORT = Config.webServer.port;
const SCHEMA = Config.webServer.schema;

let PORT_STRING = '';
if (PORT !== 80 && PORT !== 443) {
  PORT_STRING = ':' + PORT;
}

/* Start the server */
app.listen(PORT, () => {
  console.log(`⚡️ server is running ${SCHEMA}://${HOST}${PORT_STRING}`);
});
