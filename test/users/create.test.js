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

test.serial('POST /users creates a new user', async t => {
  const res = await request.post('/users').send({
    login: 'test user',
    email: 'test@test.com',
    password: 'thetesttest',
  });

  t.is(res.body.status, 'success');
  t.is(res.statusCode, 201);
  t.true(res.body.hasOwnProperty('user'));
  t.pass();
});

test.serial(
  'POST /users should throw an error if user with provided credential already exists',
  async t => {
    const res = await request.post('/users').send({
      login: 'test user',
      email: 'test@test.com',
      password: 'thetesttest',
    });

    t.is(res.body.status, 'error');
    t.is(res.body.message, 'User with provided credentials already exists');
    t.pass();
  }
);
