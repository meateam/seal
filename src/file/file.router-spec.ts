import * as chaiHttp from 'chai-http';
import * as fs from 'fs';
import * as util from 'util';
import { fileModel } from './file.model';
import { IFile } from './file.interface';
import * as mongoose from 'mongoose';
import { expect } from 'chai';
import { server } from '../server';
import { config } from '../config';

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
const chai = require('chai');
chai.use(chaiHttp);

const NUM_FILES = 3;
const newName = 'changed.txt';
// "test": "set NODE_ENV=testing&& mocha -r ts-node/register src/**/spec.helper.ts src/**/*.spec.ts src/**/**/*.spec.ts",
let fileID;

before(async () => {

  // Remove all files from uploadsTEST folder
  const files = await readdir(config.storage);
  const unlinkPromises = files.map(filename => unlink(`${config.storage}/${filename}`));
  await Promise.all(unlinkPromises);

  // Remove all files from DB
  const removeCollectionPromises = [];

  for (const i in mongoose.connection.collections) {
    removeCollectionPromises.push(mongoose.connection.collections[i].remove({}));
  }

  await Promise.all(removeCollectionPromises);
});

describe('Test Files CRUD', () => {
    // TODO : Add test multiple files
  describe(`POST new file`, () => {
    it(`Should add 3 new files`, (done) => {
      chai.request(server.app)
        .post('/api/file/upload')
        .set('content-type', 'application/x-www-form-urlencoded')
        .attach('file', 'test/test-0.txt')
        .attach('file', 'test/test-1.txt')
        .attach('file', 'test/test-2.txt')
        .end((err, res) => {
          expect(res.status).to.equal(200); // 'success' status
          done();
        });
    });
  });

  describe('Get all Files', () => {
    it(`Should return all files`, (done) => {
      chai.request(server.app)
        .get('/api/file')
        .end((err, res) => {
          expect(res.body.return).to.have.length(NUM_FILES);
          done();
        });
    });
  });

  describe('Get Specific Files', () => {
    it(`Should return file which name is test2`, (done) => {
      chai.request(server.app)
        .get('/api/file/test-2.txt?fieldType=fileName')
        .end((err, res) => {
          expect(res.body.return).to.have.length(1);
          fileID = res.body.return[0]._id;
          console.log(fileID);
          done();
        });
    });
    it(`Should return file with specific ID (test2.txt)`, (done) => {
      chai.request(server.app)
        .get(`/api/file/${fileID}`)
        .end((err, res) => {
          expect(res.body.return.fileName).equal('test-2.txt');
          done();
        });
    });
    it(`Should return all files created before NOW`, (done) => {
      const toDate = new Date(Date.now());
      chai.request(server.app)
        .get(`/api/file/Date?toDate=` + toDate.toISOString())
        .end((err, res) => {
          expect(res.body.return).to.have.length(NUM_FILES);
          done();
        });
    });
  });

  describe('Update file', () => {
    it('should change a single file name', (done) => {
      chai.request(server.app)
        .put(`/api/file/${fileID}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ _id: fileID, fileName: newName })
        .end((err, res) => {
          chai.request(server.app)
            .get(`/api/file/${fileID}`)
            .end((err2, res2) => {
              expect(res2.body.return.fileName).equal(newName);
              done();
            });
        });
    });
  });

  describe('Delete file by ID', () => {
    it('should delete a single file', (done) => {
      chai.request(server.app)
        .delete(`/api/file/${fileID}`)
        .end((err, res) => {
          chai.request(server.app)
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
});
