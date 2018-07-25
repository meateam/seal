import { IFolder } from './folder.interface';
import * as chai from 'chai';
import { FolderModel } from './folder.model';
import { createFolders } from '../helpers/functions';
import { FolderController } from './folder.controller';
import { FolderValidator } from './folder.validator';

const expect = chai.expect;
const TOTAL_FOLDERS: number = 4;
const testFolders: IFolder[] = createFolders(TOTAL_FOLDERS);
const controller : FolderController = new FolderController();
describe('Folder logic', () => {

  beforeEach('Folder BeforeEach', async () => {
    await FolderModel.remove({}, (err) => { });
    await FolderModel.collection.insert(testFolders, (err, docs) => {
      if (err) {
        console.log('ERROR in beforeEach in folder');
        console.error(err);
        // throw new serverError
      }
    });
  });
  describe('#getByName', () => {
    it('should return all folders with this name', async() => {
      const folders = await controller.getByName(testFolders[0].name);
      expect(folders).to.have.length(1);
      expect(FolderValidator.compareFolders(testFolders[0], folders[0])).to.be.true;
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
