import * as chai from 'chai';
import * as mongoose from 'mongoose';
import * as chaiAsPromised from 'chai-as-promised';
import * as fs from 'fs';
import * as util from 'util';
import { config } from '../config';
import { ERRORS } from '../helpers/enums';
import { createFiles } from '../helpers/functions';
import { fileController } from './file.controller';
import { IFile } from './file.interface';
import { fileModel } from './file.model';

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
const expect: Chai.ExpectStatic = chai.expect;
chai.use(chaiAsPromised);

const TOTAL_FILES: number = 3;
const newName: string = 'changeName';
let testFiles: IFile[];

describe(`Test Files with ${TOTAL_FILES} files`, () => {

  before(() => {
    testFiles = createFiles(TOTAL_FILES);
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
  });

  beforeEach(async () => {

    // Remove all files from uploadsTEST folder
    const files = await readdir(config.storage);
    const unlinkPromises = files.map(filename => unlink(`${config.storage}/${filename}`));
    await Promise.all(unlinkPromises);

    // Remove all files from DB
    fileModel.remove({}, (err: Error) => { });

    // Create files
    await fileController.create(testFiles);

    // TODO: Add all files to uploadsTEST folder

  });

  describe('#getById', () => {
    it('Should return a file by its id', async () => {
      const file: IFile = await fileController.findById(testFiles[0]._id);
      expect(testFiles[0].equals(file)).to.be.true;
    });
  });

  describe('#getAll', () => {
    it(`Should return a collection with ${TOTAL_FILES} files`, async () => {
      const filesReturned: IFile[] = await fileController.getFiles();
      expect(filesReturned).to.not.be.empty;
      expect(filesReturned).to.have.lengthOf(testFiles.length);
    });
  });

  describe('#add', () => {
    it('Should add a new file to the collection', async () => {
      const file: IFile[] = createFiles(1)[0];
      await fileController.create(file);
      const filesReturned: IFile[] = await fileController.getFiles();
      expect(filesReturned).to.not.be.empty;
      expect(filesReturned).to.have.lengthOf(testFiles.length + 1);
    });
    it('Should throw exception when trying to add new file with existed id', async () => {
      await expect(fileController.create(testFiles))
        .to.eventually.be.rejectedWith('File already exists');
    });
  });

  describe('#deleteById', () => {
    it('Should delete a single file', async () => {
      await fileController.delete(testFiles[0]._id);
      await expect(fileController.findById(testFiles[0]._id))
        .to.eventually.be.rejectedWith(ERRORS.NOT_EXIST);
      const filesReturned: IFile[] = await fileController.getFiles();
      expect(filesReturned).to.have.lengthOf(TOTAL_FILES - 1);
    });
  });

  describe('#update', () => {
    it('Should update half of the names', async () => {
      for (let i: number = 0; i < Math.floor(testFiles.length / 2); i++) {
        await fileController.update(testFiles[i]._id, { _id: testFiles[i]._id, fileName: newName });
      }
      const updatedFile: IFile = await fileController.findById(testFiles[0]._id);
      expect(updatedFile.fileName).to.be.equal(newName);
    });
    it('Should throw exception when trying to update a non-existent file', async () => {
      await expect(fileController.update('non_existent_id', { fileName: 'ErrorName' }))
        .to.eventually.be.rejectedWith('File doesnt exist');
    });
  });

  describe('#getByName', () => {
    it('Should get all files with the same name', async () => {
      for (let i: number = 0; i < Math.floor(testFiles.length / 2); i++) {
        await fileController.update(testFiles[i]._id, { _id: testFiles[i]._id, fileName: newName });
      }
      const files: IFile[] = await fileController.getFiles(newName);
      files.sort(sortFilesBy_id);
      expect(files.length).to.be.equal(Math.floor(testFiles.length / 2));
      for (let i: number = 0; i < files.length; i++) {
        expect(files[i].fileName).to.be.equal(newName);
        expect(files[i]._id).to.be.equal(testFiles[i]._id);
      }
    });
  });

  after((done: any) => {
    mongoose.disconnect();
    done();
  });

});

function sortFilesBy_id(file1: IFile, file2: IFile): number {
  if (file1._id > file2._id) {
    return 1;
  }
  if (file1._id < file2._id) {
    return -1;
  }

  return 0;
}
