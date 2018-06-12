import * as request from 'supertest';
import * as express from 'express';
// import { server } from '../server';
import * as assert from 'assert';
import * as mongoose from 'mongoose';

let server;

const request = require('supertest');
describe('loading express', () => {
  beforeEach(() => {
    server = makeServer();
  });
  afterEach((done) => {
    server.close(done);
  });
  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
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
