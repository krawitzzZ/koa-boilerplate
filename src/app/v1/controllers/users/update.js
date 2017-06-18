import { newDebug } from '../../../../utils';
import usersService from '../../services/users';

const debug = newDebug('app:controllers:users:update');

export default async ctx => {
  debug('updating user');

  try {
    const user = await usersService.update(ctx);

    ctx.body = {
      status: 'success',
      user,
    };
  } catch (e) {
    debug('error update user');
    debug(e);
    throw e;
  }
};
