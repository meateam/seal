/**
 *  configuration file for running the application.
 */
import * as dotenv from 'dotenv';
dotenv.config();

type Config = {
  conf_type: string;
  port: number;
  db: {
    host: string,
    port: string,
    name: string,
  },
  storage : string,
};

const testing: Config = {
  conf_type: 'testing',
  port: Number(process.env.PORT),
  db: {
    host: 'localhost',
    port: '27017',
    name: 'testingDB',
  },
  storage : 'testbucket',
};

const dev: Config = {
  conf_type: 'dev',
  port: Number(process.env.PORT),
  db: {
    host: 'localhost',
    port: '27017',
    name: 'devDB',
  },
  storage : 'devbucket',
};

// TODO: change storage!
const devSh: Config = {
  conf_type: 'dev-sh',
  port: Number(process.env.PORT),
  db: {
    host: 'localhost',
    port: '27017',
    name: 'devDB',
  },
  storage : 'devbucket-sh',
};

const devTal: Config = {
  conf_type: 'dev-tal',
  port: Number(process.env.PORT),
  db: {
    host: 'localhost',
    port: '27017',
    name: 'devDB',
  },
  storage : 'devbucket-tal',
};
// Change to Production Environment
const prod: Config = {
  conf_type: 'prod',
  port: Number(process.env.PORT),
  db: {
    host: 'localhost',
    port: '27017',
    name: 'prodDB',
  },
  storage : 'sealbucket',
};

function getConfig(confType: string) : Config {
  switch (confType) {
    case dev.conf_type:
      return dev;
    case devSh.conf_type:
      return devSh;
    case devTal.conf_type:
      return devTal;
    case prod.conf_type:
      return prod;
    case testing.conf_type:
      return testing;
    default:
      console.log('default');
      return dev;
  }
}

export const config : Config = getConfig(process.env.NODE_ENV || dev.conf_type);
