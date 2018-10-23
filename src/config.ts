/**
 *  configuration file for running the application.
 */
import * as dotenv from 'dotenv';
dotenv.config();

type Config = {
  conf_type: string;
  server: string;
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
  server: process.env.TESTING_SERVER,
  port: 9000,
  db: {
    host: 'localhost',
    port: '27017',
    name: 'testingDB',
  },
  storage : 'testbucket',
};

const dev: Config = {
  conf_type: 'dev',
  server: process.env.DEV_SERVER,
  port: 9000,
  db: {
    host: 'localhost',
    port: '27017',
    name: 'devDB',
  },
  storage : 'devbucket',
};

// Change to Production Environment
const prod: Config = {
  conf_type: 'prod',
  server: process.env.PROD_SERVER,
  port: 9000,
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
    case prod.conf_type:
      return prod;
    case testing.conf_type:
      return testing;
    default:
      return dev;
  }
}

console.log('**********************************');
console.log(process.env.PROD_SERVER + ' ' + process.env.DEV_SERVER + ' ' + process.env.TESTING_SERVER + ' ' + process.env.APP_SERVER);
console.log('**********************************');
export const config : Config = getConfig(process.env.NODE_ENV || dev.conf_type);
