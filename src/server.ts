import app from '@app/app';
import Config from '@app/config/config';

/**
 * Start the server
 */
app.listen(Config.webServer.port, () => {
  console.log(`⚡️ server is running ${Config.webServer.url}`);
});
