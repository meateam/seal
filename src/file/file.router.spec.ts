import * as chaiHttp from 'chai-http';
import * as fs from 'node-fs-extra';
import * as util from 'util';
import { fileModel } from './file.model';
import { IFile } from './file.interface';
import * as mongoose from 'mongoose';
import { expect } from 'chai';
import { Server } from '../server';
import { config } from '../config';
import { createFiles } from '../helpers/functions';
import { fileController } from './file.controller';
import * as express from 'express';

const chai = require('chai');
chai.use(chaiHttp);
const server = new Server(true).app;

const NUM_FILES = 3;
const newName = 'changed.txt';
let fileID;
let testFiles: IFile[];

describe(`File Router`, () => {

  before(async () => {
    // Create files in Folder
    testFiles = createFiles(NUM_FILES);

    // Remove files from DB
    const removeCollectionPromises = [];
    for (const i in mongoose.connection.collections) {
      removeCollectionPromises.push(mongoose.connection.collections[i].remove({}));
    }
    await Promise.all(removeCollectionPromises);
    // await fileModel.remove({}, (err: Error) => {});
  });

  beforeEach(async () => {
    // Remove files from DB
    // const removeCollectionPromises = [];
    // for (const i in mongoose.connection.collections) {
    //   removeCollectionPromises.push(mongoose.connection.collections[i].remove({}));
    // }
    // await Promise.all(removeCollectionPromises);
    // await fileModel.remove({}, (err: Error) => {});

    // Create files in DB
    // const files = await fileController.create(testFiles);
    // fileID = files[0]._id;
  });

  describe(`POST new file`, () => {
    it(`Should add 3 new files`, (done) => {
      chai.request(server)
        .post('/api/file/upload')
        .set('content-type', 'application/x-www-form-urlencoded')
        .attach('file', `${config.storage}/test-0.txt`)
        .attach('file', `${config.storage}/test-1.txt`)
        .attach('file', `${config.storage}/test-2.txt`)
        .end((err, res: express.Response) => {
          expect(res.status).to.equal(200); // 'success' status
          done();
        });
    });
  });

  describe('GET all Files', () => {
    it(`Should return all files`, (done) => {
      chai.request(server)
        .get('/api/file')
        .end((err, res) => {
          expect(res.body.return).to.have.length(NUM_FILES);
          done();
        });
    });
  });

  describe('GET Specific Files', () => {
    it(`Should return file which name is test2`, (done) => {
      chai.request(server)
        .get('/api/file/test-2.txt?fieldType=fileName')
        .end((err, res) => {
          expect(res.body.return).to.have.length(1);
          fileID = res.body.return[0]._id;
          done();
        });
    });
    it(`Should return file with specific ID (test2.txt)`, (done) => {
      chai.request(server)
        .get(`/api/file/${fileID}`)
        .end((err, res) => {
          expect(res.body.return.fileName).equal('test-2.txt');
          done();
        });
    });
    it(`Should return all files created before NOW`, (done) => {
      const toDate = new Date(Date.now());
      chai.request(server)
        .get(`/api/file/Date?toDate=` + toDate.toISOString())
        .end((err, res) => {
          expect(res.body.return).to.have.length(NUM_FILES);
          done();
        });
    });
  });

  describe('PUT file', () => {
    it('should change a single file name', (done) => {
      chai.request(server)
        .put(`/api/file/${fileID}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ id: fileID, fileName: newName })
        .end((err, res) => {
          chai.request(server)
            .get(`/api/file/${fileID}`)
            .end((err2, res2) => {
              expect(res2.body.return.fileName).equal(newName);
              done();
            });
        });
    });
  });

  describe('Delete one', () => {
    it('should delete a single file', (done) => {
      chai.request(server)
        .delete(`/api/file/${fileID}`)
        .end((err, res) => {
          chai.request(server)
            .get('/api/file')
            .end((err2, res2) => {
              expect(res2.body.return).to.have.length(NUM_FILES - 1);
              for (let i: number = 0; i < NUM_FILES - 1; i++) {
                expect(res2.body.return[i]._id).to.not.be.equal(fileID);
              }
              done();
            });
        });
    });
  });

  after((done: any) => {
    fs.remove(`${config.storage}`);
    done();
  });
});