/**
 *
 */

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
  port: 9000,
  db: {
    host: 'localhost',
    port: '27017',
    name: 'testingDB',
  },
  storage : './uploadsTEST',
};

const dev: Config = {
  conf_type: 'dev',
  port: 9000,
  db: {
    host: 'localhost',
    port: '27017',
    name: 'devDB',
  },
  storage : './uploads',
};

// Change to Production Environment
const prod: Config = {
  conf_type: 'prod',
  port: 9000,
  db: {
    host: 'localhost',
    port: '27017',
    name: 'prodDB',
  },
  storage : './uploads-prod',
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

export const config : Config = getConfig(process.env.NODE_ENV || dev.conf_type);
