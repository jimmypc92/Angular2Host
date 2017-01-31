import * as http from 'http';
import * as debug from 'debug';

import App from './App';

const port = parsePort(process.env.PORT || 3000);
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function parsePort(val: number|string): number {
  let port: number = typeof(val) === 'string' ? parseInt(val, 10) : val;

  if (isNaN(port))  {
    console.error(`Invalid port '${port}' specified.`);
    process.exit(1);
  }
  
  return port;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
     throw error;
  }

  let bind = 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  debug(`Listening on port ${addr.port}`);
}