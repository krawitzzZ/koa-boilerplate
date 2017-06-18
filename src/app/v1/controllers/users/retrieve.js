import { newDebug } from '../../../../utils';
import usersService from '../../services/users';

const debug = newDebug('app:controllers:users:retrieve');

export default async ctx => {
  debug('retrieve user');

  try {
    const user = await usersService.retrieve(ctx);

    ctx.body = {
      status: 'success',
      user,
    };
  } catch (e) {
    debug('error retrieve user');
    debug(e);
    throw e;
  }
};
