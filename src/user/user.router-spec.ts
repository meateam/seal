import * as chaiHttp from 'chai-http';
import { IUser } from './user.interface';
import { createJsonUsers } from '../helper/functions';
import { server } from '../server';
import { expect } from 'chai';

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

describe('loading express', () => {
  before(() => {
    listener = server.listener;
  });

  after((done) => {
    listener.close();
    done();
  });

  it('Delete all users', (done) => {
    chai.request(config.host)
      .delete('/api/user')
      .end((err, res) => {
        done();
      });
  });

  it('Check all users deleted', (done) => {
    chai.request(config.host)
      .get('/api/user')
      .end((err, res) => {
        expect(res.body.returned).to.have.length(0);
        done();
      });
  });

  it(`Add ${testUsers.length} users`, (done) => {
    for (let i = 0; i < testUsers.length; i++) {
      chai.request(config.host)
        .post('/api/user')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(testUsers[i])
        .end((err, res) => {
        });
    }
    done();
  });

  it('Check all users added', (done) => {
    sleep(5000).then(() => {
      chai.request(config.host)
      .get('/api/user')
      .end((err, res) => {
        expect(res.body.returned).to.have.length(testUsers.length);
        done();
      });
    });
  });

  it('Delete a single user', (done) => {
    tempUser = testUsers[0];
    chai.request(config.host)
      .delete('/api/user/' + testUsers[0]._id)
      .end((err, res) => {
        testUsers.shift();
        done();
      });
  });

  it('Check user was deleted', (done) => {
    chai.request(config.host)
      .get('/api/user')
      .end((err, res) => {
        expect(res.body.returned).to.have.length(testUsers.length);
        for (let i = 0; i < testUsers.length; i++) {
          expect(res.body.returned[i]._id).to.not.be.equal(tempUser._id);
        }
        done();
      });
  });

  it(`Change username`, (done) => {
    chai.request(config.host)
      .put(`/api/user/${testUsers[0]._id}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ _id: testUsers[0]._id, name: newName })
      .end((err, res) => {
      });
    done();
  });

  it('Check user changed', (done) => {
    chai.request(config.host)
      .get(`/api/user/${testUsers[0]._id}`)
      .end((err, res) => {
        expect(res.body.returned.name).to.be.eql(newName);
        done();
      });
  });
});

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
