import * as chaiHttp from 'chai-http';
import { IUser } from './user.interface';
import { userModel } from './user.model';
import { server } from '../server';
const chai = require('chai');
import { expect } from 'chai';

let listener;
chai.use(chaiHttp);
const config = {
  host: 'http://localhost:3000',
};

const testUsers = [];
let numberOfUsers: number = 5;

for (let i = 0; i < numberOfUsers; i++) {
  const user = {
    id: 'ID' + i,
    uniqueID: 'uID' + i,
    creationDate: new Date(),
    heirarchy: 'Aman/Sapir/MadorHaim/' + i,
    name: 'User' + i,
    rootFolder: '/Path/To/Root/Folder' + i,
  };
  testUsers.push(user);
}

describe('loading express', () => {
  before(() => {
    listener = server.listener;
    // requester = chai.request(app).keepOpen();
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

  it(`Add ${numberOfUsers} users`, (done) => {
    for (let i = 0; i < numberOfUsers; i++) {
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
    chai.request(config.host)
      .get('/api/user')
      .end((err, res) => {
        expect(res.body.returned).to.have.length(numberOfUsers);
        done();
      });
  });

  it('Delete a single user', (done) => {
    chai.request(config.host)
      .delete('/api/user/' + testUsers[--numberOfUsers].id)
      .end((err, res) => {
        done();
      });
  });

  it('Check user was deleted', (done) => {
    chai.request(config.host)
      .get('/api/user')
      .end((err, res) => {
        expect(res.body.returned).to.have.length(numberOfUsers);
        for (let i = 0; i < numberOfUsers; i++) {
          expect(res.body.returned[i]._id).to.not.be.equal(testUsers[numberOfUsers].id);
        }
        done();
      });
  });

});
