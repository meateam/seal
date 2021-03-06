/**
 *
 */

type Config = {
  conf_type: string;
  server: string;
  port: number;
  db: {
    host: string,
    port: string,
    name: string,
  },
  storage : {
    bucketName: string,
    url: string,
  },
};

const testing: Config = {
  conf_type: 'testing',
  server: 'http://localhost',
  port: 9000,
  db: {
    host: 'localhost',
    port: '27017',
    name: 'testingDB',
  },
  storage : {
    bucketName: 'testbucket',
    url: 'http://23.102.42.153:9000/',
  },
};

const dev: Config = {
  conf_type: 'dev',
  server: 'http://40.115.124.214',
  port: 9000,
  db: {
    host: 'localhost',
    port: '27017',
    name: 'devDB',
  },
  storage : {
    bucketName: 'devbucket',
    url: 'http://minio.blue.com:9000/',
  },
};

// Change to Production Environment
const prod: Config = {
  conf_type: 'prod',
  server: 'https://seal.blue.com',
  port: 9000,
  db: {
    host: 'localhost',
    port: '27017',
    name: 'prodDB',
  },
  storage : {
    bucketName: 'sealbucket',
    url: 'http://minio.blue.com:9000/',
  },
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
