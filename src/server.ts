import * as express from 'express';
import * as  bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import { config } from './config';
import { initRouting } from './helper/routing';

class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.createApplication();
    this.connectDB();
    this.initializeRoutes();
    this.configApplication();
    this.listen();
  }

  private createApplication() {
    this.app = express();
  }

  private initializeRoutes() {
    // Add routers
    // this.app.use('api')
    initRouting(this.app);
  }

  private configApplication() {
    this.app.use(bodyParser.urlencoded({ extened: true }));
    this.app.use(bodyParser.json());
    this.app.use(morgan('tiny'));  // 'combined' for more info
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

  private listen() {
    this.app.listen(config.port, () => {
      console.log(`Server running on port :${config.port}`);
    });
  }
}

export let server = Server.bootstrap();

console.log('hello world');
