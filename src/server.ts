import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as path from 'path';

import { config } from './config';
import { initRouting } from './helpers/routing';

class Server {
  public app: express.Application;

  // public static bootstrap(): Server {
  //   return new Server();
  // }

  constructor() {
    this.createApplication();
    console.log('NODE_ENV: ');
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'testing ') {
      this.connectDB();
      this.log();
    }
    this.configApplication();
    this.initializeRoutes();
    this.listen();
  }

  // public listen(): void {
  //   this.listener = this.app.listen(config.port, () => {
  //     const port : any = this.listener.address().port;
  //     console.log(`Server running on port :${port}`);
  //   });
  // }

  private createApplication(): void {
    this.app = express();
  }

  private initializeRoutes() {
    // initRouting(this.app);
    initRouting(this.app);
  }

  private configApplication(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
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
      this.app.listen(config.port, () => {
        console.log(`Server running on port :${config.port}`);
      });
    }
  }

}

export default new Server().app;
// export let server = Server.bootstrap();
