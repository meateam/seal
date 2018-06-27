import * as chai from 'chai';
import * as mongoose from 'mongoose';
import * as chaiAsPromised from 'chai-as-promised';
// import * as fs from 'fs';
import * as fs from 'node-fs-extra';
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

  before(async () => {
    testFiles = createFiles(TOTAL_FILES);
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);

    // Remove all files from uploadsTEST folder
    const files = await readdir(config.storage);
    const unlinkPromises = files.map(filename => unlink(`${config.storage}/${filename}`));
    await Promise.all(unlinkPromises);

    const removeCollectionPromises = [];
    for (const i in mongoose.connection.collections) {
      removeCollectionPromises.push(mongoose.connection.collections[i].remove({}));
    }
    await Promise.all(removeCollectionPromises);

    // Create files
    const ret = await fileController.create(testFiles);

    // TODO: Add all files to uploadsTEST folder
    fs.copy('./test', './uploadsTEST', (err) => {
      if (err) {
        console.error(err);
      } else {
        // console.log('Files added to Folder');
      }
    });
  });

  // beforeEach(async () => {

  //   // Remove all files from uploadsTEST folder
  //   const files = await readdir(config.storage);
  //   const unlinkPromises = files.map(filename => unlink(`${config.storage}/${filename}`));
  //   await Promise.all(unlinkPromises);

  //   // Remove all files from DB
  //   fileModel.remove({}, (err: Error) => { });

  //   // Create files
  //   const ret = await fileController.create(testFiles);
  //   console.log('Saved files:');
  //   console.log(ret);

  //   // TODO: Add all files to uploadsTEST folder
  //   fs.copy('./test', './uploadsTEST', (err) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log('Files added to Folder');
  //     }
  //   });
  // });

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

  describe('#update', () => {
    it('Should update all of the names', async () => {
      for (let i: number = 0; i < testFiles.length; i++) {
        await fileController.update(testFiles[i]._id, { _id: testFiles[i]._id, fileName: newName });
      }
      const updatedFile: IFile = await fileController.findById(testFiles[0]._id);
      expect(updatedFile.fileName).to.be.equal(newName);
    });
    // it('Should throw exception when trying to update a non-existent file', async () => {
    //   await expect(fileController.update('non_existent_id', { fileName: 'ErrorName' }))
    //     .to.eventually.be.rejectedWith('File doesnt exist');
    // });
  });

  describe('#getByName', () => {
    it('Should get all files with the same name', async () => {
      const files: IFile[] = await fileController.getFiles(newName);
      expect(files.length).to.be.equal(testFiles.length);
      for (let i: number = 0; i < files.length; i++) {
        expect(files[i].fileName).to.be.equal(newName);
      }
    });
  });

  describe('#add', () => {
    it('Should add a new file to the collection', async () => {
      const file: IFile[] = [new fileModel({
        fileName: 'newFile.txt',
        fileSize: 1,
        path: 'uploadsTEST\\' + 'newFile.txt',
        fileType: 'txt',
        createdAt: Date.now(),
        Owner: 'Owner',
        Parent: 'Parent',
      })];
      await fileController.create(file);
      const filesReturned: IFile[] = await fileController.getFiles();
      expect(filesReturned).to.not.be.empty;
      expect(filesReturned).to.have.lengthOf(testFiles.length + 1);
    });
  });

  describe('#deleteById', () => {
    it('Should delete a single file', async () => {
      await fileController.delete(testFiles[0]._id);
      await expect(fileController.findById(testFiles[0]._id)).to.be.eventually.not.exist;
      const filesReturned: IFile[] = await fileController.getFiles();
      expect(filesReturned).to.have.lengthOf(TOTAL_FILES);
    });
  });

  after((done: any) => {
    mongoose.disconnect();
    done();
  });

});
