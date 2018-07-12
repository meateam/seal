import { IFolder } from './folder.interface';
import * as chai from 'chai';
import { folderModel } from './folder.model';
import { createFolders } from '../helpers/functions';

const expect = chai.expect;
const TOTAL_FOLDERS: number = 4;
const testFolders: IFolder[] = createFolders(TOTAL_FOLDERS);

describe('Test Folder', () => {

  beforeEach('Folder BeforeEach', async () => {
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
  describe('#getOwner', () => {
    it('should return the owner of the folder');
  });
  describe('#getFolders', () => {
    it('should return all of the folders inside a given folder');
  });
  describe('#getFiles', () => {
    it('should return all of the files in the folder');
  });
  describe('#getRFolders', () => {
    it('should return all of the folders inside a given folder recursively');
  });
  describe('#getRFiles', () => {
    it('should return all of the inside a given folder recursively');
  });
});
