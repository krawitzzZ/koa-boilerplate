import test from 'ava';
import supertest from 'supertest';
import syncDb from '../../src/db/syncDb';
import config from '../../config';

const app = require(`../../src/app/${config.apiVersion}`).default;
let server;
let request;

test.before(() =>
  syncDb().then(() => {
    server = app.listen();
    request = supertest(server);
  })
);

test('POST /auth/login with wrong credentials should response with error', async t => {
  const res = await request.post('/auth/login').send({
    login: 'wrong',
    password: 'wrong',
  });

  t.is(res.body.status, 'error');
  t.is(res.statusCode, 401);
  t.true(!res.body.hasOwnProperty('user'));
  t.pass();
});

test('POST /auth/login with correct credentials should response with token', async t => {
  const res = await request.post('/auth/login').send({
    login: 'admin',
    password: 'admin123',
  });

  t.is(res.body.status, 'success');
  t.is(res.statusCode, 200);
  t.true(res.body.hasOwnProperty('user'));
  t.true(res.body.user.hasOwnProperty('token'));
  t.pass();
});
