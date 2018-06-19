import * as express from 'express';
import * as  bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as path from 'path';
import * as multer from 'multer';
import { config } from './config';
import { fileRouter } from './file/file.router';

class Server {
  public app: express.Application;
  public listener;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.createApplication();
    this.connectDB();
    this.configApplication();
    this.initializeRoutes();
    this.listen();
  }

  private createApplication() {
    this.app = express();
  }

  private initializeRoutes() {
    this.app.use('/api', fileRouter);
  }

  private configApplication() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(morgan('tiny'));  // 'combined for more info'

		/*express.static is a built i"n middleware function to serve static files.
		We are telling express server public folder is the place to look for the static files */
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  private connectDB() {
    // Connect mongoose to our database
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('CONNECTED!');
    });
  }

  public listen() {
    this.listener = this.app.listen(config.port, () => {
      const port = this.listener.address().port;
      console.log(`Server running on port :${port}`);
    });
  }
}

export let server = Server.bootstrap();

console.log('hello world');
