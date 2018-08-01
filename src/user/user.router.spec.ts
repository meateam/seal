/**
 * Tests on the user router.
 */
import { expect } from 'chai';
import { createJsonUsers, createUsers } from '../helpers/functions';
import { Server } from '../server';
import { userModel } from './user.model';
import { UserController } from './user.controller';
import { IUser } from './user.interface';
import { UserValidator as uv } from './user.validator';

const chai = require('chai');
chai.use(require('chai-http'));

const server = new Server(true).app;

const newName: string = 'Mr. Nobody';
const TOTAL_USERS: number = 4;
const testUsers: IUser[] = createUsers(TOTAL_USERS);
const newUser: IUser = createUsers(1)[0];
let tempUser: IUser;
const controller = new UserController();

describe('User Router', () => {

  beforeEach(async () => {
    await userModel.remove({}, (err: Error) => { });
    await Promise.all(testUsers.map((user: IUser) => controller.add(user)));
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
    it(`should add a user`, (done) => {
      console.log('POSTING!!!!');
      console.log(newUser.toJSON());
      chai.request(server)
        .post('/api/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser.toJSON())
        .end((err: Error, res) => {
          chai.request(server)
            .get('/api/user')
            .end((err2: Error, res2) => {
              expect(res2.body).to.have.length(testUsers.length + 1);
            });
          done();
        });
    });
  });

  describe(`PUT`, () => {
    it(`should change a single user name`, (done) => {
      chai.request(server)
        .put(`/api/user/${testUsers[0]._id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser)
        .end((err, res) => {
          chai.request(server)
            .get(`/api/user/${testUsers[0]._id}`)
            .end((err2: Error, res2) => {
              expect(res2.body.name).to.be.eql(newName);
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
