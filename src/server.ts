import * as express from 'express';
import * as  bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import { config } from './config';
import { initRouting } from './helper/routing';

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
    this.useDebugging();
    console.log('Server initialized.');
  }

  private createApplication() {
    this.app = express();
  }

  private initializeRoutes() {
    initRouting(this.app);
  }

  private configApplication() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

  }

  private connectDB() {
    // Connect mongoose to our database
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log(`CONNECTED! to: mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    });
  }

  public listen() {
    this.listener = this.app.listen(config.port, () => {
      const port = this.listener.address().port;
      console.log(`Server running on port :${port}`);
    });
  }

  private useDebugging() {
    console.log('************ YOU ARE IN DEBUG MODE ************');
    this.app.use(morgan('tiny'));  // 'combined' for more info
    mongoose.set('debug', true);
  }
}

export let server = Server.bootstrap();
