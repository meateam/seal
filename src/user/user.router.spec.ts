import { expect } from 'chai';
import { createJsonUsers } from '../helpers/functions';
import { Server } from '../server';
import { userModel } from './user.model';
import { UserController } from './user.controller';
import { IUser } from './user.interface';
import { UserValidator as uv } from './user.validator';
import { isBuffer } from 'util';

const chai = require('chai');
chai.use(require('chai-http'));

const server = new Server(true).app;

const newName: string = 'Mr. Nobody';
const TOTAL_USERS: number = 4;
const testUsers: IUser[] = createJsonUsers(TOTAL_USERS);
let tempUser: IUser;

describe('User Router', () => {

  beforeEach('Write Me', async () => {
    await userModel.remove({}, (err) => { });
    await Promise.all(testUsers.map((user: IUser) => UserController.add(user)));
  });

  describe(`GET user`, () => {
    it(`should get user by its id`, (done: any) => {
      chai.request(server)
        .get(`/api/user/${testUsers[0]._id}`)
        .end((err: Error, res) => {
          expect(uv.compareUsers(testUsers[0], res.body)).to.be.true;
          done();
        });
    });
  });

  describe(`POST new user`, () => {
    it(`should add ${testUsers.length} users`, (done) => {
      for (let i = 0; i < testUsers.length; i++) {
        chai.request(server)
          .post('/api/user')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(testUsers[i])
          .end((err: Error, res) => {
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
            .end((err2: Error, res2) => {
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
        .end((err: Error, res) => {
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
