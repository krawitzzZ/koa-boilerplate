import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import jwt, { fromAuthorizationHeader } from 'koa-jsonwebtoken';
import config from '../../../../../config';
import usersService from '../../services/users';
import create from './create';
import list from './list';
import retrieve from './retrieve';
import update from './update';
import destroy from './destroy';

const usersApp = new Koa();
const router = new Router();

router.use(bodyParser());
router.post('/', create);
router.use(jwt({ secret: config.jwtSecret, extractToken: fromAuthorizationHeader }));
router.get('/', list);
router.use(usersService.isAdmin);
router.get('/:id', retrieve);
router.put('/:id', update);
router.del('/:id', destroy);

usersApp.use(router.routes());

export default usersApp;
