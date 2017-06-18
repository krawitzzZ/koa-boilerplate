import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import login from './login';

const authApp = new Koa();
const router = new Router();

router.use(bodyParser());
router.post('/login', login);

authApp.use(router.routes());

export default authApp;
