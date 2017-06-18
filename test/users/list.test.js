import test from 'ava';
import supertest from 'supertest';
import syncDb from '../../src/db/syncDb';
import config from '../../config';

const { modelScopes: { user: { admin } } } = config;
const app = require(`../../src/app/${config.apiVersion}`).default;
let server;
let request;
let token;

test.before(async () =>
  syncDb().then(async () => {
    server = await app.listen();
    request = supertest(server);
    const res = await request.post('/auth/login').send({ login: 'admin', password: 'admin123' });
    token = res.body.user.token;
  })
);

test('GET /users should throw an error if token was not provided', async t => {
  const res = await request.get('/users');

  t.is(res.body.status, 'error');
  t.is(res.statusCode, 401);
  t.pass();
});

test('GET /users should return an array with one admin user', async t => {
  const res = await request.get('/users').set('Authorization', `Bearer ${token}`);

  t.is(res.body.status, 'success');
  t.is(res.statusCode, 200);
  t.true(Array.isArray(res.body.users));
  t.true(res.body.users.length === 1);
  t.true(res.body.users[0].role === admin);
  t.pass();
});
