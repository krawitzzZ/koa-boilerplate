import { newDebug } from '../../../../utils';
import usersService from '../../services/users';

const debug = newDebug('app:controllers:users:destroy');

export default async ctx => {
  debug('deleting user');

  try {
    await usersService.destroy(ctx);

    ctx.body = {
      status: 'success',
      message: 'User successfully deleted',
    };
  } catch (e) {
    debug('error delete user');
    debug(e);
    throw e;
  }
};
