import { createDebugger } from '../../../../utils';
import usersService from '../../services/users';

const debug = createDebugger('app:controllers:users:create');

export default async ctx => {
  debug('creating user');

  try {
    const user = await usersService.create(ctx);

    ctx.status = 201;
    ctx.body = {
      status: 'success',
      user,
    };
  } catch (e) {
    debug('error create user');
    debug(e);
    throw e;
  }
};
