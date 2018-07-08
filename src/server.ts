/**
 *
 */
import * as  bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as path from 'path';
import * as multer from 'multer';
import { config } from './config';
import { initRouting } from './helpers/routing';

class Server {
  public app: express.Application;
  public listener: any;

  constructor() {
    this.createApplication();
    this.connectDB();
    this.configApplication();
    this.initializeRoutes();
    this.listen();
    this.useDebugging();
    console.log('Server initialized.');
  }

  public static bootstrap(): Server {
    return new Server();
  }

  public listen(): void {
    this.listener = this.app.listen(config.port, () => {
      const port : any = this.listener.address().port;
      console.log(`Server running on port :${port}`);
    });
  }

  private createApplication(): void {
    this.app = express();
  }

  private initializeRoutes(): void {
    initRouting(this.app);
  }

  private configApplication(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(morgan('tiny'));  // 'combined for more info'

		/*express.static is a built i"n middleware function to serve static files.
		We are telling express server public folder is the place to look for the static files */
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  private connectDB(): void {
    // Connect mongoose to our database
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    const db : mongoose.Connection = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log(`CONNECTED! to: mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    });
  }

  private useDebugging() : void {
    console.log('************ YOU ARE IN DEBUG MODE ************');
    this.app.use(morgan('tiny'));  // 'combined' for more info
    mongoose.set('debug', true);
  }

}

export let server : Server = Server.bootstrap();
