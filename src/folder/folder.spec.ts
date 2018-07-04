import { IFolder } from './folder.interface';
import * as chai from 'chai';
import { config } from '../config';
// import { FolderController } from './folder.controller';
import { folderModel } from './folder.model';
import { createFolders } from '../helpers/functions';
import * as mongoose from 'mongoose';

const expect = chai.expect;
const TOTAL_FOLDERS: number = 4;
const testFolders: IFolder[] = createFolders(TOTAL_FOLDERS);

describe('Test Folder', () => {

  before(() => {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
  });

  beforeEach(async () => {
    await folderModel.remove({}, (err) => { });
    await folderModel.collection.insert(testFolders, (err, docs) => {
      if (err) {
        console.error(err);
        // throw new serverError
      } else {
        console.log('Multiple documents inserted to Collection');
      }
    });
  });

  describe('#getById', () => {
    it('should return the folder by its id', () => {
      // const folder: IFolder = FolderController.getById(testFolders[0].id);
    });
  });

  after((done: any) => {
    mongoose.disconnect();
    done();
  });
});
