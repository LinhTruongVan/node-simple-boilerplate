import {} from 'dotenv/config';
import app from './app';

/**
 * Start server.
 */
const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log('  App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  // eslint-disable-next-line
  console.log('  Press CTRL-C to stop\n');
});

export default server;
