/**
 * Tests on the user router.
 */
import { expect } from 'chai';
import * as chaiHttp from 'chai-http';
import { Request, Response, Router } from 'express';
import { createJsonUsers } from '../helpers/functions';
import { server } from '../server';
import { UserController } from './user.controller';
import { IUser } from './user.interface';
import { userModel } from './user.model';
import { UserValidator as uv } from './user.validator';

let chai: any;

const host: string = 'http://localhost:3000';

const newName: string = 'Mr. Nobody';
const TOTAL_USERS: number = 4;
let testUsers: IUser[];
let tempUser: IUser;
let listener: any;

describe('Router', () => {
  before(() => {
    chai = require('chai');
    chai.use(chaiHttp);
    testUsers = createJsonUsers(TOTAL_USERS);
    listener = server.listener;
  });

  beforeEach(async () => {
    userModel.remove({}, (err: Error) => { });
    await Promise.all(testUsers.map((user: IUser) => UserController.add(user)));
  });

  after((done: any) => {
    listener.close();
    done();
  });

  describe('GET user', () => {
    it('should get user by its id', (done: any) => {
      chai.request(host)
        .get(`/api/user/${testUsers[0]._id}`)
        .end((err: Error, res: Response) => {
          expect(uv.compareUsers(testUsers[0], res.body)).to.be.true;
          done();
        });
    });
  });

  describe('POST new user', () => {
    it('should add 4 users', (done: any) => {
      for (let i: number = 0; i < testUsers.length; i++) {
        chai.request(host)
          .post('/api/user')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(testUsers[i])
          .end((err: Error, res: Response) => {
            if (i === testUsers.length - 1) {
              chai.request(host)
                .get('/api/user')
                .end((err2: Error, res2: Response) => {
                  expect(res2.body).to.have.length(testUsers.length);
                });
              done();
            }
          });
      }
    });
  });

  describe('PUT', () => {
    it('should change a single user name', (done: any) => {
      chai.request(host)
        .put(`/api/user/${testUsers[0]._id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ _id: testUsers[0]._id, name: newName })
        .end((err: Error, res: Response) => {
          chai.request(host)
            .get(`/api/user/${testUsers[0]._id}`)
            .end((err2: Error, res2: Response) => {
              expect(res.body.name).to.be.eql(newName);
              done();
            });
        });
    });
  });

  describe('DELETE one', () => {
    it('should delete a single user', (done: any) => {
      tempUser = testUsers[0];
      chai.request(host)
        .delete('/api/user/' + testUsers[0]._id)
        .end((err: Error, res: Response) => {
          testUsers.shift();
          chai.request(host)
            .get('/api/user')
            .end((err2: Error, res2: Response) => {
              expect(res2.body).to.have.length(testUsers.length);
              for (let i: number = 0; i < testUsers.length; i++) {
                expect(res2.body[i]._id).to.not.be.equal(tempUser._id);
              }
              done();
            });
        });
    });
  });
});
