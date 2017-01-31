import * as express from 'express';
import * as logger from 'morgan';
import * as URL from 'url';
import * as process from 'process';
import {replaceVersions} from './ReplaceVersions';

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(this.cacheControl);
    this.express.use(logger('dev'));
    this.express.use(replaceVersions);
  }

  private routes(): void {
    let router = express.Router();

    router.get('/*', (req, res, next) => {
      let segments = URL.parse(req.url).pathname.split('/');
      let lastSegment = segments[segments.length - 1];

      const defaultFile = 'index.html';
      let fileName = lastSegment.indexOf('.') == -1 ? defaultFile : lastSegment;

      res.sendFile(fileName, {root: process.cwd()}, err => {

        if ((<any>err).status == 404) {
          res.sendFile(defaultFile, {root: process.cwd()});
        }

      });

    });

    this.express.use('/', router);
  }

  private cacheControl: express.RequestHandler = (req, res, next) => {
    res.setHeader('Cache-Control', 'max-age=3600');
    next();
  }
}

export default new App().express;