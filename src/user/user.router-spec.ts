import * as chaiHttp from 'chai-http';
import { IUser } from './user.interface';
import { createJsonUsers } from '../helpers/functions';
import { server } from '../server';
import { expect } from 'chai';
import { userModel } from './user.model';

const chai = require('chai');
chai.use(chaiHttp);

const config = {
  host: 'http://localhost:3000',
};

const newName: string = 'Mr. Nobody';
const TOTAL_USERS: number = 10;
const testUsers: IUser[] = createJsonUsers(TOTAL_USERS);
let tempUser: IUser;
let listener;

describe('Router', () => {
  before(() => {
    listener = server.listener;
    userModel.remove({}, (err) => { });
  });

  after((done) => {
    listener.close();
    done();
  });

  describe(`POST new user`, () => {
    it(`should add ${testUsers.length} users`, (done) => {
      for (let i = 0; i < testUsers.length; i++) {
        chai.request(config.host)
          .post('/api/user')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(testUsers[i])
          .end((err, res) => {
            if (i === testUsers.length - 1) {
              chai.request(config.host)
                .get('/api/user')
                .end((err, res) => {
                  expect(res.body).to.have.length(testUsers.length);
                });
              done();
            }
          });
      }
    });
  });

  describe(`DELETE one`, () => {
    it('should delete a single user', (done) => {
      tempUser = testUsers[0];
      chai.request(config.host)
        .delete('/api/user/' + testUsers[0]._id)
        .end((err, res) => {
          testUsers.shift();
          chai.request(config.host)
            .get('/api/user')
            .end((err, res) => {
              expect(res.body).to.have.length(testUsers.length);
              for (let i = 0; i < testUsers.length; i++) {
                expect(res.body[i]._id).to.not.be.equal(tempUser._id);
              }
              done();
            });
        });
    });
  });

  describe(`PUT`, () => {
    it(`should change a single user name`, (done) => {
      chai.request(config.host)
        .put(`/api/user/${testUsers[0]._id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ _id: testUsers[0]._id, name: newName })
        .end((err, res) => {
          chai.request(config.host)
            .get(`/api/user/${testUsers[0]._id}`)
            .end((err, res) => {
              expect(res.body.name).to.be.eql(newName);
              done();
            });
        });
    });
  });
});
