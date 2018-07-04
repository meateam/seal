import { IFolder } from './folder.interface';
import * as chai from 'chai';
import { config } from '../config';
import * as mongoose from 'mongoose';
import { createFolders } from '../helpers/functions';
import { folderModel } from './folder.model';

const expect = chai.expect;
const TOTAL_FOLDERS: number = 4;
const testFolders: IFolder[] = createFolders(TOTAL_FOLDERS);

describe('Test Folder', () => {
  before(() => {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
  });
  beforeEach(async () => {
    folderModel.remove({}, (err) => { });
    folderModel.collection.insert(testFolders, (err, docs) => {
      if (err) {
        console.error(err);
        // throw new serverError
      } else {
        console.log('Multiple documents inserted to Collection');
      }
    });
  });
});
