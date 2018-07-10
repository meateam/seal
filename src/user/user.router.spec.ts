/**
 * Tests on the user router.
 */
import { expect } from 'chai';
import * as chaiHttp from 'chai-http';
import { Request, Response, Router } from 'express';
import { createJsonUsers } from '../helpers/functions';
import server from '../server';
import { UserController } from './user.controller';
import { IUser } from './user.interface';
import { userModel } from './user.model';
import { UserValidator as uv } from './user.validator';

const chai = require('chai');
chai.use(require('chai-http'));

const newName: string = 'Mr. Nobody';
const TOTAL_USERS: number = 4;
const testUsers: IUser[] = createJsonUsers(TOTAL_USERS);
const newUser: IUser[] = createJsonUsers(1);
let tempUser: IUser;

describe('User Router', () => {

  beforeEach(async () => {
    await userModel.remove({}, (err: Error) => { });
    await Promise.all(testUsers.map((user: IUser) => UserController.add(user)));
  });

  describe(`GET user`, () => {
    it(`should get user by its id`, (done) => {
      chai.request(server)
        .get(`/api/user/${testUsers[0]._id}`)
        .end((err: Error, res) => {
          expect(uv.compareUsers(testUsers[0], res.body)).to.be.true;
          done();
        });
    });
  });

  describe.skip(`POST new user`, () => {
    it(`should add ${testUsers.length} users`, (done) => {
      for (let i = 0; i < testUsers.length; i++) {
        chai.request(server)
          .post('/api/user')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(newUser[0])
          .end((err: Error, res: Response) => {
            if (i === testUsers.length - 1) {
              chai.request(server)
                .get('/api/user')
                .end((err2: Error, res2) => {
                  expect(res2.body).to.have.length(testUsers.length);
                });
              done();
            }
          });
      }
    });
  });

  describe(`PUT`, () => {
    it(`should change a single user name`, (done) => {
      chai.request(server)
        .put(`/api/user/${testUsers[0]._id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ _id: testUsers[0]._id, name: newName })
        .end((err, res) => {
          chai.request(server)
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
      chai.request(server)
        .delete('/api/user/' + testUsers[0]._id)
        .end((err: Error, res: Response) => {
          testUsers.shift();
          chai.request(server)
            .get('/api/user')
            .end((err2: Error, res2) => {
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
