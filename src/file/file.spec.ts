import * as chai from 'chai';
import * as mongoose from 'mongoose';
import * as chaiAsPromised from 'chai-as-promised';
import * as fs from 'node-fs-extra';
import { config } from '../config';
import { createFiles } from '../helpers/functions';
import { fileController } from './file.controller';
import { IFile } from './file.interface';
import { fileModel } from './file.model';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(chaiAsPromised);

const TOTAL_FILES: number = 3;
const newName: string = 'changeName.txt';
const folderName = './uploadsTEST';
let testFiles: IFile[];

describe(`File Logic`, () => {

  before(async () => {
    // Remove uploadsTEST folder
    await fs.remove(`${folderName}`);

    // Remove files from DB
    const removeCollectionPromises = [];
    for (const i in mongoose.connection.collections) {
      removeCollectionPromises.push(mongoose.connection.collections[i].remove({}));
    }
    await Promise.all(removeCollectionPromises);

    // Create files in Folder and DB
    testFiles = createFiles(TOTAL_FILES);
    await fileController.create(testFiles);
  });

  describe('#getById', () => {
    it('Should return a file by its id', async () => {
      const file: IFile = await fileController.findById(testFiles[0]._id);
      expect(testFiles[0].equals(file)).to.be.true;
    });
  });

  describe('#getByDate', () => {
    it('Should get all files that were created before now', async () => {
      const toDate = new Date(Date.now());
      const ret = await fileController.findByDate(null, toDate.toISOString());
      expect(ret.length).to.be.equal(TOTAL_FILES);
    });
    it('Should return that were created from now', async () => {
      const fromDate = new Date(Date.now());
      const ret = await fileController.findByDate(fromDate.toISOString());
      expect(ret.length).to.be.equal(0);
    });
    it('Should get all files created between yesterday and today', async () => {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 1);
      const toDate = new Date(Date.now());
      const ret = await fileController.findByDate(fromDate.toISOString(), toDate.toISOString());
      expect(ret.length).to.be.equal(TOTAL_FILES);
    });
  });

  describe('#getAll', () => {
    it(`Should return a collection with ${TOTAL_FILES} files`, async () => {
      const filesReturned: IFile[] = await fileController.getFiles();
      expect(filesReturned).to.not.be.empty;
      expect(filesReturned).to.have.lengthOf(testFiles.length);
    });
  });

  describe.skip('#update', () => {
    it('Should update a specific files name', async () => {
      await fileController.update(testFiles[0]._id, { _id: testFiles[0]._id, fileName: newName, path: newName });
      const updatedFile: IFile = await fileController.findById(testFiles[0]._id);
      expect(updatedFile.fileName).to.be.equal(newName);
    });
  });

  describe.skip('#getByName', () => {
    it('Should get all files with the same name', async () => {
      const files: IFile[] = await fileController.getFiles({ fileName: newName });
      expect(files.length).to.be.equal(1);
      expect(files[0].fileName).to.be.equal(newName);
    });
  });

  describe('#add', () => {
    it('Should add a new file to the collection', async () => {
      const file: IFile[] = [new fileModel({
        fileName: 'newFile.txt',
        fileSize: 1,
        path: 'newFile.txt',
        fileType: 'txt',
        createdAt: Date.now(),
        Owner: 'Owner',
        Parent: 'Parent',
      })];
      await fileController.create(file);
      const filesReturned: IFile[] = await fileController.getFiles();
      expect(filesReturned).to.have.lengthOf(testFiles.length + 1);
    });
  });

  describe.skip('#deleteById', () => {
    it('Should delete a single file', async () => {
      const total: IFile[] = await fileController.getFiles();
      await fileController.delete(testFiles[0]._id);
      await expect(fileController.findById(testFiles[0]._id)).to.be.eventually.not.exist;
      const filesReturned: IFile[] = await fileController.getFiles();
      expect(filesReturned).to.have.lengthOf(total.length - 1);
    });
  });

  after((done: any) => {
    fs.remove(`${folderName}`);
    done();
  });
});
