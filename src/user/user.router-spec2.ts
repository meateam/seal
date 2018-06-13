import * as chaiHttp from 'chai-http';
// import * as chai from 'chai';
import { server } from '../server';
const chai = require('chai');
import { expect } from 'chai';

let listener;
// let requester;
chai.use(chaiHttp);
// const should = chai.should();
// console.log(should);

describe('loading express', () => {
  before(() => {
    // app = makeServer();
    console.log('starting before');
    listener = server.listener;
    // requester = chai.request(app).keepOpen();
  });

  after((done) => {
    console.log('starting after');
    listener.close();
    console.log('after after');
    done();
    console.log('after after done');
  });

  it('testing1', (done) => {
    chai.request('http://localhost:3000')
      .get('/api/user')
      .end((err, res) => {
        console.log('***********RES************');
        console.log(res.body);
        expect(res.body.returned).to.have.length(0);
        // res.body.returned.length.should.be.eql(0);
        done();
      });
  });

  it('testing2', (done) => {
    chai.request('http://localhost:3000')
      .get('/api/user')
      .end((err, res) => {
        console.log('***********RES************');
        console.log(res.body);
        expect(res.body.returned).to.not.have.length(1);
        // res.body.returned.length.should.be.eql(0);
        done();
      });
  });

});

// newer backup
// it('testing1', (done) => {
//   chai.request('http://localhost:3000')
//     .get('/api/user')
//     .end((err, res) => {
//       console.log(res.body);
//       expect(res.body.returned).to.have.length(0);    // <= Test completes before this runs
//       done();
//     });
// });
