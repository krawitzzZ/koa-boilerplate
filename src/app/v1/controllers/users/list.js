import { createDebugger } from '../../../../utils';
import usersService from '../../services/users';

const debug = createDebugger('app:controllers:users:list');

export default async ctx => {
  debug('retrieving users');

  try {
    const users = await usersService.list();

    ctx.body = {
      status: 'success',
      users,
    };
  } catch (e) {
    debug('error retrieve users');
    debug(e);
    throw e;
  }
};
