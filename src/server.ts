import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as path from 'path';
import { config } from './config';
import { initRouter } from './router';
import * as fs from 'fs';
import * as https from 'https';
import * as session from 'express-session';

const privateKey = fs.readFileSync('../wildcard.key', 'utf8');
const certificate = fs.readFileSync('../wildcard.pem', 'utf8');
// const privateKey = process.argv[2];    // first argument (after node and filepath) is wildcard.key
// const certificate = process.argv[3];   // second argument is wildcard.pem

const credentials = { key: privateKey, cert: certificate };

// for (let i = 0; i < 4; i++) {
//   console.log(process.argv[i]);
// }
// console.log(process.argv);

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
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use(session({
      secret: 'seal',
      resave: true,
      saveUninitialized: false
    }));
  }

  private log() {
    this.app.use(morgan('tiny'));  // 'combined' for more info
  }

  private async connectDB() {
    // Connect mongoose to our database
    await mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('DB IS CONNECTED!');
    });
  }

  private listen() {
    const httpsServer = https.createServer(credentials, this.app);
    // Insures you don't run the server twice
    if (!module.parent) {
      this.listener = httpsServer.listen(config.port, () => {
        console.log(`Server running on port :${config.port}`);
      });
    }
  }

}

if (!module.parent) {
  new Server().app;
}
