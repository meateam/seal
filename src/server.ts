import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as path from 'path';
import { config } from './config';
import { initRouter } from './router';

export class Server {
  public app: express.Application;
  public listener: any;

  constructor(testing = false) {

    this.createApplication();
    this.configApplication();
    this.initializeRoutes();
    if (!testing) {
      this.connectDB();
      this.log();
      this.listen();
    }
  }

  public static bootstrap(): Server {
    return new Server();
  }

  private createApplication(): void {
    this.app = express();
  }

  private initializeRoutes(): void {
    initRouter(this.app);
  }

  private configApplication(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(morgan('tiny'));  // 'combined for more info'

		/*express.static is a built i"n middleware function to serve static files.
		We are telling express server public folder is the place to look for the static files */
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  private log() {
    this.app.use(morgan('tiny'));  // 'combined' for more info
  }

  private connectDB() {
    // Connect mongoose to our database
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('DB IS CONNECTED!');
    });
  }

  private listen() {
    // Insures you don't run the server twice
    if (!module.parent) {
      this.listener = this.app.listen(config.port, () => {
        console.log(`Server running on port :${config.port}`);
      });
    }
  }

}

if (!module.parent) {
  new Server().app;
}
