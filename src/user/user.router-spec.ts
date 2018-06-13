import * as request from 'supertest';
// import * as express from 'express';
import { server } from '../server';
// import * as assert from 'assert';
// import * as mongoose from 'mongoose';
let app;

describe('loading express', () => {

  beforeEach(() => {
    // app = makeServer();
    app = server.listener;
  });

  afterEach((done) => {
    app.close(done);
  });

  it('responds to /', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('404 everything else', (done) => {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });

  it('GET /api/user', (done) => {

    request(app)
      .get('/api/user')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(404)
      .end((err, res) => {
        if (err) {
          console.log('Error occured' + err);
          return done(err);
        }
        console.log('*/*******************');
        console.log(res.body);
        // res.body.password.should.have.length(64);

        done();
      });

  });

});

function makeServer() {
  const express = require('express');
  const app = express();
  app.get('/', (req, res) => {
    res.status(200).send('ok');
  });
  const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log('Example app listening at port %s', port);
  });
  return server;
}
