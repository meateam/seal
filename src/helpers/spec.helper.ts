import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as chai from 'chai';
import { config } from '../config';

const expect: Chai.ExpectStatic = chai.expect;
dotenv.config({ path: '.env' });

(<any>mongoose).Promise = Promise;

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

const mochaAsync = (func: Function) => {
  return async (done: Function) => {
    try {
      await func();
      done();
    } catch (err) {
      done(err);
    }
  };
};

export const expectError = async (func: Function, params: any[]) => {
  let isError = false;
  let currError;
  try {
    await func(...params);
  } catch (err) {
    currError = err;
    err.should.exist;
    isError = true;
  } finally {
    isError.should.be.true;
    return currError;
  }
};

before(async () => {
  // await mongoose.connect(process.env.MONGODB_TEST_URI);
  await mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
});

after((done) => {
  mongoose.connection.close();
  done();
});
