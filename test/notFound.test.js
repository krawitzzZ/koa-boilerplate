import test from 'ava';
import supertest from 'supertest';
import syncDb from '../src/db/syncDb';
import config from '../config';

const app = require(`../src/app/${config.apiVersion}`).default;
let server;
let request;

test.before(() =>
  syncDb().then(() => {
    server = app.listen();
    request = supertest(server);
  })
);

test('Get 404 on undefined endpoint', async t => {
  const res = await request.get('/unexisting-endpoint');

  t.is(res.body.status, 'error');
  t.is(res.statusCode, 404);
  t.is(res.body.message, 'Not Found');
  t.pass();
});
