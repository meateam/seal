import { environment, database } from './helper/ENUMS';

type Config = {
  port: number,
  db: {
    host: string,
    port: string,
    name: string,
  },
};

const testing: Config = {
  port: 3000,
  db: {
    host: 'localhost',
    port: '27017',
    name: database.TESTING,
  },
};

const dev: Config = {
  port: 3000,
  db: {
    host: 'localhost',
    port: '27017',
    name: database.DEV,
  },
};

// Change to Production Enviorment
const prod: Config = {
  port: 3000,
  db: {
    host: 'localhost',
    port: '27017',
    name: database.PROD,
  },
};

function getConfig(type: string) {
  switch (type) {
    case environment.DEV:
      return dev;
    case environment.PROD:
      return prod;
    case environment.TESTING:
      return testing;
    default:
      return dev;
  }
}

export const config = getConfig(process.env.NODE_ENV || environment.DEV);
