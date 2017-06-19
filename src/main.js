import Koa from 'koa';
import mount from 'koa-mount';
import config from '../config';
import syncDb from './db/syncDb';
import { createDebugger } from './utils';

const debug = createDebugger('app:main');
const app = require(`./app/${config.apiVersion}`).default;

const server = new Koa();
server.use(mount(`/api/${config.apiVersion}`, app));

syncDb().then(() => {
  server.listen(config.port, () => debug(`server started at port: ${config.port}`));
});
